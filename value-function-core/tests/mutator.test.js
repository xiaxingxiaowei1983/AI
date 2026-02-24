// 价值函数突变管理测试
const mutator = require('../mutator');
const { validateMutation, validateLongTermUtility, validateAgainstADL } = require('../mutator');

// 测试获取当前价值函数
test('getCurrentValueFunction should return current value function', () => {
  const currentFunction = mutator.getCurrentValueFunction();
  
  expect(currentFunction).toHaveProperty('version');
  expect(currentFunction).toHaveProperty('timestamp');
  expect(currentFunction).toHaveProperty('weights');
  expect(currentFunction).toHaveProperty('lowValuePenalty');
  expect(currentFunction).toHaveProperty('minValueThreshold');
  expect(currentFunction).toHaveProperty('constraints');
});

// 测试突变价值函数
test('mutateValueFunction should successfully mutate value function with valid proposal', () => {
  const mutationProposal = {
    weights: {
      failureImpact: 0.3,  // 增加失败率影响的权重
      certaintyImprovement: 0.2  // 增加系统确定性的权重
    }
  };
  
  const result = mutator.mutateValueFunction(mutationProposal);
  
  expect(result).toHaveProperty('version');
  expect(result).toHaveProperty('timestamp');
  expect(result.weights.failureImpact).toBe(0.3);
  expect(result.weights.certaintyImprovement).toBe(0.2);
});

test('mutateValueFunction should throw error for invalid mutation proposal', () => {
  // 测试权重变化过大
  const invalidProposal = {
    weights: {
      reusePotential: 0.5  // 变化超过最大允许值
    }
  };
  
  expect(() => mutator.mutateValueFunction(invalidProposal)).toThrow('Mutation validation failed');
});

test('mutateValueFunction should throw error for mutation that does not improve long-term utility', () => {
  // 测试降低失败率影响的权重
  const badProposal = {
    weights: {
      failureImpact: 0.2,  // 降低失败率影响的权重
      certaintyImprovement: 0.1  // 降低系统确定性的权重
    }
  };
  
  expect(() => mutator.mutateValueFunction(badProposal)).toThrow('Mutation does not improve long-term utility');
});

// 测试验证突变
test('validateMutation should return true for valid mutation', () => {
  const currentFunction = mutator.getCurrentValueFunction();
  const validProposal = {
    weights: {
      failureImpact: 0.3
    }
  };
  
  const result = validateMutation(currentFunction, validProposal);
  expect(result).toBe(true);
});

test('validateMutation should return false for invalid mutation', () => {
  const currentFunction = mutator.getCurrentValueFunction();
  const invalidProposal = {
    weights: {
      reusePotential: 0.5  // 变化过大
    }
  };
  
  const result = validateMutation(currentFunction, invalidProposal);
  expect(result).toBe(false);
});

// 测试验证长期效用
test('validateLongTermUtility should return true for utility-improving mutation', () => {
  const currentFunction = mutator.getCurrentValueFunction();
  
  // 计算当前总权重
  let currentTotalWeight = 0;
  for (const value of Object.values(currentFunction.weights)) {
    currentTotalWeight += value;
  }
  
  const improvedFunction = {
    ...currentFunction,
    weights: {
      ...currentFunction.weights,
      failureImpact: currentFunction.weights.failureImpact + 0.05,
      certaintyImprovement: currentFunction.weights.certaintyImprovement + 0.05
    }
  };
  
  // 计算改进后总权重
  let improvedTotalWeight = 0;
  for (const value of Object.values(improvedFunction.weights)) {
    improvedTotalWeight += value;
  }
  
  console.log('Current weights:', currentFunction.weights);
  console.log('Current total weight:', currentTotalWeight);
  console.log('Improved weights:', improvedFunction.weights);
  console.log('Improved total weight:', improvedTotalWeight);
  
  const result = validateLongTermUtility(improvedFunction, currentFunction);
  console.log('Validation result:', result);
  
  expect(result).toBe(true);
});

test('validateLongTermUtility should return false for utility-reducing mutation', () => {
  const currentFunction = mutator.getCurrentValueFunction();
  const reducedFunction = {
    ...currentFunction,
    weights: {
      ...currentFunction.weights,
      failureImpact: currentFunction.weights.failureImpact - 0.05,
      certaintyImprovement: currentFunction.weights.certaintyImprovement - 0.05
    }
  };
  
  const result = validateLongTermUtility(reducedFunction, currentFunction);
  expect(result).toBe(false);
});

// 测试验证ADL合规性
test('validateAgainstADL should return true for ADL-compliant function', () => {
  const compliantFunction = mutator.getCurrentValueFunction();
  const result = validateAgainstADL(compliantFunction);
  expect(result).toBe(true);
});

test('validateAgainstADL should return false for ADL-noncompliant function', () => {
  const nonCompliantFunction = {
    weights: {
      reusePotential: 0.1,  // 复用权重过低
      failureImpact: 0.1,   // 失败率影响权重过低
      cognitiveBurdenReduction: 0.3,
      reasoningCostReduction: 0.3,
      certaintyImprovement: 0.05  // 系统确定性权重过低
    }
  };
  
  const result = validateAgainstADL(nonCompliantFunction);
  expect(result).toBe(false);
});

// 测试获取突变历史
test('getMutationHistory should return mutation history', () => {
  // 先进行一次突变
  const currentFunction = mutator.getCurrentValueFunction();
  console.log('Current constraints:', currentFunction.constraints);
  
  // 计算当前reasoningCostReduction权重
  console.log('Current reasoningCostReduction:', currentFunction.weights.reasoningCostReduction);
  
  const mutationProposal = {
    weights: {
      reasoningCostReduction: 0.2
    }
  };
  
  console.log('Proposed reasoningCostReduction:', mutationProposal.weights.reasoningCostReduction);
  console.log('Weight change:', Math.abs(mutationProposal.weights.reasoningCostReduction - currentFunction.weights.reasoningCostReduction));
  
  mutator.mutateValueFunction(mutationProposal);
  
  const history = mutator.getMutationHistory();
  expect(Array.isArray(history)).toBe(true);
  expect(history.length).toBeGreaterThan(0);
});

// 测试回滚功能
test('rollbackToVersion should successfully rollback to previous version', () => {
  // 先进行几次突变以建立历史
  const proposal1 = {
    weights: {
      cognitiveBurdenReduction: 0.25
    }
  };
  
  const proposal2 = {
    weights: {
      reasoningCostReduction: 0.2
    }
  };
  
  mutator.mutateValueFunction(proposal1);
  mutator.mutateValueFunction(proposal2);
  
  const history = mutator.getMutationHistory();
  if (history.length >= 2) {
    const result = mutator.rollbackToVersion(0);
    expect(result).toHaveProperty('version');
  }
});

test('rollbackToVersion should throw error for invalid version index', () => {
  const history = mutator.getMutationHistory();
  const invalidIndex = history.length + 1;
  
  expect(() => mutator.rollbackToVersion(invalidIndex)).toThrow('Invalid version index');
});