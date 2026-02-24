/**
 * 启动COO智能体（@大掌柜）
 * 用于单独启动COO智能体，确保其正常运行
 */

const { execSync } = require('child_process');
const path = require('path');

function startCOOAgent() {
  console.log('🚀 启动COO智能体（@大掌柜）...');
  console.log('📅 当前时间:', new Date().toISOString());
  
  try {
    // 检查智能体目录是否存在
    const cooDir = path.join(__dirname, 'agents', 'coo');
    console.log('📁 智能体目录:', cooDir);
    
    // 启动COO智能体
    console.log('📋 启动COO智能体...');
    
    // 使用公司大脑核心模块启动智能体
    const command = `node -e "
      const { startAgent } = require('./company-brain-core');
      console.log('启动COO智能体...');
      startAgent('coo').then(() => {
        console.log('COO智能体启动成功！');
      }).catch((error) => {
        console.error('COO智能体启动失败:', error.message);
        process.exit(1);
      });
    "`;
    
    const output = execSync(command, { stdio: 'inherit', encoding: 'utf8' });
    console.log('✅ COO智能体（@大掌柜）启动完成！');
    
  } catch (error) {
    console.error('❌ 启动COO智能体失败:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// 执行启动
if (require.main === module) {
  startCOOAgent();
}

module.exports = { startCOOAgent };
