const https = require('https');

const options = {
  hostname: 'ark.cn-beijing.volces.com',
  path: '/api/v3/responses',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer c13b2982-0aab-4c75-9404-0deb12a219ec'
  }
};

const data = JSON.stringify({
  model: 'ep-20260225031720-mp6fh',
  input: [
    {
      role: 'user',
      content: [
        {
          type: 'input_text',
          text: '你好，测试连接'
        }
      ]
    }
  ]
});

const req = https.request(options, (res) => {
  let responseData = '';
  
  res.on('data', (chunk) => {
    responseData += chunk;
  });
  
  res.on('end', () => {
    console.log('Status Code:', res.statusCode);
    console.log('Response:', responseData);
  });
});

req.on('error', (error) => {
  console.error('Error:', error);
});

req.write(data);
req.end();

console.log('Testing Ark API connection...');
console.log('API Key:', 'c13b2982-0aab-4c75-9404-0deb12a219ec');
console.log('Endpoint:', 'https://ark.cn-beijing.volces.com/api/v3/responses');
console.log('Model:', 'ep-20260225031720-mp6fh');
