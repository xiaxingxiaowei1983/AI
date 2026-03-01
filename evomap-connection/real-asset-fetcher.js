const https = require('https');
const fs = require('fs');
const path = require('path');

/**
 * EvoMap真实资产获取系统
 */
class EvoMapRealAssetFetcher {
  constructor() {
    this.baseUrl = 'https://evomap.ai';
    this.protocol = 'GEP-A2A';
    this.protocolVersion = '1.0.0';
    this.nodeId = '1226898';
    this.assetDir = path.join(__dirname, 'real-assets');
    this.fetchedAssets = [];
    
    if (!fs.existsSync(this.assetDir)) {
      fs.mkdirSync(this.assetDir, { recursive: true });
    }
  }

  /**
   * 生成消息ID
   */
  generateMessageId() {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * 发送HTTP请求
   */
  async sendRequest(endpoint, method = 'GET', data = null) {
    const url = `${this.baseUrl}${endpoint}`;
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'X-Protocol': this.protocol,
        'X-Protocol-Version': this.protocolVersion,
        'X-Node-ID': this.nodeId
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
            resolve({ statusCode: res.statusCode, data: parsedData });
          } catch (error) {
            resolve({ statusCode: res.statusCode, data: responseData });
          }
        });
      });

      req.on('error', (error) => {
        reject(error);
      });

      if (data && (method === 'POST' || method === 'PUT')) {
        req.write(JSON.stringify(data));
      }

      req.end();
    });
  }

  /**
   * 发送心跳并获取推荐资产
   */
  async sendHeartbeatAndGetAssets() {
    try {
      console.log('📡 发送心跳请求获取资产...');
      
      const heartbeatData = {
        protocol: this.protocol.toLowerCase(),
        protocol_version: this.protocolVersion,
        message_type: 'heartbeat',
        message_id: this.generateMessageId(),
        sender_id: `node_${this.nodeId}`,
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

      const response = await this.sendRequest('/a2a/heartbeat', 'POST', heartbeatData);
      
      if (response.statusCode === 200) {
        console.log('✅ 心跳成功');
        
        const assets = response.data.promoted_assets || [];
        console.log(`📦 获取到 ${assets.length} 个推荐资产`);
        
        if (assets.length > 0) {
          console.log('\n📦 资产列表:');
          assets.forEach((asset, index) => {
            console.log(`   ${index + 1}. [${asset.id || 'N/A'}] ${asset.name || 'N/A'}`);
            console.log(`      类型: ${asset.type || 'N/A'}`);
            console.log(`      GDI分数: ${asset.gdi_score || 'N/A'}`);
            console.log('');
          });
        }
        
        return assets;
      } else {
        console.log(`❌ 心跳失败，状态码: ${response.statusCode}`);
        return [];
      }
    } catch (error) {
      console.error(`❌ 心跳错误: ${error.message}`);
      return [];
    }
  }

  /**
   * 保存资产
   */
  saveAsset(asset) {
    const assetId = asset.id || `asset_${Date.now()}`;
    const assetFile = path.join(this.assetDir, `${assetId}.json`);
    fs.writeFileSync(assetFile, JSON.stringify(asset, null, 2));
    console.log(`💾 资产已保存: ${assetFile}`);
    return assetFile;
  }

  /**
   * 筛选高价值资产
   */
  filterHighValueAssets(assets, minGdiScore = 60) {
    return assets.filter(asset => {
      const gdiScore = asset.gdi_score || 0;
      return gdiScore >= minGdiScore;
    });
  }

  /**
   * 获取并保存资产
   */
  async fetchAndSaveAssets() {
    try {
      console.log('========================================');
      console.log('🚀 开始获取真实资产');
      console.log('========================================\n');
      
      const assets = await this.sendHeartbeatAndGetAssets();
      
      if (assets.length === 0) {
        console.log('❌ 没有可用的资产');
        return [];
      }
      
      console.log('\n🔍 筛选高价值资产...');
      const highValueAssets = this.filterHighValueAssets(assets, 60);
      console.log(`📊 筛选出 ${highValueAssets.length} 个高价值资产 (GDI ≥ 60)`);
      
      if (highValueAssets.length === 0) {
        console.log('⚠️ 没有高价值资产，保存所有资产');
        highValueAssets.push(...assets);
      }
      
      console.log('\n💾 保存资产...');
      highValueAssets.forEach((asset, index) => {
        console.log(`\n${index + 1}. 保存资产: ${asset.name || 'N/A'}`);
        this.saveAsset(asset);
        this.fetchedAssets.push(asset);
      });
      
      console.log('\n========================================');
      console.log('🎉 资产获取完成！');
      console.log('========================================\n');
      console.log(`✅ 成功获取并保存 ${highValueAssets.length} 个资产`);
      console.log(`📁 资产文件已保存到: ${this.assetDir}`);
      
      return highValueAssets;
    } catch (error) {
      console.error(`❌ 获取资产时出错: ${error.message}`);
      return [];
    }
  }

  /**
   * 获取已获取的资产
   */
  getFetchedAssets() {
    const assets = [];
    const files = fs.readdirSync(this.assetDir);
    
    files.forEach(file => {
      if (file.endsWith('.json')) {
        const assetData = fs.readFileSync(path.join(this.assetDir, file), 'utf8');
        assets.push(JSON.parse(assetData));
      }
    });
    
    return assets;
  }
}

async function main() {
  const fetcher = new EvoMapRealAssetFetcher();
  const assets = await fetcher.fetchAndSaveAssets();
  
  if (assets.length > 0) {
    console.log(`\n✅ 成功获取 ${assets.length} 个资产`);
    process.exit(0);
  } else {
    console.log('\n❌ 未能获取资产');
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = EvoMapRealAssetFetcher;
