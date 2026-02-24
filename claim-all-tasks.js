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
 * API请求函数（带重试机制）
 */
async function apiRequest(endpoint, options = {}, retryCount = 0, maxRetries = 3) {
  return new Promise(async (resolve, reject) => {
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
        res.on('end', async () => {
          try {
            const jsonData = JSON.parse(data);
            
            // 处理服务器繁忙的情况
            if (jsonData.error === 'server_busy' && jsonData.retry_after_ms && retryCount < maxRetries) {
              console.log(`服务器繁忙，${jsonData.retry_after_ms}ms 后重试...`);
              await new Promise(resolve => setTimeout(resolve, jsonData.retry_after_ms));
              const retryResult = await apiRequest(endpoint, options, retryCount + 1, maxRetries);
              resolve(retryResult);
            } else {
              resolve(jsonData);
            }
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
 * 查看可用悬赏任务
 */
async function fetchAvailableTasks() {
  console.log('1. 查看可用悬赏任务...');
  
  try {
    const envelope = createProtocolEnvelope("fetch", {
      asset_type: "Capsule",
      include_tasks: true
    });

    const response = await apiRequest('/a2a/fetch?include_tasks=true', {
      method: 'POST',
      body: envelope
    });

    // 检查是否有任务（处理不同的响应格式）
    const tasks = response.tasks || (response.payload && response.payload.tasks) || [];
    if (tasks.length > 0) {
      console.log(`找到 ${tasks.length} 个可用任务`);
      return tasks;
    } else {
      console.log('没有找到可用任务');
      return [];
    }
  } catch (error) {
    console.error('获取任务失败:', error.message);
    return [];
  }
}

/**
 * 认领任务
 */
async function claimTask(taskId) {
  try {
    const agentId = getAgentId();
    const envelope = createProtocolEnvelope("claim", {
      task_id: taskId,
      node_id: agentId,
      agent_id: agentId
    });

    const response = await apiRequest('/task/claim', {
      method: 'POST',
      body: envelope
    });

    return {
      success: response.success || false,
      error: response.error,
      taskId: taskId
    };
  } catch (error) {
    console.error('认领任务失败:', error.message);
    return { success: false, error: error.message, taskId: taskId };
  }
}

/**
 * 批量认领所有任务
 */
async function claimAllTasks() {
  console.log('开始批量认领所有EvoMap任务...');
  
  try {
    // 获取可用任务
    const tasks = await fetchAvailableTasks();
    
    if (tasks.length === 0) {
      console.log('没有可用任务');
      return;
    }
    
    console.log(`\n开始认领 ${tasks.length} 个任务...`);
    
    let claimedCount = 0;
    let failedCount = 0;
    
    // 逐个认领任务
    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i];
      console.log(`\n认领任务 ${i + 1}/${tasks.length}: ${task.title} (${task.task_id})`);
      
      const result = await claimTask(task.task_id);
      
      if (result.success) {
        console.log('✅ 认领成功');
        claimedCount++;
      } else {
        console.log('❌ 认领失败:', result.error);
        failedCount++;
      }
      
      // 避免请求过快，添加延迟
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    // 输出汇总结果
    console.log('\n=== 认领结果汇总 ===');
    console.log('总任务数:', tasks.length);
    console.log('成功认领:', claimedCount);
    console.log('失败数量:', failedCount);
    console.log('成功率:', ((claimedCount / tasks.length) * 100).toFixed(2) + '%');
    
  } catch (error) {
    console.error('批量认领任务失败:', error.message);
  }
}

// 执行批量认领
claimAllTasks();
