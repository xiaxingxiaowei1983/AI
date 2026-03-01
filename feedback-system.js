/**
 * 反馈系统
 * 用于收集和分析用户反馈，驱动系统进化
 * 状态: ENHANCED (增强版) - 8小时进化方案优化
 */

const fs = require('fs');
const path = require('path');

class FeedbackSystem {
  constructor() {
    this.feedbackDir = path.join(__dirname, 'feedback');
    this.logDir = path.join(__dirname, 'logs', 'feedback');
    this.stateFile = path.join(this.feedbackDir, 'feedback-state.json');
    this.feedbackCount = 0;
    this.processedCount = 0;
    this.pendingCount = 0;
    
    this._initialize();
  }

  // 初始化
  _initialize() {
    // 创建必要的目录
    if (!fs.existsSync(this.feedbackDir)) {
      fs.mkdirSync(this.feedbackDir, { recursive: true });
    }
    
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
    
    // 加载状态
    this._loadState();
  }

  // 加载状态
  _loadState() {
    if (fs.existsSync(this.stateFile)) {
      try {
        const state = JSON.parse(fs.readFileSync(this.stateFile, 'utf8'));
        this.feedbackCount = state.feedbackCount || 0;
        this.processedCount = state.processedCount || 0;
        this.pendingCount = state.pendingCount || 0;
      } catch (error) {
        console.error('加载反馈系统状态失败:', error.message);
      }
    }
  }

  // 保存状态
  _saveState() {
    const state = {
      feedbackCount: this.feedbackCount,
      processedCount: this.processedCount,
      pendingCount: this.pendingCount,
      timestamp: Date.now()
    };
    
    fs.writeFileSync(this.stateFile, JSON.stringify(state, null, 2), 'utf8');
  }

  // 收集反馈
  collectFeedback(feedback) {
    const feedbackId = `feedback_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const feedbackData = {
      id: feedbackId,
      timestamp: Date.now(),
      type: feedback.type || 'general',
      content: feedback.content,
      severity: feedback.severity || 'medium',
      source: feedback.source || 'system',
      status: 'pending',
      metadata: feedback.metadata || {}
    };
    
    // 保存反馈
    const feedbackPath = path.join(this.feedbackDir, `${feedbackId}.json`);
    fs.writeFileSync(feedbackPath, JSON.stringify(feedbackData, null, 2), 'utf8');
    
    // 更新状态
    this.feedbackCount++;
    this.pendingCount++;
    this._saveState();
    
    return feedbackId;
  }

  // 处理反馈
  processFeedback(feedbackId, processingResult) {
    const feedbackPath = path.join(this.feedbackDir, `${feedbackId}.json`);
    if (!fs.existsSync(feedbackPath)) {
      throw new Error('反馈不存在');
    }
    
    const feedback = JSON.parse(fs.readFileSync(feedbackPath, 'utf8'));
    feedback.status = processingResult.status || 'processed';
    feedback.processedAt = Date.now();
    feedback.processingResult = processingResult;
    
    // 保存处理结果
    fs.writeFileSync(feedbackPath, JSON.stringify(feedback, null, 2), 'utf8');
    
    // 更新状态
    this.processedCount++;
    this.pendingCount--;
    this._saveState();
    
    return feedback;
  }

  // 获取未处理的反馈
  getPendingFeedback() {
    const pendingFeedback = [];
    const files = fs.readdirSync(this.feedbackDir);
    
    files.forEach(file => {
      if (file.endsWith('.json')) {
        const feedbackPath = path.join(this.feedbackDir, file);
        try {
          const feedback = JSON.parse(fs.readFileSync(feedbackPath, 'utf8'));
          if (feedback.status === 'pending') {
            pendingFeedback.push(feedback);
          }
        } catch (error) {
          console.error('读取反馈文件失败:', error.message);
        }
      }
    });
    
    return pendingFeedback;
  }

  // 分析反馈
  analyzeFeedback() {
    const feedbacks = [];
    const files = fs.readdirSync(this.feedbackDir);
    
    files.forEach(file => {
      if (file.endsWith('.json')) {
        const feedbackPath = path.join(this.feedbackDir, file);
        try {
          const feedback = JSON.parse(fs.readFileSync(feedbackPath, 'utf8'));
          feedbacks.push(feedback);
        } catch (error) {
          console.error('读取反馈文件失败:', error.message);
        }
      }
    });
    
    // 分析反馈
    const analysis = {
      total: feedbacks.length,
      byType: {},
      bySeverity: {},
      byStatus: {},
      recent: feedbacks
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, 10)
    };
    
    feedbacks.forEach(feedback => {
      // 按类型统计
      analysis.byType[feedback.type] = (analysis.byType[feedback.type] || 0) + 1;
      
      // 按严重程度统计
      analysis.bySeverity[feedback.severity] = (analysis.bySeverity[feedback.severity] || 0) + 1;
      
      // 按状态统计
      analysis.byStatus[feedback.status] = (analysis.byStatus[feedback.status] || 0) + 1;
    });
    
    return analysis;
  }

  // 获取系统状态
  getStatus() {
    return {
      feedbackCount: this.feedbackCount,
      processedCount: this.processedCount,
      pendingCount: this.pendingCount,
      timestamp: Date.now()
    };
  }
}

// 导出单例实例
const feedbackSystem = new FeedbackSystem();

module.exports = {
  FeedbackSystem,
  feedbackSystem,
  // 工具接口
  collectFeedback: (feedback) => feedbackSystem.collectFeedback(feedback),
  processFeedback: (feedbackId, processingResult) => feedbackSystem.processFeedback(feedbackId, processingResult),
  getPendingFeedback: () => feedbackSystem.getPendingFeedback(),
  analyzeFeedback: () => feedbackSystem.analyzeFeedback(),
  getStatus: () => feedbackSystem.getStatus()
};

// 示例用法
if (require.main === module) {
  console.log('=== 反馈系统测试 ===');
  console.log('反馈系统状态:', feedbackSystem.getStatus());
}
