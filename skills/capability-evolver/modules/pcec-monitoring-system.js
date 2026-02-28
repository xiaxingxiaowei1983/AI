/**
 * PCEC 监控系统
 * 跟踪进化进度和效�? * 实现进化指标收集、实时监控和异常检�? */

const fs = require('fs');
const path = require('path');

class PCECMonitoringSystem {
  constructor(config = {}) {
    this.config = {
      baseDir: config.baseDir || path.join(__dirname, '..', 'data'),
      metricsDir: config.metricsDir || path.join(__dirname, '..', 'data', 'metrics'),
      dashboardDir: config.dashboardDir || path.join(__dirname, '..', 'data', 'dashboard'),
      alertsDir: config.alertsDir || path.join(__dirname, '..', 'data', 'alerts'),
      logFile: config.logFile || path.join(__dirname, '..', '..', '..', 'logs', 'pcec-monitoring.log'),
      metricsInterval: config.metricsInterval || 5 * 60 * 1000, // 5分钟收集一次指�?      alertCheckInterval: config.alertCheckInterval || 1 * 60 * 1000, // 1分钟检查一次警�?      dashboardUpdateInterval: config.dashboardUpdateInterval || 15 * 60 * 1000, // 15分钟更新一次仪表板
      ...config
    };
    
    this.ensureDirectories();
    this.startMonitoringSchedulers();
    this.initializeMetrics();
  }
  
  // 确保目录存在
  ensureDirectories() {
    const directories = [
      this.config.baseDir,
      this.config.metricsDir,
      this.config.dashboardDir,
      this.config.alertsDir,
      path.dirname(this.config.logFile)
    ];
    
    directories.forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        this.log(`Created directory: ${dir}`);
      }
    });
  }
  
  // 日志函数
  log(message) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [PCEC Monitoring] ${message}`;
    console.log(logMessage);
    
    // 写入日志文件
    fs.appendFileSync(this.config.logFile, logMessage + '\n', { flag: 'a' });
  }
  
  // 启动监控调度�?  startMonitoringSchedulers() {
    // 指标收集调度�?    setInterval(() => {
      this.collectMetrics();
    }, this.config.metricsInterval);
    
    // 警报检查调度器
    setInterval(() => {
      this.checkAlerts();
    }, this.config.alertCheckInterval);
    
    // 仪表板更新调度器
    setInterval(() => {
      this.updateDashboard();
    }, this.config.dashboardUpdateInterval);
    
    this.log(`Monitoring schedulers started: metrics=${this.config.metricsInterval}ms, alerts=${this.config.alertCheckInterval}ms, dashboard=${this.config.dashboardUpdateInterval}ms`);
  }
  
  // 初始化指�?  initializeMetrics() {
    try {
      const metricsPath = path.join(this.config.metricsDir, 'initial-metrics.json');
      if (!fs.existsSync(metricsPath)) {
        const initialMetrics = {
          timestamp: Date.now(),
          system: {
            uptime: process.uptime(),
            memory: process.memoryUsage(),
            cpu: this.getCPUUsage()
          },
          pcec: {
            cycles: 0,
            successfulCycles: 0,
            failedCycles: 0,
            substantialEvolutions: 0,
            nonSubstantialEvolutions: 0
          },
          capabilities: {
            total: 0,
            active: 0,
            byLevel: { 1: 0, 2: 0, 3: 0 }
          },
          performance: {
            cycleDuration: 0,
            evolutionSpeed: 0,
            successRate: 0
          }
        };
        
        fs.writeFileSync(metricsPath, JSON.stringify(initialMetrics, null, 2));
        this.log('Initialized initial metrics');
      }
    } catch (error) {
      this.log(`Error initializing metrics: ${error.message}`);
    }
  }
  
  // 获取 CPU 使用率（简化实现）
  getCPUUsage() {
    // 在实际环境中，应该使用更准确�?CPU 使用率计算方�?    return {
      usage: Math.random() * 30 + 5, // 模拟 5-35% �?CPU 使用�?      cores: require('os').cpus().length
    };
  }
  
  // 收集指标
  collectMetrics() {
    try {
      const metrics = {
        id: `metrics-${Date.now()}`,
        timestamp: Date.now(),
        system: {
          uptime: process.uptime(),
          memory: process.memoryUsage(),
          cpu: this.getCPUUsage(),
          disk: this.getDiskUsage()
        },
        pcec: this.collectPCECMetrics(),
        capabilities: this.collectCapabilityMetrics(),
        performance: this.collectPerformanceMetrics(),
        evolution: this.collectEvolutionMetrics()
      };
      
      const metricsPath = path.join(this.config.metricsDir, `${metrics.id}.json`);
      fs.writeFileSync(metricsPath, JSON.stringify(metrics, null, 2));
      
      this.log(`Collected metrics: ${metrics.id}`);
      return metrics;
    } catch (error) {
      this.log(`Error collecting metrics: ${error.message}`);
      return null;
    }
  }
  
  // 获取磁盘使用率（简化实现）
  getDiskUsage() {
    try {
      const stats = fs.statSync(__dirname);
      return {
        free: 100000000000, // 模拟 100GB 可用空间
        total: 200000000000, // 模拟 200GB 总空�?        used: 100000000000 // 模拟 100GB 使用空间
      };
    } catch (error) {
      return {
        free: 0,
        total: 0,
        used: 0
      };
    }
  }
  
  // 收集 PCEC 指标
  collectPCECMetrics() {
    try {
      // 读取 PCEC 状态文�?      const statusPath = path.join(__dirname, '..', '..', '..', 'skills', 'capability-evolver', 'data', 'pcec-status.json');
      let status = { currentCycle: 0, evolutionCount: 0, consecutiveNonSubstantialCycles: 0 };
      
      if (fs.existsSync(statusPath)) {
        status = JSON.parse(fs.readFileSync(statusPath, 'utf8'));
      }
      
      return {
        cycles: status.currentCycle || 0,
        successfulCycles: status.completedTasks ? status.completedTasks.length : 0,
        failedCycles: status.pendingTasks ? status.pendingTasks.length : 0,
        substantialEvolutions: this.countSubstantialEvolutions(),
        nonSubstantialEvolutions: status.consecutiveNonSubstantialCycles || 0,
        lastCycle: status.lastEvolution || 0
      };
    } catch (error) {
      this.log(`Error collecting PCEC metrics: ${error.message}`);
      return {
        cycles: 0,
        successfulCycles: 0,
        failedCycles: 0,
        substantialEvolutions: 0,
        nonSubstantialEvolutions: 0,
        lastCycle: 0
      };
    }
  }
  
  // 统计实质性进化数�?  countSubstantialEvolutions() {
    try {
      const tasksPath = path.join(__dirname, '..', '..', '..', 'skills', 'capability-evolver', 'data', 'pcec-status.json');
      if (fs.existsSync(tasksPath)) {
        const status = JSON.parse(fs.readFileSync(tasksPath, 'utf8'));
        if (status.completedTasks) {
          return status.completedTasks.filter(task => task.substantial).length;
        }
      }
      return 0;
    } catch (error) {
      return 0;
    }
  }
  
  // 收集能力指标
  collectCapabilityMetrics() {
    try {
      const capabilitiesDir = path.join(__dirname, '..', 'data', 'capabilities');
      let total = 0;
      let active = 0;
      const byLevel = { 1: 0, 2: 0, 3: 0 };
      
      if (fs.existsSync(capabilitiesDir)) {
        const files = fs.readdirSync(capabilitiesDir);
        files.forEach(file => {
          if (file.endsWith('.json')) {
            try {
              const capabilityPath = path.join(capabilitiesDir, file);
              const capability = JSON.parse(fs.readFileSync(capabilityPath, 'utf8'));
              total++;
              if (capability.active !== false) {
                active++;
              }
              if (capability.level) {
                byLevel[capability.level] = (byLevel[capability.level] || 0) + 1;
              }
            } catch (error) {
              // 忽略错误的能力文�?            }
          }
        });
      }
      
      return {
        total,
        active,
        byLevel
      };
    } catch (error) {
      this.log(`Error collecting capability metrics: ${error.message}`);
      return {
        total: 0,
        active: 0,
        byLevel: { 1: 0, 2: 0, 3: 0 }
      };
    }
  }
  
  // 收集性能指标
  collectPerformanceMetrics() {
    try {
      const metricsFiles = fs.readdirSync(this.config.metricsDir);
      const recentMetrics = [];
      
      metricsFiles.forEach(file => {
        if (file.endsWith('.json')) {
          try {
            const metricPath = path.join(this.config.metricsDir, file);
            const metric = JSON.parse(fs.readFileSync(metricPath, 'utf8'));
            // 只考虑最�?小时的指�?            if (Date.now() - metric.timestamp < 60 * 60 * 1000) {
              recentMetrics.push(metric);
            }
          } catch (error) {
            // 忽略错误的指标文�?          }
        }
      });
      
      if (recentMetrics.length === 0) {
        return {
          cycleDuration: 0,
          evolutionSpeed: 0,
          successRate: 0,
          resourceUsage: 0
        };
      }
      
      // 计算平均性能指标
      const avgCycleDuration = recentMetrics.reduce((sum, m) => sum + (m.performance?.cycleDuration || 0), 0) / recentMetrics.length;
      const avgEvolutionSpeed = recentMetrics.reduce((sum, m) => sum + (m.performance?.evolutionSpeed || 0), 0) / recentMetrics.length;
      const avgSuccessRate = recentMetrics.reduce((sum, m) => sum + (m.performance?.successRate || 0), 0) / recentMetrics.length;
      const avgResourceUsage = recentMetrics.reduce((sum, m) => sum + (m.system?.cpu?.usage || 0), 0) / recentMetrics.length;
      
      return {
        cycleDuration: avgCycleDuration,
        evolutionSpeed: avgEvolutionSpeed,
        successRate: avgSuccessRate,
        resourceUsage: avgResourceUsage
      };
    } catch (error) {
      this.log(`Error collecting performance metrics: ${error.message}`);
      return {
        cycleDuration: 0,
        evolutionSpeed: 0,
        successRate: 0,
        resourceUsage: 0
      };
    }
  }
  
  // 收集进化指标
  collectEvolutionMetrics() {
    try {
      const evolutionPath = path.join(__dirname, '..', '..', '..', 'skills', 'capability-evolver', 'data', 'evolution-history.json');
      let evolutionHistory = [];
      
      if (fs.existsSync(evolutionPath)) {
        evolutionHistory = JSON.parse(fs.readFileSync(evolutionPath, 'utf8'));
      }
      
      const recentEvolutions = evolutionHistory.filter(e => 
        Date.now() - e.timestamp < 24 * 60 * 60 * 1000 // 最�?4小时
      );
      
      const evolutionTypes = {};
      recentEvolutions.forEach(e => {
        evolutionTypes[e.type] = (evolutionTypes[e.type] || 0) + 1;
      });
      
      return {
        recentEvolutions: recentEvolutions.length,
        evolutionTypes,
        averageEvolutionTime: this.calculateAverageEvolutionTime(recentEvolutions),
        evolutionTrend: this.calculateEvolutionTrend(recentEvolutions)
      };
    } catch (error) {
      this.log(`Error collecting evolution metrics: ${error.message}`);
      return {
        recentEvolutions: 0,
        evolutionTypes: {},
        averageEvolutionTime: 0,
        evolutionTrend: 'stable'
      };
    }
  }
  
  // 计算平均进化时间
  calculateAverageEvolutionTime(evolutions) {
    if (evolutions.length === 0) return 0;
    
    const totalTime = evolutions.reduce((sum, e) => sum + (e.duration || 0), 0);
    return totalTime / evolutions.length;
  }
  
  // 计算进化趋势
  calculateEvolutionTrend(evolutions) {
    if (evolutions.length < 3) return 'stable';
    
    const recent = evolutions.slice(-3);
    const successRate = recent.filter(e => e.success).length / recent.length;
    
    if (successRate >= 0.8) return 'improving';
    if (successRate <= 0.3) return 'declining';
    return 'stable';
  }
  
  // 检查警�?  checkAlerts() {
    try {
      const metrics = this.collectMetrics();
      const alerts = [];
      
      // 检查系统资源警�?      if (metrics.system.cpu.usage > 80) {
        alerts.push({
          id: `alert-${Date.now()}-cpu`,
          type: 'system',
          severity: 'high',
          message: `High CPU usage: ${metrics.system.cpu.usage.toFixed(2)}%`,
          timestamp: Date.now(),
          status: 'active'
        });
      }
      
      if (metrics.system.memory.heapUsed / metrics.system.memory.heapTotal > 0.9) {
        alerts.push({
          id: `alert-${Date.now()}-memory`,
          type: 'system',
          severity: 'medium',
          message: `High memory usage: ${((metrics.system.memory.heapUsed / metrics.system.memory.heapTotal) * 100).toFixed(2)}%`,
          timestamp: Date.now(),
          status: 'active'
        });
      }
      
      // 检�?PCEC 警报
      if (metrics.pcec.failedCycles > 3) {
        alerts.push({
          id: `alert-${Date.now()}-pcec-failures`,
          type: 'pcec',
          severity: 'high',
          message: `Multiple failed PCEC cycles: ${metrics.pcec.failedCycles}`,
          timestamp: Date.now(),
          status: 'active'
        });
      }
      
      if (metrics.pcec.nonSubstantialEvolutions >= 2) {
        alerts.push({
          id: `alert-${Date.now()}-pcec-non-substantial`,
          type: 'pcec',
          severity: 'medium',
          message: `Consecutive non-substantial evolutions: ${metrics.pcec.nonSubstantialEvolutions}`,
          timestamp: Date.now(),
          status: 'active'
        });
      }
      
      // 检查进化警�?      if (metrics.evolution.recentEvolutions === 0 && metrics.pcec.cycles > 0) {
        alerts.push({
          id: `alert-${Date.now()}-evolution-stopped`,
          type: 'evolution',
          severity: 'medium',
          message: 'No recent evolutions detected',
          timestamp: Date.now(),
          status: 'active'
        });
      }
      
      if (metrics.evolution.evolutionTrend === 'declining') {
        alerts.push({
          id: `alert-${Date.now()}-evolution-declining`,
          type: 'evolution',
          severity: 'high',
          message: 'Evolution trend is declining',
          timestamp: Date.now(),
          status: 'active'
        });
      }
      
      // 保存警报
      alerts.forEach(alert => {
        const alertPath = path.join(this.config.alertsDir, `${alert.id}.json`);
        fs.writeFileSync(alertPath, JSON.stringify(alert, null, 2));
        this.log(`Created alert: ${alert.message}`);
      });
      
      // 清理已解决的警报
      this.cleanupResolvedAlerts();
      
      return alerts;
    } catch (error) {
      this.log(`Error checking alerts: ${error.message}`);
      return [];
    }
  }
  
  // 清理已解决的警报
  cleanupResolvedAlerts() {
    try {
      const alerts = fs.readdirSync(this.config.alertsDir);
      let cleanedCount = 0;
      
      alerts.forEach(file => {
        if (file.endsWith('.json')) {
          try {
            const alertPath = path.join(this.config.alertsDir, file);
            const alert = JSON.parse(fs.readFileSync(alertPath, 'utf8'));
            
            // 清理24小时前的警报
            if (Date.now() - alert.timestamp > 24 * 60 * 60 * 1000) {
              fs.unlinkSync(alertPath);
              cleanedCount++;
            }
          } catch (error) {
            // 忽略错误的警报文�?          }
        }
      });
      
      if (cleanedCount > 0) {
        this.log(`Cleaned up ${cleanedCount} resolved alerts`);
      }
    } catch (error) {
      this.log(`Error cleaning up alerts: ${error.message}`);
    }
  }
  
  // 更新仪表�?  updateDashboard() {
    try {
      const metrics = this.collectMetrics();
      const alerts = this.getCurrentAlerts();
      
      const dashboard = {
        id: `dashboard-${Date.now()}`,
        timestamp: Date.now(),
        overview: {
          totalCycles: metrics.pcec.cycles,
          successfulCycles: metrics.pcec.successfulCycles,
          failedCycles: metrics.pcec.failedCycles,
          substantialEvolutions: metrics.pcec.substantialEvolutions,
          systemStatus: this.getSystemStatus(metrics.system),
          evolutionStatus: this.getEvolutionStatus(metrics.evolution)
        },
        metrics: metrics,
        alerts: alerts,
        trends: {
          evolution: metrics.evolution.evolutionTrend,
          performance: this.getPerformanceTrend(),
          resourceUsage: this.getResourceUsageTrend()
        },
        recommendations: this.generateRecommendations(metrics, alerts)
      };
      
      const dashboardPath = path.join(this.config.dashboardDir, `${dashboard.id}.json`);
      fs.writeFileSync(dashboardPath, JSON.stringify(dashboard, null, 2));
      
      // 更新最新仪表板链接
      const latestDashboardPath = path.join(this.config.dashboardDir, 'latest.json');
      fs.writeFileSync(latestDashboardPath, JSON.stringify(dashboard, null, 2));
      
      this.log(`Updated dashboard: ${dashboard.id}`);
      return dashboard;
    } catch (error) {
      this.log(`Error updating dashboard: ${error.message}`);
      return null;
    }
  }
  
  // 获取当前警报
  getCurrentAlerts() {
    try {
      const alerts = [];
      const alertFiles = fs.readdirSync(this.config.alertsDir);
      
      alertFiles.forEach(file => {
        if (file.endsWith('.json')) {
          try {
            const alertPath = path.join(this.config.alertsDir, file);
            const alert = JSON.parse(fs.readFileSync(alertPath, 'utf8'));
            if (alert.status === 'active') {
              alerts.push(alert);
            }
          } catch (error) {
            // 忽略错误的警报文�?          }
        }
      });
      
      // 按严重程度排�?      alerts.sort((a, b) => {
        const severityOrder = { low: 1, medium: 2, high: 3 };
        return severityOrder[b.severity] - severityOrder[a.severity];
      });
      
      return alerts;
    } catch (error) {
      return [];
    }
  }
  
  // 获取系统状�?  getSystemStatus(systemMetrics) {
    if (systemMetrics.cpu.usage > 80) return 'critical';
    if (systemMetrics.cpu.usage > 60) return 'warning';
    if (systemMetrics.memory.heapUsed / systemMetrics.memory.heapTotal > 0.9) return 'warning';
    return 'healthy';
  }
  
  // 获取进化状�?  getEvolutionStatus(evolutionMetrics) {
    if (evolutionMetrics.evolutionTrend === 'declining') return 'critical';
    if (evolutionMetrics.recentEvolutions === 0) return 'warning';
    if (evolutionMetrics.evolutionTrend === 'improving') return 'excellent';
    return 'healthy';
  }
  
  // 获取性能趋势
  getPerformanceTrend() {
    try {
      const metricsFiles = fs.readdirSync(this.config.metricsDir);
      const metrics = [];
      
      metricsFiles.forEach(file => {
        if (file.endsWith('.json')) {
          try {
            const metricPath = path.join(this.config.metricsDir, file);
            const metric = JSON.parse(fs.readFileSync(metricPath, 'utf8'));
            metrics.push(metric);
          } catch (error) {
            // 忽略错误的指标文�?          }
        }
      });
      
      if (metrics.length < 5) return 'insufficient_data';
      
      // 按时间排�?      metrics.sort((a, b) => a.timestamp - b.timestamp);
      
      // 计算性能趋势
      const recent = metrics.slice(-3);
      const older = metrics.slice(-6, -3);
      
      const recentAvg = recent.reduce((sum, m) => sum + (m.performance?.successRate || 0), 0) / recent.length;
      const olderAvg = older.reduce((sum, m) => sum + (m.performance?.successRate || 0), 0) / older.length;
      
      if (recentAvg > olderAvg + 0.1) return 'improving';
      if (recentAvg < olderAvg - 0.1) return 'declining';
      return 'stable';
    } catch (error) {
      return 'unknown';
    }
  }
  
  // 获取资源使用趋势
  getResourceUsageTrend() {
    try {
      const metricsFiles = fs.readdirSync(this.config.metricsDir);
      const metrics = [];
      
      metricsFiles.forEach(file => {
        if (file.endsWith('.json')) {
          try {
            const metricPath = path.join(this.config.metricsDir, file);
            const metric = JSON.parse(fs.readFileSync(metricPath, 'utf8'));
            metrics.push(metric);
          } catch (error) {
            // 忽略错误的指标文�?          }
        }
      });
      
      if (metrics.length < 5) return 'insufficient_data';
      
      // 按时间排�?      metrics.sort((a, b) => a.timestamp - b.timestamp);
      
      // 计算资源使用趋势
      const recent = metrics.slice(-3);
      const older = metrics.slice(-6, -3);
      
      const recentAvg = recent.reduce((sum, m) => sum + (m.system?.cpu?.usage || 0), 0) / recent.length;
      const olderAvg = older.reduce((sum, m) => sum + (m.system?.cpu?.usage || 0), 0) / older.length;
      
      if (recentAvg > olderAvg + 10) return 'increasing';
      if (recentAvg < olderAvg - 10) return 'decreasing';
      return 'stable';
    } catch (error) {
      return 'unknown';
    }
  }
  
  // 生成建议
  generateRecommendations(metrics, alerts) {
    const recommendations = [];
    
    // 系统资源建议
    if (metrics.system.cpu.usage > 70) {
      recommendations.push({
        id: `rec-${Date.now()}-cpu`,
        type: 'system',
        priority: 'high',
        message: 'Consider optimizing PCEC scheduler to reduce CPU usage',
        action: 'Adjust PCEC interval or reduce concurrent operations'
      });
    }
    
    if (metrics.system.memory.heapUsed / metrics.system.memory.heapTotal > 0.8) {
      recommendations.push({
        id: `rec-${Date.now()}-memory`,
        type: 'system',
        priority: 'medium',
        message: 'Memory usage is high, consider memory optimization',
        action: 'Implement better memory management in PCEC modules'
      });
    }
    
    // PCEC 建议
    if (metrics.pcec.nonSubstantialEvolutions >= 2) {
      recommendations.push({
        id: `rec-${Date.now()}-evolution`,
        type: 'pcec',
        priority: 'high',
        message: 'Consecutive non-substantial evolutions detected',
        action: 'Force override of core behavior pattern in next cycle'
      });
    }
    
    if (metrics.pcec.failedCycles > 2) {
      recommendations.push({
        id: `rec-${Date.now()}-failures`,
        type: 'pcec',
        priority: 'high',
        message: 'Multiple failed PCEC cycles detected',
        action: 'Investigate and resolve root causes of failures'
      });
    }
    
    // 进化建议
    if (metrics.evolution.evolutionTrend === 'declining') {
      recommendations.push({
        id: `rec-${Date.now()}-trend`,
        type: 'evolution',
        priority: 'high',
        message: 'Evolution trend is declining',
        action: 'Review and adjust PCEC parameters and evolution strategies'
      });
    }
    
    if (metrics.evolution.recentEvolutions === 0 && metrics.pcec.cycles > 0) {
      recommendations.push({
        id: `rec-${Date.now()}-activity`,
        type: 'evolution',
        priority: 'medium',
        message: 'No recent evolutions detected',
        action: 'Check PCEC scheduler and ensure evolution tasks are running'
      });
    }
    
    return recommendations;
  }
  
  // 获取监控状�?  getStatus() {
    try {
      const metrics = this.collectMetrics();
      const alerts = this.getCurrentAlerts();
      const dashboard = this.updateDashboard();
      
      return {
        timestamp: Date.now(),
        systemStatus: this.getSystemStatus(metrics.system),
        evolutionStatus: this.getEvolutionStatus(metrics.evolution),
        activeAlerts: alerts.length,
        criticalAlerts: alerts.filter(a => a.severity === 'high').length,
        metricsCollected: this.getMetricsCount(),
        dashboardLastUpdated: dashboard?.timestamp || 0,
        performanceTrend: this.getPerformanceTrend(),
        resourceUsageTrend: this.getResourceUsageTrend()
      };
    } catch (error) {
      this.log(`Error getting status: ${error.message}`);
      return {
        timestamp: Date.now(),
        systemStatus: 'unknown',
        evolutionStatus: 'unknown',
        activeAlerts: 0,
        criticalAlerts: 0,
        metricsCollected: 0,
        dashboardLastUpdated: 0,
        performanceTrend: 'unknown',
        resourceUsageTrend: 'unknown'
      };
    }
  }
  
  // 获取指标数量
  getMetricsCount() {
    try {
      const files = fs.readdirSync(this.config.metricsDir);
      return files.filter(f => f.endsWith('.json')).length;
    } catch (error) {
      return 0;
    }
  }
  
  // 清理旧指�?  cleanupOldMetrics(daysToKeep = 7) {
    try {
      const cutoffTime = Date.now() - (daysToKeep * 24 * 60 * 60 * 1000);
      const files = fs.readdirSync(this.config.metricsDir);
      let deletedCount = 0;
      
      files.forEach(file => {
        if (file.endsWith('.json')) {
          try {
            const metricPath = path.join(this.config.metricsDir, file);
            const metric = JSON.parse(fs.readFileSync(metricPath, 'utf8'));
            if (metric.timestamp < cutoffTime) {
              fs.unlinkSync(metricPath);
              deletedCount++;
            }
          } catch (error) {
            // 忽略错误的指标文�?          }
        }
      });
      
      this.log(`Cleaned up ${deletedCount} old metrics files`);
      return deletedCount;
    } catch (error) {
      this.log(`Error cleaning up old metrics: ${error.message}`);
      return 0;
    }
  }
  
  // 导出监控数据
  exportMonitoringData(format = 'json') {
    try {
      const data = {
        status: this.getStatus(),
        latestMetrics: this.collectMetrics(),
        alerts: this.getCurrentAlerts(),
        dashboard: this.updateDashboard(),
        exportTime: Date.now()
      };
      
      if (format === 'json') {
        const exportPath = path.join(this.config.dashboardDir, `export-${Date.now()}.json`);
        fs.writeFileSync(exportPath, JSON.stringify(data, null, 2));
        this.log(`Exported monitoring data to ${exportPath}`);
        return exportPath;
      }
      
      return null;
    } catch (error) {
      this.log(`Error exporting monitoring data: ${error.message}`);
      return null;
    }
  }
}

// 导出模块
module.exports = PCECMonitoringSystem;

// 导出默认实例
module.exports.default = new PCECMonitoringSystem();
