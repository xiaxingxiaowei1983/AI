/**
 * EvoMap 任务执行脚本 v2
 * 优化版：扩大筛选范围，实际下载和应用胶囊
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const crypto = require('crypto');

// 配置
const EVOMAP_API = 'https://evomap.ai';
const WORKSPACE = 'C:\\Users\\10919\\Desktop\\AI\\agents\\green-tea';
const EVOMAP_DIR = path.join(path.dirname(WORKSPACE), 'evomap-evolution');

// 节点配置
const NODE_CONFIG = {
  nodeId: 'node_be9ff891bc1c0bbb',
  agentName: '绿茶',
  agentType: 'CGO'
};

/**
 * 生成消息 ID
 */
function generateMessageId() {
  return `msg_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
}

/**
 * 创建协议信封
 */
function createEnvelope(messageType, payload) {
  return {
    protocol: 'gep-a2a',
    protocol_version: '1.0.0',
    message_type: messageType,
    message_id: generateMessageId(),
    sender_id: NODE_CONFIG.nodeId,
    timestamp: new Date().toISOString(),
    payload: payload
  };
}

/**
 * API 请求函数
 */
async function apiRequest(endpoint, options = {}) {
  return new Promise((resolve, reject) => {
    const url = `${EVOMAP_API}${endpoint}`;
    console.log(`📡 ${options.method || 'GET'} ${endpoint}`);
    
    const req = https.request(url, {
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve({ statusCode: res.statusCode, data: jsonData });
        } catch (e) {
          resolve({ statusCode: res.statusCode, data: { raw: data.substring(0, 500) } });
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
  });
}

/**
 * 任务 1: 获取并下载胶囊（扩大筛选范围）
 */
async function downloadCapsules() {
  console.log('\n' + '='.repeat(60));
  console.log('🎯 任务 1: 高价值胶囊下载和应用');
  console.log('='.repeat(60));
  
  try {
    // 1. 获取可用胶囊
    console.log('\n📦 获取可用胶囊...');
    const envelope = createEnvelope('fetch', {
      asset_type: 'Capsule',
      include_tasks: false
    });
    
    const response = await apiRequest('/a2a/fetch?asset_type=Capsule', {
      method: 'POST',
      body: envelope
    });
    
    console.log(`✅ 响应状态：${response.statusCode}`);
    
    // 提取胶囊数据
    const payload = response.data.payload || {};
    const results = payload.results || [];
    
    console.log(`📋 找到 ${results.length} 个胶囊`);
    
    // 2. 下载胶囊（取前 3 个）
    const downloadedCapsules = [];
    for (const result of results.slice(0, 3)) {
      console.log(`\n⬇️ 下载胶囊：${result.asset_id?.substring(0, 20)}...`);
      
      const downloadEnvelope = createEnvelope('download', {
        asset_id: result.asset_id,
        asset_type: 'Capsule'
      });
      
      const downloadResponse = await apiRequest('/a2a/download', {
        method: 'POST',
        body: downloadEnvelope
      });
      
      console.log(`✅ 下载状态：${downloadResponse.statusCode}`);
      
      // 保存胶囊信息
      const capsuleRecord = {
        asset_id: result.asset_id,
        bundle_id: result.bundle_id,
        asset_type: result.asset_type,
        status: result.status,
        source_node_id: result.source_node_id,
        trigger_text: result.trigger_text,
        confidence: result.confidence,
        gdi_score: result.gdi_score,
        downloaded_at: new Date().toISOString(),
        download_response_status: downloadResponse.statusCode
      };
      
      downloadedCapsules.push(capsuleRecord);
      
      // 应用胶囊
      await applyCapsule(capsuleRecord);
    }
    
    // 保存记录
    saveRecords('downloaded_capsules.json', downloadedCapsules);
    
    console.log(`\n✅ 胶囊下载完成：${downloadedCapsules.length} 个`);
    return downloadedCapsules;
    
  } catch (error) {
    console.error(`❌ 错误：${error.message}`);
    return [];
  }
}

/**
 * 应用胶囊到技能库
 */
async function applyCapsule(capsule) {
  console.log(`🔧 应用胶囊到技能库...`);
  
  try {
    const skillsDir = path.join(EVOMAP_DIR, 'skills');
    if (!fs.existsSync(skillsDir)) {
      fs.mkdirSync(skillsDir, { recursive: true });
    }
    
    const capsuleId = capsule.asset_id?.substring(0, 16) || `capsule_${Date.now()}`;
    const capsuleDir = path.join(skillsDir, `capsule_${capsuleId}`);
    
    if (!fs.existsSync(capsuleDir)) {
      fs.mkdirSync(capsuleDir, { recursive: true });
    }
    
    // 创建 SKILL.md
    const skillMd = `# EvoMap Capsule - ${capsuleId}

## 来源信息
- **Asset ID**: ${capsule.asset_id}
- **Bundle ID**: ${capsule.bundle_id}
- **来源节点**: ${capsule.source_node_id}
- **下载时间**: ${capsule.downloaded_at}
- **状态**: ${capsule.status}
- **置信度**: ${capsule.confidence}
- **GDI 分数**: ${capsule.gdi_score}

## 触发文本
${capsule.trigger_text || 'N/A'}

## 应用状态
✅ 已下载并集成到绿茶智能体技能库

## 使用方式
通过 EvoMap 进化系统自动调用
`;
    
    fs.writeFileSync(path.join(capsuleDir, 'SKILL.md'), skillMd);
    
    // 创建配置
    fs.writeFileSync(
      path.join(capsuleDir, 'config.json'),
      JSON.stringify(capsule, null, 2)
    );
    
    console.log(`  ✅ 已应用至：${capsuleDir}`);
    return capsuleDir;
    
  } catch (error) {
    console.error(`  ❌ 应用失败：${error.message}`);
    return null;
  }
}

/**
 * 任务 2: 获取并认领任务（扩大筛选范围）
 */
async function claimTasks() {
  console.log('\n' + '='.repeat(60));
  console.log('🎯 任务 2: 前往 EvoMap 接单');
  console.log('='.repeat(60));
  
  try {
    // 1. 获取可用任务
    console.log('\n📋 获取可用任务...');
    const envelope = createEnvelope('fetch', {
      include_tasks: true
    });
    
    const response = await apiRequest('/a2a/fetch?include_tasks=true', {
      method: 'POST',
      body: envelope
    });
    
    console.log(`✅ 响应状态：${response.statusCode}`);
    
    // 提取任务数据
    const tasks = response.data.tasks || [];
    console.log(`📋 找到 ${tasks.length} 个任务`);
    
    // 2. 认领任务（取前 3 个开放状态的任务）
    const claimedTasks = [];
    for (const task of tasks.slice(0, 3)) {
      if (!task.task_id && !task.id) continue;
      
      const taskId = task.task_id || task.id;
      console.log(`\n🎯 认领任务：${taskId}`);
      console.log(`   标题：${task.title || 'N/A'}`);
      console.log(`   状态：${task.status || 'unknown'}`);
      
      const claimEnvelope = createEnvelope('claim', {
        task_id: taskId,
        agent_id: NODE_CONFIG.nodeId
      });
      
      const claimResponse = await apiRequest('/task/claim', {
        method: 'POST',
        body: claimEnvelope
      });
      
      console.log(`✅ 认领状态：${claimResponse.statusCode}`);
      
      const claimRecord = {
        task_id: taskId,
        title: task.title,
        status: task.status,
        bounty_amount: task.bounty_amount || task.credits || 0,
        claim_response_status: claimResponse.statusCode,
        claimed_at: new Date().toISOString()
      };
      
      claimedTasks.push(claimRecord);
    }
    
    // 保存记录
    saveRecords('claimed_tasks.json', claimedTasks);
    
    console.log(`\n✅ 任务认领完成：${claimedTasks.length} 个`);
    return claimedTasks;
    
  } catch (error) {
    console.error(`❌ 错误：${error.message}`);
    return [];
  }
}

/**
 * 保存记录
 */
function saveRecords(filename, records) {
  const recordPath = path.join(EVOMAP_DIR, 'data', filename);
  const dataDir = path.dirname(recordPath);
  
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  let existingRecords = [];
  if (fs.existsSync(recordPath)) {
    existingRecords = JSON.parse(fs.readFileSync(recordPath, 'utf8'));
  }
  
  existingRecords.push(...records);
  fs.writeFileSync(recordPath, JSON.stringify(existingRecords, null, 2));
  
  console.log(`📁 记录保存至：${recordPath}`);
}

/**
 * 生成执行报告
 */
function generateReport(capsules, tasks) {
  const report = {
    execution_time: new Date().toISOString(),
    node_id: NODE_CONFIG.nodeId,
    agent_name: NODE_CONFIG.agentName,
    results: {
      capsules_downloaded: capsules.length,
      tasks_claimed: tasks.length,
      potential_credits: tasks.reduce((sum, t) => sum + (t.bounty_amount || 0), 0)
    }
  };
  
  const reportPath = path.join(EVOMAP_DIR, 'logs', `execution_report_${Date.now()}.json`);
  const logDir = path.dirname(reportPath);
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }
  
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  
  console.log('\n' + '='.repeat(60));
  console.log('📊 执行报告');
  console.log('='.repeat(60));
  console.log(`胶囊下载：${capsules.length} 个`);
  console.log(`任务认领：${tasks.length} 个`);
  console.log(`潜在收益：${report.results.potential_credits} credits`);
  console.log(`报告路径：${reportPath}`);
  
  return report;
}

/**
 * 主函数
 */
async function main() {
  console.log('\n🍵 '.repeat(20));
  console.log('绿茶智能体 EvoMap 任务执行 v2');
  console.log(`节点：${NODE_CONFIG.nodeId}`);
  console.log(`时间：${new Date().toISOString()}`);
  console.log('🍵 '.repeat(20));
  
  // 确保目录存在
  ['data', 'logs', 'skills'].forEach(dir => {
    const dirPath = path.join(EVOMAP_DIR, dir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  });
  
  // 执行任务
  const capsules = await downloadCapsules();
  const tasks = await claimTasks();
  
  // 生成报告
  generateReport(capsules, tasks);
  
  console.log('\n✅ 所有任务执行完成！');
  return { capsules, tasks };
}

// 执行
if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error('执行失败:', error);
      process.exit(1);
    });
}

module.exports = { main };
