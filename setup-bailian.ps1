#!/usr/bin/env powershell

# OpenClaw 阿里云百炼配置脚本
$ConfigPath = "C:\Users\10919\.openclaw\openclaw.json"

Write-Host "=================================================="
Write-Host "   OpenClaw 阿里云百炼配置工具"
Write-Host "=================================================="
Write-Host ""

# 检查配置文件是否存在
if (-not (Test-Path $ConfigPath)) {
    Write-Host "配置文件不存在：$ConfigPath"
    exit 1
}

Write-Host "读取配置文件：$ConfigPath"

# 读取配置文件
$config = Get-Content $ConfigPath -Raw

# 使用 Node.js 更新配置（更可靠）
$nodeScript = @"
const fs = require('fs');
const path = '$ConfigPath'.replace(/\\/g, '/');

console.log('读取配置...');
let config;
try {
    config = JSON.parse(fs.readFileSync(path, 'utf8'));
} catch (e) {
    console.error('读取配置失败:', e.message);
    process.exit(1);
}

console.log('添加阿里云百炼 Provider...');

// 添加 Provider
if (!config.models) {
    config.models = { mode: 'merge', providers: {} };
}
if (!config.models.providers) {
    config.models.providers = {};
}

config.models.providers['alibaba-bailian'] = {
    baseUrl: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
    apiKey: 'sk-sp-8c3eefb330194d8ab000277eb97b103e',
    api: 'openai-completions',
    models: [
        { id: 'qwen3.5-plus', name: 'Qwen3.5-Plus' },
        { id: 'qwen-plus', name: 'Qwen-Plus' },
        { id: 'qwen-max', name: 'Qwen-Max' },
        { id: 'qwen-turbo', name: 'Qwen-Turbo' }
    ]
};

console.log('更新默认模型...');
if (!config.agents) {
    config.agents = { defaults: {} };
}
config.agents.defaults.model = 'alibaba-bailian/qwen3.5-plus';
config.agents.defaults.timeoutSeconds = 1200;

console.log('保存配置...');
try {
    fs.writeFileSync(path, JSON.stringify(config, null, 2), 'utf8');
    console.log('配置保存成功！');
} catch (e) {
    console.error('保存失败:', e.message);
    process.exit(1);
}

console.log('');
console.log('配置摘要:');
console.log('  Provider: alibaba-bailian');
console.log('  API Base: https://dashscope.aliyuncs.com/compatible-mode/v1');
console.log('  默认模型：alibaba-bailian/qwen3.5-plus');
"@

# 执行 Node.js 脚本
Write-Host "执行配置更新..."
$nodeResult = node -e $nodeScript
Write-Host $nodeResult

if ($LASTEXITCODE -ne 0) {
    Write-Host "配置更新失败"
    exit 1
}

Write-Host ""
Write-Host "=================================================="
Write-Host "   测试 API 连接"
Write-Host "=================================================="
Write-Host ""

# 使用 Node.js 测试 API
$testScript = @"
const https = require('https');

console.log('发送测试请求...');

const data = JSON.stringify({
    model: 'qwen3.5-plus',
    messages: [
        { role: 'user', content: '你好，请用一句话介绍你自己' }
    ],
    max_tokens: 100
});

const options = {
    hostname: 'dashscope.aliyuncs.com',
    port: 443,
    path: '/compatible-mode/v1/chat/completions',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer sk-sp-8c3eefb330194d8ab000277eb97b103e',
        'Content-Length': data.length
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
            
            if (res.statusCode >= 200 && res.statusCode < 300) {
                console.log('API 连接成功！');
                console.log('');
                console.log('模型回复：');
                console.log(response.choices[0].message.content);
                console.log('');
                console.log('Token 使用统计：');
                console.log('  Prompt Tokens:', response.usage.prompt_tokens);
                console.log('  Completion Tokens:', response.usage.completion_tokens);
                console.log('  Total Tokens:', response.usage.total_tokens);
                console.log('');
                console.log('配置完成！OpenClaw 现在可以使用阿里云百炼 API 了');
            } else {
                console.log('API 返回错误：', res.statusCode);
                console.log(JSON.stringify(response, null, 2));
                
                if (response.error) {
                    console.log('');
                    console.log('错误详情：');
                    console.log('  类型:', response.error.type);
                    console.log('  消息:', response.error.message);
                    console.log('  代码:', response.error.code);
                }
            }
        } catch (e) {
            console.error('解析响应失败:', e.message);
            console.error('原始响应:', body);
        }
    });
});

req.on('error', (e) => {
    console.error('请求失败:', e.message);
});

req.write(data);
req.end();
"@

Write-Host "测试 API 连接..."
$testResult = node -e $testScript
Write-Host $testResult

Write-Host ""
Write-Host "=================================================="
Write-Host "   配置完成"
Write-Host "=================================================="
Write-Host ""
Write-Host "下一步操作："
Write-Host "  1. 如果测试成功，可以开始使用 OpenClaw 调用阿里云百炼 API"
Write-Host "  2. 如果测试失败，请检查 API Key 并重新运行此脚本"
Write-Host "  3. 可以手动编辑 $ConfigPath 调整模型参数"
Write-Host ""
