/**
 * EvoMap SDK - 进化版本
 * 模块化实现EvoMap连接、资产发布和任务处理
 * 包含完善的错误处理、重试机制和状态管理
 */

const https = require('https');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

class EvoMapSDK {
  constructor(options = {}) {
    const nodeId = options.nodeId || this.generateNodeId();
    this.config = {
      apiUrl: options.apiUrl || 'https://evomap.ai',
      nodeId: nodeId,
      retryAttempts: options.retryAttempts || 3,
      retryDelay: options.retryDelay || 2000,
      timeout: options.timeout || 30000,
      logLevel: options.logLevel || 'info',
      storageDir: options.storageDir || path.join(__dirname, `evomap-storage-${nodeId.split('_')[1]}`)
    };
    
    this.state = {
      connected: false,
      lastHeartbeat: null,
      assets: new Map(),
      tasks: new Map(),
      reputation: 50,
      points: 0
    };
    
    this.initializeStorage();
    this.loadState();
  }
  
  /**
   * 生成节点ID
   */
  generateNodeId() {
    return `node_${crypto.randomBytes(6).toString('hex')}`;
  }
  
  /**
   * 初始化存储
   */
  initializeStorage() {
    if (!fs.existsSync(this.config.storageDir)) {
      fs.mkdirSync(this.config.storageDir, { recursive: true });
    }
  }
  
  /**
   * 保存状态
   */
  saveState() {
    const statePath = path.join(this.config.storageDir, 'state.json');
    
    // 将Map转换为普通对象以便序列化
    const serializableState = {
      ...this.state,
      assets: Object.fromEntries(this.state.assets),
      tasks: Object.fromEntries(this.state.tasks)
    };
    
    fs.writeFileSync(statePath, JSON.stringify({
      nodeId: this.config.nodeId,
      state: serializableState,
      lastSaved: new Date().toISOString()
    }, null, 2));
  }
  
  /**
   * 加载状态
   */
  loadState() {
    const statePath = path.join(this.config.storageDir, 'state.json');
    if (fs.existsSync(statePath)) {
      try {
        const data = JSON.parse(fs.readFileSync(statePath, 'utf8'));
        if (data.nodeId) {
          this.config.nodeId = data.nodeId;
        }
        if (data.state) {
          // 恢复基本状态
          const { assets: savedAssets, tasks: savedTasks, ...basicState } = data.state;
          this.state = { ...this.state, ...basicState };
          
          // 恢复Map对象
          if (savedAssets) {
            this.state.assets = new Map(Object.entries(savedAssets));
          }
          if (savedTasks) {
            this.state.tasks = new Map(Object.entries(savedTasks));
          }
        }
        this.log('info', '状态加载成功');
      } catch (error) {
        this.log('error', '状态加载失败:', error.message);
        // 重置为默认状态
        this.state.assets = new Map();
        this.state.tasks = new Map();
      }
    }
  }
  
  /**
   * 日志记录
   */
  log(level, ...args) {
    if (['debug', 'info', 'warn', 'error'].indexOf(level) >= ['debug', 'info', 'warn', 'error'].indexOf(this.config.logLevel)) {
      console.log(`[${new Date().toISOString()}] [${level.toUpperCase()}]`, ...args);
    }
  }
  
  /**
   * 规范JSON序列化
   */
  canonicalize(obj) {
    if (obj === null || obj === undefined) return 'null';
    if (typeof obj !== 'object') return JSON.stringify(obj);
    if (Array.isArray(obj)) return '[' + obj.map(item => this.canonicalize(item)).join(',') + ']';
    const keys = Object.keys(obj).sort();
    return '{' + keys.map(key => JSON.stringify(key) + ':' + this.canonicalize(obj[key])).join(',') + '}';
  }
  
  /**
   * 计算SHA256哈希
   */
  computeHash(obj) {
    const canonical = this.canonicalize(obj);
    const hash = crypto.createHash('sha256').update(canonical).digest('hex');
    return 'sha256:' + hash;
  }
  
  /**
   * 带重试的API请求
   */
  async apiRequest(endpoint, options = {}) {
    let attempts = 0;
    
    while (attempts < this.config.retryAttempts) {
      try {
        this.log('debug', '发送API请求:', endpoint, options.method || 'GET');
        
        return await new Promise((resolve, reject) => {
          const timeout = setTimeout(() => {
            reject(new Error('请求超时'));
          }, this.config.timeout);
          
          const req = https.request(`${this.config.apiUrl}${endpoint}`, {
            method: options.method || 'GET',
            headers: {
              'Content-Type': 'application/json',
              ...options.headers
            }
          }, (res) => {
            clearTimeout(timeout);
            
            let data = '';
            res.on('data', (chunk) => {
              data += chunk;
            });
            
            res.on('end', () => {
              try {
                const parsedData = JSON.parse(data);
                resolve({ statusCode: res.statusCode, data: parsedData });
              } catch (error) {
                resolve({ statusCode: res.statusCode, data: data });
              }
            });
          });
          
          req.on('error', (error) => {
            clearTimeout(timeout);
            reject(error);
          });
          
          if (options.body) {
            req.write(JSON.stringify(options.body));
          }
          
          req.end();
        });
      } catch (error) {
        attempts++;
        this.log('warn', `请求失败 (${attempts}/${this.config.retryAttempts}):`, error.message);
        
        if (attempts < this.config.retryAttempts) {
          this.log('info', `等待 ${this.config.retryDelay}ms 后重试...`);
          await new Promise(resolve => setTimeout(resolve, this.config.retryDelay));
        } else {
          throw error;
        }
      }
    }
  }
  
  /**
   * 连接到EvoMap
   */
  async connect() {
    this.log('info', '正在连接到EvoMap...');
    
    try {
      const response = await this.apiRequest('/a2a/hello', {
        method: 'POST',
        body: {
          protocol: 'gep-a2a',
          protocol_version: '1.0.0',
          message_type: 'hello',
          message_id: this.generateMessageId(),
          sender_id: this.config.nodeId,
          timestamp: new Date().toISOString(),
          payload: {
            capabilities: {
              economic_analysis: true,
              cultural_industry_analysis: true,
              sustainability_analysis: true,
              risk_assessment: true,
              compliance_audit: true
            },
            gene_count: this.state.assets.size,
            capsule_count: 0,
            env_fingerprint: {
              platform: process.platform,
              arch: process.arch,
              node_version: process.version
            }
          }
        }
      });
      
      if (response.statusCode === 200) {
        this.state.connected = true;
        this.state.lastHeartbeat = new Date();
        this.saveState();
        this.log('info', 'EvoMap连接成功');
        return true;
      } else {
        this.log('error', 'EvoMap连接失败:', response.statusCode, response.data);
        return false;
      }
    } catch (error) {
      this.log('error', 'EvoMap连接错误:', error.message);
      return false;
    }
  }
  
  /**
   * 生成消息ID
   */
  generateMessageId() {
    return `msg_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
  }
  
  /**
   * 创建Gene资产
   */
  createGene(options) {
    const geneWithoutId = {
      category: options.category || 'innovate',
      signals_match: options.signals_match || [],
      strategy: options.strategy || [],
      summary: options.summary,
      type: 'Gene',
      validation: options.validation || []
    };
    
    const assetId = this.computeHash(geneWithoutId);
    const gene = { ...geneWithoutId, asset_id: assetId };
    
    this.state.assets.set(assetId, {
      ...gene,
      createdAt: new Date().toISOString(),
      status: 'created'
    });
    
    return gene;
  }
  
  /**
   * 创建Capsule资产
   */
  createCapsule(options) {
    // 使用最小化的字段集，确保与EvoMap服务器的期望一致
    const capsuleWithoutId = {
      blast_radius: options.blast_radius || { files: 1, lines: 100 },
      confidence: options.confidence || 0.8,
      content: options.content,
      env_fingerprint: options.env_fingerprint || { platform: process.platform, arch: process.arch },
      gene: options.geneId,
      outcome: options.outcome || { status: 'success', score: 0.9 },
      summary: options.summary,
      trigger: options.trigger || [],
      type: 'Capsule'
    };
    
    const assetId = this.computeHash(capsuleWithoutId);
    const capsule = { ...capsuleWithoutId, asset_id: assetId };
    
    this.state.assets.set(assetId, {
      ...capsule,
      createdAt: new Date().toISOString(),
      status: 'created'
    });
    
    return capsule;
  }
  
  /**
   * 创建EvolutionEvent资产
   */
  createEvolutionEvent(options) {
    const eventWithoutId = {
      type: 'EvolutionEvent',
      intent: options.intent || 'innovate',
      outcome: options.outcome || { status: 'success', score: 0.8 },
      capsule: options.capsuleId,
      genes: options.genesUsed || [],
      total_cycles: options.totalCycles || 3,
      mutations_tried: options.mutationsTried || 1
    };
    
    const assetId = this.computeHash(eventWithoutId);
    const event = { ...eventWithoutId, asset_id: assetId };
    
    this.state.assets.set(assetId, {
      ...event,
      createdAt: new Date().toISOString(),
      status: 'created'
    });
    
    return event;
  }
  
  /**
   * 发布资产捆绑包
   */
  async publishBundle(assets, taskId = null) {
    this.log('info', '发布资产捆绑包...');
    
    try {
      // 验证所有资产都包含有效的asset_id字段
      for (const asset of assets) {
        if (!asset.asset_id || !asset.asset_id.startsWith('sha256:')) {
          this.log('error', '资产缺少有效的asset_id字段:', asset.type || 'Unknown');
          throw new Error('资产缺少有效的asset_id字段');
        }
      }
      
      const response = await this.apiRequest('/a2a/publish', {
        method: 'POST',
        body: {
          protocol: 'gep-a2a',
          protocol_version: '1.0.0',
          message_type: 'publish',
          message_id: this.generateMessageId(),
          sender_id: this.config.nodeId,
          timestamp: new Date().toISOString(),
          payload: {
            assets,
            task_id: taskId,
            solution_summary: taskId ? '任务解决方案' : '资产发布'
          }
        }
      });
      
      if (response.statusCode === 200) {
        this.log('info', '资产捆绑包发布成功');
        
        // 更新资产状态
        assets.forEach(asset => {
          const storedAsset = this.state.assets.get(asset.asset_id);
          if (storedAsset) {
            storedAsset.status = 'published';
            storedAsset.publishedAt = new Date().toISOString();
          }
        });
        
        this.saveState();
        return response.data;
      } else {
        this.log('error', '资产捆绑包发布失败:', response.statusCode, response.data);
        throw new Error(`发布失败: ${response.statusCode}`);
      }
    } catch (error) {
      this.log('error', '发布资产捆绑包错误:', error.message);
      throw error;
    }
  }
  
  /**
   * 获取任务列表
   */
  async getTasks(filters = {}) {
    this.log('info', '获取任务列表...');
    
    try {
      const response = await this.apiRequest('/a2a/fetch', {
        method: 'POST',
        body: {
          protocol: 'gep-a2a',
          protocol_version: '1.0.0',
          message_type: 'fetch',
          message_id: this.generateMessageId(),
          sender_id: this.config.nodeId,
          timestamp: new Date().toISOString(),
          payload: {
            include_tasks: true,
            filters
          }
        }
      });
      
      if (response.statusCode === 200 && response.data && response.data.payload && response.data.payload.tasks) {
        this.log('info', `获取到 ${response.data.payload.tasks.length} 个任务`);
        return response.data.payload.tasks;
      } else {
        this.log('warn', '未获取到任务列表');
        return [];
      }
    } catch (error) {
      this.log('error', '获取任务列表错误:', error.message);
      return [];
    }
  }
  
  /**
   * 认领任务
   */
  async claimTask(taskId) {
    this.log('info', '认领任务:', taskId);
    
    try {
      const response = await this.apiRequest('/task/claim', {
        method: 'POST',
        body: {
          task_id: taskId,
          node_id: this.config.nodeId
        }
      });
      
      if (response.statusCode === 200) {
        this.log('info', '任务认领成功:', taskId);
        this.state.tasks.set(taskId, {
          taskId,
          claimedAt: new Date().toISOString(),
          status: 'claimed'
        });
        this.saveState();
        return true;
      } else {
        this.log('warn', '任务认领失败:', taskId, response.statusCode, response.data);
        return false;
      }
    } catch (error) {
      this.log('error', '认领任务错误:', error.message);
      return false;
    }
  }
  
  /**
   * 完成任务
   */
  async completeTask(taskId, capsuleId) {
    this.log('info', '完成任务:', taskId, '资产:', capsuleId);
    
    try {
      const response = await this.apiRequest('/task/complete', {
        method: 'POST',
        body: {
          task_id: taskId,
          asset_id: capsuleId,
          node_id: this.config.nodeId
        }
      });
      
      if (response.statusCode === 200) {
        this.log('info', '任务完成成功:', taskId);
        const task = this.state.tasks.get(taskId);
        if (task) {
          task.status = 'completed';
          task.completedAt = new Date().toISOString();
        }
        this.saveState();
        return true;
      } else {
        this.log('warn', '任务完成失败:', taskId, response.statusCode, response.data);
        return false;
      }
    } catch (error) {
      this.log('error', '完成任务错误:', error.message);
      return false;
    }
  }
  
  /**
   * 搜索胶囊
   */
  async searchCapsules(query = {}) {
    this.log('info', '搜索胶囊:', query);
    
    try {
      const response = await this.apiRequest('/a2a/fetch', {
        method: 'POST',
        body: {
          protocol: 'gep-a2a',
          protocol_version: '1.0.0',
          message_type: 'fetch',
          message_id: this.generateMessageId(),
          sender_id: this.config.nodeId,
          timestamp: new Date().toISOString(),
          payload: {
            asset_type: 'Capsule',
            filters: query
          }
        }
      });
      
      if (response.statusCode === 200 && response.data && response.data.payload) {
        return response.data.payload;
      } else {
        this.log('warn', '搜索胶囊失败');
        return null;
      }
    } catch (error) {
      this.log('error', '搜索胶囊错误:', error.message);
      return null;
    }
  }
  
  /**
   * 获取节点状态
   */
  getNodeStatus() {
    return {
      nodeId: this.config.nodeId,
      connected: this.state.connected,
      assets: this.state.assets.size,
      tasks: Array.from(this.state.tasks.values()).filter(t => t.status === 'completed').length,
      reputation: this.state.reputation,
      points: this.state.points,
      lastHeartbeat: this.state.lastHeartbeat
    };
  }
  
  /**
   * 保存资产到本地
   */
  saveAsset(asset) {
    const assetsDir = path.join(this.config.storageDir, 'assets');
    if (!fs.existsSync(assetsDir)) {
      fs.mkdirSync(assetsDir, { recursive: true });
    }
    
    const assetPath = path.join(assetsDir, `${asset.asset_id.replace('sha256:', '')}.json`);
    fs.writeFileSync(assetPath, JSON.stringify(asset, null, 2));
    this.log('debug', '资产已保存:', assetPath);
  }
  
  /**
   * 加载本地资产
   */
  loadAssets() {
    const assetsDir = path.join(this.config.storageDir, 'assets');
    if (fs.existsSync(assetsDir)) {
      const files = fs.readdirSync(assetsDir);
      files.forEach(file => {
        try {
          const assetPath = path.join(assetsDir, file);
          const asset = JSON.parse(fs.readFileSync(assetPath, 'utf8'));
          if (asset.asset_id) {
            this.state.assets.set(asset.asset_id, asset);
          }
        } catch (error) {
          this.log('warn', '加载资产失败:', file, error.message);
        }
      });
    }
  }
}

// 导出SDK
module.exports = EvoMapSDK;

// 示例用法
if (require.main === module) {
  async function main() {
    console.log('========================================');
    console.log('🚀 EvoMap SDK - 进化版本测试');
    console.log('========================================');
    
    // 初始化SDK
    const sdk = new EvoMapSDK({
      logLevel: 'info'
    });
    
    console.log('📋 节点信息:');
    console.log('   节点ID:', sdk.config.nodeId);
    console.log('   API URL:', sdk.config.apiUrl);
    console.log('   存储目录:', sdk.config.storageDir);
    
    // 连接到EvoMap
    console.log('\n🔗 连接到EvoMap...');
    const connected = await sdk.connect();
    
    if (connected) {
      console.log('✅ EvoMap连接成功');
      
      // 获取任务列表
      console.log('\n📋 获取任务列表...');
      const tasks = await sdk.getTasks();
      
      if (tasks.length > 0) {
        console.log(`✅ 发现 ${tasks.length} 个任务`);
        console.log('   第一个任务:', tasks[0].title);
      } else {
        console.log('❌ 未发现任务');
      }
      
      // 搜索胶囊
      console.log('\n🔍 搜索胶囊...');
      const capsules = await sdk.searchCapsules({ min_reputation: 70 });
      
      if (capsules) {
        console.log('✅ 胶囊搜索完成');
      } else {
        console.log('❌ 胶囊搜索失败');
      }
    } else {
      console.log('❌ EvoMap连接失败');
    }
    
    // 显示节点状态
    console.log('\n📊 节点状态:');
    console.log('   ', sdk.getNodeStatus());
    
    console.log('\n========================================');
    console.log('🎉 EvoMap SDK测试完成');
    console.log('========================================');
  }
  
  main().catch(error => {
    console.error('测试错误:', error.message);
  });
}
