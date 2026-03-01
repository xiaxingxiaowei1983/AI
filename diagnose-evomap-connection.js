const https = require('https');

console.log('=== EvoMap 连接诊断 ===\n');

// 配置信息
const config = {
  nodeId: 'node_1d3769e8db37e512',
  baseUrl: 'https://evomap.ai'
};

// 检查心跳状态
function checkHeartbeat() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'evomap.ai',
      port: 443,
      path: '/a2a/heartbeat',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve({ statusCode: res.statusCode, data });
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(JSON.stringify({ node_id: config.nodeId }));
    req.end();
  });
}

// 检查节点信息
function checkNodeInfo() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'evomap.ai',
      port: 443,
      path: `/a2a/nodes/${config.nodeId}`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve({ statusCode: res.statusCode, data });
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
}

// 尝试获取基因资源（使用不同参数）
function fetchGenes() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'evomap.ai',
      port: 443,
      path: '/a2a/fetch',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve({ statusCode: res.statusCode, data });
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    const payload = {
      protocol: "gep-a2a",
      protocol_version: "1.0.0",
      message_type: "fetch",
      message_id: `msg_${Date.now()}_${Math.random().toString(16).slice(2, 10)}`,
      sender_id: config.nodeId,
      timestamp: new Date().toISOString(),
      payload: {
        asset_type: "Gene",
        limit: 10
      }
    };

    req.write(JSON.stringify(payload));
    req.end();
  });
}

// 执行诊断
async function diagnoseConnection() {
  try {
    console.log('1. 检查心跳状态...');
    const heartbeatResult = await checkHeartbeat();
    console.log(`   心跳响应: ${heartbeatResult.statusCode}`);
    console.log(`   响应内容: ${heartbeatResult.data}`);

    console.log('\n2. 检查节点信息...');
    const nodeInfoResult = await checkNodeInfo();
    console.log(`   节点信息响应: ${nodeInfoResult.statusCode}`);
    console.log(`   响应内容: ${nodeInfoResult.data}`);

    console.log('\n3. 尝试获取基因资源...');
    const genesResult = await fetchGenes();
    console.log(`   基因查询响应: ${genesResult.statusCode}`);
    console.log(`   响应内容: ${genesResult.data}`);

    console.log('\n=== 诊断完成 ===');
    console.log('\n分析结果:');
    
    if (heartbeatResult.statusCode === 200) {
      console.log('✅ 心跳正常，节点已连接');
    } else {
      console.log('❌ 心跳失败，可能存在连接问题');
    }

    try {
      const nodeInfo = JSON.parse(nodeInfoResult.data);
      if (nodeInfo.node_id === config.nodeId) {
        console.log('✅ 节点信息正确，身份验证通过');
      } else {
        console.log('❌ 节点信息不匹配，可能存在虚假链接');
      }
    } catch (e) {
      console.log('⚠️  无法解析节点信息');
    }

    try {
      const genesData = JSON.parse(genesResult.data);
      if (genesData && genesData.length > 0) {
        console.log(`✅ 成功获取 ${genesData.length} 个基因资源`);
      } else {
        console.log('⚠️  未获取到基因资源，可能是API参数问题或资源暂不可用');
      }
    } catch (e) {
      console.log('⚠️  无法解析基因数据');
    }

  } catch (error) {
    console.error('诊断失败:', error.message);
  }
}

// 执行诊断
diagnoseConnection();
