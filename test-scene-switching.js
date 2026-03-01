const { detectScene } = require('./scene-detector');
const fs = require('fs');
const path = require('path');

// 测试场景1：默认场景（单智能体本地调用）
console.log('=== 测试默认场景 ===');
testSceneSwitching('默认场景');

// 测试场景2：外部触发场景（飞书机器人）
setTimeout(() => {
  console.log('\n=== 测试外部触发场景 ===');
  process.env.EXTERNAL_BOT = 'feishu';
  testSceneSwitching('外部触发场景');
  delete process.env.EXTERNAL_BOT;
}, 1000);

// 测试场景3：多智能体对话场景
setTimeout(() => {
  console.log('\n=== 测试多智能体对话场景 ===');
  fs.writeFileSync('./agent.prompt', '这是一个团队协作场景，需要多智能体互相沟通讨论');
  testSceneSwitching('多智能体对话场景');
  fs.unlinkSync('./agent.prompt');
}, 2000);

// 测试场景4：深度思考场景
setTimeout(() => {
  console.log('\n=== 测试深度思考场景 ===');
  fs.writeFileSync('./agent.prompt', '请对这个问题进行深度思考，详细分析并规划解决方案');
  testSceneSwitching('深度思考场景');
  fs.unlinkSync('./agent.prompt');
}, 3000);

function testSceneSwitching(testName) {
  console.log(`正在测试 ${testName}...`);
  
  // 检测场景
  const mode = detectScene();
  console.log(`场景识别结果: ${mode}`);
  
  // 配置文件映射
  const configMap = {
    trea: path.join(__dirname, './openclaw-trea.json'),
    doubao: path.join(__dirname, './openclaw-doubao.json')
  };
  
  // 验证配置文件存在
  if (!fs.existsSync(configMap[mode])) {
    console.error(`❌ 配置文件不存在: ${configMap[mode]}`);
    return;
  }
  
  // 复制对应配置文件到默认位置
  const defaultConfigPath = path.join(__dirname, './openclaw.json');
  fs.copyFileSync(configMap[mode], defaultConfigPath);
  console.log(`📄 已复制配置文件到默认位置: ${defaultConfigPath}`);
  
  // 验证配置文件内容
  const configContent = fs.readFileSync(defaultConfigPath, 'utf8');
  const expectedModel = mode === 'trea' ? 'trea' : 'doubao';
  if (configContent.includes(`"${expectedModel}"`)) {
    console.log(`✅ 配置文件正确包含 ${expectedModel} 模型配置`);
  } else {
    console.error(`❌ 配置文件未包含 ${expectedModel} 模型配置`);
  }
  
  console.log(`✅ ${testName} 测试完成`);
}

console.log('测试开始，将依次测试不同场景...');
