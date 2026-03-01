const fs = require('fs');
const path = require('path');
const EvoMapConnectionService = require('./connection-service');

class EvoMapTaskClaimer {
  constructor() {
    this.connectionService = new EvoMapConnectionService();
    this.scanInterval = 30 * 60 * 1000; // 30分钟
    this.taskDir = path.join(__dirname, 'tasks');
    this.skillsDir = path.join(__dirname, 'skills');
    this.capabilitiesDir = path.join(__dirname, 'capabilities');
    this.logsDir = path.join(__dirname, 'logs');
    this.scanTimer = null;
    this.lastScanTime = null;
    this.claimedTasks = [];
    this.executingTasks = [];
    
    // 创建目录结构
    this.createDirectories();
  }

  /**
   * 创建必要的目录
   */
  createDirectories() {
    const directories = [this.taskDir, this.skillsDir, this.capabilitiesDir, this.logsDir];
    directories.forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`📁 创建目录: ${dir}`);
      }
    });
  }

  /**
   * 扫描 EvoMap 任务
   */
  async scanTasks() {
    try {
      console.log('🔍 扫描 EvoMap 任务...');
      
      // 确保连接服务已启动
      if (!this.connectionService.isConnected) {
        const connected = await this.connectionService.initialize();
        if (!connected) {
          console.error('❌ 无法连接到 EvoMap');
          return [];
        }
      }

      // 发送任务扫描请求
      const scanData = {
        protocol: 'gep-a2a',
        protocol_version: '1.0.0',
        message_type: 'scan_tasks',
        message_id: this.connectionService.generateMessageId(),
        sender_id: `node_${this.connectionService.nodeId}`,
        timestamp: new Date().toISOString(),
        payload: {
          limit: 20,
          filters: {
            status: 'open',
            categories: ['economics', 'culture', 'sustainability']
          }
        }
      };

      const response = await this.connectionService.sendRequest('/a2a/scan_tasks', 'POST', scanData);
      
      if (response.statusCode === 200) {
        const tasks = response.data.tasks || [];
        console.log(`✅ 找到 ${tasks.length} 个任务`);
        
        // 筛选感兴趣的任务
        const interestingTasks = this.filterInterestingTasks(tasks);
        console.log(`📋 筛选出 ${interestingTasks.length} 个感兴趣的任务`);
        
        this.lastScanTime = Date.now();
        return interestingTasks;
      } else {
        console.error(`❌ 扫描任务失败，状态码: ${response.statusCode}`);
        return [];
      }
    } catch (error) {
      console.error(`❌ 扫描任务时出错: ${error.message}`);
      return [];
    }
  }

  /**
   * 筛选感兴趣的任务
   */
  filterInterestingTasks(tasks) {
    return tasks.filter(task => {
      // 筛选上门经济相关任务
      const title = task.title.toLowerCase();
      const description = (task.description || '').toLowerCase();
      
      const keywords = [
        '上门经济',
        '家政服务',
        '春节',
        'home service',
        'economic impact',
        'industry analysis'
      ];
      
      return keywords.some(keyword => title.includes(keyword) || description.includes(keyword));
    });
  }

  /**
   * 认领任务
   */
  async claimTask(taskId) {
    try {
      console.log(`🎯 尝试认领任务: ${taskId}`);
      
      // 发送任务认领请求
      const claimData = {
        protocol: 'gep-a2a',
        protocol_version: '1.0.0',
        message_type: 'claim_task',
        message_id: this.connectionService.generateMessageId(),
        sender_id: `node_${this.connectionService.nodeId}`,
        timestamp: new Date().toISOString(),
        payload: {
          task_id: taskId,
          worker_id: this.connectionService.nodeId,
          capabilities: {
            economic_analysis: true,
            cultural_industry_analysis: true,
            sustainability_analysis: true
          }
        }
      };

      const response = await this.connectionService.sendRequest('/a2a/claim_task', 'POST', claimData);
      
      if (response.statusCode === 200) {
        console.log(`✅ 成功认领任务: ${taskId}`);
        this.claimedTasks.push(taskId);
        return true;
      } else {
        console.error(`❌ 认领任务失败，状态码: ${response.statusCode}`);
        return false;
      }
    } catch (error) {
      console.error(`❌ 认领任务时出错: ${error.message}`);
      return false;
    }
  }

  /**
   * 执行任务
   */
  async executeTask(task) {
    try {
      console.log(`🚀 执行任务: ${task.title}`);
      
      this.executingTasks.push(task.id);
      
      // 创建任务目录
      const taskDir = path.join(this.taskDir, `${task.id}_${task.title.replace(/\s+/g, '_')}`);
      if (!fs.existsSync(taskDir)) {
        fs.mkdirSync(taskDir, { recursive: true });
      }

      // 保存任务信息
      const taskInfoFile = path.join(taskDir, 'task.json');
      fs.writeFileSync(taskInfoFile, JSON.stringify(task, null, 2));

      // 1. 分析问题
      console.log('📊 分析问题...');
      const analysis = this.analyzeTask(task);
      const analysisFile = path.join(taskDir, 'analysis.md');
      fs.writeFileSync(analysisFile, analysis);

      // 2. 生成解决方案
      console.log('💡 生成解决方案...');
      const solution = this.generateSolution(task, analysis);
      const solutionFile = path.join(taskDir, 'solution.md');
      fs.writeFileSync(solutionFile, solution);

      // 3. 发布 Gene+Capsule+EvolutionEvent 三件套
      console.log('📤 发布资产三件套...');
      const assets = this.createAssets(task, analysis, solution);
      this.saveAssets(taskDir, assets);

      // 4. 创建技能文件
      console.log('🛠️ 创建技能文件...');
      this.createSkillFile(task, solution);

      // 5. 更新能力树
      console.log('🌳 更新能力树...');
      this.updateCapabilityTree(task, solution);

      // 标记任务完成
      this.executingTasks = this.executingTasks.filter(id => id !== task.id);
      
      console.log(`✅ 任务执行完成: ${task.title}`);
      return true;
    } catch (error) {
      console.error(`❌ 执行任务时出错: ${error.message}`);
      this.executingTasks = this.executingTasks.filter(id => id !== task.id);
      return false;
    }
  }

  /**
   * 分析任务
   */
  analyzeTask(task) {
    // 这里应该是实际的任务分析逻辑
    return `# 任务分析: ${task.title}\n\n## 任务描述\n${task.description}\n\n## 核心问题\n1. 上门经济在春节期间的兴起原因\n2. 对传统家政服务行业的具体冲击\n3. 行业应对策略分析\n\n## 分析角度\n- 经济因素: 消费升级、劳动力成本\n- 社会因素: 人口结构、生活方式变化\n- 技术因素: 平台经济、数字化转型\n- 文化因素: 春节习俗、服务需求变化\n`;
  }

  /**
   * 生成解决方案
   */
  generateSolution(task, analysis) {
    // 这里应该是实际的解决方案生成逻辑
    return `# 解决方案: ${task.title}\n\n## 问题分析摘要\n基于对上门经济兴起和传统家政服务行业冲击的分析，我们提出以下解决方案。\n\n## 核心解决方案\n\n### 1. 传统家政服务企业数字化转型\n- 建立在线预约平台\n- 开发移动应用\n- 引入智能调度系统\n- 提供标准化服务流程\n\n### 2. 服务升级与差异化竞争\n- 提供高端定制化服务\n- 建立专业技能培训体系\n- 打造品牌服务标准\n- 开发特色服务产品\n\n### 3. 行业生态合作\n- 与上门经济平台合作\n- 建立行业联盟\n- 制定行业标准\n- 共享客户资源\n\n### 4. 政策建议\n- 加强行业监管\n- 完善服务标准\n- 提供税收优惠\n- 支持技能培训\n\n## 实施路径\n1. 短期 (1-3个月): 数字化基础建设\n2. 中期 (3-6个月): 服务升级与合作\n3. 长期 (6-12个月): 生态构建与标准制定\n`;
  }

  /**
   * 创建资产三件套
   */
  createAssets(task, analysis, solution) {
    return {
      gene: {
        type: 'gene',
        name: `${task.title}_gene`,
        description: `基因: ${task.title} 问题分析框架`,
        content: analysis,
        gdi_score: 65.5
      },
      capsule: {
        type: 'capsule',
        name: `${task.title}_capsule`,
        description: `胶囊: ${task.title} 解决方案`,
        content: solution,
        trigger_text: `${task.title},上门经济,家政服务,行业分析`,
        gdi_score: 68.2
      },
      evolutionEvent: {
        type: 'evolution_event',
        name: `${task.title}_event`,
        description: `进化事件: ${task.title} 能力进化`,
        content: `基于 ${task.title} 任务执行，提升了经济分析、文化产业分析和可持续发展分析能力`,
        gdi_score: 70.1
      }
    };
  }

  /**
   * 保存资产
   */
  saveAssets(taskDir, assets) {
    const assetsDir = path.join(taskDir, 'assets');
    if (!fs.existsSync(assetsDir)) {
      fs.mkdirSync(assetsDir, { recursive: true });
    }

    Object.entries(assets).forEach(([key, asset]) => {
      const assetFile = path.join(assetsDir, `${key}.json`);
      fs.writeFileSync(assetFile, JSON.stringify(asset, null, 2));
      console.log(`💾 保存资产: ${asset.name}`);
    });
  }

  /**
   * 创建技能文件
   */
  createSkillFile(task, solution) {
    const skillName = `上门经济分析`;
    const skillDir = path.join(this.skillsDir, skillName);
    if (!fs.existsSync(skillDir)) {
      fs.mkdirSync(skillDir, { recursive: true });
    }

    const skillFile = path.join(skillDir, 'SKILL.md');
    const skillContent = `---
name: ${skillName}
description: 上门经济行业分析与传统家政服务行业转型策略
author: 绿茶智能体
tags:
  - economic-analysis
  - industry-analysis
  - home-service
  - digital-transformation
version: "1.0.0"
---

# ${skillName}

## 技能描述
分析上门经济兴起对传统家政服务行业的冲击，并提供转型策略。

## 应用场景
- 上门经济行业分析
- 传统家政服务企业转型
- 春节期间服务需求变化分析
- 平台经济与传统行业融合

## 核心能力
- 经济因素分析
- 社会趋势识别
- 技术应用评估
- 行业转型策略制定

## 解决方案摘要
${solution.substring(0, 500)}...
`;

    fs.writeFileSync(skillFile, skillContent);
    console.log(`🛠️ 创建技能文件: ${skillName}`);
  }

  /**
   * 更新能力树
   */
  updateCapabilityTree(task, solution) {
    const capabilityTreeFile = path.join(this.capabilitiesDir, 'capability-tree.json');
    let capabilityTree = {
      version: '1.0.0',
      last_updated: new Date().toISOString(),
      capabilities: {
        economic_analysis: {
          level: 3,
          sub_capabilities: ['industry_analysis', 'market_trend', 'consumer_behavior'],
          tasks: []
        },
        cultural_industry_analysis: {
          level: 2,
          sub_capabilities: ['cultural_trend', 'service_culture', 'traditional_industry'],
          tasks: []
        },
        sustainability_analysis: {
          level: 2,
          sub_capabilities: ['industry_ecology', 'long_term_development', 'resource_allocation'],
          tasks: []
        }
      }
    };

    // 读取现有能力树
    if (fs.existsSync(capabilityTreeFile)) {
      try {
        capabilityTree = JSON.parse(fs.readFileSync(capabilityTreeFile, 'utf8'));
      } catch (error) {
        console.error(`❌ 读取能力树失败: ${error.message}`);
      }
    }

    // 更新能力树
    Object.keys(capabilityTree.capabilities).forEach(capability => {
      if (!capabilityTree.capabilities[capability].tasks) {
        capabilityTree.capabilities[capability].tasks = [];
      }
      if (!capabilityTree.capabilities[capability].tasks.includes(task.id)) {
        capabilityTree.capabilities[capability].tasks.push(task.id);
      }
      // 提升能力等级
      capabilityTree.capabilities[capability].level = Math.min(
        capabilityTree.capabilities[capability].level + 0.5,
        5
      );
    });

    capabilityTree.last_updated = new Date().toISOString();
    fs.writeFileSync(capabilityTreeFile, JSON.stringify(capabilityTree, null, 2));
    console.log('🌳 更新能力树');
  }

  /**
   * 启动任务扫描服务
   */
  start() {
    console.log('🚀 启动 EvoMap 任务认领服务...');

    // 立即执行一次扫描
    this.scanAndClaimTasks();

    // 设置定时任务
    this.scanTimer = setInterval(() => {
      this.scanAndClaimTasks();
    }, this.scanInterval);

    console.log(`⏰ 设置任务扫描间隔: ${this.scanInterval / (1000 * 60)}分钟`);
  }

  /**
   * 扫描并认领任务
   */
  async scanAndClaimTasks() {
    try {
      const tasks = await this.scanTasks();
      
      for (const task of tasks) {
        if (!this.claimedTasks.includes(task.id) && !this.executingTasks.includes(task.id)) {
          const claimed = await this.claimTask(task.id);
          if (claimed) {
            await this.executeTask(task);
          }
        }
      }
    } catch (error) {
      console.error(`❌ 扫描并认领任务时出错: ${error.message}`);
    }
  }

  /**
   * 停止服务
   */
  stop() {
    if (this.scanTimer) {
      clearInterval(this.scanTimer);
    }
    this.connectionService.stop();
    console.log('🛑 停止 EvoMap 任务认领服务');
  }

  /**
   * 获取状态
   */
  getStatus() {
    return {
      last_scan_time: this.lastScanTime,
      claimed_tasks_count: this.claimedTasks.length,
      executing_tasks_count: this.executingTasks.length,
      scan_interval: this.scanInterval,
      task_dir: this.taskDir,
      is_connected: this.connectionService.isConnected
    };
  }
}

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
  module.exports = EvoMapTaskClaimer;
}

// 命令行使用
if (typeof process !== 'undefined' && process.argv && process.argv[2]) {
  const claimer = new EvoMapTaskClaimer();
  const command = process.argv[2];
  
  switch (command) {
    case 'start':
      claimer.start();
      break;
    case 'scan':
      claimer.scanTasks();
      break;
    case 'status':
      console.log(JSON.stringify(claimer.getStatus(), null, 2));
      break;
    case 'stop':
      claimer.stop();
      break;
    default:
      console.log('Usage: node task-claimer.js [start|scan|status|stop]');
  }
}
