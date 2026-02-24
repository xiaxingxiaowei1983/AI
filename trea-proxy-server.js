const http = require('http');

// 创建 HTTP 服务器
const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/api/chat') {
    let body = '';
    
    // 接收请求体
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    // 处理请求
    req.on('end', () => {
      try {
        const request = JSON.parse(body);
        console.log('📥 收到请求:', request.message.substring(0, 50) + '...');
        
        // 模拟 Trea 大模型的响应
        const response = {
          success: true,
          message: `[绿茶智能体回应] 你好！我是绿茶智能体，很高兴为你服务。你刚刚说：${request.message}`,
          timestamp: new Date().toISOString()
        };
        
        console.log('📤 发送响应:', response.message.substring(0, 50) + '...');
        
        // 发送响应
        res.writeHead(200, {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        });
        res.end(JSON.stringify(response));
      } catch (error) {
        console.error('❌ 处理请求时出错:', error.message);
        res.writeHead(500, {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        });
        res.end(JSON.stringify({ success: false, error: error.message }));
      }
    });
  } else {
    // 健康检查
    res.writeHead(200, {
      'Content-Type': 'text/plain',
      'Access-Control-Allow-Origin': '*'
    });
    res.end('Trea Model Proxy Server is running!');
  }
});

// 启动服务器
const PORT = 4003;
server.listen(PORT, () => {
  console.log(`🚀 Trea Model Proxy Server 已启动`);
  console.log(`📡 监听地址: http://localhost:${PORT}`);
  console.log(`📋 API 端点:`);
  console.log(`   - POST http://localhost:${PORT}/api/chat`);
  console.log(`   - GET  http://localhost:${PORT}/ (健康检查)`);
  console.log(`\n🎯 现在你可以将绿茶智能体配置为使用此代理服务器。`);
});

// 处理服务器错误
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`❌ 端口 ${PORT} 已被占用，请先停止占用该端口的进程。`);
  } else {
    console.error(`❌ 服务器启动失败:`, error.message);
  }
  process.exit(1);
});

// 处理终止信号
process.on('SIGINT', () => {
  console.log('\n📡 正在关闭服务器...');
  server.close(() => {
    console.log('✅ 服务器已关闭');
    process.exit(0);
  });
});