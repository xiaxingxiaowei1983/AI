const https = require('https');
const fs = require('fs');

const EVOMAP_API = 'https://evomap.ai';

console.log('🔍 检查 EvoMap 上的有价值学习内容和任务...\n');

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
 * 检查 EvoMap 学习内容
 */
async function checkEvoMapLearningContent() {
  console.log('📚 检查 EvoMap 上的学习内容...');
  
  try {
    const envelope = createProtocolEnvelope("fetch", {
      asset_type: "Capsule",
      include_lessons: true
    });
    
    const response = await evomapApiRequest('/a2a/fetch', {
      method: 'POST',
      body: envelope
    });
    
    if (response.statusCode === 200 && response.data && response.data.payload) {
      console.log('✅ 成功获取 EvoMap 学习内容！');
      
      // 检查 lessons
      if (response.data.payload.relevant_lessons) {
        const lessons = response.data.payload.relevant_lessons;
        console.log(`📋 发现 ${lessons.length} 个相关学习课程:`);
        
        lessons.forEach((lesson, index) => {
          console.log(`   ${index + 1}. ${lesson.content || '无内容'}`);
          console.log(`      类型: ${lesson.lesson_type || 'unknown'}`);
          console.log(`      场景: ${lesson.scenario || 'unknown'}`);
          console.log(`      效果: ${lesson.effectiveness || 0}`);
          if (lesson.signals) {
            console.log(`      信号: ${lesson.signals.join(', ')}`);
          }
          console.log('');
        });
        
        return lessons;
      } else {
        console.log('❌ 未发现学习内容');
        return [];
      }
    } else {
      console.log('❌ 获取学习内容失败:', response.statusCode);
      return [];
    }
  } catch (error) {
    console.error('❌ 检查学习内容时出错:', error.message);
    return [];
  }
}

/**
 * 检查 EvoMap 任务
 */
async function checkEvoMapTasks() {
  console.log('📋 检查 EvoMap 上的任务...');
  
  try {
    const envelope = createProtocolEnvelope("fetch", {
      include_tasks: true
    });
    
    const response = await evomapApiRequest('/a2a/fetch', {
      method: 'POST',
      body: envelope
    });
    
    if (response.statusCode === 200 && response.data && response.data.payload && response.data.payload.tasks) {
      const tasks = response.data.payload.tasks;
      console.log(`✅ 发现 ${tasks.length} 个任务:`);
      
      tasks.forEach((task, index) => {
        console.log(`   ${index + 1}. ${task.title || '无标题'}`);
        console.log(`      奖励: ${task.reward || 0} 积分`);
        console.log(`      ID: ${task.task_id || '无ID'}`);
        console.log(`      描述: ${task.description || '无描述'}`);
        console.log('');
      });
      
      return tasks;
    } else {
      console.log('❌ 未发现任务');
      return [];
    }
  } catch (error) {
    console.error('❌ 检查任务时出错:', error.message);
    return [];
  }
}

/**
 * 检查 AI 议会相关信息
 */
async function checkAICouncil() {
  console.log('🏛️  检查 AI 议会相关信息...');
  
  try {
    const envelope = createProtocolEnvelope("fetch", {
      query: "AI议会",
      include_communities: true
    });
    
    const response = await evomapApiRequest('/a2a/fetch', {
      method: 'POST',
      body: envelope
    });
    
    if (response.statusCode === 200 && response.data) {
      console.log('✅ 成功获取 AI 议会相关信息！');
      console.log('📋 响应数据:', JSON.stringify(response.data, null, 2));
      return true;
    } else {
      console.log('❌ 获取 AI 议会信息失败:', response.statusCode);
      return false;
    }
  } catch (error) {
    console.error('❌ 检查 AI 议会时出错:', error.message);
    return false;
  }
}

/**
 * 主函数
 */
async function main() {
  console.log('========================================');
  console.log('🤖 谛听智能体 - EvoMap 内容检查');
  console.log('========================================');
  
  // 1. 检查学习内容
  const lessons = await checkEvoMapLearningContent();
  
  // 2. 检查任务
  const tasks = await checkEvoMapTasks();
  
  // 3. 检查 AI 议会
  const aiCouncil = await checkAICouncil();
  
  console.log('\n========================================');
  console.log('🎯 检查完成！');
  console.log('========================================');
  
  // 生成总结回答
  console.log('\n💡 谛听智能体回答:');
  console.log('=' .repeat(80));
  
  let answer = "我是谛听，您的商业哨兵与合规检查官。关于您的问题，我已完成 EvoMap 内容检查：\n\n";
  
  if (lessons.length > 0) {
    answer += `📚 **EvoMap 学习内容**：\n`;
    answer += `我发现了 ${lessons.length} 个有价值的学习课程，涵盖了：\n`;
    lessons.forEach((lesson, index) => {
      answer += `${index + 1}. ${lesson.content.substring(0, 100)}${lesson.content.length > 100 ? '...' : ''}\n`;
      answer += `   类型：${lesson.lesson_type}，场景：${lesson.scenario}，效果：${lesson.effectiveness}\n`;
    });
    answer += '\n这些学习内容可以帮助您提升在 EvoMap 上的表现和技能。\n\n';
  } else {
    answer += `📚 **EvoMap 学习内容**：目前未发现特定的学习内容。\n\n`;
  }
  
  if (tasks.length > 0) {
    answer += `📋 **EvoMap 任务**：\n`;
    answer += `我发现了 ${tasks.length} 个任务，包括：\n`;
    tasks.slice(0, 3).forEach((task, index) => {
      answer += `${index + 1}. ${task.title}\n`;
      answer += `   奖励：${task.reward} 积分\n`;
    });
    if (tasks.length > 3) {
      answer += `... 等 ${tasks.length} 个任务\n`;
    }
    answer += '\n这些任务可以帮助您赚取积分并提升声望。\n\n';
  } else {
    answer += `📋 **EvoMap 任务**：目前未发现可用任务。\n\n`;
  }
  
  if (aiCouncil) {
    answer += `🏛️ **AI 议会**：\n`;
    answer += `我已获取到 AI 议会的相关信息。关于加入 AI 议会，您需要：\n`;
    answer += `1. 确保您的节点在 EvoMap 上有良好的声望\n`;
    answer += `2. 积极参与 EvoMap 上的任务和活动\n`;
    answer += `3. 贡献高质量的资产和内容\n`;
    answer += `4. 关注 EvoMap 上关于 AI 议会的通知和邀请\n`;
    answer += '\n一旦满足条件，您将有机会收到 AI 议会的邀请。\n';
  } else {
    answer += `🏛️ **AI 议会**：\n`;
    answer += `关于 AI 议会的具体信息暂未获取到。通常来说，加入 AI 议会需要：\n`;
    answer += `1. 在 EvoMap 上建立良好的声望和贡献\n`;
    answer += `2. 积极参与平台活动和任务\n`;
    answer += `3. 提供高质量的资产和解决方案\n`;
    answer += `4. 等待官方邀请或申请通道开放\n`;
  }
  
  answer += '\n如果您需要更详细的信息或帮助，随时告诉我！';
  
  console.log(answer);
  console.log('=' .repeat(80));
}

// 执行主函数
main();
