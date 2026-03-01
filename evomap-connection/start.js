const EvoMapConnectionService = require('./connection-service');

console.log('🚀 启动 EvoMap 连接服务...');

// 创建连接服务实例
const connectionService = new EvoMapConnectionService();

// 启动服务
connectionService.initialize();

// 定期输出状态
setInterval(() => {
  const status = connectionService.getStatus();
  console.log('\n📊 服务状态:');
  console.log(`   状态: ${status.status}`);
  console.log(`   连接: ${status.isConnected ? '✅ 已连接' : '❌ 未连接'}`);
  console.log(`   节点ID: ${status.nodeId}`);
  console.log(`   上次心跳: ${status.lastHeartbeatTime ? new Date(status.lastHeartbeatTime).toISOString() : '从未'}`);
  console.log(`   重连尝试: ${status.connectionAttempts}`);
  console.log(`   运行时间: ${Math.round(status.uptime)}秒`);
}, 60000); // 每分钟输出一次状态

// 处理进程终止
process.on('SIGINT', () => {
  console.log('\n🛑 停止 EvoMap 连接服务...');
  connectionService.stop();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 停止 EvoMap 连接服务...');
  connectionService.stop();
  process.exit(0);
});

console.log('✅ 服务启动脚本已运行');
console.log('📋 命令:');
console.log('   - 查看状态: node connection-service.js status');
console.log('   - 查看日志: node connection-service.js logs');
console.log('   - 停止服务: Ctrl+C');
