// 测试新的八字排盘算法
const BaziCalculator = require('./bazi-calculator');

// 创建计算器实例
const calculator = new BaziCalculator();

// 测试函数
function testBaZi(year, month, day, hour, minute, expected) {
  console.log(`\n=== 测试八字排盘 ===`);
  console.log(`输入: ${year}-${month + 1}-${day} ${hour}:${minute}`);
  
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
    
    // 验证结果
    if (expected) {
      const status = result.baZi.join(' ') === expected.join(' ') ? '✓ 正确' : '✗ 错误';
      console.log(`\n=== 验证结果 ===`);
      console.log(`${status}`);
      if (result.baZi.join(' ') !== expected.join(' ')) {
        console.log(`期望: ${expected.join(' ')}`);
        console.log(`实际: ${result.baZi.join(' ')}`);
      }
    }
    
    return result;
  } catch (error) {
    console.error('计算错误:', error);
    return null;
  }
}

console.log('=== 八字排盘算法测试 ===');
console.log('使用新的模块化实现');
console.log('====================');

// 测试案例
const testCases = [
  {
    input: [1983, 4, 20, 0, 30],
    expected: ['癸亥', '丁巳', '戊申', '壬子']
  },
  {
    input: [2011, 2, 20, 7, 30],
    expected: ['辛卯', '辛卯', '甲戌', '戊辰']
  },
  {
    input: [1985, 4, 31, 4, 30],
    expected: ['乙丑', '辛巳', '庚午', '戊寅']
  },
  {
    input: [1982, 9, 21, 7, 15],
    expected: ['壬戌', '庚戌', '丁丑', '甲辰']
  },
  {
    input: [1988, 10, 7, 4, 0],
    expected: ['戊辰', '壬戌', '丙寅', '庚寅']
  },
  {
    input: [1994, 10, 21, 23, 10],
    expected: ['甲戌', '乙亥', '辛亥', '戊子']
  }
];

// 运行测试
console.log('\n=== 运行测试案例 ===');
testCases.forEach((testCase, index) => {
  console.log(`\n测试 ${index + 1}: ${testCase.input[0]}-${testCase.input[1] + 1}-${testCase.input[2]} ${testCase.input[3]}:${testCase.input[4]}`);
  testBaZi(...testCase.input, testCase.expected);
});

// 测试性能
console.log('\n=== 性能测试 ===');
const startTime = Date.now();

// 连续计算100次
for (let i = 0; i < 100; i++) {
  const year = 1980 + (i % 40);
  const month = i % 12;
  const day = 1 + (i % 28);
  const hour = i % 24;
  const minute = i % 60;
  calculator.calculateBaZi(year, month, day, hour, minute);
}

const endTime = Date.now();
const duration = endTime - startTime;
console.log(`计算100次耗时: ${duration}ms`);
console.log(`平均每次耗时: ${duration / 100}ms`);

// 测试缓存
console.log('\n=== 缓存测试 ===');
console.log(`初始缓存大小: ${calculator.cache.size}`);

// 计算相同的日期
const result1 = calculator.calculateBaZi(1983, 4, 20, 0, 30);
const result2 = calculator.calculateBaZi(1983, 4, 20, 0, 30);

console.log(`计算后缓存大小: ${calculator.cache.size}`);
console.log(`两次计算结果相同: ${JSON.stringify(result1) === JSON.stringify(result2)}`);

// 清除缓存
calculator.clearCache();
console.log(`清除后缓存大小: ${calculator.cache.size}`);

console.log('\n=== 测试完成 ===');
console.log('请使用万年历网站验证结果: https://wannianrili.bmcx.com/');
