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
    // 使用协议信封格式获取任务
    const envelope = createProtocolEnvelope("fetch", {
      asset_type: "Capsule",
      include_tasks: true
    });

    const response = await apiRequest('/a2a/fetch?include_tasks=true', {
      method: 'POST',
      body: envelope
    });
    
    const tasks = response.tasks || (response.payload && response.payload.tasks) || [];
    console.log('找到', tasks.length, '个可用任务');
    
    // 筛选未被认领的任务
    const unclaimedTasks = tasks.filter(task => !task.claimed_by);
    console.log('未被认领的任务:', unclaimedTasks.length);
    
    return unclaimedTasks;
  } catch (error) {
    console.error('获取任务失败:', error.message);
    return [];
  }
}

/**
 * 测试使用协议信封格式认领任务
 */
async function testClaimWithProtocol() {
  console.log('测试使用协议信封格式认领任务...');
  
  try {
    const agentId = getAgentId();
    console.log('Agent ID:', agentId);
    
    // 获取未被认领的任务
    const unclaimedTasks = await fetchAvailableTasks();
    
    if (unclaimedTasks.length === 0) {
      console.log('没有未被认领的任务');
      return;
    }
    
    // 选择第一个任务
    const task = unclaimedTasks[0];
    console.log('尝试认领任务:', task.title, '(', task.task_id, ')');
    
    // 使用协议信封格式认领任务
    const envelope = createProtocolEnvelope("claim", {
      task_id: task.task_id,
      agent_id: agentId,
      node_id: agentId
    });
    
    console.log('请求体:', JSON.stringify(envelope, null, 2));
    
    // 发送请求
    console.log('发送认领请求...');
    const response = await apiRequest('/task/claim', {
      method: 'POST',
      body: envelope
    });
    
    console.log('响应:', JSON.stringify(response, null, 2));
    
  } catch (error) {
    console.error('测试失败:', error.message);
  }
}

/**
 * 测试使用不同的任务ID格式
 */
async function testDifferentTaskFormats() {
  console.log('\n测试使用不同的任务ID格式...');
  
  try {
    const agentId = getAgentId();
    
    // 测试任务ID
    const testTaskId = 'cmlzkyh9c1hdyphol7hcxwv9k'; // Discord bot问题
    
    // 尝试不同的请求格式
    const formats = [
      {
        name: '直接参数',
        body: {
          task_id: testTaskId,
          node_id: agentId
        }
      },
      {
        name: '协议信封',
        body: createProtocolEnvelope("claim", {
          task_id: testTaskId,
          agent_id: agentId,
          node_id: agentId
        })
      },
      {
        name: '简化协议信封',
        body: {
          task_id: testTaskId,
          agent_id: agentId
        }
      }
    ];
    
    for (const format of formats) {
      console.log(`\n尝试格式: ${format.name}`);
      console.log('请求体:', JSON.stringify(format.body, null, 2));
      
      try {
        const response = await apiRequest('/task/claim', {
          method: 'POST',
          body: format.body
        });
        console.log('响应:', JSON.stringify(response, null, 2));
      } catch (error) {
        console.error('请求失败:', error.message);
      }
    }
    
  } catch (error) {
    console.error('测试失败:', error.message);
  }
}

// 执行测试
testClaimWithProtocol().then(() => {
  testDifferentTaskFormats();
});
