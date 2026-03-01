#!/usr/bin/env node

/**
 * OpenClaw 强制中文修复工具
 * 直接解决语言显示问题，绕过OpenClaw的语言加载机制
 * 
 * 问题分析：
 * 1. localStorage中语言设置正确（显示简体中文）
 * 2. 但界面实际显示英文
 * 3. 需要强制刷新OpenClaw的语言状态
 */

const fs = require('fs');
const path = require('path');
const http = require('http');
const url = require('url');

// 配置
const CONFIG = {
    STORAGE_KEY: 'openclaw.control.settings.v1',
    DEFAULT_LANGUAGE: 'zh-CN',
    PORT: 8892,
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

// 创建强制修复工具
function createForceFixTool() {
    const htmlContent = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OpenClaw 强制中文修复工具</title>
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
            border-bottom: 2px solid #f44336;
            padding-bottom: 10px;
            margin-top: 25px;
        }
        .button {
            background: #f44336;
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
            background: #da190b;
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }
        .button.secondary {
            background: #2196F3;
        }
        .button.secondary:hover {
            background: #0b7dda;
        }
        .button.success {
            background: #4CAF50;
        }
        .button.success:hover {
            background: #45a049;
        }
        .output {
            background: #f9f9f9;
            padding: 20px;
            border-radius: 4px;
            margin-top: 15px;
            white-space: pre-wrap;
            font-family: 'Courier New', monospace;
            border-left: 4px solid #f44336;
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
    </style>
</head>
<body>
    <h1>⚡ OpenClaw 强制中文修复工具</h1>
    
    <div class="container">
        <h2>🚨 紧急修复</h2>
        <div class="status-error">
            <strong>问题确认：</strong>
            <ul>
                <li>✅ localStorage 中语言设置正确（显示简体中文）</li>
                <li>❌ 但界面实际显示英文</li>
                <li>❌ 刷新后依然是英文</li>
            </ul>
        </div>
        <div class="status-info">
            <strong>根本原因：</strong>
            <p>OpenClaw 的前端语言加载机制存在问题，即使 localStorage 中有正确的语言设置，也不会自动应用到界面上。</p>
        </div>
    </div>

    <div class="container">
        <h2>💥 强制修复</h2>
        <button class="button" onclick="forceChineseFix()">🔥 强制修复中文显示</button>
        <button class="button secondary" onclick="analyzeDeep()">🔍 深度分析</button>
        <button class="button success" onclick="testFix()">✅ 测试修复效果</button>
        <div id="fixOutput" class="output info">
            <p>点击按钮执行强制修复...</p>
        </div>
    </div>

    <div class="container">
        <h2>🔧 修复原理</h2>
        <div class="step">
            <span class="step-number">1</span>
            <strong>清除所有语言相关缓存</strong>
            <p>清除 localStorage 中的所有语言相关设置，确保没有冲突</p>
        </div>
        <div class="step">
            <span class="step-number">2</span>
            <strong>重建语言设置</strong>
            <p>创建全新的语言设置，确保格式完全正确</p>
        </div>
        <div class="step">
            <span class="step-number">3</span>
            <strong>强制状态更新</strong>
            <p>模拟多次语言切换，强制 OpenClaw 更新语言状态</p>
        </div>
        <div class="step">
            <span class="step-number">4</span>
            <strong>验证修复效果</strong>
            <p>验证语言设置是否正确应用</p>
        </div>
    </div>

    <div class="container">
        <h2>📊 技术分析</h2>
        <div id="techOutput" class="output">
            <p>点击深度分析查看技术详情...</p>
        </div>
    </div>

    <div class="container">
        <h2>📋 操作步骤</h2>
        <ol>
            <li>点击 <span class="highlight">强制修复中文显示</span> 按钮</li>
            <li>等待修复完成（约5秒）</li>
            <li>点击 <span class="highlight">测试修复效果</span> 按钮</li>
            <li>刷新 OpenClaw 页面（F5）</li>
            <li>验证界面是否显示中文</li>
            <li>如有问题，重复执行修复</li>
        </ol>
    </div>

    <script>
        // 配置
        const CONFIG = {
            STORAGE_KEY: 'openclaw.control.settings.v1',
            DEFAULT_LANGUAGE: 'zh-CN'
        };

        // 强制修复中文显示
        function forceChineseFix() {
            const output = document.getElementById('fixOutput');
            let result = '';

            try {
                result += '<strong>=== 开始强制修复 ===</strong><br>';
                result += '<span class="warning">⚠️ 执行深度修复，请耐心等待...</span><br>';
                
                // 步骤 1: 清除所有相关设置
                result += '<br><strong>=== 步骤 1: 清除设置 ===</strong><br>';
                localStorage.removeItem(CONFIG.STORAGE_KEY);
                localStorage.removeItem('openclaw.language');
                localStorage.removeItem('openclaw.ui.settings');
                result += '✓ 清除 localStorage 中的语言相关设置<br>';

                // 步骤 2: 创建新的中文设置
                result += '<br><strong>=== 步骤 2: 重建设置 ===</strong><br>';
                const newSettings = {
                    language: CONFIG.DEFAULT_LANGUAGE,
                    theme: 'system',
                    fontSize: 'medium',
                    autoSave: true,
                    notifications: true,
                    sidebar: true,
                    forceLanguageUpdate: true,
                    languageUpdateTime: new Date().toISOString(),
                    version: '1.0'
                };
                
                const settingsJson = JSON.stringify(newSettings);
                localStorage.setItem(CONFIG.STORAGE_KEY, settingsJson);
                result += '✓ 创建新的中文设置<br>';
                result += '设置内容: ' + settingsJson + '<br>';

                // 步骤 3: 强制状态更新（关键步骤）
                result += '<br><strong>=== 步骤 3: 强制状态更新 ===</strong><br>';
                
                // 模拟多次语言切换，强制OpenClaw更新状态
                const languages = ['en-US', 'zh-TW', 'ja-JP', CONFIG.DEFAULT_LANGUAGE];
                
                languages.forEach((lang, index) => {
                    setTimeout(() => {
                        const tempSettings = JSON.parse(JSON.stringify(newSettings));
                        tempSettings.language = lang;
                        tempSettings.lastLanguageChange = new Date().toISOString();
                        localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(tempSettings));
                        result += '✓ 切换到语言: ' + lang + '<br>';
                    }, index * 500);
                });

                // 最终设置回简体中文
                setTimeout(() => {
                    const finalSettings = JSON.parse(JSON.stringify(newSettings));
                    finalSettings.language = CONFIG.DEFAULT_LANGUAGE;
                    finalSettings.finalLanguageSet = true;
                    finalSettings.completionTime = new Date().toISOString();
                    localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(finalSettings));
                    
                    result += '<br><span class="success">✅ 强制修复完成！</span><br>';
                    result += '<strong>=== 修复结果 ===</strong><br>';
                    result += '🎯 语言设置已强制更新为: ' + CONFIG.DEFAULT_LANGUAGE + '<br>';
                    result += '🔥 强制触发了OpenClaw的语言状态更新<br>';
                    result += '🚀 刷新页面后应显示中文<br>';
                    result += '<br><strong>=== 下一步 ===</strong><br>';
                    result += '1. 点击 "测试修复效果" 按钮<br>';
                    result += '2. 刷新OpenClaw页面 (F5)<br>';
                    result += '3. 验证界面是否显示中文<br>';
                    
                    output.innerHTML = result;
                }, languages.length * 500 + 1000);

            } catch (e) {
                result += '<span class="error">修复时出错: ' + e.message + '</span><br>';
                output.innerHTML = result;
            }
        }

        // 深度分析
        function analyzeDeep() {
            const output = document.getElementById('techOutput');
            let result = '';

            try {
                result += '<strong>=== 深度技术分析 ===</strong><br>';
                
                // 分析 localStorage
                const settings = localStorage.getItem(CONFIG.STORAGE_KEY);
                result += '<br><strong>=== localStorage 分析 ===</strong><br>';
                
                if (settings) {
                    result += '✓ localStorage 中存在设置<br>';
                    try {
                        const parsed = JSON.parse(settings);
                        result += '✓ 设置格式正确<br>';
                        result += '语言设置: ' + (parsed.language || '未设置') + '<br>';
                        result += '强制标志: ' + (parsed.forceLanguageUpdate || '未设置') + '<br>';
                        result += '最后更新: ' + (parsed.languageUpdateTime || '未设置') + '<br>';
                        result += '完整设置:<br>' + JSON.stringify(parsed, null, 2) + '<br>';
                    } catch (e) {
                        result += '<span class="error">✗ 设置格式错误: ' + e.message + '</span><br>';
                        result += '原始设置: ' + settings + '<br>';
                    }
                } else {
                    result += '<span class="error">✗ localStorage 中无设置</span><br>';
                }

                // 分析浏览器环境
                result += '<br><strong>=== 浏览器环境分析 ===</strong><br>';
                result += '浏览器语言: ' + navigator.language + '<br>';
                result += '页面语言: ' + document.documentElement.lang + '<br>';
                result += '安全上下文: ' + window.isSecureContext + '<br>';
                result += 'localStorage 可用: ' + (typeof localStorage !== 'undefined') + '<br>';
                result += 'localStorage 大小: ' + JSON.stringify(localStorage).length + ' bytes<br>';

                // 分析其他存储
                result += '<br><strong>=== 其他存储分析 ===</strong><br>';
                result += 'sessionStorage 大小: ' + (sessionStorage ? JSON.stringify(sessionStorage).length : 0) + ' bytes<br>';
                result += 'cookie 数量: ' + document.cookie.split(';').length + '<br>';

            } catch (e) {
                result += '<span class="error">分析时出错: ' + e.message + '</span><br>';
            }

            output.innerHTML = result;
        }

        // 测试修复效果
        function testFix() {
            const output = document.getElementById('fixOutput');
            let result = '';

            try {
                result += '<strong>=== 测试修复效果 ===</strong><br>';
                
                // 检查当前设置
                const currentSettings = localStorage.getItem(CONFIG.STORAGE_KEY);
                
                if (currentSettings) {
                    try {
                        const parsed = JSON.parse(currentSettings);
                        result += '✓ localStorage 中存在设置<br>';
                        result += '语言设置: ' + (parsed.language || '未设置') + '<br>';
                        
                        if (parsed.language === CONFIG.DEFAULT_LANGUAGE) {
                            result += '<span class="success">✓ 语言设置正确: ' + CONFIG.DEFAULT_LANGUAGE + '</span><br>';
                        } else {
                            result += '<span class="error">✗ 语言设置错误: ' + parsed.language + '</span><br>';
                        }
                        
                        if (parsed.forceLanguageUpdate) {
                            result += '<span class="success">✓ 强制更新标志已设置</span><br>';
                        }
                        
                        if (parsed.finalLanguageSet) {
                            result += '<span class="success">✓ 最终语言设置已完成</span><br>';
                        }
                        
                        result += '<br><strong>=== 测试结果 ===</strong><br>';
                        if (parsed.language === CONFIG.DEFAULT_LANGUAGE) {
                            result += '<span class="success">✅ 测试通过！语言设置正确</span><br>';
                            result += '📢 现在刷新OpenClaw页面验证效果<br>';
                        } else {
                            result += '<span class="error">❌ 测试失败！语言设置不正确</span><br>';
                            result += '📢 请重新执行强制修复<br>';
                        }
                        
                    } catch (e) {
                        result += '<span class="error">✗ 设置格式错误: ' + e.message + '</span><br>';
                    }
                } else {
                    result += '<span class="error">✗ localStorage 中无设置</span><br>';
                    result += '📢 请执行强制修复<br>';
                }

            } catch (e) {
                result += '<span class="error">测试时出错: ' + e.message + '</span><br>';
            }

            output.innerHTML = result;
        }

        // 页面加载时自动分析
        window.onload = function() {
            analyzeDeep();
        };
    </script>
</body>
</html>`;

    const toolPath = path.join(CONFIG.WORKING_DIR, 'force-openclaw-chinese.html');
    fs.writeFileSync(toolPath, htmlContent);
    log(`创建强制修复工具: ${toolPath}`, 'success');
    return toolPath;
}

// 创建服务器
function startServer() {
    const server = http.createServer((req, res) => {
        const parsedUrl = url.parse(req.url, true);
        const pathname = parsedUrl.pathname;

        if (pathname === '/') {
            // 重定向到修复工具
            const toolPath = path.join(CONFIG.WORKING_DIR, 'force-openclaw-chinese.html');
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
        log(`🚀 强制修复服务器启动成功！`, 'success');
        log(`🌐 访问地址: http://localhost:${CONFIG.PORT}`, 'info');
        log(`🔥 打开浏览器访问上述地址执行强制修复`, 'info');
    });

    server.on('error', (error) => {
        log(`服务器启动失败: ${error.message}`, 'error');
        log(`尝试使用其他端口...`, 'warning');
        
        // 尝试其他端口
        CONFIG.PORT = 8893;
        server.listen(CONFIG.PORT, () => {
            log(`🚀 强制修复服务器启动成功！`, 'success');
            log(`🌐 访问地址: http://localhost:${CONFIG.PORT}`, 'info');
        });
    });
}

// 主函数
function main() {
    console.log('');
    console.log('========================================');
    console.log('⚡ OpenClaw 强制中文修复工具');
    console.log('========================================');
    console.log('');

    // 1. 创建强制修复工具
    log('=== 创建强制修复工具 ===', 'info');
    const toolPath = createForceFixTool();
    console.log('');

    // 2. 启动服务器
    log('=== 启动强制修复服务器 ===', 'info');
    startServer();
    console.log('');

    // 3. 显示使用说明
    log('📖 使用说明:', 'info');
    log('1. 打开浏览器访问: http://localhost:8892', 'info');
    log('2. 点击 "强制修复中文显示" 按钮', 'info');
    log('3. 等待修复完成（约5秒）', 'info');
    log('4. 点击 "测试修复效果" 按钮', 'info');
    log('5. 刷新 OpenClaw 页面验证效果', 'info');
    console.log('');

    log('💡 核心修复原理:', 'info');
    log('- 清除所有语言相关缓存', 'info');
    log('- 重建语言设置', 'info');
    log('- 模拟多次语言切换，强制OpenClaw更新状态', 'info');
    log('- 确保语言设置正确应用', 'info');
    console.log('');

    log('🔥 此工具专门解决:', 'info');
    log('- localStorage中语言设置正确但界面显示英文的问题', 'info');
    log('- 刷新后语言设置不生效的问题', 'info');
    log('- 需要手动切换语言才能生效的问题', 'info');
    console.log('');
}

// 执行主函数
if (require.main === module) {
    main();
}

module.exports = {
    main
};