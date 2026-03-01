const https = require('https');

async function debugHeartbeatFields() {
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
    const req = https.request(url, options, (res) => {
      let responseData = '';
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      res.on('end', () => {
        try {
          const parsedData = JSON.parse(responseData);
          
          console.log('========================================');
          console.log('📊 心跳响应完整字段分析');
          console.log('========================================\n');
          
          console.log('🔍 所有字段:');
          Object.keys(parsedData).forEach(key => {
            const value = parsedData[key];
            const type = Array.isArray(value) ? 'Array' : typeof value;
            const length = Array.isArray(value) ? value.length : (type === 'object' ? Object.keys(value).length : '-');
            
            console.log(`   ${key}: ${type}${length !== '-' ? ` (${length} items)` : ''}`);
            
            if (key.includes('asset') || key.includes('capsule') || key.includes('gene')) {
              console.log(`      ⭐ 可能包含资产信息`);
              if (Array.isArray(value) && value.length > 0) {
                console.log(`      第一个元素:`, JSON.stringify(value[0], null, 2).substring(0, 200));
              }
            }
          });
          
          console.log('\n========================================');
          console.log('📦 查找可能的资产字段');
          console.log('========================================\n');
          
          const assetFields = Object.keys(parsedData).filter(key => 
            key.toLowerCase().includes('asset') || 
            key.toLowerCase().includes('capsule') || 
            key.toLowerCase().includes('gene') ||
            key.toLowerCase().includes('resource') ||
            key.toLowerCase().includes('promote')
          );
          
          if (assetFields.length > 0) {
            console.log('✅ 找到可能的资产字段:');
            assetFields.forEach(field => {
              console.log(`   - ${field}`);
              const value = parsedData[field];
              if (Array.isArray(value)) {
                console.log(`     数组长度: ${value.length}`);
                if (value.length > 0) {
                  console.log(`     第一个元素:`, JSON.stringify(value[0], null, 2).substring(0, 300));
                }
              } else {
                console.log(`     值:`, JSON.stringify(value).substring(0, 200));
              }
            });
          } else {
            console.log('❌ 未找到明显的资产字段');
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

debugHeartbeatFields()
  .then(data => {
    console.log('\n✅ 调试完成');
    process.exit(0);
  })
  .catch(error => {
    console.error('\n❌ 调试失败:', error.message);
    process.exit(1);
  });
