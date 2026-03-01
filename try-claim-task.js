// 尝试使用不同API格式认领EvoMap任务
const fs = require('fs');
const path = require('path');
const https = require('https');

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
 * 尝试不同的任务认领格式
 */
async function tryClaimTask(taskId) {
  console.log(`📋 尝试认领任务: ${taskId}`);
  
  const config = loadConfig();
  const nodeId = config.agent_id || "node_122608";
  
  // 尝试格式1: 直接的task_id和node_id
  console.log('\n📌 尝试格式1: 直接的task_id和node_id');
  const format1Data = {
    task_id: taskId,
    node_id: nodeId
  };
  
  try {
    const response1 = await apiRequest('/task/claim', {
      method: 'POST',
      body: format1Data
    });
    
    console.log(`✅ 响应1状态码: ${response1.statusCode}`);
    console.log('响应1数据:', JSON.stringify(response1.data, null, 2));
  } catch (error) {
    console.error('❌ 格式1失败:', error.message);
  }
  
  // 尝试格式2: 包含bounty_id
  console.log('\n📌 尝试格式2: 包含bounty_id');
  const format2Data = {
    task_id: taskId,
    bounty_id: taskId,
    node_id: nodeId
  };
  
  try {
    const response2 = await apiRequest('/task/claim', {
      method: 'POST',
      body: format2Data
    });
    
    console.log(`✅ 响应2状态码: ${response2.statusCode}`);
    console.log('响应2数据:', JSON.stringify(response2.data, null, 2));
  } catch (error) {
    console.error('❌ 格式2失败:', error.message);
  }
  
  // 尝试格式3: 使用不同的端点
  console.log('\n📌 尝试格式3: 使用不同的端点');
  try {
    const response3 = await apiRequest(`/task/claim?task_id=${taskId}&node_id=${nodeId}`, {
      method: 'GET'
    });
    
    console.log(`✅ 响应3状态码: ${response3.statusCode}`);
    console.log('响应3数据:', JSON.stringify(response3.data, null, 2));
  } catch (error) {
    console.error('❌ 格式3失败:', error.message);
  }
  
  // 尝试格式4: 使用a2a协议
  console.log('\n📌 尝试格式4: 使用a2a协议');
  const format4Data = {
    protocol: "gep-a2a",
    protocol_version: "1.0.0",
    message_type: "claim",
    message_id: "msg_" + Date.now() + "_" + Math.floor(Math.random() * 10000),
    sender_id: nodeId,
    timestamp: new Date().toISOString(),
    payload: {
      task_id: taskId
    }
  };
  
  try {
    const response4 = await apiRequest('/a2a/claim', {
      method: 'POST',
      body: format4Data
    });
    
    console.log(`✅ 响应4状态码: ${response4.statusCode}`);
    console.log('响应4数据:', JSON.stringify(response4.data, null, 2));
  } catch (error) {
    console.error('❌ 格式4失败:', error.message);
  }
}

/**
 * 主函数
 */
async function main() {
  console.log('========================================');
  console.log('🔍 尝试不同方式认领EvoMap任务');
  console.log('========================================');
  console.log(`📅 执行时间: ${new Date().toISOString()}`);
  
  // 尝试认领第一个任务
  const taskId = "cmm0ywnia1s3vpn2p2g36knhu";
  await tryClaimTask(taskId);
  
  console.log('\n========================================');
  console.log('🔍 任务认领尝试完成');
  console.log('========================================');
}

// 执行
if (require.main === module) {
  main()
    .then(() => {
      console.log('\n✅ 任务认领尝试完成！');
    })
    .catch(error => {
      console.error('\n💥 执行失败:', error.message);
      process.exit(1);
    });
}
