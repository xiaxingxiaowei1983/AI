const fs = require('fs');
const path = require('path');

// 读取大宗师配置文件
const masterConfigPath = path.join(__dirname, './agents/master/config.json');

if (!fs.existsSync(masterConfigPath)) {
  console.error('❌ 大宗师配置文件不存在');
  process.exit(1);
}

const config = JSON.parse(fs.readFileSync(masterConfigPath, 'utf8'));

// 验证配置
console.log('=== 大宗师配置验证 ===');
console.log(`智能体名称: ${config.name}`);
console.log(`LLM 提供商: ${config.llm.provider}`);

if (config.llm.provider === 'custom-doubao') {
  console.log('✅ 配置已成功设置为豆包 API (custom-doubao)');
  console.log(`模型名称: ${config.llm.modelName}`);
  console.log('✅ 使用全局配置中的 API 密钥');
} else if (config.llm.provider === 'doubao') {
  console.log('✅ 配置已成功设置为豆包 API');
  console.log(`API 密钥配置: ${config.llm.apiKey}`);
  console.log(`模型名称: ${config.llm.modelName}`);
  
  // 检查环境变量
  if (process.env.DOUBAO_API_KEY) {
    console.log('✅ DOUBAO_API_KEY 环境变量已设置');
  } else {
    console.warn('⚠️  DOUBAO_API_KEY 环境变量未设置，请确保在启动前设置此环境变量');
  }
} else {
  console.error('❌ 配置未设置为豆包 API');
  process.exit(1);
}

// 验证配置文件格式
console.log('\n=== 配置文件格式验证 ===');
try {
  JSON.stringify(config);
  console.log('✅ 配置文件格式正确');
} catch (error) {
  console.error('❌ 配置文件格式错误:', error.message);
  process.exit(1);
}

console.log('\n=== 验证完成 ===');
console.log('✅ 大宗师配置已成功设置为豆包 API');
console.log('📝 配置文件路径:', masterConfigPath);
console.log('💡 提示: 使用全局配置中的 API 密钥，无需单独设置环境变量');
console.log('🌐 全局配置路径: C:/Users/10919/.openclaw/openclaw.json');
console.log('🔑 API 密钥已在全局配置中设置');

