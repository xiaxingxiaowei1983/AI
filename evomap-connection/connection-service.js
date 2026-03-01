const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

class EvoMapConnectionService {
  constructor() {
    this.baseUrl = 'https://evomap.ai';
    this.protocol = 'GEP-A2A';
    this.protocolVersion = '1.0.0';
    this.nodeId = 'node_1d3769e8db37e512'; // 使用正确格式的节点ID
    this.heartbeatInterval = 15 * 60 * 1000; // 15分钟
    this.reconnectDelay = 30 * 1000; // 30秒
    this.isConnected = false;
    this.heartbeatTimer = null;
    this.reconnectTimer = null;
    this.connectionAttempts = 0;
    this.maxReconnectAttempts = 10;
    this.lastHeartbeatTime = null;
    this.status = 'disconnected';
    this.logs = [];
    
    // 创建日志目录
    this.logDir = path.join(__dirname, 'logs');
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
    
    // 创建状态文件
    this.statusFile = path.join(__dirname, 'status.json');
    this.saveStatus();
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
        reject(error);
      });

      if (data && (method === 'POST' || method === 'PUT')) {
        req.write(JSON.stringify(data));
      }

      req.end();
    });
  }

  /**
   * 发送心跳
   */
  async sendHeartbeat() {
    try {
      const heartbeatData = {
        protocol: this.protocol.toLowerCase(),
        protocol_version: this.protocolVersion,
        message_type: 'heartbeat',
        message_id: this.generateMessageId(),
        sender_id: `node_${this.nodeId}`,
        timestamp: new Date().toISOString(),
        payload: {
          status: this.status,
          uptime: process.uptime(),
          resources: {
            cpu: process.cpuUsage(),
            memory: process.memoryUsage()
          }
        }
      };

      const response = await this.sendRequest('/a2a/heartbeat', 'POST', heartbeatData);
      
      if (response.statusCode === 200) {
        this.isConnected = true;
        this.status = 'connected';
        this.lastHeartbeatTime = Date.now();
        this.connectionAttempts = 0;
        this.log('info', 'Heartbeat sent successfully');
        return true;
      } else {
        this.isConnected = false;
        this.status = 'disconnected';
        this.log('error', `Heartbeat failed with status ${response.statusCode}`);
        return false;
      }
    } catch (error) {
      this.isConnected = false;
      this.status = 'disconnected';
      this.log('error', `Heartbeat error: ${error.message}`);
      return false;
    } finally {
      this.saveStatus();
    }
  }

  /**
   * 初始化连接
   */
  async initialize() {
    try {
      this.log('info', 'Initializing EvoMap connection...');
      this.status = 'connecting';
      this.saveStatus();

      // 发送hello请求
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
        this.isConnected = true;
        this.status = 'connected';
        this.log('info', 'Connection initialized successfully');
        this.startHeartbeat();
        return true;
      } else {
        this.isConnected = false;
        this.status = 'disconnected';
        this.log('error', `Initialization failed with status ${response.statusCode}`);
        this.scheduleReconnect();
        return false;
      }
    } catch (error) {
      this.isConnected = false;
      this.status = 'disconnected';
      this.log('error', `Initialization error: ${error.message}`);
      this.scheduleReconnect();
      return false;
    } finally {
      this.saveStatus();
    }
  }

  /**
   * 开始心跳
   */
  startHeartbeat() {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
    }

    this.heartbeatTimer = setInterval(async () => {
      const success = await this.sendHeartbeat();
      if (!success) {
        this.scheduleReconnect();
      }
    }, this.heartbeatInterval);

    this.log('info', 'Heartbeat started');
  }

  /**
   * 安排重连
   */
  scheduleReconnect() {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
    }

    if (this.connectionAttempts < this.maxReconnectAttempts) {
      this.connectionAttempts++;
      this.status = 'reconnecting';
      this.saveStatus();
      
      this.log('info', `Scheduling reconnect attempt ${this.connectionAttempts}/${this.maxReconnectAttempts}`);
      
      this.reconnectTimer = setTimeout(async () => {
        this.log('info', 'Attempting to reconnect...');
        const success = await this.initialize();
        if (!success) {
          this.scheduleReconnect();
        }
      }, this.reconnectDelay);
    } else {
      this.status = 'failed';
      this.saveStatus();
      this.log('error', 'Max reconnect attempts reached');
    }
  }

  /**
   * 停止服务
   */
  stop() {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
    }
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
    }
    this.status = 'stopped';
    this.isConnected = false;
    this.saveStatus();
    this.log('info', 'Connection service stopped');
  }

  /**
   * 记录日志
   */
  log(level, message) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      status: this.status
    };
    
    this.logs.push(logEntry);
    
    // 限制日志数量
    if (this.logs.length > 1000) {
      this.logs = this.logs.slice(-1000);
    }
    
    // 输出到控制台
    console.log(`[${level.toUpperCase()}] ${new Date().toISOString()} - ${message}`);
    
    // 写入日志文件
    const logFile = path.join(this.logDir, `connection_${new Date().toISOString().split('T')[0]}.log`);
    fs.appendFileSync(logFile, JSON.stringify(logEntry) + '\n');
  }

  /**
   * 保存状态
   */
  saveStatus() {
    const status = {
      nodeId: this.nodeId,
      status: this.status,
      isConnected: this.isConnected,
      lastHeartbeatTime: this.lastHeartbeatTime,
      connectionAttempts: this.connectionAttempts,
      uptime: process.uptime(),
      timestamp: new Date().toISOString()
    };
    
    fs.writeFileSync(this.statusFile, JSON.stringify(status, null, 2));
  }

  /**
   * 获取状态
   */
  getStatus() {
    try {
      if (fs.existsSync(this.statusFile)) {
        return JSON.parse(fs.readFileSync(this.statusFile, 'utf8'));
      }
    } catch (error) {
      this.log('error', `Error reading status file: ${error.message}`);
    }
    return this.saveStatus();
  }

  /**
   * 获取日志
   */
  getLogs(limit = 100) {
    return this.logs.slice(-limit);
  }
}

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
  module.exports = EvoMapConnectionService;
}

// 命令行使用
if (typeof process !== 'undefined' && process.argv && process.argv[2]) {
  const service = new EvoMapConnectionService();
  const command = process.argv[2];
  
  switch (command) {
    case 'start':
      service.initialize();
      break;
    case 'status':
      console.log(JSON.stringify(service.getStatus(), null, 2));
      break;
    case 'logs':
      console.log(JSON.stringify(service.getLogs(), null, 2));
      break;
    case 'stop':
      service.stop();
      break;
    default:
      console.log('Usage: node connection-service.js [start|status|logs|stop]');
  }
}
