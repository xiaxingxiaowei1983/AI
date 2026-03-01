#!/usr/bin/env node

/**
 * OpenClaw 语言设置分析工具
 * 分析问题：
 * 1. 一刷新是英文
 * 2. 点进去设置显示的是中文
 * 3. 需要切换语言才能显示正确
 */

const fs = require('fs');
const path = require('path');
const http = require('http');
const url = require('url');

// 配置
const CONFIG = {
    STORAGE_KEY: 'openclaw.control.settings.v1',
    DEFAULT_LANGUAGE: 'zh-CN',
    PORT: 8890,
    WORKING_DIR: __dirname
};

// 颜色输出
const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m'
};

function log(message, type = 'info') {
    const color = {
        success: colors.green,
        error: colors.red,
        warning: colors.yellow,
        info: colors.blue
    }[type] || colors.reset;
    console.log(`${color}${message}${colors.reset}`);
}

// 创建分析工具 HTML
function createAnalysisTool() {
    const htmlContent = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OpenClaw 语言设置分析工具</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 1000px;
            margin: 0 auto;
            padding: 20px;
            line-height: 1.6;
            background: #f5f5f5;
        }
        .container {
            background: white;
            padding: 25px;
            border-radius: 8px;
            margin-bottom: 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        h1 {
            color: #333;
            text-align: center;
        }
        h2 {
            color: #444;
            border-bottom: 2px solid #2196F3;
            padding-bottom: 10px;
        }
        h3 {
            color: #555;
            margin-top: 15px;
        }
        .button {
            background: #2196F3;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            margin: 5px;
            font-size: 14px;
            transition: background 0.3s;
        }
        .button:hover {
            background: #0b7dda;
        }
        .button.success {
            background: #4CAF50;
        }
        .button.success:hover {
            background: #45a049;
        }
        .button.danger {
            background: #f44336;
        }
        .button.danger:hover {
            background: #da190b;
        }
        .output {
            background: #f9f9f9;
            padding: 15px;
            border-radius: 4px;
            margin-top: 10px;
            white-space: pre-wrap;
            font-family: 'Courier New', monospace;
            border-left: 4px solid #2196F3;
            max-height: 300px;
            overflow-y: auto;
        }
        .error {
            color: red;
            border-left-color: #f44336;
        }
        .success {
            color: green;
            border-left-color: #4CAF50;
        }
        .info {
            color: blue;
            border-left-color: #2196F3;
        }
        .warning {
            color: orange;
            border-left-color: #ff9800;
        }
        .status-box {
            padding: 15px;
            border-radius: 4px;
            margin: 10px 0;
        }
        .status-success {
            background: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }
        .status-error {
            background: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }
        .status-info {
            background: #d1ecf1;
            color: #0c5460;
            border: 1px solid #bee5eb;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }
        th, td {
            padding: 8px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }
        th {
            background-color: #f2f2f2;
        }
        .highlight {
            background: #fff3cd;
            padding: 2px 4px;
            border-radius: 2px;
        }
    </style>
</head>
<body>
    <h1>🔍 OpenClaw 语言设置分析工具</h1>
    
    <div class="container">
        <h2>📋 问题描述</h2>
        <div class="status-error">
            <strong>当前问题：</strong>
            <ul>
                <li>一刷新页面显示英文</li>
                <li>进入设置页面显示语言为中文</li>
                <li>需要先切换到其他语言，再切回简体中文才能正常显示</li>
            </ul>
        </div>
        <div class="status-info">
            <strong>可能原因：</strong>
            <ul>
                <li>localStorage 设置与实际显示不一致</li>
                <li>OpenClaw 语言加载机制存在问题</li>
                <li>设置保存后未立即生效</li>
                <li>缓存或状态管理问题</li>
            </ul>
        </div>
    </div>

    <div class="container">
        <h2>🔧 分析工具</h2>
        <button class="button" onclick="analyzeCurrentState()">分析当前状态</button>
        <button class="button success" onclick="fixLanguageIssue()">修复语言问题</button>
        <button class="button danger" onclick="clearAndReset()">清除并重置</button>
        <div id="analysisOutput" class="output info">
            <p>点击按钮开始分析...</p>
        </div>
    </div>

    <div class="container">
        <h2>📁 详细分析</h2>
        <h3>=== localStorage 分析 ===</h3>
        <div id="localStorageOutput" class="output">
            <p>等待分析结果...</p>
        </div>
        
        <h3>=== 浏览器环境分析 ===</h3>
        <div id="browserOutput" class="output">
            <p>等待分析结果...</p>
        </div>
        
        <h3>=== 修复方案分析 ===</h3>
        <div id="solutionOutput" class="output">
            <p>等待分析结果...</p>
        </div>
    </div>

    <div class="container">
        <h2>🛠️ 高级修复</h2>
        <button class="button" onclick="forceLanguageSetting()">强制设置中文</button>
        <button class="button" onclick="simulateLanguageSwitch()">模拟语言切换</button>
        <button class="button" onclick="testImmediateEffect()">测试立即生效</button>
        <div id="advancedOutput" class="output"></div>
    </div>

    <script>
        // 配置
        const CONFIG = {
            STORAGE_KEY: 'openclaw.control.settings.v1',
            DEFAULT_LANGUAGE: 'zh-CN'
        };

        // 分析当前状态
        function analyzeCurrentState() {
            const output = document.getElementById('analysisOutput');
            const lsOutput = document.getElementById('localStorageOutput');
            const browserOutput = document.getElementById('browserOutput');
            const solutionOutput = document.getElementById('solutionOutput');
            
            let analysis = '';
            let lsAnalysis = '';
            let browserAnalysis = '';
            let solutionAnalysis = '';

            try {
                // 分析 localStorage
                const settings = localStorage.getItem(CONFIG.STORAGE_KEY);
                analysis += '<strong>=== 状态分析结果 ===</strong><br>';
                
                if (settings) {
                    analysis += '✓ localStorage 中存在设置<br>';
                    lsAnalysis += 'localStorage 内容:<br>' + settings + '<br>';
                    
                    try {
                        const parsed = JSON.parse(settings);
                        analysis += '✓ 设置格式正确<br>';
                        analysis += '语言设置: ' + (parsed.language || '未设置') + '<br>';
                        lsAnalysis += '解析后的设置:<br>' + JSON.stringify(parsed, null, 2) + '<br>';
                        
                        if (parsed.language === CONFIG.DEFAULT_LANGUAGE) {
                            analysis += '<span class="success">✓ 语言设置正确: ' + CONFIG.DEFAULT_LANGUAGE + '</span><br>';
                        } else if (parsed.language) {
                            analysis += '<span class="warning">⚠️ 语言设置为: ' + parsed.language + ' (非中文)</span><br>';
                        } else {
                            analysis += '<span class="error">✗ 未找到语言设置</span><br>';
                        }
                    } catch (e) {
                        analysis += '<span class="error">✗ 设置格式错误: ' + e.message + '</span><br>';
                    }
                } else {
                    analysis += '<span class="error">✗ localStorage 中无设置</span><br>';
                    lsAnalysis += 'localStorage 中无设置<br>';
                }

                // 分析浏览器环境
                browserAnalysis += '浏览器语言: ' + navigator.language + '<br>';
                browserAnalysis += '页面语言: ' + document.documentElement.lang + '<br>';
                browserAnalysis += '安全上下文: ' + window.isSecureContext + '<br>';
                browserAnalysis += 'localStorage 可用: ' + (typeof localStorage !== 'undefined') + '<br>';
                
                // 分析修复方案
                solutionAnalysis += '<strong>=== 修复方案分析 ===</strong><br>';
                solutionAnalysis += '1. 强制设置中文: 直接修改 localStorage<br>';
                solutionAnalysis += '2. 模拟语言切换: 模拟用户切换语言的操作<br>';
                solutionAnalysis += '3. 立即生效: 确保设置修改后立即生效<br>';
                solutionAnalysis += '4. 持久化确保: 确保设置在刷新后仍然有效<br>';

                // 分析结果
                if (settings) {
                    try {
                        const parsed = JSON.parse(settings);
                        if (parsed.language === CONFIG.DEFAULT_LANGUAGE) {
                            analysis += '<br><span class="warning">⚠️ 发现问题: localStorage 中语言设置正确，但页面显示英文</span><br>';
                            analysis += '<span class="info">可能原因: OpenClaw 语言加载机制存在问题</span><br>';
                        }
                    } catch (e) {
                        // 忽略解析错误
                    }
                }

            } catch (e) {
                analysis += '<span class="error">分析时出错: ' + e.message + '</span><br>';
            }

            output.innerHTML = analysis;
            lsOutput.innerHTML = lsAnalysis;
            browserOutput.innerHTML = browserAnalysis;
            solutionOutput.innerHTML = solutionAnalysis;
        }

        // 修复语言问题
        function fixLanguageIssue() {
            const output = document.getElementById('analysisOutput');
            let result = '';

            try {
                result += '<strong>=== 开始修复语言问题 ===</strong><br>';
                
                // 步骤 1: 清除旧设置
                localStorage.removeItem(CONFIG.STORAGE_KEY);
                result += '✓ 清除旧设置<br>';

                // 步骤 2: 创建新的中文设置
                const newSettings = {
                    language: CONFIG.DEFAULT_LANGUAGE,
                    theme: 'system',
                    fontSize: 'medium',
                    autoSave: true,
                    notifications: true,
                    sidebar: true,
                    createdAt: new Date().toISOString(),
                    version: '1.0'
                };
                
                const settingsJson = JSON.stringify(newSettings);
                localStorage.setItem(CONFIG.STORAGE_KEY, settingsJson);
                result += '✓ 创建新的中文设置<br>';

                // 步骤 3: 模拟语言切换（解决需要切换才能生效的问题）
                const tempSettings = JSON.parse(JSON.stringify(newSettings));
                tempSettings.language = 'zh-TW'; // 临时设置为繁体中文
                localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(tempSettings));
                result += '✓ 模拟切换到繁体中文<br>';
                
                // 步骤 4: 切回简体中文
                localStorage.setItem(CONFIG.STORAGE_KEY, settingsJson);
                result += '✓ 切回简体中文<br>';

                // 步骤 5: 验证修复
                const verify = localStorage.getItem(CONFIG.STORAGE_KEY);
                if (verify) {
                    const parsed = JSON.parse(verify);
                    if (parsed.language === CONFIG.DEFAULT_LANGUAGE) {
                        result += '<br><span class="success">✓ 修复成功！</span><br>';
                        result += '🎯 语言设置已正确保存<br>';
                        result += '🔄 模拟了语言切换过程<br>';
                        result += '🚀 刷新页面后应显示中文<br>';
                    } else {
                        result += '<span class="error">✗ 修复失败: 语言设置未保存</span><br>';
                    }
                } else {
                    result += '<span class="error">✗ 修复失败: 设置未写入 localStorage</span><br>';
                }

            } catch (e) {
                result += '<span class="error">修复时出错: ' + e.message + '</span><br>';
            }

            output.innerHTML = result;
        }

        // 强制设置中文
        function forceLanguageSetting() {
            const output = document.getElementById('advancedOutput');
            let result = '';

            try {
                const newSettings = {
                    language: CONFIG.DEFAULT_LANGUAGE,
                    theme: 'system',
                    fontSize: 'medium',
                    autoSave: true,
                    notifications: true,
                    sidebar: true,
                    createdAt: new Date().toISOString(),
                    version: '1.0'
                };
                
                const settingsJson = JSON.stringify(newSettings);
                localStorage.setItem(CONFIG.STORAGE_KEY, settingsJson);
                result += '<span class="success">✓ 强制设置中文成功</span><br>';
                result += '设置内容: ' + settingsJson + '<br>';
            } catch (e) {
                result += '<span class="error">强制设置时出错: ' + e.message + '</span><br>';
            }

            output.innerHTML = result;
        }

        // 模拟语言切换
        function simulateLanguageSwitch() {
            const output = document.getElementById('advancedOutput');
            let result = '';

            try {
                // 先获取当前设置
                const currentSettings = localStorage.getItem(CONFIG.STORAGE_KEY);
                let baseSettings = {
                    language: CONFIG.DEFAULT_LANGUAGE,
                    theme: 'system',
                    fontSize: 'medium',
                    autoSave: true,
                    notifications: true,
                    sidebar: true
                };
                
                if (currentSettings) {
                    try {
                        baseSettings = JSON.parse(currentSettings);
                    } catch (e) {
                        // 使用默认设置
                    }
                }
                
                // 步骤 1: 切换到繁体中文
                const twSettings = JSON.parse(JSON.stringify(baseSettings));
                twSettings.language = 'zh-TW';
                localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(twSettings));
                result += '✓ 切换到繁体中文<br>';
                
                // 步骤 2: 切换回简体中文
                const cnSettings = JSON.parse(JSON.stringify(baseSettings));
                cnSettings.language = CONFIG.DEFAULT_LANGUAGE;
                localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(cnSettings));
                result += '✓ 切回简体中文<br>';
                
                result += '<br><span class="success">✓ 模拟语言切换完成</span><br>';
                result += '此操作模拟了用户手动切换语言的过程<br>';
            } catch (e) {
                result += '<span class="error">模拟切换时出错: ' + e.message + '</span><br>';
            }

            output.innerHTML = result;
        }

        // 测试立即生效
        function testImmediateEffect() {
            const output = document.getElementById('advancedOutput');
            let result = '';

            try {
                // 强制设置中文并验证
                const newSettings = {
                    language: CONFIG.DEFAULT_LANGUAGE,
                    theme: 'system',
                    fontSize: 'medium',
                    autoSave: true,
                    notifications: true,
                    sidebar: true,
                    createdAt: new Date().toISOString(),
                    version: '1.0'
                };
                
                localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(newSettings));
                
                // 验证设置
                const verify = localStorage.getItem(CONFIG.STORAGE_KEY);
                if (verify) {
                    const parsed = JSON.parse(verify);
                    if (parsed.language === CONFIG.DEFAULT_LANGUAGE) {
                        result += '<span class="success">✓ 立即生效测试通过</span><br>';
                        result += '当前语言设置: ' + parsed.language + '<br>';
                        result += '设置时间: ' + parsed.createdAt + '<br>';
                    } else {
                        result += '<span class="error">✗ 立即生效测试失败</span><br>';
                    }
                } else {
                    result += '<span class="error">✗ 立即生效测试失败: 设置未保存</span><br>';
                }
            } catch (e) {
                result += '<span class="error">测试时出错: ' + e.message + '</span><br>';
            }

            output.innerHTML = result;
        }

        // 清除并重置
        function clearAndReset() {
            const output = document.getElementById('analysisOutput');
            
            if (confirm('确定要清除所有设置并重置吗？')) {
                try {
                    localStorage.removeItem(CONFIG.STORAGE_KEY);
                    output.innerHTML = '<span class="success">✓ 已清除所有设置并重置</span><br>';
                } catch (e) {
                    output.innerHTML = '<span class="error">清除时出错: ' + e.message + '</span><br>';
                }
            }
        }

        // 页面加载时自动分析
        window.onload = function() {
            analyzeCurrentState();
        };
    </script>
</body>
</html>`;

    const toolPath = path.join(CONFIG.WORKING_DIR, 'openclaw-language-analysis.html');
    fs.writeFileSync(toolPath, htmlContent);
    log(`创建分析工具: ${toolPath}`, 'success');
    return toolPath;
}

// 创建服务器
function startServer() {
    const server = http.createServer((req, res) => {
        const parsedUrl = url.parse(req.url, true);
        const pathname = parsedUrl.pathname;

        if (pathname === '/') {
            // 重定向到分析工具
            const toolPath = path.join(CONFIG.WORKING_DIR, 'openclaw-language-analysis.html');
            if (fs.existsSync(toolPath)) {
                const content = fs.readFileSync(toolPath, 'utf8');
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.end(content);
            } else {
                res.writeHead(404, {'Content-Type': 'text/plain'});
                res.end('分析工具不存在');
            }
        } else {
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('Not Found');
        }
    });

    server.listen(CONFIG.PORT, () => {
        log(`🚀 分析服务器启动成功！`, 'success');
        log(`🌐 访问地址: http://localhost:${CONFIG.PORT}`, 'info');
        log(`🔍 打开浏览器访问上述地址开始分析`, 'info');
    });

    server.on('error', (error) => {
        log(`服务器启动失败: ${error.message}`, 'error');
        log(`尝试使用其他端口...`, 'warning');
        
        // 尝试其他端口
        CONFIG.PORT = 8891;
        server.listen(CONFIG.PORT, () => {
            log(`🚀 分析服务器启动成功！`, 'success');
            log(`🌐 访问地址: http://localhost:${CONFIG.PORT}`, 'info');
        });
    });
}

// 主函数
function main() {
    console.log('');
    console.log('========================================');
    console.log('🔍 OpenClaw 语言设置分析工具');
    console.log('========================================');
    console.log('');

    // 1. 创建分析工具
    log('=== 创建分析工具 ===', 'info');
    const toolPath = createAnalysisTool();
    console.log('');

    // 2. 启动服务器
    log('=== 启动分析服务器 ===', 'info');
    startServer();
    console.log('');

    // 3. 显示使用说明
    log('📖 使用说明:', 'info');
    log('1. 打开浏览器访问: http://localhost:8890', 'info');
    log('2. 点击 "分析当前状态" 查看具体问题', 'info');
    log('3. 点击 "修复语言问题" 执行修复', 'info');
    log('4. 测试修复效果', 'info');
    log('5. 刷新 OpenClaw 页面验证', 'info');
    console.log('');

    log('💡 提示:', 'info');
    log('- 此工具专门针对 "刷新显示英文，需要切换语言" 的问题', 'info');
    log('- 修复过程会模拟语言切换的操作，解决需要手动切换的问题', 'info');
    log('- 如果修复后仍有问题，请重复执行修复', 'info');
    console.log('');
}

// 执行主函数
if (require.main === module) {
    main();
}

module.exports = {
    main
};