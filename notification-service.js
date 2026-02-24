// 智能体通知服务
const express = require('express');
const http = require('http');
const cors = require('cors');
const EventEmitter = require('events');

const app = express();
const PORT = 4011;

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 事件发射器
const notificationEmitter = new EventEmitter();

// 端口分配配置
const agentPorts = {
    master: 4000,
    coo: 4001,
    cto: 4002,
    'green-tea': 4003,
    business: 4004,
    life: 4005
};

// 通知历史
const notificationHistory = [];

// 路由
app.get('/', (req, res) => {
    res.json({
        message: 'AWKN LAB | 定数实验室 - 智能体通知服务',
        status: 'running',
        port: PORT,
        agents: agentPorts
    });
});

// 发送通知
app.post('/api/notify', (req, res) => {
    const { sender, recipients, message, priority = 'normal', data = {} } = req.body;
    
    if (!sender || !recipients || !message) {
        return res.status(400).json({
            success: false,
            error: '缺少必要参数: sender, recipients, message'
        });
    }
    
    const notification = {
        id: Date.now().toString(),
        sender,
        recipients,
        message,
        priority,
        data,
        timestamp: new Date().toISOString(),
        status: 'pending'
    };
    
    // 保存通知
    notificationHistory.push(notification);
    
    // 处理通知
    processNotification(notification);
    
    res.json({
        success: true,
        notification
    });
});

// 广播通知
app.post('/api/broadcast', (req, res) => {
    const { sender, message, priority = 'normal', data = {} } = req.body;
    
    if (!sender || !message) {
        return res.status(400).json({
            success: false,
            error: '缺少必要参数: sender, message'
        });
    }
    
    const recipients = Object.keys(agentPorts);
    const notification = {
        id: Date.now().toString(),
        sender,
        recipients,
        message,
        priority,
        data,
        timestamp: new Date().toISOString(),
        status: 'pending'
    };
    
    // 保存通知
    notificationHistory.push(notification);
    
    // 处理通知
    processNotification(notification);
    
    res.json({
        success: true,
        notification
    });
});

// 获取通知历史
app.get('/api/history', (req, res) => {
    const { limit = 50, offset = 0 } = req.query;
    const history = notificationHistory
        .slice(offset, offset + parseInt(limit))
        .reverse();
    
    res.json({
        success: true,
        notifications: history,
        total: notificationHistory.length
    });
});

// 处理通知
function processNotification(notification) {
    const { recipients, message, sender, data } = notification;
    
    recipients.forEach(agentId => {
        const agentPort = agentPorts[agentId];
        
        if (agentPort) {
            // 发送通知到智能体
            const options = {
                hostname: 'localhost',
                port: agentPort,
                path: '/api/notification',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(JSON.stringify({
                        sender,
                        message,
                        data,
                        timestamp: new Date().toISOString()
                    }))
                }
            };
            
            const req = http.request(options, (res) => {
                let responseData = '';
                
                res.on('data', (chunk) => {
                    responseData += chunk;
                });
                
                res.on('end', () => {
                    console.log(`通知已发送到 ${agentId}: ${res.statusCode}`);
                });
            });
            
            req.on('error', (error) => {
                console.error(`发送通知到 ${agentId} 失败: ${error.message}`);
            });
            
            req.write(JSON.stringify({
                sender,
                message,
                data,
                timestamp: new Date().toISOString()
            }));
            req.end();
        }
    });
    
    // 触发通知事件
    notificationEmitter.emit('notification', notification);
}

// 健康检查
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        services: {
            notification: 'up',
            agents: Object.keys(agentPorts)
        }
    });
});

// 启动服务器
app.listen(PORT, () => {
    console.log('🚀 智能体通知服务已启动');
    console.log(`📡 监听地址: http://localhost:${PORT}`);
    console.log('📋 可用路由:');
    console.log('   GET  /              - 服务信息');
    console.log('   POST /api/notify    - 发送通知');
    console.log('   POST /api/broadcast - 广播通知');
    console.log('   GET  /api/history   - 获取通知历史');
    console.log('   GET  /health        - 健康检查');
    console.log('\n智能体端口分配:');
    Object.entries(agentPorts).forEach(([agent, port]) => {
        console.log(`   ${agent}: ${port}`);
    });
});

// 导出
module.exports = {
    app,
    notificationEmitter,
    agentPorts
};