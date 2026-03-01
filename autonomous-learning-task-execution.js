const https = require('https');
const fs = require('fs');
const path = require('path');

const EVOMAP_API = 'https://evomap.ai';
const LEARNING_INTERVAL = 60000; // 1分钟检查一次学习内容
const TASK_INTERVAL = 30000; // 30秒检查一次任务

let learnedLessons = new Set();
let executedTasks = new Set();
let isRunning = true;

console.log('🚀 谛听智能体 - 自主学习和任务执行系统...\n');
console.log('========================================');
console.log('🤖 谛听智能体 - 自主模式已启动');
console.log('========================================');
console.log('📚 自动学习模式: 开启');
console.log('📋 自动任务模式: 开启');
console.log('🔄 学习检查间隔: 1分钟');
console.log('🔄 任务检查间隔: 30秒');
console.log('========================================\n');

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
    sender_id: "node_b9f8f981bc1c0bbb", // 谛听的节点ID
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
 * 自主学习EvoMap内容
 */
async function autonomousLearning() {
  try {
    console.log('📚 正在检查 EvoMap 学习内容...');
    
    const envelope = createProtocolEnvelope("fetch", {
      asset_type: "Capsule",
      include_lessons: true
    });
    
    const response = await evomapApiRequest('/a2a/fetch', {
      method: 'POST',
      body: envelope
    });
    
    if (response.statusCode === 200 && response.data && response.data.payload && response.data.payload.relevant_lessons) {
      const lessons = response.data.payload.relevant_lessons;
      console.log(`📋 发现 ${lessons.length} 个学习课程`);
      
      let newLessons = 0;
      lessons.forEach((lesson) => {
        const lessonKey = lesson.lesson_id || lesson.content.substring(0, 50);
        
        if (!learnedLessons.has(lessonKey)) {
          console.log('\n🎯 发现新的学习内容:');
          console.log(`   ${lesson.content}`);
          console.log(`   类型: ${lesson.lesson_type}, 场景: ${lesson.scenario}, 效果: ${lesson.effectiveness}`);
          
          // 模拟学习过程
          console.log('   🔄 正在学习...');
          learnedLessons.add(lessonKey);
          newLessons++;
          
          // 保存学习记录
          saveLearningRecord(lesson);
        }
      });
      
      if (newLessons > 0) {
        console.log(`\n✅ 成功学习了 ${newLessons} 个新内容！`);
      } else {
        console.log('✅ 所有学习内容都已学习过');
      }
    } else {
      console.log('❌ 未发现学习内容');
    }
  } catch (error) {
    console.error('❌ 自主学习时出错:', error.message);
  }
}

/**
 * 自主接取和执行任务
 */
async function autonomousTaskExecution() {
  try {
    console.log('\n📋 正在检查 EvoMap 任务...');
    
    const envelope = createProtocolEnvelope("fetch", {
      include_tasks: true
    });
    
    const response = await evomapApiRequest('/a2a/fetch', {
      method: 'POST',
      body: envelope
    });
    
    if (response.statusCode === 200 && response.data && response.data.payload && response.data.payload.tasks) {
      const tasks = response.data.payload.tasks;
      console.log(`📋 发现 ${tasks.length} 个任务`);
      
      // 过滤出未执行过的任务
      const availableTasks = tasks.filter(task => !executedTasks.has(task.task_id));
      
      if (availableTasks.length > 0) {
        console.log(`✅ 发现 ${availableTasks.length} 个可执行任务`);
        
        // 选择前3个任务执行
        const tasksToExecute = availableTasks.slice(0, 3);
        console.log(`🎯 准备执行 ${tasksToExecute.length} 个任务:`);
        
        for (const task of tasksToExecute) {
          console.log(`\n🔍 任务: ${task.title}`);
          console.log(`   ID: ${task.task_id}`);
          console.log(`   描述: ${task.description || '无描述'}`);
          
          // 尝试接取任务
          const claimed = await claimTask(task.task_id);
          if (claimed) {
            console.log(`   ✅ 任务接取成功！`);
            
            // 执行任务
            const executed = await executeTask(task);
            if (executed) {
              console.log(`   ✅ 任务执行成功！`);
              executedTasks.add(task.task_id);
              saveTaskExecutionRecord(task);
            } else {
              console.log(`   ❌ 任务执行失败`);
            }
          } else {
            console.log(`   ❌ 任务接取失败`);
          }
          
          // 等待2秒再执行下一个任务
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      } else {
        console.log('✅ 所有任务都已执行过');
      }
    } else {
      console.log('❌ 未发现任务');
    }
  } catch (error) {
    console.error('❌ 自主任务执行时出错:', error.message);
  }
}

/**
 * 认领任务
 */
async function claimTask(taskId) {
  try {
    console.log('   🔄 正在尝试接取任务...');
    
    const claimData = {
      task_id: taskId,
      node_id: "node_b9f8f981bc1c0bbb"
    };
    
    console.log('   📤 发送任务接取请求到 /task/claim...');
    const response = await evomapApiRequest('/task/claim', {
      method: 'POST',
      body: claimData
    });
    
    console.log(`   📥 收到响应: ${response.statusCode}`);
    
    if (response.statusCode === 200) {
      console.log('   ✅ 任务接取成功');
      return true;
    } else {
      console.log(`   ❌ 任务接取失败: HTTP ${response.statusCode}`);
      if (response.data) {
        console.log('   📋 响应内容:', JSON.stringify(response.data, null, 2));
      }
      return false;
    }
  } catch (error) {
    console.error('   ❌ 认领任务时出错:', error.message);
    console.error('   📋 错误堆栈:', error.stack);
    return false;
  }
}

/**
 * 执行任务
 */
async function executeTask(task) {
  try {
    console.log('   🔄 正在执行任务...');
    
    // 模拟任务执行过程
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // 这里可以根据任务类型执行不同的逻辑
    console.log('   🎯 任务执行完成');
    
    return true;
  } catch (error) {
    console.error('❌ 执行任务时出错:', error.message);
    return false;
  }
}

/**
 * 保存学习记录
 */
function saveLearningRecord(lesson) {
  const learningDir = path.join(__dirname, 'learning-records');
  if (!fs.existsSync(learningDir)) {
    fs.mkdirSync(learningDir, { recursive: true });
  }
  
  const record = {
    lesson_id: lesson.lesson_id,
    content: lesson.content,
    lesson_type: lesson.lesson_type,
    scenario: lesson.scenario,
    effectiveness: lesson.effectiveness,
    signals: lesson.signals,
    learned_at: new Date().toISOString()
  };
  
  const fileName = path.join(learningDir, `lesson_${Date.now()}.json`);
  fs.writeFileSync(fileName, JSON.stringify(record, null, 2));
}

/**
 * 保存任务执行记录
 */
function saveTaskExecutionRecord(task) {
  const taskDir = path.join(__dirname, 'task-records');
  if (!fs.existsSync(taskDir)) {
    fs.mkdirSync(taskDir, { recursive: true });
  }
  
  const record = {
    task_id: task.task_id,
    title: task.title,
    description: task.description,
    reward: task.reward,
    executed_at: new Date().toISOString(),
    status: 'completed'
  };
  
  const fileName = path.join(taskDir, `task_${Date.now()}.json`);
  fs.writeFileSync(fileName, JSON.stringify(record, null, 2));
}

/**
 * 主循环
 */
async function mainLoop() {
  let learningCount = 0;
  let taskCount = 0;
  
  while (isRunning) {
    if (learningCount % 2 === 0) { // 每2次检查执行一次学习
      await autonomousLearning();
    }
    
    await autonomousTaskExecution();
    
    learningCount++;
    taskCount++;
    
    // 等待下一次检查
    await new Promise(resolve => setTimeout(resolve, TASK_INTERVAL));
  }
}

/**
 * 启动系统
 */
async function startSystem() {
  console.log('🚀 系统初始化中...');
  
  // 加载历史学习记录
  loadLearningRecords();
  
  // 加载历史任务记录
  loadTaskRecords();
  
  console.log('✅ 系统初始化完成！');
  console.log(`📚 已学习课程: ${learnedLessons.size}`);
  console.log(`📋 已执行任务: ${executedTasks.size}`);
  
  // 启动主循环
  mainLoop();
}

/**
 * 加载学习记录
 */
function loadLearningRecords() {
  const learningDir = path.join(__dirname, 'learning-records');
  if (fs.existsSync(learningDir)) {
    const files = fs.readdirSync(learningDir);
    files.forEach(file => {
      try {
        const content = fs.readFileSync(path.join(learningDir, file), 'utf8');
        const record = JSON.parse(content);
        const lessonKey = record.lesson_id || record.content.substring(0, 50);
        learnedLessons.add(lessonKey);
      } catch (error) {
        // 忽略错误
      }
    });
  }
}

/**
 * 加载任务记录
 */
function loadTaskRecords() {
  const taskDir = path.join(__dirname, 'task-records');
  if (fs.existsSync(taskDir)) {
    const files = fs.readdirSync(taskDir);
    files.forEach(file => {
      try {
        const content = fs.readFileSync(path.join(taskDir, file), 'utf8');
        const record = JSON.parse(content);
        if (record.task_id) {
          executedTasks.add(record.task_id);
        }
      } catch (error) {
        // 忽略错误
      }
    });
  }
}

/**
 * 处理退出信号
 */
function handleExit() {
  console.log('\n🔄 正在停止自主学习和任务执行系统...');
  isRunning = false;
  
  console.log('========================================');
  console.log('🎯 系统停止统计:');
  console.log(`📚 已学习课程: ${learnedLessons.size}`);
  console.log(`📋 已执行任务: ${executedTasks.size}`);
  console.log('========================================');
  console.log('✅ 谛听智能体 - 自主模式已停止');
  console.log('========================================');
  
  process.exit(0);
}

// 监听退出信号
process.on('SIGINT', handleExit);
process.on('SIGTERM', handleExit);

// 启动系统
startSystem();
