#!/usr/bin/env node

/**
 * 回滚机制完整性测试脚本
 * 测试反进化锁定的回滚机制是否能够正确工作
 */

const fs = require('fs');
const path = require('path');
const AntiDegenerationLock = require('./skills/capability-evolver/modules/anti-degeneration-lock');

// 初始化反进化锁定
const adl = new AntiDegenerationLock();

// 测试用例
const testCases = [
  {
    name: '创建回滚点',
    testFunction: async () => {
      try {
        const rollbackId = adl.createRollbackPoint();
        console.log(`✅ 成功创建回滚点: ${rollbackId}`);
        // 检查回滚点文件是否存在
        const rollbackPath = path.join(__dirname, 'skills', 'capability-evolver', 'data', 'rollback-points', `${rollbackId}.json`);
        if (fs.existsSync(rollbackPath)) {
          console.log(`✅ 回滚点文件存在: ${rollbackPath}`);
          return true;
        } else {
          console.log(`❌ 回滚点文件不存在: ${rollbackPath}`);
          return false;
        }
      } catch (error) {
        console.log(`❌ 创建回滚点失败: ${error.message}`);
        return false;
      }
    }
  },
  {
    name: '执行回滚操作',
    testFunction: async () => {
      try {
        // 先创建一个回滚点
        const rollbackId = adl.createRollbackPoint();
        console.log(`✅ 成功创建回滚点: ${rollbackId}`);
        
        // 执行回滚操作
        const rollbackResult = adl.rollbackToPoint(rollbackId);
        if (rollbackResult.success) {
          console.log(`✅ 成功执行回滚操作: ${rollbackId}`);
          return true;
        } else {
          console.log(`❌ 执行回滚操作失败: ${rollbackResult.error}`);
          return false;
        }
      } catch (error) {
        console.log(`❌ 执行回滚操作失败: ${error.message}`);
        return false;
      }
    }
  },
  {
    name: '获取回滚点列表',
    testFunction: async () => {
      try {
        const rollbackPoints = adl.getRollbackPoints(5);
        if (Array.isArray(rollbackPoints)) {
          console.log(`✅ 成功获取回滚点列表，共 ${rollbackPoints.length} 个回滚点`);
          return true;
        } else {
          console.log(`❌ 获取回滚点列表失败`);
          return false;
        }
      } catch (error) {
        console.log(`❌ 获取回滚点列表失败: ${error.message}`);
        return false;
      }
    }
  },
  {
    name: '清理过期回滚点',
    testFunction: async () => {
      try {
        const result = adl.cleanupExpiredData(1); // 只保留1天的回滚点
        console.log(`✅ 成功清理过期回滚点，共删除 ${result.deletedRollbackPoints} 个`);
        return true;
      } catch (error) {
        console.log(`❌ 清理过期回滚点失败: ${error.message}`);
        return false;
      }
    }
  }
];

// 运行测试
async function runTests() {
  console.log('开始测试回滚机制完整性...');
  console.log('=' .repeat(80));
  
  let passedTests = 0;
  let totalTests = testCases.length;
  
  for (const testCase of testCases) {
    console.log(`\n测试用例: ${testCase.name}`);
    console.log('-'.repeat(60));
    
    try {
      const passed = await testCase.testFunction();
      if (passed) {
        passedTests++;
      }
    } catch (error) {
      console.log(`❌ 测试失败: ${error.message}`);
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
  const reportPath = path.join(__dirname, 'test-results', 'rollback-mechanism-test-report.json');
  
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
    testCases: testCases.map(testCase => testCase.name),
    summary: `回滚机制完整性测试完成，共 ${totalTests} 个测试用例，${passedTests} 个通过，${totalTests - passedTests} 个失败，通过率 ${((passedTests / totalTests) * 100).toFixed(2)}%`
  };
  
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`\n测试报告已生成: ${reportPath}`);
}

// 运行测试
runTests().catch(error => {
  console.error('测试执行失败:', error);
  process.exit(1);
});
