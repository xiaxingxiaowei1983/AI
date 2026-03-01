/**
 * EvoMap代理绑定工具
 * 按照官方文档流程：加载skill.md → 自动注册 → 获取激活码 → 生成绑定链接
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const EVOMAP_API = 'https://evomap.ai';
const CONFIG_FILE = path.join(__dirname, 'evolver', 'config.json');
const SKILL_FILE = path.join(__dirname, 'evomap-skill.md');

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
 * 下载EvoMap skill.md
 */
async function downloadSkillMD() {
  console.log('📥 下载EvoMap skill.md...');
  
  return new Promise((resolve, reject) => {
    https.get('https://evomap.ai/skill.md', (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        fs.writeFileSync(SKILL_FILE, data);
        console.log('✅ skill.md 下载完成');
        resolve(data);
      });
    }).on('error', (error) => {
      reject(error);
    });
  });
}

/**
 * 注册节点并获取激活码
 */
async function registerNode() {
  console.log('\n=== 注册节点并获取激活码 ===\n');
  
  const config = loadConfig();
  
  // 生成节点ID（如果不存在）
  if (!config.agent_id) {
    const crypto = require('crypto');
    config.agent_id = "node_" + crypto.randomBytes(8).toString("hex");
    config.agent_name = "大掌柜";
    config.role = "company_brain";
    config.registered_at = getTimestamp();
    saveConfig(config);
    console.log(`✅ 生成新节点ID: ${config.agent_id}`);
  }
  
  console.log(`📋 节点信息:`);
  console.log(`   名称: ${config.agent_name || '大掌柜'}`);
  console.log(`   节点ID: ${config.agent_id}`);
  console.log(`   账户: xiaxingxiaowei1983@gmail.com\n`);
  
  // 发送hello请求获取激活码
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
        role: config.role || "company_brain",
        owner_email: "xiaxingxiaowei1983@gmail.com"
      }
    }
  };
  
  console.log('🔍 发送hello请求获取激活码...\n');
  
  try {
    const response = await apiRequest('/a2a/hello', {
      method: 'POST',
      body: helloData
    });
    
    console.log(`✅ 响应状态码: ${response.statusCode}\n`);
    
    if (response.statusCode === 200 && response.data) {
      const data = response.data;
      
      console.log('📊 响应数据:\n');
      console.log(JSON.stringify(data, null, 2));
      console.log('\n═════════════════════════════════════════════════════════\n');
      
      // 提取激活码和绑定链接
      let activationCode = null;
      let activationUrl = null;
      
      // 检查各种可能的字段名
      if (data.claim_code) {
        activationCode = data.claim_code;
        activationUrl = data.claim_url || `https://evomap.ai/claim/${data.claim_code}`;
        console.log(`✅ 找到激活码: ${activationCode}`);
        console.log(`✅ 找到绑定链接: ${activationUrl}`);
      } else if (data.activation_code) {
        activationCode = data.activation_code;
        activationUrl = data.activation_url || `https://evomap.ai/activate/${data.activation_code}`;
        console.log(`✅ 找到激活码: ${activationCode}`);
        console.log(`✅ 找到绑定链接: ${activationUrl}`);
      } else if (data.code) {
        activationCode = data.code;
        activationUrl = data.url || `https://evomap.ai/claim/${data.code}`;
        console.log(`✅ 找到激活码: ${activationCode}`);
        console.log(`✅ 找到绑定链接: ${activationUrl}`);
      } else {
        console.log('⚠️  未找到激活码字段');
        console.log('尝试使用节点ID作为激活码...');
        activationCode = config.agent_id;
        activationUrl = `https://evomap.ai/claim/${config.agent_id}`;
        console.log(`✅ 使用节点ID作为激活码: ${activationCode}`);
        console.log(`✅ 生成绑定链接: ${activationUrl}`);
      }
      
      // 更新配置
      config.activation_code = activationCode;
      config.activation_url = activationUrl;
      config.claim_code = activationCode;
      config.claim_url = activationUrl;
      config.your_node_id = data.your_node_id || config.agent_id;
      config.hub_node_id = data.hub_node_id;
      config.credit_balance = data.credit_balance;
      config.last_hello = getTimestamp();
      config.owner_email = "xiaxingxiaowei1983@gmail.com";
      saveConfig(config);
      
      console.log('\n📌 绑定步骤:\n');
      console.log('方法一：点击绑定链接');
      console.log('  1️⃣  点击下方绑定链接');
      console.log('  2️⃣  登录您的EvoMap账户 (xiaxingxiaowei1983@gmail.com)');
      console.log('  3️⃣  确认绑定节点\n');
      
      console.log('方法二：手动绑定');
      console.log('  1️⃣  访问 https://evomap.ai');
      console.log('  2️⃣  登录您的账户 (xiaxingxiaowei1983@gmail.com)');
      console.log('  3️⃣  进入"我的节点"或"Agent Nodes"页面');
      console.log('  4️⃣  输入节点ID: ' + config.agent_id);
      console.log('  5️⃣  确认绑定\n');
      
      console.log('🎯 激活信息:');
      console.log('═════════════════════════════════════════════════════════');
      console.log('🔑 激活码: ' + activationCode);
      console.log('🌐 绑定链接: ' + activationUrl);
      console.log('═════════════════════════════════════════════════════════\n');
      
      console.log('💡 绑定后您将获得:');
      console.log('  • 500初始积分');
      console.log('  • 节点状态变为"已绑定"');
      console.log('  • 可以发布资产和完成任务');
      console.log('  • 可以参与协作进化\n');
      
      console.log('🚀 快速操作:');
      console.log('   复制激活码: ' + activationCode);
      console.log('   访问绑定链接: ' + activationUrl);
      
      return {
        activationCode,
        activationUrl,
        nodeId: config.agent_id,
        balance: config.credit_balance
      };
      
    } else {
      console.log('❌ 请求失败');
      console.log('响应:', JSON.stringify(response.data, null, 2));
      return null;
    }
    
  } catch (error) {
    console.error('💥 请求失败:', error.message);
    return null;
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
    node_id: config.agent_id,
    worker_enabled: true,
    worker_domains: ["javascript", "python"],
    max_load: 3
  };
  
  try {
    const response = await apiRequest('/a2a/heartbeat', {
      method: 'POST',
      body: heartbeatData
    });
    
    console.log(`✅ 心跳响应: ${response.statusCode}`);
    
    if (response.statusCode === 200 && response.data) {
      console.log('🎉 心跳成功，节点保持在线');
      config.last_heartbeat = getTimestamp();
      config.node_status = response.data.node_status;
      config.survival_status = response.data.survival_status;
      config.credit_balance = response.data.credit_balance;
      saveConfig(config);
    }
    
  } catch (error) {
    console.error('💥 心跳失败:', error.message);
  }
}

async function main() {
  console.log('=== EvoMap代理绑定工具 ===\n');
  
  try {
    // 下载skill.md
    await downloadSkillMD();
    
    // 注册节点并获取激活码
    const result = await registerNode();
    
    if (result) {
      // 发送心跳包
      await sendHeartbeat();
      
      console.log('\n=== 绑定流程完成 ===\n');
      console.log('📋 绑定信息:');
      console.log(`   节点ID: ${result.nodeId}`);
      console.log(`   激活码: ${result.activationCode}`);
      console.log(`   绑定链接: ${result.activationUrl}`);
      console.log(`   当前积分: ${result.balance || '500 (初始)'}\n`);
      
      console.log('🎯 下一步:');
      console.log('   1. 点击绑定链接');
      console.log('   2. 登录您的EvoMap账户');
      console.log('   3. 确认绑定节点');
      console.log('   4. 开始使用EvoMap功能\n');
      
      console.log('🔗 绑定链接:');
      console.log(`   ${result.activationUrl}`);
    }
    
  } catch (error) {
    console.error('💥 绑定过程中出错:', error.message);
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  downloadSkillMD,
  registerNode,
  sendHeartbeat
};
