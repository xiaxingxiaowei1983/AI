const https = require('https');

// Test Ark API connection
async function testArkConnection() {
  console.log('🔍 Testing Ark API connection...');
  
  const apiKey = 'c13b2982-0aab-4c75-9404-0deb12a219ec';
  const model = 'doubao-seed-2-0-code-preview-260215';
  
  const body = {
    model: model,
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: 'Hello, test connection!'
          }
        ]
      }
    ]
  };
  
  const options = {
    hostname: 'ark.cn-beijing.volces.com',
    port: 443,
    path: '/api/v3/chat/completions',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(JSON.stringify(body))
    }
  };
  
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        console.log('✅ Ark API response received');
        console.log('📡 Status code:', res.statusCode);
        console.log('📋 Headers:', JSON.stringify(res.headers, null, 2));
        
        try {
          const parsedData = JSON.parse(responseData);
          console.log('📦 Response data:', JSON.stringify(parsedData, null, 2));
          resolve({ success: true, data: parsedData });
        } catch (error) {
          console.error('❌ Failed to parse response:', error);
          resolve({ success: false, error: 'Response parsing failed' });
        }
      });
    });

    req.on('error', (error) => {
      console.error('❌ Connection error:', error);
      resolve({ success: false, error: error.message });
    });

    req.write(JSON.stringify(body));
    req.end();
  });
}

// Run test
testArkConnection()
  .then(result => {
    console.log('\n🎯 Test result:', result.success ? 'PASSED' : 'FAILED');
    if (result.success) {
      console.log('✅ Ark API connection is working!');
    } else {
      console.log('❌ Ark API connection failed:', result.error);
    }
  })
  .catch(error => {
    console.error('💥 Unexpected error:', error);
  });
