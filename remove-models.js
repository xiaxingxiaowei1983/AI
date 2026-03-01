const fs = require('fs');

const configPath = 'C:\\Users\\10919\\.openclaw\\openclaw.json';

console.log('==================================================');
console.log('   删除指定的模型');
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

// 检查配置
if (!config.models?.providers?.bailian) {
    console.error('❌ 未找到 bailian 配置');
    process.exit(1);
}

console.log('🔧 删除模型：glm-4.7, qwen3-coder-next');

// 获取当前模型列表
const models = config.models.providers.bailian.models || [];
console.log(`删除前模型数量：${models.length}`);

// 删除指定的模型
const modelsToDelete = ['glm-4.7', 'qwen3-coder-next'];
const removedModels = [];

config.models.providers.bailian.models = models.filter(model => {
    if (modelsToDelete.includes(model.id)) {
        removedModels.push(model.id);
        return false;
    }
    return true;
});

console.log(`删除后模型数量：${config.models.providers.bailian.models.length}`);
console.log(`已删除：${removedModels.join(', ')}`);

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
console.log('保留的模型：');
config.models.providers.bailian.models.forEach(m => {
    console.log(`  ✓ ${m.id}`);
});
console.log('');
