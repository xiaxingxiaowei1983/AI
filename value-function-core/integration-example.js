// 价值函数模块与能力树系统集成示例
const valueFunction = require('./index');
const capabilityTree = require('../capabilities/capability-tree');

/**
 * 集成价值函数到能力树系统
 * 示例：在添加能力到能力树之前进行价值评估
 */
function addCapabilityWithValueAssessment(capability) {
  console.log(`正在评估能力: ${capability.name}`);
  
  // 评估能力价值
  const valueAssessment = valueFunction.evaluateCapability(capability);
  
  console.log('价值评估结果:', {
    totalValue: valueAssessment.totalValue,
    isLowValue: valueAssessment.isLowValue,
    isEligible: valueAssessment.isEligible,
    dimensions: valueAssessment.dimensions
  });
  
  // 只有符合进化条件的能力才添加到能力树
  if (valueAssessment.isEligible) {
    console.log('能力符合进化条件，正在添加到能力树...');
    
    // 添加价值评估信息到能力对象
    const enhancedCapability = {
      ...capability,
      valueAssessment
    };
    
    // 添加到能力树
    const result = capabilityTree.addNode(enhancedCapability);
    console.log('添加结果:', result);
    
    return result;
  } else {
    console.log('能力不符合进化条件，拒绝添加到能力树');
    return { success: false, reason: 'Low value capability', valueAssessment };
  }
}

/**
 * 集成价值函数到PCEC系统
 * 示例：按价值排序选择进化任务
 */
function selectEvolutionTasksByValue(capabilities, limit = 3) {
  console.log(`正在评估 ${capabilities.length} 个能力的价值...`);
  
  // 批量评估能力价值
  const capabilitiesWithValue = valueFunction.utils.batchEvaluateCapabilities(capabilities);
  
  // 按价值排序
  const sortedCapabilities = valueFunction.utils.sortCapabilitiesByValue(capabilitiesWithValue);
  
  // 选择前N个高价值能力
  const selectedTasks = sortedCapabilities.slice(0, limit);
  
  console.log('按价值排序的进化任务:');
  selectedTasks.forEach((task, index) => {
    console.log(`${index + 1}. ${task.name} - 价值: ${task.valueAssessment.totalValue.toFixed(3)}`);
  });
  
  return selectedTasks;
}

/**
 * 示例：突变价值函数
 */
function exampleMutation() {
  console.log('当前价值函数:', valueFunction.getCurrentValueFunction());
  
  // 创建突变提案
  const mutationProposal = {
    weights: {
      failureImpact: 0.3,      // 增加失败率影响的权重
      certaintyImprovement: 0.2  // 增加系统确定性的权重
    }
  };
  
  console.log('突变提案:', mutationProposal);
  
  try {
    // 执行突变
    const newFunction = valueFunction.mutateValueFunction(mutationProposal);
    console.log('突变成功！新的价值函数:', newFunction);
    
    // 获取突变历史
    const history = valueFunction.getMutationHistory();
    console.log('突变历史:', history);
    
    return newFunction;
  } catch (error) {
    console.error('突变失败:', error.message);
    return null;
  }
}

/**
 * 示例：评估现有能力树中的能力价值
 */
function evaluateExistingCapabilities() {
  console.log('正在评估能力树中的现有能力...');
  
  // 获取能力树中的所有能力
  const allCapabilities = capabilityTree.getAllNodes();
  
  if (allCapabilities.length === 0) {
    console.log('能力树为空');
    return [];
  }
  
  // 批量评估能力价值
  const capabilitiesWithValue = valueFunction.utils.batchEvaluateCapabilities(allCapabilities);
  
  // 按价值排序
  const sortedCapabilities = valueFunction.utils.sortCapabilitiesByValue(capabilitiesWithValue);
  
  console.log('能力树中能力的价值排序:');
  sortedCapabilities.forEach((capability, index) => {
    console.log(`${index + 1}. ${capability.name} - 价值: ${capability.valueAssessment.totalValue.toFixed(3)}`);
  });
  
  return sortedCapabilities;
}

// 示例使用
if (require.main === module) {
  console.log('=== 价值函数模块集成示例 ===\n');
  
  // 示例1: 评估并添加高价值能力
  console.log('1. 评估并添加高价值能力:');
  const highValueCapability = {
    name: '智能错误处理',
    scenarios: ['错误处理', '异常恢复', '系统稳定性'],
    isCrossTaskTransferable: true,
    hasGenericInterface: true,
    isReusable: true,
    hasErrorHandling: true,
    hasRollback: true,
    successRate: 0.95,
    reducesSystemFailure: true,
    simplifiesUserInteraction: true,
    hasClearDocumentation: true,
    complexityLevel: 'low',
    hasIntuitiveInterface: true,
    reducesComputationalComplexity: true,
    reducesAPICalls: true,
    reducesMemoryUsage: true,
    improvesExecutionSpeed: true,
    hasClearIOspecification: true,
    hasPredictableBehavior: true,
    hasValidationMechanism: true,
    providesDeterministicResults: true
  };
  
  addCapabilityWithValueAssessment(highValueCapability);
  
  console.log('\n' + '='.repeat(50) + '\n');
  
  // 示例2: 评估并添加低价值能力
  console.log('2. 评估并添加低价值能力:');
  const lowValueCapability = {
    name: '极端场景处理',
    usageFrequency: 'extreme',
    scenarios: ['极端网络条件'],
    improvesPerformance: true,
    isCrossTaskTransferable: false,
    increasesComplexity: true,
    dependencies: ['网络诊断', '极端条件模拟', '特殊协议处理']
  };
  
  addCapabilityWithValueAssessment(lowValueCapability);
  
  console.log('\n' + '='.repeat(50) + '\n');
  
  // 示例3: 突变价值函数
  console.log('3. 突变价值函数:');
  exampleMutation();
  
  console.log('\n' + '='.repeat(50) + '\n');
  
  // 示例4: 评估现有能力
  console.log('4. 评估现有能力:');
  evaluateExistingCapabilities();
  
  console.log('\n=== 集成示例完成 ===');
}

module.exports = {
  addCapabilityWithValueAssessment,
  selectEvolutionTasksByValue,
  exampleMutation,
  evaluateExistingCapabilities
};