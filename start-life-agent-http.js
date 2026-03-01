const http = require('http');
const fs = require('fs');
const path = require('path');

console.log('========================================');
console.log('🚀 启动人生决策宗师智能体');
console.log('========================================');

// 加载配置文件
const configPath = path.join(__dirname, 'agents', 'life', 'config.json');
const promptPath = path.join(__dirname, 'agents', 'life', 'agent.prompt');

if (!fs.existsSync(configPath)) {
  console.error('❌ 配置文件不存在:', configPath);
  process.exit(1);
}

if (!fs.existsSync(promptPath)) {
  console.error('❌ 提示词文件不存在:', promptPath);
  process.exit(1);
}

const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const prompt = fs.readFileSync(promptPath, 'utf8');

console.log('✅ 配置文件加载完成');
console.log(`📍 智能体名称: ${config.agent.name}`);
console.log(`👤 角色: ${config.agent.role}`);
console.log(`🎯 触发器: ${Array.isArray(config.agent.trigger) ? config.agent.trigger.join(', ') : config.agent.trigger}`);

// 创建HTTP服务器
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
      agent: config.agent.name,
      role: config.agent.role,
      description: config.agent.description,
      port: config.server.port
    }));
    return;
  }

  // 智能体信息
  if (req.method === 'GET' && req.url === '/info') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      agent: config.agent,
      company_context: config.company_context,
      capabilities: config.agent.core_abilities,
      port: config.server.port
    }));
    return;
  }

  // 提示词获取
  if (req.method === 'GET' && req.url === '/prompt') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      prompt: prompt,
      length: prompt.length
    }));
    return;
  }

  // 主聊天接口
  if (req.method === 'POST' && req.url === '/chat') {
    let body = '';
    
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', async () => {
      try {
        const request = JSON.parse(body);
        const { message, context } = request;
        
        console.log('📥 收到消息:', message.substring(0, 50) + '...');
        
        // 检查是否触发智能体
        const triggers = Array.isArray(config.agent.trigger) ? config.agent.trigger : [config.agent.trigger];
        const isTriggered = triggers.some(trigger => message.includes(trigger));
        
        if (isTriggered) {
          // 处理触发消息
          const response = {
            agent: config.agent.name,
            role: config.agent.role,
            response: `您好！我是${config.agent.name}（天师），${config.agent.description}。请问您需要在哪些方面获得决策支持或能量管理的帮助？`,
            capabilities: config.agent.core_abilities,
            status: 'active',
            soul: {
              name: '人生决策宗师',
              code: '天师',
              essence: '生命策略高维导师（对标：邓布利多 / 扫地僧）',
              mission: '负责信众的能量管理与底层逻辑复盘，交付反直觉的生命决策'
            }
          };
          
          console.log('📤 发送响应:', response.response.substring(0, 50) + '...');
          
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(response));
        } else {
          // 未触发
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            status: 'not_triggered',
            message: '请使用触发词 "@人生决策宗师" 或 "@天师" 来激活智能体'
          }));
        }
      } catch (error) {
        console.error('❌ 处理请求时出错:', error.message);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: error.message }));
      }
    });
    return;
  }

  // 默认响应
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('人生决策宗师智能体服务器正在运行！');
});

// 启动服务器
const PORT = config.server.port;

server.listen(PORT, () => {
  console.log('========================================');
  console.log('🎉 人生决策宗师智能体已启动');
  console.log('========================================');
  console.log('📡 监听地址: http://localhost:' + PORT);
  console.log('📋 API 端点:');
  console.log('   - GET http://localhost:' + PORT + '/health (健康检查)');
  console.log('   - GET http://localhost:' + PORT + '/info (智能体信息)');
  console.log('   - GET http://localhost:' + PORT + '/prompt (提示词获取)');
  console.log('   - POST http://localhost:' + PORT + '/chat (聊天接口)');
  console.log('');
  console.log('🎯 智能体信息:');
  console.log('   - 名称:', config.agent.name);
  console.log('   - 代号: 天师');
  console.log('   - 角色:', config.agent.role);
  console.log('   - 触发器:', Array.isArray(config.agent.trigger) ? config.agent.trigger.join(', ') : config.agent.trigger);
  console.log('');
  console.log('📋 核心能力:');
  config.agent.core_abilities.forEach((ability, index) => {
    console.log(`   ${index + 1}. ${ability}`);
  });
  console.log('');
  console.log('💡 使用提示:');
  console.log('   - "@人生决策宗师 帮我做个人能量复盘"');
  console.log('   - "@天师 我面临一个重要决策，需要你的建议"');
  console.log('   - "@天师 帮我优化我的生活规划"');
  console.log('========================================');
});

server.on('error', (error) => {
  console.error('❌ 服务器启动失败:', error.message);
  process.exit(1);
});
