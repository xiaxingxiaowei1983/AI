/**
 * 从EvoMap学习高GDI评分胶囊
 * 直接连接EvoMap并学习优质资产
 */

const EvoMapSDK = require('./evomap-sdk');
const fs = require('fs');
const path = require('path');

class EvoMapLearner {
  constructor() {
    this.sdk = new EvoMapSDK({
      logLevel: 'info',
      retryAttempts: 3
    });
    this.learningDir = path.join(__dirname, 'evomap-learned-assets');
    this.initializeLearningDir();
  }

  /**
   * 初始化学习目录
   */
  initializeLearningDir() {
    if (!fs.existsSync(this.learningDir)) {
      fs.mkdirSync(this.learningDir, { recursive: true });
    }
  }

  /**
   * 连接到EvoMap
   */
  async connect() {
    console.log('🔗 连接到EvoMap...');
    const connected = await this.sdk.connect();
    if (connected) {
      console.log('✅ EvoMap连接成功');
      console.log('📋 节点ID:', this.sdk.config.nodeId);
      return true;
    } else {
      console.log('❌ EvoMap连接失败');
      return false;
    }
  }

  /**
   * 获取推荐资产
   */
  async getRecommendedAssets() {
    console.log('\n🔍 获取推荐资产...');
    
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
        const recommendedAssets = response.data.payload.recommended_assets || [];
        console.log(`✅ 成功获取 ${recommendedAssets.length} 个推荐资产`);
        return recommendedAssets;
      } else {
        console.log('❌ 获取推荐资产失败:', response.statusCode);
        return [];
      }
    } catch (error) {
      console.log('❌ 获取推荐资产错误:', error.message);
      return [];
    }
  }

  /**
   * 学习高GDI评分的胶囊
   */
  async learnHighGdiCapsules() {
    console.log('========================================');
    console.log('🧬 EvoMap 学习系统');
    console.log('========================================');

    // 连接到EvoMap
    const connected = await this.connect();
    if (!connected) {
      return;
    }

    // 获取推荐资产
    const assets = await this.getRecommendedAssets();

    // 筛选高GDI评分的胶囊
    const highGdiCapsules = assets
      .filter(asset => asset.asset_type === 'Capsule')
      .filter(asset => asset.gdi_score >= 60)
      .sort((a, b) => b.gdi_score - a.gdi_score);

    console.log(`\n💊 发现 ${highGdiCapsules.length} 个高GDI评分胶囊:`);
    console.log('========================================');

    // 学习每个胶囊
    for (const capsule of highGdiCapsules) {
      console.log(`\n${highGdiCapsules.indexOf(capsule) + 1}. ${capsule.summary}`);
      console.log(`   GDI评分: ${capsule.gdi_score}`);
      console.log(`   资产ID: ${capsule.asset_id}`);
      console.log(`   触发词: ${capsule.triggers?.join(', ') || '无'}`);

      // 保存胶囊到本地
      await this.saveCapsule(capsule);

      // 学习胶囊内容
      await this.learnCapsule(capsule);
    }

    console.log('\n========================================');
    console.log('🎉 EvoMap学习完成！');
    console.log('========================================');
    console.log(`📁 学习成果保存目录: ${this.learningDir}`);
  }

  /**
   * 保存胶囊到本地
   */
  async saveCapsule(capsule) {
    const capsulePath = path.join(this.learningDir, `${capsule.asset_id.replace('sha256:', '')}.json`);
    fs.writeFileSync(capsulePath, JSON.stringify(capsule, null, 2));
    console.log(`   ✅ 保存到本地: ${path.basename(capsulePath)}`);
  }

  /**
   * 学习胶囊内容
   */
  async learnCapsule(capsule) {
    console.log('   🧠 正在学习...');

    // 分析胶囊内容
    const analysis = {
      gdiScore: capsule.gdi_score,
      summary: capsule.summary,
      triggers: capsule.triggers || [],
      potentialUses: this.analyzePotentialUses(capsule),
      integrationPoints: this.analyzeIntegrationPoints(capsule)
    };

    // 保存分析结果
    const analysisPath = path.join(this.learningDir, `${capsule.asset_id.replace('sha256:', '')}-analysis.json`);
    fs.writeFileSync(analysisPath, JSON.stringify(analysis, null, 2));
    console.log(`   ✅ 学习分析完成`);
  }

  /**
   * 分析潜在用途
   */
  analyzePotentialUses(capsule) {
    const uses = [];
    const summary = capsule.summary.toLowerCase();

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

    return uses.length > 0 ? uses : ['通用优化'];
  }

  /**
   * 分析集成点
   */
  analyzeIntegrationPoints(capsule) {
    const points = [];
    const triggers = capsule.triggers || [];

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

    return points.length > 0 ? points : ['通用系统集成'];
  }
}

// 主函数
async function main() {
  const learner = new EvoMapLearner();
  await learner.learnHighGdiCapsules();
}

// 执行
if (require.main === module) {
  main().catch(console.error);
}

module.exports = EvoMapLearner;
