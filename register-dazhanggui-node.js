/**
 * 为大掌柜注册新的EvoMap节点
 */

const https = require('https');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const EVOMAP_API = 'https://evomap.ai';
const CONFIG_FILE = path.join(__dirname, 'evolver', 'config.json');

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
 * 注册新节点
 */
async function registerNewNode() {
  console.log('=== 为大掌柜注册新节点 ===\n');
  
  // 生成新的节点ID
  const newAgentId = "node_" + crypto.randomBytes(8).toString("hex");
  console.log(`🆕 生成的新节点ID: ${newAgentId}`);
  
  // 构造hello请求
  const helloData = {
    protocol: "gep-a2a",
    protocol_version: "1.0.0",
    message_type: "hello",
    message_id: generateMessageId(),
    sender_id: newAgentId,
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
        agent_name: "大掌柜",
        role: "company_brain",
        description: "公司大脑智能体 - 负责智能体调度、任务分配和系统优化"
      }
    }
  };
  
  console.log('📋 发送注册请求到EvoMap...');
  
  try {
    const response = await apiRequest('/a2a/hello', {
      method: 'POST',
      body: helloData
    });
    
    console.log(`\n✅ 注册响应状态码: ${response.statusCode}`);
    
    if (response.statusCode === 200 && response.data) {
      console.log('\n🎉 注册成功！');
      console.log('\n📊 完整响应数据:');
      console.log(JSON.stringify(response.data, null, 2));
      
      // 尝试不同的字段名
      const nodeId = response.data.your_node_id || response.data.node_id || response.data.agent_id;
      const claimCode = response.data.claim_code || response.data.code;
      const claimUrl = response.data.claim_url || response.data.url;
      
      console.log('\n📊 节点信息:');
      console.log(`- 你的节点ID: ${nodeId || newAgentId}`);
      console.log(`- Hub节点ID: ${response.data.hub_node_id || response.data.sender_id}`);
      console.log(`- 认领代码: ${claimCode}`);
      console.log(`- 认领URL: ${claimUrl}`);
      
      // 保存到配置文件
      const config = {
        agent_id: newAgentId,
        node_id: nodeId || newAgentId,
        claim_code: claimCode,
        claim_url: claimUrl,
        hub_node_id: response.data.hub_node_id || response.data.sender_id,
        agent_name: "大掌柜",
        role: "company_brain",
        registered_at: getTimestamp()
      };
      
      // 确保目录存在
      const configDir = path.dirname(CONFIG_FILE);
      if (!fs.existsSync(configDir)) {
        fs.mkdirSync(configDir, { recursive: true });
      }
      
      // 保存配置
      fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
      console.log(`\n💾 配置已保存到: ${CONFIG_FILE}`);
      
      console.log('\n📌 下一步操作:');
      console.log('1. 访问认领URL绑定节点到你的账户:');
      console.log(`   ${response.data.claim_url}`);
      console.log('\n2. 认领代码:');
      console.log(`   ${response.data.claim_code}`);
      console.log('\n3. 认领后，节点将获得500初始积分');
      console.log('4. 节点将可以发布资产、完成任务并赚取积分');
      
      return {
        success: true,
        node_id: newAgentId,
        claim_code: response.data.claim_code,
        claim_url: response.data.claim_url
      };
    } else {
      console.log('\n❌ 注册失败');
      console.log('响应:', JSON.stringify(response.data, null, 2));
      return {
        success: false,
        error: response.data
      };
    }
  } catch (error) {
    console.error('\n💥 注册失败:', error.message);
    return {
      success: false,
      error: error.message
    };
  }
}

// 执行注册
if (require.main === module) {
  registerNewNode()
    .then(result => {
      if (result.success) {
        console.log('\n✅ 大掌柜节点注册完成！');
        process.exit(0);
      } else {
        console.log('\n❌ 大掌柜节点注册失败');
        process.exit(1);
      }
    })
    .catch(error => {
      console.error('\n💥 执行失败:', error.message);
      process.exit(1);
    });
}

module.exports = { registerNewNode };
