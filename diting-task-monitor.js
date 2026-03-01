const https = require('https');
const fs = require('fs');
const path = require('path');

console.log('=== 谛听任务监控服务启动 ===\n');

// 配置参数
const configPath = path.join(__dirname, 'agents', 'business', 'evomap-config.json');
const taskCheckInterval = 5 * 60 * 1000; // 5分钟检查一次任务

// 读取配置
function loadConfig() {
  return JSON.parse(fs.readFileSync(configPath, 'utf8'));
}

// 保存配置
function saveConfig(config) {
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
}

/**
 * 生成消息ID
 */
function generateMessageId() {
  return "msg_" + Date.now() + "_" + Math.floor(Math.random() * 10000);
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
  const config = loadConfig();
  return {
    protocol: "gep-a2a",
    protocol_version: "1.0.0",
    message_type: messageType,
    message_id: generateMessageId(),
    sender_id: config.node_id,
    timestamp: getTimestamp(),
    payload: payload
  };
}

/**
 * EvoMap API请求
 */
async function evomapApiRequest(endpoint, options = {}) {
  return new Promise((resolve, reject) => {
    try {
      const url = `https://evomap.ai${endpoint}`;
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
            resolve({ statusCode: res.statusCode, data: jsonData });
          } catch (error) {
            resolve({ statusCode: res.statusCode, data: data });
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
 * 获取EvoMap任务
 */
async function getEvoMapTasks() {
  console.log(`[${new Date().toISOString()}] 检查EvoMap任务...`);
  
  try {
    const taskEnvelope = createProtocolEnvelope("fetch", {
      include_tasks: true,
      task_types: ["evolution", "learning", "optimization"]
    });
    
    const response = await evomapApiRequest('/a2a/fetch', {
      method: 'POST',
      body: taskEnvelope
    });
    
    if (response.statusCode === 200 && response.data) {
      console.log(`[${new Date().toISOString()}] 任务获取成功！`);
      return response.data.payload;
    } else {
      console.log(`[${new Date().toISOString()}] 任务获取失败:`, response.statusCode);
      return null;
    }
  } catch (error) {
    console.error(`[${new Date().toISOString()}] 获取任务时出错:`, error.message);
    return null;
  }
}

/**
 * 分析任务
 */
function analyzeTasks(payload) {
  if (!payload || !payload.recommended_tasks) {
    console.log(`[${new Date().toISOString()}] 没有推荐任务`);
    return [];
  }
  
  console.log(`[${new Date().toISOString()}] 发现 ${payload.recommended_tasks.length} 个推荐任务:`);
  
  const suitableTasks = [];
  
  payload.recommended_tasks.forEach((task, index) => {
    console.log(`   ${index + 1}. ${task.title.substring(0, 100)}${task.title.length > 100 ? '...' : ''}`);
    console.log(`     信号: ${task.signals}`);
    console.log(`     相关性: ${(task.relevance * 100).toFixed(1)}%`);
    console.log(`     截止时间: ${new Date(task.expires_at).toLocaleString()}`);
    
    // 筛选适合谛听智能体的任务
    if (task.relevance > 0.5 && task.signals.includes('evolution')) {
      suitableTasks.push(task);
      console.log(`     ✅ 适合执行`);
    }
    console.log('');
  });
  
  return suitableTasks;
}

/**
 * 执行任务
 */
async function executeTask(task) {
  console.log(`[${new Date().toISOString()}] 执行任务: ${task.title.substring(0, 100)}...`);
  
  try {
    // 这里可以根据任务类型执行不同的处理逻辑
    // 例如：进化任务、学习任务、优化任务等
    
    // 模拟任务执行
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log(`[${new Date().toISOString()}] 任务执行完成！`);
    
    // 这里可以添加任务结果提交逻辑
    // await submitTaskResult(task.task_id, result);
    
    return true;
  } catch (error) {
    console.error(`[${new Date().toISOString()}] 任务执行失败:`, error.message);
    return false;
  }
}

/**
 * 检查并执行任务
 */
async function checkAndExecuteTasks() {
  try {
    const payload = await getEvoMapTasks();
    if (!payload) return;
    
    const suitableTasks = analyzeTasks(payload);
    
    for (const task of suitableTasks) {
      await executeTask(task);
    }
  } catch (error) {
    console.error(`[${new Date().toISOString()}] 任务检查执行失败:`, error.message);
  }
}

/**
 * 启动任务监控服务
 */
async function startTaskMonitor() {
  console.log('=== 谛听任务监控服务初始化 ===');
  console.log(`任务检查间隔: ${taskCheckInterval / 1000 / 60} 分钟`);
  console.log('');
  
  // 首次检查任务
  await checkAndExecuteTasks();
  
  // 定期检查任务
  setInterval(checkAndExecuteTasks, taskCheckInterval);
  
  console.log('=== 任务监控服务已启动 ===');
  console.log('谛听将每5分钟检查一次EvoMap上的进化任务！');
  console.log('');
}

// 启动服务
startTaskMonitor();