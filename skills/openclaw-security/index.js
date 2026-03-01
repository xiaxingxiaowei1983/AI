console.log('🚀 OpenClaw Security Upgrade - 初始化');
console.log('=====================================\n');

// 初始化命令拦截器
console.log('\n📦 初始化命令拦截器...');
const { DANGEROUS_COMMANDS } = require('./command-guard');
console.log(`拦截命令: ${Object.keys(DANGEROUS_COMMANDS).join(', ')}`);

// 初始化持久化防护
console.log('📦 初始化持久化防护...');
const { initialize } = require('./persistent-guard');
const initResult = initialize();
if (initResult.success) {
  console.log('✅ 持久化防护已启用');
}

// 加载模型锁定配置
console.log('\n📦 加载模型锁定配置...');
const modelLockConfig = require('./model-lock.json');
console.log(`允许模型: ${modelLockConfig.lockPolicy.allowedModels.join(', ')}`);
console.log(`管理员数: ${modelLockConfig.unlockPolicy.adminUsers.length}`);

// 初始化安全钩子
console.log('\n📦 初始化安全钩子...');
const { SENSITIVE_TOOLS } = require('./security-hooks');
console.log(`敏感工具数: ${Object.keys(SENSITIVE_TOOLS).length}`);

console.log('\n=====================================');
console.log('✅ 安全升级初始化完成');

module.exports = {
  version: '1.0.0',
  modules: ['command-guard', 'guard', 'auditor', 'security-hooks', 'persistent-guard']
};
