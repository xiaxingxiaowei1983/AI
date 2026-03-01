const fs = require('fs');
const path = require('path');

console.log('=== 学习成果应用系统启动 ===\n');

// 配置参数
const learningDir = path.join(__dirname, 'learning');
const applicationInterval = 30 * 60 * 1000; // 30分钟应用一次
const knowledgeBasePath = path.join(__dirname, 'learning', 'knowledge-base.json');

// 确保知识库文件存在
if (!fs.existsSync(knowledgeBasePath)) {
  fs.writeFileSync(knowledgeBasePath, JSON.stringify({
    timestamp: new Date().toISOString(),
    knowledge: [],
    applications: []
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
 * 读取知识库
 */
function readKnowledgeBase() {
  try {
    return JSON.parse(fs.readFileSync(knowledgeBasePath, 'utf8'));
  } catch (error) {
    console.error('读取知识库失败:', error.message);
    return {
      timestamp: getTimestamp(),
      knowledge: [],
      applications: []
    };
  }
}

/**
 * 保存知识库
 */
function saveKnowledgeBase(knowledgeBase) {
  knowledgeBase.timestamp = getTimestamp();
  fs.writeFileSync(knowledgeBasePath, JSON.stringify(knowledgeBase, null, 2));
}

/**
 * 提取知识
 */
function extractKnowledge() {
  console.log(`[${getTimestamp()}] 提取学习知识...`);
  
  const records = readLearningRecords();
  const reports = readEvolutionReports();
  const knowledgeBase = readKnowledgeBase();
  
  // 提取学习记录中的知识
  records.forEach(record => {
    if (record.insights && record.insights.length > 0) {
      record.insights.forEach(insight => {
        const existingKnowledge = knowledgeBase.knowledge.find(k => k.content === insight);
        if (!existingKnowledge) {
          knowledgeBase.knowledge.push({
            content: insight,
            source: 'learning',
            timestamp: record.learnedAt || getTimestamp(),
            applicationCount: 0
          });
        }
      });
    }
  });
  
  // 提取进化报告中的知识
  reports.forEach(report => {
    if (report.improvements && report.improvements.length > 0) {
      report.improvements.forEach(improvement => {
        const existingKnowledge = knowledgeBase.knowledge.find(k => k.content === improvement);
        if (!existingKnowledge) {
          knowledgeBase.knowledge.push({
            content: improvement,
            source: 'evolution',
            timestamp: report.timestamp || getTimestamp(),
            applicationCount: 0
          });
        }
      });
    }
  });
  
  saveKnowledgeBase(knowledgeBase);
  console.log(`[${getTimestamp()}] 知识提取完成，共提取 ${knowledgeBase.knowledge.length} 条知识`);
  
  return knowledgeBase;
}

/**
 * 应用知识到任务
 */
function applyKnowledgeToTasks() {
  console.log(`[${getTimestamp()}] 应用知识到任务...`);
  
  const knowledgeBase = readKnowledgeBase();
  
  // 模拟任务列表
  const tasks = [
    {
      id: 'task_1',
      title: '优化资源评估算法',
      description: '改进资源价值评估算法，提高资源筛选效率',
      type: 'optimization'
    },
    {
      id: 'task_2',
      title: '增强知识获取能力',
      description: '提高智能体获取和整合知识的能力',
      type: 'learning'
    },
    {
      id: 'task_3',
      title: '改进故障处理机制',
      description: '优化系统故障检测和恢复能力',
      type: 'reliability'
    },
    {
      id: 'task_4',
      title: '提升学习效率',
      description: '提高智能体的学习速度和效果',
      type: 'efficiency'
    }
  ];
  
  // 为每个任务应用相关知识
  tasks.forEach(task => {
    const relevantKnowledge = findRelevantKnowledge(knowledgeBase.knowledge, task);
    
    if (relevantKnowledge.length > 0) {
      console.log(`[${getTimestamp()}] 为任务 "${task.title}" 应用 ${relevantKnowledge.length} 条相关知识`);
      
      relevantKnowledge.forEach(knowledge => {
        // 记录知识应用
        knowledgeBase.applications.push({
          taskId: task.id,
          taskTitle: task.title,
          knowledgeContent: knowledge.content,
          timestamp: getTimestamp(),
          result: 'applied'
        });
        
        // 增加知识应用计数
        const knowledgeIndex = knowledgeBase.knowledge.findIndex(k => k.content === knowledge.content);
        if (knowledgeIndex !== -1) {
          knowledgeBase.knowledge[knowledgeIndex].applicationCount++;
        }
      });
    }
  });
  
  saveKnowledgeBase(knowledgeBase);
  console.log(`[${getTimestamp()}] 知识应用完成，共应用 ${knowledgeBase.applications.length} 次`);
  
  return knowledgeBase;
}

/**
 * 查找相关知识
 */
function findRelevantKnowledge(knowledge, task) {
  const relevantKnowledge = [];
  const taskText = `${task.title} ${task.description}`.toLowerCase();
  
  knowledge.forEach(item => {
    const knowledgeText = item.content.toLowerCase();
    
    // 简单的相关性匹配
    if (taskText.includes(knowledgeText) || knowledgeText.includes(taskText)) {
      relevantKnowledge.push(item);
    } else if (task.type === 'optimization' && knowledgeText.includes('优化')) {
      relevantKnowledge.push(item);
    } else if (task.type === 'learning' && knowledgeText.includes('学习')) {
      relevantKnowledge.push(item);
    } else if (task.type === 'reliability' && (knowledgeText.includes('故障') || knowledgeText.includes('恢复'))) {
      relevantKnowledge.push(item);
    } else if (task.type === 'efficiency' && knowledgeText.includes('效率')) {
      relevantKnowledge.push(item);
    }
  });
  
  // 按应用次数排序，优先应用更常用的知识
  return relevantKnowledge.sort((a, b) => b.applicationCount - a.applicationCount);
}

/**
 * 生成知识应用报告
 */
function generateApplicationReport() {
  console.log(`[${getTimestamp()}] 生成知识应用报告...`);
  
  const knowledgeBase = readKnowledgeBase();
  
  // 统计知识应用情况
  const stats = {
    totalKnowledge: knowledgeBase.knowledge.length,
    totalApplications: knowledgeBase.applications.length,
    mostAppliedKnowledge: knowledgeBase.knowledge
      .sort((a, b) => b.applicationCount - a.applicationCount)
      .slice(0, 5),
    applicationByTask: {},
    knowledgeSourceDistribution: {
      learning: 0,
      evolution: 0
    }
  };
  
  // 统计按任务的应用情况
  knowledgeBase.applications.forEach(app => {
    if (!stats.applicationByTask[app.taskTitle]) {
      stats.applicationByTask[app.taskTitle] = 0;
    }
    stats.applicationByTask[app.taskTitle]++;
  });
  
  // 统计知识来源分布
  knowledgeBase.knowledge.forEach(knowledge => {
    stats.knowledgeSourceDistribution[knowledge.source]++;
  });
  
  // 生成报告
  const report = {
    timestamp: getTimestamp(),
    stats: stats,
    summary: generateApplicationSummary(stats),
    recommendations: generateApplicationRecommendations(stats)
  };
  
  // 保存报告
  const reportPath = path.join(learningDir, `application-report-${Date.now()}.json`);
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  
  console.log(`[${getTimestamp()}] 知识应用报告生成成功！`);
  console.log(`   保存路径: ${reportPath}`);
  console.log(`   总知识量: ${stats.totalKnowledge} 条`);
  console.log(`   总应用次数: ${stats.totalApplications} 次`);
  console.log(`   最常用知识:`);
  stats.mostAppliedKnowledge.forEach((knowledge, index) => {
    console.log(`     ${index + 1}. ${knowledge.content} (应用 ${knowledge.applicationCount} 次)`);
  });
  
  return report;
}

/**
 * 生成应用总结
 */
function generateApplicationSummary(stats) {
  const summary = [];
  
  summary.push(`知识库共有 ${stats.totalKnowledge} 条知识，已应用 ${stats.totalApplications} 次`);
  
  if (stats.mostAppliedKnowledge.length > 0) {
    summary.push(`最常用的知识是: ${stats.mostAppliedKnowledge[0].content}`);
  }
  
  if (Object.keys(stats.applicationByTask).length > 0) {
    const mostAppliedTask = Object.entries(stats.applicationByTask)
      .sort(([,a], [,b]) => b - a)[0];
    summary.push(`应用知识最多的任务是: ${mostAppliedTask[0]} (${mostAppliedTask[1]} 次)`);
  }
  
  summary.push(`知识来源分布: 学习记录 ${stats.knowledgeSourceDistribution.learning} 条, 进化报告 ${stats.knowledgeSourceDistribution.evolution} 条`);
  
  return summary;
}

/**
 * 生成应用建议
 */
function generateApplicationRecommendations(stats) {
  const recommendations = [];
  
  if (stats.totalKnowledge === 0) {
    recommendations.push('建议开始学习，积累知识');
  } else if (stats.totalKnowledge < 20) {
    recommendations.push('建议增加学习量，丰富知识库');
  }
  
  if (stats.totalApplications === 0) {
    recommendations.push('建议开始应用知识到实际任务');
  } else if (stats.totalApplications < stats.totalKnowledge) {
    recommendations.push('建议增加知识应用频率');
  }
  
  if (stats.knowledgeSourceDistribution.learning === 0) {
    recommendations.push('建议从学习记录中提取更多知识');
  }
  
  if (stats.knowledgeSourceDistribution.evolution === 0) {
    recommendations.push('建议从进化报告中提取更多知识');
  }
  
  recommendations.push('建议优化知识应用算法，提高应用准确性');
  recommendations.push('建议定期更新知识库，保持知识的时效性');
  
  return recommendations;
}

/**
 * 执行学习成果应用
 */
async function executeLearningApplication() {
  try {
    console.log(`\n[${getTimestamp()}] 开始学习成果应用...`);
    
    // 1. 提取知识
    const knowledgeBase = extractKnowledge();
    
    // 2. 应用知识到任务
    applyKnowledgeToTasks();
    
    // 3. 生成应用报告
    generateApplicationReport();
    
    console.log(`[${getTimestamp()}] 学习成果应用完成！`);
  } catch (error) {
    console.error(`[${getTimestamp()}] 学习成果应用失败:`, error.message);
  }
}

/**
 * 启动学习成果应用系统
 */
async function startLearningApplication() {
  console.log('=== 学习成果应用系统初始化 ===');
  console.log(`应用间隔: ${applicationInterval / 1000 / 60} 分钟`);
  console.log('');
  
  // 首次执行应用
  executeLearningApplication();
  
  // 定期执行应用
  setInterval(executeLearningApplication, applicationInterval);
  
  console.log('=== 学习成果应用系统已启动 ===');
  console.log('系统将每30分钟应用学习成果到实际任务！');
  console.log('');
}

// 启动系统
startLearningApplication();