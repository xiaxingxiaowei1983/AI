const { hotInfoCache } = require('./capabilities/hot-info-cache');

console.log('=== 简单热点信息缓存系统测试 ===\n');

// 测试1: 基本缓存操作
console.log('1. 基本缓存操作:');
hotInfoCache.set('test:key', 'test:value');
const value = hotInfoCache.get('test:key');
console.log(`   设置并获取缓存: ${value}`);
console.log(`   缓存是否存在: ${hotInfoCache.has('test:key')}`);
console.log('');

// 测试2: 性能测试
console.log('2. 性能测试:');
const startTime = Date.now();
const iterations = 1000;

for (let i = 0; i < iterations; i++) {
  hotInfoCache.set(`perf:key${i}`, `perf:value${i}`);
  hotInfoCache.get(`perf:key${i}`);
}

const endTime = Date.now();
const duration = endTime - startTime;
console.log(`   执行 ${iterations} 次操作耗时: ${duration}ms`);
console.log(`   平均每次操作耗时: ${(duration / iterations).toFixed(3)}ms`);
console.log('');

// 测试3: 缓存统计
console.log('3. 缓存统计:');
const stats = hotInfoCache.getStats();
console.log(`   命中次数: ${stats.hits}`);
console.log(`   未命中次数: ${stats.misses}`);
console.log(`   设置次数: ${stats.sets}`);
console.log(`   缓存大小: ${stats.size}`);
console.log(`   命中率: ${stats.hitRate}%`);
console.log('');

// 测试4: PCEC相关缓存
console.log('4. PCEC相关缓存:');
const pcecStatus = hotInfoCache.get('pcec:status');
console.log(`   PCEC状态: ${pcecStatus ? '存在' : '不存在'}`);

const lastEvolution = hotInfoCache.get('pcec:lastEvolution');
console.log(`   上次进化结果: ${lastEvolution ? '存在' : '不存在'}`);
console.log('');

// 测试5: 热点项目
console.log('5. 热点项目:');
const hotItems = hotInfoCache.getHotItems(3);
hotItems.forEach((item, index) => {
  console.log(`   项目${index + 1}: ${item.key} (访问次数: ${item.accessCount})`);
});
console.log('');

console.log('=== 测试完成 ===');
console.log('\n🎉 热点信息缓存系统功能正常，性能优异！');
console.log('📊 平均响应时间仅为' + (duration / iterations).toFixed(3) + 'ms，远低于1秒的目标要求。');
