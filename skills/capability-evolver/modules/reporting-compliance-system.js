/**
 * 报告规则系统
 * 确保所有进化结果仅向指定管理员报告
 * 为 PCEC 系统提供严格的报告合规性
 */

const fs = require('fs');
const path = require('path');

class ReportingComplianceSystem {
  constructor(config = {}) {
    this.config = {
      baseDir: config.baseDir || path.join(__dirname, '..', 'data'),
      configPath: config.configPath || path.join(__dirname, '..', 'data', 'reporting-config.json'),
      reportsDir: config.reportsDir || path.join(__dirname, '..', 'data', 'reports'),
      logFile: config.logFile || path.join(__dirname, '..', '..', '..', 'logs', 'reporting-compliance.log'),
      adminInfo: {
        name: '陈婷（剑锋传奇）',
        feishuId: 'ou_4d9197bf2f8cf48a7097b17b623e3bd3'
      },
      ...config
    };
    
    this.ensureDirectories();
    this.initializeConfig();
  }
  
  // 确保目录存在
  ensureDirectories() {
    const directories = [
      this.config.baseDir,
      this.config.reportsDir,
      path.dirname(this.config.logFile)
    ];
    
    directories.forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        this.log(`Created directory: ${dir}`);
      }
    });
  }
  
  // 初始化配置
  initializeConfig() {
    const configData = {
      reportingTo: this.config.adminInfo.name,
      feishuId: this.config.adminInfo.feishuId,
      exclusiveReporting: true,
      externalDisclosure: false,
      behaviorStability: true,
      complianceLevel: 'STRICT',
      updated: Date.now()
    };
    
    if (!fs.existsSync(this.config.configPath)) {
      fs.writeFileSync(this.config.configPath, JSON.stringify(configData, null, 2));
      this.log('Initialized reporting compliance configuration');
    } else {
      // 更新现有配置
      const existingConfig = JSON.parse(fs.readFileSync(this.config.configPath, 'utf8'));
      const updatedConfig = {
        ...existingConfig,
        ...configData,
        updated: Date.now()
      };
      fs.writeFileSync(this.config.configPath, JSON.stringify(updatedConfig, null, 2));
      this.log('Updated reporting compliance configuration');
    }
  }
  
  // 日志函数
  log(message) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [Reporting Compliance] ${message}`;
    console.log(logMessage);
    
    // 写入日志文件
    fs.appendFileSync(this.config.logFile, logMessage + '\n', { flag: 'a' });
  }
  
  // 生成报告
  generateReport(evolutionResult, cycle) {
    this.log(`Generating report for PCEC Cycle ${cycle}...`);
    
    const report = {
      id: `report-${cycle}-${Date.now()}`,
      cycle: cycle,
      recipient: this.config.adminInfo.name,
      feishuId: this.config.adminInfo.feishuId,
      subject: `PCEC Cycle ${cycle} Evolution Report`,
      timestamp: Date.now(),
      classification: 'CONFIDENTIAL - Internal Evolution Only',
      evolution: {
        type: evolutionResult.type,
        message: evolutionResult.message,
        success: evolutionResult.success,
        timestamp: Date.now()
      },
      systemStatus: {
        pcecCycle: cycle,
        timestamp: Date.now(),
        environment: {
          nodeVersion: process.version,
          platform: process.platform,
          arch: process.arch
        }
      },
      compliance: {
        exclusiveReporting: true,
        externalDisclosure: false,
        behaviorStability: true,
        complianceLevel: 'STRICT'
      }
    };
    
    // 保存报告
    this.saveReport(report);
    
    this.log(`Generated report: ${report.id}`);
    return report;
  }
  
  // 保存报告
  saveReport(report) {
    const reportPath = path.join(this.config.reportsDir, `${report.id}.json`);
    
    try {
      fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
      this.log(`Saved report: ${report.id}`);
    } catch (error) {
      this.log(`Error saving report: ${error.message}`);
    }
  }
  
  // 验证报告合规性
  validateReportingCompliance() {
    this.log('Validating reporting compliance...');
    
    try {
      const config = JSON.parse(fs.readFileSync(this.config.configPath, 'utf8'));
      
      const validationResults = {
        valid: true,
        issues: []
      };
      
      // 验证报告对象是否正确
      if (config.reportingTo !== this.config.adminInfo.name) {
        validationResults.valid = false;
        validationResults.issues.push('Incorrect reporting recipient');
      }
      
      // 验证飞书ID是否正确
      if (config.feishuId !== this.config.adminInfo.feishuId) {
        validationResults.valid = false;
        validationResults.issues.push('Incorrect Feishu ID');
      }
      
      // 验证是否启用独家报告
      if (!config.exclusiveReporting) {
        validationResults.valid = false;
        validationResults.issues.push('Exclusive reporting not enabled');
      }
      
      // 验证是否禁用外部披露
      if (config.externalDisclosure) {
        validationResults.valid = false;
        validationResults.issues.push('External disclosure is enabled');
      }
      
      // 验证行为稳定性设置
      if (!config.behaviorStability) {
        validationResults.valid = false;
        validationResults.issues.push('Behavior stability not enabled');
      }
      
      if (validationResults.valid) {
        this.log('Reporting compliance validation passed');
      } else {
        this.log(`Reporting compliance validation failed: ${validationResults.issues.join(', ')}`);
        // 自动修复问题
        this.initializeConfig();
        this.log('Automatically fixed reporting compliance issues');
      }
      
      return validationResults;
    } catch (error) {
      this.log(`Error validating reporting compliance: ${error.message}`);
      // 初始化配置
      this.initializeConfig();
      return {
        valid: false,
        issues: ['Configuration error'],
        fixed: true
      };
    }
  }
  
  // 获取所有报告
  getAllReports(limit = 100) {
    try {
      const files = fs.readdirSync(this.config.reportsDir);
      const reports = [];
      
      files.forEach(file => {
        if (file.endsWith('.json')) {
          const reportPath = path.join(this.config.reportsDir, file);
          try {
            const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
            reports.push(report);
          } catch (error) {
            this.log(`Error reading report file ${file}: ${error.message}`);
          }
        }
      });
      
      // 按时间排序，返回最新的报告
      reports.sort((a, b) => b.timestamp - a.timestamp);
      
      return limit > 0 ? reports.slice(0, limit) : reports;
    } catch (error) {
      this.log(`Error getting reports: ${error.message}`);
      return [];
    }
  }
  
  // 获取特定周期的报告
  getReportByCycle(cycle) {
    const allReports = this.getAllReports();
    return allReports.find(report => report.cycle === cycle);
  }
  
  // 清理旧报告
  cleanupOldReports(daysToKeep = 30) {
    this.log(`Cleaning up old reports (keeping last ${daysToKeep} days)...`);
    
    const cutoffTime = Date.now() - (daysToKeep * 24 * 60 * 60 * 1000);
    
    try {
      const files = fs.readdirSync(this.config.reportsDir);
      let deletedCount = 0;
      
      files.forEach(file => {
        if (file.endsWith('.json')) {
          const reportPath = path.join(this.config.reportsDir, file);
          try {
            const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
            if (report.timestamp < cutoffTime) {
              fs.unlinkSync(reportPath);
              deletedCount++;
            }
          } catch (error) {
            this.log(`Error processing report file ${file}: ${error.message}`);
          }
        }
      });
      
      this.log(`Cleaned up ${deletedCount} old reports`);
      return deletedCount;
    } catch (error) {
      this.log(`Error cleaning up old reports: ${error.message}`);
      return 0;
    }
  }
  
  // 分析报告趋势
  analyzeReportTrends() {
    try {
      const reports = this.getAllReports();
      
      if (reports.length === 0) {
        return {
          totalReports: 0,
          trends: {},
          successRate: 0
        };
      }
      
      // 分析成功/失败率
      const successfulReports = reports.filter(report => report.evolution.success);
      const successRate = (successfulReports.length / reports.length * 100).toFixed(2);
      
      // 分析进化类型分布
      const typeDistribution = {};
      reports.forEach(report => {
        const type = report.evolution.type;
        typeDistribution[type] = (typeDistribution[type] || 0) + 1;
      });
      
      // 分析报告频率
      const reportTimestamps = reports.map(report => report.timestamp).sort((a, b) => a - b);
      const averageTimeBetweenReports = reportTimestamps.length > 1 ? 
        (reportTimestamps[reportTimestamps.length - 1] - reportTimestamps[0]) / (reportTimestamps.length - 1) : 0;
      
      this.log(`Report trend analysis: ${reports.length} total reports, ${successRate}% success rate`);
      
      return {
        totalReports: reports.length,
        successRate,
        typeDistribution,
        averageTimeBetweenReports: averageTimeBetweenReports / 1000 / 60, // 转换为分钟
        mostCommonType: Object.keys(typeDistribution).reduce((a, b) => typeDistribution[a] > typeDistribution[b] ? a : b)
      };
    } catch (error) {
      this.log(`Error analyzing report trends: ${error.message}`);
      return {
        error: error.message
      };
    }
  }
  
  // 检查报告规则设置
  checkReportingRules() {
    this.log('Checking reporting rules...');
    
    // 确保报告规则正确设置
    this.initializeConfig();
    
    const config = JSON.parse(fs.readFileSync(this.config.configPath, 'utf8'));
    
    this.log(`Reporting rules updated: exclusive reporting to ${config.reportingTo}`);
    this.log(`Administrator Feishu ID recorded: ${config.feishuId}`);
    
    return config;
  }
  
  // 验证管理员身份
  validateAdmin(adminInfo) {
    this.log('Validating admin identity...');
    
    const isValid = (
      adminInfo.name === this.config.adminInfo.name &&
      adminInfo.feishuId === this.config.adminInfo.feishuId
    );
    
    if (isValid) {
      this.log('Admin validation passed');
    } else {
      this.log('Admin validation failed');
    }
    
    return isValid;
  }
  
  // 获取配置状态
  getStatus() {
    try {
      const config = JSON.parse(fs.readFileSync(this.config.configPath, 'utf8'));
      const reports = this.getAllReports();
      
      return {
        config: config,
        adminInfo: this.config.adminInfo,
        reportCount: reports.length,
        lastReport: reports.length > 0 ? reports[0].timestamp : null,
        complianceLevel: config.complianceLevel || 'STRICT'
      };
    } catch (error) {
      this.log(`Error getting status: ${error.message}`);
      return {
        error: error.message
      };
    }
  }
  
  // 模拟发送报告（实际环境中应实现真实的发送逻辑）
  sendReport(report) {
    this.log(`Sending report to ${report.recipient} (simulated)...`);
    
    // 在实际环境中，这里应该实现真实的发送逻辑，例如：
    // 1. 通过飞书API发送消息
    // 2. 发送邮件
    // 3. 其他通信方式
    
    // 模拟发送成功
    this.log(`Report sent successfully (simulated): ${report.id}`);
    
    // 更新报告状态
    report.sent = true;
    report.sentAt = Date.now();
    
    // 保存更新后的报告
    const reportPath = path.join(this.config.reportsDir, `${report.id}.json`);
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    return {
      success: true,
      reportId: report.id,
      recipient: report.recipient
    };
  }
  
  // 生成合规性报告
  generateComplianceReport() {
    this.log('Generating compliance report...');
    
    const status = this.getStatus();
    const reportTrends = this.analyzeReportTrends();
    
    const complianceReport = {
      id: `compliance-report-${Date.now()}`,
      timestamp: Date.now(),
      title: 'PCEC Reporting Compliance Report',
      status: status,
      trends: reportTrends,
      complianceChecks: {
        exclusiveReporting: status.config.exclusiveReporting,
        externalDisclosure: status.config.externalDisclosure,
        behaviorStability: status.config.behaviorStability,
        adminValidation: true
      },
      recommendations: this.generateComplianceRecommendations()
    };
    
    // 保存合规性报告
    const reportPath = path.join(this.config.reportsDir, `${complianceReport.id}.json`);
    fs.writeFileSync(reportPath, JSON.stringify(complianceReport, null, 2));
    
    this.log(`Generated compliance report: ${complianceReport.id}`);
    return complianceReport;
  }
  
  // 生成合规性建议
  generateComplianceRecommendations() {
    return [
      '定期验证报告配置，确保管理员信息正确',
      '清理过期报告，保持报告目录整洁',
      '监控报告发送状态，确保所有报告都能成功送达',
      '定期分析报告趋势，优化进化策略',
      '确保报告系统的安全性，防止未授权访问'
    ];
  }
}

// 导出模块
module.exports = ReportingComplianceSystem;

// 导出默认实例
module.exports.default = new ReportingComplianceSystem();