/**
 * 反进化锁定协议 (ADL) 核心模块
 * 实现ADL协议的核心功能，包括禁止行为检测、核心原则验证、回滚机制等
 */

const fs = require('fs');
const path = require('path');

// 配置参数
const CONFIG = {
  // 基础配置
  status: 'ENFORCED', // 强制启用
  priority: 'LEVEL0', // 最高优先级
  overridePCEC: true, // 优先级高于PCEC
  
  // 路径配置
  baseDir: path.join(__dirname),
  dataDir: path.join(__dirname, 'data'),
  modulesDir: path.join(__dirname, 'modules'),
  testsDir: path.join(__dirname, 'tests'),
  
  // 数据文件
  rollbackPointsFile: path.join(__dirname, 'data', 'rollback-points.json'),
  violationLogFile: path.join(__dirname, 'data', 'violation-log.json'),
  statusFile: path.join(__dirname, 'data', 'adl-status.json')
};

// 确保目录和文件存在
function ensureDirectories() {
  const directories = [
    CONFIG.baseDir,
    CONFIG.dataDir,
    CONFIG.modulesDir,
    CONFIG.testsDir
  ];
  
  directories.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`[ADL] Created directory: ${dir}`);
    }
  });
  
  // 确保数据文件存在
  const files = [
    CONFIG.rollbackPointsFile,
    CONFIG.violationLogFile,
    CONFIG.statusFile
  ];
  
  files.forEach(file => {
    if (!fs.existsSync(file)) {
      fs.writeFileSync(file, JSON.stringify({}, null, 2), 'utf8');
      console.log(`[ADL] Created file: ${file}`);
    }
  });
}

// ADL核心类
class AntiDegenerationLock {
  constructor() {
    this.config = CONFIG;
    this.rollbackPoints = [];
    this.violations = [];
    this.status = {
      enabled: true,
      lastCheck: null,
      violationsCount: 0,
      rollbacksCount: 0
    };
    
    // 初始化
    this.initialize();
  }
  
  // 初始化
  initialize() {
    ensureDirectories();
    this.loadRollbackPoints();
    this.loadViolations();
    this.loadStatus();
    
    console.log('[ADL] Anti-Degeneration Lock initialized');
    console.log(`[ADL] Status: ${this.config.status}`);
    console.log(`[ADL] Priority: ${this.config.priority}`);
  }
  
  // 加载回滚点
  loadRollbackPoints() {
    try {
      const data = fs.readFileSync(this.config.rollbackPointsFile, 'utf8');
      const parsedData = JSON.parse(data);
      this.rollbackPoints = Array.isArray(parsedData) ? parsedData : [];
    } catch (error) {
      console.error(`[ADL] Error loading rollback points: ${error.message}`);
      this.rollbackPoints = [];
    }
  }
  
  // 保存回滚点
  saveRollbackPoints() {
    try {
      fs.writeFileSync(this.config.rollbackPointsFile, JSON.stringify(this.rollbackPoints, null, 2), 'utf8');
    } catch (error) {
      console.error(`[ADL] Error saving rollback points: ${error.message}`);
    }
  }
  
  // 加载违规记录
  loadViolations() {
    try {
      const data = fs.readFileSync(this.config.violationLogFile, 'utf8');
      const parsedData = JSON.parse(data);
      this.violations = Array.isArray(parsedData) ? parsedData : [];
    } catch (error) {
      console.error(`[ADL] Error loading violations: ${error.message}`);
      this.violations = [];
    }
  }
  
  // 保存违规记录
  saveViolations() {
    try {
      fs.writeFileSync(this.config.violationLogFile, JSON.stringify(this.violations, null, 2), 'utf8');
    } catch (error) {
      console.error(`[ADL] Error saving violations: ${error.message}`);
    }
  }
  
  // 加载状态
  loadStatus() {
    try {
      const data = fs.readFileSync(this.config.statusFile, 'utf8');
      this.status = JSON.parse(data);
    } catch (error) {
      console.error(`[ADL] Error loading status: ${error.message}`);
    }
  }
  
  // 保存状态
  saveStatus() {
    try {
      fs.writeFileSync(this.config.statusFile, JSON.stringify(this.status, null, 2), 'utf8');
    } catch (error) {
      console.error(`[ADL] Error saving status: ${error.message}`);
    }
  }
  
  // 创建回滚点
  createRollbackPoint(description, state, failureConditions = []) {
    const rollbackPoint = {
      id: `rb_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
      description,
      state: state || {},
      failureConditions: failureConditions.length > 0 ? failureConditions : [
        '成功率 < 90%',
        '进化降低确定性',
        '进化引入无法解释的机制',
        '进化违反禁止行为',
        '进化引入模糊概念',
        '系统稳定性下降',
        '响应时间增加50%以上',
        '错误率增加20%以上'
      ],
      successThreshold: 0.9, // 成功率阈值 90%
      isActive: true
    };
    
    this.rollbackPoints.push(rollbackPoint);
    this.saveRollbackPoints();
    
    console.log(`[ADL] Created rollback point: ${rollbackPoint.id}`);
    console.log(`[ADL] Rollback description: ${rollbackPoint.description}`);
    console.log(`[ADL] Failure conditions: ${rollbackPoint.failureConditions.join(', ')}`);
    console.log(`[ADL] Success threshold: ${rollbackPoint.successThreshold * 100}%`);
    return rollbackPoint;
  }
  
  // 回滚到指定点
  rollbackToPoint(rollbackPointId, reasons = []) {
    const rollbackPoint = this.rollbackPoints.find(rp => rp.id === rollbackPointId || rp.id.includes(rollbackPointId));
    
    if (!rollbackPoint) {
      console.error(`[ADL] Rollback point not found: ${rollbackPointId}`);
      return false;
    }
    
    // 执行回滚逻辑
    console.log(`[ADL] Rolling back to point: ${rollbackPoint.id}`);
    console.log(`[ADL] Rollback description: ${rollbackPoint.description}`);
    console.log(`[ADL] Rollback reasons: ${reasons.join(', ')}`);
    if (rollbackPoint.failureConditions) {
      console.log(`[ADL] Failure conditions: ${rollbackPoint.failureConditions.join(', ')}`);
    }
    
    // 标记回滚点为已使用
    rollbackPoint.isActive = false;
    rollbackPoint.usedAt = Date.now();
    rollbackPoint.reasons = reasons;
    
    // 保存回滚点
    this.saveRollbackPoints();
    
    // 更新状态
    this.status.rollbacksCount++;
    this.status.lastCheck = Date.now();
    this.saveStatus();
    
    // 记录违规
    this.logViolation('ROLLBACK', reasons.join(', '), {
      rollbackPointId: rollbackPoint.id,
      rollbackDescription: rollbackPoint.description,
      failureConditions: rollbackPoint.failureConditions
    });
    
    return true;
  }
  
  // 检测禁止行为
  detectForbiddenBehaviors(capability) {
    const forbiddenBehaviors = [];
    
    // 1. Fake Intelligence: 为了"显得聪明"增加无意义的复杂步骤
    if (this.detectFakeIntelligence(capability)) {
      forbiddenBehaviors.push('FAKE_INTELLIGENCE');
    }
    
    // 2. Unverifiable: 引入无法验证结果的机制
    if (this.detectUnverifiable(capability)) {
      forbiddenBehaviors.push('UNVERIFIABLE');
    }
    
    // 3. Vague Concepts: 使用"感觉"、"直觉"、"维度"等玄学术语
    if (this.detectVagueConcepts(capability)) {
      forbiddenBehaviors.push('VAGUE_CONCEPTS');
    }
    
    // 4. Novelty Bias: 为了新颖而牺牲稳定
    if (this.detectNoveltyBias(capability)) {
      forbiddenBehaviors.push('NOVELTY_BIAS');
    }
    
    return forbiddenBehaviors;
  }
  
  // 检测Fake Intelligence
  detectFakeIntelligence(capability) {
    const signs = [
      // 检查是否有过多的步骤
      capability.steps && capability.steps.length > 10,
      // 检查是否有重复的步骤
      capability.steps && this.hasDuplicateSteps(capability.steps),
      // 检查是否有明显无意义的步骤
      capability.description && capability.description.includes('复杂') && !capability.description.includes('必要'),
      // 检查是否有不必要的计算或操作
      capability.inputs && capability.inputs.length > 10,
      capability.outputs && capability.outputs.length > 10,
      // 检查是否有"显得聪明"的表述
      capability.description && (capability.description.includes('显得聪明') || capability.description.includes('看起来复杂')),
      // 检查是否有冗余的输入输出
      capability.inputs && capability.outputs && capability.inputs.length > 5 && capability.outputs.length > 5 && capability.inputs.length === capability.outputs.length
    ];
    
    return signs.some(sign => sign);
  }
  
  // 检测是否有重复步骤
  hasDuplicateSteps(steps) {
    const stepTexts = steps.map(step => step.toLowerCase().trim());
    const uniqueSteps = [...new Set(stepTexts)];
    return uniqueSteps.length < stepTexts.length;
  }
  
  // 检测Unverifiable
  detectUnverifiable(capability) {
    const signs = [
      // 检查是否有无法验证的输出
      !capability.outputs || capability.outputs.length === 0,
      // 检查是否有无法验证的前提条件
      capability.prerequisites && capability.prerequisites.some(p => p.includes('无法验证')),
      // 检查是否有无法验证的失败边界
      capability.failureBoundaries && capability.failureBoundaries.some(fb => fb.includes('无法验证')),
      // 检查描述中是否有无法验证的术语
      capability.description && (capability.description.includes('神秘') || capability.description.includes('未知') || capability.description.includes('无法解释'))
    ];
    
    return signs.some(sign => sign);
  }
  
  // 检测Vague Concepts
  detectVagueConcepts(capability) {
    const vagueTerms = [
      '感觉', '直觉', '维度', '能量', '频率', '振动', '意识',
      '灵感', '悟性', '道', '禅', '玄学', '神秘', '未知',
      '潜意识', '超意识', '集体意识', '宇宙意识',
      // 新协议中提到的术语
      '直觉', '维度', '感觉'
    ];
    
    const textToCheck = [
      capability.name,
      capability.description,
      capability.inputs && capability.inputs.join(' '),
      capability.outputs && capability.outputs.join(' '),
      capability.prerequisites && capability.prerequisites.join(' '),
      capability.failureBoundaries && capability.failureBoundaries.join(' ')
    ].filter(Boolean).join(' ').toLowerCase();
    
    return vagueTerms.some(term => textToCheck.includes(term.toLowerCase()));
  }
  
  // 检测Novelty Bias
  detectNoveltyBias(capability) {
    const noveltyTerms = [
      '新颖', '创新', '全新', '革命性', '突破性', '前卫',
      '时尚', '潮流', '趋势', '领先', '先进', '尖端'
    ];
    
    const stabilityTerms = [
      '稳定', '可靠', '安全', '成熟', '经过验证', '可预测',
      '一致', '持续', '持久', '耐用'
    ];
    
    const textToCheck = [
      capability.name,
      capability.description,
      capability.inputs && capability.inputs.join(' '),
      capability.outputs && capability.outputs.join(' '),
      capability.prerequisites && capability.prerequisites.join(' '),
      capability.failureBoundaries && capability.failureBoundaries.join(' ')
    ].filter(Boolean).join(' ').toLowerCase();
    
    const noveltyCount = noveltyTerms.filter(term => textToCheck.includes(term.toLowerCase())).length;
    const stabilityCount = stabilityTerms.filter(term => textToCheck.includes(term.toLowerCase())).length;
    
    // 如果新颖性术语比稳定性术语多，且稳定性术语少于2个，则可能存在Novelty Bias
    return noveltyCount > stabilityCount && stabilityCount < 2;
  }
  
  // 验证核心原则排序
  validateCorePrinciples(capability) {
    const principles = {
      stability: 0,
      explainability: 0,
      reusability: 0,
      scalability: 0,
      novelty: 0
    };
    
    // 分析能力描述，计算各原则的得分
    const textToCheck = [
      capability.name,
      capability.description,
      capability.inputs && capability.inputs.join(' '),
      capability.outputs && capability.outputs.join(' '),
      capability.prerequisites && capability.prerequisites.join(' '),
      capability.failureBoundaries && capability.failureBoundaries.join(' ')
    ].filter(Boolean).join(' ').toLowerCase();
    
    // 稳定性相关术语
    const stabilityTerms = ['稳定', '可靠', '安全', '成熟', '经过验证', '可预测', '能跑1000次', '不崩'];
    principles.stability = stabilityTerms.filter(term => textToCheck.includes(term)).length;
    
    // 可解释性相关术语
    const explainabilityTerms = ['解释', '说明', '理解', '清晰', '透明', '逻辑', '能说清为什么'];
    principles.explainability = explainabilityTerms.filter(term => textToCheck.includes(term)).length;
    
    // 可复用性相关术语
    const reusabilityTerms = ['复用', '通用', '适用', '多种', '不同场景', '灵活', '能用在别的场景'];
    principles.reusability = reusabilityTerms.filter(term => textToCheck.includes(term)).length;
    
    // 可扩展性相关术语
    const scalabilityTerms = ['扩展', '增长', '量级', '性能', '效率', '优化', '能应对量级增长'];
    principles.scalability = scalabilityTerms.filter(term => textToCheck.includes(term)).length;
    
    // 新颖性相关术语
    const noveltyTerms = ['新颖', '创新', '全新', '革命性', '突破性'];
    principles.novelty = noveltyTerms.filter(term => textToCheck.includes(term)).length;
    
    // 验证原则排序：Stability > Explainability > Reusability > Scalability > Novelty
    const isValid = (
      principles.stability >= principles.explainability &&
      principles.explainability >= principles.reusability &&
      principles.reusability >= principles.scalability &&
      principles.scalability >= principles.novelty
    );
    
    return {
      isValid,
      principles,
      violations: this.getPrincipleViolations(principles)
    };
  }
  
  // 获取原则违反情况
  getPrincipleViolations(principles) {
    const violations = [];
    
    if (principles.stability < principles.explainability) {
      violations.push('稳定性应优先于可解释性');
    }
    
    if (principles.explainability < principles.reusability) {
      violations.push('可解释性应优先于可复用性');
    }
    
    if (principles.reusability < principles.scalability) {
      violations.push('可复用性应优先于可扩展性');
    }
    
    if (principles.scalability < principles.novelty) {
      violations.push('可扩展性应优先于新颖性');
    }
    
    return violations;
  }
  
  // 验证能力是否符合ADL协议
  validateCapability(capability) {
    const result = {
      isValid: true,
      violations: [],
      details: {
        forbiddenBehaviors: [],
        principleViolations: [],
        otherIssues: []
      }
    };
    
    // 检测禁止行为
    const forbiddenBehaviors = this.detectForbiddenBehaviors(capability);
    if (forbiddenBehaviors.length > 0) {
      result.isValid = false;
      result.details.forbiddenBehaviors = forbiddenBehaviors;
      forbiddenBehaviors.forEach(behavior => {
        result.violations.push(`禁止行为: ${behavior}`);
      });
    }
    
    // 验证核心原则
    const principleValidation = this.validateCorePrinciples(capability);
    if (!principleValidation.isValid) {
      result.isValid = false;
      result.details.principleViolations = principleValidation.violations;
      principleValidation.violations.forEach(violation => {
        result.violations.push(`核心原则违反: ${violation}`);
      });
    }
    
    // 检查其他问题
    if (!capability.name || capability.name.trim() === '') {
      result.isValid = false;
      result.details.otherIssues.push('能力必须有名称');
      result.violations.push('能力必须有名称');
    }
    
    if (!capability.inputs || capability.inputs.length === 0) {
      result.isValid = false;
      result.details.otherIssues.push('能力必须有输入条件');
      result.violations.push('能力必须有输入条件');
    }
    
    if (!capability.outputs || capability.outputs.length === 0) {
      result.isValid = false;
      result.details.otherIssues.push('能力必须有输出结果');
      result.violations.push('能力必须有输出结果');
    }
    
    if (!capability.prerequisites || capability.prerequisites.length === 0) {
      result.isValid = false;
      result.details.otherIssues.push('能力必须有成功前提');
      result.violations.push('能力必须有成功前提');
    }
    
    if (!capability.failureBoundaries || capability.failureBoundaries.length === 0) {
      result.isValid = false;
      result.details.otherIssues.push('能力必须有失败边界');
      result.violations.push('能力必须有失败边界');
    }
    
    // 更新状态
    this.status.lastCheck = Date.now();
    if (!result.isValid) {
      this.status.violationsCount += result.violations.length;
      // 记录违规
      this.logViolation('CAPABILITY_VALIDATION', result.violations.join(', '), capability);
    }
    this.saveStatus();
    
    return result;
  }
  
  // 验证进化是否符合ADL协议
  validateEvolution(evolution) {
    const result = {
      valid: true,
      reason: '',
      details: {}
    };
    
    // 检查进化对象
    if (!evolution) {
      result.valid = false;
      result.reason = '进化对象不能为空';
      return result;
    }
    
    // 检查进化类型
    if (!evolution.type) {
      result.valid = false;
      result.reason = '进化类型不能为空';
      return result;
    }
    
    // 检查进化消息
    if (!evolution.message) {
      result.valid = false;
      result.reason = '进化消息不能为空';
      return result;
    }
    
    // 检查能力对象
    if (evolution.capability) {
      const capabilityValidation = this.validateCapability(evolution.capability);
      if (!capabilityValidation.isValid) {
        result.valid = false;
        result.reason = `能力验证失败: ${capabilityValidation.violations.join('; ')}`;
        result.details = capabilityValidation.details;
        return result;
      }
    }
    
    // 检查是否有禁止行为
    // 只对能力对象进行禁止行为检测，而不是整个进化对象
    if (evolution.capability) {
      const forbiddenBehaviors = this.detectForbiddenBehaviors(evolution.capability);
      if (forbiddenBehaviors.length > 0) {
        result.valid = false;
        result.reason = `检测到禁止行为: ${forbiddenBehaviors.join(', ')}`;
        result.details.forbiddenBehaviors = forbiddenBehaviors;
        return result;
      }
    }
    
    // 检查核心原则
    // 只对能力对象进行核心原则验证，而不是整个进化对象
    if (evolution.capability) {
      const principleValidation = this.validateCorePrinciples(evolution.capability);
      if (!principleValidation.isValid) {
        result.valid = false;
        result.reason = `核心原则违反: ${principleValidation.violations.join('; ')}`;
        result.details.principleViolations = principleValidation.violations;
        return result;
      }
    }
    
    // 更新状态
    this.status.lastCheck = Date.now();
    this.saveStatus();
    
    return result;
  }
  
  // 记录违规
  logViolation(type, reason, details = {}) {
    const violation = {
      id: `viol_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
      type,
      reason,
      details
    };
    
    this.violations.push(violation);
    this.saveViolations();
    
    console.log(`[ADL] Logged violation: ${type} - ${reason}`);
    return violation;
  }
  
  // 获取状态
  getStatus() {
    return {
      ...this.status,
      config: {
        status: this.config.status,
        priority: this.config.priority,
        overridePCEC: this.config.overridePCEC
      },
      statistics: {
        totalRollbackPoints: this.rollbackPoints.length,
        activeRollbackPoints: this.rollbackPoints.filter(rp => rp.isActive).length,
        totalViolations: this.violations.length,
        recentViolations: this.violations.slice(-10)
      }
    };
  }
  
  // 检查优先级
  checkPriority() {
    return this.config.priority === 'LEVEL0';
  }
  
  // 检查是否启用
  isEnabled() {
    return this.status.enabled && this.config.status === 'ENFORCED';
  }
  
  // 启用ADL
  enable() {
    this.status.enabled = true;
    this.config.status = 'ENFORCED';
    this.saveStatus();
    console.log('[ADL] Anti-Degeneration Lock enabled');
  }
  
  // 禁用ADL
  disable() {
    this.status.enabled = false;
    this.config.status = 'DISABLED';
    this.saveStatus();
    console.log('[ADL] Anti-Degeneration Lock disabled');
  }
  
  // 检查失败条件
  checkFailureConditions(metrics) {
    const failures = [];
    
    // 检查成功率
    if (metrics.successRate !== undefined && metrics.successRate < 0.9) {
      failures.push(`成功率低于阈值: ${metrics.successRate * 100}% < 90%`);
    }
    
    // 检查响应时间
    if (metrics.responseTime !== undefined && metrics.responseTime > 1.5) {
      failures.push(`响应时间增加超过50%: ${(metrics.responseTime - 1) * 100}%`);
    }
    
    // 检查错误率
    if (metrics.errorRate !== undefined && metrics.errorRate > 0.2) {
      failures.push(`错误率增加超过20%: ${metrics.errorRate * 100}%`);
    }
    
    // 检查稳定性
    if (metrics.stability !== undefined && metrics.stability < 0.9) {
      failures.push(`系统稳定性下降: ${metrics.stability * 100}%`);
    }
    
    return failures;
  }
  
  // 一键回滚到最新点
  rollbackToLatest(reasons = []) {
    // 找到最新的活跃回滚点
    const activeRollbackPoints = this.rollbackPoints.filter(rp => rp.isActive);
    if (activeRollbackPoints.length === 0) {
      console.error('[ADL] No active rollback points found');
      return false;
    }
    
    // 按时间戳排序，获取最新的
    activeRollbackPoints.sort((a, b) => b.timestamp - a.timestamp);
    const latestRollbackPoint = activeRollbackPoints[0];
    
    // 执行回滚
    return this.rollbackToPoint(latestRollbackPoint.id, reasons);
  }
  
  // 检测并自动回滚
  detectAndRollback(metrics) {
    const failures = this.checkFailureConditions(metrics);
    if (failures.length > 0) {
      console.warn('[ADL] Failure conditions detected:', failures);
      console.warn('[ADL] Initiating automatic rollback');
      return this.rollbackToLatest(failures);
    }
    return false;
  }
}

// 导出单例实例
let adlInstance = null;

function getADLInstance() {
  if (!adlInstance) {
    adlInstance = new AntiDegenerationLock();
  }
  return adlInstance;
}

// 导出模块
module.exports = {
  AntiDegenerationLock,
  getADLInstance,
  CONFIG
};

// 示例用法
if (require.main === module) {
  const adl = getADLInstance();
  
  // 测试创建回滚点
  const rollbackPoint = adl.createRollbackPoint('测试回滚点', { test: 'data' });
  
  // 测试回滚
  setTimeout(() => {
    adl.rollbackToPoint(rollbackPoint.id, ['测试回滚原因']);
  }, 2000);
  
  // 测试能力验证
  const testCapability = {
    name: '测试能力',
    description: '这是一个测试能力，包含稳定的功能',
    inputs: ['输入1', '输入2'],
    outputs: ['输出1', '输出2'],
    prerequisites: ['前提1', '前提2'],
    failureBoundaries: ['边界1', '边界2']
  };
  
  const validationResult = adl.validateCapability(testCapability);
  console.log('能力验证结果:', validationResult);
  
  // 测试进化验证
  const testEvolution = {
    type: 'NEW_FEATURE',
    message: '添加新功能',
    capability: testCapability
  };
  
  const evolutionValidation = adl.validateEvolution(testEvolution);
  console.log('进化验证结果:', evolutionValidation);
  
  // 获取状态
  console.log('ADL状态:', adl.getStatus());
}
