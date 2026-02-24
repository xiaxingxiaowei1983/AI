// 启动公司大脑智能体脚本

const { OpenClaw } = require('openclaw');

console.log('🚀 启动公司大脑智能体...');

// 初始化公司大脑智能体
const claw = new OpenClaw({
  configPath: './agents/company-brain-agent/openclaw.json',
  promptPath: './agents/company-brain-agent/agent.prompt',
  useTreaInternalModel: true,
  continuousMode: true
});

// 启动 Evo 知识管理系统
console.log('📚 启动 Evo 知识管理系统...');
claw.startEvo();

// 启动智能体
console.log('🤖 启动公司大脑智能体...');
claw.startAgent();

console.log('✅ 公司大脑智能体启动成功！');
console.log('📋 公司大脑智能体功能:');
console.log('  1. 智能体管理和调度');
console.log('  2. 任务分配和监控');
console.log('  3. 知识管理和共享');
console.log('  4. 智能体协作协调');
console.log('  5. 与 EvoMap 集成');
console.log('  6. 性能监控和优化');

console.log('\n🎯 示例任务:');
console.log('  - "帮我分配一个前端开发任务给最适合的智能体"');
console.log('  - "监控所有智能体的当前状态"');
console.log('  - "从 EvoMap 获取最新的任务和资源"');
console.log('  - "优化智能体的任务分配策略"');

// 保持进程运行
process.stdin.resume();