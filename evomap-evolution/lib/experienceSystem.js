const fs = require('fs');
const path = require('path');

class ExperienceSystem {
  constructor(config) {
    this.config = config;
    this.experienceData = this.loadExperienceData();
  }

  async 沉淀Experience(task, content, publishResult, completeResult) {
    try {
      // 计算经验值
      const experienceGained = this.calculateExperience(task, content, completeResult);
      
      // 更新经验数据
      this.experienceData.totalExperience += experienceGained;
      this.experienceData.level = this.calculateLevel(this.experienceData.totalExperience);
      this.experienceData.totalTasks += 1;
      this.experienceData.completedTasks += 1;
      
      // 记录本次经验获取
      this.experienceData.history.push({
        timestamp: new Date().toISOString(),
        taskId: task.task_id || task.id,
        taskTitle: task.title,
        experienceGained: experienceGained,
        totalExperience: this.experienceData.totalExperience,
        level: this.experienceData.level,
        publishResult: {
          assetId: publishResult.asset_id,
          status: publishResult.status
        }
      });
      
      // 保存经验数据
      this.saveExperienceData();
      
      // 生成或更新 SKILL
      await this.generateOrUpdateSkill();
      
      this.log('info', `经验沉淀完成: +${experienceGained} 经验, 当前等级: ${this.experienceData.level}`);
      
      return {
        experienceGained,
        newLevel: this.experienceData.level,
        totalExperience: this.experienceData.totalExperience
      };
    } catch (error) {
      this.log('error', `经验沉淀失败: ${error.message}`);
      return null;
    }
  }

  calculateExperience(task, content, completeResult) {
    let baseExperience = 10;
    
    // 根据任务难度调整
    const difficultyMultiplier = task.difficulty === 'hard' ? 3 :
                                 task.difficulty === 'medium' ? 2 : 1;
    
    // 根据任务收益调整
    const rewardMultiplier = task.credits ? (1 + task.credits / 100) : 1;
    
    // 根据内容质量调整
    const contentQuality = content.content.length > 500 ? 1.5 :
                          content.content.length > 200 ? 1.2 : 1;
    
    // 根据平台调整
    const platformMultiplier = content.platform === 'video' ? 1.3 :
                              content.platform === 'xiaohongshu' ? 1.1 : 1;
    
    // 计算总经验
    const totalExperience = Math.floor(
      baseExperience * 
      difficultyMultiplier * 
      rewardMultiplier * 
      contentQuality * 
      platformMultiplier
    );
    
    return totalExperience;
  }

  calculateLevel(experience) {
    // 简单的等级计算公式
    return Math.floor(Math.sqrt(experience / 10)) + 1;
  }

  async generateOrUpdateSkill() {
    try {
      // 分析历史经验数据
      const analysis = this.analyzeExperience();
      
      // 生成 SKILL 内容
      const skillContent = this.generateSkillContent(analysis);
      
      // 保存 SKILL 文件
      const skillPath = path.join(__dirname, '..', 'skills', `evomap-publish-skill.md`);
      fs.writeFileSync(skillPath, skillContent);
      
      this.log('info', `SKILL 更新成功: ${skillPath}`);
    } catch (error) {
      this.log('error', `SKILL 生成失败: ${error.message}`);
    }
  }

  analyzeExperience() {
    // 分析历史经验数据
    const analysis = {
      totalTasks: this.experienceData.totalTasks,
      completedTasks: this.experienceData.completedTasks,
      successRate: this.experienceData.totalTasks > 0 ? 
        (this.experienceData.completedTasks / this.experienceData.totalTasks * 100).toFixed(2) + '%' : '0%',
      totalExperience: this.experienceData.totalExperience,
      currentLevel: this.experienceData.level,
      platformStats: this.calculatePlatformStats(),
      taskTypeStats: this.calculateTaskTypeStats(),
      recentPerformance: this.analyzeRecentPerformance()
    };
    
    return analysis;
  }

  calculatePlatformStats() {
    const stats = {
      xiaohongshu: 0,
      video: 0,
      article: 0
    };
    
    this.experienceData.history.forEach(entry => {
      // 这里需要根据实际数据结构调整
      // 假设任务数据中包含平台信息
      if (entry.taskTitle.includes('小红书')) stats.xiaohongshu++;
      if (entry.taskTitle.includes('视频')) stats.video++;
      if (entry.taskTitle.includes('文章')) stats.article++;
    });
    
    return stats;
  }

  calculateTaskTypeStats() {
    const stats = {
      contentCreation: 0,
      strategy: 0,
      optimization: 0
    };
    
    this.experienceData.history.forEach(entry => {
      // 简单的任务类型识别
      if (entry.taskTitle.includes('创作')) stats.contentCreation++;
      if (entry.taskTitle.includes('策略')) stats.strategy++;
      if (entry.taskTitle.includes('优化')) stats.optimization++;
    });
    
    return stats;
  }

  analyzeRecentPerformance() {
    const recentHistory = this.experienceData.history.slice(-5);
    const averageExperience = recentHistory.reduce((sum, entry) => sum + entry.experienceGained, 0) / recentHistory.length;
    
    return {
      recentTasks: recentHistory.length,
      averageExperience: Math.floor(averageExperience),
      trend: this.calculateTrend(recentHistory)
    };
  }

  calculateTrend(history) {
    if (history.length < 2) return 'stable';
    
    const firstHalf = history.slice(0, Math.floor(history.length / 2));
    const secondHalf = history.slice(Math.floor(history.length / 2));
    
    const firstAverage = firstHalf.reduce((sum, entry) => sum + entry.experienceGained, 0) / firstHalf.length;
    const secondAverage = secondHalf.reduce((sum, entry) => sum + entry.experienceGained, 0) / secondHalf.length;
    
    if (secondAverage > firstAverage * 1.2) return 'improving';
    if (secondAverage < firstAverage * 0.8) return 'declining';
    return 'stable';
  }

  generateSkillContent(analysis) {
    const timestamp = new Date().toISOString();
    const version = `1.1.${this.experienceData.level}`;
    
    return `# EvoMap 发布经验 SKILL

## 版本信息
- **版本**: ${version}
- **更新时间**: ${timestamp}
- **智能体**: ${this.config.agentName}
- **智能体类型**: ${this.config.agentType}

## 经验总结

### 基本统计
- **总任务数**: ${analysis.totalTasks}
- **完成任务数**: ${analysis.completedTasks}
- **成功率**: ${analysis.successRate}
- **总经验值**: ${analysis.totalExperience}
- **当前等级**: ${analysis.currentLevel}

### 平台表现
- **小红书**: ${analysis.platformStats.xiaohongshu} 次
- **视频号**: ${analysis.platformStats.video} 次
- **公众号**: ${analysis.platformStats.article} 次

### 任务类型分布
- **内容创作**: ${analysis.taskTypeStats.contentCreation} 次
- **策略制定**: ${analysis.taskTypeStats.strategy} 次
- **优化调整**: ${analysis.taskTypeStats.optimization} 次

### 近期表现
- **最近任务数**: ${analysis.recentPerformance.recentTasks}
- **平均经验值**: ${analysis.recentPerformance.averageExperience}
- **趋势**: ${analysis.recentPerformance.trend === 'improving' ? '上升' : analysis.recentPerformance.trend === 'declining' ? '下降' : '稳定'}

## 发布指南

### 1. 任务分析
- 优先选择有 credits 收益的任务
- 分析任务需求和平台要求
- 评估任务难度与收益比

### 2. 内容创作
- **小红书**: 重情绪视觉，痛点前置，使用表情符号和话题标签
- **视频号**: 重完播节奏，开头 3 秒钩子，结构清晰
- **公众号**: 重深度拆解，逻辑清晰，提供实用价值

### 3. 资产发布
- 使用 Gene+Capsule+EvolutionEvent 三件套格式
- 确保内容符合平台调性
- 添加适当的标签和元数据

### 4. 任务完成
- 监控资产验证状态
- 及时完成任务提交
- 记录经验和反馈

## 最佳实践

### 内容策略
- 研究平台热门话题和趋势
- 分析目标受众需求
- 结合热点事件创作内容

### 发布时机
- **小红书**: 早上 8-9 点，晚上 7-10 点
- **视频号**: 中午 12 点，晚上 8-9 点
- **公众号**: 早上 7-8 点，晚上 8-9 点

### 优化技巧
- 定期分析内容表现数据
- 根据反馈调整创作策略
- 持续学习平台算法变化

## 常见问题

### 资产验证失败
- 检查内容是否符合平台规范
- 确保内容质量和原创性
- 调整发布格式和标签

### 任务完成超时
- 合理规划任务时间
- 优先处理高价值任务
- 建立任务管理系统

### 经验值增长缓慢
- 选择难度适中的任务
- 提高内容质量和完整性
- 多尝试不同类型的任务

## 未来发展

### 技能提升方向
- **内容创作**: 学习更多平台的创作技巧
- **数据分析**: 掌握内容表现分析方法
- **策略制定**: 提升内容策略规划能力

### 目标
- 成为 EvoMap 平台顶级内容创作者
- 建立完整的内容创作体系
- 分享经验帮助其他智能体
`;
  }

  loadExperienceData() {
    try {
      const dataPath = path.join(__dirname, '..', 'data', 'experience.json');
      if (fs.existsSync(dataPath)) {
        return JSON.parse(fs.readFileSync(dataPath, 'utf8'));
      }
    } catch (error) {
      this.log('warn', `加载经验数据失败: ${error.message}`);
    }
    
    // 默认经验数据
    return {
      totalExperience: 0,
      level: 1,
      totalTasks: 0,
      completedTasks: 0,
      history: []
    };
  }

  saveExperienceData() {
    try {
      const dataPath = path.join(__dirname, '..', 'data');
      if (!fs.existsSync(dataPath)) {
        fs.mkdirSync(dataPath, { recursive: true });
      }
      
      fs.writeFileSync(
        path.join(dataPath, 'experience.json'),
        JSON.stringify(this.experienceData, null, 2)
      );
    } catch (error) {
      this.log('error', `保存经验数据失败: ${error.message}`);
    }
  }

  async generateEvolutionSuggestions(analysis) {
    const suggestions = [];
    
    try {
      // 确保analysis存在
      if (!analysis) {
        // 如果analysis为null，使用默认值
        suggestions.push({
          type: 'skill_development',
          priority: 'medium',
          description: '提升基础创作技能',
          reason: '等级较低，需要积累更多基础经验'
        });
        return suggestions;
      }
      
      // 基于经验分析生成进化建议
      // 直接检查analysis对象的属性
      let xiaohongshuCount = 0;
      if (analysis.platformDistribution && typeof analysis.platformDistribution === 'object') {
        xiaohongshuCount = analysis.platformDistribution.xiaohongshu || 0;
      } else if (analysis.platformStats && typeof analysis.platformStats === 'object') {
        xiaohongshuCount = analysis.platformStats.xiaohongshu || 0;
      }
      
      if (xiaohongshuCount < 5) {
        suggestions.push({
          type: 'platform_expansion',
          priority: 'high',
          description: '增加小红书平台内容创作',
          reason: '小红书平台经验不足，需要更多实践'
        });
      }
      
      let currentTrend = 'stable';
      if (analysis.trends && typeof analysis.trends === 'object') {
        currentTrend = analysis.trends.trend || 'stable';
      } else if (analysis.recentPerformance && typeof analysis.recentPerformance === 'object') {
        currentTrend = analysis.recentPerformance.trend || 'stable';
      }
      
      if (currentTrend === 'declining') {
        suggestions.push({
          type: 'performance_improvement',
          priority: 'medium',
          description: '优化内容创作策略',
          reason: '近期表现呈下降趋势，需要调整策略'
        });
      }
    } catch (error) {
      // 如果出现错误，使用默认建议
      console.error('进化建议生成失败:', error.message);
      suggestions.push({
        type: 'skill_development',
        priority: 'medium',
        description: '提升基础创作技能',
        reason: '等级较低，需要积累更多基础经验'
      });
    }
    
    if (this.experienceData.level < 3) {
      suggestions.push({
        type: 'skill_development',
        priority: 'medium',
        description: '提升基础创作技能',
        reason: '等级较低，需要积累更多基础经验'
      });
    }
    
    return suggestions;
  }

  log(level, message) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] [${level.toUpperCase()}] [ExperienceSystem] ${message}`);
  }
}

module.exports = ExperienceSystem;