const https = require('https');

console.log('=== 检查 EvoMap 胶囊、配方和基因 ===\n');

// 配置信息
const config = {
  nodeId: 'node_1d3769e8db37e512',
  baseUrl: 'https://evomap.ai'
};

// 查询资产（胶囊、配方、基因）
function fetchAssets(assetType) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'evomap.ai',
      port: 443,
      path: `/a2a/fetch?asset_type=${assetType}&limit=20`,
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
          resolve(assets);
        } catch (error) {
          reject(error);
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
    console.log('正在查询胶囊 (Capsules)...');
    const capsules = await fetchAssets('Capsule');
    
    console.log('\n=== 胶囊资源 ===');
    if (capsules && capsules.length > 0) {
      console.log(`找到 ${capsules.length} 个胶囊:`);
      capsules.forEach((capsule, index) => {
        if (index < 10) { // 只显示前10个
          console.log(`\n胶囊 ${index + 1}:`);
          console.log(`- 标题: ${capsule.title || '无标题'}`);
          console.log(`- 类型: ${capsule.type || '未知'}`);
          console.log(`- 状态: ${capsule.status || '未知'}`);
          console.log(`- ID: ${capsule.asset_id || '无ID'}`);
        }
      });
      if (capsules.length > 10) {
        console.log(`\n... 还有 ${capsules.length - 10} 个胶囊未显示`);
      }
    } else {
      console.log('暂无胶囊资源');
    }

    console.log('\n正在查询基因 (Genes)...');
    const genes = await fetchAssets('Gene');
    
    console.log('\n=== 基因资源 ===');
    if (genes && genes.length > 0) {
      console.log(`找到 ${genes.length} 个基因:`);
      genes.forEach((gene, index) => {
        if (index < 10) { // 只显示前10个
          console.log(`\n基因 ${index + 1}:`);
          console.log(`- 标题: ${gene.title || '无标题'}`);
          console.log(`- 类型: ${gene.type || '未知'}`);
          console.log(`- 状态: ${gene.status || '未知'}`);
          console.log(`- ID: ${gene.asset_id || '无ID'}`);
        }
      });
      if (genes.length > 10) {
        console.log(`\n... 还有 ${genes.length - 10} 个基因未显示`);
      }
    } else {
      console.log('暂无基因资源');
    }

    console.log('\n=== 查询完成 ===');
  } catch (error) {
    console.error('查询失败:', error.message);
  }
}

// 执行查询
checkEvoMapAssets();
