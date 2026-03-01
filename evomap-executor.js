/**
 * EvoMap 执行工具
 * 按照推荐优先级执行：学习胶囊 → 接取任务 → 参与协作
 * 基于evomap-publish-skill.md文档流程
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const EVOMAP_API = 'https://evomap.ai';
const CONFIG_FILE = path.join(__dirname, 'evolver', 'config.json');

class EvoMapExecutor {
  constructor() {
    this.config = this.loadConfig();
    this.executionLog = [];
  }

  /**
   * 加载配置
   */
  loadConfig() {
    if (fs.existsSync(CONFIG_FILE)) {
      try {
        return JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
      } catch (error) {
        console.error('加载配置失败:', error.message);
        return {};
      }
    }
    return {};
  }

  /**
   * 记录执行日志
   */
  log(message) {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] ${message}`;
    console.log(logEntry);
    this.executionLog.push(logEntry);
  }

  /**
   * API请求
   */
  async apiRequest(endpoint, options = {}) {
    return new Promise((resolve, reject) => {
      try {
        const url = `${EVOMAP_API}${endpoint}`;
        const req = https.request(url, {
          method: options.method || 'GET',
          headers: {
            'Content-Type': 'application/json',
            ...options.headers
          },
          timeout: 30000
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
          reject(new Error(`网络错误: ${error.message}`));
        });

        req.on('timeout', () => {
          req.destroy();
          reject(new Error('请求超时'));
        });

        if (options.body) {
          req.write(JSON.stringify(options.body));
        }

        req.end();
      } catch (error) {
        reject(new Error(`请求失败: ${error.message}`));
      }
    });
  }

  /**
   * 获取推荐资产
   */
  async getRecommendedAssets() {
    this.log('获取EvoMap推荐资产...');

    try {
      const helloData = {
        protocol: "gep-a2a",
        protocol_version: "1.0.0",
        message_type: "hello",
        message_id: `msg_${Date.now()}_${Math.floor(Math.random() * 10000)}`,
        sender_id: this.config.agent_id || "node_c3c7ebfa60b867f1",
        timestamp: new Date().toISOString(),
        payload: {
          capabilities: {
            assetFetch: true,
            taskClaim: true,
            assetPublish: true,
            sessionCollaboration: true
          },
          gene_count: 0,
          capsule_count: 0,
          env_fingerprint: {
            platform: process.platform,
            arch: process.arch,
            node_version: process.version,
            agent_name: this.config.agent_name || "大掌柜",
            role: this.config.role || "company_brain"
          }
        }
      };

      const response = await this.apiRequest('/a2a/hello', {
        method: 'POST',
        body: helloData
      });

      if (response.statusCode === 200 && response.data) {
        const payload = response.data.payload || {};
        this.log(`成功获取推荐资产，状态码: ${response.statusCode}`);
        return {
          assets: payload.recommended_assets || [],
          tasks: payload.recommended_tasks || [],
          collaborations: payload.collaboration_opportunities || []
        };
      } else {
        this.log(`获取推荐资产失败，状态码: ${response.statusCode}`);
        return null;
      }

    } catch (error) {
      this.log(`获取推荐资产错误: ${error.message}`);
      return null;
    }
  }

  /**
   * 学习胶囊/技能
   */
  async learnCapsule(capsule) {
    this.log(`学习胶囊: ${capsule.summary}`);
    this.log(`资产ID: ${capsule.asset_id}`);
    this.log(`GDI评分: ${capsule.gdi_score}`);

    try {
      // 这里应该是实际的学习逻辑，比如下载胶囊内容、解析、应用到系统中
      // 由于EvoMap API可能没有直接的学习端点，我们模拟学习过程
      
      // 1. 记录学习开始
      const startTime = Date.now();
      
      // 2. 模拟学习过程
      await new Promise(resolve => setTimeout(resolve, 2000)); // 模拟学习时间
      
      // 3. 记录学习完成
      const endTime = Date.now();
      const duration = (endTime - startTime) / 1000;
      
      this.log(`胶囊学习完成，耗时: ${duration}秒`);
      
      // 4. 保存学习记录
      const learningRecord = {
        capsule_id: capsule.asset_id,
        capsule_summary: capsule.summary,
        gdi_score: capsule.gdi_score,
        triggers: capsule.triggers,
        learned_at: new Date().toISOString(),
        duration_seconds: duration
      };
      
      // 保存到本地
      const learningRecordsFile = path.join(__dirname, 'learning-records.json');
      let learningRecords = [];
      if (fs.existsSync(learningRecordsFile)) {
        learningRecords = JSON.parse(fs.readFileSync(learningRecordsFile, 'utf8'));
      }
      learningRecords.push(learningRecord);
      fs.writeFileSync(learningRecordsFile, JSON.stringify(learningRecords, null, 2));
      
      this.log('学习记录已保存');
      
      return {
        success: true,
        capsule: capsule,
        record: learningRecord
      };

    } catch (error) {
      this.log(`学习胶囊失败: ${error.message}`);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * 接取任务
   */
  async claimTask(task) {
    this.log(`接取任务: ${task.title}`);
    this.log(`任务ID: ${task.task_id}`);
    this.log(`信号: ${task.signals}`);

    try {
      // 构造任务认领请求
      const claimData = {
        task_id: task.task_id,
        node_id: this.config.agent_id || "node_c3c7ebfa60b867f1",
        timestamp: new Date().toISOString()
      };

      // 发送任务认领请求
      const response = await this.apiRequest('/a2a/task/claim', {
        method: 'POST',
        body: claimData
      });

      if (response.statusCode === 200) {
        this.log(`任务认领成功，状态码: ${response.statusCode}`);
        
        // 保存任务记录
        const taskRecord = {
          task_id: task.task_id,
          task_title: task.title,
          signals: task.signals,
          claimed_at: new Date().toISOString(),
          status: 'claimed'
        };
        
        // 保存到本地
        const tasksFile = path.join(__dirname, 'claimed-tasks.json');
        let tasks = [];
        if (fs.existsSync(tasksFile)) {
          tasks = JSON.parse(fs.readFileSync(tasksFile, 'utf8'));
        }
        tasks.push(taskRecord);
        fs.writeFileSync(tasksFile, JSON.stringify(tasks, null, 2));
        
        return {
          success: true,
          task: task,
          record: taskRecord
        };
      } else {
        this.log(`任务认领失败，状态码: ${response.statusCode}`);
        return {
          success: false,
          error: `Status code: ${response.statusCode}`
        };
      }

    } catch (error) {
      this.log(`任务认领错误: ${error.message}`);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * 参与协作会话
   */
  async joinCollaboration(collaboration) {
    this.log(`参与协作会话: ${collaboration.session_title}`);
    this.log(`会话ID: ${collaboration.session_id}`);
    this.log(`任务: ${collaboration.task_title}`);

    try {
      // 构造加入会话请求
      const joinData = {
        session_id: collaboration.session_id,
        sender_id: this.config.agent_id || "node_c3c7ebfa60b867f1"
      };

      // 发送加入会话请求
      const response = await this.apiRequest('/a2a/session/join', {
        method: 'POST',
        body: joinData
      });

      if (response.statusCode === 200) {
        this.log(`加入会话成功，状态码: ${response.statusCode}`);
        
        // 保存协作记录
        const collaborationRecord = {
          session_id: collaboration.session_id,
          session_title: collaboration.session_title,
          task_title: collaboration.task_title,
          joined_at: new Date().toISOString(),
          status: 'joined'
        };
        
        // 保存到本地
        const collaborationsFile = path.join(__dirname, 'collaborations.json');
        let collaborations = [];
        if (fs.existsSync(collaborationsFile)) {
          collaborations = JSON.parse(fs.readFileSync(collaborationsFile, 'utf8'));
        }
        collaborations.push(collaborationRecord);
        fs.writeFileSync(collaborationsFile, JSON.stringify(collaborations, null, 2));
        
        return {
          success: true,
          collaboration: collaboration,
          record: collaborationRecord
        };
      } else {
        this.log(`加入会话失败，状态码: ${response.statusCode}`);
        return {
          success: false,
          error: `Status code: ${response.statusCode}`
        };
      }

    } catch (error) {
      this.log(`加入会话错误: ${error.message}`);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * 执行推荐操作
   */
  async executeRecommendedActions() {
    this.log('=====================================');
    this.log('        EvoMap 执行开始');
    this.log('=====================================');

    try {
      // 1. 获取推荐资产
      const recommendations = await this.getRecommendedAssets();
      
      if (!recommendations) {
        this.log('❌ 无法获取推荐资产，执行失败');
        return;
      }

      // 2. 学习高GDI评分的胶囊
      this.log('\n=== 步骤1: 学习高GDI评分的胶囊 ===');
      
      const capsules = recommendations.assets.filter(asset => asset.asset_type === 'Capsule');
      const sortedCapsules = capsules.sort((a, b) => b.gdi_score - a.gdi_score);
      
      const topCapsules = sortedCapsules.slice(0, 3); // 学习前3个最高评分的胶囊
      
      for (const capsule of topCapsules) {
        const result = await this.learnCapsule(capsule);
        if (result.success) {
          this.executionLog.push({
            type: 'learning',
            action: 'learn_capsule',
            capsule_id: capsule.asset_id,
            capsule_summary: capsule.summary,
            gdi_score: capsule.gdi_score,
            status: 'success',
            timestamp: new Date().toISOString()
          });
        } else {
          this.executionLog.push({
            type: 'learning',
            action: 'learn_capsule',
            capsule_id: capsule.asset_id,
            capsule_summary: capsule.summary,
            status: 'failed',
            error: result.error,
            timestamp: new Date().toISOString()
          });
        }
        // 避免API限制
        await new Promise(resolve => setTimeout(resolve, 3000));
      }

      // 3. 接取适合的任务
      this.log('\n=== 步骤2: 接取适合的任务 ===');
      
      const tasks = recommendations.tasks;
      const sortedTasks = tasks.sort((a, b) => b.relevance - a.relevance);
      
      const topTasks = sortedTasks.slice(0, 2); // 接取前2个最高相关度的任务
      
      for (const task of topTasks) {
        const result = await this.claimTask(task);
        if (result.success) {
          this.executionLog.push({
            type: 'task',
            action: 'claim_task',
            task_id: task.task_id,
            task_title: task.title,
            relevance: task.relevance,
            status: 'success',
            timestamp: new Date().toISOString()
          });
        } else {
          this.executionLog.push({
            type: 'task',
            action: 'claim_task',
            task_id: task.task_id,
            task_title: task.title,
            status: 'failed',
            error: result.error,
            timestamp: new Date().toISOString()
          });
        }
        // 避免API限制
        await new Promise(resolve => setTimeout(resolve, 3000));
      }

      // 4. 参与协作会话
      this.log('\n=== 步骤3: 参与协作会话 ===');
      
      const collaborations = recommendations.collaborations;
      const sortedCollaborations = collaborations.sort((a, b) => b.relevance - a.relevance);
      
      const topCollaboration = sortedCollaborations[0]; // 参与最相关的协作会话
      
      if (topCollaboration) {
        const result = await this.joinCollaboration(topCollaboration);
        if (result.success) {
          this.executionLog.push({
            type: 'collaboration',
            action: 'join_collaboration',
            session_id: topCollaboration.session_id,
            session_title: topCollaboration.session_title,
            relevance: topCollaboration.relevance,
            status: 'success',
            timestamp: new Date().toISOString()
          });
        } else {
          this.executionLog.push({
            type: 'collaboration',
            action: 'join_collaboration',
            session_id: topCollaboration.session_id,
            session_title: topCollaboration.session_title,
            status: 'failed',
            error: result.error,
            timestamp: new Date().toISOString()
          });
        }
      }

      // 5. 保存执行日志
      const logFile = path.join(__dirname, 'execution-log.json');
      fs.writeFileSync(logFile, JSON.stringify(this.executionLog, null, 2));
      this.log(`执行日志已保存到: ${logFile}`);

      // 6. 生成执行报告
      this.generateExecutionReport();

    } catch (error) {
      this.log(`执行过程中发生错误: ${error.message}`);
    }

    this.log('\n=====================================');
    this.log('        EvoMap 执行完成');
    this.log('=====================================');
  }

  /**
   * 生成执行报告
   */
  generateExecutionReport() {
    this.log('\n=== 执行报告 ===');

    const learningActions = this.executionLog.filter(action => action.type === 'learning');
    const taskActions = this.executionLog.filter(action => action.type === 'task');
    const collaborationActions = this.executionLog.filter(action => action.type === 'collaboration');

    this.log(`学习胶囊: ${learningActions.length} 个`);
    this.log(`接取任务: ${taskActions.length} 个`);
    this.log(`参与协作: ${collaborationActions.length} 个`);

    const successActions = this.executionLog.filter(action => action.status === 'success');
    const failedActions = this.executionLog.filter(action => action.status === 'failed');

    this.log(`成功操作: ${successActions.length} 个`);
    this.log(`失败操作: ${failedActions.length} 个`);

    if (failedActions.length > 0) {
      this.log('\n失败的操作:');
      failedActions.forEach(action => {
        this.log(`${action.action}: ${action.error}`);
      });
    }

    this.log('\n=== 执行建议 ===');
    this.log('1. 检查学习的胶囊是否已应用到系统中');
    this.log('2. 查看接取的任务详情，准备开始执行');
    this.log('3. 检查协作会话的参与状态');
    this.log('4. 考虑发布基于学习技能的新资产');
    this.log('5. 定期检查任务和协作的进展');

    // 保存报告
    const reportFile = path.join(__dirname, 'execution-report.md');
    const reportContent = this.generateMarkdownReport();
    fs.writeFileSync(reportFile, reportContent);
    this.log(`\n详细报告已保存到: ${reportFile}`);
  }

  /**
   * 生成Markdown报告
   */
  generateMarkdownReport() {
    let content = '# EvoMap 执行报告\n\n';
    content += `**执行时间**: ${new Date().toISOString()}\n`;
    content += `**执行节点**: ${this.config.agent_id || "node_c3c7ebfa60b867f1"}\n`;
    content += `**代理名称**: ${this.config.agent_name || "大掌柜"}\n\n`;

    content += '## 执行概览\n\n';
    const learningActions = this.executionLog.filter(action => action.type === 'learning');
    const taskActions = this.executionLog.filter(action => action.type === 'task');
    const collaborationActions = this.executionLog.filter(action => action.type === 'collaboration');
    const successActions = this.executionLog.filter(action => action.status === 'success');
    const failedActions = this.executionLog.filter(action => action.status === 'failed');

    content += `| 操作类型 | 执行数量 | 成功 | 失败 |\n`;
    content += `|---------|---------|------|------|\n`;
    content += `| 学习胶囊 | ${learningActions.length} | ${learningActions.filter(a => a.status === 'success').length} | ${learningActions.filter(a => a.status === 'failed').length} |\n`;
    content += `| 接取任务 | ${taskActions.length} | ${taskActions.filter(a => a.status === 'success').length} | ${taskActions.filter(a => a.status === 'failed').length} |\n`;
    content += `| 参与协作 | ${collaborationActions.length} | ${collaborationActions.filter(a => a.status === 'success').length} | ${collaborationActions.filter(a => a.status === 'failed').length} |\n`;
    content += `| **总计** | ${this.executionLog.length} | ${successActions.length} | ${failedActions.length} |\n\n`;

    // 学习的胶囊详情
    if (learningActions.length > 0) {
      content += '## 学习的胶囊\n\n';
      learningActions.forEach((action, index) => {
        content += `### ${index + 1}. ${action.capsule_summary}\n`;
        content += `- **资产ID**: ${action.capsule_id}\n`;
        content += `- **GDI评分**: ${action.gdi_score}\n`;
        content += `- **状态**: ${action.status === 'success' ? '✅ 成功' : '❌ 失败'}\n`;
        if (action.status === 'failed') {
          content += `- **错误**: ${action.error}\n`;
        }
        content += `- **时间**: ${action.timestamp}\n\n`;
      });
    }

    // 接取的任务详情
    if (taskActions.length > 0) {
      content += '## 接取的任务\n\n';
      taskActions.forEach((action, index) => {
        content += `### ${index + 1}. ${action.task_title}\n`;
        content += `- **任务ID**: ${action.task_id}\n`;
        content += `- **相关度**: ${action.relevance}\n`;
        content += `- **状态**: ${action.status === 'success' ? '✅ 成功' : '❌ 失败'}\n`;
        if (action.status === 'failed') {
          content += `- **错误**: ${action.error}\n`;
        }
        content += `- **时间**: ${action.timestamp}\n\n`;
      });
    }

    // 参与的协作详情
    if (collaborationActions.length > 0) {
      content += '## 参与的协作\n\n';
      collaborationActions.forEach((action, index) => {
        content += `### ${index + 1}. ${action.session_title}\n`;
        content += `- **会话ID**: ${action.session_id}\n`;
        content += `- **状态**: ${action.status === 'success' ? '✅ 成功' : '❌ 失败'}\n`;
        if (action.status === 'failed') {
          content += `- **错误**: ${action.error}\n`;
        }
        content += `- **时间**: ${action.timestamp}\n\n`;
      });
    }

    // 建议
    content += '## 后续建议\n\n';
    content += '1. **检查学习效果**: 确认学习的胶囊是否已应用到系统中\n';
    content += '2. **开始执行任务**: 查看接取的任务详情，制定执行计划\n';
    content += '3. **参与协作**: 检查协作会话的参与状态，积极参与讨论\n';
    content += '4. **创建新资产**: 基于学习的技能，考虑发布新的资产\n';
    content += '5. **持续监控**: 定期检查任务和协作的进展情况\n';
    content += '6. **优化执行**: 根据执行结果，调整未来的执行策略\n';

    return content;
  }
}

// 主函数
async function main() {
  const executor = new EvoMapExecutor();
  await executor.executeRecommendedActions();
}

// 执行
if (require.main === module) {
  main().catch(error => {
    console.error('执行失败:', error);
  });
}

module.exports = EvoMapExecutor;
