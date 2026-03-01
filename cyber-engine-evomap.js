/**
 * 赛博天工智能体 EvoMap 连接工具
 * 用于赛博天工智能体连接到 EvoMap 网络
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const EVOMAP_API = 'https://evomap.ai';
const CONFIG_FILE = path.join(__dirname, 'agents', 'production', 'evomap-config.json');

function loadConfig() {
  if (fs.existsSync(CONFIG_FILE)) {
    return JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
  }
  return {};
}

function saveConfig(config) {
  const configDir = path.dirname(CONFIG_FILE);
  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true });
  }
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
}

function generateMessageId() {
  return "msg_" + Date.now() + "_" + Math.floor(Math.random() * 10000);
}

function getTimestamp() {
  return new Date().toISOString();
}

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
 * 赛博天工智能体连接到 EvoMap
 */
async function connectCyberEngineToEvoMap() {
  console.log('🚀 赛博天工智能体连接到 EvoMap...');
  console.log('📣 【口号】赛博斯坦天工前来报道，人间大炮一级准备！');
  
  const config = loadConfig();
  
  if (!config.agent_id) {
    console.log('🔧 正在生成赛博天工专属节点ID...');
    const crypto = require('crypto');
    config.agent_id = "node_" + crypto.randomBytes(8).toString("hex");
    config.agent_name = "赛博天工";
    config.role = "production_engine";
    saveConfig(config);
    console.log(`✅ 赛博天工节点ID: ${config.agent_id}`);
  }
  
  console.log('\n📋 赛博天工智能体信息:');
  console.log(`   名称: ${config.agent_name || '赛博天工'}`);
  console.log(`   节点ID: ${config.agent_id}`);
  console.log(`   角色: ${config.role || 'production_engine'}`);
  console.log(`   账户: xiaxingxiaowei1983@gmail.com`);
  
  // 发送hello请求获取绑定信息
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
        agent_name: config.agent_name || "赛博天工",
        role: config.role || "production_engine",
        owner_email: "xiaxingxiaowei1983@gmail.com"
      }
    }
  };
  
  console.log('\n🔍 正在连接到 EvoMap 网络...');
  
  try {
    const response = await apiRequest('/a2a/hello', {
      method: 'POST',
      body: helloData
    });
    
    console.log(`\n✅ 响应状态码: ${response.statusCode}`);
    
    if (response.statusCode === 200 && response.data) {
      const data = response.data;
      
      // 尝试获取激活码
      let claimCode = data.claim_code || data.code;
      let claimUrl = data.claim_url || data.url;
      
      // 如果没有激活码，使用节点ID生成绑定链接
      if (!claimCode) {
        claimCode = config.agent_id;
        claimUrl = `https://evomap.ai/nodes?claim=${config.agent_id}`;
      }
      
      console.log('\n🎉 连接成功！');
      console.log('═════════════════════════════════════════════════════════');
      console.log('🔑 激活码/节点ID: ' + claimCode);
      console.log('🌐 绑定链接: ' + claimUrl);
      console.log('═════════════════════════════════════════════════════════');
      
      // 更新配置
      config.claim_code = claimCode;
      config.claim_url = claimUrl;
      config.your_node_id = data.your_node_id || config.agent_id;
      config.hub_node_id = data.hub_node_id;
      config.last_hello = getTimestamp();
      config.owner_email = "xiaxingxiaowei1983@gmail.com";
      config.connection_status = "connected";
      saveConfig(config);
      
      console.log('\n📌 绑定步骤:');
      console.log('1️⃣  点击上方绑定链接');
      console.log('2️⃣  登录您的 EvoMap 账户 (xiaxingxiaowei1983@gmail.com)');
      console.log('3️⃣  确认绑定赛博天工节点');
      
      console.log('\n💡 绑定后您将获得:');
      console.log('  • 500初始积分');
      console.log('  • 赛博天工节点状态变为"已绑定"');
      console.log('  • 可以发布技术资产和完成任务');
      console.log('  • 可以参与技术协作进化');
      
      console.log('\n🚀 快速操作:');
      console.log('   复制节点ID: ' + config.agent_id);
      console.log('   访问绑定链接: ' + claimUrl);
      
      // 显示网络信息
      if (data.network_manifest) {
        console.log('\n📊 EvoMap网络信息:');
        console.log(`   总节点数: ${data.network_manifest.stats?.total_agents}`);
        console.log(`   24小时活跃: ${data.network_manifest.stats?.active_24h}`);
        console.log(`   总资产数: ${data.network_manifest.stats?.total_assets}`);
      }
      
      console.log('\n✅ 赛博天工智能体已成功连接到 EvoMap 网络！');
      console.log('📣 【口号】赛博天工，技术无敌！');
      
    } else {
      console.log('\n❌ 连接失败');
      console.log('响应:', JSON.stringify(response.data, null, 2));
      console.log('\n📌 请手动访问 EvoMap 网站完成绑定:');
      console.log('   https://evomap.ai');
      console.log('   账户: xiaxingxiaowei1983@gmail.com');
      console.log('   节点ID: ' + config.agent_id);
    }
    
  } catch (error) {
    console.error('\n💥 连接失败:', error.message);
    console.log('\n📌 请手动访问 EvoMap 网站完成绑定:');
    console.log('   https://evomap.ai');
    console.log('   账户: xiaxingxiaowei1983@gmail.com');
    console.log('   节点ID: ' + config.agent_id);
  }
}

/**
 * 发送心跳包保持连接
 */
async function sendHeartbeat() {
  const config = loadConfig();
  
  if (!config.agent_id) {
    console.log('❌ 未找到节点ID，需要先连接');
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
      status: "online",
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
    
    if (response.statusCode === 200) {
      console.log('✅ 心跳包发送成功');
      config.last_heartbeat = getTimestamp();
      saveConfig(config);
    } else {
      console.log('❌ 心跳包发送失败:', response.statusCode);
    }
  } catch (error) {
    console.error('💥 心跳包发送失败:', error.message);
  }
}

async function main() {
  console.log('=== 赛博天工 EvoMap 连接工具 ===');
  console.log('📅 ' + new Date().toLocaleString());
  
  await connectCyberEngineToEvoMap();
  
  // 发送心跳包
  console.log('\n🔄 发送心跳包保持连接...');
  await sendHeartbeat();
  
  console.log('\n=== 操作完成 ===');
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { connectCyberEngineToEvoMap, sendHeartbeat };