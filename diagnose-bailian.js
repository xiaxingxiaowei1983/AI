const fs = require('fs');
const https = require('https');

console.log('==================================================');
console.log('   阿里云百炼 API Key 诊断工具');
console.log('==================================================');
console.log('');

// 读取配置
const configPath = 'C:\\Users\\10919\\.openclaw\\openclaw.json';
if (!fs.existsSync(configPath)) {
    console.error('❌ 配置文件不存在:', configPath);
    process.exit(1);
}

let config;
try {
    config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
} catch (e) {
    console.error('❌ 解析配置失败:', e.message);
    process.exit(1);
}

// 获取 bailian 配置
const bailianConfig = config.models?.providers?.bailian;
if (!bailianConfig) {
    console.error('❌ 未找到 bailian 配置');
    process.exit(1);
}

console.log('📋 当前配置信息：');
console.log(`  Provider: bailian`);
console.log(`  API Base: ${bailianConfig.baseUrl}`);
console.log(`  API Key: ${bailianConfig.apiKey?.substring(0, 10)}...${bailianConfig.apiKey?.substring(-5)}`);
console.log(`  API 类型：${bailianConfig.api}`);
console.log(`  模型数量：${bailianConfig.models?.length || 0}`);
console.log('');

// 测试 API Key
const apiKey = bailianConfig.apiKey;
const testModels = ['qwen3.5-plus', 'qwen-plus', 'glm-5'];

async function testModel(modelId) {
    return new Promise((resolve) => {
        console.log(`🧪 测试模型：${modelId}...`);
        
        const testData = JSON.stringify({
            model: modelId,
            messages: [
                { role: 'user', content: 'hi' }
            ],
            max_tokens: 10
        });

        const options = {
            hostname: 'coding.dashscope.aliyuncs.com',
            port: 443,
            path: '/v1/chat/completions',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
                'Content-Length': Buffer.byteLength(testData)
            }
        };

        const req = https.request(options, (res) => {
            let body = '';
            
            res.on('data', (chunk) => {
                body += chunk;
            });
            
            res.on('end', () => {
                try {
                    const response = JSON.parse(body);
                    
                    if (res.statusCode === 200) {
                        console.log(`  ✅ ${modelId} - 连接成功`);
                        resolve(true);
                    } else {
                        console.log(`  ❌ ${modelId} - HTTP ${res.statusCode}`);
                        if (response.error) {
                            console.log(`     错误：${response.error.message}`);
                            console.log(`     类型：${response.error.type}`);
                            console.log(`     代码：${response.error.code}`);
                        }
                        resolve(false);
                    }
                } catch (e) {
                    console.log(`  ❌ ${modelId} - 解析失败：${e.message}`);
                    resolve(false);
                }
            });
        });

        req.on('error', (e) => {
            console.log(`  ❌ ${modelId} - 请求失败：${e.message}`);
            resolve(false);
        });

        req.write(testData);
        req.end();
    });
}

async function runDiagnostics() {
    console.log('╔════════════════════════════════════════════════════╗');
    console.log('║   开始 API 连接测试                                 ║');
    console.log('╚════════════════════════════════════════════════════╝');
    console.log('');

    let successCount = 0;
    for (const model of testModels) {
        const success = await testModel(model);
        if (success) successCount++;
    }

    console.log('');
    console.log('╔════════════════════════════════════════════════════╗');
    console.log('║   诊断结果                                         ║');
    console.log('╚════════════════════════════════════════════════════╝');
    console.log('');
    
    if (successCount > 0) {
        console.log(`✅ 部分模型可用 (${successCount}/${testModels.length})`);
        console.log('');
        console.log('建议：');
        console.log('  1. 使用可用的模型进行对话');
        console.log('  2. 检查不可用模型的权限或配额');
    } else {
        console.log('❌ 所有模型都不可用');
        console.log('');
        console.log('可能的原因：');
        console.log('  1. API Key 无效或已过期');
        console.log('  2. 账户欠费');
        console.log('  3. 未开通百炼服务');
        console.log('  4. API Key 区域不匹配');
        console.log('');
        console.log('解决方案：');
        console.log('  1. 访问 https://bailian.console.aliyun.com/');
        console.log('  2. 检查账户状态和余额');
        console.log('  3. 确认已开通百炼服务');
        console.log('  4. 重新生成 API Key');
        console.log('  5. 确认 API Key 与区域匹配（华北 2 北京）');
    }
    
    console.log('');
}

runDiagnostics();
