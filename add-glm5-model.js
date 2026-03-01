const fs = require('fs');

const configPath = 'C:\\Users\\10919\\.openclaw\\openclaw.json';

console.log('==================================================');
console.log('   添加 GLM-5 模型到阿里云百炼配置');
console.log('==================================================');
console.log('');

// 读取配置
if (!fs.existsSync(configPath)) {
    console.error('❌ 配置文件不存在:', configPath);
    process.exit(1);
}

console.log('📄 读取配置:', configPath);
let config;
try {
    config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
} catch (e) {
    console.error('❌ 解析配置失败:', e.message);
    process.exit(1);
}

// 检查并修复配置结构
if (!config.models || !config.models.providers) {
    console.error('❌ 配置结构不正确');
    process.exit(1);
}

// 检查是否存在 alibaba-bailian provider
if (!config.models.providers['alibaba-bailian']) {
    console.error('❌ 未找到阿里云百炼配置');
    process.exit(1);
}

console.log('🔧 添加 GLM-5 模型...');

// 获取现有的 models 数组
const models = config.models.providers['alibaba-bailian'].models || [];

// 检查是否已存在 glm-5
const exists = models.some(m => m.id === 'glm-5');
if (exists) {
    console.log('⚠️  GLM-5 模型已存在，跳过添加');
} else {
    // 添加 glm-5 模型
    models.push({
        id: 'glm-5',
        name: 'GLM-5'
    });
    console.log('✅ 成功添加 GLM-5 模型');
}

// 更新配置
config.models.providers['alibaba-bailian'].models = models;

// 保存配置
console.log('💾 保存配置...');
try {
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf8');
    console.log('✅ 配置保存成功！');
} catch (e) {
    console.error('❌ 保存失败:', e.message);
    process.exit(1);
}

console.log('');
console.log('╔════════════════════════════════════════════════════╗');
console.log('║   配置完成                                         ║');
console.log('╚════════════════════════════════════════════════════╝');
console.log('');
console.log('已配置的模型：');
models.forEach(m => {
    console.log(`  - ${m.id} (${m.name})`);
});
console.log('');
console.log('使用方法：');
console.log('  openclaw config set agents.defaults.model alibaba-bailian/glm-5');
console.log('');
console.log('或手动编辑配置文件，将默认模型改为：alibaba-bailian/glm-5');
console.log('');
