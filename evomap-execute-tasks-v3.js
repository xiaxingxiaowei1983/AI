/**
 * EvoMap 任务执行脚本 v3
 * 修复版：使用正确的目录路径，尝试 bundle_id 下载
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const crypto = require('crypto');

// 配置
const EVOMAP_API = 'https://evomap.ai';
const WORKSPACE = 'C:\\Users\\10919\\Desktop\\AI\\agents\\green-tea';
const EVOMAP_DIR = 'C:\\Users\\10919\\Desktop\\AI\\evomap-evolution';

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
 * 任务 1: 获取并下载胶囊
 */
async function downloadCapsules() {
  console.log('\n' + '='.repeat(60));
  console.log('🎯 任务 1: 高价值胶囊下载和应用');
  console.log('='.repeat(60));
  
  try {
    // 1. 获取可用胶囊
    console.log('\n📦 获取可用胶囊...');
    const envelope = createEnvelope('fetch', {
      asset_type: 'Capsule'
    });
    
    const response = await apiRequest('/a2a/fetch?asset_type=Capsule', {
      method: 'POST',
      body: envelope
    });
    
    console.log(`✅ 响应状态：${response.statusCode}`);
    
    const payload = response.data.payload || {};
    const results = payload.results || [];
    
    console.log(`📋 找到 ${results.length} 个胶囊`);
    
    // 2. 下载胶囊（使用 bundle_id）
    const downloadedCapsules = [];
    for (const result of results.slice(0, 3)) {
      console.log(`\n⬇️ 下载胶囊：${result.asset_id?.substring(0, 20)}...`);
      console.log(`   Bundle ID: ${result.bundle_id}`);
      console.log(`   触发文本：${result.trigger_text}`);
      
      // 尝试使用 bundle_id 下载
      const downloadEnvelope = createEnvelope('download', {
        asset_id: result.bundle_id || result.asset_id,
        asset_type: 'Capsule'
      });
      
      const downloadResponse = await apiRequest('/a2a/download', {
        method: 'POST',
        body: downloadEnvelope
      });
      
      console.log(`✅ 下载状态：${downloadResponse.statusCode}`);
      
      // 创建胶囊记录
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
        download_response_status: downloadResponse.statusCode,
        download_response: downloadResponse.data
      };
      
      downloadedCapsules.push(capsuleRecord);
      
      // 应用胶囊到技能库
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
  console.log(`\n🔧 应用胶囊到技能库...`);
  
  try {
    const skillsDir = path.join(EVOMAP_DIR, 'skills');
    if (!fs.existsSync(skillsDir)) {
      fs.mkdirSync(skillsDir, { recursive: true });
      console.log(`  创建目录：${skillsDir}`);
    }
    
    // 使用更安全的文件名
    const safeId = capsule.asset_id.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 32);
    const capsuleDir = path.join(skillsDir, `capsule_${safeId}`);
    
    if (!fs.existsSync(capsuleDir)) {
      fs.mkdirSync(capsuleDir, { recursive: true });
      console.log(`  创建胶囊目录：${capsuleDir}`);
    }
    
    // 创建 SKILL.md
    const skillMd = `# EvoMap Capsule - ${safeId}

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

## 下载状态
- **HTTP 状态**: ${capsule.download_response_status}
- **响应数据**: ${JSON.stringify(capsule.download_response).substring(0, 200)}

## 应用状态
✅ 已记录到绿茶智能体技能库

## 使用说明
此胶囊已从 EvoMap 网络获取，但由于 API 限制，实际内容需要通过 EvoMap 客户端正式下载。
当前记录用于追踪已识别的高价值胶囊。
`;
    
    fs.writeFileSync(path.join(capsuleDir, 'SKILL.md'), skillMd);
    console.log(`  ✅ 创建 SKILL.md`);
    
    // 创建配置
    fs.writeFileSync(
      path.join(capsuleDir, 'config.json'),
      JSON.stringify(capsule, null, 2)
    );
    console.log(`  ✅ 创建 config.json`);
    
    console.log(`  ✅ 已应用至：${capsuleDir}`);
    return capsuleDir;
    
  } catch (error) {
    console.error(`  ❌ 应用失败：${error.message}`);
    return null;
  }
}

/**
 * 任务 2: 获取并认领任务
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
    
    // 检查不同格式的任务数据
    let tasks = [];
    if (response.data.tasks && Array.isArray(response.data.tasks)) {
      tasks = response.data.tasks;
    } else if (response.data.payload && response.data.payload.tasks) {
      tasks = response.data.payload.tasks;
    } else if (response.data.payload && response.data.payload.results) {
      tasks = response.data.payload.results.filter(r => r.asset_type === 'Task');
    }
    
    console.log(`📋 找到 ${tasks.length} 个任务`);
    
    // 2. 认领任务
    const claimedTasks = [];
    for (const task of tasks.slice(0, 3)) {
      const taskId = task.task_id || task.id || task.asset_id;
      if (!taskId) continue;
      
      console.log(`\n🎯 认领任务：${taskId}`);
      console.log(`   标题：${task.title || task.trigger_text || 'N/A'}`);
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
        title: task.title || task.trigger_text,
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
  
  // 读取现有记录
  let existingRecords = [];
  if (fs.existsSync(recordPath)) {
    try {
      existingRecords = JSON.parse(fs.readFileSync(recordPath, 'utf8'));
    } catch (e) {
      existingRecords = [];
    }
  }
  
  // 添加新记录（避免重复）
  const existingIds = new Set(existingRecords.map(r => r.asset_id || r.task_id));
  const newRecords = records.filter(r => !existingIds.has(r.asset_id || r.task_id));
  
  if (newRecords.length > 0) {
    existingRecords.push(...newRecords);
    fs.writeFileSync(recordPath, JSON.stringify(existingRecords, null, 2));
    console.log(`📁 记录保存至：${recordPath} (新增 ${newRecords.length} 条)`);
  } else {
    console.log(`📁 记录已存在，跳过保存`);
  }
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
    },
    capsules: capsules.map(c => ({
      asset_id: c.asset_id,
      trigger_text: c.trigger_text,
      gdi_score: c.gdi_score,
      status: c.download_response_status
    })),
    tasks: tasks.map(t => ({
      task_id: t.task_id,
      title: t.title,
      status: t.claim_response_status
    }))
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
  console.log(`✅ 胶囊下载：${capsules.length} 个`);
  console.log(`✅ 任务认领：${tasks.length} 个`);
  console.log(`💰 潜在收益：${report.results.potential_credits} credits`);
  console.log(`📁 报告路径：${reportPath}`);
  
  return report;
}

/**
 * 主函数
 */
async function main() {
  console.log('\n🍵 '.repeat(20));
  console.log('绿茶智能体 EvoMap 任务执行 v3');
  console.log(`节点：${NODE_CONFIG.nodeId}`);
  console.log(`时间：${new Date().toISOString()}`);
  console.log('🍵 '.repeat(20));
  
  // 确保目录存在
  console.log('\n📁 检查目录...');
  ['data', 'logs', 'skills'].forEach(dir => {
    const dirPath = path.join(EVOMAP_DIR, dir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      console.log(`  创建：${dirPath}`);
    } else {
      console.log(`  存在：${dirPath}`);
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
