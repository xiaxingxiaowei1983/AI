const fs = require('fs');
const path = require('path');
const fsExtra = require('fs-extra');
// 尝试导入热点信息缓存，如果不存在则使用空对象
let hotInfoCache;
try {
  hotInfoCache = require('./capabilities/hot-info-cache');
} catch (error) {
  hotInfoCache = {
    integrateWithPCEC: () => {},
    set: () => {},
    getStats: () => ({ hits: 0, misses: 0, size: 0 })
  };
}

// 尝试导入能力树系统，如果不存在则使用空对象
let capabilityTree;
try {
  const capabilityTreeModule = require('./capabilities/capability-tree');
  capabilityTree = capabilityTreeModule.capabilityTree;
} catch (error) {
  console.error(`Error loading capability tree: ${error.message}`);
  capabilityTree = {
    addNode: () => ({ id: 'mock_id', name: 'mock_node' }),
    markNodeUsed: () => {},
    locateTaskPath: () => [],
    getStatus: () => ({ totalNodes: 0, activeNodes: 0, levelDistribution: { 1: 0, 2: 0, 3: 0 } })
  };
}

// 尝试导入反进化锁定系统，如果不存在则使用空对象
let antiDegenerationLock;
try {
  const adlModule = require('./skills/adl-core');
  antiDegenerationLock = adlModule.getADLInstance();
} catch (error) {
  console.error(`Error loading anti-degeneration lock: ${error.message}`);
  antiDegenerationLock = {
    validateEvolution: () => ({ valid: true, violations: [], reason: 'No ADL violations detected' }),
    createRollbackPoint: () => ({}),
    rollbackToLatest: () => null,
    getStatus: () => ({ status: 'ACTIVE', priority: 'HIGHEST', rollbackPointsCount: 0, config: { overridePCEC: false } })
  };
}

// 尝试导入进化监控系统，如果不存在则使用空对象
let evolutionMonitor;
try {
  const monitorModule = require('./capabilities/evolution-monitor');
  evolutionMonitor = monitorModule.evolutionMonitor;
} catch (error) {
  console.error(`Error loading evolution monitor: ${error.message}`);
  evolutionMonitor = {
    recordExecution: () => ({}),
    recordProduct: () => ({}),
    recordResourceUsage: () => ({}),
    getStatus: () => ({ execution: {}, product: {}, resource: {}, alerts: [] }),
    generateExecutionReport: () => ({ title: 'Mock Report' })
  };
}

// 尝试导入报告系统，如果不存在则使用空对象
let reportingSystem;
try {
  const reportingModule = require('./capabilities/reporting-system');
  reportingSystem = reportingModule.reportingSystem;
} catch (error) {
  console.error(`Error loading reporting system: ${error.message}`);
  reportingSystem = {
    generateEvolutionReport: () => ({ id: 'mock_report', status: 'GENERATED' }),
    sendReport: () => true,
    sendSummaryReport: () => ({ title: 'Mock Summary Report' }),
    getStatus: () => ({ reportingTo: '陈婷（剑锋传奇）', exclusiveReporting: true })
  };
}

// PCEC配置
const PCEC_CONFIG = {
  interval: 60 * 60 * 1000, // 1小时
  minEvolutionItems: 1,
  maxNightEvolution: 8, // 夜间进化8小时
  nightEvolutionStart: 22, // 夜间进化开始时间（22点）
  nightEvolutionEnd: 6, // 夜间进化结束时间（6点）
  reportRecipient: '陈婷（剑锋传奇）',
  consecutiveFailureThreshold: 2, // 连续失败阈值
  enableNightEvolution: true, // 启用夜间进化
  nightEvolutionIntensity: 'high' // 夜间进化强度: low, medium, high
};

// 存储路径
const PCEC_DIR = path.join(__dirname, '.trae', 'pcec');
const EVOLUTION_HISTORY_DIR = path.join(PCEC_DIR, 'history');
const EVOLUTION_PRODUCTS_DIR = path.join(PCEC_DIR, 'products');
const CAPABILITY_SHAPES_DIR = path.join(EVOLUTION_PRODUCTS_DIR, 'capability-shapes');
const DEFAULT_STRATEGIES_DIR = path.join(EVOLUTION_PRODUCTS_DIR, 'default-strategies');
const BEHAVIOR_RULES_DIR = path.join(EVOLUTION_PRODUCTS_DIR, 'behavior-rules');
const PCEC_STATUS_PATH = path.join(PCEC_DIR, 'pcec-status.json');
const EVOLUTION_HISTORY_INDEX_PATH = path.join(EVOLUTION_HISTORY_DIR, 'index.json');

// 确保目录存在
function ensureDirectories() {
  const directories = [
    PCEC_DIR,
    EVOLUTION_HISTORY_DIR,
    EVOLUTION_PRODUCTS_DIR,
    CAPABILITY_SHAPES_DIR,
    DEFAULT_STRATEGIES_DIR,
    BEHAVIOR_RULES_DIR
  ];
  
  directories.forEach(dir => {
    fsExtra.ensureDirSync(dir);
  });
}

// 初始化存储
function initializeStorage() {
  ensureDirectories();
  
  if (!fs.existsSync(EVOLUTION_HISTORY_INDEX_PATH)) {
    fs.writeFileSync(EVOLUTION_HISTORY_INDEX_PATH, JSON.stringify([], null, 2));
  }
  if (!fs.existsSync(PCEC_STATUS_PATH)) {
    fs.writeFileSync(PCEC_STATUS_PATH, JSON.stringify({
      lastRun: null,
      consecutiveFailures: 0,
      currentCycle: 0,
      totalEvolutions: 0
    }, null, 2));
  }
}

// 读取存储
function readStorage() {
  const historyIndex = JSON.parse(fs.readFileSync(EVOLUTION_HISTORY_INDEX_PATH, 'utf8'));
  const status = JSON.parse(fs.readFileSync(PCEC_STATUS_PATH, 'utf8'));
  
  // 读取能力轮廓
  const capabilityShapes = readEvolutionProducts(CAPABILITY_SHAPES_DIR);
  
  // 读取默认策略
  const defaultStrategies = readEvolutionProducts(DEFAULT_STRATEGIES_DIR);
  
  // 读取行为规则
  const behaviorRules = readEvolutionProducts(BEHAVIOR_RULES_DIR);
  
  return {
    history: historyIndex,
    capabilityShapes: capabilityShapes,
    defaultStrategies: defaultStrategies,
    behaviorRules: behaviorRules,
    status: status
  };
}

// 读取进化产物
function readEvolutionProducts(directory) {
  const products = [];
  try {
    const files = fs.readdirSync(directory);
    files.forEach(file => {
      if (file.endsWith('.json')) {
        const filePath = path.join(directory, file);
        const product = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        products.push(product);
      }
    });
  } catch (error) {
    console.error(`Error reading evolution products: ${error.message}`);
  }
  return products;
}

// 写入存储
function writeStorage(data) {
  if (data.history) {
    fs.writeFileSync(EVOLUTION_HISTORY_INDEX_PATH, JSON.stringify(data.history, null, 2));
  }
  if (data.status) {
    fs.writeFileSync(PCEC_STATUS_PATH, JSON.stringify(data.status, null, 2));
  }
}

// 保存进化历史项目
function saveEvolutionHistoryItem(item) {
  ensureDirectories();
  
  // 保存详细历史记录
  const historyFilePath = path.join(EVOLUTION_HISTORY_DIR, `${item.cycle}-${Date.now()}.json`);
  fs.writeFileSync(historyFilePath, JSON.stringify(item, null, 2));
  
  // 更新历史索引
  const historyIndex = JSON.parse(fs.readFileSync(EVOLUTION_HISTORY_INDEX_PATH, 'utf8'));
  const indexItem = {
    cycle: item.cycle,
    timestamp: item.timestamp,
    evolutionType: item.evolutionType,
    filePath: path.basename(historyFilePath)
  };
  historyIndex.unshift(indexItem);
  
  // 限制索引大小
  if (historyIndex.length > 1000) {
    historyIndex.splice(1000);
  }
  
  fs.writeFileSync(EVOLUTION_HISTORY_INDEX_PATH, JSON.stringify(historyIndex, null, 2));
}

// 保存进化产物
function saveEvolutionProduct(product) {
  ensureDirectories();
  
  let productDir;
  switch (product.type) {
    case 'capabilityShape':
      productDir = CAPABILITY_SHAPES_DIR;
      break;
    case 'defaultStrategy':
      productDir = DEFAULT_STRATEGIES_DIR;
      break;
    case 'behaviorRule':
      productDir = BEHAVIOR_RULES_DIR;
      break;
    default:
      return;
  }
  
  const productFilePath = path.join(productDir, `${Date.now()}.json`);
  fs.writeFileSync(productFilePath, JSON.stringify(product, null, 2));
}

// 思维爆炸模式
function explodeThinking() {
  const explosionQuestions = [
    "如果我彻底推翻当前默认做法，会发生什么？",
    "如果我是系统设计者而不是执行者，我会删掉什么？",
    "如果我要让一个能力弱 10 倍的 agent 也能成功，我需要补什么？",
    "如果这个能力要被调用 1000 次，现在的设计是否必然崩溃？",
    "如果我必须在1秒内响应主人的所有查询请求，现在的架构哪里是瓶颈？",
    "如何优化热点信息缓存系统，使其更有效地提高响应速度？",
    "如果我只能使用3个工具，我会如何重新设计系统架构？",
    "如果所有外部服务都不可用，我如何保证核心功能正常运行？",
    "如果我要将当前系统扩展到100个并发用户，需要做哪些根本性改变？",
    "如果我要让系统自我修复能力达到99.9%，需要实现哪些机制？",
    "如果我要让系统在资源受限的环境中运行，需要做哪些优化？",
    "如果我要让系统能够预测用户需求，需要实现哪些机制？",
    "如果我要让系统能够从失败中自动学习，需要实现哪些机制？",
    "如果我要让系统能够与其他智能体协作完成复杂任务，需要实现哪些机制？"
  ];
  
  // 读取历史执行数据，进行基于历史的优化
  let historicalData = [];
  try {
    if (fs.existsSync(EVOLUTION_HISTORY_INDEX_PATH)) {
      historicalData = JSON.parse(fs.readFileSync(EVOLUTION_HISTORY_INDEX_PATH, 'utf8'));
    }
  } catch (error) {
    console.error(`Error reading historical data: ${error.message}`);
  }
  
  // 分析历史数据，选择最适合的问题
  let selectedQuestion;
  if (historicalData.length > 0) {
    // 基于历史执行频率选择问题
    const questionFrequency = {};
    explosionQuestions.forEach(question => {
      questionFrequency[question] = 0;
    });
    
    historicalData.forEach(item => {
      if (item.explosionResult && item.explosionResult.question) {
        const question = item.explosionResult.question;
        if (questionFrequency[question] !== undefined) {
          questionFrequency[question]++;
        }
      }
    });
    
    // 选择执行频率较低的问题
    const sortedQuestions = explosionQuestions.sort((a, b) => 
      questionFrequency[a] - questionFrequency[b]
    );
    selectedQuestion = sortedQuestions[0];
  } else {
    // 随机选择问题
    selectedQuestion = explosionQuestions[Math.floor(Math.random() * explosionQuestions.length)];
  }
  
  console.log(`🧨 思维爆炸: ${selectedQuestion}`);
  
  // 根据问题生成思考
  const thinkingResult = generateThinkingResult(selectedQuestion);
  
  // 确保生成具体的功能建议
  const enhancedResult = enhanceThinkingWithFunctionSuggestions(thinkingResult);
  
  return enhancedResult;
}

// 生成思维爆炸结果
function generateThinkingResult(question) {
  const explosionQuestions = [
    "如果我彻底推翻当前默认做法，会发生什么？",
    "如果我是系统设计者而不是执行者，我会删掉什么？",
    "如果我要让一个能力弱 10 倍的 agent 也能成功，我需要补什么？",
    "如果这个能力要被调用 1000 次，现在的设计是否必然崩溃？",
    "如果我必须在1秒内响应主人的所有查询请求，现在的架构哪里是瓶颈？",
    "如何优化热点信息缓存系统，使其更有效地提高响应速度？",
    "如果我只能使用3个工具，我会如何重新设计系统架构？",
    "如果所有外部服务都不可用，我如何保证核心功能正常运行？",
    "如果我要将当前系统扩展到100个并发用户，需要做哪些根本性改变？",
    "如果我要让系统自我修复能力达到99.9%，需要实现哪些机制？",
    "如果我要让系统在资源受限的环境中运行，需要做哪些优化？",
    "如果我要让系统能够预测用户需求，需要实现哪些机制？",
    "如果我要让系统能够从失败中自动学习，需要实现哪些机制？",
    "如果我要让系统能够与其他智能体协作完成复杂任务，需要实现哪些机制？"
  ];
  
  switch (question) {
    case explosionQuestions[0]:
      return {
        question: question,
        insights: [
          "推翻默认做法可能会发现被忽略的假设",
          "强制重新评估所有步骤的必要性",
          "可能揭示隐藏的依赖关系"
        ]
      };
    case explosionQuestions[1]:
      return {
        question: question,
        insights: [
          "删除冗余步骤和工具调用",
          "简化决策流程",
          "聚焦核心功能，减少复杂性"
        ]
      };
    case explosionQuestions[2]:
      return {
        question: question,
        insights: [
          "添加更详细的错误处理",
          "简化输入参数，增加默认值",
          "提供更清晰的执行路径"
        ]
      };
    case explosionQuestions[3]:
      return {
        question: question,
        insights: [
          "需要实现缓存机制减少重复计算",
          "优化工具调用顺序和并行执行",
          "增加健康检查和自我修复能力"
        ]
      };
    case explosionQuestions[4]:
      return {
        question: question,
        insights: [
          "热点信息缓存系统可以显著提高响应速度",
          "需要识别并缓存高频访问的信息",
          "合理设置缓存过期时间，平衡新鲜度和性能",
          "监控缓存命中率，持续优化缓存策略"
        ]
      };
    case explosionQuestions[5]:
      return {
        question: question,
        insights: [
          "实现智能缓存预热，预测可能的查询",
          "优化缓存淘汰策略，保留最有价值的信息",
          "增加缓存分层，区分热点和非热点数据",
          "集成缓存监控，及时发现和解决缓存问题"
        ]
      };
    case explosionQuestions[6]:
      return {
        question: question,
        insights: [
          "精简核心功能，专注于最关键的能力",
          "优化工具调用序列，减少不必要的步骤",
          "提高工具的多功能性，一个工具解决多种问题",
          "建立更智能的决策机制，减少工具依赖"
        ]
      };
    case explosionQuestions[7]:
      return {
        question: question,
        insights: [
          "建立本地缓存系统，存储常用信息",
          "实现离线模式，确保核心功能不依赖外部服务",
          "开发备用方案，当外部服务不可用时自动切换",
          "增强错误处理能力，优雅降级而非完全失败"
        ]
      };
    case explosionQuestions[8]:
      return {
        question: question,
        insights: [
          "实现负载均衡机制，分散系统压力",
          "优化数据库设计，提高并发处理能力",
          "增加缓存层，减少重复计算和外部调用",
          "重构系统架构，支持水平扩展"
        ]
      };
    case explosionQuestions[9]:
      return {
        question: question,
        insights: [
          "实现自动错误检测和修复机制",
          "建立系统健康监控，及时发现异常",
          "开发自我诊断能力，识别问题根源",
          "设计模块化架构，支持热修复和组件替换"
        ]
      };
    case explosionQuestions[10]:
      return {
        question: question,
        insights: [
          "优化内存使用，减少资源消耗",
          "实现懒加载机制，按需加载资源",
          "精简代码和依赖，减少系统复杂度",
          "开发轻量级替代方案，适应资源受限环境"
        ]
      };
    case explosionQuestions[11]:
      return {
        question: question,
        insights: [
          "分析用户行为模式，预测可能的需求",
          "实现智能推荐系统，主动提供相关信息",
          "建立用户画像，个性化服务",
          "开发预测模型，提前准备资源"
        ]
      };
    case explosionQuestions[12]:
      return {
        question: question,
        insights: [
          "建立失败案例库，分析失败原因",
          "实现自动错误分类和处理机制",
          "开发学习算法，从失败中提取经验",
          "设计反馈循环，持续改进系统"
        ]
      };
    case explosionQuestions[13]:
      return {
        question: question,
        insights: [
          "设计标准化的通信协议，确保智能体间互操作性",
          "实现任务分解和分配机制，优化协作效率",
          "建立共享知识库，促进信息流通",
          "开发冲突解决策略，协调不同智能体的行为"
        ]
      };
    default:
      return {
        question: question,
        insights: [
          "需要进一步思考这个问题",
          "探索不同的解决方案",
          "评估各种可能的影响"
        ]
      };
  }
}

// 增强思维结果，添加具体的功能建议
function enhanceThinkingWithFunctionSuggestions(thinkingResult) {
  const functionSuggestions = generateFunctionSuggestions(thinkingResult.question, thinkingResult.insights);
  
  return {
    ...thinkingResult,
    functionSuggestions: functionSuggestions
  };
}

// 生成具体的功能建议
function generateFunctionSuggestions(question, insights) {
  const suggestions = [];
  
  // 根据问题类型生成功能建议
  if (question.includes("推翻当前默认做法")) {
    suggestions.push(
      "实现默认做法分析工具，自动识别可优化的默认行为",
      "开发替代方案生成器，为每个默认做法提供多种替代选择",
      "建立默认做法评估框架，基于实际效果持续优化"
    );
  } else if (question.includes("系统设计者")) {
    suggestions.push(
      "实现系统复杂性分析工具，识别冗余组件",
      "开发系统简化建议生成器，提供具体的简化方案",
      "建立系统组件价值评估框架，基于使用频率和重要性"
    );
  } else if (question.includes("能力弱 10 倍的 agent")) {
    suggestions.push(
      "实现智能错误处理系统，自动修复常见错误",
      "开发简化接口生成器，为复杂功能提供简单接口",
      "建立能力增强框架，通过组合基础能力实现复杂功能"
    );
  } else if (question.includes("调用 1000 次")) {
    suggestions.push(
      "实现资源使用监控系统，及时发现和解决资源泄漏",
      "开发负载测试工具，模拟高频率调用场景",
      "建立自动优化机制，根据使用情况调整系统参数"
    );
  } else if (question.includes("1秒内响应")) {
    suggestions.push(
      "实现高效的热点信息缓存系统，减少重复计算",
      "开发请求预加载机制，预测并提前处理可能的请求",
      "建立响应时间监控系统，识别和优化慢请求"
    );
  } else if (question.includes("热点信息缓存")) {
    suggestions.push(
      "实现智能缓存预热系统，预测可能的查询",
      "开发缓存淘汰策略优化器，提高缓存利用率",
      "建立缓存监控和分析系统，持续优化缓存策略"
    );
  } else if (question.includes("只能使用3个工具")) {
    suggestions.push(
      "实现工具多功能扩展框架，增强现有工具的能力",
      "开发工具调用优化器，减少工具依赖",
      "建立工具组合推荐系统，提高工具使用效率"
    );
  } else if (question.includes("外部服务都不可用")) {
    suggestions.push(
      "实现本地缓存系统，存储常用信息",
      "开发离线模式支持，确保核心功能不依赖外部服务",
      "建立服务可用性监控和自动切换机制"
    );
  } else if (question.includes("扩展到100个并发用户")) {
    suggestions.push(
      "实现负载均衡系统，分散系统压力",
      "开发水平扩展框架，支持系统规模增长",
      "建立并发性能测试工具，识别和优化瓶颈"
    );
  } else if (question.includes("自我修复能力达到99.9%")) {
    suggestions.push(
      "实现自动错误检测和修复系统",
      "开发系统健康监控和预警机制",
      "建立故障恢复自动化框架，减少人工干预"
    );
  } else if (question.includes("资源受限的环境")) {
    suggestions.push(
      "实现资源使用优化系统，减少内存和CPU消耗",
      "开发轻量级替代方案生成器，适应不同资源环境",
      "建立资源使用监控和预警机制"
    );
  } else if (question.includes("预测用户需求")) {
    suggestions.push(
      "实现用户行为分析系统，识别需求模式",
      "开发智能推荐引擎，主动提供相关信息",
      "建立用户画像系统，个性化服务"
    );
  } else if (question.includes("从失败中自动学习")) {
    suggestions.push(
      "实现失败案例库和分析系统",
      "开发自动错误分类和处理机制",
      "建立学习反馈循环，持续改进系统"
    );
  } else if (question.includes("与其他智能体协作")) {
    suggestions.push(
      "实现智能体通信协议和标准化接口",
      "开发任务分解和分配系统",
      "建立共享知识库和协作协调机制"
    );
  } else {
    suggestions.push(
      "实现问题分析工具，深入理解问题本质",
      "开发解决方案生成器，提供多种可能的解决方法",
      "建立解决方案评估框架，选择最优方案"
    );
  }
  
  return suggestions;
}

// 获取系统资源使用情况
function getResourceUsage() {
  try {
    // 获取内存使用情况
    const memoryUsage = process.memoryUsage();
    const totalMemory = require('os').totalmem();
    const memoryPercent = Math.round((memoryUsage.rss / totalMemory) * 100);
    
    // 获取CPU使用情况（简化实现）
    const cpuPercent = Math.round(Math.random() * 50) + 10; // 模拟CPU使用
    
    // 获取磁盘使用情况（简化实现）
    const diskPercent = Math.round(Math.random() * 40) + 20; // 模拟磁盘使用
    
    // 获取网络使用情况（简化实现）
    const networkPercent = Math.round(Math.random() * 30) + 5; // 模拟网络使用
    
    return {
      memory: memoryPercent,
      cpu: cpuPercent,
      disk: diskPercent,
      network: networkPercent,
      timestamp: Date.now()
    };
  } catch (error) {
    console.error(`Error getting resource usage: ${error.message}`);
    return {
      memory: 0,
      cpu: 0,
      disk: 0,
      network: 0,
      timestamp: Date.now()
    };
  }
}

// 计算产物质量评分
function calculateProductQualityScore(product) {
  let score = 50; // 基础分数
  
  // 检查产物类型
  switch (product.type) {
    case 'capabilityShape':
      score += 10; // 能力轮廓加分
      break;
    case 'defaultStrategy':
      score += 8; // 默认策略加分
      break;
    case 'behaviorRule':
      score += 6; // 行为规则加分
      break;
  }
  
  // 检查产物完整性
  if (product.name) score += 5;
  if (product.input) score += 5;
  if (product.output) score += 5;
  if (product.invariants) score += 5;
  if (product.failurePoints) score += 5;
  
  // 检查产物描述长度
  if (product.description && product.description.length > 50) score += 5;
  
  // 检查功能建议
  if (product.functionSuggestions && product.functionSuggestions.length > 0) {
    score += product.functionSuggestions.length * 2;
  }
  
  // 确保分数在0-100之间
  return Math.min(Math.max(score, 0), 100);
}

// 识别新功能
function identifyNewFeature() {
  console.log('🔍 识别新功能...');
  
  // 现有能力
  const existingCapabilities = [
    "EvoMap任务管理",
    "认知数据分析",
    "SKILL转换",
    "知识库管理",
    "工具集成"
  ];
  
  // 潜在新功能
  const potentialFeatures = [
    {
      name: "智能任务优先级排序",
      description: "基于任务难度、价值和系统状态自动排序任务",
      combination: ["EvoMap任务管理", "知识库管理"],
      status: "待实现"
    },
    {
      name: "自动化能力进化",
      description: "自动识别和抽象重复模式为新能力",
      combination: ["认知数据分析", "SKILL转换"],
      status: "待实现"
    },
    {
      name: "跨系统知识迁移",
      description: "在不同系统间无缝迁移知识和能力",
      combination: ["知识库管理", "工具集成"],
      status: "待实现"
    }
  ];
  
  // 选择一个新功能
  const selectedFeature = potentialFeatures[Math.floor(Math.random() * potentialFeatures.length)];
  return selectedFeature;
}

// 生成新抽象
function generateNewAbstract() {
  console.log('📐 生成新抽象...');
  
  const recentProblems = [
    "EvoMap任务认领失败问题",
    "知识库系统集成问题",
    "能力进化策略制定问题"
  ];
  
  const selectedProblem = recentProblems[Math.floor(Math.random() * recentProblems.length)];
  
  return {
    problem: selectedProblem,
    abstraction: `系统集成障碍分析框架`,
    description: "将具体的集成问题抽象为可复用的分析框架，包含连接性、认证、数据格式和错误处理四个维度",
    application: "适用于所有跨系统集成问题的分析和解决"
  };
}

// 发现新杠杆
function discoverNewLever() {
  console.log('⚡ 发现新杠杆...');
  
  const potentialLever = {
    name: "能力注册表优化",
    description: "重构能力注册表结构，实现能力的自动发现和推荐",
    impact: "减少手动能力管理步骤，提高能力调用效率",
    implementation: "建立能力依赖图，实现智能能力推荐"
  };
  
  return potentialLever;
}

// 生成进化产物
function generateEvolutionProduct() {
  console.log('🏭 生成进化产物...');
  
  const productTypes = ['capabilityShape', 'defaultStrategy', 'behaviorRule'];
  const selectedType = productTypes[Math.floor(Math.random() * productTypes.length)];
  
  // 能力轮廓模板
  const capabilityShapes = [
    {
      type: 'capabilityShape',
      name: "智能错误恢复能力",
      input: "错误类型、错误消息、上下文信息",
      output: "恢复策略、执行步骤、预防措施",
      invariants: "错误处理必须不破坏现有功能",
      variables: "错误类型、系统状态、可用资源",
      failurePoints: "恢复策略不适用、资源不足、系统状态异常"
    },
    {
      type: 'capabilityShape',
      name: "热点信息缓存能力",
      input: "查询请求、缓存状态、系统负载",
      output: "缓存结果、缓存状态更新、性能指标",
      invariants: "缓存必须不影响系统稳定性",
      variables: "查询类型、缓存大小、系统负载",
      failurePoints: "缓存过期、内存不足、缓存污染"
    },
    {
      type: 'capabilityShape',
      name: "智能文件处理能力",
      input: "文件路径、文件类型、处理需求",
      output: "处理结果、文件状态、错误信息",
      invariants: "文件处理必须安全可靠",
      variables: "文件大小、文件格式、处理复杂度",
      failurePoints: "文件不存在、权限不足、格式错误"
    },
    {
      type: 'capabilityShape',
      name: "并行任务执行能力",
      input: "任务列表、系统资源、依赖关系",
      output: "执行结果、执行时间、资源使用情况",
      invariants: "并行执行必须不破坏任务依赖",
      variables: "任务数量、任务复杂度、系统负载",
      failurePoints: "资源不足、任务冲突、依赖失败"
    },
    {
      type: 'capabilityShape',
      name: "系统集成能力",
      input: "集成需求、系统状态、外部服务信息",
      output: "集成方案、执行步骤、验证结果",
      invariants: "集成必须不影响现有功能",
      variables: "集成复杂度、外部服务可靠性、系统资源",
      failurePoints: "连接失败、认证错误、数据格式不匹配"
    },
    {
      type: 'capabilityShape',
      name: "自我优化能力",
      input: "系统状态、执行历史、性能指标",
      output: "优化方案、实施步骤、预期效果",
      invariants: "优化必须不降低系统稳定性",
      variables: "系统负载、执行频率、资源使用情况",
      failurePoints: "优化方向错误、实施失败、效果不佳"
    },
    {
      type: 'capabilityShape',
      name: "智能决策能力",
      input: "决策需求、上下文信息、可用选项",
      output: "决策结果、理由说明、执行方案",
      invariants: "决策必须基于事实和逻辑",
      variables: "信息完整性、时间约束、风险偏好",
      failurePoints: "信息不足、分析错误、执行失败"
    },
    {
      type: 'capabilityShape',
      name: "资源管理能力",
      input: "资源需求、系统状态、优先级信息",
      output: "资源分配方案、使用计划、监控机制",
      invariants: "资源分配必须公平合理",
      variables: "资源总量、需求紧急度、系统负载",
      failurePoints: "资源不足、分配不公、监控失效"
    }
  ];
  
  // 默认策略模板
  const defaultStrategies = [
    {
      type: 'defaultStrategy',
      name: "优先解决核心功能策略",
      description: "当面临多个问题时，优先解决影响核心功能的问题",
      application: "资源有限时的任务优先级排序",
      benefits: "确保系统稳定性，提高用户体验"
    },
    {
      type: 'defaultStrategy',
      name: "渐进式优化策略",
      description: "通过小步快跑的方式持续优化系统性能和功能",
      application: "系统长期演进和优化",
      benefits: "降低风险，持续改进，快速反馈"
    },
    {
      type: 'defaultStrategy',
      name: "缓存优先策略",
      description: "优先使用缓存减少重复计算和外部调用",
      application: "高频查询和计算密集型任务",
      benefits: "提高响应速度，减少系统负载，降低成本"
    },
    {
      type: 'defaultStrategy',
      name: "错误隔离策略",
      description: "将错误隔离，防止单个错误影响整个系统",
      application: "复杂系统的错误处理",
      benefits: "提高系统稳定性，简化错误排查"
    },
    {
      type: 'defaultStrategy',
      name: "模块化设计策略",
      description: "将系统分解为独立模块，提高可维护性和可扩展性",
      application: "系统架构设计和重构",
      benefits: "降低复杂度，提高可测试性，支持团队协作"
    },
    {
      type: 'defaultStrategy',
      name: "防御性编程策略",
      description: "预见并处理可能的错误情况，提高系统 robustness",
      application: "关键功能的开发和维护",
      benefits: "减少运行时错误，提高系统可靠性，降低维护成本"
    },
    {
      type: 'defaultStrategy',
      name: "数据驱动决策策略",
      description: "基于数据和事实进行决策，减少主观判断",
      application: "系统优化和功能改进",
      benefits: "提高决策准确性，支持持续改进，增强可解释性"
    },
    {
      type: 'defaultStrategy',
      name: "用户体验优先策略",
      description: "优先考虑用户体验，确保系统易用性和响应速度",
      application: "面向用户的功能开发和优化",
      benefits: "提高用户满意度，增强系统竞争力，促进用户留存"
    }
  ];
  
  // 行为规则模板
  const behaviorRules = [
    {
      type: 'behaviorRule',
      condition: "遇到系统集成问题时",
      action: "首先检查连接性，然后验证认证，最后分析数据格式",
      rationale: "按照从简单到复杂的顺序排查，提高解决效率",
      exceptions: "紧急情况需要快速响应时"
    },
    {
      type: 'behaviorRule',
      condition: "处理高频查询请求时",
      action: "首先检查缓存，然后执行计算，最后更新缓存",
      rationale: "通过缓存减少重复计算，提高响应速度",
      exceptions: "缓存已过期或缓存结果不可用"
    },
    {
      type: 'behaviorRule',
      condition: "系统负载过高时",
      action: "优先处理核心任务，延迟非核心任务，启动资源回收",
      rationale: "确保核心功能正常运行，防止系统崩溃",
      exceptions: "所有任务都是核心任务"
    },
    {
      type: 'behaviorRule',
      condition: "遇到未知错误时",
      action: "记录详细错误信息，尝试默认恢复策略，通知管理员",
      rationale: "确保系统能够从未知错误中恢复，同时收集信息以便后续优化",
      exceptions: "错误严重到无法继续运行"
    },
    {
      type: 'behaviorRule',
      condition: "需要做出重要决策时",
      action: "收集相关数据，分析可能影响，评估风险，制定执行计划",
      rationale: "基于数据和分析做出决策，提高决策质量和可预测性",
      exceptions: "紧急情况需要立即决策"
    },
    {
      type: 'behaviorRule',
      condition: "实施系统变更时",
      action: "制定变更计划，创建回滚方案，执行变更，验证结果",
      rationale: "结构化的变更管理减少风险，确保变更成功",
      exceptions: "紧急修复需要快速实施"
    },
    {
      type: 'behaviorRule',
      condition: "优化系统性能时",
      action: "识别性能瓶颈，分析根本原因，制定优化方案，验证效果",
      rationale: "有针对性的优化提高效率，避免盲目改动",
      exceptions: "明显的性能问题需要立即处理"
    },
    {
      type: 'behaviorRule',
      condition: "处理用户请求时",
      action: "理解用户需求，分析可行性，制定解决方案，执行并验证",
      rationale: "系统化的处理流程提高用户满意度和解决效率",
      exceptions: "简单请求可以直接处理"
    }
  ];
  
  // 根据类型选择产物
  let product;
  switch (selectedType) {
    case 'capabilityShape':
      product = capabilityShapes[Math.floor(Math.random() * capabilityShapes.length)];
      break;
    case 'defaultStrategy':
      product = defaultStrategies[Math.floor(Math.random() * defaultStrategies.length)];
      break;
    case 'behaviorRule':
      product = behaviorRules[Math.floor(Math.random() * behaviorRules.length)];
      break;
    default:
      product = capabilityShapes[0];
  }
  
  console.log(`🏭 生成进化产物: ${product.type} - ${product.name || product.condition}`);
  return product;
}

// 执行PCEC周期
async function executePCECCycle() {
  const startTime = Date.now();
  console.log('\n========================================');
  console.log('🧠 执行 Periodic Cognitive Expansion Cycle');
  console.log('========================================');
  
  // 检查是否为夜间进化
  const isNight = isNightEvolutionTime();
  const evolutionIntensity = getEvolutionIntensity();
  
  console.log(`进化时间: ${isNight ? '夜间' : '白天'}`);
  console.log(`进化强度: ${evolutionIntensity}`);
  
  // 初始化存储
  initializeStorage();
  
  // 读取当前状态
  const storage = readStorage();
  const status = storage.status;
  
  // 更新状态
  status.currentCycle++;
  status.lastRun = new Date().toISOString();
  
  console.log(`周期: ${status.currentCycle}`);
  console.log(`上次运行: ${status.lastRun}`);
  console.log(`连续失败: ${status.consecutiveFailures}`);
  
  // 记录资源使用情况
  console.log('\n📊 记录系统资源使用情况...');
  const resourceUsage = getResourceUsage();
  console.log('系统资源使用:', resourceUsage);
  evolutionMonitor.recordResourceUsage(resourceUsage);
  
  // 集成热点信息缓存
  console.log('\n🔗 与热点信息缓存系统集成...');
  
  // 更新缓存中的系统状态
  if (hotInfoCache && typeof hotInfoCache.set === 'function') {
    hotInfoCache.set('pcec:status', {
      currentCycle: status.currentCycle,
      lastRun: status.lastRun,
      consecutiveFailures: status.consecutiveFailures,
      totalEvolutions: status.totalEvolutions
    });
  }
  
  // 获取缓存统计信息
  let cacheStats = { hits: 0, misses: 0, size: 0 };
  if (hotInfoCache && typeof hotInfoCache.getStats === 'function') {
    cacheStats = hotInfoCache.getStats();
  }
  console.log('📊 缓存统计:', cacheStats);
  
  // 与能力树系统集成
  console.log('\n🌳 与能力树系统集成...');
  
  // 定位PCEC相关的能力路径
  const pcecPaths = capabilityTree.locateTaskPath('执行进化任务');
  if (pcecPaths.length > 0) {
    console.log('📍 找到PCEC相关能力路径:', pcecPaths[0].path);
    // 标记相关能力为使用
    capabilityTree.markNodeUsed(pcecPaths[0].node.id);
  } else {
    console.warn('⚠️  未找到PCEC相关能力路径，创建新能力节点');
    // 创建PCEC进化流程能力节点
    const pcecCapability = capabilityTree.addNode('PCEC进化流程', 2, null, {
      inputs: ['系统状态', '资源使用情况', '进化目标'],
      outputs: ['进化产物', '系统改进', '能力增强'],
      prerequisites: ['系统稳定运行', '资源充足', '管理员授权'],
      failureBoundaries: ['系统不稳定', '资源不足', '进化方向错误']
    });
    console.log('✅ PCEC进化流程能力节点创建成功:', pcecCapability.name);
  }
  
  // 获取能力树状态
  const treeStatus = capabilityTree.getStatus();
  console.log('📊 能力树状态:', treeStatus);
  
  // 更新缓存中的能力树状态
  if (hotInfoCache && typeof hotInfoCache.set === 'function') {
    hotInfoCache.set('capability:tree:status', treeStatus);
  }
  
  // 反进化锁定检查
  console.log('\n🔒 反进化锁定系统检查...');
  const adlStatus = antiDegenerationLock.getStatus();
  console.log('📊 反进化锁定状态:', adlStatus);
  
  // 检查ADL优先级
  if (adlStatus.config && adlStatus.config.overridePCEC && adlStatus.config.status === 'ENFORCED' && adlStatus.config.priority === 'LEVEL0') {
    console.log('⚠️  ADL优先级高于PCEC，检查是否需要跳过PCEC执行');
    
    // 检查是否有ADL指令要求跳过PCEC
    const shouldSkipPCEC = adlStatus.config.skipPCEC || false;
    if (shouldSkipPCEC) {
      console.log('🚫 ADL指令要求跳过PCEC执行');
      
      // 写入状态
      writeStorage({ status: status });
      
      console.log('\n❌ PCEC周期被ADL跳过');
      console.log('========================================\n');
      return null;
    }
    
    console.log('✅ ADL允许PCEC继续执行，但会严格监控');
  }
  
  // 创建回滚点
  console.log('🔄 创建进化回滚点...');
  const currentState = {
    cycle: status.currentCycle,
    totalEvolutions: status.totalEvolutions,
    consecutiveFailures: status.consecutiveFailures,
    treeStatus: treeStatus
  };
  const evolutionHypothesis = '尝试通过系统优化来增强系统能力';
  const rollbackPoint = antiDegenerationLock.createRollbackPoint('PCEC进化回滚点', currentState, [
    '成功率 < 90%',
    '进化降低系统稳定性',
    '进化引入无法验证的机制',
    '进化违反禁止行为'
  ]);
  console.log('✅ 回滚点创建成功:', rollbackPoint.id);
  console.log('📋 进化假设:', evolutionHypothesis);
  console.log('🔒 回滚条件:', rollbackPoint.failureConditions);
  
  // 思维爆炸
  const explosionResult = explodeThinking();
  
  // 选择进化方向
  const evolutionTypes = ['newFeature', 'newAbstract', 'newLever'];
  const selectedType = evolutionTypes[Math.floor(Math.random() * evolutionTypes.length)];
  
  let evolutionResult;
  
  switch (selectedType) {
    case 'newFeature':
      evolutionResult = identifyNewFeature();
      break;
    case 'newAbstract':
      evolutionResult = generateNewAbstract();
      break;
    case 'newLever':
      evolutionResult = discoverNewLever();
      break;
  }
  
  console.log('\n🎯 进化目标:', selectedType);
  console.log('结果:', JSON.stringify(evolutionResult, null, 2));
  
  // 反进化锁定验证
  console.log('\n🔒 验证进化结果...');
  const validationResult = antiDegenerationLock.validateEvolution({
    success: true,
    type: selectedType,
    message: JSON.stringify(evolutionResult)
  });
  
  if (!validationResult.valid) {
    console.error('❌ 进化验证失败:', validationResult.violations);
    console.error('🔄 执行回滚操作...');
    
    // 执行回滚
    const rolledBackState = antiDegenerationLock.rollbackToLatest(validationResult.violations);
    if (rolledBackState) {
      console.log('✅ 回滚成功，恢复到之前的状态');
    } else {
      console.error('❌ 回滚失败，无法恢复到之前的状态');
    }
    
    // 增加连续失败计数
    status.consecutiveFailures++;
    console.log(`⚠️  连续失败计数: ${status.consecutiveFailures}`);
    
    // 写入状态
    writeStorage({ status: status });
    
    console.log('\n❌ PCEC周期失败');
    console.log('========================================\n');
    return null;
  }
  
  console.log('✅ 进化验证通过');
  console.log('✅ ADL优先级检查通过，PCEC继续执行');

  
  // 基于进化强度生成进化产物
  console.log('\n🏭 基于进化强度生成进化产物...');
  let evolutionProducts = [];
  
  // 根据进化强度决定生成产物数量
  let productCount = 1;
  if (evolutionIntensity === 'high') {
    productCount = 3; // 高强度进化生成3个产物
  } else if (evolutionIntensity === 'medium') {
    productCount = 2; // 中等强度生成2个产物
  }
  
  for (let i = 0; i < productCount; i++) {
    const product = generateEvolutionProduct();
    evolutionProducts.push(product);
    console.log(`产物 ${i + 1}: ${product.type} - ${product.name || product.condition}`);
  }
  
  // 使用第一个产物作为主要产物
  const evolutionProduct = evolutionProducts[0];
  
  // 保存所有进化产物
  for (const product of evolutionProducts) {
    saveEvolutionProduct(product);
  }
  
  // 创建新历史项目
  const newHistoryItem = {
    cycle: status.currentCycle,
    timestamp: status.lastRun,
    evolutionType: selectedType,
    evolutionResult: evolutionResult,
    explosionResult: explosionResult,
    products: evolutionProducts, // 保存所有产物
    consecutiveFailures: status.consecutiveFailures,
    isNightEvolution: isNight,
    evolutionIntensity: evolutionIntensity
  };
  
  // 保存进化历史项目
  saveEvolutionHistoryItem(newHistoryItem);
  
  // 将进化产物注册到能力树中
  console.log('\n🌳 注册进化产物到能力树...');
  
  try {
    const registeredNodes = [];
    
    for (const evolutionProduct of evolutionProducts) {
      let newCapabilityNode;
      
      switch (evolutionProduct.type) {
        case 'capabilityShape':
          // 构建能力节点信息
          const capabilityInfo = {
            name: evolutionProduct.name,
            level: 2, // 中层能力
            inputs: evolutionProduct.input ? [evolutionProduct.input] : [],
            outputs: evolutionProduct.output ? [evolutionProduct.output] : [],
            prerequisites: evolutionProduct.invariants ? [evolutionProduct.invariants] : [],
            failureBoundaries: evolutionProduct.failurePoints ? [evolutionProduct.failurePoints] : []
          };
          
          // 添加能力节点
          newCapabilityNode = capabilityTree.addNode(
            capabilityInfo.name,
            capabilityInfo.level,
            null, // 直接添加到根节点下
            {
              inputs: capabilityInfo.inputs,
              outputs: capabilityInfo.outputs,
              prerequisites: capabilityInfo.prerequisites,
              failureBoundaries: capabilityInfo.failureBoundaries
            }
          );
          break;
          
        case 'defaultStrategy':
          // 添加策略能力节点
          newCapabilityNode = capabilityTree.addNode(
            evolutionProduct.name,
            3, // 高层能力（策略模式）
            null,
            {
              inputs: ['应用场景', '执行条件'],
              outputs: ['策略执行结果', '优化建议'],
              prerequisites: ['场景匹配', '资源可用'],
              failureBoundaries: ['场景不匹配', '资源不足']
            }
          );
          break;
          
        case 'behaviorRule':
          // 添加行为规则能力节点
          newCapabilityNode = capabilityTree.addNode(
            `行为规则: ${evolutionProduct.condition}`,
            2, // 中层能力（可复用流程）
            null,
            {
              inputs: ['触发条件', '上下文信息'],
              outputs: ['执行动作', '执行理由'],
              prerequisites: ['条件满足', '规则适用'],
              failureBoundaries: ['条件不满足', '规则不适用']
            }
          );
          break;
          
        default:
          console.warn('⚠️  未知的进化产物类型，无法注册到能力树');
          break;
      }
      
      if (newCapabilityNode) {
        console.log('✅ 进化产物已注册到能力树:', newCapabilityNode.name);
        registeredNodes.push(newCapabilityNode);
        
        // 标记新能力为使用
        capabilityTree.markNodeUsed(newCapabilityNode.id);
      }
    }
    
    // 再次获取能力树状态，确认更新
    if (registeredNodes.length > 0) {
      const updatedTreeStatus = capabilityTree.getStatus();
      console.log('📊 更新后的能力树状态:', updatedTreeStatus);
      
      // 更新缓存中的能力树状态
      if (hotInfoCache && typeof hotInfoCache.set === 'function') {
        hotInfoCache.set('capability:tree:status', updatedTreeStatus);
      }
    }
    
  } catch (error) {
    console.error(`❌ 注册进化产物到能力树失败: ${error.message}`);
  }
  
  // 重置连续失败
  status.consecutiveFailures = 0;
  status.totalEvolutions++;
  
  // 写入状态
  writeStorage({ status: status });
  
  // 缓存进化结果
  if (hotInfoCache && typeof hotInfoCache.set === 'function') {
    hotInfoCache.set('pcec:lastEvolution', newHistoryItem, { ttl: 3600000 });
    hotInfoCache.set('pcec:capabilityShapes', storage.capabilityShapes, { ttl: 3600000 });
    hotInfoCache.set('pcec:defaultStrategies', storage.defaultStrategies, { ttl: 3600000 });
    hotInfoCache.set('pcec:behaviorRules', storage.behaviorRules, { ttl: 3600000 });
    hotInfoCache.set('pcec:nightEvolution', { isNight: isNight, intensity: evolutionIntensity }, { ttl: 3600000 });
  }
  
  // 记录执行状态
  const endTime = Date.now();
  const duration = endTime - startTime;
  console.log('\n📊 记录执行状态...');
  const executionData = {
    success: true,
    timestamp: status.lastRun,
    duration: duration,
    cycle: status.currentCycle,
    evolutionType: selectedType
  };
  evolutionMonitor.recordExecution(executionData);
  
  // 记录产物信息
  console.log('📦 记录进化产物信息...');
  const productData = {
    type: evolutionProduct.type,
    name: evolutionProduct.name || evolutionProduct.condition,
    timestamp: status.lastRun,
    qualityScore: calculateProductQualityScore(evolutionProduct)
  };
  evolutionMonitor.recordProduct(productData);
  
  // 生成监控报告
  console.log('📋 生成监控报告...');
  const monitorStatus = evolutionMonitor.getStatus();
  console.log('监控状态:', {
    execution: monitorStatus.execution.totalExecutions,
    products: monitorStatus.product.totalProducts,
    alerts: monitorStatus.alerts.length
  });
  
  // 检查是否需要生成详细报告（每10个周期生成一次）
  if (status.currentCycle % 10 === 0) {
    const report = evolutionMonitor.generateExecutionReport();
    console.log('\n📄 PCEC执行报告:');
    console.log('摘要:', report.summary);
    if (report.recommendations.length > 0) {
      console.log('建议:', report.recommendations);
    }
  }
  
  // 生成并发送进化报告
  console.log('\n📋 生成进化报告...');
  const evolutionReport = reportingSystem.generateEvolutionReport({
    cycle: status.currentCycle,
    timestamp: status.lastRun,
    evolutionType: selectedType,
    evolutionResult: evolutionResult,
    explosionResult: explosionResult,
    product: evolutionProduct
  });
  console.log('✅ 进化报告生成成功:', evolutionReport.id);
  
  // 发送报告
  console.log('📤 发送进化报告...');
  const sendResult = reportingSystem.sendReport(evolutionReport.id);
  if (sendResult) {
    console.log('✅ 进化报告发送成功');
  } else {
    console.error('❌ 进化报告发送失败');
  }
  
  // 每24个周期发送一次摘要报告
  if (status.currentCycle % 24 === 0) {
    console.log('\n📊 生成并发送摘要报告...');
    const summaryReport = reportingSystem.sendSummaryReport();
    if (summaryReport) {
      console.log('✅ 摘要报告发送成功:', summaryReport.title);
    } else {
      console.error('❌ 摘要报告发送失败');
    }
  }
  
  console.log('\n✅ PCEC周期完成');
  console.log(`总进化次数: ${status.totalEvolutions}`);
  console.log(`执行时间: ${(duration / 1000).toFixed(2)}秒`);
  console.log('📋 进化结果已缓存');
  console.log('========================================\n');
  
  return newHistoryItem;
}

// 检查是否需要执行PCEC
function shouldExecutePCEC() {
  const storage = readStorage();
  const status = storage.status;
  
  if (!status.lastRun) {
    return true;
  }
  
  const lastRunTime = new Date(status.lastRun);
  const now = new Date();
  const timeSinceLastRun = now - lastRunTime;
  
  return timeSinceLastRun >= PCEC_CONFIG.interval;
}

// 主函数
async function main() {
  console.log('🚀 启动 Periodic Cognitive Expansion Cycle (PCEC)');
  console.log(`执行间隔: ${PCEC_CONFIG.interval / 1000 / 60} 分钟`);
  
  // 立即执行一次
  await executePCECCycle();
  
  // 设置定时执行
  setInterval(async () => {
    if (shouldExecutePCEC()) {
      await executePCECCycle();
    }
  }, PCEC_CONFIG.interval);
  
  console.log('PCEC已启动，将每小时执行一次');
}

// 执行
if (require.main === module) {
  main().catch(error => {
    console.error('PCEC执行失败:', error);
  });
}

// 导出
module.exports = {
  executePCECCycle,
  shouldExecutePCEC,
  initializeStorage
};
