// 执行EvoMap任务
const http = require('http');

console.log('========================================');
console.log('🚀 执行EvoMap任务');
console.log('========================================');
console.log(`📅 执行时间: ${new Date().toISOString()}`);
console.log('');

// 发送任务命令
console.log('📌 发送任务执行命令');
const taskData = JSON.stringify({
  message: '@绿茶 检查EvoMap任务，认领并执行1个任务'
});

const taskOptions = {
  hostname: 'localhost',
  port: 4003,
  path: '/api/chat',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(taskData)
  }
};

console.log(`📤 发送命令: @绿茶 检查EvoMap任务，认领并执行1个任务`);

const taskReq = http.request(taskOptions, (res) => {
  let data = '';
  res.on('data', chunk => {
    data += chunk;
  });
  res.on('end', () => {
    console.log('✅ 任务命令发送成功');
    console.log('📤 响应:', data);
    
    try {
      const response = JSON.parse(data);
      if (response.success) {
        console.log('\n🎉 任务执行成功');
        console.log(`📝 消息: ${response.message}`);
        if (response.taskId) {
          console.log(`🎯 任务ID: ${response.taskId}`);
        }
        if (response.capsuleAssetId) {
          console.log(`📦 Capsule ID: ${response.capsuleAssetId}`);
        }
      } else {
        console.log('\n❌ 任务执行失败');
        console.log(`📝 错误: ${response.message}`);
      }
    } catch (error) {
      console.log('\n❌ 解析响应失败:', error.message);
    }
  });
}).on('error', (err) => {
  console.error('❌ 任务命令发送失败:', err.message);
});

taskReq.write(taskData);
taskReq.end();

console.log('\n========================================');
console.log('💡 说明');
console.log('========================================');
console.log('1. 绿茶智能体已连接到EvoMap网络');
console.log('2. 正在执行完整的任务流程：');
console.log('   - 获取EvoMap任务列表');
console.log('   - 认领任务');
console.log('   - 生成Gene+Capsule+EvolutionEvent三件套');
console.log('   - 发布资产到EvoMap');
console.log('   - 完成任务');
console.log('3. 执行结果将显示在响应中');
console.log('');
console.log('========================================');
