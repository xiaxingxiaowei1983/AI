const fs = require('fs');
const path = require('path');

console.log('=== 学习效果评估系统启动 ===\n');

// 配置参数
const learningDir = path.join(__dirname, 'learning');
const evaluationInterval = 60 * 60 * 1000; // 1小时评估一次
const evaluationPath = path.join(__dirname, 'learning', 'evaluation.json');

// 确保评估文件存在
if (!fs.existsSync(evaluationPath)) {
  fs.writeFileSync(evaluationPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    evaluations: [],
    metrics: {
      averageLearningScore: 0,
      averageApplicationScore: 0,
      totalLearningHours: 0,
      knowledgeRetentionRate: 0
    }
  }, null, 2));
}

/**
 * 生成时间戳
 */
function getTimestamp() {
  return new Date().toISOString();
}

/**
 * 读取学习记录
 */
function readLearningRecords() {
  const records = [];
  
  try {
    const files = fs.readdirSync(learningDir);
    files.forEach(file => {
      if (file.startsWith('learn-') && file.endsWith('.json')) {
        try {
          const data = JSON.parse(fs.readFileSync(path.join(learningDir, file), 'utf8'));
          records.push(data);
        } catch (error) {
          console.error(`读取学习记录失败: ${file}`, error.message);
        }
      }
    });
  } catch (error) {
    console.error('读取学习记录目录失败:', error.message);
  }
  
  return records;
}

/**
 * 读取进化报告
 */
function readEvolutionReports() {
  const reports = [];
  
  try {
    const files = fs.readdirSync(learningDir);
    files.forEach(file => {
      if (file.startsWith('evolution-') && file.endsWith('.json')) {
        try {
          const data = JSON.parse(fs.readFileSync(path.join(learningDir, file), 'utf8'));
          reports.push(data);
        } catch (error) {
          console.error(`读取进化报告失败: ${file}`, error.message);
        }
      }
    });
  } catch (error) {
    console.error('读取进化报告目录失败:', error.message);
  }
  
  return reports;
}

/**
 * 读取知识应用报告
 */
function readApplicationReports() {
  const reports = [];
  
  try {
    const files = fs.readdirSync(learningDir);
    files.forEach(file => {
      if (file.startsWith('application-report-') && file.endsWith('.json')) {
        try {
          const data = JSON.parse(fs.readFileSync(path.join(learningDir, file), 'utf8'));
          reports.push(data);
        } catch (error) {
          console.error(`读取应用报告失败: ${file}`, error.message);
        }
      }
    });
  } catch (error) {
    console.error('读取应用报告目录失败:', error.message);
  }
  
  return reports;
}

/**
 * 读取评估数据
 */
function readEvaluationData() {
  try {
    return JSON.parse(fs.readFileSync(evaluationPath, 'utf8'));
  } catch (error) {
    console.error('读取评估数据失败:', error.message);
    return {
      timestamp: getTimestamp(),
      evaluations: [],
      metrics: {
        averageLearningScore: 0,
        averageApplicationScore: 0,
        totalLearningHours: 0,
        knowledgeRetentionRate: 0
      }
    };
  }
}

/**
 * 保存评估数据
 */
function saveEvaluationData(evaluationData) {
  evaluationData.timestamp = getTimestamp();
  fs.writeFileSync(evaluationPath, JSON.stringify(evaluationData, null, 2));
}

/**
 * 评估学习效果
 */
function evaluateLearningEffectiveness() {
  console.log(`[${getTimestamp()}] 评估学习效果...`);
  
  const records = readLearningRecords();
  const reports = readEvolutionReports();
  const applicationReports = readApplicationReports();
  const evaluationData = readEvaluationData();
  
  // 计算学习指标
  const metrics = {
    totalLearnings: records.length,
    totalEvolutions: reports.length,
    totalInsights: 0,
    totalImprovements: 0,
    totalApplications: 0,
    learningScore: 0,
    applicationScore: 0,
    knowledgeRetentionRate: 0
  };
  
  // 分析学习记录
  records.forEach(record => {
    if (record.insights) {
      metrics.totalInsights += record.insights.length;
    }
  });
  
  // 分析进化报告
  reports.forEach(report => {
    if (report.insights) {
      metrics.totalInsights += report.insights.length;
    }
    if (report.improvements) {
      metrics.totalImprovements += report.improvements.length;
    }
  });
  
  // 分析应用报告
  applicationReports.forEach(report => {
    if (report.stats) {
      metrics.totalApplications += report.stats.totalApplications || 0;
    }
  });
  
  // 计算学习评分
  if (metrics.totalLearnings > 0) {
    metrics.learningScore = (metrics.totalInsights / metrics.totalLearnings) * 10;
  }
  
  // 计算应用评分
  if (metrics.totalLearnings > 0) {
    metrics.applicationScore = (metrics.totalApplications / metrics.totalLearnings) * 10;
  }
  
  // 计算知识保留率
  if (metrics.totalInsights > 0 && metrics.totalApplications > 0) {
    metrics.knowledgeRetentionRate = (metrics.totalApplications / metrics.totalInsights) * 100;
  }
  
  // 计算学习时间
  let totalLearningHours = 0;
  if (records.length >= 2) {
    const firstRecord = records[0];
    const lastRecord = records[records.length - 1];
    if (firstRecord.learnedAt && lastRecord.learnedAt) {
      const startTime = new Date(firstRecord.learnedAt);
      const endTime = new Date(lastRecord.learnedAt);
      totalLearningHours = (endTime - startTime) / (1000 * 60 * 60);
    }
  }
  
  // 创建评估记录
  const evaluation = {
    timestamp: getTimestamp(),
    metrics: metrics,
    summary: generateEvaluationSummary(metrics),
    recommendations: generateEvaluationRecommendations(metrics),
    improvements: identifyAreasForImprovement(metrics)
  };
  
  // 添加到评估历史
  evaluationData.evaluations.push(evaluation);
  
  // 更新总体指标
  updateOverallMetrics(evaluationData);
  
  // 保存评估数据
  saveEvaluationData(evaluationData);
  
  console.log(`[${getTimestamp()}] 学习效果评估完成！`);
  console.log(`   学习评分: ${metrics.learningScore.toFixed(2)}`);
  console.log(`   应用评分: ${metrics.applicationScore.toFixed(2)}`);
  console.log(`   知识保留率: ${metrics.knowledgeRetentionRate.toFixed(1)}%`);
  console.log(`   总学习时间: ${totalLearningHours.toFixed(1)} 小时`);
  
  return evaluation;
}

/**
 * 生成评估总结
 */
function generateEvaluationSummary(metrics) {
  const summary = [];
  
  summary.push(`共学习了 ${metrics.totalLearnings} 个资源，完成了 ${metrics.totalEvolutions} 次进化`);
  summary.push(`获得了 ${metrics.totalInsights} 个学习洞察和 ${metrics.totalImprovements} 项改进建议`);
  summary.push(`应用了 ${metrics.totalApplications} 次知识到实际任务`);
  summary.push(`学习评分: ${metrics.learningScore.toFixed(2)}/10`);
  summary.push(`应用评分: ${metrics.applicationScore.toFixed(2)}/10`);
  summary.push(`知识保留率: ${metrics.knowledgeRetentionRate.toFixed(1)}%`);
  
  return summary;
}

/**
 * 生成评估建议
 */
function generateEvaluationRecommendations(metrics) {
  const recommendations = [];
  
  if (metrics.learningScore < 5) {
    recommendations.push('建议增加学习资源的质量和数量');
  } else if (metrics.learningScore < 8) {
    recommendations.push('建议进一步提高学习资源的质量');
  }
  
  if (metrics.applicationScore < 5) {
    recommendations.push('建议增加知识应用的频率和广度');
  } else if (metrics.applicationScore < 8) {
    recommendations.push('建议提高知识应用的深度和效果');
  }
  
  if (metrics.knowledgeRetentionRate < 50) {
    recommendations.push('建议加强知识巩固和复习机制');
  } else if (metrics.knowledgeRetentionRate < 80) {
    recommendations.push('建议优化知识迁移和应用策略');
  }
  
  recommendations.push('建议定期评估学习效果，持续优化学习策略');
  recommendations.push('建议建立学习目标和评估标准，提高学习针对性');
  
  return recommendations;
}

/**
 * 识别改进领域
 */
function identifyAreasForImprovement(metrics) {
  const improvements = [];
  
  if (metrics.totalLearnings < 10) {
    improvements.push('增加学习资源的数量');
  }
  
  if (metrics.totalEvolutions < 5) {
    improvements.push('增加智能体进化的频率');
  }
  
  if (metrics.totalApplications < metrics.totalInsights) {
    improvements.push('提高知识应用的比例');
  }
  
  if (metrics.learningScore < 7) {
    improvements.push('优化资源评估和筛选算法');
  }
  
  if (metrics.applicationScore < 7) {
    improvements.push('改进知识应用机制');
  }
  
  return improvements;
}

/**
 * 更新总体指标
 */
function updateOverallMetrics(evaluationData) {
  if (evaluationData.evaluations.length === 0) {
    return;
  }
  
  let totalLearningScore = 0;
  let totalApplicationScore = 0;
  let totalLearningHours = 0;
  let totalKnowledgeRetention = 0;
  
  evaluationData.evaluations.forEach(eval => {
    totalLearningScore += eval.metrics.learningScore;
    totalApplicationScore += eval.metrics.applicationScore;
    totalKnowledgeRetention += eval.metrics.knowledgeRetentionRate;
  });
  
  const count = evaluationData.evaluations.length;
  evaluationData.metrics = {
    averageLearningScore: totalLearningScore / count,
    averageApplicationScore: totalApplicationScore / count,
    totalLearningHours: totalLearningHours,
    knowledgeRetentionRate: totalKnowledgeRetention / count
  };
}

/**
 * 生成学习效果报告
 */
function generateEffectivenessReport() {
  console.log(`[${getTimestamp()}] 生成学习效果报告...`);
  
  const evaluationData = readEvaluationData();
  
  // 生成报告
  const report = {
    timestamp: getTimestamp(),
    overallMetrics: evaluationData.metrics,
    recentEvaluations: evaluationData.evaluations.slice(-5), // 最近5次评估
    trends: analyzeLearningTrends(evaluationData.evaluations),
    recommendations: generateOverallRecommendations(evaluationData.metrics)
  };
  
  // 保存报告
  const reportPath = path.join(learningDir, `effectiveness-report-${Date.now()}.json`);
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  
  console.log(`[${getTimestamp()}] 学习效果报告生成成功！`);
  console.log(`   保存路径: ${reportPath}`);
  console.log(`   平均学习评分: ${evaluationData.metrics.averageLearningScore.toFixed(2)}`);
  console.log(`   平均应用评分: ${evaluationData.metrics.averageApplicationScore.toFixed(2)}`);
  console.log(`   平均知识保留率: ${evaluationData.metrics.knowledgeRetentionRate.toFixed(1)}%`);
  
  return report;
}

/**
 * 分析学习趋势
 */
function analyzeLearningTrends(evaluations) {
  if (evaluations.length < 2) {
    return { message: '数据不足，无法分析趋势' };
  }
  
  const trends = {
    learningScore: {
      current: evaluations[evaluations.length - 1].metrics.learningScore,
      previous: evaluations[evaluations.length - 2].metrics.learningScore,
      change: evaluations[evaluations.length - 1].metrics.learningScore - evaluations[evaluations.length - 2].metrics.learningScore
    },
    applicationScore: {
      current: evaluations[evaluations.length - 1].metrics.applicationScore,
      previous: evaluations[evaluations.length - 2].metrics.applicationScore,
      change: evaluations[evaluations.length - 1].metrics.applicationScore - evaluations[evaluations.length - 2].metrics.applicationScore
    },
    knowledgeRetention: {
      current: evaluations[evaluations.length - 1].metrics.knowledgeRetentionRate,
      previous: evaluations[evaluations.length - 2].metrics.knowledgeRetentionRate,
      change: evaluations[evaluations.length - 1].metrics.knowledgeRetentionRate - evaluations[evaluations.length - 2].metrics.knowledgeRetentionRate
    }
  };
  
  return trends;
}

/**
 * 生成总体建议
 */
function generateOverallRecommendations(metrics) {
  const recommendations = [];
  
  if (metrics.averageLearningScore < 6) {
    recommendations.push('整体学习效果有待提高，建议优化学习策略');
  } else if (metrics.averageLearningScore < 8) {
    recommendations.push('学习效果良好，建议进一步提升');
  } else {
    recommendations.push('学习效果优秀，建议保持并创新');
  }
  
  if (metrics.averageApplicationScore < 6) {
    recommendations.push('知识应用效果有待提高，建议加强应用机制');
  } else if (metrics.averageApplicationScore < 8) {
    recommendations.push('知识应用效果良好，建议进一步深化');
  } else {
    recommendations.push('知识应用效果优秀，建议拓展应用领域');
  }
  
  if (metrics.knowledgeRetentionRate < 60) {
    recommendations.push('知识保留率较低，建议加强知识巩固');
  } else if (metrics.knowledgeRetentionRate < 80) {
    recommendations.push('知识保留率良好，建议优化知识管理');
  } else {
    recommendations.push('知识保留率优秀，建议建立知识传承机制');
  }
  
  recommendations.push('建议定期更新学习目标和评估标准');
  recommendations.push('建议与其他智能体交流学习经验，共同进步');
  
  return recommendations;
}

/**
 * 执行学习效果评估
 */
async function executeLearningEvaluation() {
  try {
    console.log(`\n[${getTimestamp()}] 开始学习效果评估...`);
    
    // 1. 评估学习效果
    const evaluation = evaluateLearningEffectiveness();
    
    // 2. 生成效果报告
    generateEffectivenessReport();
    
    console.log(`[${getTimestamp()}] 学习效果评估完成！`);
  } catch (error) {
    console.error(`[${getTimestamp()}] 学习效果评估失败:`, error.message);
  }
}

/**
 * 启动学习效果评估系统
 */
async function startLearningEvaluation() {
  console.log('=== 学习效果评估系统初始化 ===');
  console.log(`评估间隔: ${evaluationInterval / 1000 / 60} 分钟`);
  console.log('');
  
  // 首次执行评估
  executeLearningEvaluation();
  
  // 定期执行评估
  setInterval(executeLearningEvaluation, evaluationInterval);
  
  console.log('=== 学习效果评估系统已启动 ===');
  console.log('系统将每1小时评估一次学习效果！');
  console.log('');
}

// 启动系统
startLearningEvaluation();