const fs = require('fs');
const path = require('path');

const CONSTRAINT_LOGS_FILE = path.join(__dirname, 'constraint-logs.json');
const CONSTRAINT_VIOLATIONS_FILE = path.join(__dirname, 'constraint-violations.json');

class CapabilityConstraints {
  constructor() {
    this.constraintLogs = this.loadConstraintLogs();
    this.constraintViolations = this.loadConstraintViolations();
  }

  loadConstraintLogs() {
    if (fs.existsSync(CONSTRAINT_LOGS_FILE)) {
      try {
        return JSON.parse(fs.readFileSync(CONSTRAINT_LOGS_FILE, 'utf8'));
      } catch (error) {
        console.error('Error loading constraint logs:', error.message);
        return [];
      }
    }
    return [];
  }

  loadConstraintViolations() {
    if (fs.existsSync(CONSTRAINT_VIOLATIONS_FILE)) {
      try {
        return JSON.parse(fs.readFileSync(CONSTRAINT_VIOLATIONS_FILE, 'utf8'));
      } catch (error) {
        console.error('Error loading constraint violations:', error.message);
        return [];
      }
    }
    return [];
  }

  saveConstraintLogs() {
    fs.writeFileSync(CONSTRAINT_LOGS_FILE, JSON.stringify(this.constraintLogs, null, 2));
    console.log('Constraint logs saved to', CONSTRAINT_LOGS_FILE);
  }

  saveConstraintViolations() {
    fs.writeFileSync(CONSTRAINT_VIOLATIONS_FILE, JSON.stringify(this.constraintViolations, null, 2));
    console.log('Constraint violations saved to', CONSTRAINT_VIOLATIONS_FILE);
  }

  checkCapabilityConstraints(capability) {
    const checks = {
      successRate: this.checkSuccessRateConstraint(capability),
      sideEffects: this.checkSideEffectsConstraint(capability),
      mentalLoad: this.checkMentalLoadConstraint(capability),
      stability: this.checkStabilityConstraint(capability),
      performance: this.checkPerformanceConstraint(capability)
    };

    const violations = Object.entries(checks)
      .filter(([_, result]) => !result.passed)
      .map(([constraint, result]) => ({
        constraint: constraint,
        reason: result.reason,
        severity: result.severity
      }));

    const compliance = violations.length === 0;

    const log = {
      id: `constraint_check_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      capabilityId: capability.id,
      timestamp: new Date().toISOString(),
      checks: checks,
      violations: violations,
      compliance: compliance
    };

    this.constraintLogs.push(log);
    if (violations.length > 0) {
      this.constraintViolations.push({
        ...log,
        capability: capability
      });
    }

    this.saveConstraintLogs();
    this.saveConstraintViolations();

    return {
      compliance: compliance,
      violations: violations,
      checks: checks
    };
  }

  checkSuccessRateConstraint(capability) {
    const minSuccessRate = 0.7; // 70% 成功率
    const successRate = this.calculateSuccessRate(capability);

    if (successRate >= minSuccessRate) {
      return {
        passed: true,
        reason: `Success rate (${(successRate * 100).toFixed(2)}%) meets minimum requirement (${(minSuccessRate * 100)}%)`,
        severity: 'low'
      };
    } else {
      return {
        passed: false,
        reason: `Success rate (${(successRate * 100).toFixed(2)}%) below minimum requirement (${(minSuccessRate * 100)}%)`,
        severity: 'high'
      };
    }
  }

  checkSideEffectsConstraint(capability) {
    const sideEffects = this.identifyPotentialSideEffects(capability);
    const maxAllowedSideEffects = 2;

    if (sideEffects.length <= maxAllowedSideEffects) {
      return {
        passed: true,
        reason: `Number of potential side effects (${sideEffects.length}) within allowed limit (${maxAllowedSideEffects})`,
        severity: 'low'
      };
    } else {
      return {
        passed: false,
        reason: `Number of potential side effects (${sideEffects.length}) exceeds allowed limit (${maxAllowedSideEffects})`,
        severity: 'medium'
      };
    }
  }

  checkMentalLoadConstraint(capability) {
    const mentalLoad = this.calculateMentalLoad(capability);
    const maxAllowedMentalLoad = 0.6; // 0-1 scale

    if (mentalLoad <= maxAllowedMentalLoad) {
      return {
        passed: true,
        reason: `Mental load (${(mentalLoad * 100).toFixed(2)}%) within allowed limit (${(maxAllowedMentalLoad * 100)}%)`,
        severity: 'low'
      };
    } else {
      return {
        passed: false,
        reason: `Mental load (${(mentalLoad * 100).toFixed(2)}%) exceeds allowed limit (${(maxAllowedMentalLoad * 100)}%)`,
        severity: 'medium'
      };
    }
  }

  checkStabilityConstraint(capability) {
    const stability = this.calculateStability(capability);
    const minStability = 0.8; // 80% 稳定性

    if (stability >= minStability) {
      return {
        passed: true,
        reason: `Stability (${(stability * 100).toFixed(2)}%) meets minimum requirement (${(minStability * 100)}%)`,
        severity: 'low'
      };
    } else {
      return {
        passed: false,
        reason: `Stability (${(stability * 100).toFixed(2)}%) below minimum requirement (${(minStability * 100)}%)`,
        severity: 'high'
      };
    }
  }

  checkPerformanceConstraint(capability) {
    const performance = this.calculatePerformance(capability);
    const minPerformance = 0.5; // 50% 性能

    if (performance >= minPerformance) {
      return {
        passed: true,
        reason: `Performance (${(performance * 100).toFixed(2)}%) meets minimum requirement (${(minPerformance * 100)}%)`,
        severity: 'low'
      };
    } else {
      return {
        passed: false,
        reason: `Performance (${(performance * 100).toFixed(2)}%) below minimum requirement (${(minPerformance * 100)}%)`,
        severity: 'medium'
      };
    }
  }

  calculateSuccessRate(capability) {
    // 模拟成功率计算
    const usageData = this.getCapabilityUsageData(capability.id);
    if (!usageData) return 0.8; // 默认成功率
    return usageData.successRate || 0.8;
  }

  identifyPotentialSideEffects(capability) {
    const sideEffects = [];

    // 基于能力类型识别潜在副作用
    switch (capability.type) {
      case 'tool_sequence':
        if (capability.abstraction?.tools?.length > 3) {
          sideEffects.push('Complex tool sequence may lead to unexpected interactions');
        }
        break;
      case 'step_pattern':
        if (capability.abstraction?.steps?.length > 5) {
          sideEffects.push('Long step sequences may cause state management issues');
        }
        break;
      case 'reusable_solution':
        if (Object.keys(capability.abstraction?.parameters || {}).length > 4) {
          sideEffects.push('Too many parameters may lead to configuration errors');
        }
        break;
    }

    // 基于输入/输出复杂性识别副作用
    const inputCount = capability.abstraction?.inputs?.length || 0;
    const outputCount = capability.abstraction?.outputs?.length || 0;

    if (inputCount > 5) {
      sideEffects.push('Too many inputs may increase error rate');
    }

    if (outputCount > 3) {
      sideEffects.push('Too many outputs may complicate integration');
    }

    return sideEffects;
  }

  calculateMentalLoad(capability) {
    let mentalLoad = 0;

    // 基于输入数量的心智负担
    const inputCount = capability.abstraction?.inputs?.length || 0;
    mentalLoad += inputCount * 0.1;

    // 基于步骤/工具数量的心智负担
    let stepCount = 0;
    if (capability.type === 'step_pattern') {
      stepCount = capability.abstraction?.steps?.length || 0;
    } else if (capability.type === 'tool_sequence') {
      stepCount = capability.abstraction?.tools?.length || 0;
    }
    mentalLoad += stepCount * 0.08;

    // 基于参数复杂性的心智负担
    const paramCount = Object.keys(capability.abstraction?.parameters || {}).length;
    mentalLoad += paramCount * 0.05;

    // 基于失败点数量的心智负担
    const failurePointCount = capability.abstraction?.failurePoints?.length || 0;
    mentalLoad += failurePointCount * 0.07;

    return Math.min(1.0, mentalLoad);
  }

  calculateStability(capability) {
    // 模拟稳定性计算
    const failurePoints = capability.abstraction?.failurePoints?.length || 0;
    const errorHandling = this.assessErrorHandling(capability);

    // 稳定性 = 1 - (失败点影响 + 错误处理不足)
    const failureImpact = failurePoints * 0.05;
    const errorHandlingImpact = (1 - errorHandling) * 0.3;

    return Math.max(0, 1 - (failureImpact + errorHandlingImpact));
  }

  calculatePerformance(capability) {
    // 模拟性能计算
    const executionTime = this.estimateExecutionTime(capability);
    const resourceUsage = this.estimateResourceUsage(capability);

    // 性能 = 1 - (执行时间影响 + 资源使用影响)
    const timeImpact = Math.min(1, executionTime / 10000); // 10秒为最大影响
    const resourceImpact = Math.min(1, resourceUsage / 100); // 100% 资源使用为最大影响

    return Math.max(0, 1 - (timeImpact * 0.6 + resourceImpact * 0.4));
  }

  assessErrorHandling(capability) {
    // 评估错误处理能力
    const failurePoints = capability.abstraction?.failurePoints || [];
    const hasErrorHandling = capability.abstraction?.errorHandling !== undefined;

    if (hasErrorHandling) return 1.0;
    if (failurePoints.length === 0) return 0.8;
    return 0.5;
  }

  estimateExecutionTime(capability) {
    // 估计执行时间
    let baseTime = 1000; // 基础时间1秒

    if (capability.type === 'step_pattern') {
      const stepCount = capability.abstraction?.steps?.length || 0;
      baseTime += stepCount * 500;
    } else if (capability.type === 'tool_sequence') {
      const toolCount = capability.abstraction?.tools?.length || 0;
      baseTime += toolCount * 800;
    }

    return baseTime;
  }

  estimateResourceUsage(capability) {
    // 估计资源使用
    let resourceUsage = 20; // 基础资源使用20%

    const inputCount = capability.abstraction?.inputs?.length || 0;
    resourceUsage += inputCount * 5;

    const outputCount = capability.abstraction?.outputs?.length || 0;
    resourceUsage += outputCount * 3;

    return Math.min(100, resourceUsage);
  }

  getCapabilityUsageData(capabilityId) {
    // 模拟能力使用数据
    return {
      successRate: 0.85,
      errorRate: 0.15,
      usageCount: 20
    };
  }

  generateConstraintReport(capabilityId = null) {
    if (capabilityId) {
      return this.generateCapabilityConstraintReport(capabilityId);
    } else {
      return this.generateSystemConstraintReport();
    }
  }

  generateCapabilityConstraintReport(capabilityId) {
    const logs = this.constraintLogs.filter(log => log.capabilityId === capabilityId);
    const violations = this.constraintViolations.filter(v => v.capabilityId === capabilityId);

    return {
      capabilityId: capabilityId,
      reportDate: new Date().toISOString(),
      totalChecks: logs.length,
      complianceRate: logs.length > 0 ? logs.filter(log => log.compliance).length / logs.length : 0,
      recentViolations: violations.slice(-5),
      summary: this.generateCapabilityConstraintSummary(logs, violations)
    };
  }

  generateSystemConstraintReport() {
    const totalChecks = this.constraintLogs.length;
    const compliantChecks = this.constraintLogs.filter(log => log.compliance).length;
    const totalViolations = this.constraintViolations.length;

    return {
      reportDate: new Date().toISOString(),
      totalChecks: totalChecks,
      complianceRate: totalChecks > 0 ? compliantChecks / totalChecks : 0,
      totalViolations: totalViolations,
      violationBreakdown: this.getViolationBreakdown(),
      summary: this.generateSystemConstraintSummary(totalChecks, compliantChecks, totalViolations)
    };
  }

  getViolationBreakdown() {
    const breakdown = {};

    this.constraintViolations.forEach(violation => {
      violation.violations.forEach(v => {
        breakdown[v.constraint] = (breakdown[v.constraint] || 0) + 1;
      });
    });

    return breakdown;
  }

  generateCapabilityConstraintSummary(logs, violations) {
    if (logs.length === 0) {
      return 'No constraint checks have been performed for this capability';
    }

    const complianceRate = logs.filter(log => log.compliance).length / logs.length;
    const recentViolations = violations.slice(-5).length;

    return `Capability has a compliance rate of ${(complianceRate * 100).toFixed(2)}% based on ${logs.length} checks. ${recentViolations} recent violations detected.`;
  }

  generateSystemConstraintSummary(totalChecks, compliantChecks, totalViolations) {
    const complianceRate = totalChecks > 0 ? compliantChecks / totalChecks : 0;
    return `System has a compliance rate of ${(complianceRate * 100).toFixed(2)}% based on ${totalChecks} checks. ${totalViolations} total violations detected.`;
  }

  suggestConstraintRemediations(violations) {
    const remediations = [];

    violations.forEach(violation => {
      switch (violation.constraint) {
        case 'successRate':
          remediations.push({
            constraint: violation.constraint,
            issue: violation.reason,
            remediation: 'Improve error handling and add retry mechanisms',
            priority: 'high'
          });
          break;
        case 'sideEffects':
          remediations.push({
            constraint: violation.constraint,
            issue: violation.reason,
            remediation: 'Simplify capability design and reduce complexity',
            priority: 'medium'
          });
          break;
        case 'mentalLoad':
          remediations.push({
            constraint: violation.constraint,
            issue: violation.reason,
            remediation: 'Reduce input parameters and simplify user interface',
            priority: 'medium'
          });
          break;
        case 'stability':
          remediations.push({
            constraint: violation.constraint,
            issue: violation.reason,
            remediation: 'Add more robust error handling and validation',
            priority: 'high'
          });
          break;
        case 'performance':
          remediations.push({
            constraint: violation.constraint,
            issue: violation.reason,
            remediation: 'Optimize execution flow and reduce resource usage',
            priority: 'medium'
          });
          break;
      }
    });

    return remediations;
  }

  validateCapabilityEvolution(evolution) {
    const beforeConstraints = this.checkCapabilityConstraints(evolution.before);
    const afterConstraints = this.checkCapabilityConstraints(evolution.after);

    const validation = {
      beforeCompliance: beforeConstraints.compliance,
      afterCompliance: afterConstraints.compliance,
      complianceImproved: afterConstraints.compliance || (!beforeConstraints.compliance && afterConstraints.compliance),
      newViolations: afterConstraints.violations.filter(av => 
        !beforeConstraints.violations.some(bv => bv.constraint === av.constraint)
      ),
      resolvedViolations: beforeConstraints.violations.filter(bv => 
        !afterConstraints.violations.some(av => av.constraint === bv.constraint)
      )
    };

    return validation;
  }
}

module.exports = CapabilityConstraints;