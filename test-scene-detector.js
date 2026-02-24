const { detectScene } = require('./scene-detector');

// 测试默认场景
console.log('=== 测试默认场景 ===');
try {
  const defaultMode = detectScene();
  console.log(`默认场景识别结果: ${defaultMode}`);
} catch (error) {
  console.error('默认场景测试错误:', error.message);
}

// 测试外部触发场景
console.log('\n=== 测试外部触发场景 ===');
try {
  // 设置环境变量模拟外部触发
  process.env.EXTERNAL_BOT = 'feishu';
  const externalMode = detectScene();
  console.log(`外部触发场景识别结果: ${externalMode}`);
  // 清理环境变量
  delete process.env.EXTERNAL_BOT;
} catch (error) {
  console.error('外部触发场景测试错误:', error.message);
}

// 测试多智能体对话场景
console.log('\n=== 测试多智能体对话场景 ===');
try {
  // 创建临时agent.prompt文件，包含多智能体关键词
  const fs = require('fs');
  fs.writeFileSync('./agent.prompt', '这是一个团队协作场景，需要多智能体互相沟通讨论');
  const multiAgentMode = detectScene();
  console.log(`多智能体对话场景识别结果: ${multiAgentMode}`);
  // 清理临时文件
  fs.unlinkSync('./agent.prompt');
} catch (error) {
  console.error('多智能体对话场景测试错误:', error.message);
}

// 测试深度思考场景
console.log('\n=== 测试深度思考场景 ===');
try {
  // 创建临时agent.prompt文件，包含深度思考关键词
  const fs = require('fs');
  fs.writeFileSync('./agent.prompt', '请对这个问题进行深度思考，详细分析并规划解决方案');
  const deepThinkingMode = detectScene();
  console.log(`深度思考场景识别结果: ${deepThinkingMode}`);
  // 清理临时文件
  fs.unlinkSync('./agent.prompt');
} catch (error) {
  console.error('深度思考场景测试错误:', error.message);
}

console.log('\n=== 测试完成 ===');
