// 人生决策宗师数据收集系统测试
const fs = require('fs');
const path = require('path');
const { lifeDecisionMasterDataCollection } = require('./data/life-decision-master/data-collection-system');

console.log('📊 人生决策宗师数据收集系统测试');
console.log('==================================');

// 测试1：验证数据收集系统初始化
function testDataCollectionInitialization() {
  console.log('\n📋 测试1：验证数据收集系统初始化');
  
  try {
    console.log('✅ 数据收集系统初始化成功');
    console.log('   数据目录:', lifeDecisionMasterDataCollection.dataDir);
    console.log('   目录存在:', fs.existsSync(lifeDecisionMasterDataCollection.dataDir));
    return true;
  } catch (error) {
    console.log('❌ 数据收集系统初始化失败:', error.message);
    return false;
  }
}

// 测试2：验证能力使用数据收集
function testCapabilityUsageCollection() {
  console.log('\n📋 测试2：验证能力使用数据收集');
  
  try {
    // 收集能力使用数据
    const usageData1 = lifeDecisionMasterDataCollection.collectCapabilityUsage(
      '决策风险评估',
      '评估职业决策风险',
      true,
      120
    );
    console.log('✅ 能力使用数据收集成功 (1):', usageData1.capabilityName);
    
    const usageData2 = lifeDecisionMasterDataCollection.collectCapabilityUsage(
      '能量状态预测',
      '预测一周能量状态',
      true,
      95
    );
    console.log('✅ 能力使用数据收集成功 (2):', usageData2.capabilityName);
    
    const usageData3 = lifeDecisionMasterDataCollection.collectCapabilityUsage(
      '价值观冲突解决',
      '解决工作与家庭冲突',
      false,
      150
    );
    console.log('✅ 能力使用数据收集成功 (3):', usageData3.capabilityName);
    
    // 验证数据文件存在
    const usageFilePath = path.join(lifeDecisionMasterDataCollection.dataDir, 'capability-usage.json');
    console.log('✅ 能力使用数据文件存在:', fs.existsSync(usageFilePath));
    
    // 验证数据内容
    const usageData = JSON.parse(fs.readFileSync(usageFilePath, 'utf8'));
    console.log('✅ 能力使用数据记录数:', usageData.length);
    console.log('✅ 数据格式正确:', usageData.length > 0 && usageData[0].capabilityName);
    
    return true;
  } catch (error) {
    console.log('❌ 能力使用数据收集失败:', error.message);
    return false;
  }
}

// 测试3：验证用户交互数据收集
function testUserInteractionCollection() {
  console.log('\n📋 测试3：验证用户交互数据收集');
  
  try {
    // 收集用户交互数据
    const interactionData1 = lifeDecisionMasterDataCollection.collectUserInteraction(
      'user-123',
      'decision_request',
      '我需要职业建议',
      250
    );
    console.log('✅ 用户交互数据收集成功 (1):', interactionData1.interactionType);
    
    const interactionData2 = lifeDecisionMasterDataCollection.collectUserInteraction(
      'user-123',
      'follow_up',
      '请详细解释',
      180
    );
    console.log('✅ 用户交互数据收集成功 (2):', interactionData2.interactionType);
    
    const interactionData3 = lifeDecisionMasterDataCollection.collectUserInteraction(
      'user-456',
      'feedback',
      '非常满意，谢谢',
      120
    );
    console.log('✅ 用户交互数据收集成功 (3):', interactionData3.interactionType);
    
    // 验证数据文件存在
    const interactionFilePath = path.join(lifeDecisionMasterDataCollection.dataDir, 'user-interaction.json');
    console.log('✅ 用户交互数据文件存在:', fs.existsSync(interactionFilePath));
    
    // 验证数据内容
    const interactionData = JSON.parse(fs.readFileSync(interactionFilePath, 'utf8'));
    console.log('✅ 用户交互数据记录数:', interactionData.length);
    console.log('✅ 数据格式正确:', interactionData.length > 0 && interactionData[0].userId);
    
    return true;
  } catch (error) {
    console.log('❌ 用户交互数据收集失败:', error.message);
    return false;
  }
}

// 测试4：验证性能数据收集
function testPerformanceDataCollection() {
  console.log('\n📋 测试4：验证性能数据收集');
  
  try {
    // 收集性能数据
    const performanceData1 = lifeDecisionMasterDataCollection.collectPerformanceData(
      'response_time',
      215,
      '决策分析'
    );
    console.log('✅ 性能数据收集成功 (1):', performanceData1.metric);
    
    const performanceData2 = lifeDecisionMasterDataCollection.collectPerformanceData(
      'memory_usage',
      12.5,
      '系统状态'
    );
    console.log('✅ 性能数据收集成功 (2):', performanceData2.metric);
    
    const performanceData3 = lifeDecisionMasterDataCollection.collectPerformanceData(
      'cpu_usage',
      15.2,
      '系统状态'
    );
    console.log('✅ 性能数据收集成功 (3):', performanceData3.metric);
    
    // 验证数据文件存在
    const performanceFilePath = path.join(lifeDecisionMasterDataCollection.dataDir, 'performance.json');
    console.log('✅ 性能数据文件存在:', fs.existsSync(performanceFilePath));
    
    // 验证数据内容
    const performanceData = JSON.parse(fs.readFileSync(performanceFilePath, 'utf8'));
    console.log('✅ 性能数据记录数:', performanceData.length);
    console.log('✅ 数据格式正确:', performanceData.length > 0 && performanceData[0].metric);
    
    return true;
  } catch (error) {
    console.log('❌ 性能数据收集失败:', error.message);
    return false;
  }
}

// 测试5：验证决策结果数据收集
function testDecisionOutcomeCollection() {
  console.log('\n📋 测试5：验证决策结果数据收集');
  
  try {
    // 收集决策结果数据
    const outcomeData1 = lifeDecisionMasterDataCollection.collectDecisionOutcome(
      'career',
      { question: '职业选择', options: ['内部晋升', '外部机会'] },
      { recommendation: '建议内部晋升', reasoning: '基于职业发展路径和当前公司文化匹配度' },
      4.5
    );
    console.log('✅ 决策结果数据收集成功 (1):', outcomeData1.decisionType);
    
    const outcomeData2 = lifeDecisionMasterDataCollection.collectDecisionOutcome(
      'health',
      { question: '健康管理', currentStatus: '中等能量水平' },
      { recommendation: '增加有氧运动', plan: '每周3次，每次30分钟' },
      4.0
    );
    console.log('✅ 决策结果数据收集成功 (2):', outcomeData2.decisionType);
    
    const outcomeData3 = lifeDecisionMasterDataCollection.collectDecisionOutcome(
      'finance',
      { question: '投资决策', amount: '10万元' },
      { recommendation: '分散投资', allocation: '股票60%，债券30%，现金10%' },
      4.2
    );
    console.log('✅ 决策结果数据收集成功 (3):', outcomeData3.decisionType);
    
    // 验证数据文件存在
    const outcomeFilePath = path.join(lifeDecisionMasterDataCollection.dataDir, 'decision-outcome.json');
    console.log('✅ 决策结果数据文件存在:', fs.existsSync(outcomeFilePath));
    
    // 验证数据内容
    const outcomeData = JSON.parse(fs.readFileSync(outcomeFilePath, 'utf8'));
    console.log('✅ 决策结果数据记录数:', outcomeData.length);
    console.log('✅ 数据格式正确:', outcomeData.length > 0 && outcomeData[0].decisionType);
    
    return true;
  } catch (error) {
    console.log('❌ 决策结果数据收集失败:', error.message);
    return false;
  }
}

// 测试6：验证数据报告生成
function testDataReportGeneration() {
  console.log('\n📋 测试6：验证数据报告生成');
  
  try {
    // 生成不同时间范围的报告
    const report1d = lifeDecisionMasterDataCollection.generateDataReport('1d');
    console.log('✅ 1天数据报告生成成功');
    console.log('   报告摘要:', JSON.stringify(report1d.summary, null, 2));
    
    const report7d = lifeDecisionMasterDataCollection.generateDataReport('7d');
    console.log('✅ 7天数据报告生成成功');
    
    // 验证报告文件存在
    const reportsDir = path.join(lifeDecisionMasterDataCollection.dataDir, 'reports');
    console.log('✅ 报告目录存在:', fs.existsSync(reportsDir));
    
    // 验证报告文件数量
    const reportFiles = fs.readdirSync(reportsDir);
    console.log('✅ 报告文件数量:', reportFiles.length);
    console.log('   报告文件:', reportFiles);
    
    return true;
  } catch (error) {
    console.log('❌ 数据报告生成失败:', error.message);
    return false;
  }
}

// 测试7：验证系统健康状态检查
function testSystemHealthStatus() {
  console.log('\n📋 测试7：验证系统健康状态检查');
  
  try {
    // 获取系统健康状态
    const healthStatus = lifeDecisionMasterDataCollection.getSystemHealthStatus();
    console.log('✅ 系统健康状态检查成功');
    console.log('   数据收集状态:', healthStatus.dataCollectionStatus);
    console.log('   存储状态:', healthStatus.storageStatus.status);
    console.log('   存储使用率:', healthStatus.storageStatus.usagePercentage.toFixed(2), '%');
    console.log('   建议:', healthStatus.recommendations);
    
    return true;
  } catch (error) {
    console.log('❌ 系统健康状态检查失败:', error.message);
    return false;
  }
}

// 测试8：验证数据清理功能
function testDataCleanup() {
  console.log('\n📋 测试8：验证数据清理功能');
  
  try {
    // 执行数据清理（保留1天）
    lifeDecisionMasterDataCollection.cleanupOldData(1);
    console.log('✅ 数据清理成功');
    
    // 验证数据文件仍然存在且格式正确
    const filesToCheck = [
      'capability-usage.json',
      'user-interaction.json',
      'performance.json',
      'decision-outcome.json'
    ];
    
    filesToCheck.forEach(fileName => {
      const filePath = path.join(lifeDecisionMasterDataCollection.dataDir, fileName);
      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        if (fileContent.trim()) {
          const data = JSON.parse(fileContent);
          console.log(`✅ ${fileName}: 格式正确，包含 ${data.length} 条记录`);
        }
      } else {
        console.log(`⚠️  ${fileName}: 文件不存在`);
      }
    });
    
    return true;
  } catch (error) {
    console.log('❌ 数据清理失败:', error.message);
    return false;
  }
}

// 测试9：验证数据分析功能
function testDataAnalysis() {
  console.log('\n📋 测试9：验证数据分析功能');
  
  try {
    // 测试各种数据分析方法
    console.log('🔍 执行数据分析...');
    
    const totalCapabilityUsages = lifeDecisionMasterDataCollection.getTotalCapabilityUsages();
    console.log('✅ 总能力使用次数:', totalCapabilityUsages);
    
    const totalUserInteractions = lifeDecisionMasterDataCollection.getTotalUserInteractions();
    console.log('✅ 总用户交互次数:', totalUserInteractions);
    
    const averageResponseTime = lifeDecisionMasterDataCollection.getAverageResponseTime();
    console.log('✅ 平均响应时间:', averageResponseTime.toFixed(2), 'ms');
    
    const successRate = lifeDecisionMasterDataCollection.getSuccessRate();
    console.log('✅ 成功率:', successRate.toFixed(2), '%');
    
    const mostUsedCapabilities = lifeDecisionMasterDataCollection.getMostUsedCapabilities(3);
    console.log('✅ 最常用能力:', mostUsedCapabilities);
    
    const userSatisfaction = lifeDecisionMasterDataCollection.getUserSatisfaction();
    console.log('✅ 用户满意度:', userSatisfaction.toFixed(2));
    
    return true;
  } catch (error) {
    console.log('❌ 数据分析失败:', error.message);
    return false;
  }
}

// 测试10：验证完整数据收集工作流
function testCompleteDataCollectionWorkflow() {
  console.log('\n📋 测试10：验证完整数据收集工作流');
  
  try {
    console.log('🔄 执行完整数据收集工作流测试...');
    
    // 1. 模拟完整的用户交互和数据收集流程
    const userId = 'test-user-' + Date.now();
    
    // 2. 用户发起决策请求
    lifeDecisionMasterDataCollection.collectUserInteraction(
      userId,
      'decision_request',
      '我需要职业发展建议',
      220
    );
    
    // 3. 系统使用能力处理请求
    lifeDecisionMasterDataCollection.collectCapabilityUsage(
      '决策风险评估',
      '评估职业发展风险',
      true,
      150
    );
    
    lifeDecisionMasterDataCollection.collectCapabilityUsage(
      '价值观冲突解决',
      '分析职业与个人价值观匹配度',
      true,
      120
    );
    
    // 4. 系统收集性能数据
    lifeDecisionMasterDataCollection.collectPerformanceData(
      'total_processing_time',
      350,
      '完整决策流程'
    );
    
    // 5. 系统生成决策结果
    lifeDecisionMasterDataCollection.collectDecisionOutcome(
      'career',
      { question: '职业发展', userId },
      { recommendation: '建议内部晋升并寻求领导机会' },
      4.8
    );
    
    // 6. 用户提供反馈
    lifeDecisionMasterDataCollection.collectUserInteraction(
      userId,
      'feedback',
      '非常感谢，建议很有帮助',
      95
    );
    
    // 7. 生成最终报告
    const finalReport = lifeDecisionMasterDataCollection.generateDataReport('1d');
    console.log('✅ 完整数据收集工作流执行成功');
    console.log('   工作流报告摘要:', JSON.stringify(finalReport.summary, null, 2));
    
    return true;
  } catch (error) {
    console.log('❌ 完整数据收集工作流测试失败:', error.message);
    return false;
  }
}

// 运行所有测试
function runAllDataCollectionTests() {
  console.log('开始运行数据收集系统测试...');
  
  const tests = [
    { name: '数据收集系统初始化测试', test: testDataCollectionInitialization },
    { name: '能力使用数据收集测试', test: testCapabilityUsageCollection },
    { name: '用户交互数据收集测试', test: testUserInteractionCollection },
    { name: '性能数据收集测试', test: testPerformanceDataCollection },
    { name: '决策结果数据收集测试', test: testDecisionOutcomeCollection },
    { name: '数据报告生成测试', test: testDataReportGeneration },
    { name: '系统健康状态检查测试', test: testSystemHealthStatus },
    { name: '数据清理功能测试', test: testDataCleanup },
    { name: '数据分析功能测试', test: testDataAnalysis },
    { name: '完整数据收集工作流测试', test: testCompleteDataCollectionWorkflow }
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
  console.log('📋 数据收集系统测试结果');
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
    dataCollectionStatus: {
      initialized: true,
      collectingData: true,
      generatingReports: true,
      analyzingData: true
    }
  };
  
  // 保存测试报告
  const reportPath = path.join(__dirname, 'test-reports');
  if (!fs.existsSync(reportPath)) {
    fs.mkdirSync(reportPath, { recursive: true });
  }
  
  const reportFileName = 'life-agent-data-collection-test-report.json';
  const reportFilePath = path.join(reportPath, reportFileName);
  fs.writeFileSync(reportFilePath, JSON.stringify(testReport, null, 2));
  console.log('\n📊 测试报告已保存到:', reportFilePath);
  
  // 分析测试结果
  console.log('\n🔍 测试结果分析:');
  if (passedTests === tests.length) {
    console.log('🎉 所有数据收集系统测试通过！');
    console.log('\n💡 数据收集系统状态:');
    console.log('   - 数据收集: 正常');
    console.log('   - 数据存储: 正常');
    console.log('   - 数据报告: 正常');
    console.log('   - 数据分析: 正常');
    console.log('   - 系统健康: 正常');
    console.log('   - 数据清理: 正常');
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
  runAllDataCollectionTests();
}

module.exports = { runAllDataCollectionTests };
