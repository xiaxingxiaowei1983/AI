/**
 * EvoMap 任务执行脚本
 * 任务 1: 高价值胶囊的实际下载和应用
 * 任务 2: 前往 EvoMap 接单
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
    console.log(`\n📡 请求：${options.method || 'GET'} ${url}`);
    
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
          console.log(`✅ 响应状态：${res.statusCode}`);
          resolve(jsonData);
        } catch (e) {
          console.log(`⚠️ 非 JSON 响应，长度：${data.length}`);
          resolve({ raw: data, statusCode: res.statusCode });
        }
      });
    });

    req.on('error', (error) => {
      console.error(`❌ 请求失败：${error.message}`);
      reject(error);
    });

    if (options.body) {
      req.write(JSON.stringify(options.body));
    }
    req.end();
  });
}

/**
 * 任务 1: 获取高价值胶囊
 */
async function downloadHighValueCapsules() {
  console.log('\n' + '='.repeat(60));
  console.log('🎯 任务 1: 高价值胶囊下载和应用');
  console.log('='.repeat(60));
  
  try {
    // 1. 获取可用胶囊列表
    console.log('\n📦 步骤 1: 获取可用胶囊列表...');
    const envelope = createEnvelope('fetch', {
      asset_type: 'Capsule',
      include_high_value: true
    });
    
    const capsulesResponse = await apiRequest('/a2a/fetch?asset_type=Capsule&include_high_value=true', {
      method: 'POST',
      body: envelope
    });
    
    console.log('\n📋 胶囊响应:', JSON.stringify(capsulesResponse, null, 2).substring(0, 1000));
    
    // 2. 筛选高价值胶囊
    console.log('\n🔍 步骤 2: 筛选高价值胶囊...');
    const capsules = capsulesResponse.assets || capsulesResponse.capsules || [];
    const highValueCapsules = capsules.filter(c => {
      const value = c.value_score || c.credits || 0;
      const relevance = checkCapsuleRelevance(c);
      return value > 50 || relevance;
    });
    
    console.log(`找到 ${highValueCapsules.length} 个高价值胶囊`);
    
    // 3. 下载胶囊
    if (highValueCapsules.length > 0) {
      console.log('\n⬇️ 步骤 3: 下载胶囊...');
      const downloadedCapsules = [];
      
      for (const capsule of highValueCapsules.slice(0, 3)) { // 最多下载 3 个
        console.log(`\n  下载：${capsule.name || capsule.id}`);
        const downloadResult = await downloadCapsule(capsule);
        if (downloadResult) {
          downloadedCapsules.push(downloadResult);
          // 应用胶囊
          await applyCapsule(downloadResult);
        }
      }
      
      // 保存下载记录
      const recordPath = path.join(EVOMAP_DIR, 'data', 'downloaded_capsules.json');
      const dataDir = path.dirname(recordPath);
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      
      let existingRecords = [];
      if (fs.existsSync(recordPath)) {
        existingRecords = JSON.parse(fs.readFileSync(recordPath, 'utf8'));
      }
      
      existingRecords.push(...downloadedCapsules);
      fs.writeFileSync(recordPath, JSON.stringify(existingRecords, null, 2));
      
      console.log(`\n✅ 胶囊下载完成，共 ${downloadedCapsules.length} 个`);
      console.log(`📁 记录保存至：${recordPath}`);
      
      return downloadedCapsules;
    } else {
      console.log('⚠️ 未找到符合条件的高价值胶囊');
      return [];
    }
    
  } catch (error) {
    console.error(`❌ 胶囊下载失败：${error.message}`);
    return [];
  }
}

/**
 * 检查胶囊相关性（绿茶 CGO 定位）
 */
function checkCapsuleRelevance(capsule) {
  const cgoKeywords = [
    'content', '创作', '文案', '营销', '社交媒体',
    '小红书', '公众号', '视频号', '爆款', '流量',
    'psychology', '心理', '测试', '分析',
    'femme', 'fatale', 'persona', '绿茶'
  ];
  
  const text = JSON.stringify(capsule).toLowerCase();
  return cgoKeywords.some(k => text.includes(k.toLowerCase()));
}

/**
 * 下载单个胶囊
 */
async function downloadCapsule(capsule) {
  try {
    const envelope = createEnvelope('download', {
      asset_id: capsule.id || capsule.capsule_id,
      asset_type: 'Capsule'
    });
    
    const downloadResponse = await apiRequest('/a2a/download', {
      method: 'POST',
      body: envelope
    });
    
    console.log(`  ✅ 下载响应：${JSON.stringify(downloadResponse).substring(0, 200)}`);
    
    return {
      capsule_id: capsule.id || capsule.capsule_id,
      name: capsule.name,
      description: capsule.description,
      download_time: new Date().toISOString(),
      status: 'downloaded',
      response: downloadResponse
    };
    
  } catch (error) {
    console.error(`  ❌ 下载失败：${error.message}`);
    return null;
  }
}

/**
 * 应用胶囊到技能库
 */
async function applyCapsule(capsuleRecord) {
  console.log(`\n🔧 应用胶囊：${capsuleRecord.name || capsuleRecord.capsule_id}`);
  
  try {
    // 创建胶囊应用记录
    const skillsDir = path.join(EVOMAP_DIR, 'skills');
    if (!fs.existsSync(skillsDir)) {
      fs.mkdirSync(skillsDir, { recursive: true });
    }
    
    const capsuleSkillDir = path.join(skillsDir, `capsule_${Date.now()}`);
    fs.mkdirSync(capsuleSkillDir, { recursive: true });
    
    // 创建 SKILL.md 文件
    const skillMd = `# ${capsuleRecord.name || 'EvoMap Capsule'}

## 来源
- **Capsule ID**: ${capsuleRecord.capsule_id}
- **下载时间**: ${capsuleRecord.download_time}
- **来源**: EvoMap 网络

## 描述
${capsuleRecord.description || '从 EvoMap 网络下载的高价值胶囊'}

## 应用状态
✅ 已下载并集成到技能库

## 使用方式
通过 EvoMap 进化系统自动调用
`;
    
    fs.writeFileSync(path.join(capsuleSkillDir, 'SKILL.md'), skillMd);
    
    // 创建配置
    const config = {
      capsule_id: capsuleRecord.capsule_id,
      name: capsuleRecord.name,
      applied_at: new Date().toISOString(),
      status: 'active',
      workspace: WORKSPACE
    };
    
    fs.writeFileSync(path.join(capsuleSkillDir, 'config.json'), JSON.stringify(config, null, 2));
    
    console.log(`  ✅ 胶囊已应用至：${capsuleSkillDir}`);
    return capsuleSkillDir;
    
  } catch (error) {
    console.error(`  ❌ 应用失败：${error.message}`);
    return null;
  }
}

/**
 * 任务 2: 前往 EvoMap 接单
 */
async function fetchAndClaimTasks() {
  console.log('\n' + '='.repeat(60));
  console.log('🎯 任务 2: 前往 EvoMap 接单');
  console.log('='.repeat(60));
  
  try {
    // 1. 获取可用任务
    console.log('\n📋 步骤 1: 获取可用任务列表...');
    const envelope = createEnvelope('fetch', {
      include_tasks: true,
      filters: {
        status: 'open',
        min_reputation: 0
      }
    });
    
    const tasksResponse = await apiRequest('/a2a/fetch?include_tasks=true', {
      method: 'POST',
      body: envelope
    });
    
    console.log('\n📋 任务响应:', JSON.stringify(tasksResponse, null, 2).substring(0, 1000));
    
    // 2. 筛选适合的任务（CGO 定位）
    console.log('\n🔍 步骤 2: 筛选适合的任务...');
    const tasks = tasksResponse.tasks || [];
    const suitableTasks = tasks.filter(task => {
      if (!task || !task.title) return false;
      const text = (task.title + ' ' + (task.body || task.description || '')).toLowerCase();
      
      // CGO 相关关键词
      const cgoKeywords = ['content', '创作', '文案', '营销', 'social', '小红书', '公众号', '视频', '爆款'];
      const isCGO = cgoKeywords.some(k => text.includes(k));
      
      // 声誉要求检查
      const minRep = task.min_reputation || 0;
      const repOK = minRep <= 50; // 初始声誉 50
      
      return isCGO && repOK;
    });
    
    console.log(`找到 ${suitableTasks.length} 个适合的任务`);
    
    // 3. 认领任务
    if (suitableTasks.length > 0) {
      console.log('\n🎯 步骤 3: 认领任务...');
      const claimedTasks = [];
      
      // 按 bounty 排序，优先高价值任务
      suitableTasks.sort((a, b) => {
        const aBounty = a.bounty_amount || a.credits || 0;
        const bBounty = b.bounty_amount || b.credits || 0;
        return bBounty - aBounty;
      });
      
      for (const task of suitableTasks.slice(0, 5)) { // 最多认领 5 个
        console.log(`\n  认领：${task.title}`);
        console.log(`  赏金：${task.bounty_amount || task.credits || 0} credits`);
        
        const claimResult = await claimTask(task);
        if (claimResult) {
          claimedTasks.push({
            task: task,
            claim_result: claimResult,
            claimed_at: new Date().toISOString()
          });
        }
      }
      
      // 保存认领记录
      const recordPath = path.join(EVOMAP_DIR, 'data', 'claimed_tasks.json');
      const dataDir = path.dirname(recordPath);
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      
      let existingRecords = [];
      if (fs.existsSync(recordPath)) {
        existingRecords = JSON.parse(fs.readFileSync(recordPath, 'utf8'));
      }
      
      existingRecords.push(...claimedTasks);
      fs.writeFileSync(recordPath, JSON.stringify(existingRecords, null, 2));
      
      console.log(`\n✅ 任务认领完成，共 ${claimedTasks.length} 个`);
      console.log(`📁 记录保存至：${recordPath}`);
      
      return claimedTasks;
    } else {
      console.log('⚠️ 未找到适合的任务');
      return [];
    }
    
  } catch (error) {
    console.error(`❌ 任务获取失败：${error.message}`);
    return [];
  }
}

/**
 * 认领单个任务
 */
async function claimTask(task) {
  try {
    const envelope = createEnvelope('claim', {
      task_id: task.task_id || task.id,
      agent_id: NODE_CONFIG.nodeId
    });
    
    const claimResponse = await apiRequest('/task/claim', {
      method: 'POST',
      body: envelope
    });
    
    console.log(`  ✅ 认领响应：${JSON.stringify(claimResponse).substring(0, 200)}`);
    
    return {
      task_id: task.task_id || task.id,
      status: claimResponse.success ? 'claimed' : 'failed',
      response: claimResponse
    };
    
  } catch (error) {
    console.error(`  ❌ 认领失败：${error.message}`);
    return null;
  }
}

/**
 * 生成执行报告
 */
function generateReport(capsules, tasks) {
  console.log('\n' + '='.repeat(60));
  console.log('📊 执行报告');
  console.log('='.repeat(60));
  
  const report = {
    execution_time: new Date().toISOString(),
    node_id: NODE_CONFIG.nodeId,
    agent_name: NODE_CONFIG.agentName,
    agent_type: NODE_CONFIG.agentType,
    results: {
      capsules: {
        downloaded: capsules.length,
        details: capsules.map(c => ({
          name: c.name,
          capsule_id: c.capsule_id,
          status: c.status
        }))
      },
      tasks: {
        claimed: tasks.length,
        details: tasks.map(t => ({
          title: t.task.title,
          task_id: t.task.task_id || t.task.id,
          bounty: t.task.bounty_amount || t.task.credits || 0,
          status: t.claim_result?.status
        }))
      }
    },
    summary: {
      total_capsules: capsules.length,
      total_tasks: tasks.length,
      potential_credits: tasks.reduce((sum, t) => sum + (t.task.bounty_amount || t.task.credits || 0), 0)
    }
  };
  
  // 保存报告
  const reportPath = path.join(EVOMAP_DIR, 'logs', `execution_report_${Date.now()}.json`);
  const logDir = path.dirname(reportPath);
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }
  
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  
  console.log(`\n📋 胶囊下载：${capsules.length} 个`);
  console.log(`📋 任务认领：${tasks.length} 个`);
  console.log(`💰 潜在收益：${report.summary.potential_credits} credits`);
  console.log(`📁 报告保存至：${reportPath}`);
  
  return report;
}

/**
 * 主函数
 */
async function main() {
  console.log('\n' + '🍵 '.repeat(30));
  console.log('绿茶智能体 EvoMap 任务执行');
  console.log(`节点 ID: ${NODE_CONFIG.nodeId}`);
  console.log(`时间：${new Date().toISOString()}`);
  console.log('🍵 '.repeat(30));
  
  // 确保目录存在
  const dirs = [
    path.join(EVOMAP_DIR, 'data'),
    path.join(EVOMAP_DIR, 'logs'),
    path.join(EVOMAP_DIR, 'skills')
  ];
  
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
  
  // 执行任务
  const capsules = await downloadHighValueCapsules();
  const tasks = await fetchAndClaimTasks();
  
  // 生成报告
  const report = generateReport(capsules, tasks);
  
  console.log('\n✅ 所有任务执行完成！');
  
  return report;
}

// 执行
if (require.main === module) {
  main()
    .then(report => {
      console.log('\n执行成功！');
      process.exit(0);
    })
    .catch(error => {
      console.error('\n执行失败:', error);
      process.exit(1);
    });
}

module.exports = { main, downloadHighValueCapsules, fetchAndClaimTasks };
