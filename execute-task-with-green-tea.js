// 通过绿茶智能体执行EvoMap任务
const http = require('http');

console.log('========================================');
console.log('🚀 通过绿茶智能体执行EvoMap任务');
console.log('========================================');
console.log(`📅 执行时间: ${new Date().toISOString()}`);
console.log('');

// 步骤1: 连接EvoMap
console.log('📌 步骤1: 连接EvoMap');
const connectData = JSON.stringify({
  message: '@绿茶 链接EvoMap'
});

const connectOptions = {
  hostname: 'localhost',
  port: 4003,
  path: '/api/chat',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(connectData)
  }
};

const connectReq = http.request(connectOptions, (res) => {
  let data = '';
  res.on('data', chunk => {
    data += chunk;
  });
  res.on('end', () => {
    console.log('✅ 连接EvoMap命令发送成功');
    console.log('📤 响应:', data);
    
    try {
      const connectResponse = JSON.parse(data);
      if (connectResponse.success) {
        console.log('\n✅ EvoMap连接成功');
        console.log('📡 节点ID:', connectResponse.message.match(/节点ID: (\S+)/)?.[1]);
        
        // 步骤2: 执行任务
        console.log('\n📌 步骤2: 执行EvoMap任务');
        executeTask();
      } else {
        console.log('\n❌ EvoMap连接失败');
        console.log('📝 错误:', connectResponse.message);
      }
    } catch (error) {
      console.log('\n❌ 解析连接响应失败:', error.message);
    }
  });
}).on('error', (err) => {
  console.error('❌ 连接EvoMap命令发送失败:', err.message);
});

connectReq.write(connectData);
connectReq.end();

// 执行任务
function executeTask() {
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
        const taskResponse = JSON.parse(data);
        if (taskResponse.success) {
          console.log('\n🎉 任务执行成功');
          console.log(`📝 消息: ${taskResponse.message}`);
          if (taskResponse.taskId) {
            console.log(`🎯 任务ID: ${taskResponse.taskId}`);
          }
          if (taskResponse.capsuleAssetId) {
            console.log(`📦 Capsule ID: ${taskResponse.capsuleAssetId}`);
          }
        } else {
          console.log('\n❌ 任务执行失败');
          console.log(`📝 错误: ${taskResponse.message}`);
        }
      } catch (error) {
        console.log('\n❌ 解析任务响应失败:', error.message);
      }
    });
  }).on('error', (err) => {
    console.error('❌ 任务命令发送失败:', err.message);
  });

  taskReq.write(taskData);
  taskReq.end();
}

console.log('\n========================================');
console.log('💡 说明');
console.log('========================================');
console.log('1. 绿茶智能体将连接到EvoMap网络');
console.log('2. 连接成功后，将执行完整的任务流程：');
console.log('   - 获取EvoMap任务列表');
console.log('   - 认领任务');
console.log('   - 生成Gene+Capsule+EvolutionEvent三件套');
console.log('   - 发布资产到EvoMap');
console.log('   - 完成任务');
console.log('3. 执行结果将显示在响应中');
console.log('');
console.log('========================================');
