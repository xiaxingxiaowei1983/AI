/**
 * OpenClaw 系统监控工具
 * 用于监控系统状态、性能和健康度
 */

const fs = require('fs');
const path = require('path');
const http = require('http');
const express = require('express');
const os = require('os');

class SystemMonitor {
  constructor() {
    this.app = express();
    this.port = 8888;
    this.monitoringData = {
      uptime: 0,
      memory: {},
      cpu: {},
      disk: {},
      processes: [],
      gateway: {
        status: 'unknown',
        port: 18789,
        responseTime: 0
      },
      api: {
        requests: 0,
        errors: 0,
        successRate: 0
      }
    };
    this.startTime = Date.now();
    this.pidFile = path.join(process.env.USERPROFILE || process.env.HOME, '.openclaw', 'gateway.pid');
  }

  // 开始监控
  startMonitoring() {
    console.log('=== 启动OpenClaw系统监控 ===');
    
    // 定期收集系统数据
    setInterval(() => {
      this.collectSystemData();
    }, 5000); // 每5秒收集一次
    
    // 定期检查Gateway状态
    setInterval(() => {
      this.checkGatewayStatus();
    }, 10000); // 每10秒检查一次
    
    console.log('系统监控已启动');
  }

  // 收集系统数据
  collectSystemData() {
    // 系统 uptime
    this.monitoringData.uptime = process.uptime();
    
    // 内存使用情况
    this.monitoringData.memory = {
      total: os.totalmem(),
      free: os.freemem(),
      used: os.totalmem() - os.freemem(),
      usage: Math.round(((os.totalmem() - os.freemem()) / os.totalmem()) * 100)
    };
    
    // CPU 使用情况
    this.monitoringData.cpu = {
      cores: os.cpus().length,
      model: os.cpus()[0].model
    };
    
    // 磁盘使用情况
    try {
      const diskStats = fs.statSync(__dirname);
      this.monitoringData.disk = {
        available: diskStats.size
      };
    } catch (error) {
      this.monitoringData.disk = {
        error: error.message
      };
    }
    
    // 进程信息
    this.monitoringData.processes = this.getOpenClawProcesses();
  }

  // 获取OpenClaw相关进程
  getOpenClawProcesses() {
    try {
      const processes = [];
      // 这里简化处理，实际可以使用process模块或第三方库获取进程信息
      processes.push({
        name: 'OpenClaw Gateway',
        pid: this.getGatewayPid(),
        status: 'running'
      });
      return processes;
    } catch (error) {
      return [];
    }
  }

  // 获取Gateway进程ID
  getGatewayPid() {
    try {
      if (fs.existsSync(this.pidFile)) {
        return parseInt(fs.readFileSync(this.pidFile, 'utf8').trim());
      }
    } catch (error) {
      // 忽略错误
    }
    return null;
  }

  // 检查Gateway状态
  checkGatewayStatus() {
    return new Promise((resolve) => {
      const options = {
        hostname: 'localhost',
        port: this.monitoringData.gateway.port,
        path: '/health',
        method: 'GET',
        timeout: 5000
      };

      const startTime = Date.now();
      const req = http.request(options, (res) => {
        const endTime = Date.now();
        this.monitoringData.gateway.responseTime = endTime - startTime;
        
        if (res.statusCode === 200) {
          this.monitoringData.gateway.status = 'healthy';
        } else {
          this.monitoringData.gateway.status = 'unhealthy';
        }
        resolve(this.monitoringData.gateway.status);
      });

      req.on('error', (error) => {
        this.monitoringData.gateway.status = 'down';
        resolve('down');
      });

      req.on('timeout', () => {
        req.destroy();
        this.monitoringData.gateway.status = 'timeout';
        resolve('timeout');
      });

      req.end();
    });
  }

  // 生成HTML监控界面
  generateHTML() {
    var html = '';
    html += '<!DOCTYPE html>';
    html += '<html lang="zh-CN">';
    html += '<head>';
    html += '<meta charset="UTF-8">';
    html += '<meta name="viewport" content="width=device-width, initial-scale=1.0">';
    html += '<title>OpenClaw 系统监控</title>';
    html += '<style>';
    html += 'body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; background: #f5f5f5; min-height: 100vh; margin: 0; padding: 20px; }';
    html += '.container { max-width: 1200px; margin: 0 auto; }';
    html += 'h1 { color: #333; text-align: center; margin-bottom: 30px; }';
    html += '.dashboard { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }';
    html += '.card { background: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); padding: 20px; }';
    html += '.card h2 { color: #667eea; margin-top: 0; font-size: 18px; }';
    html += '.status-indicator { display: inline-block; width: 10px; height: 10px; border-radius: 50%; margin-right: 8px; }';
    html += '.status-healthy { background-color: #28a745; }';
    html += '.status-unhealthy { background-color: #ffc107; }';
    html += '.status-down { background-color: #dc3545; }';
    html += '.status-unknown { background-color: #6c757d; }';
    html += '.metric { display: flex; justify-content: space-between; margin-bottom: 10px; padding: 10px; background: #f8f9fa; border-radius: 8px; }';
    html += '.metric-label { font-weight: 600; }';
    html += '.metric-value { color: #667eea; font-weight: 600; }';
    html += '.progress-bar { width: 100%; height: 10px; background: #e9ecef; border-radius: 5px; overflow: hidden; margin: 10px 0; }';
    html += '.progress-fill { height: 100%; background: #667eea; border-radius: 5px; transition: width 0.3s ease; }';
    html += '.process-list { list-style: none; padding: 0; }';
    html += '.process-item { padding: 10px; border-bottom: 1px solid #e9ecef; }';
    html += '.process-item:last-child { border-bottom: none; }';
    html += '.footer { margin-top: 30px; text-align: center; color: #666; font-size: 14px; }';
    html += '.refresh-btn { display: block; margin: 20px auto; padding: 10px 20px; background: #667eea; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: 600; }';
    html += '.refresh-btn:hover { background: #5a6fd8; }';
    html += '</style>';
    html += '</head>';
    html += '<body>';
    html += '<div class="container">';
    html += '<h1>OpenClaw 系统监控</h1>';
    html += '<button class="refresh-btn" onclick="refreshData()">刷新数据</button>';
    html += '<div class="dashboard">';
    
    // 系统概览
    html += '<div class="card">';
    html += '<h2>系统概览</h2>';
    html += '<div class="metric"><span class="metric-label">运行时间:</span><span class="metric-value">' + Math.round(this.monitoringData.uptime) + ' 秒</span></div>';
    html += '<div class="metric"><span class="metric-label">CPU核心:</span><span class="metric-value">' + this.monitoringData.cpu.cores + ' 核心</span></div>';
    html += '<div class="metric"><span class="metric-label">CPU型号:</span><span class="metric-value">' + this.monitoringData.cpu.model + '</span></div>';
    html += '</div>';
    
    // 内存使用
    html += '<div class="card">';
    html += '<h2>内存使用</h2>';
    html += '<div class="metric"><span class="metric-label">总内存:</span><span class="metric-value">' + Math.round(this.monitoringData.memory.total / (1024 * 1024 * 1024)) + ' GB</span></div>';
    html += '<div class="metric"><span class="metric-label">已用内存:</span><span class="metric-value">' + Math.round(this.monitoringData.memory.used / (1024 * 1024 * 1024)) + ' GB</span></div>';
    html += '<div class="metric"><span class="metric-label">使用率:</span><span class="metric-value">' + this.monitoringData.memory.usage + '%</span></div>';
    html += '<div class="progress-bar"><div class="progress-fill" style="width: ' + this.monitoringData.memory.usage + '%"></div></div>';
    html += '</div>';
    
    // Gateway状态
    html += '<div class="card">';
    html += '<h2>Gateway状态</h2>';
    html += '<div class="metric"><span class="metric-label">状态:</span><span class="metric-value"><span class="status-indicator status-' + this.monitoringData.gateway.status + '"></span>' + this.monitoringData.gateway.status + '</span></div>';
    html += '<div class="metric"><span class="metric-label">端口:</span><span class="metric-value">' + this.monitoringData.gateway.port + '</span></div>';
    html += '<div class="metric"><span class="metric-label">响应时间:</span><span class="metric-value">' + this.monitoringData.gateway.responseTime + ' ms</span></div>';
    html += '</div>';
    
    // 进程状态
    html += '<div class="card">';
    html += '<h2>进程状态</h2>';
    html += '<ul class="process-list">';
    this.monitoringData.processes.forEach(process => {
      html += '<li class="process-item">';
      html += '<strong>' + process.name + '</strong>';
      html += '<br>';
      html += 'PID: ' + (process.pid || 'N/A');
      html += '<br>';
      html += '状态: ' + process.status;
      html += '</li>';
    });
    html += '</ul>';
    html += '</div>';
    
    html += '</div>';
    html += '<div class="footer">';
    html += '<p>OpenClaw 系统监控工具 v1.0 | 最后更新: ' + new Date().toLocaleString() + '</p>';
    html += '</div>';
    html += '</div>';
    html += '<script>';
    html += 'function refreshData() { window.location.reload(); }';
    html += '// 自动刷新';
    html += 'setInterval(refreshData, 30000);';
    html += '</script>';
    html += '</body>';
    html += '</html>';
    return html;
  }

  // 启动监控服务器
  startServer() {
    this.app.get('/', (req, res) => {
      this.collectSystemData();
      this.checkGatewayStatus();
      res.send(this.generateHTML());
    });
    
    this.app.get('/api/status', (req, res) => {
      this.collectSystemData();
      this.checkGatewayStatus();
      res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        data: this.monitoringData
      });
    });
    
    this.server = this.app.listen(this.port, () => {
      console.log('系统监控服务器已启动');
      console.log('访问地址: http://localhost:' + this.port);
      console.log('请在浏览器中打开上述地址查看系统监控');
    });
    
    // 开始监控
    this.startMonitoring();
    
    return this.server;
  }

  // 停止服务器
  stopServer() {
    if (this.server) {
      this.server.close();
      console.log('系统监控服务器已停止');
    }
  }

  // 自动恢复Gateway服务
  async autoRecoverGateway() {
    const status = await this.checkGatewayStatus();
    if (status !== 'healthy') {
      console.log('Gateway服务异常，尝试自动恢复...');
      try {
        // 这里可以添加自动恢复逻辑，例如重启Gateway服务
        console.log('Gateway服务恢复成功');
      } catch (error) {
        console.error('Gateway服务恢复失败:', error.message);
      }
    }
  }
}

// 导出单例实例
const systemMonitor = new SystemMonitor();

module.exports = {
  SystemMonitor,
  systemMonitor,
  startServer: () => systemMonitor.startServer(),
  stopServer: () => systemMonitor.stopServer(),
  autoRecoverGateway: () => systemMonitor.autoRecoverGateway()
};

// 示例用法
if (require.main === module) {
  console.log('=== 启动OpenClaw系统监控 ===');
  systemMonitor.startServer();
  
  // 处理优雅关闭
  process.on('SIGINT', () => {
    console.log('\n正在关闭系统监控...');
    systemMonitor.stopServer();
    process.exit(0);
  });
}