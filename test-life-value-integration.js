// 人生决策宗师价值函数集成测试
const lifeValueIntegration = require('./agents/life/value-function-integration');
const { buildCapability, buildMutationProposal } = lifeValueIntegration.utils;

console.log('🧬 人生决策宗师价值函数集成测试');
console.log('=================================');

// 测试用例1：基础集成测试
function testBasicIntegration() {
  console.log('\n🔧 测试1：基础集成功能');
  
  try {
    // 检查集成状态
    const status = lifeValueIntegration.getIntegrationStatus();
    console.log('✅ 集成状态检查成功');
    console.log('   状态:', status.status);
    console.log('   健康状态:', status.health);
    console.log('   注册能力数:', status.registeredCapabilities);
    console.log('   进化队列大小:', status.evolutionQueueSize);
    console.log('   价值函数版本:', status.valueFunctionVersion);
    
    // 检查当前价值函数
    const currentFunction = lifeValueIntegration.getCurrentValueFunction();
    console.log('✅ 当前价值函数获取成功');
    console.log('   版本:', currentFunction.version);
    
    return true;
  } catch (error) {
    console.log('❌ 基础集成测试失败:', error.message);
    return false;
  }
}

// 测试用例2：能力评估测试
function testCapabilityEvaluation() {
  console.log('\n📊 测试2：能力评估');
  
  try {
    // 构建测试能力
    const testCapability = buildCapability(
      '能量状态评估',
      '评估用户的能量状态和能量流动，提供能量管理建议',
      ['健康管理', '个人成长', '职业规划', '关系管理'],
      {
        isCrossTaskTransferable: true,
        hasGenericInterface: true,
        isReusable: true,
        hasErrorHandling: true,
        hasRollback: true,
        successRate: 0.93,
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
      }
    );
    
    // 评估能力
    const evaluation = lifeValueIntegration.evaluateCapability(testCapability);
    console.log('✅ 能力评估成功');
    console.log('   能力名称:', testCapability.name);
    console.log('   综合价值:', evaluation.totalValue.toFixed(2));
    console.log('   是否符合进化条件:', evaluation.isEligible);
    console.log('   是否低价值能力:', evaluation.isLowValue);
    
    // 检查进化队列
    const evolutionQueue = lifeValueIntegration.getEvolutionQueue();
    console.log('✅ 进化队列检查成功');
    console.log('   队列大小:', evolutionQueue.length);
    if (evolutionQueue.length > 0) {
      console.log('   队列首个能力:', evolutionQueue[0].name);
      console.log('   价值评分:', evolutionQueue[0].evaluation.totalValue.toFixed(2));
    }
    
    return true;
  } catch (error) {
    console.log('❌ 能力评估测试失败:', error.message);
    return false;
  }
}

// 测试用例3：低价值能力检测测试
function testLowValueDetection() {
  console.log('\n❌ 测试3：低价值能力检测');
  
  try {
    // 构建低价值能力
    const lowValueCapability = buildCapability(
      '极端场景应急处理',
      '仅在极端紧急情况下使用的应急处理能力',
      ['极端紧急情况'],
      {
        isOnlyForExtremeScenarios: true,
        improvesPerformance: true,
        improvesSuccessRate: false,
        successRate: 0.75,
        isCrossTaskTransferable: false,
        taskSpecific: 'emergency',
        increasesComplexity: true,
        dependencies: ['dependency1', 'dependency2', 'dependency3', 'dependency4']
      }
    );
    
    // 评估能力
    const evaluation = lifeValueIntegration.evaluateCapability(lowValueCapability);
    console.log('✅ 低价值能力评估成功');
    console.log('   能力名称:', lowValueCapability.name);
    console.log('   综合价值:', evaluation.totalValue.toFixed(2));
    console.log('   是否符合进化条件:', evaluation.isEligible);
    console.log('   是否低价值能力:', evaluation.isLowValue);
    
    // 检查低价值检测
    const isLowValue = lifeValueIntegration.detectLowValueCapability(lowValueCapability);
    console.log('✅ 低价值能力检测成功');
    console.log('   检测结果:', isLowValue);
    
    if (isLowValue && !evaluation.isEligible) {
      console.log('✅ 低价值能力被正确识别');
    } else {
      console.log('❌ 低价值能力检测结果不符合预期');
    }
    
    return isLowValue && !evaluation.isEligible;
  } catch (error) {
    console.log('❌ 低价值能力检测测试失败:', error.message);
    return false;
  }
}

// 测试用例4：价值函数突变测试
function testValueFunctionMutation() {
  console.log('\n🔄 测试4：价值函数突变');
  
  try {
    // 获取当前价值函数
    const currentFunction = lifeValueIntegration.getCurrentValueFunction();
    console.log('✅ 当前价值函数获取成功');
    console.log('   版本:', currentFunction.version);
    console.log('   当前用户认知负担减少权重:', currentFunction.weights.cognitiveBurdenReduction);
    
    // 构建突变提案
    const mutationProposal = buildMutationProposal(
      {
        cognitiveBurdenReduction: 0.28,  // 增加用户体验权重
        reasoningCostReduction: 0.12     // 减少推理成本权重
      },
      0.25,  // 调整低价值惩罚因子
      0.42   // 调整价值阈值
    );
    
    // 执行突变
    const newFunction = lifeValueIntegration.mutateValueFunction(mutationProposal);
    console.log('✅ 价值函数突变成功');
    console.log('   新版本:', newFunction.version);
    console.log('   新用户认知负担减少权重:', newFunction.weights.cognitiveBurdenReduction);
    console.log('   新低价值惩罚因子:', newFunction.lowValuePenalty);
    console.log('   新价值阈值:', newFunction.minValueThreshold);
    
    // 验证突变后功能
    const status = lifeValueIntegration.getIntegrationStatus();
    console.log('✅ 突变后集成状态检查成功');
    console.log('   价值函数版本:', status.valueFunctionVersion);
    
    return true;
  } catch (error) {
    console.log('❌ 价值函数突变测试失败:', error.message);
    return false;
  }
}

// 测试用例5：批量评估测试
function testBatchEvaluation() {
  console.log('\n📋 测试5：批量评估');
  
  try {
    // 构建多个测试能力
    const testCapabilities = [
      buildCapability(
        '智能决策分析',
        '分析用户面临的决策情境，提供智能分析和建议',
        ['职业规划', '健康管理', '关系管理', '财务规划', '个人成长'],
        {
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
        }
      ),
      buildCapability(
        '健康状态评估',
        '评估用户的健康状态，提供健康管理建议',
        ['健康管理', '个人成长'],
        {
          isCrossTaskTransferable: true,
          hasGenericInterface: true,
          isReusable: true,
          hasErrorHandling: true,
          hasRollback: true,
          successRate: 0.92,
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
        }
      ),
      buildCapability(
        '财务规划分析',
        '分析用户的财务状况，提供财务规划建议',
        ['财务规划'],
        {
          isCrossTaskTransferable: false,
          hasGenericInterface: false,
          isReusable: false,
          hasErrorHandling: true,
          hasRollback: false,
          successRate: 0.85,
          reducesSystemFailure: false,
          simplifiesUserInteraction: true,
          hasClearDocumentation: true,
          complexityLevel: 'medium',
          hasIntuitiveInterface: false,
          reducesComputationalComplexity: false,
          reducesAPICalls: false,
          reducesMemoryUsage: false,
          improvesExecutionSpeed: false,
          hasClearIOspecification: true,
          hasPredictableBehavior: true,
          hasValidationMechanism: true,
          providesDeterministicResults: true
        }
      )
    ];
    
    // 批量评估
    const results = lifeValueIntegration.batchEvaluateCapabilities(testCapabilities);
    console.log('✅ 批量评估成功');
    console.log('   评估能力数:', results.length);
    
    // 显示评估结果
    results.forEach((result, index) => {
      console.log(`\n   能力 ${index + 1}: ${result.name}`);
      console.log(`     综合价值: ${result.evaluation.totalValue.toFixed(2)}`);
      console.log(`     是否符合进化条件: ${result.evaluation.isEligible}`);
      console.log(`     是否低价值能力: ${result.evaluation.isLowValue}`);
    });
    
    return true;
  } catch (error) {
    console.log('❌ 批量评估测试失败:', error.message);
    return false;
  }
}

// 测试用例6：价值报告生成测试
function testValueReportGeneration() {
  console.log('\n📈 测试6：价值报告生成');
  
  try {
    // 生成价值报告
    const report = lifeValueIntegration.generateValueReport();
    console.log('✅ 价值报告生成成功');
    console.log('   报告时间:', report.reportTimestamp);
    console.log('   总能力数:', report.totalCapabilities);
    console.log('   高价值能力数:', report.highValueCapabilities);
    console.log('   低价值能力数:', report.lowValueCapabilities);
    console.log('   进化队列大小:', report.evolutionQueueSize);
    console.log('   价值函数版本:', report.currentValueFunction.version);
    
    // 显示 top 3 高价值能力
    if (report.topValueCapabilities.length > 0) {
      console.log('\n   Top 3 高价值能力:');
      report.topValueCapabilities.slice(0, 3).forEach((capability, index) => {
        console.log(`     ${index + 1}. ${capability.name} - 价值: ${capability.evaluation.totalValue.toFixed(2)}`);
      });
    }
    
    return true;
  } catch (error) {
    console.log('❌ 价值报告生成测试失败:', error.message);
    return false;
  }
}

// 测试用例7：低价值能力清理测试
function testLowValueCleanup() {
  console.log('\n🧹 测试7：低价值能力清理');
  
  try {
    // 生成价值报告（清理前）
    const beforeReport = lifeValueIntegration.generateValueReport();
    console.log('✅ 清理前价值报告生成成功');
    console.log('   总能力数:', beforeReport.totalCapabilities);
    console.log('   低价值能力数:', beforeReport.lowValueCapabilities);
    
    // 清理低价值能力
    const cleanedCapabilities = lifeValueIntegration.cleanupLowValueCapabilities(0.4);
    console.log('✅ 低价值能力清理成功');
    console.log('   清理能力数:', cleanedCapabilities.length);
    
    // 生成价值报告（清理后）
    const afterReport = lifeValueIntegration.generateValueReport();
    console.log('✅ 清理后价值报告生成成功');
    console.log('   总能力数:', afterReport.totalCapabilities);
    console.log('   低价值能力数:', afterReport.lowValueCapabilities);
    
    // 验证清理效果
    const cleanupEffective = afterReport.totalCapabilities <= beforeReport.totalCapabilities;
    if (cleanupEffective) {
      console.log('✅ 低价值能力清理有效');
    } else {
      console.log('❌ 低价值能力清理效果不符合预期');
    }
    
    return cleanupEffective;
  } catch (error) {
    console.log('❌ 低价值能力清理测试失败:', error.message);
    return false;
  }
}

// 运行所有测试
function runAllTests() {
  console.log('开始运行集成测试...');
  
  const tests = [
    { name: '基础集成功能', test: testBasicIntegration },
    { name: '能力评估', test: testCapabilityEvaluation },
    { name: '低价值能力检测', test: testLowValueDetection },
    { name: '价值函数突变', test: testValueFunctionMutation },
    { name: '批量评估', test: testBatchEvaluation },
    { name: '价值报告生成', test: testValueReportGeneration },
    { name: '低价值能力清理', test: testLowValueCleanup }
  ];
  
  let passedTests = 0;
  
  for (const test of tests) {
    console.log(`\n📋 运行测试：${test.name}`);
    console.log('-----------------------------');
    
    const success = test.test();
    if (success) {
      passedTests++;
      console.log(`✅ ${test.name} 通过`);
    } else {
      console.log(`❌ ${test.name} 失败`);
    }
  }
  
  console.log('\n=================================');
  console.log('🧬 人生决策宗师价值函数集成测试结果');
  console.log(`通过测试: ${passedTests}/${tests.length}`);
  
  if (passedTests === tests.length) {
    console.log('🎉 所有测试通过！人生决策宗师价值函数集成成功');
    console.log('\n📋 集成完成情况:');
    console.log('1. 价值函数核心系统集成 ✅');
    console.log('2. 能力价值评估功能 ✅');
    console.log('3. 低价值能力检测 ✅');
    console.log('4. 价值函数突变机制 ✅');
    console.log('5. 进化队列管理 ✅');
    console.log('6. 价值报告生成 ✅');
    console.log('7. 低价值能力清理 ✅');
    console.log('\n📈 系统状态:');
    
    // 生成最终状态报告
    const finalReport = lifeValueIntegration.generateValueReport();
    console.log('   注册能力数:', finalReport.totalCapabilities);
    console.log('   高价值能力数:', finalReport.highValueCapabilities);
    console.log('   低价值能力数:', finalReport.lowValueCapabilities);
    console.log('   进化队列大小:', finalReport.evolutionQueueSize);
    console.log('   价值函数版本:', finalReport.currentValueFunction.version);
    
  } else {
    console.log('⚠️  部分测试失败，需要修复问题后再继续');
  }
  
  return passedTests === tests.length;
}

// 执行测试
if (require.main === module) {
  runAllTests();
}

module.exports = { runAllTests };
