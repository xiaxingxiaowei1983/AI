const http = require('http');
const fs = require('fs');

/**
 * 测试网关API（token验证）
 */
async function testGatewayApi() {
  console.log('=== 测试网关API（token验证）===');
  
  // 测试1：无token请求
  console.log('\n1. 测试无token请求...');
  await makeGatewayRequest('/api/agent/master', {
    message: '测试消息'
  }, {
    // 不设置token
  });
  
  // 测试2：无效token请求
  console.log('\n2. 测试无效token请求...');
  await makeGatewayRequest('/api/agent/master', {
    message: '测试消息'
  }, {
    'Authorization': 'Bearer invalid-token'
  });
  
  // 测试3：有效token请求
  console.log('\n3. 测试有效token请求...');
  await makeGatewayRequest('/api/agent/master', {
    message: '测试消息'
  }, {
    'Authorization': 'Bearer 2e47ede431dbd73de7ae4a2556ba69260427d1269e8878da'
  });
}

/**
 * 测试CSP代理
 */
async function testCspProxy() {
  console.log('\n=== 测试CSP代理 ===');
  
  // 测试CSP代理是否正常运行
  console.log('1. 测试CSP代理健康状态...');
  await makeCspProxyRequest('/');
  
  // 测试CSP代理的响应头
  console.log('\n2. 测试CSP代理响应头...');
  await makeCspProxyRequest('/health');
}

/**
 * 发送网关请求
 */
function makeGatewayRequest(path, data, headers) {
  return new Promise((resolve) => {
    const options = {
      hostname: 'localhost',
      port: 18789,
      path: path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    };

    const req = http.request(options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        console.log(`   状态码: ${res.statusCode}`);
        console.log(`   响应: ${responseData}`);
        resolve();
      });
    });

    req.on('error', (error) => {
      console.log(`   错误: ${error.message}`);
      resolve();
    });

    req.write(JSON.stringify(data));
    req.end();
  });
}

/**
 * 发送CSP代理请求
 */
function makeCspProxyRequest(path) {
  return new Promise((resolve) => {
    const options = {
      hostname: 'localhost',
      port: 18790,
      path: path,
      method: 'GET'
    };

    const req = http.request(options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        console.log(`   状态码: ${res.statusCode}`);
        console.log(`   CSP头: ${res.headers['content-security-policy'] || '无'}`);
        console.log(`   响应: ${responseData.substring(0, 200)}${responseData.length > 200 ? '...' : ''}`);
        resolve();
      });
    });

    req.on('error', (error) => {
      console.log(`   错误: ${error.message}`);
      resolve();
    });

    req.end();
  });
}

/**
 * 主测试函数
 */
async function main() {
  console.log('开始测试OpenClaw网关和CSP代理...\n');
  
  await testGatewayApi();
  await testCspProxy();
  
  console.log('\n=== 测试完成 ===');
}

// 运行测试
main();
