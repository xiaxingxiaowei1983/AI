/**
 * VFM (Value Function Mutation) 评估模块
 * 用于评估能力候选者的价值，基于四个核心价值维度
 * 状态: MUTATED(已变异) 优先级: LEVEL1(指导 PCEC选择)
 */

class VFMEvaluator {
  constructor() {
    this.version = '2.0.0';
    this.threshold = 50; // 总分阈值
    this.dimensions = {
      highFrequency: {
        name: '高频复用',
        weight: 3,
        description: '这个能力是不是天天都要用?'
      },
      failureReduction: {
        name: '降低失败',
        weight: 3,
        description: '这个能力能不能把 80%的失败变成 0%?'
      },
      userBurden: {
        name: '降低心智负担',
        weight: 2,
        description: '主人是不是以后只要说一个词我就懂了?'
      },
      selfCost: {
        name: '降低自身成本',
        weight: 2,
        description: '我是不是少思考500个Token就能做完?'
      },
      // 新增价值维度
      strategicValue: {
        name: '战略价值',
        weight: 3,
        description: '这个能力是否对系统长期发展有战略意义?'
      },
      scalability: {
        name: '可扩展性',
        weight: 2,
        description: '这个能力是否容易扩展到其他场景?'
      },
      integrationValue: {
        name: '集成价值',
        weight: 2,
        description: '这个能力是否能与其他系统或工具良好集成?'
      },
      innovationPotential: {
        name: '创新潜力',
        weight: 2,
        description: '这个能力是否具有创新性和前瞻性?'
      }
    };
    this.lowValuePatterns = [
      /特定时间.*特定语气/,  // 在周三下午特定时间用特定语气说话
      /文字颜色.*七彩/,  // 把文字颜色变成七彩的
      /5个工具.*组合.*小事/  // 用5个工具组合做一件小事
    ];
    // 动态调整机制
    this.dynamicAdjustment = {
      enabled: true,
      learningRate: 0.1,
      adjustmentHistory: [],
      contextFactors: {
        timeOfDay: null,
        systemLoad: null,
        recentFailures: 0,
        usagePatterns: {}
      }
    };
    // 人生决策系统集成
    this.lifeDecisionIntegration = {
      enabled: true,
      lifeValues: {
        growth: 0.8,
        balance: 0.6,
        purpose: 0.9,
        relationships: 0.7,
        contribution: 0.8
      }
    };
    // 评估历史
    this.evaluationHistory = [];
    // 缓存
    this.cache = new Map();
    this.cacheSize = 100;
  }

  // 评估能力候选者
  evaluateCapability(capability) {
    if (!capability || typeof capability !== 'object') {
      throw new Error('能力候选者必须是对象');
    }

    if (!capability.name || typeof capability.name !== 'string') {
      throw new Error('能力候选者必须有名称');
    }

    // 检查缓存
    const cacheKey = JSON.stringify({ name: capability.name, type: capability.type });
    if (this.cache.has(cacheKey)) {
      const cachedResult = this.cache.get(cacheKey);
      if (Date.now() - cachedResult.timestamp < 3600000) { // 1小时缓存
        return cachedResult;
      }
      this.cache.delete(cacheKey);
    }

    // 更新上下文因素
    this._updateContextFactors();

    // 评估各价值维度
    const dimensionScores = {};
    let totalScore = 0;

    // 评估高频复用
    dimensionScores.highFrequency = this._evaluateHighFrequency(capability);

    // 评估降低失败
    dimensionScores.failureReduction = this._evaluateFailureReduction(capability);

    // 评估降低心智负担
    dimensionScores.userBurden = this._evaluateUserBurden(capability);

    // 评估降低自身成本
    dimensionScores.selfCost = this._evaluateSelfCost(capability);

    // 评估新增价值维度
    dimensionScores.strategicValue = this._evaluateStrategicValue(capability);
    dimensionScores.scalability = this._evaluateScalability(capability);
    dimensionScores.integrationValue = this._evaluateIntegrationValue(capability);
    dimensionScores.innovationPotential = this._evaluateInnovationPotential(capability);

    // 应用动态调整
    const adjustedScores = this._applyDynamicAdjustment(dimensionScores, capability);

    // 计算加权总分
    for (const [key, score] of Object.entries(adjustedScores)) {
      totalScore += score * this.dimensions[key].weight;
    }

    // 检查是否为低价值能力
    const isLowValue = this._isLowValueCapability(capability);

    // 应用人生决策系统集成
    const lifeDecisionScore = this._evaluateLifeDecisionValue(capability);
    if (this.lifeDecisionIntegration.enabled && lifeDecisionScore > 0) {
      totalScore = totalScore * 0.8 + lifeDecisionScore * 0.2;
    }

    // 判断是否应该立项
    const shouldProceed = totalScore >= this.threshold && !isLowValue;

    const result = {
      id: `vfm_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      capability,
      timestamp: Date.now(),
      dimensionScores: adjustedScores,
      totalScore,
      threshold: this.threshold,
      isLowValue,
      shouldProceed,
      // 详细评估信息
      details: {
        dimensions: this.dimensions,
        reasoning: this._generateReasoning(capability, adjustedScores, totalScore, isLowValue),
        contextFactors: this.dynamicAdjustment.contextFactors,
        lifeDecisionScore: lifeDecisionScore,
        dynamicAdjustments: this.dynamicAdjustment.adjustmentHistory.slice(-5)
      }
    };

    // 缓存结果
    this._cacheResult(cacheKey, result);

    // 记录评估历史
    this._recordEvaluation(result);

    return result;
  }
  
  // 更新上下文因素
  _updateContextFactors() {
    const now = new Date();
    this.dynamicAdjustment.contextFactors.timeOfDay = now.getHours();
    // 模拟系统负载
    this.dynamicAdjustment.contextFactors.systemLoad = Math.random();
    // 其他上下文因素可以根据实际情况更新
  }
  
  // 应用动态调整
  _applyDynamicAdjustment(scores, capability) {
    if (!this.dynamicAdjustment.enabled) {
      return scores;
    }

    const adjustedScores = { ...scores };
    const adjustments = {};

    // 基于时间的调整
    const hour = this.dynamicAdjustment.contextFactors.timeOfDay;
    if (hour >= 9 && hour <= 18) { // 工作时间
      adjustedScores.highFrequency *= 1.1;
      adjustedScores.strategicValue *= 1.1;
      adjustments.timeBased = '工作时间调整';
    }

    // 基于系统负载的调整
    const load = this.dynamicAdjustment.contextFactors.systemLoad;
    if (load > 0.7) { // 高负载
      adjustedScores.selfCost *= 1.2;
      adjustments.loadBased = '高负载调整';
    }

    // 基于最近失败的调整
    if (this.dynamicAdjustment.contextFactors.recentFailures > 3) {
      adjustedScores.failureReduction *= 1.2;
      adjustments.failureBased = '失败率调整';
    }

    // 确保分数在合理范围内
    for (const key in adjustedScores) {
      adjustedScores[key] = Math.max(0, Math.min(10, adjustedScores[key]));
    }

    // 记录调整
    if (Object.keys(adjustments).length > 0) {
      this.dynamicAdjustment.adjustmentHistory.push({
        timestamp: Date.now(),
        adjustments,
        capability: capability.name
      });

      // 限制调整历史长度
      if (this.dynamicAdjustment.adjustmentHistory.length > 100) {
        this.dynamicAdjustment.adjustmentHistory = this.dynamicAdjustment.adjustmentHistory.slice(-100);
      }
    }

    return adjustedScores;
  }
  
  // 评估战略价值
  _evaluateStrategicValue(capability) {
    const name = capability.name.toLowerCase();
    const description = (capability.description || '').toLowerCase();

    // 战略价值关键词
    const strategicKeywords = [
      '战略', '长期', '发展', '未来', '核心',
      'strategy', 'long-term', 'development', 'future', 'core'
    ];

    // 基础分
    let score = 5;

    // 检查战略价值关键词
    for (const keyword of strategicKeywords) {
      if (name.includes(keyword) || description.includes(keyword)) {
        score += 2;
      }
    }

    // 检查能力类型
    if (capability.type === 'core' || capability.type === 'fundamental') {
      score += 3;
    }

    // 检查是否有长期规划
    if (capability.longTerm || capability.strategic) {
      score += 2;
    }

    // 限制分数范围
    return Math.max(0, Math.min(10, score));
  }
  
  // 评估可扩展性
  _evaluateScalability(capability) {
    const name = capability.name.toLowerCase();
    const description = (capability.description || '').toLowerCase();

    // 可扩展性关键词
    const scalabilityKeywords = [
      '扩展', '通用', '灵活', '适应', '多场景',
      'scale', 'general', 'flexible', 'adapt', 'multi-scenario'
    ];

    // 基础分
    let score = 5;

    // 检查可扩展性关键词
    for (const keyword of scalabilityKeywords) {
      if (name.includes(keyword) || description.includes(keyword)) {
        score += 2;
      }
    }

    // 检查是否支持配置
    if (capability.configurable || capability.customizable) {
      score += 2;
    }

    // 检查是否有多个场景
    if (capability.scenarios && Array.isArray(capability.scenarios) && capability.scenarios.length > 1) {
      score += 3;
    }

    // 限制分数范围
    return Math.max(0, Math.min(10, score));
  }
  
  // 评估集成价值
  _evaluateIntegrationValue(capability) {
    const name = capability.name.toLowerCase();
    const description = (capability.description || '').toLowerCase();

    // 集成价值关键词
    const integrationKeywords = [
      '集成', '接口', '兼容', '连接', '协作',
      'integrate', 'interface', 'compatible', 'connect', 'collaborate'
    ];

    // 基础分
    let score = 5;

    // 检查集成价值关键词
    for (const keyword of integrationKeywords) {
      if (name.includes(keyword) || description.includes(keyword)) {
        score += 2;
      }
    }

    // 检查工具集成
    if (capability.tools && Array.isArray(capability.tools) && capability.tools.length > 0) {
      score += 2;
    }

    // 检查API支持
    if (capability.api || capability.interface) {
      score += 3;
    }

    // 限制分数范围
    return Math.max(0, Math.min(10, score));
  }
  
  // 评估创新潜力
  _evaluateInnovationPotential(capability) {
    const name = capability.name.toLowerCase();
    const description = (capability.description || '').toLowerCase();

    // 创新潜力关键词
    const innovationKeywords = [
      '创新', '新颖', '突破', '前沿', '创意',
      'innovate', 'novel', 'breakthrough', 'cutting-edge', 'creative'
    ];

    // 基础分
    let score = 5;

    // 检查创新潜力关键词
    for (const keyword of innovationKeywords) {
      if (name.includes(keyword) || description.includes(keyword)) {
        score += 2;
      }
    }

    // 检查是否有新技术
    if (capability.technology && capability.technology.includes('new')) {
      score += 3;
    }

    // 检查是否有专利或独特性
    if (capability.unique || capability.patent) {
      score += 3;
    }

    // 限制分数范围
    return Math.max(0, Math.min(10, score));
  }
  
  // 评估人生决策价值
  _evaluateLifeDecisionValue(capability) {
    if (!this.lifeDecisionIntegration.enabled) {
      return 0;
    }

    const name = capability.name.toLowerCase();
    const description = (capability.description || '').toLowerCase();

    // 人生价值映射
    const lifeValueMapping = {
      growth: ['成长', '学习', '发展', '进步', 'growth', 'learn', 'develop', 'progress'],
      balance: ['平衡', '和谐', '均衡', '协调', 'balance', 'harmony', 'equilibrium', 'coordinate'],
      purpose: ['目标', '意义', '使命', '目的', 'goal', 'meaning', 'mission', 'purpose'],
      relationships: ['关系', '沟通', '协作', '连接', 'relationship', 'communicate', 'collaborate', 'connect'],
      contribution: ['贡献', '帮助', '服务', '价值', 'contribute', 'help', 'serve', 'value']
    };

    let lifeScore = 0;

    // 评估各人生价值维度
    for (const [value, keywords] of Object.entries(lifeValueMapping)) {
      const weight = this.lifeDecisionIntegration.lifeValues[value] || 0;
      let valueScore = 0;

      for (const keyword of keywords) {
        if (name.includes(keyword) || description.includes(keyword)) {
          valueScore = 10;
          break;
        }
      }

      lifeScore += valueScore * weight;
    }

    // 归一化分数
    const maxPossibleScore = Object.values(this.lifeDecisionIntegration.lifeValues).reduce((sum, weight) => sum + weight * 10, 0);
    return maxPossibleScore > 0 ? (lifeScore / maxPossibleScore) * 100 : 0;
  }
  
  // 缓存结果
  _cacheResult(key, result) {
    if (this.cache.size >= this.cacheSize) {
      // 移除最早的缓存项
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, result);
  }
  
  // 记录评估
  _recordEvaluation(result) {
    this.evaluationHistory.push({
      id: result.id,
      timestamp: result.timestamp,
      capabilityName: result.capability.name,
      totalScore: result.totalScore,
      shouldProceed: result.shouldProceed
    });

    // 限制历史记录长度
    if (this.evaluationHistory.length > 1000) {
      this.evaluationHistory = this.evaluationHistory.slice(-1000);
    }
  }

  // 批量评估能力候选者
  batchEvaluate(capabilities) {
    if (!Array.isArray(capabilities)) {
      throw new Error('能力候选者必须是数组');
    }

    const results = [];
    let highValueCount = 0;

    for (const capability of capabilities) {
      try {
        const evaluation = this.evaluateCapability(capability);
        results.push(evaluation);
        if (evaluation.shouldProceed) {
          highValueCount++;
        }
      } catch (error) {
        results.push({
          error: error.message,
          capability,
          timestamp: Date.now()
        });
      }
    }

    return {
      success: results.length === capabilities.length,
      totalCount: capabilities.length,
      highValueCount,
      highValueRatio: capabilities.length > 0 ? highValueCount / capabilities.length : 0,
      results,
      // 按总评分排序的结果
      sortedResults: results
        .filter(r => !r.error)
        .sort((a, b) => b.totalScore - a.totalScore)
    };
  }

  // 评估高频复用
  _evaluateHighFrequency(capability) {
    const name = capability.name.toLowerCase();
    const description = (capability.description || '').toLowerCase();

    // 高频场景关键词
    const highFreqKeywords = [
      '日常', '常用', '经常', '每天', '频繁', '复用', '通用', '基础',
      'daily', 'common', 'frequent', 'reuse', 'general', 'basic'
    ];

    // 低频场景关键词
    const lowFreqKeywords = [
      '偶尔', '特定', '特殊', '一次性', '临时',
      'occasional', 'specific', 'special', 'one-time', 'temporary'
    ];

    let score = 5; // 基础分

    // 检查高频关键词
    for (const keyword of highFreqKeywords) {
      if (name.includes(keyword) || description.includes(keyword)) {
        score += 2;
      }
    }

    // 检查低频关键词
    for (const keyword of lowFreqKeywords) {
      if (name.includes(keyword) || description.includes(keyword)) {
        score -= 2;
      }
    }

    // 检查能力类型
    if (capability.type === 'core' || capability.type === 'fundamental') {
      score += 3;
    } else if (capability.type === 'specialized' || capability.type === 'niche') {
      score -= 2;
    }

    // 限制分数范围
    return Math.max(0, Math.min(10, score));
  }

  // 评估降低失败
  _evaluateFailureReduction(capability) {
    const name = capability.name.toLowerCase();
    const description = (capability.description || '').toLowerCase();

    // 失败相关关键词
    const failureKeywords = [
      '错误', '失败', '异常', '处理', '验证', '检查', '安全',
      'error', 'fail', 'exception', 'handle', 'validate', 'check', 'safe'
    ];

    // 可靠性关键词
    const reliabilityKeywords = [
      '可靠', '稳定', '保证', '确保', '防止', '避免',
      'reliable', 'stable', 'guarantee', 'ensure', 'prevent', 'avoid'
    ];

    let score = 5; // 基础分

    // 检查失败相关关键词
    for (const keyword of failureKeywords) {
      if (name.includes(keyword) || description.includes(keyword)) {
        score += 1.5;
      }
    }

    // 检查可靠性关键词
    for (const keyword of reliabilityKeywords) {
      if (name.includes(keyword) || description.includes(keyword)) {
        score += 1.5;
      }
    }

    // 检查是否有明确的失败处理机制
    if (capability.failureHandling || capability.errorHandling) {
      score += 2;
    }

    // 限制分数范围
    return Math.max(0, Math.min(10, score));
  }

  // 评估降低心智负担
  _evaluateUserBurden(capability) {
    const name = capability.name.toLowerCase();
    const description = (capability.description || '').toLowerCase();

    // 易用性关键词
    const easeKeywords = [
      '简单', '易用', '自动', '智能', '快捷', '一键',
      'simple', 'easy', 'auto', 'smart', 'quick', 'one-click'
    ];

    // 复杂度关键词
    const complexityKeywords = [
      '复杂', '繁琐', '手动', '步骤', '流程',
      'complex', 'complicated', 'manual', 'step', 'process'
    ];

    let score = 5; // 基础分

    // 检查易用性关键词
    for (const keyword of easeKeywords) {
      if (name.includes(keyword) || description.includes(keyword)) {
        score += 2;
      }
    }

    // 检查复杂度关键词
    for (const keyword of complexityKeywords) {
      if (name.includes(keyword) || description.includes(keyword)) {
        score -= 2;
      }
    }

    // 检查是否支持自然语言指令
    if (capability.naturalLanguage || capability.voiceControl) {
      score += 3;
    }

    // 限制分数范围
    return Math.max(0, Math.min(10, score));
  }

  // 评估降低自身成本
  _evaluateSelfCost(capability) {
    const name = capability.name.toLowerCase();
    const description = (capability.description || '').toLowerCase();

    // 效率关键词
    const efficiencyKeywords = [
      '高效', '快速', '轻量', '优化', '节省',
      'efficient', 'fast', 'light', 'optimize', 'save'
    ];

    // 成本关键词
    const costKeywords = [
      '复杂', ' heavy', '耗时', '资源', '计算',
      'complex', 'heavy', 'time-consuming', 'resource', 'compute'
    ];

    let score = 5; // 基础分

    // 检查效率关键词
    for (const keyword of efficiencyKeywords) {
      if (name.includes(keyword) || description.includes(keyword)) {
        score += 2;
      }
    }

    // 检查成本关键词
    for (const keyword of costKeywords) {
      if (name.includes(keyword) || description.includes(keyword)) {
        score -= 2;
      }
    }

    // 检查是否有缓存机制
    if (capability.cache || capability.caching) {
      score += 2;
    }

    // 检查是否需要多个工具组合
    if (capability.tools && Array.isArray(capability.tools) && capability.tools.length > 3) {
      score -= 3;
    }

    // 限制分数范围
    return Math.max(0, Math.min(10, score));
  }

  // 检查是否为低价值能力
  _isLowValueCapability(capability) {
    const name = capability.name.toLowerCase();
    const description = (capability.description || '').toLowerCase();

    // 检查低价值模式
    for (const pattern of this.lowValuePatterns) {
      if (pattern.test(name) || pattern.test(description)) {
        return true;
      }
    }

    // 检查是否为纯装饰性能力
    const decorativeKeywords = [
      '颜色', '样式', '外观', '装饰', '美化',
      'color', 'style', 'appearance', 'decorate', 'beautify'
    ];

    for (const keyword of decorativeKeywords) {
      if (name.includes(keyword) || description.includes(keyword)) {
        // 检查是否只有装饰功能
        const functionalKeywords = [
          '功能', '实用', '效率', '处理', '分析',
          'function', 'practical', 'efficiency', 'process', 'analyze'
        ];

        let hasFunctionalKeywords = false;
        for (const funcKeyword of functionalKeywords) {
          if (name.includes(funcKeyword) || description.includes(funcKeyword)) {
            hasFunctionalKeywords = true;
            break;
          }
        }

        if (!hasFunctionalKeywords) {
          return true;
        }
      }
    }

    return false;
  }

  // 生成评估理由
  _generateReasoning(capability, dimensionScores, totalScore, isLowValue) {
    const reasoning = [];

    // 高频复用
    reasoning.push(`高频复用 (${dimensionScores.highFrequency.toFixed(1)}/10): ${this.dimensions.highFrequency.description}`);

    // 降低失败
    reasoning.push(`降低失败 (${dimensionScores.failureReduction.toFixed(1)}/10): ${this.dimensions.failureReduction.description}`);

    // 降低心智负担
    reasoning.push(`降低心智负担 (${dimensionScores.userBurden.toFixed(1)}/10): ${this.dimensions.userBurden.description}`);

    // 降低自身成本
    reasoning.push(`降低自身成本 (${dimensionScores.selfCost.toFixed(1)}/10): ${this.dimensions.selfCost.description}`);

    // 战略价值
    if (dimensionScores.strategicValue !== undefined) {
      reasoning.push(`战略价值 (${dimensionScores.strategicValue.toFixed(1)}/10): ${this.dimensions.strategicValue.description}`);
    }

    // 可扩展性
    if (dimensionScores.scalability !== undefined) {
      reasoning.push(`可扩展性 (${dimensionScores.scalability.toFixed(1)}/10): ${this.dimensions.scalability.description}`);
    }

    // 集成价值
    if (dimensionScores.integrationValue !== undefined) {
      reasoning.push(`集成价值 (${dimensionScores.integrationValue.toFixed(1)}/10): ${this.dimensions.integrationValue.description}`);
    }

    // 创新潜力
    if (dimensionScores.innovationPotential !== undefined) {
      reasoning.push(`创新潜力 (${dimensionScores.innovationPotential.toFixed(1)}/10): ${this.dimensions.innovationPotential.description}`);
    }

    // 总分
    reasoning.push(`加权总分: ${totalScore.toFixed(2)} (阈值: ${this.threshold})`);

    // 低价值判断
    if (isLowValue) {
      reasoning.push('判断: 低价值能力，建议不立项');
    } else if (totalScore < this.threshold) {
      reasoning.push('判断: 总分未达到阈值，建议不立项');
    } else {
      reasoning.push('判断: 高价值能力，建议立项');
    }

    // 终极判断
    reasoning.push('终极判断: 它是否让未来的我，用更少代价，解决更多问题?');

    // 战略建议
    reasoning.push('战略建议: 基于评估结果，建议优先发展高战略价值和高可扩展性的能力');

    return reasoning;
  }

  // 获取评估配置
  getConfig() {
    return {
      version: this.version,
      threshold: this.threshold,
      dimensions: this.dimensions,
      lowValuePatterns: this.lowValuePatterns.map(p => p.source),
      dynamicAdjustment: {
        enabled: this.dynamicAdjustment.enabled,
        learningRate: this.dynamicAdjustment.learningRate,
        contextFactors: this.dynamicAdjustment.contextFactors
      },
      lifeDecisionIntegration: {
        enabled: this.lifeDecisionIntegration.enabled,
        lifeValues: this.lifeDecisionIntegration.lifeValues
      },
      cacheSize: this.cacheSize,
      evaluationHistorySize: this.evaluationHistory.length
    };
  }

  // 更新评估配置
  updateConfig(config) {
    if (config.threshold !== undefined) {
      this.threshold = config.threshold;
    }

    if (config.dimensions) {
      this.dimensions = { ...this.dimensions, ...config.dimensions };
    }

    if (config.lowValuePatterns) {
      this.lowValuePatterns = config.lowValuePatterns.map(p => new RegExp(p));
    }

    if (config.dynamicAdjustment) {
      this.dynamicAdjustment = { 
        ...this.dynamicAdjustment, 
        ...config.dynamicAdjustment 
      };
    }

    if (config.lifeDecisionIntegration) {
      this.lifeDecisionIntegration = { 
        ...this.lifeDecisionIntegration, 
        ...config.lifeDecisionIntegration 
      };
    }

    if (config.cacheSize !== undefined) {
      this.cacheSize = config.cacheSize;
    }

    return this.getConfig();
  }

  // 生成评估报告
  generateReport(evaluations) {
    if (!Array.isArray(evaluations)) {
      evaluations = [evaluations];
    }

    // 计算各价值维度的平均分数
    const dimensionAverages = {};
    const validEvaluations = evaluations.filter(e => !e.error);

    if (validEvaluations.length > 0) {
      const dimensions = Object.keys(this.dimensions);
      dimensions.forEach(dimension => {
        const sum = validEvaluations.reduce((acc, e) => {
          return acc + (e.dimensionScores[dimension] || 0);
        }, 0);
        dimensionAverages[dimension] = sum / validEvaluations.length;
      });
    }

    // 计算人生决策分数的平均值
    const averageLifeDecisionScore = validEvaluations.length > 0
      ? validEvaluations.reduce((sum, e) => sum + (e.details?.lifeDecisionScore || 0), 0) / validEvaluations.length
      : 0;

    const report = {
      id: `report_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
      totalEvaluations: evaluations.length,
      validEvaluations: validEvaluations.length,
      highValueCount: validEvaluations.filter(e => e.shouldProceed).length,
      lowValueCount: validEvaluations.filter(e => e.isLowValue).length,
      thresholdMissCount: validEvaluations.filter(e => e.totalScore < this.threshold).length,
      averageScore: validEvaluations.length > 0 
        ? validEvaluations.reduce((sum, e) => sum + e.totalScore, 0) / validEvaluations.length 
        : 0,
      averageLifeDecisionScore: averageLifeDecisionScore,
      dimensionAverages: dimensionAverages,
      evaluations: validEvaluations.map(e => ({
        capabilityName: e.capability.name,
        totalScore: e.totalScore,
        shouldProceed: e.shouldProceed,
        isLowValue: e.isLowValue,
        dimensionScores: e.dimensionScores,
        lifeDecisionScore: e.details?.lifeDecisionScore || 0,
        timestamp: e.timestamp
      })),
      config: this.getConfig(),
      insights: this._generateReportInsights(validEvaluations, dimensionAverages, averageLifeDecisionScore)
    };

    return report;
  }
  
  // 生成报告洞察
  _generateReportInsights(evaluations, dimensionAverages, averageLifeDecisionScore) {
    const insights = [];

    // 高价值能力分析
    const highValueCapabilities = evaluations.filter(e => e.shouldProceed);
    if (highValueCapabilities.length > 0) {
      insights.push(`发现 ${highValueCapabilities.length} 个高价值能力，占比 ${(highValueCapabilities.length / evaluations.length * 100).toFixed(1)}%`);
    }

    // 价值维度分析
    const sortedDimensions = Object.entries(dimensionAverages)
      .sort(([,a], [,b]) => b - a);
    
    if (sortedDimensions.length > 0) {
      const topDimension = sortedDimensions[0];
      insights.push(`表现最佳的价值维度: ${this.dimensions[topDimension[0]].name} (${topDimension[1].toFixed(2)}/10)`);
    }

    // 人生决策系统分析
    if (averageLifeDecisionScore > 0) {
      insights.push(`人生决策系统集成得分: ${averageLifeDecisionScore.toFixed(2)}`);
    }

    // 战略建议
    if (evaluations.length > 0) {
      insights.push('战略建议: 优先发展高战略价值和高可扩展性的能力，同时注重与人生决策系统的集成');
    }

    return insights;
  }
}

// 导出单例实例
const vfmEvaluator = new VFMEvaluator();

module.exports = {
  VFMEvaluator,
  vfmEvaluator,
  // 工具接口
  evaluateCapability: (capability) => {
    return vfmEvaluator.evaluateCapability(capability);
  },
  batchEvaluate: (capabilities) => {
    return vfmEvaluator.batchEvaluate(capabilities);
  },
  generateReport: (evaluations) => {
    return vfmEvaluator.generateReport(evaluations);
  },
  getConfig: () => {
    return vfmEvaluator.getConfig();
  },
  updateConfig: (config) => {
    return vfmEvaluator.updateConfig(config);
  }
};

// 示例用法
if (require.main === module) {
  const evaluator = vfmEvaluator;

  // 测试能力评估
  console.log('Testing VFM evaluation...');

  const testCapabilities = [
    {
      name: '日常对话处理',
      type: 'core',
      description: '处理用户的日常对话，提供智能回复',
      tools: ['nlp-processor']
    },
    {
      name: '七彩文字生成',
      type: 'specialized',
      description: '将文字转换为七彩颜色的格式',
      tools: ['text-formatter']
    },
    {
      name: '错误处理增强',
      type: 'core',
      description: '增强系统的错误处理能力，减少失败率',
      tools: ['error-handler', 'logger'],
      failureHandling: true
    },
    {
      name: '特定时间提醒',
      type: 'specialized',
      description: '在特定时间发送特定语气的提醒',
      tools: ['timer', 'notification']
    }
  ];

  // 批量评估
  const batchResult = evaluator.batchEvaluate(testCapabilities);
  console.log('Batch evaluation result:', JSON.stringify(batchResult, null, 2));

  // 生成报告
  const report = evaluator.generateReport(batchResult.results);
  console.log('\nEvaluation report:', JSON.stringify(report, null, 2));

  // 单个能力评估
  console.log('\nSingle capability evaluation:');
  const singleResult = evaluator.evaluateCapability(testCapabilities[0]);
  console.log('Single evaluation result:', JSON.stringify(singleResult, null, 2));
}
