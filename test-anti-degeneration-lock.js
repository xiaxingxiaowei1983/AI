const { antiDegenerationLock } = require('./capabilities/anti-degeneration-lock');

console.log('=== 反进化锁定系统测试 ===\n');

let testPassed = 0;
let testTotal = 0;

function runTest(testName, testFunction) {
  testTotal++;
  console.log(`🧪 测试: ${testName}`);
  try {
    const result = testFunction();
    console.log(`✅ 通过: ${result || '测试成功'}`);
    testPassed++;
  } catch (error) {
    console.error(`❌ 失败: ${error.message}`);
  }
  console.log('');
}

// 测试1: 模块初始化测试
runTest('模块初始化测试', () => {
  if (!antiDegenerationLock) {
    throw new Error('反进化锁定模块未初始化');
  }
  return '反进化锁定模块初始化成功';
});

// 测试2: 回滚点创建测试
runTest('回滚点创建测试', () => {
  const testState = { cycle: 1, status: 'stable' };
  const rollbackPoint = antiDegenerationLock.createRollbackPoint(testState);
  if (!rollbackPoint || !rollbackPoint.timestamp) {
    throw new Error('回滚点创建失败');
  }
  return `回滚点创建成功，时间戳: ${rollbackPoint.timestamp}`;
});

// 测试3: 回滚操作测试
runTest('回滚操作测试', () => {
  const testState = { cycle: 2, status: 'stable' };
  antiDegenerationLock.createRollbackPoint(testState);
  const rolledBackState = antiDegenerationLock.rollbackToLatest();
  if (!rolledBackState) {
    throw new Error('回滚操作失败');
  }
  return `回滚操作成功，回滚到状态: ${JSON.stringify(rolledBackState)}`;
});

// 测试4: 进化验证测试 - 成功情况
runTest('进化验证测试 - 成功情况', () => {
  const validEvolution = {
    success: true,
    type: 'newFeature',
    message: '添加了智能任务优先级排序功能'
  };
  const validationResult = antiDegenerationLock.validateEvolution(validEvolution);
  if (!validationResult.valid) {
    throw new Error('有效进化验证失败');
  }
  return '有效进化验证通过';
});

// 测试5: 进化验证测试 - 失败情况
runTest('进化验证测试 - 失败情况', () => {
  const invalidEvolution = {
    success: false,
    type: 'unknown',
    message: '进化失败'
  };
  const validationResult = antiDegenerationLock.validateEvolution(invalidEvolution);
  if (validationResult.valid) {
    throw new Error('无效进化验证通过');
  }
  return '无效进化验证失败，符合预期';
});

// 测试6: 反玄学检测测试
runTest('反玄学检测测试', () => {
  const metaphysicalText = '某种程度上，这可能是一种从更高维度看本质上是的解决方案';
  const containsMetaphysics = antiDegenerationLock.containsMetaphysicsLanguage(metaphysicalText);
  if (!containsMetaphysics) {
    throw new Error('反玄学检测失败');
  }
  return '反玄学检测成功，检测到禁用的语言模式';
});

// 测试7: 禁止行为检测测试
runTest('禁止行为检测测试', () => {
  const prohibitedText = '为了显得更聪明，我们增加了一些复杂度';
  const containsProhibited = antiDegenerationLock.containsProhibitedBehavior(prohibitedText);
  if (!containsProhibited) {
    throw new Error('禁止行为检测失败');
  }
  return '禁止行为检测成功，检测到禁用的行为';
});

// 测试8: 能力冲突检测测试
runTest('能力冲突检测测试', () => {
  const newCapability = {
    name: '智能任务管理',
    description: '管理智能任务的能力'
  };
  const existingCapabilities = [
    {
      name: '智能任务管理',
      description: '管理智能任务的能力'
    }
  ];
  const conflicts = antiDegenerationLock.checkCapabilityConflicts(newCapability, existingCapabilities);
  if (conflicts.length === 0) {
    throw new Error('能力冲突检测失败');
  }
  return `能力冲突检测成功，检测到 ${conflicts.length} 个冲突`;
});

// 测试9: 能力冲突解决测试
runTest('能力冲突解决测试', () => {
  const newCapability = {
    name: '智能任务管理',
    description: '管理智能任务的能力'
  };
  const existingCapabilities = [
    {
      name: '智能任务管理',
      description: '管理智能任务的能力'
    }
  ];
  const conflicts = antiDegenerationLock.checkCapabilityConflicts(newCapability, existingCapabilities);
  const resolution = antiDegenerationLock.resolveCapabilityConflicts(conflicts);
  if (!resolution || !resolution.resolved) {
    throw new Error('能力冲突解决失败');
  }
  return `能力冲突解决成功，解决了 ${resolution.resolved.length} 个冲突`;
});

// 测试10: 能力评分测试
runTest('能力评分测试', () => {
  const capability = {
    name: '智能错误恢复能力',
    description: '从错误中恢复的能力',
    inputs: ['错误类型', '错误消息'],
    outputs: ['恢复策略', '执行步骤'],
    prerequisites: ['系统状态正常'],
    failureBoundaries: ['恢复策略不适用']
  };
  const score = antiDegenerationLock.calculateCapabilityScore(capability);
  if (score < 0) {
    throw new Error('能力评分失败');
  }
  return `能力评分成功，得分为: ${score}`;
});

// 测试11: 状态获取测试
runTest('状态获取测试', () => {
  const status = antiDegenerationLock.getStatus();
  if (!status || !status.status) {
    throw new Error('状态获取失败');
  }
  return `状态获取成功，状态: ${status.status}`;
});

// 测试12: 清理回滚点测试
runTest('清理回滚点测试', () => {
  // 创建多个回滚点
  for (let i = 0; i < 5; i++) {
    antiDegenerationLock.createRollbackPoint({ cycle: i, status: 'stable' });
  }
  const initialCount = antiDegenerationLock.rollbackPoints.length;
  antiDegenerationLock.cleanupRollbackPoints();
  const finalCount = antiDegenerationLock.rollbackPoints.length;
  if (finalCount !== 0) {
    throw new Error('清理回滚点失败');
  }
  return `清理回滚点成功，从 ${initialCount} 个减少到 ${finalCount} 个`;
});

console.log('=== 测试完成 ===');
console.log(`通过测试: ${testPassed}/${testTotal}`);

if (testPassed === testTotal) {
  console.log('🎉 所有测试通过，反进化锁定系统功能正常！');
} else {
  console.log('⚠️  部分测试失败，需要检查反进化锁定系统');
}

console.log('\n=== 反进化锁定系统测试报告 ===');
console.log('📋 测试覆盖范围:');
console.log('- ✅ 模块初始化');
console.log('- ✅ 回滚点管理');
console.log('- ✅ 进化验证');
console.log('- ✅ 反玄学检测');
console.log('- ✅ 禁止行为检测');
console.log('- ✅ 能力冲突管理');
console.log('- ✅ 能力评分');
console.log('- ✅ 系统状态管理');

console.log('\n📊 系统状态:');
const finalStatus = antiDegenerationLock.getStatus();
console.log(`- 状态: ${finalStatus.status}`);
console.log(`- 优先级: ${finalStatus.priority}`);
console.log(`- 回滚点数量: ${finalStatus.rollbackPointsCount}`);
console.log(`- 最大回滚点数量: ${finalStatus.maxRollbackPoints}`);

console.log('\n✅ 反进化锁定系统测试完成');
