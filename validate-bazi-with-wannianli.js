// 使用万年历验证八字算法
const BaziCalculator = require('./bazi-calculator');
const fs = require('fs');

const calculator = new BaziCalculator();

// 随机生成测试日期（1950-2050年）
function generateRandomDates(count) {
  const dates = [];
  const startYear = 1950;
  const endYear = 2050;
  
  for (let i = 0; i < count; i++) {
    const year = Math.floor(Math.random() * (endYear - startYear + 1)) + startYear;
    const month = Math.floor(Math.random() * 12); // 0-based
    const day = Math.floor(Math.random() * 28) + 1; // 避免月底边界
    const hour = Math.floor(Math.random() * 24);
    const minute = Math.floor(Math.random() * 60);
    
    dates.push({
      year,
      month,
      day,
      hour,
      minute,
      desc: `${year}年${String(month + 1).padStart(2, '0')}月${String(day).padStart(2, '0')}日 ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
    });
  }
  
  return dates;
}

// 验证八字算法
function validateBazi() {
  console.log('====================================');
  console.log('八字算法万年历验证测试');
  console.log('验证网站: https://wannianrili.bmcx.com/');
  console.log('====================================\n');
  
  // 生成10个随机测试日期
  const testDates = generateRandomDates(10);
  const results = [];
  
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
      
      results.push({
        testIndex: index + 1,
        date: date.desc,
        year: result.year.full,
        month: result.month.full,
        day: result.day.full,
        time: result.time.full,
        shiChen: result.time.name,
        baZi: result.fullBaZi,
        originalDate: result.info.originalDate,
        calculatedDate: result.info.calculatedDate,
        wanNianLiUrl: wanNianLiUrl
      });
      
    } catch (error) {
      console.error(`计算出错: ${error.message}`);
      results.push({
        testIndex: index + 1,
        date: date.desc,
        error: error.message
      });
    }
    
    console.log('\n');
  });
  
  // 保存验证结果
  const validationResult = {
    date: new Date().toISOString(),
    totalTests: testDates.length,
    results: results
  };
  
  fs.writeFileSync('./validation-results-wannianli.json', JSON.stringify(validationResult, null, 2));
  console.log('验证结果已保存到 validation-results-wannianli.json');
  
  console.log('====================================');
  console.log('验证测试完成');
  console.log('请使用生成的万年历链接手动验证结果');
  console.log('====================================');
}

// 运行验证
validateBazi();
