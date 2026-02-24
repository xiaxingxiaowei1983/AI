const crypto = require('crypto');

class AssetPublisher {
  constructor(config, connector) {
    this.config = config;
    this.connector = connector;
  }

  async publishAsset(content, task) {
    try {
      // 生成 Gene+Capsule+EvolutionEvent 三件套
      const assets = this.generateAssetBundle(content, task);
      
      // 发布资产
      const publishResult = await this.connector.publishAsset(assets, task.task_id || task.id);
      
      this.log('info', `资产发布成功: ${publishResult.asset_id}`);
      
      // 监控资产验证状态
      await this.monitorAssetStatus(publishResult.asset_id);
      
      return publishResult;
    } catch (error) {
      this.log('error', `资产发布失败: ${error.message}`);
      throw error;
    }
  }

  generateAssetBundle(content, task) {
    const timestamp = new Date().toISOString();
    const bundleId = this.generateId();

    // Gene - 核心信息
    const gene = {
      id: this.generateId('gene'),
      type: 'content_strategy',
      version: '1.0.0',
      name: content.title,
      description: content.description,
      author: this.config.agentName,
      agent_type: this.config.agentType,
      tags: content.tags || [],
      created_at: timestamp,
      version_history: [{
        version: '1.0.0',
        timestamp: timestamp,
        changes: 'Initial creation'
      }]
    };

    // Capsule - 内容包
    const capsule = {
      id: this.generateId('capsule'),
      gene_id: gene.id,
      type: content.platform === 'xiaohongshu' ? 'social_media_post' :
             content.platform === 'video' ? 'short_video' : 'article',
      title: content.title,
      content: content.content,
      platform: content.platform,
      format: content.format,
      metadata: {
        word_count: content.content.length,
        platform_specific: content.platformSpecific,
        target_audience: content.targetAudience
      },
      created_at: timestamp,
      updated_at: timestamp
    };

    // EvolutionEvent - 进化事件
    const evolutionEvent = {
      id: this.generateId('event'),
      type: 'content_creation',
      agent_id: this.config.nodeId,
      agent_name: this.config.agentName,
      gene_id: gene.id,
      capsule_id: capsule.id,
      task_id: task.task_id || task.id,
      task_title: task.title,
      timestamp: timestamp,
      description: `Created content for task: ${task.title}`,
      metrics: {
        estimated_reach: content.estimatedReach || 1000,
        engagement_score: content.engagementScore || 75,
        quality_score: content.qualityScore || 85
      },
      context: {
        task_requirements: task.description,
        content_strategy: content.strategy
      }
    };

    return [gene, capsule, evolutionEvent];
  }

  async monitorAssetStatus(assetId) {
    this.log('info', `开始监控资产状态: ${assetId}`);

    // 监控逻辑 - 这里可以实现轮询检查资产状态
    // 从 candidate 到 promoted
    for (let i = 0; i < 5; i++) {
      const status = await this.connector.getAssetStatus(assetId);
      if (status && status.status === 'promoted') {
        this.log('info', `资产已成功验证: ${assetId}`);
        return true;
      }
      
      this.log('info', `资产状态: ${status?.status || 'unknown'}, 等待中...`);
      await this.sleep(60000); // 每分钟检查一次
    }

    this.log('warn', `资产监控超时: ${assetId}`);
    return false;
  }

  generateId(prefix = 'asset') {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    const hash = crypto.createHash('md5')
      .update(`${prefix}_${timestamp}_${random}_${Math.random()}`)
      .digest('hex');
    return `${prefix}_${timestamp}_${hash.slice(0, 8)}`;
  }

  async sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  log(level, message) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] [${level.toUpperCase()}] [AssetPublisher] ${message}`);
  }
}

module.exports = AssetPublisher;