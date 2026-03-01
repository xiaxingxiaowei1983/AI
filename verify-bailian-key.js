const https = require('https');

const apiKey = 'sk-sp-8c3eefb330194d8ab000277eb97b103e';

console.log('==================================================');
console.log('   阿里云百炼 API Key 验证工具');
console.log('==================================================');
console.log('');
console.log('API Key:', apiKey);
console.log('');

// 测试不同的端点
const endpoints = [
    {
        name: '华北 2（北京）- OpenAI 兼容模式',
        hostname: 'dashscope.aliyuncs.com',
        path: '/compatible-mode/v1/chat/completions'
    },
    {
        name: 'DashScope 原生模式',
        hostname: 'dashscope.aliyuncs.com',
        path: '/api/v1/services/aigc/text-generation/generation'
    }
];

let testIndex = 0;

function testEndpoint(endpoint) {
    return new Promise((resolve) => {
        console.log(`\n测试：${endpoint.name}`);
        console.log(`端点：https://${endpoint.hostname}${endpoint.path}`);
        
        const testData = JSON.stringify({
            model: 'qwen-plus',
            messages: [
                { role: 'user', content: 'hi' }
            ]
        });

        const options = {
            hostname: endpoint.hostname,
            port: 443,
            path: endpoint.path,
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
                    console.log(`状态码：${res.statusCode}`);
                    
                    if (res.statusCode === 200) {
                        console.log('✅ 成功！');
                        if (response.choices && response.choices[0]) {
                            console.log('回复:', response.choices[0].message.content);
                        }
                        resolve(true);
                    } else {
                        console.log('❌ 失败');
                        if (response.error) {
                            console.log('错误:', response.error.message);
                            console.log('类型:', response.error.type);
                            console.log('代码:', response.error.code);
                        }
                        resolve(false);
                    }
                } catch (e) {
                    console.log('❌ 解析失败:', e.message);
                    resolve(false);
                }
            });
        });

        req.on('error', (e) => {
            console.log('❌ 请求错误:', e.message);
            resolve(false);
        });

        req.write(testData);
        req.end();
    });
}

async function runTests() {
    for (const endpoint of endpoints) {
        const success = await testEndpoint(endpoint);
        if (success) {
            console.log('\n==================================================');
            console.log('✅ 找到可用的端点！');
            console.log('==================================================\n');
            return;
        }
        testIndex++;
    }
    
    console.log('\n==================================================');
    console.log('❌ 所有端点测试失败');
    console.log('==================================================\n');
    console.log('建议操作：');
    console.log('1. 访问 https://bailian.console.aliyun.com/');
    console.log('2. 检查账户是否已开通百炼服务');
    console.log('3. 确认 API Key 是否有效（可能需要重新生成）');
    console.log('4. 检查账户余额是否充足');
    console.log('');
}

runTests();
