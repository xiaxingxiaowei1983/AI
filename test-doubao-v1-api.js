const https = require('https');

const options = {
  hostname: 'api.doubao.com',
  path: '/v1/chat/completions',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer c13b2982-0aab-4c75-9404-0deb12a219ec'
  }
};

const data = JSON.stringify({
  model: 'doubao-pro-1-5',
  messages: [
    {
      role: 'user',
      content: '你好，测试连接'
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

console.log('Testing Doubao V1 API connection...');
console.log('API Key:', 'c13b2982-0aab-4c75-9404-0deb12a219ec');
console.log('Endpoint:', 'https://api.doubao.com/v1/chat/completions');
