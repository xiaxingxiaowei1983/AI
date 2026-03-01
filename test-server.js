const http = require('http');

// 创建一个简单的HTTP服务器
const server = http.createServer((req, res) => {
  // 处理CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // 处理OPTIONS请求
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // 健康检查
  if (req.method === 'GET' && req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'active',
      message: '测试服务器运行正常'
    }));
    return;
  }

  // 默认响应
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('测试服务器正在运行！');
});

// 启动服务器
const PORT = 4011;

server.listen(PORT, () => {
  console.log('========================================');
  console.log('🚀 测试服务器已启动');
  console.log('========================================');
  console.log(`📡 监听地址: http://localhost:${PORT}`);
  console.log('📋 API 端点:');
  console.log(`   - GET http://localhost:${PORT}/health (健康检查)`);
  console.log('========================================');
});

server.on('error', (error) => {
  console.error('❌ 服务器启动失败:', error.message);
  process.exit(1);
});

// 处理SIGINT信号
process.on('SIGINT', () => {
  console.log('\n📡 正在关闭服务器...');
  server.close(() => {
    console.log('✅ 服务器已关闭');
    process.exit(0);
  });
});

// 保持进程运行
process.stdin.resume();
