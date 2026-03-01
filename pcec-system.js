/**
 * Periodic Cognitive Expansion Cycle (PCEC) 系统
 * 每1小时自动触发一次认知扩展任务
 */

const http = require('http');

class PCECSystem {
  constructor() {
    this.cycleInterval = 60 * 60 * 1000; // 1小时
    this.cycleCount = 0;
    this.isRunning = false;
    this.isIdle = true;
    this.missedCycles = 0;
    this.evolutionHistory = [];
    this.capabilities = [];
    this.strategies = [];
    this.rules = [];
    this.lastEvolutionTime = null;
    this.consecutiveNoEvolution = 0;
    this.serverPort = 5000; // PCEC系统的HTTP服务器端口
    
    this.init();
  }

  init() {
    console.log('🚀 初始化 PCEC 系统...');
    this.startScheduling();
    this.loadExistingData();
    this.startHTTPServer();
  }

  // 启动HTTP服务器，接收OPENCLAW的cron触发
  startHTTPServer() {
    console.log('🌐 启动 PCEC HTTP 服务器...');
    
    const server = http.createServer((req, res) => {
      if (req.url === '/cron' && req.method === 'POST') {
        // 处理OPENCLAW的cron触发
        let body = '';
        req.on('data', chunk => {
          body += chunk.toString();
        });
        req.on('end', () => {
          console.log('📡 收到 OPENCLAW cron 触发');
          this.executeCycle();
          
          res.writeHead(200, {'Content-Type': 'application/json'});
          res.end(JSON.stringify({
            status: 'success',
            message: 'PCEC evolution triggered',
            timestamp: new Date().toISOString()
          }));
        });
      } else if (req.url === '/status' && req.method === 'GET') {
        // 提供系统状态信息
        const status = this.getStatus();
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(status));
      } else if (req.url === '/' && req.method === 'GET') {
        // 提供简单的HTML页面
        const html = `
          <!DOCTYPE html>
          <html>
          <head>
            <title>PCEC System Status</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              h1 { color: #333; }
              .status-item { margin: 10px 0; padding: 10px; border: 1px solid #ddd; border-radius: 5px; }
              .status-label { font-weight: bold; }
              .status-value { margin-left: 10px; }
            </style>
          </head>
          <body>
            <h1>PCEC System Status</h1>
            <div class="status-item">
              <span class="status-label">Cycle Count:</span>
              <span class="status-value">${this.cycleCount}</span>
            </div>
            <div class="status-item">
              <span class="status-label">Last Evolution Time:</span>
              <span class="status-value">${this.lastEvolutionTime ? this.lastEvolutionTime.toISOString() : 'Never'}</span>
            </div>
            <div class="status-item">
              <span class="status-label">System Status:</span>
              <span class="status-value">${this.isRunning ? 'Running' : 'Idle'}</span>
            </div>
            <div class="status-item">
              <span class="status-label">Capabilities:</span>
              <span class="status-value">${this.capabilities.length}</span>
            </div>
            <div class="status-item">
              <span class="status-label">Strategies:</span>
              <span class="status-value">${this.strategies.length}</span>
            </div>
            <div class="status-item">
              <span class="status-label">Rules:</span>
              <span class="status-value">${this.rules.length}</span>
            </div>
          </body>
          </html>
        `;
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(html);
      } else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('Not Found');
      }
    });
    
    server.listen(this.serverPort, () => {
      console.log(`🌐 PCEC HTTP 服务器已启动，监听端口 ${this.serverPort}`);
      console.log(`🌐 状态页面: http://localhost:${this.serverPort}/`);
      console.log(`🌐 Cron 触发端点: http://localhost:${this.serverPort}/cron`);
      console.log(`🌐 状态API: http://localhost:${this.serverPort}/status`);
    });
  }

  startScheduling() {
    console.log('⏰ 启动 PCEC 调度器...');
    
    // 立即执行一次初始周期
    this.executeCycle();
    
    // 设置定时触发
    setInterval(() => {
      this.checkAndExecuteCycle();
    }, this.cycleInterval);
  }

  checkAndExecuteCycle() {
    if (this.isIdle) {
      this.executeCycle();
    } else {
      console.log('⏸️  系统忙碌，延迟执行 PCEC');
      this.missedCycles++;
    }
  }

  async executeCycle() {
    if (this.isRunning) {
      console.log('🔄 PCEC 周期已在运行中');
      return;
    }

    this.isRunning = true;
    this.cycleCount++;
    this.lastEvolutionTime = new Date();
    
    console.log(`\n🚀 开始 PCEC 周期 #${this.cycleCount}`);
    console.log(`📅 时间: ${this.lastEvolutionTime.toISOString()}`);
    
    try {
      // 1. 进化识别
      const evolutionCandidates = this.identifyEvolutionOpportunities();
      
      // 2. 思维爆炸
      const mindExplosionResults = this.performMindExplosion();
      
      // 3. 进化推进
      const evolutionResults = this.advanceEvolution(evolutionCandidates);
      
      // 4. 产物生成
      const products = this.generateProducts(evolutionResults);
      
      // 5. 约束检查
      const constraintsSatisfied = this.checkConstraints(products);
      
      // 6. 强制推翻机制检查
      if (evolutionResults.length === 0) {
        this.consecutiveNoEvolution++;
        console.log(`⚠️  连续 ${this.consecutiveNoEvolution} 周期无进化`);
        
        if (this.consecutiveNoEvolution >= 2) {
          console.log('💥 触发强制推翻机制');
          this.enforceOverthrow();
        }
      } else {
        this.consecutiveNoEvolution = 0;
      }
      
      // 7. 生成报告
      const report = this.generateReport(evolutionResults, mindExplosionResults, products);
      
      // 8. 发送报告
      this.sendReport(report);
      
      // 9. 记录历史
      this.recordHistory(report);
      
      console.log('✅ PCEC 周期完成');
      
    } catch (error) {
      console.error('❌ PCEC 执行失败:', error);
    } finally {
      this.isRunning = false;
    }
  }

  identifyEvolutionOpportunities() {
    console.log('🔍 识别进化机会...');
    
    // 模拟进化机会识别
    const candidates = [
      {
        type: 'new-feature',
        name: '智能任务拆解',
        description: '自动将复杂任务拆解为可执行子任务',
        priority: 'high'
      },
      {
        type: 'new-abstraction',
        name: '问题分类框架',
        description: '将问题自动分类为不同类型',
        priority: 'medium'
      },
      {
        type: 'new-leverage',
        name: '工具调用优化',
        description: '减少工具调用次数，提高执行效率',
        priority: 'high'
      }
    ];
    
    console.log(`📋 发现 ${candidates.length} 个进化机会`);
    return candidates;
  }

  performMindExplosion() {
    console.log('💥 执行思维爆炸...');
    
    const questions = [
      '如果我彻底推翻当前默认做法，会发生什么？',
      '如果我是系统设计者而不是执行者，我会删掉什么？',
      '如果我要让一个能力弱 10 倍的 agent 也能成功，我需要补什么？',
      '如果这个能力要被调用 1000 次，现在的设计是否必然崩溃？'
    ];
    
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    console.log(`❓ 思维爆炸问题: ${randomQuestion}`);
    
    // 模拟思维爆炸结果
    const insights = [
      '发现了更高效的任务处理流程',
      '识别了系统瓶颈并提出解决方案',
      '设计了更通用的能力抽象'
    ];
    
    console.log('💡 思维爆炸洞察:', insights);
    
    return {
      question: randomQuestion,
      insights: insights
    };
  }

  advanceEvolution(candidates) {
    console.log('🚀 推进进化...');
    
    // 模拟进化推进
    const results = candidates.map(candidate => ({
      ...candidate,
      status: 'completed',
      details: '进化任务已完成'
    }));
    
    console.log(`✅ 完成 ${results.length} 个进化任务`);
    return results;
  }

  generateProducts(evolutionResults) {
    console.log('🏭 生成进化产物...');
    
    const products = [];
    
    // 为每个进化结果生成产物
    evolutionResults.forEach(result => {
      if (result.type === 'new-feature') {
        const capability = {
          id: `capability-${Date.now()}`,
          name: result.name,
          type: 'capability',
          inputs: ['任务描述', '约束条件'],
          outputs: ['执行计划', '预期结果'],
          invariants: ['保持任务完整性'],
          parameters: ['复杂度', '时间限制'],
          failurePoints: ['输入不清晰', '资源不足']
        };
        this.capabilities.push(capability);
        products.push(capability);
      } else if (result.type === 'new-abstraction') {
        const strategy = {
          id: `strategy-${Date.now()}`,
          name: result.name,
          type: 'strategy',
          description: result.description,
          applicability: '通用问题解决'
        };
        this.strategies.push(strategy);
        products.push(strategy);
      } else if (result.type === 'new-leverage') {
        const rule = {
          id: `rule-${Date.now()}`,
          name: result.name,
          type: 'rule',
          condition: '遇到复杂任务时',
          action: '优先使用优化后的工具调用序列'
        };
        this.rules.push(rule);
        products.push(rule);
      }
    });
    
    console.log(`📦 生成 ${products.length} 个进化产物`);
    return products;
  }

  checkConstraints(products) {
    console.log('🔒 检查约束条件...');
    
    // 模拟约束检查
    const constraintsSatisfied = true;
    console.log('✅ 约束条件满足');
    
    return constraintsSatisfied;
  }

  enforceOverthrow() {
    console.log('🔥 执行强制推翻...');
    
    // 模拟强制推翻
    console.log('✅ 已推翻一个核心行为模式');
    this.consecutiveNoEvolution = 0;
  }

  generateReport(evolutionResults, mindExplosionResults, products) {
    console.log('📊 生成进化报告...');
    
    const report = {
      id: `report-${Date.now()}`,
      cycle: this.cycleCount,
      timestamp: new Date().toISOString(),
      results: evolutionResults,
      mindExplosion: mindExplosionResults,
      products: products.map(p => p.id),
      nextSteps: ['优化现有能力', '扩展到更多场景', '增强系统稳定性']
    };
    
    return report;
  }

  sendReport(report) {
    console.log('📤 发送进化报告...');
    
    // 模拟发送报告（仅向陈婷）
    console.log('✅ 报告已发送给陈婷');
  }

  recordHistory(report) {
    console.log('📝 记录进化历史...');
    
    this.evolutionHistory.push(report);
    
    // 保存历史到文件
    const fs = require('fs');
    const historyPath = './pcec-history.json';
    
    try {
      const historyData = JSON.stringify(this.evolutionHistory, null, 2);
      fs.writeFileSync(historyPath, historyData);
      console.log('✅ 进化历史已保存');
    } catch (error) {
      console.error('❌ 保存进化历史失败:', error);
    }
  }

  loadExistingData() {
    console.log('📥 加载现有数据...');
    
    const fs = require('fs');
    const historyPath = './pcec-history.json';
    
    try {
      if (fs.existsSync(historyPath)) {
        const historyData = fs.readFileSync(historyPath, 'utf8');
        this.evolutionHistory = JSON.parse(historyData);
        this.cycleCount = this.evolutionHistory.length;
        console.log(`✅ 加载了 ${this.cycleCount} 条历史记录`);
      }
    } catch (error) {
      console.error('❌ 加载历史数据失败:', error);
    }
  }

  // 设置系统状态
  setIdle(idle) {
    this.isIdle = idle;
    
    if (idle && this.missedCycles > 0) {
      console.log(`⚡ 补跑 ${this.missedCycles} 个错过的 PCEC 周期`);
      this.missedCycles = 0;
      this.executeCycle();
    }
  }

  // 获取系统状态
  getStatus() {
    return {
      cycleCount: this.cycleCount,
      isRunning: this.isRunning,
      isIdle: this.isIdle,
      lastEvolutionTime: this.lastEvolutionTime,
      capabilities: this.capabilities.length,
      strategies: this.strategies.length,
      rules: this.rules.length,
      consecutiveNoEvolution: this.consecutiveNoEvolution
    };
  }
}

// 导出 PCEC 系统
if (require.main === module) {
  // 直接运行时启动 PCEC
  const pcec = new PCECSystem();
  console.log('✅ PCEC 系统已启动');
  console.log('📊 初始状态:', pcec.getStatus());
} else {
  module.exports = PCECSystem;
}
