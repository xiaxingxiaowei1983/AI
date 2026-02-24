const http = require('http');

const options = {
  hostname: '127.0.0.1',
  port: 18789,
  path: '/api/agent/master',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer 2e47ede431dbd73de7ae4a2556ba69260427d1269e8878da'
  }
};

const data = JSON.stringify({
  message: '你好，测试豆包API连接',
  context: {
    userId: 'test-user',
    conversationId: 'test-convo'
  }
});

const req = http.request(options, (res) => {
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

console.log('Testing OpenClaw with Doubao API...');
console.log('Request sent to:', 'http://127.0.0.1:18789/api/agent/master');
