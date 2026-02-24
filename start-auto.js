const { detectScene } = require('./scene-detector');
const path = require('path');
const { exec } = require('child_process');
const fs = require('fs');

// 第一步：智能识别场景（支持手动参数兜底）
const manualMode = process.argv[2]; // 手动指定模式（trea/doubao）
const mode = manualMode || detectScene(); // 有手动参数则优先，否则自动识别

// 第二步：配置文件映射
const configMap = {
  trea: path.join(__dirname, './openclaw-trea.json'),
  doubao: path.join(__dirname, './openclaw-doubao.json')
};

// 验证配置文件存在
if (!fs.existsSync(configMap[mode])) {
  console.error(`❌ 配置文件不存在: ${configMap[mode]}`);
  process.exit(1);
}

// 第三步：处理环境变量（豆包API Key）
if (mode === 'doubao' && !process.env.DOUBAO_API_KEY) {
  console.warn('⚠️  未设置 DOUBAO_API_KEY 环境变量，将使用配置文件中的占位符');
}

// 第四步：自动启动对应网关（无需手动敲网关命令）
console.log(`🚀 正在启动OpenClaw网关（${mode}模式）...`);
const gatewayCommand = mode === "trea"  
  ? "npx openclaw gateway --port 18789"  
  : "npx openclaw gateway --port 18789";

// 执行网关启动命令
const gatewayProcess = exec(gatewayCommand);
gatewayProcess.stdout.on('data', (data) => {
  console.log(`网关日志：${data.trim()}`);
});
gatewayProcess.stderr.on('data', (data) => {
  console.error(`网关错误：${data.trim()}`);
});

// 网关启动后（延迟2秒确保网关就绪），初始化OpenClaw
setTimeout(() => {
  console.log(`✅ OpenClaw网关已启动（${mode === 'trea' ? 'Trae内置模型' : '豆包API模型'}）`);
  console.log(`📁 使用配置文件：${configMap[mode]}`);
  console.log(`🌐 访问地址：http://localhost:18789/chat?session=main`);
  console.log(`\n💡 提示：`);
  console.log(`   - 按 Ctrl+C 停止服务`);
  console.log(`   - 手动切换模式：node start-auto.js [trea|doubao]`);
  console.log(`   - 飞书/微信机器人场景：设置 EXTERNAL_BOT 环境变量`);
}, 2000);

// 监听退出信号，优雅关闭网关
process.on('SIGINT', () => {
  console.log("\n🛑 正在关闭OpenClaw和网关...");
  gatewayProcess.kill();
  setTimeout(() => {
    process.exit(0);
  }, 1000);
});

// 监听网关进程退出
gatewayProcess.on('exit', (code) => {
  console.log(`网关进程已退出，退出码：${code}`);
  process.exit(code || 0);
});

console.log(`\n📋 启动配置：`);
console.log(`   - 运行模式：${mode.toUpperCase()}`);
console.log(`   - 配置文件：${configMap[mode]}`);
console.log(`   - 网关命令：${gatewayCommand}`);
console.log(`   - 手动切换：node start-auto.js [trea|doubao]`);
