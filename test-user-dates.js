// 测试用户提供的具体日期
const BaziCalculator = require('./bazi-calculator');

const calculator = new BaziCalculator();

// 用户提供的测试日期
const testDates = [
  { year: 1984, month: 2, day: 30, hour: 23, minute: 0, desc: '1984年03月30日 23:00' },
  { year: 1981, month: 11, day: 24, hour: 8, minute: 0, desc: '1981年12月24日 08:00' }
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
    
  } catch (error) {
    console.error(`计算出错: ${error.message}`);
  }
  
  console.log('\n');
});

console.log('====================================');
console.log('测试完成');
console.log('====================================');
