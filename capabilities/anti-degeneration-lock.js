/**
 * 反进化锁定系统 (Anti-Degeneration Lock System)
 * 确保进化过程不会引入不稳定性或降低现有能力
 * 完整实现 ADL 协议
 */

class AntiDegenerationLock {
  constructor() {
    this.status = 'ACTIVE';
    this.priority = 'HIGHEST';
    this.prohibitedBehaviors = [
      '为了"显得更聪明"而增加复杂度',
      '引入无法验证、无法复现、无法解释的机制',
      '使用模糊概念替代可执行策略',
      '把"感觉正确"当作决策依据',
      '无法清楚描述输入、输出和失败模式的能力'
    ];
    this.stabilityPriority = [
      '稳定性',
      '可解释性',
      '可复用性',
      '扩展性',
      '新颖性'
    ];
    this.antiMetaphysicsPatterns = [
      '某种程度上',
      '可能是一种',
      '从更高维度看',
      '本质上是'
    ];
    this.rollbackPoints = [];
    this.maxRollbackPoints = 10;
    this.evolutionHistory = [];
    this.maxHistoryItems = 50;
  }

  // 验证进化是否违反反进化锁定
  validateEvolution(evolutionResult) {
    const violations = [];

    // 检查是否为成功的进化
    if (!evolutionResult.success) {
      violations.push('Evolution task failed');
    }

    // 检查是否有明确的输入输出描述
    if (!evolutionResult.type || !evolutionResult.message) {
      violations.push('Evolution lacks clear type or message');
    }

    // 检查是否使用模糊语言
    if (evolutionResult.message) {
      const message = evolutionResult.message.toLowerCase();
      for (const pattern of this.antiMetaphysicsPatterns) {
        if (message.includes(pattern)) {
          violations.push(`Use of prohibited metaphysical language: ${pattern}`);
        }
      }
    }

    // 检查是否为实质性进化
    const substantialTypes = ['new-feature', 'new-abstract', 'new-lever', 'newFeature', 'newAbstract', 'newLever'];
    if (!substantialTypes.includes(evolutionResult.type)) {
      violations.push('Evolution is not substantial');
    }

    // 检查是否违反禁止行为
    if (evolutionResult.message) {
      if (this.containsProhibitedBehavior(evolutionResult.message)) {
        violations.push('Evolution contains prohibited behavior');
      }
    }

    // 检查能力描述完整性
    if (evolutionResult.capability) {
      const capability = evolutionResult.capability;
      if (!capability.inputs || !capability.outputs || !capability.failureBoundaries) {
        violations.push('Capability lacks clear input, output, or failure mode description');
      }
    }

    // 记录进化历史
    this.recordEvolutionHistory(evolutionResult, violations);

    return {
      valid: violations.length === 0,
      violations: violations,
      reason: violations.length > 0 ? violations[0] : 'No ADL violations detected'
    };
  }

  // 计算能力评分
  calculateCapabilityScore(capability) {
    let score = 0;

    // 基于描述的通用性评分
    if (capability.description) {
      const genericWords = ['general', 'universal', 'common', 'basic', 'core'];
      genericWords.forEach(word => {
        if (capability.description.toLowerCase().includes(word)) {
          score += 2;
        }
      });
    }

    // 基于名称的稳健性评分
    if (capability.name) {
      const robustWords = ['stable', 'reliable', 'robust', 'proven', 'tested'];
      robustWords.forEach(word => {
        if (capability.name.toLowerCase().includes(word)) {
          score += 2;
        }
      });
    }

    // 基于输入输出的完整性评分
    if (capability.inputs && capability.inputs.length > 0) {
      score += 3;
    }
    if (capability.outputs && capability.outputs.length > 0) {
      score += 3;
    }

    // 基于前提条件的可靠性评分
    if (capability.prerequisites && capability.prerequisites.length > 0) {
      score += 2;
    }

    // 基于失败边界的安全性评分
    if (capability.failureBoundaries && capability.failureBoundaries.length > 0) {
      score += 3;
    }

    // 基于稳定性优先原则的评分
    if (capability.type) {
      if (capability.type.includes('stable') || capability.type.includes('reliable')) {
        score += 5;
      }
    }

    // 基础分数
    score += 5;

    return score;
  }

  // 检查能力冲突
  checkCapabilityConflicts(newCapability, existingCapabilities) {
    const conflicts = [];

    existingCapabilities.forEach(capability => {
      // 检查名称冲突
      if (capability.name === newCapability.name) {
        conflicts.push({
          type: 'name-conflict',
          existingCapability: capability,
          newCapability: newCapability,
          reason: 'Capability name already exists'
        });
      }

      // 检查功能重叠
      if (capability.description && newCapability.description) {
        const existingDesc = capability.description.toLowerCase();
        const newDesc = newCapability.description.toLowerCase();
        if (existingDesc.includes(newDesc) || newDesc.includes(existingDesc)) {
          conflicts.push({
            type: 'function-overlap',
            existingCapability: capability,
            newCapability: newCapability,
            reason: 'Capability functionality overlaps with existing capability'
          });
        }
      }

      // 检查输入输出冲突
      if (capability.inputs && newCapability.inputs) {
        const inputOverlap = capability.inputs.some(input => 
          newCapability.inputs.includes(input)
        );
        if (inputOverlap) {
          conflicts.push({
            type: 'input-conflict',
            existingCapability: capability,
            newCapability: newCapability,
            reason: 'Capability inputs overlap with existing capability'
          });
        }
      }

      // 检查稳定性冲突
      const existingScore = this.calculateCapabilityScore(capability);
      const newScore = this.calculateCapabilityScore(newCapability);
      if (newScore < existingScore) {
        conflicts.push({
          type: 'stability-conflict',
          existingCapability: capability,
          newCapability: newCapability,
          reason: 'New capability has lower stability score than existing one'
        });
      }
    });

    return conflicts;
  }

  // 解决能力冲突
  resolveCapabilityConflicts(conflicts) {
    const resolvedCapabilities = [];
    const rejectedCapabilities = [];

    conflicts.forEach(conflict => {
      switch (conflict.type) {
        case 'name-conflict':
          // 为新能力生成新名称
          const newName = `${conflict.newCapability.name} (v2)`;
          const resolvedCapability = {
            ...conflict.newCapability,
            name: newName,
            resolved: true,
            resolution: 'Renamed to avoid conflict'
          };
          resolvedCapabilities.push(resolvedCapability);
          break;

        case 'function-overlap':
        case 'input-conflict':
        case 'stability-conflict':
          // 比较能力的通用性和稳健性
          const existingScore = this.calculateCapabilityScore(conflict.existingCapability);
          const newScore = this.calculateCapabilityScore(conflict.newCapability);

          if (newScore > existingScore) {
            // 新能力更优，替换旧能力
            resolvedCapabilities.push({
              ...conflict.newCapability,
              resolved: true,
              resolution: 'Replaces existing capability due to better score'
            });
            rejectedCapabilities.push({
              ...conflict.existingCapability,
              rejected: true,
              reason: 'Replaced by better capability'
            });
          } else {
            // 旧能力更优，保留旧能力
            rejectedCapabilities.push({
              ...conflict.newCapability,
              rejected: true,
              reason: 'Existing capability has better score'
            });
          }
          break;

        default:
          // 默认保留现有能力
          rejectedCapabilities.push({
            ...conflict.newCapability,
            rejected: true,
            reason: 'Unknown conflict type'
          });
      }
    });

    return {
      resolved: resolvedCapabilities,
      rejected: rejectedCapabilities
    };
  }

  // 创建回滚点
  createRollbackPoint(state, evolutionHypothesis = '') {
    const rollbackPoint = {
      timestamp: Date.now(),
      state: state,
      evolutionHypothesis: evolutionHypothesis,
      description: `Rollback point for evolution cycle`,
      rollbackConditions: [
        '进化降低成功率',
        '进化降低确定性',
        '进化引入无法解释的机制',
        '进化违反禁止行为',
        '进化引入模糊概念'
      ]
    };

    this.rollbackPoints.push(rollbackPoint);

    // 限制回滚点数量
    if (this.rollbackPoints.length > this.maxRollbackPoints) {
      this.rollbackPoints.shift();
    }

    return rollbackPoint;
  }

  // 回滚到之前的状态
  rollbackToPoint(rollbackPointIndex, reasons = []) {
    if (rollbackPointIndex >= 0 && rollbackPointIndex < this.rollbackPoints.length) {
      const rollbackPoint = this.rollbackPoints[rollbackPointIndex];
      console.log(`Rolling back to point: ${rollbackPoint.description}`);
      console.log(`Rollback reasons: ${reasons.join(', ')}`);
      return rollbackPoint.state;
    }
    return null;
  }

  // 回滚到最近的状态
  rollbackToLatest(reasons = []) {
    if (this.rollbackPoints.length > 0) {
      const latestPoint = this.rollbackPoints[this.rollbackPoints.length - 1];
      console.log(`Rolling back to latest point: ${latestPoint.description}`);
      console.log(`Rollback reasons: ${reasons.join(', ')}`);
      return latestPoint.state;
    }
    return null;
  }

  // 清理回滚点
  cleanupRollbackPoints() {
    this.rollbackPoints = [];
  }

  // 获取ADL状态
  getStatus() {
    return {
      status: this.status,
      priority: this.priority,
      rollbackPointsCount: this.rollbackPoints.length,
      maxRollbackPoints: this.maxRollbackPoints,
      evolutionHistoryCount: this.evolutionHistory.length,
      prohibitedBehaviorsCount: this.prohibitedBehaviors.length,
      antiMetaphysicsPatternsCount: this.antiMetaphysicsPatterns.length
    };
  }

  // 检查是否为实质性进化
  isSubstantialEvolution(evolutionResult) {
    const substantialTypes = ['new-feature', 'new-abstract', 'new-lever', 'newFeature', 'newAbstract', 'newLever'];
    return substantialTypes.includes(evolutionResult.type);
  }

  // 检查进化是否引入模糊概念
  containsMetaphysicsLanguage(text) {
    if (!text) return false;
    
    const lowerText = text.toLowerCase();
    return this.antiMetaphysicsPatterns.some(pattern => 
      lowerText.includes(pattern)
    );
  }

  // 检查进化是否违反禁止行为
  containsProhibitedBehavior(text) {
    if (!text) return false;
    
    const lowerText = text.toLowerCase();
    
    // 检查是否包含禁止行为的关键词
    const prohibitedKeywords = [
      '显得更聪明',
      '增加复杂度',
      '无法验证',
      '无法复现',
      '无法解释',
      '模糊概念',
      '可执行策略',
      '感觉正确',
      '决策依据'
    ];
    
    return prohibitedKeywords.some(keyword => 
      lowerText.includes(keyword)
    );
  }

  // 记录进化历史
  recordEvolutionHistory(evolutionResult, violations) {
    const historyItem = {
      timestamp: Date.now(),
      evolutionType: evolutionResult.type,
      success: evolutionResult.success,
      violations: violations,
      valid: violations.length === 0,
      message: evolutionResult.message
    };

    this.evolutionHistory.push(historyItem);

    // 限制历史记录数量
    if (this.evolutionHistory.length > this.maxHistoryItems) {
      this.evolutionHistory.shift();
    }
  }

  // 获取进化历史
  getEvolutionHistory() {
    return this.evolutionHistory;
  }

  // 获取回滚点
  getRollbackPoints() {
    return this.rollbackPoints;
  }

  // 分析进化历史
  analyzeHistory() {
    const totalEvolutions = this.evolutionHistory.length;
    const successfulEvolutions = this.evolutionHistory.filter(item => item.valid).length;
    const failedEvolutions = totalEvolutions - successfulEvolutions;
    const rollbackCount = this.rollbackPoints.length;

    return {
      totalEvolutions: totalEvolutions,
      successfulEvolutions: successfulEvolutions,
      failedEvolutions: failedEvolutions,
      successRate: totalEvolutions > 0 ? (successfulEvolutions / totalEvolutions) * 100 : 0,
      rollbackRate: totalEvolutions > 0 ? (rollbackCount / totalEvolutions) * 100 : 0,
      totalRollbackPoints: this.rollbackPoints.length,
      usedRollbackPoints: rollbackCount
    };
  }

  // 验证稳定性优先原则
  validateStabilityPriority(capability1, capability2) {
    const score1 = this.calculateCapabilityScore(capability1);
    const score2 = this.calculateCapabilityScore(capability2);
    
    // 稳定性优先原则：分数高的能力优先
    return score1 > score2 ? capability1 : capability2;
  }

  // 激活反进化锁定
  activate() {
    this.status = 'ACTIVE';
    console.log('🔒 Anti-Degeneration Lock activated with highest priority');
    console.log('⚠️  Prohibited degeneration behaviors: complexity increase, unverifiable mechanisms, vague concepts, feeling-based decisions');
    console.log('🔄  Rollback mechanism enabled for all evolutions');
    console.log('🧠  Anti-metaphysics detection enabled');
    console.log('🧱  Stability priority principle enforced');
  }

  // 停用反进化锁定
  deactivate() {
    this.status = 'INACTIVE';
    console.log('🔒 Anti-Degeneration Lock deactivated');
  }
}

// 导出单例实例
const antiDegenerationLock = new AntiDegenerationLock();

module.exports = {
  AntiDegenerationLock,
  antiDegenerationLock
};