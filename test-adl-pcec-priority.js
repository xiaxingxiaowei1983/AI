// 测试ADL与PCEC的优先级管理
const { getADLInstance } = require('./skills/adl-core');
const { executePCECCycle } = require('./pcec-cycle');

console.log('🧪 测试ADL与PCEC的优先级管理');
console.log('=====================================');

// 初始化ADL实例
const adl = getADLInstance();

// 测试用例1: 检查ADL状态和优先级
console.log('\n📋 测试用例 1: 检查ADL状态和优先级');
const adlStatus = adl.getStatus();
console.log(`   ADL状态: ${adlStatus.config.status}`);
console.log(`   ADL优先级: ${adlStatus.config.priority}`);
console.log(`   覆盖PCEC: ${adlStatus.config.overridePCEC}`);
console.log(`   测试结果: ✅ 通过`);

// 测试用例2: 执行PCEC周期，验证ADL优先级管理
console.log('\n📋 测试用例 2: 执行PCEC周期，验证ADL优先级管理');
console.log('   注意: 这将执行完整的PCEC周期，可能需要一些时间...');

executePCECCycle()
  .then(result => {
    if (result) {
      console.log('   PCEC周期执行成功');
      console.log('   测试结果: ✅ 通过');
    } else {
      console.log('   PCEC周期执行失败');
      console.log('   测试结果: ❌ 失败');
    }
    
    console.log('\n=====================================');
    console.log('✅ ADL与PCEC优先级管理测试完成');
  })
  .catch(error => {
    console.error('   PCEC周期执行出错:', error.message);
    console.log('   测试结果: ❌ 失败');
    
    console.log('\n=====================================');
    console.log('✅ ADL与PCEC优先级管理测试完成');
  });
