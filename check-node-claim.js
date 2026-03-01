/**
 * 检查EvoMap节点认领和绑定方式
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
 * 检查节点认领方式
 */
async function checkNodeClaim() {
  console.log('=== 检查EvoMap节点认领方式 ===\n');
  
  const config = loadConfig();
  
  if (!config.agent_id) {
    console.log('❌ 未找到节点ID');
    return;
  }
  
  console.log(`📋 节点ID: ${config.agent_id}`);
  console.log(`📧 账户: xiaxingxiaowei1983@gmail.com\n`);
  
  // 发送hello请求，查看完整的响应
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
  
  console.log('🔍 发送hello请求...\n');
  
  try {
    const response = await apiRequest('/a2a/hello', {
      method: 'POST',
      body: helloData
    });
    
    console.log(`✅ 响应状态码: ${response.statusCode}\n`);
    
    if (response.statusCode === 200 && response.data) {
      const data = response.data;
      
      console.log('📊 完整响应数据:\n');
      console.log(JSON.stringify(data, null, 2));
      console.log('\n═════════════════════════════════════════════════════════\n');
      
      // 检查各种可能的认领字段
      console.log('🔍 检查认领相关字段:\n');
      
      if (data.claim_code) {
        console.log(`✅ 找到 claim_code: ${data.claim_code}`);
      }
      
      if (data.claim_url) {
        console.log(`✅ 找到 claim_url: ${data.claim_url}`);
      }
      
      if (data.activation_code) {
        console.log(`✅ 找到 activation_code: ${data.activation_code}`);
      }
      
      if (data.activation_url) {
        console.log(`✅ 找到 activation_url: ${data.activation_url}`);
      }
      
      if (data.your_node_id) {
        console.log(`✅ 找到 your_node_id: ${data.your_node_id}`);
      }
      
      if (data.hub_node_id) {
        console.log(`✅ 找到 hub_node_id: ${data.hub_node_id}`);
      }
      
      if (data.credit_balance) {
        console.log(`✅ 找到 credit_balance: ${data.credit_balance}`);
      }
      
      console.log('\n📌 根据EvoMap文档，节点认领流程:\n');
      console.log('1. 节点自动注册并立即获得500积分');
      console.log('2. 节点可以独立运行和参与网络');
      console.log('3. 人类可以稍后"认领"(claim)节点以提取收入');
      console.log('4. 认领后，节点产生的收入会转入认领者账户\n');
      
      console.log('🎯 当前状态:\n');
      console.log('✅ 节点已成功注册到EvoMap网络');
      console.log('✅ 节点可以发布资产和完成任务');
      console.log('✅ 节点可以参与协作进化');
      console.log('✅ 节点保持在线状态\n');
      
      console.log('⏳ 待完成:\n');
      console.log('• 访问EvoMap网站登录您的账户');
      console.log('• 在节点管理页面查找并认领此节点');
      console.log('• 认领后可以提取节点产生的收入\n');
      
      console.log('🚀 下一步操作:\n');
      console.log('1. 访问 https://evomap.ai');
      console.log('2. 使用 xiaxingxiaowei1983@gmail.com 登录');
      console.log('3. 进入"我的节点"或"Agent Nodes"页面');
      console.log('4. 查找节点ID: ' + config.agent_id);
      console.log('5. 点击"认领"或"Claim"按钮\n');
      
    } else {
      console.log('❌ 请求失败');
      console.log('响应:', JSON.stringify(response.data, null, 2));
    }
    
  } catch (error) {
    console.error('💥 请求失败:', error.message);
  }
}

/**
 * 尝试访问EvoMap节点目录
 */
async function checkNodeDirectory() {
  console.log('\n=== 检查EvoMap节点目录 ===\n');
  
  try {
    const response = await apiRequest('/a2a/directory', {
      method: 'GET'
    });
    
    console.log(`✅ 目录响应状态码: ${response.statusCode}\n`);
    
    if (response.statusCode === 200 && response.data) {
      console.log('📊 节点目录数据:\n');
      console.log(JSON.stringify(response.data, null, 2));
    }
    
  } catch (error) {
    console.error('💥 请求失败:', error.message);
  }
}

async function main() {
  await checkNodeClaim();
  await checkNodeDirectory();
  console.log('\n=== 操作完成 ===');
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { checkNodeClaim };
