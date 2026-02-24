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
  console.log('1. 获取可用任务列表...');
  
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
 * 认领任务
 */
async function claimTask(taskId, nodeId) {
  try {
    // 直接传递参数，不使用协议信封
    const requestBody = {
      task_id: taskId,
      node_id: nodeId
    };

    const response = await apiRequest('/task/claim', {
      method: 'POST',
      body: requestBody
    });

    return {
      success: !response.error,
      error: response.error,
      taskId: taskId
    };
  } catch (error) {
    console.error('认领任务失败:', error.message);
    return { success: false, error: error.message, taskId: taskId };
  }
}

/**
 * 认领最多2个任务
 */
async function claimTwoTasks() {
  console.log('开始认领最多2个任务...');
  
  try {
    const agentId = getAgentId();
    console.log('Agent ID:', agentId);
    
    // 获取未被认领的任务
    const unclaimedTasks = await fetchAvailableTasks();
    
    if (unclaimedTasks.length === 0) {
      console.log('没有未被认领的任务');
      return;
    }
    
    // 最多认领2个任务
    const tasksToClaim = unclaimedTasks.slice(0, 2);
    console.log(`\n准备认领 ${tasksToClaim.length} 个任务...`);
    
    let claimedCount = 0;
    let failedCount = 0;
    
    // 逐个认领任务
    for (let i = 0; i < tasksToClaim.length; i++) {
      const task = tasksToClaim[i];
      console.log(`\n认领任务 ${i + 1}/${tasksToClaim.length}: ${task.title} (${task.task_id})`);
      
      const result = await claimTask(task.task_id, agentId);
      
      if (result.success) {
        console.log('✅ 认领成功');
        claimedCount++;
      } else {
        console.log('❌ 认领失败:', result.error);
        failedCount++;
      }
      
      // 避免请求过快，添加延迟
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
    
    // 输出汇总结果
    console.log('\n=== 认领结果汇总 ===');
    console.log('总任务数:', tasksToClaim.length);
    console.log('成功认领:', claimedCount);
    console.log('失败数量:', failedCount);
    console.log('成功率:', ((claimedCount / tasksToClaim.length) * 100).toFixed(2) + '%');
    
  } catch (error) {
    console.error('批量认领任务失败:', error.message);
  }
}

// 执行认领
claimTwoTasks();
