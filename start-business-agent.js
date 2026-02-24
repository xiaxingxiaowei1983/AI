// 启动谛听智能体脚本

const { OpenClaw } = require('openclaw');
const fs = require('fs');

console.log('🚀 启动谛听智能体...');

// 谛听智能体配置
const businessConfig = {
  configPath: './agents/business/config.json',
  promptPath: './agents/business/agent.prompt',
  useTreaInternalModel: true,
  continuousMode: true,
  agentName: 'business',
  agentRole: 'CCO / 风险哨兵'
};

// 检查配置文件
console.log('🔧 检查谛听智能体配置...');

if (!fs.existsSync(businessConfig.configPath)) {
  console.error('❌ 谛听配置文件不存在:', businessConfig.configPath);
  process.exit(1);
}

if (!fs.existsSync(businessConfig.promptPath)) {
  console.error('❌ 谛听提示文件不存在:', businessConfig.promptPath);
  process.exit(1);
}

console.log('✅ 配置文件检查完成');

// 初始化谛听智能体
console.log('📋 初始化谛听智能体...');

try {
  // 使用命令行方式启动谛听智能体（使用Trea内置模型）
  const { exec } = require('child_process');
  
  const businessProcess = exec('npx openclaw agent --agent business --message "启动谛听智能体并初始化系统" --local', {
    cwd: process.cwd(),
    stdio: 'inherit'
  });
  
  businessProcess.on('error', (error) => {
    console.error('❌ 谛听智能体启动失败:', error.message);
    process.exit(1);
  });
  
  businessProcess.on('exit', (code) => {
    console.log(`🔍 谛听智能体进程退出，代码: ${code}`);
  });
  
  console.log('✅ 谛听智能体启动命令已执行！');
  console.log('📋 谛听智能体功能:');
  console.log('  1. 市场监控和风险识别');
  console.log('  2. 合规审计和监管跟踪');
  console.log('  3. 商业洞察和市场分析');
  console.log('  4. 风险评估和预警');
  console.log('  5. 竞争情报分析');
  console.log('  6. AWKN 框架落地执行');

  console.log('\n🎯 示例任务:');
  console.log('  - "分析当前市场趋势"');
  console.log('  - "识别潜在风险"');
  console.log('  - "进行合规审计"');
  console.log('  - "提供商业洞察"');
  console.log('  - "监控竞争对手动态"');

} catch (error) {
  console.error('❌ 谛听智能体启动失败:', error.message);
  process.exit(1);
}
