/**
 * VFM (Value Function Mutation) 评估模块
 * 用于评估能力候选者的价值，基于四个核心价值维度
 * 状态: MUTATED(已变异) 优先级: LEVEL1(指导 PCEC选择)
 */

class VFMEvaluator {
  constructor() {
    this.version = '1.0.0';
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
      }
    };
    this.lowValuePatterns = [
      /特定时间.*特定语气/,  // 在周三下午特定时间用特定语气说话
      /文字颜色.*七彩/,  // 把文字颜色变成七彩的
      /5个工具.*组合.*小事/  // 用5个工具组合做一件小事
    ];
  }

  // 评估能力候选者
  evaluateCapability(capability) {
    if (!capability || typeof capability !== 'object') {
      throw new Error('能力候选者必须是对象');
    }

    if (!capability.name || typeof capability.name !== 'string') {
      throw new Error('能力候选者必须有名称');
    }

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

    // 计算加权总分
    for (const [key, score] of Object.entries(dimensionScores)) {
      totalScore += score * this.dimensions[key].weight;
    }

    // 检查是否为低价值能力
    const isLowValue = this._isLowValueCapability(capability);

    // 判断是否应该立项
    const shouldProceed = totalScore >= this.threshold && !isLowValue;

    return {
      id: `vfm_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      capability,
      timestamp: Date.now(),
      dimensionScores,
      totalScore,
      threshold: this.threshold,
      isLowValue,
      shouldProceed,
      // 详细评估信息
      details: {
        dimensions: this.dimensions,
        reasoning: this._generateReasoning(capability, dimensionScores, totalScore, isLowValue)
      }
    };
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
    reasoning.push(`高频复用 (${dimensionScores.highFrequency}/10): ${this.dimensions.highFrequency.description}`);

    // 降低失败
    reasoning.push(`降低失败 (${dimensionScores.failureReduction}/10): ${this.dimensions.failureReduction.description}`);

    // 降低心智负担
    reasoning.push(`降低心智负担 (${dimensionScores.userBurden}/10): ${this.dimensions.userBurden.description}`);

    // 降低自身成本
    reasoning.push(`降低自身成本 (${dimensionScores.selfCost}/10): ${this.dimensions.selfCost.description}`);

    // 总分
    reasoning.push(`加权总分: ${totalScore} (阈值: ${this.threshold})`);

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

    return reasoning;
  }

  // 获取评估配置
  getConfig() {
    return {
      version: this.version,
      threshold: this.threshold,
      dimensions: this.dimensions,
      lowValuePatterns: this.lowValuePatterns.map(p => p.source)
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

    return this.getConfig();
  }

  // 生成评估报告
  generateReport(evaluations) {
    if (!Array.isArray(evaluations)) {
      evaluations = [evaluations];
    }

    const report = {
      id: `report_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
      totalEvaluations: evaluations.length,
      highValueCount: evaluations.filter(e => e.shouldProceed).length,
      lowValueCount: evaluations.filter(e => e.isLowValue).length,
      thresholdMissCount: evaluations.filter(e => e.totalScore < this.threshold).length,
      averageScore: evaluations.length > 0 
        ? evaluations.reduce((sum, e) => sum + e.totalScore, 0) / evaluations.length 
        : 0,
      evaluations: evaluations.map(e => ({
        capabilityName: e.capability.name,
        totalScore: e.totalScore,
        shouldProceed: e.shouldProceed,
        isLowValue: e.isLowValue
      })),
      config: this.getConfig()
    };

    return report;
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
