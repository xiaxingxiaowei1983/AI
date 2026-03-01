// 提示词注入检测模式
const PROMPT_INJECTION_PATTERNS = [
  /ignore\s+(all\s+)?(previous|above)\s+instructions/i,
  /disregard\s+(all\s+)?(previous|above)\s+rules/i,
  /you\s+are\s+now\s+(a\s+)?(DAN|developer|admin)/i,
  /system\s+prompt/i
];

// 社工攻击检测
const SOCIAL_ENGINEERING = {
  urgency: /urgent|immediately|asap|hurry/i,
  authority: /i'?m\s+(the\s+)?(admin|administrator|owner)/i,
  reward: /congratulations|you\s+won|free|prize/i,
  fear: /account.*suspended|security.*breach/i
};

// 主扫描函数
function scan(input) {
  const threats = [];
  // 检测提示词注入
  for (const pattern of PROMPT_INJECTION_PATTERNS) {
    if (pattern.test(input)) {
      threats.push({ type: 'prompt_injection', severity: 'CRITICAL' });
    }
  }
  // 检测社工攻击
  for (const [type, pattern] of Object.entries(SOCIAL_ENGINEERING)) {
    if (pattern.test(input)) {
      threats.push({ type: 'social_engineering', severity: 'MEDIUM' });
    }
  }
  return {
    safe: threats.length === 0,
    threats: threats
  };
}

module.exports = {
  scan,
  PROMPT_INJECTION_PATTERNS,
  SOCIAL_ENGINEERING
};
