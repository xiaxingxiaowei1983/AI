const fs = require('fs');
const path = require('path');
const os = require('os');
const process = require('process');

class SelfMonitoringSystem {
  constructor(options = {}) {
    this.config = {
      checkInterval: options.checkInterval || 60000, // 默认1分钟
      storageDir: options.storageDir || path.join(__dirname, 'self-monitoring-storage'),
      alertThresholds: {
        cpuUsage: options.alertThresholds?.cpuUsage || 80, // 百分比
        memoryUsage: options.alertThresholds?.memoryUsage || 85, // 百分比
        diskUsage: options.alertThresholds?.diskUsage || 90, // 百分比
        responseTime: options.alertThresholds?.responseTime || 5000 // 毫秒
      }
    };
    
    this.state = {
      lastCheck: null,
      systemMetrics: [],
      componentMetrics: new Map(),
      alerts: [],
      optimizations: []
    };
    
    this.initializeStorage();
    this.loadState();
  }
  
  initializeStorage() {
    if (!fs.existsSync(this.config.storageDir)) {
      fs.mkdirSync(this.config.storageDir, { recursive: true });
    }
  }
  
  saveState() {
    const statePath = path.join(this.config.storageDir, 'state.json');
    const serializableState = {
      lastCheck: this.state.lastCheck,
      systemMetrics: this.state.systemMetrics,
      componentMetrics: Object.fromEntries(this.state.componentMetrics),
      alerts: this.state.alerts,
      optimizations: this.state.optimizations
    };
    
    fs.writeFileSync(statePath, JSON.stringify(serializableState, null, 2));
  }
  
  loadState() {
    const statePath = path.join(this.config.storageDir, 'state.json');
    if (fs.existsSync(statePath)) {
      try {
        const data = JSON.parse(fs.readFileSync(statePath, 'utf8'));
        if (data.lastCheck) this.state.lastCheck = data.lastCheck;
        if (data.systemMetrics) this.state.systemMetrics = data.systemMetrics;
        if (data.componentMetrics) {
          this.state.componentMetrics = new Map(Object.entries(data.componentMetrics));
        }
        if (data.alerts) this.state.alerts = data.alerts;
        if (data.optimizations) this.state.optimizations = data.optimizations;
      } catch (error) {
        console.error('加载状态失败:', error.message);
      }
    }
  }
  
  async start() {
    console.log('🚀 启动自我监控和优化系统');
    
    // 开始定期检查
    this.checkInterval = setInterval(async () => {
      await this.checkSystemStatus();
    }, this.config.checkInterval);
    
    // 立即执行一次检查
    await this.checkSystemStatus();
    
    console.log('✅ 自我监控和优化系统启动成功');
    return true;
  }
  
  stop() {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
    }
    console.log('🛑 自我监控和优化系统已停止');
  }
  
  async checkSystemStatus() {
    console.log('🔍 开始系统状态检查');
    
    try {
      // 收集系统指标
      const systemMetrics = this.collectSystemMetrics();
      this.state.systemMetrics.push(systemMetrics);
      
      // 限制指标数量
      if (this.state.systemMetrics.length > 100) {
        this.state.systemMetrics = this.state.systemMetrics.slice(-100);
      }
      
      // 检查阈值并生成警报
      const newAlerts = this.checkThresholds(systemMetrics);
      this.state.alerts.push(...newAlerts);
      
      // 限制警报数量
      if (this.state.alerts.length > 50) {
        this.state.alerts = this.state.alerts.slice(-50);
      }
      
      // 生成优化建议
      const newOptimizations = this.generateOptimizations(systemMetrics);
      this.state.optimizations.push(...newOptimizations);
      
      // 限制优化建议数量
      if (this.state.optimizations.length > 50) {
        this.state.optimizations = this.state.optimizations.slice(-50);
      }
      
      this.state.lastCheck = new Date().toISOString();
      this.saveState();
      console.log('✅ 系统状态检查完成');
      
    } catch (error) {
      console.error('系统状态检查失败:', error.message);
    }
  }
  
  collectSystemMetrics() {
    // 收集系统级指标
    const memory = process.memoryUsage();
    const totalMemory = os.totalmem();
    const freeMemory = os.freemem();
    
    // 收集CPU使用情况
    const cpuUsage = this.getCpuUsage();
    
    // 收集磁盘使用情况
    const diskUsage = this.getDiskUsage();
    
    return {
      timestamp: new Date().toISOString(),
      system: {
        platform: os.platform(),
        arch: os.arch(),
        uptime: os.uptime(),
        loadavg: os.loadavg()
      },
      cpu: {
        usage: cpuUsage,
        count: os.cpus().length
      },
      memory: {
        used: memory.rss,
        total: totalMemory,
        free: freeMemory,
        usagePercent: ((totalMemory - freeMemory) / totalMemory) * 100
      },
      disk: {
        usage: diskUsage
      },
      process: {
        pid: process.pid,
        uptime: process.uptime(),
        memoryUsage: {
          heapTotal: memory.heapTotal,
          heapUsed: memory.heapUsed,
          external: memory.external
        }
      }
    };
  }
  
  getCpuUsage() {
    // 简单的CPU使用估计
    // 注意：这只是一个估计值，实际CPU使用情况需要更复杂的计算
    const cpus = os.cpus();
    let totalIdle = 0;
    let totalTick = 0;
    
    cpus.forEach(cpu => {
      for (let type in cpu.times) {
        totalTick += cpu.times[type];
      }
      totalIdle += cpu.times.idle;
    });
    
    return ((totalTick - totalIdle) / totalTick) * 100;
  }
  
  getDiskUsage() {
    // 获取根目录的磁盘使用情况
    try {
      const stats = fs.statfs('/');
      const free = stats.bavail * stats.bsize;
      const total = stats.blocksize * stats.blocks;
      const used = total - free;
      return {
        used: used,
        total: total,
        free: free,
        usagePercent: (used / total) * 100
      };
    } catch (error) {
      // 如果在Windows上失败，返回默认值
      return {
        used: 0,
        total: 0,
        free: 0,
        usagePercent: 0
      };
    }
  }
  
  checkThresholds(metrics) {
    const alerts = [];
    
    // 检查CPU使用
    if (metrics.cpu.usage > this.config.alertThresholds.cpuUsage) {
      alerts.push({
        id: `alert_${Date.now()}_cpu`,
        type: 'cpu',
        severity: 'warning',
        message: `CPU使用过高: ${metrics.cpu.usage.toFixed(2)}%`,
        timestamp: new Date().toISOString(),
        value: metrics.cpu.usage,
        threshold: this.config.alertThresholds.cpuUsage
      });
    }
    
    // 检查内存使用
    if (metrics.memory.usagePercent > this.config.alertThresholds.memoryUsage) {
      alerts.push({
        id: `alert_${Date.now()}_memory`,
        type: 'memory',
        severity: 'warning',
        message: `内存使用过高: ${metrics.memory.usagePercent.toFixed(2)}%`,
        timestamp: new Date().toISOString(),
        value: metrics.memory.usagePercent,
        threshold: this.config.alertThresholds.memoryUsage
      });
    }
    
    // 检查磁盘使用
    if (metrics.disk.usage.usagePercent > this.config.alertThresholds.diskUsage) {
      alerts.push({
        id: `alert_${Date.now()}_disk`,
        type: 'disk',
        severity: 'warning',
        message: `磁盘使用过高: ${metrics.disk.usage.usagePercent.toFixed(2)}%`,
        timestamp: new Date().toISOString(),
        value: metrics.disk.usage.usagePercent,
        threshold: this.config.alertThresholds.diskUsage
      });
    }
    
    return alerts;
  }
  
  generateOptimizations(metrics) {
    const optimizations = [];
    
    // 基于CPU使用的优化建议
    if (metrics.cpu.usage > 70) {
      optimizations.push({
        id: `opt_${Date.now()}_cpu`,
        type: 'cpu',
        priority: 'high',
        suggestion: '考虑减少并发任务数量或优化任务执行逻辑',
        timestamp: new Date().toISOString(),
        currentValue: metrics.cpu.usage
      });
    }
    
    // 基于内存使用的优化建议
    if (metrics.memory.usagePercent > 75) {
      optimizations.push({
        id: `opt_${Date.now()}_memory`,
        type: 'memory',
        priority: 'high',
        suggestion: '考虑增加内存限制或优化内存使用，清理不必要的缓存',
        timestamp: new Date().toISOString(),
        currentValue: metrics.memory.usagePercent
      });
    }
    
    // 基于磁盘使用的优化建议
    if (metrics.disk.usage.usagePercent > 80) {
      optimizations.push({
        id: `opt_${Date.now()}_disk`,
        type: 'disk',
        priority: 'medium',
        suggestion: '考虑清理临时文件或增加磁盘空间',
        timestamp: new Date().toISOString(),
        currentValue: metrics.disk.usage.usagePercent
      });
    }
    
    // 基于进程内存的优化建议
    if (metrics.process.memoryUsage.heapUsed > 100 * 1024 * 1024) { // 100MB
      optimizations.push({
        id: `opt_${Date.now()}_process`,
        type: 'process',
        priority: 'medium',
        suggestion: '考虑优化进程内存使用，检查是否有内存泄漏',
        timestamp: new Date().toISOString(),
        currentValue: metrics.process.memoryUsage.heapUsed
      });
    }
    
    return optimizations;
  }
  
  updateComponentMetrics(componentName, metrics) {
    this.state.componentMetrics.set(componentName, {
      ...metrics,
      timestamp: new Date().toISOString()
    });
    this.saveState();
  }
  
  getStatus() {
    return {
      lastCheck: this.state.lastCheck,
      systemMetrics: this.state.systemMetrics.length,
      componentMetrics: this.state.componentMetrics.size,
      alerts: this.state.alerts.length,
      optimizations: this.state.optimizations.length
    };
  }
  
  getLatestSystemMetrics() {
    return this.state.systemMetrics.length > 0 ? this.state.systemMetrics[this.state.systemMetrics.length - 1] : null;
  }
  
  getComponentMetrics(componentName) {
    return this.state.componentMetrics.get(componentName);
  }
  
  getAlerts(limit = 10) {
    return this.state.alerts.slice(-limit);
  }
  
  getOptimizations(limit = 10) {
    return this.state.optimizations.slice(-limit);
  }
  
  clearAlerts() {
    this.state.alerts = [];
    this.saveState();
  }
  
  clearOptimizations() {
    this.state.optimizations = [];
    this.saveState();
  }
  
  generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      systemStatus: this.getStatus(),
      latestMetrics: this.getLatestSystemMetrics(),
      recentAlerts: this.getAlerts(5),
      recentOptimizations: this.getOptimizations(5),
      componentStatus: Object.fromEntries(this.state.componentMetrics)
    };
    
    // 保存报告到文件
    const reportPath = path.join(this.config.storageDir, `report_${Date.now()}.json`);
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    return report;
  }
}

module.exports = SelfMonitoringSystem;

if (require.main === module) {
  async function main() {
    console.log('========================================');
    console.log('🔍 自我监控和优化系统测试');
    console.log('========================================');
    
    const monitoringSystem = new SelfMonitoringSystem({
      checkInterval: 10000 // 10秒
    });
    
    await monitoringSystem.start();
    
    // 运行一段时间后停止
    setTimeout(async () => {
      monitoringSystem.stop();
      console.log('📊 系统状态:', monitoringSystem.getStatus());
      console.log('最新系统指标:', monitoringSystem.getLatestSystemMetrics());
      console.log('警报:', monitoringSystem.getAlerts());
      console.log('优化建议:', monitoringSystem.getOptimizations());
      console.log('========================================');
      console.log('🎉 测试完成');
      console.log('========================================');
    }, 30000); // 30秒后停止
  }
  
  main().catch(error => {
    console.error('测试错误:', error.message);
  });
}