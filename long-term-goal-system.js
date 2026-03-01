const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

class LongTermGoalSystem {
  constructor(options = {}) {
    this.config = {
      reviewInterval: options.reviewInterval || 86400000, // 默认24小时
      storageDir: options.storageDir || path.join(__dirname, 'long-term-goal-storage'),
      maxGoals: options.maxGoals || 20
    };
    
    this.state = {
      lastReview: null,
      goals: new Map(),
      completedGoals: new Map(),
      progressHistory: []
    };
    
    this.initializeStorage();
    this.loadState();
  }
  
  initializeStorage() {
    if (!fs.existsSync(this.config.storageDir)) {
      fs.mkdirSync(this.config.storageDir, { recursive: true });
    }
  }
  
  generateGoalId(goal) {
    return 'goal_' + crypto.createHash('sha256').update(goal.title + Date.now()).digest('hex').substring(0, 16);
  }
  
  saveState() {
    const statePath = path.join(this.config.storageDir, 'state.json');
    const serializableState = {
      lastReview: this.state.lastReview,
      goals: Object.fromEntries(this.state.goals),
      completedGoals: Object.fromEntries(this.state.completedGoals),
      progressHistory: this.state.progressHistory
    };
    
    fs.writeFileSync(statePath, JSON.stringify(serializableState, null, 2));
  }
  
  loadState() {
    const statePath = path.join(this.config.storageDir, 'state.json');
    if (fs.existsSync(statePath)) {
      try {
        const data = JSON.parse(fs.readFileSync(statePath, 'utf8'));
        if (data.lastReview) this.state.lastReview = data.lastReview;
        if (data.goals) {
          this.state.goals = new Map(Object.entries(data.goals));
        }
        if (data.completedGoals) {
          this.state.completedGoals = new Map(Object.entries(data.completedGoals));
        }
        if (data.progressHistory) this.state.progressHistory = data.progressHistory;
      } catch (error) {
        console.error('加载状态失败:', error.message);
      }
    }
  }
  
  async start() {
    console.log('🚀 启动长期目标和规划系统');
    
    // 开始定期审查目标
    this.reviewInterval = setInterval(async () => {
      await this.reviewGoals();
    }, this.config.reviewInterval);
    
    // 立即执行一次审查
    await this.reviewGoals();
    
    console.log('✅ 长期目标和规划系统启动成功');
    return true;
  }
  
  stop() {
    if (this.reviewInterval) {
      clearInterval(this.reviewInterval);
    }
    console.log('🛑 长期目标和规划系统已停止');
  }
  
  async reviewGoals() {
    console.log('🔍 开始审查长期目标');
    
    try {
      // 检查目标进度
      const goals = Array.from(this.state.goals.values());
      for (const goal of goals) {
        await this.updateGoalProgress(goal.id);
      }
      
      // 检查是否有目标已完成
      this.checkCompletedGoals();
      
      this.state.lastReview = new Date().toISOString();
      this.saveState();
      console.log('✅ 目标审查完成');
      
    } catch (error) {
      console.error('审查目标失败:', error.message);
    }
  }
  
  addGoal(goalData) {
    if (this.state.goals.size >= this.config.maxGoals) {
      console.error('❌ 目标数量已达到上限');
      return false;
    }
    
    const goalId = this.generateGoalId(goalData);
    const goal = {
      id: goalId,
      title: goalData.title,
      description: goalData.description || '',
      targetDate: goalData.targetDate,
      priority: goalData.priority || 'medium', // high, medium, low
      status: 'active', // active, completed, cancelled
      progress: 0,
      subgoals: goalData.subgoals || [],
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    };
    
    this.state.goals.set(goalId, goal);
    this.saveState();
    
    console.log(`✅ 目标添加成功: ${goal.title} (${goalId})`);
    return goalId;
  }
  
  updateGoal(goalId, updates) {
    const goal = this.state.goals.get(goalId);
    if (!goal) {
      console.error(`❌ 目标 ${goalId} 不存在`);
      return false;
    }
    
    const updatedGoal = {
      ...goal,
      ...updates,
      lastUpdated: new Date().toISOString()
    };
    
    this.state.goals.set(goalId, updatedGoal);
    this.saveState();
    
    console.log(`✅ 目标更新成功: ${goalId}`);
    return true;
  }
  
  deleteGoal(goalId) {
    const goal = this.state.goals.get(goalId);
    if (!goal) {
      console.error(`❌ 目标 ${goalId} 不存在`);
      return false;
    }
    
    this.state.goals.delete(goalId);
    this.saveState();
    
    console.log(`✅ 目标删除成功: ${goalId}`);
    return true;
  }
  
  async updateGoalProgress(goalId) {
    const goal = this.state.goals.get(goalId);
    if (!goal) {
      return false;
    }
    
    // 计算进度
    let progress = 0;
    if (goal.subgoals && goal.subgoals.length > 0) {
      const completedSubgoals = goal.subgoals.filter(sg => sg.completed).length;
      progress = (completedSubgoals / goal.subgoals.length) * 100;
    }
    
    // 更新目标进度
    const updatedGoal = {
      ...goal,
      progress: progress,
      lastUpdated: new Date().toISOString()
    };
    
    this.state.goals.set(goalId, updatedGoal);
    
    // 记录进度历史
    const historyEntry = {
      goalId: goalId,
      goalTitle: goal.title,
      progress: progress,
      timestamp: new Date().toISOString()
    };
    
    this.state.progressHistory.push(historyEntry);
    if (this.state.progressHistory.length > 100) {
      this.state.progressHistory = this.state.progressHistory.slice(-100);
    }
    
    console.log(`📊 目标进度更新: ${goal.title} - ${progress.toFixed(1)}%`);
    return true;
  }
  
  addSubgoal(goalId, subgoal) {
    const goal = this.state.goals.get(goalId);
    if (!goal) {
      console.error(`❌ 目标 ${goalId} 不存在`);
      return false;
    }
    
    const subgoalId = `subgoal_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
    const newSubgoal = {
      id: subgoalId,
      title: subgoal.title,
      description: subgoal.description || '',
      completed: false,
      createdAt: new Date().toISOString()
    };
    
    goal.subgoals.push(newSubgoal);
    goal.lastUpdated = new Date().toISOString();
    
    this.state.goals.set(goalId, goal);
    this.saveState();
    
    console.log(`✅ 子目标添加成功: ${subgoal.title} 到目标 ${goal.title}`);
    return subgoalId;
  }
  
  completeSubgoal(goalId, subgoalId) {
    const goal = this.state.goals.get(goalId);
    if (!goal) {
      console.error(`❌ 目标 ${goalId} 不存在`);
      return false;
    }
    
    const subgoal = goal.subgoals.find(sg => sg.id === subgoalId);
    if (!subgoal) {
      console.error(`❌ 子目标 ${subgoalId} 不存在`);
      return false;
    }
    
    subgoal.completed = true;
    goal.lastUpdated = new Date().toISOString();
    
    this.state.goals.set(goalId, goal);
    this.saveState();
    
    // 更新目标进度
    this.updateGoalProgress(goalId);
    
    console.log(`✅ 子目标完成: ${subgoal.title}`);
    return true;
  }
  
  checkCompletedGoals() {
    const goalsToComplete = [];
    
    this.state.goals.forEach(goal => {
      if (goal.progress >= 100) {
        goalsToComplete.push(goal);
      }
    });
    
    for (const goal of goalsToComplete) {
      // 移到已完成目标
      const completedGoal = {
        ...goal,
        status: 'completed',
        completedAt: new Date().toISOString()
      };
      
      this.state.completedGoals.set(goal.id, completedGoal);
      this.state.goals.delete(goal.id);
      
      console.log(`🎉 目标完成: ${goal.title}`);
    }
    
    if (goalsToComplete.length > 0) {
      this.saveState();
    }
  }
  
  getGoals() {
    return Array.from(this.state.goals.values());
  }
  
  getGoalById(goalId) {
    return this.state.goals.get(goalId);
  }
  
  getCompletedGoals() {
    return Array.from(this.state.completedGoals.values());
  }
  
  getProgressHistory(goalId, limit = 20) {
    const history = this.state.progressHistory
      .filter(entry => entry.goalId === goalId)
      .slice(-limit);
    return history;
  }
  
  getStatus() {
    return {
      lastReview: this.state.lastReview,
      activeGoals: this.state.goals.size,
      completedGoals: this.state.completedGoals.size,
      progressHistory: this.state.progressHistory.length
    };
  }
  
  generatePlan() {
    const goals = Array.from(this.state.goals.values());
    const plan = {
      timestamp: new Date().toISOString(),
      goals: goals.map(goal => ({
        id: goal.id,
        title: goal.title,
        priority: goal.priority,
        progress: goal.progress,
        targetDate: goal.targetDate,
        subgoals: goal.subgoals
      })),
      completedGoals: this.state.completedGoals.size,
      recommendations: this.generateRecommendations(goals)
    };
    
    // 保存计划到文件
    const planPath = path.join(this.config.storageDir, `plan_${Date.now()}.json`);
    fs.writeFileSync(planPath, JSON.stringify(plan, null, 2));
    
    return plan;
  }
  
  generateRecommendations(goals) {
    const recommendations = [];
    
    // 基于优先级的建议
    const highPriorityGoals = goals.filter(g => g.priority === 'high' && g.progress < 50);
    if (highPriorityGoals.length > 0) {
      recommendations.push({
        type: 'priority',
        message: `建议优先关注高优先级目标: ${highPriorityGoals.map(g => g.title).join(', ')}`,
        priority: 'high'
      });
    }
    
    // 基于进度的建议
    const stalledGoals = goals.filter(g => g.progress < 20 && this.isGoalStalled(g));
    if (stalledGoals.length > 0) {
      recommendations.push({
        type: 'progress',
        message: `以下目标进度缓慢，建议采取行动: ${stalledGoals.map(g => g.title).join(', ')}`,
        priority: 'medium'
      });
    }
    
    // 基于截止日期的建议
    const urgentGoals = goals.filter(g => this.isGoalUrgent(g));
    if (urgentGoals.length > 0) {
      recommendations.push({
        type: 'deadline',
        message: `以下目标即将到期: ${urgentGoals.map(g => g.title).join(', ')}`,
        priority: 'high'
      });
    }
    
    return recommendations;
  }
  
  isGoalStalled(goal) {
    // 检查目标是否停滞
    const createdDate = new Date(goal.createdAt);
    const now = new Date();
    const daysSinceCreation = (now - createdDate) / (1000 * 60 * 60 * 24);
    
    return daysSinceCreation > 7 && goal.progress < 20;
  }
  
  isGoalUrgent(goal) {
    // 检查目标是否紧急
    if (!goal.targetDate) return false;
    
    const targetDate = new Date(goal.targetDate);
    const now = new Date();
    const daysUntilTarget = (targetDate - now) / (1000 * 60 * 60 * 24);
    
    return daysUntilTarget < 7 && goal.progress < 80;
  }
  
  prioritizeGoals() {
    const goals = Array.from(this.state.goals.values());
    
    // 基于优先级、进度和截止日期排序
    goals.sort((a, b) => {
      // 首先按优先级排序
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
      if (priorityDiff !== 0) return priorityDiff;
      
      // 然后按进度排序（进度低的优先）
      const progressDiff = a.progress - b.progress;
      if (progressDiff !== 0) return progressDiff;
      
      // 最后按截止日期排序（即将到期的优先）
      if (a.targetDate && b.targetDate) {
        return new Date(a.targetDate) - new Date(b.targetDate);
      } else if (a.targetDate) {
        return -1;
      } else if (b.targetDate) {
        return 1;
      }
      
      return 0;
    });
    
    return goals;
  }
}

module.exports = LongTermGoalSystem;

if (require.main === module) {
  async function main() {
    console.log('========================================');
    console.log('🎯 长期目标和规划系统测试');
    console.log('========================================');
    
    const goalSystem = new LongTermGoalSystem();
    
    // 添加测试目标
    const goalId1 = goalSystem.addGoal({
      title: '优化EvoMap资产质量',
      description: '提高EvoMap资产的整体质量和价值',
      targetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30天后
      priority: 'high'
    });
    
    const goalId2 = goalSystem.addGoal({
      title: '扩展智能体能力',
      description: '添加新的智能体功能和能力',
      targetDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(), // 60天后
      priority: 'medium'
    });
    
    // 添加子目标
    goalSystem.addSubgoal(goalId1, { title: '分析现有资产质量' });
    goalSystem.addSubgoal(goalId1, { title: '制定质量标准' });
    goalSystem.addSubgoal(goalId1, { title: '实施质量改进' });
    
    // 完成子目标
    const goal = goalSystem.getGoalById(goalId1);
    if (goal && goal.subgoals.length > 0) {
      goalSystem.completeSubgoal(goalId1, goal.subgoals[0].id);
    }
    
    // 生成计划
    const plan = goalSystem.generatePlan();
    console.log('生成的计划:', plan);
    
    // 启动系统
    await goalSystem.start();
    
    // 运行一段时间后停止
    setTimeout(async () => {
      goalSystem.stop();
      console.log('📊 系统状态:', goalSystem.getStatus());
      console.log('活跃目标:', goalSystem.getGoals().length);
      console.log('========================================');
      console.log('🎉 测试完成');
      console.log('========================================');
    }, 5000); // 5秒后停止
  }
  
  main().catch(error => {
    console.error('测试错误:', error.message);
  });
}