// 智能体网关服务
const express = require('express');
const http = require('http');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 18789;

// 智能体端口分配
const agentPorts = {
  master: 4000,
  coo: 4001,
  cto: 4002,
  "green-tea": 4003,
  business: 4004,
  life: 4005
};

// 加载配置
const configPath = path.join(__dirname, 'openclaw.json');
let config = {};
try {
  config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
} catch (error) {
  console.warn('无法加载配置文件:', error.message);
}

// 获取token
const expectedToken = config.gateway?.auth?.token || '2e47ede431dbd73de7ae4a2556ba69260427d1269e8878da';

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 添加CSP头
app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', "default-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; script-src 'self' 'unsafe-inline' 'unsafe-eval'; img-src 'self' data: https:; connect-src 'self';");
  next();
});

// 新增：性能监控
const performanceMonitor = {
  requests: [],
  agents: {},
  startTime: Date.now(),
  
  recordRequest(req, res, startTime, endTime) {
    this.requests.push({
      timestamp: new Date().toISOString(),
      path: req.path,
      method: req.method,
      duration: endTime - startTime,
      statusCode: res.statusCode
    });
    
    // 限制请求记录数量
    if (this.requests.length > 1000) {
      this.requests = this.requests.slice(-1000);
    }
  },
  
  updateAgentStatus(agentId, status) {
    this.agents[agentId] = {
      ...status,
      lastUpdated: new Date().toISOString()
    };
  },
  
  getStats() {
    const uptime = Date.now() - this.startTime;
    const totalRequests = this.requests.length;
    const avgResponseTime = this.requests.length > 0
      ? this.requests.reduce((sum, req) => sum + req.duration, 0) / this.requests.length
      : 0;
    
    return {
      uptime,
      totalRequests,
      avgResponseTime,
      agents: this.agents
    };
  }
};

// 新增：负载均衡和故障转移
const loadBalancer = {
  agentPorts: {
    master: 4000,
    coo: 4001,
    cto: 4002,
    'green-tea': 4003,
    business: 4004,
    life: 4005
  },
  
  // 智能体健康状态
  agentHealth: {},
  
  // 检查智能体健康状态
  async checkAgentHealth(agentId, port) {
    return new Promise((resolve) => {
      const options = {
        hostname: 'localhost',
        port: port,
        path: '/health',
        method: 'GET',
        timeout: 2000
      };
      
      const req = http.request(options, (res) => {
        resolve(res.statusCode === 200);
      });
      
      req.on('error', () => resolve(false));
      req.on('timeout', () => {
        req.destroy();
        resolve(false);
      });
      
      req.end();
    });
  },
  
  // 定期检查智能体健康状态
  startHealthCheck() {
    setInterval(async () => {
      for (const [agentId, port] of Object.entries(this.agentPorts)) {
        const isHealthy = await this.checkAgentHealth(agentId, port);
        this.agentHealth[agentId] = isHealthy;
      }
    }, 10000); // 每10秒检查一次
  },
  
  // 获取智能体端口（支持故障转移）
  getAgentPort(agentId) {
    const port = this.agentPorts[agentId];
    const isHealthy = this.agentHealth[agentId] !== false;
    
    return {
      port,
      isHealthy,
      agentId
    };
  }
};

// 启动健康检查
loadBalancer.startHealthCheck();

// 性能监控中间件
app.use((req, res, next) => {
  const startTime = Date.now();
  
  const originalSend = res.send;
  res.send = function(body) {
    const endTime = Date.now();
    performanceMonitor.recordRequest(req, res, startTime, endTime);
    return originalSend.call(this, body);
  };
  
  next();
});

// 路由
app.get('/', (req, res) => {
    res.json({
        message: 'AWKN LAB | 定数实验室 - 智能体网关服务',
        status: 'running',
        port: PORT,
        agents: agentPorts
    });
});

// 智能体路由
app.post('/api/agent/:agentId', (req, res) => {
    // 验证token
    const authHeader = req.headers.authorization;
    
    if (!authHeader || authHeader !== `Bearer ${expectedToken}`) {
        return res.status(401).json({
            success: false,
            error: '未授权：缺少或无效的token'
        });
    }
    
    const { agentId } = req.params;
    const agentInfo = loadBalancer.getAgentPort(agentId);
    
    if (!agentInfo.port) {
        return res.status(404).json({
            success: false,
            error: `智能体 ${agentId} 不存在`
        });
    }
    
    // 检查智能体健康状态
    if (!agentInfo.isHealthy) {
        return res.status(503).json({
            success: false,
            error: `智能体 ${agentId} 服务不可用，请稍后再试`
        });
    }
    
    // 转发请求到对应智能体
    const options = {
        hostname: 'localhost',
        port: agentInfo.port,
        path: '/api/process',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(JSON.stringify(req.body))
        },
        timeout: 30000 // 30秒超时
    };
    
    const startTime = Date.now();
    
    const proxyReq = http.request(options, (proxyRes) => {
        let data = '';
        
        proxyRes.on('data', (chunk) => {
            data += chunk;
        });
        
        proxyRes.on('end', () => {
            const endTime = Date.now();
            const responseTime = endTime - startTime;
            
            // 更新智能体状态
            performanceMonitor.updateAgentStatus(agentId, {
                status: 'healthy',
                responseTime: responseTime
            });
            
            try {
                const response = JSON.parse(data);
                res.json({
                    ...response,
                    metadata: {
                        agentId,
                        responseTime,
                        timestamp: new Date().toISOString()
                    }
                });
            } catch (error) {
                res.status(500).json({
                    success: false,
                    error: '智能体响应解析失败'
                });
            }
        });
    });
    
    proxyReq.on('error', (error) => {
        // 更新智能体状态为不健康
        performanceMonitor.updateAgentStatus(agentId, {
            status: 'unhealthy',
            error: error.message
        });
        
        res.status(502).json({
            success: false,
            error: `智能体 ${agentId} 服务不可用: ${error.message}`
        });
    });
    
    proxyReq.on('timeout', () => {
        proxyReq.destroy();
        performanceMonitor.updateAgentStatus(agentId, {
            status: 'timeout',
            error: '请求超时'
        });
        
        res.status(504).json({
            success: false,
            error: `智能体 ${agentId} 服务超时，请稍后再试`
        });
    });
    
    proxyReq.write(JSON.stringify(req.body));
    proxyReq.end();
});

// 新增：性能指标端点
app.get('/api/metrics', (req, res) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || authHeader !== `Bearer ${expectedToken}`) {
        return res.status(401).json({
            success: false,
            error: '未授权：缺少或无效的token'
        });
    }
    
    res.json({
        performance: performanceMonitor.getStats(),
        agentHealth: loadBalancer.agentHealth,
        timestamp: new Date().toISOString()
    });
});

// 新增：智能体健康检查端点
app.get('/api/health/agents', (req, res) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || authHeader !== `Bearer ${expectedToken}`) {
        return res.status(401).json({
            success: false,
            error: '未授权：缺少或无效的token'
        });
    }
    
    res.json({
        agents: loadBalancer.agentHealth,
        ports: loadBalancer.agentPorts,
        timestamp: new Date().toISOString()
    });
});

// 健康检查
app.get('/health', (req, res) => {
    const stats = performanceMonitor.getStats();
    
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: stats.uptime,
        performance: {
            totalRequests: stats.totalRequests,
            avgResponseTime: stats.avgResponseTime
        },
        services: {
            gateway: 'up',
            trea_proxy: 'up'
        },
        agents: {
            available: Object.entries(loadBalancer.agentHealth)
                .filter(([_, healthy]) => healthy)
                .map(([agent]) => agent),
            unavailable: Object.entries(loadBalancer.agentHealth)
                .filter(([_, healthy]) => !healthy)
                .map(([agent]) => agent),
            ports: loadBalancer.agentPorts
        }
    });
});

// 启动服务器
app.listen(PORT, () => {
    console.log('🚀 智能体网关服务已启动');
    console.log(`📡 监听地址: http://localhost:${PORT}`);
    console.log('📋 可用路由:');
    console.log('   GET  /              - 网关信息');
    console.log('   POST /api/agent/:agentId - 智能体请求转发');
    console.log('   GET  /health        - 健康检查');
    console.log('\n智能体端口分配:');
    Object.entries(agentPorts).forEach(([agent, port]) => {
        console.log(`   ${agent}: ${port}`);
    });
});

module.exports = app;