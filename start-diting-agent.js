const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 4004;

console.log('🚀 启动谛听智能体（公司大脑）...\n');

const configPath = path.join(__dirname, 'agents', 'business', 'config.json');
const promptPath = path.join(__dirname, 'agents', 'business', 'agent.prompt');

if (!fs.existsSync(configPath)) {
  console.error('❌ 谛听配置文件不存在:', configPath);
  process.exit(1);
}

if (!fs.existsSync(promptPath)) {
  console.error('❌ 谛听提示文件不存在:', promptPath);
  process.exit(1);
}

console.log('✅ 配置文件检查完成');
console.log('✅ 使用Trea内置模型（免API密钥）\n');

const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

const server = http.createServer((req, res) => {
  if (req.url === '/' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'running',
      agent: '谛听',
      role: 'CCO / 风险哨兵',
      port: PORT,
      capabilities: [
        '市场监控',
        '风险识别',
        '合规审计',
        '商业洞察',
        '竞争情报分析'
      ]
    }));
  } else if (req.url === '/api/chat' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        console.log('📥 收到命令:', data.message);
        
        const response = {
          status: 'success',
          agent: '谛听',
          response: `我是谛听，您的商业哨兵与合规检查官。我已收到您的命令："${data.message}"。我将为您提供市场监控、风险识别、合规审计等服务。`,
          timestamp: new Date().toISOString()
        };
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(response));
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
  } else if (req.url === '/api/status' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'running',
      agent: '谛听',
      role: 'CCO / 风险哨兵',
      port: PORT,
      uptime: process.uptime(),
      capabilities: config.agent.type,
      model: config.model
    }));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
});

server.listen(PORT, () => {
  console.log('========================================');
  console.log('🚀 谛听智能体（公司大脑） 已启动');
  console.log('========================================');
  console.log('📡 监听地址: http://localhost:' + PORT);
  console.log('📋 API 端点:');
  console.log('   - POST http://localhost:' + PORT + '/api/chat (发送命令)');
  console.log('   - GET http://localhost:' + PORT + '/api/status (获取状态)');
  console.log('   - GET http://localhost:' + PORT + '/ (健康检查)');
  console.log('');
  console.log('🎯 智能体信息:');
  console.log('   - 名称: 谛听');
  console.log('   - 角色: CCO / 风险哨兵 & 商业洞察');
  console.log('   - 端口: ' + PORT);
  console.log('   - 描述: 风险哨兵与商业洞察');
  console.log('');
  console.log('📋 支持的命令:');
  console.log('   - "市场监控": 监控市场动态和趋势');
  console.log('   - "风险识别": 识别潜在的商业风险');
  console.log('   - "合规审计": 进行合规性审计');
  console.log('   - "商业洞察": 提供商业洞察和建议');
  console.log('   - "竞争分析": 分析竞争对手动态');
  console.log('');
  console.log('✅ 系统已就绪，可以发送命令给谛听智能体');
  console.log('========================================\n');
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error('❌ 端口 ' + PORT + ' 已被占用，请先停止占用该端口的进程。');
    process.exit(1);
  } else {
    console.error('❌ 服务器错误:', error.message);
    process.exit(1);
  }
});

process.on('SIGINT', () => {
  console.log('\n🔄 正在停止谛听智能体...');
  server.close(() => {
    console.log('✅ 谛听智能体已停止');
    process.exit(0);
  });
});
