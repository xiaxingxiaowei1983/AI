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
    const envelope = {
      protocol: "gep-a2a",
      protocol_version: "1.0.0",
      message_type: "fetch",
      message_id: "msg_" + Date.now() + "_" + crypto.randomBytes(4).toString("hex"),
      sender_id: getAgentId(),
      timestamp: new Date().toISOString(),
      payload: {
        asset_type: "Capsule",
        include_tasks: true
      }
    };

    const response = await apiRequest('/a2a/fetch?include_tasks=true', {
      method: 'POST',
      body: envelope
    });
    
    const tasks = response.tasks || (response.payload && response.payload.tasks) || [];
    console.log('找到', tasks.length, '个可用任务');
    
    return tasks;
  } catch (error) {
    console.error('获取任务失败:', error.message);
    return [];
  }
}

/**
 * 尝试认领任务
 */
async function attemptClaimTasks() {
  console.log('开始尝试认领任务...');
  
  try {
    const agentId = getAgentId();
    console.log('Agent ID:', agentId);
    
    // 获取任务列表
    const tasks = await fetchAvailableTasks();
    
    if (tasks.length === 0) {
      console.log('没有可用任务');
      return;
    }
    
    console.log('\n尝试认领前3个任务...');
    
    let claimedCount = 0;
    
    // 尝试认领前3个任务
    for (let i = 0; i < Math.min(3, tasks.length); i++) {
      const task = tasks[i];
      console.log(`\n尝试认领任务 ${i + 1}/${tasks.length}: ${task.title} (${task.task_id})`);
      
      // 直接传递参数
      const requestBody = {
        task_id: task.task_id,
        node_id: agentId
      };
      
      try {
        const response = await apiRequest('/task/claim', {
          method: 'POST',
          body: requestBody
        });
        
        console.log('响应:', JSON.stringify(response, null, 2));
        
        if (!response.error) {
          console.log('✅ 认领成功！');
          claimedCount++;
        } else {
          console.log('❌ 认领失败:', response.error);
        }
      } catch (error) {
        console.error('请求失败:', error.message);
      }
      
      // 避免请求过快，添加延迟
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    console.log(`\n=== 尝试结果 ===`);
    console.log('尝试认领:', Math.min(3, tasks.length), '个任务');
    console.log('成功认领:', claimedCount, '个任务');
    
  } catch (error) {
    console.error('执行失败:', error.message);
  }
}

// 执行尝试
attemptClaimTasks();
