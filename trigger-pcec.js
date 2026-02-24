/**
 * 手动触发PCEC进化任务
 * 用于立即执行一次PCEC进化周期
 */

const { executePCEC } = require('./pcec-hourly-scheduler');

async function triggerPCECEvolution() {
  console.log('🚀 手动触发PCEC进化任务...');
  console.log('📅 当前时间:', new Date().toISOString());
  
  try {
    await executePCEC();
    console.log('✅ PCEC进化任务执行完成！');
  } catch (error) {
    console.error('❌ PCEC进化任务执行失败:', error.message);
    console.error(error.stack);
  }
}

// 执行手动触发
if (require.main === module) {
  triggerPCECEvolution();
}

module.exports = { triggerPCECEvolution };
