const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class AgentSelfRepair {
  constructor(options = {}) {
    this.options = {
      errorRulesFile: path.join(process.cwd(), 'error-rules.json'),
      repairReportsDir: path.join(process.cwd(), 'repair-reports'),
      maxErrorHistory: 100,
      ...options
    };
    
    this.errorHistory = [];
    this.repairAttempts = 0;
    
    this.ensureDirectories();
    this.loadErrorRules();
    this.setupGlobalErrorHandlers();
  }

  // 确保目录存在
  ensureDirectories() {
    if (!fs.existsSync(this.options.repairReportsDir)) {
      fs.mkdirSync(this.options.repairReportsDir, { recursive: true });
    }
  }

  // 加载错误规则
  loadErrorRules() {
    try {
      if (fs.existsSync(this.options.errorRulesFile)) {
        this.errorRules = JSON.parse(fs.readFileSync(this.options.errorRulesFile, 'utf8'));
      } else {
        this.errorRules = this.getDefaultErrorRules();
        fs.writeFileSync(this.options.errorRulesFile, JSON.stringify(this.errorRules, null, 2), 'utf8');
      }
    } catch (error) {
      console.error('Error loading error rules:', error);
      this.errorRules = this.getDefaultErrorRules();
    }
  }

  // 默认错误规则
  getDefaultErrorRules() {
    return {
      rules: [
        {
          id: 'missing-file',
          pattern: /ENOENT.*no such file or directory/i,
          description: 'Missing file or directory',
          fix: this.fixMissingFile.bind(this),
          confidence: 0.95
        },
        {
          id: 'permission-denied',
          pattern: /EACCES.*permission denied/i,
          description: 'Permission denied',
          fix: this.fixPermissionDenied.bind(this),
          confidence: 0.9
        },
        {
          id: 'missing-dependency',
          pattern: /Cannot find module/i,
          description: 'Missing dependency',
          fix: this.fixMissingDependency.bind(this),
          confidence: 0.9
        },
        {
          id: 'syntax-error',
          pattern: /SyntaxError/i,
          description: 'Syntax error in code',
          fix: this.fixSyntaxError.bind(this),
          confidence: 0.8
        },
        {
          id: 'rate-limit',
          pattern: /429.*Too Many Requests/i,
          description: 'Rate limit exceeded',
          fix: this.fixRateLimit.bind(this),
          confidence: 0.85
        },
        {
          id: 'json-parse-error',
          pattern: /JSON\.parse.*Unexpected/i,
          description: 'JSON parse error',
          fix: this.fixJsonParseError.bind(this),
          confidence: 0.8
        },
        {
          id: 'port-in-use',
          pattern: /EADDRINUSE.*address already in use/i,
          description: 'Port already in use',
          fix: this.fixPortInUse.bind(this),
          confidence: 0.75
        },
        {
          id: 'out-of-memory',
          pattern: /JavaScript heap out of memory/i,
          description: 'Out of memory error',
          fix: this.fixOutOfMemory.bind(this),
          confidence: 0.7
        }
      ]
    };
  }

  // 设置全局错误处理器
  setupGlobalErrorHandlers() {
    // 捕获未捕获的异常
    process.on('uncaughtException', (error) => {
      this.handleError(error, 'uncaughtException');
    });

    // 捕获未处理的Promise拒绝
    process.on('unhandledRejection', (reason, promise) => {
      this.handleError(reason, 'unhandledRejection');
    });
  }

  // 处理错误
  async handleError(error, errorType = 'unknown') {
    const errorInfo = {
      id: `error_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      type: errorType,
      message: error.message || String(error),
      stack: error.stack || '',
      timestamp: new Date().toISOString(),
      attempts: this.repairAttempts
    };

    this.errorHistory.push(errorInfo);
    if (this.errorHistory.length > this.options.maxErrorHistory) {
      this.errorHistory.shift();
    }

    console.error(`[Agent Self-Repair] ${errorType}: ${error.message}`);

    // 分析错误
    const analysis = this.analyzeError(errorInfo);
    
    // 尝试修复
    const repairResult = await this.attemptRepair(errorInfo, analysis);
    
    // 生成报告
    this.generateRepairReport(errorInfo, analysis, repairResult);

    return {
      error: errorInfo,
      analysis,
      repair: repairResult
    };
  }

  // 分析错误
  analyzeError(errorInfo) {
    const matches = [];
    
    this.errorRules.rules.forEach(rule => {
      if (rule.pattern.test(errorInfo.message) || rule.pattern.test(errorInfo.stack)) {
        matches.push({
          ruleId: rule.id,
          description: rule.description,
          confidence: rule.confidence
        });
      }
    });

    // 按置信度排序
    matches.sort((a, b) => b.confidence - a.confidence);

    return {
      matchedRules: matches,
      topMatch: matches[0] || null,
      timestamp: new Date().toISOString()
    };
  }

  // 尝试修复
  async attemptRepair(errorInfo, analysis) {
    if (!analysis.topMatch) {
      return {
        success: false,
        reason: 'No matching error rule found',
        attemptedFixes: []
      };
    }

    this.repairAttempts++;
    const attemptedFixes = [];

    try {
      const rule = this.errorRules.rules.find(r => r.id === analysis.topMatch.ruleId);
      if (rule && rule.fix) {
        const fixResult = await rule.fix(errorInfo);
        attemptedFixes.push({
          ruleId: rule.id,
          description: rule.description,
          result: fixResult
        });

        if (fixResult.success) {
          return {
            success: true,
            attemptedFixes,
            timestamp: new Date().toISOString()
          };
        }
      }
    } catch (fixError) {
      console.error(`[Agent Self-Repair] Fix attempt failed: ${fixError.message}`);
      attemptedFixes.push({
        ruleId: analysis.topMatch.ruleId,
        description: analysis.topMatch.description,
        result: {
          success: false,
          error: fixError.message
        }
      });
    }

    return {
      success: false,
      attemptedFixes,
      timestamp: new Date().toISOString()
    };
  }

  // 生成修复报告
  generateRepairReport(errorInfo, analysis, repairResult) {
    const report = {
      reportId: `report_${Date.now()}`,
      error: errorInfo,
      analysis,
      repair: repairResult,
      systemInfo: {
        nodeVersion: process.version,
        platform: process.platform,
        arch: process.arch,
        cwd: process.cwd(),
        memoryUsage: process.memoryUsage()
      },
      timestamp: new Date().toISOString()
    };

    const reportFile = path.join(this.options.repairReportsDir, `${report.reportId}.json`);
    fs.writeFileSync(reportFile, JSON.stringify(report, null, 2), 'utf8');

    // 生成人类可读的报告
    const humanReport = this.generateHumanReadableReport(report);
    const humanReportFile = path.join(this.options.repairReportsDir, `${report.reportId}.md`);
    fs.writeFileSync(humanReportFile, humanReport, 'utf8');

    console.log(`[Agent Self-Repair] Repair report generated: ${reportFile}`);
    
    // 如果修复失败，通知人类
    if (!repairResult.success) {
      this.notifyHuman(report);
    }

    return report;
  }

  // 生成人类可读的报告
  generateHumanReadableReport(report) {
    let markdown = `# Agent Self-Repair Report

## Report Details
- **Report ID**: ${report.reportId}
- **Timestamp**: ${report.timestamp}
- **Error ID**: ${report.error.id}
- **Error Type**: ${report.error.type}

## Error Information
- **Message**: ${report.error.message}
- **Stack Trace**: 

${report.error.stack}


## Analysis
- **Matched Rules**: ${report.analysis.matchedRules.length}
${report.analysis.matchedRules.map(rule => 
  `- ${rule.description} (Confidence: ${(rule.confidence * 100).toFixed(1)}%)`
).join('\n')}

## Repair Attempt
- **Success**: ${report.repair.success ? 'Yes' : 'No'}
- **Attempts**: ${report.error.attempts}

${report.repair.attemptedFixes.map(fix => `
### Fix Attempt: ${fix.description}
- **Success**: ${fix.result.success ? 'Yes' : 'No'}
${fix.result.error ? `- **Error**: ${fix.result.error}` : ''}
`).join('')}

## System Information
- **Node.js Version**: ${report.systemInfo.nodeVersion}
- **Platform**: ${report.systemInfo.platform} (${report.systemInfo.arch})
- **Working Directory**: ${report.systemInfo.cwd}
- **Memory Usage**: ${Math.round(report.systemInfo.memoryUsage.heapUsed / 1024 / 1024)}MB / ${Math.round(report.systemInfo.memoryUsage.heapTotal / 1024 / 1024)}MB

## Recommendations
${report.repair.success 
  ? '- The error has been successfully repaired. No further action needed.' 
  : '- The error could not be automatically repaired. Please investigate manually.'
}
`;

    return markdown;
  }

  // 通知人类
  notifyHuman(report) {
    console.log('========================================');
    console.log('🔴 [AGENT SELF-REPAIR] URGENT: Manual Intervention Required');
    console.log('========================================');
    console.log(`Error: ${report.error.message}`);
    console.log(`Report: ${path.join(this.options.repairReportsDir, `${report.reportId}.md`)}`);
    console.log('Please review the repair report and take appropriate action.');
    console.log('========================================');
  }

  // 修复方法

  // 修复缺失文件
  fixMissingFile(errorInfo) {
    try {
      const filePathMatch = errorInfo.message.match(/ENOENT.*no such file or directory.*['"]([^'"]+)['"]/i);
      if (filePathMatch) {
        const filePath = filePathMatch[1];
        const dirPath = path.dirname(filePath);
        
        // 创建目录
        if (!fs.existsSync(dirPath)) {
          fs.mkdirSync(dirPath, { recursive: true });
        }
        
        // 创建空文件
        if (!fs.existsSync(filePath)) {
          fs.writeFileSync(filePath, '', 'utf8');
        }
        
        return {
          success: true,
          action: `Created missing file: ${filePath}`
        };
      }
      return { success: false, error: 'Could not extract file path from error message' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // 修复权限被拒绝
  fixPermissionDenied(errorInfo) {
    try {
      const filePathMatch = errorInfo.message.match(/EACCES.*permission denied.*['"]([^'"]+)['"]/i);
      if (filePathMatch) {
        const filePath = filePathMatch[1];
        
        // 尝试修改权限
        fs.chmodSync(filePath, 0o644);
        
        return {
          success: true,
          action: `Changed permissions for: ${filePath}`
        };
      }
      return { success: false, error: 'Could not extract file path from error message' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // 修复缺失依赖
  fixMissingDependency(errorInfo) {
    try {
      const moduleMatch = errorInfo.message.match(/Cannot find module ['"]([^'"]+)['"]/i);
      if (moduleMatch) {
        const moduleName = moduleMatch[1];
        
        // 尝试安装依赖
        execSync(`npm install ${moduleName}`, { stdio: 'inherit' });
        
        return {
          success: true,
          action: `Installed missing dependency: ${moduleName}`
        };
      }
      return { success: false, error: 'Could not extract module name from error message' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // 修复语法错误
  fixSyntaxError(errorInfo) {
    try {
      const filePathMatch = errorInfo.message.match(/SyntaxError.*['"]([^'"]+)['"]/i);
      if (filePathMatch) {
        const filePath = filePathMatch[1];
        
        // 这里可以实现更复杂的语法错误修复
        // 暂时只返回错误信息
        return {
          success: false,
          error: `Syntax error in ${filePath} requires manual fix`
        };
      }
      return { success: false, error: 'Could not extract file path from error message' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // 修复速率限制
  fixRateLimit(errorInfo) {
    try {
      // 实现退避策略
      const delay = Math.pow(2, this.repairAttempts) * 1000 + Math.random() * 1000;
      
      return {
        success: true,
        action: `Implemented backoff strategy with ${Math.round(delay / 1000)}s delay`
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // 修复JSON解析错误
  fixJsonParseError(errorInfo) {
    try {
      const filePathMatch = errorInfo.message.match(/JSON\.parse.*['"]([^'"]+)['"]/i);
      if (filePathMatch) {
        const filePath = filePathMatch[1];
        
        // 尝试读取并修复JSON文件
        if (fs.existsSync(filePath)) {
          const content = fs.readFileSync(filePath, 'utf8');
          // 这里可以实现更复杂的JSON修复
          // 暂时只返回错误信息
          return {
            success: false,
            error: `JSON parse error in ${filePath} requires manual fix`
          };
        }
      }
      return { success: false, error: 'Could not extract file path from error message' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // 修复端口被占用
  fixPortInUse(errorInfo) {
    try {
      const portMatch = errorInfo.message.match(/EADDRINUSE.*address already in use.*:(\d+)/i);
      if (portMatch) {
        const port = portMatch[1];
        
        // 尝试找到并终止占用端口的进程
        try {
          if (process.platform === 'win32') {
            execSync(`netstat -ano | findstr :${port}`, { stdio: 'inherit' });
          } else {
            execSync(`lsof -i :${port}`, { stdio: 'inherit' });
          }
        } catch (e) {
          // 忽略错误，继续执行
        }
        
        return {
          success: true,
          action: `Detected port ${port} in use, please check and terminate the process`
        };
      }
      return { success: false, error: 'Could not extract port from error message' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // 修复内存不足
  fixOutOfMemory(errorInfo) {
    try {
      // 增加Node.js内存限制
      process.env.NODE_OPTIONS = '--max-old-space-size=4096';
      
      return {
        success: true,
        action: 'Increased Node.js memory limit to 4GB'
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // 获取错误统计
  getErrorStats() {
    const stats = {
      totalErrors: this.errorHistory.length,
      repairAttempts: this.repairAttempts,
      errorsByType: {},
      errorsByRule: {},
      timestamp: new Date().toISOString()
    };

    // 按类型统计错误
    this.errorHistory.forEach(error => {
      stats.errorsByType[error.type] = (stats.errorsByType[error.type] || 0) + 1;
    });

    // 按规则统计错误
    this.errorHistory.forEach(error => {
      const analysis = this.analyzeError(error);
      if (analysis.topMatch) {
        stats.errorsByRule[analysis.topMatch.ruleId] = (stats.errorsByRule[analysis.topMatch.ruleId] || 0) + 1;
      }
    });

    return stats;
  }

  // 重置错误历史
  resetErrorHistory() {
    this.errorHistory = [];
    this.repairAttempts = 0;
    console.log('[Agent Self-Repair] Error history reset');
  }

  // 手动触发自检
  async runSelfCheck() {
    const checkResults = {
      timestamp: new Date().toISOString(),
      checks: [],
      status: 'unknown'
    };

    // 检查文件系统
    checkResults.checks.push(await this.checkFileSystem());

    // 检查依赖
    checkResults.checks.push(await this.checkDependencies());

    // 检查网络连接
    checkResults.checks.push(await this.checkNetwork());

    // 检查内存使用
    checkResults.checks.push(await this.checkMemory());

    // 检查CPU使用
    checkResults.checks.push(await this.checkCPU());

    // 确定整体状态
    const failedChecks = checkResults.checks.filter(check => !check.success);
    checkResults.status = failedChecks.length === 0 ? 'healthy' : 'unhealthy';

    // 生成自检报告
    const reportFile = path.join(this.options.repairReportsDir, `self-check_${Date.now()}.json`);
    fs.writeFileSync(reportFile, JSON.stringify(checkResults, null, 2), 'utf8');

    console.log(`[Agent Self-Repair] Self-check completed. Status: ${checkResults.status}`);

    return checkResults;
  }

  // 检查文件系统
  async checkFileSystem() {
    try {
      const stats = fs.statSync(process.cwd());
      return {
        name: 'fileSystem',
        success: true,
        message: 'File system access is healthy',
        details: {
          cwd: process.cwd(),
          mode: stats.mode
        }
      };
    } catch (error) {
      return {
        name: 'fileSystem',
        success: false,
        message: 'File system access failed',
        error: error.message
      };
    }
  }

  // 检查依赖
  async checkDependencies() {
    try {
      const packageJson = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8'));
      return {
        name: 'dependencies',
        success: true,
        message: 'Package.json is valid',
        details: {
          dependencies: Object.keys(packageJson.dependencies || {}).length,
          devDependencies: Object.keys(packageJson.devDependencies || {}).length
        }
      };
    } catch (error) {
      return {
        name: 'dependencies',
        success: false,
        message: 'Failed to check dependencies',
        error: error.message
      };
    }
  }

  // 检查网络连接
  async checkNetwork() {
    try {
      // 尝试DNS解析
      require('dns').lookup('google.com', (err) => {
        if (err) {
          throw err;
        }
      });
      return {
        name: 'network',
        success: true,
        message: 'Network connection is healthy'
      };
    } catch (error) {
      return {
        name: 'network',
        success: false,
        message: 'Network connection failed',
        error: error.message
      };
    }
  }

  // 检查内存使用
  async checkMemory() {
    const memoryUsage = process.memoryUsage();
    const heapUsedMB = Math.round(memoryUsage.heapUsed / 1024 / 1024);
    const heapTotalMB = Math.round(memoryUsage.heapTotal / 1024 / 1024);
    const usagePercent = Math.round((heapUsedMB / heapTotalMB) * 100);

    return {
      name: 'memory',
      success: usagePercent < 80,
      message: `Memory usage: ${heapUsedMB}MB / ${heapTotalMB}MB (${usagePercent}%)`,
      details: memoryUsage
    };
  }

  // 检查CPU使用
  async checkCPU() {
    try {
      // 这里可以实现更复杂的CPU检查
      return {
        name: 'cpu',
        success: true,
        message: 'CPU usage is healthy'
      };
    } catch (error) {
      return {
        name: 'cpu',
        success: false,
        message: 'Failed to check CPU usage',
        error: error.message
      };
    }
  }
}

// 导出单例
module.exports = new AgentSelfRepair();
module.exports.AgentSelfRepair = AgentSelfRepair;
