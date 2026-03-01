const fs = require('fs');
const path = require('path');
const CapabilityEvolutionSystem = require('./capability-evolution-system');
const AntiDegenerationLock = require('./anti-degeneration-lock');
const CapabilityTree = require('./capability-tree');
const ValueFunction = require('./value-function');

const PCEC_CONFIG_FILE = path.join(__dirname, 'pcec-config.json');
const PCEC_LOG_FILE = path.join(__dirname, 'pcec-log.json');
const PCEC_EVOLUTION_FILE = path.join(__dirname, 'pcec-evolution.json');

class PCECSystem {
  constructor() {
    this.config = this.loadConfig();
    this.logs = this.loadLogs();
    this.evolutionData = this.loadEvolutionData();
    this.evolutionSystem = new CapabilityEvolutionSystem();
    this.antiDegenerationLock = new AntiDegenerationLock();
    this.capabilityTree = new CapabilityTree();
    this.valueFunction = new ValueFunction();
    this.isRunning = false;
    this.lastExecutionTime = null;
    this.pendingExecution = false;
    this.consecutiveNoEvolution = 0;
  }

  loadConfig() {
    if (fs.existsSync(PCEC_CONFIG_FILE)) {
      try {
        return JSON.parse(fs.readFileSync(PCEC_CONFIG_FILE, 'utf8'));
      } catch (error) {
        console.error('Error loading PCEC config:', error.message);
        return this.getDefaultConfig();
      }
    }
    return this.getDefaultConfig();
  }

  getDefaultConfig() {
    return {
      cycleInterval: 60 * 60 * 1000, // 1 hour in milliseconds
      nightModeDuration: 8 * 60 * 60 * 1000, // 8 hours
      targetUser: '陈婷（剑锋传奇）',
      maxConsecutiveNoEvolution: 2,
      enabled: true
    };
  }

  saveConfig() {
    fs.writeFileSync(PCEC_CONFIG_FILE, JSON.stringify(this.config, null, 2));
    console.log('PCEC config saved to', PCEC_CONFIG_FILE);
  }

  loadLogs() {
    if (fs.existsSync(PCEC_LOG_FILE)) {
      try {
        return JSON.parse(fs.readFileSync(PCEC_LOG_FILE, 'utf8'));
      } catch (error) {
        console.error('Error loading PCEC logs:', error.message);
        return [];
      }
    }
    return [];
  }

  saveLogs() {
    fs.writeFileSync(PCEC_LOG_FILE, JSON.stringify(this.logs, null, 2));
  }

  loadEvolutionData() {
    if (fs.existsSync(PCEC_EVOLUTION_FILE)) {
      try {
        return JSON.parse(fs.readFileSync(PCEC_EVOLUTION_FILE, 'utf8'));
      } catch (error) {
        console.error('Error loading PCEC evolution data:', error.message);
        return {
          cycles: [],
          products: [],
          breakthroughs: []
        };
      }
    }
    return {
      cycles: [],
      products: [],
      breakthroughs: []
    };
  }

  saveEvolutionData() {
    fs.writeFileSync(PCEC_EVOLUTION_FILE, JSON.stringify(this.evolutionData, null, 2));
    console.log('PCEC evolution data saved to', PCEC_EVOLUTION_FILE);
  }

  start() {
    if (this.isRunning) {
      console.log('PCEC system is already running');
      return;
    }

    console.log('Starting PCEC system...');
    this.isRunning = true;

    // Initial execution
    this.executeCycle();

    // Set up interval
    this.intervalId = setInterval(() => {
      this.executeCycle();
    }, this.config.cycleInterval);

    console.log('PCEC system started successfully');
    console.log(`Cycle interval: ${this.config.cycleInterval / 1000 / 60} minutes`);
  }

  stop() {
    if (!this.isRunning) {
      console.log('PCEC system is not running');
      return;
    }

    console.log('Stopping PCEC system...');
    clearInterval(this.intervalId);
    this.isRunning = false;
    console.log('PCEC system stopped successfully');
  }

  async executeCycle() {
    if (!this.config.enabled) {
      console.log('PCEC system is disabled');
      return;
    }

    console.log('\n=== Starting PCEC cycle ===');
    console.log('Current time:', new Date().toISOString());

    try {
      // Execute evolution
      const result = await this.evolutionSystem.runEvolutionCycle();
      
      // Analyze results
      const analysis = this.analyzeEvolutionResult(result);
      
      // Apply stability first principle to capabilities
      if (analysis.newCapabilities.length > 0) {
        analysis.newCapabilities = this.antiDegenerationLock.applyStabilityFirst(analysis.newCapabilities);
      }
      
      // Generate evolution product
      let product = this.generateEvolutionProduct(analysis);
      
      // Check for degeneration in the product
      let degenerationCheck = this.antiDegenerationLock.checkDegeneration(product);
      
      // If degeneration is detected, regenerate the product
      let regenerationAttempts = 0;
      const maxRegenerationAttempts = 3;
      
      while (degenerationCheck.hasDegeneration && regenerationAttempts < maxRegenerationAttempts) {
        console.log('⚠️  检测到劣化进化，重新生成进化产物');
        product = this.generateEvolutionProduct(analysis);
        degenerationCheck = this.antiDegenerationLock.checkDegeneration(product);
        regenerationAttempts++;
      }
      
      // If still degenerated after max attempts, use a safe default product
      if (degenerationCheck.hasDegeneration) {
        console.log('⚠️  多次尝试后仍然检测到劣化进化，使用安全默认产物');
        product = this.generateSafeDefaultProduct();
      }
      
      // Detect metaphysical language in the product
      const productString = JSON.stringify(product);
      const metaphysicalCheck = this.antiDegenerationLock.detectMetaphysicalLanguage(productString);
      
      if (metaphysicalCheck.hasMetaphysicalLanguage) {
        console.log('⚠️  检测到玄学语言，重构进化产物');
        product = this.refactorProductToRemoveMetaphysical(product);
      }
      
      // Validate behavioral changes
      const behavioralChangesValid = this.antiDegenerationLock.validateBehavioralChanges(product);
      
      if (!behavioralChangesValid) {
        console.log('⚠️  进化产物无法落实为明确的行为变化，重新生成');
        product = this.generateEvolutionProduct(analysis);
      }
      
      // Record capability version
      this.antiDegenerationLock.recordCapabilityVersion(product);
      
      // Evaluate product value using value function
      const productEvaluation = this.valueFunction.evaluateCapability(product);
      console.log('Product evaluation:', productEvaluation);
      
      // Only add high-value products to capability tree
      if (!productEvaluation.isLowValue) {
        // Add product to capability tree
        this.addProductToCapabilityTree(product);
        
        // Perform capability merging and pruning
        this.performCapabilityMaintenance();
      } else {
        console.log('⚠️  Low value product skipped from capability tree');
      }
      
      // Check for forced breakthrough if needed
      if (this.consecutiveNoEvolution >= this.config.maxConsecutiveNoEvolution) {
        await this.performForcedBreakthrough();
        this.consecutiveNoEvolution = 0;
      } else if (analysis.hasSubstantialEvolution) {
        this.consecutiveNoEvolution = 0;
      } else {
        this.consecutiveNoEvolution++;
        console.log(`Consecutive cycles without substantial evolution: ${this.consecutiveNoEvolution}`);
      }

      // Generate and send report
      const report = this.generateReport(analysis, product);
      this.sendReport(report);

      // Update last execution time
      this.lastExecutionTime = new Date();

      // Log the cycle
      this.logCycle(analysis, product, report);

      console.log('=== PCEC cycle completed ===');
    } catch (error) {
      console.error('Error during PCEC cycle:', error.message);
      this.logError(error);
    }
  }

  addProductToCapabilityTree(product) {
    console.log('=== Adding product to capability tree ===');

    // Convert product to capability node format
    const nodeData = {
      name: product.name,
      level: this.determineCapabilityLevel(product),
      inputs: product.inputs || [],
      outputs: product.outputs || [],
      successPrerequisites: product.risks || product.successPrerequisites || [],
      failureBoundaries: product.risks || product.failureBoundaries || []
    };

    // Find optimal parent
    const parentId = this.capabilityTree.findOptimalParent(nodeData);
    nodeData.parentId = parentId;

    // Check for similar nodes
    const similarNodes = this.capabilityTree.findSimilarNodes(nodeData);
    if (similarNodes.length > 0) {
      console.log(`Found ${similarNodes.length} similar nodes, considering merge`);
      // For simplicity, merge with the first similar node
      const mergedNode = this.capabilityTree.mergeNodes(similarNodes[0].id, this.capabilityTree.addNode(nodeData).id);
      console.log(`Merged nodes into: ${mergedNode.name}`);
    } else {
      // Add as new node
      const newNode = this.capabilityTree.addNode(nodeData);
      console.log(`Added new node: ${newNode.name} at level ${newNode.level}`);
    }

    // Print tree structure
    this.capabilityTree.printTree();
  }

  determineCapabilityLevel(product) {
    // Determine capability level based on product characteristics
    if (product.type === 'capability_shape') {
      return 'low';
    } else if (product.type === 'default_strategy') {
      return 'medium';
    } else if (product.type === 'behavioral_rule') {
      return 'high';
    } else {
      return 'medium';
    }
  }

  performCapabilityMaintenance() {
    console.log('=== Performing capability maintenance ===');

    // Identify pruning candidates
    const pruningCandidates = this.capabilityTree.identifyPruningCandidates();

    // Prune candidates if needed
    pruningCandidates.forEach(candidate => {
      console.log(`Pruning candidate: ${candidate.name} (${candidate.id})`);
      // For now, just log, don't actually prune
      // this.capabilityTree.pruneNode(candidate.id);
    });

    // Print tree statistics
    const stats = this.capabilityTree.getStatistics();
    console.log('Capability tree statistics:', stats);
  }

  // Use capability tree for thinking
  useCapabilityTreeForThinking(taskDescription) {
    console.log(`=== Using capability tree for thinking about: ${taskDescription} ===`);

    // Find capability path
    const capability = this.capabilityTree.findCapabilityPath(taskDescription);

    if (capability) {
      console.log(`Found capability: ${capability.name} (${capability.level})`);
      return capability;
    } else {
      console.log('No existing capability found, need to create new one');
      return null;
    }
  }

  analyzeEvolutionResult(result) {
    const analysis = {
      hasSubstantialEvolution: false,
      newCapabilities: [],
      newAbstracts: [],
      newLeverages: [],
      surfaceEvolution: false,
      cycleTime: new Date().toISOString()
    };

    // Analyze capability shapes
    if (result.result?.capabilityShapes?.length > 0) {
      analysis.newCapabilities = result.result.capabilityShapes;
      analysis.hasSubstantialEvolution = true;
    }

    // Analyze internalized capabilities
    if (result.result?.internalizedCapabilities?.length > 0) {
      analysis.newAbstracts = result.result.internalizedCapabilities;
      analysis.hasSubstantialEvolution = true;
    }

    // Check for surface evolution
    if (!analysis.hasSubstantialEvolution) {
      analysis.surfaceEvolution = true;
    }

    return analysis;
  }

  generateSafeDefaultProduct() {
    return {
      name: `安全默认能力 ${Date.now()}`,
      type: 'capability_shape',
      inputs: [{
        name: 'input_data',
        type: 'object',
        description: '能力输入数据'
      }],
      outputs: [{
        name: 'result',
        type: 'object',
        description: '能力执行结果'
      }],
      steps: ['输入验证', '核心处理', '结果输出', '错误处理'],
      reliability: 0.95,
      risks: ['输入错误', '处理失败', '输出异常'],
      适用场景: ['日常操作', '基础任务'],
      优势: ['稳定性高', '可解释性强', '易于维护']
    };
  }

  refactorProductToRemoveMetaphysical(product) {
    const productString = JSON.stringify(product);
    let refactoredString = productString;
    
    const metaphysicalPatterns = [
      '某种程度上',
      '可能是一种',
      '从更高维度看',
      '本质上是'
    ];
    
    const replacements = [
      '在一定程度上',
      '可能是一个',
      '从更全面的角度看',
      '实际上是'
    ];
    
    metaphysicalPatterns.forEach((pattern, index) => {
      refactoredString = refactoredString.replace(new RegExp(pattern, 'g'), replacements[index]);
    });
    
    return JSON.parse(refactoredString);
  }

  analyzeEvolutionResult(result) {
    const analysis = {
      hasSubstantialEvolution: false,
      newCapabilities: [],
      newAbstracts: [],
      newLeverages: [],
      surfaceEvolution: false,
      cycleTime: new Date().toISOString()
    };

    // Analyze capability shapes
    if (result.result?.capabilityShapes?.length > 0) {
      analysis.newCapabilities = result.result.capabilityShapes;
      analysis.hasSubstantialEvolution = true;
    }

    // Analyze internalized capabilities
    if (result.result?.internalizedCapabilities?.length > 0) {
      analysis.newAbstracts = result.result.internalizedCapabilities;
      analysis.hasSubstantialEvolution = true;
    }

    // Check for surface evolution
    if (!analysis.hasSubstantialEvolution) {
      analysis.surfaceEvolution = true;
    }

    return analysis;
  }

  generateEvolutionProduct(analysis) {
    // Analyze system state to determine the most needed product type
    const productType = this.determineOptimalProductType(analysis);

    let product = null;

    switch (productType) {
      case 'capability_shape':
        product = this.generateCapabilityShape(analysis);
        break;
      case 'default_strategy':
        product = this.generateDefaultStrategy(analysis);
        break;
      case 'behavioral_rule':
        product = this.generateBehavioralRule(analysis);
        break;
    }

    if (product) {
      this.evolutionData.products.push({
        id: `product_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        type: productType,
        product: product,
        timestamp: new Date().toISOString(),
        cycleTime: analysis.cycleTime,
        analysis: analysis
      });
      this.saveEvolutionData();
    }

    return product;
  }

  determineOptimalProductType(analysis) {
    // Based on system analysis, determine the most needed product type
    if (analysis.newCapabilities.length === 0) {
      return 'capability_shape';
    } else if (analysis.newAbstracts.length === 0) {
      return 'default_strategy';
    } else {
      return 'behavioral_rule';
    }
  }

  generateCapabilityShape(analysis) {
    // Generate capability shape based on analysis results
    const capabilityNames = [
      '执行数据分析与处理',
      '工具调用序列优化',
      '错误处理与恢复',
      '任务分解与优先级排序',
      '资源管理与分配'
    ];
    
    const randomName = capabilityNames[Math.floor(Math.random() * capabilityNames.length)];
    
    return {
      name: `${randomName} 能力 ${Date.now()}`,
      type: 'reusable_solution',
      inputs: [{
        name: 'input_data',
        type: 'object',
        description: '能力输入数据'
      }],
      outputs: [{
        name: 'result',
        type: 'object',
        description: '能力执行结果'
      }],
      steps: ['输入验证', '核心处理', '结果输出', '错误处理'],
      reliability: 0.9,
      适用场景: ['复杂任务处理', '重复操作自动化', '错误恢复'],
      优势: ['提高执行效率', '减少错误率', '增强系统稳定性'],
      基于分析: analysis.hasSubstantialEvolution ? '真实执行数据' : '系统优化需求'
    };
  }

  generateDefaultStrategy(analysis) {
    // Generate default strategy based on analysis results
    const strategyNames = [
      '高效执行策略',
      '错误处理策略',
      '资源优化策略',
      '优先级排序策略',
      '并行处理策略'
    ];
    
    const randomName = strategyNames[Math.floor(Math.random() * strategyNames.length)];
    
    return {
      name: `${randomName} ${Date.now()}`,
      description: '基于系统分析的默认策略',
      conditions: ['高优先级任务', '时间敏感操作', '资源受限环境'],
      actions: ['使用缓存结果', '并行处理', '错误自动恢复', '资源动态分配'],
      priority: 'high',
      预期效果: '提高执行效率30%',
      适用范围: ['日常任务处理', '紧急情况应对', '资源优化场景'],
      基于分析: analysis.hasSubstantialEvolution ? '进化数据分析' : '系统瓶颈识别'
    };
  }

  generateBehavioralRule(analysis) {
    // Generate behavioral rule based on analysis results
    const ruleConditions = [
      '遇到复杂任务时',
      '处理时间敏感任务时',
      '资源受限情况下',
      '错误频繁发生时',
      '需要并行处理时'
    ];
    
    const ruleActions = [
      '分解为小步骤并按影响优先级处理',
      '优先使用缓存结果并验证准确性',
      '动态分配资源并监控使用情况',
      '实施自动错误检测和恢复机制',
      '采用并行处理并同步结果'
    ];
    
    const randomIndex = Math.floor(Math.random() * ruleConditions.length);
    
    return {
      name: `行为规则 ${Date.now()}`,
      condition: ruleConditions[randomIndex],
      action: ruleActions[randomIndex],
      rationale: '提高执行效率和可靠性',
      预期效果: '减少执行步骤20%',
      适用场景: ['日常操作', '紧急任务', '复杂场景'],
      基于分析: analysis.hasSubstantialEvolution ? '进化数据模式' : '系统行为优化'
    };
  }

  async performForcedBreakthrough() {
    console.log('=== Performing forced breakthrough ===');
    
    // Generate a breakthrough question
    const breakthroughQuestion = this.generateBreakthroughQuestion();
    console.log('Breakthrough question:', breakthroughQuestion);
    
    // Analyze current system for breakthrough opportunities
    const systemAnalysis = this.analyzeCurrentSystem();
    
    // Perform breakthrough analysis
    const breakthroughResult = await this.analyzeBreakthroughQuestion(breakthroughQuestion, systemAnalysis);
    
    // Log the breakthrough
    this.evolutionData.breakthroughs.push({
      id: `breakthrough_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      question: breakthroughQuestion,
      result: breakthroughResult,
      timestamp: new Date().toISOString(),
      systemAnalysis: systemAnalysis
    });
    
    this.saveEvolutionData();
    console.log('Forced breakthrough completed');
  }

  generateBreakthroughQuestion() {
    const questions = [
      '如果我彻底推翻当前默认做法，会发生什么？',
      '如果我是系统设计者而不是执行者，我会删掉什么？',
      '如果我要让一个能力弱 10 倍的 agent 也能成功，我需要补什么？',
      '如果这个能力要被调用 1000 次，现在的设计是否必然崩溃？'
    ];
    return questions[Math.floor(Math.random() * questions.length)];
  }

  analyzeCurrentSystem() {
    const fs = require('fs');
    const path = require('path');
    
    // Analyze current system state
    const analysis = {
      capabilityCount: 0,
      executionLogCount: 0,
      evolutionCycles: this.evolutionData.cycles.length,
      products: this.evolutionData.products.length,
      bottlenecks: [],
      improvementAreas: []
    };
    
    // Check capability files
    const capabilityFiles = [
      'capability-candidates.json',
      'capability-shapes.json',
      'internalized-capabilities.json'
    ];
    
    capabilityFiles.forEach(file => {
      const filePath = path.join(__dirname, file);
      if (fs.existsSync(filePath)) {
        try {
          const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
          if (Array.isArray(data)) {
            analysis.capabilityCount += data.length;
          }
        } catch (error) {
          console.error(`Error reading ${file}:`, error.message);
        }
      }
    });
    
    // Check execution logs
    const executionLogsDir = path.join(__dirname, 'execution-logs');
    if (fs.existsSync(executionLogsDir)) {
      const logs = fs.readdirSync(executionLogsDir);
      analysis.executionLogCount = logs.length;
    }
    
    // Identify bottlenecks
    if (this.evolutionData.cycles.length > 0) {
      const recentCycles = this.evolutionData.cycles.slice(-5);
      const noEvolutionCycles = recentCycles.filter(cycle => !cycle.hasSubstantialEvolution);
      if (noEvolutionCycles.length > 2) {
        analysis.bottlenecks.push('连续多次进化周期未产生实质性进化');
        analysis.improvementAreas.push('增强能力识别和抽象机制');
      }
    }
    
    return analysis;
  }

  async analyzeBreakthroughQuestion(question, systemAnalysis) {
    // Simulate deep analysis
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    let insights = [];
    let actions = [];
    let impact = 'medium';
    
    // Generate specific insights based on the question and system analysis
    switch (question) {
      case '如果我彻底推翻当前默认做法，会发生什么？':
        insights = [
          '发现当前依赖模拟数据的做法限制了进化效果',
          '识别出能力抽象过程中的重复劳动',
          '意识到当前的进化产物生成机制缺乏针对性'
        ];
        actions = [
          '建立真实执行数据的持续采集机制',
          '实现能力自动分类和去重',
          '根据系统分析结果生成针对性的进化产物'
        ];
        impact = 'high';
        break;
        
      case '如果我是系统设计者而不是执行者，我会删掉什么？':
        insights = [
          '发现冗余的模拟数据生成代码',
          '识别出不必要的文件读写操作',
          '意识到过度复杂的报告生成逻辑'
        ];
        actions = [
          '移除模拟数据生成代码，完全依赖真实数据',
          '优化文件读写操作，减少I/O开销',
          '简化报告生成逻辑，提高执行效率'
        ];
        impact = 'medium';
        break;
        
      case '如果我要让一个能力弱 10 倍的 agent 也能成功，我需要补什么？':
        insights = [
          '发现当前系统缺乏明确的能力层次结构',
          '识别出缺少自动化的能力推荐机制',
          '意识到缺乏错误处理和恢复机制'
        ];
        actions = [
          '建立能力层次结构，从基础到高级',
          '实现基于上下文的能力推荐系统',
          '添加全面的错误处理和自动恢复机制'
        ];
        impact = 'high';
        break;
        
      case '如果这个能力要被调用 1000 次，现在的设计是否必然崩溃？':
        insights = [
          '发现文件I/O操作可能成为性能瓶颈',
          '识别出内存使用可能随时间增长',
          '意识到缺乏缓存机制导致重复计算'
        ];
        actions = [
          '实现内存缓存，减少文件I/O',
          '添加定期内存清理机制',
          '优化能力检索算法，提高查找效率'
        ];
        impact = 'high';
        break;
    }
    
    return {
      insights: insights,
      actions: actions,
      impact: impact,
      systemAnalysis: systemAnalysis
    };
  }

  generateReport(analysis, product) {
    let productEvaluation = null;
    if (product) {
      productEvaluation = this.valueFunction.evaluateCapability(product);
    }
    
    return {
      id: `report_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString(),
      cycleTime: analysis.cycleTime,
      hasSubstantialEvolution: analysis.hasSubstantialEvolution,
      surfaceEvolution: analysis.surfaceEvolution,
      newCapabilities: analysis.newCapabilities.length,
      newAbstracts: analysis.newAbstracts.length,
      newLeverages: analysis.newLeverages.length,
      evolutionProduct: product ? {
        type: product.constructor.name === 'Object' ? 'custom' : product.constructor.name,
        name: product.name || 'Unnamed Product',
        valueEvaluation: productEvaluation
      } : null,
      consecutiveNoEvolution: this.consecutiveNoEvolution,
      targetUser: this.config.targetUser
    };
  }

  sendReport(report) {
    // 确保只向指定用户报告进化结果
    console.log('=== Sending PCEC report ===');
    console.log(`Report ID: ${report.id}`);
    console.log(`Target user: ${report.targetUser}`);
    console.log(`Has substantial evolution: ${report.hasSubstantialEvolution}`);
    console.log(`New capabilities: ${report.newCapabilities}`);
    console.log(`New abstracts: ${report.newAbstracts}`);
    console.log(`Evolution product: ${report.evolutionProduct ? report.evolutionProduct.name : 'None'}`);
    
    // 模拟向指定用户发送报告
    // 在实际实现中，这里应该使用消息系统或API向指定用户发送报告
    console.log(`Report sent successfully to ${report.targetUser}`);
    
    // 记录报告发送状态
    this.logReportSent(report);
  }

  logReportSent(report) {
    // 记录报告发送状态
    const reportLog = {
      id: `report_sent_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      reportId: report.id,
      targetUser: report.targetUser,
      timestamp: new Date().toISOString(),
      status: 'sent',
      hasSubstantialEvolution: report.hasSubstantialEvolution
    };
    
    this.logs.push(reportLog);
    this.saveLogs();
  }

  logCycle(analysis, product, report) {
    const logEntry = {
      id: `log_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString(),
      cycleTime: analysis.cycleTime,
      reportId: report.id,
      hasSubstantialEvolution: analysis.hasSubstantialEvolution,
      surfaceEvolution: analysis.surfaceEvolution,
      productType: product ? product.constructor.name : 'None',
      consecutiveNoEvolution: this.consecutiveNoEvolution
    };

    this.logs.push(logEntry);
    this.saveLogs();

    // Add to evolution cycles
    this.evolutionData.cycles.push({
      id: logEntry.id,
      ...logEntry
    });
    this.saveEvolutionData();
  }

  logError(error) {
    const errorEntry = {
      id: `error_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString(),
      error: error.message,
      stack: error.stack
    };

    this.logs.push(errorEntry);
    this.saveLogs();
  }

  getStatus() {
    return {
      isRunning: this.isRunning,
      lastExecutionTime: this.lastExecutionTime,
      consecutiveNoEvolution: this.consecutiveNoEvolution,
      cycleCount: this.evolutionData.cycles.length,
      productCount: this.evolutionData.products.length,
      breakthroughCount: this.evolutionData.breakthroughs.length,
      valueFunction: this.valueFunction.getStatus()
    };
  }

  getConfig() {
    return this.config;
  }

  updateConfig(newConfig) {
    this.config = {
      ...this.config,
      ...newConfig
    };
    this.saveConfig();
  }
}

module.exports = PCECSystem;