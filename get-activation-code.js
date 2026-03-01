/**
 * 获取节点激活码并生成绑定链接
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const EVOMAP_API = 'https://evomap.ai';
const CONFIG_FILE = path.join(__dirname, 'evolver', 'config.json');

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

async function getActivationCode() {
  console.log('=== 获取节点激活码 ===\n');
  
  const config = loadConfig();
  
  if (!config.agent_id) {
    console.log('❌ 未找到节点ID，请先注册节点');
    return;
  }
  
  console.log(`📋 节点名称: ${config.agent_name || '大掌柜'}`);
  console.log(`🆔 节点ID: ${config.agent_id}`);
  console.log(`📧 账户邮箱: xiaxingxiaowei1983@gmail.com`);
  console.log(`\n🔍 正在获取激活码...`);
  
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
  
  try {
    const response = await apiRequest('/a2a/hello', {
      method: 'POST',
      body: helloData
    });
    
    console.log(`\n✅ 响应状态码: ${response.statusCode}`);
    
    if (response.statusCode === 200 && response.data) {
      const data = response.data;
      
      // 检查是否有激活码
      let claimCode = data.claim_code || data.code;
      let claimUrl = data.claim_url || data.url;
      
      // 如果没有返回激活码，尝试从其他字段获取
      if (!claimCode && data.your_node_id) {
        claimCode = data.your_node_id;
        claimUrl = `https://evomap.ai/claim/${data.your_node_id}`;
      }
      
      if (claimCode) {
        console.log('\n🎉 成功获取激活码！');
        console.log(`\n🔑 激活码: ${claimCode}`);
        console.log(`🌐 激活链接: ${claimUrl || `https://evomap.ai/claim/${claimCode}`}`);
        
        // 更新配置
        config.claim_code = claimCode;
        config.claim_url = claimUrl || `https://evomap.ai/claim/${claimCode}`;
        config.your_node_id = data.your_node_id || config.agent_id;
        config.hub_node_id = data.hub_node_id;
        config.last_hello = getTimestamp();
        config.owner_email = "xiaxingxiaowei1983@gmail.com";
        
        saveConfig(config);
        console.log('\n💾 配置已更新');
        
        console.log('\n📌 绑定步骤:');
        console.log('═════════════════════════════════════════════════════════');
        console.log('1️⃣  复制激活码: ' + claimCode);
        console.log('2️⃣  访问激活链接: ' + (claimUrl || `https://evomap.ai/claim/${claimCode}`));
        console.log('3️⃣  登录您的EvoMap账户 (xiaxingxiaowei1983@gmail.com)');
        console.log('4️⃣  输入激活码完成绑定');
        console.log('5️⃣  绑定后节点将获得500初始积分');
        console.log('═════════════════════════════════════════════════════════');
        
        console.log('\n💡 绑定后您将获得:');
        console.log('  • 500初始积分');
        console.log('  • 节点状态变为"已绑定"');
        console.log('  • 可以发布资产和完成任务');
        console.log('  • 可以赚取更多积分和奖励');
        
        console.log('\n🚀 快速绑定链接:');
        console.log(`   ${claimUrl || `https://evomap.ai/claim/${claimCode}`}`);
        
      } else {
        console.log('\n⚠️  未找到激活码');
        console.log('\n可能的原因:');
        console.log('1. 节点已经绑定到账户');
        console.log('2. 需要手动访问EvoMap网站绑定');
        console.log('3. 响应格式变化');
        
        console.log('\n📌 手动绑定步骤:');
        console.log('═════════════════════════════════════════════════════════');
        console.log('1️⃣  访问 EvoMap 网站: https://evomap.ai');
        console.log('2️⃣  登录您的账户 (xiaxingxiaowei1983@gmail.com)');
        console.log('3️⃣  进入节点管理或设置页面');
        console.log('4️⃣  输入节点ID: ' + config.agent_id);
        console.log('5️⃣  完成绑定');
        console.log('═════════════════════════════════════════════════════════');
        
        console.log('\n🔗 直接访问EvoMap:');
        console.log('   https://evomap.ai');
      }
      
      if (data.credit_balance) {
        console.log(`\n💰 当前积分: ${data.credit_balance}`);
      }
      
      if (data.status) {
        console.log(`\n📊 节点状态: ${data.status}`);
      }
      
    } else {
      console.log('\n❌ 请求失败');
      console.log('响应:', JSON.stringify(response.data, null, 2));
    }
    
  } catch (error) {
    console.error('\n💥 请求失败:', error.message);
    console.log('\n📌 请手动访问EvoMap网站完成绑定:');
    console.log('   https://evomap.ai');
    console.log('   账户: xiaxingxiaowei1983@gmail.com');
  }
}

async function main() {
  await getActivationCode();
  console.log('\n=== 操作完成 ===');
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { getActivationCode };
