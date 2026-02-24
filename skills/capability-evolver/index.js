/**
 * capability-evolver 元技能入口
 * 负责管理能力进化的完整流程
 */

const fs = require('fs');
const path = require('path');

// 确保目录结构存在
function ensureDirectories() {
  const dirs = [
    path.join(__dirname, 'core'),
    path.join(__dirname, 'data', 'candidates'),
    path.join(__dirname, 'data', 'abstracted'),
    path.join(__dirname, 'data', 'internalized'),
    path.join(__dirname, 'utils')
  ];
  
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
}

// 初始化数据文件
function initializeDataFiles() {
  const historyPath = path.join(__dirname, 'data', 'evolution-history.json');
  if (!fs.existsSync(historyPath)) {
    fs.writeFileSync(historyPath, JSON.stringify({
      evolutions: [],
      lastUpdated: Date.now()
    }, null, 2));
  }
}

// 导入核心模块
function loadCoreModules() {
  try {
    return {
      candidateManager: require('./core/candidate-manager'),
      capabilityAbstractor: require('./core/capability-abstractor'),
      internalizer: require('./core/internalizer'),
      merger: require('./core/merger'),
      enhancer: require('./core/enhancer')
    };
  } catch (error) {
    console.warn('Core modules not found, using mock implementations');
    return {
      candidateManager: createMockCandidateManager(),
      capabilityAbstractor: createMockAbstractor(),
      internalizer: createMockInternalizer(),
      merger: createMockMerger(),
      enhancer: createMockEnhancer()
    };
  }
}

// 创建模拟候选管理器
function createMockCandidateManager() {
  return {
    addCandidate: (candidate) => {
      console.log('Mock: Adding candidate:', candidate.name);
      return { id: 'mock_candidate_' + Date.now(), ...candidate };
    },
    getCandidates: () => []
  };
}

// 创建模拟抽象器
function createMockAbstractor() {
  return {
    abstractCapability: (candidateId) => {
      console.log('Mock: Abstracting capability:', candidateId);
      return { id: 'mock_abstract_' + Date.now() };
    }
  };
}

// 创建模拟内生化器
function createMockInternalizer() {
  return {
    internalizeCapability: (abstractId, options) => {
      console.log('Mock: Internalizing capability:', abstractId);
      return { id: 'mock_internalized_' + Date.now() };
    }
  };
}

// 创建模拟合并器
function createMockMerger() {
  return {
    mergeCapabilities: (capabilityIds) => {
      console.log('Mock: Merging capabilities:', capabilityIds);
      return { id: 'mock_merged_' + Date.now() };
    }
  };
}

// 创建模拟增强器
function createMockEnhancer() {
  return {
    analyzeBehavior: (data) => {
      console.log('Mock: Analyzing behavior');
      return [];
    }
  };
}

// 能力进化器类
class CapabilityEvolver {
  constructor() {
    ensureDirectories();
    initializeDataFiles();
    this.core = loadCoreModules();
    this.evolutionHistory = [];
    this.loadEvolutionHistory();
  }

  // 加载进化历史
  loadEvolutionHistory() {
    const historyPath = path.join(__dirname, 'data', 'evolution-history.json');
    if (fs.existsSync(historyPath)) {
      try {
        const history = JSON.parse(fs.readFileSync(historyPath, 'utf8'));
        this.evolutionHistory = history.evolutions || [];
      } catch (error) {
        console.error('Error loading evolution history:', error.message);
        this.evolutionHistory = [];
      }
    }
  }

  // 保存进化历史
  saveEvolutionHistory() {
    const historyPath = path.join(__dirname, 'data', 'evolution-history.json');
    fs.writeFileSync(historyPath, JSON.stringify({
      evolutions: this.evolutionHistory,
      lastUpdated: Date.now()
    }, null, 2));
  }

  // 添加能力候选
  addCandidate(candidate) {
    console.log('Adding capability candidate:', candidate.name);
    const result = this.core.candidateManager.addCandidate(candidate);
    
    // 记录到进化历史
    this.evolutionHistory.push({
      type: 'candidate_added',
      candidateId: result.id,
      timestamp: Date.now(),
      details: candidate
    });
    
    this.saveEvolutionHistory();
    return result;
  }

  // 抽象能力
  abstractCapability(candidateId) {
    console.log('Abstracting capability:', candidateId);
    const result = this.core.capabilityAbstractor.abstractCapability(candidateId);
    
    // 记录到进化历史
    this.evolutionHistory.push({
      type: 'capability_abstracted',
      candidateId,
      abstractId: result.id,
      timestamp: Date.now()
    });
    
    this.saveEvolutionHistory();
    return result;
  }

  // 内生化能力
  internalizeCapability(abstractId, options = {}) {
    console.log('Internalizing capability:', abstractId);
    const result = this.core.internalizer.internalizeCapability(abstractId, options);
    
    // 记录到进化历史
    this.evolutionHistory.push({
      type: 'capability_internalized',
      abstractId,
      internalizedId: result.id,
      timestamp: Date.now(),
      strategy: options.strategy
    });
    
    this.saveEvolutionHistory();
    return result;
  }

  // 合并能力
  mergeCapabilities(capabilityIds) {
    console.log('Merging capabilities:', capabilityIds);
    const result = this.core.merger.mergeCapabilities(capabilityIds);
    
    // 记录到进化历史
    this.evolutionHistory.push({
      type: 'capabilities_merged',
      sourceIds: capabilityIds,
      mergedId: result.id,
      timestamp: Date.now()
    });
    
    this.saveEvolutionHistory();
    return result;
  }

  // 分析行为
  analyzeBehavior(data) {
    console.log('Analyzing behavior patterns');
    return this.core.enhancer.analyzeBehavior(data);
  }

  // 获取进化历史
  getEvolutionHistory() {
    return this.evolutionHistory;
  }

  // 获取能力状态
  getStatus() {
    return {
      candidates: this.core.candidateManager.getCandidates().length,
      abstracted: 0,
      internalized: 0,
      evolutionCount: this.evolutionHistory.length,
      lastEvolution: this.evolutionHistory.length > 0 ? 
        this.evolutionHistory[this.evolutionHistory.length - 1].timestamp : null
    };
  }
}

// 导出单例实例
const capabilityEvolver = new CapabilityEvolver();

module.exports = {
  CapabilityEvolver,
  capabilityEvolver
};

// 示例用法
if (require.main === module) {
  console.log('Initializing capability-evolver...');
  console.log('Status:', capabilityEvolver.getStatus());
  
  // 示例：添加能力候选
  const candidate = capabilityEvolver.addCandidate({
    name: '文件处理能力',
    description: '处理文件的能力',
    context: '执行文件操作时发现',
    usageCount: 5
  });
  
  console.log('Added candidate:', candidate.id);
  console.log('Evolution history length:', capabilityEvolver.getEvolutionHistory().length);
}
