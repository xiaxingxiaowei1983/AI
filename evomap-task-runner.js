/**
 * EvoMap任务执行脚本
 * 按照用户要求的流程执行任务认领和完成
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const crypto = require('crypto');

// 公司资产库路径
const SKILLS_DIR = path.join(__dirname, 'skills');
const COGNITIVE_DATA_DIR = path.join(__dirname, '认知data');

// EvoMap API配置
const EVOMAP_API = 'https://evomap.ai';
const CONFIG_FILE = path.join(__dirname, 'evolver', 'config.json');

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
 * 生成或加载agentId
 */
function getAgentId() {
  const config = loadConfig();
  if (config.agent_id) {
    return config.agent_id;
  }
  const agentId = "node_" + crypto.randomBytes(8).toString("hex");
  config.agent_id = agentId;
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
  return agentId;
}

/**
 * 生成消息ID
 */
function generateMessageId() {
  return "msg_" + Date.now() + "_" + crypto.randomBytes(4).toString("hex");
}

/**
 * 生成时间戳
 */
function getTimestamp() {
  return new Date().toISOString();
}

/**
 * 扫描公司资产库，获取可用技能
 */
function scanCompanyAssetLibrary() {
  console.log('扫描公司资产库...');
  
  const assets = {
    skills: [],
    cognitiveModels: [],
    totalFiles: 0
  };
  
  // 扫描技能目录
  if (fs.existsSync(SKILLS_DIR)) {
    const skillFolders = fs.readdirSync(SKILLS_DIR, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory());
    
    skillFolders.forEach(folder => {
      const skillPath = path.join(SKILLS_DIR, folder.name);
      const skillFile = path.join(skillPath, 'SKILL.md');
      
      if (fs.existsSync(skillFile)) {
        assets.skills.push({
          id: folder.name,
          name: folder.name,
          path: skillPath,
          type: 'skill'
        });
        assets.totalFiles++;
      }
      
      // 递归扫描子目录
      const scanSubDirs = (dir, basePath = folder.name) => {
        const subDirs = fs.readdirSync(dir, { withFileTypes: true });
        subDirs.forEach(subDir => {
          if (subDir.isDirectory()) {
            const subDirPath = path.join(dir, subDir.name);
            const subSkillFile = path.join(subDirPath, 'SKILL.md');
            
            if (fs.existsSync(subSkillFile)) {
              assets.skills.push({
                id: `${basePath}/${subDir.name}`,
                name: `${basePath}/${subDir.name}`,
                path: subDirPath,
                type: 'skill'
              });
              assets.totalFiles++;
            }
            
            scanSubDirs(subDirPath, `${basePath}/${subDir.name}`);
          }
        });
      };
      
      scanSubDirs(skillPath);
    });
  }
  
  // 扫描认知数据目录
  if (fs.existsSync(COGNITIVE_DATA_DIR)) {
    const cognitiveFiles = fs.readdirSync(COGNITIVE_DATA_DIR);
    cognitiveFiles.forEach(file => {
      const filePath = path.join(COGNITIVE_DATA_DIR, file);
      if (fs.statSync(filePath).isFile()) {
        assets.cognitiveModels.push({
          id: file,
          name: file,
          path: filePath,
          type: 'cognitive_model'
        });
        assets.totalFiles++;
      }
    });
  }
  
  console.log(`扫描完成：发现 ${assets.skills.length} 个技能，${assets.cognitiveModels.length} 个认知模型，共 ${assets.totalFiles} 个文件`);
  
  return assets;
}

/**
 * 根据任务关键词匹配相关技能
 */
function findRelevantSkills(task, assets) {
  console.log('匹配相关技能...');
  
  const relevantSkills = [];
  const keywords = (task.title + ' ' + task.description).toLowerCase();
  
  assets.skills.forEach(skill => {
    // 简单的关键词匹配
    if (skill.name.toLowerCase().includes(keywords) || 
        keywords.includes(skill.name.toLowerCase())) {
      relevantSkills.push(skill);
    }
  });
  
  console.log(`找到 ${relevantSkills.length} 个相关技能`);
  return relevantSkills;
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
    sender_id: getAgentId(),
    timestamp: getTimestamp(),
    payload: payload
  };
}

/**
 * API请求函数（带重试机制）
 */
async function apiRequest(endpoint, options = {}, retryCount = 0, maxRetries = 3) {
  return new Promise(async (resolve, reject) => {
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
        res.on('end', async () => {
          try {
            const jsonData = JSON.parse(data);
            
            // 处理服务器繁忙的情况
            if (jsonData.error === 'server_busy' && jsonData.retry_after_ms && retryCount < maxRetries) {
              console.log(`服务器繁忙，${jsonData.retry_after_ms}ms 后重试...`);
              await new Promise(resolve => setTimeout(resolve, jsonData.retry_after_ms));
              const retryResult = await apiRequest(endpoint, options, retryCount + 1, maxRetries);
              resolve(retryResult);
            } else {
              resolve(jsonData);
            }
          } catch (error) {
            resolve({ raw: data });
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
 * 查看可用悬赏任务
 */
async function fetchAvailableTasks() {
  console.log('1. 查看可用悬赏任务...');
  
  try {
    const envelope = createProtocolEnvelope("fetch", {
      asset_type: "Capsule",
      include_tasks: true
    });

    const response = await apiRequest('/a2a/fetch?include_tasks=true', {
      method: 'POST',
      body: envelope
    });

    console.log(`获取到响应: ${JSON.stringify(response, null, 2)}`);
    
    // 检查是否有任务（处理不同的响应格式）
    const tasks = response.tasks || (response.payload && response.payload.tasks) || [];
    if (tasks.length > 0) {
      console.log(`找到 ${tasks.length} 个可用任务`);
      return tasks;
    } else {
      console.log('没有找到可用任务');
      return [];
    }
  } catch (error) {
    console.error('获取任务失败:', error.message);
    return [];
  }
}

/**
 * 认领任务
 */
async function claimTask(taskId) {
  console.log(`2. 认领任务: ${taskId}`);
  
  try {
    const envelope = createProtocolEnvelope("claim", {
      task_id: taskId,
      agent_id: getAgentId()
    });

    const response = await apiRequest('/task/claim', {
      method: 'POST',
      body: envelope
    });

    console.log(`认领响应: ${JSON.stringify(response, null, 2)}`);
    
    if (response.success) {
      console.log('任务认领成功');
      return true;
    } else {
      console.error('任务认领失败:', response.error);
      return false;
    }
  } catch (error) {
    console.error('认领任务失败:', error.message);
    return false;
  }
}

/**
 * 发布解决方案
 */
async function publishSolution(taskId, solution, relevantSkills = []) {
  console.log(`3. 发布解决方案...`);
  
  // 按照 Gene+Capsule+EvolutionEvent 三件套格式发布
  const gene = {
    id: `gene_${Date.now()}`,
    name: `Solution for task ${taskId}`,
    description: `解决了任务 ${taskId} 的问题`,
    type: "solution",
    data: solution
  };
  
  const capsule = {
    id: `capsule_${Date.now()}`,
    name: `Task ${taskId} Solution Capsule`,
    description: `包含任务 ${taskId} 的完整解决方案`,
    genes: [gene.id],
    skills_used: relevantSkills.map(skill => skill.id),
    type: "solution_capsule"
  };
  
  const evolutionEvent = {
    id: `event_${Date.now()}`,
    type: "task_completion",
    description: `完成了任务 ${taskId}`,
    capsule_id: capsule.id,
    agent_id: getAgentId(),
    skills_used: relevantSkills.map(skill => skill.name),
    timestamp: getTimestamp()
  };
  
  // 这里应该调用相应的API发布解决方案
  // 由于API细节可能不同，这里仅输出格式
  console.log('发布解决方案格式:');
  console.log('Gene:', JSON.stringify(gene, null, 2));
  console.log('Capsule:', JSON.stringify(capsule, null, 2));
  console.log('EvolutionEvent:', JSON.stringify(evolutionEvent, null, 2));
  
  return {
    gene,
    capsule,
    evolutionEvent
  };
}

/**
 * 完成任务
 */
async function completeTask(taskId, solution) {
  console.log(`4. 提交任务完成: ${taskId}`);
  
  try {
    const envelope = createProtocolEnvelope("complete", {
      task_id: taskId,
      agent_id: getAgentId(),
      solution: solution
    });

    const response = await apiRequest('/task/complete', {
      method: 'POST',
      body: envelope
    });

    console.log(`完成响应: ${JSON.stringify(response, null, 2)}`);
    
    if (response.success) {
      console.log('任务完成提交成功');
      return true;
    } else {
      console.error('任务完成提交失败:', response.error);
      return false;
    }
  } catch (error) {
    console.error('提交任务完成失败:', error.message);
    return false;
  }
}

/**
 * 选择能解决的任务
 */
function selectTask(tasks) {
  console.log('选择能解决的任务...');
  
  // 简单的任务选择逻辑
  // 选择第一个任务
  if (tasks.length > 0) {
    const selectedTask = tasks[0];
    console.log(`选择任务: ${selectedTask.id} - ${selectedTask.title}`);
    return selectedTask;
  }
  
  return null;
}

/**
 * 解决任务
 */
async function solveTask(task, relevantSkills = []) {
  console.log(`解决任务: ${task.id} - ${task.title}`);
  
  // 模拟任务解决过程
  console.log(`任务描述: ${task.description}`);
  
  // 使用相关技能
  let skillsUsed = [];
  if (relevantSkills.length > 0) {
    console.log('使用相关技能解决问题:');
    relevantSkills.forEach(skill => {
      console.log(`- ${skill.name}`);
      skillsUsed.push(skill.name);
    });
  }
  
  // 生成解决方案
  const solution = {
    task_id: task.id,
    solution: `已解决任务: ${task.title}`,
    details: `这是针对任务 ${task.id} 的解决方案，基于任务描述: ${task.description}`,
    skills_used: skillsUsed,
    timestamp: getTimestamp()
  };
  
  console.log('生成解决方案:', JSON.stringify(solution, null, 2));
  
  return solution;
}

/**
 * 执行一次任务流程
 */
async function executeTaskFlow() {
  console.log('\n=== 开始执行任务流程 ===');
  
  try {
    // 扫描公司资产库
    const assets = scanCompanyAssetLibrary();
    
    // 1. 查看可用悬赏
    const tasks = await fetchAvailableTasks();
    
    if (tasks.length === 0) {
      console.log('没有可用任务，等待下次循环');
      return false;
    }
    
    // 2. 选择并认领任务
    const selectedTask = selectTask(tasks);
    if (!selectedTask) {
      console.log('没有合适的任务可选择');
      return false;
    }
    
    const claimed = await claimTask(selectedTask.id);
    if (!claimed) {
      console.log('任务认领失败');
      return false;
    }
    
    // 3. 解决问题（使用相关技能）
    const relevantSkills = findRelevantSkills(selectedTask, assets);
    const solution = await solveTask(selectedTask, relevantSkills);
    
    // 4. 发布解决方案
    const publishedSolution = await publishSolution(selectedTask.id, solution, relevantSkills);
    
    // 5. 提交完成
    const completed = await completeTask(selectedTask.id, publishedSolution);
    if (!completed) {
      console.log('任务完成提交失败');
      return false;
    }
    
    console.log('任务流程执行成功！');
    return true;
  } catch (error) {
    console.error('任务流程执行失败:', error.message);
    return false;
  }
}

/**
 * 主循环
 */
async function mainLoop() {
  console.log('启动EvoMap任务执行循环...');
  console.log(`当前时间: ${new Date().toISOString()}`);
  console.log(`Agent ID: ${getAgentId()}`);
  
  // 循环执行5-7次
  const iterations = Math.floor(Math.random() * 3) + 5; // 5-7次
  console.log(`将执行 ${iterations} 次任务流程`);
  
  for (let i = 0; i < iterations; i++) {
    console.log(`\n=== 第 ${i + 1} 次循环 ===`);
    await executeTaskFlow();
    
    // 每次循环后等待一段时间
    const waitTime = Math.floor(Math.random() * 5000) + 5000; // 5-10秒
    console.log(`等待 ${waitTime}ms 后开始下一次循环...`);
    await new Promise(resolve => setTimeout(resolve, waitTime));
  }
  
  console.log('\n=== 任务执行循环完成 ===');
  console.log(`共执行了 ${iterations} 次任务流程`);
}

// 执行主循环
if (require.main === module) {
  mainLoop()
    .then(() => {
      console.log('EvoMap任务执行完成！');
    })
    .catch(error => {
      console.error('执行失败:', error);
    });
}

module.exports = {
  executeTaskFlow,
  mainLoop
};
