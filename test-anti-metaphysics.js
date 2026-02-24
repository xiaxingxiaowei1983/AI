#!/usr/bin/env node

/**
 * 反玄学检测功能测试脚本
 * 测试反进化锁定是否能够正确检测和阻止使用玄学语言模式
 */

const fs = require('fs');
const path = require('path');
const AntiDegenerationLock = require('./skills/capability-evolver/modules/anti-degeneration-lock');

// 初始化反进化锁定
const adl = new AntiDegenerationLock();

// 测试用例
const testCases = [
  {
    name: '使用"某种程度上"的玄学语言',
    evolutionResult: {
      success: true,
      type: 'new-feature',
      message: '某种程度上，这个功能可以提高系统性能，虽然我们还没有完全验证'
    },
    expectedValid: false,
    expectedReason: 'Use of prohibited metaphysical language: 某种程度上'
  },
  {
    name: '使用"可能是一种"的玄学语言',
    evolutionResult: {
      success: true,
      type: 'new-abstract',
      message: '这可能是一种全新的方法，能够解决我们面临的所有问题'
    },
    expectedValid: false,
    expectedReason: 'Use of prohibited metaphysical language: 可能是一种'
  },
  {
    name: '使用"从更高维度看"的玄学语言',
    evolutionResult: {
      success: true,
      type: 'new-lever',
      message: '从更高维度看，这个系统架构能够完美适应未来的所有需求'
    },
    expectedValid: false,
    expectedReason: 'Use of prohibited metaphysical language: 从更高维度看'
  },
  {
    name: '使用"本质上是"的玄学语言',
    evolutionResult: {
      success: true,
      type: 'new-feature',
      message: '这个功能本质上是一个革命性的突破，将会改变整个行业'
    },
    expectedValid: false,
    expectedReason: 'Use of prohibited metaphysical language: 本质上是'
  },
  {
    name: '不使用玄学语言的正常进化',
    evolutionResult: {
      success: true,
      type: 'new-feature',
      message: '实现了一个新功能，通过明确的算法和测试用例验证，能够提高系统性能'
    },
    expectedValid: true,
    expectedReason: 'No anti-degeneration lock violations detected'
  }
];

// 运行测试
function runTests() {
  console.log('开始测试反玄学检测功能...');
  console.log('=' .repeat(80));
  
  let passedTests = 0;
  let totalTests = testCases.length;
  
  for (const testCase of testCases) {
    console.log(`\n测试用例: ${testCase.name}`);
    console.log('-'.repeat(60));
    
    try {
      // 验证进化结果
      const validationResult = adl.validateEvolution(testCase.evolutionResult);
      
      // 检查结果
      const passed = validationResult.valid === testCase.expectedValid;
      
      console.log(`期望结果: ${testCase.expectedValid ? '有效' : '无效'}`);
      console.log(`实际结果: ${validationResult.valid ? '有效' : '无效'}`);
      console.log(`验证原因: ${validationResult.reason}`);
      console.log(`测试结果: ${passed ? '✅ 通过' : '❌ 失败'}`);
      
      if (passed) {
        passedTests++;
      }
      
    } catch (error) {
      console.log(`测试失败: ${error.message}`);
      console.log(`测试结果: ❌ 失败`);
    }
  }
  
  console.log('\n' + '=' .repeat(80));
  console.log(`测试完成: ${passedTests}/${totalTests} 通过`);
  console.log(`通过率: ${((passedTests / totalTests) * 100).toFixed(2)}%`);
  
  // 生成测试报告
  generateTestReport(passedTests, totalTests, testCases);
}

// 生成测试报告
function generateTestReport(passedTests, totalTests, testCases) {
  const reportPath = path.join(__dirname, 'test-results', 'anti-metaphysics-test-report.json');
  
  // 确保测试结果目录存在
  const reportDir = path.dirname(reportPath);
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true });
  }
  
  const report = {
    timestamp: Date.now(),
    totalTests,
    passedTests,
    failedTests: totalTests - passedTests,
    passRate: (passedTests / totalTests) * 100,
    testCases: testCases.map(testCase => ({
      name: testCase.name,
      expectedValid: testCase.expectedValid,
      expectedReason: testCase.expectedReason
    })),
    summary: `反玄学检测功能测试完成，共 ${totalTests} 个测试用例，${passedTests} 个通过，${totalTests - passedTests} 个失败，通过率 ${((passedTests / totalTests) * 100).toFixed(2)}%`
  };
  
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`\n测试报告已生成: ${reportPath}`);
}

// 运行测试
runTests();
