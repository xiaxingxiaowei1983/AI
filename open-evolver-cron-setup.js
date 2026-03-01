const { exec } = require('child_process');

console.log('========================================');
console.log('🚀 进化系统与OpenClaw定时任务集成');
console.log('========================================');
console.log('');
console.log('📋 请按照以下步骤在 OpenClaw 中创建定时任务:');
console.log('');
console.log('步骤 1: 打开 OpenClaw 定时任务页面');
console.log('   地址: http://127.0.0.1:18789/cron');
console.log('   令牌: 2e47ede431dbd73de7ae4a2556ba69260427d1269e8878da');
console.log('');
console.log('步骤 2: 点击 "New Job" 创建新任务');
console.log('');
console.log('步骤 3: 填写以下配置:');
console.log('');
console.log('   基本信息:');
console.log('   - Name: 进化系统报告');
console.log('   - Description: 定期执行进化系统并生成进化报告');
console.log('   - Agent ID: business (谛听)');
console.log('   - Enabled: ✓');
console.log('');
console.log('   计划:');
console.log('   - Schedule: Every');
console.log('   - Every: 1');
console.log('   - Unit: hours');
console.log('');
console.log('   执行:');
console.log('   - Session: isolated');
console.log('   - Wake mode: now');
console.log('   - What should run?: Run assistant task (isolated)');
console.log('   - Prompt: 请执行进化系统并生成最新的进化报告');
console.log('');
console.log('   投递:');
console.log('   - Result delivery: Announce summary (default)');
console.log('   - Channel: feishu');
console.log('');
console.log('步骤 4: 点击 "Add job" 保存任务');
console.log('');
console.log('========================================');
console.log('正在打开 OpenClaw 定时任务页面...');
console.log('========================================');

// 打开浏览器
const url = 'http://127.0.0.1:18789/cron';
const platform = process.platform;

if (platform === 'win32') {
  exec(`start ${url}`);
} else if (platform === 'darwin') {
  exec(`open ${url}`);
} else {
  exec(`xdg-open ${url}`);
}

console.log('');
console.log('✅ 已在浏览器中打开 OpenClaw 定时任务页面');
console.log('');
console.log('💡 提示: 如果需要输入令牌，请使用以下令牌:');
console.log('   2e47ede431dbd73de7ae4a2556ba69260427d1269e8878da');
console.log('');