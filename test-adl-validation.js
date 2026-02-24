/**
 * 反进化锁定指令验证测试
 * 测试 ADL 系统的各个功能点
 */

const { antiDegenerationLock } = require('./capabilities/anti-degeneration-lock');

console.log('🚀 启动反进化锁定指令验证测试');
console.log('=====================================\n');

// 测试 1: 验证成功的进化
function testValidEvolution() {
  console.log('📋 测试 1: 验证成功的进化');
  
  const evolutionResult = {
    success: true,
    type: 'newFeature',
    message: '实现了智能任务优先级排序功能，基于任务难度、价值和系统状态自动排序任务',
    capability: {
      name: '智能任务优先级排序',
      description: '基于任务难度、价值和系统状态自动排序任务',
      inputs: ['任务列表', '系统状态', '优先级规则'],
      outputs: ['排序后的任务列表', '排序理由'],
      failureBoundaries: ['任务数据无效', '系统状态获取失败']
    }
  };
  
  const validationResult = antiDegenerationLock.validateEvolution(evolutionResult);
  console.log('验证结果:', validationResult);
  console.log('预期结果: valid = true');
  console.log('测试通过:', validationResult.valid === true);
  console.log('');
}

// 测试 2: 验证使用模糊语言的进化
function testMetaphysicsLanguage() {
  console.log('📋 测试 2: 验证使用模糊语言的进化');
  
  const evolutionResult = {
    success: true,
    type: 'newAbstract',
    message: '从更高维度看，这个能力某种程度上可能是一种全新的思维方式',
    capability: {
      name: '新思维方式',
      description: '从更高维度理解问题',
      inputs: ['问题描述'],
      outputs: ['新视角'],
      failureBoundaries: ['无法理解问题']
    }
  };
  
  const validationResult = antiDegenerationLock.validateEvolution(evolutionResult);
  console.log('验证结果:', validationResult);
  console.log('预期结果: valid = false, 包含模糊语言违规');
  console.log('测试通过:', validationResult.valid === false && validationResult.violations.length > 0);
  console.log('');
}

// 测试 3: 验证违反禁止行为的进化
function testProhibitedBehavior() {
  console.log('📋 测试 3: 验证违反禁止行为的进化');
  
  const evolutionResult = {
    success: true,
    type: 'newFeature',
    message: '为了显得更聪明，增加了系统复杂度，引入了一些无法验证的机制',
    capability: {
      name: '复杂系统',
      description: '增加系统复杂度以显得更聪明',
      inputs: ['系统状态'],
      outputs: ['复杂结果'],
      failureBoundaries: ['系统崩溃']
    }
  };
  
  const validationResult = antiDegenerationLock.validateEvolution(evolutionResult);
  console.log('验证结果:', validationResult);
  console.log('预期结果: valid = false, 包含禁止行为违规');
  console.log('测试通过:', validationResult.valid === false && validationResult.violations.length > 0);
  console.log('');
}

// 测试 4: 验证能力描述不完整的进化
function testIncompleteCapability() {
  console.log('📋 测试 4: 验证能力描述不完整的进化');
  
  const evolutionResult = {
    success: true,
    type: 'newFeature',
    message: '实现了新功能，但没有详细描述',
    capability: {
      name: '新功能',
      description: '没有详细描述的新功能',
      // 缺少 inputs, outputs, failureBoundaries
    }
  };
  
  const validationResult = antiDegenerationLock.validateEvolution(evolutionResult);
  console.log('验证结果:', validationResult);
  console.log('预期结果: valid = false, 能力描述不完整');
  console.log('测试通过:', validationResult.valid === false && validationResult.violations.length > 0);
  console.log('');
}

// 测试 5: 验证非实质性进化
function testNonSubstantialEvolution() {
  console.log('📋 测试 5: 验证非实质性进化');
  
  const evolutionResult = {
    success: true,
    type: 'default',
    message: '优化了系统性能',
    capability: {
      name: '系统优化',
      description: '优化系统性能',
      inputs: ['系统状态'],
      outputs: ['优化结果'],
      failureBoundaries: ['优化失败']
    }
  };
  
  const validationResult = antiDegenerationLock.validateEvolution(evolutionResult);
  console.log('验证结果:', validationResult);
  console.log('预期结果: valid = false, 非实质性进化');
  console.log('测试通过:', validationResult.valid === false && validationResult.violations.length > 0);
  console.log('');
}

// 测试 6: 测试回滚机制
function testRollbackMechanism() {
  console.log('📋 测试 6: 测试回滚机制');
  
  // 创建回滚点
  const testState = {
    cycle: 1,
    totalEvolutions: 0,
    consecutiveFailures: 0
  };
  
  const evolutionHypothesis = '测试进化假设';
  const rollbackPoint = antiDegenerationLock.createRollbackPoint(testState, evolutionHypothesis);
  console.log('创建回滚点:', rollbackPoint);
  
  // 测试回滚
  const rollbackReasons = ['测试回滚'];
  const rolledBackState = antiDegenerationLock.rollbackToLatest(rollbackReasons);
  console.log('回滚结果:', rolledBackState);
  console.log('预期结果: 回滚成功，返回之前的状态');
  console.log('测试通过:', rolledBackState !== null);
  console.log('');
}

// 测试 7: 测试能力评分
function testCapabilityScoring() {
  console.log('📋 测试 7: 测试能力评分');
  
  const capability1 = {
    name: '智能任务优先级排序',
    description: '基于任务难度、价值和系统状态自动排序任务',
    inputs: ['任务列表', '系统状态', '优先级规则'],
    outputs: ['排序后的任务列表', '排序理由'],
    failureBoundaries: ['任务数据无效', '系统状态获取失败'],
    type: 'stable'
  };
  
  const capability2 = {
    name: '模糊功能',
    description: '从更高维度理解问题',
    inputs: ['问题描述'],
    outputs: ['新视角'],
    failureBoundaries: ['无法理解问题']
  };
  
  const score1 = antiDegenerationLock.calculateCapabilityScore(capability1);
  const score2 = antiDegenerationLock.calculateCapabilityScore(capability2);
  
  console.log('能力 1 评分:', score1);
  console.log('能力 2 评分:', score2);
  console.log('预期结果: 能力 1 评分 > 能力 2 评分');
  console.log('测试通过:', score1 > score2);
  console.log('');
}

// 测试 8: 测试进化历史记录
function testEvolutionHistory() {
  console.log('📋 测试 8: 测试进化历史记录');
  
  // 执行几个测试进化
  const testEvolutions = [
    {
      success: true,
      type: 'newFeature',
      message: '测试进化 1'
    },
    {
      success: true,
      type: 'newAbstract',
      message: '测试进化 2'
    }
  ];
  
  testEvolutions.forEach((evolution, index) => {
    antiDegenerationLock.validateEvolution(evolution);
    console.log(`执行测试进化 ${index + 1}`);
  });
  
  const history = antiDegenerationLock.getEvolutionHistory();
  console.log('进化历史记录数量:', history.length);
  console.log('预期结果: 历史记录数量 >= 2');
  console.log('测试通过:', history.length >= 2);
  console.log('');
}

// 运行所有测试
function runAllTests() {
  console.log('🔍 运行所有测试...\n');
  
  testValidEvolution();
  testMetaphysicsLanguage();
  testProhibitedBehavior();
  testIncompleteCapability();
  testNonSubstantialEvolution();
  testRollbackMechanism();
  testCapabilityScoring();
  testEvolutionHistory();
  
  console.log('=====================================');
  console.log('🎉 反进化锁定指令验证测试完成');
  console.log('=====================================');
}

// 执行测试
runAllTests();
