const http = require('http');

// 测试新人格设定的函数
function testPersonality(message, callback) {
  const options = {
    hostname: 'localhost',
    port: 4007,
    path: '/chat',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(JSON.stringify({ message }))
    }
  };

  const req = http.request(options, (res) => {
    let responseBody = '';
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      responseBody += chunk;
    });
    res.on('end', () => {
      try {
        const response = JSON.parse(responseBody);
        callback(null, response);
      } catch (error) {
        callback(error, null);
      }
    });
  });

  req.on('error', (e) => {
    callback(e, null);
  });

  req.write(JSON.stringify({ message }));
  req.end();
}

// 测试用例
const testCases = [
  '@天师 你好，我想咨询一下人生决策的问题',
  '@天师 我最近感到工作压力很大，不知道该怎么办',
  '@天师 我想做个人能量复盘',
  '@天师 你觉得我应该如何平衡工作和生活'
];

// 执行测试
console.log('测试人生决策宗师新人格设定...');
console.log('========================================');

testCases.forEach((testCase, index) => {
  console.log(`\n测试 ${index + 1}: ${testCase}`);
  console.log('----------------------------------------');
  
  testPersonality(testCase, (error, response) => {
    if (error) {
      console.error('测试失败:', error.message);
    } else {
      console.log('响应:', response.message);
      console.log('状态:', response.status);
    }
  });
});

// 测试SOUL获取端点
console.log('\n测试SOUL获取端点...');
console.log('----------------------------------------');

const soulOptions = {
  hostname: 'localhost',
  port: 4007,
  path: '/soul',
  method: 'GET'
};

const soulReq = http.request(soulOptions, (res) => {
  let soulBody = '';
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    soulBody += chunk;
  });
  res.on('end', () => {
    try {
      const soulResponse = JSON.parse(soulBody);
      console.log('SOUL端点状态:', '成功');
      console.log('SOUL内容长度:', soulResponse.length);
      console.log('是否包含新人格设定:', soulResponse.soul.includes('独立、清醒且具备深度的智能伙伴'));
    } catch (error) {
      console.error('SOUL端点测试失败:', error.message);
    }
  });
});

soulReq.on('error', (e) => {
  console.error('SOUL端点测试失败:', e.message);
});

soulReq.end();
