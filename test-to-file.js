const { hotInfoCache } = require('./capabilities/hot-info-cache');
const fs = require('fs');

async function testHotCacheToFile() {
  const results = [];
  results.push('=== 热点信息缓存系统测试结果 ===\n');
  
  // 测试1: 基本缓存操作
  results.push('1. 基本缓存操作:');
  hotInfoCache.set('test:key1', 'test:value1');
  const value1 = hotInfoCache.get('test:key1');
  results.push(`   - 获取缓存值: ${value1}`);
  results.push(`   - 缓存是否存在: ${hotInfoCache.has('test:key1')}`);
  results.push('');
  
  // 测试2: 缓存命中和未命中
  results.push('2. 缓存命中和未命中:');
  for (let i = 0; i < 5; i++) {
    hotInfoCache.get('test:key1'); // 命中
    hotInfoCache.get('test:non-existent'); // 未命中
  }
  results.push('   - 执行5次命中和5次未命中操作');
  results.push('');
  
  // 测试3: 缓存统计
  results.push('3. 缓存统计:');
  const stats = hotInfoCache.getStats();
  results.push(`   - 命中次数: ${stats.hits}`);
  results.push(`   - 未命中次数: ${stats.misses}`);
  results.push(`   - 设置次数: ${stats.sets}`);
  results.push(`   - 删除次数: ${stats.deletes}`);
  results.push(`   - 缓存大小: ${stats.size}`);
  results.push(`   - 热点项目数: ${stats.hotItems}`);
  results.push(`   - 命中率: ${stats.hitRate}%`);
  results.push('');
  
  // 测试4: 热点项目
  results.push('4. 热点项目:');
  const hotItems = hotInfoCache.getHotItems(5);
  hotItems.forEach((item, index) => {
    results.push(`   - 项目${index + 1}: ${item.key} (访问次数: ${item.accessCount})`);
  });
  results.push('');
  
  // 测试5: PCEC相关缓存
  results.push('5. PCEC相关缓存:');
  const pcecStatus = hotInfoCache.get('pcec:status');
  results.push(`   - PCEC状态: ${pcecStatus ? '存在' : '不存在'}`);
  
  const lastEvolution = hotInfoCache.get('pcec:lastEvolution');
  results.push(`   - 上次进化结果: ${lastEvolution ? '存在' : '不存在'}`);
  results.push('');
  
  // 测试6: 批量操作
  results.push('6. 批量操作:');
  const batchData = {
    'batch:key1': 'batch:value1',
    'batch:key2': 'batch:value2',
    'batch:key3': 'batch:value3'
  };
  hotInfoCache.setBatch(batchData);
  const batchResults = hotInfoCache.getBatch(['batch:key1', 'batch:key2', 'batch:key3']);
  results.push(`   - 批量设置完成: ${Object.keys(batchData).length}项`);
  results.push(`   - 批量获取结果: ${Object.keys(batchResults).length}项`);
  results.push('');
  
  // 测试7: 性能测试
  results.push('7. 性能测试:');
  const startTime = Date.now();
  const iterations = 1000;
  
  for (let i = 0; i < iterations; i++) {
    hotInfoCache.set(`perf:key${i}`, `perf:value${i}`);
    hotInfoCache.get(`perf:key${i}`);
  }
  
  const endTime = Date.now();
  const duration = endTime - startTime;
  results.push(`   - 执行 ${iterations} 次操作耗时: ${duration}ms`);
  results.push(`   - 平均每次操作耗时: ${(duration / iterations).toFixed(3)}ms`);
  results.push('');
  
  // 测试8: 缓存过期
  results.push('8. 缓存过期:');
  hotInfoCache.set('test:expiring', 'test:value', { ttl: 1000 });
  results.push(`   - 设置过期缓存后: ${hotInfoCache.get('test:expiring')}`);
  
  // 等待过期
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const expiredValue = hotInfoCache.get('test:expiring');
  results.push(`   - 缓存过期后: ${expiredValue || 'undefined (已过期)'}`);
  results.push('');
  
  results.push('=== 测试完成 ===');
  
  // 输出到文件
  const output = results.join('\n');
  fs.writeFileSync('test-results.log', output);
  
  console.log('✅ 测试完成，结果已输出到 test-results.log');
  console.log('📊 关键性能指标:');
  console.log(`   - 执行 ${iterations} 次操作耗时: ${duration}ms`);
  console.log(`   - 平均每次操作耗时: ${(duration / iterations).toFixed(3)}ms`);
  console.log(`   - 命中率: ${stats.hitRate}%`);
  
  return output;
}

testHotCacheToFile().catch(error => {
  console.error('测试失败:', error);
  fs.writeFileSync('test-results.log', `测试失败: ${error.message}`);
});
