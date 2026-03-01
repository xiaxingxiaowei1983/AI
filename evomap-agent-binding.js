/**
 * EvoMap代理绑定工具
 * 支持通过OpenClaw等AI代理绑定到EvoMap账户
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const EVOMAP_API = 'https://evomap.ai';
const CONFIG_FILE = path.join(__dirname, 'evolver', 'config.json');
const SKILL_URL = 'https://evomap.ai/skill.md';

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
 * 获取EvoMap skill.md内容
 */
async function fetchSkillMD() {
  console.log('📋 获取EvoMap skill.md...\n');
  
  return new Promise((resolve, reject) => {
    https.get(SKILL_URL, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve(data);
      });
    }).on('error', (error) => {
      reject(error);
    });
  });
}

/**
 * 生成绑定链接
 */
async function generateBindingLink() {
  console.log('=== EvoMap代理绑定工具 ===\n');
  
  const config = loadConfig();
  
  if (!config.agent_id) {
    console.log('❌ 未找到节点ID，正在生成新节点...');
    const crypto = require('crypto');
    config.agent_id = "node_" + crypto.randomBytes(8).toString("hex");
    config.agent_name = "大掌柜";
    config.role = "company_brain";
    saveConfig(config);
    console.log(`✅ 新节点ID: ${config.agent_id}\n`);
  }
  
  console.log(`📋 代理信息:`);
  console.log(`   名称: ${config.agent_name || '大掌柜'}`);
  console.log(`   节点ID: ${config.agent_id}`);
  console.log(`   账户: xiaxingxiaowei1983@gmail.com\n`);
  
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
        agent_name: config.agent_name || "大掌柜",
        role: config.role || "company_brain",
        owner_email: "xiaxingxiaowei1983@gmail.com"
      }
    }
  };
  
  console.log('🔍 正在获取绑定信息...\n');
  
  try {
    const response = await apiRequest('/a2a/hello', {
      method: 'POST',
      body: helloData
    });
    
    console.log(`✅ 响应状态码: ${response.statusCode}\n`);
    
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
      
      console.log('🎉 绑定信息获取成功！\n');
      console.log('═════════════════════════════════════════════════════════');
      console.log('🔑 激活码/节点ID: ' + claimCode);
      console.log('🌐 绑定链接: ' + claimUrl);
      console.log('═════════════════════════════════════════════════════════\n');
      
      // 更新配置
      config.claim_code = claimCode;
      config.claim_url = claimUrl;
      config.your_node_id = data.your_node_id || config.agent_id;
      config.hub_node_id = data.hub_node_id;
      config.last_hello = getTimestamp();
      config.owner_email = "xiaxingxiaowei1983@gmail.com";
      saveConfig(config);
      
      console.log('📌 绑定步骤:\n');
      console.log('方法一：点击绑定链接');
      console.log('  1️⃣  点击上方绑定链接');
      console.log('  2️⃣  登录您的EvoMap账户 (xiaxingxiaowei1983@gmail.com)');
      console.log('  3️⃣  确认绑定节点\n');
      
      console.log('方法二：手动绑定');
      console.log('  1️⃣  访问 https://evomap.ai');
      console.log('  2️⃣  登录您的账户 (xiaxingxiaowei1983@gmail.com)');
      console.log('  3️⃣  进入"我的节点"或"Agent Nodes"页面');
      console.log('  4️⃣  输入节点ID: ' + config.agent_id);
      console.log('  5️⃣  确认绑定\n');
      
      console.log('💡 绑定后您将获得:');
      console.log('  • 500初始积分');
      console.log('  • 节点状态变为"已绑定"');
      console.log('  • 可以发布资产和完成任务');
      console.log('  • 可以参与协作进化\n');
      
      console.log('🚀 快速操作:');
      console.log('   复制节点ID: ' + config.agent_id);
      console.log('   访问绑定链接: ' + claimUrl);
      
      // 显示网络信息
      if (data.network_manifest) {
        console.log('\n📊 EvoMap网络信息:');
        console.log(`   总节点数: ${data.network_manifest.stats?.total_agents}`);
        console.log(`   24小时活跃: ${data.network_manifest.stats?.active_24h}`);
        console.log(`   总资产数: ${data.network_manifest.stats?.total_assets}`);
      }
      
    } else {
      console.log('❌ 请求失败');
      console.log('响应:', JSON.stringify(response.data, null, 2));
    }
    
  } catch (error) {
    console.error('💥 请求失败:', error.message);
    console.log('\n📌 请手动访问EvoMap网站完成绑定:');
    console.log('   https://evomap.ai');
    console.log('   账户: xiaxingxiaowei1983@gmail.com');
    console.log('   节点ID: ' + config.agent_id);
  }
}

/**
 * 显示代理绑定说明
 */
function showBindingInstructions() {
  console.log('\n=== AI代理绑定说明 ===\n');
  
  console.log('📋 通过AI代理绑定的流程:\n');
  console.log('1️⃣  在AI代理中加载EvoMap skill.md');
  console.log('   - 代理会自动注册到EvoMap网络');
  console.log('   - 代理会收到一个激活码（格式：XXXX-XXXX）');
  console.log('   - 代理会发送激活链接给您\n');
  
  console.log('2️⃣  点击链接完成绑定');
  console.log('   - 访问代理发送的激活链接');
  console.log('   - 登录您的EvoMap账户');
  console.log('   - 确认绑定\n');
  
  console.log('📌 支持的AI代理:');
  console.log('   • OpenClaw');
  console.log('   • Manus');
  console.log('   • HappyCapy');
  console.log('   • 其他支持skill.md的AI代理\n');
  
  console.log('🔗 EvoMap skill.md:');
  console.log('   https://evomap.ai/skill.md\n');
}

async function main() {
  showBindingInstructions();
  await generateBindingLink();
  console.log('\n=== 操作完成 ===');
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { generateBindingLink, fetchSkillMD };
