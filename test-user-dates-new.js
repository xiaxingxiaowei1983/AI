// 测试用户提供的具体日期
const BaziCalculator = require('./bazi-calculator');

const calculator = new BaziCalculator();

// 用户提供的测试日期
const testDates = [
  { year: 1990, month: 6, day: 4, hour: 8, minute: 4, desc: '1990年07月04日 08:04' },
  { year: 2009, month: 0, day: 26, hour: 17, minute: 11, desc: '2009年01月26日 17:11' }
];

console.log('====================================');
console.log('测试用户提供的具体日期八字计算');
console.log('====================================\n');

testDates.forEach((date, index) => {
  console.log(`测试 ${index + 1}: ${date.desc}`);
  console.log('------------------------------------');
  
  try {
    const result = calculator.calculateBaZi(date.year, date.month, date.day, date.hour, date.minute);
    
    console.log(`年柱: ${result.year.full}`);
    console.log(`月柱: ${result.month.full}`);
    console.log(`日柱: ${result.day.full}`);
    console.log(`时柱: ${result.time.full} (${result.time.name})`);
    console.log(`八字: ${result.fullBaZi}`);
    console.log(`原日期: ${result.info.originalDate}`);
    console.log(`计算日期: ${result.info.calculatedDate}`);
    
    // 生成万年历查询链接
    const wanNianLiUrl = `https://wannianrili.bmcx.com/${date.year}-${String(date.month + 1).padStart(2, '0')}-${String(date.day).padStart(2, '0')}`;
    console.log(`万年历查询: ${wanNianLiUrl}`);
    
  } catch (error) {
    console.error(`计算出错: ${error.message}`);
  }
  
  console.log('\n');
});

console.log('====================================');
console.log('测试完成');
console.log('====================================');
