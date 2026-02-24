// 警报系统模块

class AlertSystem {
  constructor(config = {}) {
    this.config = {
      ...config,
      alertHistorySize: config.alertHistorySize || 500, // 保存500条警报历史
      alertCooldown: config.alertCooldown || 60000, // 警报冷却时间1分钟
      severityLevels: config.severityLevels || {
        critical: 3,
        warning: 2,
        info: 1
      }
    };
    
    this.alerts = [];
    this.alertHistory = [];
    this.alertTimestamps = new Map();
    this.isMonitoring = false;
  }
  
  async init() {
    console.log('🔧 初始化警报系统...');
    // 这里可以添加初始化逻辑，比如加载警报规则等
    console.log('✅ 警报系统初始化完成');
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
      
      console.log('🚀 开始警报监控...');
      this.isMonitoring = true;
      console.log('✅ 警报监控已开始');
    } catch (error) {
      console.error('❌ 开始警报监控失败:', error.message);
      throw error;
    }
  }
  
  // 停止监控
  async stop() {
    try {
      if (!this.isMonitoring) {
        return;
      }
      
      console.log('⏹️  停止警报监控...');
      this.isMonitoring = false;
      console.log('✅ 警报监控已停止');
    } catch (error) {
      console.error('❌ 停止警报监控失败:', error.message);
      throw error;
    }
  }
  
  // 创建警报
  async createAlert(alertData) {
    try {
      const { type, message, severity = 'warning', source, details = {} } = alertData;
      
      if (!type || !message) {
        throw new Error('警报类型和消息不能为空');
      }
      
      // 检查警报冷却
      const alertKey = `${type}_${source || 'system'}`;
      const lastAlertTime = this.alertTimestamps.get(alertKey);
      const now = Date.now();
      
      if (lastAlertTime && now - lastAlertTime < this.config.alertCooldown) {
        console.log(`⚠️  警报冷却中: ${alertKey}`);
        return null;
      }
      
      // 创建警报
      const alert = {
        id: `alert_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        type,
        message,
        severity,
        source: source || 'system',
        details,
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      // 添加到活动警报列表
      this.alerts.push(alert);
      
      // 添加到历史记录
      this.alertHistory.push(alert);
      
      // 限制历史记录大小
      if (this.alertHistory.length > this.config.alertHistorySize) {
        this.alertHistory = this.alertHistory.slice(-this.config.alertHistorySize);
      }
      
      // 更新警报时间戳
      this.alertTimestamps.set(alertKey, now);
      
      // 记录警报
      console.log(`🚨 新警报 [${severity.toUpperCase()}]: ${message}`);
      
      return alert;
    } catch (error) {
      console.error('❌ 创建警报失败:', error.message);
      throw error;
    }
  }
  
  // 解决警报
  async resolveAlert(alertId, resolution = '') {
    try {
      const alertIndex = this.alerts.findIndex(alert => alert.id === alertId);
      
      if (alertIndex === -1) {
        throw new Error('警报不存在');
      }
      
      const alert = this.alerts[alertIndex];
      alert.status = 'resolved';
      alert.resolution = resolution;
      alert.updatedAt = new Date().toISOString();
      
      // 从活动警报列表中移除
      this.alerts.splice(alertIndex, 1);
      
      // 更新历史记录中的警报
      const historyIndex = this.alertHistory.findIndex(a => a.id === alertId);
      if (historyIndex !== -1) {
        this.alertHistory[historyIndex] = alert;
      }
      
      console.log(`✅ 警报已解决: ${alert.message}`);
      
      return alert;
    } catch (error) {
      console.error('❌ 解决警报失败:', error.message);
      throw error;
    }
  }
  
  // 获取警报
  async getAlerts(options = {}) {
    try {
      const { status = 'all', severity = 'all' } = options;
      
      let filteredAlerts = [...this.alerts];
      
      if (status !== 'all') {
        filteredAlerts = filteredAlerts.filter(alert => alert.status === status);
      }
      
      if (severity !== 'all') {
        filteredAlerts = filteredAlerts.filter(alert => alert.severity === severity);
      }
      
      return filteredAlerts;
    } catch (error) {
      console.error('❌ 获取警报失败:', error.message);
      throw error;
    }
  }
  
  // 获取警报历史
  async getAlertHistory(options = {}) {
    try {
      const { limit = 100, severity = 'all' } = options;
      
      let filteredHistory = [...this.alertHistory];
      
      if (severity !== 'all') {
        filteredHistory = filteredHistory.filter(alert => alert.severity === severity);
      }
      
      // 按时间倒序排序
      filteredHistory.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      
      // 限制返回数量
      if (limit > 0) {
        filteredHistory = filteredHistory.slice(0, limit);
      }
      
      return filteredHistory;
    } catch (error) {
      console.error('❌ 获取警报历史失败:', error.message);
      throw error;
    }
  }
  
  // 批量创建警报
  async createAlerts(alertsData) {
    try {
      const createdAlerts = [];
      
      for (const alertData of alertsData) {
        const alert = await this.createAlert(alertData);
        if (alert) {
          createdAlerts.push(alert);
        }
      }
      
      return createdAlerts;
    } catch (error) {
      console.error('❌ 批量创建警报失败:', error.message);
      throw error;
    }
  }
  
  // 从监控数据生成警报
  async generateAlertsFromMonitoring(data) {
    try {
      const alerts = [];
      
      // 从性能数据生成警报
      if (data.performance) {
        const { memoryUsage, cpuUsage, responseTimes } = data.performance;
        
        // 内存使用警报
        if (memoryUsage.percent && memoryUsage.percent.heap > 90) {
          alerts.push({
            type: 'memory_usage',
            message: `内存使用率过高: ${Math.round(memoryUsage.percent.heap)}%`,
            severity: 'critical',
            source: 'performance_monitor',
            details: memoryUsage
          });
        }
        
        // 响应时间警报
        if (responseTimes.average > 500) {
          alerts.push({
            type: 'response_time',
            message: `响应时间过长: ${Math.round(responseTimes.average)}ms`,
            severity: 'warning',
            source: 'performance_monitor',
            details: responseTimes
          });
        }
      }
      
      // 从智能体数据生成警报
      if (data.agents) {
        const { inactive } = data.agents;
        
        if (inactive > 0) {
          alerts.push({
            type: 'agent_inactive',
            message: `有 ${inactive} 个智能体处于非活动状态`,
            severity: 'warning',
            source: 'agent_monitor',
            details: data.agents
          });
        }
      }
      
      // 从系统数据生成警报
      if (data.system) {
        const { diskUsage, issues } = data.system;
        
        if (diskUsage.percent > 90) {
          alerts.push({
            type: 'disk_usage',
            message: `磁盘使用率过高: ${diskUsage.percent}%`,
            severity: 'critical',
            source: 'system_monitor',
            details: diskUsage
          });
        }
        
        if (issues && issues.length > 0) {
          for (const issue of issues) {
            alerts.push({
              type: 'system_issue',
              message: issue,
              severity: 'warning',
              source: 'system_monitor',
              details: data.system
            });
          }
        }
      }
      
      // 创建警报
      return await this.createAlerts(alerts);
    } catch (error) {
      console.error('❌ 从监控数据生成警报失败:', error.message);
      throw error;
    }
  }
  
  // 获取警报统计信息
  async getStats() {
    try {
      const activeAlerts = this.alerts.length;
      const totalAlerts = this.alertHistory.length;
      
      // 按严重程度统计
      const severityStats = {};
      for (const severity of Object.keys(this.config.severityLevels)) {
        severityStats[severity] = this.alerts.filter(alert => alert.severity === severity).length;
      }
      
      // 按类型统计
      const typeStats = {};
      for (const alert of this.alerts) {
        typeStats[alert.type] = (typeStats[alert.type] || 0) + 1;
      }
      
      return {
        activeAlerts,
        totalAlerts,
        severityStats,
        typeStats,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('❌ 获取警报统计信息失败:', error.message);
      throw error;
    }
  }
  
  // 清理过期警报
  async cleanupExpiredAlerts() {
    try {
      const now = new Date();
      const cutoffTime = new Date(now.getTime() - 24 * 60 * 60 * 1000); // 24小时前
      
      // 清理活动警报中超过24小时的
      this.alerts = this.alerts.filter(alert => {
        const alertTime = new Date(alert.createdAt);
        return alertTime > cutoffTime;
      });
      
      // 限制历史记录大小
      if (this.alertHistory.length > this.config.alertHistorySize) {
        this.alertHistory = this.alertHistory.slice(-this.config.alertHistorySize);
      }
      
      console.log('✅ 清理过期警报完成');
    } catch (error) {
      console.error('❌ 清理过期警报失败:', error.message);
      throw error;
    }
  }
  
  // 设置配置
  setConfig(config) {
    try {
      this.config = {
        ...this.config,
        ...config
      };
      
      console.log('✅ 警报系统配置已更新');
    } catch (error) {
      console.error('❌ 设置警报系统配置失败:', error.message);
      throw error;
    }
  }
}

module.exports = AlertSystem;