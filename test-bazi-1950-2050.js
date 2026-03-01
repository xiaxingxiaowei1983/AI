// 1950-2050年八字算法完整测试用例集
const BaziCalculator = require('./bazi-calculator');

class BaziTestSuite {
  constructor() {
    this.calculator = new BaziCalculator();
    this.testCases = [];
    this.initializeTestCases();
  }

  // 初始化测试用例
  initializeTestCases() {
    // 用户提供的测试用例
    this.addUserTestCases();
    
    // 边界日期测试
    this.addBoundaryTestCases();
    
    // 特殊日期测试
    this.addSpecialTestCases();
    
    // 不同年代的代表性日期
    this.addDecadeTestCases();
  }

  // 添加用户提供的测试用例
  addUserTestCases() {
    this.testCases.push(
      {
        name: '用户测试用例1',
        date: { year: 1983, month: 4, day: 20, hour: 0, minute: 30 },
        expected: {
          year: '癸亥',
          month: '丁巳',
          day: '戊申',
          time: '壬子',
          baZi: ['癸亥', '丁巳', '戊申', '壬子']
        }
      },
      {
        name: '用户测试用例2',
        date: { year: 2011, month: 2, day: 20, hour: 7, minute: 30 },
        expected: {
          year: '辛卯',
          month: '辛卯',
          day: '甲戌',
          time: '戊辰',
          baZi: ['辛卯', '辛卯', '甲戌', '戊辰']
        }
      },
      {
        name: '用户测试用例3',
        date: { year: 1985, month: 4, day: 31, hour: 4, minute: 30 },
        expected: {
          year: '乙丑',
          month: '辛巳',
          day: '庚午',
          time: '庚辰',
          baZi: ['乙丑', '辛巳', '庚午', '庚辰']
        }
      },
      {
        name: '用户测试用例4',
        date: { year: 1982, month: 9, day: 21, hour: 7, minute: 15 },
        expected: {
          year: '壬戌',
          month: '庚戌',
          day: '丁丑',
          time: '甲辰',
          baZi: ['壬戌', '庚戌', '丁丑', '甲辰']
        }
      },
      {
        name: '用户测试用例5',
        date: { year: 1988, month: 10, day: 7, hour: 4, minute: 0 },
        expected: {
          year: '戊辰',
          month: '壬戌',
          day: '丙寅',
          time: '庚寅',
          baZi: ['戊辰', '壬戌', '丙寅', '庚寅']
        }
      },
      {
        name: '用户测试用例6',
        date: { year: 1994, month: 10, day: 22, hour: 23, minute: 10 },
        expected: {
          year: '甲戌',
          month: '乙亥',
          day: '辛亥',
          time: '戊子',
          baZi: ['甲戌', '乙亥', '辛亥', '戊子']
        }
      },
      {
        name: '用户测试用例7',
        date: { year: 1973, month: 7, day: 20, hour: 16, minute: 30 },
        expected: {
          year: '癸丑',
          month: '庚申',
          day: '戊子',
          time: '庚申',
          baZi: ['癸丑', '庚申', '戊子', '庚申']
        }
      },
      {
        name: '用户测试用例8',
        date: { year: 1981, month: 11, day: 24, hour: 8, minute: 0 },
        expected: {
          year: '辛酉',
          month: '庚子',
          day: '丙子',
          time: '壬辰',
          baZi: ['辛酉', '庚子', '丙子', '壬辰']
        }
      }
    );
  }

  // 添加边界日期测试用例
  addBoundaryTestCases() {
    // 立春前后
    this.testCases.push(
      {
        name: '立春前一天',
        date: { year: 2020, month: 0, day: 3, hour: 23, minute: 59 },
        expected: {
          year: '己亥',
          month: '丁丑',
          day: '丁丑',
          time: '壬子'
        }
      },
      {
        name: '立春当天',
        date: { year: 2020, month: 0, day: 4, hour: 17, minute: 0 },
        expected: {
          year: '庚子',
          month: '戊寅',
          day: '戊寅',
          time: '庚申'
        }
      }
    );

    // 冬至前后
    this.testCases.push(
      {
        name: '冬至前一天',
        date: { year: 2020, month: 11, day: 20, hour: 23, minute: 59 },
        expected: {
          year: '庚子',
          month: '戊子',
          day: '戊戌',
          time: '壬子'
        }
      },
      {
        name: '冬至当天',
        date: { year: 2020, month: 11, day: 21, hour: 18, minute: 0 },
        expected: {
          year: '庚子',
          month: '戊子',
          day: '己亥',
          time: '癸酉'
        }
      }
    );
  }

  // 添加特殊日期测试用例
  addSpecialTestCases() {
    // 闰年2月29日
    this.testCases.push(
      {
        name: '闰年2月29日',
        date: { year: 2020, month: 1, day: 29, hour: 12, minute: 0 },
        expected: {
          year: '庚子',
          month: '戊寅',
          day: '丁丑',
          time: '丙午'
        }
      }
    );

    // 世纪之交
    this.testCases.push(
      {
        name: '2000年1月1日',
        date: { year: 2000, month: 0, day: 1, hour: 0, minute: 0 },
        expected: {
          year: '己卯',
          month: '丙子',
          day: '戊午',
          time: '壬子'
        }
      },
      {
        name: '2000年12月31日',
        date: { year: 2000, month: 11, day: 31, hour: 23, minute: 59 },
        expected: {
          year: '庚辰',
          month: '戊子',
          day: '丁未',
          time: '壬子'
        }
      }
    );
  }

  // 添加不同年代的代表性日期
  addDecadeTestCases() {
    const decades = [1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020, 2030, 2040, 2050];
    
    decades.forEach(year => {
      this.testCases.push(
        {
          name: `${year}年代代表性日期`,
          date: { year: year, month: 5, day: 1, hour: 12, minute: 0 },
          expected: {}
        }
      );
    });
  }

  // 运行测试
  runTests() {
    console.log(`开始运行八字算法测试套件，共 ${this.testCases.length} 个测试用例`);
    console.log('=' .repeat(80));
    
    let passed = 0;
    let failed = 0;
    const failures = [];
    
    this.testCases.forEach((testCase, index) => {
      console.log(`\n测试 ${index + 1}: ${testCase.name}`);
      console.log(`日期: ${testCase.date.year}-${testCase.date.month + 1}-${testCase.date.day} ${testCase.date.hour}:${testCase.date.minute}`);
      
      try {
        const result = this.calculator.calculateBaZi(
          testCase.date.year,
          testCase.date.month,
          testCase.date.day,
          testCase.date.hour,
          testCase.date.minute
        );
        
        console.log(`计算结果: ${result.baZi.join(' ')}`);
        
        if (Object.keys(testCase.expected).length > 0) {
          const isPassed = this.verifyResult(result, testCase.expected);
          if (isPassed) {
            console.log('✅ 测试通过');
            passed++;
          } else {
            console.log('❌ 测试失败');
            failed++;
            failures.push({ test: testCase.name, result, expected: testCase.expected });
          }
        } else {
          console.log('ℹ️  仅验证计算成功，无预期结果');
          passed++;
        }
      } catch (error) {
        console.log(`❌ 测试失败: ${error.message}`);
        failed++;
        failures.push({ test: testCase.name, error: error.message });
      }
    });
    
    console.log('\n' + '=' .repeat(80));
    console.log(`测试完成: 通过 ${passed}, 失败 ${failed}, 总 ${this.testCases.length}`);
    
    if (failures.length > 0) {
      console.log('\n失败的测试用例:');
      failures.forEach((failure, index) => {
        console.log(`\n${index + 1}. ${failure.test}`);
        if (failure.error) {
          console.log(`   错误: ${failure.error}`);
        } else {
          console.log(`   计算结果: ${failure.result.baZi.join(' ')}`);
          console.log(`   预期结果: ${failure.expected.baZi?.join(' ') || '无'}`);
        }
      });
    }
    
    return { passed, failed, total: this.testCases.length, failures };
  }

  // 验证测试结果
  verifyResult(result, expected) {
    if (expected.baZi) {
      return JSON.stringify(result.baZi) === JSON.stringify(expected.baZi);
    }
    
    let isPassed = true;
    
    if (expected.year && result.year.full !== expected.year) {
      isPassed = false;
      console.log(`   年柱不匹配: 计算=${result.year.full}, 预期=${expected.year}`);
    }
    
    if (expected.month && result.month.full !== expected.month) {
      isPassed = false;
      console.log(`   月柱不匹配: 计算=${result.month.full}, 预期=${expected.month}`);
    }
    
    if (expected.day && result.day.full !== expected.day) {
      isPassed = false;
      console.log(`   日柱不匹配: 计算=${result.day.full}, 预期=${expected.day}`);
    }
    
    if (expected.time && result.time.full !== expected.time) {
      isPassed = false;
      console.log(`   时柱不匹配: 计算=${result.time.full}, 预期=${expected.time}`);
    }
    
    return isPassed;
  }

  // 运行性能测试
  runPerformanceTest() {
    console.log('\n' + '=' .repeat(80));
    console.log('运行性能测试');
    console.log('=' .repeat(80));
    
    const start = Date.now();
    const testCount = 1000;
    
    for (let i = 0; i < testCount; i++) {
      const year = 1950 + Math.floor(Math.random() * 101);
      const month = Math.floor(Math.random() * 12);
      const day = 1 + Math.floor(Math.random() * 28);
      const hour = Math.floor(Math.random() * 24);
      const minute = Math.floor(Math.random() * 60);
      
      this.calculator.calculateBaZi(year, month, day, hour, minute);
    }
    
    const end = Date.now();
    const duration = end - start;
    const avgTime = duration / testCount;
    
    console.log(`执行 ${testCount} 次计算，总耗时: ${duration}ms`);
    console.log(`平均每次计算: ${avgTime.toFixed(3)}ms`);
    console.log(`缓存大小: ${this.calculator.cache.size}`);
    
    return { duration, avgTime, cacheSize: this.calculator.cache.size };
  }
}

// 运行测试
if (require.main === module) {
  const testSuite = new BaziTestSuite();
  const testResults = testSuite.runTests();
  testSuite.runPerformanceTest();
  
  console.log('\n' + '=' .repeat(80));
  console.log('测试套件完成');
  console.log(`通过: ${testResults.passed}, 失败: ${testResults.failed}, 总: ${testResults.total}`);
  console.log(`成功率: ${((testResults.passed / testResults.total) * 100).toFixed(2)}%`);
  console.log('=' .repeat(80));
}

module.exports = BaziTestSuite;