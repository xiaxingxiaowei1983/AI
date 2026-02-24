/**
 * 反退化锁定机制
 * 防止系统能力退化，确保进化的实质性和稳定性
 * 为 PCEC 系统提供安全保障
 */

const fs = require('fs');
const path = require('path');

class AntiDegenerationLock {
  constructor(config = {}) {
    this.config = {
      baseDir: config.baseDir || path.join(__dirname, '..', 'data'),
      configPath: config.configPath || path.join(__dirname, '..', 'data', 'anti-degeneration-lock.json'),
      rollbackDir: config.rollbackDir || path.join(__dirname, '..', 'data', 'rollback-points'),
      logFile: config.logFile || path.join(__dirname, '..', '..', '..', 'logs', 'anti-degeneration-lock.log'),
      status: 'ACTIVE',
      priority: 'HIGHEST',
      ...config
    };
    
    this.constraints = {
      prohibitedBehaviors: [
        '为了"显得更聪明"而增加复杂度',
        '引入无法验证、无法复现、无法解释的机制',
        '使用模糊概念替代可执行策略',
        '把"感觉正确"当作决策依据'
      ],
      stabilityPriority: [
        '稳定性',
        '可解释性',
        '可复用性',
        '扩展性',
        '新颖性'
      ],
      antiMetaphysicsPatterns: [
        '某种程度上',
        '可能是一种',
        '从更高维度看',
        '本质上是'
      ]
    };
    
    this.ensureDirectories();
    this.initializeConfig();
  }
  
  // 确保目录存在
  ensureDirectories() {
    const directories = [
      this.config.baseDir,
      this.config.rollbackDir,
      path.dirname(this.config.logFile)
    ];
    
    directories.forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        this.log(`Created directory: ${dir}`);
      }
    });
  }
  
  // 初始化配置
  initializeConfig() {
    const configData = {
      status: this.config.status,
      priority: this.config.priority,
      constraints: this.constraints,
      rollbackMechanism: {
        enabled: true,
        lastStableVersion: 'current',
        evolutionHypothesis: '',
        rollbackConditions: [
          '进化降低成功率',
          '进化降低确定性',
          '进化引入无法解释的机制'
        ]
      },
      updated: Date.now()
    };
    
    if (!fs.existsSync(this.config.configPath)) {
      fs.writeFileSync(this.config.configPath, JSON.stringify(configData, null, 2));
      this.log('Initialized anti-degeneration lock configuration');
    } else {
      // 更新现有配置
      const existingConfig = JSON.parse(fs.readFileSync(this.config.configPath, 'utf8'));
      const updatedConfig = {
        ...existingConfig,
        ...configData,
        updated: Date.now()
      };
      fs.writeFileSync(this.config.configPath, JSON.stringify(updatedConfig, null, 2));
      this.log('Updated anti-degeneration lock configuration');
    }
  }
  
  // 日志函数
  log(message) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [Anti-Degeneration Lock] ${message}`;
    console.log(logMessage);
    
    // 写入日志文件
    fs.appendFileSync(this.config.logFile, logMessage + '\n', { flag: 'a' });
  }
  
  // 检测退化
  detectDegeneration(evolutionResult) {
    this.log('Detecting potential degeneration...');
    
    const issues = [];
    
    // 检查是否为成功的进化
    if (!evolutionResult.success) {
      issues.push('Evolution task failed');
    }
    
    // 检查是否有明确的输入输出描述
    if (!evolutionResult.type || !evolutionResult.message) {
      issues.push('Evolution lacks clear type or message');
    }
    
    // 检查是否使用模糊语言
    if (evolutionResult.message) {
      const message = evolutionResult.message.toLowerCase();
      this.constraints.antiMetaphysicsPatterns.forEach(pattern => {
        if (message.includes(pattern)) {
          issues.push(`Use of prohibited metaphysical language: ${pattern}`);
        }
      });
      
      // 增强反玄学检测 - 检查其他模糊语言模式
      const additionalVaguePatterns = [
        '某种意义上', '某种程度', '某种方式', '某种形式',
        '可能是', '或许是', '应该是', '大概是',
        '从...角度看', '从...层面看', '从...维度看',
        '本质上', '实质上', '基本上', '实际上'
      ];
      
      additionalVaguePatterns.forEach(pattern => {
        if (message.includes(pattern)) {
          issues.push(`Use of prohibited vague language: ${pattern}`);
        }
      });
      
      // 检查概念具体化验证
      const concreteTerms = ['具体', '明确', '可执行', '可验证', '可复现', '可解释', '实现细节', '具体步骤', '具体方法', '明确的步骤'];
      const vagueTerms = ['模糊', '抽象', '大概', '可能', '也许', '某种', '一些', '某些', '模糊的概念'];
      
      const hasConcreteTerms = concreteTerms.some(term => message.includes(term));
      const hasVagueTerms = vagueTerms.some(term => message.includes(term));
      
      // 增强模糊概念检测
      const hasVagueConcepts = message.includes('模糊的概念') || 
                              (message.includes('概念') && message.includes('模糊')) ||
                              (message.includes('解决方案') && !message.includes('具体'));
      
      if ((hasVagueTerms && !hasConcreteTerms) || hasVagueConcepts) {
        issues.push('Evolution uses vague concepts without concrete implementation details');
      }
      
      // 检查行为变化验证
      const actionTerms = ['实现', '执行', '操作', '步骤', '流程', '方法'];
      const hasActionTerms = actionTerms.some(term => message.includes(term));
      
      if (!hasActionTerms) {
        issues.push('Evolution lacks clear action steps or behavior changes');
      }
    }
    
    // 检查是否为实质性进化
    if (!this.isSubstantialEvolution(evolutionResult)) {
      issues.push('Evolution is not substantial');
    }
    
    // 检查稳定性优先原则
    if (evolutionResult.message) {
      const message = evolutionResult.message.toLowerCase();
      // 检查是否优先新颖性而忽略稳定性
      if ((message.includes('新颖') || message.includes('创新')) && 
          (message.includes('稳定性较低') || message.includes('可能会导致系统崩溃') || message.includes('不可预测的行为'))) {
        issues.push('Evolution prioritizes novelty over stability - stability must come first');
      }
    }
    
    // 检查是否引入了禁止的行为
    if (evolutionResult.message) {
      const message = evolutionResult.message.toLowerCase();
      
      // 检查第一个禁止行为：为了"显得更聪明"而增加复杂度
      if (message.includes('显得更聪明') || message.includes('增加复杂度') || (message.includes('聪明') && message.includes('复杂度')) || 
          (message.includes('复杂') && !message.includes('简化') && !message.includes('优化'))) {
        issues.push('Use of prohibited behavior: 为了"显得更聪明"而增加复杂度');
      }
      
      // 检查第二个禁止行为：引入无法验证、无法复现、无法解释的机制
      if (message.includes('无法验证') || message.includes('无法复现') || message.includes('无法解释') || 
          message.includes('神秘机制') || message.includes('黑箱') || message.includes('无法预测')) {
        issues.push('Use of prohibited behavior: 引入无法验证、无法复现、无法解释的机制');
      }
      
      // 检查第三个禁止行为：使用模糊概念替代可执行策略
      if (message.includes('模糊概念') || message.includes('替代可执行策略') || (message.includes('模糊') && message.includes('策略')) || 
          message.includes('大概') || message.includes('可能') || message.includes('也许') || message.includes('某种')) {
        issues.push('Use of prohibited behavior: 使用模糊概念替代可执行策略');
      }
      
      // 检查第四个禁止行为：把"感觉正确"当作决策依据
      if (message.includes('感觉正确') || message.includes('当作决策依据') || (message.includes('感觉') && message.includes('决策')) || 
          message.includes('直觉') || message.includes('感觉') || message.includes('应该是') || message.includes('我认为')) {
        issues.push('Use of prohibited behavior: 把"感觉正确"当作决策依据');
      }
    }
    
    // 检查能力描述是否清晰
    if (evolutionResult.capability) {
      const capability = evolutionResult.capability;
      if (!capability.inputs || !capability.outputs || !capability.failureModes) {
        issues.push('Capability lacks clear inputs, outputs, or failure modes');
      }
    }
    
    // 检查是否可验证、可复现、可解释
    if (evolutionResult.message) {
      const message = evolutionResult.message.toLowerCase();
      // 只在明确提到不可验证、不可复现或不可解释时才标记
      if (message.includes('无法验证') || message.includes('无法复现') || message.includes('无法解释') || 
          message.includes('不可验证') || message.includes('不可复现') || message.includes('不可解释')) {
        issues.push('Evolution lacks verification, reproducibility, or explainability mechanisms');
      }
    }
    
    if (issues.length > 0) {
      this.log(`Detected ${issues.length} potential degeneration issues`);
      return {
        degenerated: true,
        issues,
        severity: issues.length > 2 ? 'high' : 'medium'
      };
    }
    
    this.log('No degeneration issues detected');
    return {
      degenerated: false,
      issues: [],
      severity: 'low'
    };
  }
  
  // 检查是否为实质性进化
  isSubstantialEvolution(evolutionResult) {
    const substantialTypes = ['new-feature', 'new-abstract', 'new-lever'];
    return substantialTypes.includes(evolutionResult.type);
  }
  
  // 稳定性优先执行器
  stabilityPriorityEnforcer(evolutionResult) {
    this.log('Enforcing stability priority...');
    
    const issues = [];
    
    // 检查稳定性优先原则
    if (evolutionResult.message) {
      const message = evolutionResult.message.toLowerCase();
      
      // 检查是否优先新颖性而忽略稳定性
      if ((message.includes('新颖') || message.includes('创新') || message.includes('创意')) && 
          (message.includes('稳定性较低') || message.includes('可能会导致系统崩溃') || message.includes('不可预测的行为') || 
           message.includes('不稳定') || message.includes('风险较高'))) {
        issues.push('Evolution prioritizes novelty over stability - stability must come first');
      }
      
      // 检查是否优先扩展性而忽略可解释性
      if ((message.includes('扩展性') || message.includes('扩展')) && 
          (message.includes('难以解释') || message.includes('复杂难懂') || message.includes('黑箱'))) {
        issues.push('Evolution prioritizes extensibility over explainability - explainability must come before extensibility');
      }
      
      // 检查是否优先可复用性而忽略稳定性
      if ((message.includes('可复用') || message.includes('复用') || message.includes('reuse') || message.includes('提高了代码的可复用性')) && 
          (message.includes('稳定性较低') || message.includes('可能会导致系统崩溃') || message.includes('不稳定') || message.includes('风险较高') || message.includes('可能会导致系统稳定性降低'))) {
        issues.push('Evolution prioritizes reusability over stability - stability must come first');
      }
    }
    
    // 检查进化结果中的优先级排序
    if (evolutionResult.priorityOrder) {
      const priorityOrder = evolutionResult.priorityOrder;
      const expectedOrder = this.constraints.stabilityPriority;
      
      // 检查稳定性是否是第一优先级
      if (priorityOrder[0] !== expectedOrder[0]) {
        issues.push('Stability must be the first priority in evolution decisions');
      }
      
      // 检查可解释性是否在可复用性之前
      const explainabilityIndex = priorityOrder.indexOf('可解释性');
      const reusabilityIndex = priorityOrder.indexOf('可复用性');
      if (explainabilityIndex > reusabilityIndex && explainabilityIndex !== -1 && reusabilityIndex !== -1) {
        issues.push('Explainability must come before reusability in evolution decisions');
      }
      
      // 检查可复用性是否在扩展性之前
      const extensibilityIndex = priorityOrder.indexOf('扩展性');
      if (reusabilityIndex > extensibilityIndex && reusabilityIndex !== -1 && extensibilityIndex !== -1) {
        issues.push('Reusability must come before extensibility in evolution decisions');
      }
      
      // 检查扩展性是否在新颖性之前
      const noveltyIndex = priorityOrder.indexOf('新颖性');
      if (extensibilityIndex > noveltyIndex && extensibilityIndex !== -1 && noveltyIndex !== -1) {
        issues.push('Extensibility must come before novelty in evolution decisions');
      }
    }
    
    return {
      compliance: issues.length === 0,
      issues
    };
  }
  
  // 创建回滚点
  createRollbackPoint(description = 'Automatic rollback point creation') {
    this.log('Creating rollback point...');
    
    const rollbackId = `rollback-${Date.now()}`;
    const rollbackPath = path.join(this.config.rollbackDir, `${rollbackId}.json`);
    
    // 保存当前状态
    const rollbackData = {
      id: rollbackId,
      timestamp: Date.now(),
      status: 'created',
      description: description,
      systemState: {
        timestamp: Date.now(),
        processInfo: {
          pid: process.pid,
          memoryUsage: process.memoryUsage(),
          uptime: process.uptime()
        },
        environment: {
          nodeVersion: process.version,
          platform: process.platform,
          arch: process.arch
        }
      },
      // 增强快照系统 - 保存能力状态
      capabilityState: {
        timestamp: Date.now(),
        capabilities: this.getCapabilitySnapshot(),
        constraints: this.constraints
      },
      // 保存配置状态
      configState: {
        timestamp: Date.now(),
        config: this.config,
        activeConstraints: this.constraints
      },
      // 保存进化历史
      evolutionHistory: this.getRecentEvolutionHistory()
    };
    
    fs.writeFileSync(rollbackPath, JSON.stringify(rollbackData, null, 2));
    this.log(`Created rollback point: ${rollbackId}`);
    
    // 清理旧的回滚点，只保留最近10个
    this.cleanupOldRollbackPoints(10);
    
    return rollbackId;
  }
  
  // 清理旧的回滚点
  cleanupOldRollbackPoints(keepCount = 10) {
    try {
      const files = fs.readdirSync(this.config.rollbackDir);
      const rollbackPoints = [];
      
      files.forEach(file => {
        if (file.endsWith('.json')) {
          const rollbackPath = path.join(this.config.rollbackDir, file);
          try {
            const rollbackData = JSON.parse(fs.readFileSync(rollbackPath, 'utf8'));
            rollbackPoints.push({ file, timestamp: rollbackData.timestamp });
          } catch (error) {
            this.log(`Error reading rollback point ${file}: ${error.message}`);
          }
        }
      });
      
      // 按时间排序，删除旧的回滚点
      rollbackPoints.sort((a, b) => b.timestamp - a.timestamp);
      
      if (rollbackPoints.length > keepCount) {
        const toDelete = rollbackPoints.slice(keepCount);
        toDelete.forEach(item => {
          const rollbackPath = path.join(this.config.rollbackDir, item.file);
          try {
            fs.unlinkSync(rollbackPath);
            this.log(`Deleted old rollback point: ${item.file}`);
          } catch (error) {
            this.log(`Error deleting rollback point ${item.file}: ${error.message}`);
          }
        });
      }
    } catch (error) {
      this.log(`Error cleaning up rollback points: ${error.message}`);
    }
  }
  
  // 回滚到指定点
  rollbackToPoint(rollbackId, reasons = []) {
    this.log(`Rolling back to point: ${rollbackId}`);
    
    const rollbackPath = path.join(this.config.rollbackDir, `${rollbackId}.json`);
    
    if (!fs.existsSync(rollbackPath)) {
      this.log(`Rollback point not found: ${rollbackId}`);
      return {
        success: false,
        error: 'Rollback point not found'
      };
    }
    
    try {
      const rollbackData = JSON.parse(fs.readFileSync(rollbackPath, 'utf8'));
      
      // 执行状态恢复
      this.restoreState(rollbackData);
      
      // 更新回滚点状态
      rollbackData.status = 'used';
      rollbackData.usedAt = Date.now();
      rollbackData.reasons = reasons;
      fs.writeFileSync(rollbackPath, JSON.stringify(rollbackData, null, 2));
      
      this.log(`Successfully rolled back to point: ${rollbackId}`);
      return {
        success: true,
        rollbackId,
        timestamp: rollbackData.timestamp,
        reasons: reasons
      };
    } catch (error) {
      this.log(`Error during rollback: ${error.message}`);
      return {
        success: false,
        error: error.message
      };
    }
  }
  
  // 恢复系统状态
  restoreState(rollbackData) {
    this.log('Restoring system state...');
    
    try {
      // 恢复能力状态
      if (rollbackData.capabilityState) {
        const capabilitiesPath = path.join(__dirname, '..', 'data', 'capabilities.json');
        fs.writeFileSync(capabilitiesPath, JSON.stringify(rollbackData.capabilityState.capabilities, null, 2));
        this.log('Restored capability state');
      }
      
      // 恢复配置状态
      if (rollbackData.configState) {
        this.config = { ...this.config, ...rollbackData.configState.config };
        this.constraints = { ...this.constraints, ...rollbackData.configState.activeConstraints };
        this.log('Restored configuration state');
      }
      
      // 执行后恢复验证
      this.validateRestoration();
      
      this.log('State restoration completed successfully');
    } catch (error) {
      this.log(`Error during state restoration: ${error.message}`);
      throw error;
    }
  }
  
  // 验证恢复结果
  validateRestoration() {
    this.log('Validating restoration...');
    
    // 验证能力状态
    const capabilitiesPath = path.join(__dirname, '..', 'data', 'capabilities.json');
    if (fs.existsSync(capabilitiesPath)) {
      try {
        const capabilities = JSON.parse(fs.readFileSync(capabilitiesPath, 'utf8'));
        this.log('Capability state validation passed');
      } catch (error) {
        this.log('Capability state validation failed');
        throw error;
      }
    }
    
    // 验证配置状态
    try {
      const configPath = this.config.configPath;
      if (fs.existsSync(configPath)) {
        const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        this.log('Configuration state validation passed');
      }
    } catch (error) {
      this.log('Configuration state validation failed');
      throw error;
    }
    
    this.log('Restoration validation completed successfully');
  }
  
  // 自动触发回滚
  autoRollback(currentState, previousState) {
    this.log('Checking for automatic rollback...');
    
    const rollbackConditions = this.detectRollbackConditions(currentState, previousState);
    
    if (rollbackConditions.shouldRollback) {
      this.log('Automatic rollback triggered');
      
      // 获取最近的回滚点
      const rollbackPoints = this.getRollbackPoints(5);
      if (rollbackPoints.length > 0) {
        const latestRollbackPoint = rollbackPoints[0];
        this.log(`Rolling back to latest point: ${latestRollbackPoint.id}`);
        
        const rollbackResult = this.rollbackToPoint(latestRollbackPoint.id, rollbackConditions.reasons);
        
        if (rollbackResult.success) {
          this.log('Automatic rollback completed successfully');
        } else {
          this.log('Automatic rollback failed');
        }
        
        return rollbackResult;
      } else {
        this.log('No rollback points available');
        return {
          success: false,
          error: 'No rollback points available'
        };
      }
    } else {
      this.log('No rollback needed');
      return {
        success: false,
        error: 'No rollback conditions met'
      };
    }
  }
  
  // 强制突破约束
  enforceBreakthrough() {
    this.log('Enforcing breakthrough constraints...');
    
    // 识别需要突破的约束
    const breakthroughAreas = [
      '复杂度优化',
      '可解释性提升',
      '执行效率改进',
      '稳定性增强'
    ];
    
    // 随机选择一个突破领域
    const randomIndex = Math.floor(Math.random() * breakthroughAreas.length);
    const breakthroughArea = breakthroughAreas[randomIndex];
    
    this.log(`Selected breakthrough area: ${breakthroughArea}`);
    
    // 生成突破策略
    const strategy = this.generateBreakthroughStrategy(breakthroughArea);
    
    this.log(`Generated breakthrough strategy: ${strategy.description}`);
    
    return {
      area: breakthroughArea,
      strategy: strategy,
      timestamp: Date.now()
    };
  }
  
  // 生成突破策略
  generateBreakthroughStrategy(area) {
    switch (area) {
      case '复杂度优化':
        return {
          description: '简化系统架构，移除冗余组件',
          actions: [
            '识别并移除未使用的代码',
            '简化配置选项',
            '优化数据结构'
          ],
          expectedOutcome: '系统响应速度提升，资源使用减少'
        };
      case '可解释性提升':
        return {
          description: '增强系统行为的可解释性',
          actions: [
            '添加详细的日志记录',
            '实现决策过程可视化',
            '创建系统行为文档'
          ],
          expectedOutcome: '系统行为更容易理解和预测'
        };
      case '执行效率改进':
        return {
          description: '优化系统执行效率',
          actions: [
            '实现并行处理',
            '优化缓存策略',
            '减少网络请求'
          ],
          expectedOutcome: '任务执行时间缩短，系统吞吐量增加'
        };
      case '稳定性增强':
        return {
          description: '提高系统稳定性',
          actions: [
            '增强错误处理',
            '添加系统监控',
            '实现自动恢复机制'
          ],
          expectedOutcome: '系统故障减少，可靠性提高'
        };
      default:
        return {
          description: '通用系统优化',
          actions: [
            '识别系统瓶颈',
            '优化关键路径',
            '测试系统极限'
          ],
          expectedOutcome: '系统整体性能提升'
        };
    }
  }
  
  // 验证进化结果是否违反反退化锁定
  validateEvolution(evolutionResult) {
    this.log('Validating evolution against anti-degeneration lock...');
    
    const degenerationResult = this.detectDegeneration(evolutionResult);
    const stabilityPriorityResult = this.stabilityPriorityEnforcer(evolutionResult);
    
    const allIssues = [...degenerationResult.issues, ...stabilityPriorityResult.issues];
    
    if (degenerationResult.degenerated || !stabilityPriorityResult.compliance) {
      this.log(`Evolution validation failed: ${allIssues.join(', ')}`);
      return {
        valid: false,
        reason: allIssues.join('; '),
        severity: allIssues.length > 2 ? 'high' : 'medium'
      };
    }
    
    this.log('Evolution validation passed');
    return {
      valid: true,
      reason: 'No anti-degeneration lock violations detected',
      severity: 'low'
    };
  }
  
  // 获取锁定状态
  getStatus() {
    try {
      const config = JSON.parse(fs.readFileSync(this.config.configPath, 'utf8'));
      return {
        status: config.status,
        priority: config.priority,
        constraints: config.constraints,
        rollbackMechanism: config.rollbackMechanism,
        updated: config.updated
      };
    } catch (error) {
      this.log(`Error getting status: ${error.message}`);
      return {
        status: 'ERROR',
        error: error.message
      };
    }
  }
  
  // 更新锁定状态
  updateStatus(status) {
    try {
      const config = JSON.parse(fs.readFileSync(this.config.configPath, 'utf8'));
      config.status = status;
      config.updated = Date.now();
      
      fs.writeFileSync(this.config.configPath, JSON.stringify(config, null, 2));
      this.log(`Updated anti-degeneration lock status to: ${status}`);
      return true;
    } catch (error) {
      this.log(`Error updating status: ${error.message}`);
      return false;
    }
  }
  
  // 激活锁定
  activate() {
    return this.updateStatus('ACTIVE');
  }
  
  // 停用锁定
  deactivate() {
    return this.updateStatus('INACTIVE');
  }
  
  // 获取回滚点列表
  getRollbackPoints(limit = 10) {
    try {
      const files = fs.readdirSync(this.config.rollbackDir);
      const rollbackPoints = [];
      
      files.forEach(file => {
        if (file.endsWith('.json')) {
          const rollbackPath = path.join(this.config.rollbackDir, file);
          try {
            const rollbackData = JSON.parse(fs.readFileSync(rollbackPath, 'utf8'));
            rollbackPoints.push(rollbackData);
          } catch (error) {
            this.log(`Error reading rollback point ${file}: ${error.message}`);
          }
        }
      });
      
      // 按时间排序，返回最新的回滚点
      rollbackPoints.sort((a, b) => b.timestamp - a.timestamp);
      
      return limit > 0 ? rollbackPoints.slice(0, limit) : rollbackPoints;
    } catch (error) {
      this.log(`Error getting rollback points: ${error.message}`);
      return [];
    }
  }
  
  // 分析锁定历史
  analyzeHistory() {
    try {
      const rollbackPoints = this.getRollbackPoints();
      const totalRollbackPoints = rollbackPoints.length;
      const usedRollbackPoints = rollbackPoints.filter(point => point.status === 'used').length;
      const rollbackRate = totalRollbackPoints > 0 ? (usedRollbackPoints / totalRollbackPoints * 100).toFixed(2) : 0;
      
      this.log(`Lock history analysis: ${totalRollbackPoints} total rollback points, ${usedRollbackPoints} used (${rollbackRate}%)`);
      
      return {
        totalRollbackPoints,
        usedRollbackPoints,
        rollbackRate,
        oldestRollbackPoint: rollbackPoints.length > 0 ? rollbackPoints[rollbackPoints.length - 1].timestamp : null,
        newestRollbackPoint: rollbackPoints.length > 0 ? rollbackPoints[0].timestamp : null
      };
    } catch (error) {
      this.log(`Error analyzing history: ${error.message}`);
      return {
        error: error.message
      };
    }
  }
  
  // 获取能力状态快照
  getCapabilitySnapshot() {
    try {
      // 尝试读取能力状态文件
      const capabilitiesPath = path.join(__dirname, '..', 'data', 'capabilities.json');
      if (fs.existsSync(capabilitiesPath)) {
        return JSON.parse(fs.readFileSync(capabilitiesPath, 'utf8'));
      }
      return { snapshot: 'No capabilities file found', timestamp: Date.now() };
    } catch (error) {
      this.log(`Error getting capability snapshot: ${error.message}`);
      return { snapshot: 'Error getting capabilities', timestamp: Date.now() };
    }
  }
  
  // 获取最近进化历史
  getRecentEvolutionHistory() {
    try {
      // 尝试读取进化历史文件
      const historyPath = path.join(__dirname, '..', 'data', 'evolution-history.json');
      if (fs.existsSync(historyPath)) {
        const history = JSON.parse(fs.readFileSync(historyPath, 'utf8'));
        // 只返回最近10条记录
        return Array.isArray(history) ? history.slice(-10) : [];
      }
      return { history: 'No evolution history file found', timestamp: Date.now() };
    } catch (error) {
      this.log(`Error getting evolution history: ${error.message}`);
      return { history: 'Error getting evolution history', timestamp: Date.now() };
    }
  }
  
  // 检测回滚条件
  detectRollbackConditions(currentState, previousState) {
    this.log('Detecting rollback conditions...');
    
    const rollbackReasons = [];
    
    // 检查成功率降低
    if (currentState.successRate !== undefined && previousState.successRate !== undefined) {
      const successRateDrop = previousState.successRate - currentState.successRate;
      if (successRateDrop > 0.1) { // 超过10%的成功率下降
        rollbackReasons.push(`Success rate dropped significantly: ${currentState.successRate} from ${previousState.successRate}`);
      }
    }
    
    // 检查确定性降低
    if (currentState.certainty !== undefined && previousState.certainty !== undefined) {
      const certaintyDrop = previousState.certainty - currentState.certainty;
      if (certaintyDrop > 0.1) { // 超过10%的确定性下降
        rollbackReasons.push(`Certainty dropped significantly: ${currentState.certainty} from ${previousState.certainty}`);
      }
    }
    
    // 检查退化行为
    if (currentState.degenerationIssues !== undefined) {
      if (currentState.degenerationIssues.length > 0) {
        rollbackReasons.push(`Degenerate behavior detected: ${currentState.degenerationIssues.join(', ')}`);
      }
    }
    
    // 检查系统稳定性指标
    if (currentState.stabilityMetrics !== undefined && previousState.stabilityMetrics !== undefined) {
      const currentStability = currentState.stabilityMetrics;
      const previousStability = previousState.stabilityMetrics;
      
      // 检查错误率增加
      if (currentStability.errorRate !== undefined && previousStability.errorRate !== undefined) {
        if (currentStability.errorRate > previousStability.errorRate * 1.5) { // 错误率增加50%以上
          rollbackReasons.push(`Error rate increased significantly: ${currentStability.errorRate} from ${previousStability.errorRate}`);
        }
      }
      
      // 检查响应时间增加
      if (currentStability.responseTime !== undefined && previousStability.responseTime !== undefined) {
        if (currentStability.responseTime > previousStability.responseTime * 1.5) { // 响应时间增加50%以上
          rollbackReasons.push(`Response time increased significantly: ${currentStability.responseTime}ms from ${previousStability.responseTime}ms`);
        }
      }
    }
    
    return {
      shouldRollback: rollbackReasons.length > 0,
      reasons: rollbackReasons
    };
  }
  
  // 清理过期数据
  cleanupExpiredData(daysToKeep = 7) {
    this.log(`Cleaning up expired data (keeping last ${daysToKeep} days)...`);
    
    const cutoffTime = Date.now() - (daysToKeep * 24 * 60 * 60 * 1000);
    
    // 清理过期回滚点
    const rollbackPoints = this.getRollbackPoints();
    let deletedRollbackPoints = 0;
    
    rollbackPoints.forEach(point => {
      if (point.timestamp < cutoffTime) {
        const rollbackPath = path.join(this.config.rollbackDir, `${point.id}.json`);
        try {
          fs.unlinkSync(rollbackPath);
          deletedRollbackPoints++;
        } catch (error) {
          this.log(`Error deleting rollback point ${point.id}: ${error.message}`);
        }
      }
    });
    
    this.log(`Cleaned up ${deletedRollbackPoints} expired rollback points`);
    
    return {
      deletedRollbackPoints
    };
  }
  
  // 强制推翻核心行为模式
  overrideCoreBehaviorPattern() {
    this.log('Forcing core behavior pattern override...');
    
    const corePatterns = [
      {
        id: 'strict-validation',
        name: 'Strict validation for all inputs',
        description: 'Comprehensive validation of all input data'
      },
      {
        id: 'sequential-execution',
        name: 'Sequential execution of tasks',
        description: 'Executing tasks in strict sequence'
      },
      {
        id: 'comprehensive-error-handling',
        name: 'Comprehensive error handling',
        description: 'Detailed error handling for all operations'
      },
      {
        id: 'detailed-logging',
        name: 'Detailed logging for all operations',
        description: 'Extensive logging of all system operations'
      }
    ];
    
    // 随机选择一个模式推翻
    const randomIndex = Math.floor(Math.random() * corePatterns.length);
    const patternToOverride = corePatterns[randomIndex];
    
    this.log(`Overriding core behavior pattern: ${patternToOverride.name}`);
    
    // 生成新的行为模式
    const newPattern = this.generateNewBehaviorPattern(patternToOverride);
    
    this.log(`New behavior pattern: ${newPattern.name} - ${newPattern.description}`);
    
    return {
      overriddenPattern: patternToOverride,
      newPattern: newPattern,
      timestamp: Date.now()
    };
  }
  
  // 生成新的行为模式
  generateNewBehaviorPattern(oldPattern) {
    switch (oldPattern.id) {
      case 'strict-validation':
        return {
          id: 'adaptive-validation',
          name: 'Adaptive validation',
          description: 'Context-aware validation based on input source and sensitivity'
        };
      case 'sequential-execution':
        return {
          id: 'parallel-execution',
          name: 'Parallel execution',
          description: 'Intelligent parallelization of independent tasks'
        };
      case 'comprehensive-error-handling':
        return {
          id: 'targeted-error-handling',
          name: 'Targeted error handling',
          description: 'Focused error handling on critical paths'
        };
      case 'detailed-logging':
        return {
          id: 'adaptive-logging',
          name: 'Adaptive logging',
          description: 'Dynamic logging level based on operation criticality'
        };
      default:
        return {
          id: 'adaptive-behavior',
          name: 'Adaptive behavior',
          description: 'Context-aware system behavior based on current conditions'
        };
    }
  }
}

// 导出模块
module.exports = AntiDegenerationLock;

// 导出默认实例
module.exports.default = new AntiDegenerationLock();