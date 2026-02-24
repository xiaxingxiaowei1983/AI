/**
 * 启动大宗师智能体（@大掌柜）
 * 用于单独启动大宗师智能体，确保其正常运行
 */

const { execSync } = require('child_process');
const path = require('path');

function startMasterAgent() {
  console.log('🚀 启动大宗师智能体（@大掌柜）...');
  console.log('📅 当前时间:', new Date().toISOString());
  
  try {
    // 检查智能体目录是否存在
    const masterDir = path.join(__dirname, 'agents', 'master');
    console.log('📁 智能体目录:', masterDir);
    
    // 启动大宗师智能体
    console.log('👑 启动大宗师智能体...');
    
    // 使用公司大脑核心模块启动智能体
    const command = `node -e "
      const { startAgent } = require('./company-brain-core');
      console.log('启动大宗师智能体...');
      startAgent('master').then(() => {
        console.log('大宗师智能体启动成功！');
      }).catch((error) => {
        console.error('大宗师智能体启动失败:', error.message);
        process.exit(1);
      });
    "`;
    
    const output = execSync(command, { stdio: 'inherit', encoding: 'utf8' });
    console.log('✅ 大宗师智能体启动完成！');
    
  } catch (error) {
    console.error('❌ 启动大宗师智能体失败:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// 执行启动
if (require.main === module) {
  startMasterAgent();
}

module.exports = { startMasterAgent };
