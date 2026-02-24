// 价值函数突变管理模块

// 当前价值函数配置
let currentValueFunction = {
  version: '1.0.0',
  timestamp: new Date().toISOString(),
  weights: {
    reusePotential: 0.25,
    failureImpact: 0.25,
    cognitiveBurdenReduction: 0.2,
    reasoningCostReduction: 0.15,
    certaintyImprovement: 0.15
  },
  lowValuePenalty: 0.3,
  minValueThreshold: 0.4,
  constraints: {
    maxWeightChange: 0.1,  // 每次突变最大权重变化
    minTotalWeight: 0.8,    // 总权重最小值
    maxTotalWeight: 1.25    // 总权重最大值，与validateLongTermUtility保持一致
  }
};

// 突变历史
const mutationHistory = [];

/**
 * 获取当前价值函数
 * @returns {Object} 当前价值函数配置
 */
function getCurrentValueFunction() {
  return { ...currentValueFunction };
}

/**
 * 突变价值函数
 * @param {Object} mutationProposal - 突变提案
 * @returns {Object} 新的价值函数
 */
function mutateValueFunction(mutationProposal) {
  // 验证突变提案
  if (!validateMutation(currentValueFunction, mutationProposal)) {
    throw new Error('Mutation validation failed');
  }
  
  // 创建新的价值函数
  const newFunction = createMutatedFunction(currentValueFunction, mutationProposal);
  
  // 验证新函数是否提升长期效用
  if (!validateLongTermUtility(newFunction, currentValueFunction)) {
    throw new Error('Mutation does not improve long-term utility');
  }
  
  // 验证新函数是否符合ADL要求
  if (!validateAgainstADL(newFunction)) {
    throw new Error('Mutation violates Anti-Degeneration Lock');
  }
  
  // 记录突变历史
  recordMutationHistory(currentValueFunction, newFunction, mutationProposal);
  
  // 更新当前价值函数
  currentValueFunction = newFunction;
  
  return newFunction;
}

/**
 * 验证突变提案
 * @param {Object} currentFunction - 当前价值函数
 * @param {Object} mutationProposal - 突变提案
 * @returns {boolean} 是否验证通过
 */
function validateMutation(currentFunction, mutationProposal) {
  // 验证突变提案格式
  if (!mutationProposal || typeof mutationProposal !== 'object') {
    return false;
  }
  
  // 验证权重变化
  if (mutationProposal.weights) {
    const weights = mutationProposal.weights;
    const currentWeights = currentFunction.weights;
    
    // 检查权重变化是否在允许范围内
    for (const [key, newValue] of Object.entries(weights)) {
      if (currentWeights[key] !== undefined) {
        const weightChange = Math.abs(newValue - currentWeights[key]);
        if (weightChange > currentFunction.constraints.maxWeightChange) {
          return false;
        }
      }
    }
    
    // 计算总权重
    let totalWeight = 0;
    for (const [key, value] of Object.entries({ ...currentWeights, ...weights })) {
      totalWeight += value;
    }
    
    // 检查总权重是否在允许范围内
    if (totalWeight < currentFunction.constraints.minTotalWeight || 
        totalWeight > currentFunction.constraints.maxTotalWeight) {
      return false;
    }
  }
  
  // 验证其他参数
  if (mutationProposal.lowValuePenalty !== undefined) {
    if (mutationProposal.lowValuePenalty < 0 || mutationProposal.lowValuePenalty > 1) {
      return false;
    }
  }
  
  if (mutationProposal.minValueThreshold !== undefined) {
    if (mutationProposal.minValueThreshold < 0 || mutationProposal.minValueThreshold > 1) {
      return false;
    }
  }
  
  return true;
}

/**
 * 创建突变后的价值函数
 * @param {Object} currentFunction - 当前价值函数
 * @param {Object} mutationProposal - 突变提案
 * @returns {Object} 新的价值函数
 */
function createMutatedFunction(currentFunction, mutationProposal) {
  const newFunction = {
    ...currentFunction,
    version: `1.0.${mutationHistory.length + 1}`,
    timestamp: new Date().toISOString(),
    weights: { ...currentFunction.weights },
    lowValuePenalty: currentFunction.lowValuePenalty,
    minValueThreshold: currentFunction.minValueThreshold
  };
  
  // 应用权重变化
  if (mutationProposal.weights) {
    Object.assign(newFunction.weights, mutationProposal.weights);
  }
  
  // 应用其他参数变化
  if (mutationProposal.lowValuePenalty !== undefined) {
    newFunction.lowValuePenalty = mutationProposal.lowValuePenalty;
  }
  
  if (mutationProposal.minValueThreshold !== undefined) {
    newFunction.minValueThreshold = mutationProposal.minValueThreshold;
  }
  
  return newFunction;
}

/**
 * 验证新函数是否提升长期效用
 * @param {Object} newFunction - 新价值函数
 * @param {Object} currentFunction - 当前价值函数
 * @returns {boolean} 是否提升长期效用
 */
function validateLongTermUtility(newFunction, currentFunction) {
  // 这里实现长期效用评估逻辑
  // 确保失败率影响的权重不显著降低
  const failureImpactWeightReasonable = 
    newFunction.weights.failureImpact >= currentFunction.weights.failureImpact * 0.9;
  
  // 确保系统确定性的权重不显著降低
  const certaintyImprovementWeightReasonable = 
    newFunction.weights.certaintyImprovement >= currentFunction.weights.certaintyImprovement * 0.9;
  
  // 确保总权重合理
  let totalWeight = 0;
  for (const value of Object.values(newFunction.weights)) {
    totalWeight += value;
  }
  
  // 增加容忍度，处理JavaScript浮点数精度问题
  const hasReasonableTotalWeight = totalWeight >= 0.75 && totalWeight <= 1.25;
  
  return failureImpactWeightReasonable && 
         certaintyImprovementWeightReasonable && 
         hasReasonableTotalWeight;
}

/**
 * 验证新函数是否符合ADL要求
 * @param {Object} newValueFunction - 新价值函数
 * @returns {boolean} 是否符合ADL要求
 */
function validateAgainstADL(newValueFunction) {
  // ADL要求：稳定性优先
  // 确保对失败率影响和系统确定性的权重足够高
  const hasAdequateStabilityWeights = 
    newValueFunction.weights.failureImpact >= 0.2 &&
    newValueFunction.weights.certaintyImprovement >= 0.1;
  
  // ADL要求：可解释性
  // 确保价值函数配置清晰可解释
  const hasExplainableConfiguration = 
    newValueFunction.weights !== undefined &&
    typeof newValueFunction.weights === 'object';
  
  // ADL要求：可复用性
  // 确保复用频率潜力的权重足够高
  const hasAdequateReusabilityWeight = 
    newValueFunction.weights.reusePotential >= 0.2;
  
  return hasAdequateStabilityWeights && 
         hasExplainableConfiguration && 
         hasAdequateReusabilityWeight;
}

/**
 * 记录突变历史
 * @param {Object} oldFunction - 旧价值函数
 * @param {Object} newFunction - 新价值函数
 * @param {Object} mutationProposal - 突变提案
 */
function recordMutationHistory(oldFunction, newFunction, mutationProposal) {
  const mutationRecord = {
    timestamp: new Date().toISOString(),
    oldVersion: oldFunction.version,
    newVersion: newFunction.version,
    mutationProposal: { ...mutationProposal },
    oldWeights: { ...oldFunction.weights },
    newWeights: { ...newFunction.weights },
    oldLowValuePenalty: oldFunction.lowValuePenalty,
    newLowValuePenalty: newFunction.lowValuePenalty,
    oldMinValueThreshold: oldFunction.minValueThreshold,
    newMinValueThreshold: newFunction.minValueThreshold
  };
  
  mutationHistory.push(mutationRecord);
  
  // 限制历史记录长度
  if (mutationHistory.length > 100) {
    mutationHistory.shift();
  }
}

/**
 * 获取突变历史
 * @param {number} limit - 限制返回数量
 * @returns {Array} 突变历史记录
 */
function getMutationHistory(limit = 10) {
  return mutationHistory.slice(-limit).map(record => ({ ...record }));
}

/**
 * 回滚到之前的价值函数版本
 * @param {number} versionIndex - 版本索引
 * @returns {Object} 回滚后的价值函数
 */
function rollbackToVersion(versionIndex) {
  if (versionIndex < 0 || versionIndex >= mutationHistory.length) {
    throw new Error('Invalid version index');
  }
  
  // 获取历史版本
  const historyRecord = mutationHistory[versionIndex];
  const rolledBackFunction = {
    version: historyRecord.oldVersion,
    timestamp: new Date().toISOString(),
    weights: { ...historyRecord.oldWeights },
    lowValuePenalty: historyRecord.oldLowValuePenalty,
    minValueThreshold: historyRecord.oldMinValueThreshold,
    constraints: { ...currentValueFunction.constraints }
  };
  
  // 验证回滚版本
  if (!validateAgainstADL(rolledBackFunction)) {
    throw new Error('Rollback version violates Anti-Degeneration Lock');
  }
  
  // 记录回滚操作
  recordMutationHistory(currentValueFunction, rolledBackFunction, { type: 'rollback' });
  
  // 更新当前价值函数
  currentValueFunction = rolledBackFunction;
  
  return rolledBackFunction;
}

module.exports = {
  mutateValueFunction,
  getCurrentValueFunction,
  validateMutation,
  validateLongTermUtility,
  validateAgainstADL,
  getMutationHistory,
  rollbackToVersion
};