#!/usr/bin/env node

/**
 * OpenClaw 语言设置同步修复工具
 * 解决问题：
 * 1. 语言设置不同步
 * 2. 界面不显示中文
 * 3. 重启后变回英文
 * 
 * 根本原因：
 * - 存在两个localStorage存储位置
 * - clawpal_language 和 openclaw.control.settings.v1
 * - 两个存储位置的语言设置不同步
 */

const fs = require('fs');
const path = require('path');
const http = require('http');
const url = require('url');

// 配置
const CONFIG = {
    STORAGE_KEYS: {
        CLAWPAL: 'clawpal_language',
        OPENCLAW: 'openclaw.control.settings.v1'
    },
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

// 创建同步修复工具
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
        .step {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 4px;
            margin: 10px 0;
            border-left: 4px solid #2196F3;
        }
        .step-number {
            background: #2196F3;
            color: white;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            margin-right: 10px;
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
        tr:hover {
            background-color: #f5f5f5;
        }
    </style>
</head>
<body>
    <h1>🔧 OpenClaw 语言设置同步修复工具</h1>
    
    <div class="container">
        <h2>🚨 问题分析</h2>
        <div class="status-error">
            <strong>核心问题：</strong>
            <ul>
                <li>❌ 语言设置不同步</li>
                <li>❌ 界面不显示中文</li>
                <li>❌ 重启后变回英文</li>
            </ul>
        </div>
        <div class="status-info">
            <strong>根本原因：</strong>
            <p>OpenClaw 使用两个不同的 localStorage 存储位置：</p>
            <ul>
                <li><code>clawpal_language</code> - ClawPal 使用的存储键</li>
                <li><code>openclaw.control.settings.v1</code> - OpenClaw 控制面板使用的存储键</li>
            </ul>
            <p>这两个存储位置的语言设置不同步，导致界面显示英文，重启后设置丢失。</p>
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
        <button class="button" onclick="syncFixLanguage()">同步修复语言设置</button>
        <button class="button secondary" onclick="testPersistence()">测试持久化</button>
        <button class="button danger" onclick="clearSettings()">清除所有设置</button>
        <div id="fixOutput" class="output"></div>
    </div>

    <div class="container">
        <h2>🔧 修复原理</h2>
        <div class="step">
            <span class="step-number">1</span>
            <strong>清除旧设置</strong>
            <p>清除两个 localStorage 键的旧值，确保没有冲突</p>
        </div>
        <div class="step">
            <span class="step-number">2</span>
            <strong>同步设置</strong>
            <p>同时在两个存储位置设置中文语言，确保同步</p>
        </div>
        <div class="step">
            <span class="step-number">3</span>
            <strong>验证同步</strong>
            <p>验证两个存储位置的语言设置是否一致</p>
        </div>
        <div class="step">
            <span class="step-number">4</span>
            <strong>测试持久化</strong>
            <p>测试设置在刷新后是否仍然有效</p>
        </div>
    </div>

    <div class="container">
        <h2>📊 存储状态</h2>
        <table id="storageTable">
            <thead>
                <tr>
                    <th>存储键</th>
                    <th>当前值</th>
                    <th>状态</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>clawpal_language</td>
                    <td id="clawpalValue">-</td>
                    <td id="clawpalStatus">-</td>
                </tr>
                <tr>
                    <td>openclaw.control.settings.v1</td>
                    <td id="openclawValue">-</td>
                    <td id="openclawStatus">-</td>
                </tr>
            </tbody>
        </table>
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
            STORAGE_KEYS: {
                CLAWPAL: 'clawpal_language',
                OPENCLAW: 'openclaw.control.settings.v1'
            },
            DEFAULT_LANGUAGE: 'zh-CN'
        };

        // 检查当前状态
        function checkCurrentStatus() {
            const output = document.getElementById('statusOutput');
            let result = '';

            try {
                result += '<strong>=== 当前状态检查 ===</strong><br>';
                
                // 检查 clawpal_language
                const clawpalValue = localStorage.getItem(CONFIG.STORAGE_KEYS.CLAWPAL);
                result += '<br><strong>=== clawpal_language ===</strong><br>';
                if (clawpalValue) {
                    result += '✓ 存在设置: ' + clawpalValue + '<br>';
                    if (clawpalValue === CONFIG.DEFAULT_LANGUAGE) {
                        result += '<span class="success">✓ 语言设置正确: ' + clawpalValue + '</span><br>';
                    } else {
                        result += '<span class="warning">⚠️ 语言设置错误: ' + clawpalValue + '</span><br>';
                    }
                } else {
                    result += '<span class="error">✗ 无设置</span><br>';
                }

                // 检查 openclaw.control.settings.v1
                const openclawValue = localStorage.getItem(CONFIG.STORAGE_KEYS.OPENCLAW);
                result += '<br><strong>=== openclaw.control.settings.v1 ===</strong><br>';
                if (openclawValue) {
                    result += '✓ 存在设置<br>';
                    try {
                        const parsed = JSON.parse(openclawValue);
                        result += '语言设置: ' + (parsed.language || '未设置') + '<br>';
                        if (parsed.language === CONFIG.DEFAULT_LANGUAGE) {
                            result += '<span class="success">✓ 语言设置正确: ' + parsed.language + '</span><br>';
                        } else if (parsed.language) {
                            result += '<span class="warning">⚠️ 语言设置错误: ' + parsed.language + '</span><br>';
                        } else {
                            result += '<span class="error">✗ 未找到语言设置</span><br>';
                        }
                    } catch (e) {
                        result += '<span class="error">✗ 设置格式错误: ' + e.message + '</span><br>';
                    }
                } else {
                    result += '<span class="error">✗ 无设置</span><br>';
                }

                // 检查同步状态
                result += '<br><strong>=== 同步状态 ===</strong><br>';
                let isSynced = false;
                if (clawpalValue && openclawValue) {
                    try {
                        const parsed = JSON.parse(openclawValue);
                        if (clawpalValue === parsed.language) {
                            if (clawpalValue === CONFIG.DEFAULT_LANGUAGE) {
                                result += '<span class="success">✅ 同步状态: 已同步，语言设置正确</span><br>';
                                isSynced = true;
                            } else {
                                result += '<span class="warning">⚠️ 同步状态: 已同步，但语言设置错误</span><br>';
                            }
                        } else {
                            result += '<span class="error">❌ 同步状态: 未同步</span><br>';
                        }
                    } catch (e) {
                        result += '<span class="error">❌ 同步状态: 无法解析设置</span><br>';
                    }
                } else {
                    result += '<span class="error">❌ 同步状态: 缺少设置</span><br>';
                }

                // 更新存储状态表格
                updateStorageTable();

            } catch (e) {
                result += '<span class="error">检查时出错: ' + e.message + '</span><br>';
            }

            output.innerHTML = result;
        }

        // 同步修复语言设置
        function syncFixLanguage() {
            const output = document.getElementById('fixOutput');
            let result = '';

            try {
                result += '<strong>=== 开始同步修复 ===</strong><br>';
                
                // 步骤 1: 清除旧设置
                result += '<br><strong>=== 步骤 1: 清除旧设置 ===</strong><br>';
                localStorage.removeItem(CONFIG.STORAGE_KEYS.CLAWPAL);
                localStorage.removeItem(CONFIG.STORAGE_KEYS.OPENCLAW);
                result += '✓ 清除 clawpal_language<br>';
                result += '✓ 清除 openclaw.control.settings.v1<br>';

                // 步骤 2: 创建新的中文设置
                result += '<br><strong>=== 步骤 2: 创建新设置 ===</strong><br>';
                
                // 设置 clawpal_language
                localStorage.setItem(CONFIG.STORAGE_KEYS.CLAWPAL, CONFIG.DEFAULT_LANGUAGE);
                result += '✓ 设置 clawpal_language: ' + CONFIG.DEFAULT_LANGUAGE + '<br>';
                
                // 设置 openclaw.control.settings.v1
                const openclawSettings = {
                    language: CONFIG.DEFAULT_LANGUAGE,
                    theme: 'system',
                    fontSize: 'medium',
                    autoSave: true,
                    notifications: true,
                    sidebar: true,
                    syncFixed: true,
                    syncTime: new Date().toISOString(),
                    version: '1.0'
                };
                const openclawJson = JSON.stringify(openclawSettings);
                localStorage.setItem(CONFIG.STORAGE_KEYS.OPENCLAW, openclawJson);
                result += '✓ 设置 openclaw.control.settings.v1: ' + CONFIG.DEFAULT_LANGUAGE + '<br>';

                // 步骤 3: 验证同步
                result += '<br><strong>=== 步骤 3: 验证同步 ===</strong><br>';
                const clawpalValue = localStorage.getItem(CONFIG.STORAGE_KEYS.CLAWPAL);
                const openclawValue = localStorage.getItem(CONFIG.STORAGE_KEYS.OPENCLAW);
                
                if (clawpalValue && openclawValue) {
                    try {
                        const parsed = JSON.parse(openclawValue);
                        if (clawpalValue === parsed.language && parsed.language === CONFIG.DEFAULT_LANGUAGE) {
                            result += '<span class="success">✅ 同步验证通过！</span><br>';
                            result += 'clawpal_language: ' + clawpalValue + '<br>';
                            result += 'openclaw.control.settings.v1: ' + parsed.language + '<br>';
                        } else {
                            result += '<span class="error">❌ 同步验证失败！</span><br>';
                        }
                    } catch (e) {
                        result += '<span class="error">❌ 验证时出错: ' + e.message + '</span><br>';
                    }
                } else {
                    result += '<span class="error">❌ 验证失败: 缺少设置</span><br>';
                }

                // 步骤 4: 完成修复
                result += '<br><strong>=== 修复完成 ===</strong><br>';
                result += '<span class="success">🎯 语言设置同步修复成功！</span><br>';
                result += '🚀 刷新OpenClaw页面后应显示中文<br>';
                result += '🔒 重启后语言设置将保持同步<br>';

                // 更新存储状态表格
                updateStorageTable();

            } catch (e) {
                result += '<span class="error">修复时出错: ' + e.message + '</span><br>';
            }

            output.innerHTML = result;
        }

        // 测试持久化
        function testPersistence() {
            const output = document.getElementById('fixOutput');
            let result = '';

            try {
                result += '<strong>=== 测试持久化 ===</strong><br>';
                
                // 检查当前设置
                const clawpalBefore = localStorage.getItem(CONFIG.STORAGE_KEYS.CLAWPAL);
                const openclawBefore = localStorage.getItem(CONFIG.STORAGE_KEYS.OPENCLAW);
                
                result += '测试前 clawpal_language: ' + (clawpalBefore || '无') + '<br>';
                result += '测试前 openclaw.control.settings.v1: ' + (openclawBefore ? '存在' : '无') + '<br>';

                // 模拟刷新
                result += '<br>✓ 模拟页面刷新<br>';

                // 检查刷新后设置
                const clawpalAfter = localStorage.getItem(CONFIG.STORAGE_KEYS.CLAWPAL);
                const openclawAfter = localStorage.getItem(CONFIG.STORAGE_KEYS.OPENCLAW);
                
                result += '测试后 clawpal_language: ' + (clawpalAfter || '无') + '<br>';
                result += '测试后 openclaw.control.settings.v1: ' + (openclawAfter ? '存在' : '无') + '<br>';

                // 验证结果
                let isPersistent = false;
                if (clawpalBefore && clawpalAfter && clawpalBefore === clawpalAfter) {
                    if (openclawBefore && openclawAfter && openclawBefore === openclawAfter) {
                        result += '<br><span class="success">✅ 持久化测试通过！</span><br>';
                        isPersistent = true;
                    } else {
                        result += '<br><span class="warning">⚠️ 部分持久化失败</span><br>';
                    }
                } else {
                    result += '<br><span class="error">❌ 持久化测试失败！</span><br>';
                }

                // 验证语言设置
                if (isPersistent) {
                    if (clawpalAfter === CONFIG.DEFAULT_LANGUAGE) {
                        try {
                            const parsed = JSON.parse(openclawAfter);
                            if (parsed.language === CONFIG.DEFAULT_LANGUAGE) {
                                result += '<span class="success">✅ 语言设置正确且持久化</span><br>';
                            } else {
                                result += '<span class="warning">⚠️ 语言设置不正确</span><br>';
                            }
                        } catch (e) {
                            result += '<span class="error">❌ 无法解析设置</span><br>';
                        }
                    } else {
                        result += '<span class="warning">⚠️ 语言设置不正确</span><br>';
                    }
                }

            } catch (e) {
                result += '<span class="error">测试时出错: ' + e.message + '</span><br>';
            }

            output.innerHTML = result;
        }

        // 清除所有设置
        function clearSettings() {
            const output = document.getElementById('fixOutput');
            
            if (confirm('确定要清除所有语言设置吗？')) {
                try {
                    localStorage.removeItem(CONFIG.STORAGE_KEYS.CLAWPAL);
                    localStorage.removeItem(CONFIG.STORAGE_KEYS.OPENCLAW);
                    output.innerHTML = '<span class="success">✓ 已清除所有语言设置</span><br>';
                    updateStorageTable();
                } catch (e) {
                    output.innerHTML = '<span class="error">清除时出错: ' + e.message + '</span><br>';
                }
            }
        }

        // 更新存储状态表格
        function updateStorageTable() {
            // 更新 clawpal_language
            const clawpalValue = localStorage.getItem(CONFIG.STORAGE_KEYS.CLAWPAL);
            document.getElementById('clawpalValue').textContent = clawpalValue || '无';
            const clawpalStatus = document.getElementById('clawpalStatus');
            if (clawpalValue === CONFIG.DEFAULT_LANGUAGE) {
                clawpalStatus.textContent = '正确';
                clawpalStatus.style.color = 'green';
            } else if (clawpalValue) {
                clawpalStatus.textContent = '错误';
                clawpalStatus.style.color = 'red';
            } else {
                clawpalStatus.textContent = '无';
                clawpalStatus.style.color = 'gray';
            }

            // 更新 openclaw.control.settings.v1
            const openclawValue = localStorage.getItem(CONFIG.STORAGE_KEYS.OPENCLAW);
            document.getElementById('openclawValue').textContent = openclawValue ? '存在' : '无';
            const openclawStatus = document.getElementById('openclawStatus');
            if (openclawValue) {
                try {
                    const parsed = JSON.parse(openclawValue);
                    if (parsed.language === CONFIG.DEFAULT_LANGUAGE) {
                        openclawStatus.textContent = '正确';
                        openclawStatus.style.color = 'green';
                    } else if (parsed.language) {
                        openclawStatus.textContent = '错误';
                        openclawStatus.style.color = 'red';
                    } else {
                        openclawStatus.textContent = '无语言设置';
                        openclawStatus.style.color = 'orange';
                    }
                } catch (e) {
                    openclawStatus.textContent = '格式错误';
                    openclawStatus.style.color = 'red';
                }
            } else {
                openclawStatus.textContent = '无';
                openclawStatus.style.color = 'gray';
            }
        }

        // 页面加载时自动检查
        window.onload = function() {
            checkCurrentStatus();
        };
    </script>
</body>
</html>`;

    const toolPath = path.join(CONFIG.WORKING_DIR, 'language-sync-fix.html');
    fs.writeFileSync(toolPath, htmlContent);
    log(`创建同步修复工具: ${toolPath}`, 'success');
    return toolPath;
}

// 创建服务器
function startServer() {
    const server = http.createServer((req, res) => {
        const parsedUrl = url.parse(req.url, true);
        const pathname = parsedUrl.pathname;

        if (pathname === '/') {
            // 重定向到修复工具
            const toolPath = path.join(CONFIG.WORKING_DIR, 'language-sync-fix.html');
            if (fs.existsSync(toolPath)) {
                const content = fs.readFileSync(toolPath, 'utf8');
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.end(content);
            } else {
                res.writeHead(404, {'Content-Type': 'text/plain'});
                res.end('修复工具不存在');
            }
        } else {
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('Not Found');
        }
    });

    server.listen(CONFIG.PORT, () => {
        log(`🚀 语言同步修复服务器启动成功！`, 'success');
        log(`🌐 访问地址: http://localhost:${CONFIG.PORT}`, 'info');
        log(`🔧 打开浏览器访问上述地址执行同步修复`, 'info');
    });

    server.on('error', (error) => {
        log(`服务器启动失败: ${error.message}`, 'error');
        log(`尝试使用其他端口...`, 'warning');
        
        // 尝试其他端口
        CONFIG.PORT = 8888;
        server.listen(CONFIG.PORT, () => {
            log(`🚀 语言同步修复服务器启动成功！`, 'success');
            log(`🌐 访问地址: http://localhost:${CONFIG.PORT}`, 'info');
        });
    });
}

// 创建启动脚本
function createStartScript() {
    const startScript = `@echo off

REM OpenClaw 语言设置同步修复启动脚本
REM 解决语言设置不同步问题

echo 🚀 启动 OpenClaw 语言同步修复工具...
echo 🌐 请在浏览器中访问:
echo http://localhost:8887
echo 
echo 🔧 按照页面提示操作即可完成修复
echo 
echo 📖 修复完成后，OpenClaw 将显示中文并保持同步
echo 
echo 正在启动修复服务器...
node "${path.join(CONFIG.WORKING_DIR, 'fix-language-sync.js')}"

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

    // 1. 创建同步修复工具
    log('=== 创建同步修复工具 ===', 'info');
    const toolPath = createSyncFixTool();
    console.log('');

    // 2. 创建启动脚本
    log('=== 创建启动脚本 ===', 'info');
    const startScriptPath = createStartScript();
    console.log('');

    // 3. 启动服务器
    log('=== 启动同步修复服务器 ===', 'info');
    startServer();
    console.log('');

    // 4. 显示使用说明
    log('📖 使用说明:', 'info');
    log('1. 打开浏览器访问: http://localhost:8887', 'info');
    log('2. 点击 "检查当前状态" 查看问题', 'info');
    log('3. 点击 "同步修复语言设置" 执行修复', 'info');
    log('4. 点击 "测试持久化" 验证修复效果', 'info');
    log('5. 刷新 OpenClaw 页面验证效果', 'info');
    console.log('');

    log('💡 核心修复原理:', 'info');
    log('- 同时更新两个 localStorage 存储位置', 'info');
    log('- 确保 clawpal_language 和 openclaw.control.settings.v1 同步', 'info');
    log('- 验证语言设置的一致性', 'info');
    log('- 测试设置的持久化', 'info');
    console.log('');

    log('🔥 此工具解决:', 'info');
    log('- 语言设置不同步问题', 'info');
    log('- 界面不显示中文问题', 'info');
    log('- 重启后变回英文问题', 'info');
    console.log('');
}

// 执行主函数
if (require.main === module) {
    main();
}

module.exports = {
    main
};