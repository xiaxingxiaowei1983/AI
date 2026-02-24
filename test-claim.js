const fs = require('fs');
const path = require('path');
const https = require('https');
const crypto = require('crypto');

// EvoMap API配置
const EVOMAP_API = 'https://evomap.ai';
const CONFIG_FILE = path.join(__dirname, 'evolver', 'config.json');

/**
 * 加载配置
 */
function loadConfig() {
  if (fs.existsSync(CONFIG_FILE)) {
    return JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
  }
  return {};
}

/**
 * 生成或加载agentId
 */
function getAgentId() {
  const config = loadConfig();
  if (config.agent_id) {
    return config.agent_id;
  }
  const agentId = "node_" + crypto.randomBytes(8).toString("hex");
  config.agent_id = agentId;
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
  return agentId;
}

/**
 * 生成消息ID
 */
function generateMessageId() {
  return "msg_" + Date.now() + "_" + crypto.randomBytes(4).toString("hex");
}

/**
 * 生成时间戳
 */
function getTimestamp() {
  return new Date().toISOString();
}

/**
 * 创建协议信封
 */
function createProtocolEnvelope(messageType, payload) {
  return {
    protocol: "gep-a2a",
    protocol_version: "1.0.0",
    message_type: messageType,
    message_id: generateMessageId(),
    sender_id: getAgentId(),
    timestamp: getTimestamp(),
    payload: payload
  };
}

/**
 * API请求函数
 */
async function apiRequest(endpoint, options = {}) {
  return new Promise((resolve, reject) => {
    try {
      const url = `${EVOMAP_API}${endpoint}`;
      const req = https.request(url, {
        method: options.method || 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        }
      }, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          try {
            const jsonData = JSON.parse(data);
            resolve(jsonData);
          } catch (error) {
            resolve({ raw: data });
          }
        });
      });

      req.on('error', (error) => {
        reject(error);
      });

      if (options.body) {
        req.write(JSON.stringify(options.body));
      }

      req.end();
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * 获取可用任务列表
 */
async function fetchAvailableTasks() {
  console.log('获取可用任务列表...');
  
  try {
    const response = await apiRequest('/a2a/fetch?include_tasks=true', {
      method: 'POST',
      body: {
        asset_type: "Capsule",
        include_tasks: true
      }
    });
    
    const tasks = response.tasks || (response.payload && response.payload.tasks) || [];
    console.log('找到', tasks.length, '个可用任务');
    
    // 筛选未被认领的任务
    const unclaimedTasks = tasks.filter(task => !task.claimed_by);
    console.log('未被认领的任务:', unclaimedTasks.length);
    
    if (unclaimedTasks.length > 0) {
      console.log('第一个未被认领的任务:', JSON.stringify(unclaimedTasks[0], null, 2));
      return unclaimedTasks[0];
    }
    
    return null;
  } catch (error) {
    console.error('获取任务失败:', error.message);
    return null;
  }
}

/**
 * 测试认领单个任务
 */
async function testClaimTask() {
  console.log('测试认领单个任务...');
  
  try {
    const agentId = getAgentId();
    console.log('Agent ID:', agentId);
    
    // 获取未被认领的任务
    const unclaimedTask = await fetchAvailableTasks();
    
    if (!unclaimedTask) {
      console.log('没有未被认领的任务');
      return;
    }
    
    const testTaskId = unclaimedTask.task_id;
    console.log('测试任务ID:', testTaskId);
    
    // 直接传递参数，不使用协议信封
    const requestBody = {
      task_id: testTaskId,
      node_id: agentId
    };
    
    console.log('请求体:', JSON.stringify(requestBody, null, 2));
    
    // 发送请求
    console.log('发送认领请求...');
    const response = await apiRequest('/task/claim', {
      method: 'POST',
      body: requestBody
    });
    
    console.log('响应:', JSON.stringify(response, null, 2));
    
  } catch (error) {
    console.error('测试失败:', error.message);
  }
}

// 执行测试
testClaimTask();
