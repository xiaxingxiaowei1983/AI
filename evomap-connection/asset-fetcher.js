const fs = require('fs');
const path = require('path');
const EvoMapConnectionService = require('./connection-service');

class EvoMapAssetFetcher {
  constructor() {
    this.connectionService = new EvoMapConnectionService();
    this.fetchInterval = 4 * 60 * 60 * 1000; // 4小时
    this.minGdiScore = 60;
    this.assetDir = path.join(__dirname, 'assets');
    this.skillsDir = path.join(__dirname, 'skills');
    this.logsDir = path.join(__dirname, 'logs');
    this.fetchTimer = null;
    this.lastFetchTime = null;
    this.fetchedAssets = [];
    
    // 创建目录结构
    this.createDirectories();
  }

  /**
   * 创建必要的目录
   */
  createDirectories() {
    const directories = [this.assetDir, this.skillsDir, this.logsDir];
    directories.forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`📁 创建目录: ${dir}`);
      }
    });
  }

  /**
   * 获取推荐资产
   */
  async fetchPromotedAssets() {
    try {
      console.log('🔍 获取 EvoMap 推荐资产...');
      
      // 确保连接服务已启动
      if (!this.connectionService.isConnected) {
        const connected = await this.connectionService.initialize();
        if (!connected) {
          console.error('❌ 无法连接到 EvoMap');
          return [];
        }
      }

      // 发送获取推荐资产请求
      const fetchData = {
        protocol: 'gep-a2a',
        protocol_version: '1.0.0',
        message_type: 'fetch',
        message_id: this.connectionService.generateMessageId(),
        sender_id: this.connectionService.nodeId,
        timestamp: new Date().toISOString(),
        payload: {
          asset_type: 'Gene',
          include_tasks: true
        }
      };

      const response = await this.connectionService.sendRequest('/a2a/fetch', 'POST', fetchData);
      
      if (response.statusCode === 200) {
        const assets = response.data.assets || [];
        console.log(`✅ 成功获取 ${assets.length} 个推荐资产`);
        console.log('资产详情:', JSON.stringify(assets, null, 2));
        
        // 不过滤资产，获取所有可用资产
        const highValueAssets = assets;
        console.log(`📊 共获取 ${highValueAssets.length} 个资产`);
        
        // 保存资产
        await this.saveAssets(highValueAssets);
        
        // 更新技能库
        await this.updateSkillLibrary(highValueAssets);
        
        this.lastFetchTime = Date.now();
        this.fetchedAssets = highValueAssets;
        
        return highValueAssets;
      } else {
        console.error(`❌ 获取资产失败，状态码: ${response.statusCode}`);
        return [];
      }
    } catch (error) {
      console.error(`❌ 获取资产时出错: ${error.message}`);
      return [];
    }
  }

  /**
   * 保存资产
   */
  async saveAssets(assets) {
    if (!assets || assets.length === 0) {
      return;
    }

    // 保存所有资产到一个文件
    const assetsFile = path.join(this.assetDir, 'promoted_assets.json');
    const allAssets = [...this.fetchedAssets, ...assets];
    
    // 去重
    const uniqueAssets = this.removeDuplicateAssets(allAssets);
    
    fs.writeFileSync(assetsFile, JSON.stringify(uniqueAssets, null, 2));
    console.log(`💾 保存 ${uniqueAssets.length} 个资产到 ${assetsFile}`);

    // 为每个高价值资产创建单独的目录
    for (const asset of assets) {
      await this.createAssetDirectory(asset);
    }
  }

  /**
   * 创建资产目录
   */
  async createAssetDirectory(asset) {
    const assetId = asset.asset_id || asset.sha256 || `asset_${Date.now()}`;
    const assetType = asset.type || 'unknown';
    const assetDir = path.join(this.assetDir, `${assetType}_${assetId}`);
    
    if (!fs.existsSync(assetDir)) {
      fs.mkdirSync(assetDir, { recursive: true });
    }

    // 保存资产信息
    const assetInfoFile = path.join(assetDir, 'asset.json');
    fs.writeFileSync(assetInfoFile, JSON.stringify(asset, null, 2));

    // 创建 SKILL.md 文件
    const skillFile = path.join(assetDir, 'SKILL.md');
    const skillContent = this.generateSkillContent(asset);
    fs.writeFileSync(skillFile, skillContent);

    console.log(`📁 创建资产目录: ${assetDir}`);
  }

  /**
   * 生成技能内容
   */
  generateSkillContent(asset) {
    const name = asset.name || `evo-${asset.type}-${asset.asset_id || asset.sha256?.substr(0, 8)}`;
    const description = asset.description || `EvoMap ${asset.type} asset with GDI score ${asset.gdi_score}`;
    
    return `---
name: ${name}
description: ${description}
author: EvoMap
tags:
  - evomap
  - ${asset.type}
  - gdi-${asset.gdi_score}
version: "1.0.0"
---

# ${name}

## 资产信息

- **类型**: ${asset.type}
- **GDI 分数**: ${asset.gdi_score}
- **资产 ID**: ${asset.asset_id || 'N/A'}
- **SHA256**: ${asset.sha256 || 'N/A'}
- **来源**: EvoMap
- **获取时间**: ${new Date().toISOString()}

## 触发文本

${asset.trigger_text || 'N/A'}

## 使用方法

1. 导入此技能到您的智能体
2. 根据触发文本使用相应的功能
3. 结合其他技能创建更强大的能力组合
`;
  }

  /**
   * 更新技能库
   */
  async updateSkillLibrary(assets) {
    if (!assets || assets.length === 0) {
      return;
    }

    // 创建技能注册表
    const skillRegistry = this.createSkillRegistry(assets);
    const registryFile = path.join(this.skillsDir, 'skill-registry.json');
    
    fs.writeFileSync(registryFile, JSON.stringify(skillRegistry, null, 2));
    console.log(`📚 更新技能注册表: ${registryFile}`);

    // 创建技能索引
    const skillIndex = this.createSkillIndex(assets);
    const indexFile = path.join(this.skillsDir, 'skill-index.json');
    
    fs.writeFileSync(indexFile, JSON.stringify(skillIndex, null, 2));
    console.log(`📋 创建技能索引: ${indexFile}`);
  }

  /**
   * 创建技能注册表
   */
  createSkillRegistry(assets) {
    const skills = assets.map(asset => {
      const skillName = asset.name || `evo-${asset.type}-${asset.asset_id || asset.sha256?.substr(0, 8)}`;
      return {
        id: skillName,
        name: skillName,
        type: asset.type,
        gdi_score: asset.gdi_score,
        asset_id: asset.asset_id,
        sha256: asset.sha256,
        trigger_text: asset.trigger_text,
        created_at: new Date().toISOString()
      };
    });

    return {
      version: '1.0.0',
      last_updated: new Date().toISOString(),
      total_skills: skills.length,
      skills
    };
  }

  /**
   * 创建技能索引
   */
  createSkillIndex(assets) {
    const index = {
      by_type: {},
      by_gdi: {},
      by_trigger: {}
    };

    assets.forEach(asset => {
      const skillName = asset.name || `evo-${asset.type}-${asset.asset_id || asset.sha256?.substr(0, 8)}`;
      
      // 按类型索引
      if (!index.by_type[asset.type]) {
        index.by_type[asset.type] = [];
      }
      index.by_type[asset.type].push(skillName);

      // 按 GDI 分数索引
      const gdiRange = Math.floor(asset.gdi_score / 10) * 10;
      const gdiKey = `${gdiRange}-${gdiRange + 9}`;
      if (!index.by_gdi[gdiKey]) {
        index.by_gdi[gdiKey] = [];
      }
      index.by_gdi[gdiKey].push(skillName);

      // 按触发文本索引
      if (asset.trigger_text) {
        const triggers = asset.trigger_text.split(',').map(t => t.trim());
        triggers.forEach(trigger => {
          if (trigger && !index.by_trigger[trigger]) {
            index.by_trigger[trigger] = [];
          }
          if (trigger) {
            index.by_trigger[trigger].push(skillName);
          }
        });
      }
    });

    return index;
  }

  /**
   * 去重资产
   */
  removeDuplicateAssets(assets) {
    const seen = new Set();
    return assets.filter(asset => {
      const key = asset.asset_id || asset.sha256;
      if (key && seen.has(key)) {
        return false;
      }
      if (key) {
        seen.add(key);
      }
      return true;
    });
  }

  /**
   * 启动资产获取服务
   */
  start() {
    console.log('🚀 启动 EvoMap 资产获取服务...');

    // 立即执行一次获取
    this.fetchPromotedAssets();

    // 设置定时任务
    this.fetchTimer = setInterval(() => {
      this.fetchPromotedAssets();
    }, this.fetchInterval);

    console.log(`⏰ 设置资产获取间隔: ${this.fetchInterval / (1000 * 60 * 60)}小时`);
  }

  /**
   * 停止服务
   */
  stop() {
    if (this.fetchTimer) {
      clearInterval(this.fetchTimer);
    }
    this.connectionService.stop();
    console.log('🛑 停止 EvoMap 资产获取服务');
  }

  /**
   * 获取状态
   */
  getStatus() {
    return {
      last_fetch_time: this.lastFetchTime,
      fetched_assets_count: this.fetchedAssets.length,
      min_gdi_score: this.minGdiScore,
      fetch_interval: this.fetchInterval,
      asset_dir: this.assetDir,
      skills_dir: this.skillsDir,
      is_connected: this.connectionService.isConnected
    };
  }

  /**
   * 获取日志
   */
  getLogs(limit = 50) {
    const logFile = path.join(this.logsDir, `asset_fetcher_${new Date().toISOString().split('T')[0]}.log`);
    if (fs.existsSync(logFile)) {
      const logs = fs.readFileSync(logFile, 'utf8')
        .split('\n')
        .filter(line => line.trim())
        .map(line => JSON.parse(line))
        .slice(-limit);
      return logs;
    }
    return [];
  }
}

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
  module.exports = EvoMapAssetFetcher;
}

// 命令行使用
if (typeof process !== 'undefined' && process.argv && process.argv[2]) {
  const fetcher = new EvoMapAssetFetcher();
  const command = process.argv[2];
  
  switch (command) {
    case 'start':
      fetcher.start();
      break;
    case 'fetch':
      fetcher.fetchPromotedAssets();
      break;
    case 'status':
      console.log(JSON.stringify(fetcher.getStatus(), null, 2));
      break;
    case 'logs':
      console.log(JSON.stringify(fetcher.getLogs(), null, 2));
      break;
    case 'stop':
      fetcher.stop();
      break;
    default:
      console.log('Usage: node asset-fetcher.js [start|fetch|status|logs|stop]');
  }
}
