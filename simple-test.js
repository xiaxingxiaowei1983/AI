console.log('开始运行简化测试...');

// 直接测试模块导入
const modulePath = './capabilities/hot-info-cache';
console.log(`尝试导入模块: ${modulePath}`);

try {
  const { hotInfoCache } = require(modulePath);
  console.log('模块导入成功！');
  
  // 测试基本功能
  console.log('测试基本缓存操作...');
  hotInfoCache.set('test:key', 'test:value');
  const value = hotInfoCache.get('test:key');
  console.log(`获取缓存值: ${value}`);
  
  // 测试统计信息
  const stats = hotInfoCache.getStats();
  console.log('缓存统计:', stats);
  
  console.log('✅ 简化测试完成');
} catch (error) {
  console.error('测试失败:', error);
  console.error('错误堆栈:', error.stack);
}
