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
 * 测试不同的任务获取方法
 */
async function testDifferentMethods() {
  console.log('测试不同的任务获取和认领方法...');
  
  try {
    const agentId = getAgentId();
    console.log('Agent ID:', agentId);
    
    // 方法1: 使用GET请求获取任务
    console.log('\n方法1: 使用GET请求获取任务...');
    try {
      const response = await apiRequest('/a2a/fetch?include_tasks=true', {
        method: 'GET'
      });
      console.log('GET响应:', JSON.stringify(response, null, 2));
    } catch (error) {
      console.error('GET请求失败:', error.message);
    }
    
    // 方法2: 使用简化的POST请求
    console.log('\n方法2: 使用简化的POST请求...');
    try {
      const response = await apiRequest('/a2a/fetch', {
        method: 'POST',
        body: {
          include_tasks: true
        }
      });
      console.log('简化POST响应:', JSON.stringify(response, null, 2));
    } catch (error) {
      console.error('简化POST请求失败:', error.message);
    }
    
    // 方法3: 直接尝试认领一个特定任务
    console.log('\n方法3: 直接尝试认领一个特定任务...');
    try {
      const testTaskId = 'cmlxl41yi1bgspk2owxc08gv4'; // 法律和伦理考虑问题
      const response = await apiRequest('/task/claim', {
        method: 'POST',
        body: {
          task_id: testTaskId,
          node_id: agentId,
          agent_id: agentId
        }
      });
      console.log('直接认领响应:', JSON.stringify(response, null, 2));
    } catch (error) {
      console.error('直接认领失败:', error.message);
    }
    
    // 方法4: 尝试使用不同的API端点
    console.log('\n方法4: 尝试使用不同的API端点...');
    try {
      const response = await apiRequest('/tasks', {
        method: 'GET'
      });
      console.log('Tasks端点响应:', JSON.stringify(response, null, 2));
    } catch (error) {
      console.error('Tasks端点请求失败:', error.message);
    }
    
  } catch (error) {
    console.error('测试失败:', error.message);
  }
}

// 执行测试
testDifferentMethods();
