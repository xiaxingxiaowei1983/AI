/**
 * 能力冲突检测和解决机制
 * 确保新能力不破坏已验证稳定能力
 * 优先保留更通用、更稳健的能力
 */

const fs = require('fs');
const path = require('path');

class CapabilityConflictResolver {
  constructor(config = {}) {
    this.config = {
      baseDir: config.baseDir || path.join(__dirname, '..', 'data'),
      capabilitiesDir: config.capabilitiesDir || path.join(__dirname, '..', 'data', 'capabilities'),
      conflictsDir: config.conflictsDir || path.join(__dirname, '..', 'data', 'conflicts'),
      logFile: config.logFile || path.join(__dirname, '..', '..', '..', 'logs', 'capability-conflict.log'),
      ...config
    };
    
    this.ensureDirectories();
  }
  
  // 确保目录存在
  ensureDirectories() {
    const directories = [
      this.config.baseDir,
      this.config.capabilitiesDir,
      this.config.conflictsDir,
      path.dirname(this.config.logFile)
    ];
    
    directories.forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        this.log(`Created directory: ${dir}`);
      }
    });
  }
  
  // 日志函数
  log(message) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [Capability Conflict] ${message}`;
    console.log(logMessage);
    
    // 写入日志文件
    fs.appendFileSync(this.config.logFile, logMessage + '\n', { flag: 'a' });
  }
  
  // 检测能力冲突
  detectConflicts(newCapability, existingCapabilities) {
    this.log(`Detecting conflicts for new capability: ${newCapability.name}`);
    
    const conflicts = [];
    
    existingCapabilities.forEach(capability => {
      // 检查名称冲突
      if (capability.name === newCapability.name) {
        conflicts.push({
          type: 'name-conflict',
          severity: 'high',
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
            severity: 'medium',
            existingCapability: capability,
            newCapability: newCapability,
            reason: 'Capability functionality overlaps with existing capability'
          });
        }
      }
      
      // 检查类型冲突
      if (capability.type === newCapability.type && 
          capability.level === newCapability.level &&
          capability.name !== newCapability.name) {
        conflicts.push({
          type: 'type-conflict',
          severity: 'low',
          existingCapability: capability,
          newCapability: newCapability,
          reason: 'Capability type and level match existing capability'
        });
      }
      
      // 检查依赖冲突
      if (capability.dependencies && newCapability.dependencies) {
        const commonDependencies = capability.dependencies.filter(dep => 
          newCapability.dependencies.includes(dep)
        );
        if (commonDependencies.length > 0) {
          conflicts.push({
            type: 'dependency-conflict',
            severity: 'low',
            existingCapability: capability,
            newCapability: newCapability,
            reason: `Common dependencies: ${commonDependencies.join(', ')}`
          });
        }
      }
    });
    
    if (conflicts.length > 0) {
      this.log(`Detected ${conflicts.length} conflicts for new capability`);
    } else {
      this.log('No conflicts detected for new capability');
    }
    
    return conflicts;
  }
  
  // 解决能力冲突
  resolveConflicts(conflicts) {
    this.log(`Resolving ${conflicts.length} capability conflicts`);
    
    const resolvedCapabilities = [];
    const rejectedCapabilities = [];
    const unresolvedConflicts = [];
    
    conflicts.forEach(conflict => {
      try {
        switch (conflict.type) {
          case 'name-conflict':
            this.resolveNameConflict(conflict, resolvedCapabilities, rejectedCapabilities);
            break;
          case 'function-overlap':
            this.resolveFunctionOverlap(conflict, resolvedCapabilities, rejectedCapabilities);
            break;
          case 'type-conflict':
            this.resolveTypeConflict(conflict, resolvedCapabilities, rejectedCapabilities);
            break;
          case 'dependency-conflict':
            this.resolveDependencyConflict(conflict, resolvedCapabilities, rejectedCapabilities);
            break;
          default:
            unresolvedConflicts.push(conflict);
            this.log(`Unknown conflict type: ${conflict.type}`);
        }
      } catch (error) {
        this.log(`Error resolving conflict: ${error.message}`);
        unresolvedConflicts.push(conflict);
      }
    });
    
    // 保存冲突解决结果
    this.saveConflictResolution({
      timestamp: Date.now(),
      resolved: resolvedCapabilities.length,
      rejected: rejectedCapabilities.length,
      unresolved: unresolvedConflicts.length,
      conflicts: conflicts
    });
    
    this.log(`Conflict resolution complete: ${resolvedCapabilities.length} resolved, ${rejectedCapabilities.length} rejected, ${unresolvedConflicts.length} unresolved`);
    
    return {
      resolved: resolvedCapabilities,
      rejected: rejectedCapabilities,
      unresolved: unresolvedConflicts
    };
  }
  
  // 解决名称冲突
  resolveNameConflict(conflict, resolvedCapabilities, rejectedCapabilities) {
    // 为新能力生成新名称
    const newName = `${conflict.newCapability.name} (v${Date.now()})`;
    const resolvedCapability = {
      ...conflict.newCapability,
      name: newName,
      resolved: true,
      resolution: 'Renamed to avoid conflict',
      conflictType: 'name-conflict'
    };
    
    resolvedCapabilities.push(resolvedCapability);
    this.log(`Resolved name conflict by renaming to: ${newName}`);
  }
  
  // 解决功能重叠冲突
  resolveFunctionOverlap(conflict, resolvedCapabilities, rejectedCapabilities) {
    // 比较能力的通用性和稳健性
    const existingScore = this.calculateCapabilityScore(conflict.existingCapability);
    const newScore = this.calculateCapabilityScore(conflict.newCapability);
    
    if (newScore > existingScore) {
      // 新能力更优，替换旧能力
      resolvedCapabilities.push({
        ...conflict.newCapability,
        resolved: true,
        resolution: 'Replaces existing capability due to better score',
        conflictType: 'function-overlap'
      });
      
      rejectedCapabilities.push({
        ...conflict.existingCapability,
        rejected: true,
        reason: 'Replaced by better capability',
        conflictType: 'function-overlap'
      });
      
      this.log(`Resolved function overlap by replacing existing capability (new score: ${newScore}, existing score: ${existingScore})`);
    } else {
      // 旧能力更优，保留旧能力
      rejectedCapabilities.push({
        ...conflict.newCapability,
        rejected: true,
        reason: 'Existing capability has better score',
        conflictType: 'function-overlap'
      });
      
      this.log(`Resolved function overlap by keeping existing capability (existing score: ${existingScore}, new score: ${newScore})`);
    }
  }
  
  // 解决类型冲突
  resolveTypeConflict(conflict, resolvedCapabilities, rejectedCapabilities) {
    // 类型冲突通常不严重，尝试合并能力
    const mergedCapability = {
      name: `${conflict.existingCapability.name} + ${conflict.newCapability.name}`,
      description: `${conflict.existingCapability.description} | ${conflict.newCapability.description}`,
      type: conflict.existingCapability.type,
      level: conflict.existingCapability.level,
      merged: true,
      sources: [conflict.existingCapability.name, conflict.newCapability.name],
      resolved: true,
      resolution: 'Merged capabilities with similar types',
      conflictType: 'type-conflict'
    };
    
    resolvedCapabilities.push(mergedCapability);
    rejectedCapabilities.push({
      ...conflict.existingCapability,
      rejected: true,
      reason: 'Merged into new capability',
      conflictType: 'type-conflict'
    });
    rejectedCapabilities.push({
      ...conflict.newCapability,
      rejected: true,
      reason: 'Merged into new capability',
      conflictType: 'type-conflict'
    });
    
    this.log(`Resolved type conflict by merging capabilities`);
  }
  
  // 解决依赖冲突
  resolveDependencyConflict(conflict, resolvedCapabilities, rejectedCapabilities) {
    // 依赖冲突通常不严重，允许共存
    resolvedCapabilities.push({
      ...conflict.newCapability,
      resolved: true,
      resolution: 'Allowed to coexist with shared dependencies',
      conflictType: 'dependency-conflict'
    });
    
    this.log(`Resolved dependency conflict by allowing coexistence`);
  }
  
  // 计算能力评分
  calculateCapabilityScore(capability) {
    let score = 0;
    
    // 基于描述的通用性评分
    if (capability.description) {
      const genericWords = ['general', 'universal', 'common', 'basic', 'core', 'fundamental'];
      genericWords.forEach(word => {
        if (capability.description.toLowerCase().includes(word)) {
          score += 2;
        }
      });
    }
    
    // 基于名称的稳健性评分
    if (capability.name) {
      const robustWords = ['stable', 'reliable', 'robust', 'proven', 'tested', 'verified'];
      robustWords.forEach(word => {
        if (capability.name.toLowerCase().includes(word)) {
          score += 2;
        }
      });
    }
    
    // 基于类型的评分
    if (capability.type) {
      const typeScores = {
        'new-feature': 3,
        'new-abstract': 4,
        'new-lever': 5
      };
      score += typeScores[capability.type] || 2;
    }
    
    // 基于级别的评分
    if (capability.level) {
      score += capability.level;
    }
    
    // 基础分数
    score += 5;
    
    return score;
  }
  
  // 保存冲突解决结果
  saveConflictResolution(resolution) {
    const conflictPath = path.join(this.config.conflictsDir, `conflict-resolution-${Date.now()}.json`);
    
    try {
      fs.writeFileSync(conflictPath, JSON.stringify(resolution, null, 2));
      this.log(`Saved conflict resolution: ${resolution.resolved} resolved, ${resolution.rejected} rejected`);
    } catch (error) {
      this.log(`Error saving conflict resolution: ${error.message}`);
    }
  }
  
  // 获取所有能力
  getAllCapabilities() {
    try {
      const files = fs.readdirSync(this.config.capabilitiesDir);
      const capabilities = [];
      
      files.forEach(file => {
        if (file.endsWith('.json')) {
          const capabilityPath = path.join(this.config.capabilitiesDir, file);
          try {
            const capability = JSON.parse(fs.readFileSync(capabilityPath, 'utf8'));
            capabilities.push(capability);
          } catch (error) {
            this.log(`Error reading capability file ${file}: ${error.message}`);
          }
        }
      });
      
      return capabilities;
    } catch (error) {
      this.log(`Error getting capabilities: ${error.message}`);
      return [];
    }
  }
  
  // 保存能力
  saveCapability(capability) {
    const capabilityPath = path.join(this.config.capabilitiesDir, `${capability.name.replace(/\s+/g, '-').toLowerCase()}.json`);
    
    try {
      fs.writeFileSync(capabilityPath, JSON.stringify(capability, null, 2));
      this.log(`Saved capability: ${capability.name}`);
    } catch (error) {
      this.log(`Error saving capability: ${error.message}`);
    }
  }
  
  // 删除能力
  deleteCapability(capabilityName) {
    const capabilityPath = path.join(this.config.capabilitiesDir, `${capabilityName.replace(/\s+/g, '-').toLowerCase()}.json`);
    
    try {
      if (fs.existsSync(capabilityPath)) {
        fs.unlinkSync(capabilityPath);
        this.log(`Deleted capability: ${capabilityName}`);
        return true;
      }
      return false;
    } catch (error) {
      this.log(`Error deleting capability: ${error.message}`);
      return false;
    }
  }
  
  // 分析能力冲突历史
  analyzeConflictHistory() {
    try {
      const files = fs.readdirSync(this.config.conflictsDir);
      const resolutions = [];
      
      files.forEach(file => {
        if (file.endsWith('.json')) {
          const resolutionPath = path.join(this.config.conflictsDir, file);
          try {
            const resolution = JSON.parse(fs.readFileSync(resolutionPath, 'utf8'));
            resolutions.push(resolution);
          } catch (error) {
            this.log(`Error reading resolution file ${file}: ${error.message}`);
          }
        }
      });
      
      if (resolutions.length === 0) {
        return {
          totalResolutions: 0,
          trends: {}
        };
      }
      
      // 分析冲突类型分布
      const conflictTypes = {};
      resolutions.forEach(resolution => {
        resolution.conflicts.forEach(conflict => {
          conflictTypes[conflict.type] = (conflictTypes[conflict.type] || 0) + 1;
        });
      });
      
      // 分析解决率
      const totalConflicts = resolutions.reduce((sum, res) => sum + res.conflicts.length, 0);
      const resolvedConflicts = resolutions.reduce((sum, res) => sum + res.resolved, 0);
      const resolutionRate = totalConflicts > 0 ? (resolvedConflicts / totalConflicts * 100).toFixed(2) : 0;
      
      this.log(`Conflict history analysis: ${totalConflicts} total conflicts, ${resolutionRate}% resolution rate`);
      
      return {
        totalResolutions: resolutions.length,
        totalConflicts: totalConflicts,
        resolutionRate: resolutionRate,
        conflictTypes: conflictTypes,
        mostCommonConflict: Object.keys(conflictTypes).reduce((a, b) => conflictTypes[a] > conflictTypes[b] ? a : b)
      };
    } catch (error) {
      this.log(`Error analyzing conflict history: ${error.message}`);
      return {
        error: error.message
      };
    }
  }
  
  // 清理旧的冲突记录
  cleanupOldConflicts(daysToKeep = 30) {
    this.log(`Cleaning up old conflict records (keeping last ${daysToKeep} days)...`);
    
    const cutoffTime = Date.now() - (daysToKeep * 24 * 60 * 60 * 1000);
    
    try {
      const files = fs.readdirSync(this.config.conflictsDir);
      let deletedCount = 0;
      
      files.forEach(file => {
        if (file.endsWith('.json')) {
          const resolutionPath = path.join(this.config.conflictsDir, file);
          try {
            const resolution = JSON.parse(fs.readFileSync(resolutionPath, 'utf8'));
            if (resolution.timestamp < cutoffTime) {
              fs.unlinkSync(resolutionPath);
              deletedCount++;
            }
          } catch (error) {
            this.log(`Error processing resolution file ${file}: ${error.message}`);
          }
        }
      });
      
      this.log(`Cleaned up ${deletedCount} old conflict records`);
      return deletedCount;
    } catch (error) {
      this.log(`Error cleaning up old conflicts: ${error.message}`);
      return 0;
    }
  }
  
  // 验证能力兼容性
  validateCapabilityCompatibility(newCapability, existingCapabilities) {
    this.log(`Validating compatibility for new capability: ${newCapability.name}`);
    
    const conflicts = this.detectConflicts(newCapability, existingCapabilities);
    const severeConflicts = conflicts.filter(c => c.severity === 'high');
    
    if (severeConflicts.length > 0) {
      this.log(`Capability compatibility validation failed: ${severeConflicts.length} severe conflicts`);
      return {
        compatible: false,
        conflicts: conflicts,
        severeConflicts: severeConflicts.length
      };
    }
    
    this.log('Capability compatibility validation passed');
    return {
      compatible: true,
      conflicts: conflicts,
      severeConflicts: 0
    };
  }
  
  // 获取能力冲突统计
  getConflictStatistics() {
    const history = this.analyzeConflictHistory();
    const capabilities = this.getAllCapabilities();
    
    return {
      totalCapabilities: capabilities.length,
      ...history
    };
  }
}

// 导出模块
module.exports = CapabilityConflictResolver;

// 导出默认实例
module.exports.default = new CapabilityConflictResolver();