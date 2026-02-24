const http = require('http');

// 测试 Trea Model Proxy Server
function testTreaProxy() {
  console.log('🚀 测试 Trea Model Proxy Server...');
  
  // 测试数据
  const testData = {
    message: '@绿茶 启动',
    agent: 'green-tea',
    timestamp: new Date().toISOString()
  };
  
  // 构建请求选项
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/chat',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(JSON.stringify(testData))
    }
  };
  
  // 发送请求
  const req = http.request(options, (res) => {
    let data = '';
    
    // 接收响应
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    // 处理响应
    res.on('end', () => {
      try {
        const response = JSON.parse(data);
        console.log('✅ 测试成功！');
        console.log('📥 服务器响应:', response);
        
        if (response.success) {
          console.log('🎉 Trea Model Proxy Server 工作正常！');
          console.log('\n🎯 现在你可以通过以下方式与绿茶智能体交互:');
          console.log('   - 使用测试脚本: node test-trea-proxy.js');
          console.log('   - 直接发送 HTTP POST 请求到 http://localhost:3000/api/chat');
        } else {
          console.error('❌ 服务器返回错误:', response.error);
        }
      } catch (error) {
        console.error('❌ 解析响应时出错:', error.message);
      }
    });
  });
  
  // 处理请求错误
  req.on('error', (error) => {
    console.error('❌ 发送请求时出错:', error.message);
  });
  
  // 发送请求体
  req.write(JSON.stringify(testData));
  req.end();
}

// 运行测试
testTreaProxy();