// 八字排盘算法研究 - 日柱计算

// 天干地支表
const TIANGAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const DIZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

// 六十甲子表
const LIU_SHI_JIA_ZI = [];
for (let i = 0; i < 60; i++) {
  const gan = TIANGAN[i % 10];
  const zhi = DIZHI[i % 12];
  LIU_SHI_JIA_ZI.push(gan + zhi);
}

// 方法1: 基于1900年1月1日的基准计算
function getDayGanZhi1(year, month, day) {
  const baseDate = new Date('1900-01-01');
  const targetDate = new Date(year, month, day);
  const diffTime = targetDate - baseDate;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const baseIndex = 36; // 1900-01-01 是 庚子
  const index = (baseIndex + diffDays) % 60;
  const ganZhi = LIU_SHI_JIA_ZI[index < 0 ? index + 60 : index];
  return {
    gan: ganZhi[0],
    zhi: ganZhi[1],
    full: ganZhi
  };
}

// 方法2: 基于更精确的基准日期
function getDayGanZhi2(year, month, day) {
  // 1970-01-01 是 己酉
  const baseDate = new Date('1970-01-01');
  const targetDate = new Date(year, month, day);
  const diffTime = targetDate - baseDate;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const baseIndex = 44; // 1970-01-01 是 己酉
  const index = (baseIndex + diffDays) % 60;
  const ganZhi = LIU_SHI_JIA_ZI[index < 0 ? index + 60 : index];
  return {
    gan: ganZhi[0],
    zhi: ganZhi[1],
    full: ganZhi
  };
}

// 方法3: 基于格里高利历法的精确计算
function getDayGanZhi3(year, month, day) {
  // 计算从公元1年1月1日到目标日期的天数
  let days = 0;
  
  // 计算完整年份的天数
  for (let y = 1; y < year; y++) {
    if ((y % 4 === 0 && y % 100 !== 0) || y % 400 === 0) {
      days += 366;
    } else {
      days += 365;
    }
  }
  
  // 计算当年到目标月份的天数
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  for (let m = 0; m < month; m++) {
    days += daysInMonth[m];
  }
  
  // 处理闰年2月
  if (month > 1 && ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0)) {
    days += 1;
  }
  
  // 加上目标日期的天数
  days += day - 1;
  
  // 公元1年1月1日是辛酉
  const baseIndex = 57;
  const index = (baseIndex + days) % 60;
  const ganZhi = LIU_SHI_JIA_ZI[index < 0 ? index + 60 : index];
  return {
    gan: ganZhi[0],
    zhi: ganZhi[1],
    full: ganZhi
  };
}

// 测试已知的准确日期
const testCases = [
  { year: 1983, month: 4, day: 20, expected: '戊申' }, // 1983-05-20
  { year: 2011, month: 2, day: 20, expected: '甲戌' }, // 2011-03-20
  { year: 1985, month: 4, day: 31, expected: '庚午' }, // 1985-05-31
  { year: 1982, month: 9, day: 21, expected: '丁丑' }, // 1982-10-21
  { year: 1988, month: 10, day: 7, expected: '丙寅' }, // 1988-11-07
  { year: 1994, month: 10, day: 22, expected: '辛亥' }  // 1994-11-22
];

console.log('=== 日柱计算算法测试 ===');
console.log('测试案例:');
testCases.forEach(testCase => {
  console.log(`${testCase.year}-${testCase.month + 1}-${testCase.day} 期望: ${testCase.expected}`);
});

console.log('\n方法1 (基于1900-01-01):');
testCases.forEach(testCase => {
  const result = getDayGanZhi1(testCase.year, testCase.month, testCase.day);
  const status = result.full === testCase.expected ? '✓' : '✗';
  console.log(`${status} ${testCase.year}-${testCase.month + 1}-${testCase.day}: ${result.full} (期望: ${testCase.expected})`);
});

console.log('\n方法2 (基于1970-01-01):');
testCases.forEach(testCase => {
  const result = getDayGanZhi2(testCase.year, testCase.month, testCase.day);
  const status = result.full === testCase.expected ? '✓' : '✗';
  console.log(`${status} ${testCase.year}-${testCase.month + 1}-${testCase.day}: ${result.full} (期望: ${testCase.expected})`);
});

console.log('\n方法3 (基于公元1年1月1日):');
testCases.forEach(testCase => {
  const result = getDayGanZhi3(testCase.year, testCase.month, testCase.day);
  const status = result.full === testCase.expected ? '✓' : '✗';
  console.log(`${status} ${testCase.year}-${testCase.month + 1}-${testCase.day}: ${result.full} (期望: ${testCase.expected})`);
});

console.log('\n=== 测试完成 ===');
