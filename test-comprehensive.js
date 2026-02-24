/**
 * 综合测试脚本
 * 验证OpenClaw系统的整合效果，包括能力树、各分支工具和VFM Protocol
 */

const { capabilityTree } = require('./capabilities/capability-tree');
const { contextLogger } = require('./tools/knowledge/logger');
const { memorySearch } = require('./tools/knowledge/memory_search');
const { stickerAnalyzer } = require('./tools/intelligence/sticker-analyzer');
const { webSearchPlus } = require('./tools/intelligence/web-search-plus');
const { vfmEvaluator } = require('./skills/vfm-evaluator');
const fs = require('fs');
const path = require('path');

class ComprehensiveTest {
  constructor() {
    this.testResults = [];
    this.testDir = path.join(__dirname, 'test-results');
    this._initialize();
  }

  // 初始化测试环境
  _initialize() {
    if (!fs.existsSync(this.testDir)) {
      fs.mkdirSync(this.testDir, { recursive: true });
    }
  }

  // 记录测试结果
  _recordResult(testName, success, message, data = null) {
    const result = {
      testName,
      success,
      message,
      data,
      timestamp: Date.now()
    };
    this.testResults.push(result);
    console.log(`${success ? '✓' : '✗'} ${testName}: ${message}`);
    return result;
  }

  // 运行所有测试
  async runAllTests() {
    console.log('开始综合测试...');
    console.log('='.repeat(60));

    // 测试1: 能力树基本功能
    await this.testCapabilityTreeBasic();

    // 测试2: Knowledge & Memory分支工具
    await this.testKnowledgeMemoryTools();

    // 测试3: Intelligence & Analysis分支工具
    await this.testIntelligenceAnalysisTools();

    // 测试4: VFM Protocol功能
    await this.testVFMProtocol();

    // 测试5: 能力树与VFM集成
    await this.testCapabilityTreeVFMIntegration();

    // 生成测试报告
    this.generateTestReport();

    console.log('='.repeat(60));
    console.log('综合测试完成!');
  }

  // 测试1: 能力树基本功能
  async testCapabilityTreeBasic() {
    console.log('\n测试1: 能力树基本功能');
    console.log('-'.repeat(40));

    try {
      // 获取能力树状态
      const status = capabilityTree.getStatus();
      this._recordResult('获取能力树状态', true, `成功获取状态: ${status.totalNodes}个节点`);

      // 生成文本形式的能力树
      const textTree = capabilityTree.generateTextTree();
      this._recordResult('生成文本能力树', true, '成功生成文本能力树');

      // 生成可视化数据
      const visualization = capabilityTree.generateVisualization();
      this._recordResult('生成可视化数据', true, `成功生成可视化数据: ${visualization.nodes.length}个节点`);

      // 导出能力树
      const exportedTree = capabilityTree.export();
      this._recordResult('导出能力树', true, '成功导出能力树');

    } catch (error) {
      this._recordResult('能力树基本功能', false, `测试失败: ${error.message}`);
    }
  }

  // 测试2: Knowledge & Memory分支工具
  async testKnowledgeMemoryTools() {
    console.log('\n测试2: Knowledge & Memory分支工具');
    console.log('-'.repeat(40));

    try {
      // 测试logger.js
      console.log('  测试logger.js...');
      const logResult = contextLogger.logInteraction('zhy', {
        userInput: '测试对话',
        agentResponse: '测试回复',
        intent: 'test',
        sentiment: 'neutral'
      });
      this._recordResult('测试logger.js', logResult.success, `日志记录${logResult.success ? '成功' : '失败'}`);

      // 测试memory_search.js
      console.log('  测试memory_search.js...');
      const searchResult = memorySearch.search('测试', {
        limit: 3,
        threshold: 0.2
      });
      this._recordResult('测试memory_search.js', true, `搜索完成，返回${searchResult.length}个结果`);

      // 测试创建索引
      const indexResult = memorySearch.createIndex();
      this._recordResult('测试创建搜索索引', indexResult.success, `索引创建${indexResult.success ? '成功' : '失败'}`);

    } catch (error) {
      this._recordResult('Knowledge & Memory工具', false, `测试失败: ${error.message}`);
    }
  }

  // 测试3: Intelligence & Analysis分支工具
  async testIntelligenceAnalysisTools() {
    console.log('\n测试3: Intelligence & Analysis分支工具');
    console.log('-'.repeat(40));

    try {
      // 测试sticker-analyzer.js
      console.log('  测试sticker-analyzer.js...');
      
      // 创建测试图片文件
      const testImageDir = path.join(__dirname, 'test-images');
      if (!fs.existsSync(testImageDir)) {
        fs.mkdirSync(testImageDir, { recursive: true });
      }
      
      const testImagePath = path.join(testImageDir, 'test-sticker.png');
      fs.writeFileSync(testImagePath, 'fake image content');

      const analyzeResult = stickerAnalyzer.analyzeImage(testImagePath, {
        classify: true,
        filterJunk: true,
        extractFeatures: true
      });
      this._recordResult('测试sticker-analyzer.js', true, `分析完成，分类: ${analyzeResult.classification}`);

      // 清理测试文件
      fs.unlinkSync(testImagePath);

      // 测试web-search-plus.js
      console.log('  测试web-search-plus.js...');
      const webSearchResult = webSearchPlus.search('人工智能', {
        intent: 'general',
        limit: 3
      });
      this._recordResult('测试web-search-plus.js', true, `搜索完成，返回${webSearchResult.results.length}个结果`);

      // 测试批量搜索
      const batchResult = webSearchPlus.batchSearch(['天气', '新闻'], {
        limit: 2
      });
      this._recordResult('测试批量搜索', true, `批量搜索完成，处理${Object.keys(batchResult.results).length}个查询`);

    } catch (error) {
      this._recordResult('Intelligence & Analysis工具', false, `测试失败: ${error.message}`);
    }
  }

  // 测试4: VFM Protocol功能
  async testVFMProtocol() {
    console.log('\n测试4: VFM Protocol功能');
    console.log('-'.repeat(40));

    try {
      // 测试单个能力评估
      console.log('  测试单个能力评估...');
      const testCapability = {
        name: '日常对话处理',
        type: 'core',
        description: '处理用户的日常对话，提供智能回复',
        tools: ['nlp-processor']
      };
      const evaluation = vfmEvaluator.evaluateCapability(testCapability);
      this._recordResult('测试单个能力评估', true, `评估完成，总评分: ${evaluation.totalScore}`);

      // 测试批量评估
      console.log('  测试批量能力评估...');
      const testCapabilities = [
        {
          name: '日常对话处理',
          type: 'core',
          description: '处理用户的日常对话，提供智能回复'
        },
        {
          name: '七彩文字生成',
          type: 'specialized',
          description: '将文字转换为七彩颜色的格式'
        }
      ];
      const batchEvaluation = vfmEvaluator.batchEvaluate(testCapabilities);
      this._recordResult('测试批量能力评估', true, `批量评估完成，处理${batchEvaluation.totalCount}个能力`);

      // 测试生成评估报告
      const report = vfmEvaluator.generateReport(batchEvaluation.results);
      this._recordResult('测试生成评估报告', true, '评估报告生成成功');

      // 测试获取VFM配置
      const config = vfmEvaluator.getConfig();
      this._recordResult('测试获取VFM配置', true, 'VFM配置获取成功');

    } catch (error) {
      this._recordResult('VFM Protocol功能', false, `测试失败: ${error.message}`);
    }
  }

  // 测试5: 能力树与VFM集成
  async testCapabilityTreeVFMIntegration() {
    console.log('\n测试5: 能力树与VFM集成');
    console.log('-'.repeat(40));

    try {
      // 获取所有能力节点
      const allNodes = capabilityTree.getAllNodes().filter(node => node.level > 0);
      if (allNodes.length === 0) {
        this._recordResult('能力树与VFM集成', false, '没有找到能力节点');
        return;
      }

      // 测试评估单个能力价值
      console.log('  测试评估能力价值...');
      const testNode = allNodes[0];
      const evaluation = capabilityTree.evaluateCapabilityValue(testNode.id);
      this._recordResult('测试评估能力价值', true, `评估完成，能力: ${testNode.name}，评分: ${evaluation.totalScore}`);

      // 测试批量评估能力价值
      const nodeIds = allNodes.slice(0, 3).map(node => node.id);
      const batchEvaluation = capabilityTree.batchEvaluateCapabilityValues(nodeIds);
      this._recordResult('测试批量评估能力价值', true, `批量评估完成，处理${Object.keys(batchEvaluation).length}个能力`);

      // 测试获取高价值能力
      const highValueCapabilities = capabilityTree.getHighValueCapabilities();
      this._recordResult('测试获取高价值能力', true, `找到${highValueCapabilities.length}个高价值能力`);

      // 测试获取低价值能力
      const lowValueCapabilities = capabilityTree.getLowValueCapabilities();
      this._recordResult('测试获取低价值能力', true, `找到${lowValueCapabilities.length}个低价值能力`);

      // 测试生成价值评估报告
      const valueReport = capabilityTree.generateValueReport();
      this._recordResult('测试生成价值评估报告', true, '价值评估报告生成成功');

      // 测试获取VFM配置
      const vfmConfig = capabilityTree.getVFMConfig();
      this._recordResult('测试获取VFM配置', true, 'VFM配置获取成功');

    } catch (error) {
      this._recordResult('能力树与VFM集成', false, `测试失败: ${error.message}`);
    }
  }

  // 生成测试报告
  generateTestReport() {
    const report = {
      id: `test_report_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
      totalTests: this.testResults.length,
      passedTests: this.testResults.filter(r => r.success).length,
      failedTests: this.testResults.filter(r => !r.success).length,
      successRate: this.testResults.length > 0 
        ? (this.testResults.filter(r => r.success).length / this.testResults.length) * 100 
        : 0,
      testResults: this.testResults,
      systemInfo: {
        nodeVersion: process.version,
        platform: process.platform,
        arch: process.arch,
        memoryUsage: process.memoryUsage()
      }
    };

    // 保存测试报告
    const reportPath = path.join(this.testDir, `${report.id}.json`);
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');

    // 打印测试摘要
    console.log('\n测试报告摘要:');
    console.log(`总测试数: ${report.totalTests}`);
    console.log(`通过测试: ${report.passedTests}`);
    console.log(`失败测试: ${report.failedTests}`);
    console.log(`成功率: ${report.successRate.toFixed(2)}%`);
    console.log(`测试报告已保存到: ${reportPath}`);

    return report;
  }
}

// 运行测试
if (require.main === module) {
  const testRunner = new ComprehensiveTest();
  testRunner.runAllTests().catch(error => {
    console.error('测试运行失败:', error);
  });
}

module.exports = { ComprehensiveTest };
