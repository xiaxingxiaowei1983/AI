const fs = require('fs');

const configPath = 'C:\\Users\\10919\\.openclaw\\openclaw.json';

console.log('==================================================');
console.log('   优化模型配置（移除不可用模型）');
console.log('==================================================');
console.log('');

// 读取配置
let config;
try {
    config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
} catch (e) {
    console.error('❌ 解析配置失败:', e.message);
    process.exit(1);
}

// 保留的模型（经过测试可用的）
const keepModels = [
    'qwen3.5-plus',
    'glm-5'
];

// 可选：其他可能可用的模型（根据阿里云文档）
const optionalModels = [
    'qwen3-max-2026-01-23',
    'qwen3-coder-plus',
    'MiniMax-M2.5',
    'kimi-k2.5'
];

const bailianConfig = config.models.providers.bailian;
const currentModels = bailianConfig.models || [];

console.log(`当前模型数量：${currentModels.length}`);
console.log(`保留模型数量：${keepModels.length + optionalModels.length}`);
console.log('');

// 过滤模型
const filteredModels = currentModels.filter(model => {
    if (keepModels.includes(model.id)) {
        console.log(`✅ 保留（已验证可用）: ${model.id}`);
        return true;
    }
    if (optionalModels.includes(model.id)) {
        console.log(`⚠️  保留（待验证）: ${model.id}`);
        return true;
    }
    console.log(`❌ 移除：${model.id}`);
    return false;
});

bailianConfig.models = filteredModels;

// 保存配置
console.log('');
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
console.log('║   配置优化完成                                     ║');
console.log('╚════════════════════════════════════════════════════╝');
console.log('');
console.log('下一步操作：');
console.log('  1. 重启 OpenClaw 服务：openclaw restart');
console.log('  2. 测试飞书机器人对话');
console.log('  3. 如果还有问题，检查飞书插件配置');
console.log('');
