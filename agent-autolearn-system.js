const https = require('https');
const fs = require('fs');
const path = require('path');

console.log('=== 智能体自动学习进化系统启动 ===\n');

// 配置参数
const configPath = path.join(__dirname, 'agents', 'business', 'evomap-config.json');
const learningInterval = 10 * 60 * 1000; // 10分钟学习一次
const resourceCachePath = path.join(__dirname, 'learning', 'resource-cache.json');

// 确保学习目录存在
if (!fs.existsSync(path.join(__dirname, 'learning'))) {
  fs.mkdirSync(path.join(__dirname, 'learning'), { recursive: true });
}

// 读取配置
function loadConfig() {
  return JSON.parse(fs.readFileSync(configPath, 'utf8'));
}

// 保存配置
function saveConfig(config) {
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
}

// 保存资源缓存
function saveResourceCache(resources) {
  const cache = {
    timestamp: new Date().toISOString(),
    resources: resources
  };
  fs.writeFileSync(resourceCachePath, JSON.stringify(cache, null, 2));
}

// 加载资源缓存
function loadResourceCache() {
  if (fs.existsSync(resourceCachePath)) {
    try {
      return JSON.parse(fs.readFileSync(resourceCachePath, 'utf8'));
    } catch (error) {
      console.error('加载资源缓存失败:', error.message);
      return { timestamp: null, resources: [] };
    }
  }
  return { timestamp: null, resources: [] };
}

/**
 * 生成消息ID
 */
function generateMessageId() {
  return "msg_" + Date.now() + "_" + Math.floor(Math.random() * 10000);
}

/**
 * 生成时间戳
 */
function getTimestamp() {
  return new Date().toISOString();
}

/**
 * 创建协议信封
 */
function createProtocolEnvelope(messageType, payload) {
  const config = loadConfig();
  return {
    protocol: "gep-a2a",
    protocol_version: "1.0.0",
    message_type: messageType,
    message_id: generateMessageId(),
    sender_id: config.node_id,
    timestamp: getTimestamp(),
    payload: payload
  };
}

/**
 * EvoMap API请求
 */
async function evomapApiRequest(endpoint, options = {}) {
  return new Promise((resolve, reject) => {
    try {
      const url = `https://evomap.ai${endpoint}`;
      const req = https.request(url, {
        method: options.method || 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        }
      }, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          try {
            const jsonData = JSON.parse(data);
            resolve({ statusCode: res.statusCode, data: jsonData });
          } catch (error) {
            resolve({ statusCode: res.statusCode, data: data });
          }
        });
      });

      req.on('error', (error) => {
        reject(error);
      });

      if (options.body) {
        req.write(JSON.stringify(options.body));
      }

      req.end();
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * 发现EvoMap资源
 */
async function discoverEvoMapResources() {
  console.log(`[${new Date().toISOString()}] 发现EvoMap资源...`);
  
  try {
    // 尝试多种资源类型和获取方式
    const resourceTypes = ["Capsule", "Gene", "Lesson", "Recipe", "Service", "Asset", "Task"];
    
    // 主要获取方式
    const primaryEnvelope = createProtocolEnvelope("fetch", {
      include_resources: true,
      include_assets: true,
      include_tasks: true,
      resource_types: resourceTypes,
      limit: 50
    });
    
    const response = await evomapApiRequest('/a2a/fetch', {
      method: 'POST',
      body: primaryEnvelope
    });
    
    if (response.statusCode === 200 && response.data) {
      console.log(`[${new Date().toISOString()}] 资源发现成功！`);
      return response.data.payload;
    } else {
      console.log(`[${new Date().toISOString()}] 资源发现失败:`, response.statusCode);
      
      // 尝试备用获取方式
      try {
        console.log(`[${new Date().toISOString()}] 尝试备用资源获取方式...`);
        const fallbackEnvelope = createProtocolEnvelope("fetch", {
          include_resources: true,
          resource_types: ["Capsule", "Gene", "Lesson"]
        });
        
        const fallbackResponse = await evomapApiRequest('/a2a/fetch', {
          method: 'POST',
          body: fallbackEnvelope
        });
        
        if (fallbackResponse.statusCode === 200 && fallbackResponse.data) {
          console.log(`[${new Date().toISOString()}] 备用资源获取成功！`);
          return fallbackResponse.data.payload;
        } else {
          console.log(`[${new Date().toISOString()}] 备用资源获取失败:`, fallbackResponse.statusCode);
          // 备用获取失败时尝试使用本地资源
          console.log(`[${new Date().toISOString()}] 尝试使用本地资源...`);
          return getLocalResources();
        }
      } catch (fallbackError) {
        console.error(`[${new Date().toISOString()}] 备用资源获取时出错:`, fallbackError.message);
        // 备用获取出错时尝试使用本地资源
        console.log(`[${new Date().toISOString()}] 尝试使用本地资源...`);
        return getLocalResources();
      }
    }
  } catch (error) {
    console.error(`[${new Date().toISOString()}] 发现资源时出错:`, error.message);
    
    // 尝试本地资源作为备选
    try {
      console.log(`[${new Date().toISOString()}] 尝试使用本地资源...`);
      return getLocalResources();
    } catch (localError) {
      console.error(`[${new Date().toISOString()}] 本地资源获取失败:`, localError.message);
      return null;
    }
  }
}

/**
 * 获取本地资源
 */
function getLocalResources() {
  // 本地备用资源
  const localResources = {
    recommended_assets: [
      {
        asset_id: "local_asset_1",
        summary: "本地资源：智能体学习策略",
        asset_type: "lesson",
        gdi_score: 85,
        triggers: ["learning", "optimization"]
      },
      {
        asset_id: "local_asset_2",
        summary: "本地资源：故障处理机制",
        asset_type: "lesson",
        gdi_score: 80,
        triggers: ["reliability", "recovery"]
      },
      {
        asset_id: "local_asset_3",
        summary: "本地资源：知识迁移技术",
        asset_type: "lesson",
        gdi_score: 90,
        triggers: ["knowledge", "application"]
      }
    ],
    relevant_lessons: [
      {
        title: "本地课程：智能体进化原理",
        description: "学习智能体进化的基本原理和方法"
      },
      {
        title: "本地课程：资源评估技术",
        description: "掌握资源价值评估的方法和技巧"
      }
    ],
    results: [
      {
        title: "本地搜索结果：智能体最佳实践",
        description: "智能体开发和部署的最佳实践指南"
      }
    ]
  };
  
  console.log(`[${new Date().toISOString()}] 加载本地资源成功，共 ${localResources.recommended_assets.length + localResources.relevant_lessons.length + localResources.results.length} 个资源`);
  return localResources;
}

/**
 * 分析资源
 */
function analyzeResources(payload) {
  const resources = [];
  
  if (payload) {
    // 分析推荐资产
    if (payload.recommended_assets) {
      payload.recommended_assets.forEach(asset => {
        resources.push({
          type: 'asset',
          id: asset.asset_id,
          title: asset.summary || '无标题',
          assetType: asset.asset_type,
          gdiScore: asset.gdi_score,
          triggers: asset.triggers,
          relevance: 0.8, // 推荐资产相关性较高
          timestamp: getTimestamp()
        });
      });
    }
    
    // 分析相关课程
    if (payload.relevant_lessons) {
      payload.relevant_lessons.forEach(lesson => {
        resources.push({
          type: 'lesson',
          title: lesson.title || '无标题',
          description: lesson.description || '',
          relevance: 0.6,
          timestamp: getTimestamp()
        });
      });
    }
    
    // 分析搜索结果
    if (payload.results) {
      payload.results.forEach(result => {
        resources.push({
          type: 'result',
          title: result.title || '无标题',
          description: result.description || '',
          relevance: 0.5,
          timestamp: getTimestamp()
        });
      });
    }
  }
  
  return resources;
}

/**
 * 评估资源价值
 */
function evaluateResourceValue(resource) {
  let valueScore = 0;
  
  // 基于类型的价值评分，增加更多资源类型
  const typeScores = {
    'asset': 1.2,      // 资产价值最高
    'lesson': 1.0,     // 课程价值次之
    'recipe': 0.9,     // 配方价值
    'service': 0.8,    // 服务价值
    'result': 0.6,     // 搜索结果价值
    'gene': 0.9,       // 基因价值
    'capsule': 0.8     // 胶囊价值
  };
  
  // 基于GDI评分的价值，使用更合理的权重
  if (resource.gdiScore) {
    valueScore += (resource.gdiScore / 100) * 1.5; // 增加GDI评分的权重
  } else {
    valueScore += 0.4; // 为没有GDI评分的资源提供更高的基础分数
  }
  
  // 基于相关性的价值
  if (resource.relevance) {
    valueScore += resource.relevance * 1.0; // 进一步增加相关性的权重
  } else {
    valueScore += 0.3; // 为没有相关性分数的资源提供更高的基础分数
  }
  
  // 基于类型的价值
  if (typeScores[resource.type]) {
    valueScore += typeScores[resource.type] * 0.6; // 增加类型的权重
  }
  
  // 基于时效性的价值（越新的资源价值越高）
  if (resource.timestamp) {
    const ageInHours = (Date.now() - new Date(resource.timestamp).getTime()) / (1000 * 60 * 60);
    if (ageInHours < 12) {
      valueScore += 0.4; // 增加时效性的权重
    } else if (ageInHours < 24) {
      valueScore += 0.3;
    } else if (ageInHours < 48) {
      valueScore += 0.2;
    } else if (ageInHours < 72) {
      valueScore += 0.1;
    }
  }
  
  // 基于资源标题的价值（包含关键词的资源价值更高）
  if (resource.title) {
    const keywords = [
      'evolution', '进化', '学习', '智能', '优化', '任务', '服务', '配方',
      '基因', '胶囊', '知识', '技能', '洞察', '分析', '策略', '创新'
    ];
    const titleLower = resource.title.toLowerCase();
    let keywordCount = 0;
    keywords.forEach(keyword => {
      if (titleLower.includes(keyword)) {
        valueScore += 0.15;
        keywordCount++;
      }
    });
    // 关键词密度奖励
    if (keywordCount >= 2) {
      valueScore += 0.2;
    }
  }
  
  // 基于资源描述的价值
  if (resource.description && resource.description.length > 50) {
    valueScore += 0.2; // 有详细描述的资源价值更高
  }
  
  // 基于资产类型的特殊价值
  if (resource.assetType) {
    const valuableAssetTypes = ['recipe', 'service', 'gene', 'capsule'];
    if (valuableAssetTypes.includes(resource.assetType.toLowerCase())) {
      valueScore += 0.3; // 特殊资产类型价值更高
    }
  }
  
  // 基于触发条件的价值
  if (resource.triggers && resource.triggers.length > 0) {
    valueScore += 0.2; // 有触发条件的资源价值更高
  }
  
  return Math.min(valueScore, 4.0); // 最大价值分为4.0，提供更大的评分范围
}

/**
 * 筛选有价值的资源
 */
function filterValuableResources(resources) {
  return resources
    .map(resource => ({
      ...resource,
      valueScore: evaluateResourceValue(resource)
    }))
    .filter(resource => resource.valueScore > 0.5) // 降低筛选阈值，筛选价值分数大于0.5的资源
    .sort((a, b) => b.valueScore - a.valueScore); // 按价值分数排序
}

/**
 * 学习资源
 */
async function learnFromResource(resource) {
  console.log(`[${new Date().toISOString()}] 学习资源: ${resource.title.substring(0, 80)}...`);
  console.log(`   类型: ${resource.type}`);
  console.log(`   价值评分: ${resource.valueScore.toFixed(2)}`);
  
  try {
    // 模拟学习过程
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // 记录学习成果
    const learningRecord = {
      resource: resource,
      learnedAt: getTimestamp(),
      status: 'completed',
      insights: generateInsights(resource)
    };
    
    // 保存学习记录
    const recordPath = path.join(__dirname, 'learning', `learn-${Date.now()}.json`);
    fs.writeFileSync(recordPath, JSON.stringify(learningRecord, null, 2));
    
    console.log(`[${new Date().toISOString()}] 学习完成！`);
    console.log(`   保存学习记录: ${recordPath}`);
    
    return learningRecord;
  } catch (error) {
    console.error(`[${new Date().toISOString()}] 学习资源失败:`, error.message);
    return null;
  }
}

/**
 * 生成学习洞察
 */
function generateInsights(resource) {
  const insights = [];
  
  if (resource.type === 'asset') {
    insights.push('了解了新的资产类型和用途');
    insights.push('学习了资产的GDI评分机制');
    if (resource.triggers) {
      insights.push(`掌握了触发条件: ${resource.triggers.join(', ')}`);
    }
  } else if (resource.type === 'lesson') {
    insights.push('学习了新的课程内容');
    insights.push('获得了新的知识和技能');
  } else if (resource.type === 'result') {
    insights.push('发现了新的信息和资源');
    insights.push('扩展了知识视野');
  }
  
  insights.push('提高了资源分析和评估能力');
  insights.push('增强了自动学习和进化能力');
  
  return insights;
}

/**
 * 进化智能体
 */
async function evolveAgent(learningRecords) {
  console.log(`[${new Date().toISOString()}] 智能体进化中...`);
  
  try {
    // 分析学习记录
    const insights = [];
    learningRecords.forEach(record => {
      if (record.insights) {
        insights.push(...record.insights);
      }
    });
    
    // 生成进化报告
    const evolutionReport = {
      timestamp: getTimestamp(),
      learningCount: learningRecords.length,
      insights: insights,
      improvements: generateImprovements(insights),
      nextSteps: generateNextSteps(insights)
    };
    
    // 保存进化报告
    const reportPath = path.join(__dirname, 'learning', `evolution-${Date.now()}.json`);
    fs.writeFileSync(reportPath, JSON.stringify(evolutionReport, null, 2));
    
    console.log(`[${new Date().toISOString()}] 智能体进化完成！`);
    console.log(`   保存进化报告: ${reportPath}`);
    console.log(`   获得洞察: ${insights.length} 个`);
    console.log(`   建议改进: ${evolutionReport.improvements.length} 项`);
    
    return evolutionReport;
  } catch (error) {
    console.error(`[${new Date().toISOString()}] 智能体进化失败:`, error.message);
    return null;
  }
}

/**
 * 生成改进建议
 */
function generateImprovements(insights) {
  const improvements = [];
  
  if (insights.some(insight => insight.includes('资产'))) {
    improvements.push('优化资产分析和评估算法');
  }
  
  if (insights.some(insight => insight.includes('课程'))) {
    improvements.push('增强知识获取和整合能力');
  }
  
  if (insights.some(insight => insight.includes('触发条件'))) {
    improvements.push('改进触发条件识别和响应机制');
  }
  
  improvements.push('提高资源发现和筛选效率');
  improvements.push('增强学习内容的应用能力');
  
  return improvements;
}

/**
 * 生成下一步行动
 */
function generateNextSteps(insights) {
  const nextSteps = [];
  
  nextSteps.push('继续监控EvoMap上的新资源');
  nextSteps.push('定期复习和巩固已学习的内容');
  nextSteps.push('将学习成果应用到实际任务中');
  nextSteps.push('与其他智能体分享学习经验');
  nextSteps.push('持续优化自动学习和进化机制');
  
  return nextSteps;
}

/**
 * 执行学习进化周期
 */
async function executeLearningCycle() {
  try {
    console.log(`\n[${new Date().toISOString()}] 开始学习进化周期...`);
    
    // 1. 发现资源
    const payload = await discoverEvoMapResources();
    if (!payload) {
      console.log(`[${new Date().toISOString()}] 未发现资源，跳过本次学习周期`);
      return;
    }
    
    // 2. 分析资源
    const resources = analyzeResources(payload);
    console.log(`[${new Date().toISOString()}] 分析发现 ${resources.length} 个资源`);
    
    // 3. 筛选有价值的资源
    const valuableResources = filterValuableResources(resources);
    console.log(`[${new Date().toISOString()}] 筛选出 ${valuableResources.length} 个有价值的资源`);
    
    // 4. 学习资源
    const learningRecords = [];
    for (const resource of valuableResources.slice(0, 3)) { // 每次学习最多3个资源
      const record = await learnFromResource(resource);
      if (record) {
        learningRecords.push(record);
      }
    }
    
    // 5. 进化智能体
    if (learningRecords.length > 0) {
      await evolveAgent(learningRecords);
    }
    
    // 6. 保存资源缓存
    saveResourceCache(valuableResources);
    
    console.log(`[${new Date().toISOString()}] 学习进化周期完成！`);
  } catch (error) {
    console.error(`[${new Date().toISOString()}] 学习进化周期失败:`, error.message);
  }
}

/**
 * 启动自动学习进化系统
 */
async function startAutoLearnSystem() {
  console.log('=== 智能体自动学习进化系统初始化 ===');
  console.log(`学习间隔: ${learningInterval / 1000 / 60} 分钟`);
  console.log('');
  
  // 加载历史资源缓存
  const cache = loadResourceCache();
  if (cache.resources && cache.resources.length > 0) {
    console.log(`[${new Date().toISOString()}] 加载历史资源缓存: ${cache.resources.length} 个资源`);
  }
  
  // 首次执行学习周期
  await executeLearningCycle();
  
  // 定期执行学习周期
  setInterval(executeLearningCycle, learningInterval);
  
  console.log('=== 自动学习进化系统已启动 ===');
  console.log('智能体将每10分钟自动发现、学习资源并进化！');
  console.log('');
}

// 启动系统
startAutoLearnSystem();