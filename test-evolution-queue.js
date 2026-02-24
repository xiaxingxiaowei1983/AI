/**
 * 进化队列管理器测试
 * 测试新VFM协议下的进化队列管理功能
 */

const { evolutionQueueManager } = require('./capabilities/evolution-queue-manager');

// 测试能力
const testCapabilities = [
  {
    id: 'cap_1',
    name: '高频基础操作',
    level: 1,
    description: '通用的基础操作能力，支持多种场景，高频使用',
    inputs: ['操作指令', '必要参数'],
    outputs: ['操作结果', '执行状态'],
    prerequisites: ['工具可用', '权限足够'],
    failureBoundaries: ['工具不可用', '权限不足', '参数错误']
  },
  {
    id: 'cap_2',
    name: '极端场景处理',
    level: 3,
    description: '只在极端场景使用的特殊能力，增加系统复杂度',
    inputs: ['极端场景参数'],
    outputs: ['处理结果'],
    prerequisites: ['极端场景', '特殊权限'],
    failureBoundaries: ['场景判断错误', '权限不足']
  },
  {
    id: 'cap_3',
    name: '智能错误恢复',
    level: 2,
    description: '自动检测和恢复错误，提升系统稳定性，降低失败率',
    inputs: ['错误类型', '错误消息', '上下文信息'],
    outputs: ['恢复策略', '执行步骤', '预防措施'],
    prerequisites: ['错误可识别', '系统状态可评估'],
    failureBoundaries: ['错误不可识别', '系统状态异常']
  },
  {
    id: 'cap_4',
    name: '简化用户操作',
    level: 1,
    description: '简化用户操作，降低心智负担，只需一个词就能理解',
    inputs: ['操作指令'],
    outputs: ['操作结果'],
    prerequisites: ['工具可用'],
    failureBoundaries: ['工具不可用']
  },
  {
    id: 'cap_5',
    name: '高效数据处理',
    level: 1,
    description: '高效处理数据，减少自身成本，快速完成任务',
    inputs: ['数据'],
    outputs: ['处理结果'],
    prerequisites: ['数据可用'],
    failureBoundaries: ['数据不可用']
  }
];

// 运行测试
function runTests() {
  console.log('\n========================================');
  console.log('🧪 运行进化队列管理器测试');
  console.log('========================================');

  // 清空队列
  const clearResult = evolutionQueueManager.clearQueue();
  console.log('\n📋 测试1: 清空队列');
  console.log('结果:', clearResult.success ? '成功' : '失败');
  if (clearResult.success) {
    console.log('消息:', clearResult.message);
  }

  // 批量添加能力
  console.log('\n📋 测试2: 批量添加能力');
  const batchResult = evolutionQueueManager.batchAddToQueue(testCapabilities);
  console.log('成功数量:', batchResult.successCount);
  console.log('失败数量:', batchResult.failureCount);
  
  // 打印详细结果
  batchResult.results.forEach((result, index) => {
    const capability = testCapabilities[index];
    console.log(`  ${capability.name}: ${result.success ? '✅ 成功' : '❌ 失败'}`);
    if (!result.success) {
      console.log(`    原因: ${result.error}`);
    }
  });

  // 获取队列状态
  console.log('\n📋 测试3: 获取队列状态');
  const status = evolutionQueueManager.getStatus();
  console.log('总项数:', status.totalItems);
  console.log('高价值项数:', status.highValueCount);
  console.log('中价值项数:', status.mediumValueCount);
  console.log('低价值项数:', status.lowValueCount);
  console.log('平均评分:', status.averageScore.toFixed(1));

  // 获取队列报告
  console.log('\n📋 测试4: 生成队列报告');
  const report = evolutionQueueManager.generateQueueReport();
  console.log('队列长度:', report.queueLength);
  console.log('价值函数权重:', report.valueFunctionWeights);
  console.log('前3个能力:');
  report.topCapabilities.slice(0, 3).forEach((cap, index) => {
    console.log(`  ${index + 1}. ${cap.name}: 评分=${cap.score}`);
  });

  // 处理下一个能力
  console.log('\n📋 测试5: 处理下一个能力');
  const processResult = evolutionQueueManager.processNextCapability();
  console.log('结果:', processResult.success ? '成功' : '失败');
  if (processResult.success) {
    console.log('处理的能力:', processResult.capability.name);
    console.log('剩余队列长度:', processResult.remainingQueueLength);
  }

  // 再次获取队列状态
  console.log('\n📋 测试6: 再次获取队列状态');
  const newStatus = evolutionQueueManager.getStatus();
  console.log('总项数:', newStatus.totalItems);
  console.log('高价值项数:', newStatus.highValueCount);
  console.log('中价值项数:', newStatus.mediumValueCount);
  console.log('低价值项数:', newStatus.lowValueCount);

  console.log('\n========================================');
  console.log('🧪 测试完成');
  console.log('========================================');
}

// 执行测试
if (require.main === module) {
  runTests();
}

module.exports = {
  runTests
};
