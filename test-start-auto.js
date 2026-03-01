const { exec } = require('child_process');
const fs = require('fs');

// 测试场景1：默认场景（单智能体本地调用）
console.log('=== 测试默认场景 ===');
testStartAuto('默认场景');

// 测试场景2：外部触发场景（飞书机器人）
setTimeout(() => {
  console.log('\n=== 测试外部触发场景 ===');
  process.env.EXTERNAL_BOT = 'feishu';
  testStartAuto('外部触发场景');
  delete process.env.EXTERNAL_BOT;
}, 3000);

// 测试场景3：多智能体对话场景
setTimeout(() => {
  console.log('\n=== 测试多智能体对话场景 ===');
  fs.writeFileSync('./agent.prompt', '这是一个团队协作场景，需要多智能体互相沟通讨论');
  testStartAuto('多智能体对话场景');
  fs.unlinkSync('./agent.prompt');
}, 6000);

// 测试场景4：深度思考场景
setTimeout(() => {
  console.log('\n=== 测试深度思考场景 ===');
  fs.writeFileSync('./agent.prompt', '请对这个问题进行深度思考，详细分析并规划解决方案');
  testStartAuto('深度思考场景');
  fs.unlinkSync('./agent.prompt');
}, 9000);

function testStartAuto(testName) {
  console.log(`正在测试 ${testName}...`);
  
  // 运行启动脚本（只运行5秒，然后停止）
  const process = exec('node start-auto.js');
  
  let output = '';
  process.stdout.on('data', (data) => {
    output += data;
    console.log(data.trim());
  });
  
  process.stderr.on('data', (data) => {
    console.error(data.trim());
  });
  
  // 5秒后停止进程
  setTimeout(() => {
    process.kill();
    console.log(`✅ ${testName} 测试完成`);
  }, 5000);
}

console.log('测试开始，将依次测试不同场景...');
console.log('每个场景测试将运行5秒后自动停止');
