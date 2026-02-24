// 进化效果评估系统
// 负责评估智能体进化效果并生成评估报告

const fs = require('fs');
const path = require('path');

class EvolutionEvaluator {
  constructor() {
    this.evaluationHistory = [];
    this.evaluationMetrics = {
      // 量化指标
      tokenEfficiency: {
        name: 'Token 效率',
        description: '智能体执行任务的 Token 消耗效率',
        weight: 0.2
      },
      responseTime: {
        name: '响应时间',
        description: '智能体响应任务的速度',
        weight: 0.15
      },
      taskCompletionRate: {
        name: '任务完成率',
        description: '智能体成功完成任务的比例',
        weight: 0.2
      },
      errorRate: {
        name: '错误率',
        description: '智能体执行任务的错误发生频率',
        weight: 0.15
      },
      
      // 质性指标
      capabilityGrowth: {
        name: '能力增长',
        description: '智能体能力的提升程度',
        weight: 0.15
      },
      innovationScore: {
        name: '创新得分',
        description: '智能体提供创新解决方案的能力',
        weight: 0.15
      }
    };
    
    this.evaluationInterval = 3600000; // 1小时评估一次
    this.reportInterval = 86400000; // 24小时生成一次报告
  }
  
  // 初始化评估系统
  async init() {
    console.log('🔧 初始化进化效果评估系统...');
    
    // 加载历史评估数据
    this.loadEvaluationHistory();
    
    // 启动评估定时器
    this.startEvaluationTimer();
    
    // 启动报告定时器
    this.startReportTimer();
    
    console.log('✅ 进化效果评估系统初始化完成');
  }
  
  // 启动评估定时器
  startEvaluationTimer() {
    setInterval(async () => {
      await this.performEvaluation();
    }, this.evaluationInterval);
    
    console.log(`⏰ 评估定时器已启动，每 ${this.evaluationInterval / 1000 / 60} 分钟执行一次评估`);
  }
  
  // 启动报告定时器
  startReportTimer() {
    setInterval(async () => {
      await this.generateEvaluationReport();
    }, this.reportInterval);
    
    console.log(`⏰ 报告定时器已启动，每 ${this.reportInterval / 1000 / 60 / 60} 小时生成一次报告`);
  }
  
  // 执行评估
  async performEvaluation() {
    console.log('📊 执行进化效果评估...');
    
    try {
      // 收集评估数据
      const evaluationData = await this.collectEvaluationData();
      
      // 计算综合得分
      const overallScore = this.calculateOverallScore(evaluationData);
      
      // 分析评估结果
      const analysis = this.analyzeEvaluationResults(evaluationData, overallScore);
      
      // 生成评估记录
      const evaluationRecord = {
        timestamp: new Date().toISOString(),
        data: evaluationData,
        overallScore,
        analysis
      };
      
      // 保存评估记录
      this.evaluationHistory.push(evaluationRecord);
      this.saveEvaluationHistory();
      
      console.log(`✅ 评估完成，综合得分: ${overallScore.toFixed(2)}`);
      
      return evaluationRecord;
    } catch (error) {
      console.error('❌ 评估执行失败:', error.message);
      return null;
    }
  }
  
  // 收集评估数据
  async collectEvaluationData() {
    // 模拟数据收集，实际应用中需要从真实数据源获取
    return {
      tokenEfficiency: Math.random() * 50 + 50, // 50-100
      responseTime: Math.random() * 10 + 1, // 1-11秒
      taskCompletionRate: Math.random() * 30 + 70, // 70-100%
      errorRate: Math.random() * 10, // 0-10%
      capabilityGrowth: Math.random() * 40 + 60, // 60-100
      innovationScore: Math.random() * 30 + 70 // 70-100
    };
  }
  
  // 计算综合得分
  calculateOverallScore(evaluationData) {
    let weightedScore = 0;
    let totalWeight = 0;
    
    for (const [metric, data] of Object.entries(evaluationData)) {
      if (this.evaluationMetrics[metric]) {
        const weight = this.evaluationMetrics[metric].weight;
        weightedScore += data * weight;
        totalWeight += weight;
      }
    }
    
    return weightedScore / totalWeight;
  }
  
  // 分析评估结果
  analyzeEvaluationResults(evaluationData, overallScore) {
    const analysis = {
      strengths: [],
      weaknesses: [],
      recommendations: []
    };
    
    // 分析优势
    for (const [metric, value] of Object.entries(evaluationData)) {
      if (value > 80) {
        analysis.strengths.push(`${this.evaluationMetrics[metric].name}: ${value.toFixed(2)}`);
      }
    }
    
    // 分析劣势
    for (const [metric, value] of Object.entries(evaluationData)) {
      if (value < 60) {
        analysis.weaknesses.push(`${this.evaluationMetrics[metric].name}: ${value.toFixed(2)}`);
      }
    }
    
    // 生成建议
    if (evaluationData.tokenEfficiency < 60) {
      analysis.recommendations.push('优化提示词，减少 Token 消耗');
    }
    
    if (evaluationData.responseTime > 8) {
      analysis.recommendations.push('优化智能体响应速度，考虑使用缓存机制');
    }
    
    if (evaluationData.taskCompletionRate < 80) {
      analysis.recommendations.push('分析任务失败原因，针对性提升智能体能力');
    }
    
    if (evaluationData.errorRate > 5) {
      analysis.recommendations.push('加强错误处理机制，提高系统稳定性');
    }
    
    if (evaluationData.capabilityGrowth < 70) {
      analysis.recommendations.push('增加 PCEC 执行频率，加速能力增长');
    }
    
    if (evaluationData.innovationScore < 70) {
      analysis.recommendations.push('鼓励智能体提供创新解决方案，增加创新相关任务');
    }
    
    return analysis;
  }
  
  // 生成评估报告
  async generateEvaluationReport() {
    console.log('📋 生成进化效果评估报告...');
    
    try {
      // 执行最新评估
      const latestEvaluation = await this.performEvaluation();
      
      // 分析历史趋势
      const trendAnalysis = this.analyzeTrends();
      
      // 生成报告内容
      const reportContent = this.generateReportContent(latestEvaluation, trendAnalysis);
      
      // 保存报告
      const reportPath = path.join(__dirname, 'evaluation-reports', `${new Date().toISOString().split('T')[0]}-evaluation-report.md`);
      
      // 确保报告目录存在
      const reportDir = path.dirname(reportPath);
      if (!fs.existsSync(reportDir)) {
        fs.mkdirSync(reportDir, { recursive: true });
      }
      
      fs.writeFileSync(reportPath, reportContent);
      
      console.log(`✅ 评估报告生成完成: ${reportPath}`);
      
      return reportPath;
    } catch (error) {
      console.error('❌ 报告生成失败:', error.message);
      return null;
    }
  }
  
  // 分析历史趋势
  analyzeTrends() {
    if (this.evaluationHistory.length < 2) {
      return {
        hasTrend: false,
        message: '评估历史数据不足，无法分析趋势'
      };
    }
    
    const trends = {};
    const recentEvaluations = this.evaluationHistory.slice(-7); // 最近7次评估
    
    // 分析各项指标的趋势
    for (const metric of Object.keys(this.evaluationMetrics)) {
      const values = recentEvaluations.map(evaluation => evaluation.data[metric]);
      const firstValue = values[0];
      const lastValue = values[values.length - 1];
      const change = lastValue - firstValue;
      const changePercentage = (change / firstValue) * 100;
      
      trends[metric] = {
        name: this.evaluationMetrics[metric].name,
        change: change.toFixed(2),
        changePercentage: changePercentage.toFixed(2),
        trend: change > 0 ? '上升' : change < 0 ? '下降' : '稳定'
      };
    }
    
    // 分析综合得分趋势
    const overallScores = recentEvaluations.map(evaluation => evaluation.overallScore);
    const firstOverall = overallScores[0];
    const lastOverall = overallScores[overallScores.length - 1];
    const overallChange = lastOverall - firstOverall;
    const overallChangePercentage = (overallChange / firstOverall) * 100;
    
    return {
      hasTrend: true,
      metrics: trends,
      overall: {
        change: overallChange.toFixed(2),
        changePercentage: overallChangePercentage.toFixed(2),
        trend: overallChange > 0 ? '上升' : overallChange < 0 ? '下降' : '稳定'
      }
    };
  }
  
  // 生成报告内容
  generateReportContent(latestEvaluation, trendAnalysis) {
    const timestamp = new Date().toISOString();
    
    let report = `# 进化效果评估报告

## 报告信息
- **生成时间**: ${timestamp}
- **评估周期**: 24小时
- **评估智能体**: 绿茶智能体、大宗师智能体

## 最新评估结果

### 综合得分
**${latestEvaluation.overallScore.toFixed(2)}/100**

### 详细指标

| 指标 | 得分 | 权重 |
|------|------|------|
`;
    
    // 添加详细指标
    for (const [metric, value] of Object.entries(latestEvaluation.data)) {
      if (this.evaluationMetrics[metric]) {
        report += `| ${this.evaluationMetrics[metric].name} | ${value.toFixed(2)} | ${(this.evaluationMetrics[metric].weight * 100).toFixed(0)}% |
`;
      }
    }
    
    // 添加优势和劣势
    report += `
## 分析结果

### 优势
`;
    
    if (latestEvaluation.analysis.strengths.length > 0) {
      latestEvaluation.analysis.strengths.forEach(strength => {
        report += `- ${strength}
`;
      });
    } else {
      report += `- 暂无明显优势
`;
    }
    
    report += `
### 劣势
`;
    
    if (latestEvaluation.analysis.weaknesses.length > 0) {
      latestEvaluation.analysis.weaknesses.forEach(weakness => {
        report += `- ${weakness}
`;
      });
    } else {
      report += `- 暂无明显劣势
`;
    }
    
    // 添加建议
    report += `
### 改进建议
`;
    
    if (latestEvaluation.analysis.recommendations.length > 0) {
      latestEvaluation.analysis.recommendations.forEach(recommendation => {
        report += `- ${recommendation}
`;
      });
    } else {
      report += `- 保持当前进化策略
`;
    }
    
    // 添加趋势分析
    report += `
## 趋势分析
`;
    
    if (trendAnalysis.hasTrend) {
      report += `### 综合得分趋势
- **变化**: ${trendAnalysis.overall.change} (${trendAnalysis.overall.changePercentage}%)
- **趋势**: ${trendAnalysis.overall.trend}

### 指标趋势

| 指标 | 变化 | 趋势 |
|------|------|------|
`;
      
      for (const [metric, trend] of Object.entries(trendAnalysis.metrics)) {
        report += `| ${trend.name} | ${trend.change} (${trend.changePercentage}%) | ${trend.trend} |
`;
      }
    } else {
      report += `- ${trendAnalysis.message}
`;
    }
    
    // 添加总结
    report += `
## 总结
`;
    
    if (latestEvaluation.overallScore >= 80) {
      report += `智能体进化效果优秀，继续保持当前进化策略。`;
    } else if (latestEvaluation.overallScore >= 60) {
      report += `智能体进化效果良好，建议根据改进建议进行优化。`;
    } else {
      report += `智能体进化效果需要改进，建议调整进化策略，重点关注劣势指标。`;
    }
    
    return report;
  }
  
  // 加载评估历史
  loadEvaluationHistory() {
    const historyPath = path.join(__dirname, 'evaluation-history.json');
    
    if (fs.existsSync(historyPath)) {
      try {
        const historyData = fs.readFileSync(historyPath, 'utf8');
        this.evaluationHistory = JSON.parse(historyData);
        console.log(`✅ 加载了 ${this.evaluationHistory.length} 条评估历史记录`);
      } catch (error) {
        console.error('❌ 加载评估历史失败:', error.message);
        this.evaluationHistory = [];
      }
    }
  }
  
  // 保存评估历史
  saveEvaluationHistory() {
    const historyPath = path.join(__dirname, 'evaluation-history.json');
    
    try {
      const historyData = JSON.stringify(this.evaluationHistory, null, 2);
      fs.writeFileSync(historyPath, historyData);
      console.log(`✅ 保存了 ${this.evaluationHistory.length} 条评估历史记录`);
    } catch (error) {
      console.error('❌ 保存评估历史失败:', error.message);
    }
  }
  
  // 获取当前状态
  getStatus() {
    return {
      isRunning: true,
      evaluationMetrics: Object.keys(this.evaluationMetrics).length,
      evaluationHistoryCount: this.evaluationHistory.length,
      lastEvaluation: this.evaluationHistory.length > 0 ? this.evaluationHistory[this.evaluationHistory.length - 1] : null
    };
  }
}

// 如果直接运行此文件
if (require.main === module) {
  async function main() {
    const evaluator = new EvolutionEvaluator();
    await evaluator.init();
    
    // 执行一次评估并生成报告
    await evaluator.performEvaluation();
    await evaluator.generateEvaluationReport();
    
    console.log('\n✅ 进化效果评估系统启动成功');
    console.log('📊 系统将每小时执行一次评估');
    console.log('📋 每天生成一次评估报告');
    
    // 保持进程运行
    process.stdin.resume();
  }
  
  main().catch(error => {
    console.error('❌ 启动进化评估系统失败:', error.message);
    process.exit(1);
  });
}

module.exports = EvolutionEvaluator;