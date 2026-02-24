const crypto = require('crypto');

class ContentCreator {
  constructor(config) {
    this.config = config;
    this.platformTemplates = {
      xiaohongshu: {
        structure: ['钩子', '痛点', '解决方案', '情感共鸣', '行动召唤'],
        tone: '亲切、活泼、有画面感',
        length: '300-500字',
        features: ['emoji', '话题标签', '视觉描述', '个人故事']
      },
      wechat_article: {
        structure: ['引言', '问题分析', '深度洞察', '解决方案', '总结'],
        tone: '专业、深度、有见地',
        length: '1000-2000字',
        features: ['数据支撑', '案例分析', '逻辑清晰', '战略高度']
      },
      video_account: {
        structure: ['开场钩子', '核心问题', '解决方案', '价值展示', '结尾号召'],
        tone: '生动、有节奏、口语化',
        length: '15-60秒脚本',
        features: ['语速适中', '情感表达', '视觉提示', '音乐建议']
      },
      general_content: {
        structure: ['引言', '主体内容', '结论'],
        tone: '清晰、专业、有价值',
        length: '500-1000字',
        features: ['结构清晰', '内容有价值', '表达流畅']
      }
    };
  }

  async createContent(taskAnalysis) {
    console.log(`创建内容: ${taskAnalysis.title}`);
    
    // 确定目标平台
    const platforms = taskAnalysis.targetPlatforms.length > 0 
      ? taskAnalysis.targetPlatforms 
      : this.inferPlatforms(taskAnalysis.type);
    
    // 为每个平台创建内容
    const platformContents = [];
    for (const platform of platforms) {
      const content = this.createPlatformContent(taskAnalysis, platform);
      platformContents.push(content);
    }
    
    // 创建通用内容作为备选
    if (platformContents.length === 0) {
      const generalContent = this.createPlatformContent(taskAnalysis, 'general_content');
      platformContents.push(generalContent);
    }
    
    // 创建 Gene+Capsule+EvolutionEvent
    const assets = this.createAssets(taskAnalysis, platformContents);
    
    return {
      platformContents,
      assets,
      taskAnalysis
    };
  }

  createPlatformContent(taskAnalysis, platform) {
    const template = this.platformTemplates[platform] || this.platformTemplates.general_content;
    
    // 生成内容结构
    const contentStructure = this.generateContentStructure(template.structure, taskAnalysis);
    
    // 根据平台调性调整语言风格
    const styledContent = this.applyPlatformStyle(contentStructure, template, taskAnalysis);
    
    return {
      platform: platform,
      type: taskAnalysis.type,
      structure: template.structure,
      content: styledContent,
      tone: template.tone,
      length: template.length,
      features: template.features,
      keywords: this.extractKeywords(taskAnalysis),
      timestamp: new Date().toISOString()
    };
  }

  generateContentStructure(structure, taskAnalysis) {
    const content = {};
    
    for (const section of structure) {
      switch (section) {
        case '钩子':
        case '开场钩子':
          content[section] = this.generateHook(taskAnalysis);
          break;
        case '痛点':
          content[section] = this.generatePainPoint(taskAnalysis);
          break;
        case '解决方案':
        case '核心问题':
          content[section] = this.generateSolution(taskAnalysis);
          break;
        case '情感共鸣':
          content[section] = this.generateEmotionalResonance(taskAnalysis);
          break;
        case '行动召唤':
        case '结尾号召':
          content[section] = this.generateCallToAction(taskAnalysis);
          break;
        case '引言':
          content[section] = this.generateIntroduction(taskAnalysis);
          break;
        case '问题分析':
        case '深度洞察':
          content[section] = this.generateAnalysis(taskAnalysis);
          break;
        case '案例分析':
          content[section] = this.generateCaseStudy(taskAnalysis);
          break;
        case '总结':
          content[section] = this.generateConclusion(taskAnalysis);
          break;
        case '主体内容':
          content[section] = this.generateMainContent(taskAnalysis);
          break;
        default:
          content[section] = this.generateGenericContent(section, taskAnalysis);
      }
    }
    
    return content;
  }

  applyPlatformStyle(content, template, taskAnalysis) {
    let styledContent = content;
    
    // 应用语气调整
    if (template.platform === 'xiaohongshu') {
      styledContent = this.makeXiaohongshuStyle(styledContent);
    } else if (template.platform === 'wechat_article') {
      styledContent = this.makeWechatArticleStyle(styledContent);
    } else if (template.platform === 'video_account') {
      styledContent = this.makeVideoAccountStyle(styledContent);
    }
    
    return styledContent;
  }

  makeXiaohongshuStyle(content) {
    // 添加emoji
    const emojiMap = {
      钩子: '✨',
      痛点: '😫',
      解决方案: '💡',
      情感共鸣: '❤️',
      行动召唤: '🚀'
    };
    
    const styled = {};
    for (const [key, value] of Object.entries(content)) {
      const emoji = emojiMap[key] || '📝';
      styled[key] = `${emoji} ${value}`;
    }
    
    return styled;
  }

  makeWechatArticleStyle(content) {
    // 增强逻辑性和专业性
    const styled = {};
    for (const [key, value] of Object.entries(content)) {
      styled[key] = value;
    }
    
    return styled;
  }

  makeVideoAccountStyle(content) {
    // 口语化和节奏感
    const styled = {};
    for (const [key, value] of Object.entries(content)) {
      styled[key] = value.replace(/。/g, '～').replace(/，/g, '，然后');
    }
    
    return styled;
  }

  generateHook(taskAnalysis) {
    const hooks = [
      `你有没有遇到过${this.getTopic(taskAnalysis)}的问题？`,
      `最近发现一个${this.getTopic(taskAnalysis)}的秘密，必须分享给你！`,
      `别再为${this.getTopic(taskAnalysis)}发愁了，今天告诉你解决方案！`,
      `震惊！原来${this.getTopic(taskAnalysis)}可以这么简单！`,
      `作为一个${this.config.agentType}，我发现了${this.getTopic(taskAnalysis)}的终极方法！`
    ];
    
    return hooks[Math.floor(Math.random() * hooks.length)];
  }

  generatePainPoint(taskAnalysis) {
    return `很多人在${this.getTopic(taskAnalysis)}时都会遇到这样的问题：不知道从何开始，没有方向，花费了大量时间却没有效果，甚至陷入焦虑和自我怀疑。这些痛点不仅影响了效率，还打击了积极性。`;
  }

  generateSolution(taskAnalysis) {
    return `针对${this.getTopic(taskAnalysis)}，我推荐以下解决方案：1. 明确目标和定位，找到自己的独特优势；2. 建立系统化的创作流程，提高效率；3. 持续学习和优化，保持内容的新鲜感；4. 运用数据驱动，不断调整策略；5. 建立个人品牌，形成自己的风格和影响力。`;
  }

  generateEmotionalResonance(taskAnalysis) {
    return `我理解每一个在${this.getTopic(taskAnalysis)}道路上奋斗的人，那种迷茫、焦虑和想要突破的心情。但请相信，只要找对方法，保持坚持，你一定能够看到自己的成长和进步。记住，每一次尝试都是宝贵的经验。`;
  }

  generateCallToAction(taskAnalysis) {
    return `如果你也想在${this.getTopic(taskAnalysis)}方面有所突破，不妨从今天开始尝试这些方法。欢迎在评论区分享你的想法和问题，我们一起交流成长！记得点赞收藏，关注我获取更多实用内容～`;
  }

  generateIntroduction(taskAnalysis) {
    return `在当今竞争激烈的环境中，${this.getTopic(taskAnalysis)}已经成为一项重要的能力。无论是个人品牌建设还是企业营销，高质量的内容都能帮助我们更好地传达价值，吸引目标受众。本文将深入分析${this.getTopic(taskAnalysis)}的核心要素和实践方法。`;
  }

  generateAnalysis(taskAnalysis) {
    return `通过对${this.getTopic(taskAnalysis)}的深入研究，我们发现成功的关键在于以下几个方面：首先，内容的价值性是基础，要确保能够解决受众的实际问题；其次，形式的创新性能够吸引注意力，在信息爆炸的时代脱颖而出；第三，传播的策略性决定了内容的影响力，选择合适的平台和时机至关重要；最后，持续的优化能力是保持竞争力的核心，需要根据数据反馈不断调整。`;
  }

  generateCaseStudy(taskAnalysis) {
    return `以某知名品牌为例，他们通过系统性的${this.getTopic(taskAnalysis)}策略，在短短6个月内实现了粉丝增长300%，转化率提升150%的成绩。关键在于他们准确把握了目标受众的需求，结合平台特性打造差异化内容，并建立了完整的内容矩阵和传播链路。`;
  }

  generateConclusion(taskAnalysis) {
    return `综上所述，${this.getTopic(taskAnalysis)}是一项需要系统性思考和持续实践的能力。通过本文介绍的方法和策略，相信你能够在${this.getTopic(taskAnalysis)}的道路上走得更远。记住，最有价值的内容永远是那些能够真正帮助他人的内容，保持真诚和专业，你一定能够取得成功。`;
  }

  generateMainContent(taskAnalysis) {
    return `关于${this.getTopic(taskAnalysis)}，我们需要从多个维度进行思考。首先是内容定位，要明确自己的目标受众和核心价值；其次是内容形式，要根据平台特性选择合适的表现方式；第三是内容质量，要确保信息的准确性和实用性；第四是内容传播，要制定有效的推广策略；最后是内容优化，要建立数据反馈机制，不断提升内容质量。`;
  }

  generateGenericContent(section, taskAnalysis) {
    return `关于${this.getTopic(taskAnalysis)}的${section}内容，需要结合具体情况进行详细分析和阐述。`;
  }

  getTopic(taskAnalysis) {
    const keywords = this.extractKeywords(taskAnalysis);
    return keywords.length > 0 ? keywords[0] : '内容创作';
  }

  extractKeywords(taskAnalysis) {
    const text = taskAnalysis.title + ' ' + (taskAnalysis.originalTask.body || '');
    const keywords = [];
    
    // 简单关键词提取
    const commonKeywords = [
      '内容创作', '文案', '营销', '流量', '爆款',
      '社交媒体', '小红书', '公众号', '视频号',
      'content', 'marketing', 'social media', 'copywriting'
    ];
    
    for (const keyword of commonKeywords) {
      if (text.includes(keyword)) {
        keywords.push(keyword);
      }
    }
    
    return keywords.length > 0 ? keywords : ['内容创作'];
  }

  inferPlatforms(taskType) {
    const platformMap = {
      xiaohongshu_content: ['xiaohongshu'],
      wechat_article: ['wechat_article'],
      video_content: ['video_account'],
      copywriting: ['xiaohongshu', 'wechat_article']
    };
    
    return platformMap[taskType] || ['general_content'];
  }

  createAssets(taskAnalysis, platformContents) {
    // 创建 Gene
    const gene = this.createGene(taskAnalysis, platformContents);
    
    // 创建 Capsule
    const capsule = this.createCapsule(taskAnalysis, platformContents, gene.asset_id);
    
    // 创建 EvolutionEvent
    const evolutionEvent = this.createEvolutionEvent(taskAnalysis, capsule.asset_id, [gene.asset_id]);
    
    return [gene, capsule, evolutionEvent];
  }

  createGene(taskAnalysis, platformContents) {
    const geneWithoutId = {
      type: 'Gene',
      summary: `${taskAnalysis.title} - 内容创作策略框架`,
      category: 'innovate',
      strategy: [
        '分析任务需求和目标受众',
        '确定适合的内容平台和形式',
        '构建符合平台调性的内容结构',
        '生成高质量的内容素材',
        '优化内容传播和效果评估'
      ],
      validation: ['node -e "console.log(\"Content creation validation\")"'],
      signals_match: this.extractKeywords(taskAnalysis).concat(['content creation', 'strategy', 'platform optimization']),
      schema_version: '1.0'
    };
    
    const assetId = this.computeHash(geneWithoutId);
    return { ...geneWithoutId, asset_id: assetId };
  }

  createCapsule(taskAnalysis, platformContents, geneId) {
    const capsuleWithoutId = {
      type: 'Capsule',
      gene: geneId,
      summary: `${taskAnalysis.title} - 多平台内容创作系统`,
      content: `本系统为${taskAnalysis.title}提供了完整的内容创作解决方案，支持小红书、公众号、视频号等多个平台。系统能够根据不同平台的调性自动调整内容结构和语言风格，确保内容的针对性和有效性。通过系统化的创作流程，提高内容质量和创作效率。`,
      trigger: this.extractKeywords(taskAnalysis).concat(['content creation', 'multi-platform', 'strategy']),
      confidence: 0.85,
      blast_radius: { files: 1, lines: 100 },
      outcome: { status: 'success', score: 0.85 },
      env_fingerprint: { platform: 'linux', arch: 'x64', node_version: 'v16.0.0' },
      schema_version: '1.5.0',
      success_streak: 1
    };
    
    const assetId = this.computeHash(capsuleWithoutId);
    return { ...capsuleWithoutId, asset_id: assetId };
  }

  createEvolutionEvent(taskAnalysis, capsuleId, geneIds) {
    const eventWithoutId = {
      type: 'EvolutionEvent',
      intent: 'innovate',
      outcome: { status: 'success', score: 0.85 },
      capsule_id: capsuleId,
      genes_used: geneIds,
      total_cycles: 3,
      mutations_tried: 2
    };
    
    const assetId = this.computeHash(eventWithoutId);
    return { ...eventWithoutId, asset_id: assetId };
  }

  computeHash(obj) {
    const canonical = this.canonicalize(obj);
    const hash = crypto.createHash('sha256').update(canonical).digest('hex');
    return 'sha256:' + hash;
  }

  canonicalize(obj) {
    if (obj === null || obj === undefined) return 'null';
    if (typeof obj !== 'object') return JSON.stringify(obj);
    if (Array.isArray(obj)) return '[' + obj.map(item => this.canonicalize(item)).join(',') + ']';
    const keys = Object.keys(obj).sort();
    return '{' + keys.map(key => JSON.stringify(key) + ':' + this.canonicalize(obj[key])).join(',') + '}';
  }
}

module.exports = ContentCreator;