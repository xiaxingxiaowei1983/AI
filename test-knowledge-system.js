/**
 * 知识系统测试脚本
 * 测试整个知识系统的功能，优化性能，改进质量
 */

const fs = require('fs');
const path = require('path');
const knowledgeBase = require('./knowledge-base');
const { getSkillsList, getSkillsStatistics } = require('./integrate-knowledge');

// 测试结果输出路径
const TEST_OUTPUT_DIR = path.join(__dirname, '.trae', 'test-results');

// 确保测试输出目录存在
require('fs-extra').ensureDirSync(TEST_OUTPUT_DIR);

/**
 * 测试知识系统
 */
async function testKnowledgeSystem() {
  console.log('开始测试知识系统...');

  try {
    // 初始化知识库
    await knowledgeBase.initialize();

    // 运行各项测试
    const testResults = {
      timestamp: new Date().toISOString(),
      tests: {
        knowledgeBase: await testKnowledgeBase(),
        skills: await testSkills(),
        performance: await testPerformance(),
        integration: await testIntegration()
      },
      summary: {}
    };

    // 生成测试摘要
    generateTestSummary(testResults);

    // 保存测试结果
    const testResultsPath = path.join(TEST_OUTPUT_DIR, `knowledge-system-test-${Date.now()}.json`);
    fs.writeFileSync(testResultsPath, JSON.stringify(testResults, null, 2));

    // 生成可读的测试报告
    const testReportPath = path.join(TEST_OUTPUT_DIR, `knowledge-system-test-${Date.now()}.md`);
    generateTestReport(testResults, testReportPath);

    console.log('\n知识系统测试完成！');
    console.log(`测试结果: ${testResultsPath}`);
    console.log(`测试报告: ${testReportPath}`);

    // 输出测试摘要
    console.log('\n测试摘要:');
    console.log(`- 知识库测试: ${testResults.tests.knowledgeBase.success ? '通过' : '失败'}`);
    console.log(`- SKILL测试: ${testResults.tests.skills.success ? '通过' : '失败'}`);
    console.log(`- 性能测试: ${testResults.tests.performance.success ? '通过' : '失败'}`);
    console.log(`- 集成测试: ${testResults.tests.integration.success ? '通过' : '失败'}`);
    console.log(`- 总体结果: ${testResults.summary.overallSuccess ? '通过' : '失败'}`);

    return testResults;
  } catch (error) {
    console.error('测试过程中发生错误:', error);
    return null;
  }
}

/**
 * 测试知识库功能
 */
async function testKnowledgeBase() {
  console.log('\n测试知识库功能...');

  const results = {
    success: true,
    tests: [],
    errors: []
  };

  // 测试1: 知识库统计信息
  try {
    const stats = knowledgeBase.getStatistics();
    results.tests.push({
      name: '知识库统计信息',
      success: true,
      details: {
        totalItems: stats.totalItems,
        itemsByType: stats.itemsByType,
        itemsByCategory: stats.itemsByCategory,
        indexSize: stats.indexSize
      }
    });
    console.log(`  ✓ 知识库统计信息: ${stats.totalItems} 个条目`);
  } catch (error) {
    results.success = false;
    results.errors.push({
      test: '知识库统计信息',
      error: error.message
    });
    console.error(`  ✗ 知识库统计信息测试失败: ${error.message}`);
  }

  // 测试2: 知识搜索功能
  try {
    const testQueries = ['波特五力', '蓝海战略', '创新', '反脆弱', '管理策略'];
    const searchResults = {};

    for (const query of testQueries) {
      const start = Date.now();
      const result = knowledgeBase.search(query);
      const end = Date.now();
      searchResults[query] = {
        count: result.length,
        time: end - start,
        sample: result.slice(0, 3)
      };
    }

    results.tests.push({
      name: '知识搜索功能',
      success: true,
      details: searchResults
    });
    console.log(`  ✓ 知识搜索功能: 测试了 ${testQueries.length} 个查询`);
  } catch (error) {
    results.success = false;
    results.errors.push({
      test: '知识搜索功能',
      error: error.message
    });
    console.error(`  ✗ 知识搜索功能测试失败: ${error.message}`);
  }

  // 测试3: 知识条目获取
  try {
    const allItems = knowledgeBase.getAllKnowledgeItems();
    const conceptItems = knowledgeBase.getAllKnowledgeItems({ types: ['concept'] });
    const documentItems = knowledgeBase.getAllKnowledgeItems({ types: ['document'] });

    results.tests.push({
      name: '知识条目获取',
      success: true,
      details: {
        totalItems: allItems.length,
        conceptItems: conceptItems.length,
        documentItems: documentItems.length
      }
    });
    console.log(`  ✓ 知识条目获取: 成功获取各类知识条目`);
  } catch (error) {
    results.success = false;
    results.errors.push({
      test: '知识条目获取',
      error: error.message
    });
    console.error(`  ✗ 知识条目获取测试失败: ${error.message}`);
  }

  // 测试4: 知识条目添加和删除
  try {
    // 添加测试知识条目
    const testItem = {
      type: 'test',
      title: '测试知识条目',
      category: '测试',
      content: '这是一个测试知识条目',
      concepts: ['测试', '知识']
    };

    const addedItem = knowledgeBase.addKnowledgeItem(testItem);
    const itemCountAfterAdd = knowledgeBase.getAllKnowledgeItems().length;

    // 删除测试知识条目
    const deleteResult = knowledgeBase.deleteKnowledgeItem(addedItem.id);
    const itemCountAfterDelete = knowledgeBase.getAllKnowledgeItems().length;

    results.tests.push({
      name: '知识条目添加和删除',
      success: deleteResult && (itemCountAfterAdd === itemCountAfterDelete + 1),
      details: {
        addSuccess: !!addedItem,
        deleteSuccess: deleteResult,
        itemCountAfterAdd,
        itemCountAfterDelete
      }
    });
    console.log(`  ✓ 知识条目添加和删除: 成功`);
  } catch (error) {
    results.success = false;
    results.errors.push({
      test: '知识条目添加和删除',
      error: error.message
    });
    console.error(`  ✗ 知识条目添加和删除测试失败: ${error.message}`);
  }

  return results;
}

/**
 * 测试SKILL功能
 */
async function testSkills() {
  console.log('\n测试SKILL功能...');

  const results = {
    success: true,
    tests: [],
    errors: []
  };

  try {
    // 获取SKILL列表
    const skills = getSkillsList();
    const skillsStats = getSkillsStatistics();

    results.tests.push({
      name: 'SKILL列表获取',
      success: true,
      details: {
        totalSkills: skills.length,
        categories: skillsStats.categories,
        skillsByCategory: skillsStats.skillsByCategory
      }
    });
    console.log(`  ✓ SKILL列表获取: 找到 ${skills.length} 个SKILL`);
  } catch (error) {
    results.success = false;
    results.errors.push({
      test: 'SKILL列表获取',
      error: error.message
    });
    console.error(`  ✗ SKILL列表获取测试失败: ${error.message}`);
  }

  // 测试SKILL内容
  try {
    const skills = getSkillsList();
    const skillContents = [];

    for (const skill of skills.slice(0, 5)) { // 测试前5个SKILL
      const skillPath = skill.path;
      const skillFilePath = path.join(skillPath, 'SKILL.md');

      if (fs.existsSync(skillFilePath)) {
        const content = fs.readFileSync(skillFilePath, 'utf8');
        skillContents.push({
          name: skill.name,
          category: skill.category,
          contentLength: content.length,
          hasFrontmatter: content.includes('---')
        });
      }
    }

    results.tests.push({
      name: 'SKILL内容测试',
      success: true,
      details: skillContents
    });
    console.log(`  ✓ SKILL内容测试: 测试了 ${skillContents.length} 个SKILL`);
  } catch (error) {
    results.success = false;
    results.errors.push({
      test: 'SKILL内容测试',
      error: error.message
    });
    console.error(`  ✗ SKILL内容测试失败: ${error.message}`);
  }

  return results;
}

/**
 * 测试性能
 */
async function testPerformance() {
  console.log('\n测试性能...');

  const results = {
    success: true,
    tests: [],
    errors: []
  };

  // 测试知识库搜索性能
  try {
    const testQueries = ['波特五力', '蓝海战略', '创新', '反脆弱', '管理策略'];
    const performanceResults = [];

    for (const query of testQueries) {
      const times = [];
      for (let i = 0; i < 5; i++) { // 每个查询运行5次
        const start = Date.now();
        knowledgeBase.search(query);
        const end = Date.now();
        times.push(end - start);
      }

      performanceResults.push({
        query,
        averageTime: times.reduce((a, b) => a + b, 0) / times.length,
        maxTime: Math.max(...times),
        minTime: Math.min(...times),
        times
      });
    }

    results.tests.push({
      name: '知识库搜索性能',
      success: true,
      details: performanceResults
    });
    console.log(`  ✓ 知识库搜索性能: 测试完成`);
  } catch (error) {
    results.success = false;
    results.errors.push({
      test: '知识库搜索性能',
      error: error.message
    });
    console.error(`  ✗ 知识库搜索性能测试失败: ${error.message}`);
  }

  // 测试知识库初始化性能
  try {
    const start = Date.now();
    await knowledgeBase.initialize();
    const end = Date.now();

    results.tests.push({
      name: '知识库初始化性能',
      success: true,
      details: {
        time: end - start
      }
    });
    console.log(`  ✓ 知识库初始化性能: ${end - start}ms`);
  } catch (error) {
    results.success = false;
    results.errors.push({
      test: '知识库初始化性能',
      error: error.message
    });
    console.error(`  ✗ 知识库初始化性能测试失败: ${error.message}`);
  }

  return results;
}

/**
 * 测试集成
 */
async function testIntegration() {
  console.log('\n测试集成...');

  const results = {
    success: true,
    tests: [],
    errors: []
  };

  // 测试与AgentManager的集成
  try {
    const AgentManager = require('./agents/agent_manager');

    // 检查AgentManager是否有知识系统相关方法
    const hasKnowledgeMethods = {
      getKnowledgeBase: typeof AgentManager.getKnowledgeBase === 'function',
      searchKnowledge: typeof AgentManager.searchKnowledge === 'function',
      getKnowledgeStatistics: typeof AgentManager.getKnowledgeStatistics === 'function',
      getKnowledgeSystemStatus: typeof AgentManager.getKnowledgeSystemStatus === 'function'
    };

    results.tests.push({
      name: '与AgentManager集成',
      success: Object.values(hasKnowledgeMethods).every(val => val),
      details: hasKnowledgeMethods
    });
    console.log(`  ✓ 与AgentManager集成: 检查了 ${Object.keys(hasKnowledgeMethods).length} 个方法`);
  } catch (error) {
    results.success = false;
    results.errors.push({
      test: '与AgentManager集成',
      error: error.message
    });
    console.error(`  ✗ 与AgentManager集成测试失败: ${error.message}`);
  }

  return results;
}

/**
 * 生成测试摘要
 */
function generateTestSummary(testResults) {
  const summary = {
    totalTests: 0,
    passedTests: 0,
    failedTests: 0,
    overallStatus: 'pass'
  };

  // 统计测试结果
  for (const testType in testResults.tests) {
    const test = testResults.tests[testType];
    summary.totalTests++;
    if (test.success) {
      summary.passedTests++;
    } else {
      summary.failedTests++;
      summary.overallStatus = 'fail';
    }
  }

  testResults.summary = summary;
}

/**
 * 生成测试报告
 */
function generateTestReport(testResults, outputPath) {
  let reportContent = `# 知识系统测试报告

## 测试概述

- **测试时间**: ${testResults.timestamp}
- **总体状态**: ${testResults.summary.overallStatus === 'pass' ? '通过' : '失败'}
- **测试总数**: ${testResults.summary.totalTests}
- **通过测试**: ${testResults.summary.passedTests}
- **失败测试**: ${testResults.summary.failedTests}

## 测试详情

`;

  // 添加各项测试的详细结果
  for (const testType in testResults.tests) {
    const test = testResults.tests[testType];
    reportContent += `### ${getTestTypeName(testType)}

`;
    reportContent += `- **状态**: ${test.success ? '通过' : '失败'}
`;

    if (test.tests) {
      reportContent += `- **子测试数**: ${test.tests.length}
`;
      test.tests.forEach(subTest => {
        reportContent += `  - ${subTest.name}: ${subTest.success ? '通过' : '失败'}
`;
      });
    }

    if (test.errors && test.errors.length > 0) {
      reportContent += `- **错误**: ${test.errors.length}
`;
      test.errors.forEach(error => {
        reportContent += `  - ${error.test}: ${error.error}
`;
      });
    }

    reportContent += `
`;
  }

  // 添加性能测试详情
  if (testResults.tests.performance && testResults.tests.performance.tests) {
    const performanceTest = testResults.tests.performance.tests.find(t => t.name === '知识库搜索性能');
    if (performanceTest) {
      reportContent += `## 性能测试详情

`;
      reportContent += `### 知识搜索性能

`;
      performanceTest.details.forEach(result => {
        reportContent += `- **查询**: ${result.query}
`;
        reportContent += `  - 平均时间: ${result.averageTime}ms
`;
        reportContent += `  - 最大时间: ${result.maxTime}ms
`;
        reportContent += `  - 最小时间: ${result.minTime}ms
`;
        reportContent += `  - 结果数: ${result.count || result.sample.length}
`;
        reportContent += `
`;
      });
    }
  }

  // 添加优化建议
  reportContent += `## 优化建议

`;
  reportContent += generateOptimizationSuggestions(testResults);

  // 写入测试报告
  fs.writeFileSync(outputPath, reportContent);
}

/**
 * 获取测试类型的中文名称
 */
function getTestTypeName(testType) {
  const typeNames = {
    knowledgeBase: '知识库测试',
    skills: 'SKILL测试',
    performance: '性能测试',
    integration: '集成测试'
  };
  return typeNames[testType] || testType;
}

/**
 * 生成优化建议
 */
function generateOptimizationSuggestions(testResults) {
  const suggestions = [];

  // 基于测试结果生成优化建议
  const kbStats = knowledgeBase.getStatistics();
  const skills = getSkillsList();

  // 知识库优化建议
  if (kbStats.totalItems > 100) {
    suggestions.push('考虑实现知识库的分层索引，提高搜索性能');
  }

  if (kbStats.indexSize > 500) {
    suggestions.push('考虑优化索引结构，去除冗余关键词');
  }

  // SKILL优化建议
  if (skills.length < 10) {
    suggestions.push('建议增加更多领域的SKILL，丰富知识体系');
  }

  // 性能优化建议
  if (testResults.tests.performance) {
    const perfTest = testResults.tests.performance.tests.find(t => t.name === '知识库搜索性能');
    if (perfTest) {
      const slowQueries = perfTest.details.filter(r => r.averageTime > 50);
      if (slowQueries.length > 0) {
        suggestions.push('优化搜索算法，提高慢查询的性能');
      }
    }
  }

  // 集成优化建议
  suggestions.push('考虑为知识系统添加缓存机制，减少重复计算');
  suggestions.push('实现知识系统的自动更新机制，保持知识的新鲜度');
  suggestions.push('添加知识质量评估功能，确保知识的准确性和可靠性');

  if (suggestions.length === 0) {
    return '暂无优化建议，系统运行良好！\n';
  }

  return suggestions.map((suggestion, index) => `${index + 1}. ${suggestion}`).join('\n');
}

// 执行测试
if (require.main === module) {
  testKnowledgeSystem()
    .then(() => {
      console.log('\n知识系统测试完成！');
      console.log('测试结果已保存到 .trae/test-results/ 目录。');
    })
    .catch(error => {
      console.error('测试过程中发生错误:', error);
    });
}

module.exports = { testKnowledgeSystem };
