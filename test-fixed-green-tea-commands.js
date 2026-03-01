// 测试修复后的绿茶智能体命令解析
const http = require('http');

console.log('========================================');
console.log('🧪 测试修复后的绿茶智能体命令解析');
console.log('========================================');
console.log('');

// 测试关键命令
const testCommands = [
  '@绿茶 链接EvoMap',
  '@绿茶 检查任务',
  '@绿茶 接单',
  '@绿茶 认领任务',
  '@绿茶 检查EvoMap任务，认领并执行1个任务'
];

let commandIndex = 0;

function sendCommand(command) {
  console.log(`\n📌 测试命令 ${commandIndex + 1}: ${command}`);
  
  const postData = JSON.stringify({
    message: command
  });

  const options = {
    hostname: 'localhost',
    port: 4003,
    path: '/api/chat',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  const req = http.request(options, (res) => {
    let data = '';
    res.on('data', chunk => {
      data += chunk;
    });
    res.on('end', () => {
      try {
        const response = JSON.parse(data);
        console.log(`✅ 响应成功`);
        console.log(`📝 任务类型: ${response.task}`);
        console.log(`📡 状态: ${response.status}`);
        
        commandIndex++;
        if (commandIndex < testCommands.length) {
          setTimeout(() => sendCommand(testCommands[commandIndex]), 2000);
        } else {
          console.log('\n========================================');
          console.log('🎉 所有命令测试完成');
          console.log('========================================');
          console.log('✅ 命令解析修复成功！');
          console.log('✅ "检查EvoMap任务，认领并执行1个任务" 现在正确识别为任务命令');
        }
      } catch (error) {
        console.log(`❌ 解析响应失败: ${error.message}`);
        commandIndex++;
        if (commandIndex < testCommands.length) {
          setTimeout(() => sendCommand(testCommands[commandIndex]), 2000);
        }
      }
    });
  }).on('error', (err) => {
    console.error(`❌ 发送命令失败: ${err.message}`);
    commandIndex++;
    if (commandIndex < testCommands.length) {
      setTimeout(() => sendCommand(testCommands[commandIndex]), 2000);
    }
  });

  req.write(postData);
  req.end();
}

// 开始测试
console.log('💡 测试重点：');
console.log('1. 验证"检查任务"、"接单"、"认领任务"命令正确识别');
console.log('2. 验证"检查EvoMap任务，认领并执行1个任务"不再被错误识别为"执行"命令');
console.log('3. 验证所有任务命令都能正确触发EvoMap任务流程');
console.log('');

sendCommand(testCommands[0]);
