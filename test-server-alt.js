const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Test server is running on port 3000!');
});

app.get('/health', (req, res) => {
    res.json({ 
        status: 'healthy',
        port: PORT,
        timestamp: new Date().toISOString()
    });
});

app.listen(PORT, () => {
    console.log(`Test server running on http://localhost:${PORT}`);
    console.log('Server started successfully!');
    console.log('Testing server accessibility...');
    
    // 测试服务器自身是否能访问
    const http = require('http');
    const options = {
        hostname: 'localhost',
        port: PORT,
        path: '/health',
        method: 'GET'
    };
    
    const req = http.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });
        res.on('end', () => {
            console.log('✅ 服务器自测试成功:');
            console.log('响应:', data);
        });
    });
    
    req.on('error', (error) => {
        console.error('❌ 服务器自测试失败:', error.message);
    });
    
    req.end();
});

// 保持进程运行
setInterval(() => {
    console.log('Server still running on port', PORT, 'at', new Date().toLocaleTimeString());
}, 30000);