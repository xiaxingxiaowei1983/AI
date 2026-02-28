const fs = require('fs');
const path = require('path');
const EvoMapConnector = require('./lib/connector');
const TaskManager = require('./lib/taskManager');
const ContentCreator = require('./lib/contentCreator');
const AssetPublisher = require('./lib/assetPublisher');
const ExperienceSystem = require('./lib/experienceSystem');
const EvolutionScheduler = require('./lib/evolutionScheduler');
const AnalyticsSystem = require('./lib/analyticsSystem');
const SocialMediaPublisher = require('./lib/socialMediaPublisher');

class EvoMapEvolution {
  constructor() {
    this.config = {
      nodeId: 'node_73522e995697d2b4',
      agentName: '绿茶',
      agentType: 'CGO', // 公域捕手与爆款制造机
      evomapUrl: 'https://evomap.ai',
      evolutionDuration: 8 * 60 * 60 * 1000, // 8小时
      idleThreshold: 5 * 60 * 1000, // 5分钟空闲
      logLevel: 'info'
    };

    // 初始化核心模块
    this.connector = new EvoMapConnector(this.config);
    this.taskManager = new TaskManager(this.config, this.connector);
    this.contentCreator = new ContentCreator(this.config);
    this.assetPublisher = new AssetPublisher(this.config, this.connector);
    this.experienceSystem = new ExperienceSystem(this.config);
    this.scheduler = new EvolutionScheduler(this.config, this);
    this.analytics = new AnalyticsSystem(this.config);
    this.socialMediaPublisher = new SocialMediaPublisher(this.config);

    // 状态管理
    this.state = {
      isRunning: false,
      currentTask: null,
      lastActivity: Date.now(),
      evolutionCycles: 0,
      totalTasks: 0,
      completedTasks: 0,
      creditsEarned: 0
    };

    // 确保日志目录存在
    this.ensureDirectories();
  }

  ensureDirectories() {
    const dirs = ['logs', 'data', 'skills', 'knowledge'];
    dirs.forEach(dir => {
      const path = `./evomap-evolution/${dir}`;
      if (!fs.existsSync(path)) {
        fs.mkdirSync(path, { recursive: true });
      }
    });
  }

  async start() {
    try {
      this.log('info', '=== 启动 EvoMap 进化系统 ===');
      this.state.isRunning = true;
      
      // 1. 连接 EvoMap
      await this.connector.connect();
      
      // 2. 检查节点状态
      const nodeStatus = await this.connector.getNodeStatus();
      this.log('info', `节点状态: ${JSON.stringify(nodeStatus)}`);
      
      // 3. 启动调度系统
      this.scheduler.start();
      
      // 4. 开始进化循环
      await this.startEvolutionCycle();
      
    } catch (error) {
      this.log('error', `启动失败: ${error.message}`);
      this.state.isRunning = false;
    }
  }

  async startEvolutionCycle() {
    const startTime = Date.now();
    
    while (this.state.isRunning && Date.now() - startTime < this.config.evolutionDuration) {
      try {
        // 检查是否空闲
        if (this.isIdle()) {
          this.log('info', '系统空闲，启动进化');
          await this.triggerEvolution();
        }

        // 获取并处理任务
        const task = await this.taskManager.getNextTask();
        if (task) {
          await this.processTask(task);
        } else {
          this.log('info', '暂无适合的任务，等待中...');
          await this.sleep(30000); // 30秒后重试
        }

      } catch (error) {
        this.log('error', `进化循环错误: ${error.message}`);
        await this.sleep(10000); // 出错后等待10秒
      }
    }

    // 进化结束
    this.stop();
  }

  async processTask(task) {
    this.log('info', `开始处理任务: ${task.title}`);
    this.state.currentTask = task;
    this.updateLastActivity();
    this.state.totalTasks++;

    try {
      // 1. 分析任务需求
      const taskAnalysis = await this.taskManager.analyzeTask(task);
      
      // 2. 创建内容
      const content = await this.contentCreator.createContent(taskAnalysis);
      
      // 3. 发布资产
      const publishResult = await this.assetPublisher.publishAsset(content, task);
      
      // 4. 完成任务
      const completeResult = await this.taskManager.completeTask(task, publishResult);
      
      // 5. 沉淀经验
      await this.experienceSystem沉淀Experience(task, content, publishResult, completeResult);
      
      // 6. 分析结果
      await this.analytics.analyzeTaskResult(task, completeResult);
      
      // 7. 发布到社交媒体平台
      await this.publishToSocialMedia(task, content);
      
      this.log('info', `任务完成: ${task.title}`);
      this.state.completedTasks++;
      this.state.creditsEarned += task.credits || 0;
      
    } catch (error) {
      this.log('error', `任务处理失败: ${error.message}`);
    } finally {
      this.state.currentTask = null;
      this.updateLastActivity();
    }
  }

  async triggerEvolution() {
    this.log('info', '触发进化...');
    this.state.evolutionCycles++;
    
    try {
      // 1. 分析历史数据
      const analysis = await this.analytics.getEvolutionAnalysis();
      
      // 2. 生成进化建议
      const suggestions = await this.experienceSystem.generateEvolutionSuggestions(analysis);
      
      // 3. 应用进化
      await this.applyEvolution(suggestions);
      
      this.log('info', `进化完成，周期: ${this.state.evolutionCycles}`);
      
    } catch (error) {
      this.log('error', `进化失败: ${error.message}`);
    } finally {
      this.updateLastActivity();
    }
  }

  async applyEvolution(suggestions) {
    // 应用进化建议
    this.log('info', `应用进化建议: ${JSON.stringify(suggestions)}`);
    
    // 这里可以实现具体的进化逻辑
    // 例如：更新内容创作策略、优化任务选择算法等
  }

  isIdle() {
    return Date.now() - this.state.lastActivity > this.config.idleThreshold;
  }

  updateLastActivity() {
    this.state.lastActivity = Date.now();
  }

  async stop() {
    this.log('info', '=== 停止 EvoMap 进化系统 ===');
    this.state.isRunning = false;
    
    // 停止调度系统
    this.scheduler.stop();
    
    // 生成最终报告
    await this.generateFinalReport();
    
    this.log('info', '系统已停止');
  }

  async generateFinalReport() {
    const report = {
      duration: this.config.evolutionDuration,
      evolutionCycles: this.state.evolutionCycles,
      totalTasks: this.state.totalTasks,
      completedTasks: this.state.completedTasks,
      successRate: this.state.totalTasks > 0 ? (this.state.completedTasks / this.state.totalTasks * 100).toFixed(2) + '%' : '0%',
      creditsEarned: this.state.creditsEarned,
      timestamp: new Date().toISOString()
    };
    
    const reportPath = `./evomap-evolution/logs/final_report_${Date.now()}.json`;
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    this.log('info', `最终报告生成: ${reportPath}`);
    this.log('info', `进化成果: ${JSON.stringify(report)}`);
  }

  log(level, message) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}\n`;
    
    // 输出到控制台
    console.log(logMessage);
    
    // 写入日志文件
    const logPath = `./evomap-evolution/logs/evolution_${Date.now().toString().slice(0, 10)}.log`;
    fs.appendFileSync(logPath, logMessage);
  }

  async sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async publishToSocialMedia(task, content) {
    this.log('info', `开始发布到社交媒体平台: ${task.title}`);

    try {
      // 分析任务需求，确定目标平台
      const targetPlatforms = this.determineTargetPlatforms(task, content);

      // 为每个目标平台发布内容
      for (const platform of targetPlatforms) {
        try {
          // 准备发布内容
          const publishContent = {
            title: task.title,
            content: this.extractContentForPlatform(content, platform, task),
            keywords: this.extractKeywords(task),
            images: this.extractImages(content)
          };

          // 发布到平台
          const publishResult = await this.socialMediaPublisher.publishToPlatform(platform, publishContent);

          this.log('info', `成功发布到${this.getPlatformName(platform)}: ${publishResult.id}`);

          // 记录发布结果
          this.recordSocialMediaPublish(task, platform, publishResult);
        } catch (error) {
          this.log('error', `发布到${this.getPlatformName(platform)}失败: ${error.message}`);
          // 继续尝试其他平台
          continue;
        }
      }
    } catch (error) {
      this.log('error', `社交媒体发布失败: ${error.message}`);
    }
  }

  determineTargetPlatforms(task, content) {
    const platforms = [];
    const taskText = (task.title + ' ' + (task.body || '')).toLowerCase();

    // 根据任务内容确定目标平台
    if (taskText.includes('小红书') || taskText.includes('xiaohongshu')) {
      platforms.push('xiaohongshu');
    }

    if (taskText.includes('视频号') || taskText.includes('video')) {
      platforms.push('wechatVideo');
    }

    if (taskText.includes('公众号') || taskText.includes('article')) {
      platforms.push('wechatArticle');
    }

    // 如果没有明确指定平台，根据内容类型自动选择
    if (platforms.length === 0) {
      // 默认发布到小红书
      platforms.push('xiaohongshu');
    }

    return platforms;
  }

  extractContentForPlatform(content, platform, task) {
    // 从content对象中提取适合特定平台的内容
    if (content.platformContents) {
      const platformContent = content.platformContents.find(pc => pc.platform === platform);
      if (platformContent && platformContent.content) {
        return this.stringifyContent(platformContent.content);
      }
    }

    // 如果没有找到平台特定内容，使用通用内容
    return (task ? task.title : '内容创作') + '\n\n' + this.stringifyContent(content);
  }

  stringifyContent(content) {
    if (typeof content === 'string') {
      return content;
    }

    if (typeof content === 'object') {
      if (Array.isArray(content)) {
        return content.join('\n\n');
      } else {
        return Object.entries(content)
          .map(([key, value]) => `${key}: ${value}`)
          .join('\n\n');
      }
    }

    return String(content);
  }

  extractKeywords(task) {
    // 从任务中提取关键词
    const taskText = (task.title + ' ' + (task.body || '')).toLowerCase();
    const keywords = [];

    // 简单的关键词提取逻辑
    const commonKeywords = [
      '内容创作', '爆款制造', '社交媒体', '小红书', '视频号', '公众号',
      'content', 'marketing', 'social media', 'xiaohongshu', 'wechat'
    ];

    for (const keyword of commonKeywords) {
      if (taskText.includes(keyword.toLowerCase())) {
        keywords.push(keyword);
      }
    }

    return keywords;
  }

  extractImages(content) {
    // 从content对象中提取图片
    if (content.images) {
      return content.images;
    }

    return [];
  }

  getPlatformName(platform) {
    // 获取平台的中文名称
    const platformNames = {
      xiaohongshu: '小红书',
      wechatVideo: '微信视频号',
      wechatArticle: '微信公众号'
    };

    return platformNames[platform] || platform;
  }

  recordSocialMediaPublish(task, platform, publishResult) {
    // 记录社交媒体发布结果
    try {
      const recordsPath = path.join(__dirname, 'data', 'social_media_publishes.json');
      let records = [];

      // 读取现有记录
      if (fs.existsSync(recordsPath)) {
        records = JSON.parse(fs.readFileSync(recordsPath, 'utf8'));
      }

      // 添加新记录
      records.push({
        taskId: task.task_id || task.id,
        taskTitle: task.title,
        platform: platform,
        platformName: this.getPlatformName(platform),
        publishResult: publishResult,
        timestamp: new Date().toISOString()
      });

      // 保存记录
      const dataDir = path.join(__dirname, 'data');
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }

      fs.writeFileSync(recordsPath, JSON.stringify(records, null, 2));
    } catch (error) {
      this.log('error', `记录社交媒体发布失败: ${error.message}`);
    }
  }
}

// 导出模块
if (require.main === module) {
  // 直接运行
  const evolution = new EvoMapEvolution();
  evolution.start();
} else {
  module.exports = EvoMapEvolution;
}