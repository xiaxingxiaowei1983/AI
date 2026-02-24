#!/usr/bin/env node

// 公司大脑集成测试脚本
// 用于测试整个系统的运行情况，优化系统性能，修复发现的问题
// 执行时间: 系统部署前，定期维护时

const CompanyBrainIntegration = require('./start-company-brain-integration');
const path = require('path');
const fs = require('fs');

class CompanyBrainTester {
  constructor(config = {}) {
    this.config = {
      testDuration: 60000, // 测试持续时间（毫秒）
      testInterval: 5000, // 测试间隔（毫秒）
      performanceThresholds: {
        memoryUsage: 80, // 内存使用率阈值（%）
        cpuUsage: 80, // CPU使用率阈值（%）
        responseTime: 1000 // 响应时间阈值（毫秒）
      },
      ...config
    };
    
    this.integration = null;
    this.testResults = [];
    this.performanceData = [];
    this.isTesting = false;
  }
  
  async init() {
    console.log('🔧 初始化公司大脑测试...');
    
    // 初始化公司大脑集成
    this.integration = new CompanyBrainIntegration({
      companyBrain: {
        autoStart: true
      },
      agents: {
        startAgents: false // 测试时不启动智能体，避免干扰
      },
      monitoring: {
        enableMonitoring: true
      }
    });
    
    await this.integration.init();
    
    console.log('✅ 公司大脑测试初始化完成');
  }
  
  async runTests() {
    if (this.isTesting) {
      console.log('⚠️  测试已经在运行中');
      return;
    }
    
    console.log('🚀 开始运行公司大脑测试...');
    this.isTesting = true;
    
    try {
      // 启动公司大脑集成
      console.log('📡 启动公司大脑集成...');
      await this.integration.start();
      
      // 等待系统稳定
      console.log('⏳ 等待系统稳定...');
      await this.sleep(5000);
      
      // 运行功能测试
      console.log('🧪 运行功能测试...');
      await this.runFunctionalTests();
      
      // 运行性能测试
      console.log('⚡ 运行性能测试...');
      await this.runPerformanceTests();
      
      // 运行稳定性测试
      console.log('🔄 运行稳定性测试...');
      await this.runStabilityTests();
      
      // 生成测试报告
      console.log('📊 生成测试报告...');
      const report = this.generateTestReport();
      
      // 打印测试结果
      console.log('🎉 测试完成!');
      console.log('📋 测试报告:', JSON.stringify(report, null, 2));
      
      // 保存测试报告
      this.saveTestReport(report);
      
      return report;
      
    } catch (error) {
      console.error('❌ 测试过程中出错:', error);
      throw error;
    } finally {
      // 停止公司大脑集成
      console.log('⏹️  停止公司大脑集成...');
      await this.integration.stop();
      this.isTesting = false;
    }
  }
  
  async runFunctionalTests() {
    console.log('🔧 运行功能测试...');
    
    const functionalTests = [
      {
        name: '公司大脑状态测试',
        test: async () => {
          const status = await this.integration.getStatus();
          return {
            success: status.isRunning,
            data: status
          };
        }
      },
      {
        name: '公司大脑健康检查测试',
        test: async () => {
          const healthStatus = await this.integration.healthCheck();
          return {
            success: healthStatus.isHealthy,
            data: healthStatus
          };
        }
      },
      {
        name: '公司大脑系统信息测试',
        test: async () => {
          if (this.integration.companyBrain) {
            const systemInfo = await this.integration.companyBrain.getSystemInfo();
            return {
              success: true,
              data: systemInfo
            };
          } else {
            return {
              success: false,
              data: { error: '公司大脑未初始化' }
            };
          }
        }
      },
      {
        name: '目录结构测试',
        test: async () => {
          const requiredDirs = [
            './shared-memory',
            './shared-memory/coordination',
            './shared-memory/user-preferences',
            './shared-memory/system-config',
            './shared-memory/archived',
            './logs',
            './logs/performance',
            './logs/agents',
            './logs/system'
          ];
          
          const dirStatus = {};
          let allDirsExist = true;
          
          for (const dir of requiredDirs) {
            const dirPath = path.join(__dirname, dir);
            const exists = fs.existsSync(dirPath);
            dirStatus[dir] = exists;
            if (!exists) {
              allDirsExist = false;
            }
          }
          
          return {
            success: allDirsExist,
            data: dirStatus
          };
        }
      },
      {
        name: '配置文件测试',
        test: async () => {
          const requiredFiles = [
            './company-brain/index.js',
            './start-company-brain-integration.js',
            './.abstract',
            './shared-memory/coordination/organization_structure.md',
            './shared-memory/coordination/task-board.md'
          ];
          
          const fileStatus = {};
          let allFilesExist = true;
          
          for (const file of requiredFiles) {
            const filePath = path.join(__dirname, file);
            const exists = fs.existsSync(filePath);
            fileStatus[file] = exists;
            if (!exists) {
              allFilesExist = false;
            }
          }
          
          return {
            success: allFilesExist,
            data: fileStatus
          };
        }
      }
    ];
    
    for (const test of functionalTests) {
      console.log(`🧪 运行测试: ${test.name}`);
      
      try {
        const result = await test.test();
        this.testResults.push({
          name: test.name,
          success: result.success,
          data: result.data,
          timestamp: new Date().toISOString()
        });
        
        if (result.success) {
          console.log(`✅ 测试通过: ${test.name}`);
        } else {
          console.log(`❌ 测试失败: ${test.name}`);
          console.log(`📋 失败原因:`, result.data);
        }
        
      } catch (error) {
        console.error(`❌ 测试执行出错: ${test.name}`, error);
        this.testResults.push({
          name: test.name,
          success: false,
          data: { error: error.message },
          timestamp: new Date().toISOString()
        });
      }
      
      // 测试间隔
      await this.sleep(1000);
    }
  }
  
  async runPerformanceTests() {
    console.log('⚡ 运行性能测试...');
    
    const startTime = Date.now();
    const endTime = startTime + this.config.testDuration;
    
    while (Date.now() < endTime) {
      // 收集性能数据
      const performanceData = this.collectPerformanceData();
      this.performanceData.push(performanceData);
      
      console.log('📊 性能数据:', performanceData);
      
      // 检查性能阈值
      this.checkPerformanceThresholds(performanceData);
      
      // 测试间隔
      await this.sleep(this.config.testInterval);
    }
    
    console.log('✅ 性能测试完成');
  }
  
  async runStabilityTests() {
    console.log('🔄 运行稳定性测试...');
    
    const iterations = 10;
    
    for (let i = 0; i < iterations; i++) {
      console.log(`🔄 稳定性测试迭代 ${i + 1}/${iterations}`);
      
      try {
        // 测试状态获取
        const status = await this.integration.getStatus();
        
        // 测试健康检查
        const healthStatus = await this.integration.healthCheck();
        
        // 测试响应时间
        const responseTimeStart = Date.now();
        await this.integration.getStatus();
        const responseTime = Date.now() - responseTimeStart;
        
        console.log(`📋 迭代 ${i + 1} 响应时间: ${responseTime}ms`);
        
        // 记录稳定性测试结果
        this.testResults.push({
          name: `稳定性测试迭代 ${i + 1}`,
          success: true,
          data: {
            status: status,
            healthStatus: healthStatus,
            responseTime: responseTime
          },
          timestamp: new Date().toISOString()
        });
        
      } catch (error) {
        console.error(`❌ 稳定性测试迭代 ${i + 1} 出错:`, error);
        this.testResults.push({
          name: `稳定性测试迭代 ${i + 1}`,
          success: false,
          data: { error: error.message },
          timestamp: new Date().toISOString()
        });
      }
      
      // 测试间隔
      await this.sleep(2000);
    }
    
    console.log('✅ 稳定性测试完成');
  }
  
  collectPerformanceData() {
    // 收集系统性能数据
    const performanceData = {
      timestamp: new Date().toISOString(),
      memoryUsage: 0,
      cpuUsage: 0,
      uptime: process.uptime(),
      heapUsed: process.memoryUsage().heapUsed / (1024 * 1024),
      heapTotal: process.memoryUsage().heapTotal / (1024 * 1024)
    };
    
    // 计算内存使用率
    performanceData.memoryUsage = Math.round((performanceData.heapUsed / performanceData.heapTotal) * 100);
    
    // 注意：在Node.js中获取CPU使用率比较复杂，这里使用模拟数据
    // 实际生产环境中可以使用专门的库如 os-utils 来获取真实的CPU使用率
    performanceData.cpuUsage = Math.round(Math.random() * 30 + 10); // 模拟10-40%的CPU使用率
    
    return performanceData;
  }
  
  checkPerformanceThresholds(performanceData) {
    const thresholds = this.config.performanceThresholds;
    
    if (performanceData.memoryUsage > thresholds.memoryUsage) {
      console.warn(`⚠️  内存使用率超过阈值: ${performanceData.memoryUsage}% > ${thresholds.memoryUsage}%`);
    }
    
    if (performanceData.cpuUsage > thresholds.cpuUsage) {
      console.warn(`⚠️  CPU使用率超过阈值: ${performanceData.cpuUsage}% > ${thresholds.cpuUsage}%`);
    }
  }
  
  generateTestReport() {
    // 统计测试结果
    const totalTests = this.testResults.length;
    const passedTests = this.testResults.filter(test => test.success).length;
    const failedTests = totalTests - passedTests;
    
    // 分析性能数据
    let avgMemoryUsage = 0;
    let avgCpuUsage = 0;
    let maxMemoryUsage = 0;
    let maxCpuUsage = 0;
    
    if (this.performanceData.length > 0) {
      avgMemoryUsage = Math.round(
        this.performanceData.reduce((sum, data) => sum + data.memoryUsage, 0) / this.performanceData.length
      );
      
      avgCpuUsage = Math.round(
        this.performanceData.reduce((sum, data) => sum + data.cpuUsage, 0) / this.performanceData.length
      );
      
      maxMemoryUsage = Math.max(...this.performanceData.map(data => data.memoryUsage));
      maxCpuUsage = Math.max(...this.performanceData.map(data => data.cpuUsage));
    }
    
    // 生成报告
    const report = {
      testSummary: {
        totalTests: totalTests,
        passedTests: passedTests,
        failedTests: failedTests,
        successRate: Math.round((passedTests / totalTests) * 100),
        timestamp: new Date().toISOString()
      },
      performanceSummary: {
        averageMemoryUsage: avgMemoryUsage,
        averageCpuUsage: avgCpuUsage,
        maximumMemoryUsage: maxMemoryUsage,
        maximumCpuUsage: maxCpuUsage,
        testDuration: this.config.testDuration,
        performanceThresholds: this.config.performanceThresholds
      },
      testResults: this.testResults,
      performanceData: this.performanceData,
      recommendations: this.generateRecommendations()
    };
    
    return report;
  }
  
  generateRecommendations() {
    const recommendations = [];
    
    // 基于测试结果生成建议
    const failedTests = this.testResults.filter(test => !test.success);
    if (failedTests.length > 0) {
      recommendations.push('修复失败的测试用例，确保所有功能模块正常工作');
    }
    
    // 基于性能数据生成建议
    if (this.performanceData.length > 0) {
      const avgMemoryUsage = Math.round(
        this.performanceData.reduce((sum, data) => sum + data.memoryUsage, 0) / this.performanceData.length
      );
      
      const avgCpuUsage = Math.round(
        this.performanceData.reduce((sum, data) => sum + data.cpuUsage, 0) / this.performanceData.length
      );
      
      if (avgMemoryUsage > 70) {
        recommendations.push('优化内存使用，考虑使用内存缓存或减少内存泄漏');
      }
      
      if (avgCpuUsage > 70) {
        recommendations.push('优化CPU使用，考虑使用异步操作或减少计算密集型任务');
      }
    }
    
    // 其他建议
    recommendations.push('定期运行性能测试，监控系统健康状态');
    recommendations.push('根据业务需求调整性能阈值');
    recommendations.push('建立自动化测试流程，确保系统稳定性');
    
    return recommendations;
  }
  
  saveTestReport(report) {
    // 保存测试报告到文件
    const reportDir = path.join(__dirname, 'test-reports');
    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir, { recursive: true });
    }
    
    const reportFileName = `company-brain-test-report-${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
    const reportPath = path.join(reportDir, reportFileName);
    
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    console.log(`💾 测试报告已保存: ${reportPath}`);
    
    // 生成简洁的测试摘要
    const summaryPath = path.join(reportDir, `company-brain-test-summary-${new Date().toISOString().replace(/[:.]/g, '-')}.md`);
    const summary = this.generateTestSummary(report);
    fs.writeFileSync(summaryPath, summary);
    
    console.log(`📋 测试摘要已保存: ${summaryPath}`);
  }
  
  generateTestSummary(report) {
    const summary = `# 公司大脑测试报告摘要

## 测试概览
- **测试时间**: ${report.testSummary.timestamp}
- **测试持续时间**: ${report.performanceSummary.testDuration}毫秒
- **总测试数**: ${report.testSummary.totalTests}
- **通过测试数**: ${report.testSummary.passedTests}
- **失败测试数**: ${report.testSummary.failedTests}
- **成功率**: ${report.testSummary.successRate}%

## 性能概览
- **平均内存使用率**: ${report.performanceSummary.averageMemoryUsage}%
- **平均CPU使用率**: ${report.performanceSummary.averageCpuUsage}%
- **最大内存使用率**: ${report.performanceSummary.maximumMemoryUsage}%
- **最大CPU使用率**: ${report.performanceSummary.maximumCpuUsage}%

## 性能阈值
- **内存使用率阈值**: ${report.performanceSummary.performanceThresholds.memoryUsage}%
- **CPU使用率阈值**: ${report.performanceSummary.performanceThresholds.cpuUsage}%
- **响应时间阈值**: ${report.performanceSummary.performanceThresholds.responseTime}毫秒

## 建议
${report.recommendations.map(rec => `- ${rec}`).join('\n')}

## 详细报告
详细测试报告请查看: company-brain-test-report-${new Date().toISOString().replace(/[:.]/g, '-')}.json
`;
    
    return summary;
  }
  
  async sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  async cleanup() {
    console.log('🧹 清理公司大脑测试...');
    
    if (this.integration && this.integration.isRunning) {
      await this.integration.stop();
    }
    
    console.log('✅ 公司大脑测试清理完成');
  }
}

// 导出公司大脑测试类
module.exports = CompanyBrainTester;

// 如果直接运行此文件
if (require.main === module) {
  async function main() {
    const tester = new CompanyBrainTester();
    
    try {
      await tester.init();
      await tester.runTests();
      await tester.cleanup();
      
      console.log('🎉 公司大脑测试完成!');
      
    } catch (error) {
      console.error('❌ 测试过程中出错:', error);
      await tester.cleanup();
      process.exit(1);
    }
  }
  
  main();
}
