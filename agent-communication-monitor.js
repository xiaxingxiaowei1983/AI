#!/usr/bin/env node

/**
 * 智能体沟通监控系统
 * 监控智能体之间的沟通状态和异常
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

// 配置
const CONFIG = {
  port: 4009,
  communicationServiceUrl: 'http://localhost:4008',
  agents: {
    greenTea: {
      name: '大掌柜',
      url: 'http://localhost:4003/api/status'
    },
    life: {
      name: '天师',
      url: 'http://localhost:4007/health'
    }
  },
  checkInterval: 30000, // 30秒检查一次
  alertThreshold: 3, // 连续失败次数阈值
  statusFile: path.join(__dirname, 'agent-communication-status.json'),
  alertFile: path.join(__dirname, 'agent-communication-alerts.json')
};

// 状态数据
let statusData = {
  lastCheck: null,
  agents: {},
  communication: {
    lastMessage: null,
    successRate: 100,
    totalMessages: 0,
    failedMessages: 0
  },
  alerts: []
};

// 加载状态数据
function loadStatusData() {
  try {
    if (fs.existsSync(CONFIG.statusFile)) {
      statusData = JSON.parse(fs.readFileSync(CONFIG.statusFile, 'utf8'));
      console.log(`✅ 加载了状态数据`);
    }
  } catch (error) {
    console.error('❌ 加载状态数据失败:', error.message);
    statusData = {
      lastCheck: null,
      agents: {},
      communication: {
        lastMessage: null,
        successRate: 100,
        totalMessages: 0,
        failedMessages: 0
      },
      alerts: []
    };
  }
}

// 保存状态数据
function saveStatusData() {
  try {
    fs.writeFileSync(CONFIG.statusFile, JSON.stringify(statusData, null, 2), 'utf8');
  } catch (error) {
    console.error('❌ 保存状态数据失败:', error.message);
  }
}

// 检查智能体状态
function checkAgentStatus(agentCode, agentInfo) {
  return new Promise((resolve) => {
    const url = new URL(agentInfo.url);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname,
      method: 'GET'
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve({
          code: agentCode,
          name: agentInfo.name,
          status: 'online',
          response: data,
          timestamp: new Date().toISOString()
        });
      });
    });

    req.on('error', (error) => {
      resolve({
        code: agentCode,
        name: agentInfo.name,
        status: 'offline',
        error: error.message,
        timestamp: new Date().toISOString()
      });
    });

    req.end();
  });
}

// 检查通信服务状态
function checkCommunicationService() {
  return new Promise((resolve) => {
    const url = new URL(CONFIG.communicationServiceUrl);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: '/health',
      method: 'GET'
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve({
          status: 'online',
          response: data,
          timestamp: new Date().toISOString()
        });
      });
    });

    req.on('error', (error) => {
      resolve({
        status: 'offline',
        error: error.message,
        timestamp: new Date().toISOString()
      });
    });

    req.end();
  });
}

// 获取消息历史
function getMessageHistory() {
  return new Promise((resolve) => {
    const url = new URL(CONFIG.communicationServiceUrl);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: '/history',
      method: 'GET'
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          const history = JSON.parse(data);
          resolve(history);
        } catch (error) {
          resolve({ history: [], count: 0 });
        }
      });
    });

    req.on('error', (error) => {
      resolve({ history: [], count: 0, error: error.message });
    });

    req.end();
  });
}

// 生成告警
function generateAlert(alertType, message, severity = 'warning') {
  const alert = {
    id: `alert_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    type: alertType,
    message: message,
    severity: severity,
    timestamp: new Date().toISOString(),
    status: 'active'
  };

  statusData.alerts.push(alert);
  // 只保留最近50条告警
  if (statusData.alerts.length > 50) {
    statusData.alerts = statusData.alerts.slice(-50);
  }

  console.log(`🚨 告警: [${severity.toUpperCase()}] ${message}`);
  saveStatusData();

  return alert;
}

// 检查并处理告警
function checkAlerts(agentStatuses, communicationStatus, messageHistory) {
  // 检查智能体状态
  for (const status of agentStatuses) {
    if (status.status === 'offline') {
      generateAlert('agent_offline', `${status.name} 智能体离线`, 'critical');
    }
  }

  // 检查通信服务状态
  if (communicationStatus.status === 'offline') {
    generateAlert('communication_service_offline', '智能体通信服务离线', 'critical');
  }

  // 检查消息传递失败
  if (messageHistory.history) {
    const failedMessages = messageHistory.history.filter(msg => msg.status === 'failed');
    if (failedMessages.length > 0) {
      generateAlert('message_failure', `发现 ${failedMessages.length} 条消息传递失败`, 'warning');
    }
  }
}

// 执行检查
async function performCheck() {
  console.log('🔍 执行智能体沟通状态检查...');

  // 检查智能体状态
  const agentStatuses = await Promise.all(
    Object.entries(CONFIG.agents).map(([code, info]) => checkAgentStatus(code, info))
  );

  // 检查通信服务状态
  const communicationStatus = await checkCommunicationService();

  // 获取消息历史
  const messageHistory = await getMessageHistory();

  // 更新状态数据
  statusData.lastCheck = new Date().toISOString();
  statusData.agents = agentStatuses.reduce((acc, status) => {
    acc[status.code] = status;
    return acc;
  }, {});

  // 更新通信状态
  if (messageHistory.history) {
    statusData.communication.totalMessages = messageHistory.history.length;
    statusData.communication.failedMessages = messageHistory.history.filter(msg => msg.status === 'failed').length;
    statusData.communication.successRate = statusData.communication.totalMessages > 0 
      ? Math.round((1 - statusData.communication.failedMessages / statusData.communication.totalMessages) * 100)
      : 100;
    
    const lastMessage = messageHistory.history[messageHistory.history.length - 1];
    if (lastMessage) {
      statusData.communication.lastMessage = lastMessage;
    }
  }

  // 检查告警
  checkAlerts(agentStatuses, communicationStatus, messageHistory);

  saveStatusData();

  console.log('✅ 智能体沟通状态检查完成');
  console.log(`📊 智能体状态: ${agentStatuses.filter(s => s.status === 'online').length}/${agentStatuses.length} 在线`);
  console.log(`📊 通信服务: ${communicationStatus.status}`);
  console.log(`📊 消息成功率: ${statusData.communication.successRate}%`);
  console.log(`📊 活跃告警: ${statusData.alerts.filter(a => a.status === 'active').length}`);
  console.log('');
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
      lastCheck: statusData.lastCheck
    }));
    return;
  }

  // 获取状态
  if (req.method === 'GET' && req.url === '/status') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(statusData));
    return;
  }

  // 获取告警
  if (req.method === 'GET' && req.url === '/alerts') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      alerts: statusData.alerts,
      count: statusData.alerts.length
    }));
    return;
  }

  // 清除告警
  if (req.method === 'POST' && req.url === '/clear-alerts') {
    statusData.alerts = statusData.alerts.map(alert => ({
      ...alert,
      status: 'cleared'
    }));
    saveStatusData();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, message: '告警已清除' }));
    return;
  }

  // 默认响应
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('智能体沟通监控系统正在运行！');
});

// 启动服务器
server.listen(CONFIG.port, () => {
  loadStatusData();
  
  console.log('========================================');
  console.log('🚀 智能体沟通监控系统已启动');
  console.log('========================================');
  console.log(`📡 监听地址: http://localhost:${CONFIG.port}`);
  console.log('📋 API 端点:');
  console.log(`   - GET http://localhost:${CONFIG.port}/health (健康检查)`);
  console.log(`   - GET http://localhost:${CONFIG.port}/status (状态信息)`);
  console.log(`   - GET http://localhost:${CONFIG.port}/alerts (告警信息)`);
  console.log(`   - POST http://localhost:${CONFIG.port}/clear-alerts (清除告警)`);
  console.log('');
  console.log('🎯 监控对象:');
  Object.values(CONFIG.agents).forEach(agent => {
    console.log(`   - ${agent.name}: ${agent.url}`);
  });
  console.log(`   - 通信服务: ${CONFIG.communicationServiceUrl}`);
  console.log('');
  console.log('🔍 检查间隔: 30秒');
  console.log('========================================');

  // 立即执行一次检查
  performCheck();

  // 定期执行检查
  setInterval(performCheck, CONFIG.checkInterval);
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