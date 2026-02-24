/**
 * 能力树验证系统 (Capability Tree Validator)
 * 用于验证能力树的完整性、结构正确性和节点质量
 */

class CapabilityValidator {
  /**
   * 验证能力节点的完整性
   * @param {Object} node - 能力节点
   * @returns {Object} 验证结果
   */
  validateNode(node) {
    const errors = [];
    const warnings = [];

    // 验证基本信息
    if (!node) {
      errors.push('节点不存在');
      return {
        valid: false,
        errors,
        warnings
      };
    }

    // 验证能力名称
    if (!node.name || typeof node.name !== 'string' || node.name.trim() === '') {
      errors.push('能力名称不能为空');
    }

    // 验证层级
    if (![0, 1, 2, 3].includes(node.level)) {
      errors.push('能力层级必须是0、1、2或3（0为根节点）');
    }

    // 验证输入条件
    if (!Array.isArray(node.inputs)) {
      errors.push('输入条件必须是数组');
    } else if (node.level >= 2 && node.inputs.length === 0) {
      warnings.push('中层和高层节点建议定义输入条件');
    }

    // 验证输出结果
    if (!Array.isArray(node.outputs)) {
      errors.push('输出结果必须是数组');
    } else if (node.level >= 2 && node.outputs.length === 0) {
      warnings.push('中层和高层节点建议定义输出结果');
    }

    // 验证成功前提
    if (!Array.isArray(node.prerequisites)) {
      errors.push('成功前提必须是数组');
    } else if (node.level >= 2 && node.prerequisites.length === 0) {
      warnings.push('中层和高层节点建议定义成功前提');
    }

    // 验证失败边界
    if (!Array.isArray(node.failureBoundaries)) {
      errors.push('失败边界必须是数组');
    } else if (node.level >= 2 && node.failureBoundaries.length === 0) {
      warnings.push('中层和高层节点建议定义失败边界');
    }

    // 验证状态
    if (!['ACTIVE', 'CANDIDATE_TRIM', 'DISABLED'].includes(node.status)) {
      errors.push('能力状态必须是ACTIVE、CANDIDATE_TRIM或DISABLED');
    }

    // 验证使用次数
    if (typeof node.usageCount !== 'number' || node.usageCount < 0) {
      errors.push('使用次数必须是非负整数');
    }

    // 验证时间戳
    if (node.lastUsed && (typeof node.lastUsed !== 'number' || node.lastUsed < 0)) {
      errors.push('最后使用时间必须是非负整数');
    }

    if (typeof node.createdAt !== 'number' || node.createdAt < 0) {
      errors.push('创建时间必须是非负整数');
    }

    if (typeof node.updatedAt !== 'number' || node.updatedAt < 0) {
      errors.push('更新时间必须是非负整数');
    }

    // 验证父子关系
    if (node.parent && typeof node.parent !== 'object') {
      errors.push('父节点必须是对象');
    }

    if (!Array.isArray(node.children)) {
      errors.push('子节点必须是数组');
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings
    };
  }

  /**
   * 验证能力树结构
   * @param {Object} tree - 能力树
   * @returns {Object} 验证结果
   */
  validateTree(tree) {
    const errors = [];
    const warnings = [];

    if (!tree) {
      errors.push('能力树不存在');
      return {
        valid: false,
        errors,
        warnings
      };
    }

    // 验证根节点
    if (!tree.root) {
      errors.push('能力树缺少根节点');
    } else {
      const rootValidation = this.validateNode(tree.root);
      if (!rootValidation.valid) {
        errors.push(...rootValidation.errors.map(err => `根节点: ${err}`));
      }
      if (rootValidation.warnings.length > 0) {
        warnings.push(...rootValidation.warnings.map(warn => `根节点: ${warn}`));
      }
    }

    // 验证节点映射
    if (!tree.nodeMap || !(tree.nodeMap instanceof Map)) {
      errors.push('能力树缺少节点映射或映射类型错误');
    }

    // 验证所有节点
    if (tree.nodeMap) {
      const nodes = Array.from(tree.nodeMap.values());
      
      // 检查节点数量
      if (nodes.length === 0) {
        errors.push('能力树没有节点');
      }

      // 验证每个节点
      for (const node of nodes) {
        const validation = this.validateNode(node);
        if (!validation.valid) {
          errors.push(...validation.errors.map(err => `节点 ${node.name || '未命名'}: ${err}`));
        }
        if (validation.warnings.length > 0) {
          warnings.push(...validation.warnings.map(warn => `节点 ${node.name || '未命名'}: ${warn}`));
        }
      }

      // 验证节点层级结构
      this.validateHierarchy(nodes, errors, warnings);

      // 验证节点命名唯一性
      this.validateNodeNames(nodes, errors, warnings);

      // 验证节点使用情况
      this.validateNodeUsage(nodes, errors, warnings);
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings
    };
  }

  /**
   * 验证能力树的层级结构
   * @param {Array} nodes - 能力节点数组
   * @param {Array} errors - 错误数组
   * @param {Array} warnings - 警告数组
   */
  validateHierarchy(nodes, errors, warnings) {
    // 统计各层级节点数量
    const levelCounts = {
      0: 0,
      1: 0,
      2: 0,
      3: 0
    };

    for (const node of nodes) {
      if (node.level >= 0 && node.level <= 3) {
        levelCounts[node.level]++;
      }
    }

    // 验证根节点数量
    if (levelCounts[0] !== 1) {
      errors.push(`能力树必须有且只有一个根节点，当前有 ${levelCounts[0]} 个`);
    }

    // 验证层级分布
    if (levelCounts[1] === 0) {
      warnings.push('能力树缺少低层节点（基础操作）');
    }

    if (levelCounts[2] === 0) {
      warnings.push('能力树缺少中层节点（可复用流程）');
    }

    if (levelCounts[3] === 0) {
      warnings.push('能力树缺少高层节点（问题分解）');
    }

    // 验证层级关系
    for (const node of nodes) {
      if (node.parent) {
        // 子节点层级必须大于或等于父节点层级
        // 允许相同层级用于分组节点
        if (node.level < node.parent.level) {
          errors.push(`节点 ${node.name} 的层级必须大于或等于父节点 ${node.parent.name} 的层级`);
        }

        // 子节点必须在父节点的子列表中
        if (!node.parent.children.includes(node)) {
          errors.push(`节点 ${node.name} 不在父节点 ${node.parent.name} 的子列表中`);
        }
      }
    }
  }

  /**
   * 验证能力节点名称的唯一性
   * @param {Array} nodes - 能力节点数组
   * @param {Array} errors - 错误数组
   * @param {Array} warnings - 警告数组
   */
  validateNodeNames(nodes, errors, warnings) {
    const nameMap = new Map();

    for (const node of nodes) {
      if (node.name) {
        const normalizedName = node.name.toLowerCase().trim();
        if (nameMap.has(normalizedName)) {
          const existingNode = nameMap.get(normalizedName);
          warnings.push(`节点名称 "${node.name}" 与节点 "${existingNode.name}" 相似，建议合并或重命名`);
        } else {
          nameMap.set(normalizedName, node);
        }
      }
    }
  }

  /**
   * 验证能力节点的使用情况
   * @param {Array} nodes - 能力节点数组
   * @param {Array} errors - 错误数组
   * @param {Array} warnings - 警告数组
   */
  validateNodeUsage(nodes, errors, warnings) {
    const now = Date.now();
    const thirtyDaysAgo = now - (30 * 24 * 60 * 60 * 1000);

    let totalUsage = 0;
    let unusedNodes = 0;
    let lowUsageNodes = 0;

    for (const node of nodes) {
      if (node.level > 0) { // 排除根节点
        totalUsage += node.usageCount;

        if (node.usageCount === 0) {
          unusedNodes++;
        } else if (node.usageCount < 5) {
          lowUsageNodes++;
        }

        // 检查长期未使用的节点
        if (node.lastUsed && node.lastUsed < thirtyDaysAgo && node.usageCount < 5) {
          warnings.push(`节点 ${node.name} 长期未使用且使用次数较少，建议标记为候选修剪`);
        }
      }
    }

    // 计算使用统计
    const totalNodes = nodes.length - 1; // 排除根节点
    const usageRate = totalNodes > 0 ? (totalUsage / totalNodes).toFixed(2) : 0;

    if (unusedNodes > 0) {
      warnings.push(`有 ${unusedNodes} 个节点从未使用，建议检查是否需要保留`);
    }

    if (lowUsageNodes > 0) {
      warnings.push(`有 ${lowUsageNodes} 个节点使用次数较少，建议优化或合并`);
    }

    if (totalUsage === 0 && totalNodes > 0) {
      warnings.push('能力树中没有节点被使用，建议添加使用场景');
    }
  }

  /**
   * 验证能力树的质量
   * @param {Object} tree - 能力树
   * @returns {Object} 质量评估结果
   */
  evaluateTreeQuality(tree) {
    const validationResult = this.validateTree(tree);
    const qualityScores = {};

    // 计算基本质量分数
    const baseScore = validationResult.valid ? 100 : 0;
    
    // 扣除错误和警告的分数
    const errorPenalty = validationResult.errors.length * 10;
    const warningPenalty = validationResult.warnings.length * 2;
    
    // 计算最终质量分数
    let qualityScore = Math.max(0, baseScore - errorPenalty - warningPenalty);

    // 计算节点覆盖率
    if (tree && tree.nodeMap) {
      const nodes = Array.from(tree.nodeMap.values());
      const totalNodes = nodes.length;
      const levelCounts = {
        1: 0,
        2: 0,
        3: 0
      };

      for (const node of nodes) {
        if (node.level >= 1 && node.level <= 3) {
          levelCounts[node.level]++;
        }
      }

      // 计算层级平衡分数
      const levelBalanceScore = this.calculateLevelBalance(levelCounts);
      qualityScores.levelBalance = levelBalanceScore;

      // 计算使用效率分数
      const usageEfficiencyScore = this.calculateUsageEfficiency(nodes);
      qualityScores.usageEfficiency = usageEfficiencyScore;

      // 计算节点完整性分数
      const nodeCompletenessScore = this.calculateNodeCompleteness(nodes);
      qualityScores.nodeCompleteness = nodeCompletenessScore;

      // 综合计算质量分数
      qualityScore = Math.round(
        (qualityScore * 0.4) +
        (levelBalanceScore * 0.2) +
        (usageEfficiencyScore * 0.2) +
        (nodeCompletenessScore * 0.2)
      );
    }

    return {
      qualityScore,
      validationResult,
      qualityScores
    };
  }

  /**
   * 计算层级平衡分数
   * @param {Object} levelCounts - 各层级节点数量
   * @returns {number} 平衡分数
   */
  calculateLevelBalance(levelCounts) {
    const totalNodes = levelCounts[1] + levelCounts[2] + levelCounts[3];
    
    if (totalNodes === 0) {
      return 0;
    }

    // 理想分布：低层 50%，中层 30%，高层 20%
    const ideal = {
      1: totalNodes * 0.5,
      2: totalNodes * 0.3,
      3: totalNodes * 0.2
    };

    // 计算实际分布与理想分布的差异
    const diff1 = Math.abs(levelCounts[1] - ideal[1]) / ideal[1] || 0;
    const diff2 = Math.abs(levelCounts[2] - ideal[2]) / ideal[2] || 0;
    const diff3 = Math.abs(levelCounts[3] - ideal[3]) / ideal[3] || 0;

    // 计算平衡分数（0-100）
    const avgDiff = (diff1 + diff2 + diff3) / 3;
    const balanceScore = Math.max(0, 100 - (avgDiff * 100));

    return Math.round(balanceScore);
  }

  /**
   * 计算使用效率分数
   * @param {Array} nodes - 能力节点数组
   * @returns {number} 效率分数
   */
  calculateUsageEfficiency(nodes) {
    let totalUsage = 0;
    let usedNodes = 0;
    const totalNodes = nodes.length - 1; // 排除根节点

    if (totalNodes === 0) {
      return 0;
    }

    for (const node of nodes) {
      if (node.level > 0) { // 排除根节点
        totalUsage += node.usageCount;
        if (node.usageCount > 0) {
          usedNodes++;
        }
      }
    }

    // 计算使用效率
    const usageRate = usedNodes / totalNodes;
    const avgUsage = totalUsage / totalNodes;

    // 计算效率分数（0-100）
    const usageRateScore = usageRate * 50;
    const avgUsageScore = Math.min(50, avgUsage * 10);
    const efficiencyScore = usageRateScore + avgUsageScore;

    return Math.round(efficiencyScore);
  }

  /**
   * 计算节点完整性分数
   * @param {Array} nodes - 能力节点数组
   * @returns {number} 完整性分数
   */
  calculateNodeCompleteness(nodes) {
    let totalCompleteness = 0;
    let nodeCount = 0;

    for (const node of nodes) {
      if (node.level > 0) { // 排除根节点
        nodeCount++;
        let completeness = 0;

        // 计算节点完整性
        if (node.name && node.name.trim() !== '') {
          completeness += 25;
        }

        if (node.inputs && node.inputs.length > 0) {
          completeness += 25;
        }

        if (node.outputs && node.outputs.length > 0) {
          completeness += 25;
        }

        if (node.prerequisites && node.prerequisites.length > 0) {
          completeness += 12.5;
        }

        if (node.failureBoundaries && node.failureBoundaries.length > 0) {
          completeness += 12.5;
        }

        totalCompleteness += completeness;
      }
    }

    if (nodeCount === 0) {
      return 0;
    }

    return Math.round(totalCompleteness / nodeCount);
  }

  /**
   * 生成验证报告
   * @param {Object} tree - 能力树
   * @returns {Object} 验证报告
   */
  generateValidationReport(tree) {
    const validationResult = this.validateTree(tree);
    const qualityEvaluation = this.evaluateTreeQuality(tree);

    return {
      timestamp: Date.now(),
      validationResult,
      qualityEvaluation,
      recommendations: this.generateRecommendations(validationResult, qualityEvaluation)
    };
  }

  /**
   * 生成改进建议
   * @param {Object} validationResult - 验证结果
   * @param {Object} qualityEvaluation - 质量评估
   * @returns {Array} 改进建议
   */
  generateRecommendations(validationResult, qualityEvaluation) {
    const recommendations = [];

    // 基于验证结果生成建议
    if (validationResult.errors.length > 0) {
      recommendations.push('修复所有验证错误，确保能力树结构正确');
    }

    if (validationResult.warnings.length > 0) {
      recommendations.push('处理验证警告，提高能力树质量');
    }

    // 基于质量评估生成建议
    const qualityScores = qualityEvaluation.qualityScores;

    if (qualityScores.levelBalance < 60) {
      recommendations.push('优化能力树层级分布，建议低层:中层:高层比例为5:3:2');
    }

    if (qualityScores.usageEfficiency < 60) {
      recommendations.push('提高能力节点的使用效率，增加高频能力的调用');
    }

    if (qualityScores.nodeCompleteness < 60) {
      recommendations.push('完善能力节点信息，确保每个节点都有完整的输入、输出、成功前提和失败边界');
    }

    if (qualityEvaluation.qualityScore < 70) {
      recommendations.push('全面优化能力树，提高整体质量分数');
    }

    return recommendations;
  }
}

// 导出单例
const capabilityValidator = new CapabilityValidator();

module.exports = {
  CapabilityValidator,
  capabilityValidator
};
