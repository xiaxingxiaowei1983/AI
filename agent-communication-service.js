#!/usr/bin/env node

/**
 * 智能体通信服务
 * 提供智能体之间的消息传递功能
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

// 配置
const CONFIG = {
  port: 4010,
  agents: {
    greenTea: {
      name: '大掌柜',
      code: 'green-tea',
      url: 'http://localhost:4004/api/chat'
    },
    life: {
      name: '天师',
      code: 'life',
      url: 'http://localhost:4007/chat'
    }
  },
  messageHistoryFile: path.join(__dirname, 'agent-communication-history.json')
};

// 消息历史
let messageHistory = [];

// 加载消息历史
function loadMessageHistory() {
  try {
    if (fs.existsSync(CONFIG.messageHistoryFile)) {
      messageHistory = JSON.parse(fs.readFileSync(CONFIG.messageHistoryFile, 'utf8'));
      console.log(`✅ 加载了 ${messageHistory.length} 条历史消息`);
    }
  } catch (error) {
    console.error('❌ 加载消息历史失败:', error.message);
    messageHistory = [];
  }
}

// 保存消息历史
function saveMessageHistory() {
  try {
    fs.writeFileSync(CONFIG.messageHistoryFile, JSON.stringify(messageHistory, null, 2), 'utf8');
  } catch (error) {
    console.error('❌ 保存消息历史失败:', error.message);
  }
}

// 发送消息到智能体
function sendMessageToAgent(agentCode, message) {
  return new Promise((resolve, reject) => {
    const agent = CONFIG.agents[agentCode];
    if (!agent) {
      reject(new Error(`智能体 ${agentCode} 不存在`));
      return;
    }

    const postData = JSON.stringify({ message });

    // 解析URL
    const url = new URL(agent.url);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          resolve(response);
        } catch (error) {
          console.error('响应数据:', data);
          reject(new Error('响应解析失败'));
        }
      });
    });

    req.on('error', (error) => {
      console.error('发送消息到智能体时出错:', error);
      console.error('错误详情:', error.stack);
      reject(error);
    });

    req.write(postData);
    req.end();
  });
}

// 处理智能体间消息
async function handleAgentMessage(sender, receiver, message) {
  const timestamp = new Date().toISOString();
  
  const messageRecord = {
    id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp,
    sender,
    receiver,
    message,
    status: 'pending'
  };

  messageHistory.push(messageRecord);
  saveMessageHistory();

  try {
    console.log(`📤 转发消息: ${sender} → ${receiver}: ${message.substring(0, 50)}...`);
    console.log(`📤 发送到: ${CONFIG.agents[receiver].url}`);
    const response = await sendMessageToAgent(receiver, message);
    
    messageRecord.status = 'delivered';
    messageRecord.response = response;
    saveMessageHistory();
    
    console.log(`✅ 消息已送达: ${receiver} 收到消息`);
    return {
      success: true,
      message: `消息已成功发送给 ${CONFIG.agents[receiver].name}`,
      response
    };
  } catch (error) {
    messageRecord.status = 'failed';
    messageRecord.error = error.message || '未知错误';
    saveMessageHistory();
    
    console.error(`❌ 消息发送失败: ${error.message || '未知错误'}`);
    console.error(`❌ 错误详情:`, error);
    return {
      success: false,
      message: `消息发送失败: ${error.message || '未知错误'}`
    };
  }
}

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
      agents: Object.keys(CONFIG.agents),
      messageHistoryLength: messageHistory.length
    }));
    return;
  }

  // 获取消息历史
  if (req.method === 'GET' && req.url === '/history') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      history: messageHistory,
      count: messageHistory.length
    }));
    return;
  }

  // 发送消息
  if (req.method === 'POST' && req.url === '/send') {
    let body = '';
    
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    
    req.on('end', async () => {
      try {
        const request = JSON.parse(body);
        const { sender, receiver, message } = request;
        
        if (!sender || !receiver || !message) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, message: '缺少必要参数' }));
          return;
        }
        
        const result = await handleAgentMessage(sender, receiver, message);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result));
      } catch (error) {
        console.error('❌ 处理请求时出错:', error.message);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: error.message }));
      }
    });
    return;
  }

  // 获取智能体列表
  if (req.method === 'GET' && req.url === '/agents') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      agents: CONFIG.agents
    }));
    return;
  }

  // 默认响应
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('智能体通信服务正在运行！');
});

// 启动服务器
server.listen(CONFIG.port, () => {
  loadMessageHistory();
  
  console.log('========================================');
  console.log('🚀 智能体通信服务已启动');
  console.log('========================================');
  console.log(`📡 监听地址: http://localhost:${CONFIG.port}`);
  console.log('📋 API 端点:');
  console.log(`   - GET http://localhost:${CONFIG.port}/health (健康检查)`);
  console.log(`   - GET http://localhost:${CONFIG.port}/agents (智能体列表)`);
  console.log(`   - POST http://localhost:${CONFIG.port}/send (发送消息)`);
  console.log(`   - GET http://localhost:${CONFIG.port}/history (消息历史)`);
  console.log('');
  console.log('🎯 已注册智能体:');
  Object.values(CONFIG.agents).forEach(agent => {
    console.log(`   - ${agent.name} (${agent.code}): ${agent.url}`);
  });
  console.log('');
  console.log('💡 使用示例:');
  console.log('   curl -X POST http://localhost:4008/send -H "Content-Type: application/json" -d {"sender": "life", "receiver": "greenTea", "message": "@大掌柜 我是天师，向您汇报智能体启动情况"}');
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