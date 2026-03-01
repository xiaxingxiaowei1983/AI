const fs = require('fs');

const configPath = 'C:\\Users\\10919\\.openclaw\\openclaw.json';

console.log('==================================================');
console.log('   更新阿里云百炼模型配置');
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

// 检查配置结构
if (!config.models) {
    config.models = { mode: 'merge', providers: {} };
}
if (!config.models.providers) {
    config.models.providers = {};
}

console.log('🔧 更新阿里云百炼配置...');

// 完整的阿里云百炼配置（使用我们的 API Key）
const bailianConfig = {
    baseUrl: 'https://coding.dashscope.aliyuncs.com/v1',
    apiKey: 'sk-sp-8c3eefb330194d8ab000277eb97b103e',
    api: 'openai-completions',
    models: [
        {
            id: 'qwen3.5-plus',
            name: 'qwen3.5-plus',
            reasoning: false,
            input: ['text', 'image'],
            cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
            contextWindow: 1000000,
            maxTokens: 65536
        },
        {
            id: 'qwen3-max-2026-01-23',
            name: 'qwen3-max-2026-01-23',
            reasoning: false,
            input: ['text'],
            cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
            contextWindow: 262144,
            maxTokens: 65536
        },
        {
            id: 'qwen3-coder-next',
            name: 'qwen3-coder-next',
            reasoning: false,
            input: ['text'],
            cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
            contextWindow: 262144,
            maxTokens: 65536
        },
        {
            id: 'qwen3-coder-plus',
            name: 'qwen3-coder-plus',
            reasoning: false,
            input: ['text'],
            cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
            contextWindow: 1000000,
            maxTokens: 65536
        },
        {
            id: 'MiniMax-M2.5',
            name: 'MiniMax-M2.5',
            reasoning: false,
            input: ['text'],
            cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
            contextWindow: 204800,
            maxTokens: 131072
        },
        {
            id: 'glm-5',
            name: 'glm-5',
            reasoning: false,
            input: ['text'],
            cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
            contextWindow: 202752,
            maxTokens: 16384
        },
        {
            id: 'glm-4.7',
            name: 'glm-4.7',
            reasoning: false,
            input: ['text'],
            cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
            contextWindow: 202752,
            maxTokens: 16384
        },
        {
            id: 'kimi-k2.5',
            name: 'kimi-k2.5',
            reasoning: false,
            input: ['text', 'image'],
            cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
            contextWindow: 262144,
            maxTokens: 32768
        }
    ]
};

// 更新配置
config.models.providers['bailian'] = bailianConfig;

// 更新默认模型（如果没有设置或设置的是旧的 alibaba-bailian）
if (!config.agents) {
    config.agents = { defaults: {} };
}
if (!config.agents.defaults || 
    !config.agents.defaults.model || 
    config.agents.defaults.model.startsWith('alibaba-bailian/')) {
    config.agents.defaults.model = 'bailian/qwen3.5-plus';
    config.agents.defaults.timeoutSeconds = 1200;
}

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
console.log('已配置的模型（bailian）：');
bailianConfig.models.forEach(m => {
    console.log(`  - ${m.id}`);
    console.log(`    上下文窗口：${m.contextWindow.toLocaleString()} tokens`);
    console.log(`    最大输出：${m.maxTokens.toLocaleString()} tokens`);
    console.log(`    支持输入：${m.input.join(', ')}`);
});
console.log('');
console.log('默认模型：bailian/qwen3.5-plus');
console.log('');
console.log('使用方法：');
console.log('  openclaw config set agents.defaults.model bailian/glm-5');
console.log('  openclaw config set agents.defaults.model bailian/qwen3-coder-plus');
console.log('');
