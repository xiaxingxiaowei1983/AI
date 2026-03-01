// 技能学习与获取系统
// 实现技能的自动发现、评估、获取和集成

const fs = require('fs');
const path = require('path');
const { capabilityTree } = require('./capabilities/capability-tree.js');
const { autoEvolutionSystem } = require('./auto-evolution-system.js');

class SkillLearningSystem {
  constructor() {
    this.skillDir = path.join(__dirname, 'skills');
    this.tempDir = path.join(__dirname, 'temp', 'skills');
    this.logDir = path.join(__dirname, 'logs', 'skill-learning');
    this.skillDatabaseFile = path.join(this.skillDir, 'skill-database.json');
    this.skillHistoryFile = path.join(this.skillDir, 'skill-history.json');
    
    this.skillDatabase = [];
    this.skillHistory = [];
    this.isRunning = false;
    this.currentSkill = null;
    this.skillPollingInterval = 60000; // 1分钟
    
    this._initialize();
  }
  
  // 初始化
  _initialize() {
    // 创建必要的目录
    if (!fs.existsSync(this.skillDir)) {
      fs.mkdirSync(this.skillDir, { recursive: true });
    }
    
    if (!fs.existsSync(this.tempDir)) {
      fs.mkdirSync(this.tempDir, { recursive: true });
    }
    
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
    
    // 加载技能数据库
    this._loadSkillDatabase();
    
    // 加载技能历史
    this._loadSkillHistory();
  }
  
  // 加载技能数据库
  _loadSkillDatabase() {
    if (fs.existsSync(this.skillDatabaseFile)) {
      try {
        const database = JSON.parse(fs.readFileSync(this.skillDatabaseFile, 'utf8'));
        this.skillDatabase = database;
      } catch (error) {
        console.error('加载技能数据库失败:', error.message);
        this.skillDatabase = [];
      }
    }
  }
  
  // 保存技能数据库
  _saveSkillDatabase() {
    fs.writeFileSync(this.skillDatabaseFile, JSON.stringify(this.skillDatabase, null, 2));
  }
  
  // 加载技能历史
  _loadSkillHistory() {
    if (fs.existsSync(this.skillHistoryFile)) {
      try {
        const history = JSON.parse(fs.readFileSync(this.skillHistoryFile, 'utf8'));
        this.skillHistory = history;
      } catch (error) {
        console.error('加载技能历史失败:', error.message);
        this.skillHistory = [];
      }
    }
  }
  
  // 保存技能历史
  _saveSkillHistory() {
    fs.writeFileSync(this.skillHistoryFile, JSON.stringify(this.skillHistory, null, 2));
  }
  
  // 开始技能学习系统
  start() {
    if (this.isRunning) {
      console.log('技能学习系统已经在运行中');
      return false;
    }
    
    console.log('=== 启动技能学习系统 ===');
    
    this.isRunning = true;
    this._startSkillPolling();
    
    return true;
  }
  
  // 停止技能学习系统
  stop() {
    if (!this.isRunning) {
      console.log('技能学习系统已经停止');
      return false;
    }
    
    console.log('=== 停止技能学习系统 ===');
    
    this.isRunning = false;
    
    // 保存状态
    this._saveSkillDatabase();
    this._saveSkillHistory();
    
    return true;
  }
  
  // 开始技能轮询
  _startSkillPolling() {
    if (!this.isRunning) {
      return;
    }
    
    console.log('开始技能轮询...');
    
    // 执行一次技能处理
    this._processSkills();
    
    // 调度下一次轮询
    setTimeout(() => this._startSkillPolling(), this.skillPollingInterval);
  }
  
  // 处理技能
  _processSkills() {
    if (!this.isRunning) {
      return;
    }
    
    console.log('处理技能...');
    
    // 1. 发现新技能
    this._discoverSkills();
    
    // 2. 评估技能优先级
    this._prioritizeSkills();
    
    // 3. 学习技能
    this._learnSkills();
  }
  
  // 发现新技能
  _discoverSkills() {
    console.log('发现新技能...');
    
    try {
      // 从本地目录发现技能
      this._discoverLocalSkills();
      
      // 从模拟的外部源发现技能
      this._discoverExternalSkills();
      
      // 保存技能数据库
      this._saveSkillDatabase();
      
    } catch (error) {
      console.error('发现技能失败:', error.message);
    }
  }
  
  // 从本地目录发现技能
  _discoverLocalSkills() {
    console.log('从本地目录发现技能...');
    
    try {
      const skillDirs = fs.readdirSync(this.skillDir, { withFileTypes: true })
        .filter(item => item.isDirectory())
        .map(item => item.name);
      
      skillDirs.forEach(skillName => {
        const skillPath = path.join(this.skillDir, skillName);
        const skillFile = path.join(skillPath, 'SKILL.md');
        
        if (fs.existsSync(skillFile)) {
          try {
            const skillContent = fs.readFileSync(skillFile, 'utf8');
            const skill = this._parseSkillFile(skillName, skillContent);
            
            // 检查是否已经在数据库中
            const existingSkill = this.skillDatabase.find(s => s.id === skill.id);
            
            if (!existingSkill) {
              this.skillDatabase.push(skill);
              console.log(`发现本地技能: ${skill.name}`);
            }
          } catch (error) {
            console.error(`解析技能文件失败: ${skillFile}`, error.message);
          }
        }
      });
      
    } catch (error) {
      console.error('从本地目录发现技能失败:', error.message);
    }
  }
  
  // 从外部源发现技能
  _discoverExternalSkills() {
    console.log('从外部源发现技能...');
    
    try {
      // 生成模拟的外部技能
      const mockSkills = this._generateMockExternalSkills();
      
      mockSkills.forEach(skill => {
        // 检查是否已经在数据库中
        const existingSkill = this.skillDatabase.find(s => s.id === skill.id);
        const historyExists = this.skillHistory.find(s => s.id === skill.id);
        
        if (!existingSkill && !historyExists) {
          this.skillDatabase.push(skill);
          console.log(`发现外部技能: ${skill.name} (${skill.source})`);
        }
      });
      
    } catch (error) {
      console.error('从外部源发现技能失败:', error.message);
    }
  }
  
  // 生成模拟的外部技能
  _generateMockExternalSkills() {
    const skillSources = ['GitHub', 'Skill Exchange', 'AI Marketplace', 'Open Source'];
    const skillCategories = ['programming', 'design', 'data', 'marketing', 'automation'];
    const skillNames = [
      'Web Development', 'Data Analysis', 'UI/UX Design', 'Marketing Strategy',
      'Automation Scripting', 'Machine Learning', 'Cloud Computing', 'Cybersecurity',
      'Content Creation', 'Project Management'
    ];
    
    const skills = [];
    const skillCount = Math.floor(Math.random() * 3) + 1; // 1-3个技能
    
    for (let i = 0; i < skillCount; i++) {
      const skillName = skillNames[Math.floor(Math.random() * skillNames.length)];
      const skillSource = skillSources[Math.floor(Math.random() * skillSources.length)];
      const skillCategory = skillCategories[Math.floor(Math.random() * skillCategories.length)];
      
      skills.push({
        id: `skill_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name: skillName,
        category: skillCategory,
        source: skillSource,
        description: `A comprehensive ${skillName} skill for ${skillCategory} tasks`,
        difficulty: this._getRandomDifficulty(),
        value: Math.random() * 100,
        relevance: Math.random() * 100,
        url: `https://example.com/skills/${skillName.toLowerCase().replace(/\s+/g, '-')}`,
        discoveredAt: Date.now(),
        status: 'discovered',
        tags: [skillCategory, skillName.split(' ')[0].toLowerCase()]
      });
    }
    
    return skills;
  }
  
  // 获取随机难度
  _getRandomDifficulty() {
    const difficulties = ['easy', 'medium', 'hard'];
    return difficulties[Math.floor(Math.random() * difficulties.length)];
  }
  
  // 解析技能文件
  _parseSkillFile(skillName, content) {
    return {
      id: `skill_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: skillName,
      category: 'local',
      source: 'Local',
      description: content.substring(0, 200) + '...',
      difficulty: 'medium',
      value: 75,
      relevance: 80,
      url: `local:${skillName}`,
      discoveredAt: Date.now(),
      status: 'discovered',
      tags: [skillName.toLowerCase()]
    };
  }
  
  // 评估技能优先级
  _prioritizeSkills() {
    console.log('评估技能优先级...');
    
    this.skillDatabase.forEach(skill => {
      if (skill.status !== 'discovered') {
        return;
      }
      
      // 计算优先级分数
      let priorityScore = 0;
      
      // 基于价值
      priorityScore += skill.value * 0.4;
      
      // 基于相关性
      priorityScore += skill.relevance * 0.3;
      
      // 基于难度
      switch (skill.difficulty) {
        case 'easy':
          priorityScore += 20;
          break;
        case 'medium':
          priorityScore += 10;
          break;
        case 'hard':
          priorityScore += 5;
          break;
      }
      
      // 基于来源
      if (skill.source === 'GitHub') {
        priorityScore += 15;
      } else if (skill.source === 'AI Marketplace') {
        priorityScore += 10;
      }
      
      // 更新技能优先级
      skill.priorityScore = priorityScore;
      skill.priority = this._getPriorityLevel(priorityScore);
    });
    
    // 按优先级排序
    this.skillDatabase.sort((a, b) => {
      if (a.status === 'discovered' && b.status !== 'discovered') return -1;
      if (a.status !== 'discovered' && b.status === 'discovered') return 1;
      return b.priorityScore - a.priorityScore;
    });
    
    console.log(`技能数据库排序完成，共 ${this.skillDatabase.length} 个技能`);
    
    // 保存技能数据库
    this._saveSkillDatabase();
  }
  
  // 获取优先级级别
  _getPriorityLevel(score) {
    if (score >= 120) {
      return 'critical';
    } else if (score >= 90) {
      return 'high';
    } else if (score >= 60) {
      return 'medium';
    } else {
      return 'low';
    }
  }
  
  // 学习技能
  _learnSkills() {
    console.log('学习技能...');
    
    // 检查当前是否有技能在学习
    if (this.currentSkill) {
      console.log(`当前有技能在学习: ${this.currentSkill.id}`);
      return;
    }
    
    // 从数据库中获取高优先级技能
    const nextSkill = this.skillDatabase.find(skill => skill.status === 'discovered');
    
    if (!nextSkill) {
      console.log('没有发现新技能，等待新技能...');
      return;
    }
    
    // 开始学习技能
    this._learnSkill(nextSkill);
  }
  
  // 学习单个技能
  _learnSkill(skill) {
    console.log(`开始学习技能: ${skill.id} - ${skill.name}`);
    console.log(`技能优先级: ${skill.priority} (${skill.priorityScore})`);
    console.log(`技能来源: ${skill.source}`);
    
    // 更新技能状态
    skill.status = 'learning';
    skill.startedAt = Date.now();
    this.currentSkill = skill;
    
    // 保存技能数据库
    this._saveSkillDatabase();
    
    // 学习技能
    setTimeout(() => {
      try {
        const result = this._processSkill(skill);
        this._completeSkill(skill, result);
      } catch (error) {
        console.error('学习技能失败:', error.message);
        this._failSkill(skill, error.message);
      }
    }, 3000); // 模拟技能学习时间
  }
  
  // 处理技能
  _processSkill(skill) {
    console.log(`处理技能: ${skill.name}`);
    
    // 根据技能来源处理
    switch (skill.source) {
      case 'GitHub':
        return this._processGitHubSkill(skill);
      
      case 'Skill Exchange':
        return this._processSkillExchangeSkill(skill);
      
      case 'AI Marketplace':
        return this._processAIMarketplaceSkill(skill);
      
      case 'Open Source':
        return this._processOpenSourceSkill(skill);
      
      default:
        return this._processDefaultSkill(skill);
    }
  }
  
  // 处理GitHub技能
  _processGitHubSkill(skill) {
    console.log('处理GitHub技能...');
    
    // 模拟从GitHub获取技能
    return {
      success: true,
      skillId: skill.id,
      skillName: skill.name,
      source: skill.source,
      message: '成功从GitHub获取技能'
    };
  }
  
  // 处理Skill Exchange技能
  _processSkillExchangeSkill(skill) {
    console.log('处理Skill Exchange技能...');
    
    // 模拟从Skill Exchange获取技能
    return {
      success: true,
      skillId: skill.id,
      skillName: skill.name,
      source: skill.source,
      message: '成功从Skill Exchange获取技能'
    };
  }
  
  // 处理AI Marketplace技能
  _processAIMarketplaceSkill(skill) {
    console.log('处理AI Marketplace技能...');
    
    // 模拟从AI Marketplace获取技能
    return {
      success: true,
      skillId: skill.id,
      skillName: skill.name,
      source: skill.source,
      message: '成功从AI Marketplace获取技能'
    };
  }
  
  // 处理Open Source技能
  _processOpenSourceSkill(skill) {
    console.log('处理Open Source技能...');
    
    // 模拟从Open Source获取技能
    return {
      success: true,
      skillId: skill.id,
      skillName: skill.name,
      source: skill.source,
      message: '成功从Open Source获取技能'
    };
  }
  
  // 处理默认技能
  _processDefaultSkill(skill) {
    console.log('处理默认技能...');
    
    return {
      success: true,
      skillId: skill.id,
      skillName: skill.name,
      source: skill.source,
      message: '成功获取技能'
    };
  }
  
  // 完成技能学习
  _completeSkill(skill, result) {
    console.log(`技能学习完成: ${skill.id} - ${result.message}`);
    
    // 更新技能状态
    skill.status = 'learned';
    skill.completedAt = Date.now();
    skill.duration = skill.completedAt - skill.startedAt;
    skill.result = result;
    skill.success = result.success;
    
    // 从数据库中移除
    const skillIndex = this.skillDatabase.findIndex(s => s.id === skill.id);
    if (skillIndex > -1) {
      this.skillDatabase.splice(skillIndex, 1);
    }
    
    // 添加到历史记录
    this.skillHistory.push(skill);
    
    // 限制历史记录数量
    if (this.skillHistory.length > 500) {
      this.skillHistory = this.skillHistory.slice(-500);
    }
    
    // 清理当前技能
    this.currentSkill = null;
    
    // 保存状态
    this._saveSkillDatabase();
    this._saveSkillHistory();
    
    // 记录技能结果
    this._logSkillResult(skill);
    
    // 集成技能
    this._integrateSkill(skill);
    
    // 触发进化系统更新
    this._triggerEvolutionUpdate(skill);
  }
  
  // 技能学习失败
  _failSkill(skill, errorMessage) {
    console.error(`技能学习失败: ${skill.id} - ${errorMessage}`);
    
    // 更新技能状态
    skill.status = 'failed';
    skill.completedAt = Date.now();
    skill.duration = skill.completedAt - skill.startedAt;
    skill.error = errorMessage;
    skill.success = false;
    
    // 从数据库中移除
    const skillIndex = this.skillDatabase.findIndex(s => s.id === skill.id);
    if (skillIndex > -1) {
      this.skillDatabase.splice(skillIndex, 1);
    }
    
    // 添加到历史记录
    this.skillHistory.push(skill);
    
    // 清理当前技能
    this.currentSkill = null;
    
    // 保存状态
    this._saveSkillDatabase();
    this._saveSkillHistory();
    
    // 记录技能结果
    this._logSkillResult(skill);
  }
  
  // 记录技能结果
  _logSkillResult(skill) {
    const logFile = path.join(this.logDir, `${skill.id}.json`);
    fs.writeFileSync(logFile, JSON.stringify(skill, null, 2));
    
    console.log(`技能结果已记录: ${logFile}`);
  }
  
  // 集成技能
  _integrateSkill(skill) {
    console.log('集成技能...');
    
    try {
      // 1. 创建技能目录
      const skillDirPath = path.join(this.skillDir, skill.name.replace(/\s+/g, '-').toLowerCase());
      if (!fs.existsSync(skillDirPath)) {
        fs.mkdirSync(skillDirPath, { recursive: true });
      }
      
      // 2. 创建技能文件
      const skillFilePath = path.join(skillDirPath, 'SKILL.md');
      const skillContent = `# ${skill.name}\n\n## 技能描述\n${skill.description}\n\n## 技能来源\n${skill.source}\n\n## 技能标签\n${skill.tags.join(', ')}\n\n## 学习时间\n${new Date(skill.completedAt).toISOString()}\n`;
      fs.writeFileSync(skillFilePath, skillContent);
      
      // 3. 更新能力树
      this._updateCapabilityTree(skill);
      
      console.log(`技能集成成功: ${skill.name}`);
      
    } catch (error) {
      console.error('集成技能失败:', error.message);
    }
  }
  
  // 更新能力树
  _updateCapabilityTree(skill) {
    console.log('更新能力树...');
    
    try {
      // 添加新技能节点
      const skillNode = capabilityTree.addNode(
        skill.name,
        2, // 中层能力
        capabilityTree.root.id,
        {
          type: 'skill',
          keywords: skill.tags,
          description: skill.description,
          valueScore: skill.value,
          relevance: skill.relevance
        }
      );
      
      console.log(`添加新技能节点: ${skillNode.id}`);
      
    } catch (error) {
      console.error('更新能力树失败:', error.message);
    }
  }
  
  // 触发进化系统更新
  _triggerEvolutionUpdate(skill) {
    console.log('触发进化系统更新...');
    
    try {
      // 通知自动进化系统
      if (autoEvolutionSystem) {
        // 这里可以添加具体的更新逻辑
        console.log('进化系统已通知技能学习完成');
      }
      
    } catch (error) {
      console.error('触发进化系统更新失败:', error.message);
    }
  }
  
  // 获取技能数据库
  getSkillDatabase() {
    return this.skillDatabase;
  }
  
  // 获取技能历史
  getSkillHistory() {
    return this.skillHistory;
  }
  
  // 获取当前技能
  getCurrentSkill() {
    return this.currentSkill;
  }
  
  // 获取技能统计
  getSkillStats() {
    const stats = {
      totalSkills: this.skillHistory.length,
      learnedSkills: this.skillHistory.filter(s => s.status === 'learned').length,
      failedSkills: this.skillHistory.filter(s => s.status === 'failed').length,
      discoveredSkills: this.skillDatabase.filter(s => s.status === 'discovered').length,
      learningSkills: this.skillDatabase.filter(s => s.status === 'learning').length,
      successRate: this.skillHistory.length > 0 
        ? (this.skillHistory.filter(s => s.status === 'learned').length / this.skillHistory.length) * 100 
        : 0
    };
    
    return stats;
  }
  
  // 手动添加技能
  addSkill(skill) {
    const newSkill = {
      id: skill.id || `skill_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: skill.name,
      category: skill.category || 'custom',
      source: skill.source || 'Manual',
      description: skill.description || 'A custom skill',
      difficulty: skill.difficulty || 'medium',
      value: skill.value || 70,
      relevance: skill.relevance || 75,
      url: skill.url || 'manual:custom',
      discoveredAt: Date.now(),
      status: 'discovered',
      tags: skill.tags || [skill.name.toLowerCase()]
    };
    
    this.skillDatabase.push(newSkill);
    this._saveSkillDatabase();
    
    console.log(`手动添加技能: ${newSkill.id} - ${newSkill.name}`);
    
    return newSkill;
  }
  
  // 取消技能学习
  cancelSkill(skillId) {
    const skillIndex = this.skillDatabase.findIndex(skill => skill.id === skillId);
    
    if (skillIndex > -1) {
      const skill = this.skillDatabase[skillIndex];
      skill.status = 'cancelled';
      skill.cancelledAt = Date.now();
      
      this.skillHistory.push(skill);
      this.skillDatabase.splice(skillIndex, 1);
      
      this._saveSkillDatabase();
      this._saveSkillHistory();
      
      console.log(`取消技能学习: ${skillId}`);
      return true;
    }
    
    return false;
  }
  
  // 推荐技能
  recommendSkills(count = 5) {
    console.log(`推荐 ${count} 个技能...`);
    
    // 基于价值和相关性排序
    const sortedSkills = [...this.skillDatabase]
      .filter(skill => skill.status === 'discovered')
      .sort((a, b) => {
        const scoreA = (a.value * 0.6) + (a.relevance * 0.4);
        const scoreB = (b.value * 0.6) + (b.relevance * 0.4);
        return scoreB - scoreA;
      });
    
    return sortedSkills.slice(0, count);
  }
  
  // 搜索技能
  searchSkills(query) {
    console.log(`搜索技能: ${query}`);
    
    const lowerQuery = query.toLowerCase();
    
    return this.skillDatabase.filter(skill => 
      skill.name.toLowerCase().includes(lowerQuery) ||
      skill.description.toLowerCase().includes(lowerQuery) ||
      skill.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  }
}

// 导出单例实例
const skillLearningSystem = new SkillLearningSystem();

module.exports = {
  SkillLearningSystem,
  skillLearningSystem,
  // 工具接口
  start: () => skillLearningSystem.start(),
  stop: () => skillLearningSystem.stop(),
  getSkillDatabase: () => skillLearningSystem.getSkillDatabase(),
  getSkillHistory: () => skillLearningSystem.getSkillHistory(),
  getCurrentSkill: () => skillLearningSystem.getCurrentSkill(),
  getSkillStats: () => skillLearningSystem.getSkillStats(),
  addSkill: (skill) => skillLearningSystem.addSkill(skill),
  cancelSkill: (skillId) => skillLearningSystem.cancelSkill(skillId),
  recommendSkills: (count) => skillLearningSystem.recommendSkills(count),
  searchSkills: (query) => skillLearningSystem.searchSkills(query)
};

// 示例用法
if (require.main === module) {
  console.log('=== 启动技能学习系统 ===');
  skillLearningSystem.start();
}
