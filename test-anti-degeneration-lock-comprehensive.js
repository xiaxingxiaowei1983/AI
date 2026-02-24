#!/usr/bin/env node

/**
 * Comprehensive test suite for Anti-Degeneration Lock functionality
 * Tests all enhanced features including:
 * - Prohibited behaviors detection
 * - Stability priority enforcement
 * - Anti-metaphysics detection
 * - Rollback mechanism
 * - PCEC integration
 */

const fs = require('fs');
const path = require('path');
const AntiDegenerationLock = require('./skills/capability-evolver/modules/anti-degeneration-lock');

// Test configuration
const TEST_CONFIG = {
  baseDir: path.join(__dirname, 'test', 'anti-degeneration-lock'),
  dataDir: path.join(__dirname, 'test', 'anti-degeneration-lock', 'data'),
  rollbackDir: path.join(__dirname, 'test', 'anti-degeneration-lock', 'rollback-points'),
  logFile: path.join(__dirname, 'test', 'anti-degeneration-lock', 'test.log')
};

// Ensure test directories exist
function ensureTestDirectories() {
  const directories = [
    TEST_CONFIG.baseDir,
    TEST_CONFIG.dataDir,
    TEST_CONFIG.rollbackDir
  ];
  
  directories.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`Created test directory: ${dir}`);
    }
  });
}

// Test logger
function log(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}`;
  console.log(logMessage);
  
  // Write to test log file
  fs.appendFileSync(TEST_CONFIG.logFile, logMessage + '\n', { flag: 'a' });
}

// Test suite
class AntiDegenerationLockTestSuite {
  constructor() {
    ensureTestDirectories();
    this.testResults = [];
    this.antiDegenerationLock = new AntiDegenerationLock({
      baseDir: TEST_CONFIG.dataDir,
      rollbackDir: TEST_CONFIG.rollbackDir,
      logFile: TEST_CONFIG.logFile
    });
  }
  
  // Run all tests
  async runAllTests() {
    log('=== Starting Anti-Degeneration Lock Comprehensive Test Suite ===');
    
    // Test 1: Prohibited behaviors detection
    await this.testProhibitedBehaviorsDetection();
    
    // Test 2: Stability priority enforcement
    await this.testStabilityPriorityEnforcement();
    
    // Test 3: Anti-metaphysics detection
    await this.testAntiMetaphysicsDetection();
    
    // Test 4: Rollback mechanism
    await this.testRollbackMechanism();
    
    // Test 5: PCEC integration
    await this.testPCECIntegration();
    
    // Test 6: Edge cases
    await this.testEdgeCases();
    
    // Generate test report
    this.generateTestReport();
  }
  
  // Test 1: Prohibited behaviors detection
  async testProhibitedBehaviorsDetection() {
    log('\n--- Test 1: Prohibited Behaviors Detection ---');
    
    const testCases = [
      {
        name: 'Complexity without benefit',
        evolutionResult: {
          success: true,
          type: 'new-feature',
          message: '为了显得更聪明而增加了系统复杂度，引入了多个不必要的模块和层次'
        },
        expected: true // Should detect degeneration
      },
      {
        name: 'Unverifiable mechanism',
        evolutionResult: {
          success: true,
          type: 'new-feature',
          message: '引入了一个神秘的黑箱机制，无法验证其正确性和可复现性'
        },
        expected: true // Should detect degeneration
      },
      {
        name: 'Vague concepts',
        evolutionResult: {
          success: true,
          type: 'new-abstract',
          message: '使用了某种程度上的模糊概念来替代具体的可执行策略'
        },
        expected: true // Should detect degeneration
      },
      {
        name: 'Feeling-based decision',
        evolutionResult: {
          success: true,
          type: 'new-lever',
          message: '根据感觉正确的原则做出了决策，没有明确的逻辑依据'
        },
        expected: true // Should detect degeneration
      },
      {
        name: 'Valid evolution',
        evolutionResult: {
          success: true,
          type: 'new-feature',
          message: '实现了一个新功能，通过简化现有代码结构，提高了系统性能和可维护性'
        },
        expected: false // Should NOT detect degeneration
      }
    ];
    
    testCases.forEach((testCase, index) => {
      const result = this.antiDegenerationLock.detectDegeneration(testCase.evolutionResult);
      const passed = result.degenerated === testCase.expected;
      
      this.testResults.push({
        test: `Prohibited Behaviors Detection - ${testCase.name}`,
        passed,
        expected: testCase.expected,
        actual: result.degenerated,
        issues: result.issues
      });
      
      console.log(`${passed ? '✅' : '❌'} Test ${index + 1}: ${testCase.name}`);
      if (!passed) {
        console.log(`   Expected: ${testCase.expected}, Actual: ${result.degenerated}`);
        console.log(`   Issues: ${result.issues.join(', ')}`);
      }
    });
  }
  
  // Test 2: Stability priority enforcement
  async testStabilityPriorityEnforcement() {
    log('\n--- Test 2: Stability Priority Enforcement ---');
    
    const testCases = [
      {
        name: 'Novelty over stability',
        evolutionResult: {
          success: true,
          type: 'new-feature',
          message: '实现了一个新颖的功能，但稳定性较低，可能会导致系统崩溃'
        },
        expected: true // Should detect violation
      },
      {
        name: 'Extensibility over explainability',
        evolutionResult: {
          success: true,
          type: 'new-feature',
          message: '增强了系统的扩展性，但实现方式复杂难懂，难以解释'
        },
        expected: true // Should detect violation
      },
      {
        name: 'Reusability over stability',
        evolutionResult: {
          success: true,
          type: 'new-feature',
          message: '提高了代码的可复用性，但可能会导致系统稳定性降低'
        },
        expected: true // Should detect violation
      },
      {
        name: 'Stability first',
        evolutionResult: {
          success: true,
          type: 'new-feature',
          message: '在确保系统稳定性的前提下，实现了一个新功能，提高了系统性能'
        },
        expected: false // Should NOT detect violation
      }
    ];
    
    testCases.forEach((testCase, index) => {
      const result = this.antiDegenerationLock.stabilityPriorityEnforcer(testCase.evolutionResult);
      const passed = result.issues.length > 0 === testCase.expected;
      
      this.testResults.push({
        test: `Stability Priority Enforcement - ${testCase.name}`,
        passed,
        expected: testCase.expected,
        actual: result.issues.length > 0,
        issues: result.issues
      });
      
      console.log(`${passed ? '✅' : '❌'} Test ${index + 1}: ${testCase.name}`);
      if (!passed) {
        console.log(`   Expected: ${testCase.expected}, Actual: ${result.issues.length > 0}`);
        console.log(`   Issues: ${result.issues.join(', ')}`);
      }
    });
  }
  
  // Test 3: Anti-metaphysics detection
  async testAntiMetaphysicsDetection() {
    log('\n--- Test 3: Anti-Metaphysics Detection ---');
    
    const testCases = [
      {
        name: 'Metaphysical language - 某种程度上',
        evolutionResult: {
          success: true,
          type: 'new-abstract',
          message: '某种程度上，这个问题可以从更高维度来看待'
        },
        expected: true // Should detect violation
      },
      {
        name: 'Metaphysical language - 可能是一种',
        evolutionResult: {
          success: true,
          type: 'new-abstract',
          message: '这可能是一种新的解决思路，从本质上解决问题'
        },
        expected: true // Should detect violation
      },
      {
        name: 'Vague concepts without concrete details',
        evolutionResult: {
          success: true,
          type: 'new-abstract',
          message: '使用了一些模糊的概念来描述解决方案，没有具体的实现细节'
        },
        expected: true // Should detect violation
      },
      {
        name: 'Concrete language',
        evolutionResult: {
          success: true,
          type: 'new-abstract',
          message: '通过明确的步骤和具体的实现方法，解决了这个问题'
        },
        expected: false // Should NOT detect violation
      }
    ];
    
    testCases.forEach((testCase, index) => {
      const result = this.antiDegenerationLock.detectDegeneration(testCase.evolutionResult);
      const passed = result.degenerated === testCase.expected;
      
      this.testResults.push({
        test: `Anti-Metaphysics Detection - ${testCase.name}`,
        passed,
        expected: testCase.expected,
        actual: result.degenerated,
        issues: result.issues
      });
      
      console.log(`${passed ? '✅' : '❌'} Test ${index + 1}: ${testCase.name}`);
      if (!passed) {
        console.log(`   Expected: ${testCase.expected}, Actual: ${result.degenerated}`);
        console.log(`   Issues: ${result.issues.join(', ')}`);
      }
    });
  }
  
  // Test 4: Rollback mechanism
  async testRollbackMechanism() {
    log('\n--- Test 4: Rollback Mechanism ---');
    
    // Test 4.1: Create rollback point
    console.log('Testing rollback point creation...');
    const rollbackId = this.antiDegenerationLock.createRollbackPoint('Test rollback point');
    console.log(`Created rollback point: ${rollbackId}`);
    
    // Verify rollback point exists
    const rollbackPath = path.join(TEST_CONFIG.rollbackDir, `${rollbackId}.json`);
    const rollbackPointExists = fs.existsSync(rollbackPath);
    
    this.testResults.push({
      test: 'Rollback Mechanism - Create rollback point',
      passed: rollbackPointExists,
      expected: true,
      actual: rollbackPointExists
    });
    
    console.log(`${rollbackPointExists ? '✅' : '❌'} Test 4.1: Create rollback point`);
    
    // Test 4.2: Get rollback points
    console.log('Testing get rollback points...');
    const rollbackPoints = this.antiDegenerationLock.getRollbackPoints();
    const hasRollbackPoints = rollbackPoints.length > 0;
    
    this.testResults.push({
      test: 'Rollback Mechanism - Get rollback points',
      passed: hasRollbackPoints,
      expected: true,
      actual: hasRollbackPoints
    });
    
    console.log(`${hasRollbackPoints ? '✅' : '❌'} Test 4.2: Get rollback points`);
    
    // Test 4.3: Analyze rollback history
    console.log('Testing analyze rollback history...');
    const historyAnalysis = this.antiDegenerationLock.analyzeHistory();
    const analysisValid = historyAnalysis.totalRollbackPoints >= 0;
    
    this.testResults.push({
      test: 'Rollback Mechanism - Analyze history',
      passed: analysisValid,
      expected: true,
      actual: analysisValid
    });
    
    console.log(`${analysisValid ? '✅' : '❌'} Test 4.3: Analyze rollback history`);
    
    // Test 4.4: Rollback to point
    console.log('Testing rollback to point...');
    const rollbackResult = this.antiDegenerationLock.rollbackToPoint(rollbackId, ['Test rollback']);
    const rollbackSuccess = rollbackResult.success;
    
    this.testResults.push({
      test: 'Rollback Mechanism - Rollback to point',
      passed: rollbackSuccess,
      expected: true,
      actual: rollbackSuccess
    });
    
    console.log(`${rollbackSuccess ? '✅' : '❌'} Test 4.4: Rollback to point`);
  }
  
  // Test 5: PCEC integration
  async testPCECIntegration() {
    log('\n--- Test 5: PCEC Integration ---');
    
    // Test 5.1: Validate evolution (PCEC integration point)
    console.log('Testing validate evolution...');
    const validEvolution = {
      success: true,
      type: 'new-feature',
      message: '实现了一个新功能，通过简化现有代码结构，提高了系统性能和可维护性'
    };
    
    const invalidEvolution = {
      success: true,
      type: 'new-feature',
      message: '为了显得更聪明而增加了系统复杂度，引入了多个不必要的模块和层次'
    };
    
    const validResult = this.antiDegenerationLock.validateEvolution(validEvolution);
    const invalidResult = this.antiDegenerationLock.validateEvolution(invalidEvolution);
    
    const validTestPassed = validResult.valid === true;
    const invalidTestPassed = invalidResult.valid === false;
    
    this.testResults.push({
      test: 'PCEC Integration - Validate valid evolution',
      passed: validTestPassed,
      expected: true,
      actual: validResult.valid
    });
    
    this.testResults.push({
      test: 'PCEC Integration - Validate invalid evolution',
      passed: invalidTestPassed,
      expected: false,
      actual: invalidResult.valid
    });
    
    console.log(`${validTestPassed ? '✅' : '❌'} Test 5.1a: Validate valid evolution`);
    console.log(`${invalidTestPassed ? '✅' : '❌'} Test 5.1b: Validate invalid evolution`);
    
    // Test 5.2: Get lock status (PCEC monitoring integration)
    console.log('Testing get lock status...');
    const status = this.antiDegenerationLock.getStatus();
    const statusValid = status.status === 'ACTIVE';
    
    this.testResults.push({
      test: 'PCEC Integration - Get lock status',
      passed: statusValid,
      expected: 'ACTIVE',
      actual: status.status
    });
    
    console.log(`${statusValid ? '✅' : '❌'} Test 5.2: Get lock status`);
  }
  
  // Test 6: Edge cases
  async testEdgeCases() {
    log('\n--- Test 6: Edge Cases ---');
    
    const testCases = [
      {
        name: 'Empty evolution result',
        evolutionResult: {},
        expected: true // Should detect degeneration
      },
      {
        name: 'Evolution without type',
        evolutionResult: {
          success: true,
          message: 'Evolution without type'
        },
        expected: true // Should detect degeneration
      },
      {
        name: 'Evolution without message',
        evolutionResult: {
          success: true,
          type: 'new-feature'
        },
        expected: true // Should detect degeneration
      },
      {
        name: 'Failed evolution',
        evolutionResult: {
          success: false,
          type: 'new-feature',
          message: 'Evolution failed'
        },
        expected: true // Should detect degeneration
      }
    ];
    
    testCases.forEach((testCase, index) => {
      const result = this.antiDegenerationLock.detectDegeneration(testCase.evolutionResult);
      const passed = result.degenerated === testCase.expected;
      
      this.testResults.push({
        test: `Edge Cases - ${testCase.name}`,
        passed,
        expected: testCase.expected,
        actual: result.degenerated,
        issues: result.issues
      });
      
      console.log(`${passed ? '✅' : '❌'} Test ${index + 1}: ${testCase.name}`);
      if (!passed) {
        console.log(`   Expected: ${testCase.expected}, Actual: ${result.degenerated}`);
        console.log(`   Issues: ${result.issues.join(', ')}`);
      }
    });
  }
  
  // Generate test report
  generateTestReport() {
    log('\n=== Test Report ===');
    
    const totalTests = this.testResults.length;
    const passedTests = this.testResults.filter(test => test.passed).length;
    const failedTests = totalTests - passedTests;
    const passRate = (passedTests / totalTests * 100).toFixed(2);
    
    console.log(`\n=== Anti-Degeneration Lock Test Results ===`);
    console.log(`Total tests: ${totalTests}`);
    console.log(`Passed: ${passedTests}`);
    console.log(`Failed: ${failedTests}`);
    console.log(`Pass rate: ${passRate}%`);
    
    if (failedTests > 0) {
      console.log('\n=== Failed Tests ===');
      this.testResults.filter(test => !test.passed).forEach(test => {
        console.log(`❌ ${test.test}`);
        console.log(`   Expected: ${test.expected}`);
        console.log(`   Actual: ${test.actual}`);
        if (test.issues) {
          console.log(`   Issues: ${test.issues.join(', ')}`);
        }
      });
    }
    
    // Write detailed test report to file
    const reportPath = path.join(TEST_CONFIG.baseDir, 'test-report.json');
    const reportData = {
      timestamp: Date.now(),
      totalTests,
      passedTests,
      failedTests,
      passRate,
      testResults: this.testResults
    };
    
    fs.writeFileSync(reportPath, JSON.stringify(reportData, null, 2));
    console.log(`\nDetailed test report written to: ${reportPath}`);
    
    log(`Test suite completed: ${passedTests}/${totalTests} passed (${passRate}%)`);
  }
}

// Run test suite
if (require.main === module) {
  const testSuite = new AntiDegenerationLockTestSuite();
  testSuite.runAllTests().catch(error => {
    console.error(`Error running test suite: ${error.message}`);
    console.error(error.stack);
  });
}

module.exports = AntiDegenerationLockTestSuite;