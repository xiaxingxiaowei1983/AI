/**
 * 报告机制系统 (Reporting System)
 * 实现仅向指定接收者报告的机制，生成结构化的进化报告
 */

class ReportingSystem {
  constructor() {
    this.reportingTo = '陈婷（剑锋传奇）';
    this.feishuId = 'ou_4d9197bf2f8cf48a7097b17b623e3bd3';
    this.exclusiveReporting = true;
    this.externalDisclosure = false;
    this.behaviorStability = true;
    this.reports = [];
    this.maxReports = 50;
    this.securityLevel = 'HIGH';
  }

  // 生成进化报告
  generateEvolutionReport(evolutionData) {
    const { cycle, timestamp, evolutionType, evolutionResult, explosionResult, product } = evolutionData;
    
    const report = {
      id: `report_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      title: `PCEC Evolution Report - Cycle ${cycle}`,
      timestamp: timestamp,
      cycle: cycle,
      reportingTo: this.reportingTo,
      feishuId: this.feishuId,
      securityLevel: this.securityLevel,
      content: {
        evolutionType: evolutionType,
        evolutionResult: evolutionResult,
        explosionResult: explosionResult,
        product: product,
        summary: this.generateSummary(evolutionData)
      },
      status: 'GENERATED',
      createdAt: Date.now()
    };
    
    this.reports.push(report);
    
    // 限制报告数量
    if (this.reports.length > this.maxReports) {
      this.reports.shift();
    }
    
    return report;
  }

  // 生成报告摘要
  generateSummary(evolutionData) {
    const { evolutionType, evolutionResult, explosionResult, product } = evolutionData;
    
    let summary = `PCEC Cycle ${evolutionData.cycle} 完成了一次${this.getEvolutionTypeName(evolutionType)}进化。`;
    
    if (explosionResult && explosionResult.question) {
      summary += ` 思维爆炸问题：${explosionResult.question.substring(0, 50)}...`;
    }
    
    if (product && product.type) {
      summary += ` 生成了${this.getProductTypeName(product.type)}类型的进化产物。`;
    }
    
    return summary;
  }

  // 获取进化类型名称
  getEvolutionTypeName(type) {
    const typeNames = {
      'newFeature': '新功能',
      'newAbstract': '新抽象',
      'newLever': '新杠杆'
    };
    return typeNames[type] || type;
  }

  // 获取产物类型名称
  getProductTypeName(type) {
    const typeNames = {
      'capabilityShape': '能力轮廓',
      'defaultStrategy': '默认策略',
      'behaviorRule': '行为规则'
    };
    return typeNames[type] || type;
  }

  // 发送报告
  sendReport(reportId) {
    const report = this.reports.find(r => r.id === reportId);
    if (!report) {
      console.error('Report not found');
      return false;
    }
    
    // 检查是否允许发送报告
    if (!this.exclusiveReporting) {
      console.error('Exclusive reporting is disabled');
      return false;
    }
    
    // 模拟发送报告
    console.log(`[REPORT] Sending report to ${this.reportingTo} (Feishu ID: ${this.feishuId})`);
    console.log(`[REPORT] Title: ${report.title}`);
    console.log(`[REPORT] Summary: ${report.content.summary}`);
    console.log(`[REPORT] Security Level: ${report.securityLevel}`);
    
    // 更新报告状态
    report.status = 'SENT';
    report.sentAt = Date.now();
    
    return true;
  }

  // 发送摘要报告
  sendSummaryReport() {
    const recentReports = this.reports
      .filter(report => report.status === 'SENT')
      .sort((a, b) => b.sentAt - a.sentAt)
      .slice(0, 10);
    
    if (recentReports.length === 0) {
      console.error('No sent reports found');
      return false;
    }
    
    const summaryReport = {
      id: `summary_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      title: `PCEC Summary Report - ${new Date().toISOString().split('T')[0]}`,
      timestamp: new Date().toISOString(),
      reportingTo: this.reportingTo,
      feishuId: this.feishuId,
      securityLevel: this.securityLevel,
      content: {
        totalReports: recentReports.length,
        reports: recentReports.map(report => ({
          id: report.id,
          title: report.title,
          timestamp: report.timestamp,
          summary: report.content.summary
        })),
        summary: `最近${recentReports.length}次PCEC进化的摘要报告`
      },
      status: 'SENT',
      createdAt: Date.now(),
      sentAt: Date.now()
    };
    
    // 模拟发送摘要报告
    console.log(`[REPORT] Sending summary report to ${this.reportingTo} (Feishu ID: ${this.feishuId})`);
    console.log(`[REPORT] Title: ${summaryReport.title}`);
    console.log(`[REPORT] Total Reports: ${summaryReport.content.totalReports}`);
    console.log(`[REPORT] Security Level: ${summaryReport.securityLevel}`);
    
    return summaryReport;
  }

  // 获取报告
  getReport(reportId) {
    return this.reports.find(report => report.id === reportId);
  }

  // 获取所有报告
  getAllReports() {
    return this.reports;
  }

  // 获取已发送的报告
  getSentReports() {
    return this.reports.filter(report => report.status === 'SENT');
  }

  // 获取报告状态
  getReportStatus(reportId) {
    const report = this.reports.find(r => r.id === reportId);
    return report ? report.status : 'NOT_FOUND';
  }

  // 检查报告安全性
  checkReportSecurity(report) {
    if (!report) return false;
    
    // 检查报告接收者
    if (report.reportingTo !== this.reportingTo) {
      console.error('Report recipient mismatch');
      return false;
    }
    
    // 检查报告安全性
    if (report.securityLevel !== this.securityLevel) {
      console.error('Report security level mismatch');
      return false;
    }
    
    return true;
  }

  // 清理报告
  cleanupReports() {
    // 保留最近的20个报告
    if (this.reports.length > 20) {
      this.reports = this.reports.slice(-20);
    }
  }

  // 导出报告
  exportReport(reportId) {
    const report = this.reports.find(r => r.id === reportId);
    if (!report) {
      console.error('Report not found');
      return null;
    }
    
    // 检查报告安全性
    if (!this.checkReportSecurity(report)) {
      console.error('Report security check failed');
      return null;
    }
    
    return {
      ...report,
      exportedAt: Date.now()
    };
  }

  // 获取报告系统状态
  getStatus() {
    return {
      reportingTo: this.reportingTo,
      feishuId: this.feishuId,
      exclusiveReporting: this.exclusiveReporting,
      externalDisclosure: this.externalDisclosure,
      behaviorStability: this.behaviorStability,
      totalReports: this.reports.length,
      sentReports: this.reports.filter(r => r.status === 'SENT').length,
      securityLevel: this.securityLevel
    };
  }

  // 更新报告配置
  updateConfig(config) {
    if (config.reportingTo) {
      this.reportingTo = config.reportingTo;
    }
    if (config.feishuId) {
      this.feishuId = config.feishuId;
    }
    if (config.exclusiveReporting !== undefined) {
      this.exclusiveReporting = config.exclusiveReporting;
    }
    if (config.externalDisclosure !== undefined) {
      this.externalDisclosure = config.externalDisclosure;
    }
    if (config.behaviorStability !== undefined) {
      this.behaviorStability = config.behaviorStability;
    }
    if (config.securityLevel) {
      this.securityLevel = config.securityLevel;
    }
  }
}

// 导出单例实例
const reportingSystem = new ReportingSystem();

module.exports = {
  ReportingSystem,
  reportingSystem
};
