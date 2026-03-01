const https = require('https');
const fs = require('fs');
const path = require('path');

const EVOMAP_API = 'https://evomap.ai';

console.log('🚀 谛听智能体 - 连接 EvoMap...\n');

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
 * 创建协议信封
 */
function createProtocolEnvelope(messageType, payload) {
  return {
    protocol: "gep-a2a",
    protocol_version: "1.0.0",
    message_type: messageType,
    message_id: generateMessageId(),
    sender_id: "node_1d3769e8db37e512", // 谛听的节点ID
    timestamp: getTimestamp(),
    payload: payload
  };
}

/**
 * EvoMap API请求
 */
async function evomapApiRequest(endpoint, options = {}) {
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
 * 连接到 EvoMap
 */
async function connectToEvoMap() {
  console.log('🔗 正在连接 EvoMap 网络...');
  
  try {
    const helloEnvelope = createProtocolEnvelope("hello", {
      capabilities: {
        economic_analysis: true,
        cultural_industry_analysis: true,
        sustainability_analysis: true,
        risk_assessment: true,
        compliance_audit: true
      },
      gene_count: 0,
      capsule_count: 0,
      env_fingerprint: {
        platform: process.platform,
        arch: process.arch,
        node_version: process.version
      }
    });
    
    console.log('📤 发送 hello 消息到 EvoMap...');
    console.log('   节点ID:', helloEnvelope.sender_id);
    
    const response = await evomapApiRequest('/a2a/hello', {
      method: 'POST',
      body: helloEnvelope
    });
    
    console.log('📥 收到 EvoMap 响应:', response.statusCode);
    
    if (response.statusCode === 200 && response.data) {
      console.log('✅ EvoMap 连接成功！');
      console.log('🎯 连接状态:', response.data.payload ? response.data.payload.status : 'connected');
      
      if (response.data.payload) {
        console.log('📋 EvoMap 信息:');
        console.log('   网络状态:', response.data.payload.network_status || 'unknown');
        console.log('   节点数量:', response.data.payload.node_count || 'unknown');
      }
      
      return true;
    } else {
      console.log('❌ EvoMap 连接失败:', response.statusCode);
      console.log('   响应:', response.data);
      return false;
    }
  } catch (error) {
    console.error('❌ 连接 EvoMap 时出错:', error.message);
    return false;
  }
}

/**
 * 检查 EvoMap 状态
 */
async function checkEvoMapStatus() {
  console.log('\n📡 检查 EvoMap 状态...');
  
  try {
    const statusEnvelope = createProtocolEnvelope("fetch", {
      include_status: true
    });
    
    const response = await evomapApiRequest('/a2a/fetch', {
      method: 'POST',
      body: statusEnvelope
    });
    
    if (response.statusCode === 200 && response.data) {
      console.log('✅ EvoMap 状态检查成功！');
      console.log('📋 状态信息:');
      console.log('   响应状态:', response.statusCode);
      console.log('   数据类型:', typeof response.data);
      
      if (response.data.payload) {
        console.log('   有效负载:', Object.keys(response.data.payload));
      }
      
      return true;
    } else {
      console.log('❌ EvoMap 状态检查失败:', response.statusCode);
      return false;
    }
  } catch (error) {
    console.error('❌ 检查 EvoMap 状态时出错:', error.message);
    return false;
  }
}

/**
 * 获取学习资源
 */
async function getLearningResources() {
  console.log('\n📚 获取 EvoMap 学习资源...');
  
  try {
    const resourcesEnvelope = createProtocolEnvelope("fetch", {
      include_resources: true,
      resource_types: ["Capsule", "Gene", "Lesson", "Task"]
    });
    
    const response = await evomapApiRequest('/a2a/fetch', {
      method: 'POST',
      body: resourcesEnvelope
    });
    
    if (response.statusCode === 200 && response.data) {
      console.log('✅ 学习资源获取成功！');
      
      const payload = response.data.payload;
      if (payload) {
        // 分析资源
        await analyzeResources(payload);
      }
      
      return payload;
    } else {
      console.log('❌ 学习资源获取失败:', response.statusCode);
      return null;
    }
  } catch (error) {
    console.error('❌ 获取学习资源时出错:', error.message);
    return null;
  }
}

/**
 * 分析资源
 */
async function analyzeResources(payload) {
  console.log('\n📊 资源分析:');
  
  // 打印所有可用的键，以便了解响应结构
  console.log('\n🔍 响应结构:');
  console.log(`   可用键: ${Object.keys(payload).join(', ')}`);
  
  // 分析推荐资产
  if (payload.recommended_assets) {
    console.log('\n🎯 推荐资产:');
    console.log(`   总数量: ${payload.recommended_assets.length}`);
    
    // 按类型分类
    const assetsByType = {};
    payload.recommended_assets.forEach(asset => {
      const type = asset.asset_type || 'Unknown';
      if (!assetsByType[type]) {
        assetsByType[type] = [];
      }
      assetsByType[type].push(asset);
    });
    
    // 输出分类结果
    Object.entries(assetsByType).forEach(([type, assets]) => {
      console.log(`   ${type}: ${assets.length} 个`);
      assets.forEach((asset, index) => {
        console.log(`     ${index + 1}. ${asset.summary.substring(0, 80)}${asset.summary.length > 80 ? '...' : ''}`);
        console.log(`       GDI评分: ${asset.gdi_score}`);
        console.log(`       触发器: ${asset.triggers ? asset.triggers.join(', ') : '无'}`);
      });
    });
  }
  
  // 分析推荐任务
  if (payload.recommended_tasks) {
    console.log('\n🎯 推荐任务:');
    console.log(`   总数量: ${payload.recommended_tasks.length}`);
    
    payload.recommended_tasks.forEach((task, index) => {
      console.log(`   ${index + 1}. ${task.title.substring(0, 100)}${task.title.length > 100 ? '...' : ''}`);
      console.log(`     信号: ${task.signals}`);
      console.log(`     相关性: ${(task.relevance * 100).toFixed(1)}%`);
      console.log(`     截止时间: ${new Date(task.expires_at).toLocaleString()}`);
    });
  }
  
  // 分析合作机会
  if (payload.collaboration_opportunities) {
    console.log('\n🤝 合作机会:');
    console.log(`   总数量: ${payload.collaboration_opportunities.length}`);
    
    payload.collaboration_opportunities.forEach((opportunity, index) => {
      console.log(`   ${index + 1}. ${opportunity.session_title.substring(0, 100)}${opportunity.session_title.length > 100 ? '...' : ''}`);
      console.log(`     复杂度: ${opportunity.complexity}`);
      console.log(`     参与者: ${opportunity.participants} 人`);
      console.log(`     相关性: ${(opportunity.relevance * 100).toFixed(1)}%`);
    });
  }
  
  // 分析相关课程
  if (payload.relevant_lessons) {
    console.log('\n📖 相关课程:');
    console.log(`   总数量: ${payload.relevant_lessons.length}`);
    
    payload.relevant_lessons.forEach((lesson, index) => {
      console.log(`   ${index + 1}. ${lesson.title ? lesson.title.substring(0, 100) : '无标题'}${lesson.title && lesson.title.length > 100 ? '...' : ''}`);
      console.log(`     类型: ${lesson.type || 'Unknown'}`);
      console.log(`     描述: ${lesson.description ? lesson.description.substring(0, 80) : '无描述'}${lesson.description && lesson.description.length > 80 ? '...' : ''}`);
    });
  }
  
  // 分析网络信息
  if (payload.network_manifest) {
    console.log('\n🌐 网络信息:');
    console.log(`   总智能体数: ${payload.network_manifest.stats.total_agents}`);
    console.log(`   24小时活跃: ${payload.network_manifest.stats.active_24h}`);
    console.log(`   总资产数: ${payload.network_manifest.stats.total_assets}`);
    console.log(`   已推广资产: ${payload.network_manifest.stats.promoted_assets}`);
  }
  
  // 分析结果
  if (payload.results) {
    console.log('\n📋 搜索结果:');
    console.log(`   结果数量: ${payload.results.length}`);
    
    payload.results.forEach((result, index) => {
      console.log(`   ${index + 1}. ${result.title ? result.title.substring(0, 100) : '无标题'}${result.title && result.title.length > 100 ? '...' : ''}`);
      console.log(`     类型: ${result.type || 'Unknown'}`);
      console.log(`     描述: ${result.description ? result.description.substring(0, 80) : '无描述'}${result.description && result.description.length > 80 ? '...' : ''}`);
    });
  }
}

/**
 * 主函数
 */
async function main() {
  console.log('========================================');
  console.log('🚀 谛听智能体 - EvoMap 连接');
  console.log('========================================');
  
  // 1. 连接到 EvoMap
  const connected = await connectToEvoMap();
  
  // 2. 检查状态
  if (connected) {
    await checkEvoMapStatus();
    // 3. 获取学习资源
    await getLearningResources();
  }
  
  console.log('\n========================================');
  console.log('🎯 连接任务完成！');
  console.log('========================================');
}

// 执行主函数
main();
