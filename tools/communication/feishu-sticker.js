// feishu-sticker 工具 - 用于生成和发送表情反应

// 表情缓存
const stickerCache = new Map();

/**
 * 根据情绪/意图生成表情
 * @param {string} emotion - 情绪或意图
 * @returns {Object} 表情信息
 */
function generateSticker(emotion) {
  const normalizedEmotion = emotion.toLowerCase().trim();
  
  // 验证输入
  if (!emotion || typeof emotion !== 'string') {
    throw new Error('Missing or invalid emotion parameter');
  }
  
  // 情绪到表情的映射
  const emotionMap = {
    'happy': '🎉',
    'excited': '🤩',
    'sad': '😢',
    'angry': '😠',
    'surprised': '😮',
    'confused': '🤔',
    'happy': '😊',
    'love': '❤️',
    'thankful': '🙏',
    'congratulations': '🎊',
    'goodbye': '👋',
    'hello': '👋',
    'yes': '👍',
    'no': '👎',
    'ok': '👌',
    'thinking': '🤔',
    'laughing': '😂',
    'wink': '😉',
    'cool': '😎'
  };
  
  // 查找匹配的表情
  let sticker = emotionMap[normalizedEmotion];
  
  // 如果没有精确匹配，尝试模糊匹配
  if (!sticker) {
    for (const [key, value] of Object.entries(emotionMap)) {
      if (normalizedEmotion.includes(key) || key.includes(normalizedEmotion)) {
        sticker = value;
        break;
      }
    }
  }
  
  // 默认表情
  if (!sticker) {
    sticker = '😐';
  }
  
  // 生成image_key
  const imageKey = `sticker_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  // 缓存表情
  stickerCache.set(imageKey, {
    sticker,
    emotion,
    timestamp: Date.now()
  });
  
  return {
    sticker,
    imageKey,
    emotion,
    timestamp: new Date().toISOString()
  };
}

/**
 * 发送表情
 * @param {string} sticker - 表情符号
 * @param {string} imageKey - 表情缓存键
 * @param {string} webhookUrl - 飞书机器人webhook URL
 * @returns {Promise<Object>} 发送结果
 */
async function sendSticker(sticker, imageKey, webhookUrl) {
  try {
    // 这里实现发送逻辑
    // 实际使用时需要调用飞书API
    console.log('发送表情:', {
      sticker,
      imageKey,
      timestamp: new Date().toISOString()
    });
    
    // 模拟发送结果
    return {
      success: true,
      imageKey,
      timestamp: new Date().toISOString(),
      status: 'sent'
    };
  } catch (error) {
    console.error('发送表情失败:', error);
    return {
      success: false,
      error: error.message,
      status: 'failed'
    };
  }
}

/**
 * 生成并发送表情
 * @param {string} emotion - 情绪或意图
 * @param {string} webhookUrl - 飞书机器人webhook URL
 * @returns {Promise<Object>} 发送结果
 */
async function createAndSendSticker(emotion, webhookUrl) {
  try {
    const stickerInfo = generateSticker(emotion);
    const result = await sendSticker(stickerInfo.sticker, stickerInfo.imageKey, webhookUrl);
    
    return {
      ...result,
      ...stickerInfo
    };
  } catch (error) {
    console.error('生成并发送表情失败:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * 从缓存获取表情
 * @param {string} imageKey - 表情缓存键
 * @returns {Object|null} 表情信息
 */
function getStickerFromCache(imageKey) {
  return stickerCache.get(imageKey) || null;
}

/**
 * 清理过期的表情缓存
 * @param {number} maxAge - 最大缓存时间（毫秒）
 */
function cleanupStickerCache(maxAge = 24 * 60 * 60 * 1000) { // 默认24小时
  const now = Date.now();
  
  for (const [key, value] of stickerCache.entries()) {
    if (now - value.timestamp > maxAge) {
      stickerCache.delete(key);
    }
  }
}

/**
 * 获取缓存状态
 * @returns {Object} 缓存状态
 */
function getCacheStatus() {
  return {
    size: stickerCache.size,
    oldestTimestamp: Math.min(...Array.from(stickerCache.values()).map(v => v.timestamp), Date.now()),
    newestTimestamp: Math.max(...Array.from(stickerCache.values()).map(v => v.timestamp), Date.now())
  };
}

// 定期清理缓存
setInterval(cleanupStickerCache, 60 * 60 * 1000); // 每小时清理一次

// 导出功能
module.exports = {
  generateSticker,
  sendSticker,
  createAndSendSticker,
  getStickerFromCache,
  cleanupStickerCache,
  getCacheStatus,
  // 工具信息
  info: {
    name: 'feishu-sticker',
    description: '根据情绪/意图生成和发送表情反应',
    version: '1.0.0',
    author: '陈婷 (剑锋传奇)',
    logic: 'Auto-cache image_key'
  }
};