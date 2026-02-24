// 监控分析系统主模块

class MonitoringSystem {
  constructor(config = {}) {
    this.config = {
      ...config
    };
    
    this.performanceMonitor = null;
    this.agentMonitor = null;
    this.systemMonitor = null;
    this.alertSystem = null;
  }
  
  async init() {
    console.log('🔧 初始化监控分析系统...');
    
    // 加载各个子模块
    const PerformanceMonitor = require('./performance-monitor');
    const AgentMonitor = require('./agent-monitor');
    const SystemMonitor = require('./system-monitor');
    const AlertSystem = require('./alert-system');
    
    this.performanceMonitor = new PerformanceMonitor(this.config);
    this.agentMonitor = new AgentMonitor(this.config);
    this.systemMonitor = new SystemMonitor(this.config);
    this.alertSystem = new AlertSystem(this.config);
    
    // 初始化各个模块
    await this.performanceMonitor.init();
    await this.agentMonitor.init();
    await this.systemMonitor.init();
    await this.alertSystem.init();
    
    console.log('✅ 监控分析系统初始化完成');
  }
  
  // 设置外部依赖
  setDependencies(memorySystem, schedulerSystem, communicationSystem) {
    this.memorySystem = memorySystem;
    this.schedulerSystem = schedulerSystem;
    this.communicationSystem = communicationSystem;
    
    // 将依赖传递给子模块
    if (this.performanceMonitor) {
      this.performanceMonitor.setDependencies(memorySystem, schedulerSystem, communicationSystem);
    }
    
    if (this.agentMonitor) {
      this.agentMonitor.setDependencies(memorySystem, schedulerSystem, communicationSystem);
    }
    
    if (this.systemMonitor) {
      this.systemMonitor.setDependencies(memorySystem, schedulerSystem, communicationSystem);
    }
    
    if (this.alertSystem) {
      this.alertSystem.setDependencies(memorySystem, schedulerSystem, communicationSystem);
    }
  }
  
  // 开始监控
  async startMonitoring() {
    try {
      console.log('🚀 开始监控...');
      
      await this.performanceMonitor.start();
      await this.agentMonitor.start();
      await this.systemMonitor.start();
      await this.alertSystem.start();
      
      console.log('✅ 监控已开始');
    } catch (error) {
      console.error('❌ 开始监控失败:', error.message);
      throw error;
    }
  }
  
  // 停止监控
  async stopMonitoring() {
    try {
      console.log('⏹️  停止监控...');
      
      await this.performanceMonitor.stop();
      await this.agentMonitor.stop();
      await this.systemMonitor.stop();
      await this.alertSystem.stop();
      
      console.log('✅ 监控已停止');
    } catch (error) {
      console.error('❌ 停止监控失败:', error.message);
      throw error;
    }
  }
  
  // 获取性能指标
  async getPerformanceMetrics() {
    try {
      return await this.performanceMonitor.getMetrics();
    } catch (error) {
      console.error('❌ 获取性能指标失败:', error.message);
      throw error;
    }
  }
  
  // 获取智能体状态
  async getAgentStatus() {
    try {
      return await this.agentMonitor.getStatus();
    } catch (error) {
      console.error('❌ 获取智能体状态失败:', error.message);
      throw error;
    }
  }
  
  // 获取系统状态
  async getSystemStatus() {
    try {
      return await this.systemMonitor.getStatus();
    } catch (error) {
      console.error('❌ 获取系统状态失败:', error.message);
      throw error;
    }
  }
  
  // 获取警报
  async getAlerts() {
    try {
      return await this.alertSystem.getAlerts();
    } catch (error) {
      console.error('❌ 获取警报失败:', error.message);
      throw error;
    }
  }
  
  // 获取综合监控数据
  async getMonitoringData() {
    try {
      const [performance, agents, system, alerts] = await Promise.all([
        this.getPerformanceMetrics(),
        this.getAgentStatus(),
        this.getSystemStatus(),
        this.getAlerts()
      ]);
      
      return {
        performance,
        agents,
        system,
        alerts,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('❌ 获取综合监控数据失败:', error.message);
      throw error;
    }
  }
  
  // 生成监控报告
  async generateReport(options = {}) {
    try {
      console.log('📊 生成监控报告...');
      
      const data = await this.getMonitoringData();
      
      const report = {
        title: '公司大脑监控报告',
        timestamp: data.timestamp,
        performance: {
          memoryUsage: data.performance.memoryUsage,
          cpuUsage: data.performance.cpuUsage,
          responseTimes: data.performance.responseTimes,
          throughput: data.performance.throughput
        },
        agents: {
          total: data.agents.total,
          active: data.agents.active,
          inactive: data.agents.inactive,
          details: data.agents.details
        },
        system: {
          status: data.system.status,
          uptime: data.system.uptime,
          diskUsage: data.system.diskUsage,
          network: data.system.network
        },
        alerts: {
          total: data.alerts.length,
          critical: data.alerts.filter(alert => alert.severity === 'critical').length,
          warning: data.alerts.filter(alert => alert.severity === 'warning').length,
          info: data.alerts.filter(alert => alert.severity === 'info').length,
          details: data.alerts
        }
      };
      
      console.log('✅ 监控报告生成完成');
      return report;
    } catch (error) {
      console.error('❌ 生成监控报告失败:', error.message);
      throw error;
    }
  }
  
  // 设置监控配置
  setConfig(config) {
    try {
      this.config = {
        ...this.config,
        ...config
      };
      
      // 更新子模块配置
      if (this.performanceMonitor) {
        this.performanceMonitor.setConfig(config);
      }
      
      if (this.agentMonitor) {
        this.agentMonitor.setConfig(config);
      }
      
      if (this.systemMonitor) {
        this.systemMonitor.setConfig(config);
      }
      
      if (this.alertSystem) {
        this.alertSystem.setConfig(config);
      }
      
      console.log('✅ 监控配置已更新');
    } catch (error) {
      console.error('❌ 设置监控配置失败:', error.message);
      throw error;
    }
  }
  
  // 备份系统
  async backup() {
    try {
      console.log('💾 备份监控系统...');
      
      const backupData = {
        performance: await this.performanceMonitor.getStats(),
        agents: await this.agentMonitor.getStats(),
        system: await this.systemMonitor.getStats(),
        alerts: await this.alertSystem.getStats(),
        timestamp: new Date().toISOString()
      };
      
      console.log('✅ 监控系统备份完成');
      return backupData;
    } catch (error) {
      console.error('❌ 备份监控系统失败:', error.message);
      throw error;
    }
  }
}

module.exports = MonitoringSystem;