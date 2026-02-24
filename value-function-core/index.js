// 价值函数核心模块主入口
const evaluator = require('./evaluator');
const mutator = require('./mutator');
const dimensions = require('./dimensions');
const lowValueDetector = require('./low-value-detector');

// 导出核心功能
module.exports = {
  // 价值评估
  evaluateCapability: evaluator.evaluateCapabilityValue,
  
  // 价值函数突变
  mutateValueFunction: mutator.mutateValueFunction,
  getCurrentValueFunction: mutator.getCurrentValueFunction,
  
  // 核心价值维度评估
  dimensions: {
    evaluateReusePotential: dimensions.evaluateReusePotential,
    evaluateFailureImpact: dimensions.evaluateFailureImpact,
    evaluateCognitiveBurdenReduction: dimensions.evaluateCognitiveBurdenReduction,
    evaluateReasoningCostReduction: dimensions.evaluateReasoningCostReduction,
    evaluateCertaintyImprovement: dimensions.evaluateCertaintyImprovement
  },
  
  // 低价值能力检测
  detectLowValueCapability: lowValueDetector.detectLowValueCapability,
  
  // 工具函数
  utils: {
    calculateTotalValue: evaluator.calculateTotalValue,
    validateMutation: mutator.validateMutation,
    validateLongTermUtility: mutator.validateLongTermUtility,
    validateAgainstADL: mutator.validateAgainstADL
  },
  
  // 版本信息
  version: '1.0.0',
  
  // 描述
  description: '价值函数突变核心模块 - 基于内在价值函数评估和选择值得进化的能力'
};