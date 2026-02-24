/**
 * 启动人生决策宗师智能体
 * 端口: 4005
 */

const express = require('express');
const app = express();
const port = 4005;

// 加载智能体配置
const config = require('./agents/life/config.json');
const prompt = require('fs').readFileSync('./agents/life/agent.prompt', 'utf8');

// 中间件
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 健康检查
app.get('/health', (req, res) => {
  res.json({
    status: 'active',
    agent: config.agent.name,
    role: config.agent.role,
    description: config.agent.description,
    port: port
  });
});

// 智能体信息
app.get('/info', (req, res) => {
  res.json({
    agent: config.agent,
    company_context: config.company_context,
    capabilities: config.agent.core_abilities,
    port: port
  });
});

// 提示词获取
app.get('/prompt', (req, res) => {
  res.json({
    prompt: prompt,
    length: prompt.length
  });
});

// 主聊天接口
app.post('/chat', (req, res) => {
  const { message, context } = req.body;
  
  // 检查是否触发智能体
  const trigger = config.agent.trigger;
  const isTriggered = message.includes(trigger);
  
  if (isTriggered) {
    // 处理触发消息
    const response = {
      agent: config.agent.name,
      role: config.agent.role,
      response: `您好！我是${config.agent.name}，${config.agent.description}。请问您需要在哪些方面获得决策支持或能量管理的帮助？`,
      capabilities: config.agent.core_abilities,
      status: 'active'
    };
    
    res.json(response);
  } else {
    // 未触发
    res.json({
      status: 'not_triggered',
      message: '请使用触发词 "@人生决策宗师" 来激活智能体'
    });
  }
});

// 启动服务器
app.listen(port, () => {
  console.log(`================================`);
  console.log(`人生决策宗师智能体已启动`);
  console.log(`================================`);
  console.log(`Agent: ${config.agent.name}`);
  console.log(`Role: ${config.agent.role}`);
  console.log(`Trigger: ${config.agent.trigger}`);
  console.log(`Port: ${port}`);
  console.log(`Status: ACTIVE`);
  console.log(`================================`);
  console.log(`Health Check: http://localhost:${port}/health`);
  console.log(`Agent Info: http://localhost:${port}/info`);
  console.log(`Prompt: http://localhost:${port}/prompt`);
  console.log(`Chat API: http://localhost:${port}/chat`);
  console.log(`================================`);
});
