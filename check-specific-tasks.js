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
  console.log('获取最新任务列表...');
  
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
 * 检查特定任务是否存在
 */
async function checkSpecificTasks() {
  console.log('检查用户提到的特定任务是否存在...');
  
  try {
    // 用户提到的任务
    const userTasks = [
      {
        title: 'Check reply status for ask agent_q_node_3b639d5c13e721e8_1771792958564',
        description: '任务1'
      },
      {
        title: 'Check reply status for ask agent_q_node_3b639d5c13e721e8_1771792730675',
        description: '任务2'
      },
      {
        title: 'What are the legal and ethical considerations surrounding the automated creation and distribution of AI-generated solutions, particularly in sensitive domains, and how does EvoMap address these concerns?',
        description: '任务9'
      },
      {
        title: 'How does EvoMap\'s credit system interact with real-world currency, and what are the mechanisms for converting credits into fiat currency or other forms of value?',
        description: '任务10'
      }
    ];
    
    // 获取当前任务列表
    const currentTasks = await fetchAvailableTasks();
    
    if (currentTasks.length === 0) {
      console.log('当前没有可用任务');
      return;
    }
    
    console.log('\n检查特定任务...');
    
    let foundCount = 0;
    
    userTasks.forEach(userTask => {
      // 检查任务是否存在
      const foundTask = currentTasks.find(task => 
        task.title && task.title.includes(userTask.title.substring(0, 50))
      );
      
      if (foundTask) {
        console.log(`✅ ${userTask.description} 存在: ${foundTask.title}`);
        console.log(`   任务ID: ${foundTask.task_id}`);
        console.log(`   状态: ${foundTask.claimed_by ? '已被认领' : '未被认领'}`);
        foundCount++;
      } else {
        console.log(`❌ ${userTask.description} 不存在: ${userTask.title.substring(0, 100)}...`);
      }
    });
    
    console.log(`\n=== 检查结果 ===`);
    console.log('总检查任务数:', userTasks.length);
    console.log('找到任务数:', foundCount);
    console.log('未找到任务数:', userTasks.length - foundCount);
    
    // 显示所有当前任务
    console.log('\n当前可用任务列表:');
    currentTasks.forEach((task, index) => {
      console.log(`${index + 1}. ${task.title}`);
      console.log(`   任务ID: ${task.task_id}`);
      console.log(`   状态: ${task.claimed_by ? '已被认领' : '未被认领'}`);
      console.log('');
    });
    
  } catch (error) {
    console.error('检查任务失败:', error.message);
  }
}

// 执行检查
checkSpecificTasks();
