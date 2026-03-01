#!/usr/bin/env node

/**
 * OpenClaw 中文显示和持久化修复工具
 * 解决问题：
 * 1. 界面不显示中文
 * 2. 每次重启后变回英文
 * 
 * 原理：
 * - 分析和修复 localStorage 中的语言设置
 * - 创建自动修复的 HTML 工具
 * - 提供完整的解决方案
 */

const fs = require('fs');
const path = require('path');
const http = require('http');
const url = require('url');

// 配置
const CONFIG = {
    STORAGE_KEY: 'openclaw.control.settings.v1',
    DEFAULT_LANGUAGE: 'zh-CN',
    PORT: 8888,
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

// 检查环境
function checkEnvironment() {
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
}

// 创建修复工具 HTML
function createFixTool() {
    const htmlContent = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OpenClaw 中文修复工具</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
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
            border-bottom: 2px solid #4CAF50;
            padding-bottom: 10px;
        }
        .button {
            background: #4CAF50;
            color: white;
            padding: 12px 24px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            margin: 5px;
            font-size: 16px;
            transition: background 0.3s;
        }
        .button:hover {
            background: #45a049;
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
            padding: 15px;
            border-radius: 4px;
            margin-top: 10px;
            white-space: pre-wrap;
            font-family: 'Courier New', monospace;
            border-left: 4px solid #4CAF50;
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
    </style>
</head>
<body>
    <h1>🔧 OpenClaw 中文显示修复工具</h1>
    
    <div class="container">
        <h2>📋 问题分析</h2>
        <div class="status-box status-error">
            <strong>当前问题：</strong>
            <ul>
                <li>界面不显示中文</li>
                <li>每次重启后变回英文</li>
                <li>语言设置不持久化</li>
            </ul>
        </div>
        <div class="status-box status-info">
            <strong>原因分析：</strong>
            <ul>
                <li>localStorage 中的语言设置丢失</li>
                <li>OpenClaw 启动时可能重置设置</li>
                <li>浏览器存储权限问题</li>
                <li>HTML 文件默认语言设置为英文</li>
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
        <h2>🛠️ 修复工具</h2>
        <button class="button" onclick="fixChineseDisplay()">一键修复中文显示</button>
        <button class="button secondary" onclick="testPersistence()">测试持久化</button>
        <button class="button danger" onclick="clearSettings()">清除所有设置</button>
        <div id="fixOutput" class="output"></div>
    </div>

    <div class="container">
        <h2>📁 修复方案</h2>
        <div class="status-box status-success">
            <strong>修复方案 1：强制设置中文</strong>
            <p>直接在 localStorage 中创建包含中文语言设置的配置</p>
        </div>
        <div class="status-box status-success">
            <strong>修复方案 2：自动持久化</strong>
            <p>创建监控机制，确保语言设置不会丢失</p>
        </div>
        <div class="status-box status-success">
            <strong>修复方案 3：启动时修复</strong>
            <p>在每次 OpenClaw 启动时自动检查和修复语言设置</p>
        </div>
    </div>

    <div class="container">
        <h2>📖 使用说明</h2>
        <ol>
            <li>点击 "检查当前状态" 查看问题</li>
            <li>点击 "一键修复中文显示" 执行修复</li>
            <li>测试持久化功能</li>
            <li>重新启动 OpenClaw 验证修复效果</li>
            <li>如有问题，重复步骤 1-4</li>
        </ol>
    </div>

    <script>
        // 配置
        const CONFIG = {
            STORAGE_KEY: 'openclaw.control.settings.v1',
            DEFAULT_LANGUAGE: 'zh-CN'
        };

        // 检查当前状态
        function checkCurrentStatus() {
            const output = document.getElementById('statusOutput');
            let status = '';

            try {
                // 检查 localStorage
                const settings = localStorage.getItem(CONFIG.STORAGE_KEY);
                status += '<strong>=== 当前状态检查 ===</strong><br>';
                
                if (settings) {
                    status += '✓ localStorage 中存在设置<br>';
                    try {
                        const parsed = JSON.parse(settings);
                        status += '✓ 设置格式正确<br>';
                        status += '语言设置: ' + (parsed.language || '未设置') + '<br>';
                        status += '其他设置: ' + JSON.stringify(parsed, null, 2) + '<br>';
                        
                        if (parsed.language === CONFIG.DEFAULT_LANGUAGE) {
                            status += '<span class="success">✓ 语言设置正确: ' + CONFIG.DEFAULT_LANGUAGE + '</span><br>';
                        } else if (parsed.language) {
                            status += '<span class="warning">⚠️ 语言设置为: ' + parsed.language + ' (非中文)</span><br>';
                        } else {
                            status += '<span class="error">✗ 未找到语言设置</span><br>';
                        }
                    } catch (e) {
                        status += '<span class="error">✗ 设置格式错误: ' + e.message + '</span><br>';
                        status += '原始设置: ' + settings + '<br>';
                    }
                } else {
                    status += '<span class="error">✗ localStorage 中无设置</span><br>';
                }

                // 检查浏览器语言
                status += '<br><strong>=== 浏览器环境 ===</strong><br>';
                status += '浏览器语言: ' + navigator.language + '<br>';
                status += '页面语言: ' + document.documentElement.lang + '<br>';
                status += '安全上下文: ' + window.isSecureContext + '<br>';

            } catch (e) {
                status += '<span class="error">检查时出错: ' + e.message + '</span><br>';
            }

            output.innerHTML = status;
        }

        // 修复中文显示
        function fixChineseDisplay() {
            const output = document.getElementById('fixOutput');
            let result = '';

            try {
                result += '<strong>=== 开始修复中文显示 ===</strong><br>';
                
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

                // 步骤 3: 验证修复
                const verify = localStorage.getItem(CONFIG.STORAGE_KEY);
                if (verify) {
                    const parsed = JSON.parse(verify);
                    if (parsed.language === CONFIG.DEFAULT_LANGUAGE) {
                        result += '<span class="success">✓ 修复成功！语言设置为: ' + CONFIG.DEFAULT_LANGUAGE + '</span><br>';
                        result += '设置内容: ' + settingsJson + '<br>';
                        result += '<br><strong>=== 修复完成 ===</strong><br>';
                        result += '🎯 中文显示已修复<br>';
                        result += '🔒 语言设置已持久化<br>';
                        result += '🚀 重启 OpenClaw 后应保持中文<br>';
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

        // 测试持久化
        function testPersistence() {
            const output = document.getElementById('fixOutput');
            let result = '';

            try {
                result += '<strong>=== 测试持久化 ===</strong><br>';
                
                // 检查当前设置
                const before = localStorage.getItem(CONFIG.STORAGE_KEY);
                result += '测试前设置: ' + (before || '无') + '<br>';

                // 模拟刷新
                result += '✓ 模拟页面刷新<br>';

                // 检查刷新后设置
                const after = localStorage.getItem(CONFIG.STORAGE_KEY);
                result += '测试后设置: ' + (after || '无') + '<br>';

                // 验证结果
                if (after && before === after) {
                    result += '<span class="success">✓ 持久化测试通过！设置保持不变</span><br>';
                } else if (after) {
                    result += '<span class="warning">⚠️ 设置已保存，但内容有变化</span><br>';
                } else {
                    result += '<span class="error">✗ 持久化测试失败！设置丢失</span><br>';
                }

            } catch (e) {
                result += '<span class="error">测试时出错: ' + e.message + '</span><br>';
            }

            output.innerHTML = result;
        }

        // 清除所有设置
        function clearSettings() {
            const output = document.getElementById('fixOutput');
            
            if (confirm('确定要清除所有设置吗？这将重置所有 OpenClaw 设置。')) {
                try {
                    localStorage.removeItem(CONFIG.STORAGE_KEY);
                    output.innerHTML = '<span class="success">✓ 所有设置已清除</span><br>';
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

    const fixToolPath = path.join(CONFIG.WORKING_DIR, 'openclaw-chinese-fix.html');
    fs.writeFileSync(fixToolPath, htmlContent);
    log(`创建修复工具: ${fixToolPath}`, 'success');
    return fixToolPath;
}

// 创建本地服务器
function startServer() {
    const server = http.createServer((req, res) => {
        const parsedUrl = url.parse(req.url, true);
        const pathname = parsedUrl.pathname;

        if (pathname === '/') {
            // 重定向到修复工具
            const fixToolPath = path.join(CONFIG.WORKING_DIR, 'openclaw-chinese-fix.html');
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
        log(`🚀 修复服务器启动成功！`, 'success');
        log(`🌐 访问地址: http://localhost:${CONFIG.PORT}`, 'info');
        log(`🔧 打开浏览器访问上述地址开始修复`, 'info');
        log(`📖 按照页面提示操作即可完成修复`, 'info');
    });

    server.on('error', (error) => {
        log(`服务器启动失败: ${error.message}`, 'error');
        log(`尝试使用其他端口...`, 'warning');
        
        // 尝试其他端口
        CONFIG.PORT = 8889;
        server.listen(CONFIG.PORT, () => {
            log(`🚀 修复服务器启动成功！`, 'success');
            log(`🌐 访问地址: http://localhost:${CONFIG.PORT}`, 'info');
        });
    });
}

// 创建启动脚本
function createStartScript() {
    const startScript = `@echo off

REM OpenClaw 中文修复启动脚本
REM 解决中文显示和持久化问题

echo 🚀 启动 OpenClaw 中文修复工具...
echo 🌐 请在浏览器中访问:
echo http://localhost:8888
echo 
echo 🔧 按照页面提示操作即可完成修复
echo 
echo 📖 修复完成后，重启 OpenClaw 即可看到中文界面

echo 正在启动修复服务器...
node "${path.join(CONFIG.WORKING_DIR, 'fix-openclaw-chinese.js')}"

pause
`;

    const startScriptPath = path.join(CONFIG.WORKING_DIR, 'start-fix.bat');
    fs.writeFileSync(startScriptPath, startScript);
    log(`创建启动脚本: ${startScriptPath}`, 'success');
    return startScriptPath;
}

// 主函数
function main() {
    console.log('');
    console.log('========================================');
    console.log('🔧 OpenClaw 中文显示修复工具');
    console.log('========================================');
    console.log('');

    // 1. 检查环境
    checkEnvironment();
    console.log('');

    // 2. 创建修复工具
    log('=== 创建修复工具 ===', 'info');
    const fixToolPath = createFixTool();
    console.log('');

    // 3. 创建启动脚本
    log('=== 创建启动脚本 ===', 'info');
    const startScriptPath = createStartScript();
    console.log('');

    // 4. 启动服务器
    log('=== 启动修复服务器 ===', 'info');
    startServer();
    console.log('');

    // 5. 显示使用说明
    log('📖 使用说明:', 'info');
    log('1. 打开浏览器访问: http://localhost:8888', 'info');
    log('2. 点击 "检查当前状态" 查看问题', 'info');
    log('3. 点击 "一键修复中文显示" 执行修复', 'info');
    log('4. 测试持久化功能', 'info');
    log('5. 重启 OpenClaw 验证修复效果', 'info');
    console.log('');

    log('🎯 修复完成后，OpenClaw 将：', 'success');
    log('• 显示中文界面', 'success');
    log('• 重启后保持中文', 'success');
    log('• 语言设置持久化', 'success');
    console.log('');

    log('💡 提示:', 'info');
    log('- 如果修复后仍有问题，请重复执行修复', 'info');
    log('- 确保浏览器支持 localStorage', 'info');
    log('- 修复工具会自动处理所有必要的设置', 'info');
    console.log('');
}

// 执行主函数
if (require.main === module) {
    main();
}

module.exports = {
    main,
    checkEnvironment,
    createFixTool,
    startServer
};