/**
 * 人生决策宗师数据收集系统
 * 用于收集和分析系统运行数据，支持基于数据的持续优化
 */

const fs = require('fs');
const path = require('path');

class LifeDecisionMasterDataCollection {
  constructor() {
    this.dataDir = path.join(__dirname, 'collected-data');
    this.ensureDataDirExists();
    this.initializeDataStructures();
    console.log('📊 Life Decision Master Data Collection System initialized');
  }

  // 确保数据目录存在
  ensureDataDirExists() {
    if (!fs.existsSync(this.dataDir)) {
      fs.mkdirSync(this.dataDir, { recursive: true });
    }
  }

  // 初始化数据结构
  initializeDataStructures() {
    this.capabilityUsageData = [];
    this.userInteractionData = [];
    this.performanceData = [];
    this.decisionOutcomeData = [];
  }

  // 收集能力使用数据
  collectCapabilityUsage(capabilityName, taskDescription, success, duration) {
    const usageData = {
      timestamp: new Date().toISOString(),
      capabilityName,
      taskDescription,
      success,
      duration,
      date: new Date().toISOString().split('T')[0]
    };

    this.capabilityUsageData.push(usageData);
    this.saveCapabilityUsageData(usageData);
    console.log(`📈 收集能力使用数据: ${capabilityName}, 成功: ${success}, 耗时: ${duration}ms`);
    return usageData;
  }

  // 收集用户交互数据
  collectUserInteraction(userId, interactionType, content, responseTime) {
    const interactionData = {
      timestamp: new Date().toISOString(),
      userId,
      interactionType,
      content,
      responseTime,
      date: new Date().toISOString().split('T')[0]
    };

    this.userInteractionData.push(interactionData);
    this.saveUserInteractionData(interactionData);
    console.log(`👥 收集用户交互数据: ${interactionType}, 响应时间: ${responseTime}ms`);
    return interactionData;
  }

  // 收集性能数据
  collectPerformanceData(metric, value, context) {
    const performanceData = {
      timestamp: new Date().toISOString(),
      metric,
      value,
      context,
      date: new Date().toISOString().split('T')[0]
    };

    this.performanceData.push(performanceData);
    this.savePerformanceData(performanceData);
    console.log(`⚡ 收集性能数据: ${metric}, 值: ${value}`);
    return performanceData;
  }

  // 收集决策结果数据
  collectDecisionOutcome(decisionType, inputData, outcome, userSatisfaction) {
    const outcomeData = {
      timestamp: new Date().toISOString(),
      decisionType,
      inputData,
      outcome,
      userSatisfaction,
      date: new Date().toISOString().split('T')[0]
    };

    this.decisionOutcomeData.push(outcomeData);
    this.saveDecisionOutcomeData(outcomeData);
    console.log(`🎯 收集决策结果数据: ${decisionType}, 满意度: ${userSatisfaction}`);
    return outcomeData;
  }

  // 保存能力使用数据
  saveCapabilityUsageData(data) {
    const filePath = path.join(this.dataDir, 'capability-usage.json');
    this.appendToJsonFile(filePath, data);
  }

  // 保存用户交互数据
  saveUserInteractionData(data) {
    const filePath = path.join(this.dataDir, 'user-interaction.json');
    this.appendToJsonFile(filePath, data);
  }

  // 保存性能数据
  savePerformanceData(data) {
    const filePath = path.join(this.dataDir, 'performance.json');
    this.appendToJsonFile(filePath, data);
  }

  // 保存决策结果数据
  saveDecisionOutcomeData(data) {
    const filePath = path.join(this.dataDir, 'decision-outcome.json');
    this.appendToJsonFile(filePath, data);
  }

  // 追加数据到JSON文件
  appendToJsonFile(filePath, newData) {
    try {
      let existingData = [];
      
      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        if (fileContent.trim()) {
          existingData = JSON.parse(fileContent);
        }
      }
      
      existingData.push(newData);
      
      // 限制文件大小，保留最近1000条记录
      if (existingData.length > 1000) {
        existingData = existingData.slice(-1000);
      }
      
      fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));
    } catch (error) {
      console.error('❌ 保存数据失败:', error.message);
    }
  }

  // 生成数据报告
  generateDataReport(timeRange = '7d') {
    console.log(`📋 生成数据报告 (时间范围: ${timeRange})`);
    
    const report = {
      timestamp: new Date().toISOString(),
      timeRange,
      summary: {
        totalCapabilityUsages: this.getTotalCapabilityUsages(),
        totalUserInteractions: this.getTotalUserInteractions(),
        averageResponseTime: this.getAverageResponseTime(),
        successRate: this.getSuccessRate(),
        mostUsedCapabilities: this.getMostUsedCapabilities(5),
        userSatisfaction: this.getUserSatisfaction()
      },
      details: {
        capabilityUsage: this.getCapabilityUsageDetails(),
        performance: this.getPerformanceDetails(),
        userInteraction: this.getUserInteractionDetails()
      }
    };

    // 保存报告
    const reportPath = path.join(this.dataDir, 'reports');
    if (!fs.existsSync(reportPath)) {
      fs.mkdirSync(reportPath, { recursive: true });
    }

    const reportFileName = `report-${Date.now()}.json`;
    const reportFilePath = path.join(reportPath, reportFileName);
    fs.writeFileSync(reportFilePath, JSON.stringify(report, null, 2));

    console.log(`✅ 数据报告已生成: ${reportFileName}`);
    return report;
  }

  // 获取总能力使用次数
  getTotalCapabilityUsages() {
    const filePath = path.join(this.dataDir, 'capability-usage.json');
    return this.getRecordCount(filePath);
  }

  // 获取总用户交互次数
  getTotalUserInteractions() {
    const filePath = path.join(this.dataDir, 'user-interaction.json');
    return this.getRecordCount(filePath);
  }

  // 获取平均响应时间
  getAverageResponseTime() {
    const filePath = path.join(this.dataDir, 'user-interaction.json');
    const data = this.readJsonFile(filePath);
    
    if (data.length === 0) return 0;
    
    const totalResponseTime = data.reduce((sum, item) => sum + (item.responseTime || 0), 0);
    return totalResponseTime / data.length;
  }

  // 获取成功率
  getSuccessRate() {
    const filePath = path.join(this.dataDir, 'capability-usage.json');
    const data = this.readJsonFile(filePath);
    
    if (data.length === 0) return 0;
    
    const successfulCount = data.filter(item => item.success).length;
    return (successfulCount / data.length) * 100;
  }

  // 获取最常用的能力
  getMostUsedCapabilities(limit = 5) {
    const filePath = path.join(this.dataDir, 'capability-usage.json');
    const data = this.readJsonFile(filePath);
    
    const usageCounts = {};
    data.forEach(item => {
      const capabilityName = item.capabilityName;
      usageCounts[capabilityName] = (usageCounts[capabilityName] || 0) + 1;
    });

    return Object.entries(usageCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);
  }

  // 获取用户满意度
  getUserSatisfaction() {
    const filePath = path.join(this.dataDir, 'decision-outcome.json');
    const data = this.readJsonFile(filePath);
    
    if (data.length === 0) return 0;
    
    const totalSatisfaction = data.reduce((sum, item) => sum + (item.userSatisfaction || 0), 0);
    return totalSatisfaction / data.length;
  }

  // 获取能力使用详情
  getCapabilityUsageDetails() {
    const filePath = path.join(this.dataDir, 'capability-usage.json');
    return this.readJsonFile(filePath);
  }

  // 获取性能详情
  getPerformanceDetails() {
    const filePath = path.join(this.dataDir, 'performance.json');
    return this.readJsonFile(filePath);
  }

  // 获取用户交互详情
  getUserInteractionDetails() {
    const filePath = path.join(this.dataDir, 'user-interaction.json');
    return this.readJsonFile(filePath);
  }

  // 获取文件记录数
  getRecordCount(filePath) {
    const data = this.readJsonFile(filePath);
    return data.length;
  }

  // 读取JSON文件
  readJsonFile(filePath) {
    try {
      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        if (fileContent.trim()) {
          return JSON.parse(fileContent);
        }
      }
      return [];
    } catch (error) {
      console.error('❌ 读取文件失败:', error.message);
      return [];
    }
  }

  // 清理旧数据
  cleanupOldData(daysToKeep = 30) {
    console.log(`🧹 清理 ${daysToKeep} 天前的旧数据`);
    
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);
    const cutoffTimestamp = cutoffDate.toISOString();

    const filesToClean = [
      'capability-usage.json',
      'user-interaction.json',
      'performance.json',
      'decision-outcome.json'
    ];

    filesToClean.forEach(fileName => {
      const filePath = path.join(this.dataDir, fileName);
      if (fs.existsSync(filePath)) {
        const data = this.readJsonFile(filePath);
        const filteredData = data.filter(item => item.timestamp >= cutoffTimestamp);
        fs.writeFileSync(filePath, JSON.stringify(filteredData, null, 2));
        console.log(`✅ 清理 ${fileName}: 保留 ${filteredData.length} 条记录`);
      }
    });
  }

  // 获取系统健康状态
  getSystemHealthStatus() {
    console.log('🏥 检查系统健康状态');
    
    const healthStatus = {
      timestamp: new Date().toISOString(),
      dataCollectionStatus: 'active',
      storageStatus: this.checkStorageStatus(),
      recentActivity: this.getRecentActivity(),
      recommendations: this.generateRecommendations()
    };

    return healthStatus;
  }

  // 检查存储状态
  checkStorageStatus() {
    const totalSize = this.calculateTotalDataSize();
    const maxSize = 100 * 1024 * 1024; // 100MB
    const usagePercentage = (totalSize / maxSize) * 100;

    return {
      totalSize,
      maxSize,
      usagePercentage,
      status: usagePercentage < 80 ? 'healthy' : 'warning'
    };
  }

  // 计算总数据大小
  calculateTotalDataSize() {
    let totalSize = 0;
    const filesToCheck = [
      'capability-usage.json',
      'user-interaction.json',
      'performance.json',
      'decision-outcome.json'
    ];

    filesToCheck.forEach(fileName => {
      const filePath = path.join(this.dataDir, fileName);
      if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath);
        totalSize += stats.size;
      }
    });

    return totalSize;
  }

  // 获取最近活动
  getRecentActivity() {
    const recentData = {
      lastCapabilityUsage: this.getLastRecord('capability-usage.json'),
      lastUserInteraction: this.getLastRecord('user-interaction.json'),
      lastPerformanceRecord: this.getLastRecord('performance.json'),
      lastDecisionOutcome: this.getLastRecord('decision-outcome.json')
    };

    return recentData;
  }

  // 获取最后一条记录
  getLastRecord(fileName) {
    const filePath = path.join(this.dataDir, fileName);
    const data = this.readJsonFile(filePath);
    return data.length > 0 ? data[data.length - 1] : null;
  }

  // 生成建议
  generateRecommendations() {
    const recommendations = [];
    const successRate = this.getSuccessRate();
    const avgResponseTime = this.getAverageResponseTime();
    const satisfaction = this.getUserSatisfaction();

    if (successRate < 80) {
      recommendations.push('成功率低于80%，建议优化核心能力执行逻辑');
    }

    if (avgResponseTime > 500) {
      recommendations.push('平均响应时间超过500ms，建议优化性能');
    }

    if (satisfaction < 4) {
      recommendations.push('用户满意度低于4，建议改进决策质量');
    }

    const mostUsed = this.getMostUsedCapabilities(1);
    if (mostUsed.length > 0) {
      recommendations.push(`最常用能力: ${mostUsed[0].name} (${mostUsed[0].count}次使用)`);
    }

    return recommendations.length > 0 ? recommendations : ['系统运行正常，建议继续监控'];
  }
}

// 导出单例实例
const lifeDecisionMasterDataCollection = new LifeDecisionMasterDataCollection();

module.exports = {
  LifeDecisionMasterDataCollection,
  lifeDecisionMasterDataCollection
};

// 示例用法
if (require.main === module) {
  const dataCollection = lifeDecisionMasterDataCollection;
  
  // 测试数据收集
  console.log('🔄 测试数据收集系统...');
  
  // 模拟收集数据
  dataCollection.collectCapabilityUsage('决策风险评估', '评估职业决策风险', true, 120);
  dataCollection.collectCapabilityUsage('能量状态预测', '预测一周能量状态', true, 95);
  dataCollection.collectCapabilityUsage('价值观冲突解决', '解决工作与家庭冲突', false, 150);
  
  dataCollection.collectUserInteraction('user-123', 'decision_request', '我需要职业建议', 250);
  dataCollection.collectUserInteraction('user-123', 'follow_up', '请详细解释', 180);
  
  dataCollection.collectPerformanceData('response_time', 215, '决策分析');
  dataCollection.collectPerformanceData('memory_usage', 12.5, '系统状态');
  
  dataCollection.collectDecisionOutcome('career', { question: '职业选择' }, { recommendation: '建议内部晋升' }, 4.5);
  
  // 生成报告
  const report = dataCollection.generateDataReport('1d');
  console.log('📊 报告摘要:', report.summary);
  
  // 检查系统健康状态
  const healthStatus = dataCollection.getSystemHealthStatus();
  console.log('🏥 系统健康状态:', healthStatus.status);
  console.log('💡 建议:', healthStatus.recommendations);
}
