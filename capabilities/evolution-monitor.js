/**
 * 进化监控系统 (Evolution Monitoring System)
 * 监控PCEC系统的执行状态、产物质量和资源使用情况
 */

class EvolutionMonitor {
  constructor() {
    this.executionStats = {
      totalExecutions: 0,
      successfulExecutions: 0,
      failedExecutions: 0,
      averageExecutionTime: 0,
      lastExecutionTimestamp: null,
      executionHistory: []
    };
    this.productStats = {
      totalProducts: 0,
      capabilityShapes: 0,
      defaultStrategies: 0,
      behaviorRules: 0,
      productHistory: []
    };
    this.resourceStats = {
      memoryUsage: [],
      cpuUsage: [],
      diskUsage: [],
      networkUsage: [],
      resourceHistory: []
    };
    this.alertThresholds = {
      executionTime: 30000, // 30秒
      failureRate: 0.3, // 30%
      memoryUsage: 80, // 80%
      cpuUsage: 90 // 90%
    };
    this.alerts = [];
    this.maxHistorySize = 100;
  }

  // 记录执行状态
  recordExecution(executionData) {
    const { success, timestamp, duration, cycle, evolutionType } = executionData;
    
    // 更新执行统计
    this.executionStats.totalExecutions++;
    if (success) {
      this.executionStats.successfulExecutions++;
    } else {
      this.executionStats.failedExecutions++;
    }
    
    // 更新平均执行时间
    if (duration) {
      const totalTime = this.executionStats.averageExecutionTime * (this.executionStats.totalExecutions - 1);
      this.executionStats.averageExecutionTime = (totalTime + duration) / this.executionStats.totalExecutions;
    }
    
    this.executionStats.lastExecutionTimestamp = timestamp;
    
    // 记录执行历史
    const executionRecord = {
      timestamp,
      success,
      duration,
      cycle,
      evolutionType
    };
    
    this.executionStats.executionHistory.push(executionRecord);
    
    // 限制历史记录大小
    if (this.executionStats.executionHistory.length > this.maxHistorySize) {
      this.executionStats.executionHistory.shift();
    }
    
    // 检查执行时间警报
    if (duration > this.alertThresholds.executionTime) {
      this.createAlert('EXECUTION_TIME', `Execution time exceeded threshold: ${duration}ms`);
    }
    
    // 检查失败率警报
    const failureRate = this.executionStats.failedExecutions / this.executionStats.totalExecutions;
    if (failureRate > this.alertThresholds.failureRate) {
      this.createAlert('FAILURE_RATE', `Failure rate exceeded threshold: ${(failureRate * 100).toFixed(2)}%`);
    }
    
    return executionRecord;
  }

  // 记录产物信息
  recordProduct(productData) {
    const { type, name, timestamp, qualityScore } = productData;
    
    // 更新产物统计
    this.productStats.totalProducts++;
    switch (type) {
      case 'capabilityShape':
        this.productStats.capabilityShapes++;
        break;
      case 'defaultStrategy':
        this.productStats.defaultStrategies++;
        break;
      case 'behaviorRule':
        this.productStats.behaviorRules++;
        break;
    }
    
    // 记录产物历史
    const productRecord = {
      timestamp,
      type,
      name,
      qualityScore
    };
    
    this.productStats.productHistory.push(productRecord);
    
    // 限制历史记录大小
    if (this.productStats.productHistory.length > this.maxHistorySize) {
      this.productStats.productHistory.shift();
    }
    
    return productRecord;
  }

  // 记录资源使用情况
  recordResourceUsage(resourceData) {
    const { memory, cpu, disk, network, timestamp } = resourceData;
    
    // 更新资源统计
    this.resourceStats.memoryUsage.push(memory);
    this.resourceStats.cpuUsage.push(cpu);
    this.resourceStats.diskUsage.push(disk);
    this.resourceStats.networkUsage.push(network);
    
    // 限制历史记录大小
    if (this.resourceStats.memoryUsage.length > this.maxHistorySize) {
      this.resourceStats.memoryUsage.shift();
      this.resourceStats.cpuUsage.shift();
      this.resourceStats.diskUsage.shift();
      this.resourceStats.networkUsage.shift();
    }
    
    // 记录资源历史
    const resourceRecord = {
      timestamp,
      memory,
      cpu,
      disk,
      network
    };
    
    this.resourceStats.resourceHistory.push(resourceRecord);
    
    // 限制历史记录大小
    if (this.resourceStats.resourceHistory.length > this.maxHistorySize) {
      this.resourceStats.resourceHistory.shift();
    }
    
    // 检查资源使用警报
    if (memory > this.alertThresholds.memoryUsage) {
      this.createAlert('MEMORY_USAGE', `Memory usage exceeded threshold: ${memory}%`);
    }
    
    if (cpu > this.alertThresholds.cpuUsage) {
      this.createAlert('CPU_USAGE', `CPU usage exceeded threshold: ${cpu}%`);
    }
    
    return resourceRecord;
  }

  // 创建警报
  createAlert(type, message) {
    const alert = {
      id: `alert_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type,
      message,
      timestamp: Date.now(),
      status: 'ACTIVE'
    };
    
    this.alerts.push(alert);
    console.warn(`[ALERT] ${type}: ${message}`);
    
    return alert;
  }

  // 解决警报
  resolveAlert(alertId) {
    const alertIndex = this.alerts.findIndex(alert => alert.id === alertId);
    if (alertIndex !== -1) {
      this.alerts[alertIndex].status = 'RESOLVED';
      return true;
    }
    return false;
  }

  // 获取执行状态
  getExecutionStatus() {
    const failureRate = this.executionStats.totalExecutions > 0 
      ? this.executionStats.failedExecutions / this.executionStats.totalExecutions 
      : 0;
    
    return {
      ...this.executionStats,
      failureRate,
      successRate: 1 - failureRate
    };
  }

  // 获取产物状态
  getProductStatus() {
    const productDistribution = {
      capabilityShapes: this.productStats.capabilityShapes,
      defaultStrategies: this.productStats.defaultStrategies,
      behaviorRules: this.productStats.behaviorRules
    };
    
    return {
      ...this.productStats,
      productDistribution
    };
  }

  // 获取资源状态
  getResourceStatus() {
    const averageMemory = this.calculateAverage(this.resourceStats.memoryUsage);
    const averageCpu = this.calculateAverage(this.resourceStats.cpuUsage);
    const averageDisk = this.calculateAverage(this.resourceStats.diskUsage);
    const averageNetwork = this.calculateAverage(this.resourceStats.networkUsage);
    
    return {
      ...this.resourceStats,
      averageMemory,
      averageCpu,
      averageDisk,
      averageNetwork
    };
  }

  // 获取所有状态
  getStatus() {
    return {
      execution: this.getExecutionStatus(),
      product: this.getProductStatus(),
      resource: this.getResourceStatus(),
      alerts: this.alerts.filter(alert => alert.status === 'ACTIVE'),
      timestamp: Date.now()
    };
  }

  // 计算平均值
  calculateAverage(values) {
    if (values.length === 0) return 0;
    const sum = values.reduce((acc, val) => acc + val, 0);
    return sum / values.length;
  }

  // 生成执行报告
  generateExecutionReport() {
    const status = this.getStatus();
    
    return {
      title: 'PCEC Execution Report',
      timestamp: Date.now(),
      summary: {
        totalExecutions: status.execution.totalExecutions,
        successRate: (status.execution.successRate * 100).toFixed(2) + '%',
        averageExecutionTime: (status.execution.averageExecutionTime / 1000).toFixed(2) + 's',
        totalProducts: status.product.totalProducts,
        activeAlerts: status.alerts.length
      },
      details: status,
      recommendations: this.generateRecommendations(status)
    };
  }

  // 生成推荐
  generateRecommendations(status) {
    const recommendations = [];
    
    if (status.execution.failureRate > this.alertThresholds.failureRate) {
      recommendations.push('Failure rate is high, investigate the root causes of failed executions');
    }
    
    if (status.execution.averageExecutionTime > this.alertThresholds.executionTime) {
      recommendations.push('Average execution time is high, optimize the PCEC execution process');
    }
    
    if (status.resource.averageMemory > this.alertThresholds.memoryUsage * 0.8) {
      recommendations.push('Memory usage is approaching threshold, monitor memory usage closely');
    }
    
    if (status.resource.averageCpu > this.alertThresholds.cpuUsage * 0.8) {
      recommendations.push('CPU usage is approaching threshold, optimize resource usage');
    }
    
    if (status.product.totalProducts === 0) {
      recommendations.push('No evolution products generated, check product generation logic');
    }
    
    return recommendations;
  }

  // 清理历史数据
  cleanupHistory() {
    this.executionStats.executionHistory = [];
    this.productStats.productHistory = [];
    this.resourceStats.resourceHistory = [];
    this.resourceStats.memoryUsage = [];
    this.resourceStats.cpuUsage = [];
    this.resourceStats.diskUsage = [];
    this.resourceStats.networkUsage = [];
    this.alerts = this.alerts.filter(alert => alert.status === 'ACTIVE');
  }

  // 导出监控数据
  exportData() {
    return {
      executionStats: this.executionStats,
      productStats: this.productStats,
      resourceStats: this.resourceStats,
      alerts: this.alerts,
      alertThresholds: this.alertThresholds,
      exportTimestamp: Date.now()
    };
  }

  // 导入监控数据
  importData(data) {
    if (data.executionStats) {
      this.executionStats = { ...this.executionStats, ...data.executionStats };
    }
    if (data.productStats) {
      this.productStats = { ...this.productStats, ...data.productStats };
    }
    if (data.resourceStats) {
      this.resourceStats = { ...this.resourceStats, ...data.resourceStats };
    }
    if (data.alerts) {
      this.alerts = data.alerts;
    }
    if (data.alertThresholds) {
      this.alertThresholds = { ...this.alertThresholds, ...data.alertThresholds };
    }
  }
}

// 导出单例实例
const evolutionMonitor = new EvolutionMonitor();

module.exports = {
  EvolutionMonitor,
  evolutionMonitor
};
