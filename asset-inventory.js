/**
 * 资产盘点系统
 * 用于管理公司的各种资产，包括智能体、工具、配置文件等
 */

const fs = require('fs');
const path = require('path');
const fsExtra = require('fs-extra');

// 资产存储路径
const ASSET_INVENTORY_DIR = path.join(__dirname, '.trae', 'asset-inventory');
const LONG_TERM_MEMORY_DIR = path.join(__dirname, '.trae', 'long-term-memory');

// 确保目录存在
fsExtra.ensureDirSync(ASSET_INVENTORY_DIR);
fsExtra.ensureDirSync(LONG_TERM_MEMORY_DIR);

class AssetInventory {
  constructor() {
    this.assets = {
      agents: [],
      tools: [],
      configurations: [],
      data: [],
      services: []
    };
    this.longTermMemory = [];
    this.initialized = false;
  }

  /**
   * 初始化资产盘点系统
   */
  initialize() {
    if (this.initialized) {
      console.log('资产盘点系统已经初始化');
      return;
    }

    console.log('开始初始化资产盘点系统...');

    // 初始化资产存储
    this._initializeAssets();

    // 初始化长期记忆
    this._initializeLongTermMemory();

    // 加载历史数据
    this._loadHistoricalData();

    // 执行资产盘点
    this.performAssetInventory();

    this.initialized = true;
    console.log('资产盘点系统初始化成功');
  }

  /**
   * 初始化资产存储
   */
  _initializeAssets() {
    this.assets = {
      agents: [],
      tools: [],
      configurations: [],
      data: [],
      services: []
    };
  }

  /**
   * 初始化长期记忆
   */
  _initializeLongTermMemory() {
    this.longTermMemory = [];
  }

  /**
   * 加载历史数据
   */
  _loadHistoricalData() {
    const assetsPath = path.join(ASSET_INVENTORY_DIR, 'assets.json');
    const memoryPath = path.join(LONG_TERM_MEMORY_DIR, 'memory.json');

    if (fs.existsSync(assetsPath)) {
      try {
        const assetsData = JSON.parse(fs.readFileSync(assetsPath, 'utf8'));
        this.assets = { ...this.assets, ...assetsData };
        console.log('加载历史资产数据成功');
      } catch (error) {
        console.error('加载历史资产数据失败:', error.message);
      }
    }

    if (fs.existsSync(memoryPath)) {
      try {
        const memoryData = JSON.parse(fs.readFileSync(memoryPath, 'utf8'));
        this.longTermMemory = memoryData;
        console.log('加载长期记忆数据成功');
      } catch (error) {
        console.error('加载长期记忆数据失败:', error.message);
      }
    }
  }

  /**
   * 执行资产盘点
   */
  performAssetInventory() {
    console.log('执行资产盘点...');

    // 盘点智能体
    this._inventoryAgents();

    // 盘点工具
    this._inventoryTools();

    // 盘点配置文件
    this._inventoryConfigurations();

    // 盘点数据文件
    this._inventoryData();

    // 盘点服务
    this._inventoryServices();

    // 保存资产盘点结果
    this._saveAssets();

    console.log('资产盘点完成');
    return this.assets;
  }

  /**
   * 盘点智能体
   */
  _inventoryAgents() {
    const agentsDir = path.join(__dirname, 'agents');
    try {
      const agentDirs = fs.readdirSync(agentsDir);
      const agents = [];

      agentDirs.forEach(agentDir => {
        const agentPath = path.join(agentsDir, agentDir);
        if (fs.statSync(agentPath).isDirectory()) {
          const agentPrompt = path.join(agentPath, 'agent.prompt');
          const configPath = path.join(agentPath, 'config.json');

          const agent = {
            id: agentDir,
            name: agentDir,
            path: agentPath,
            hasPromptFile: fs.existsSync(agentPrompt),
            hasConfigFile: fs.existsSync(configPath),
            status: fs.existsSync(agentPrompt) ? 'HEALTHY' : 'UNHEALTHY',
            createdAt: fs.statSync(agentPath).birthtime,
            lastModified: fs.statSync(agentPath).mtime
          };

          // 读取配置文件（如果存在）
          if (fs.existsSync(configPath)) {
            try {
              const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
              agent.config = config;
            } catch (error) {
              console.error(`读取智能体配置文件失败: ${agentDir}`, error.message);
            }
          }

          agents.push(agent);
        }
      });

      this.assets.agents = agents;
      console.log(`盘点智能体: ${agents.length} 个`);
    } catch (error) {
      console.error('盘点智能体失败:', error.message);
    }
  }

  /**
   * 盘点工具
   */
  _inventoryTools() {
    const toolsDir = path.join(__dirname, 'tools');
    try {
      const toolFiles = fs.readdirSync(toolsDir);
      const tools = [];

      toolFiles.forEach(toolFile => {
        const toolPath = path.join(toolsDir, toolFile);
        if (fs.statSync(toolPath).isFile() && toolFile.endsWith('.js')) {
          const tool = {
            id: path.basename(toolFile, '.js'),
            name: path.basename(toolFile, '.js'),
            path: toolPath,
            type: 'tool',
            status: 'HEALTHY',
            createdAt: fs.statSync(toolPath).birthtime,
            lastModified: fs.statSync(toolPath).mtime
          };

          tools.push(tool);
        }
      });

      this.assets.tools = tools;
      console.log(`盘点工具: ${tools.length} 个`);
    } catch (error) {
      console.error('盘点工具失败:', error.message);
    }
  }

  /**
   * 盘点配置文件
   */
  _inventoryConfigurations() {
    const configFiles = [
      path.join(__dirname, 'config.json'),
      path.join(__dirname, '.env'),
      path.join(__dirname, 'package.json')
    ];

    const configurations = [];

    configFiles.forEach(configPath => {
      if (fs.existsSync(configPath)) {
        const config = {
          id: path.basename(configPath),
          name: path.basename(configPath),
          path: configPath,
          type: 'configuration',
          status: 'HEALTHY',
          createdAt: fs.statSync(configPath).birthtime,
          lastModified: fs.statSync(configPath).mtime
        };

        configurations.push(config);
      }
    });

    this.assets.configurations = configurations;
    console.log(`盘点配置文件: ${configurations.length} 个`);
  }

  /**
   * 盘点数据文件
   */
  _inventoryData() {
    const dataDirs = [
      path.join(__dirname, '.trae'),
      path.join(__dirname, 'skills'),
      path.join(__dirname, 'capabilities')
    ];

    const data = [];

    dataDirs.forEach(dataDir => {
      if (fs.existsSync(dataDir)) {
        this._walkDirectory(dataDir, (filePath) => {
          if (filePath.endsWith('.json') || filePath.endsWith('.md')) {
            const dataItem = {
              id: path.relative(__dirname, filePath),
              name: path.basename(filePath),
              path: filePath,
              type: filePath.endsWith('.json') ? 'json' : 'markdown',
              status: 'HEALTHY',
              createdAt: fs.statSync(filePath).birthtime,
              lastModified: fs.statSync(filePath).mtime
            };

            data.push(dataItem);
          }
        });
      }
    });

    this.assets.data = data;
    console.log(`盘点数据文件: ${data.length} 个`);
  }

  /**
   * 盘点服务
   */
  _inventoryServices() {
    const services = [
      {
        id: 'git',
        name: 'Git',
        type: 'version_control',
        status: this._checkGitStatus() ? 'HEALTHY' : 'UNHEALTHY',
        lastChecked: new Date()
      },
      {
        id: 'pcec',
        name: 'PCEC System',
        type: 'evolution',
        status: fs.existsSync(path.join(__dirname, 'pcec-cycle.js')) ? 'HEALTHY' : 'UNHEALTHY',
        lastChecked: new Date()
      },
      {
        id: 'knowledgeBase',
        name: 'Knowledge Base',
        type: 'knowledge_management',
        status: fs.existsSync(path.join(__dirname, 'knowledge-base.js')) ? 'HEALTHY' : 'UNHEALTHY',
        lastChecked: new Date()
      },
      {
        id: 'capabilityTree',
        name: 'Capability Tree',
        type: 'capability_management',
        status: fs.existsSync(path.join(__dirname, 'capabilities', 'capability-tree.js')) ? 'HEALTHY' : 'UNHEALTHY',
        lastChecked: new Date()
      },
      {
        id: 'monitoring',
        name: 'Monitoring System',
        type: 'monitoring',
        status: fs.existsSync(path.join(__dirname, 'monitoring-system.js')) ? 'HEALTHY' : 'UNHEALTHY',
        lastChecked: new Date()
      }
    ];

    this.assets.services = services;
    console.log(`盘点服务: ${services.length} 个`);
  }

  /**
   * 检查Git状态
   */
  _checkGitStatus() {
    try {
      const { execSync } = require('child_process');
      execSync('git status', { timeout: 5000, stdio: 'pipe' });
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * 遍历目录
   */
  _walkDirectory(dir, callback) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        this._walkDirectory(filePath, callback);
      } else {
        callback(filePath);
      }
    });
  }

  /**
   * 保存资产数据
   */
  _saveAssets() {
    const assetsPath = path.join(ASSET_INVENTORY_DIR, 'assets.json');
    fs.writeFileSync(assetsPath, JSON.stringify(this.assets, null, 2));
  }

  /**
   * 保存长期记忆
   */
  _saveLongTermMemory() {
    const memoryPath = path.join(LONG_TERM_MEMORY_DIR, 'memory.json');
    fs.writeFileSync(memoryPath, JSON.stringify(this.longTermMemory, null, 2));
  }

  /**
   * 添加长期记忆
   */
  addLongTermMemory(memory) {
    if (!this.initialized) {
      this.initialize();
    }

    const memoryItem = {
      id: `memory_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...memory,
      createdAt: new Date().toISOString(),
      lastAccessed: new Date().toISOString()
    };

    this.longTermMemory.push(memoryItem);

    // 限制长期记忆长度
    if (this.longTermMemory.length > 1000) {
      this.longTermMemory = this.longTermMemory.slice(-1000);
    }

    // 保存长期记忆
    this._saveLongTermMemory();

    return memoryItem;
  }

  /**
   * 检索长期记忆
   */
  retrieveLongTermMemory(query, limit = 5) {
    if (!this.initialized) {
      this.initialize();
    }

    // 简单的关键词匹配
    const results = this.longTermMemory.filter(memory => {
      const content = JSON.stringify(memory).toLowerCase();
      return content.includes(query.toLowerCase());
    });

    // 按最后访问时间排序
    results.sort((a, b) => {
      return new Date(b.lastAccessed) - new Date(a.lastAccessed);
    });

    return results.slice(0, limit);
  }

  /**
   * 更新长期记忆访问时间
   */
  updateMemoryAccess(memoryId) {
    const memoryIndex = this.longTermMemory.findIndex(memory => memory.id === memoryId);
    if (memoryIndex !== -1) {
      this.longTermMemory[memoryIndex].lastAccessed = new Date().toISOString();
      this._saveLongTermMemory();
      return true;
    }
    return false;
  }

  /**
   * 获取资产统计信息
   */
  getAssetStatistics() {
    if (!this.initialized) {
      this.initialize();
    }

    const statistics = {
      totalAssets: 0,
      assetsByType: {},
      healthyAssets: 0,
      unhealthyAssets: 0,
      lastInventory: new Date().toISOString()
    };

    // 统计智能体
    statistics.assetsByType.agents = this.assets.agents.length;
    statistics.totalAssets += this.assets.agents.length;
    statistics.healthyAssets += this.assets.agents.filter(agent => agent.status === 'HEALTHY').length;
    statistics.unhealthyAssets += this.assets.agents.filter(agent => agent.status === 'UNHEALTHY').length;

    // 统计工具
    statistics.assetsByType.tools = this.assets.tools.length;
    statistics.totalAssets += this.assets.tools.length;
    statistics.healthyAssets += this.assets.tools.filter(tool => tool.status === 'HEALTHY').length;
    statistics.unhealthyAssets += this.assets.tools.filter(tool => tool.status === 'UNHEALTHY').length;

    // 统计配置文件
    statistics.assetsByType.configurations = this.assets.configurations.length;
    statistics.totalAssets += this.assets.configurations.length;
    statistics.healthyAssets += this.assets.configurations.filter(config => config.status === 'HEALTHY').length;
    statistics.unhealthyAssets += this.assets.configurations.filter(config => config.status === 'UNHEALTHY').length;

    // 统计数据文件
    statistics.assetsByType.data = this.assets.data.length;
    statistics.totalAssets += this.assets.data.length;
    statistics.healthyAssets += this.assets.data.filter(data => data.status === 'HEALTHY').length;
    statistics.unhealthyAssets += this.assets.data.filter(data => data.status === 'UNHEALTHY').length;

    // 统计服务
    statistics.assetsByType.services = this.assets.services.length;
    statistics.totalAssets += this.assets.services.length;
    statistics.healthyAssets += this.assets.services.filter(service => service.status === 'HEALTHY').length;
    statistics.unhealthyAssets += this.assets.services.filter(service => service.status === 'UNHEALTHY').length;

    // 统计长期记忆
    statistics.longTermMemoryCount = this.longTermMemory.length;

    return statistics;
  }

  /**
   * 生成资产报告
   */
  generateAssetReport() {
    if (!this.initialized) {
      this.initialize();
    }

    const report = {
      timestamp: new Date().toISOString(),
      assets: this.assets,
      statistics: this.getAssetStatistics(),
      recommendations: this._generateRecommendations()
    };

    // 保存报告
    const reportPath = path.join(ASSET_INVENTORY_DIR, `report_${Date.now()}.json`);
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    console.log(`资产报告已保存到: ${reportPath}`);
    return report;
  }

  /**
   * 生成资产推荐
   */
  _generateRecommendations() {
    const recommendations = [];

    // 检查不健康的智能体
    const unhealthyAgents = this.assets.agents.filter(agent => agent.status === 'UNHEALTHY');
    if (unhealthyAgents.length > 0) {
      recommendations.push({
        type: 'AGENT',
        message: `发现 ${unhealthyAgents.length} 个不健康的智能体，建议检查并修复`,
        severity: 'WARNING',
        items: unhealthyAgents.map(agent => agent.name)
      });
    }

    // 检查不健康的服务
    const unhealthyServices = this.assets.services.filter(service => service.status === 'UNHEALTHY');
    if (unhealthyServices.length > 0) {
      recommendations.push({
        type: 'SERVICE',
        message: `发现 ${unhealthyServices.length} 个不健康的服务，建议检查并修复`,
        severity: 'WARNING',
        items: unhealthyServices.map(service => service.name)
      });
    }

    // 检查长期记忆大小
    if (this.longTermMemory.length > 800) {
      recommendations.push({
        type: 'MEMORY',
        message: '长期记忆接近容量上限，建议清理或优化',
        severity: 'INFO'
      });
    }

    return recommendations;
  }

  /**
   * 与其他系统集成
   */
  integrateWithOtherSystems() {
    // 与监控系统集成
    try {
      const monitoringSystemModule = require('./monitoring-system');
      if (monitoringSystemModule) {
        console.log('资产盘点系统与监控系统集成成功');
      }
    } catch (error) {
      console.error('资产盘点系统与监控系统集成失败:', error.message);
    }

    // 与知识管理系统集成
    try {
      const knowledgeBaseModule = require('./knowledge-base');
      if (knowledgeBaseModule) {
        console.log('资产盘点系统与知识管理系统集成成功');
      }
    } catch (error) {
      console.error('资产盘点系统与知识管理系统集成失败:', error.message);
    }

    // 与Git集成工具集成
    try {
      const gitIntegrationModule = require('./tools/git-integration');
      if (gitIntegrationModule) {
        console.log('资产盘点系统与Git集成工具集成成功');
      }
    } catch (error) {
      console.error('资产盘点系统与Git集成工具集成失败:', error.message);
    }
  }

  /**
   * 清理过期资产
   */
  cleanupExpiredAssets() {
    console.log('清理过期资产...');

    // 清理长期记忆
    const now = new Date();
    const oneYearAgo = new Date(now.setFullYear(now.getFullYear() - 1));

    const filteredMemory = this.longTermMemory.filter(memory => {
      const memoryDate = new Date(memory.createdAt);
      return memoryDate > oneYearAgo;
    });

    const removedCount = this.longTermMemory.length - filteredMemory.length;
    this.longTermMemory = filteredMemory;

    // 保存清理结果
    this._saveLongTermMemory();

    console.log(`清理完成，移除了 ${removedCount} 个过期的长期记忆`);
    return removedCount;
  }
}

// 导出单例
const assetInventory = new AssetInventory();

// 执行初始化
if (require.main === module) {
  assetInventory.initialize();
  console.log('资产盘点系统初始化完成');
  
  // 执行资产盘点
  const inventoryResult = assetInventory.performAssetInventory();
  console.log('资产盘点结果:', JSON.stringify(inventoryResult, null, 2));
  
  // 生成资产报告
  const report = assetInventory.generateAssetReport();
  console.log('资产报告:', JSON.stringify(report.statistics, null, 2));
  
  // 与其他系统集成
  assetInventory.integrateWithOtherSystems();
  
  // 清理过期资产
  assetInventory.cleanupExpiredAssets();
}

module.exports = {
  AssetInventory,
  assetInventory
};