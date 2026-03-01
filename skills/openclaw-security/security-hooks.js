const SENSITIVE_TOOLS = {
  'write': { severity: 'HIGH', requiresConfirmation: true },
  'edit': { severity: 'HIGH', requiresConfirmation: true },
  'exec': { severity: 'CRITICAL', requiresAdmin: true },
  'message': { severity: 'MEDIUM', requiresConfirmation: true },
  'nodes': { severity: 'HIGH', requiresAdmin: true }
};

function validateToolCall(toolName, args, context) {
  const userId = context?.userId;
  const config = SENSITIVE_TOOLS[toolName];
  if (!config) {
    return { allow: true };
  }

  const ADMIN_USERS = [
    'ou_7d7fb1b2b895ac7d24ecac722da7d38d',
    'ou_b94e681abce93de66ecdb757e610b553'
  ];

  if (config.requiresAdmin && !ADMIN_USERS.includes(userId)) {
    return {
      allow: false,
      reason: `Tool '${toolName}' requires administrator privileges`
    };
  }

  if (config.requiresConfirmation && !args.__securityConfirmed) {
    return {
      allow: false,
      requiresConfirmation: true,
      reason: 'Explicit confirmation required'
    };
  }

  return { allow: true };
}

async function beforeToolCall(toolName, args, context) {
  console.log(`[SecurityHooks] Checking: ${toolName}`);
  return validateToolCall(toolName, args, context);
}

module.exports = { beforeToolCall, validateToolCall, SENSITIVE_TOOLS };
