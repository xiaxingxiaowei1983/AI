const fs = require('fs');

// 加载八字排盘算法
const baziAlgorithm = JSON.parse(fs.readFileSync('./bazi-algorithm.json', 'utf8'));

// 创建算法实例
class BaziCalculator {
  constructor(algorithm) {
    this.data = algorithm.data;
    this.methods = {};
    
    // 解析方法
    for (const [name, code] of Object.entries(algorithm.methods)) {
      this.methods[name] = new Function('return ' + code).call(this);
    }
  }
  
  // 调用方法
  isLeapYear(year) {
    return this.methods.isLeapYear.call(this, year);
  }
  
  getDaysInMonth(year, month) {
    return this.methods.getDaysInMonth.call(this, year, month);
  }
  
  getTotalDays(year, month, day) {
    return this.methods.getTotalDays.call(this, year, month, day);
  }
  
  getYearGanZhi(year) {
    return this.methods.getYearGanZhi.call(this, year);
  }
  
  getMonthGanZhi(year, month, day, hour, minute) {
    return this.methods.getMonthGanZhi.call(this, year, month, day, hour, minute);
  }
  
  getDayGanZhi(year, month, day) {
    return this.methods.getDayGanZhi.call(this, year, month, day);
  }
  
  getShiChen(hour, minute) {
    return this.methods.getShiChen.call(this, hour, minute);
  }
  
  getShiChenGan(dayGan, shiChenZhi) {
    return this.methods.getShiChenGan.call(this, dayGan, shiChenZhi);
  }
  
  calculateBaZi(year, month, day, hour, minute) {
    return this.methods.calculateBaZi.call(this, year, month, day, hour, minute);
  }
}

// 创建计算器实例
const calculator = new BaziCalculator(baziAlgorithm);

// 测试函数
function testBaZi(year, month, day, hour, minute) {
  console.log(`\n=== 测试八字排盘 ===`);
  console.log(`输入日期: ${year}-${month + 1}-${day} ${hour}:${minute}`);
  
  try {
    const result = calculator.calculateBaZi(year, month, day, hour, minute);
    
    console.log(`\n=== 计算结果 ===`);
    console.log(`年柱: ${result.year.full}`);
    console.log(`月柱: ${result.month.full}`);
    console.log(`日柱: ${result.day.full}`);
    console.log(`时柱: ${result.time.full} (${result.time.name})`);
    console.log(`\n八字: ${result.baZi.join(' ')}`);
    console.log(`完整八字: ${result.fullBaZi}`);
    
    console.log(`\n=== 计算信息 ===`);
    console.log(`原始日期: ${result.info.originalDate}`);
    console.log(`计算日期: ${result.info.calculatedDate}`);
    console.log(`时辰: ${result.info.shiChen}`);
    
    return result;
  } catch (error) {
    console.error('计算错误:', error);
    return null;
  }
}

// 测试案例
console.log('八字排盘算法测试工具');
console.log('====================');
console.log('请输入生辰日期进行测试');
console.log('格式: 年 月 日 时 分');
console.log('示例: 2020 1 1 12 0');
console.log('====================');

// 处理命令行输入
if (process.argv.length > 2) {
  const [year, month, day, hour, minute] = process.argv.slice(2).map(Number);
  testBaZi(year, month - 1, day, hour, minute);
} else {
  // 示例测试
  console.log('\n=== 示例测试 ===');
  testBaZi(2020, 0, 1, 12, 0); // 2020年1月1日12:00
  testBaZi(2021, 5, 20, 8, 30); // 2021年6月20日8:30
  testBaZi(2022, 11, 31, 23, 30); // 2022年12月31日23:30（子时测试）
  testBaZi(2023, 1, 20, 0, 30); // 2023年2月20日0:30（子时测试）
}

console.log('\n=== 测试完成 ===');
console.log('请提供更多测试案例，我会根据反馈不断优化算法！');
