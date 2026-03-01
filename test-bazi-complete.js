const BaziCalculator = require('./bazi-calculator');
const calculator = new BaziCalculator();

class BaziTestSuite {
  constructor() {
    this.testCases = [];
    this.results = [];
  }

  // 添加测试用例
  addTestCase(name, year, month, day, hour, minute, expectedBaZi) {
    this.testCases.push({
      name,
      year,
      month: month - 1, // 转换为0-11的月份
      day,
      hour,
      minute,
      expectedBaZi
    });
  }

  // 运行所有测试
  runTests() {
    console.log('开始八字算法完整测试套件...');
    console.log(`共 ${this.testCases.length} 个测试用例`);
    console.log('=' . repeat(80));

    this.results = [];
    let passed = 0;
    let failed = 0;

    for (const testCase of this.testCases) {
      const result = this.runTestCase(testCase);
      this.results.push(result);
      
      if (result.passed) {
        passed++;
      } else {
        failed++;
      }
    }

    console.log('=' . repeat(80));
    console.log('测试完成!');
    console.log(`通过: ${passed}, 失败: ${failed}, 总计: ${this.testCases.length}`);
    console.log(`成功率: ${((passed / this.testCases.length) * 100).toFixed(2)}%`);

    if (failed > 0) {
      console.log('\n失败的测试用例:');
      for (const result of this.results) {
        if (!result.passed) {
          console.log(`- ${result.name}: 预期 ${result.expectedBaZi.join(' ')}，实际 ${result.actualBaZi.join(' ')}`);
        }
      }
    }

    return {
      passed,
      failed,
      total: this.testCases.length,
      successRate: (passed / this.testCases.length) * 100,
      results: this.results
    };
  }

  // 运行单个测试用例
  runTestCase(testCase) {
    try {
      const startTime = performance.now();
      const baZiResult = calculator.calculateBaZi(
        testCase.year,
        testCase.month,
        testCase.day,
        testCase.hour,
        testCase.minute
      );
      const endTime = performance.now();
      
      const actualBaZi = baZiResult.baZi;
      const passed = this.compareBaZi(actualBaZi, testCase.expectedBaZi);
      
      console.log(`${passed ? '✓' : '✗'} ${testCase.name}`);
      console.log(`  日期: ${testCase.year}-${testCase.month + 1}-${testCase.day} ${testCase.hour}:${testCase.minute}`);
      console.log(`  预期: ${testCase.expectedBaZi.join(' ')}`);
      console.log(`  实际: ${actualBaZi.join(' ')}`);
      console.log(`  耗时: ${(endTime - startTime).toFixed(3)}ms`);
      console.log();

      return {
        name: testCase.name,
        passed,
        expectedBaZi: testCase.expectedBaZi,
        actualBaZi,
        time: (endTime - startTime).toFixed(3),
        result: baZiResult
      };
    } catch (error) {
      console.log(`✗ ${testCase.name}`);
      console.log(`  错误: ${error.message}`);
      console.log();
      
      return {
        name: testCase.name,
        passed: false,
        error: error.message,
        expectedBaZi: testCase.expectedBaZi,
        actualBaZi: []
      };
    }
  }

  // 比较八字是否相同
  compareBaZi(actual, expected) {
    if (actual.length !== expected.length) {
      return false;
    }
    
    for (let i = 0; i < actual.length; i++) {
      if (actual[i] !== expected[i]) {
        return false;
      }
    }
    
    return true;
  }

  // 生成测试报告
  generateReport() {
    const report = {
      summary: {
        total: this.testCases.length,
        passed: this.results.filter(r => r.passed).length,
        failed: this.results.filter(r => !r.passed).length,
        successRate: ((this.results.filter(r => r.passed).length / this.testCases.length) * 100).toFixed(2)
      },
      testCases: this.testCases.map((testCase, index) => ({
        ...testCase,
        result: this.results[index]
      })),
      timestamp: new Date().toISOString()
    };

    console.log('\n测试报告:');
    console.log(JSON.stringify(report, null, 2));

    return report;
  }
}

// 主测试函数
function main() {
  const testSuite = new BaziTestSuite();

  // 用户提供的测试用例
  testSuite.addTestCase(
    '用户测试用例1',
    1988, 11, 7, 4, 0,
    ['戊辰', '壬戌', '丙寅', '庚寅']
  );

  testSuite.addTestCase(
    '用户测试用例2',
    1973, 8, 20, 16, 30,
    ['癸丑', '庚申', '戊子', '庚申']
  );

  testSuite.addTestCase(
    '用户测试用例3',
    1981, 12, 24, 8, 0,
    ['辛酉', '庚子', '丙子', '壬辰']
  );

  // 之前的测试用例
  testSuite.addTestCase(
    '之前测试用例1',
    1983, 5, 20, 0, 30,
    ['癸亥', '丁巳', '戊申', '壬子']
  );

  testSuite.addTestCase(
    '之前测试用例2',
    2011, 3, 20, 7, 30,
    ['辛卯', '辛卯', '甲戌', '戊辰']
  );

  testSuite.addTestCase(
    '之前测试用例3',
    1985, 5, 31, 4, 30,
    ['乙丑', '辛巳', '庚午', '戊寅']
  );

  testSuite.addTestCase(
    '之前测试用例4',
    1982, 10, 21, 7, 15,
    ['壬戌', '庚戌', '丁丑', '甲辰']
  );

  testSuite.addTestCase(
    '之前测试用例5',
    1994, 11, 21, 23, 10,
    ['甲戌', '乙亥', '辛亥', '戊子']
  );

  // 边界情况测试
  testSuite.addTestCase(
    '年末测试',
    1983, 12, 31, 23, 59,
    ['癸亥', '甲子', '己巳', '甲子']
  );

  testSuite.addTestCase(
    '年初测试',
    1984, 1, 1, 0, 1,
    ['癸亥', '甲子', '己巳', '甲子']
  );

  testSuite.addTestCase(
    '闰年测试',
    2020, 2, 29, 12, 0,
    ['庚子', '己卯', '丁丑', '丙午']
  );

  // 运行测试
  const result = testSuite.runTests();
  testSuite.generateReport();

  return result;
}

// 运行测试
if (require.main === module) {
  main();
}

module.exports = BaziTestSuite;