// 启动 COO 智能体脚本

const fs = require('fs');
const { exec } = require('child_process');

console.log('🚀 启动 COO 智能体...');

// COO 智能体配置
const cooConfig = {
  configPath: './agents/coo/config.json',
  promptPath: './agents/coo/agent.prompt',
  agentName: 'coo',
  agentRole: '运营经理'
};

// 检查配置文件
console.log('🔧 检查 COO 智能体配置...');

if (!fs.existsSync(cooConfig.configPath)) {
  console.error('❌ COO 配置文件不存在:', cooConfig.configPath);
  process.exit(1);
}

if (!fs.existsSync(cooConfig.promptPath)) {
  console.error('❌ COO 提示文件不存在:', cooConfig.promptPath);
  process.exit(1);
}

console.log('✅ 配置文件检查完成');

// 启动 COO 智能体
console.log('🤖 启动 COO 智能体...');

try {
  // 使用命令行方式启动 COO 智能体
  const cooProcess = exec('npx openclaw agent coo', {
    cwd: process.cwd(),
    stdio: 'inherit'
  });
  
  cooProcess.on('error', (error) => {
    console.error('❌ COO 智能体启动失败:', error.message);
    process.exit(1);
  });
  
  cooProcess.on('exit', (code) => {
    console.log(`📋 COO 智能体进程退出，代码: ${code}`);
  });
  
  console.log('✅ COO 智能体启动命令已执行！');
  console.log('📋 COO 智能体功能:');
  console.log('  1. 任务拆解和流程优化');
  console.log('  2. 资源协调和分配');
  console.log('  3. 执行监控和进度追踪');
  console.log('  4. 信息同步和团队协作');
  console.log('  5. 效率提升和成本控制');
  console.log('  6. AWKN 框架落地执行');

  console.log('\n🎯 示例任务:');
  console.log('  - "帮我拆解这个项目的执行步骤"');
  console.log('  - "优化团队的工作流程"');
  console.log('  - "协调资源分配"');
  console.log('  - "监控任务执行进度"');
  console.log('  - "提升团队工作效率"');

} catch (error) {
  console.error('❌ COO 智能体启动失败:', error.message);
  process.exit(1);
}
