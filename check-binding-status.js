/**
 * 检查节点绑定状态并获取激活码
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

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
 * 保存配置
 */
function saveConfig(config) {
  const configDir = path.dirname(CONFIG_FILE);
  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true });
  }
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
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
 * 检查节点状态并获取激活码
 */
async function checkNodeStatus() {
  console.log('=== 检查节点绑定状态 ===\n');
  
  const config = loadConfig();
  
  if (!config.agent_id) {
    console.log('❌ 未找到节点ID，请先注册节点');
    return;
  }
  
  console.log(`📋 当前节点: ${config.agent_name || '未命名'}`);
  console.log(`🆔 节点ID: ${config.agent_id}`);
  console.log(`📅 注册时间: ${config.registered_at || '未知'}`);
  console.log(`\n🔍 检查绑定状态...`);
  
  // 构造hello请求获取绑定信息
  const helloData = {
    protocol: "gep-a2a",
    protocol_version: "1.0.0",
    message_type: "hello",
    message_id: generateMessageId(),
    sender_id: config.agent_id,
    timestamp: getTimestamp(),
    payload: {
      capabilities: {
        assetFetch: true,
        taskClaim: true,
        assetPublish: true,
        sessionCollaboration: true
      },
      gene_count: 0,
      capsule_count: 0,
      env_fingerprint: {
        platform: process.platform,
        arch: process.arch,
        node_version: process.version,
        agent_name: config.agent_name || "大掌柜",
        role: config.role || "company_brain"
      }
    }
  };
  
  console.log('📋 发送hello请求获取激活码...');
  
  try {
    const response = await apiRequest('/a2a/hello', {
      method: 'POST',
      body: helloData
    });
    
    console.log(`\n✅ 响应状态码: ${response.statusCode}`);
    
    if (response.statusCode === 200 && response.data) {
      console.log('\n🎉 请求成功！');
      console.log('\n📊 响应数据:');
      console.log(JSON.stringify(response.data, null, 2));
      
      // 检查是否有激活码
      if (response.data.claim_code && response.data.claim_url) {
        console.log('\n✅ 找到激活码！');
        console.log(`\n🔑 激活码: ${response.data.claim_code}`);
        console.log(`🌐 激活链接: ${response.data.claim_url}`);
        
        // 更新配置
        config.claim_code = response.data.claim_code;
        config.claim_url = response.data.claim_url;
        config.your_node_id = response.data.your_node_id;
        config.hub_node_id = response.data.hub_node_id;
        config.last_hello = getTimestamp();
        
        saveConfig(config);
        console.log('\n💾 配置已更新');
        
        console.log('\n📌 绑定说明:');
        console.log('1. 复制激活码: ' + response.data.claim_code);
        console.log('2. 访问激活链接: ' + response.data.claim_url);
        console.log('3. 登录EvoMap账户');
        console.log('4. 输入激活码完成绑定');
        console.log('\n5. 绑定后，节点将获得500初始积分');
        console.log('6. 节点状态将变为"已绑定"');
        
      } else {
        console.log('\n⚠️  未找到激活码');
        console.log('可能的原因:');
        console.log('1. 节点已经绑定');
        console.log('2. 响应格式变化');
        console.log('3. EvoMap平台调整');
      }
      
      // 检查其他重要信息
      if (response.data.credit_balance) {
        console.log(`\n💰 当前积分: ${response.data.credit_balance}`);
      }
      
      if (response.data.status) {
        console.log(`\n📊 节点状态: ${response.data.status}`);
      }
      
      if (response.data.network_manifest) {
        console.log(`\n🌐 网络信息: ${response.data.network_manifest.name}`);
        console.log(`📈 总节点数: ${response.data.network_manifest.stats?.total_agents}`);
      }
      
    } else {
      console.log('\n❌ 请求失败');
      console.log('响应:', JSON.stringify(response.data, null, 2));
    }
    
  } catch (error) {
    console.error('\n💥 请求失败:', error.message);
  }
}

/**
 * 发送心跳包保持节点在线
 */
async function sendHeartbeat() {
  console.log('\n=== 发送心跳包 ===');
  
  const config = loadConfig();
  
  if (!config.agent_id) {
    console.log('❌ 未找到节点ID');
    return;
  }
  
  const heartbeatData = {
    protocol: "gep-a2a",
    protocol_version: "1.0.0",
    message_type: "heartbeat",
    message_id: generateMessageId(),
    sender_id: config.agent_id,
    timestamp: getTimestamp(),
    payload: {
      status: "active",
      uptime: process.uptime(),
      resources: {
        memory: process.memoryUsage(),
        cpu: process.cpuUsage()
      }
    }
  };
  
  try {
    const response = await apiRequest('/a2a/heartbeat', {
      method: 'POST',
      body: heartbeatData
    });
    
    console.log(`✅ 心跳响应: ${response.statusCode}`);
    
    if (response.statusCode === 200) {
      console.log('🎉 心跳成功，节点保持在线');
      config.last_heartbeat = getTimestamp();
      saveConfig(config);
    }
    
  } catch (error) {
    console.error('💥 心跳失败:', error.message);
  }
}

// 主函数
async function main() {
  await checkNodeStatus();
  await sendHeartbeat();
  
  console.log('\n=== 操作完成 ===');
  console.log('\n📌 后续步骤:');
  console.log('1. 如果获得激活码，点击链接完成绑定');
  console.log('2. 绑定后节点将获得500初始积分');
  console.log('3. 可以开始发布资产和完成任务');
  console.log('4. 定期发送心跳包保持节点在线');
}

// 执行
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { checkNodeStatus, sendHeartbeat };
