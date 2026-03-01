const http = require('http');

// 测试从天师到大掌柜的消息传递
function testMessageFromTianshiToDazhanggui() {
  const postData = JSON.stringify({
    sender: 'life',
    receiver: 'greenTea',
    message: '@大掌柜 我是天师，向您汇报智能体启动情况。我已成功启动并运行在端口4007，系统状态良好。'
  });

  const options = {
    hostname: 'localhost',
    port: 4010,
    path: '/send',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  const req = http.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      console.log('从天师到大掌柜的消息传递测试结果:');
      console.log('Status Code:', res.statusCode);
      console.log('Response:', data);
      console.log('');
      testMessageFromDazhangguiToTianshi();
    });
  });

  req.on('error', (e) => {
    console.error('从天师到大掌柜的消息传递测试失败:', e.message);
    console.error('错误详情:', e);
    console.log('');
    testMessageFromDazhangguiToTianshi();
  });

  req.write(postData);
  req.end();
}

// 测试从大掌柜到天师的消息传递
function testMessageFromDazhangguiToTianshi() {
  const postData = JSON.stringify({
    sender: 'greenTea',
    receiver: 'life',
    message: '@天师 收到你的汇报，很好！大掌柜智能体也已成功启动并运行在端口4003，系统状态良好。'
  });

  const options = {
    hostname: 'localhost',
    port: 4010,
    path: '/send',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  const req = http.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      console.log('从大掌柜到天师的消息传递测试结果:');
      console.log('Status Code:', res.statusCode);
      console.log('Response:', data);
      console.log('');
      testMessageHistory();
    });
  });

  req.on('error', (e) => {
    console.error('从大掌柜到天师的消息传递测试失败:', e.message);
    console.error('错误详情:', e);
    console.log('');
    testMessageHistory();
  });

  req.write(postData);
  req.end();
}

// 测试获取消息历史
function testMessageHistory() {
  const options = {
    hostname: 'localhost',
    port: 4010,
    path: '/history',
    method: 'GET'
  };

  const req = http.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      console.log('消息历史测试结果:');
      console.log('Status Code:', res.statusCode);
      try {
        const history = JSON.parse(data);
        console.log('消息数量:', history.history ? history.history.length : 0);
        if (history.history && history.history.length > 0) {
          console.log('最近的消息:');
          history.history.slice(-2).forEach((msg, index) => {
            console.log(`${index + 1}. 发送者: ${msg.sender}, 接收者: ${msg.receiver}, 状态: ${msg.status}`);
            console.log(`   消息: ${msg.message.substring(0, 50)}${msg.message.length > 50 ? '...' : ''}`);
          });
        }
      } catch (error) {
        console.error('解析消息历史失败:', error.message);
        console.log('原始响应:', data);
      }
    });
  });

  req.on('error', (e) => {
    console.error('获取消息历史失败:', e.message);
    console.error('错误详情:', e);
  });

  req.end();
}

// 开始测试
console.log('开始测试智能体消息传递功能...');
console.log('========================================');
testMessageFromTianshiToDazhanggui();
