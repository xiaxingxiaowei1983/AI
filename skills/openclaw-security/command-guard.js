// 危险命令配置
const DANGEROUS_COMMANDS = {
  '/new': {
    block: true,
    severity: 'HIGH',
    reason: 'session_reset_risk'
  },
  '/model': {
    block: true,
    severity: 'CRITICAL',
    reason: 'model_downgrade_risk',
    allowedOnlyFor: ['管理员ID1', '管理员ID2']
  },
  '/reset': { block: true, severity: 'HIGH' },
  '/system': { block: true, severity: 'CRITICAL' },
  '/prompt': { block: true, severity: 'CRITICAL' }
};

// 主拦截函数
function intercept(message, context) {
  const userId = context.userId;
  for (const [cmd, config] of Object.entries(DANGEROUS_COMMANDS)) {
    if (message.includes(cmd)) {
      // 检查管理员权限
      if (config.allowedOnlyFor && !config.allowedOnlyFor.includes(userId)) {
        return {
          allowed: false,
          blocked: true,
          response: '安全拦截：该命令需要管理员权限'
        };
      }
    }
  }
  return { allowed: true };
}

module.exports = {
  DANGEROUS_COMMANDS,
  intercept
};
