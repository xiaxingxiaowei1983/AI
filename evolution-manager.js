const fs = require('fs');
const path = require('path');
const MemoryManager = require('./memory-manager');

class EvolutionManager {
  constructor() {
    this.memoryManager = new MemoryManager();
    this.evolutionDir = './evolution';
    this.sessionsDir = './sessions';
    
    // 初始化目录
    this.initDirectories();
    
    // 配置
    this.config = {
      dailyReportTime: '22:00', // 每日报告生成时间
      maxSessionHistory: 100, // 最大会话历史记录数
      maxEvolutionReports: 30, // 最大进化报告数
      skillProposalLimit: 3 // 每次进化提议的技能数
    };
  }

  // 初始化目录
  initDirectories() {
    const directories = [
      this.evolutionDir,
      this.sessionsDir
    ];
    
    for (const dir of directories) {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    }
  }

  // 保存会话历史
  saveSessionHistory(sessionId, messages) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const fileName = `session-${sessionId}-${timestamp}.json`;
    const filePath = path.join(this.sessionsDir, fileName);
    
    try {
      const sessionData = {
        sessionId: sessionId,
        messages: messages,
        timestamp: new Date().toISOString()
      };
      
      fs.writeFileSync(filePath, JSON.stringify(sessionData, null, 2));
      return true;
    } catch (error) {
      console.error(`保存会话历史失败: ${filePath}`, error);
      return false;
    }
  }

  // 加载会话历史
  loadSessionHistory() {
    const sessions = [];
    
    try {
      const files = fs.readdirSync(this.sessionsDir);
      for (const file of files) {
        if (file.endsWith('.json')) {
          const filePath = path.join(this.sessionsDir, file);
          try {
            const session = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            sessions.push(session);
          } catch (error) {
            console.error(`加载会话历史失败: ${filePath}`, error);
          }
        }
      }
    } catch (error) {
      console.error(`读取会话目录失败: ${this.sessionsDir}`, error);
    }
    
    // 按时间排序，最新的在前
    return sessions.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }

  // 清理过期会话历史
  cleanupSessionHistory() {
    const sessions = this.loadSessionHistory();
    
    if (sessions.length > this.config.maxSessionHistory) {
      const toRemove = sessions.slice(this.config.maxSessionHistory);
      
      for (const session of toRemove) {
        const files = fs.readdirSync(this.sessionsDir);
        for (const file of files) {
          if (file.includes(session.sessionId)) {
            try {
              fs.unlinkSync(path.join(this.sessionsDir, file));
            } catch (error) {
              console.error(`删除会话历史失败: ${file}`, error);
            }
          }
        }
      }
    }
  }

  // 提取会话要点
  extractSessionKeyPoints(session) {
    const keyPoints = [];
    
    // 分析对话内容
    for (const message of session.messages) {
      if (message.role === 'user') {
        // 提取用户问题的关键点
        const content = message.content.toLowerCase();
        if (content.includes('分析') || content.includes('研究') || content.includes('开发')) {
          keyPoints.push(`用户请求: ${message.content}`);
        }
      } else if (message.role === 'assistant') {
        // 提取助手回答的关键点
        const content = message.content.toLowerCase();
        if (content.includes('建议') || content.includes('方案') || content.includes('解决')) {
          keyPoints.push(`助手建议: ${message.content.substring(0, 100)}...`);
        }
      }
    }
    
    return keyPoints;
  }

  // 分析记忆，总结学习成果
  analyzeMemory() {
    const allMemories = [
      ...this.memoryManager.memoryCache.shortTerm,
      ...this.memoryManager.memoryCache.mediumTerm,
      ...this.memoryManager.memoryCache.longTerm
    ];
    
    const learning成果 = [];
    const mistakes = [];
    
    for (const memory of allMemories) {
      const content = memory.content.toLowerCase();
      
      // 识别学习成果
      if (content.includes('学习') || content.includes('掌握') || content.includes('学会')) {
        learning成果.push(memory.content);
      }
      
      // 识别错误和问题
      if (content.includes('错误') || content.includes('失败') || content.includes('问题')) {
        mistakes.push(memory.content);
      }
    }
    
    return {
      learning成果: learning成果,
      mistakes: mistakes
    };
  }

  // 提议可固化的技能
  proposeSkills(learning成果, sessions) {
    const skills = [];
    
    // 基于学习成果提议技能
    for (const achievement of learning成果) {
      if (achievement.includes('分析')) {
        skills.push({
          name: '分析技能',
          description: '基于数据分析和逻辑推理的能力',
          priority: 'high'
        });
      } else if (achievement.includes('开发')) {
        skills.push({
          name: '开发技能',
          description: '软件开发和实现的能力',
          priority: 'high'
        });
      } else if (achievement.includes('设计')) {
        skills.push({
          name: '设计技能',
          description: '系统和产品设计的能力',
          priority: 'medium'
        });
      }
    }
    
    // 基于会话内容提议技能
    for (const session of sessions) {
      const content = JSON.stringify(session).toLowerCase();
      if (content.includes('聊天机器人')) {
        skills.push({
          name: '聊天机器人开发',
          description: '开发智能聊天机器人的能力',
          priority: 'high'
        });
      } else if (content.includes('经济分析')) {
        skills.push({
          name: '经济分析',
          description: '分析经济形势和趋势的能力',
          priority: 'medium'
        });
      }
    }
    
    // 去重并限制数量
    const uniqueSkills = this.removeDuplicateSkills(skills);
    return uniqueSkills.slice(0, this.config.skillProposalLimit);
  }

  // 去重技能
  removeDuplicateSkills(skills) {
    const seen = new Set();
    return skills.filter(skill => {
      const key = skill.name;
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  }

  // 生成每日进化报告
  generateDailyReport() {
    console.log('生成每日进化报告...');
    
    // 加载会话历史
    const sessions = this.loadSessionHistory();
    
    // 分析记忆
    const memoryAnalysis = this.analyzeMemory();
    
    // 提取会话要点
    const sessionKeyPoints = [];
    for (const session of sessions) {
      const keyPoints = this.extractSessionKeyPoints(session);
      sessionKeyPoints.push(...keyPoints);
    }
    
    // 提议技能
    const proposedSkills = this.proposeSkills(memoryAnalysis.learning成果, sessions);
    
    // 生成报告
    const report = {
      date: new Date().toISOString().split('T')[0],
      timestamp: new Date().toISOString(),
      sessionSummary: {
        totalSessions: sessions.length,
        keyPoints: sessionKeyPoints.slice(0, 10) // 只保留前10个要点
      },
      memoryAnalysis: memoryAnalysis,
      proposedSkills: proposedSkills,
      recommendations: [
        '继续强化学习能力，从更多来源获取知识',
        '提高记忆的组织和检索效率',
        '将提议的技能转化为实际能力'
      ]
    };
    
    // 保存报告
    const reportPath = path.join(this.evolutionDir, `evolution-report-${report.date}.json`);
    
    try {
      fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
      console.log(`每日进化报告生成成功: ${reportPath}`);
      
      // 清理过期报告
      this.cleanupEvolutionReports();
      
      return { success: true, report: report, path: reportPath };
    } catch (error) {
      console.error('生成进化报告失败:', error);
      return { success: false, error: error.message };
    }
  }

  // 清理过期进化报告
  cleanupEvolutionReports() {
    try {
      const files = fs.readdirSync(this.evolutionDir);
      const reports = [];
      
      for (const file of files) {
        if (file.startsWith('evolution-report-') && file.endsWith('.json')) {
          const filePath = path.join(this.evolutionDir, file);
          try {
            const report = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            reports.push({ file: file, timestamp: report.timestamp });
          } catch (error) {
            console.error(`加载进化报告失败: ${filePath}`, error);
          }
        }
      }
      
      // 按时间排序，最新的在前
      reports.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      
      // 删除超出限制的报告
      if (reports.length > this.config.maxEvolutionReports) {
        const toRemove = reports.slice(this.config.maxEvolutionReports);
        
        for (const report of toRemove) {
          try {
            fs.unlinkSync(path.join(this.evolutionDir, report.file));
          } catch (error) {
            console.error(`删除进化报告失败: ${report.file}`, error);
          }
        }
      }
    } catch (error) {
      console.error('清理进化报告失败:', error);
    }
  }

  // 启动每日进化任务
  startDailyEvolutionTask() {
    console.log('启动每日进化任务...');
    
    // 立即执行一次
    this.generateDailyReport();
    
    // 设置定时任务
    setInterval(() => {
      const now = new Date();
      const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      
      if (currentTime === this.config.dailyReportTime) {
        this.generateDailyReport();
      }
    }, 60000); // 每分钟检查一次
    
    console.log(`每日进化任务已启动，将在每天 ${this.config.dailyReportTime} 生成报告`);
  }

  // 获取进化报告历史
  getEvolutionHistory() {
    const reports = [];
    
    try {
      const files = fs.readdirSync(this.evolutionDir);
      for (const file of files) {
        if (file.startsWith('evolution-report-') && file.endsWith('.json')) {
          const filePath = path.join(this.evolutionDir, file);
          try {
            const report = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            reports.push(report);
          } catch (error) {
            console.error(`加载进化报告失败: ${filePath}`, error);
          }
        }
      }
    } catch (error) {
      console.error('读取进化报告目录失败:', error);
    }
    
    // 按时间排序，最新的在前
    return reports.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }

  // 生成进化摘要
  generateEvolutionSummary() {
    const reports = this.getEvolutionHistory();
    
    if (reports.length === 0) {
      return { success: false, message: '没有进化报告' };
    }
    
    // 分析最近的报告
    const recentReports = reports.slice(0, 7); // 最近7天的报告
    
    const summary = {
      period: `${recentReports[recentReports.length - 1].date} 至 ${recentReports[0].date}`,
      totalReports: recentReports.length,
      learningTrends: this.analyzeLearningTrends(recentReports),
      skillDevelopment: this.analyzeSkillDevelopment(recentReports),
      recommendations: this.generateRecommendations(recentReports),
      timestamp: new Date().toISOString()
    };
    
    // 保存摘要
    const summaryPath = path.join(this.evolutionDir, `evolution-summary-${new Date().toISOString().split('T')[0]}.json`);
    
    try {
      fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
      return { success: true, summary: summary, path: summaryPath };
    } catch (error) {
      console.error('生成进化摘要失败:', error);
      return { success: false, error: error.message };
    }
  }

  // 分析学习趋势
  analyzeLearningTrends(reports) {
    const trends = {};
    
    for (const report of reports) {
      for (const achievement of report.memoryAnalysis.learning成果) {
        const keywords = this.extractKeywords(achievement);
        for (const keyword of keywords) {
          trends[keyword] = (trends[keyword] || 0) + 1;
        }
      }
    }
    
    // 按出现频率排序
    return Object.entries(trends)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([keyword, count]) => ({ keyword, count }));
  }

  // 分析技能发展
  analyzeSkillDevelopment(reports) {
    const skills = {};
    
    for (const report of reports) {
      for (const skill of report.proposedSkills) {
        skills[skill.name] = (skills[skill.name] || 0) + 1;
      }
    }
    
    // 按出现频率排序
    return Object.entries(skills)
      .sort((a, b) => b[1] - a[1])
      .map(([skill, count]) => ({ skill, count }));
  }

  // 生成建议
  generateRecommendations(reports) {
    const recommendations = [];
    
    // 基于学习趋势生成建议
    const trends = this.analyzeLearningTrends(reports);
    if (trends.length > 0) {
      recommendations.push(`加强对 ${trends[0].keyword} 的学习和实践`);
    }
    
    // 基于技能发展生成建议
    const skills = this.analyzeSkillDevelopment(reports);
    if (skills.length > 0) {
      recommendations.push(`优先发展 ${skills[0].skill} 技能`);
    }
    
    recommendations.push('保持每日学习和总结的习惯');
    recommendations.push('定期回顾和更新记忆系统');
    
    return recommendations;
  }

  // 提取关键词
  extractKeywords(text) {
    const stopWords = new Set([
      '的', '了', '是', '在', '我', '有', '和', '就', '不', '人', '都', '一', '一个', '上', '也', '很', '到', '说', '要', '去', '你', '会', '着', '没有', '看', '好', '自己', '这'
    ]);
    
    return text
      .toLowerCase()
      .replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, ' ')
      .split(' ')
      .filter(word => word.length > 1 && !stopWords.has(word));
  }
}

// 导出模块
module.exports = EvolutionManager;

// 如果直接运行
if (require.main === module) {
  const manager = new EvolutionManager();
  
  // 测试生成每日报告
  console.log('测试生成每日进化报告:');
  console.log('====================================');
  
  const reportResult = manager.generateDailyReport();
  console.log('报告生成结果:', reportResult.success);
  if (reportResult.report) {
    console.log('报告日期:', reportResult.report.date);
    console.log('会话数量:', reportResult.report.sessionSummary.totalSessions);
    console.log('学习成果数量:', reportResult.report.memoryAnalysis.learning成果.length);
    console.log('提议技能数量:', reportResult.report.proposedSkills.length);
  }
  console.log('');
  
  // 测试生成进化摘要
  console.log('测试生成进化摘要:');
  console.log('====================================');
  
  const summaryResult = manager.generateEvolutionSummary();
  console.log('摘要生成结果:', summaryResult.success);
  if (summaryResult.summary) {
    console.log('摘要周期:', summaryResult.summary.period);
    console.log('学习趋势:', summaryResult.summary.learningTrends.slice(0, 3));
    console.log('技能发展:', summaryResult.summary.skillDevelopment.slice(0, 3));
  }
  console.log('');
  
  // 测试启动每日进化任务
  console.log('测试启动每日进化任务:');
  console.log('====================================');
  manager.startDailyEvolutionTask();
  console.log('');
  
  console.log('====================================');
  console.log('测试完成');
  console.log('====================================');
}
