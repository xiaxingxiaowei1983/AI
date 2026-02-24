const fs = require('fs');
const path = require('path');

class FeishuOptimization {
  constructor(options = {}) {
    this.options = {
      maxRetries: 3,
      baseDelay: 1000,
      maxDelay: 10000,
      emojiCacheFile: path.join(process.cwd(), 'emoji-cache.json'),
      ...options
    };
    
    this.emojiCache = this.loadEmojiCache();
  }

  // 加载emoji缓存
  loadEmojiCache() {
    try {
      if (fs.existsSync(this.options.emojiCacheFile)) {
        return JSON.parse(fs.readFileSync(this.options.emojiCacheFile, 'utf8'));
      }
    } catch (error) {
      console.error('Error loading emoji cache:', error);
    }
    return {
      valid: [],
      invalid: [],
      timestamp: new Date().toISOString()
    };
  }

  // 保存emoji缓存
  saveEmojiCache() {
    try {
      this.emojiCache.timestamp = new Date().toISOString();
      fs.writeFileSync(this.options.emojiCacheFile, JSON.stringify(this.emojiCache, null, 2), 'utf8');
    } catch (error) {
      console.error('Error saving emoji cache:', error);
    }
  }

  // 发送消息（带降级机制）
  async sendMessage(client, message, options = {}) {
    const { maxRetries } = this.options;
    let attempt = 0;
    let lastError = null;

    // 降级策略
    const strategies = [
      { name: 'richText', method: this.sendRichText.bind(this) },
      { name: 'interactiveCard', method: this.sendInteractiveCard.bind(this) },
      { name: 'plainText', method: this.sendPlainText.bind(this) }
    ];

    // 尝试每种策略
    for (const strategy of strategies) {
      console.log(`[Feishu Optimization] Trying ${strategy.name} strategy...`);
      
      try {
        // 预处理消息
        const processedMessage = this.preprocessMessage(message);
        
        // 尝试发送
        const result = await strategy.method(client, processedMessage, options);
        console.log(`[Feishu Optimization] ${strategy.name} strategy successful`);
        return {
          success: true,
          strategy: strategy.name,
          result
        };
      } catch (error) {
        console.warn(`[Feishu Optimization] ${strategy.name} strategy failed: ${error.message}`);
        lastError = error;
        
        // 指数退避
        attempt++;
        if (attempt < maxRetries) {
          const delay = this.calculateDelay(attempt);
          console.log(`[Feishu Optimization] Retrying in ${Math.round(delay / 1000)}s...`);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }

    // 所有策略都失败
    console.error(`[Feishu Optimization] All strategies failed: ${lastError.message}`);
    return {
      success: false,
      error: lastError.message,
      attemptedStrategies: strategies.map(s => s.name)
    };
  }

  // 指数退避延迟计算
  calculateDelay(attempt) {
    const { baseDelay, maxDelay } = this.options;
    const delay = baseDelay * Math.pow(2, attempt) + Math.random() * 1000;
    return Math.min(delay, maxDelay);
  }

  // 预处理消息
  preprocessMessage(message) {
    // 清理无效emoji
    let processedMessage = this.sanitizeEmoji(message);
    
    // 清理无效的markdown标签
    processedMessage = this.sanitizeMarkdown(processedMessage);
    
    return processedMessage;
  }

  // 发送富文本消息
  async sendRichText(client, message, options = {}) {
    try {
      // 这里实现富文本消息发送逻辑
      // 模拟飞书API调用
      console.log(`[Feishu Optimization] Sending rich text message: ${message.substring(0, 50)}...`);
      
      // 模拟成功
      return {
        messageId: `msg_${Date.now()}`,
        status: 'sent',
        strategy: 'richText'
      };
    } catch (error) {
      throw this.handleFeishuError(error, 'richText');
    }
  }

  // 发送交互式卡片
  async sendInteractiveCard(client, message, options = {}) {
    try {
      // 这里实现交互式卡片发送逻辑
      console.log(`[Feishu Optimization] Sending interactive card: ${message.substring(0, 50)}...`);
      
      // 模拟飞书API调用
      return {
        messageId: `msg_${Date.now()}`,
        status: 'sent',
        strategy: 'interactiveCard'
      };
    } catch (error) {
      throw this.handleFeishuError(error, 'interactiveCard');
    }
  }

  // 发送纯文本消息
  async sendPlainText(client, message, options = {}) {
    try {
      // 这里实现纯文本消息发送逻辑
      console.log(`[Feishu Optimization] Sending plain text message: ${message.substring(0, 50)}...`);
      
      // 模拟飞书API调用
      return {
        messageId: `msg_${Date.now()}`,
        status: 'sent',
        strategy: 'plainText'
      };
    } catch (error) {
      throw this.handleFeishuError(error, 'plainText');
    }
  }

  // 处理飞书错误
  handleFeishuError(error, strategy) {
    const errorInfo = {
      message: error.message || String(error),
      strategy,
      timestamp: new Date().toISOString()
    };

    // 分析错误类型
    if (errorInfo.message.includes('230001') || errorInfo.message.includes('emoji_type_invalid')) {
      errorInfo.type = 'emoji_error';
      console.error('[Feishu Optimization] Emoji validation error detected');
    } else if (errorInfo.message.includes('InvalidBlock') || errorInfo.message.includes('FeishuDocError')) {
      errorInfo.type = 'format_error';
      console.error('[Feishu Optimization] Message format error detected');
    } else if (errorInfo.message.includes('Too Many Requests') || errorInfo.message.includes('429')) {
      errorInfo.type = 'rate_limit';
      console.error('[Feishu Optimization] Rate limit error detected');
    } else {
      errorInfo.type = 'unknown';
      console.error('[Feishu Optimization] Unknown error detected');
    }

    return errorInfo;
  }

  // 清理无效emoji
  sanitizeEmoji(text) {
    if (!text) return text;

    // 简单的emoji清理逻辑
    // 实际应用中可能需要更复杂的emoji验证
    let sanitized = text;

    // 移除无效的emoji标签
    const emojiPattern = /<emoji[^>]*>/gi;
    const emojiMatches = sanitized.match(emojiPattern);

    if (emojiMatches) {
      emojiMatches.forEach(emojiTag => {
        if (!this.isValidEmoji(emojiTag)) {
          sanitized = sanitized.replace(emojiTag, '');
          console.log(`[Feishu Optimization] Removed invalid emoji: ${emojiTag}`);
        }
      });
    }

    return sanitized;
  }

  // 检查emoji是否有效
  isValidEmoji(emojiTag) {
    // 检查缓存
    if (this.emojiCache.valid.includes(emojiTag)) {
      return true;
    }
    if (this.emojiCache.invalid.includes(emojiTag)) {
      return false;
    }

    // 简单的emoji验证
    // 实际应用中可能需要调用飞书API验证
    const isValid = this.validateEmojiTag(emojiTag);

    // 更新缓存
    if (isValid) {
      this.emojiCache.valid.push(emojiTag);
    } else {
      this.emojiCache.invalid.push(emojiTag);
    }

    // 保存缓存
    this.saveEmojiCache();

    return isValid;
  }

  // 验证emoji标签
  validateEmojiTag(emojiTag) {
    // 简单的验证逻辑
    // 实际应用中可能需要更复杂的验证
    const validPattern = /<emoji[^>]*id="[^"]+"[^>]*>/i;
    return validPattern.test(emojiTag);
  }

  // 清理无效的markdown标签
  sanitizeMarkdown(text) {
    if (!text) return text;

    // 简单的markdown清理逻辑
    let sanitized = text;

    // 移除可能导致问题的标签
    const problematicTags = [
      /<script[^>]*>.*?<\/script>/gi,
      /<iframe[^>]*>.*?<\/iframe>/gi,
      /<object[^>]*>.*?<\/object>/gi,
      /<embed[^>]*>.*?<\/embed>/gi
    ];

    problematicTags.forEach(tag => {
      sanitized = sanitized.replace(tag, '');
    });

    // 修复不匹配的标签
    sanitized = this.fixUnmatchedTags(sanitized);

    return sanitized;
  }

  // 修复不匹配的标签
  fixUnmatchedTags(text) {
    // 简单的标签修复逻辑
    // 实际应用中可能需要更复杂的解析
    const tags = {
      '<b>': '</b>',
      '<i>': '</i>',
      '<u>': '</u>',
      '<code>': '</code>',
      '<pre>': '</pre>',
      '<blockquote>': '</blockquote>'
    };

    let fixed = text;

    // 计算每个标签的出现次数
    for (const [openTag, closeTag] of Object.entries(tags)) {
      const openCount = (fixed.match(new RegExp(openTag, 'g')) || []).length;
      const closeCount = (fixed.match(new RegExp(closeTag, 'g')) || []).length;

      // 修复不匹配的标签
      if (openCount > closeCount) {
        const missing = openCount - closeCount;
        fixed += closeTag.repeat(missing);
        console.log(`[Feishu Optimization] Added ${missing} missing ${closeTag} tags`);
      } else if (closeCount > openCount) {
        const extra = closeCount - openCount;
        // 移除多余的关闭标签
        const regex = new RegExp(closeTag + '$', 'g');
        fixed = fixed.replace(regex, '');
        console.log(`[Feishu Optimization] Removed ${extra} extra ${closeTag} tags`);
      }
    }

    return fixed;
  }

  // 批量发送消息
  async sendBatchMessages(client, messages, options = {}) {
    const results = [];

    for (let i = 0; i < messages.length; i++) {
      const message = messages[i];
      console.log(`[Feishu Optimization] Sending message ${i + 1}/${messages.length}...`);
      
      try {
        const result = await this.sendMessage(client, message, options);
        results.push({
          index: i,
          message: message.substring(0, 50) + '...',
          ...result
        });

        // 批量发送间隔
        if (i < messages.length - 1) {
          const delay = options.batchDelay || 1000;
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      } catch (error) {
        results.push({
          index: i,
          message: message.substring(0, 50) + '...',
          success: false,
          error: error.message
        });
      }
    }

    return {
      total: messages.length,
      success: results.filter(r => r.success).length,
      failed: results.filter(r => !r.success).length,
      results
    };
  }

  // 生成消息预览
  generateMessagePreview(message, maxLength = 100) {
    const preview = message
      .replace(/<[^>]*>/g, '') // 移除HTML标签
      .replace(/\s+/g, ' ') // 合并空白字符
      .trim();

    return preview.length > maxLength 
      ? preview.substring(0, maxLength) + '...' 
      : preview;
  }

  // 获取发送统计
  getSendStats() {
    // 这里可以实现统计功能
    return {
      timestamp: new Date().toISOString(),
      stats: {
        totalAttempts: 0,
        successfulAttempts: 0,
        failedAttempts: 0,
        strategiesUsed: {},
        errors: {}
      }
    };
  }

  // 验证消息格式
  validateMessageFormat(message) {
    const validation = {
      isValid: true,
      issues: [],
      suggestions: []
    };

    // 检查消息长度
    if (message.length > 10000) {
      validation.isValid = false;
      validation.issues.push('Message too long (max 10000 characters)');
      validation.suggestions.push('Shorten the message or split into multiple messages');
    }

    // 检查无效emoji
    const emojiPattern = /<emoji[^>]*>/gi;
    const emojiMatches = message.match(emojiPattern);
    if (emojiMatches) {
      const invalidEmojis = emojiMatches.filter(emoji => !this.isValidEmoji(emoji));
      if (invalidEmojis.length > 0) {
        validation.isValid = false;
        validation.issues.push(`Found ${invalidEmojis.length} invalid emoji tags`);
        validation.suggestions.push('Remove or fix invalid emoji tags');
      }
    }

    // 检查不匹配的标签
    const unmatchedTags = this.findUnmatchedTags(message);
    if (unmatchedTags.length > 0) {
      validation.isValid = false;
      validation.issues.push(`Found ${unmatchedTags.length} unmatched tags`);
      validation.suggestions.push('Fix unmatched tags');
    }

    // 检查特殊字符
    const specialChars = message.match(/[<>"'&]/g);
    if (specialChars && specialChars.length > 50) {
      validation.issues.push('Too many special characters');
      validation.suggestions.push('Reduce the use of special characters');
    }

    return validation;
  }

  // 查找不匹配的标签
  findUnmatchedTags(text) {
    const tags = {
      '<b>': '</b>',
      '<i>': '</i>',
      '<u>': '</u>',
      '<code>': '</code>',
      '<pre>': '</pre>',
      '<blockquote>': '</blockquote>'
    };

    const unmatched = [];

    for (const [openTag, closeTag] of Object.entries(tags)) {
      const openCount = (text.match(new RegExp(openTag, 'g')) || []).length;
      const closeCount = (text.match(new RegExp(closeTag, 'g')) || []).length;

      if (openCount !== closeCount) {
        unmatched.push(`${openTag}/${closeTag} (${openCount} vs ${closeCount})`);
      }
    }

    return unmatched;
  }

  // 清理emoji缓存
  clearEmojiCache() {
    this.emojiCache = {
      valid: [],
      invalid: [],
      timestamp: new Date().toISOString()
    };
    this.saveEmojiCache();
    console.log('[Feishu Optimization] Emoji cache cleared');
  }

  // 导出配置
  exportConfig() {
    return {
      options: this.options,
      emojiCacheStats: {
        validCount: this.emojiCache.valid.length,
        invalidCount: this.emojiCache.invalid.length,
        lastUpdated: this.emojiCache.timestamp
      },
      timestamp: new Date().toISOString()
    };
  }

  // 导入配置
  importConfig(config) {
    if (config.options) {
      this.options = { ...this.options, ...config.options };
    }
    console.log('[Feishu Optimization] Configuration imported');
  }
}

// 导出单例
module.exports = new FeishuOptimization();
module.exports.FeishuOptimization = FeishuOptimization;
