const fs = require('fs');
const path = require('path');

console.log('=== 学习进度监控服务启动 ===\n');

// 配置参数
const learningDir = path.join(__dirname, 'learning');
const monitorInterval = 60 * 60 * 1000; // 1小时监控一次
const reportDir = path.join(__dirname, 'learning', 'reports');

// 确保报告目录存在
if (!fs.existsSync(reportDir)) {
  fs.mkdirSync(reportDir, { recursive: true });
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
 * 分析学习进度
 */
function analyzeLearningProgress() {
  console.log(`[${getTimestamp()}] 分析学习进度...`);
  
  const records = readLearningRecords();
  const reports = readEvolutionReports();
  
  // 统计学习数据
  const stats = {
    totalLearnings: records.length,
    totalEvolutions: reports.length,
    totalInsights: 0,
    totalImprovements: 0,
    resourceTypes: {},
    learningTimeRange: {
      start: null,
      end: null
    }
  };
  
  // 分析学习记录
  records.forEach(record => {
    // 统计资源类型
    if (record.resource && record.resource.type) {
      stats.resourceTypes[record.resource.type] = (stats.resourceTypes[record.resource.type] || 0) + 1;
    }
    
    // 统计时间范围
    if (record.learnedAt) {
      if (!stats.learningTimeRange.start || new Date(record.learnedAt) < new Date(stats.learningTimeRange.start)) {
        stats.learningTimeRange.start = record.learnedAt;
      }
      if (!stats.learningTimeRange.end || new Date(record.learnedAt) > new Date(stats.learningTimeRange.end)) {
        stats.learningTimeRange.end = record.learnedAt;
      }
    }
  });
  
  // 分析进化报告
  reports.forEach(report => {
    if (report.insights) {
      stats.totalInsights += report.insights.length;
    }
    if (report.improvements) {
      stats.totalImprovements += report.improvements.length;
    }
  });
  
  return stats;
}

/**
 * 生成学习进度报告
 */
function generateLearningReport() {
  console.log(`[${getTimestamp()}] 生成学习进度报告...`);
  
  const stats = analyzeLearningProgress();
  const report = {
    timestamp: getTimestamp(),
    stats: stats,
    summary: generateSummary(stats),
    recommendations: generateRecommendations(stats)
  };
  
  // 保存报告
  const reportPath = path.join(reportDir, `report-${Date.now()}.json`);
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  
  console.log(`[${getTimestamp()}] 学习进度报告生成成功！`);
  console.log(`   保存路径: ${reportPath}`);
  console.log(`   学习记录: ${stats.totalLearnings} 个`);
  console.log(`   进化次数: ${stats.totalEvolutions} 次`);
  console.log(`   获得洞察: ${stats.totalInsights} 个`);
  console.log(`   改进建议: ${stats.totalImprovements} 项`);
  
  // 打印资源类型分布
  console.log(`   资源类型分布:`);
  Object.entries(stats.resourceTypes).forEach(([type, count]) => {
    console.log(`     - ${type}: ${count} 个`);
  });
  
  return report;
}

/**
 * 生成学习总结
 */
function generateSummary(stats) {
  const summary = [];
  
  summary.push(`共学习了 ${stats.totalLearnings} 个资源，完成了 ${stats.totalEvolutions} 次进化`);
  summary.push(`获得了 ${stats.totalInsights} 个学习洞察和 ${stats.totalImprovements} 项改进建议`);
  
  if (stats.learningTimeRange.start && stats.learningTimeRange.end) {
    const startTime = new Date(stats.learningTimeRange.start);
    const endTime = new Date(stats.learningTimeRange.end);
    const duration = (endTime - startTime) / (1000 * 60 * 60);
    
    summary.push(`学习时间范围: ${startTime.toLocaleString()} 至 ${endTime.toLocaleString()}`);
    summary.push(`学习持续时间: ${duration.toFixed(1)} 小时`);
  }
  
  if (Object.keys(stats.resourceTypes).length > 0) {
    summary.push(`学习资源类型分布: ${Object.entries(stats.resourceTypes).map(([type, count]) => `${type}: ${count}`).join(', ')}`);
  }
  
  return summary;
}

/**
 * 生成学习建议
 */
function generateRecommendations(stats) {
  const recommendations = [];
  
  if (stats.totalLearnings === 0) {
    recommendations.push('建议开始学习EvoMap上的资源');
  } else if (stats.totalLearnings < 10) {
    recommendations.push('建议增加学习资源的数量');
  }
  
  if (stats.totalEvolutions === 0) {
    recommendations.push('建议进行智能体进化');
  } else if (stats.totalEvolutions < 5) {
    recommendations.push('建议增加进化次数，提升智能体能力');
  }
  
  if (Object.keys(stats.resourceTypes).length < 3) {
    recommendations.push('建议学习更多类型的资源');
  }
  
  recommendations.push('建议定期检查EvoMap API状态，确保持续获取资源');
  recommendations.push('建议优化资源评估算法，提高学习效率');
  
  return recommendations;
}

/**
 * 启动学习进度监控服务
 */
async function startLearningMonitor() {
  console.log('=== 学习进度监控服务初始化 ===');
  console.log(`监控间隔: ${monitorInterval / 1000 / 60} 分钟`);
  console.log('');
  
  // 首次生成报告
  generateLearningReport();
  
  // 定期生成报告
  setInterval(generateLearningReport, monitorInterval);
  
  console.log('=== 学习进度监控服务已启动 ===');
  console.log('系统将每1小时生成一次学习进度报告！');
  console.log('');
}

// 启动服务
startLearningMonitor();