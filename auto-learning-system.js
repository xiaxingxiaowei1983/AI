const EvoMapSDK = require('./evomap-sdk');
const LearningManager = require('./learning-manager');
const fs = require('fs');
const path = require('path');

class AutoLearningSystem {
  constructor(options = {}) {
    this.config = {
      scanInterval: options.scanInterval || 3600000, // 默认1小时
      maxAssetsPerScan: options.maxAssetsPerScan || 10,
      learningSources: options.learningSources || ['github', 'clawhub', 'evomap'],
      storageDir: options.storageDir || path.join(__dirname, 'auto-learning-storage')
    };
    
    this.sdk = new EvoMapSDK({ logLevel: 'info' });
    this.learningManager = new LearningManager();
    this.state = {
      lastScan: null,
      discoveredAssets: new Map(),
      learnedSkills: new Map(),
      learningHistory: []
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
      lastScan: this.state.lastScan,
      discoveredAssets: Object.fromEntries(this.state.discoveredAssets),
      learnedSkills: Object.fromEntries(this.state.learnedSkills),
      learningHistory: this.state.learningHistory
    };
    
    fs.writeFileSync(statePath, JSON.stringify(serializableState, null, 2));
  }
  
  loadState() {
    const statePath = path.join(this.config.storageDir, 'state.json');
    if (fs.existsSync(statePath)) {
      try {
        const data = JSON.parse(fs.readFileSync(statePath, 'utf8'));
        if (data.lastScan) this.state.lastScan = data.lastScan;
        if (data.discoveredAssets) {
          this.state.discoveredAssets = new Map(Object.entries(data.discoveredAssets));
        }
        if (data.learnedSkills) {
          this.state.learnedSkills = new Map(Object.entries(data.learnedSkills));
        }
        if (data.learningHistory) this.state.learningHistory = data.learningHistory;
      } catch (error) {
        console.error('加载状态失败:', error.message);
      }
    }
  }
  
  async start() {
    console.log('🚀 启动主动学习系统');
    
    // 连接到EvoMap
    const connected = await this.sdk.connect();
    if (!connected) {
      console.error('❌ 无法连接到EvoMap，学习系统启动失败');
      return false;
    }
    
    // 开始定期扫描
    this.scanInterval = setInterval(async () => {
      await this.scanForAssets();
    }, this.config.scanInterval);
    
    // 立即执行一次扫描
    await this.scanForAssets();
    
    console.log('✅ 主动学习系统启动成功');
    return true;
  }
  
  stop() {
    if (this.scanInterval) {
      clearInterval(this.scanInterval);
    }
    console.log('🛑 主动学习系统已停止');
  }
  
  async scanForAssets() {
    console.log('🔍 开始扫描EvoMap资产');
    
    try {
      // 搜索胶囊资产
      const capsules = await this.sdk.searchCapsules();
      if (capsules && capsules.capsules) {
        console.log(`📦 发现 ${capsules.capsules.length} 个胶囊资产`);
        
        // 筛选未学习的资产
        const newAssets = capsules.capsules.filter(capsule => {
          return !this.state.discoveredAssets.has(capsule.asset_id);
        }).slice(0, this.config.maxAssetsPerScan);
        
        console.log(`🌟 发现 ${newAssets.length} 个新资产`);
        
        for (const asset of newAssets) {
          await this.processAsset(asset);
        }
      }
      
      this.state.lastScan = new Date().toISOString();
      this.saveState();
      console.log('✅ 资产扫描完成');
      
    } catch (error) {
      console.error('扫描资产失败:', error.message);
    }
  }
  
  async processAsset(asset) {
    console.log(`📚 处理资产: ${asset.asset_id}`);
    
    // 标记为已发现
    this.state.discoveredAssets.set(asset.asset_id, {
      asset_id: asset.asset_id,
      discoveredAt: new Date().toISOString(),
      type: asset.type,
      summary: asset.summary
    });
    
    // 分析资产内容
    const content = asset.content || asset.summary || '无内容';
    
    // 搜索相关学习资源
    const resources = this.learningManager.searchLearningResources(
      content, 
      this.config.learningSources
    );
    
    // 从视频平台学习
    const videoLearningResult = await this.learningManager.learnFromVideoPlatform(content);
    
    // 创建新技能
    const skillName = `evomap-asset-${asset.asset_id.substring(0, 10)}`;
    const skillDescription = `基于EvoMap资产 ${asset.asset_id} 创建的技能`;
    const skillContent = `# EvoMap资产学习\n\n## 资产信息\n- 资产ID: ${asset.asset_id}\n- 类型: ${asset.type}\n- 摘要: ${asset.summary || '无'}\n\n## 学习资源\n${resources.map(r => `- [${r.source}](${r.url})`).join('\n')}\n\n## 学习成果\n${videoLearningResult.success ? videoLearningResult.result.learnedTopics.map(t => `- ${t}`).join('\n') : '无'}\n\n## 原始内容\n${content}`;
    
    const createResult = this.learningManager.createNewSkill(
      skillName, 
      skillDescription, 
      skillContent
    );
    
    if (createResult.success) {
      this.state.learnedSkills.set(skillName, {
        skillName: skillName,
        assetId: asset.asset_id,
        createdAt: new Date().toISOString(),
        resources: resources.length
      });
      
      // 记录学习历史
      const historyEntry = {
        assetId: asset.asset_id,
        skillName: skillName,
        resources: resources.length,
        videoLearning: videoLearningResult.success,
        timestamp: new Date().toISOString()
      };
      
      this.state.learningHistory.push(historyEntry);
      if (this.state.learningHistory.length > 100) {
        this.state.learningHistory = this.state.learningHistory.slice(-100);
      }
      
      console.log(`✅ 资产学习完成: ${asset.asset_id} -> ${skillName}`);
    } else {
      console.error(`❌ 资产学习失败: ${asset.asset_id}`, createResult.error);
    }
    
    this.saveState();
  }
  
  getStatus() {
    return {
      lastScan: this.state.lastScan,
      discoveredAssets: this.state.discoveredAssets.size,
      learnedSkills: this.state.learnedSkills.size,
      learningHistory: this.state.learningHistory.length
    };
  }
  
  getLearningHistory() {
    return this.state.learningHistory;
  }
  
  getLearnedSkills() {
    return Array.from(this.state.learnedSkills.values());
  }
}

module.exports = AutoLearningSystem;

if (require.main === module) {
  async function main() {
    console.log('========================================');
    console.log('🚀 主动学习系统测试');
    console.log('========================================');
    
    const learningSystem = new AutoLearningSystem({
      scanInterval: 300000, // 5分钟
      maxAssetsPerScan: 5
    });
    
    await learningSystem.start();
    
    // 运行一段时间后停止
    setTimeout(() => {
      learningSystem.stop();
      console.log('📊 系统状态:', learningSystem.getStatus());
      console.log('========================================');
      console.log('🎉 测试完成');
      console.log('========================================');
    }, 60000); // 1分钟后停止
  }
  
  main().catch(error => {
    console.error('测试错误:', error.message);
  });
}