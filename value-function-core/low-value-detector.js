// 低价值能力检测器模块

/**
 * 检测能力是否为低价值能力
 * @param {Object} capability - 能力对象
 * @returns {boolean} 是否为低价值能力
 */
function detectLowValueCapability(capability) {
  // 检查是否仅在极端场景使用
  if (isOnlyUsedInExtremeScenarios(capability)) {
    return true;
  }
  
  // 检查是否只提升表现、不提升成功率
  if (onlyImprovesPerformanceNotSuccessRate(capability)) {
    return true;
  }
  
  // 检查是否无法跨任务迁移
  if (cannotBeTransferredAcrossTasks(capability)) {
    return true;
  }
  
  // 检查是否会增加系统复杂度
  if (increasesSystemComplexity(capability)) {
    return true;
  }
  
  return false;
}

/**
 * 检查能力是否仅在极端场景使用
 * @param {Object} capability - 能力对象
 * @returns {boolean} 是否仅在极端场景使用
 */
function isOnlyUsedInExtremeScenarios(capability) {
  // 检查使用频率
  if (capability.usageFrequency === 'extreme' || capability.usageFrequency === 'rare') {
    return true;
  }
  
  // 检查适用场景数量
  if (capability.scenarios && Array.isArray(capability.scenarios) && capability.scenarios.length <= 1) {
    // 单个场景且标记为极端场景
    if (capability.scenarios.some(scenario => scenario.includes('extreme') || scenario.includes('rare'))) {
      return true;
    }
  }
  
  // 检查是否明确标记为极端场景使用
  if (capability.isOnlyForExtremeScenarios) {
    return true;
  }
  
  return false;
}

/**
 * 检查能力是否只提升表现、不提升成功率
 * @param {Object} capability - 能力对象
 * @returns {boolean} 是否只提升表现不提升成功率
 */
function onlyImprovesPerformanceNotSuccessRate(capability) {
  // 检查是否提升表现
  const improvesPerformance = capability.improvesPerformance || capability.improvesSpeed;
  
  // 检查是否不提升成功率
  const doesNotImproveSuccessRate = !capability.improvesSuccessRate && 
                                   (capability.successRate === undefined || 
                                    capability.successRate <= 0.9);
  
  // 只提升表现但不提升成功率
  if (improvesPerformance && doesNotImproveSuccessRate) {
    return true;
  }
  
  return false;
}

/**
 * 检查能力是否无法跨任务迁移
 * @param {Object} capability - 能力对象
 * @returns {boolean} 是否无法跨任务迁移
 */
function cannotBeTransferredAcrossTasks(capability) {
  // 检查是否明确标记为不可跨任务迁移
  if (capability.isCrossTaskTransferable === false) {
    return true;
  }
  
  // 检查是否有特定任务限制
  if (capability.taskSpecific && typeof capability.taskSpecific === 'string') {
    return true;
  }
  
  // 检查是否只适用于单一任务类型
  if (capability.applicableTaskTypes && 
      Array.isArray(capability.applicableTaskTypes) && 
      capability.applicableTaskTypes.length === 1) {
    return true;
  }
  
  return false;
}

/**
 * 检查能力是否会增加系统复杂度
 * @param {Object} capability - 能力对象
 * @returns {boolean} 是否会增加系统复杂度
 */
function increasesSystemComplexity(capability) {
  // 检查是否明确标记为增加复杂度
  if (capability.increasesComplexity) {
    return true;
  }
  
  // 检查依赖项数量
  if (capability.dependencies && 
      Array.isArray(capability.dependencies) && 
      capability.dependencies.length > 3) {
    return true;
  }
  
  // 检查实现复杂度
  if (capability.implementationComplexity === 'high') {
    return true;
  }
  
  // 检查是否引入新的系统组件
  if (capability.introducesNewComponents && 
      Array.isArray(capability.introducesNewComponents) && 
      capability.introducesNewComponents.length > 2) {
    return true;
  }
  
  return false;
}

/**
 * 获取能力的低价值原因
 * @param {Object} capability - 能力对象
 * @returns {Array} 低价值原因数组
 */
function getLowValueReasons(capability) {
  const reasons = [];
  
  if (isOnlyUsedInExtremeScenarios(capability)) {
    reasons.push('仅在极端场景使用');
  }
  
  if (onlyImprovesPerformanceNotSuccessRate(capability)) {
    reasons.push('只提升表现、不提升成功率');
  }
  
  if (cannotBeTransferredAcrossTasks(capability)) {
    reasons.push('无法跨任务迁移');
  }
  
  if (increasesSystemComplexity(capability)) {
    reasons.push('会增加系统复杂度');
  }
  
  return reasons;
}

module.exports = {
  detectLowValueCapability,
  isOnlyUsedInExtremeScenarios,
  onlyImprovesPerformanceNotSuccessRate,
  cannotBeTransferredAcrossTasks,
  increasesSystemComplexity,
  getLowValueReasons
};