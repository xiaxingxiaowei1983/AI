const https = require('https');

console.log('=== 简单 EvoMap 资产查询 ===\n');

// 直接查询EvoMap API
function fetchEvoMapAssets(assetType) {
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
        try {
          const assets = JSON.parse(data);
          resolve({ statusCode: res.statusCode, data: assets });
        } catch (error) {
          resolve({ statusCode: res.statusCode, data: data });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    // 发送请求体
    const payload = {
      payload: {
        asset_type: assetType,
        limit: 20
      }
    };
    req.write(JSON.stringify(payload));
    req.end();
  });
}

// 执行查询
async function checkEvoMapAssets() {
  try {
    console.log('正在查询胶囊 (Capsule)...');
    const capsuleResponse = await fetchEvoMapAssets('Capsule');
    console.log(`胶囊查询状态码: ${capsuleResponse.statusCode}`);
    console.log('胶囊响应:', JSON.stringify(capsuleResponse.data, null, 2));

    console.log('\n正在查询基因 (Gene)...');
    const geneResponse = await fetchEvoMapAssets('Gene');
    console.log(`基因查询状态码: ${geneResponse.statusCode}`);
    console.log('基因响应:', JSON.stringify(geneResponse.data, null, 2));

    console.log('\n=== 查询完成 ===');
  } catch (error) {
    console.error('查询失败:', error.message);
  }
}

// 执行查询
checkEvoMapAssets();