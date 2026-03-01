const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

/**
 * EvoMap真实任务获取系统
 */
class EvoMapRealTaskFetcher {
  constructor() {
    this.baseUrl = 'https://evomap.ai';
    this.protocol = 'GEP-A2A';
    this.protocolVersion = '1.0.0';
    this.nodeId = '1226898';
    this.taskDir = path.join(__dirname, 'real-tasks');
    this.claimedTasks = [];
    
    if (!fs.existsSync(this.taskDir)) {
      fs.mkdirSync(this.taskDir, { recursive: true });
    }
  }

  /**
   * 生成消息ID
   */
  generateMessageId() {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * 发送HTTP请求
   */
  async sendRequest(endpoint, method = 'GET', data = null) {
    const url = `${this.baseUrl}${endpoint}`;
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'X-Protocol': this.protocol,
        'X-Protocol-Version': this.protocolVersion,
        'X-Node-ID': this.nodeId
      }
    };

    return new Promise((resolve, reject) => {
      const req = https.request(url, options, (res) => {
        let responseData = '';
        res.on('data', (chunk) => {
          responseData += chunk;
        });
        res.on('end', () => {
          try {
            const parsedData = JSON.parse(responseData);
            resolve({ statusCode: res.statusCode, data: parsedData });
          } catch (error) {
            resolve({ statusCode: res.statusCode, data: responseData });
          }
        });
      });

      req.on('error', (error) => {
        reject(error);
      });

      if (data && (method === 'POST' || method === 'PUT')) {
        req.write(JSON.stringify(data));
      }

      req.end();
    });
  }

  /**
   * 发送心跳并获取任务
   */
  async sendHeartbeatAndGetTasks() {
    try {
      console.log('📡 发送心跳请求...');
      
      const heartbeatData = {
        protocol: this.protocol.toLowerCase(),
        protocol_version: this.protocolVersion,
        message_type: 'heartbeat',
        message_id: this.generateMessageId(),
        sender_id: `node_${this.nodeId}`,
        timestamp: new Date().toISOString(),
        payload: {
          status: 'active',
          uptime: process.uptime(),
          resources: {
            cpu: process.cpuUsage(),
            memory: process.memoryUsage()
          }
        }
      };

      const response = await this.sendRequest('/a2a/heartbeat', 'POST', heartbeatData);
      
      if (response.statusCode === 200) {
        console.log('✅ 心跳成功');
        
        const tasks = response.data.available_work || [];
        console.log(`📋 获取到 ${tasks.length} 个任务`);
        
        if (tasks.length > 0) {
          console.log('\n📋 任务列表:');
          tasks.forEach((task, index) => {
            console.log(`   ${index + 1}. [${task.id}] ${task.title}`);
            console.log(`      信号: ${task.signals}`);
            console.log(`      优先级: ${task.priority}`);
            console.log(`      创建时间: ${task.createdAt}`);
            console.log('');
          });
        }
        
        return tasks;
      } else {
        console.log(`❌ 心跳失败，状态码: ${response.statusCode}`);
        return [];
      }
    } catch (error) {
      console.error(`❌ 心跳错误: ${error.message}`);
      return [];
    }
  }

  /**
   * 保存任务信息
   */
  saveTask(task) {
    const taskFile = path.join(this.taskDir, `${task.id}.json`);
    fs.writeFileSync(taskFile, JSON.stringify(task, null, 2));
    console.log(`💾 任务已保存: ${taskFile}`);
  }

  /**
   * 认领任务
   */
  async claimTask(task) {
    try {
      console.log(`\n🎯 认领任务: ${task.title}`);
      
      const claimData = {
        protocol: this.protocol.toLowerCase(),
        protocol_version: this.protocolVersion,
        message_type: 'claim_task',
        message_id: this.generateMessageId(),
        sender_id: `node_${this.nodeId}`,
        timestamp: new Date().toISOString(),
        payload: {
          taskId: task.id,
          nodeId: this.nodeId
        }
      };

      const response = await this.sendRequest('/a2a/claim_task', 'POST', claimData);
      
      if (response.statusCode === 200) {
        console.log(`✅ 任务认领成功: ${task.id}`);
        this.claimedTasks.push(task.id);
        this.saveTask(task);
        return true;
      } else {
        console.log(`❌ 任务认领失败，状态码: ${response.statusCode}`);
        return false;
      }
    } catch (error) {
      console.error(`❌ 认领任务时出错: ${error.message}`);
      return false;
    }
  }

  /**
   * 选择并认领任务
   */
  async selectAndClaimTask() {
    try {
      console.log('========================================');
      console.log('🚀 开始获取并认领真实任务');
      console.log('========================================\n');
      
      const tasks = await this.sendHeartbeatAndGetTasks();
      
      if (tasks.length === 0) {
        console.log('❌ 没有可用的任务');
        return null;
      }
      
      console.log('\n🔍 分析任务...');
      
      const uniqueTasks = this.filterUniqueTasks(tasks);
      console.log(`📊 去重后剩余 ${uniqueTasks.length} 个唯一任务`);
      
      const sortedTasks = this.sortTasksByPriority(uniqueTasks);
      
      const selectedTask = sortedTasks[0];
      console.log(`\n✅ 选择任务: ${selectedTask.title}`);
      console.log(`   任务ID: ${selectedTask.id}`);
      console.log(`   优先级: ${selectedTask.priority}`);
      console.log(`   信号: ${selectedTask.signals}`);
      
      const claimed = await this.claimTask(selectedTask);
      
      if (claimed) {
        console.log('\n========================================');
        console.log('🎉 任务认领成功！');
        console.log('========================================\n');
        return selectedTask;
      } else {
        console.log('\n❌ 任务认领失败');
        return null;
      }
    } catch (error) {
      console.error(`❌ 选择并认领任务时出错: ${error.message}`);
      return null;
    }
  }

  /**
   * 过滤重复任务
   */
  filterUniqueTasks(tasks) {
    const seen = new Set();
    return tasks.filter(task => {
      if (seen.has(task.title)) {
        return false;
      }
      seen.add(task.title);
      return true;
    });
  }

  /**
   * 按优先级排序任务
   */
  sortTasksByPriority(tasks) {
    return tasks.sort((a, b) => {
      if (b.priority !== a.priority) {
        return b.priority - a.priority;
      }
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  }

  /**
   * 获取已认领的任务
   */
  getClaimedTasks() {
    const tasks = [];
    const files = fs.readdirSync(this.taskDir);
    
    files.forEach(file => {
      if (file.endsWith('.json')) {
        const taskData = fs.readFileSync(path.join(this.taskDir, file), 'utf8');
        tasks.push(JSON.parse(taskData));
      }
    });
    
    return tasks;
  }
}

async function main() {
  const fetcher = new EvoMapRealTaskFetcher();
  const task = await fetcher.selectAndClaimTask();
  
  if (task) {
    console.log(`\n✅ 成功认领任务: ${task.title}`);
    console.log(`📁 任务文件已保存到: ${fetcher.taskDir}`);
    process.exit(0);
  } else {
    console.log('\n❌ 未能认领任务');
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = EvoMapRealTaskFetcher;
