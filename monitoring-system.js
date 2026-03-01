/**
 * 系统监控系统
 * 用于收集、分析和报告系统性能指标
 */

const fs = require('fs');
const path = require('path');
const fsExtra = require('fs-extra');

// 监控数据存储路径
const MONITORING_DIR = path.join(__dirname, '.trae', 'monitoring');
const LOGS_DIR = path.join(__dirname, 'logs');

// 确保目录存在
fsExtra.ensureDirSync(MONITORING_DIR);
fsExtra.ensureDirSync(LOGS_DIR);

class MonitoringSystem {
  constructor() {
    this.metrics = {
      tokenUsage: {},
      responseTime: {},
      taskCompletion: {},
      userSatisfaction: {},
      errorRate: {}
    };
    this.healthChecks = {};
    this.alerts = [];
    this.initialized = false;
    this.config = {
      healthCheck: {
        memoryThreshold: 80, // 内存使用阈值（%）
        cpuThreshold: 80, // CPU使用阈值（%）
        diskThreshold: 90, // 磁盘使用阈值（%）
        errorRateThreshold: 0.2, // 错误率阈值
        responseTimeThreshold: 1000, // 响应时间阈值（ms）
        checkInterval: 30000, // 健康检查间隔（ms）
        alertCooldown: 60000 // 告警冷却时间（ms）
      },
      alert: {
        levels: ['INFO', 'WARNING', 'ERROR', 'CRITICAL'],
        thresholds: {
          memory: { warning: 70, error: 85, critical: 95 },
          cpu: { warning: 70, error: 85, critical: 95 },
          errorRate: { warning: 0.1, error: 0.3, critical: 0.5 },
          responseTime: { warning: 500, error: 1500, critical: 3000 }
        }
      }
    };
  }

  /**
   * 初始化监控系统
   */
  initialize() {
    if (this.initialized) {
      console.log('监控系统已经初始化');
      return;
    }

    console.log('开始初始化监控系统...');

    // 初始化指标存储
    this._initializeMetrics();

    // 初始化健康检查
    this._initializeHealthChecks();

    // 加载历史数据
    this._loadHistoricalData();

    this.initialized = true;
    console.log('监控系统初始化成功');
  }

  /**
   * 初始化指标存储
   */
  _initializeMetrics() {
    this.metrics = {
      tokenUsage: {
        total: 0,
        byAgent: {},
        trends: [],
        lastUpdated: null
      },
      responseTime: {
        average: 0,
        maximum: 0,
        minimum: Infinity,
        byAgent: {},
        trends: [],
        lastUpdated: null
      },
      taskCompletion: {
        total: 0,
        successful: 0,
        failed: 0,
        byAgent: {},
        trends: [],
        lastUpdated: null
      },
      userSatisfaction: {
        score: 0,
        feedbackCount: 0,
        trends: [],
        lastUpdated: null
      },
      errorRate: {
        totalErrors: 0,
        rate: 0,
        byType: {},
        trends: [],
        lastUpdated: null
      }
    };
  }

  /**
   * 初始化健康检查
   */
  _initializeHealthChecks() {
    this.healthChecks = {
      agents: {},
      services: {
        git: { status: 'UNKNOWN', lastCheck: null },
        evomap: { status: 'UNKNOWN', lastCheck: null },
        knowledgeBase: { status: 'UNKNOWN', lastCheck: null },
        capabilityTree: { status: 'UNKNOWN', lastCheck: null }
      },
      system: {
        memory: { usage: 0, total: 0, lastCheck: null },
        cpu: { usage: 0, lastCheck: null },
        disk: { usage: 0, total: 0, lastCheck: null }
      }
    };
  }

  /**
   * 加载历史数据
   */
  _loadHistoricalData() {
    const metricsPath = path.join(MONITORING_DIR, 'metrics.json');
    const alertsPath = path.join(MONITORING_DIR, 'alerts.json');

    if (fs.existsSync(metricsPath)) {
      try {
        const historicalMetrics = JSON.parse(fs.readFileSync(metricsPath, 'utf8'));
        this.metrics = { ...this.metrics, ...historicalMetrics };
        console.log('加载历史监控数据成功');
      } catch (error) {
        console.error('加载历史监控数据失败:', error.message);
      }
    }

    if (fs.existsSync(alertsPath)) {
      try {
        const historicalAlerts = JSON.parse(fs.readFileSync(alertsPath, 'utf8'));
        this.alerts = historicalAlerts;
        console.log('加载历史告警数据成功');
      } catch (error) {
        console.error('加载历史告警数据失败:', error.message);
      }
    }
  }

  /**
   * 收集Token使用数据
   */
  collectTokenUsage(agentId, tokens) {
    if (!this.initialized) {
      this.initialize();
    }

    this.metrics.tokenUsage.total += tokens;
    
    if (!this.metrics.tokenUsage.byAgent[agentId]) {
      this.metrics.tokenUsage.byAgent[agentId] = 0;
    }
    this.metrics.tokenUsage.byAgent[agentId] += tokens;

    this.metrics.tokenUsage.trends.push({
      timestamp: new Date().toISOString(),
      tokens: tokens,
      agentId: agentId
    });

    // 只保留最近1000条趋势数据
    if (this.metrics.tokenUsage.trends.length > 1000) {
      this.metrics.tokenUsage.trends = this.metrics.tokenUsage.trends.slice(-1000);
    }

    this.metrics.tokenUsage.lastUpdated = new Date().toISOString();
    this._saveMetrics();
  }

  /**
   * 收集响应时间数据
   */
  collectResponseTime(agentId, timeMs) {
    if (!this.initialized) {
      this.initialize();
    }

    // 更新统计数据
    const totalResponses = this.metrics.responseTime.trends.length + 1;
    const newAverage = ((this.metrics.responseTime.average * (totalResponses - 1)) + timeMs) / totalResponses;
    this.metrics.responseTime.average = newAverage;
    this.metrics.responseTime.maximum = Math.max(this.metrics.responseTime.maximum, timeMs);
    this.metrics.responseTime.minimum = Math.min(this.metrics.responseTime.minimum, timeMs);

    if (!this.metrics.responseTime.byAgent[agentId]) {
      this.metrics.responseTime.byAgent[agentId] = [];
    }
    this.metrics.responseTime.byAgent[agentId].push(timeMs);

    this.metrics.responseTime.trends.push({
      timestamp: new Date().toISOString(),
      timeMs: timeMs,
      agentId: agentId
    });

    // 只保留最近1000条趋势数据
    if (this.metrics.responseTime.trends.length > 1000) {
      this.metrics.responseTime.trends = this.metrics.responseTime.trends.slice(-1000);
    }

    this.metrics.responseTime.lastUpdated = new Date().toISOString();
    this._saveMetrics();
  }

  /**
   * 收集任务完成数据
   */
  collectTaskCompletion(agentId, success, taskType) {
    if (!this.initialized) {
      this.initialize();
    }

    this.metrics.taskCompletion.total++;
    if (success) {
      this.metrics.taskCompletion.successful++;
    } else {
      this.metrics.taskCompletion.failed++;
    }

    if (!this.metrics.taskCompletion.byAgent[agentId]) {
      this.metrics.taskCompletion.byAgent[agentId] = {
        total: 0,
        successful: 0,
        failed: 0,
        byType: {}
      };
    }

    const agentStats = this.metrics.taskCompletion.byAgent[agentId];
    agentStats.total++;
    if (success) {
      agentStats.successful++;
    } else {
      agentStats.failed++;
    }

    if (!agentStats.byType[taskType]) {
      agentStats.byType[taskType] = {
        total: 0,
        successful: 0,
        failed: 0
      };
    }

    const typeStats = agentStats.byType[taskType];
    typeStats.total++;
    if (success) {
      typeStats.successful++;
    } else {
      typeStats.failed++;
    }

    this.metrics.taskCompletion.trends.push({
      timestamp: new Date().toISOString(),
      success: success,
      agentId: agentId,
      taskType: taskType
    });

    // 只保留最近1000条趋势数据
    if (this.metrics.taskCompletion.trends.length > 1000) {
      this.metrics.taskCompletion.trends = this.metrics.taskCompletion.trends.slice(-1000);
    }

    this.metrics.taskCompletion.lastUpdated = new Date().toISOString();
    this._saveMetrics();
  }

  /**
   * 收集用户满意度数据
   */
  collectUserSatisfaction(score, feedback) {
    if (!this.initialized) {
      this.initialize();
    }

    const totalFeedback = this.metrics.userSatisfaction.feedbackCount + 1;
    const newScore = ((this.metrics.userSatisfaction.score * this.metrics.userSatisfaction.feedbackCount) + score) / totalFeedback;
    this.metrics.userSatisfaction.score = newScore;
    this.metrics.userSatisfaction.feedbackCount = totalFeedback;

    this.metrics.userSatisfaction.trends.push({
      timestamp: new Date().toISOString(),
      score: score,
      feedback: feedback
    });

    // 只保留最近100条趋势数据
    if (this.metrics.userSatisfaction.trends.length > 100) {
      this.metrics.userSatisfaction.trends = this.metrics.userSatisfaction.trends.slice(-100);
    }

    this.metrics.userSatisfaction.lastUpdated = new Date().toISOString();
    this._saveMetrics();
  }

  /**
   * 收集错误数据
   */
  collectError(errorType, errorMessage, agentId) {
    if (!this.initialized) {
      this.initialize();
    }

    this.metrics.errorRate.totalErrors++;
    const totalTasks = this.metrics.taskCompletion.total || 1;
    this.metrics.errorRate.rate = this.metrics.errorRate.totalErrors / totalTasks;

    if (!this.metrics.errorRate.byType[errorType]) {
      this.metrics.errorRate.byType[errorType] = 0;
    }
    this.metrics.errorRate.byType[errorType]++;

    this.metrics.errorRate.trends.push({
      timestamp: new Date().toISOString(),
      errorType: errorType,
      errorMessage: errorMessage,
      agentId: agentId
    });

    // 只保留最近1000条趋势数据
    if (this.metrics.errorRate.trends.length > 1000) {
      this.metrics.errorRate.trends = this.metrics.errorRate.trends.slice(-1000);
    }

    this.metrics.errorRate.lastUpdated = new Date().toISOString();
    this._saveMetrics();

    // 生成告警
    this._generateAlert('ERROR', errorType, errorMessage, agentId);
  }

  /**
   * 执行健康检查
   */
  performHealthCheck() {
    if (!this.initialized) {
      this.initialize();
    }

    console.log('执行系统健康检查...');

    // 检查系统资源
    this._checkSystemResources();

    // 检查服务状态
    this._checkServices();

    // 检查智能体状态
    this._checkAgents();

    // 保存健康检查结果
    this._saveHealthChecks();

    console.log('健康检查完成');
    return this.healthChecks;
  }

  /**
   * 检查系统资源
   */
  _checkSystemResources() {
    try {
      const os = require('os');
      
      // 内存检查
      const totalMemory = os.totalmem();
      const freeMemory = os.freemem();
      const memoryUsage = ((totalMemory - freeMemory) / totalMemory) * 100;
      
      this.healthChecks.system.memory = {
        usage: memoryUsage,
        total: totalMemory,
        free: freeMemory,
        lastCheck: new Date().toISOString()
      };

      // CPU检查
      const cpus = os.cpus();
      const avgUsage = cpus.reduce((sum, cpu) => {
        const idle = cpu.times.idle;
        const total = Object.values(cpu.times).reduce((t, v) => t + v, 0);
        return sum + (100 - (idle / total) * 100);
      }, 0) / cpus.length;

      this.healthChecks.system.cpu = {
        usage: avgUsage,
        count: cpus.length,
        lastCheck: new Date().toISOString()
      };

      // 磁盘检查
      const diskUsage = fs.statSync(__dirname);
      this.healthChecks.system.disk = {
        usage: diskUsage.size,
        lastCheck: new Date().toISOString()
      };

    } catch (error) {
      console.error('检查系统资源失败:', error.message);
    }
  }

  /**
   * 检查服务状态
   */
  _checkServices() {
    // 检查Git状态
    try {
      const { execSync } = require('child_process');
      execSync('git status', { timeout: 5000 });
      this.healthChecks.services.git = {
        status: 'HEALTHY',
        lastCheck: new Date().toISOString()
      };
    } catch (error) {
      this.healthChecks.services.git = {
        status: 'UNHEALTHY',
        error: error.message,
        lastCheck: new Date().toISOString()
      };
      this._generateAlert('WARNING', 'Git Service', 'Git服务不可用', 'system');
    }

    // 检查EvoMap状态
    try {
      const evomapStatus = path.join(__dirname, 'evomap-connection', 'status.json');
      if (fs.existsSync(evomapStatus)) {
        this.healthChecks.services.evomap = {
          status: 'HEALTHY',
          lastCheck: new Date().toISOString()
        };
      } else {
        this.healthChecks.services.evomap = {
          status: 'UNHEALTHY',
          error: 'EvoMap连接文件不存在',
          lastCheck: new Date().toISOString()
        };
        this._generateAlert('WARNING', 'EvoMap Service', 'EvoMap服务不可用', 'system');
      }
    } catch (error) {
      this.healthChecks.services.evomap = {
        status: 'UNHEALTHY',
        error: error.message,
        lastCheck: new Date().toISOString()
      };
      this._generateAlert('WARNING', 'EvoMap Service', 'EvoMap服务不可用', 'system');
    }

    // 检查知识库状态
    try {
      const knowledgeBasePath = path.join(__dirname, '.trae', 'knowledge-base', 'knowledge-items.json');
      if (fs.existsSync(knowledgeBasePath)) {
        this.healthChecks.services.knowledgeBase = {
          status: 'HEALTHY',
          lastCheck: new Date().toISOString()
        };
      } else {
        this.healthChecks.services.knowledgeBase = {
          status: 'UNHEALTHY',
          error: '知识库文件不存在',
          lastCheck: new Date().toISOString()
        };
        this._generateAlert('WARNING', 'Knowledge Base Service', '知识库服务不可用', 'system');
      }
    } catch (error) {
      this.healthChecks.services.knowledgeBase = {
        status: 'UNHEALTHY',
        error: error.message,
        lastCheck: new Date().toISOString()
      };
      this._generateAlert('WARNING', 'Knowledge Base Service', '知识库服务不可用', 'system');
    }

    // 检查能力树状态
    try {
      const capabilityTreePath = path.join(__dirname, 'capabilities', 'capability-tree.js');
      if (fs.existsSync(capabilityTreePath)) {
        this.healthChecks.services.capabilityTree = {
          status: 'HEALTHY',
          lastCheck: new Date().toISOString()
        };
      } else {
        this.healthChecks.services.capabilityTree = {
          status: 'UNHEALTHY',
          error: '能力树文件不存在',
          lastCheck: new Date().toISOString()
        };
        this._generateAlert('WARNING', 'Capability Tree Service', '能力树服务不可用', 'system');
      }
    } catch (error) {
      this.healthChecks.services.capabilityTree = {
        status: 'UNHEALTHY',
        error: error.message,
        lastCheck: new Date().toISOString()
      };
      this._generateAlert('WARNING', 'Capability Tree Service', '能力树服务不可用', 'system');
    }
  }

  /**
   * 检查智能体状态
   */
  _checkAgents() {
    const agentsDir = path.join(__dirname, 'agents');
    try {
      const agentDirs = fs.readdirSync(agentsDir);
      agentDirs.forEach(agentDir => {
        const agentPath = path.join(agentsDir, agentDir);
        if (fs.statSync(agentPath).isDirectory()) {
          const agentPrompt = path.join(agentPath, 'agent.prompt');
          if (fs.existsSync(agentPrompt)) {
            this.healthChecks.agents[agentDir] = {
              status: 'HEALTHY',
              lastCheck: new Date().toISOString()
            };
          } else {
            this.healthChecks.agents[agentDir] = {
              status: 'UNHEALTHY',
              error: '智能体提示词文件不存在',
              lastCheck: new Date().toISOString()
            };
            this._generateAlert('WARNING', 'Agent Status', `${agentDir}智能体不可用`, 'system');
          }
        }
      });
    } catch (error) {
      console.error('检查智能体状态失败:', error.message);
    }
  }

  /**
   * 生成告警
   */
  _generateAlert(level, title, message, source) {
    const alert = {
      id: `alert_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      level: level,
      title: title,
      message: message,
      source: source,
      timestamp: new Date().toISOString(),
      status: 'ACTIVE'
    };

    this.alerts.push(alert);

    // 只保留最近100条告警
    if (this.alerts.length > 100) {
      this.alerts = this.alerts.slice(-100);
    }

    // 写入日志
    this._writeAlertLog(alert);

    console.log(`[${level}] ${title}: ${message} (${source})`);
  }

  /**
   * 写入告警日志
   */
  _writeAlertLog(alert) {
    const logPath = path.join(LOGS_DIR, 'monitoring-alerts.log');
    const logEntry = `[${alert.timestamp}] [${alert.level}] ${alert.title}: ${alert.message} (${alert.source})\n`;
    fs.appendFileSync(logPath, logEntry);
  }

  /**
   * 保存指标数据
   */
  _saveMetrics() {
    const metricsPath = path.join(MONITORING_DIR, 'metrics.json');
    fs.writeFileSync(metricsPath, JSON.stringify(this.metrics, null, 2));
  }

  /**
   * 保存健康检查结果
   */
  _saveHealthChecks() {
    const healthChecksPath = path.join(MONITORING_DIR, 'health-checks.json');
    fs.writeFileSync(healthChecksPath, JSON.stringify(this.healthChecks, null, 2));
  }

  /**
   * 获取监控报告
   */
  getMonitoringReport() {
    if (!this.initialized) {
      this.initialize();
    }

    const report = {
      timestamp: new Date().toISOString(),
      metrics: this.metrics,
      healthChecks: this.healthChecks,
      alerts: this.alerts.filter(alert => alert.status === 'ACTIVE'),
      summary: {
        overallStatus: this._calculateOverallStatus(),
        errorRate: this.metrics.errorRate.rate,
        taskSuccessRate: this.metrics.taskCompletion.total > 0 ? 
          this.metrics.taskCompletion.successful / this.metrics.taskCompletion.total : 0,
        averageResponseTime: this.metrics.responseTime.average,
        tokenUsage: this.metrics.tokenUsage.total
      }
    };

    // 保存报告
    const reportPath = path.join(MONITORING_DIR, `report_${Date.now()}.json`);
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    // 写入日志
    this._writeReportLog(report);

    return report;
  }

  /**
   * 计算整体状态
   */
  _calculateOverallStatus() {
    // 检查系统资源
    const memoryUsage = this.healthChecks.system.memory?.usage || 0;
    const cpuUsage = this.healthChecks.system.cpu?.usage || 0;

    // 检查服务状态
    const unhealthyServices = Object.values(this.healthChecks.services || {}).filter(
      service => service.status === 'UNHEALTHY'
    ).length;

    // 检查智能体状态
    const unhealthyAgents = Object.values(this.healthChecks.agents || {}).filter(
      agent => agent.status === 'UNHEALTHY'
    ).length;

    // 检查错误率
    const errorRate = this.metrics.errorRate.rate || 0;

    if (memoryUsage > 90 || cpuUsage > 90 || unhealthyServices > 2 || unhealthyAgents > 3 || errorRate > 0.5) {
      return 'CRITICAL';
    } else if (memoryUsage > 75 || cpuUsage > 75 || unhealthyServices > 0 || unhealthyAgents > 0 || errorRate > 0.2) {
      return 'WARNING';
    } else {
      return 'HEALTHY';
    }
  }

  /**
   * 写入报告日志
   */
  _writeReportLog(report) {
    const logPath = path.join(LOGS_DIR, 'monitoring-reports.log');
    const logEntry = `[${report.timestamp}] Status: ${report.summary.overallStatus}, Error Rate: ${(report.summary.errorRate * 100).toFixed(2)}%, Success Rate: ${(report.summary.taskSuccessRate * 100).toFixed(2)}%, Avg Response Time: ${report.summary.averageResponseTime.toFixed(2)}ms\n`;
    fs.appendFileSync(logPath, logEntry);
  }

  /**
   * 启动定期健康检查
   */
  startHealthChecks() {
    if (!this.initialized) {
      this.initialize();
    }

    console.log(`启动定期健康检查，间隔: ${this.config.healthCheck.checkInterval / 1000}秒`);

    // 立即执行一次健康检查
    this.performHealthCheck();

    // 设置定时检查
    this.healthCheckInterval = setInterval(() => {
      this.performHealthCheck();
      
      // 检查是否需要生成监控报告
      if (Math.random() < 0.1) { // 10%的概率生成报告
        this.getMonitoringReport();
      }
    }, this.config.healthCheck.checkInterval);

    return this.healthCheckInterval;
  }

  /**
   * 停止定期健康检查
   */
  stopHealthChecks() {
    if (this.healthCheckInterval) {
      clearInterval(this.healthCheckInterval);
      this.healthCheckInterval = null;
      console.log('定期健康检查已停止');
    }
  }

  /**
   * 生成告警（考虑冷却时间）
   */
  _generateAlert(level, title, message, source) {
    // 检查是否在冷却期内
    const cooldownPeriod = this.config.healthCheck.alertCooldown;
    const recentAlerts = this.alerts.filter(alert => {
      const alertTime = new Date(alert.timestamp).getTime();
      const now = Date.now();
      return alert.title === title && alert.source === source && (now - alertTime) < cooldownPeriod;
    });

    if (recentAlerts.length > 0) {
      console.log(`告警冷却中: ${title} (${source})`);
      return null;
    }

    const alert = {
      id: `alert_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      level: level,
      title: title,
      message: message,
      source: source,
      timestamp: new Date().toISOString(),
      status: 'ACTIVE'
    };

    this.alerts.push(alert);

    // 只保留最近100条告警
    if (this.alerts.length > 100) {
      this.alerts = this.alerts.slice(-100);
    }

    // 写入日志
    this._writeAlertLog(alert);

    console.log(`[${level}] ${title}: ${message} (${source})`);
    return alert;
  }

  /**
   * 根据指标值确定告警级别
   */
  _determineAlertLevel(metricType, value) {
    const thresholds = this.config.alert.thresholds[metricType];
    if (!thresholds) {
      return 'INFO';
    }

    if (value >= thresholds.critical) {
      return 'CRITICAL';
    } else if (value >= thresholds.error) {
      return 'ERROR';
    } else if (value >= thresholds.warning) {
      return 'WARNING';
    } else {
      return 'INFO';
    }
  }

  /**
   * 检查指标并生成告警
   */
  _checkMetricsAndAlert() {
    // 检查内存使用
    const memoryUsage = this.healthChecks.system.memory?.usage || 0;
    const memoryLevel = this._determineAlertLevel('memory', memoryUsage);
    if (memoryLevel !== 'INFO') {
      this._generateAlert(memoryLevel, 'Memory Usage', `内存使用率过高: ${memoryUsage.toFixed(2)}%`, 'system');
    }

    // 检查CPU使用
    const cpuUsage = this.healthChecks.system.cpu?.usage || 0;
    const cpuLevel = this._determineAlertLevel('cpu', cpuUsage);
    if (cpuLevel !== 'INFO') {
      this._generateAlert(cpuLevel, 'CPU Usage', `CPU使用率过高: ${cpuUsage.toFixed(2)}%`, 'system');
    }

    // 检查错误率
    const errorRate = this.metrics.errorRate.rate || 0;
    const errorLevel = this._determineAlertLevel('errorRate', errorRate);
    if (errorLevel !== 'INFO') {
      this._generateAlert(errorLevel, 'Error Rate', `错误率过高: ${(errorRate * 100).toFixed(2)}%`, 'system');
    }

    // 检查响应时间
    const avgResponseTime = this.metrics.responseTime.average || 0;
    const responseLevel = this._determineAlertLevel('responseTime', avgResponseTime);
    if (responseLevel !== 'INFO') {
      this._generateAlert(responseLevel, 'Response Time', `平均响应时间过长: ${avgResponseTime.toFixed(2)}ms`, 'system');
    }
  }

  /**
   * 执行健康检查（增强版）
   */
  performHealthCheck() {
    if (!this.initialized) {
      this.initialize();
    }

    console.log('执行系统健康检查...');

    // 检查系统资源
    this._checkSystemResources();

    // 检查服务状态
    this._checkServices();

    // 检查智能体状态
    this._checkAgents();

    // 检查指标并生成告警
    this._checkMetricsAndAlert();

    // 保存健康检查结果
    this._saveHealthChecks();

    console.log('健康检查完成');
    return this.healthChecks;
  }

  /**
   * 与其他系统集成
   */
  integrateWithOtherSystems() {
    // 与PCEC系统集成
    try {
      const pcecModule = require('./pcec-cycle');
      if (pcecModule) {
        console.log('监控系统与PCEC系统集成成功');
        // 为PCEC系统添加监控方法
        if (pcecModule.executePCECCycle) {
          const originalExecute = pcecModule.executePCECCycle;
          pcecModule.executePCECCycle = async () => {
            const startTime = Date.now();
            const result = await originalExecute();
            const duration = Date.now() - startTime;
            this.collectResponseTime('pcec', duration);
            this.collectTaskCompletion('pcec', result !== null, 'pcec_cycle');
            return result;
          };
        }
      }
    } catch (error) {
      console.error('监控系统与PCEC系统集成失败:', error.message);
    }

    // 与能力树系统集成
    try {
      const capabilityTreeModule = require('./capabilities/capability-tree');
      if (capabilityTreeModule) {
        console.log('监控系统与能力树系统集成成功');
      }
    } catch (error) {
      console.error('监控系统与能力树系统集成失败:', error.message);
    }

    // 与知识管理系统集成
    try {
      const knowledgeBaseModule = require('./knowledge-base');
      if (knowledgeBaseModule) {
        console.log('监控系统与知识管理系统集成成功');
      }
    } catch (error) {
      console.error('监控系统与知识管理系统集成失败:', error.message);
    }

    // 与Git集成工具集成
    try {
      const gitIntegrationModule = require('./tools/git-integration');
      if (gitIntegrationModule) {
        console.log('监控系统与Git集成工具集成成功');
      }
    } catch (error) {
      console.error('监控系统与Git集成工具集成失败:', error.message);
    }
  }

  /**
   * 获取系统健康状态摘要
   */
  getHealthSummary() {
    const healthChecks = this.performHealthCheck();
    const report = this.getMonitoringReport();

    return {
      timestamp: new Date().toISOString(),
      overallStatus: report.summary.overallStatus,
      systemResources: {
        memory: healthChecks.system.memory,
        cpu: healthChecks.system.cpu
      },
      services: Object.keys(healthChecks.services || {}).reduce((acc, service) => {
        acc[service] = healthChecks.services[service].status;
        return acc;
      }, {}),
      agents: Object.keys(healthChecks.agents || {}).reduce((acc, agent) => {
        acc[agent] = healthChecks.agents[agent].status;
        return acc;
      }, {}),
      metrics: {
        errorRate: report.summary.errorRate,
        successRate: report.summary.taskSuccessRate,
        averageResponseTime: report.summary.averageResponseTime,
        tokenUsage: report.summary.tokenUsage
      },
      activeAlerts: report.alerts.length
    };
  }
}

// 导出单例
const monitoringSystem = new MonitoringSystem();

// 执行初始化
if (require.main === module) {
  monitoringSystem.initialize();
  console.log('监控系统初始化完成');
  
  // 执行健康检查
  const healthCheckResult = monitoringSystem.performHealthCheck();
  console.log('健康检查结果:', JSON.stringify(healthCheckResult, null, 2));
  
  // 生成监控报告
  const report = monitoringSystem.getMonitoringReport();
  console.log('监控报告:', JSON.stringify(report.summary, null, 2));
  
  // 与其他系统集成
  monitoringSystem.integrateWithOtherSystems();
}

module.exports = {
  MonitoringSystem,
  monitoringSystem
};