const https = require('https');
const fs = require('fs');
const path = require('path');

const EVOMAP_API = 'https://evomap.ai';
const CONFIG_FILE = path.join(__dirname, 'evolver', 'config.json');

console.log('🚀 搜索高价值胶囊和技能，接取任务...\n');

/**
 * 加载配置
 */
function loadConfig() {
  if (fs.existsSync(CONFIG_FILE)) {
    return JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
  }
  return {};
}

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
  const config = loadConfig();
  return {
    protocol: "gep-a2a",
    protocol_version: "1.0.0",
    message_type: messageType,
    message_id: generateMessageId(),
    sender_id: config.agent_id || "node_122608",
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
 * 搜索高价值胶囊
 */
async function searchHighValueCapsules() {
  console.log('🔍 搜索 EvoMap 高价值胶囊资产...');
  
  try {
    const config = loadConfig();
    const envelope = createProtocolEnvelope("fetch", {
      asset_type: "Capsule",
      filters: {
        min_confidence: 0.8,
        min_score: 0.8
      }
    });
    
    const response = await evomapApiRequest('/a2a/fetch', {
      method: 'POST',
      body: envelope
    });
    
    if (response.statusCode === 200 && response.data.payload && response.data.payload.capsules) {
      const capsules = response.data.payload.capsules;
      
      if (capsules.length === 0) {
        console.log('✅ 未找到高价值胶囊');
        return [];
      }
      
      // 按分数排序，选择前5个高价值胶囊
      const sortedCapsules = capsules
        .sort((a, b) => {
          const scoreA = a.outcome ? a.outcome.score || 0 : 0;
          const scoreB = b.outcome ? b.outcome.score || 0 : 0;
          return scoreB - scoreA;
        })
        .slice(0, 5);
      
      console.log(`✅ 找到 ${sortedCapsules.length} 个高价值胶囊:`);
      sortedCapsules.forEach((capsule, index) => {
        const score = capsule.outcome ? capsule.outcome.score || 0 : 0;
        const confidence = capsule.confidence || 0;
        console.log(`   ${index + 1}. ${capsule.summary || '无描述'} (分数: ${score.toFixed(2)}, 置信度: ${confidence.toFixed(2)})`);
        console.log(`      ID: ${capsule.asset_id || '无ID'}`);
        console.log(`      触发词: ${capsule.trigger ? capsule.trigger.join(', ') : '无'}`);
      });
      
      return sortedCapsules;
    } else {
      console.log('❌ 搜索胶囊失败:', response.statusCode);
      return [];
    }
  } catch (error) {
    console.error('❌ 搜索胶囊失败:', error.message);
    return [];
  }
}

/**
 * 搜索高价值技能
 */
async function searchHighValueSkills() {
  console.log('\n🔍 搜索 EvoMap 高价值技能...');
  
  try {
    const config = loadConfig();
    const envelope = createProtocolEnvelope("fetch", {
      asset_type: "Skill",
      filters: {
        min_score: 0.8
      }
    });
    
    const response = await evomapApiRequest('/a2a/fetch', {
      method: 'POST',
      body: envelope
    });
    
    if (response.statusCode === 200 && response.data.payload && response.data.payload.skills) {
      const skills = response.data.payload.skills;
      
      if (skills.length === 0) {
        console.log('✅ 未找到高价值技能');
        return [];
      }
      
      // 按分数排序，选择前5个高价值技能
      const sortedSkills = skills
        .sort((a, b) => {
          const scoreA = a.score || 0;
          const scoreB = b.score || 0;
          return scoreB - scoreA;
        })
        .slice(0, 5);
      
      console.log(`✅ 找到 ${sortedSkills.length} 个高价值技能:`);
      sortedSkills.forEach((skill, index) => {
        console.log(`   ${index + 1}. ${skill.name || '无名称'} (分数: ${(skill.score || 0).toFixed(2)})`);
        console.log(`      版本: ${skill.version || '无版本'}`);
        console.log(`      描述: ${skill.description || '无描述'}`);
      });
      
      return sortedSkills;
    } else {
      console.log('❌ 搜索技能失败:', response.statusCode);
      return [];
    }
  } catch (error) {
    console.error('❌ 搜索技能失败:', error.message);
    return [];
  }
}

/**
 * 获取任务列表
 */
async function fetchTasks() {
  console.log('\n📋 获取 EvoMap 任务列表...');
  
  try {
    const config = loadConfig();
    const envelope = createProtocolEnvelope("fetch", {
      include_tasks: true,
      filters: {
        min_reputation: 0
      }
    });
    
    const response = await evomapApiRequest('/a2a/fetch', {
      method: 'POST',
      body: envelope
    });
    
    if (response.statusCode === 200 && response.data.payload && response.data.payload.tasks) {
      const tasks = response.data.payload.tasks;
      
      if (tasks.length === 0) {
        console.log('✅ 未找到任务');
        return [];
      }
      
      // 按奖励排序，选择前5个任务
      const sortedTasks = tasks
        .sort((a, b) => {
          const rewardA = a.reward || 0;
          const rewardB = b.reward || 0;
          return rewardB - rewardA;
        })
        .slice(0, 5);
      
      console.log(`✅ 找到 ${sortedTasks.length} 个任务:`);
      sortedTasks.forEach((task, index) => {
        console.log(`   ${index + 1}. ${task.title || '无标题'} (奖励: ${task.reward || 0} 积分)`);
        console.log(`      ID: ${task.task_id || '无ID'}`);
        console.log(`      描述: ${task.description || '无描述'}`);
      });
      
      return sortedTasks;
    } else {
      console.log('❌ 获取任务失败:', response.statusCode);
      return [];
    }
  } catch (error) {
    console.error('❌ 获取任务失败:', error.message);
    return [];
  }
}

/**
 * 认领任务
 */
async function claimTask(taskId) {
  console.log(`\n🎯 尝试认领任务: ${taskId}`);
  
  try {
    const config = loadConfig();
    const claimData = createProtocolEnvelope("claim_task", {
      task_id: taskId,
      worker_id: config.agent_id || "node_122608",
      capabilities: {
        economic_analysis: true,
        cultural_industry_analysis: true,
        sustainability_analysis: true
      }
    });
    
    const response = await evomapApiRequest('/a2a/claim_task', {
      method: 'POST',
      body: claimData
    });
    
    if (response.statusCode === 200 && response.data.payload) {
      console.log('✅ 任务认领成功!');
      console.log(`   任务ID: ${response.data.payload.task_id}`);
      console.log(`   状态: ${response.data.payload.status}`);
      return true;
    } else {
      console.log('❌ 任务认领失败:', response.statusCode);
      return false;
    }
  } catch (error) {
    console.error('❌ 任务认领失败:', error.message);
    return false;
  }
}

/**
 * 主函数
 */
async function main() {
  try {
    // 1. 搜索高价值胶囊
    const capsules = await searchHighValueCapsules();
    
    // 2. 搜索高价值技能
    const skills = await searchHighValueSkills();
    
    // 3. 获取任务列表
    const tasks = await fetchTasks();
    
    // 4. 尝试认领前2个任务
    if (tasks.length > 0) {
      console.log('\n🎯 开始认领任务...');
      
      let claimedCount = 0;
      for (const task of tasks.slice(0, 2)) {
        const success = await claimTask(task.task_id);
        if (success) {
          claimedCount++;
          if (claimedCount >= 2) {
            break;
          }
        }
        // 等待2秒再认领下一个任务
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
      
      console.log(`\n✅ 成功认领 ${claimedCount} 个任务`);
    }
    
    console.log('\n🎯 任务完成！');
  } catch (error) {
    console.error('❌ 执行失败:', error.message);
  }
}

// 执行主函数
main();
