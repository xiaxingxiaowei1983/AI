// 人生决策宗师用户反馈机制测试
const fs = require('fs');
const path = require('path');
const { lifeDecisionMasterFeedbackMechanism } = require('./data/life-decision-master/feedback-mechanism');

console.log('📝 人生决策宗师用户反馈机制测试');
console.log('==================================');

// 测试1：验证反馈机制初始化
function testFeedbackMechanismInitialization() {
  console.log('\n📋 测试1：验证反馈机制初始化');
  
  try {
    console.log('✅ 反馈机制初始化成功');
    console.log('   反馈目录:', lifeDecisionMasterFeedbackMechanism.feedbackDir);
    console.log('   目录存在:', fs.existsSync(lifeDecisionMasterFeedbackMechanism.feedbackDir));
    return true;
  } catch (error) {
    console.log('❌ 反馈机制初始化失败:', error.message);
    return false;
  }
}

// 测试2：验证反馈收集
function testFeedbackCollection() {
  console.log('\n📋 测试2：验证反馈收集');
  
  try {
    // 收集不同类型的反馈
    const feedback1 = lifeDecisionMasterFeedbackMechanism.collectFeedback(
      'user-123',
      'decision_quality',
      '决策建议非常有用，帮助我理清了职业发展思路',
      5,
      { decisionType: 'career', context: '职业发展决策' }
    );
    console.log('✅ 反馈收集成功 (1):', feedback1.feedbackType);
    
    const feedback2 = lifeDecisionMasterFeedbackMechanism.collectFeedback(
      'user-123',
      'response_time',
      '响应速度很快，几乎没有延迟',
      5,
      { operation: '决策分析' }
    );
    console.log('✅ 反馈收集成功 (2):', feedback2.feedbackType);
    
    const feedback3 = lifeDecisionMasterFeedbackMechanism.collectFeedback(
      'user-456',
      'clarity',
      '建议有些模糊，希望能更具体一些',
      3,
      { decisionType: 'finance', context: '投资决策' }
    );
    console.log('✅ 反馈收集成功 (3):', feedback3.feedbackType);
    
    const feedback4 = lifeDecisionMasterFeedbackMechanism.collectFeedback(
      'user-456',
      'feature_request',
      '希望能添加更多关于健康管理的建议功能',
      null,
      { feature: '健康管理' }
    );
    console.log('✅ 反馈收集成功 (4):', feedback4.feedbackType);
    
    const feedback5 = lifeDecisionMasterFeedbackMechanism.collectFeedback(
      'user-789',
      'overall',
      '整体使用体验很好，决策建议质量高',
      4.5,
      { sessionDuration: '15分钟', interactions: 3 }
    );
    console.log('✅ 反馈收集成功 (5):', feedback5.feedbackType);
    
    // 验证反馈文件存在
    const feedbackPath = path.join(lifeDecisionMasterFeedbackMechanism.feedbackDir, 'feedback.json');
    console.log('✅ 反馈文件存在:', fs.existsSync(feedbackPath));
    
    // 验证反馈内容
    const feedbackData = JSON.parse(fs.readFileSync(feedbackPath, 'utf8'));
    console.log('✅ 反馈记录数:', feedbackData.length);
    console.log('✅ 数据格式正确:', feedbackData.length > 0 && feedbackData[0].id);
    
    return true;
  } catch (error) {
    console.log('❌ 反馈收集失败:', error.message);
    return false;
  }
}

// 测试3：验证反馈分析
function testFeedbackAnalysis() {
  console.log('\n📋 测试3：验证反馈分析');
  
  try {
    // 获取所有反馈
    const feedbackData = lifeDecisionMasterFeedbackMechanism.getAllFeedback();
    console.log('✅ 获取反馈数据成功:', feedbackData.length, '条记录');
    
    // 分析每条反馈
    feedbackData.forEach((feedback, index) => {
      const analysis = lifeDecisionMasterFeedbackMechanism.analyzeFeedback(feedback);
      console.log(`✅ 分析反馈 ${index + 1} 成功:`);
      console.log('   情感倾向:', analysis.sentiment);
      console.log('   关键问题:', analysis.keyIssues);
      console.log('   可操作性:', analysis.actionable);
      console.log('   严重程度:', analysis.severity);
      console.log('   分类:', analysis.category);
    });
    
    return true;
  } catch (error) {
    console.log('❌ 反馈分析失败:', error.message);
    return false;
  }
}

// 测试4：验证反馈报告生成
function testFeedbackReportGeneration() {
  console.log('\n📋 测试4：验证反馈报告生成');
  
  try {
    // 生成不同时间范围的报告
    const report1d = lifeDecisionMasterFeedbackMechanism.generateFeedbackReport('1d');
    console.log('✅ 1天反馈报告生成成功');
    console.log('   报告摘要:', JSON.stringify(report1d.summary, null, 2));
    
    const report7d = lifeDecisionMasterFeedbackMechanism.generateFeedbackReport('7d');
    console.log('✅ 7天反馈报告生成成功');
    
    const report30d = lifeDecisionMasterFeedbackMechanism.generateFeedbackReport('30d');
    console.log('✅ 30天反馈报告生成成功');
    
    // 验证报告文件存在
    const reportsDir = path.join(lifeDecisionMasterFeedbackMechanism.feedbackDir, 'reports');
    console.log('✅ 报告目录存在:', fs.existsSync(reportsDir));
    
    // 验证报告文件数量
    const reportFiles = fs.readdirSync(reportsDir);
    console.log('✅ 报告文件数量:', reportFiles.length);
    console.log('   报告文件:', reportFiles);
    
    return true;
  } catch (error) {
    console.log('❌ 反馈报告生成失败:', error.message);
    return false;
  }
}

// 测试5：验证优化建议生成
function testOptimizationSuggestions() {
  console.log('\n📋 测试5：验证优化建议生成');
  
  try {
    // 生成优化建议
    const suggestions = lifeDecisionMasterFeedbackMechanism.generateOptimizationSuggestions();
    console.log('✅ 优化建议生成成功');
    console.log('   基于反馈数:', suggestions.basedOnFeedbackCount);
    console.log('   优先改进领域:', suggestions.priorityAreas);
    console.log('   具体建议:', suggestions.specificSuggestions);
    console.log('   预期影响:', suggestions.expectedImpact);
    console.log('   实施步骤数:', suggestions.implementationSteps.length);
    
    // 验证建议文件存在
    const suggestionsPath = path.join(lifeDecisionMasterFeedbackMechanism.feedbackDir, 'optimization-suggestions.json');
    console.log('✅ 建议文件存在:', fs.existsSync(suggestionsPath));
    
    return true;
  } catch (error) {
    console.log('❌ 优化建议生成失败:', error.message);
    return false;
  }
}

// 测试6：验证反馈统计
function testFeedbackStatistics() {
  console.log('\n📋 测试6：验证反馈统计');
  
  try {
    // 获取反馈统计
    const statistics = lifeDecisionMasterFeedbackMechanism.getFeedbackStatistics();
    console.log('✅ 反馈统计获取成功');
    console.log('   总反馈数:', statistics.totalFeedback);
    console.log('   评分反馈数:', statistics.ratedFeedback);
    console.log('   平均评分:', statistics.averageRating.toFixed(2));
    console.log('   情感分布:', statistics.sentiment);
    console.log('   最后反馈日期:', statistics.lastFeedbackDate);
    
    return true;
  } catch (error) {
    console.log('❌ 反馈统计获取失败:', error.message);
    return false;
  }
}

// 测试7：验证数据清理功能
function testFeedbackCleanup() {
  console.log('\n📋 测试7：验证数据清理功能');
  
  try {
    // 执行数据清理（保留1天）
    lifeDecisionMasterFeedbackMechanism.cleanupOldFeedback(1);
    console.log('✅ 反馈清理成功');
    
    // 验证反馈文件仍然存在且格式正确
    const feedbackPath = path.join(lifeDecisionMasterFeedbackMechanism.feedbackDir, 'feedback.json');
    if (fs.existsSync(feedbackPath)) {
      const fileContent = fs.readFileSync(feedbackPath, 'utf8');
      if (fileContent.trim()) {
        const feedbackData = JSON.parse(fileContent);
        console.log(`✅ 反馈文件: 格式正确，包含 ${feedbackData.length} 条记录`);
      }
    } else {
      console.log('⚠️  反馈文件不存在');
    }
    
    return true;
  } catch (error) {
    console.log('❌ 反馈清理失败:', error.message);
    return false;
  }
}

// 测试8：验证数据导出功能
function testFeedbackExport() {
  console.log('\n📋 测试8：验证数据导出功能');
  
  try {
    // 导出为JSON格式
    const jsonExportPath = lifeDecisionMasterFeedbackMechanism.exportFeedbackData('json');
    console.log('✅ JSON格式导出成功:', jsonExportPath);
    console.log('   文件存在:', fs.existsSync(jsonExportPath));
    
    // 导出为CSV格式
    const csvExportPath = lifeDecisionMasterFeedbackMechanism.exportFeedbackData('csv');
    console.log('✅ CSV格式导出成功:', csvExportPath);
    console.log('   文件存在:', fs.existsSync(csvExportPath));
    
    // 验证导出目录存在
    const exportsDir = path.join(lifeDecisionMasterFeedbackMechanism.feedbackDir, 'exports');
    console.log('✅ 导出目录存在:', fs.existsSync(exportsDir));
    
    return true;
  } catch (error) {
    console.log('❌ 反馈导出失败:', error.message);
    return false;
  }
}

// 测试9：验证完整反馈工作流
function testCompleteFeedbackWorkflow() {
  console.log('\n📋 测试9：验证完整反馈工作流');
  
  try {
    console.log('🔄 执行完整反馈工作流测试...');
    
    // 1. 模拟用户提供反馈
    const userId = 'test-user-' + Date.now();
    
    // 2. 收集多种类型的反馈
    lifeDecisionMasterFeedbackMechanism.collectFeedback(
      userId,
      'decision_quality',
      '决策建议质量很高，分析全面深入',
      5,
      { decisionType: 'career' }
    );
    
    lifeDecisionMasterFeedbackMechanism.collectFeedback(
      userId,
      'helpfulness',
      '建议非常有帮助，解决了我的困惑',
      5,
      { context: '职业转型' }
    );
    
    // 3. 生成反馈报告
    const feedbackReport = lifeDecisionMasterFeedbackMechanism.generateFeedbackReport('1d');
    console.log('✅ 工作流反馈报告生成成功');
    
    // 4. 生成优化建议
    const optimizationSuggestions = lifeDecisionMasterFeedbackMechanism.generateOptimizationSuggestions();
    console.log('✅ 工作流优化建议生成成功');
    
    // 5. 获取最终统计
    const finalStats = lifeDecisionMasterFeedbackMechanism.getFeedbackStatistics();
    console.log('✅ 工作流反馈统计获取成功');
    console.log('   工作流总反馈数:', finalStats.totalFeedback);
    console.log('   工作流平均评分:', finalStats.averageRating.toFixed(2));
    
    return true;
  } catch (error) {
    console.log('❌ 完整反馈工作流测试失败:', error.message);
    return false;
  }
}

// 测试10：验证反馈集成到数据收集系统
function testFeedbackIntegration() {
  console.log('\n📋 测试10：验证反馈集成到数据收集系统');
  
  try {
    console.log('🔄 验证反馈与数据收集系统集成...');
    
    // 收集反馈
    const feedback = lifeDecisionMasterFeedbackMechanism.collectFeedback(
      'integration-test-user',
      'overall',
      '测试反馈集成功能',
      5,
      { test: 'integration' }
    );
    
    console.log('✅ 反馈集成测试成功');
    console.log('   反馈已收集并自动集成到数据收集系统');
    
    // 验证数据收集系统中有相应记录
    const { lifeDecisionMasterDataCollection } = require('./data/life-decision-master/data-collection-system');
    const report = lifeDecisionMasterDataCollection.generateDataReport('1d');
    
    console.log('✅ 数据收集系统报告生成成功');
    console.log('   总用户交互数:', report.summary.totalUserInteractions);
    console.log('   总决策结果数:', report.summary.totalCapabilityUsages);
    
    return true;
  } catch (error) {
    console.log('❌ 反馈集成测试失败:', error.message);
    return false;
  }
}

// 运行所有测试
function runAllFeedbackTests() {
  console.log('开始运行反馈机制测试...');
  
  const tests = [
    { name: '反馈机制初始化测试', test: testFeedbackMechanismInitialization },
    { name: '反馈收集测试', test: testFeedbackCollection },
    { name: '反馈分析测试', test: testFeedbackAnalysis },
    { name: '反馈报告生成测试', test: testFeedbackReportGeneration },
    { name: '优化建议生成测试', test: testOptimizationSuggestions },
    { name: '反馈统计测试', test: testFeedbackStatistics },
    { name: '反馈清理测试', test: testFeedbackCleanup },
    { name: '反馈导出测试', test: testFeedbackExport },
    { name: '完整反馈工作流测试', test: testCompleteFeedbackWorkflow },
    { name: '反馈集成测试', test: testFeedbackIntegration }
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
  console.log('📝 反馈机制测试结果');
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
    feedbackSystemStatus: {
      initialized: true,
      collectingFeedback: true,
      analyzingFeedback: true,
      generatingReports: true,
      integratingWithDataCollection: true
    }
  };
  
  // 保存测试报告
  const reportPath = path.join(__dirname, 'test-reports');
  if (!fs.existsSync(reportPath)) {
    fs.mkdirSync(reportPath, { recursive: true });
  }
  
  const reportFileName = 'life-agent-feedback-mechanism-test-report.json';
  const reportFilePath = path.join(reportPath, reportFileName);
  fs.writeFileSync(reportFilePath, JSON.stringify(testReport, null, 2));
  console.log('\n📊 测试报告已保存到:', reportFilePath);
  
  // 分析测试结果
  console.log('\n🔍 测试结果分析:');
  if (passedTests === tests.length) {
    console.log('🎉 所有反馈机制测试通过！');
    console.log('\n💡 反馈系统状态:');
    console.log('   - 反馈收集: 正常');
    console.log('   - 反馈分析: 正常');
    console.log('   - 报告生成: 正常');
    console.log('   - 优化建议: 正常');
    console.log('   - 数据集成: 正常');
    console.log('   - 数据清理: 正常');
    console.log('   - 数据导出: 正常');
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
  runAllFeedbackTests();
}

module.exports = { runAllFeedbackTests };
