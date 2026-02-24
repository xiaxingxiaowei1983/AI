// 价值评估引擎
const dimensions = require('./dimensions');
const lowValueDetector = require('./low-value-detector');

// 核心价值维度权重
const DIMENSION_WEIGHTS = {
  reusePotential: 0.25,           // 复用频率潜力
  failureImpact: 0.25,             // 对失败率的影响
  cognitiveBurdenReduction: 0.2,   // 减少用户认知负担
  reasoningCostReduction: 0.15,    // 减少推理/工具成本
  certaintyImprovement: 0.15       // 提升系统级确定性
};

// 低价值能力惩罚因子
const LOW_VALUE_PENALTY = 0.3;

// 最小价值阈值
const MIN_VALUE_THRESHOLD = 0.4;

/**
 * 评估能力的综合价值
 * @param {Object} capability - 能力对象
 * @returns {Object} 价值评估结果
 */
function evaluateCapabilityValue(capability) {
  // 验证能力对象
  if (!capability || typeof capability !== 'object') {
    throw new Error('Invalid capability object');
  }
  
  // 核心价值维度评估
  const reusePotential = dimensions.evaluateReusePotential(capability);
  const failureImpact = dimensions.evaluateFailureImpact(capability);
  const cognitiveBurdenReduction = dimensions.evaluateCognitiveBurdenReduction(capability);
  const reasoningCostReduction = dimensions.evaluateReasoningCostReduction(capability);
  const certaintyImprovement = dimensions.evaluateCertaintyImprovement(capability);
  
  // 低价值能力检测
  const isLowValue = lowValueDetector.detectLowValueCapability(capability);
  
  // 综合价值计算
  const totalValue = calculateTotalValue({
    reusePotential,
    failureImpact,
    cognitiveBurdenReduction,
    reasoningCostReduction,
    certaintyImprovement,
    isLowValue
  });
  
  return {
    totalValue,
    dimensions: {
      reusePotential,
      failureImpact,
      cognitiveBurdenReduction,
      reasoningCostReduction,
      certaintyImprovement
    },
    isLowValue,
    isEligible: totalValue >= MIN_VALUE_THRESHOLD,
    timestamp: new Date().toISOString()
  };
}

/**
 * 计算综合价值
 * @param {Object} values - 各维度价值评估结果
 * @returns {number} 综合价值分数 (0-1)
 */
function calculateTotalValue(values) {
  const {
    reusePotential,
    failureImpact,
    cognitiveBurdenReduction,
    reasoningCostReduction,
    certaintyImprovement,
    isLowValue
  } = values;
  
  // 加权计算基础价值
  let baseValue = 
    reusePotential * DIMENSION_WEIGHTS.reusePotential +
    failureImpact * DIMENSION_WEIGHTS.failureImpact +
    cognitiveBurdenReduction * DIMENSION_WEIGHTS.cognitiveBurdenReduction +
    reasoningCostReduction * DIMENSION_WEIGHTS.reasoningCostReduction +
    certaintyImprovement * DIMENSION_WEIGHTS.certaintyImprovement;
  
  // 低价值能力惩罚
  if (isLowValue) {
    baseValue *= LOW_VALUE_PENALTY;
  }
  
  // 确保价值在0-1范围内
  return Math.max(0, Math.min(1, baseValue));
}

/**
 * 批量评估多个能力
 * @param {Array} capabilities - 能力对象数组
 * @returns {Array} 价值评估结果数组
 */
function batchEvaluateCapabilities(capabilities) {
  if (!Array.isArray(capabilities)) {
    throw new Error('Invalid capabilities array');
  }
  
  return capabilities.map(capability => ({
    ...capability,
    valueAssessment: evaluateCapabilityValue(capability)
  }));
}

/**
 * 按价值排序能力
 * @param {Array} capabilities - 带有价值评估的能力数组
 * @param {boolean} descending - 是否降序排序
 * @returns {Array} 排序后的能力数组
 */
function sortCapabilitiesByValue(capabilities, descending = true) {
  if (!Array.isArray(capabilities)) {
    throw new Error('Invalid capabilities array');
  }
  
  return capabilities.sort((a, b) => {
    const valueA = a.valueAssessment ? a.valueAssessment.totalValue : 0;
    const valueB = b.valueAssessment ? b.valueAssessment.totalValue : 0;
    
    return descending ? valueB - valueA : valueA - valueB;
  });
}

module.exports = {
  evaluateCapabilityValue,
  calculateTotalValue,
  batchEvaluateCapabilities,
  sortCapabilitiesByValue,
  DIMENSION_WEIGHTS,
  LOW_VALUE_PENALTY,
  MIN_VALUE_THRESHOLD
};