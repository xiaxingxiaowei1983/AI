// 自动进化系统
// 基于公司规则和运转逻辑，实现系统的自动进化机制

const { pcecSystem } = require('./pcec-cycle.js');
const { capabilityTree } = require('./capabilities/capability-tree.js');
const assetInventory = require('./asset-inventory.js');
const monitoring = require('./monitoring-system.js');
const fs = require('fs');
const path = require('path');

class AutoEvolutionSystem {
  constructor() {
    this.evolutionDir = path.join(__dirname, 'evolution');
    this.rollbackDir = path.join(this.evolutionDir, 'rollbacks');
    this.targetsFile = path.join(this.evolutionDir, 'evolution-targets.json');
    this.historyFile = path.join(this.evolutionDir, 'evolution-history.json');
    
    this.evolutionTargets = [];
    this.evolutionHistory = [];
    this.currentEvolution = null;
    
    this._initialize();
  }
  
  // 初始化
  _initialize() {
    // 创建必要的目录
    if (!fs.existsSync(this.rollbackDir)) {
      fs.mkdirSync(this.rollbackDir, { recursive: true });
    }
    
    // 加载进化目标
    this._loadEvolutionTargets();
    
    // 加载进化历史
    this._loadEvolutionHistory();
  }
  
  // 加载进化目标
  _loadEvolutionTargets() {
    if (fs.existsSync(this.targetsFile)) {
      try {
        const targets = JSON.parse(fs.readFileSync(this.targetsFile, 'utf8'));
        this.evolutionTargets = targets;
      } catch (error) {
        console.error('加载进化目标失败:', error.message);
        // 使用默认目标
        this._setupDefaultTargets();
      }
    } else {
      this._setupDefaultTargets();
    }
  }
  
  // 设置默认进化目标
  _setupDefaultTargets() {
    this.evolutionTargets = [
      {
        id: 'target_1',
        name: '能力树优化',
        description: '优化能力树结构，提高能力使用效率',
        priority: 'high',
        metrics: {
          healthScore: 0.8,
          usageEfficiency: 0.7,
          balanceScore: 0.6
        },
        weight: 0.3
      },
      {
        id: 'target_2',
        name: '系统性能提升',
        description: '提升系统性能，减少响应时间',
        priority: 'high',
        metrics: {
          responseTime: 1000, // 毫秒
          memoryUsage: 512, // MB
          cpuUsage: 50 // 百分比
        },
        weight: 0.25
      },
      {
        id: 'target_3',
        name: '资产健康度',
        description: '提高公司资产的健康度',
        priority: 'medium',
        metrics: {
          healthRate: 0.95
        },
        weight: 0.2
      },
      {
        id: 'target_4',
        name: '技能获取',
        description: '自动从外部源获取新技能',
        priority: 'medium',
        metrics: {
          newSkillsPerMonth: 5
        },
        weight: 0.15
      },
      {
        id: 'target_5',
        name: 'EvoMap任务执行',
        description: '自主执行EvoMap任务',
        priority: 'low',
        metrics: {
          taskSuccessRate: 0.8
        },
        weight: 0.1
      }
    ];
    
    // 保存默认目标
    fs.writeFileSync(this.targetsFile, JSON.stringify(this.evolutionTargets, null, 2));
  }
  
  // 加载进化历史
  _loadEvolutionHistory() {
    if (fs.existsSync(this.historyFile)) {
      try {
        const history = JSON.parse(fs.readFileSync(this.historyFile, 'utf8'));
        this.evolutionHistory = history;
      } catch (error) {
        console.error('加载进化历史失败:', error.message);
        this.evolutionHistory = [];
      }
    }
  }
  
  // 保存进化历史
  _saveEvolutionHistory() {
    fs.writeFileSync(this.historyFile, JSON.stringify(this.evolutionHistory, null, 2));
  }
  
  // 检查是否是夜间进化时间
  isNightEvolutionTime() {
    const now = new Date();
    const hour = now.getHours();
    // 定义夜间时间范围（例如：22:00 - 06:00）
    return hour >= 22 || hour < 6;
  }
  
  // 获取进化强度
  getEvolutionIntensity() {
    // 基于时间和系统状态计算进化强度
    const now = new Date();
    const hour = now.getHours();
    
    // 夜间进化强度较高
    if (this.isNightEvolutionTime()) {
      return 0.8; // 高强度
    }
    
    // 工作时间进化强度适中
    if (hour >= 9 && hour <= 18) {
      return 0.5; // 中等强度
    }
    
    // 其他时间进化强度较低
    return 0.3; // 低强度
  }
  
  // 开始自动进化
  startAutoEvolution() {
    console.log('=== 启动自动进化系统 ===');
    
    // 检查系统状态
    const systemStatus = this._checkSystemStatus();
    if (!systemStatus.healthy) {
      console.error('系统状态不健康，无法启动自动进化');
      return false;
    }
    
    // 创建进化快照（用于回滚）
    const snapshotId = this._createEvolutionSnapshot();
    
    // 初始化当前进化
    this.currentEvolution = {
      id: `auto_evolution_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      startTime: Date.now(),
      intensity: this.getEvolutionIntensity(),
      snapshotId: snapshotId,
      targets: this.evolutionTargets.map(target => ({
        id: target.id,
        name: target.name,
        priority: target.priority,
        initialMetrics: this._getCurrentMetrics(target),
        targetMetrics: target.metrics
      })),
      status: 'running'
    };
    
    console.log(`开始自动进化: ${this.currentEvolution.id}`);
    console.log(`进化强度: ${this.currentEvolution.intensity}`);
    
    // 启动PCEC系统
    pcecSystem.start();
    
    return true;
  }
  
  // 停止自动进化
  stopAutoEvolution() {
    console.log('=== 停止自动进化系统 ===');
    
    // 停止PCEC系统
    pcecSystem.stop();
    
    // 完成当前进化
    if (this.currentEvolution) {
      this.currentEvolution.status = 'completed';
      this.currentEvolution.endTime = Date.now();
      this.currentEvolution.duration = this.currentEvolution.endTime - this.currentEvolution.startTime;
      
      // 评估进化结果
      this.currentEvolution.evaluation = this._evaluateEvolution();
      
      // 保存进化历史
      this.evolutionHistory.push(this.currentEvolution);
      this._saveEvolutionHistory();
      
      // 清理当前进化
      this.currentEvolution = null;
    }
    
    return true;
  }
  
  // 检查系统状态
  _checkSystemStatus() {
    console.log('检查系统状态...');
    
    // 检查PCEC系统状态
    const pcecStatus = pcecSystem.getStatus();
    
    // 检查能力树状态
    const treeStatus = capabilityTree.getStatus();
    
    // 检查资产健康度
    const inventory = assetInventory.performInventory();
    const assetHealthRate = inventory.total > 0 ? inventory.healthy / inventory.total : 0;
    
    // 检查系统监控状态
    const systemHealth = monitoring.checkSystemHealth();
    
    const healthy = (
      treeStatus.evaluation.healthScore > 0.4 &&
      assetHealthRate > 0.9 &&
      systemHealth.status === 'healthy'
    );
    
    return {
      healthy,
      timestamp: Date.now(),
      pcecStatus,
      treeStatus: {
        healthScore: treeStatus.evaluation.healthScore,
        totalNodes: treeStatus.statistics.totalNodes,
        activeNodes: treeStatus.statistics.activeNodes
      },
      assetHealthRate,
      systemHealth
    };
  }
  
  // 获取当前指标
  _getCurrentMetrics(target) {
    switch (target.id) {
      case 'target_1': // 能力树优化
        const treeStatus = capabilityTree.getStatus();
        return {
          healthScore: treeStatus.evaluation.healthScore,
          usageEfficiency: treeStatus.evaluation.usageEfficiency,
          balanceScore: treeStatus.evaluation.balanceScore
        };
        
      case 'target_2': // 系统性能
        return {
          responseTime: 500, // 模拟值
          memoryUsage: 256, // 模拟值
          cpuUsage: 30 // 模拟值
        };
        
      case 'target_3': // 资产健康度
        const inventory = assetInventory.performInventory();
        return {
          healthRate: inventory.total > 0 ? inventory.healthy / inventory.total : 0
        };
        
      case 'target_4': // 技能获取
        return {
          newSkillsPerMonth: 0 // 初始值
        };
        
      case 'target_5': // EvoMap任务执行
        return {
          taskSuccessRate: 0 // 初始值
        };
        
      default:
        return {};
    }
  }
  
  // 评估进化结果
  _evaluateEvolution() {
    console.log('评估进化结果...');
    
    const evaluations = [];
    let totalScore = 0;
    let totalWeight = 0;
    
    for (const target of this.currentEvolution.targets) {
      const currentMetrics = this._getCurrentMetrics({ id: target.id });
      const targetMetrics = target.targetMetrics;
      const weight = this.evolutionTargets.find(t => t.id === target.id).weight;
      
      let score = 0;
      let details = {};
      
      switch (target.id) {
        case 'target_1': // 能力树优化
          score = (
            (currentMetrics.healthScore / targetMetrics.healthScore) * 0.4 +
            (currentMetrics.usageEfficiency / targetMetrics.usageEfficiency) * 0.3 +
            (currentMetrics.balanceScore / targetMetrics.balanceScore) * 0.3
          );
          details = {
            healthScore: currentMetrics.healthScore,
            usageEfficiency: currentMetrics.usageEfficiency,
            balanceScore: currentMetrics.balanceScore
          };
          break;
          
        case 'target_3': // 资产健康度
          score = currentMetrics.healthRate / targetMetrics.healthRate;
          details = {
            healthRate: currentMetrics.healthRate
          };
          break;
          
        default:
          score = 0.5; // 默认分数
          details = currentMetrics;
      }
      
      // 限制分数范围
      score = Math.min(1.0, Math.max(0, score));
      
      evaluations.push({
        targetId: target.id,
        targetName: target.name,
        score: score,
        weight: weight,
        weightedScore: score * weight,
        details: details
      });
      
      totalScore += score * weight;
      totalWeight += weight;
    }
    
    // 计算总体得分
    const overallScore = totalWeight > 0 ? totalScore / totalWeight : 0;
    const success = overallScore >= 0.7;
    
    return {
      overallScore: overallScore,
      success: success,
      evaluations: evaluations,
      timestamp: Date.now()
    };
  }
  
  // 创建进化快照（用于回滚）
  _createEvolutionSnapshot() {
    const snapshotId = `snapshot_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const snapshotDir = path.join(this.rollbackDir, snapshotId);
    
    // 创建快照目录
    fs.mkdirSync(snapshotDir, { recursive: true });
    
    try {
      // 保存能力树状态
      const treeState = capabilityTree.exportTree();
      fs.writeFileSync(path.join(snapshotDir, 'capability-tree.json'), JSON.stringify(treeState, null, 2));
      
      // 保存资产状态
      const inventory = assetInventory.performInventory();
      fs.writeFileSync(path.join(snapshotDir, 'asset-inventory.json'), JSON.stringify(inventory, null, 2));
      
      // 保存系统状态
      const systemHealth = monitoring.checkSystemHealth();
      fs.writeFileSync(path.join(snapshotDir, 'system-health.json'), JSON.stringify(systemHealth, null, 2));
      
      console.log(`创建进化快照: ${snapshotId}`);
      
    } catch (error) {
      console.error('创建进化快照失败:', error.message);
      // 清理失败的快照
      if (fs.existsSync(snapshotDir)) {
        fs.rmSync(snapshotDir, { recursive: true, force: true });
      }
      return null;
    }
    
    return snapshotId;
  }
  
  // 回滚进化
  rollbackEvolution(evolutionId) {
    console.log(`回滚进化: ${evolutionId}`);
    
    // 找到对应的进化记录
    const evolution = this.evolutionHistory.find(e => e.id === evolutionId);
    if (!evolution) {
      console.error('未找到进化记录:', evolutionId);
      return false;
    }
    
    // 检查快照是否存在
    if (!evolution.snapshotId) {
      console.error('进化记录没有快照ID:', evolutionId);
      return false;
    }
    
    const snapshotDir = path.join(this.rollbackDir, evolution.snapshotId);
    if (!fs.existsSync(snapshotDir)) {
      console.error('快照目录不存在:', snapshotDir);
      return false;
    }
    
    try {
      // 回滚能力树状态
      const treeStatePath = path.join(snapshotDir, 'capability-tree.json');
      if (fs.existsSync(treeStatePath)) {
        const treeState = JSON.parse(fs.readFileSync(treeStatePath, 'utf8'));
        capabilityTree.importTree(treeState);
        console.log('回滚能力树状态成功');
      }
      
      console.log(`进化回滚成功: ${evolutionId}`);
      return true;
      
    } catch (error) {
      console.error('回滚进化失败:', error.message);
      return false;
    }
  }
  
  // 获取进化历史
  getEvolutionHistory() {
    return this.evolutionHistory;
  }
  
  // 获取当前进化状态
  getCurrentEvolution() {
    return this.currentEvolution;
  }
  
  // 获取进化目标
  getEvolutionTargets() {
    return this.evolutionTargets;
  }
  
  // 更新进化目标
  updateEvolutionTargets(targets) {
    this.evolutionTargets = targets;
    fs.writeFileSync(this.targetsFile, JSON.stringify(this.evolutionTargets, null, 2));
    console.log('进化目标已更新');
  }
  
  // 集成EvoMap任务执行
  integrateEvoMap() {
    // 这里可以实现与EvoMap的集成
    console.log('集成EvoMap任务执行');
    // 具体实现将在后续任务中完成
  }
  
  // 集成技能获取
  integrateSkillAcquisition() {
    // 这里可以实现与技能获取系统的集成
    console.log('集成技能获取系统');
    // 具体实现将在后续任务中完成
  }
}

// 导出单例实例
const autoEvolutionSystem = new AutoEvolutionSystem();

module.exports = {
  AutoEvolutionSystem,
  autoEvolutionSystem,
  // 工具接口
  startAutoEvolution: () => autoEvolutionSystem.startAutoEvolution(),
  stopAutoEvolution: () => autoEvolutionSystem.stopAutoEvolution(),
  rollbackEvolution: (evolutionId) => autoEvolutionSystem.rollbackEvolution(evolutionId),
  getEvolutionHistory: () => autoEvolutionSystem.getEvolutionHistory(),
  getCurrentEvolution: () => autoEvolutionSystem.getCurrentEvolution(),
  getEvolutionTargets: () => autoEvolutionSystem.getEvolutionTargets(),
  updateEvolutionTargets: (targets) => autoEvolutionSystem.updateEvolutionTargets(targets),
  isNightEvolutionTime: () => autoEvolutionSystem.isNightEvolutionTime(),
  getEvolutionIntensity: () => autoEvolutionSystem.getEvolutionIntensity()
};

// 示例用法
if (require.main === module) {
  console.log('=== 启动自动进化系统 ===');
  autoEvolutionSystem.startAutoEvolution();
  
  // 模拟进化过程
  setTimeout(() => {
    autoEvolutionSystem.stopAutoEvolution();
    console.log('自动进化完成');
  }, 60000); // 1分钟后停止
}
