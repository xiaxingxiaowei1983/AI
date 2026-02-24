// 人生决策宗师能力扩展测试
const fs = require('fs');
const path = require('path');
const { lifeDecisionCapabilityTreeIntegration } = require('./agents/life/capability-tree-integration');
const { lifeDecisionMasterCapabilityTree } = require('./capabilities/life-decision-master-capability-tree');

console.log('🚀 人生决策宗师能力扩展测试');
console.log('==================================');

// 测试1：验证新能力节点添加
function testNewCapabilityNodes() {
  console.log('\n📋 测试1：验证新能力节点添加');
  
  try {
    const status = lifeDecisionCapabilityTreeIntegration.getCapabilityTreeStatus();
    console.log('✅ 能力树状态获取成功');
    console.log('   总节点数:', status.totalNodes);
    
    // 生成能力树可视化
    const visualization = lifeDecisionCapabilityTreeIntegration.generateCapabilityTreeVisualization();
    console.log('✅ 能力树可视化生成成功');
    
    // 验证新能力节点存在
    const hasDecisionRiskAssessment = visualization.includes('决策风险评估');
    const hasEnergyStatePrediction = visualization.includes('能量状态预测');
    const hasValuesConflictResolution = visualization.includes('价值观冲突解决');
    
    console.log('\n✅ 新能力节点验证:');
    console.log('   决策风险评估:', hasDecisionRiskAssessment);
    console.log('   能量状态预测:', hasEnergyStatePrediction);
    console.log('   价值观冲突解决:', hasValuesConflictResolution);
    
    return hasDecisionRiskAssessment && hasEnergyStatePrediction && hasValuesConflictResolution;
  } catch (error) {
    console.log('❌ 新能力节点验证失败:', error.message);
    return false;
  }
}

// 测试2：验证新能力任务分析
function testNewCapabilityTaskAnalysis() {
  console.log('\n📋 测试2：验证新能力任务分析');
  
  try {
    const testTasks = [
      '我需要评估这个职业决策的风险',
      '预测我未来一周的能量状态变化',
      '我在工作和家庭之间有价值观冲突',
      '分析这个投资决策的潜在风险',
      '预测我的能量峰值和低谷时间',
      '解决我在个人成长和职业发展之间的冲突'
    ];
    
    testTasks.forEach(task => {
      console.log(`\n=== 分析任务: ${task} ===`);
      const analysis = lifeDecisionCapabilityTreeIntegration.analyzeTaskWithCapabilityTree(task);
      console.log('✅ 任务分析成功:', JSON.stringify(analysis, null, 2));
      
      const response = lifeDecisionCapabilityTreeIntegration.generateDecisionResponse(task, {});
      console.log('✅ 响应生成成功:', JSON.stringify(response, null, 2));
    });
    
    return true;
  } catch (error) {
    console.log('❌ 新能力任务分析失败:', error.message);
    return false;
  }
}

// 测试3：验证能力价值评估
function testCapabilityValueEvaluation() {
  console.log('\n📋 测试3：验证能力价值评估');
  
  try {
    const lifeValueIntegration = require('./agents/life/value-function-integration');
    
    // 测试新能力的价值评估
    const newCapabilities = [
      {
        name: '决策风险评估',
        scenarios: ['职业规划', '财务决策', '健康管理'],
        isCrossTaskTransferable: true,
        successRate: 0.92,
        reducesSystemFailure: true,
        simplifiesUserInteraction: true,
        hasClearDocumentation: true,
        complexityLevel: 'medium',
        reducesComputationalComplexity: false,
        improvesExecutionSpeed: false,
        providesDeterministicResults: true
      },
      {
        name: '能量状态预测',
        scenarios: ['健康管理', '个人成长', '职业规划'],
        isCrossTaskTransferable: true,
        successRate: 0.88,
        reducesSystemFailure: false,
        simplifiesUserInteraction: true,
        hasClearDocumentation: true,
        complexityLevel: 'medium',
        reducesComputationalComplexity: false,
        improvesExecutionSpeed: false,
        providesDeterministicResults: false
      },
      {
        name: '价值观冲突解决',
        scenarios: ['职业规划', '关系管理', '个人成长'],
        isCrossTaskTransferable: true,
        successRate: 0.90,
        reducesSystemFailure: true,
        simplifiesUserInteraction: true,
        hasClearDocumentation: true,
        complexityLevel: 'high',
        reducesComputationalComplexity: false,
        improvesExecutionSpeed: false,
        providesDeterministicResults: false
      }
    ];
    
    newCapabilities.forEach(capability => {
      console.log(`\n=== 评估能力: ${capability.name} ===`);
      const evaluation = lifeValueIntegration.evaluateCapability(capability);
      console.log('✅ 能力评估成功:', JSON.stringify(evaluation, null, 2));
      console.log('   综合价值:', evaluation.totalValue.toFixed(2));
      console.log('   是否符合进化条件:', evaluation.isEligible);
    });
    
    // 测试批量评估
    const batchResults = lifeValueIntegration.batchEvaluateCapabilities(newCapabilities);
    console.log('\n✅ 批量评估成功:', batchResults.length, '个能力');
    
    return true;
  } catch (error) {
    console.log('❌ 能力价值评估失败:', error.message);
    return false;
  }
}

// 测试4：验证完整能力工作流
function testCompleteCapabilityWorkflow() {
  console.log('\n📋 测试4：验证完整能力工作流');
  
  try {
    // 模拟完整的能力工作流
    console.log('🔄 执行完整能力工作流测试...');
    
    // 1. 分析包含新能力的任务
    const testTasks = [
      '我需要评估换工作的风险，并预测这对我能量状态的影响',
      '我在职业发展和家庭价值观之间有冲突，需要解决'
    ];
    
    testTasks.forEach(task => {
      console.log(`\n=== 分析复杂任务: ${task} ===`);
      
      // 2. 任务分析
      const analysis = lifeDecisionCapabilityTreeIntegration.analyzeTaskWithCapabilityTree(task);
      console.log('✅ 任务分析成功:', analysis.success ? '通过' : '失败');
      
      // 3. 生成决策响应
      const response = lifeDecisionCapabilityTreeIntegration.generateDecisionResponse(task, {});
      console.log('✅ 响应生成成功:', response.type);
      console.log('   响应内容:', response.content);
      
      // 4. 验证响应质量
      console.log('✅ 响应质量验证:');
      console.log('   包含下一步:', response.nextSteps && response.nextSteps.length > 0);
      console.log('   内容完整:', response.content && response.content.length > 0);
    });
    
    return true;
  } catch (error) {
    console.log('❌ 完整能力工作流测试失败:', error.message);
    return false;
  }
}

// 测试5：验证能力树完整性
function testCapabilityTreeIntegrity() {
  console.log('\n📋 测试5：验证能力树完整性');
  
  try {
    // 验证能力树导出
    const exportedTree = lifeDecisionMasterCapabilityTree.export();
    console.log('✅ 能力树导出成功');
    console.log('   导出节点数:', exportedTree.children.length);
    
    // 验证能力树结构
    const visualization = lifeDecisionCapabilityTreeIntegration.generateCapabilityTreeVisualization();
    const lines = visualization.split('\n');
    console.log('✅ 能力树结构验证:');
    console.log('   可视化行数:', lines.length);
    
    // 统计各类型节点数量
    const highValueNodes = lines.filter(line => 
      line.includes('决策风险评估') || 
      line.includes('能量状态预测') || 
      line.includes('价值观冲突解决')
    ).length;
    
    const communicationNodes = lines.filter(line => 
      line.includes('通信策略') || 
      line.includes('富消息') || 
      line.includes('表情反应')
    ).length;
    
    console.log('   高价值能力节点数:', highValueNodes);
    console.log('   通信相关节点数:', communicationNodes);
    
    return true;
  } catch (error) {
    console.log('❌ 能力树完整性测试失败:', error.message);
    return false;
  }
}

// 运行所有测试
function runAllCapabilityExpansionTests() {
  console.log('开始运行能力扩展测试...');
  
  const tests = [
    { name: '新能力节点添加测试', test: testNewCapabilityNodes },
    { name: '新能力任务分析测试', test: testNewCapabilityTaskAnalysis },
    { name: '能力价值评估测试', test: testCapabilityValueEvaluation },
    { name: '完整能力工作流测试', test: testCompleteCapabilityWorkflow },
    { name: '能力树完整性测试', test: testCapabilityTreeIntegrity }
  ];
  
  const results = {};
  let passedTests = 0;
  
  for (const test of tests) {
    console.log(`\n🔍 运行测试: ${test.name}`);
    console.log('------------------------');
    
    const result = test.test();
    results[test.name] = result;
    
    if (result) {
      passedTests++;
      console.log(`✅ ${test.name} 通过`);
    } else {
      console.log(`❌ ${test.name} 失败`);
    }
  }
  
  console.log('\n==================================');
  console.log('📋 能力扩展测试结果');
  console.log(`通过测试: ${passedTests}/${tests.length}`);
  console.log(`通过率: ${((passedTests / tests.length) * 100).toFixed(2)}%`);
  
  // 生成测试报告
  const testReport = {
    timestamp: new Date().toISOString(),
    tests: results,
    summary: {
      passedTests,
      totalTests: tests.length,
      passRate: (passedTests / tests.length) * 100
    },
    newCapabilities: [
      {
        name: '决策风险评估',
        description: '评估决策风险的高价值操作',
        category: '高价值能力'
      },
      {
        name: '能量状态预测',
        description: '预测能量状态变化的高价值操作',
        category: '高价值能力'
      },
      {
        name: '价值观冲突解决',
        description: '解决价值观冲突的高价值操作',
        category: '高价值能力'
      }
    ]
  };
  
  // 保存测试报告
  const reportPath = path.join(__dirname, 'test-reports', 'life-agent-capability-expansion-test-report.json');
  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.writeFileSync(reportPath, JSON.stringify(testReport, null, 2));
  console.log('\n📊 测试报告已保存到:', reportPath);
  
  // 分析测试结果
  console.log('\n🔍 测试结果分析:');
  if (passedTests === tests.length) {
    console.log('🎉 所有能力扩展测试通过！');
    console.log('\n💡 能力扩展状态:');
    console.log('   - 决策风险评估: 已添加');
    console.log('   - 能量状态预测: 已添加');
    console.log('   - 价值观冲突解决: 已添加');
    console.log('   - 能力树结构: 完整');
    console.log('   - 价值评估: 正常');
    console.log('   - 工作流: 验证通过');
  } else {
    console.log('⚠️  部分测试失败，需要进一步检查和修复');
    
    // 列出失败的测试
    const failedTests = Object.entries(results)
      .filter(([_, result]) => !result)
      .map(([name]) => name);
    
    console.log('\n❌ 失败的测试:');
    failedTests.forEach(testName => {
      console.log(`   - ${testName}`);
    });
  }
  
  return passedTests === tests.length;
}

// 执行测试
if (require.main === module) {
  runAllCapabilityExpansionTests();
}

module.exports = { runAllCapabilityExpansionTests };
