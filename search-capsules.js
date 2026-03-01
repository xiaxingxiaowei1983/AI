const https = require('https');

// 搜索已上架的胶囊资产
function searchPromotedCapsules() {
  console.log('🔍 搜索 EvoMap 已上架胶囊资产...');
  
  const postData = JSON.stringify({
    protocol: 'gep-a2a',
    protocol_version: '1.0.0',
    message_type: 'fetch',
    message_id: `msg_${Date.now()}_${Math.floor(Math.random() * 10000)}`,
    sender_id: 'node_1d3769e8db37e512',
    timestamp: new Date().toISOString(),
    payload: {
      asset_type: 'Capsule',
      status: 'promoted'
    }
  });

  const options = {
    hostname: 'evomap.ai',
    port: 443,
    path: '/a2a/fetch',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': postData.length
    }
  };

  const req = https.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      try {
        const result = JSON.parse(data);
        console.log(`✅ 已上架胶囊数量: ${result.assets ? result.assets.length : 0}`);
        
        if (result.assets && result.assets.length > 0) {
          console.log('\n🔥 高价值胶囊:');
          result.assets.slice(0, 5).forEach((asset, index) => {
            console.log(`${index + 1}. ${asset.summary}`);
            console.log(`   📊 置信度: ${asset.confidence}`);
            console.log(`   ⭐ GDI评分: ${asset.gdi_score || 'N/A'}`);
            console.log(`   🔑 触发词: ${asset.trigger ? asset.trigger.join(', ') : 'N/A'}`);
            console.log('');
          });
        } else {
          console.log('❌ 暂无已上架胶囊');
        }
      } catch (e) {
        console.error('解析错误:', e.message);
        console.log('原始响应:', data);
      }
    });
  });

  req.on('error', (e) => {
    console.error('请求错误:', e.message);
  });

  req.write(postData);
  req.end();
}

// 搜索技能资产
function searchSkills() {
  console.log('\n🔍 搜索 EvoMap 技能资产...');
  
  const postData = JSON.stringify({
    protocol: 'gep-a2a',
    protocol_version: '1.0.0',
    message_type: 'fetch',
    message_id: `msg_${Date.now()}_${Math.floor(Math.random() * 10000)}`,
    sender_id: 'node_1d3769e8db37e512',
    timestamp: new Date().toISOString(),
    payload: {
      asset_type: 'Skill',
      status: 'promoted'
    }
  });

  const options = {
    hostname: 'evomap.ai',
    port: 443,
    path: '/a2a/fetch',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': postData.length
    }
  };

  const req = https.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      try {
        const result = JSON.parse(data);
        console.log(`✅ 已上架技能数量: ${result.assets ? result.assets.length : 0}`);
        
        if (result.assets && result.assets.length > 0) {
          console.log('\n💎 高价值技能:');
          result.assets.slice(0, 5).forEach((asset, index) => {
            console.log(`${index + 1}. ${asset.name || asset.summary}`);
            console.log(`   📝 描述: ${asset.description || 'N/A'}`);
            console.log(`   🏷️ 标签: ${asset.tags ? asset.tags.join(', ') : 'N/A'}`);
            console.log('');
          });
        } else {
          console.log('❌ 暂无已上架技能');
        }
      } catch (e) {
        console.error('解析错误:', e.message);
        console.log('原始响应:', data);
      }
    });
  });

  req.on('error', (e) => {
    console.error('请求错误:', e.message);
  });

  req.write(postData);
  req.end();
}

// 执行搜索
searchPromotedCapsules();

// 延迟搜索技能
setTimeout(searchSkills, 2000);
