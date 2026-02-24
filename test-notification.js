// 测试智能体通知服务
const http = require('http');

// 发送通知测试
function testNotification() {
    console.log('测试智能体通知服务...');
    
    const notificationData = {
        sender: 'system',
        recipients: ['master', 'coo', 'cto', 'green-tea', 'business', 'life'],
        message: '端口配置更新通知',
        priority: 'high',
        data: {
            type: 'port_update',
            ports: {
                master: 4000,
                coo: 4001,
                cto: 4002,
                'green-tea': 4003,
                business: 4004,
                life: 4005
            },
            services: {
                gateway: 18789,
                trea_proxy: 4010
            },
            effective_date: new Date().toISOString()
        }
    };
    
    const options = {
        hostname: 'localhost',
        port: 4011,
        path: '/api/notify',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(JSON.stringify(notificationData))
        }
    };
    
    const req = http.request(options, (res) => {
        let data = '';
        
        res.on('data', (chunk) => {
            data += chunk;
        });
        
        res.on('end', () => {
            try {
                const response = JSON.parse(data);
                console.log('通知发送成功:', response);
                
                // 测试广播通知
                testBroadcast();
            } catch (error) {
                console.error('响应解析失败:', error);
            }
        });
    });
    
    req.on('error', (error) => {
        console.error('通知发送失败:', error);
    });
    
    req.write(JSON.stringify(notificationData));
    req.end();
}

// 测试广播通知
function testBroadcast() {
    console.log('\n测试广播通知...');
    
    const broadcastData = {
        sender: 'system',
        message: '系统启动通知',
        priority: 'normal',
        data: {
            type: 'system_startup',
            services: {
                notification: 'running',
                gateway: 'running',
                trea_proxy: 'running'
            },
            timestamp: new Date().toISOString()
        }
    };
    
    const options = {
        hostname: 'localhost',
        port: 4011,
        path: '/api/broadcast',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(JSON.stringify(broadcastData))
        }
    };
    
    const req = http.request(options, (res) => {
        let data = '';
        
        res.on('data', (chunk) => {
            data += chunk;
        });
        
        res.on('end', () => {
            try {
                const response = JSON.parse(data);
                console.log('广播通知发送成功:', response);
                
                // 测试获取通知历史
                testGetHistory();
            } catch (error) {
                console.error('响应解析失败:', error);
            }
        });
    });
    
    req.on('error', (error) => {
        console.error('广播通知发送失败:', error);
    });
    
    req.write(JSON.stringify(broadcastData));
    req.end();
}

// 测试获取通知历史
function testGetHistory() {
    console.log('\n测试获取通知历史...');
    
    const options = {
        hostname: 'localhost',
        port: 4011,
        path: '/api/history',
        method: 'GET'
    };
    
    const req = http.request(options, (res) => {
        let data = '';
        
        res.on('data', (chunk) => {
            data += chunk;
        });
        
        res.on('end', () => {
            try {
                const response = JSON.parse(data);
                console.log('通知历史获取成功:', {
                    total: response.total,
                    notifications: response.notifications.length
                });
                console.log('\n测试完成!');
            } catch (error) {
                console.error('响应解析失败:', error);
            }
        });
    });
    
    req.on('error', (error) => {
        console.error('获取通知历史失败:', error);
    });
    
    req.end();
}

// 启动测试
testNotification();