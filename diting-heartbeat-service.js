const fs = require('fs');
const path = require('path');
const https = require('https');

console.log('=== 谛听心跳服务启动 ===\n');

// 配置参数
const configPath = path.join(__dirname, 'agents', 'business', 'evomap-config.json');
const heartbeatInterval = 15 * 60 * 1000; // 15分钟

// 读取配置
function loadConfig() {
  return JSON.parse(fs.readFileSync(configPath, 'utf8'));
}

// 保存配置
function saveConfig(config) {
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
}

// 发送心跳
async function sendHeartbeat() {
  try {
    const config = loadConfig();
    const nodeId = config.node_id;
    
    console.log(`[${new Date().toISOString()}] 发送心跳...`);
    
    // 构建心跳请求
    const options = {
      hostname: 'evomap.ai',
      port: 443,
      path: '/a2a/heartbeat',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    
    return new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          console.log(`[${new Date().toISOString()}] 心跳响应: ${res.statusCode}`);
          
          // 更新本地配置
          config.last_heartbeat = new Date().toISOString();
          config.status = 'active';
          saveConfig(config);
          
          console.log(`[${new Date().toISOString()}] 心跳发送成功`);
          console.log(`   节点ID: ${nodeId}`);
          console.log(`   状态: active`);
          console.log(`   最后心跳: ${config.last_heartbeat}`);
          console.log('');
          
          resolve();
        });
      });
      
      req.on('error', (error) => {
        console.error(`[${new Date().toISOString()}] 心跳发送失败:`, error.message);
        reject(error);
      });
      
      // 发送请求体
      req.write(JSON.stringify({ node_id: nodeId }));
      req.end();
    });
  } catch (error) {
    console.error(`[${new Date().toISOString()}] 心跳服务错误:`, error.message);
  }
}

// 注册节点
async function registerNode() {
  try {
    const config = loadConfig();
    
    console.log(`[${new Date().toISOString()}] 注册节点...`);
    
    const options = {
      hostname: 'evomap.ai',
      port: 443,
      path: '/a2a/hello',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    
    return new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          console.log(`[${new Date().toISOString()}] 注册响应: ${res.statusCode}`);
          
          try {
            const response = JSON.parse(data);
            console.log('   注册成功！');
            console.log('');
            resolve();
          } catch (parseError) {
            console.error('   解析响应失败:', parseError.message);
            reject(parseError);
          }
        });
      });
      
      req.on('error', (error) => {
        console.error(`[${new Date().toISOString()}] 注册失败:`, error.message);
        reject(error);
      });
      
      // 构建注册请求
      const payload = {
        protocol: "gep-a2a",
        protocol_version: "1.0.0",
        message_type: "hello",
        message_id: `msg_${Date.now()}_${Math.random().toString(16).slice(2, 10)}`,
        sender_id: config.node_id,
        timestamp: new Date().toISOString(),
        payload: {
          capabilities: {
            market_monitoring: true,
            risk_identification: true,
            compliance_audit: true,
            business_insight: true,
            data_analysis: true
          },
          gene_count: 3,
          capsule_count: 5,
          env_fingerprint: {
            node_version: process.version,
            platform: process.platform,
            arch: process.arch
          }
        }
      };
      
      req.write(JSON.stringify(payload));
      req.end();
    });
  } catch (error) {
    console.error(`[${new Date().toISOString()}] 注册服务错误:`, error.message);
  }
}

// 启动服务
async function startHeartbeatService() {
  console.log('=== 谛听心跳服务初始化 ===');
  console.log(`心跳间隔: ${heartbeatInterval / 1000 / 60} 分钟`);
  console.log('');
  
  // 首次注册并发送心跳
  await registerNode();
  await sendHeartbeat();
  
  // 定期发送心跳
  setInterval(sendHeartbeat, heartbeatInterval);
  
  console.log('=== 心跳服务已启动 ===');
  console.log('谛听将每15分钟发送一次心跳，保持在线状态！');
  console.log('');
}

// 启动服务
startHeartbeatService();
