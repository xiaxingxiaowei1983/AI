/**
 * PCEC 系统测试套件
 * 验证 PCEC 系统的所有功能和约束
 * 包括单元测试、集成测试和压力测试
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class PCECTestSuite {
  constructor(config = {}) {
    this.config = {
      baseDir: config.baseDir || __dirname,
      testDir: config.testDir || path.join(__dirname, 'test-results'),
      pcecScheduler: config.pcecScheduler || path.join(__dirname, 'pcec-hourly-scheduler.js'),
      capabilitiesDir: config.capabilitiesDir || path.join(__dirname, 'skills', 'capability-evolver'),
      logFile: config.logFile || path.join(__dirname, 'test-results', 'pcec-test.log'),
      timeout: config.timeout || 30000, // 30秒超时
      ...config
    };
    
    this.ensureDirectories();
    this.results = {
      total: 0,
      passed: 0,
      failed: 0,
      skipped: 0,
      tests: []
    };
  }
  
  // 确保目录存在
  ensureDirectories() {
    const directories = [
      this.config.testDir,
      path.dirname(this.config.logFile)
    ];
    
    directories.forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        this.log(`Created directory: ${dir}`);
      }
    });
  }
  
  // 日志函数
  log(message) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [PCEC Test] ${message}`;
    console.log(logMessage);
    
    // 写入日志文件
    fs.appendFileSync(this.config.logFile, logMessage + '\n', { flag: 'a' });
  }
  
  // 运行所有测试
  async runAllTests() {
    this.log('Starting PCEC System Test Suite');
    this.log('================================');
    
    try {
      // 运行单元测试
      await this.runUnitTests();
      
      // 运行集成测试
      await this.runIntegrationTests();
      
      // 运行压力测试
      await this.runStressTests();
      
      // 生成测试报告
      this.generateTestReport();
      
      this.log('================================');
      this.log(`Test Suite Complete: ${this.results.passed}/${this.results.total} passed`);
      
      if (this.results.failed > 0) {
        this.log(`❌ ${this.results.failed} tests failed`);
        return false;
      } else {
        this.log(`✅ All tests passed!`);
        return true;
      }
    } catch (error) {
      this.log(`Error running test suite: ${error.message}`);
      return false;
    }
  }
  
  // 运行单元测试
  async runUnitTests() {
    this.log('Running Unit Tests...');
    
    const unitTests = [
      this.testHotInfoCacheIntegration.bind(this),
      this.testPCECMonitoringSystem.bind(this),
      this.testCapabilityConflictResolver.bind(this),
      this.testMindExplosionEngine.bind(this),
      this.testEvolutionProductGenerator.bind(this),
      this.testAntiDegenerationLock.bind(this),
      this.testReportingComplianceSystem.bind(this)
    ];
    
    for (const test of unitTests) {
      await test();
    }
    
    this.log(`Unit Tests Complete: ${this.results.passed} passed, ${this.results.failed} failed`);
  }
  
  // 测试热信息缓存集成
  async testHotInfoCacheIntegration() {
    const testName = 'Hot Info Cache Integration';
    this.results.total++;
    
    try {
      const HotInfoCacheIntegration = require('./skills/capability-evolver/modules/hot-info-cache-integration');
      const hotInfoCache = new HotInfoCacheIntegration();
      
      // 测试初始化
      const status = hotInfoCache.getStatus();
      if (!status) {
        throw new Error('Failed to get status');
      }
      
      // 测试发布信息
      const publishId = hotInfoCache.publishInfo('test-agent', {
        title: 'Test Info',
        content: 'This is a test info item for PCEC evolution',
        type: 'evolution',
        priority: 'high'
      });
      
      if (!publishId) {
        throw new Error('Failed to publish info');
      }
      
      // 测试识别热点信息
      const hotInfo = hotInfoCache.identifyHotInfo();
      if (!Array.isArray(hotInfo)) {
        throw new Error('Failed to identify hot info');
      }
      
      // 测试提取进化灵感
      const inspirations = hotInfoCache.extractEvolutionInspiration();
      if (!Array.isArray(inspirations)) {
        throw new Error('Failed to extract inspirations');
      }
      
      // 测试集成到 PCEC
      const opportunities = hotInfoCache.integrateWithPCEC();
      if (!Array.isArray(opportunities)) {
        throw new Error('Failed to integrate with PCEC');
      }
      
      this.log(`✅ ${testName} passed`);
      this.results.passed++;
      this.results.tests.push({ name: testName, status: 'passed' });
    } catch (error) {
      this.log(`❌ ${testName} failed: ${error.message}`);
      this.results.failed++;
      this.results.tests.push({ name: testName, status: 'failed', error: error.message });
    }
  }
  
  // 测试 PCEC 监控系统
  async testPCECMonitoringSystem() {
    const testName = 'PCEC Monitoring System';
    this.results.total++;
    
    try {
      const PCECMonitoringSystem = require('./skills/capability-evolver/modules/pcec-monitoring-system');
      const monitoringSystem = new PCECMonitoringSystem();
      
      // 测试初始化
      const status = monitoringSystem.getStatus();
      if (!status) {
        throw new Error('Failed to get status');
      }
      
      // 测试收集指标
      const metrics = monitoringSystem.collectMetrics();
      if (!metrics) {
        throw new Error('Failed to collect metrics');
      }
      
      // 测试检查警报
      const alerts = monitoringSystem.checkAlerts();
      if (!Array.isArray(alerts)) {
        throw new Error('Failed to check alerts');
      }
      
      // 测试更新仪表板
      const dashboard = monitoringSystem.updateDashboard();
      if (!dashboard) {
        throw new Error('Failed to update dashboard');
      }
      
      // 测试导出监控数据
      const exportPath = monitoringSystem.exportMonitoringData();
      if (!exportPath) {
        throw new Error('Failed to export monitoring data');
      }
      
      this.log(`✅ ${testName} passed`);
      this.results.passed++;
      this.results.tests.push({ name: testName, status: 'passed' });
    } catch (error) {
      this.log(`❌ ${testName} failed: ${error.message}`);
      this.results.failed++;
      this.results.tests.push({ name: testName, status: 'failed', error: error.message });
    }
  }
  
  // 测试能力冲突解决器
  async testCapabilityConflictResolver() {
    const testName = 'Capability Conflict Resolver';
    this.results.total++;
    
    try {
      const CapabilityConflictResolver = require('./skills/capability-evolver/modules/capability-conflict-resolution');
      const conflictResolver = new CapabilityConflictResolver();
      
      // 测试初始化
      const status = conflictResolver.getStatus();
      if (!status) {
        throw new Error('Failed to get status');
      }
      
      // 测试检测冲突
      const newCapability = {
        name: 'Test Capability',
        description: 'This is a test capability',
        type: 'new-feature',
        level: 2
      };
      
      const existingCapabilities = [
        {
          name: 'Test Capability',
          description: 'This is an existing test capability',
          type: 'new-feature',
          level: 2
        }
      ];
      
      const conflicts = conflictResolver.detectConflicts(newCapability, existingCapabilities);
      if (!Array.isArray(conflicts)) {
        throw new Error('Failed to detect conflicts');
      }
      
      // 测试解决冲突
      const resolution = conflictResolver.resolveConflicts(conflicts);
      if (!resolution) {
        throw new Error('Failed to resolve conflicts');
      }
      
      this.log(`✅ ${testName} passed`);
      this.results.passed++;
      this.results.tests.push({ name: testName, status: 'passed' });
    } catch (error) {
      this.log(`❌ ${testName} failed: ${error.message}`);
      this.results.failed++;
      this.results.tests.push({ name: testName, status: 'failed', error: error.message });
    }
  }
  
  // 测试思维爆炸引擎
  async testMindExplosionEngine() {
    const testName = 'Mind Explosion Engine';
    this.results.total++;
    
    try {
      const MindExplosionEngine = require('./skills/capability-evolver/modules/mind-explosion-engine');
      const mindExplosionEngine = new MindExplosionEngine();
      
      // 测试触发思维爆炸
      const explosionResult = mindExplosionEngine.triggerExplosion();
      if (!explosionResult || !explosionResult.question) {
        throw new Error('Failed to trigger explosion');
      }
      
      // 测试验证结果格式
      if (!Array.isArray(explosionResult.suggestions)) {
        throw new Error('Invalid suggestions format');
      }
      
      if (!explosionResult.exploration) {
        throw new Error('Invalid exploration format');
      }
      
      this.log(`✅ ${testName} passed`);
      this.results.passed++;
      this.results.tests.push({ name: testName, status: 'passed' });
    } catch (error) {
      this.log(`❌ ${testName} failed: ${error.message}`);
      this.results.failed++;
      this.results.tests.push({ name: testName, status: 'failed', error: error.message });
    }
  }
  
  // 测试进化产物生成器
  async testEvolutionProductGenerator() {
    const testName = 'Evolution Product Generator';
    this.results.total++;
    
    try {
      const EvolutionProductGenerator = require('./skills/capability-evolver/modules/evolution-product-generator');
      const productGenerator = new EvolutionProductGenerator();
      
      // 测试生成产物
      const evolutionResult = {
        success: true,
        type: 'new-feature',
        message: 'Test evolution result'
      };
      
      const product = productGenerator.generateProduct(evolutionResult, 1);
      if (!product || !product.type) {
        throw new Error('Failed to generate product');
      }
      
      // 测试验证产物格式
      if (!['capability-shape', 'default-strategy', 'behavior-rule'].includes(product.type)) {
        throw new Error('Invalid product type');
      }
      
      this.log(`✅ ${testName} passed`);
      this.results.passed++;
      this.results.tests.push({ name: testName, status: 'passed' });
    } catch (error) {
      this.log(`❌ ${testName} failed: ${error.message}`);
      this.results.failed++;
      this.results.tests.push({ name: testName, status: 'failed', error: error.message });
    }
  }
  
  // 测试反退化锁定
  async testAntiDegenerationLock() {
    const testName = 'Anti-Degeneration Lock';
    this.results.total++;
    
    try {
      const AntiDegenerationLock = require('./skills/capability-evolver/modules/anti-degeneration-lock');
      const antiDegenerationLock = new AntiDegenerationLock();
      
      // 测试激活锁定
      antiDegenerationLock.activate();
      
      // 测试获取状态
      const status = antiDegenerationLock.getStatus();
      if (!status) {
        throw new Error('Failed to get status');
      }
      
      // 测试验证进化
      const evolutionResult = {
        success: true,
        type: 'new-feature',
        message: 'Test evolution that should pass ADL'
      };
      
      const validation = antiDegenerationLock.validateEvolution(evolutionResult);
      if (!validation || !validation.valid) {
        throw new Error('Failed to validate evolution');
      }
      
      // 测试创建回滚点
      const rollbackPoint = antiDegenerationLock.createRollbackPoint();
      if (!rollbackPoint) {
        throw new Error('Failed to create rollback point');
      }
      
      this.log(`✅ ${testName} passed`);
      this.results.passed++;
      this.results.tests.push({ name: testName, status: 'passed' });
    } catch (error) {
      this.log(`❌ ${testName} failed: ${error.message}`);
      this.results.failed++;
      this.results.tests.push({ name: testName, status: 'failed', error: error.message });
    }
  }
  
  // 测试报告合规系统
  async testReportingComplianceSystem() {
    const testName = 'Reporting Compliance System';
    this.results.total++;
    
    try {
      const ReportingComplianceSystem = require('./skills/capability-evolver/modules/reporting-compliance-system');
      const reportingSystem = new ReportingComplianceSystem();
      
      // 测试检查报告规则
      const config = reportingSystem.checkReportingRules();
      if (!config) {
        throw new Error('Failed to check reporting rules');
      }
      
      // 测试验证合规性
      const validation = reportingSystem.validateReportingCompliance();
      if (!validation || !validation.valid) {
        throw new Error('Failed to validate compliance');
      }
      
      // 测试生成报告
      const evolutionResult = {
        success: true,
        type: 'new-feature',
        message: 'Test evolution for reporting'
      };
      
      const report = reportingSystem.generateReport(evolutionResult, 1);
      if (!report || !report.recipient) {
        throw new Error('Failed to generate report');
      }
      
      this.log(`✅ ${testName} passed`);
      this.results.passed++;
      this.results.tests.push({ name: testName, status: 'passed' });
    } catch (error) {
      this.log(`❌ ${testName} failed: ${error.message}`);
      this.results.failed++;
      this.results.tests.push({ name: testName, status: 'failed', error: error.message });
    }
  }
  
  // 运行集成测试
  async runIntegrationTests() {
    this.log('Running Integration Tests...');
    
    const integrationTests = [
      this.testPCECSchedulerIntegration.bind(this),
      this.testModuleIntegration.bind(this),
      this.testEvolutionWorkflow.bind(this)
    ];
    
    for (const test of integrationTests) {
      await test();
    }
    
    this.log(`Integration Tests Complete: ${this.results.passed} passed, ${this.results.failed} failed`);
  }
  
  // 测试 PCEC 调度器集成
  async testPCECSchedulerIntegration() {
    const testName = 'PCEC Scheduler Integration';
    this.results.total++;
    
    try {
      // 测试调度器文件存在
      if (!fs.existsSync(this.config.pcecScheduler)) {
        throw new Error('PCEC scheduler file not found');
      }
      
      // 测试调度器可以加载
      const { executePCEC, shouldRun } = require(this.config.pcecScheduler);
      if (!executePCEC || !shouldRun) {
        throw new Error('Failed to load PCEC scheduler');
      }
      
      // 测试 shouldRun 函数
      const shouldRunResult = shouldRun();
      if (typeof shouldRunResult !== 'boolean') {
        throw new Error('Invalid shouldRun result');
      }
      
      this.log(`✅ ${testName} passed`);
      this.results.passed++;
      this.results.tests.push({ name: testName, status: 'passed' });
    } catch (error) {
      this.log(`❌ ${testName} failed: ${error.message}`);
      this.results.failed++;
      this.results.tests.push({ name: testName, status: 'failed', error: error.message });
    }
  }
  
  // 测试模块集成
  async testModuleIntegration() {
    const testName = 'Module Integration';
    this.results.total++;
    
    try {
      // 测试所有模块都能同时加载
      const modules = [
        './skills/capability-evolver/modules/hot-info-cache-integration',
        './skills/capability-evolver/modules/pcec-monitoring-system',
        './skills/capability-evolver/modules/capability-conflict-resolution',
        './skills/capability-evolver/modules/mind-explosion-engine',
        './skills/capability-evolver/modules/evolution-product-generator',
        './skills/capability-evolver/modules/anti-degeneration-lock',
        './skills/capability-evolver/modules/reporting-compliance-system'
      ];
      
      modules.forEach(modulePath => {
        try {
          require(modulePath);
          this.log(`Successfully loaded module: ${modulePath}`);
        } catch (error) {
          throw new Error(`Failed to load module ${modulePath}: ${error.message}`);
        }
      });
      
      this.log(`✅ ${testName} passed`);
      this.results.passed++;
      this.results.tests.push({ name: testName, status: 'passed' });
    } catch (error) {
      this.log(`❌ ${testName} failed: ${error.message}`);
      this.results.failed++;
      this.results.tests.push({ name: testName, status: 'failed', error: error.message });
    }
  }
  
  // 测试进化工作流
  async testEvolutionWorkflow() {
    const testName = 'Evolution Workflow';
    this.results.total++;
    
    try {
      // 测试完整的进化工作流
      const PCEC = require('./pcec-hourly-scheduler');
      
      // 测试识别进化机会
      const opportunity = PCEC.identifyEvolutionOpportunity({});
      if (!opportunity) {
        throw new Error('Failed to identify evolution opportunity');
      }
      
      this.log(`✅ ${testName} passed`);
      this.results.passed++;
      this.results.tests.push({ name: testName, status: 'passed' });
    } catch (error) {
      this.log(`❌ ${testName} failed: ${error.message}`);
      this.results.failed++;
      this.results.tests.push({ name: testName, status: 'failed', error: error.message });
    }
  }
  
  // 运行压力测试
  async runStressTests() {
    this.log('Running Stress Tests...');
    
    const stressTests = [
      this.testConcurrentOperations.bind(this),
      this.testLongRunningExecution.bind(this),
      this.testResourceUsage.bind(this)
    ];
    
    for (const test of stressTests) {
      await test();
    }
    
    this.log(`Stress Tests Complete: ${this.results.passed} passed, ${this.results.failed} failed`);
  }
  
  // 测试并发操作
  async testConcurrentOperations() {
    const testName = 'Concurrent Operations';
    this.results.total++;
    
    try {
      const HotInfoCacheIntegration = require('./skills/capability-evolver/modules/hot-info-cache-integration');
      const hotInfoCache = new HotInfoCacheIntegration();
      
      // 测试并发发布信息
      const publishPromises = [];
      for (let i = 0; i < 10; i++) {
        publishPromises.push(
          hotInfoCache.publishInfo(`agent-${i}`, {
            title: `Test Info ${i}`,
            content: `Concurrent test info ${i}`,
            type: 'evolution',
            priority: 'medium'
          })
        );
      }
      
      const publishIds = await Promise.all(publishPromises);
      const successfulPublishes = publishIds.filter(id => id);
      
      if (successfulPublishes.length < 8) {
        throw new Error(`Only ${successfulPublishes.length} out of 10 publishes succeeded`);
      }
      
      this.log(`✅ ${testName} passed`);
      this.results.passed++;
      this.results.tests.push({ name: testName, status: 'passed' });
    } catch (error) {
      this.log(`❌ ${testName} failed: ${error.message}`);
      this.results.failed++;
      this.results.tests.push({ name: testName, status: 'failed', error: error.message });
    }
  }
  
  // 测试长时间运行
  async testLongRunningExecution() {
    const testName = 'Long Running Execution';
    this.results.total++;
    
    try {
      const PCECMonitoringSystem = require('./skills/capability-evolver/modules/pcec-monitoring-system');
      const monitoringSystem = new PCECMonitoringSystem();
      
      // 测试长时间收集指标
      const startTime = Date.now();
      const metrics = [];
      
      for (let i = 0; i < 5; i++) {
        const metric = monitoringSystem.collectMetrics();
        if (metric) {
          metrics.push(metric);
        }
        // 短暂延迟
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      if (metrics.length < 4) {
        throw new Error(`Only ${metrics.length} out of 5 metrics collections succeeded`);
      }
      
      if (duration > this.config.timeout) {
        throw new Error(`Test timed out after ${duration}ms`);
      }
      
      this.log(`✅ ${testName} passed (duration: ${duration}ms)`);
      this.results.passed++;
      this.results.tests.push({ name: testName, status: 'passed' });
    } catch (error) {
      this.log(`❌ ${testName} failed: ${error.message}`);
      this.results.failed++;
      this.results.tests.push({ name: testName, status: 'failed', error: error.message });
    }
  }
  
  // 测试资源使用
  async testResourceUsage() {
    const testName = 'Resource Usage';
    this.results.total++;
    
    try {
      // 测试内存使用
      const initialMemory = process.memoryUsage();
      
      // 加载所有模块
      const modules = [
        './skills/capability-evolver/modules/hot-info-cache-integration',
        './skills/capability-evolver/modules/pcec-monitoring-system',
        './skills/capability-evolver/modules/capability-conflict-resolution'
      ];
      
      modules.forEach(modulePath => {
        require(modulePath);
      });
      
      const finalMemory = process.memoryUsage();
      const memoryIncrease = finalMemory.heapUsed - initialMemory.heapUsed;
      
      // 检查内存使用是否合理（不超过100MB）
      if (memoryIncrease > 100 * 1024 * 1024) {
        throw new Error(`Memory usage too high: ${(memoryIncrease / (1024 * 1024)).toFixed(2)}MB`);
      }
      
      this.log(`✅ ${testName} passed (memory increase: ${(memoryIncrease / (1024 * 1024)).toFixed(2)}MB)`);
      this.results.passed++;
      this.results.tests.push({ name: testName, status: 'passed' });
    } catch (error) {
      this.log(`❌ ${testName} failed: ${error.message}`);
      this.results.failed++;
      this.results.tests.push({ name: testName, status: 'failed', error: error.message });
    }
  }
  
  // 生成测试报告
  generateTestReport() {
    try {
      const report = {
        timestamp: Date.now(),
        summary: {
          total: this.results.total,
          passed: this.results.passed,
          failed: this.results.failed,
          skipped: this.results.skipped,
          successRate: (this.results.passed / this.results.total * 100).toFixed(2) + '%'
        },
        tests: this.results.tests,
        environment: {
          nodeVersion: process.version,
          platform: process.platform,
          arch: process.arch,
          memory: process.memoryUsage()
        }
      };
      
      const reportPath = path.join(this.config.testDir, `pcec-test-report-${Date.now()}.json`);
      fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
      
      // 生成人类可读的报告
      const humanReport = this.generateHumanReadableReport(report);
      const humanReportPath = path.join(this.config.testDir, `pcec-test-report-${Date.now()}.md`);
      fs.writeFileSync(humanReportPath, humanReport);
      
      this.log(`Generated test report: ${reportPath}`);
      this.log(`Generated human-readable report: ${humanReportPath}`);
      
      return report;
    } catch (error) {
      this.log(`Error generating test report: ${error.message}`);
      return null;
    }
  }
  
  // 生成人类可读的报告
  generateHumanReadableReport(report) {
    let markdown = '# PCEC System Test Report\n\n';
    markdown += `## Summary\n\n`;
    markdown += `| Metric | Value |\n`;
    markdown += `|--------|-------|\n`;
    markdown += `| Total Tests | ${report.summary.total} |\n`;
    markdown += `| Passed | ${report.summary.passed} |\n`;
    markdown += `| Failed | ${report.summary.failed} |\n`;
    markdown += `| Skipped | ${report.summary.skipped} |\n`;
    markdown += `| Success Rate | ${report.summary.successRate} |\n`;
    markdown += `| Test Time | ${new Date(report.timestamp).toISOString()} |\n\n`;
    
    markdown += `## Environment\n\n`;
    markdown += `| Property | Value |\n`;
    markdown += `|----------|-------|\n`;
    markdown += `| Node.js Version | ${report.environment.nodeVersion} |\n`;
    markdown += `| Platform | ${report.environment.platform} |\n`;
    markdown += `| Architecture | ${report.environment.arch} |\n`;
    markdown += `| Memory Usage | ${(report.environment.memory.heapUsed / (1024 * 1024)).toFixed(2)} MB |\n\n`;
    
    if (report.summary.failed > 0) {
      markdown += `## Failed Tests\n\n`;
      const failedTests = report.tests.filter(test => test.status === 'failed');
      failedTests.forEach(test => {
        markdown += `### ${test.name}\n`;
        markdown += `**Error:** ${test.error}\n\n`;
      });
    }
    
    markdown += `## All Tests\n\n`;
    report.tests.forEach(test => {
      const statusEmoji = test.status === 'passed' ? '✅' : test.status === 'failed' ? '❌' : '⚠️';
      markdown += `${statusEmoji} ${test.name}\n`;
      if (test.error) {
        markdown += `   Error: ${test.error}\n`;
      }
      markdown += `\n`;
    });
    
    return markdown;
  }
  
  // 清理测试数据
  cleanupTestData() {
    try {
      // 清理热信息缓存
      const HotInfoCacheIntegration = require('./skills/capability-evolver/modules/hot-info-cache-integration');
      const hotInfoCache = new HotInfoCacheIntegration();
      hotInfoCache.cleanupAllCache();
      
      // 清理监控数据
      const PCECMonitoringSystem = require('./skills/capability-evolver/modules/pcec-monitoring-system');
      const monitoringSystem = new PCECMonitoringSystem();
      monitoringSystem.cleanupOldMetrics(0); // 清理所有指标
      
      this.log('Cleaned up test data');
    } catch (error) {
      this.log(`Error cleaning up test data: ${error.message}`);
    }
  }
}

// 运行测试套件
if (require.main === module) {
  const testSuite = new PCECTestSuite();
  
  testSuite.runAllTests()
    .then(success => {
      if (success) {
        testSuite.log('All tests passed! PCEC system is ready.');
        process.exit(0);
      } else {
        testSuite.log('Some tests failed. Please check the test results.');
        process.exit(1);
      }
    })
    .catch(error => {
      testSuite.log(`Error running test suite: ${error.message}`);
      console.error(error);
      process.exit(1);
    })
    .finally(() => {
      testSuite.cleanupTestData();
    });
}

module.exports = PCECTestSuite;
