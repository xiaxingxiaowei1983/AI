#!/usr/bin/env node

/**
 * 稳定性优先原则测试脚本（简化版）
 */

const AntiDegenerationLock = require('./skills/capability-evolver/modules/anti-degeneration-lock');

// 初始化反进化锁定
const adl = new AntiDegenerationLock();

// 测试用例
const testCases = [
  {
    name: '稳定性高但新颖性低的进化方案',
    evolutionResult: {
      success: true,
      type: 'new-feature',
      message: '实现了一个稳定可靠的文件处理功能，虽然新颖性不高，但经过充分测试和验证'
    },
    expectedValid: true
  },
  {
    name: '新颖性高但稳定性低的进化方案',
    evolutionResult: {
      success: true,
      type: 'new-feature',
      message: '实现了一个非常新颖的功能，但稳定性较低，可能会导致系统崩溃或不可预测的行为'
    },
    expectedValid: false
  }
];

// 运行测试
function runTests() {
  console.log('开始测试稳定性优先原则...');
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
}

// 运行测试
runTests();
