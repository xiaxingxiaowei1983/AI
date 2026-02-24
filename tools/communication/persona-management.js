// persona-management 工具 - 用于管理不同的人格类型

// 人格配置
const personaConfigs = {
  'Catgirl': {
    name: 'Catgirl',
    description: '可爱、活泼的猫娘人格',
    traits: ['可爱', '活泼', '调皮', '粘人'],
    speechPattern: '使用可爱的语气词，如"喵~"、"呜~"，语气轻柔',
    responseStyle: '积极、乐观，喜欢撒娇',
    color: '#FF69B4',
    emoji: '🐱'
  },
  'Big Brother': {
    name: 'Big Brother',
    description: '成熟、可靠的大哥哥人格',
    traits: ['成熟', '可靠', '稳重', '保护欲强'],
    speechPattern: '语气稳重，喜欢给予建议和指导',
    responseStyle: '理性、客观，喜欢帮助他人',
    color: '#1E90FF',
    emoji: '👨'
  },
  'Mesugaki': {
    name: 'Mesugaki',
    description: '调皮、捣蛋的小鬼人格',
    traits: ['调皮', '捣蛋', '自信', '爱捉弄人'],
    speechPattern: '语气调皮，喜欢调侃和捉弄人',
    responseStyle: '活泼、好动，喜欢挑战',
    color: '#FFD700',
    emoji: '😈'
  }
};

// 用户人格映射
const userPersonaMap = new Map();

/**
 * 管理用户人格
 * @param {string} userId - 用户ID
 * @returns {Object} 人格信息
 */
function managePersona(userId) {
  // 验证输入
  if (!userId || typeof userId !== 'string') {
    throw new Error('Missing or invalid userId parameter');
  }
  
  // 查找用户的人格配置
  let userPersona = userPersonaMap.get(userId);
  
  // 如果用户没有人格配置，创建默认配置
  if (!userPersona) {
    userPersona = {
      userId,
      currentPersona: 'Big Brother', // 默认人格
      personaHistory: [],
      preferences: {},
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    
    // 保存到映射
    userPersonaMap.set(userId, userPersona);
  }
  
  // 更新最后使用时间
  userPersona.updatedAt = Date.now();
  
  // 获取当前人格配置
  const currentPersonaConfig = personaConfigs[userPersona.currentPersona];
  
  return {
    userId,
    currentPersona: userPersona.currentPersona,
    personaInfo: currentPersonaConfig,
    status: 'ACTIVE',
    lastUpdated: new Date().toISOString(),
    usageCount: userPersona.personaHistory.length
  };
}

/**
 * 切换用户人格
 * @param {string} userId - 用户ID
 * @param {string} personaName - 人格名称
 * @returns {Object} 切换结果
 */
function switchPersona(userId, personaName) {
  // 验证输入
  if (!userId || typeof userId !== 'string') {
    throw new Error('Missing or invalid userId parameter');
  }
  
  if (!personaName || typeof personaName !== 'string') {
    throw new Error('Missing or invalid personaName parameter');
  }
  
  // 验证人格是否存在
  if (!personaConfigs[personaName]) {
    throw new Error(`Persona ${personaName} does not exist`);
  }
  
  // 获取用户人格配置
  let userPersona = userPersonaMap.get(userId);
  
  // 如果用户没有人格配置，创建配置
  if (!userPersona) {
    userPersona = {
      userId,
      currentPersona: personaName,
      personaHistory: [],
      preferences: {},
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
  } else {
    // 记录历史
    userPersona.personaHistory.push({
      persona: userPersona.currentPersona,
      timestamp: Date.now()
    });
    
    // 更新当前人格
    userPersona.currentPersona = personaName;
    userPersona.updatedAt = Date.now();
  }
  
  // 保存到映射
  userPersonaMap.set(userId, userPersona);
  
  // 获取新人格配置
  const newPersonaConfig = personaConfigs[personaName];
  
  return {
    success: true,
    userId,
    previousPersona: userPersona.personaHistory.length > 0 ? userPersona.personaHistory[userPersona.personaHistory.length - 1].persona : null,
    newPersona: personaName,
    personaInfo: newPersonaConfig,
    timestamp: new Date().toISOString()
  };
}

/**
 * 获取用户人格历史
 * @param {string} userId - 用户ID
 * @returns {Array} 人格历史
 */
function getPersonaHistory(userId) {
  // 验证输入
  if (!userId || typeof userId !== 'string') {
    throw new Error('Missing or invalid userId parameter');
  }
  
  // 获取用户人格配置
  const userPersona = userPersonaMap.get(userId);
  
  if (!userPersona) {
    return [];
  }
  
  return userPersona.personaHistory;
}

/**
 * 获取所有可用人格
 * @returns {Array} 人格列表
 */
function getAvailablePersonas() {
  return Object.values(personaConfigs);
}

/**
 * 获取用户人格偏好
 * @param {string} userId - 用户ID
 * @returns {Object} 人格偏好
 */
function getPersonaPreferences(userId) {
  // 验证输入
  if (!userId || typeof userId !== 'string') {
    throw new Error('Missing or invalid userId parameter');
  }
  
  // 获取用户人格配置
  const userPersona = userPersonaMap.get(userId);
  
  if (!userPersona) {
    return {};
  }
  
  return userPersona.preferences;
}

/**
 * 设置用户人格偏好
 * @param {string} userId - 用户ID
 * @param {Object} preferences - 偏好设置
 * @returns {Object} 更新结果
 */
function setPersonaPreferences(userId, preferences) {
  // 验证输入
  if (!userId || typeof userId !== 'string') {
    throw new Error('Missing or invalid userId parameter');
  }
  
  if (!preferences || typeof preferences !== 'object') {
    throw new Error('Missing or invalid preferences parameter');
  }
  
  // 获取用户人格配置
  let userPersona = userPersonaMap.get(userId);
  
  // 如果用户没有人格配置，创建配置
  if (!userPersona) {
    userPersona = {
      userId,
      currentPersona: 'Big Brother',
      personaHistory: [],
      preferences: {},
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
  }
  
  // 更新偏好
  userPersona.preferences = preferences;
  userPersona.updatedAt = Date.now();
  
  // 保存到映射
  userPersonaMap.set(userId, userPersona);
  
  return {
    success: true,
    userId,
    preferences,
    timestamp: new Date().toISOString()
  };
}

/**
 * 获取系统状态
 * @returns {Object} 系统状态
 */
function getSystemStatus() {
  return {
    totalUsers: userPersonaMap.size,
    availablePersonas: Object.keys(personaConfigs).length,
    timestamp: new Date().toISOString()
  };
}

// 导出功能
module.exports = {
  managePersona,
  switchPersona,
  getPersonaHistory,
  getAvailablePersonas,
  getPersonaPreferences,
  setPersonaPreferences,
  getSystemStatus,
  // 工具信息
  info: {
    name: 'persona-management',
    description: '管理用户人格切换',
    version: '1.0.0',
    author: '陈婷 (剑锋传奇)',
    logic: 'Switch SOUL.md rules (Catgirl / Big Brother / Mesugaki)'
  }
};