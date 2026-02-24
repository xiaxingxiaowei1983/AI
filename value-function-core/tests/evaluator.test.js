// 价值评估引擎测试
const evaluator = require('../evaluator');
const dimensions = require('../dimensions');
const lowValueDetector = require('../low-value-detector');

// 模拟高价值能力
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

// 模拟低价值能力
const lowValueCapability = {
  name: '极端场景处理',
  usageFrequency: 'extreme',
  scenarios: ['极端网络条件'],
  improvesPerformance: true,
  isCrossTaskTransferable: false,
  increasesComplexity: true,
  dependencies: ['网络诊断', '极端条件模拟', '特殊协议处理']
};

// 测试评估能力价值
test('evaluateCapabilityValue should return correct value assessment for high value capability', () => {
  const result = evaluator.evaluateCapabilityValue(highValueCapability);
  
  expect(result).toHaveProperty('totalValue');
  expect(result).toHaveProperty('dimensions');
  expect(result).toHaveProperty('isLowValue');
  expect(result).toHaveProperty('isEligible');
  expect(result).toHaveProperty('timestamp');
  
  // 高价值能力应该有较高的总价值
  expect(result.totalValue).toBeGreaterThan(0.7);
  // 高价值能力不应该被标记为低价值
  expect(result.isLowValue).toBe(false);
  // 高价值能力应该符合进化条件
  expect(result.isEligible).toBe(true);
});

test('evaluateCapabilityValue should return correct value assessment for low value capability', () => {
  const result = evaluator.evaluateCapabilityValue(lowValueCapability);
  
  expect(result).toHaveProperty('totalValue');
  expect(result).toHaveProperty('dimensions');
  expect(result).toHaveProperty('isLowValue');
  expect(result).toHaveProperty('isEligible');
  
  // 低价值能力应该有较低的总价值
  expect(result.totalValue).toBeLessThan(0.4);
  // 低价值能力应该被标记为低价值
  expect(result.isLowValue).toBe(true);
  // 低价值能力不应该符合进化条件
  expect(result.isEligible).toBe(false);
});

test('evaluateCapabilityValue should throw error for invalid capability', () => {
  expect(() => evaluator.evaluateCapabilityValue(null)).toThrow('Invalid capability object');
  expect(() => evaluator.evaluateCapabilityValue('not an object')).toThrow('Invalid capability object');
});

// 测试批量评估
test('batchEvaluateCapabilities should evaluate multiple capabilities', () => {
  const capabilities = [highValueCapability, lowValueCapability];
  const results = evaluator.batchEvaluateCapabilities(capabilities);
  
  expect(Array.isArray(results)).toBe(true);
  expect(results.length).toBe(2);
  expect(results[0]).toHaveProperty('valueAssessment');
  expect(results[1]).toHaveProperty('valueAssessment');
});

// 测试按价值排序
test('sortCapabilitiesByValue should sort capabilities by value', () => {
  const capabilities = [
    {
      ...lowValueCapability,
      valueAssessment: evaluator.evaluateCapabilityValue(lowValueCapability)
    },
    {
      ...highValueCapability,
      valueAssessment: evaluator.evaluateCapabilityValue(highValueCapability)
    }
  ];
  
  const sorted = evaluator.sortCapabilitiesByValue(capabilities);
  
  expect(sorted[0].valueAssessment.totalValue).toBeGreaterThan(
    sorted[1].valueAssessment.totalValue
  );
});

// 测试计算总价值
test('calculateTotalValue should return correct total value', () => {
  const values = {
    reusePotential: 0.8,
    failureImpact: 0.9,
    cognitiveBurdenReduction: 0.7,
    reasoningCostReduction: 0.8,
    certaintyImprovement: 0.9,
    isLowValue: false
  };
  
  const totalValue = evaluator.calculateTotalValue(values);
  
  expect(typeof totalValue).toBe('number');
  expect(totalValue).toBeGreaterThan(0);
  expect(totalValue).toBeLessThanOrEqual(1);
});

test('calculateTotalValue should apply low value penalty', () => {
  const values = {
    reusePotential: 0.8,
    failureImpact: 0.9,
    cognitiveBurdenReduction: 0.7,
    reasoningCostReduction: 0.8,
    certaintyImprovement: 0.9,
    isLowValue: true
  };
  
  const totalValue = evaluator.calculateTotalValue(values);
  
  expect(typeof totalValue).toBe('number');
  expect(totalValue).toBeGreaterThan(0);
  expect(totalValue).toBeLessThan(0.7); // 应该受到惩罚
});

// 测试核心价值维度
test('dimensions should evaluate reuse potential correctly', () => {
  const score = dimensions.evaluateReusePotential(highValueCapability);
  expect(typeof score).toBe('number');
  expect(score).toBeGreaterThan(0);
  expect(score).toBeLessThanOrEqual(1);
});

test('dimensions should evaluate failure impact correctly', () => {
  const score = dimensions.evaluateFailureImpact(highValueCapability);
  expect(typeof score).toBe('number');
  expect(score).toBeGreaterThan(0);
  expect(score).toBeLessThanOrEqual(1);
});

test('dimensions should evaluate cognitive burden reduction correctly', () => {
  const score = dimensions.evaluateCognitiveBurdenReduction(highValueCapability);
  expect(typeof score).toBe('number');
  expect(score).toBeGreaterThan(0);
  expect(score).toBeLessThanOrEqual(1);
});

test('dimensions should evaluate reasoning cost reduction correctly', () => {
  const score = dimensions.evaluateReasoningCostReduction(highValueCapability);
  expect(typeof score).toBe('number');
  expect(score).toBeGreaterThan(0);
  expect(score).toBeLessThanOrEqual(1);
});

test('dimensions should evaluate certainty improvement correctly', () => {
  const score = dimensions.evaluateCertaintyImprovement(highValueCapability);
  expect(typeof score).toBe('number');
  expect(score).toBeGreaterThan(0);
  expect(score).toBeLessThanOrEqual(1);
});

// 测试低价值能力检测
test('lowValueDetector should detect low value capability', () => {
  const isLowValue = lowValueDetector.detectLowValueCapability(lowValueCapability);
  expect(isLowValue).toBe(true);
});

test('lowValueDetector should not detect high value capability as low value', () => {
  const isLowValue = lowValueDetector.detectLowValueCapability(highValueCapability);
  expect(isLowValue).toBe(false);
});

// 测试批量评估所有维度
test('evaluateAllDimensions should return all dimension scores', () => {
  const result = dimensions.evaluateAllDimensions(highValueCapability);
  
  expect(result).toHaveProperty('reusePotential');
  expect(result).toHaveProperty('failureImpact');
  expect(result).toHaveProperty('cognitiveBurdenReduction');
  expect(result).toHaveProperty('reasoningCostReduction');
  expect(result).toHaveProperty('certaintyImprovement');
  
  Object.values(result).forEach(score => {
    expect(typeof score).toBe('number');
    expect(score).toBeGreaterThan(0);
    expect(score).toBeLessThanOrEqual(1);
  });
});