// 人生决策宗师系统性能测试
const fs = require('fs');
const path = require('path');
const { performance } = require('perf_hooks');

console.log('⚡ 人生决策宗师系统性能测试');
console.log('=================================');

// 测试1：响应时间测试
function testResponseTime() {
  console.log('\n⏱️  测试1：响应时间测试');
  
  try {
    const promptPath = path.join(__dirname, 'agents', 'life', 'agent.prompt');
    const promptContent = fs.readFileSync(promptPath, 'utf8');
    
    console.log('✅ 提示词文件读取成功');
    console.log('   文件大小:', promptContent.length, '字符');
    
    // 测试文件加载时间
    const loadStartTime = performance.now();
    const loadedContent = fs.readFileSync(promptPath, 'utf8');
    const loadEndTime = performance.now();
    const loadTime = loadEndTime - loadStartTime;
    
    console.log('✅ 文件加载时间:', loadTime.toFixed(2), 'ms');
    
    // 测试字符串处理时间
    const processStartTime = performance.now();
    const lines = loadedContent.split('\n');
    const sections = loadedContent.split('# ');
    const processEndTime = performance.now();
    const processTime = processEndTime - processStartTime;
    
    console.log('✅ 字符串处理时间:', processTime.toFixed(2), 'ms');
    
    // 测试总响应时间（模拟完整处理）
    const totalStartTime = performance.now();
    // 模拟完整的提示词处理过程
    const processedLines = lines.map(line => line.trim());
    const sectionCount = sections.filter(section => section.length > 0).length;
    const totalEndTime = performance.now();
    const totalTime = totalEndTime - totalStartTime;
    
    console.log('✅ 总响应时间:', totalTime.toFixed(2), 'ms');
    console.log('✅ 处理行数:', lines.length);
    console.log('✅ 处理 sections:', sectionCount);
    
    // 验证响应时间是否符合要求
    const responseTimeAcceptable = totalTime < 100;
    console.log('✅ 响应时间是否符合要求 (< 100ms):', responseTimeAcceptable);
    
    return {
      loadTime,
      processTime,
      totalTime,
      lineCount: lines.length,
      sectionCount,
      acceptable: responseTimeAcceptable
    };
  } catch (error) {
    console.log('❌ 响应时间测试失败:', error.message);
    return null;
  }
}

// 测试2：内存使用测试
function testMemoryUsage() {
  console.log('\n📊 测试2：内存使用测试');
  
  try {
    const promptPath = path.join(__dirname, 'agents', 'life', 'agent.prompt');
    const promptContent = fs.readFileSync(promptPath, 'utf8');
    
    // 测试内存使用
    const memoryBefore = process.memoryUsage();
    console.log('✅ 测试前内存使用:');
    console.log('   堆总大小:', Math.round(memoryBefore.heapTotal / 1024 / 1024), 'MB');
    console.log('   堆使用大小:', Math.round(memoryBefore.heapUsed / 1024 / 1024), 'MB');
    console.log('   外部内存:', Math.round(memoryBefore.external / 1024 / 1024), 'MB');
    
    // 模拟处理过程
    for (let i = 0; i < 100; i++) {
      const lines = promptContent.split('\n');
      const sections = promptContent.split('# ');
    }
    
    const memoryAfter = process.memoryUsage();
    console.log('✅ 测试后内存使用:');
    console.log('   堆总大小:', Math.round(memoryAfter.heapTotal / 1024 / 1024), 'MB');
    console.log('   堆使用大小:', Math.round(memoryAfter.heapUsed / 1024 / 1024), 'MB');
    console.log('   外部内存:', Math.round(memoryAfter.external / 1024 / 1024), 'MB');
    
    // 计算内存使用变化
    const heapTotalDiff = Math.round((memoryAfter.heapTotal - memoryBefore.heapTotal) / 1024 / 1024);
    const heapUsedDiff = Math.round((memoryAfter.heapUsed - memoryBefore.heapUsed) / 1024 / 1024);
    
    console.log('✅ 内存使用变化:');
    console.log('   堆总大小变化:', heapTotalDiff, 'MB');
    console.log('   堆使用大小变化:', heapUsedDiff, 'MB');
    
    // 验证内存使用是否符合要求
    const memoryAcceptable = memoryAfter.heapUsed < 100 * 1024 * 1024; // 100MB
    console.log('✅ 内存使用是否符合要求 (< 100MB):', memoryAcceptable);
    
    return {
      before: memoryBefore,
      after: memoryAfter,
      diff: {
        heapTotal: heapTotalDiff,
        heapUsed: heapUsedDiff
      },
      acceptable: memoryAcceptable
    };
  } catch (error) {
    console.log('❌ 内存使用测试失败:', error.message);
    return null;
  }
}

// 测试3：稳定性测试（1000次运行）
function testStability() {
  console.log('\n🔄 测试3：稳定性测试（1000次运行）');
  
  try {
    const promptPath = path.join(__dirname, 'agents', 'life', 'agent.prompt');
    let successCount = 0;
    let errorCount = 0;
    const errors = [];
    
    console.log('开始1000次稳定性测试...');
    
    for (let i = 0; i < 1000; i++) {
      try {
        const promptContent = fs.readFileSync(promptPath, 'utf8');
        const lines = promptContent.split('\n');
        const sections = promptContent.split('# ');
        successCount++;
        
        // 每100次输出一次进度
        if ((i + 1) % 100 === 0) {
          console.log(`   已完成 ${i + 1}/1000 次测试`);
        }
      } catch (error) {
        errorCount++;
        errors.push(error.message);
      }
    }
    
    console.log('✅ 稳定性测试完成');
    console.log('   成功次数:', successCount);
    console.log('   错误次数:', errorCount);
    console.log('   成功率:', ((successCount / 1000) * 100).toFixed(2), '%');
    
    if (errorCount > 0) {
      console.log('   错误示例:', errors.slice(0, 3));
    }
    
    // 验证稳定性是否符合要求
    const stabilityAcceptable = errorCount === 0;
    console.log('✅ 稳定性是否符合要求 (0错误):', stabilityAcceptable);
    
    return {
      successCount,
      errorCount,
      successRate: (successCount / 1000) * 100,
      errors: errors.slice(0, 10),
      acceptable: stabilityAcceptable
    };
  } catch (error) {
    console.log('❌ 稳定性测试失败:', error.message);
    return null;
  }
}

// 测试4：核心功能性能测试
function testCoreFunctions() {
  console.log('\n🔧 测试4：核心功能性能测试');
  
  try {
    const lifeValueIntegration = require('./agents/life/value-function-integration');
    
    // 测试能力评估性能
    const testCapability = {
      name: '智能决策分析',
      scenarios: ['职业规划', '健康管理', '关系管理', '财务规划', '个人成长'],
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
    };
    
    // 测试能力评估时间
    const evalStartTime = performance.now();
    const evaluation = lifeValueIntegration.evaluateCapability(testCapability);
    const evalEndTime = performance.now();
    const evalTime = evalEndTime - evalStartTime;
    
    console.log('✅ 能力评估时间:', evalTime.toFixed(2), 'ms');
    console.log('   综合价值:', evaluation.totalValue.toFixed(2));
    console.log('   是否符合进化条件:', evaluation.isEligible);
    
    // 测试批量评估性能
    const batchCapabilities = [
      testCapability,
      {
        name: '能量状态评估',
        scenarios: ['健康管理', '个人成长'],
        isCrossTaskTransferable: true,
        successRate: 0.92
      },
      {
        name: '财务规划分析',
        scenarios: ['财务规划'],
        isCrossTaskTransferable: false,
        successRate: 0.85
      }
    ];
    
    const batchStartTime = performance.now();
    const batchResults = lifeValueIntegration.batchEvaluateCapabilities(batchCapabilities);
    const batchEndTime = performance.now();
    const batchTime = batchEndTime - batchStartTime;
    
    console.log('✅ 批量评估时间:', batchTime.toFixed(2), 'ms');
    console.log('   评估能力数:', batchResults.length);
    
    // 测试价值报告生成性能
    const reportStartTime = performance.now();
    const report = lifeValueIntegration.generateValueReport();
    const reportEndTime = performance.now();
    const reportTime = reportEndTime - reportStartTime;
    
    console.log('✅ 价值报告生成时间:', reportTime.toFixed(2), 'ms');
    console.log('   报告包含能力数:', report.totalCapabilities);
    
    // 验证核心功能性能是否符合要求
    const coreFunctionsAcceptable = evalTime < 100 && batchTime < 200 && reportTime < 50;
    console.log('✅ 核心功能性能是否符合要求:', coreFunctionsAcceptable);
    
    return {
      evaluateCapability: {
        time: evalTime,
        result: evaluation
      },
      batchEvaluateCapabilities: {
        time: batchTime,
        count: batchResults.length
      },
      generateValueReport: {
        time: reportTime,
        capabilities: report.totalCapabilities
      },
      acceptable: coreFunctionsAcceptable
    };
  } catch (error) {
    console.log('❌ 核心功能性能测试失败:', error.message);
    return null;
  }
}

// 运行所有性能测试
function runAllPerformanceTests() {
  console.log('开始运行性能测试...');
  
  const tests = [
    { name: '响应时间测试', test: testResponseTime },
    { name: '内存使用测试', test: testMemoryUsage },
    { name: '稳定性测试', test: testStability },
    { name: '核心功能性能测试', test: testCoreFunctions }
  ];
  
  const results = {};
  let passedTests = 0;
  
  for (const test of tests) {
    console.log(`\n📋 运行测试：${test.name}`);
    console.log('-----------------------------');
    
    const result = test.test();
    results[test.name] = result;
    
    if (result && result.acceptable) {
      passedTests++;
      console.log(`✅ ${test.name} 通过`);
    } else {
      console.log(`❌ ${test.name} 失败`);
    }
  }
  
  console.log('\n=================================');
  console.log('⚡ 人生决策宗师系统性能测试结果');
  console.log(`通过测试: ${passedTests}/${tests.length}`);
  
  // 生成性能报告
  const performanceReport = {
    timestamp: new Date().toISOString(),
    tests: results,
    summary: {
      passedTests,
      totalTests: tests.length,
      passRate: (passedTests / tests.length) * 100
    }
  };
  
  // 保存性能报告
  const reportPath = path.join(__dirname, 'performance-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(performanceReport, null, 2));
  console.log('\n📊 性能报告已保存到:', reportPath);
  
  // 分析性能瓶颈
  console.log('\n🔍 性能瓶颈分析:');
  if (results['响应时间测试'] && results['响应时间测试'].totalTime > 50) {
    console.log('⚠️  响应时间可能需要优化');
  }
  
  if (results['内存使用测试'] && !results['内存使用测试'].acceptable) {
    console.log('⚠️  内存使用可能需要优化');
  }
  
  if (results['核心功能性能测试']) {
    const evalTime = results['核心功能性能测试'].evaluateCapability.time;
    if (evalTime > 50) {
      console.log('⚠️  能力评估性能可能需要优化');
    }
  }
  
  // 提供优化建议
  console.log('\n💡 优化建议:');
  console.log('1. 考虑使用缓存机制减少重复计算');
  console.log('2. 优化字符串处理和文件读写操作');
  console.log('3. 考虑使用流式处理大文件');
  console.log('4. 优化价值评估算法，减少计算复杂度');
  console.log('5. 考虑使用异步处理提高并发性能');
  
  return passedTests === tests.length;
}

// 执行性能测试
if (require.main === module) {
  runAllPerformanceTests();
}

module.exports = { runAllPerformanceTests };
