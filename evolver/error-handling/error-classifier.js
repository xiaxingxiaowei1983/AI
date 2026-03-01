const fs = require('fs');
const path = require('path');

const ERROR_LOG_FILE = path.join(__dirname, '../error-logs.json');

class ErrorClassifier {
  constructor() {
    this.errorCategories = this.defineErrorCategories();
    this.errorHistory = this.loadErrorHistory();
  }

  defineErrorCategories() {
    return {
      NETWORK: {
        name: 'Network Errors',
        severity: 'high',
        recoverable: true,
        patterns: [
          'ECONNREFUSED',
          'ECONNRESET',
          'ENOTFOUND',
          'ETIMEDOUT',
          'EHOSTUNREACH',
          'network',
          'timeout',
          'connection'
        ],
        subcategories: {
          CONNECTION_FAILED: { severity: 'critical', autoRecover: true },
          TIMEOUT: { severity: 'high', autoRecover: true },
          DNS_FAILURE: { severity: 'critical', autoRecover: false },
          SSL_ERROR: { severity: 'critical', autoRecover: false }
        }
      },
      FILE_SYSTEM: {
        name: 'File System Errors',
        severity: 'medium',
        recoverable: true,
        patterns: [
          'ENOENT',
          'EACCES',
          'EPERM',
          'EISDIR',
          'ENOTDIR',
          'EMFILE',
          'file',
          'directory',
          'permission'
        ],
        subcategories: {
          FILE_NOT_FOUND: { severity: 'medium', autoRecover: false },
          PERMISSION_DENIED: { severity: 'high', autoRecover: false },
          DISK_FULL: { severity: 'critical', autoRecover: false },
          FILE_LOCKED: { severity: 'medium', autoRecover: true }
        }
      },
      DATA: {
        name: 'Data Errors',
        severity: 'medium',
        recoverable: true,
        patterns: [
          'JSON',
          'parse',
          'syntax',
          'invalid',
          'format',
          'type',
          'undefined',
          'null'
        ],
        subcategories: {
          PARSE_ERROR: { severity: 'medium', autoRecover: true },
          VALIDATION_ERROR: { severity: 'low', autoRecover: false },
          TYPE_ERROR: { severity: 'medium', autoRecover: false },
          FORMAT_ERROR: { severity: 'medium', autoRecover: true }
        }
      },
      SYSTEM: {
        name: 'System Errors',
        severity: 'high',
        recoverable: false,
        patterns: [
          'ENOMEM',
          'SIGKILL',
          'SIGTERM',
          'memory',
          'cpu',
          'crash',
          'fatal'
        ],
        subcategories: {
          OUT_OF_MEMORY: { severity: 'critical', autoRecover: false },
          PROCESS_KILLED: { severity: 'critical', autoRecover: false },
          RESOURCE_EXHAUSTED: { severity: 'high', autoRecover: true }
        }
      },
      CAPABILITY: {
        name: 'Capability Errors',
        severity: 'medium',
        recoverable: true,
        patterns: [
          'capability',
          'not found',
          'unsupported',
          'disabled',
          'constraint'
        ],
        subcategories: {
          CAPABILITY_NOT_FOUND: { severity: 'medium', autoRecover: false },
          CONSTRAINT_VIOLATION: { severity: 'medium', autoRecover: true },
          DEPENDENCY_ERROR: { severity: 'high', autoRecover: true }
        }
      },
      EVOLUTION: {
        name: 'Evolution Errors',
        severity: 'low',
        recoverable: true,
        patterns: [
          'evolution',
          'mutation',
          'degeneration',
          'rollback',
          'version'
        ],
        subcategories: {
          EVOLUTION_FAILED: { severity: 'low', autoRecover: true },
          DEGENERATION_DETECTED: { severity: 'medium', autoRecover: true },
          VERSION_CONFLICT: { severity: 'medium', autoRecover: true }
        }
      }
    };
  }

  loadErrorHistory() {
    if (fs.existsSync(ERROR_LOG_FILE)) {
      try {
        return JSON.parse(fs.readFileSync(ERROR_LOG_FILE, 'utf8'));
      } catch (error) {
        console.error('Error loading error history:', error.message);
        return [];
      }
    }
    return [];
  }

  saveErrorHistory() {
    fs.writeFileSync(ERROR_LOG_FILE, JSON.stringify(this.errorHistory, null, 2));
  }

  classifyError(error) {
    const errorInfo = {
      timestamp: new Date().toISOString(),
      message: error.message || String(error),
      stack: error.stack || null,
      code: error.code || null,
      category: null,
      subcategory: null,
      severity: 'unknown',
      recoverable: false,
      autoRecover: false,
      patterns: []
    };

    const errorMessage = error.message?.toLowerCase() || '';
    const errorCode = error.code?.toLowerCase() || '';

    for (const [categoryKey, category] of Object.entries(this.errorCategories)) {
      const matchedPatterns = category.patterns.filter(pattern =>
        errorMessage.includes(pattern.toLowerCase()) ||
        errorCode.includes(pattern.toLowerCase())
      );

      if (matchedPatterns.length > 0) {
        errorInfo.category = categoryKey;
        errorInfo.severity = category.severity;
        errorInfo.recoverable = category.recoverable;
        errorInfo.patterns = matchedPatterns;

        for (const [subKey, subcategory] of Object.entries(category.subcategories)) {
          const subPattern = subKey.replace(/_/g, ' ').toLowerCase();
          if (errorMessage.includes(subPattern) || errorCode.includes(subPattern)) {
            errorInfo.subcategory = subKey;
            errorInfo.severity = subcategory.severity;
            errorInfo.autoRecover = subcategory.autoRecover;
            break;
          }
        }

        break;
      }
    }

    if (!errorInfo.category) {
      errorInfo.category = 'UNKNOWN';
      errorInfo.severity = 'medium';
      errorInfo.recoverable = true;
    }

    this.errorHistory.push(errorInfo);
    this.saveErrorHistory();

    console.log(`🔍 Error classified: ${errorInfo.category}/${errorInfo.subcategory || 'general'} (${errorInfo.severity})`);
    return errorInfo;
  }

  getErrorStatistics() {
    const stats = {
      total: this.errorHistory.length,
      byCategory: {},
      bySeverity: {},
      recentErrors: [],
      trends: []
    };

    for (const error of this.errorHistory) {
      stats.byCategory[error.category] = (stats.byCategory[error.category] || 0) + 1;
      stats.bySeverity[error.severity] = (stats.bySeverity[error.severity] || 0) + 1;
    }

    stats.recentErrors = this.errorHistory.slice(-10);

    return stats;
  }

  getRecoveryRecommendation(errorInfo) {
    const recommendations = {
      NETWORK: {
        CONNECTION_FAILED: ['检查网络连接', '验证目标服务器状态', '使用备用服务器'],
        TIMEOUT: ['增加超时时间', '检查网络延迟', '使用缓存结果'],
        DNS_FAILURE: ['检查DNS配置', '使用IP地址', '更新DNS服务器'],
        SSL_ERROR: ['检查SSL证书', '更新CA证书', '禁用SSL验证（仅测试）']
      },
      FILE_SYSTEM: {
        FILE_NOT_FOUND: ['检查文件路径', '创建缺失文件', '使用默认文件'],
        PERMISSION_DENIED: ['检查文件权限', '以管理员身份运行', '修改文件所有者'],
        DISK_FULL: ['清理磁盘空间', '删除临时文件', '移动文件到其他磁盘'],
        FILE_LOCKED: ['等待文件释放', '强制关闭占用进程', '使用文件副本']
      },
      DATA: {
        PARSE_ERROR: ['检查数据格式', '使用容错解析', '修复数据源'],
        VALIDATION_ERROR: ['检查数据约束', '调整验证规则', '修复数据内容'],
        TYPE_ERROR: ['检查数据类型', '添加类型转换', '修复数据源'],
        FORMAT_ERROR: ['检查数据格式', '使用格式转换', '更新解析器']
      },
      SYSTEM: {
        OUT_OF_MEMORY: ['释放内存', '减少并发数', '增加系统内存'],
        PROCESS_KILLED: ['检查资源使用', '优化性能', '重启进程'],
        RESOURCE_EXHAUSTED: ['释放资源', '优化资源使用', '增加资源限制']
      },
      CAPABILITY: {
        CAPABILITY_NOT_FOUND: ['检查能力ID', '使用替代能力', '创建新能力'],
        CONSTRAINT_VIOLATION: ['检查约束条件', '调整参数', '禁用约束'],
        DEPENDENCY_ERROR: ['检查依赖状态', '安装缺失依赖', '更新依赖版本']
      },
      EVOLUTION: {
        EVOLUTION_FAILED: ['回滚到上一版本', '使用默认配置', '手动修复'],
        DEGENERATION_DETECTED: ['应用反退化锁', '回滚变更', '重新评估'],
        VERSION_CONFLICT: ['合并版本', '选择正确版本', '重新生成']
      }
    };

    if (errorInfo.category && recommendations[errorInfo.category]) {
      if (errorInfo.subcategory && recommendations[errorInfo.category][errorInfo.subcategory]) {
        return recommendations[errorInfo.category][errorInfo.subcategory];
      }
      return Object.values(recommendations[errorInfo.category]).flat();
    }

    return ['检查错误详情', '查看日志', '联系支持'];
  }

  assessErrorSeverity(errorInfo) {
    const severityScores = {
      critical: 100,
      high: 75,
      medium: 50,
      low: 25,
      unknown: 10
    };

    let score = severityScores[errorInfo.severity] || 10;

    if (errorInfo.recoverable) {
      score *= 0.7;
    }

    if (errorInfo.autoRecover) {
      score *= 0.5;
    }

    const recentSimilarErrors = this.errorHistory.filter(e =>
      e.category === errorInfo.category &&
      Date.now() - new Date(e.timestamp).getTime() < 3600000
    ).length;

    if (recentSimilarErrors > 3) {
      score *= 1.5;
    }

    return {
      score: Math.min(100, Math.round(score)),
      level: score >= 75 ? 'critical' : score >= 50 ? 'high' : score >= 25 ? 'medium' : 'low',
      needsImmediateAttention: score >= 50
    };
  }

  clearHistory() {
    this.errorHistory = [];
    this.saveErrorHistory();
    console.log('Error history cleared');
  }
}

module.exports = ErrorClassifier;
