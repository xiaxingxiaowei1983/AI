const http = require('http');

// 测试大掌柜API
const testGreenTea = () => {
  const postData = JSON.stringify({ message: '@大掌柜 测试消息' });
  
  const options = {
    hostname: 'localhost',
    port: 4003,
    path: '/api/chat',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };
  
  console.log('测试大掌柜API...');
  const req = http.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      console.log('大掌柜响应:', data);
      try {
        const json = JSON.parse(data);
        console.log('大掌柜响应解析成功:', json);
      } catch (error) {
        console.error('大掌柜响应解析失败:', error);
      }
    });
  });
  
  req.on('error', (error) => {
    console.error('大掌柜API错误:', error);
  });
  
  req.write(postData);
  req.end();
};

// 测试天师API
const testLifeAgent = () => {
  const postData = JSON.stringify({ message: '@天师 测试消息' });
  
  const options = {
    hostname: 'localhost',
    port: 4007,
    path: '/chat',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };
  
  console.log('\n测试天师API...');
  const req = http.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      console.log('天师响应:', data);
      try {
        const json = JSON.parse(data);
        console.log('天师响应解析成功:', json);
      } catch (error) {
        console.error('天师响应解析失败:', error);
      }
    });
  });
  
  req.on('error', (error) => {
    console.error('天师API错误:', error);
  });
  
  req.write(postData);
  req.end();
};

// 运行测试
testGreenTea();
setTimeout(testLifeAgent, 1000);
