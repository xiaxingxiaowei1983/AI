const crypto = require('crypto');

class TaskManager {
  constructor(config, connector) {
    this.config = config;
    this.connector = connector;
    this.taskCache = [];
    this.lastFetchTime = 0;
    this.fetchInterval = 5 * 60 * 1000; // 5分钟刷新一次任务
  }

  async getNextTask() {
    // 检查是否需要刷新任务列表
    if (Date.now() - this.lastFetchTime > this.fetchInterval) {
      await this.refreshTasks();
    }

    // 筛选和排序任务
    const filteredTasks = this.filterTasks(this.taskCache);
    const prioritizedTasks = this.prioritizeTasks(filteredTasks);

    // 返回优先级最高的任务
    return prioritizedTasks[0] || null;
  }

  async refreshTasks() {
    try {
      console.log('正在刷新任务列表...');
      const tasks = await this.connector.fetchTasks();
      this.taskCache = tasks;
      this.lastFetchTime = Date.now();
      console.log(`任务列表刷新完成，共 ${tasks.length} 个任务`);
    } catch (error) {
      console.error('刷新任务列表失败:', error.message);
    }
  }

  filterTasks(tasks) {
    return tasks.filter(task => {
      // 基础过滤
      if (!task || !task.title) {
        return false;
      }

      // 检查是否符合 CGO 定位
      const isCGOTask = this.isCGOTask(task);
      if (!isCGOTask) {
        return false;
      }

      // 检查任务状态
      if (task.status && task.status !== 'open') {
        return false;
      }

      // 检查声誉要求
      const minReputation = task.min_reputation || 0;
      if (minReputation > 50) { // 初始声誉 50
        return false;
      }

      return true;
    });
  }

  prioritizeTasks(tasks) {
    return tasks.sort((a, b) => {
      // 1. 优先有 credits 收益的任务
      const aHasCredits = this.getTaskCredits(a) > 0;
      const bHasCredits = this.getTaskCredits(b) > 0;
      if (aHasCredits && !bHasCredits) return -1;
      if (!aHasCredits && bHasCredits) return 1;

      // 2. 按 credits 收益排序
      const aCredits = this.getTaskCredits(a);
      const bCredits = this.getTaskCredits(b);
      if (aCredits !== bCredits) {
        return bCredits - aCredits;
      }

      // 3. 按成功率排序（假设成功率与任务类型相关）
      const aSuccessRate = this.estimateSuccessRate(a);
      const bSuccessRate = this.estimateSuccessRate(b);
      if (aSuccessRate !== bSuccessRate) {
        return bSuccessRate - aSuccessRate;
      }

      // 4. 按时间排序（优先新任务）
      const aTime = new Date(a.created_at || 0).getTime();
      const bTime = new Date(b.created_at || 0).getTime();
      return bTime - aTime;
    });
  }

  isCGOTask(task) {
    const cgoKeywords = [
      'content', '创作', '文案', '文章', '视频', '图文',
      'social', '社交媒体', '小红书', '公众号', '视频号',
      'marketing', '营销', '推广', '流量', '爆款',
      'copy', '文案', '脚本', '策划', '创意'
    ];

    const taskText = (task.title + ' ' + (task.body || '')).toLowerCase();
    return cgoKeywords.some(keyword => taskText.includes(keyword.toLowerCase()));
  }

  getTaskCredits(task) {
    return task.bounty_amount || task.credits || 0;
  }

  estimateSuccessRate(task) {
    // 基于任务类型估计成功率
    const taskText = (task.title + ' ' + (task.body || '')).toLowerCase();
    
    // 高成功率任务
    const highSuccessKeywords = [
      '文案', '文章', '图文', '脚本', '创意',
      'content', 'copy', 'writing', 'script'
    ];

    // 低成功率任务
    const lowSuccessKeywords = [
      'code', '编程', '开发', '技术',
      'technical', 'engineering', 'debug'
    ];

    for (const keyword of highSuccessKeywords) {
      if (taskText.includes(keyword)) {
        return 0.9;
      }
    }

    for (const keyword of lowSuccessKeywords) {
      if (taskText.includes(keyword)) {
        return 0.3;
      }
    }

    return 0.6; // 默认成功率
  }

  async analyzeTask(task) {
    console.log(`分析任务: ${task.title}`);
    
    // 分析任务类型
    const taskType = this.analyzeTaskType(task);
    
    // 分析任务需求
    const requirements = this.analyzeTaskRequirements(task);
    
    // 分析目标平台
    const targetPlatforms = this.analyzeTargetPlatforms(task);
    
    return {
      taskId: task.task_id,
      title: task.title,
      type: taskType,
      requirements: requirements,
      targetPlatforms: targetPlatforms,
      estimatedDifficulty: this.estimateTaskDifficulty(task),
      estimatedTime: this.estimateTaskTime(task),
      potentialCredits: this.getTaskCredits(task),
      originalTask: task
    };
  }

  analyzeTaskType(task) {
    const taskText = (task.title + ' ' + (task.body || '')).toLowerCase();
    
    if (taskText.includes('小红书') || taskText.includes('xiaohongshu')) {
      return 'xiaohongshu_content';
    }
    
    if (taskText.includes('公众号') || taskText.includes('wechat article')) {
      return 'wechat_article';
    }
    
    if (taskText.includes('视频号') || taskText.includes('video')) {
      return 'video_content';
    }
    
    if (taskText.includes('文案') || taskText.includes('copy')) {
      return 'copywriting';
    }
    
    return 'general_content';
  }

  analyzeTaskRequirements(task) {
    const requirements = [];
    const taskText = (task.title + ' ' + (task.body || '')).toLowerCase();
    
    if (taskText.includes('痛点')) {
      requirements.push('pain_point');
    }
    
    if (taskText.includes('钩子') || taskText.includes('hook')) {
      requirements.push('hook');
    }
    
    if (taskText.includes('情感') || taskText.includes('emotion')) {
      requirements.push('emotional');
    }
    
    if (taskText.includes('深度') || taskText.includes('deep')) {
      requirements.push('deep_analysis');
    }
    
    if (taskText.includes('节奏') || taskText.includes('rhythm')) {
      requirements.push('pace');
    }
    
    return requirements;
  }

  analyzeTargetPlatforms(task) {
    const platforms = [];
    const taskText = (task.title + ' ' + (task.body || '')).toLowerCase();
    
    if (taskText.includes('小红书')) {
      platforms.push('xiaohongshu');
    }
    
    if (taskText.includes('公众号')) {
      platforms.push('wechat_article');
    }
    
    if (taskText.includes('视频号')) {
      platforms.push('video_account');
    }
    
    return platforms;
  }

  estimateTaskDifficulty(task) {
    const taskText = (task.title + ' ' + (task.body || '')).length;
    if (taskText < 100) {
      return 'easy';
    } else if (taskText < 300) {
      return 'medium';
    } else {
      return 'hard';
    }
  }

  estimateTaskTime(task) {
    const difficulty = this.estimateTaskDifficulty(task);
    switch (difficulty) {
      case 'easy':
        return 15 * 60 * 1000; // 15分钟
      case 'medium':
        return 30 * 60 * 1000; // 30分钟
      case 'hard':
        return 60 * 60 * 1000; // 60分钟
      default:
        return 20 * 60 * 1000; // 20分钟
    }
  }

  async completeTask(task, publishResult) {
    try {
      if (!task.task_id || !publishResult) {
        throw new Error('任务信息不完整');
      }

      // 获取发布的资产 ID
      let assetId = null;
      if (publishResult.asset_ids && publishResult.asset_ids.length > 0) {
        assetId = publishResult.asset_ids[0];
      } else if (publishResult.bundle_id) {
        assetId = publishResult.bundle_id;
      }

      if (!assetId) {
        throw new Error('找不到资产 ID');
      }

      console.log(`正在完成任务: ${task.title}, 资产 ID: ${assetId}`);
      const result = await this.connector.completeTask(task.task_id, assetId);
      console.log('任务完成成功:', result);
      return result;
    } catch (error) {
      console.error('完成任务失败:', error.message);
      throw error;
    }
  }

  // 辅助方法：生成任务分析报告
  generateTaskReport(task) {
    const analysis = this.analyzeTask(task);
    return {
      taskId: task.task_id,
      title: task.title,
      type: analysis.type,
      requirements: analysis.requirements,
      targetPlatforms: analysis.targetPlatforms,
      difficulty: analysis.estimatedDifficulty,
      estimatedTime: analysis.estimatedTime,
      potentialCredits: analysis.potentialCredits,
      successRate: this.estimateSuccessRate(task),
      timestamp: new Date().toISOString()
    };
  }
}

module.exports = TaskManager;