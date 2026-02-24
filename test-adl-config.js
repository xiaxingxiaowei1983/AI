// 测试ADL配置更新
const { getADLInstance } = require('./skills/adl-core');

console.log('🧪 测试ADL配置更新');
console.log('=====================================');

// 初始化ADL实例
const adl = getADLInstance();

// 获取ADL状态
const status = adl.getStatus();

console.log('📋 ADL状态:');
console.log(`   状态: ${status.config.status}`);
console.log(`   优先级: ${status.config.priority}`);
console.log(`   覆盖PCEC: ${status.config.overridePCEC}`);
console.log('');

console.log('📊 ADL统计:');
console.log(`   总回滚点: ${status.statistics.totalRollbackPoints}`);
console.log(`   活跃回滚点: ${status.statistics.activeRollbackPoints}`);
console.log(`   总违规数: ${status.statistics.totalViolations}`);
console.log('');

// 检查优先级
const priorityCheck = adl.checkPriority();
console.log(`🔍 优先级检查: ${priorityCheck ? '通过' : '失败'}`);

// 检查是否启用
const isEnabled = adl.isEnabled();
console.log(`🔍 启用检查: ${isEnabled ? '启用' : '禁用'}`);

console.log('');
console.log('✅ ADL配置更新测试完成');
console.log('=====================================');
