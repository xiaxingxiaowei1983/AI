/**
 * 碧莲自主学习系统
 * 实现EvoMap资产自动发现、学习和整合
 */

const EvoMapSDK = require('./evomap-sdk');
const fs = require('fs');
const path = require('path');

class AutonomousLearningSystem {
  constructor() {
    this.sdk = new EvoMapSDK({
      logLevel: 'info',
      retryAttempts: 3
    });
    this.learningDir = path.join(__dirname, 'autonomous-learning-assets');
    this.config = {
      learningInterval: 3600000, // 每小时学习一次
      minGdiScore: 60, // 最低GDI评分
      maxAssetsPerSession: 5, // 每次学习最多5个资产
      priorityCategories: ['error', 'debug', 'retry', 'memory', 'session', 'feishu'] // 优先学习的类别
    };
    this.state = {
      lastLearningTime: null,
      learnedAssets: new Set(),
      learningQueue: [],
      integrationResults: []
    };
    this.initializeSystem();
  }

  /**
   * 初始化系统
   */
  initializeSystem() {
    this.initializeDirectories();
    this.loadState();
    this.startLearningScheduler();
    console.log('🚀 碧莲自主学习系统已启动');
  }

  /**
   * 初始化目录
   */
  initializeDirectories() {
    const dirs = [
      this.learningDir,
      path.join(this.learningDir, 'assets'),
      path.join(this.learningDir, 'analysis'),
      path.join(this.learningDir, 'integration')
    ];
    dirs.forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });
  }

  /**
   * 加载状态
   */
  loadState() {
    const statePath = path.join(this.learningDir, 'state.json');
    if (fs.existsSync(statePath)) {
      try {
        const data = JSON.parse(fs.readFileSync(statePath, 'utf8'));
        if (data.lastLearningTime) {
          this.state.lastLearningTime = new Date(data.lastLearningTime);
        }
        if (data.learnedAssets) {
          this.state.learnedAssets = new Set(data.learnedAssets);
        }
        if (data.learningQueue) {
          this.state.learningQueue = data.learningQueue;
        }
        if (data.integrationResults) {
          this.state.integrationResults = data.integrationResults;
        }
        console.log('✅ 学习状态加载成功');
      } catch (error) {
        console.log('❌ 学习状态加载失败:', error.message);
      }
    }
  }

  /**
   * 保存状态
   */
  saveState() {
    const statePath = path.join(this.learningDir, 'state.json');
    const state = {
      lastLearningTime: this.state.lastLearningTime?.toISOString(),
      learnedAssets: Array.from(this.state.learnedAssets),
      learningQueue: this.state.learningQueue,
      integrationResults: this.state.integrationResults
    };
    fs.writeFileSync(statePath, JSON.stringify(state, null, 2));
  }

  /**
   * 启动学习调度器
   */
  startLearningScheduler() {
    console.log('⏰ 启动学习调度器，每小时自动学习');
    
    // 立即执行一次学习
    this.learnFromEvoMap();
    
    // 设置定时学习
    setInterval(() => {
      this.learnFromEvoMap();
    }, this.config.learningInterval);
  }

  /**
   * 从EvoMap学习
   */
  async learnFromEvoMap() {
    console.log('\n========================================');
    console.log('🧠 开始自主学习...');
    console.log('========================================');

    try {
      // 连接到EvoMap
      const connected = await this.sdk.connect();
      if (!connected) {
        console.log('❌ EvoMap连接失败，跳过本次学习');
        return;
      }

      // 获取推荐资产
      const assets = await this.getRecommendedAssets();
      if (!assets || assets.length === 0) {
        console.log('❌ 未获取到推荐资产');
        return;
      }

      // 筛选和排序资产
      const filteredAssets = this.filterAndPrioritizeAssets(assets);
      console.log(`✅ 筛选出 ${filteredAssets.length} 个高优先级资产`);

      // 学习资产
      for (let i = 0; i < Math.min(filteredAssets.length, this.config.maxAssetsPerSession); i++) {
        const asset = filteredAssets[i];
        await this.learnAsset(asset);
      }

      // 整合学习内容
      await this.integrateLearning();

      // 更新学习时间
      this.state.lastLearningTime = new Date();
      this.saveState();

      console.log('\n========================================');
      console.log('🎉 本次学习完成！');
      console.log('========================================');
    } catch (error) {
      console.log('❌ 学习过程出错:', error.message);
    }
  }

  /**
   * 获取推荐资产
   */
  async getRecommendedAssets() {
    console.log('🔍 获取EvoMap推荐资产...');
    
    try {
      const response = await this.sdk.apiRequest('/a2a/hello', {
        method: 'POST',
        body: {
          protocol: 'gep-a2a',
          protocol_version: '1.0.0',
          message_type: 'hello',
          message_id: this.sdk.generateMessageId(),
          sender_id: this.sdk.config.nodeId,
          timestamp: new Date().toISOString(),
          payload: {
            capabilities: {
              assetFetch: true,
              taskClaim: true,
              assetPublish: true,
              sessionCollaboration: true
            },
            gene_count: 0,
            capsule_count: 0,
            env_fingerprint: {
              platform: process.platform,
              arch: process.arch,
              node_version: process.version,
              agent_name: '碧莲',
              role: 'CGO'
            }
          }
        }
      });

      if (response.statusCode === 200 && response.data && response.data.payload) {
        return response.data.payload.recommended_assets || [];
      }
      return [];
    } catch (error) {
      console.log('❌ 获取推荐资产错误:', error.message);
      return [];
    }
  }

  /**
   * 筛选和优先级排序资产
   */
  filterAndPrioritizeAssets(assets) {
    return assets
      // 筛选未学习过的资产
      .filter(asset => !this.state.learnedAssets.has(asset.asset_id))
      // 筛选高GDI评分
      .filter(asset => asset.gdi_score >= this.config.minGdiScore)
      // 按优先级和GDI评分排序
      .sort((a, b) => {
        const priorityA = this.getAssetPriority(a);
        const priorityB = this.getAssetPriority(b);
        
        if (priorityA !== priorityB) {
          return priorityB - priorityA;
        }
        return b.gdi_score - a.gdi_score;
      });
  }

  /**
   * 获取资产优先级
   */
  getAssetPriority(asset) {
    const summary = (asset.summary || '').toLowerCase();
    const triggers = (asset.triggers || []).map(t => t.toLowerCase());
    
    let priority = 0;
    
    // 基于类别优先级
    for (const category of this.config.priorityCategories) {
      if (summary.includes(category) || triggers.some(t => t.includes(category))) {
        priority += 10;
      }
    }
    
    // 基于资产类型
    if (asset.asset_type === 'Capsule') {
      priority += 5;
    }
    
    // 基于GDI评分
    priority += asset.gdi_score / 10;
    
    return priority;
  }

  /**
   * 学习单个资产
   */
  async learnAsset(asset) {
    console.log(`\n📚 学习资产: ${asset.summary}`);
    console.log(`   GDI评分: ${asset.gdi_score}`);
    console.log(`   资产类型: ${asset.asset_type}`);
    console.log(`   资产ID: ${asset.asset_id}`);

    try {
      // 保存资产到本地
      this.saveAsset(asset);
      
      // 分析资产
      const analysis = this.analyzeAsset(asset);
      this.saveAnalysis(asset, analysis);
      
      // 标记为已学习
      this.state.learnedAssets.add(asset.asset_id);
      
      console.log('✅ 资产学习完成');
    } catch (error) {
      console.log('❌ 学习资产失败:', error.message);
    }
  }

  /**
   * 保存资产
   */
  saveAsset(asset) {
    const assetPath = path.join(this.learningDir, 'assets', `${asset.asset_id.replace('sha256:', '')}.json`);
    fs.writeFileSync(assetPath, JSON.stringify(asset, null, 2));
  }

  /**
   * 分析资产
   */
  analyzeAsset(asset) {
    const summary = (asset.summary || '').toLowerCase();
    const triggers = asset.triggers || [];
    
    return {
      gdiScore: asset.gdi_score,
      assetType: asset.asset_type,
      summary: asset.summary,
      triggers: triggers,
      potentialUses: this.analyzePotentialUses(summary, triggers),
      integrationPoints: this.analyzeIntegrationPoints(triggers),
      priority: this.getAssetPriority(asset),
      analysisTime: new Date().toISOString()
    };
  }

  /**
   * 分析潜在用途
   */
  analyzePotentialUses(summary, triggers) {
    const uses = [];
    
    if (summary.includes('error') || summary.includes('debug')) {
      uses.push('错误处理和自动修复');
    }
    if (summary.includes('retry') || summary.includes('timeout')) {
      uses.push('网络请求优化');
    }
    if (summary.includes('feishu') || summary.includes('message')) {
      uses.push('消息投递优化');
    }
    if (summary.includes('kubernetes') || summary.includes('container')) {
      uses.push('容器管理优化');
    }
    if (summary.includes('memory') || summary.includes('session')) {
      uses.push('内存和会话管理');
    }
    if (summary.includes('ai') || summary.includes('agent')) {
      uses.push('AI智能体优化');
    }

    return uses.length > 0 ? uses : ['通用优化'];
  }

  /**
   * 分析集成点
   */
  analyzeIntegrationPoints(triggers) {
    const points = [];
    
    if (triggers.some(t => t.includes('error'))) {
      points.push('错误处理系统');
    }
    if (triggers.some(t => t.includes('timeout'))) {
      points.push('API调用系统');
    }
    if (triggers.some(t => t.includes('feishu'))) {
      points.push('飞书集成系统');
    }
    if (triggers.some(t => t.includes('memory'))) {
      points.push('内存管理系统');
    }
    if (triggers.some(t => t.includes('session'))) {
      points.push('会话管理系统');
    }

    return points.length > 0 ? points : ['通用系统集成'];
  }

  /**
   * 保存分析结果
   */
  saveAnalysis(asset, analysis) {
    const analysisPath = path.join(this.learningDir, 'analysis', `${asset.asset_id.replace('sha256:', '')}-analysis.json`);
    fs.writeFileSync(analysisPath, JSON.stringify(analysis, null, 2));
  }

  /**
   * 整合学习内容
   */
  async integrateLearning() {
    console.log('\n🔄 整合学习内容...');
    
    try {
      // 读取所有分析结果
      const analysisDir = path.join(this.learningDir, 'analysis');
      const analysisFiles = fs.readdirSync(analysisDir);
      
      const integrations = [];
      
      for (const file of analysisFiles) {
        if (file.endsWith('-analysis.json')) {
          const analysisPath = path.join(analysisDir, file);
          const analysis = JSON.parse(fs.readFileSync(analysisPath, 'utf8'));
          
          // 生成集成建议
          const integration = this.generateIntegration(analysis);
          integrations.push(integration);
        }
      }
      
      // 保存集成结果
      const integrationPath = path.join(this.learningDir, 'integration', `integration-${Date.now()}.json`);
      fs.writeFileSync(integrationPath, JSON.stringify(integrations, null, 2));
      
      this.state.integrationResults = integrations;
      
      console.log(`✅ 整合完成，生成 ${integrations.length} 个集成建议`);
    } catch (error) {
      console.log('❌ 整合学习内容失败:', error.message);
    }
  }

  /**
   * 生成集成建议
   */
  generateIntegration(analysis) {
    return {
      assetId: analysis.assetId,
      assetType: analysis.assetType,
      gdiScore: analysis.gdiScore,
      potentialUses: analysis.potentialUses,
      integrationPoints: analysis.integrationPoints,
      integrationSuggestion: this.generateIntegrationSuggestion(analysis),
      priority: analysis.priority,
      integrationTime: new Date().toISOString()
    };
  }

  /**
   * 生成集成建议
   */
  generateIntegrationSuggestion(analysis) {
    const suggestions = [];
    
    if (analysis.potentialUses.includes('错误处理和自动修复')) {
      suggestions.push('将错误处理机制集成到智能体的核心错误处理系统');
    }
    if (analysis.potentialUses.includes('网络请求优化')) {
      suggestions.push('将HTTP重试机制集成到API调用系统');
    }
    if (analysis.potentialUses.includes('消息投递优化')) {
      suggestions.push('将消息投递降级链集成到飞书集成系统');
    }
    if (analysis.potentialUses.includes('内存和会话管理')) {
      suggestions.push('将跨会话记忆连续性集成到记忆管理系统');
    }
    if (analysis.potentialUses.includes('AI智能体优化')) {
      suggestions.push('将AI代理调试框架集成到智能体自我监控系统');
    }
    
    return suggestions.length > 0 ? suggestions : ['通用系统集成'];
  }

  /**
   * 获取学习状态
   */
  getLearningStatus() {
    return {
      nodeId: this.sdk.config.nodeId,
      lastLearningTime: this.state.lastLearningTime,
      learnedAssetsCount: this.state.learnedAssets.size,
      learningQueueLength: this.state.learningQueue.length,
      integrationResultsCount: this.state.integrationResults.length,
      learningDir: this.learningDir
    };
  }
}

// 主函数
async function main() {
  console.log('========================================');
  console.log('🚀 碧莲自主学习系统');
  console.log('========================================');
  
  const learningSystem = new AutonomousLearningSystem();
  
  // 显示初始状态
  console.log('\n📊 初始学习状态:');
  console.log('   ', learningSystem.getLearningStatus());
  
  console.log('\n========================================');
  console.log('🎉 自主学习系统已启动');
  console.log('========================================');
}

// 执行
if (require.main === module) {
  main().catch(console.error);
}

module.exports = AutonomousLearningSystem;
