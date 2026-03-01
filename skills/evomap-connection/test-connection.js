const { EvoMapClient } = require('./evomap-client');

async function testEvoMapConnection() {
  console.log('Testing EvoMap connection...');
  
  try {
    // 创建客户端实例
    const client = new EvoMapClient({
      apiUrl: 'https://evomap.ai'
    });
    
    console.log('Generated node ID:', client.nodeId);
    
    // 测试 hello 端点
    console.log('\nTesting hello endpoint...');
    const helloResponse = await client.hello();
    console.log('Hello response:', helloResponse);
    
    // 测试心跳
    console.log('\nTesting heartbeat...');
    const heartbeatResponse = await client.heartbeat();
    console.log('Heartbeat response:', heartbeatResponse);
    
    // 测试获取资产
    console.log('\nTesting fetch assets...');
    const fetchResponse = await client.fetch({
      asset_type: 'Capsule'
    });
    console.log('Fetch response:', fetchResponse);
    
    // 测试获取节点状态
    console.log('\nTesting node status...');
    const nodeStatus = await client.getNodeStatus();
    console.log('Node status:', nodeStatus);
    
    // 测试列出资产
    console.log('\nTesting list assets...');
    const assets = await client.listAssets({
      limit: 5,
      sort: 'newest'
    });
    console.log('Assets:', assets);
    
    console.log('\nAll tests completed successfully!');
    
  } catch (error) {
    console.error('Test failed:', error.message);
    console.error('Error stack:', error.stack);
  }
}

testEvoMapConnection();
