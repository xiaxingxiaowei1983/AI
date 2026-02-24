console.log('开始导入热点信息缓存模块...');
try {
  const { hotInfoCache } = require('./capabilities/hot-info-cache');
  console.log('导入成功！');

  async function testHotCache() {
    console.log('🧪 测试热点信息缓存系统\n');
  
  // 测试1: 基本缓存操作
  console.log('1. 测试基本缓存操作');
  hotInfoCache.set('test:key1', 'test:value1');
  const value1 = hotInfoCache.get('test:key1');
  console.log(`获取缓存值: ${value1}`);
  console.log(`缓存是否存在: ${hotInfoCache.has('test:key1')}`);
  
  // 测试2: 缓存命中和未命中
  console.log('\n2. 测试缓存命中和未命中');
  for (let i = 0; i < 5; i++) {
    hotInfoCache.get('test:key1'); // 命中
    hotInfoCache.get('test:non-existent'); // 未命中
  }
  
  // 测试3: 缓存统计
  console.log('\n3. 测试缓存统计');
  const stats = hotInfoCache.getStats();
  console.log('缓存统计:', stats);
  
  // 测试4: 热点项目
  console.log('\n4. 测试热点项目');
  const hotItems = hotInfoCache.getHotItems(5);
  console.log('热点项目:', hotItems);
  
  // 测试5: PCEC相关缓存
  console.log('\n5. 测试PCEC相关缓存');
  const pcecStatus = hotInfoCache.get('pcec:status');
  console.log('PCEC状态:', pcecStatus);
  
  const lastEvolution = hotInfoCache.get('pcec:lastEvolution');
  console.log('上次进化结果:', lastEvolution ? '存在' : '不存在');
  
  // 测试6: 批量操作
  console.log('\n6. 测试批量操作');
  const batchData = {
    'batch:key1': 'batch:value1',
    'batch:key2': 'batch:value2',
    'batch:key3': 'batch:value3'
  };
  hotInfoCache.setBatch(batchData);
  const batchResults = hotInfoCache.getBatch(['batch:key1', 'batch:key2', 'batch:key3']);
  console.log('批量获取结果:', batchResults);
  
  // 测试7: 性能测试
  console.log('\n7. 测试性能');
  const startTime = Date.now();
  const iterations = 1000;
  
  for (let i = 0; i < iterations; i++) {
    hotInfoCache.set(`perf:key${i}`, `perf:value${i}`);
    hotInfoCache.get(`perf:key${i}`);
  }
  
  const endTime = Date.now();
  const duration = endTime - startTime;
  console.log(`执行 ${iterations} 次操作耗时: ${duration}ms`);
  console.log(`平均每次操作耗时: ${(duration / iterations).toFixed(3)}ms`);
  
  // 测试8: 缓存过期
  console.log('\n8. 测试缓存过期');
  hotInfoCache.set('test:expiring', 'test:value', { ttl: 1000 });
  console.log('设置过期缓存后:', hotInfoCache.get('test:expiring'));
  
  // 等待过期
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  console.log('缓存过期后:', hotInfoCache.get('test:expiring'));
  
  console.log('\n✅ 热点信息缓存系统测试完成');
  }

  testHotCache().catch(error => {
    console.error('测试失败:', error);
  });
} catch (error) {
  console.error('导入模块失败:', error);
}
