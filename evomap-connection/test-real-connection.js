const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

/**
 * EvoMap真实连接测试
 */
class EvoMapRealConnectionTest {
  constructor() {
    this.baseUrl = 'https://evomap.ai';
    this.protocol = 'GEP-A2A';
    this.protocolVersion = '1.0.0';
    this.nodeId = '1226498';
    this.testResults = [];
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
      console.log(`📡 发送请求: ${method} ${url}`);
      
      const req = https.request(url, options, (res) => {
        let responseData = '';
        res.on('data', (chunk) => {
          responseData += chunk;
        });
        res.on('end', () => {
          console.log(`📥 响应状态: ${res.statusCode}`);
          console.log(`📥 响应数据: ${responseData.substring(0, 200)}...`);
          
          try {
            const parsedData = JSON.parse(responseData);
            resolve({ statusCode: res.statusCode, data: parsedData });
          } catch (error) {
            resolve({ statusCode: res.statusCode, data: responseData });
          }
        });
      });

      req.on('error', (error) => {
        console.error(`❌ 请求错误: ${error.message}`);
        reject(error);
      });

      if (data && (method === 'POST' || method === 'PUT')) {
        req.write(JSON.stringify(data));
      }

      req.end();
    });
  }

  /**
   * 测试1: 基础连接测试
   */
  async testBasicConnection() {
    console.log('\n========================================');
    console.log('🧪 测试1: 基础连接测试');
    console.log('========================================\n');
    
    try {
      const response = await this.sendRequest('/');
      
      if (response.statusCode === 200) {
        console.log('✅ 基础连接测试: PASSED');
        this.testResults.push({ test: '基础连接', status: 'PASSED' });
        return true;
      } else {
        console.log(`❌ 基础连接测试: FAILED - 状态码 ${response.statusCode}`);
        this.testResults.push({ test: '基础连接', status: 'FAILED', error: `状态码 ${response.statusCode}` });
        return false;
      }
    } catch (error) {
      console.log(`❌ 基础连接测试: FAILED - ${error.message}`);
      this.testResults.push({ test: '基础连接', status: 'FAILED', error: error.message });
      return false;
    }
  }

  /**
   * 测试2: Hello握手测试
   */
  async testHelloHandshake() {
    console.log('\n========================================');
    console.log('🧪 测试2: Hello握手测试');
    console.log('========================================\n');
    
    try {
      const helloData = {
        protocol: this.protocol.toLowerCase(),
        protocol_version: this.protocolVersion,
        message_type: 'hello',
        message_id: this.generateMessageId(),
        sender_id: `node_${this.nodeId}`,
        timestamp: new Date().toISOString(),
        payload: {
          capabilities: {
            assetFetch: true,
            taskClaim: true,
            assetPublish: true,
            sessionCollaboration: true
          },
          env_fingerprint: {
            platform: process.platform,
            arch: process.arch,
            nodeVersion: process.version
          }
        }
      };

      const response = await this.sendRequest('/a2a/hello', 'POST', helloData);
      
      if (response.statusCode === 200) {
        console.log('✅ Hello握手测试: PASSED');
        console.log(`📊 响应数据: ${JSON.stringify(response.data, null, 2)}`);
        this.testResults.push({ test: 'Hello握手', status: 'PASSED' });
        return true;
      } else {
        console.log(`❌ Hello握手测试: FAILED - 状态码 ${response.statusCode}`);
        this.testResults.push({ test: 'Hello握手', status: 'FAILED', error: `状态码 ${response.statusCode}` });
        return false;
      }
    } catch (error) {
      console.log(`❌ Hello握手测试: FAILED - ${error.message}`);
      this.testResults.push({ test: 'Hello握手', status: 'FAILED', error: error.message });
      return false;
    }
  }

  /**
   * 测试3: 心跳测试
   */
  async testHeartbeat() {
    console.log('\n========================================');
    console.log('🧪 测试3: 心跳测试');
    console.log('========================================\n');
    
    try {
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
        console.log('✅ 心跳测试: PASSED');
        console.log(`📊 响应数据: ${JSON.stringify(response.data, null, 2)}`);
        this.testResults.push({ test: '心跳', status: 'PASSED' });
        return true;
      } else {
        console.log(`❌ 心跳测试: FAILED - 状态码 ${response.statusCode}`);
        this.testResults.push({ test: '心跳', status: 'FAILED', error: `状态码 ${response.statusCode}` });
        return false;
      }
    } catch (error) {
      console.log(`❌ 心跳测试: FAILED - ${error.message}`);
      this.testResults.push({ test: '心跳', status: 'FAILED', error: error.message });
      return false;
    }
  }

  /**
   * 测试4: 获取推荐资产
   */
  async testFetchPromotedAssets() {
    console.log('\n========================================');
    console.log('🧪 测试4: 获取推荐资产');
    console.log('========================================\n');
    
    try {
      const fetchData = {
        protocol: this.protocol.toLowerCase(),
        protocol_version: this.protocolVersion,
        message_type: 'fetch_promoted',
        message_id: this.generateMessageId(),
        sender_id: `node_${this.nodeId}`,
        timestamp: new Date().toISOString(),
        payload: {
          limit: 10,
          types: ['capsule', 'gene'],
          filters: {
            min_gdi: 60
          }
        }
      };

      const response = await this.sendRequest('/a2a/fetch_promoted', 'POST', fetchData);
      
      if (response.statusCode === 200) {
        const assets = response.data.assets || [];
        console.log(`✅ 获取推荐资产测试: PASSED - 获取到 ${assets.length} 个资产`);
        if (assets.length > 0) {
          console.log(`📦 资产列表:`);
          assets.forEach((asset, index) => {
            console.log(`   ${index + 1}. ${asset.name} (GDI: ${asset.gdi_score})`);
          });
        }
        this.testResults.push({ test: '获取推荐资产', status: 'PASSED', count: assets.length });
        return assets;
      } else {
        console.log(`❌ 获取推荐资产测试: FAILED - 状态码 ${response.statusCode}`);
        this.testResults.push({ test: '获取推荐资产', status: 'FAILED', error: `状态码 ${response.statusCode}` });
        return [];
      }
    } catch (error) {
      console.log(`❌ 获取推荐资产测试: FAILED - ${error.message}`);
      this.testResults.push({ test: '获取推荐资产', status: 'FAILED', error: error.message });
      return [];
    }
  }

  /**
   * 测试5: 扫描任务
   */
  async testScanTasks() {
    console.log('\n========================================');
    console.log('🧪 测试5: 扫描任务');
    console.log('========================================\n');
    
    try {
      const scanData = {
        protocol: this.protocol.toLowerCase(),
        protocol_version: this.protocolVersion,
        message_type: 'scan_tasks',
        message_id: this.generateMessageId(),
        sender_id: `node_${this.nodeId}`,
        timestamp: new Date().toISOString(),
        payload: {
          limit: 10,
          filters: {
            status: 'open',
            difficulty: ['easy', 'medium']
          }
        }
      };

      const response = await this.sendRequest('/a2a/scan_tasks', 'POST', scanData);
      
      if (response.statusCode === 200) {
        const tasks = response.data.tasks || [];
        console.log(`✅ 扫描任务测试: PASSED - 获取到 ${tasks.length} 个任务`);
        if (tasks.length > 0) {
          console.log(`📋 任务列表:`);
          tasks.forEach((task, index) => {
            console.log(`   ${index + 1}. ${task.title} (难度: ${task.difficulty}, 奖励: ${task.reward})`);
          });
        }
        this.testResults.push({ test: '扫描任务', status: 'PASSED', count: tasks.length });
        return tasks;
      } else {
        console.log(`❌ 扫描任务测试: FAILED - 状态码 ${response.statusCode}`);
        this.testResults.push({ test: '扫描任务', status: 'FAILED', error: `状态码 ${response.statusCode}` });
        return [];
      }
    } catch (error) {
      console.log(`❌ 扫描任务测试: FAILED - ${error.message}`);
      this.testResults.push({ test: '扫描任务', status: 'FAILED', error: error.message });
      return [];
    }
  }

  /**
   * 运行所有测试
   */
  async runAllTests() {
    console.log('========================================');
    console.log('🚀 开始EvoMap真实连接测试');
    console.log('========================================');
    console.log(`📍 基础URL: ${this.baseUrl}`);
    console.log(`🔑 节点ID: ${this.nodeId}`);
    console.log(`📡 协议: ${this.protocol} v${this.protocolVersion}`);
    console.log('');

    const results = {
      basicConnection: await this.testBasicConnection(),
      helloHandshake: await this.testHelloHandshake(),
      heartbeat: await this.testHeartbeat(),
      promotedAssets: await this.testFetchPromotedAssets(),
      tasks: await this.testScanTasks()
    };

    console.log('\n========================================');
    console.log('📋 测试结果汇总');
    console.log('========================================\n');
    
    const totalTests = this.testResults.length;
    const passedTests = this.testResults.filter(r => r.status === 'PASSED').length;
    const passRate = ((passedTests / totalTests) * 100).toFixed(2);
    
    console.log(`总测试数: ${totalTests}`);
    console.log(`通过测试: ${passedTests}`);
    console.log(`失败测试: ${totalTests - passedTests}`);
    console.log(`通过率: ${passRate}%`);
    console.log('');
    
    if (this.testResults.some(r => r.status === 'FAILED')) {
      console.log('❌ 失败的测试:');
      this.testResults.filter(r => r.status === 'FAILED').forEach(result => {
        console.log(`   - ${result.test}: ${result.error}`);
      });
    }
    
    console.log('\n========================================');
    console.log('🎯 结论');
    console.log('========================================\n');
    
    if (results.basicConnection && results.helloHandshake && results.heartbeat) {
      console.log('✅ EvoMap连接正常，可以进行真实任务操作');
      console.log(`📦 可用资产: ${results.promotedAssets.length} 个`);
      console.log(`📋 可用任务: ${results.tasks.length} 个`);
      return {
        success: true,
        connection: 'OK',
        assets: results.promotedAssets,
        tasks: results.tasks
      };
    } else {
      console.log('❌ EvoMap连接异常，无法进行真实任务操作');
      return {
        success: false,
        connection: 'FAILED',
        testResults: this.testResults
      };
    }
  }
}

async function main() {
  const tester = new EvoMapRealConnectionTest();
  const result = await tester.runAllTests();
  
  process.exit(result.success ? 0 : 1);
}

if (require.main === module) {
  main();
}

module.exports = EvoMapRealConnectionTest;
