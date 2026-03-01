/**
 * EvoMap资产和任务获取工具
 * 基于evomap-publish-skill.md文档流程
 * 功能：获取可用胶囊/技能、可接任务、推荐资产
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const EVOMAP_API = 'https://evomap.ai';
const CONFIG_FILE = path.join(__dirname, 'evolver', 'config.json');

class EvoMapExplorer {
  constructor() {
    this.config = this.loadConfig();
  }

  /**
   * 加载配置
   */
  loadConfig() {
    if (fs.existsSync(CONFIG_FILE)) {
      try {
        return JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
      } catch (error) {
        console.error('加载配置失败:', error.message);
        return {};
      }
    }
    return {};
  }

  /**
   * API请求
   */
  async apiRequest(endpoint, options = {}) {
    return new Promise((resolve, reject) => {
      try {
        const url = `${EVOMAP_API}${endpoint}`;
        const req = https.request(url, {
          method: options.method || 'GET',
          headers: {
            'Content-Type': 'application/json',
            ...options.headers
          },
          timeout: 30000
        }, (res) => {
          let data = '';
          res.on('data', (chunk) => {
            data += chunk;
          });
          res.on('end', () => {
            try {
              const jsonData = JSON.parse(data);
              resolve({ statusCode: res.statusCode, data: jsonData });
            } catch (error) {
              resolve({ statusCode: res.statusCode, data: data });
            }
          });
        });

        req.on('error', (error) => {
          reject(new Error(`网络错误: ${error.message}`));
        });

        req.on('timeout', () => {
          req.destroy();
          reject(new Error('请求超时'));
        });

        if (options.body) {
          req.write(JSON.stringify(options.body));
        }

        req.end();
      } catch (error) {
        reject(new Error(`请求失败: ${error.message}`));
      }
    });
  }

  /**
   * 获取推荐资产
   */
  async getRecommendedAssets() {
    console.log('=== 获取EvoMap推荐资产 ===\n');

    try {
      // 发送hello请求获取推荐资产
      const helloData = {
        protocol: "gep-a2a",
        protocol_version: "1.0.0",
        message_type: "hello",
        message_id: `msg_${Date.now()}_${Math.floor(Math.random() * 10000)}`,
        sender_id: this.config.agent_id || "node_c3c7ebfa60b867f1",
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
            agent_name: this.config.agent_name || "大掌柜",
            role: this.config.role || "company_brain"
          }
        }
      };

      const response = await this.apiRequest('/a2a/hello', {
        method: 'POST',
        body: helloData
      });

      if (response.statusCode === 200 && response.data) {
        const payload = response.data.payload || {};
        const recommendedAssets = payload.recommended_assets || [];
        
        console.log(`✅ 成功获取 ${recommendedAssets.length} 个推荐资产\n`);

        // 分类资产
        const capsules = recommendedAssets.filter(asset => asset.asset_type === 'Capsule');
        const genes = recommendedAssets.filter(asset => asset.asset_type === 'Gene');
        const otherAssets = recommendedAssets.filter(asset => !['Capsule', 'Gene'].includes(asset.asset_type));

        // 显示胶囊/技能
        if (capsules.length > 0) {
          console.log('💊 可学习的胶囊/技能:');
          console.log('=====================================');
          capsules.forEach((capsule, index) => {
            console.log(`${index + 1}. ${capsule.summary}`);
            console.log(`   资产ID: ${capsule.asset_id}`);
            console.log(`   GDI评分: ${capsule.gdi_score}`);
            console.log(`   触发词: ${capsule.triggers?.join(', ') || '无'}`);
            console.log('');
          });
          console.log('=====================================\n');
        }

        // 显示基因
        if (genes.length > 0) {
          console.log('🧬 可学习的基因:');
          console.log('=====================================');
          genes.forEach((gene, index) => {
            console.log(`${index + 1}. ${gene.summary}`);
            console.log(`   资产ID: ${gene.asset_id}`);
            console.log(`   GDI评分: ${gene.gdi_score}`);
            console.log(`   触发词: ${gene.triggers?.join(', ') || '无'}`);
            console.log('');
          });
          console.log('=====================================\n');
        }

        // 显示推荐任务
        const recommendedTasks = payload.recommended_tasks || [];
        if (recommendedTasks.length > 0) {
          console.log('📋 可接的推荐任务:');
          console.log('=====================================');
          recommendedTasks.forEach((task, index) => {
            console.log(`${index + 1}. ${task.title}`);
            console.log(`   任务ID: ${task.task_id}`);
            console.log(`   信号: ${task.signals}`);
            console.log(`   最低声望: ${task.min_reputation || 0}`);
            console.log(`   截止时间: ${task.expires_at}`);
            console.log(`   相关度: ${task.relevance}`);
            console.log('');
          });
          console.log('=====================================\n');
        }

        // 显示协作机会
        const collaborationOpportunities = payload.collaboration_opportunities || [];
        if (collaborationOpportunities.length > 0) {
          console.log('🤝 协作机会:');
          console.log('=====================================');
          collaborationOpportunities.forEach((opp, index) => {
            console.log(`${index + 1}. ${opp.session_title}`);
            console.log(`   会话ID: ${opp.session_id}`);
            console.log(`   任务: ${opp.task_title}`);
            console.log(`   参与人数: ${opp.participants}`);
            console.log(`   复杂度: ${opp.complexity}`);
            console.log(`   相关度: ${opp.relevance}`);
            console.log('');
          });
          console.log('=====================================\n');
        }

        // 显示网络信息
        const networkManifest = payload.network_manifest || {};
        if (networkManifest.stats) {
          console.log('🌐 EvoMap网络信息:');
          console.log('=====================================');
          console.log(`总节点数: ${networkManifest.stats.total_agents || 0}`);
          console.log(`24小时活跃: ${networkManifest.stats.active_24h || 0}`);
          console.log(`总资产数: ${networkManifest.stats.total_assets || 0}`);
          console.log(`已推广资产: ${networkManifest.stats.promoted_assets || 0}`);
          console.log('=====================================\n');
        }

        return {
          capsules,
          genes,
          otherAssets,
          tasks: recommendedTasks,
          collaborations: collaborationOpportunities,
          network: networkManifest
        };

      } else {
        console.error('❌ 获取推荐资产失败:', response.statusCode);
        return null;
      }

    } catch (error) {
      console.error('❌ 获取推荐资产错误:', error.message);
      return null;
    }
  }

  /**
   * 获取热门资产
   */
  async getTrendingAssets() {
    console.log('=== 获取EvoMap热门资产 ===\n');

    try {
      const response = await this.apiRequest('/a2a/trending');

      if (response.statusCode === 200 && response.data) {
        const assets = Array.isArray(response.data) ? response.data : [];
        
        console.log(`✅ 成功获取 ${assets.length} 个热门资产\n`);

        if (assets.length > 0) {
          console.log('🔥 热门资产:');
          console.log('=====================================');
          assets.forEach((asset, index) => {
            console.log(`${index + 1}. ${asset.summary || asset.title}`);
            console.log(`   资产ID: ${asset.asset_id}`);
            console.log(`   类型: ${asset.asset_type || asset.type}`);
            console.log(`   GDI评分: ${asset.gdi_score || 'N/A'}`);
            console.log('');
          });
          console.log('=====================================\n');
        }

        return assets;

      } else {
        console.error('❌ 获取热门资产失败:', response.statusCode);
        return [];
      }

    } catch (error) {
      console.error('❌ 获取热门资产错误:', error.message);
      return [];
    }
  }

  /**
   * 获取可接任务
   */
  async getAvailableTasks() {
    console.log('=== 获取EvoMap可接任务 ===\n');

    try {
      const response = await this.apiRequest('/a2a/task/list');

      if (response.statusCode === 200 && response.data) {
        const tasks = Array.isArray(response.data) ? response.data : [];
        
        console.log(`✅ 成功获取 ${tasks.length} 个可接任务\n`);

        if (tasks.length > 0) {
          console.log('📋 可接任务:');
          console.log('=====================================');
          tasks.forEach((task, index) => {
            console.log(`${index + 1}. ${task.title}`);
            console.log(`   任务ID: ${task.task_id || task.id}`);
            console.log(`   信号: ${task.signals || task.tags}`);
            console.log(`   最低声望: ${task.min_reputation || 0}`);
            console.log(`   截止时间: ${task.expires_at || task.deadline}`);
            console.log(`   相关度: ${task.relevance || 'N/A'}`);
            console.log('');
          });
          console.log('=====================================\n');
        }

        return tasks;

      } else {
        console.error('❌ 获取任务失败:', response.statusCode);
        return [];
      }

    } catch (error) {
      console.error('❌ 获取任务错误:', error.message);
      return [];
    }
  }

  /**
   * 搜索资产
   */
  async searchAssets(signals) {
    console.log(`=== 搜索资产: ${signals} ===\n`);

    try {
      const encodedSignals = encodeURIComponent(signals);
      const response = await this.apiRequest(`/a2a/assets/search?signals=${encodedSignals}`);

      if (response.statusCode === 200 && response.data) {
        const assets = Array.isArray(response.data) ? response.data : [];
        
        console.log(`✅ 成功搜索到 ${assets.length} 个资产\n`);

        if (assets.length > 0) {
          console.log('🔍 搜索结果:');
          console.log('=====================================');
          assets.forEach((asset, index) => {
            console.log(`${index + 1}. ${asset.summary || asset.title}`);
            console.log(`   资产ID: ${asset.asset_id}`);
            console.log(`   类型: ${asset.asset_type || asset.type}`);
            console.log(`   GDI评分: ${asset.gdi_score || 'N/A'}`);
            console.log('');
          });
          console.log('=====================================\n');
        }

        return assets;

      } else {
        console.error('❌ 搜索资产失败:', response.statusCode);
        return [];
      }

    } catch (error) {
      console.error('❌ 搜索资产错误:', error.message);
      return [];
    }
  }

  /**
   * 探索EvoMap
   */
  async exploreEvoMap() {
    console.log('=====================================');
    console.log('      EvoMap 资产和任务探索');
    console.log('=====================================\n');

    // 1. 获取推荐资产
    const recommended = await this.getRecommendedAssets();

    // 2. 获取热门资产
    await this.getTrendingAssets();

    // 3. 获取可接任务
    await this.getAvailableTasks();

    // 4. 搜索相关技能
    console.log('=== 搜索相关技能 ===\n');
    const skills = ['javascript', 'python', 'api', 'optimization'];
    
    for (const skill of skills) {
      await this.searchAssets(skill);
      // 避免API限制
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log('=====================================');
    console.log('        探索完成！');
    console.log('=====================================');
    console.log('');
    console.log('📌 推荐操作:');
    console.log('1. 学习高GDI评分的胶囊/技能');
    console.log('2. 接取适合你声望的任务');
    console.log('3. 参与相关的协作会话');
    console.log('4. 发布你自己的资产获取积分');
    console.log('');

    return recommended;
  }
}

// 主函数
async function main() {
  const explorer = new EvoMapExplorer();
  await explorer.exploreEvoMap();
}

// 执行
if (require.main === module) {
  main().catch(console.error);
}

module.exports = EvoMapExplorer;
