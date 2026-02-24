// 系统监控模块

class SystemMonitor {
  constructor(config = {}) {
    this.config = {
      ...config,
      checkInterval: config.checkInterval || 15000, // 15秒检查一次
      diskThreshold: config.diskThreshold || 80 // 磁盘使用率阈值80%
    };
    
    this.systemStats = [];
    this.startTime = Date.now();
    this.isMonitoring = false;
    this.monitoringInterval = null;
  }
  
  async init() {
    console.log('🔧 初始化系统监控...');
    // 这里可以添加初始化逻辑，比如加载系统信息等
    console.log('✅ 系统监控初始化完成');
  }
  
  // 设置外部依赖
  setDependencies(memorySystem, schedulerSystem, communicationSystem) {
    this.memorySystem = memorySystem;
    this.schedulerSystem = schedulerSystem;
    this.communicationSystem = communicationSystem;
  }
  
  // 开始监控
  async start() {
    try {
      if (this.isMonitoring) {
        return;
      }
      
      console.log('🚀 开始系统监控...');
      this.isMonitoring = true;
      
      // 立即采集一次系统数据
      await this.collectSystemStats();
      
      // 设置定时采集
      this.monitoringInterval = setInterval(async () => {
        try {
          await this.collectSystemStats();
        } catch (error) {
          console.error('❌ 采集系统数据失败:', error.message);
        }
      }, this.config.checkInterval);
      
      console.log('✅ 系统监控已开始');
    } catch (error) {
      console.error('❌ 开始系统监控失败:', error.message);
      throw error;
    }
  }
  
  // 停止监控
  async stop() {
    try {
      if (!this.isMonitoring) {
        return;
      }
      
      console.log('⏹️  停止系统监控...');
      this.isMonitoring = false;
      
      if (this.monitoringInterval) {
        clearInterval(this.monitoringInterval);
        this.monitoringInterval = null;
      }
      
      console.log('✅ 系统监控已停止');
    } catch (error) {
      console.error('❌ 停止系统监控失败:', error.message);
      throw error;
    }
  }
  
  // 采集系统数据
  async collectSystemStats() {
    try {
      const timestamp = new Date().toISOString();
      
      // 采集系统状态
      const systemStatus = {
        timestamp,
        uptime: this.getUptime(),
        platform: process.platform,
        arch: process.arch,
        nodeVersion: process.version,
        memory: process.memoryUsage(),
        cpu: process.cpuUsage(),
        disk: await this.getDiskUsage(),
        network: await this.getNetworkStats(),
        load: this.getLoadAvg(),
        env: process.env.NODE_ENV || 'development'
      };
      
      this.systemStats.push(systemStatus);
      
      // 限制历史数据大小
      if (this.systemStats.length > 100) {
        this.systemStats = this.systemStats.slice(-100);
      }
    } catch (error) {
      console.error('❌ 采集系统数据失败:', error.message);
      throw error;
    }
  }
  
  // 获取系统运行时间
  getUptime() {
    return process.uptime();
  }
  
  // 获取磁盘使用情况
  async getDiskUsage() {
    try {
      // 简化实现，实际项目中可以使用fs模块获取真实的磁盘使用情况
      return {
        total: 100 * 1024 * 1024 * 1024, // 模拟100GB
        free: 30 * 1024 * 1024 * 1024, // 模拟30GB可用
        used: 70 * 1024 * 1024 * 1024, // 模拟70GB已用
        percent: 70 // 模拟70%使用率
      };
    } catch (error) {
      console.error('❌ 获取磁盘使用情况失败:', error.message);
      return {
        total: 0,
        free: 0,
        used: 0,
        percent: 0
      };
    }
  }
  
  // 获取网络统计信息
  async getNetworkStats() {
    try {
      // 简化实现，实际项目中可以使用网络监控库获取真实的网络统计信息
      return {
        bytesSent: Math.floor(Math.random() * 1024 * 1024), // 模拟发送字节数
        bytesReceived: Math.floor(Math.random() * 1024 * 1024), // 模拟接收字节数
        packetsSent: Math.floor(Math.random() * 1000), // 模拟发送数据包数
        packetsReceived: Math.floor(Math.random() * 1000), // 模拟接收数据包数
        errors: 0 // 模拟无错误
      };
    } catch (error) {
      console.error('❌ 获取网络统计信息失败:', error.message);
      return {
        bytesSent: 0,
        bytesReceived: 0,
        packetsSent: 0,
        packetsReceived: 0,
        errors: 0
      };
    }
  }
  
  // 获取负载平均值
  getLoadAvg() {
    try {
      if (process.platform !== 'win32') {
        return process.getloadavg();
      } else {
        // Windows平台不支持getloadavg，返回模拟数据
        return [0.5, 0.3, 0.2];
      }
    } catch (error) {
      console.error('❌ 获取负载平均值失败:', error.message);
      return [0, 0, 0];
    }
  }
  
  // 获取系统状态
  async getStatus() {
    try {
      const latestStats = this.systemStats[this.systemStats.length - 1] || {
        timestamp: new Date().toISOString(),
        uptime: this.getUptime(),
        platform: process.platform,
        arch: process.arch,
        nodeVersion: process.version,
        memory: process.memoryUsage(),
        cpu: process.cpuUsage(),
        disk: await this.getDiskUsage(),
        network: await this.getNetworkStats(),
        load: this.getLoadAvg(),
        env: process.env.NODE_ENV || 'development'
      };
      
      // 计算系统状态
      let status = 'healthy';
      const issues = [];
      
      // 检查磁盘使用率
      if (latestStats.disk.percent > this.config.diskThreshold) {
        status = 'warning';
        issues.push(`磁盘使用率过高: ${latestStats.disk.percent}%`);
      }
      
      // 检查内存使用情况
      const memoryUsedPercent = (latestStats.memory.heapUsed / latestStats.memory.heapTotal) * 100;
      if (memoryUsedPercent > 80) {
        status = 'warning';
        issues.push(`内存使用率过高: ${Math.round(memoryUsedPercent)}%`);
      }
      
      // 检查系统负载
      if (process.platform !== 'win32') {
        const loadAvg = latestStats.load[0];
        const cpuCount = require('os').cpus().length;
        if (loadAvg > cpuCount) {
          status = 'warning';
          issues.push(`系统负载过高: ${loadAvg} (CPU核心数: ${cpuCount})`);
        }
      }
      
      return {
        status,
        issues,
        uptime: this.formatUptime(latestStats.uptime),
        diskUsage: {
          total: this.formatBytes(latestStats.disk.total),
          free: this.formatBytes(latestStats.disk.free),
          used: this.formatBytes(latestStats.disk.used),
          percent: latestStats.disk.percent
        },
        memoryUsage: {
          heapTotal: this.formatBytes(latestStats.memory.heapTotal),
          heapUsed: this.formatBytes(latestStats.memory.heapUsed),
          external: this.formatBytes(latestStats.memory.external),
          rss: this.formatBytes(latestStats.memory.rss)
        },
        cpuUsage: {
          user: latestStats.cpu.user,
          system: latestStats.cpu.system
        },
        network: latestStats.network,
        platform: latestStats.platform,
        arch: latestStats.arch,
        nodeVersion: latestStats.nodeVersion,
        env: latestStats.env,
        timestamp: latestStats.timestamp
      };
    } catch (error) {
      console.error('❌ 获取系统状态失败:', error.message);
      throw error;
    }
  }
  
  // 格式化运行时间
  formatUptime(uptime) {
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);
    
    return `${hours}h ${minutes}m ${seconds}s`;
  }
  
  // 格式化字节数
  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
  
  // 获取系统统计信息
  async getStats() {
    try {
      const status = await this.getStatus();
      
      const stats = {
        system: {
          platform: status.platform,
          arch: status.arch,
          nodeVersion: status.nodeVersion,
          env: status.env,
          uptime: status.uptime
        },
        resources: {
          disk: status.diskUsage,
          memory: status.memoryUsage,
          cpu: status.cpuUsage,
          network: status.network
        },
        status: {
          overall: status.status,
          issues: status.issues
        },
        timestamp: new Date().toISOString()
      };
      
      return stats;
    } catch (error) {
      console.error('❌ 获取系统统计信息失败:', error.message);
      throw error;
    }
  }
  
  // 获取历史系统数据
  async getHistoricalData(options = {}) {
    try {
      const { limit = 24, interval = 'hour' } = options;
      
      let filteredData = [...this.systemStats];
      
      // 限制数据数量
      if (limit > 0) {
        filteredData = filteredData.slice(-limit);
      }
      
      return filteredData;
    } catch (error) {
      console.error('❌ 获取历史系统数据失败:', error.message);
      throw error;
    }
  }
  
  // 检测系统健康状态
  async checkSystemHealth() {
    try {
      const status = await this.getStatus();
      
      return {
        healthy: status.status === 'healthy',
        status: status.status,
        issues: status.issues,
        details: {
          disk: status.diskUsage,
          memory: status.memoryUsage,
          cpu: status.cpuUsage
        }
      };
    } catch (error) {
      console.error('❌ 检测系统健康状态失败:', error.message);
      return {
        healthy: false,
        status: 'error',
        issues: ['系统健康检查失败'],
        details: {}
      };
    }
  }
  
  // 设置配置
  setConfig(config) {
    try {
      this.config = {
        ...this.config,
        ...config
      };
      
      // 如果检查间隔改变，重新设置
      if (config.checkInterval && this.isMonitoring) {
        if (this.monitoringInterval) {
          clearInterval(this.monitoringInterval);
        }
        
        this.monitoringInterval = setInterval(async () => {
          try {
            await this.collectSystemStats();
          } catch (error) {
            console.error('❌ 采集系统数据失败:', error.message);
          }
        }, this.config.checkInterval);
      }
      
      console.log('✅ 系统监控配置已更新');
    } catch (error) {
      console.error('❌ 设置系统监控配置失败:', error.message);
      throw error;
    }
  }
}

module.exports = SystemMonitor;