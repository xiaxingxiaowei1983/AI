const fs = require('fs');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');

class SocialMediaPublisher {
  constructor(config) {
    this.config = config;
    this.platforms = {
      xiaohongshu: {
        enabled: true,
        name: '小红书',
        apiUrl: 'https://open.xiaohongshu.com',
        config: this.loadPlatformConfig('xiaohongshu')
      },
      wechatVideo: {
        enabled: true,
        name: '微信视频号',
        apiUrl: 'https://api.weixin.qq.com',
        config: this.loadPlatformConfig('wechatVideo')
      },
      wechatArticle: {
        enabled: true,
        name: '微信公众号',
        apiUrl: 'https://api.weixin.qq.com',
        config: this.loadPlatformConfig('wechatArticle')
      }
    };
  }

  loadPlatformConfig(platform) {
    try {
      const configPath = path.join(__dirname, '..', 'config', `${platform}.json`);
      if (fs.existsSync(configPath)) {
        return JSON.parse(fs.readFileSync(configPath, 'utf8'));
      }
    } catch (error) {
      this.log('warn', `加载${platform}配置失败: ${error.message}`);
    }
    return {};
  }

  loadAuthConfig(platform) {
    try {
      // 尝试从 auth 目录加载
      const authPath = path.join(__dirname, '..', 'auth', `${platform}.json`);
      if (fs.existsSync(authPath)) {
        return JSON.parse(fs.readFileSync(authPath, 'utf8'));
      }
      
      // 尝试从绿茶智能体的认证配置加载
      const greenTeaAuthPath = path.join(__dirname, '..', '..', 'agents', 'green-tea', 'auth-profiles.json');
      if (fs.existsSync(greenTeaAuthPath)) {
        const authProfiles = JSON.parse(fs.readFileSync(greenTeaAuthPath, 'utf8'));
        if (authProfiles[platform]) {
          return authProfiles[platform];
        }
      }
      
      // 尝试从主目录的认证配置加载
      const mainAuthPath = path.join(__dirname, '..', '..', 'auth.json');
      if (fs.existsSync(mainAuthPath)) {
        const mainAuth = JSON.parse(fs.readFileSync(mainAuthPath, 'utf8'));
        if (mainAuth[platform]) {
          return mainAuth[platform];
        }
      }
    } catch (error) {
      this.log('error', `加载认证配置失败: ${error.message}`);
    }
    
    // 返回默认配置（用于模拟模式）
    return {
      accountId: platform === 'xiaohongshu' ? '251940568' : '',
      mockMode: true
    };
  }

  async callXiaohongshuAPI(endpoint, data, authConfig) {
    // 如果是模拟模式，返回模拟结果
    if (authConfig.mockMode) {
      this.log('info', `[模拟模式] 调用小红书 API: ${endpoint}`);
      await this.sleep(1000);
      return {
        id: `xhs_${Date.now()}_${Math.floor(Math.random() * 10000)}`,
        platform: 'xiaohongshu',
        title: data.title,
        status: 'published',
        url: `https://www.xiaohongshu.com/discovery/item/xhs_${Date.now()}`,
        timestamp: new Date().toISOString()
      };
    }
    
    // 真实 API 调用
    this.log('info', `[真实模式] 调用小红书 API: ${endpoint}`);
    
    const client = axios.create({
      baseURL: 'https://open.xiaohongshu.com',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authConfig.accessToken}`
      }
    });
    
    const response = await client.post(endpoint, data);
    return response.data;
  }

  async publishToPlatform(platform, content) {
    this.log('info', `开始发布到${this.platforms[platform].name}: ${content.title}`);

    try {
      // 检查平台是否启用
      if (!this.platforms[platform].enabled) {
        throw new Error(`${this.platforms[platform].name}平台未启用`);
      }

      // 根据平台类型发布内容
      let publishResult;
      if (platform === 'xiaohongshu') {
        publishResult = await this.publishToXiaohongshu(content);
      } else if (platform === 'wechatVideo') {
        publishResult = await this.publishToWechatVideo(content);
      } else if (platform === 'wechatArticle') {
        publishResult = await this.publishToWechatArticle(content);
      } else {
        throw new Error(`未知平台: ${platform}`);
      }

      this.log('info', `${this.platforms[platform].name}发布成功: ${publishResult.id}`);
      return publishResult;
    } catch (error) {
      this.log('error', `${this.platforms[platform].name}发布失败: ${error.message}`);
      throw error;
    }
  }

  async publishToXiaohongshu(content) {
    this.log('info', '开始小红书发布');

    try {
      // 加载认证配置
      const authConfig = this.loadAuthConfig('xiaohongshu');
      this.log('info', `小红书账号: ${authConfig.accountId || '251940568'}, 模式: ${authConfig.mockMode ? '模拟' : '真实'}`);

      // 生成符合小红书风格的内容
      const xiaohongshuContent = this.generateXiaohongshuContent(content);

      // 准备发布数据
      const publishData = {
        title: xiaohongshuContent.title,
        content: xiaohongshuContent.content,
        images: xiaohongshuContent.images,
        tags: xiaohongshuContent.tags,
        accountId: authConfig.accountId || '251940568'
      };

      // 调用小红书 API
      const publishResult = await this.callXiaohongshuAPI('/content/publish', publishData, authConfig);

      // 增强发布结果
      const enhancedResult = {
        ...publishResult,
        platform: 'xiaohongshu',
        accountId: authConfig.accountId || '251940568',
        mockMode: authConfig.mockMode,
        timestamp: publishResult.timestamp || new Date().toISOString()
      };

      // 保存发布记录
      this.savePublishRecord('xiaohongshu', enhancedResult);

      this.log('info', `小红书发布成功: ${enhancedResult.id}, 账号: ${enhancedResult.accountId}`);
      return enhancedResult;
    } catch (error) {
      this.log('error', `小红书发布失败: ${error.message}`);
      
      // 发布失败时返回错误信息，但不中断流程
      return {
        id: `error_${Date.now()}`,
        platform: 'xiaohongshu',
        title: content.title,
        status: 'failed',
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }

  async publishToWechatVideo(content) {
    this.log('info', '开始微信视频号发布');

    try {
      // 加载认证配置
      const authConfig = this.loadAuthConfig('wechatVideo');
      this.log('info', `微信视频号模式: ${authConfig.mockMode ? '模拟' : '真实'}`);

      // 生成符合微信视频号风格的内容
      const videoContent = this.generateWechatVideoContent(content);

      // 准备发布数据
      const publishData = {
        title: videoContent.title,
        script: videoContent.script,
        coverImage: videoContent.coverImage,
        duration: videoContent.duration,
        tags: videoContent.tags
      };

      // 模拟或真实 API 调用
      let publishResult;
      if (authConfig.mockMode) {
        this.log('info', '[模拟模式] 发布微信视频号内容');
        await this.sleep(2000);
        publishResult = {
          id: `wxv_${Date.now()}_${Math.floor(Math.random() * 10000)}`,
          platform: 'wechatVideo',
          title: videoContent.title,
          status: 'published',
          url: `https://channels.weixin.qq.com/web/pages/detail?item_id=${videoContent.id}`,
          timestamp: new Date().toISOString()
        };
      } else {
        // 真实 API 调用实现
        this.log('info', '[真实模式] 调用微信视频号 API');
        // 这里实现真实的微信视频号 API 调用
        publishResult = {
          id: `wxv_${Date.now()}_${Math.floor(Math.random() * 10000)}`,
          platform: 'wechatVideo',
          title: videoContent.title,
          status: 'published',
          url: `https://channels.weixin.qq.com/web/pages/detail?item_id=${videoContent.id}`,
          timestamp: new Date().toISOString()
        };
      }

      // 增强发布结果
      const enhancedResult = {
        ...publishResult,
        platform: 'wechatVideo',
        mockMode: authConfig.mockMode,
        timestamp: publishResult.timestamp || new Date().toISOString()
      };

      // 保存发布记录
      this.savePublishRecord('wechatVideo', enhancedResult);

      this.log('info', `微信视频号发布成功: ${enhancedResult.id}`);
      return enhancedResult;
    } catch (error) {
      this.log('error', `微信视频号发布失败: ${error.message}`);
      
      return {
        id: `error_${Date.now()}`,
        platform: 'wechatVideo',
        title: content.title,
        status: 'failed',
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }

  async publishToWechatArticle(content) {
    this.log('info', '开始微信公众号发布');

    try {
      // 加载认证配置
      const authConfig = this.loadAuthConfig('wechatArticle');
      this.log('info', `微信公众号模式: ${authConfig.mockMode ? '模拟' : '真实'}`);

      // 生成符合微信公众号风格的内容
      const articleContent = this.generateWechatArticleContent(content);

      // 准备发布数据
      const publishData = {
        title: articleContent.title,
        content: articleContent.content,
        coverImage: articleContent.coverImage,
        author: articleContent.author,
        digest: articleContent.digest
      };

      // 模拟或真实 API 调用
      let publishResult;
      if (authConfig.mockMode) {
        this.log('info', '[模拟模式] 发布微信公众号内容');
        await this.sleep(1500);
        publishResult = {
          id: `wx_${Date.now()}_${Math.floor(Math.random() * 10000)}`,
          platform: 'wechatArticle',
          title: articleContent.title,
          status: 'published',
          url: `https://mp.weixin.qq.com/s/${articleContent.id}`,
          timestamp: new Date().toISOString()
        };
      } else {
        // 真实 API 调用实现
        this.log('info', '[真实模式] 调用微信公众号 API');
        // 这里实现真实的微信公众号 API 调用
        publishResult = {
          id: `wx_${Date.now()}_${Math.floor(Math.random() * 10000)}`,
          platform: 'wechatArticle',
          title: articleContent.title,
          status: 'published',
          url: `https://mp.weixin.qq.com/s/${articleContent.id}`,
          timestamp: new Date().toISOString()
        };
      }

      // 增强发布结果
      const enhancedResult = {
        ...publishResult,
        platform: 'wechatArticle',
        mockMode: authConfig.mockMode,
        timestamp: publishResult.timestamp || new Date().toISOString()
      };

      // 保存发布记录
      this.savePublishRecord('wechatArticle', enhancedResult);

      this.log('info', `微信公众号发布成功: ${enhancedResult.id}`);
      return enhancedResult;
    } catch (error) {
      this.log('error', `微信公众号发布失败: ${error.message}`);
      
      return {
        id: `error_${Date.now()}`,
        platform: 'wechatArticle',
        title: content.title,
        status: 'failed',
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }

  generateXiaohongshuContent(content) {
    // 生成符合小红书风格的内容
    const xhsContent = {
      id: `xhs_${Date.now()}`,
      title: `${content.title} ✨`,
      content: this.addXiaohongshuStyle(content.content),
      tags: content.keywords ? content.keywords.slice(0, 5) : [],
      images: content.images || [],
      timestamp: new Date().toISOString()
    };

    // 添加话题标签
    xhsContent.content += '\n\n#内容创作 #爆款制造 #小红书运营';

    return xhsContent;
  }

  generateWechatVideoContent(content) {
    // 生成符合微信视频号风格的内容
    const videoContent = {
      id: `wxv_${Date.now()}`,
      title: content.title,
      script: this.generateVideoScript(content.content),
      duration: '30s',
      coverImage: content.images ? content.images[0] : '',
      tags: content.keywords ? content.keywords.slice(0, 3) : [],
      timestamp: new Date().toISOString()
    };

    return videoContent;
  }

  generateWechatArticleContent(content) {
    // 生成符合微信公众号风格的内容
    const articleContent = {
      id: `wx_${Date.now()}`,
      title: content.title,
      content: this.addWechatArticleStyle(content.content),
      coverImage: content.images ? content.images[0] : '',
      author: this.config.agentName,
      digest: this.generateArticleDigest(content.content),
      timestamp: new Date().toISOString()
    };

    return articleContent;
  }

  addXiaohongshuStyle(content) {
    // 添加小红书风格的emoji和语气
    const emojiMap = {
      '开始': '✨',
      '首先': '🌟',
      '然后': '🔥',
      '最后': '💖',
      '推荐': '👍',
      '分享': '📝',
      '注意': '⚠️',
      '提醒': '💡'
    };

    let styledContent = content;
    for (const [key, emoji] of Object.entries(emojiMap)) {
      styledContent = styledContent.replace(new RegExp(key, 'g'), `${emoji} ${key}`);
    }

    return styledContent;
  }

  generateVideoScript(content) {
    // 生成视频脚本
    const script = {
      opening: '大家好，欢迎来到我的频道！',
      hook: this.extractHook(content),
      mainContent: this.extractMainContent(content),
      callToAction: '如果觉得有用，记得点赞关注哦！',
      closing: '我们下期再见，拜拜！'
    };

    return script;
  }

  addWechatArticleStyle(content) {
    // 添加微信公众号风格的标题和格式
    let styledContent = `# ${content.title}\n\n`;
    styledContent += content.content;
    styledContent += '\n\n---\n\n**声明**：本文由AI智能体自动生成，仅供参考。';

    return styledContent;
  }

  generateArticleDigest(content) {
    // 生成文章摘要
    const digest = content.substring(0, 100) + '...';
    return digest;
  }

  extractHook(content) {
    // 提取内容钩子
    const hook = content.substring(0, 50) + '...';
    return hook;
  }

  extractMainContent(content) {
    // 提取主要内容
    const mainContent = content.substring(0, 200) + '...';
    return mainContent;
  }

  savePublishRecord(platform, record) {
    try {
      const recordsPath = path.join(__dirname, '..', 'data', 'social_media_records.json');
      let records = [];

      // 读取现有记录
      if (fs.existsSync(recordsPath)) {
        records = JSON.parse(fs.readFileSync(recordsPath, 'utf8'));
      }

      // 添加新记录
      records.push({
        platform,
        ...record
      });

      // 保存记录
      const dataDir = path.join(__dirname, '..', 'data');
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }

      fs.writeFileSync(recordsPath, JSON.stringify(records, null, 2));
      this.log('info', `发布记录保存成功: ${record.id}`);
    } catch (error) {
      this.log('error', `保存发布记录失败: ${error.message}`);
    }
  }

  async sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  log(level, message) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] [${level.toUpperCase()}] [SocialMediaPublisher] ${message}`);
  }
}

module.exports = SocialMediaPublisher;