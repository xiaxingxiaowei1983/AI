// 清理测试文件，只测试热点信息缓存系统
console.log('=== 开始清理测试热点信息缓存系统 ===\n');

const { hotInfoCache } = require('./capabilities/hot-info-cache');

console.log('1. 测试基本缓存操作');
hotInfoCache.set('test:key1', 'test:value1');
const value1 = hotInfoCache.get('test:key1');
console.log(`获取缓存值: ${value1}`);
console.log(`缓存是否存在: ${hotInfoCache.has('test:key1')}`);

console.log('\n2. 测试缓存统计');
const stats = hotInfoCache.getStats();
console.log('缓存统计:', stats);

console.log('\n3. 测试热点项目');
const hotItems = hotInfoCache.getHotItems(5);
console.log('热点项目:', hotItems);

console.log('\n=== 测试完成 ===');
