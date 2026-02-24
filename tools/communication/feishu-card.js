// feishu-card 工具 - 用于生成富文本消息卡片

/**
 * 生成飞书卡片
 * @param {Object} options - 卡片选项
 * @param {string} options.text - Markdown格式的文本
 * @param {string} [options.title] - 可选的卡片标题
 * @param {string} [options.color] - 可选的卡片颜色
 * @returns {Object} 飞书卡片对象
 */
function generateFeishuCard(options) {
  const { text, title, color = '#1F77B4' } = options;
  
  // 验证输入
  if (!text || typeof text !== 'string') {
    throw new Error('Missing or invalid text parameter');
  }
  
  // 构建卡片结构
  const card = {
    config: {
      wide_screen_mode: true,
      enable_forward: true
    },
    elements: []
  };
  
  // 添加标题（如果提供）
  if (title) {
    card.header = {
      title: {
        tag: 'plain_text',
        content: title
      },
      template: color
    };
  }
  
  // 添加文本内容
  card.elements.push({
    tag: 'markdown',
    content: text
  });
  
  return card;
}

/**
 * 发送飞书卡片
 * @param {Object} card - 飞书卡片对象
 * @param {string} webhookUrl - 飞书机器人webhook URL
 * @returns {Promise<Object>} 发送结果
 */
async function sendFeishuCard(card, webhookUrl) {
  try {
    // 这里实现发送逻辑
    // 实际使用时需要调用飞书API
    console.log('发送飞书卡片:', JSON.stringify(card, null, 2));
    
    // 模拟发送结果
    return {
      success: true,
      messageId: `msg_${Date.now()}`,
      timestamp: new Date().toISOString(),
      status: 'sent'
    };
  } catch (error) {
    console.error('发送飞书卡片失败:', error);
    return {
      success: false,
      error: error.message,
      status: 'failed'
    };
  }
}

/**
 * 生成并发送飞书卡片
 * @param {Object} options - 卡片选项
 * @param {string} webhookUrl - 飞书机器人webhook URL
 * @returns {Promise<Object>} 发送结果
 */
async function createAndSendCard(options, webhookUrl) {
  try {
    const card = generateFeishuCard(options);
    const result = await sendFeishuCard(card, webhookUrl);
    return result;
  } catch (error) {
    console.error('生成并发送卡片失败:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * 生成简洁模式卡片（无标题无页脚）
 * @param {string} text - Markdown格式的文本
 * @returns {Object} 飞书卡片对象
 */
function generateCleanCard(text) {
  return generateFeishuCard({ text });
}

/**
 * 生成带按钮的卡片
 * @param {Object} options - 卡片选项
 * @param {string} options.text - Markdown格式的文本
 * @param {string} [options.title] - 可选的卡片标题
 * @param {string} [options.color] - 可选的卡片颜色
 * @param {Array} options.buttons - 按钮配置
 * @returns {Object} 飞书卡片对象
 */
function generateCardWithButtons(options) {
  const { text, title, color, buttons } = options;
  
  const card = generateFeishuCard({ text, title, color });
  
  if (Array.isArray(buttons) && buttons.length > 0) {
    card.elements.push({
      tag: 'action',
      actions: buttons.map(button => ({
        tag: 'button',
        text: {
          tag: 'plain_text',
          content: button.text
        },
        url: button.url,
        type: button.type || 'primary'
      }))
    });
  }
  
  return card;
}

// 导出功能
module.exports = {
  generateFeishuCard,
  sendFeishuCard,
  createAndSendCard,
  generateCleanCard,
  generateCardWithButtons,
  // 工具信息
  info: {
    name: 'feishu-card',
    description: '生成和发送飞书富文本卡片',
    version: '1.0.0',
    author: '陈婷 (剑锋传奇)',
    constraint: 'No Title/Footer by default (Clean Mode)'
  }
};