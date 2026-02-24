/**
 * 新VFM协议集成测试
 * 测试价值函数突变系统与进化队列管理的集成
 */

const { valueFunction } = require('./capabilities/value-function');
const { evolutionQueueManager } = require('./capabilities/evolution-queue-manager');
const { capabilityTree } = require('./capabilities/capability-tree');

// 测试能力
const testCapabilities = [
  {
    id: 'cap_1',
    name: '高频基础操作',
    level: 1,
    description: '通用的基础操作能力，支持多种场景，高频使用，稳定可靠',
    inputs: ['操作指令', '必要参数'],
    outputs: ['操作结果', '执行状态'],
    prerequisites: ['工具可用', '权限足够', '系统稳定'],
    failureBoundaries: ['工具不可用', '权限不足', '参数错误', '系统不稳定']
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
    description: '自动检测和恢复错误，提升系统稳定性，降低失败率，稳定可靠',
    inputs: ['错误类型', '错误消息', '上下文信息'],
    outputs: ['恢复策略', '执行步骤', '预防措施'],
    prerequisites: ['错误可识别', '系统状态可评估', '系统稳定'],
    failureBoundaries: ['错误不可识别', '系统状态异常', '系统不稳定']
  },
  {
    id: 'cap_4',
    name: '简化用户操作',
    level: 1,
    description: '简化用户操作，降低心智负担，只需一个词就能理解，稳定可靠',
    inputs: ['操作指令'],
    outputs: ['操作结果'],
    prerequisites: ['工具可用', '系统稳定'],
    failureBoundaries: ['工具不可用', '系统不稳定']
  },
  {
    id: 'cap_5',
    name: '高效数据处理',
    level: 1,
    description: '高效处理数据，减少自身成本，快速完成任务，稳定可靠',
    inputs: ['数据'],
    outputs: ['处理结果'],
    prerequisites: ['数据可用', '系统稳定'],
    failureBoundaries: ['数据不可用', '系统不稳定']
  }
];

// 运行测试
function runTests() {
  console.log('\n========================================');
  console.log('🧪 运行新VFM协议集成测试');
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
          meetsThreshold: evaluation.meetsThreshold,
          isLowValue: evaluation.isLowValue,
          dimensions: evaluation.dimensions
        };
      });
      
      console.log('✅ 价值函数评估成功');
      results.forEach(result => {
        console.log(`   ${result.capability}: 评分=${result.score}, 达到阈值=${result.meetsThreshold}, 低价值=${result.isLowValue}`);
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
        console.log(`     ${index + 1}. ${cap.name}: 评分=${cap.score}`);
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
        HighFrequency: 4,
        FailureReduction: 3,
        UserBurden: 2,
        SelfCost: 1
      };
      
      const mutationResult = valueFunction.mutateWeights(newWeights, '测试突变: 增加高频复用权重');
      
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
      console.log(`   集成后队列状态: 总项=${status.totalItems}, 平均评分=${status.averageScore.toFixed(1)}`);
      
      passedTests++;
    } catch (error) {
      console.error('❌ 与能力树集成测试失败:', error.message);
    }
  }

  // 测试5: 低价值能力过滤
  function testLowValueCapabilityFiltering() {
    testCount++;
    console.log('\n📋 测试5: 低价值能力过滤');
    
    try {
      // 清空队列
      evolutionQueueManager.clearQueue();
      
      // 测试低价值能力
      const lowValueCapability = {
        id: 'cap_low',
        name: '七彩文字效果',
        level: 3,
        description: '把文字颜色变成七彩的，只提升表现不提升成功率',
        inputs: ['文字内容', '颜色配置'],
        outputs: ['七彩文字'],
        prerequisites: ['特殊配置', '用户喜好'],
        failureBoundaries: ['配置错误', '用户不喜欢']
      };
      
      const result = evolutionQueueManager.addToQueue(lowValueCapability);
      console.log(`   低价值能力添加结果: ${result.success ? '成功' : '失败'}`);
      if (!result.success) {
        console.log(`   原因: ${result.error}`);
        console.log('   ✅ 低价值能力过滤成功');
      }
      
      // 测试高价值能力
      const highValueCapability = {
        id: 'cap_high',
        name: '智能错误处理',
        level: 2,
        description: '自动检测和处理错误，降低失败率，稳定可靠',
        inputs: ['错误信息', '上下文'],
        outputs: ['处理结果', '预防措施'],
        prerequisites: ['错误可识别', '系统稳定'],
        failureBoundaries: ['错误不可识别', '系统不稳定']
      };
      
      const highValueResult = evolutionQueueManager.addToQueue(highValueCapability);
      console.log(`   高价值能力添加结果: ${highValueResult.success ? '成功' : '失败'}`);
      if (highValueResult.success) {
        console.log('   ✅ 高价值能力添加成功');
      }
      
      passedTests++;
    } catch (error) {
      console.error('❌ 低价值能力过滤测试失败:', error.message);
    }
  }

  // 运行所有测试
  testValueFunctionEvaluation();
  testEvolutionQueueManagement();
  testValueFunctionMutation();
  testCapabilityTreeIntegration();
  testLowValueCapabilityFiltering();

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
