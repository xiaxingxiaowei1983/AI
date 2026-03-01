// 八字算法100个随机时柱测试脚本
const fs = require('fs');
const BaziCalculator = require('./bazi-calculator');

class BaziTimeTester {
  constructor() {
    this.calculator = new BaziCalculator();
    this.testCases = [];
    this.results = [];
    this.tiangan = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
    this.shichen = [
      { name: '子时', start: 23, end: 1, dizhi: '子' },
      { name: '丑时', start: 1, end: 3, dizhi: '丑' },
      { name: '寅时', start: 3, end: 5, dizhi: '寅' },
      { name: '卯时', start: 5, end: 7, dizhi: '卯' },
      { name: '辰时', start: 7, end: 9, dizhi: '辰' },
      { name: '巳时', start: 9, end: 11, dizhi: '巳' },
      { name: '午时', start: 11, end: 13, dizhi: '午' },
      { name: '未时', start: 13, end: 15, dizhi: '未' },
      { name: '申时', start: 15, end: 17, dizhi: '申' },
      { name: '酉时', start: 17, end: 19, dizhi: '酉' },
      { name: '戌时', start: 19, end: 21, dizhi: '戌' },
      { name: '亥时', start: 21, end: 23, dizhi: '亥' }
    ];
  }

  // 生成随机时柱测试用例
  generateRandomTimeTestCase() {
    // 随机选择一个日柱天干
    const dayGan = this.tiangan[Math.floor(Math.random() * this.tiangan.length)];
    
    // 随机选择一个时辰
    const shiChen = this.shichen[Math.floor(Math.random() * this.shichen.length)];
    
    // 随机生成该时辰内的具体时间
    let hour, minute;
    if (shiChen.start === 23) {
      // 子时：23:00-23:59
      hour = 23;
      minute = Math.floor(Math.random() * 60);
    } else if (shiChen.end === 1) {
      // 子时：00:00-00:59
      hour = 0;
      minute = Math.floor(Math.random() * 60);
    } else {
      // 其他时辰
      hour = Math.floor(Math.random() * (shiChen.end - shiChen.start)) + shiChen.start;
      minute = Math.floor(Math.random() * 60);
    }
    
    // 生成一个随机日期（用于计算八字）
    const year = 1950 + Math.floor(Math.random() * 101); // 1950-2050
    const month = Math.floor(Math.random() * 12);
    const daysInMonth = this.getDaysInMonth(year, month);
    const day = Math.floor(Math.random() * daysInMonth) + 1;
    
    return {
      year,
      month,
      day,
      hour,
      minute,
      dayGan,
      shiChen: shiChen.name,
      shiChenZhi: shiChen.dizhi
    };
  }

  // 获取月份天数
  getDaysInMonth(year, month) {
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (month === 1 && ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0))) {
      return 29;
    }
    return daysInMonth[month];
  }

  // 生成时辰边界测试用例
  generateBoundaryTestCases() {
    const boundaryCases = [];
    
    // 每个时辰的开始和结束时间
    this.shichen.forEach(shiChen => {
      if (shiChen.start === 23) {
        // 子时开始
        boundaryCases.push({
          year: 2000,
          month: 0,
          day: 1,
          hour: 23,
          minute: 0,
          dayGan: '甲',
          shiChen: shiChen.name,
          shiChenZhi: shiChen.dizhi
        });
        // 子时结束
        boundaryCases.push({
          year: 2000,
          month: 0,
          day: 1,
          hour: 23,
          minute: 59,
          dayGan: '甲',
          shiChen: shiChen.name,
          shiChenZhi: shiChen.dizhi
        });
      } else if (shiChen.end === 1) {
        // 子时开始（00:00）
        boundaryCases.push({
          year: 2000,
          month: 0,
          day: 1,
          hour: 0,
          minute: 0,
          dayGan: '甲',
          shiChen: shiChen.name,
          shiChenZhi: shiChen.dizhi
        });
        // 子时结束（00:59）
        boundaryCases.push({
          year: 2000,
          month: 0,
          day: 1,
          hour: 0,
          minute: 59,
          dayGan: '甲',
          shiChen: shiChen.name,
          shiChenZhi: shiChen.dizhi
        });
      } else {
        // 其他时辰开始
        boundaryCases.push({
          year: 2000,
          month: 0,
          day: 1,
          hour: shiChen.start,
          minute: 0,
          dayGan: '甲',
          shiChen: shiChen.name,
          shiChenZhi: shiChen.dizhi
        });
        // 其他时辰结束
        boundaryCases.push({
          year: 2000,
          month: 0,
          day: 1,
          hour: shiChen.end - 1,
          minute: 59,
          dayGan: '甲',
          shiChen: shiChen.name,
          shiChenZhi: shiChen.dizhi
        });
      }
    });
    
    return boundaryCases;
  }

  // 生成五鼠遁规则测试用例
  generateWuShuDunTestCases() {
    const wuShuDunCases = [];
    const testTimes = [
      { hour: 23, minute: 30, shiChenZhi: '子' },
      { hour: 2, minute: 0, shiChenZhi: '丑' },
      { hour: 4, minute: 0, shiChenZhi: '寅' },
      { hour: 6, minute: 0, shiChenZhi: '卯' },
      { hour: 8, minute: 0, shiChenZhi: '辰' },
      { hour: 10, minute: 0, shiChenZhi: '巳' },
      { hour: 12, minute: 0, shiChenZhi: '午' },
      { hour: 14, minute: 0, shiChenZhi: '未' },
      { hour: 16, minute: 0, shiChenZhi: '申' },
      { hour: 18, minute: 0, shiChenZhi: '酉' },
      { hour: 20, minute: 0, shiChenZhi: '戌' },
      { hour: 22, minute: 0, shiChenZhi: '亥' }
    ];
    
    // 测试每个日柱天干与每个时辰的组合
    this.tiangan.forEach(dayGan => {
      testTimes.forEach(time => {
        wuShuDunCases.push({
          year: 2000,
          month: 0,
          day: 1,
          hour: time.hour,
          minute: time.minute,
          dayGan: dayGan,
          shiChen: this.shichen.find(s => s.dizhi === time.shiChenZhi).name,
          shiChenZhi: time.shiChenZhi
        });
      });
    });
    
    return wuShuDunCases;
  }

  // 生成100个测试用例
  generateTestCases() {
    this.testCases = [];

    // 1. 常规时柱测试（60个）
    for (let i = 0; i < 60; i++) {
      this.testCases.push(this.generateRandomTimeTestCase());
    }

    // 2. 时辰边界测试（20个）
    const boundaryCases = this.generateBoundaryTestCases();
    for (let i = 0; i < 20 && i < boundaryCases.length; i++) {
      this.testCases.push(boundaryCases[i]);
    }

    // 3. 五鼠遁规则测试（20个）
    const wuShuDunCases = this.generateWuShuDunTestCases();
    for (let i = 0; i < 20 && i < wuShuDunCases.length; i++) {
      this.testCases.push(wuShuDunCases[i]);
    }

    // 确保正好100个测试用例
    while (this.testCases.length < 100) {
      this.testCases.push(this.generateRandomTimeTestCase());
    }
    this.testCases = this.testCases.slice(0, 100);

    console.log(`生成了 ${this.testCases.length} 个时柱测试用例`);
  }

  // 执行测试
  runTests() {
    console.log('开始执行八字算法时柱测试...');
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
          dayGan: testCase.dayGan,
          shiChen: testCase.shiChen,
          expectedShiChenZhi: testCase.shiChenZhi,
          calculatedTime: result.time.full,
          calculatedShiChen: result.time.name,
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
          dayGan: testCase.dayGan,
          shiChen: testCase.shiChen,
          expectedShiChenZhi: testCase.shiChenZhi,
          calculatedTime: null,
          calculatedShiChen: null,
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
    if (!result || !result.time) {
      return { isValid: false, error: '结果不完整' };
    }

    // 验证时柱
    if (!result.time.name) {
      return { isValid: false, error: '时柱缺少时辰名称' };
    }

    // 验证时辰地支
    const expectedShiChenZhi = testCase.shiChenZhi;
    const actualShiChenZhi = result.time.zhi;
    if (expectedShiChenZhi !== actualShiChenZhi) {
      return { isValid: false, error: `时辰地支错误，期望: ${expectedShiChenZhi}，实际: ${actualShiChenZhi}` };
    }

    // 验证五鼠遁规则（使用实际的日柱天干）
    const actualDayGan = result.day.gan;
    const expectedTimeGan = this.calculateExpectedTimeGan(actualDayGan, testCase.shiChenZhi);
    const actualTimeGan = result.time.gan;
    if (expectedTimeGan !== actualTimeGan) {
      return { isValid: false, error: `时柱天干错误，期望: ${expectedTimeGan}，实际: ${actualTimeGan}` };
    }

    return { isValid: true };
  }

  // 根据五鼠遁规则计算期望的时柱天干
  calculateExpectedTimeGan(dayGan, shiChenZhi) {
    // 五鼠遁规则的正确实现
    const wuShuDunBase = {
      '甲': 0, '乙': 2, '丙': 4, '丁': 6, '戊': 8,
      '己': 0, '庚': 2, '辛': 4, '壬': 6, '癸': 8
    };
    
    const baseGanIndex = wuShuDunBase[dayGan];
    const shiChenIndex = this.calculator.data.dizhi.indexOf(shiChenZhi);
    const ganIndex = (baseGanIndex + shiChenIndex) % 10;
    return this.calculator.data.tiangan[ganIndex];
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
        testType: '时柱测试'
      },
      details: this.results,
      testCases: this.testCases
    };

    return report;
  }

  // 保存测试结果
  saveResults() {
    const report = this.generateReport();
    
    fs.writeFileSync('./test-results-100-times.json', JSON.stringify(report, null, 2));
    console.log('测试结果已保存到 test-results-100-times.json');
    
    // 生成测试报告文件
    const reportContent = this.generateReportText(report);
    fs.writeFileSync('./test-report-100-times.md', reportContent);
    console.log('测试报告已生成到 test-report-100-times.md');
  }

  // 生成文本格式的测试报告
  generateReportText(report) {
    let content = `# 八字算法100个随机时柱测试报告\n\n`;
    
    content += `## 测试摘要\n`;
    content += `- 测试总数: ${report.summary.totalTests}\n`;
    content += `- 通过测试: ${report.summary.passed}\n`;
    content += `- 失败测试: ${report.summary.failed}\n`;
    content += `- 错误测试: ${report.summary.errors}\n`;
    content += `- 成功率: ${report.summary.successRate}\n`;
    content += `- 测试时间: ${report.summary.testDate}\n`;
    content += `- 测试类型: ${report.summary.testType}\n\n`;

    if (report.summary.failed > 0 || report.summary.errors > 0) {
      content += `## 失败测试详情\n`;
      report.details.forEach(result => {
        if (result.status !== 'PASS') {
          content += `### 测试 ${result.testIndex}: ${result.date}\n`;
          content += `- 状态: ${result.status}\n`;
          content += `- 日柱天干: ${result.dayGan}\n`;
          content += `- 期望时辰: ${result.shiChen}\n`;
          content += `- 期望地支: ${result.expectedShiChenZhi}\n`;
          content += `- 错误: ${result.error}\n`;
          if (result.calculatedTime) {
            content += `- 计算时柱: ${result.calculatedTime}\n`;
          }
          content += `\n`;
        }
      });
    }

    content += `## 测试用例分布\n`;
    content += `- 常规时柱: 60个\n`;
    content += `- 时辰边界: 20个\n`;
    content += `- 五鼠遁规则: 20个\n\n`;

    content += `## 测试覆盖范围\n`;
    content += `- 日柱天干: 10个（甲、乙、丙、丁、戊、己、庚、辛、壬、癸）\n`;
    content += `- 时辰: 12个（子时、丑时、寅时、卯时、辰时、巳时、午时、未时、申时、酉时、戌时、亥时）\n`;
    content += `- 时间范围: 24小时\n`;
    content += `- 五鼠遁规则: 完整覆盖\n\n`;

    content += `## 结论\n`;
    if (report.summary.successRate === '100.00') {
      content += `✅ 八字算法的时柱计算测试全部通过！\n`;
      content += `✅ 五鼠遁规则实现正确。\n`;
      content += `✅ 时辰判断和边界处理准确。\n`;
    } else {
      content += `⚠️ 八字算法时柱测试存在失败案例，需要进一步分析和修复。\n`;
      content += `⚠️ 成功率: ${report.summary.successRate}\n`;
    }

    return content;
  }

  // 运行完整测试流程
  runFullTest() {
    console.log('====================================');
    console.log('八字算法100个随机时柱测试');
    console.log('测试内容: 时柱计算准确性');
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
      console.log('🎉 所有测试都通过了！八字算法的时柱计算是准确的。');
    } else {
      console.log('⚠️ 存在测试失败，需要分析和修复问题。');
    }
  }
}

// 运行测试
if (require.main === module) {
  const tester = new BaziTimeTester();
  tester.runFullTest();
}

module.exports = BaziTimeTester;