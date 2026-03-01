/**
 * 简化版语言设置同步工具
 * 确保语言设置在所有存储位置保持同步
 */

const express = require('express');

class LanguageSyncManager {
  constructor() {
    this.app = express();
    this.port = 8887;
  }

  // 生成HTML界面
  generateHTML() {
    var html = '';
    html += '<!DOCTYPE html>';
    html += '<html lang="zh-CN">';
    html += '<head>';
    html += '<meta charset="UTF-8">';
    html += '<meta name="viewport" content="width=device-width, initial-scale=1.0">';
    html += '<title>OpenClaw 语言设置同步工具</title>';
    html += '<style>';
    html += 'body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; margin: 0; padding: 20px; display: flex; justify-content: center; align-items: center; }';
    html += '.container { background: white; border-radius: 16px; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1); padding: 40px; max-width: 600px; width: 100%; }';
    html += 'h1 { color: #333; text-align: center; margin-bottom: 30px; font-size: 24px; }';
    html += '.status-section { background: #f8f9fa; border-radius: 12px; padding: 20px; margin-bottom: 20px; }';
    html += '.status-item { display: flex; justify-content: space-between; margin-bottom: 10px; padding: 10px; background: white; border-radius: 8px; border-left: 4px solid #667eea; }';
    html += '.status-item.error { border-left-color: #dc3545; }';
    html += '.status-item.success { border-left-color: #28a745; }';
    html += '.button { display: inline-block; padding: 12px 24px; margin: 5px; border: none; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer; transition: all 0.3s ease; }';
    html += '.button-primary { background: #667eea; color: white; }';
    html += '.button-primary:hover { background: #5a6fd8; transform: translateY(-2px); }';
    html += '.button-secondary { background: #6c757d; color: white; }';
    html += '.button-secondary:hover { background: #5a6268; transform: translateY(-2px); }';
    html += '.button-success { background: #28a745; color: white; }';
    html += '.button-success:hover { background: #218838; transform: translateY(-2px); }';
    html += '.button-danger { background: #dc3545; color: white; }';
    html += '.button-danger:hover { background: #c82333; transform: translateY(-2px); }';
    html += '.actions { text-align: center; margin-top: 30px; }';
    html += '.log-section { background: #f8f9fa; border-radius: 12px; padding: 20px; margin-top: 20px; max-height: 200px; overflow-y: auto; }';
    html += '.log-item { margin-bottom: 5px; padding: 5px; border-radius: 4px; background: white; font-size: 14px; }';
    html += '.log-item.info { border-left: 3px solid #17a2b8; }';
    html += '.log-item.success { border-left: 3px solid #28a745; }';
    html += '.log-item.error { border-left: 3px solid #dc3545; }';
    html += '.footer { margin-top: 30px; text-align: center; color: #666; font-size: 14px; }';
    html += '</style>';
    html += '</head>';
    html += '<body>';
    html += '<div class="container">';
    html += '<h1>OpenClaw 语言设置同步工具</h1>';
    html += '<div class="status-section">';
    html += '<h3>当前状态</h3>';
    html += '<div id="status-container"></div>';
    html += '</div>';
    html += '<div class="actions">';
    html += '<button class="button button-primary" onclick="checkStatus()">检查状态</button>';
    html += '<button class="button button-success" onclick="syncLanguage(\'zh\')">设置为中文</button>';
    html += '<button class="button button-secondary" onclick="syncLanguage(\'en\')">设置为英文</button>';
    html += '<button class="button button-danger" onclick="clearStorage()">清空存储</button>';
    html += '</div>';
    html += '<div class="log-section">';
    html += '<h3>操作日志</h3>';
    html += '<div id="log-container"></div>';
    html += '</div>';
    html += '<div class="footer">';
    html += '<p>OpenClaw 语言设置同步工具 v1.0</p>';
    html += '</div>';
    html += '</div>';
    html += '<script>';
    html += 'var storageKeys = { clawpal: \'clawpal_language\', openclaw: \'openclaw.control.settings.v1\' };';
    html += 'function addLog(message, type) { if (type === undefined) type = \'info\'; var logContainer = document.getElementById(\'log-container\'); var logItem = document.createElement(\'div\'); logItem.className = \'log-item \' + type; logItem.textContent = new Date().toLocaleTimeString() + \': \' + message; logContainer.appendChild(logItem); logContainer.scrollTop = logContainer.scrollHeight; }';
    html += 'function checkStatus() { addLog(\'开始检查语言设置状态...\'); var statusContainer = document.getElementById(\'status-container\'); statusContainer.innerHTML = \'\'; var clawpalLang = localStorage.getItem(storageKeys.clawpal); var clawpalItem = document.createElement(\'div\'); clawpalItem.className = \'status-item \' + (clawpalLang ? \'success\' : \'error\'); clawpalItem.innerHTML = \'<span>clawpal_language:</span><span>\' + (clawpalLang || \'未设置\') + \'</span>\'; statusContainer.appendChild(clawpalItem); var openclawLang = \'未设置\'; try { var openclawSettings = localStorage.getItem(storageKeys.openclaw); if (openclawSettings) { var settings = JSON.parse(openclawSettings); openclawLang = settings.language || \'未设置\'; } } catch (error) { openclawLang = \'解析错误\'; } var openclawItem = document.createElement(\'div\'); openclawItem.className = \'status-item \' + (openclawLang && openclawLang !== \'未设置\' && openclawLang !== \'解析错误\' ? \'success\' : \'error\'); openclawItem.innerHTML = \'<span>openclaw.control.settings.v1:</span><span>\' + openclawLang + \'</span>\'; statusContainer.appendChild(openclawItem); var isSynced = clawpalLang && openclawLang && clawpalLang === openclawLang; var syncItem = document.createElement(\'div\'); syncItem.className = \'status-item \' + (isSynced ? \'success\' : \'error\'); syncItem.innerHTML = \'<span>同步状态:</span><span>\' + (isSynced ? \'已同步\' : \'未同步\') + \'</span>\'; statusContainer.appendChild(syncItem); addLog(\'状态检查完成\', isSynced ? \'success\' : \'info\'); }';
    html += 'function syncLanguage(lang) { addLog(\'开始同步语言设置为 \' + (lang === \'zh\' ? \'中文\' : \'英文\') + \'...\'); try { localStorage.setItem(storageKeys.clawpal, lang); addLog(\'已更新 \' + storageKeys.clawpal + \' 为 \' + lang); var openclawSettings = {}; try { var existingSettings = localStorage.getItem(storageKeys.openclaw); if (existingSettings) { openclawSettings = JSON.parse(existingSettings); } } catch (error) { addLog(\'解析现有设置失败，创建新设置\', \'error\'); } openclawSettings.language = lang; localStorage.setItem(storageKeys.openclaw, JSON.stringify(openclawSettings)); addLog(\'已更新 \' + storageKeys.openclaw + \' 中的语言设置为 \' + lang); addLog(\'语言设置同步完成\', \'success\'); checkStatus(); } catch (error) { addLog(\'同步失败: \' + error.message, \'error\'); } }';
    html += 'function clearStorage() { if (confirm(\'确定要清空语言设置存储吗？\')) { addLog(\'开始清空语言设置存储...\'); try { localStorage.removeItem(storageKeys.clawpal); localStorage.removeItem(storageKeys.openclaw); addLog(\'存储已清空\', \'success\'); checkStatus(); } catch (error) { addLog(\'清空失败: \' + error.message, \'error\'); } } }';
    html += 'window.onload = function() { checkStatus(); addLog(\'工具已加载，就绪\'); };';
    html += '</script>';
    html += '</body>';
    html += '</html>';
    return html;
  }

  // 启动服务器
  startServer() {
    this.app.get('/', (req, res) => {
      res.send(this.generateHTML());
    });
    
    this.server = this.app.listen(this.port, () => {
      console.log('语言同步工具服务器已启动');
      console.log('访问地址: http://localhost:' + this.port);
      console.log('请在浏览器中打开上述地址使用语言设置同步工具');
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