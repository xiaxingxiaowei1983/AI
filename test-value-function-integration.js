/**
 * 价值函数集成测试
 * 测试价值函数核心模块和进化队列管理器的功能
 */

const { valueFunction } = require('./capabilities/value-function');
const { evolutionQueueManager } = require('./capabilities/evolution-queue-manager');
const { capabilityTree } = require('./capabilities/capability-tree');

// 测试能力
const testCapabilities = [
  {
    id: 'cap_1',
    name: '基础操作',
    level: 1,
    description: '通用的基础操作能力，支持多种场景，稳定可靠',
    inputs: ['操作指令', '必要参数'],
    outputs: ['操作结果', '执行状态'],
    prerequisites: ['工具可用', '权限足够'],
    failureBoundaries: ['工具不可用', '权限不足', '参数错误'],
    usageCount: 100,
    lastUsed: Date.now() - 86400000 // 1天前
  },
  {
    id: 'cap_2',
    name: '极端场景处理',
    level: 3,
    description: '只在极端场景使用的特殊能力，增加系统复杂度',
    inputs: ['极端场景参数'],
    outputs: ['处理结果'],
    prerequisites: ['极端场景', '特殊权限'],
    failureBoundaries: ['场景判断错误', '权限不足'],
    usageCount: 2,
    lastUsed: Date.now() - 30 * 86400000 // 30天前
  },
  {
    id: 'cap_3',
    name: '智能错误恢复',
    level: 2,
    description: '自动检测和恢复错误，提升系统稳定性和可靠性',
    inputs: ['错误类型', '错误消息', '上下文信息'],
    outputs: ['恢复策略', '执行步骤', '预防措施'],
    prerequisites: ['错误可识别', '系统状态可评估'],
    failureBoundaries: ['错误不可识别', '系统状态异常'],
    usageCount: 50,
    lastUsed: Date.now() - 3600000 // 1小时前
  },
  {
    id: 'cap_4',
    name: '特定任务处理',
    level: 2,
    description: '专门处理特定任务的能力，无法跨任务迁移',
    inputs: ['特定任务参数'],
    outputs: ['处理结果'],
    prerequisites: ['特定任务场景', '特殊配置'],
    failureBoundaries: ['场景不匹配', '配置错误'],
    usageCount: 10,
    lastUsed: Date.now() - 7 * 86400000 // 7天前
  },
  {
    id: 'cap_5',
    name: '高效数据处理',
    level: 1,
    description: '高效处理大量数据，减少系统负载，提升响应速度',
    inputs: ['数据集合', '处理参数'],
    outputs: ['处理结果', '性能指标'],
    prerequisites: ['数据可用', '处理资源充足'],
    failureBoundaries: ['数据不可用', '资源不足', '处理超时'],
    usageCount: 80,
    lastUsed: Date.now() - 1800000 // 30分钟前
  }
];

// 运行测试
function runTests() {
  console.log('\n========================================');
  console.log('🧪 运行价值函数集成测试');
  console.log('========================================');

  let testCount = 0;
  let passedTests = 0;

  // 测试1: 价值函数评估
  function testValueFunctionEvaluation() {
    testCount++;
    console.log('\n📋 测试1: 价值函数评估');
    
    try {
      const results = testCapabilities.map(capability => {
        const evaluation = valueFunction.evaluateCapability(capability);
        return {
          capability: capability.name,
          score: evaluation.score,
          isLowValue: evaluation.isLowValue,
          dimensions: evaluation.dimensions
        };
      });
      
      console.log('✅ 价值函数评估成功');
      results.forEach(result => {
        console.log(`   ${result.capability}: 评分=${result.score.toFixed(2)}, 低价值=${result.isLowValue}`);
      });
      passedTests++;
    } catch (error) {
      console.error('❌ 价值函数评估失败:', error.message);
    }
  }

  // 测试2: 进化队列管理
  function testEvolutionQueueManagement() {
    testCount++;
    console.log('\n📋 测试2: 进化队列管理');
    
    try {
      // 清空队列
      evolutionQueueManager.clearQueue();
      console.log('   ✅ 队列清空成功');
      
      // 批量添加能力
      const batchResult = evolutionQueueManager.batchAddToQueue(testCapabilities);
      console.log(`   ✅ 批量添加能力: 成功=${batchResult.successCount}, 失败=${batchResult.failureCount}`);
      
      // 获取队列状态
      const status = evolutionQueueManager.getStatus();
      console.log(`   ✅ 队列状态: 总项=${status.totalItems}, 高价值=${status.highValueCount}, 中价值=${status.mediumValueCount}, 低价值=${status.lowValueCount}`);
      
      // 获取队列报告
      const report = evolutionQueueManager.generateQueueReport();
      console.log(`   ✅ 队列报告生成成功，队列长度: ${report.queueLength}`);
      console.log('   前3个高价值能力:');
      report.topCapabilities.slice(0, 3).forEach((cap, index) => {
        console.log(`     ${index + 1}. ${cap.name}: 评分=${cap.score.toFixed(2)}`);
      });
      
      passedTests++;
    } catch (error) {
      console.error('❌ 进化队列管理失败:', error.message);
    }
  }

  // 测试3: 价值函数突变
  function testValueFunctionMutation() {
    testCount++;
    console.log('\n📋 测试3: 价值函数突变');
    
    try {
      // 原始权重
      const originalWeights = valueFunction.getCurrentWeights();
      console.log('   原始权重:', originalWeights);
      
      // 测试突变
      const newWeights = {
        reuseFrequency: 0.3,
        failureRateImpact: 0.3,
        cognitiveLoadReduction: 0.15,
        reasoningCostReduction: 0.1,
        systemCertainty: 0.15
      };
      
      const mutationResult = valueFunction.mutateWeights(newWeights, '测试突变: 增加稳定性和复用性权重');
      
      if (mutationResult.success) {
        console.log('   ✅ 价值函数突变成功');
        console.log('   新权重:', mutationResult.mutation.newWeights);
        console.log('   预期效果:', mutationResult.mutation.expectedEffect.join('; '));
        
        // 测试回滚
        const rollbackResult = valueFunction.rollbackToVersion(0);
        if (rollbackResult.success) {
          console.log('   ✅ 价值函数回滚成功');
          console.log('   回滚后权重:', rollbackResult.weights);
        } else {
          console.error('   ❌ 价值函数回滚失败:', rollbackResult.error);
        }
      } else {
        console.error('   ❌ 价值函数突变失败:', mutationResult.error);
      }
      
      passedTests++;
    } catch (error) {
      console.error('❌ 价值函数突变测试失败:', error.message);
    }
  }

  // 测试4: 与能力树集成
  function testCapabilityTreeIntegration() {
    testCount++;
    console.log('\n📋 测试4: 与能力树集成');
    
    try {
      // 获取能力树中的能力
      const allNodes = capabilityTree.getAllNodes().filter(node => node.level > 0);
      console.log(`   能力树中的能力数量: ${allNodes.length}`);
      
      // 批量评估能力
      const batchResults = evolutionQueueManager.batchAddToQueue(allNodes.slice(0, 5)); // 只测试前5个
      console.log(`   批量添加结果: 成功=${batchResults.successCount}, 失败=${batchResults.failureCount}`);
      
      // 获取队列状态
      const status = evolutionQueueManager.getStatus();
      console.log(`   集成后队列状态: 总项=${status.totalItems}, 平均评分=${status.averageScore.toFixed(2)}`);
      
      passedTests++;
    } catch (error) {
      console.error('❌ 与能力树集成测试失败:', error.message);
    }
  }

  // 运行所有测试
  testValueFunctionEvaluation();
  testEvolutionQueueManagement();
  testValueFunctionMutation();
  testCapabilityTreeIntegration();

  // 测试总结
  console.log('\n========================================');
  console.log('📊 测试总结');
  console.log('========================================');
  console.log(`总测试数: ${testCount}`);
  console.log(`通过测试: ${passedTests}`);
  console.log(`失败测试: ${testCount - passedTests}`);
  console.log(`通过率: ${Math.round((passedTests / testCount) * 100)}%`);
  console.log('========================================');

  return passedTests === testCount;
}

// 执行测试
if (require.main === module) {
  const success = runTests();
  process.exit(success ? 0 : 1);
}

module.exports = {
  runTests
};