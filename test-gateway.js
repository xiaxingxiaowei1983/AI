const http = require('http');

// 测试网关服务
function testGateway() {
    console.log('=== 测试网关服务 ===');
    console.log('时间:', new Date().toLocaleString());
    
    const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/health',
        method: 'GET',
        timeout: 5000
    };
    
    const req = http.request(options, (res) => {
        console.log('✅ 请求成功');
        console.log('状态码:', res.statusCode);
        console.log('响应头:', res.headers);
        
        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });
        
        res.on('end', () => {
            console.log('响应数据:', data);
            console.log('\n🎉 网关服务测试成功！');
        });
    });
    
    req.on('error', (error) => {
        console.error('❌ 请求失败:', error.message);
        console.log('\n⚠️  可能存在网络限制或服务配置问题');
    });
    
    req.on('timeout', () => {
        console.error('❌ 请求超时');
        req.destroy();
    });
    
    req.end();
}

// 测试根路径
function testRootPath() {
    console.log('\n=== 测试根路径 ===');
    
    const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/',
        method: 'GET',
        timeout: 5000
    };
    
    const req = http.request(options, (res) => {
        console.log('✅ 根路径请求成功');
        console.log('状态码:', res.statusCode);
        
        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });
        
        res.on('end', () => {
            console.log('响应数据:', data);
        });
    });
    
    req.on('error', (error) => {
        console.error('❌ 根路径请求失败:', error.message);
    });
    
    req.end();
}

// 运行测试
console.log('开始测试网关服务...');
testGateway();
setTimeout(testRootPath, 2000);