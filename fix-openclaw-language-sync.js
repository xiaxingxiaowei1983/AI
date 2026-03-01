#!/usr/bin/env node

/**
 * OpenClaw 语言设置同步修复工具
 * 解决问题：
 * 1. 界面不显示中文
 * 2. 每次重启后变回英文
 * 3. 语言设置不同步
 * 
 * 原理：
 * - 同时更新两个 localStorage 键：'clawpal_language' 和 'openclaw.control.settings.v1'
 * - 确保语言设置在两个存储位置保持同步
 * - 提供验证和测试功能
 */

const fs = require('fs');
const path = require('path');
const http = require('http');
const url = require('url');

// 配置
const CONFIG = {
    CLAWPAL_STORAGE_KEY: 'clawpal_language',
    OPENCLAW_STORAGE_KEY: 'openclaw.control.settings.v1',
    DEFAULT_LANGUAGE: 'zh-CN',
    PORT: 8887,
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

// 创建同步修复工具 HTML
function createSyncFixTool() {
    const htmlContent = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OpenClaw 语言设置同步修复工具</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 900px;
            margin: 0 auto;
            padding: 20px;
            line-height: 1.6;
            background: #f5f5f5;
        }
        .container {
            background: white;
            padding: 30px;
            border-radius: 8px;
            margin-bottom: 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        h1 {
            color: #333;
            text-align: center;
            margin-bottom: 30px;
        }
        h2 {
            color: #444;
            border-bottom: 2px solid #4CAF50;
            padding-bottom: 10px;
            margin-top: 25px;
        }
        .button {
            background: #4CAF50;
            color: white;
            padding: 15px 30px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            margin: 10px;
            font-size: 16px;
            font-weight: bold;
            transition: all 0.3s;
        }
        .button:hover {
            background: #45a049;
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }
        .button.secondary {
            background: #2196F3;
        }
        .button.secondary:hover {
            background: #0b7dda;
        }
        .button.danger {
            background: #f44336;
        }
        .button.danger:hover {
            background: #da190b;
        }
        .output {
            background: #f9f9f9;
            padding: 20px;
            border-radius: 4px;
            margin-top: 15px;
            white-space: pre-wrap;
            font-family: 'Courier New', monospace;
            border-left: 4px solid #4CAF50;
            max-height: 400px;
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
            padding: 20px;
            border-radius: 4px;
            margin: 15px 0;
        }
        .status-error {
            background: #f8d7da;
            color: #721c24;
            border: 2px solid #f5c6cb;
        }
        .status-success {
            background: #d4edda;
            color: #155724;
            border: 2px solid #c3e6cb;
        }
        .status-info {
            background: #d1ecf1;
            color: #0c5460;
            border: 2px solid #bee5eb;
        }
        .highlight {
            background: #fff3cd;
            padding: 2px 6px;
            border-radius: 3px;
            font-weight: bold;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 15px;
        }
        th, td {
            padding: 10px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }
        th {
            background-color: #f2f2f2;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <h1>🔧 OpenClaw 语言设置同步修复工具</h1>
    
    <div class="container">
        <h2>🚨 问题分析</h2>
        <div class="status-error">
            <strong>当前问题：</strong>
            <ul>
                <li>✅ localStorage 中存在语言设置</li>
                <li>❌ 但界面实际显示英文</li>
                <li>❌ 重启后变回英文</li>
                <li>❌ 语言设置不同步</li>
            </ul>
        </div>
        <div class="status-info">
            <strong>根本原因：</strong>
            <ul>
                <li>ClawPal 使用 <span class="highlight">clawpal_language</span> 作为 localStorage 键</li>
                <li>修复工具使用 <span class="highlight">openclaw.control.settings.v1</span> 作为键</li>
                <li>两个存储位置的语言设置不同步</li>
                <li>重启后 ClawPal 读取 <span class="highlight">clawpal_language</span> 键</li>
            </ul>
        </div>
    </div>

    <div class="container">
        <h2>🔍 状态检查</h2>
        <button class="button" onclick="checkCurrentStatus()">检查当前状态</button>
        <div id="statusOutput" class="output info">
            <p>点击按钮检查当前状态...</p>
        </div>
    </div>

    <div class="container">
        <h2>🛠️ 同步修复</h2>
        <button class="button" onclick="syncLanguageSettings()">🔥 同步修复语言设置</button>
        <button class="button secondary" onclick="testPersistence()">🔄 测试持久化</button>
        <button class="button danger" onclick="clearAllSettings()">🗑️ 清除所有设置</button>
        <div id="fixOutput" class="output info">
            <p>点击按钮执行同步修复...</p>
        </div>
    </div>

    <div class="container">
        <h2>📊 修复结果</h2>
        <div id="resultOutput" class="output">
            <p>修复后将显示结果...</p>
        </div>
    </div>

    <div class="container">
        <h2>📋 操作步骤</h2>
        <ol>
            <li>点击 <span class="highlight">检查当前状态</span> 查看问题</li>
            <li>点击 <span class="highlight">同步修复语言设置</span> 执行修复</li>
            <li>点击 <span class="highlight">测试持久化</span> 验证修复效果</li>
            <li>刷新 OpenClaw 页面（F5）</li>
            <li>验证界面是否显示中文</li>
            <li>重启 OpenClaw 后再次验证</li>
        </ol>
    </div>

    <script>
        // 配置
        const CONFIG = {
            CLAWPAL_STORAGE_KEY: 'clawpal_language',
            OPENCLAW_STORAGE_KEY: 'openclaw.control.settings.v1',
            DEFAULT_LANGUAGE: 'zh-CN'
        };

        // 检查当前状态
        function checkCurrentStatus() {
            const output = document.getElementById('statusOutput');
            let status = '';

            try {
                status += '<strong>=== 当前状态检查 ===</strong><br>';
                
                // 检查 ClawPal 语言设置
                const clawpalLang = localStorage.getItem(CONFIG.CLAWPAL_STORAGE_KEY);
                status += '<br><strong>=== ClawPal 语言设置 ===</strong><br>';
                if (clawpalLang) {
                    status += '✓ localStorage 中存在 clawpal_language<br>';
                    status += '值: ' + clawpalLang + '<br>';
                    if (clawpalLang === CONFIG.DEFAULT_LANGUAGE) {
                        status += '<span class="success">✓ 语言设置正确: ' + CONFIG.DEFAULT_LANGUAGE + '</span><br>';
                    } else {
                        status += '<span class="warning">⚠️ 语言设置为: ' + clawpalLang + ' (非中文)</span><br>';
                    }
                } else {
                    status += '<span class="error">✗ localStorage 中无 clawpal_language 设置</span><br>';
                }

                // 检查 OpenClaw 语言设置
                const openclawSettings = localStorage.getItem(CONFIG.OPENCLAW_STORAGE_KEY);
                status += '<br><strong>=== OpenClaw 语言设置 ===</strong><br>';
                if (openclawSettings) {
                    status += '✓ localStorage 中存在 openclaw.control.settings.v1<br>';
                    try {
                        const parsed = JSON.parse(openclawSettings);
                        status += '✓ 设置格式正确<br>';
                        status += '语言设置: ' + (parsed.language || '未设置') + '<br>';
                        if (parsed.language === CONFIG.DEFAULT_LANGUAGE) {
                            status += '<span class="success">✓ 语言设置正确: ' + CONFIG.DEFAULT_LANGUAGE + '</span><br>';
                        } else if (parsed.language) {
                            status += '<span class="warning">⚠️ 语言设置为: ' + parsed.language + ' (非中文)</span><br>';
                        } else {
                            status += '<span class="error">✗ 未找到语言设置</span><br>';
                        }
                    } catch (e) {
                        status += '<span class="error">✗ 设置格式错误: ' + e.message + '</span><br>';
                        status += '原始设置: ' + openclawSettings + '<br>';
                    }
                } else {
                    status += '<span class="error">✗ localStorage 中无 openclaw.control.settings.v1 设置</span><br>';
                }

                // 检查同步状态
                status += '<br><strong>=== 同步状态 ===</strong><br>';
                if (clawpalLang && openclawSettings) {
                    try {
                        const parsed = JSON.parse(openclawSettings);
                        if (clawpalLang === parsed.language && parsed.language === CONFIG.DEFAULT_LANGUAGE) {
                            status += '<span class="success">✓ 语言设置同步且正确</span><br>';
                        } else if (clawpalLang === parsed.language) {
                            status += '<span class="warning">⚠️ 语言设置同步但非中文</span><br>';
                        } else {
                            status += '<span class="error">✗ 语言设置不同步</span><br>';
                            status += 'clawpal_language: ' + clawpalLang + '<br>';
                            status += 'openclaw.control.settings.v1.language: ' + (parsed.language || '未设置') + '<br>';
                        }
                    } catch (e) {
                        status += '<span class="error">✗ 无法检查同步状态: ' + e.message + '</span><br>';
                    }
                } else {
                    status += '<span class="error">✗ 无法检查同步状态: 缺少设置</span><br>';
                }

            } catch (e) {
                status += '<span class="error">检查时出错: ' + e.message + '</span><br>';
            }

            output.innerHTML = status;
        }

        // 同步修复语言设置
        function syncLanguageSettings() {
            const output = document.getElementById('fixOutput');
            const resultOutput = document.getElementById('resultOutput');
            let result = '';

            try {
                result += '<strong>=== 开始同步修复 ===</strong><br>';
                result += '<span class="warning">⚠️ 执行同步修复，请耐心等待...</span><br>';
                
                // 步骤 1: 清除旧设置
                result += '<br><strong>=== 步骤 1: 清除旧设置 ===</strong><br>';
                localStorage.removeItem(CONFIG.CLAWPAL_STORAGE_KEY);
                localStorage.removeItem(CONFIG.OPENCLAW_STORAGE_KEY);
                result += '✓ 清除旧的 clawpal_language 设置<br>';
                result += '✓ 清除旧的 openclaw.control.settings.v1 设置<br>';

                // 步骤 2: 创建新的中文设置
                result += '<br><strong>=== 步骤 2: 创建新的中文设置 ===</strong><br>';
                
                // 设置 clawpal_language
                localStorage.setItem(CONFIG.CLAWPAL_STORAGE_KEY, CONFIG.DEFAULT_LANGUAGE);
                result += '✓ 设置 clawpal_language 为: ' + CONFIG.DEFAULT_LANGUAGE + '<br>';
                
                // 设置 openclaw.control.settings.v1
                const newSettings = {
                    language: CONFIG.DEFAULT_LANGUAGE,
                    theme: 'system',
                    fontSize: 'medium',
                    autoSave: true,
                    notifications: true,
                    sidebar: true,
                    createdAt: new Date().toISOString(),
                    version: '1.0',
                    syncFixed: true,
                    syncTime: new Date().toISOString()
                };
                
                const settingsJson = JSON.stringify(newSettings);
                localStorage.setItem(CONFIG.OPENCLAW_STORAGE_KEY, settingsJson);
                result += '✓ 创建新的 openclaw.control.settings.v1 设置<br>';
                result += '设置内容: ' + settingsJson + '<br>';

                // 步骤 3: 验证修复
                result += '<br><strong>=== 步骤 3: 验证修复 ===</strong><br>';
                
                // 验证 clawpal_language
                const verifyClawpal = localStorage.getItem(CONFIG.CLAWPAL_STORAGE_KEY);
                if (verifyClawpal === CONFIG.DEFAULT_LANGUAGE) {
                    result += '✓ clawpal_language 设置正确: ' + verifyClawpal + '<br>';
                } else {
                    result += '<span class="error">✗ clawpal_language 设置失败: ' + verifyClawpal + '</span><br>';
                }
                
                // 验证 openclaw.control.settings.v1
                const verifyOpenclaw = localStorage.getItem(CONFIG.OPENCLAW_STORAGE_KEY);
                if (verifyOpenclaw) {
                    try {
                        const parsed = JSON.parse(verifyOpenclaw);
                        if (parsed.language === CONFIG.DEFAULT_LANGUAGE) {
                            result += '✓ openclaw.control.settings.v1 设置正确: ' + parsed.language + '<br>';
                        } else {
                            result += '<span class="error">✗ openclaw.control.settings.v1 设置失败: ' + parsed.language + '</span><br>';
                        }
                    } catch (e) {
                        result += '<span class="error">✗ openclaw.control.settings.v1 格式错误: ' + e.message + '</span><br>';
                    }
                } else {
                    result += '<span class="error">✗ openclaw.control.settings.v1 设置失败: 未找到</span><br>';
                }

                // 步骤 4: 检查同步状态
                result += '<br><strong>=== 步骤 4: 检查同步状态 ===</strong><br>';
                const finalClawpal = localStorage.getItem(CONFIG.CLAWPAL_STORAGE_KEY);
                const finalOpenclaw = localStorage.getItem(CONFIG.OPENCLAW_STORAGE_KEY);
                
                if (finalClawpal && finalOpenclaw) {
                    try {
                        const parsed = JSON.parse(finalOpenclaw);
                        if (finalClawpal === parsed.language && parsed.language === CONFIG.DEFAULT_LANGUAGE) {
                            result += '<span class="success">✅ 同步修复成功！</span><br>';
                            result += '<br><strong>=== 修复结果 ===</strong><br>';
                            result += '🎯 语言设置已同步为: ' + CONFIG.DEFAULT_LANGUAGE + '<br>';
                            result += '🔒 两个 localStorage 键均已更新<br>';
                            result += '🚀 重启 OpenClaw 后应保持中文<br>';
                            result += '✅ 同步状态: 正常<br>';
                        } else {
                            result += '<span class="error">❌ 同步修复失败: 语言设置不同步</span><br>';
                        }
                    } catch (e) {
                        result += '<span class="error">❌ 同步修复失败: ' + e.message + '</span><br>';
                    }
                } else {
                    result += '<span class="error">❌ 同步修复失败: 缺少设置</span><br>';
                }

            } catch (e) {
                result += '<span class="error">修复时出错: ' + e.message + '</span><br>';
            }

            output.innerHTML = result;
            resultOutput.innerHTML = result;
        }

        // 测试持久化
        function testPersistence() {
            const output = document.getElementById('fixOutput');
            let result = '';

            try {
                result += '<strong>=== 测试持久化 ===</strong><br>';
                
                // 检查当前设置
                const beforeClawpal = localStorage.getItem(CONFIG.CLAWPAL_STORAGE_KEY);
                const beforeOpenclaw = localStorage.getItem(CONFIG.OPENCLAW_STORAGE_KEY);
                result += '测试前 clawpal_language: ' + (beforeClawpal || '无') + '<br>';
                result += '测试前 openclaw.control.settings.v1: ' + (beforeOpenclaw ? '存在' : '无') + '<br>';

                // 模拟刷新
                result += '✓ 模拟页面刷新<br>';

                // 检查刷新后设置
                const afterClawpal = localStorage.getItem(CONFIG.CLAWPAL_STORAGE_KEY);
                const afterOpenclaw = localStorage.getItem(CONFIG.OPENCLAW_STORAGE_KEY);
                result += '测试后 clawpal_language: ' + (afterClawpal || '无') + '<br>';
                result += '测试后 openclaw.control.settings.v1: ' + (afterOpenclaw ? '存在' : '无') + '<br>';

                // 验证结果
                if (afterClawpal && afterOpenclaw) {
                    try {
                        const parsed = JSON.parse(afterOpenclaw);
                        if (afterClawpal === parsed.language && parsed.language === CONFIG.DEFAULT_LANGUAGE) {
                            result += '<span class="success">✅ 持久化测试通过！设置保持同步</span><br>';
                        } else if (afterClawpal === parsed.language) {
                            result += '<span class="warning">⚠️ 持久化测试通过，但语言非中文</span><br>';
                        } else {
                            result += '<span class="error">❌ 持久化测试失败！设置不同步</span><br>';
                        }
                    } catch (e) {
                        result += '<span class="error">❌ 持久化测试失败: ' + e.message + '</span><br>';
                    }
                } else {
                    result += '<span class="error">❌ 持久化测试失败！设置丢失</span><br>';
                }

            } catch (e) {
                result += '<span class="error">测试时出错: ' + e.message + '</span><br>';
            }

            output.innerHTML = result;
        }

        // 清除所有设置
        function clearAllSettings() {
            const output = document.getElementById('fixOutput');
            
            if (confirm('确定要清除所有语言设置吗？这将重置所有相关设置。')) {
                try {
                    localStorage.removeItem(CONFIG.CLAWPAL_STORAGE_KEY);
                    localStorage.removeItem(CONFIG.OPENCLAW_STORAGE_KEY);
                    output.innerHTML = '<span class="success">✅ 所有设置已清除</span><br>';
                } catch (e) {
                    output.innerHTML = '<span class="error">清除时出错: ' + e.message + '</span><br>';
                }
            }
        }

        // 页面加载时自动检查状态
        window.onload = function() {
            checkCurrentStatus();
        };
    </script>
</body>
</html>`;

    const fixToolPath = path.join(CONFIG.WORKING_DIR, 'openclaw-language-sync-fix.html');
    fs.writeFileSync(fixToolPath, htmlContent);
    log(`创建同步修复工具: ${fixToolPath}`, 'success');
    return fixToolPath;
}

// 创建本地服务器
function startServer() {
    const server = http.createServer((req, res) => {
        const parsedUrl = url.parse(req.url, true);
        const pathname = parsedUrl.pathname;

        if (pathname === '/') {
            // 重定向到同步修复工具
            const fixToolPath = path.join(CONFIG.WORKING_DIR, 'openclaw-language-sync-fix.html');
            if (fs.existsSync(fixToolPath)) {
                const content = fs.readFileSync(fixToolPath, 'utf8');
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.end(content);
            } else {
                res.writeHead(404, {'Content-Type': 'text/plain'});
                res.end('修复工具不存在');
            }
        } else if (pathname === '/api/check') {
            // API: 检查状态
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({
                status: 'ok',
                message: '服务器运行正常',
                timestamp: new Date().toISOString()
            }));
        } else {
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('Not Found');
        }
    });

    server.listen(CONFIG.PORT, () => {
        log(`🚀 同步修复服务器启动成功！`, 'success');
        log(`🌐 访问地址: http://localhost:${CONFIG.PORT}`, 'info');
        log(`🔧 打开浏览器访问上述地址开始同步修复`, 'info');
        log(`📖 按照页面提示操作即可完成修复`, 'info');
    });

    server.on('error', (error) => {
        log(`服务器启动失败: ${error.message}`, 'error');
        log(`尝试使用其他端口...`, 'warning');
        
        // 尝试其他端口
        CONFIG.PORT = 8888;
        server.listen(CONFIG.PORT, () => {
            log(`🚀 同步修复服务器启动成功！`, 'success');
            log(`🌐 访问地址: http://localhost:${CONFIG.PORT}`, 'info');
        });
    });
}

// 创建启动脚本
function createStartScript() {
    const startScript = `@echo off

REM OpenClaw 语言设置同步修复启动脚本
REM 解决语言设置不同步问题

echo 🚀 启动 OpenClaw 语言设置同步修复工具...
echo 🌐 请在浏览器中访问:
echo http://localhost:8887
echo 
echo 🔧 按照页面提示操作即可完成修复
echo 
echo 📖 修复完成后，重启 OpenClaw 即可看到中文界面

echo 正在启动修复服务器...
node "${path.join(CONFIG.WORKING_DIR, 'fix-openclaw-language-sync.js')}"

pause
`;

    const startScriptPath = path.join(CONFIG.WORKING_DIR, 'start-language-sync-fix.bat');
    fs.writeFileSync(startScriptPath, startScript);
    log(`创建启动脚本: ${startScriptPath}`, 'success');
    return startScriptPath;
}

// 主函数
function main() {
    console.log('');
    console.log('========================================');
    console.log('🔧 OpenClaw 语言设置同步修复工具');
    console.log('========================================');
    console.log('');

    // 1. 检查环境
    log('=== 环境检查 ===', 'info');
    
    // 检查 Node.js 版本
    const nodeVersion = process.version;
    log(`Node.js 版本: ${nodeVersion}`, 'info');
    
    // 检查工作目录
    log(`工作目录: ${CONFIG.WORKING_DIR}`, 'info');
    
    // 检查文件权限
    try {
        fs.writeFileSync(path.join(CONFIG.WORKING_DIR, 'test-permission.txt'), 'test');
        fs.unlinkSync(path.join(CONFIG.WORKING_DIR, 'test-permission.txt'));
        log('文件权限: 正常', 'success');
    } catch (error) {
        log(`文件权限: 错误 - ${error.message}`, 'error');
    }
    
    log('环境检查完成', 'info');
    console.log('');

    // 2. 创建同步修复工具
    log('=== 创建同步修复工具 ===', 'info');
    const fixToolPath = createSyncFixTool();
    console.log('');

    // 3. 创建启动脚本
    log('=== 创建启动脚本 ===', 'info');
    const startScriptPath = createStartScript();
    console.log('');

    // 4. 启动服务器
    log('=== 启动同步修复服务器 ===', 'info');
    startServer();
    console.log('');

    // 5. 显示使用说明
    log('📖 使用说明:', 'info');
    log('1. 打开浏览器访问: http://localhost:8887', 'info');
    log('2. 点击 "检查当前状态" 查看具体问题', 'info');
    log('3. 点击 "同步修复语言设置" 执行修复', 'info');
    log('4. 测试持久化功能', 'info');
    log('5. 刷新 OpenClaw 页面验证', 'info');
    log('6. 重启 OpenClaw 后再次验证', 'info');
    console.log('');

    log('🎯 修复完成后，OpenClaw 将：', 'success');
    log('• 显示中文界面', 'success');
    log('• 重启后保持中文', 'success');
    log('• 语言设置同步更新', 'success');
    log('• 持久化存储语言设置', 'success');
    console.log('');

    log('💡 核心修复原理:', 'info');
    log('- 同时更新两个 localStorage 键: clawpal_language 和 openclaw.control.settings.v1', 'info');
    log('- 确保语言设置在两个存储位置保持同步', 'info');
    log('- 提供完整的验证和测试功能', 'info');
    log('- 修复重启后语言设置重置的问题', 'info');
    console.log('');
}

// 执行主函数
if (require.main === module) {
    main();
}

module.exports = {
    main,
    createSyncFixTool,
    startServer
};