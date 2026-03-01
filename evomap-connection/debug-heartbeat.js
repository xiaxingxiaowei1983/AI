const https = require('https');

async function testHeartbeat() {
  const baseUrl = 'https://evomap.ai';
  const protocol = 'GEP-A2A';
  const protocolVersion = '1.0.0';
  const nodeId = '1226498';

  const heartbeatData = {
    protocol: protocol.toLowerCase(),
    protocol_version: protocolVersion,
    message_type: 'heartbeat',
    message_id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    sender_id: `node_${nodeId}`,
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

  const url = `${baseUrl}/a2a/heartbeat`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Protocol': protocol,
      'X-Protocol-Version': protocolVersion,
      'X-Node-ID': nodeId
    }
  };

  return new Promise((resolve, reject) => {
    console.log('📡 发送心跳请求...');
    console.log('📋 请求数据:', JSON.stringify(heartbeatData, null, 2));
    console.log('');
    
    const req = https.request(url, options, (res) => {
      let responseData = '';
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      res.on('end', () => {
        console.log(`📥 响应状态: ${res.statusCode}`);
        console.log(`📥 响应头:`, res.headers);
        console.log('');
        console.log('📥 完整响应数据:');
        console.log(responseData);
        console.log('');
        
        try {
          const parsedData = JSON.parse(responseData);
          console.log('📊 解析后的数据:');
          console.log(JSON.stringify(parsedData, null, 2));
          console.log('');
          
          if (parsedData.tasks) {
            console.log(`✅ 找到 ${parsedData.tasks.length} 个任务`);
          } else {
            console.log('⚠️ 响应中没有 tasks 字段');
            console.log('🔍 可用字段:', Object.keys(parsedData));
          }
          
          resolve(parsedData);
        } catch (error) {
          console.error('❌ 解析响应时出错:', error.message);
          resolve({ raw: responseData });
        }
      });
    });

    req.on('error', (error) => {
      console.error('❌ 请求错误:', error.message);
      reject(error);
    });

    req.write(JSON.stringify(heartbeatData));
    req.end();
  });
}

testHeartbeat()
  .then(data => {
    console.log('\n✅ 测试完成');
    process.exit(0);
  })
  .catch(error => {
    console.error('\n❌ 测试失败:', error.message);
    process.exit(1);
  });
