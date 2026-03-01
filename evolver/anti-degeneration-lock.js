const fs = require('fs');
const path = require('path');

const CAPABILITY_VERSIONS_FILE = path.join(__dirname, 'capability-versions.json');

class AntiDegenerationLock {
  constructor() {
    this.capabilityVersions = this.loadCapabilityVersions();
  }

  loadCapabilityVersions() {
    if (fs.existsSync(CAPABILITY_VERSIONS_FILE)) {
      try {
        return JSON.parse(fs.readFileSync(CAPABILITY_VERSIONS_FILE, 'utf8'));
      } catch (error) {
        console.error('Error loading capability versions:', error.message);
        return {};
      }
    }
    return {};
  }

  saveCapabilityVersions() {
    fs.writeFileSync(CAPABILITY_VERSIONS_FILE, JSON.stringify(this.capabilityVersions, null, 2));
    console.log('Capability versions saved to', CAPABILITY_VERSIONS_FILE);
  }

  // 检查劣化进化行为
  checkDegeneration(capability) {
    console.log('=== Checking for degeneration ===');
    
    const issues = [];

    // 检查是否为了"显得更聪明"而增加复杂度
    if (this.isOverlyComplex(capability)) {
      issues.push('为了"显得更聪明"而增加复杂度');
    }

    // 检查是否引入无法验证、无法复现、无法解释的机制
    if (this.hasUnverifiableMechanisms(capability)) {
      issues.push('引入无法验证、无法复现、无法解释的机制');
    }

    // 检查是否使用模糊概念替代可执行策略
    if (this.usesVagueConcepts(capability)) {
      issues.push('使用模糊概念替代可执行策略');
    }

    // 检查是否把"感觉正确"当作决策依据
    if (this.usesSubjectiveJudgment(capability)) {
      issues.push('把"感觉正确"当作决策依据');
    }

    // 检查能力是否能被清楚描述其输入、输出和失败模式
    if (!this.isWellDefined(capability)) {
      issues.push('能力无法被清楚描述其输入、输出和失败模式');
    }

    if (issues.length > 0) {
      console.log('⚠️  检测到劣化进化行为:', issues);
      return { hasDegeneration: true, issues: issues };
    }

    console.log('✅ 未检测到劣化进化行为');
    return { hasDegeneration: false, issues: [] };
  }

  // 检查是否过度复杂
  isOverlyComplex(capability) {
    // 检查步骤数量是否过多
    if (capability.steps && capability.steps.length > 10) {
      return true;
    }

    // 检查输入输出是否过于复杂
    if (capability.inputs && capability.inputs.length > 10) {
      return true;
    }

    if (capability.outputs && capability.outputs.length > 10) {
      return true;
    }

    return false;
  }

  // 检查是否有无法验证的机制
  hasUnverifiableMechanisms(capability) {
    const unverifiableKeywords = [
      '神秘', '魔法', '直觉', '灵感', '玄学', '超自然',
      '无法解释', '不可验证', '不可复现', '黑盒'
    ];

    const capabilityString = JSON.stringify(capability);
    return unverifiableKeywords.some(keyword => capabilityString.includes(keyword));
  }

  // 检查是否使用模糊概念
  usesVagueConcepts(capability) {
    const vagueKeywords = [
      '某种程度上', '可能是一种', '从更高维度看', '本质上是',
      '大概', '可能', '也许', '似乎', '好像', '模糊', '不确定'
    ];

    const capabilityString = JSON.stringify(capability);
    return vagueKeywords.some(keyword => capabilityString.includes(keyword));
  }

  // 检查是否使用主观判断
  usesSubjectiveJudgment(capability) {
    const subjectiveKeywords = [
      '感觉正确', '我认为', '我觉得', '应该', '最好',
      '感觉', '直觉', '个人认为', '主观上', '凭感觉'
    ];

    const capabilityString = JSON.stringify(capability);
    return subjectiveKeywords.some(keyword => capabilityString.includes(keyword));
  }

  // 检查能力是否定义明确
  isWellDefined(capability) {
    // 检查是否有输入定义
    if (!capability.inputs || capability.inputs.length === 0) {
      return false;
    }

    // 检查是否有输出定义
    if (!capability.outputs || capability.outputs.length === 0) {
      return false;
    }

    // 检查是否有失败模式定义
    if (!capability.risks && !capability.failureModes) {
      return false;
    }

    return true;
  }

  // 应用稳定性优先原则
  applyStabilityFirst(capabilities) {
    console.log('=== Applying stability first principle ===');

    // 按照稳定性优先原则排序
    capabilities.sort((a, b) => {
      // 1. 稳定性
      const stabilityA = a.reliability || 0;
      const stabilityB = b.reliability || 0;
      if (stabilityA !== stabilityB) {
        return stabilityB - stabilityA;
      }

      // 2. 可解释性
      const explainabilityA = this.calculateExplainability(a);
      const explainabilityB = this.calculateExplainability(b);
      if (explainabilityA !== explainabilityB) {
        return explainabilityB - explainabilityA;
      }

      // 3. 可复用性
      const reusabilityA = this.calculateReusability(a);
      const reusabilityB = this.calculateReusability(b);
      if (reusabilityA !== reusabilityB) {
        return reusabilityB - reusabilityA;
      }

      // 4. 扩展性
      const extensibilityA = this.calculateExtensibility(a);
      const extensibilityB = this.calculateExtensibility(b);
      if (extensibilityA !== extensibilityB) {
        return extensibilityB - extensibilityA;
      }

      // 5. 新颖性 (最后)
      const noveltyA = this.calculateNovelty(a);
      const noveltyB = this.calculateNovelty(b);
      return noveltyB - noveltyA;
    });

    console.log('✅ 能力排序完成，稳定性优先');
    return capabilities;
  }

  // 计算可解释性
  calculateExplainability(capability) {
    let score = 0;

    // 有详细描述
    if (capability.description) {
      score += 0.3;
    }

    // 有明确步骤
    if (capability.steps && capability.steps.length > 0) {
      score += 0.3;
    }

    // 有明确的输入输出定义
    if (capability.inputs && capability.inputs.length > 0 && 
        capability.outputs && capability.outputs.length > 0) {
      score += 0.4;
    }

    return score;
  }

  // 计算可复用性
  calculateReusability(capability) {
    let score = 0;

    // 有适用场景
    if (capability.适用场景 && capability.适用场景.length > 0) {
      score += 0.5;
    }

    // 有清晰的输入输出接口
    if (capability.inputs && capability.inputs.length > 0 && 
        capability.outputs && capability.outputs.length > 0) {
      score += 0.5;
    }

    return score;
  }

  // 计算扩展性
  calculateExtensibility(capability) {
    let score = 0;

    // 有模块化设计
    if (capability.steps && capability.steps.length > 0) {
      score += 0.5;
    }

    // 有参数化设计
    if (capability.inputs && capability.inputs.some(input => input.type === 'object')) {
      score += 0.5;
    }

    return score;
  }

  // 计算新颖性
  calculateNovelty(capability) {
    let score = 0;

    // 检查是否有新的方法或思路
    if (capability.name && (capability.name.includes('新') || capability.name.includes('创新'))) {
      score += 0.5;
    }

    // 检查是否有独特的步骤
    if (capability.steps && capability.steps.some(step => step.includes('新') || step.includes('创新'))) {
      score += 0.5;
    }

    return score;
  }

  // 反玄学检测
  detectMetaphysicalLanguage(text) {
    console.log('=== Detecting metaphysical language ===');

    const metaphysicalPatterns = [
      '某种程度上',
      '可能是一种',
      '从更高维度看',
      '本质上是'
    ];

    const foundPatterns = [];
    for (const pattern of metaphysicalPatterns) {
      if (text.includes(pattern)) {
        foundPatterns.push(pattern);
      }
    }

    if (foundPatterns.length > 0) {
      console.log('⚠️  检测到玄学语言模式:', foundPatterns);
      return { hasMetaphysicalLanguage: true, patterns: foundPatterns };
    }

    console.log('✅ 未检测到玄学语言模式');
    return { hasMetaphysicalLanguage: false, patterns: [] };
  }

  // 记录能力版本
  recordCapabilityVersion(capability) {
    const capabilityId = capability.name || `capability_${Date.now()}`;
    
    if (!this.capabilityVersions[capabilityId]) {
      this.capabilityVersions[capabilityId] = [];
    }

    this.capabilityVersions[capabilityId].push({
      version: this.capabilityVersions[capabilityId].length + 1,
      timestamp: new Date().toISOString(),
      capability: JSON.parse(JSON.stringify(capability)),
      evolutionHypothesis: capability.evolutionHypothesis || 'Improve system capabilities',
      rollbackConditions: capability.rollbackConditions || ['Decreased success rate', 'Decreased reliability']
    });

    this.saveCapabilityVersions();
    console.log(`✅ 记录能力版本: ${capabilityId} v${this.capabilityVersions[capabilityId].length}`);
  }

  // 回滚能力到上一版本
  rollbackCapability(capabilityId) {
    console.log(`=== Rolling back capability: ${capabilityId} ===`);

    if (!this.capabilityVersions[capabilityId] || this.capabilityVersions[capabilityId].length <= 1) {
      console.log('❌ 没有足够的版本记录进行回滚');
      return null;
    }

    // 移除当前版本
    const currentVersion = this.capabilityVersions[capabilityId].pop();
    // 获取上一稳定版本
    const previousVersion = this.capabilityVersions[capabilityId][this.capabilityVersions[capabilityId].length - 1];

    this.saveCapabilityVersions();
    console.log(`✅ 回滚到版本: v${previousVersion.version}`);
    return previousVersion.capability;
  }

  // 检查是否需要回滚
  shouldRollback(capability, performanceMetrics) {
    console.log('=== Checking if rollback is needed ===');

    // 检查成功率是否降低
    if (performanceMetrics.successRate < 0.8) {
      console.log('⚠️  成功率低于80%，需要回滚');
      return true;
    }

    // 检查可靠性是否降低
    if (performanceMetrics.reliability < 0.8) {
      console.log('⚠️  可靠性低于80%，需要回滚');
      return true;
    }

    // 检查执行时间是否显著增加
    if (performanceMetrics.executionTime > 10000) { // 10秒
      console.log('⚠️  执行时间过长，需要回滚');
      return true;
    }

    console.log('✅ 不需要回滚');
    return false;
  }

  // 验证进化产物是否能落实为明确的行为变化
  validateBehavioralChanges(product) {
    console.log('=== Validating behavioral changes ===');

    // 检查能力轮廓
    if (product.type === 'capability_shape') {
      if (!product.steps || product.steps.length === 0) {
        console.log('⚠️  能力轮廓缺少具体步骤');
        return false;
      }

      if (!product.inputs || !product.outputs) {
        console.log('⚠️  能力轮廓缺少输入输出定义');
        return false;
      }
    }

    // 检查默认策略
    if (product.type === 'default_strategy') {
      if (!product.actions || product.actions.length === 0) {
        console.log('⚠️  默认策略缺少具体行动');
        return false;
      }

      if (!product.conditions || product.conditions.length === 0) {
        console.log('⚠️  默认策略缺少适用条件');
        return false;
      }
    }

    // 检查行为规则
    if (product.type === 'behavioral_rule') {
      if (!product.condition || !product.action) {
        console.log('⚠️  行为规则缺少条件或行动');
        return false;
      }
    }

    console.log('✅ 进化产物能够落实为明确的行为变化');
    return true;
  }
}

module.exports = AntiDegenerationLock;