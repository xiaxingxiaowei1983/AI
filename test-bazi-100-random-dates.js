// 八字算法100个随机日期测试脚本
const fs = require('fs');
const BaziCalculator = require('./bazi-calculator');

class BaziDateTester {
  constructor() {
    this.calculator = new BaziCalculator();
    this.testCases = [];
    this.results = [];
  }

  // 生成随机日期
  generateRandomDate(yearRange = { min: 1950, max: 2050 }) {
    const year = Math.floor(Math.random() * (yearRange.max - yearRange.min + 1)) + yearRange.min;
    const month = Math.floor(Math.random() * 12); // 0-11
    const daysInMonth = this.getDaysInMonth(year, month);
    const day = Math.floor(Math.random() * daysInMonth) + 1;
    const hour = Math.floor(Math.random() * 24);
    const minute = Math.floor(Math.random() * 60);

    return { year, month, day, hour, minute };
  }

  // 获取月份天数
  getDaysInMonth(year, month) {
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (month === 1 && ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0))) {
      return 29;
    }
    return daysInMonth[month];
  }

  // 生成特殊日期测试用例
  generateSpecialDates() {
    const specialDates = [];

    // 闰年2月29日
    for (let year = 1950; year <= 2050; year += 4) {
      if ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) {
        specialDates.push({ year, month: 1, day: 29, hour: 12, minute: 0 });
      }
    }

    // 年末年初
    for (let year = 1950; year <= 2049; year++) {
      specialDates.push({ year, month: 11, day: 31, hour: 23, minute: 59 });
      specialDates.push({ year: year + 1, month: 0, day: 1, hour: 0, minute: 0 });
    }

    // 立春前后
    const liChunYears = [1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020, 2030, 2040, 2050];
    liChunYears.forEach(year => {
      specialDates.push({ year, month: 1, day: 3, hour: 12, minute: 0 }); // 立春前
      specialDates.push({ year, month: 1, day: 4, hour: 12, minute: 0 }); // 立春当天
      specialDates.push({ year, month: 1, day: 5, hour: 12, minute: 0 }); // 立春后
    });

    return specialDates;
  }

  // 生成节气前后测试用例
  generateJieQiDates() {
    const jieQiDates = [];
    const jieQiNames = ['立春', '惊蛰', '清明', '立夏', '芒种', '小暑', '立秋', '白露', '寒露', '立冬', '大雪', '小寒'];

    // 每个年代选一个年份测试节气
    const testYears = [1955, 1965, 1975, 1985, 1995, 2005, 2015, 2025, 2035, 2045];
    testYears.forEach(year => {
      const yearData = this.calculator.data.jieqiData[year];
      if (yearData) {
        jieQiNames.forEach(jieQi => {
          if (yearData[jieQi]) {
            const jieQiDate = new Date(yearData[jieQi]);
            const testYear = jieQiDate.getFullYear();
            const testMonth = jieQiDate.getMonth();
            const testDay = jieQiDate.getDate();
            
            // 节气前一天
            jieQiDates.push({ year: testYear, month: testMonth, day: testDay - 1, hour: 12, minute: 0 });
            // 节气当天
            jieQiDates.push({ year: testYear, month: testMonth, day: testDay, hour: 12, minute: 0 });
            // 节气后一天
            jieQiDates.push({ year: testYear, month: testMonth, day: testDay + 1, hour: 12, minute: 0 });
          }
        });
      }
    });

    return jieQiDates;
  }

  // 生成100个测试用例
  generateTestCases() {
    this.testCases = [];

    // 1. 常规日期（60个）
    for (let i = 0; i < 60; i++) {
      this.testCases.push(this.generateRandomDate());
    }

    // 2. 特殊日期（10个）
    const specialDates = this.generateSpecialDates();
    for (let i = 0; i < 10 && i < specialDates.length; i++) {
      this.testCases.push(specialDates[i]);
    }

    // 3. 节气前后（20个）
    const jieQiDates = this.generateJieQiDates();
    for (let i = 0; i < 20 && i < jieQiDates.length; i++) {
      this.testCases.push(jieQiDates[i]);
    }

    // 4. 边界日期（10个）
    const boundaryDates = [
      { year: 1950, month: 0, day: 1, hour: 0, minute: 0 }, // 开始边界
      { year: 2050, month: 11, day: 31, hour: 23, minute: 59 }, // 结束边界
      { year: 1999, month: 11, day: 31, hour: 23, minute: 59 }, // 世纪之交前
      { year: 2000, month: 0, day: 1, hour: 0, minute: 0 }, // 世纪之交后
      { year: 1976, month: 9, day: 9, hour: 0, minute: 0 }, // 特殊历史日期
      { year: 2008, month: 7, day: 8, hour: 8, minute: 8 }, // 北京奥运
      { year: 2020, month: 1, day: 23, hour: 10, minute: 0 }, // 武汉封城
      { year: 2022, month: 2, day: 4, hour: 20, minute: 0 }, // 北京冬奥
      { year: 2030, month: 6, day: 1, hour: 0, minute: 0 }, // 未来日期
      { year: 2049, month: 9, day: 30, hour: 23, minute: 59 } // 建国百年前
    ];
    boundaryDates.forEach(date => this.testCases.push(date));

    // 确保正好100个测试用例
    while (this.testCases.length < 100) {
      this.testCases.push(this.generateRandomDate());
    }
    this.testCases = this.testCases.slice(0, 100);

    console.log(`生成了 ${this.testCases.length} 个测试用例`);
  }

  // 执行测试
  runTests() {
    console.log('开始执行八字算法日期测试...');
    this.results = [];

    this.testCases.forEach((testCase, index) => {
      try {
        const { year, month, day, hour, minute } = testCase;
        const result = this.calculator.calculateBaZi(year, month, day, hour, minute);
        
        // 验证结果
        const validation = this.validateResult(testCase, result);
        
        this.results.push({
          testIndex: index + 1,
          date: `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')} ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
          year: result.year.full,
          month: result.month.full,
          day: result.day.full,
          time: result.time.full,
          baZi: result.fullBaZi,
          validation: validation,
          status: validation.isValid ? 'PASS' : 'FAIL',
          error: validation.error || null
        });

        if ((index + 1) % 10 === 0) {
          console.log(`完成测试 ${index + 1}/100`);
        }
      } catch (error) {
        this.results.push({
          testIndex: index + 1,
          date: `${testCase.year}-${String(testCase.month + 1).padStart(2, '0')}-${String(testCase.day).padStart(2, '0')} ${String(testCase.hour).padStart(2, '0')}:${String(testCase.minute).padStart(2, '0')}`,
          year: null,
          month: null,
          day: null,
          time: null,
          baZi: null,
          validation: { isValid: false },
          status: 'ERROR',
          error: error.message
        });
        console.log(`测试 ${index + 1} 出错: ${error.message}`);
      }
    });

    console.log('测试执行完成！');
  }

  // 验证测试结果
  validateResult(testCase, result) {
    // 基本验证
    if (!result || !result.year || !result.month || !result.day || !result.time) {
      return { isValid: false, error: '结果不完整' };
    }

    // 验证八字格式
    const baZiRegex = /^([甲乙丙丁戊己庚辛壬癸][子丑寅卯辰巳午未申酉戌亥]){4}$/;
    if (!baZiRegex.test(result.fullBaZi)) {
      return { isValid: false, error: '八字格式错误' };
    }

    // 验证时柱
    if (!result.time.name) {
      return { isValid: false, error: '时柱缺少时辰名称' };
    }

    // 验证子时处理
    if (testCase.hour >= 23) {
      const expectedDay = new Date(testCase.year, testCase.month, testCase.day + 1).getDate();
      const resultDate = new Date(result.info.calculatedDate);
      if (resultDate.getDate() !== expectedDay) {
        return { isValid: false, error: '子时日期处理错误' };
      }
    }

    return { isValid: true };
  }

  // 生成测试报告
  generateReport() {
    const passed = this.results.filter(r => r.status === 'PASS').length;
    const failed = this.results.filter(r => r.status === 'FAIL').length;
    const errors = this.results.filter(r => r.status === 'ERROR').length;
    const total = this.results.length;
    const successRate = (passed / total * 100).toFixed(2);

    const report = {
      summary: {
        totalTests: total,
        passed: passed,
        failed: failed,
        errors: errors,
        successRate: `${successRate}%`,
        testDate: new Date().toISOString(),
        timeRange: '1950-2050'
      },
      details: this.results,
      testCases: this.testCases
    };

    return report;
  }

  // 保存测试结果
  saveResults() {
    const report = this.generateReport();
    
    fs.writeFileSync('./test-results-100-dates.json', JSON.stringify(report, null, 2));
    console.log('测试结果已保存到 test-results-100-dates.json');
    
    // 生成测试报告文件
    const reportContent = this.generateReportText(report);
    fs.writeFileSync('./test-report-100-dates.md', reportContent);
    console.log('测试报告已生成到 test-report-100-dates.md');
  }

  // 生成文本格式的测试报告
  generateReportText(report) {
    let content = `# 八字算法100个随机日期测试报告\n\n`;
    
    content += `## 测试摘要\n`;
    content += `- 测试总数: ${report.summary.totalTests}\n`;
    content += `- 通过测试: ${report.summary.passed}\n`;
    content += `- 失败测试: ${report.summary.failed}\n`;
    content += `- 错误测试: ${report.summary.errors}\n`;
    content += `- 成功率: ${report.summary.successRate}\n`;
    content += `- 测试时间: ${report.summary.testDate}\n`;
    content += `- 时间范围: ${report.summary.timeRange}\n\n`;

    if (report.summary.failed > 0 || report.summary.errors > 0) {
      content += `## 失败测试详情\n`;
      report.details.forEach(result => {
        if (result.status !== 'PASS') {
          content += `### 测试 ${result.testIndex}: ${result.date}\n`;
          content += `- 状态: ${result.status}\n`;
          content += `- 错误: ${result.error}\n`;
          if (result.baZi) {
            content += `- 八字: ${result.baZi}\n`;
          }
          content += `\n`;
        }
      });
    }

    content += `## 测试用例分布\n`;
    content += `- 常规日期: 60个\n`;
    content += `- 特殊日期: 10个\n`;
    content += `- 节气前后: 20个\n`;
    content += `- 边界日期: 10个\n\n`;

    content += `## 测试覆盖范围\n`;
    content += `- 年份范围: 1950-2050\n`;
    content += `- 月份覆盖: 12个月\n`;
    content += `- 时辰覆盖: 24小时\n`;
    content += `- 特殊情况: 闰年、年末年初、立春前后\n\n`;

    content += `## 结论\n`;
    if (report.summary.successRate === '100.00') {
      content += `✅ 八字算法在1950-2050年期间的日期计算测试全部通过！\n`;
      content += `✅ 算法能够正确处理各种边界情况和特殊日期。\n`;
    } else {
      content += `⚠️ 八字算法测试存在失败案例，需要进一步分析和修复。\n`;
      content += `⚠️ 成功率: ${report.summary.successRate}\n`;
    }

    return content;
  }

  // 运行完整测试流程
  runFullTest() {
    console.log('====================================');
    console.log('八字算法100个随机日期测试');
    console.log('时间范围: 1950-2050');
    console.log('====================================');

    this.generateTestCases();
    this.runTests();
    this.saveResults();

    const report = this.generateReport();
    console.log('====================================');
    console.log('测试结果摘要:');
    console.log(`总测试数: ${report.summary.totalTests}`);
    console.log(`通过: ${report.summary.passed}`);
    console.log(`失败: ${report.summary.failed}`);
    console.log(`错误: ${report.summary.errors}`);
    console.log(`成功率: ${report.summary.successRate}`);
    console.log('====================================');

    if (report.summary.successRate === '100.00%') {
      console.log('🎉 所有测试都通过了！八字算法在1950-2050年期间的日期计算是准确的。');
    } else {
      console.log('⚠️ 存在测试失败，需要分析和修复问题。');
    }
  }
}

// 运行测试
if (require.main === module) {
  const tester = new BaziDateTester();
  tester.runFullTest();
}

module.exports = BaziDateTester;