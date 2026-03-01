// 与绿茶智能体交互执行EvoMap任务
const http = require('http');

console.log('========================================');
console.log('🚀 与绿茶智能体交互执行EvoMap任务');
console.log('========================================');
console.log(`📅 执行时间: ${new Date().toISOString()}`);
console.log('');

// 1. 检查绿茶智能体状态
console.log('📌 步骤1: 检查绿茶智能体状态');
http.get('http://localhost:4003/api/status', (res) => {
  let data = '';
  res.on('data', chunk => {
    data += chunk;
  });
  res.on('end', () => {
    console.log('✅ 绿茶智能体状态:', data);
    const status = JSON.parse(data);
    console.log(`📍 智能体名称: ${status.agentName}`);
    console.log(`👤 角色: ${status.agentRole}`);
    console.log(`🔄 执行中: ${status.isExecuting}`);
    console.log('');
    
    // 2. 发送任务命令
    console.log('📌 步骤2: 发送EvoMap任务命令');
    const taskMessage = '@绿茶 检查EvoMap任务，认领并执行1个任务';
    sendCommand(taskMessage);
  });
}).on('error', (err) => {
  console.error('❌ 获取状态失败:', err.message);
  process.exit(1);
});

// 发送命令到绿茶智能体
function sendCommand(message) {
  const postData = JSON.stringify({
    message: message
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

  console.log(`📤 发送命令: ${message.substring(0, 50)}...`);
  
  const req = http.request(options, (res) => {
    let data = '';
    res.on('data', chunk => {
      data += chunk;
    });
    res.on('end', () => {
      console.log('✅ 命令发送成功');
      console.log('📤 响应:', data);
      const response = JSON.parse(data);
      
      if (response.success) {
        console.log('🎉 命令执行成功');
        console.log(`📝 任务: ${response.task}`);
        console.log(`📡 状态: ${response.status}`);
      } else {
        console.log('❌ 命令执行失败');
      }
    });
  }).on('error', (err) => {
    console.error('❌ 命令发送失败:', err.message);
  });

  req.write(postData);
  req.end();
}

console.log('');
console.log('========================================');
console.log('💡 说明');
console.log('========================================');
console.log('1. 绿茶智能体代理服务器已启动在端口4003');
console.log('2. 可以通过HTTP API与绿茶智能体交互');
console.log('3. 绿茶智能体会处理@绿茶触发器命令');
console.log('4. 绿茶智能体可以与EvoMap交互并执行任务');
console.log('');
console.log('🎯 绿茶智能体现在可以:');
console.log('   ✅ 接收和处理@绿茶命令');
console.log('   ✅ 检查EvoMap任务');
console.log('   ✅ 认领并执行任务');
console.log('   ✅ 发布Gene+Capsule+EvolutionEvent三件套');
console.log('   ✅ 实时响应对话中的指令');
console.log('');
console.log('========================================');
