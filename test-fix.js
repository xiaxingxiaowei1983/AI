const http = require('http');

// 测试网关token验证
function testGatewayToken() {
  console.log('测试网关token验证...');
  
  const options = {
    hostname: 'localhost',
    port: 18789,
    path: '/api/agent/master',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 2e47ede431dbd73de7ae4a2556ba69260427d1269e8878da',
      'Content-Length': Buffer.byteLength(JSON.stringify({ message: 'test' }))
    }
  };
  
  const req = http.request(options, (res) => {
    console.log(`网关响应状态码: ${res.statusCode}`);
    console.log(`网关响应头: ${JSON.stringify(res.headers)}`);
    
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      console.log(`网关响应体: ${data}`);
      console.log('网关token验证测试完成\n');
    });
  });
  
  req.on('error', (e) => {
    console.error(`网关请求错误: ${e.message}`);
  });
  
  req.write(JSON.stringify({ message: 'test' }));
  req.end();
}

// 测试CSP代理
function testCSPProxy() {
  console.log('测试CSP代理...');
  
  const options = {
    hostname: 'localhost',
    port: 18790,
    path: '/',
    method: 'GET'
  };
  
  const req = http.request(options, (res) => {
    console.log(`CSP代理响应状态码: ${res.statusCode}`);
    console.log(`CSP代理响应头: ${JSON.stringify(res.headers)}`);
    
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      console.log(`CSP代理响应体: ${data}`);
      console.log('CSP代理测试完成\n');
    });
  });
  
  req.on('error', (e) => {
    console.error(`CSP代理请求错误: ${e.message}`);
  });
  
  req.end();
}

// 运行测试
testGatewayToken();
setTimeout(testCSPProxy, 1000);
