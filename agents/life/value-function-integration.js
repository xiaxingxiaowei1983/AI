// 人生决策宗师价值函数集成模块
const valueFunctionCore = require('../../value-function-core');

/**
 * 人生决策宗师价值函数集成
 * 负责将价值函数系统与人生决策宗师智能体集成
 */

// 核心集成功能
class LifeDecisionMasterValueIntegration {
  constructor() {
    this.valueFunction = valueFunctionCore;
    this.capabilityRegistry = new Map();
    this.evolutionQueue = [];
    this.integrationTimestamp = new Date().toISOString();
  }

  /**
   * 评估能力价值
   * @param {Object} capability - 能力对象
   * @returns {Object} 价值评估结果
   */
  evaluateCapability(capability) {
    if (!capability || !capability.name) {
      throw new Error('Invalid capability object');
    }

    // 执行价值评估
    const evaluation = this.valueFunction.evaluateCapability(capability);

    // 注册能力评估结果
    this.capabilityRegistry.set(capability.name, {
      ...capability,
      evaluation,
      lastEvaluated: new Date().toISOString()
    });

    // 如果符合进化条件，加入进化队列
    if (evaluation.isEligible) {
      this.addToEvolutionQueue(capability, evaluation);
    }

    return evaluation;
  }

  /**
   * 批量评估能力
   * @param {Array} capabilities - 能力对象数组
   * @returns {Array} 价值评估结果数组
   */
  batchEvaluateCapabilities(capabilities) {
    if (!Array.isArray(capabilities)) {
      throw new Error('Invalid capabilities array');
    }

    return capabilities.map(capability => ({
      ...capability,
      evaluation: this.evaluateCapability(capability)
    }));
  }

  /**
   * 将能力加入进化队列
   * @param {Object} capability - 能力对象
   * @param {Object} evaluation - 价值评估结果
   */
  addToEvolutionQueue(capability, evaluation) {
    // 检查是否已在队列中
    const existingIndex = this.evolutionQueue.findIndex(
      item => item.name === capability.name
    );

    if (existingIndex >= 0) {
      // 更新队列中的能力
      this.evolutionQueue[existingIndex] = {
        ...capability,
        evaluation,
        addedToQueue: new Date().toISOString()
      };
    } else {
      // 添加新能力到队列
      this.evolutionQueue.push({
        ...capability,
        evaluation,
        addedToQueue: new Date().toISOString()
      });
    }

    // 按价值排序队列
    this.sortEvolutionQueue();
  }

  /**
   * 排序进化队列
   */
  sortEvolutionQueue() {
    this.evolutionQueue.sort((a, b) => {
      const valueA = a.evaluation ? a.evaluation.totalValue : 0;
      const valueB = b.evaluation ? b.evaluation.totalValue : 0;
      return valueB - valueA; // 降序排序
    });

    // 限制队列长度
    if (this.evolutionQueue.length > 50) {
      this.evolutionQueue = this.evolutionQueue.slice(0, 50);
    }
  }

  /**
   * 获取进化队列
   * @param {number} limit - 限制返回数量
   * @returns {Array} 进化队列
   */
  getEvolutionQueue(limit = 20) {
    return this.evolutionQueue.slice(0, limit);
  }

  /**
   * 突变价值函数
   * @param {Object} mutationProposal - 突变提案
   * @returns {Object} 新的价值函数
   */
  mutateValueFunction(mutationProposal) {
    try {
      const newFunction = this.valueFunction.mutateValueFunction(mutationProposal);
      
      // 突变后重新评估所有注册的能力
      this.revaluateAllCapabilities();
      
      return newFunction;
    } catch (error) {
      console.error('Value function mutation failed:', error.message);
      throw error;
    }
  }

  /**
   * 重新评估所有注册的能力
   */
  revaluateAllCapabilities() {
    const reevaluationResults = [];
    
    for (const [name, capability] of this.capabilityRegistry.entries()) {
      const newEvaluation = this.evaluateCapability(capability);
      reevaluationResults.push({
        name,
        previousValue: capability.evaluation.totalValue,
        newValue: newEvaluation.totalValue,
        change: newEvaluation.totalValue - capability.evaluation.totalValue
      });
    }

    // 重新排序进化队列
    this.sortEvolutionQueue();

    return reevaluationResults;
  }

  /**
   * 获取当前价值函数
   * @returns {Object} 当前价值函数
   */
  getCurrentValueFunction() {
    return this.valueFunction.getCurrentValueFunction();
  }

  /**
   * 检测低价值能力
   * @param {Object} capability - 能力对象
   * @returns {boolean} 是否为低价值能力
   */
  detectLowValueCapability(capability) {
    return this.valueFunction.detectLowValueCapability(capability);
  }

  /**
   * 生成能力价值报告
   * @returns {Object} 能力价值报告
   */
  generateValueReport() {
    const registeredCapabilities = Array.from(this.capabilityRegistry.values());
    const highValueCapabilities = registeredCapabilities.filter(
      cap => cap.evaluation && cap.evaluation.isEligible
    );
    const lowValueCapabilities = registeredCapabilities.filter(
      cap => cap.evaluation && !cap.evaluation.isEligible
    );

    return {
      reportTimestamp: new Date().toISOString(),
      integrationTimestamp: this.integrationTimestamp,
      totalCapabilities: registeredCapabilities.length,
      highValueCapabilities: highValueCapabilities.length,
      lowValueCapabilities: lowValueCapabilities.length,
      evolutionQueueSize: this.evolutionQueue.length,
      currentValueFunction: this.getCurrentValueFunction(),
      topValueCapabilities: highValueCapabilities
        .sort((a, b) => b.evaluation.totalValue - a.evaluation.totalValue)
        .slice(0, 10),
      bottomValueCapabilities: lowValueCapabilities
        .sort((a, b) => a.evaluation.totalValue - b.evaluation.totalValue)
        .slice(0, 10)
    };
  }

  /**
   * 清理低价值能力
   * @param {number} threshold - 价值阈值
   * @returns {Array} 被清理的能力
   */
  cleanupLowValueCapabilities(threshold = 0.3) {
    const cleanedCapabilities = [];
    const remainingCapabilities = new Map();

    for (const [name, capability] of this.capabilityRegistry.entries()) {
      if (capability.evaluation && capability.evaluation.totalValue < threshold) {
        cleanedCapabilities.push(capability);
      } else {
        remainingCapabilities.set(name, capability);
      }
    }

    // 更新能力注册表
    this.capabilityRegistry = remainingCapabilities;

    // 重新构建进化队列
    this.evolutionQueue = this.evolutionQueue.filter(
      item => remainingCapabilities.has(item.name)
    );

    return cleanedCapabilities;
  }

  /**
   * 集成状态检查
   * @returns {Object} 集成状态
   */
  getIntegrationStatus() {
    return {
      status: 'active',
      timestamp: new Date().toISOString(),
      integrationTimestamp: this.integrationTimestamp,
      registeredCapabilities: this.capabilityRegistry.size,
      evolutionQueueSize: this.evolutionQueue.length,
      valueFunctionVersion: this.getCurrentValueFunction().version,
      health: 'healthy'
    };
  }
}

// 导出单例实例
const lifeDecisionMasterValueIntegration = new LifeDecisionMasterValueIntegration();

// 导出核心功能
module.exports = {
  // 单例实例
  integration: lifeDecisionMasterValueIntegration,
  
  // 核心方法
  evaluateCapability: (capability) => lifeDecisionMasterValueIntegration.evaluateCapability(capability),
  batchEvaluateCapabilities: (capabilities) => lifeDecisionMasterValueIntegration.batchEvaluateCapabilities(capabilities),
  mutateValueFunction: (mutationProposal) => lifeDecisionMasterValueIntegration.mutateValueFunction(mutationProposal),
  getEvolutionQueue: (limit) => lifeDecisionMasterValueIntegration.getEvolutionQueue(limit),
  getCurrentValueFunction: () => lifeDecisionMasterValueIntegration.getCurrentValueFunction(),
  detectLowValueCapability: (capability) => lifeDecisionMasterValueIntegration.detectLowValueCapability(capability),
  generateValueReport: () => lifeDecisionMasterValueIntegration.generateValueReport(),
  cleanupLowValueCapabilities: (threshold) => lifeDecisionMasterValueIntegration.cleanupLowValueCapabilities(threshold),
  getIntegrationStatus: () => lifeDecisionMasterValueIntegration.getIntegrationStatus(),
  
  // 版本信息
  version: '1.0.0',
  integrationTimestamp: lifeDecisionMasterValueIntegration.integrationTimestamp
};

// 工具函数
module.exports.utils = {
  /**
   * 构建能力对象
   * @param {string} name - 能力名称
   * @param {string} description - 能力描述
   * @param {Array} scenarios - 适用场景
   * @param {Object} properties - 能力属性
   * @returns {Object} 能力对象
   */
  buildCapability: (name, description, scenarios = [], properties = {}) => {
    return {
      name,
      description,
      scenarios,
      ...properties,
      createdTimestamp: new Date().toISOString()
    };
  },

  /**
   * 构建突变提案
   * @param {Object} weightChanges - 权重变化
   * @param {number} lowValuePenalty - 低价值惩罚因子
   * @param {number} minValueThreshold - 最小价值阈值
   * @returns {Object} 突变提案
   */
  buildMutationProposal: (weightChanges = {}, lowValuePenalty = undefined, minValueThreshold = undefined) => {
    const proposal = {};
    if (Object.keys(weightChanges).length > 0) {
      proposal.weights = weightChanges;
    }
    if (lowValuePenalty !== undefined) {
      proposal.lowValuePenalty = lowValuePenalty;
    }
    if (minValueThreshold !== undefined) {
      proposal.minValueThreshold = minValueThreshold;
    }
    return proposal;
  }
};
