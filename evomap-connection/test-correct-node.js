const https = require('https');

/**
 * 测试正确节点ID的EvoMap连接
 */
async function testCorrectNodeId() {
  const baseUrl = 'https://evomap.ai';
  const protocol = 'GEP-A2A';
  const protocolVersion = '1.0.0';
  const nodeId = '1226898'; // 正确的节点ID（从截图获取）

  console.log('========================================');
  console.log('🚀 测试正确节点ID的EvoMap连接');
  console.log('========================================');
  console.log(`📍 基础URL: ${baseUrl}`);
  console.log(`🔑 节点ID: ${nodeId}`);
  console.log(`📡 协议: ${protocol} v${protocolVersion}`);
  console.log('');

  // 测试1: 基础连接
  console.log('🧪 测试1: 基础连接...');
  try {
    const response = await fetch(`${baseUrl}/`);
    console.log(`✅ 基础连接成功: ${response.status}`);
  } catch (error) {
    console.log(`❌ 基础连接失败: ${error.message}`);
    return;
  }

  // 测试2: Hello握手
  console.log('\n🧪 测试2: Hello握手...');
  const helloData = {
    protocol: protocol.toLowerCase(),
    protocol_version: protocolVersion,
    message_type: 'hello',
    message_id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    sender_id: `node_${nodeId}`,
    timestamp: new Date().toISOString(),
    payload: {
      capabilities: {
        assetFetch: true,
        taskClaim: true,
        assetPublish: true,
        sessionCollaboration: true
      },
      env_fingerprint: {
        platform: process.platform,
        arch: process.arch,
        nodeVersion: process.version
      }
    }
  };

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Protocol': protocol,
      'X-Protocol-Version': protocolVersion,
      'X-Node-ID': nodeId
    },
    body: JSON.stringify(helloData)
  };

  try {
    const response = await fetch(`${baseUrl}/a2a/hello`, options);
    const data = await response.json();
    console.log(`✅ Hello握手成功: ${response.status}`);
    console.log(`📊 响应数据:`, data);
  } catch (error) {
    console.log(`❌ Hello握手失败: ${error.message}`);
  }

  // 测试3: 心跳
  console.log('\n🧪 测试3: 心跳...');
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

  const heartbeatOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Protocol': protocol,
      'X-Protocol-Version': protocolVersion,
      'X-Node-ID': nodeId
    },
    body: JSON.stringify(heartbeatData)
  };

  try {
    const response = await fetch(`${baseUrl}/a2a/heartbeat`, heartbeatOptions);
    const data = await response.json();
    console.log(`✅ 心跳成功: ${response.status}`);
    console.log(`📊 响应状态: ${data.status}`);
    console.log(`📊 节点状态: ${data.node_status}`);
    console.log(`📊 存活状态: ${data.survival_status}`);
    console.log(`📊 可用任务: ${data.available_work ? data.available_work.length : 0}`);
    
    if (data.status === 'OK') {
      console.log('\n🎉 连接成功！绿茶智能体在线！');
    } else {
      console.log('\n❌ 连接失败，状态异常');
    }
  } catch (error) {
    console.log(`❌ 心跳失败: ${error.message}`);
  }

  console.log('\n========================================');
  console.log('🎯 测试完成');
  console.log('========================================');
}

// 运行测试
testCorrectNodeId().catch(console.error);
