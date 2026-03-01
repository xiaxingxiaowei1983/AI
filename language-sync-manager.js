/**
 * 语言设置同步管理工具
 * 确保语言设置在所有存储位置保持同步
 */

const fs = require('fs');
const path = require('path');
const express = require('express');

class LanguageSyncManager {
  constructor() {
    this.app = express();
    this.port = 8887;
    this.storageKeys = {
      clawpal: 'clawpal_language',
      openclaw: 'openclaw.control.settings.v1'
    };
  }

  // 生成HTML界面
  generateHTML() {
    return `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>OpenClaw 语言设置同步工具</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      margin: 0;
      padding: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .container {
      background: white;
      border-radius: 16px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
      padding: 40px;
      max-width: 600px;
      width: 100%;
    }
    h1 {
      color: #333;
      text-align: center;
      margin-bottom: 30px;
      font-size: 24px;
    }
    .status-section {
      background: #f8f9fa;
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 20px;
    }
    .status-item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      padding: 10px;
      background: white;
      border-radius: 8px;
      border-left: 4px solid #667eea;
    }
    .status-item.error {
      border-left-color: #dc3545;
    }
    .status-item.success {
      border-left-color: #28a745;
    }
    .button {
      display: inline-block;
      padding: 12px 24px;
      margin: 5px;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    .button-primary {
      background: #667eea;
      color: white;
    }
    .button-primary:hover {
      background: #5a6fd8;
      transform: translateY(-2px);
    }
    .button-secondary {
      background: #6c757d;
      color: white;
    }
    .button-secondary:hover {
      background: #5a6268;
      transform: translateY(-2px);
    }
    .button-success {
      background: #28a745;
      color: white;
    }
    .button-success:hover {
      background: #218838;
      transform: translateY(-2px);
    }
    .button-danger {
      background: #dc3545;
      color: white;
    }
    .button-danger:hover {
      background: #c82333;
      transform: translateY(-2px);
    }
    .actions {
      text-align: center;
      margin-top: 30px;
    }
    .log-section {
      background: #f8f9fa;
      border-radius: 12px;
      padding: 20px;
      margin-top: 20px;
      max-height: 200px;
      overflow-y: auto;
    }
    .log-item {
      margin-bottom: 5px;
      padding: 5px;
      border-radius: 4px;
      background: white;
      font-size: 14px;
    }
    .log-item.info {
      border-left: 3px solid #17a2b8;
    }
    .log-item.success {
      border-left: 3px solid #28a745;
    }
    .log-item.error {
      border-left: 3px solid #dc3545;
    }
    .footer {
      margin-top: 30px;
      text-align: center;
      color: #666;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>OpenClaw 语言设置同步工具</h1>
    
    <div class="status-section">
      <h3>当前状态</h3>
      <div id="status-container"></div>
    </div>
    
    <div class="actions">
      <button class="button button-primary" onclick="checkStatus()">检查状态</button>
      <button class="button button-success" onclick="syncLanguage('zh')">设置为中文</button>
      <button class="button button-secondary" onclick="syncLanguage('en')">设置为英文</button>
      <button class="button button-danger" onclick="clearStorage()">清空存储</button>
    </div>
    
    <div class="log-section">
      <h3>操作日志</h3>
      <div id="log-container"></div>
    </div>
    
    <div class="footer">
      <p>OpenClaw 语言设置同步工具 v1.0</p>
    </div>
  </div>
  
  <script>
    // 存储键名
    const storageKeys = {
      clawpal: 'clawpal_language',
      openclaw: 'openclaw.control.settings.v1'
    };
    
    // 日志函数
    function addLog(message, type = 'info') {
      const logContainer = document.getElementById('log-container');
      const logItem = document.createElement('div');
      logItem.className = 'log-item ' + type;
      logItem.textContent = new Date().toLocaleTimeString() + ': ' + message;
      logContainer.appendChild(logItem);
      logContainer.scrollTop = logContainer.scrollHeight;
    }
    
    // 检查状态
    function checkStatus() {
      addLog('开始检查语言设置状态...');
      
      const statusContainer = document.getElementById('status-container');
      statusContainer.innerHTML = '';
      
      // 检查 clawpal_language
      const clawpalLang = localStorage.getItem(storageKeys.clawpal);
      const clawpalItem = document.createElement('div');
      clawpalItem.className = "status-item " + (clawpalLang ? "success" : "error");
      clawpalItem.innerHTML = "\n        <span>clawpal_language:</span>\n        <span>" + (clawpalLang || "未设置") + "</span>\n      ";
      statusContainer.appendChild(clawpalItem);
      
      // 检查 openclaw.control.settings.v1
      let openclawLang = '未设置';
      try {
        const openclawSettings = localStorage.getItem(storageKeys.openclaw);
        if (openclawSettings) {
          const settings = JSON.parse(openclawSettings);
          openclawLang = settings.language || '未设置';
        }
      } catch (error) {
        openclawLang = '解析错误';
      }
      
      const openclawItem = document.createElement('div');
      openclawItem.className = "status-item " + (openclawLang && openclawLang !== "未设置" && openclawLang !== "解析错误" ? "success" : "error");
      openclawItem.innerHTML = "\n        <span>openclaw.control.settings.v1:</span>\n        <span>" + openclawLang + "</span>\n      ";
      statusContainer.appendChild(openclawItem);
      
      // 检查是否同步
      const isSynced = clawpalLang && openclawLang && clawpalLang === openclawLang;
      const syncItem = document.createElement('div');
      syncItem.className = "status-item " + (isSynced ? "success" : "error");
      syncItem.innerHTML = "\n        <span>同步状态:</span>\n        <span>" + (isSynced ? "已同步" : "未同步") + "</span>\n      ";
      statusContainer.appendChild(syncItem);
      
      addLog('状态检查完成', isSynced ? 'success' : 'info');
    }
    
    // 同步语言设置
    function syncLanguage(lang) {
      addLog("开始同步语言设置为 " + (lang === "zh" ? "中文" : "英文") + "...");
      
      try {
        // 更新 clawpal_language
        localStorage.setItem(storageKeys.clawpal, lang);
        addLog("已更新 " + storageKeys.clawpal + " 为 " + lang);
        
        // 更新 openclaw.control.settings.v1
        let openclawSettings = {};
        try {
          const existingSettings = localStorage.getItem(storageKeys.openclaw);
          if (existingSettings) {
            openclawSettings = JSON.parse(existingSettings);
          }
        } catch (error) {
          addLog('解析现有设置失败，创建新设置', 'error');
        }
        
        openclawSettings.language = lang;
        localStorage.setItem(storageKeys.openclaw, JSON.stringify(openclawSettings));
        addLog("已更新 " + storageKeys.openclaw + " 中的语言设置为 " + lang);
        
        addLog('语言设置同步完成', 'success');
        checkStatus();
      } catch (error) {
        addLog("同步失败: " + error.message, 'error');
      }
    }
    
    // 清空存储
    function clearStorage() {
      if (confirm('确定要清空语言设置存储吗？')) {
        addLog('开始清空语言设置存储...');
        
        try {
          localStorage.removeItem(storageKeys.clawpal);
          localStorage.removeItem(storageKeys.openclaw);
          addLog('存储已清空', 'success');
          checkStatus();
        } catch (error) {
          addLog("清空失败: " + error.message, 'error');
        }
      }
    }
    
    // 页面加载时检查状态
    window.onload = function() {
      checkStatus();
      addLog('工具已加载，就绪');
    };
  </script>
</body>
</html>
`;
  }

  // 启动服务器
  startServer() {
    this.app.use(express.static(__dirname));
    
    // 主页
    this.app.get('/', (req, res) => {
      res.send(this.generateHTML());
    });
    
    // API 端点
    this.app.get('/api/status', (req, res) => {
      const status = this.checkLanguageStatus();
      res.json(status);
    });
    
    this.app.post('/api/sync/:lang', (req, res) => {
      const lang = req.params.lang;
      const result = this.syncLanguage(lang);
      res.json(result);
    });
    
    this.app.post('/api/clear', (req, res) => {
      const result = this.clearStorage();
      res.json(result);
    });
    
    // 启动服务器
    this.server = this.app.listen(this.port, () => {
      console.log(`语言同步工具服务器已启动`);
      console.log(`访问地址: http://localhost:${this.port}`);
      console.log(`请在浏览器中打开上述地址使用语言设置同步工具`);
    });
    
    return this.server;
  }

  // 停止服务器
  stopServer() {
    if (this.server) {
      this.server.close();
      console.log('语言同步工具服务器已停止');
    }
  }

  // 检查语言状态
  checkLanguageStatus() {
    // 这里是服务器端检查，实际使用中会通过浏览器端检查
    return {
      status: 'ready',
      message: '语言同步工具已就绪'
    };
  }

  // 同步语言（服务器端）
  syncLanguage(lang) {
    // 这里是服务器端同步，实际使用中会通过浏览器端同步
    return {
      success: true,
      message: `语言设置已同步为 ${lang}`
    };
  }

  // 清空存储（服务器端）
  clearStorage() {
    // 这里是服务器端清空，实际使用中会通过浏览器端清空
    return {
      success: true,
      message: '存储已清空'
    };
  }
}

// 导出单例实例
const languageSyncManager = new LanguageSyncManager();

module.exports = {
  LanguageSyncManager,
  languageSyncManager,
  startServer: () => languageSyncManager.startServer(),
  stopServer: () => languageSyncManager.stopServer()
};

// 示例用法
if (require.main === module) {
  console.log('=== 启动语言设置同步工具 ===');
  languageSyncManager.startServer();
  
  // 处理优雅关闭
  process.on('SIGINT', () => {
    console.log('\n正在关闭语言同步工具...');
    languageSyncManager.stopServer();
    process.exit(0);
  });
}