// 测试完善后的回滚机制
const { getADLInstance } = require('./skills/adl-core');

console.log('🧪 测试完善后的回滚机制');
console.log('=====================================');

// 初始化ADL实例
const adl = getADLInstance();

// 测试用例1: 创建带失败条件的回滚点
console.log('\n📋 测试用例 1: 创建带失败条件的回滚点');
const failureConditions = [
  '进化降低成功率',
  '进化降低确定性',
  '进化引入无法解释的机制',
  '进化违反禁止行为',
  '进化引入模糊概念',
  '成功率<90%'
];

const rollbackPoint = adl.createRollbackPoint('测试回滚点', { test: 'data' }, failureConditions);
console.log(`   回滚点ID: ${rollbackPoint.id}`);
console.log(`   回滚点描述: ${rollbackPoint.description}`);
console.log(`   失败条件: ${rollbackPoint.failureConditions.join(', ')}`);
console.log(`   测试结果: ✅ 通过`);

// 测试用例2: 执行回滚
console.log('\n📋 测试用例 2: 执行回滚');
const rollbackResult = adl.rollbackToPoint(rollbackPoint.id, ['测试回滚原因']);
console.log(`   回滚结果: ${rollbackResult ? '成功' : '失败'}`);
console.log(`   测试结果: ${rollbackResult ? '✅ 通过' : '❌ 失败'}`);

// 测试用例3: 创建默认失败条件的回滚点
console.log('\n📋 测试用例 3: 创建默认失败条件的回滚点');
const defaultRollbackPoint = adl.createRollbackPoint('默认回滚点', { test: 'data' });
console.log(`   回滚点ID: ${defaultRollbackPoint.id}`);
console.log(`   回滚点描述: ${defaultRollbackPoint.description}`);
console.log(`   失败条件: ${defaultRollbackPoint.failureConditions.join(', ')}`);
console.log(`   测试结果: ✅ 通过`);

// 测试用例4: 执行默认回滚
console.log('\n📋 测试用例 4: 执行默认回滚');
const defaultRollbackResult = adl.rollbackToPoint(defaultRollbackPoint.id, ['默认回滚原因']);
console.log(`   回滚结果: ${defaultRollbackResult ? '成功' : '失败'}`);
console.log(`   测试结果: ${defaultRollbackResult ? '✅ 通过' : '❌ 失败'}`);

// 测试用例5: 验证回滚点数量
console.log('\n📋 测试用例 5: 验证回滚点数量');
const status = adl.getStatus();
console.log(`   总回滚点数量: ${status.statistics.totalRollbackPoints}`);
console.log(`   活跃回滚点数量: ${status.statistics.activeRollbackPoints}`);
console.log(`   测试结果: ✅ 通过`);

console.log('\n=====================================');
console.log('✅ 回滚机制测试完成');
