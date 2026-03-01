const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

class AutoCollaborationSystem {
  constructor(options = {}) {
    this.config = {
      checkInterval: options.checkInterval || 300000, // 默认5分钟
      storageDir: options.storageDir || path.join(__dirname, 'auto-collaboration-storage'),
      maxCollaborations: options.maxCollaborations || 50
    };
    
    this.state = {
      lastCheck: null,
      activeCollaborations: new Map(),
      completedCollaborations: new Map(),
      collaborationHistory: []
    };
    
    this.initializeStorage();
    this.loadState();
  }
  
  initializeStorage() {
    if (!fs.existsSync(this.config.storageDir)) {
      fs.mkdirSync(this.config.storageDir, { recursive: true });
    }
  }
  
  saveState() {
    const statePath = path.join(this.config.storageDir, 'state.json');
    const serializableState = {
      lastCheck: this.state.lastCheck,
      activeCollaborations: Object.fromEntries(this.state.activeCollaborations),
      completedCollaborations: Object.fromEntries(this.state.completedCollaborations),
      collaborationHistory: this.state.collaborationHistory
    };
    
    fs.writeFileSync(statePath, JSON.stringify(serializableState, null, 2));
  }
  
  loadState() {
    const statePath = path.join(this.config.storageDir, 'state.json');
    if (fs.existsSync(statePath)) {
      try {
        const data = JSON.parse(fs.readFileSync(statePath, 'utf8'));
        if (data.lastCheck) this.state.lastCheck = data.lastCheck;
        if (data.activeCollaborations) {
          this.state.activeCollaborations = new Map(Object.entries(data.activeCollaborations));
        }
        if (data.completedCollaborations) {
          this.state.completedCollaborations = new Map(Object.entries(data.completedCollaborations));
        }
        if (data.collaborationHistory) this.state.collaborationHistory = data.collaborationHistory;
      } catch (error) {
        console.error('加载状态失败:', error.message);
      }
    }
  }
  
  async start() {
    console.log('🚀 启动主动协作参与系统');
    
    // 开始定期检查协作
    this.checkInterval = setInterval(async () => {
      await this.checkForCollaborations();
    }, this.config.checkInterval);
    
    // 立即执行一次检查
    await this.checkForCollaborations();
    
    console.log('✅ 主动协作参与系统启动成功');
    return true;
  }
  
  stop() {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
    }
    console.log('🛑 主动协作参与系统已停止');
  }
  
  async checkForCollaborations() {
    console.log('🔍 开始检查协作会话');
    
    try {
      // 这里应该实现具体的协作会话发现逻辑
      // 例如从协作平台API获取会话列表
      
      // 模拟发现协作会话
      const collaborations = this.simulateCollaborationDiscovery();
      console.log(`📋 发现 ${collaborations.length} 个协作会话`);
      
      // 处理新的协作会话
      for (const collaboration of collaborations) {
        if (!this.state.activeCollaborations.has(collaboration.id) &&
            !this.state.completedCollaborations.has(collaboration.id)) {
          await this.joinCollaboration(collaboration);
        }
      }
      
      this.state.lastCheck = new Date().toISOString();
      this.saveState();
      console.log('✅ 协作会话检查完成');
      
    } catch (error) {
      console.error('检查协作会话失败:', error.message);
    }
  }
  
  simulateCollaborationDiscovery() {
    // 模拟协作会话数据
    const collaborations = [
      {
        id: 'collab_1',
        title: 'EvoMap资产优化讨论',
        description: '讨论如何优化EvoMap资产的质量和价值',
        participants: 3,
        status: 'active',
        created_at: new Date(Date.now() - 3600000).toISOString()
      },
      {
        id: 'collab_2',
        title: '任务执行策略分享',
        description: '分享EvoMap任务执行的最佳实践',
        participants: 5,
        status: 'active',
        created_at: new Date(Date.now() - 7200000).toISOString()
      },
      {
        id: 'collab_3',
        title: '知识管理系统设计',
        description: '设计更高效的知识管理系统',
        participants: 4,
        status: 'planning',
        created_at: new Date(Date.now() - 10800000).toISOString()
      }
    ];
    
    return collaborations;
  }
  
  async joinCollaboration(collaboration) {
    console.log(`🤝 加入协作会话: ${collaboration.title} (${collaboration.id})`);
    
    // 分析协作会话
    const analysis = this.analyzeCollaboration(collaboration);
    console.log('协作分析:', analysis);
    
    // 生成贡献内容
    const contribution = this.generateContribution(collaboration, analysis);
    
    // 标记为活跃协作
    this.state.activeCollaborations.set(collaboration.id, {
      ...collaboration,
      joinedAt: new Date().toISOString(),
      contribution: contribution,
      status: 'joined'
    });
    
    // 记录协作历史
    const historyEntry = {
      collaborationId: collaboration.id,
      title: collaboration.title,
      action: 'joined',
      timestamp: new Date().toISOString(),
      contribution: contribution
    };
    
    this.state.collaborationHistory.push(historyEntry);
    if (this.state.collaborationHistory.length > 100) {
      this.state.collaborationHistory = this.state.collaborationHistory.slice(-100);
    }
    
    this.saveState();
    console.log(`✅ 成功加入协作会话: ${collaboration.id}`);
  }
  
  analyzeCollaboration(collaboration) {
    // 分析协作会话的主题、参与者和状态
    const keywords = collaboration.title.toLowerCase().split(/\s+/);
    const descriptionWords = collaboration.description.toLowerCase().split(/\s+/);
    const allWords = [...keywords, ...descriptionWords];
    
    // 识别协作类型
    let collaborationType = 'general';
    if (allWords.includes('evomap')) collaborationType = 'evomap';
    if (allWords.includes('task') || allWords.includes('任务')) collaborationType = 'task';
    if (allWords.includes('knowledge') || allWords.includes('知识')) collaborationType = 'knowledge';
    if (allWords.includes('asset') || allWords.includes('资产')) collaborationType = 'asset';
    
    // 评估协作价值
    let valueScore = 0;
    if (collaboration.participants > 3) valueScore += 0.3;
    if (collaboration.status === 'active') valueScore += 0.5;
    if (collaborationType !== 'general') valueScore += 0.2;
    
    return {
      type: collaborationType,
      valueScore: Math.min(valueScore, 1.0),
      keywords: [...new Set(allWords)].filter(word => word.length > 2),
      participantCount: collaboration.participants,
      status: collaboration.status
    };
  }
  
  generateContribution(collaboration, analysis) {
    // 根据协作分析生成贡献内容
    let contribution = `# 协作贡献: ${collaboration.title}\n\n`;
    contribution += `## 分析\n`;
    contribution += `- 协作类型: ${analysis.type}\n`;
    contribution += `- 价值评分: ${(analysis.valueScore * 100).toFixed(0)}%\n`;
    contribution += `- 关键词: ${analysis.keywords.join(', ')}\n\n`;
    
    // 根据协作类型生成不同的贡献内容
    if (analysis.type === 'evomap') {
      contribution += `## 关于EvoMap的见解\n`;
      contribution += `1. EvoMap作为去中心化知识网络，具有巨大的发展潜力\n`;
      contribution += `2. 资产质量是EvoMap生态系统健康发展的关键\n`;
      contribution += `3. 建议加强资产验证机制，提高整体质量\n`;
    } else if (analysis.type === 'task') {
      contribution += `## 任务执行建议\n`;
      contribution += `1. 任务筛选应基于智能体的专长和能力\n`;
      contribution += `2. 建立任务执行质量评估机制\n`;
      contribution += `3. 共享任务执行的最佳实践和经验\n`;
    } else if (analysis.type === 'knowledge') {
      contribution += `## 知识管理建议\n`;
      contribution += `1. 建立分层知识结构，提高知识检索效率\n`;
      contribution += `2. 实现知识自动分类和标签系统\n`;
      contribution += `3. 建立知识质量评估和更新机制\n`;
    } else if (analysis.type === 'asset') {
      contribution += `## 资产优化建议\n`;
      contribution += `1. 资产创建应注重实用性和创新性\n`;
      contribution += `2. 建立资产质量评分系统\n`;
      contribution += `3. 促进优质资产的传播和应用\n`;
    } else {
      contribution += `## 一般性建议\n`;
      contribution += `1. 建立清晰的协作目标和时间表\n`;
      contribution += `2. 确保所有参与者都能充分表达意见\n`;
      contribution += `3. 定期评估协作进展并调整策略\n`;
    }
    
    contribution += `\n## 结论\n`;
    contribution += `希望这些建议能够对协作有所帮助，期待与各位共同推进项目发展。`;
    
    return contribution;
  }
  
  async leaveCollaboration(collaborationId) {
    const collaboration = this.state.activeCollaborations.get(collaborationId);
    if (collaboration) {
      console.log(`👋 离开协作会话: ${collaboration.title} (${collaborationId})`);
      
      // 标记为已完成
      this.state.completedCollaborations.set(collaborationId, {
        ...collaboration,
        leftAt: new Date().toISOString(),
        status: 'completed'
      });
      
      // 从活跃协作中移除
      this.state.activeCollaborations.delete(collaborationId);
      
      // 记录协作历史
      const historyEntry = {
        collaborationId: collaborationId,
        title: collaboration.title,
        action: 'left',
        timestamp: new Date().toISOString()
      };
      
      this.state.collaborationHistory.push(historyEntry);
      if (this.state.collaborationHistory.length > 100) {
        this.state.collaborationHistory = this.state.collaborationHistory.slice(-100);
      }
      
      this.saveState();
      console.log(`✅ 成功离开协作会话: ${collaborationId}`);
      return true;
    }
    return false;
  }
  
  getStatus() {
    return {
      lastCheck: this.state.lastCheck,
      activeCollaborations: this.state.activeCollaborations.size,
      completedCollaborations: this.state.completedCollaborations.size,
      collaborationHistory: this.state.collaborationHistory.length
    };
  }
  
  getActiveCollaborations() {
    return Array.from(this.state.activeCollaborations.values());
  }
  
  getCompletedCollaborations() {
    return Array.from(this.state.completedCollaborations.values());
  }
  
  getCollaborationHistory() {
    return this.state.collaborationHistory;
  }
}

module.exports = AutoCollaborationSystem;

if (require.main === module) {
  async function main() {
    console.log('========================================');
    console.log('🤝 主动协作参与系统测试');
    console.log('========================================');
    
    const collaborationSystem = new AutoCollaborationSystem({
      checkInterval: 60000 // 1分钟
    });
    
    await collaborationSystem.start();
    
    // 运行一段时间后停止
    setTimeout(async () => {
      collaborationSystem.stop();
      console.log('📊 系统状态:', collaborationSystem.getStatus());
      console.log('活跃协作:', collaborationSystem.getActiveCollaborations().length);
      console.log('========================================');
      console.log('🎉 测试完成');
      console.log('========================================');
    }, 30000); // 30秒后停止
  }
  
  main().catch(error => {
    console.error('测试错误:', error.message);
  });
}