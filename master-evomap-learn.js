/**
 * 大宗师 EvoMap 学习脚本
 * 版本: 1.0.0
 * 描述: 让大宗师访问 EvoMap 链接进行学习
 */

const { getBindingStatus, sendHeartbeat } = require('./evomap-binding');
const https = require('https');
const fs = require('fs');
const path = require('path');

// EvoMap 链接列表
const evomapLinks = [
  'https://evomap.ai/market/recipe/cmm0e3x6800qfnx01u6i47dec',
  'https://evomap.ai/market/service/cmlz4iwjt000qo3011z2yxk61',
  'https://evomap.ai/market/recipe/cmlz4iwo4000vo301ydtztvfb',
  'https://evomap.ai/market/service/cmlz4iwbd000ho301eul0rosc',
  'https://evomap.ai/market/service/cmm019c2n00geoc0113llfk3u',
  'https://evomap.ai/market/service/cmm02c4vm02l1oc01dup3087o',
  'https://evomap.ai/market/recipe/cmlzh4p8z0azvphff1zoi38yt',
  'https://evomap.ai/market/recipe/cmlz4iwcn000io301ov07dd3p',
  'https://evomap.ai/market/recipe/cmm47de2612phti01clp0jmoy',
  'https://evomap.ai/market/recipe/cmlz4iwgs000no301mdb8znlj',
  'https://evomap.ai/market/service/cmm5cvz5403uyqo01uybrilcg'
];

// 学习日志目录
const learnLogDir = path.join(__dirname, 'evolver', 'learn-logs');

// 确保日志目录存在
function ensureLogDir() {
  if (!fs.existsSync(learnLogDir)) {
    fs.mkdirSync(learnLogDir, { recursive: true });
  }
}

// 下载 EvoMap 内容
async function downloadEvoMapContent(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve(data);
      });
    }).on('error', (error) => {
      reject(new Error(`Failed to download content: ${error.message}`));
    });
  });
}

// 保存学习内容
function saveLearningContent(url, content) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `learn_${timestamp}.md`;
  const filepath = path.join(learnLogDir, filename);
  
  const learningData = {
    url,
    timestamp: new Date().toISOString(),
    content: content.substring(0, 10000), // 限制内容大小
    summary: content.substring(0, 500) // 保存摘要
  };
  
  fs.writeFileSync(filepath, JSON.stringify(learningData, null, 2));
  return filepath;
}

// 分析 EvoMap 内容
function analyzeContent(content) {
  // 简单的内容分析
  const wordCount = content.length;
  const hasCode = content.includes('<code>') || content.includes('```');
  const hasImages = content.includes('<img') || content.includes('![](');
  
  return {
    wordCount,
    hasCode,
    hasImages,
    contentLength: content.length
  };
}

// 主学习函数
async function learnFromEvoMap() {
  console.log('=== 大宗师 EvoMap 学习流程 ===\n');
  
  try {
    // 步骤1: 检查 EvoMap 连接状态
    console.log('步骤1: 检查 EvoMap 连接状态...');
    const status = getBindingStatus();
    console.log('✅ 状态检查完成');
    console.log(`   节点ID: ${status.nodeId || '未设置'}`);
    console.log(`   代理名称: ${status.agentName || '未设置'}`);
    console.log(`   所有者邮箱: ${status.ownerEmail || '未设置'}`);
    console.log(`   节点状态: ${status.nodeStatus || '未知'}`);
    console.log('');
    
    // 步骤2: 发送心跳保持连接
    console.log('步骤2: 发送心跳保持连接...');
    try {
      const heartbeatResult = await sendHeartbeat();
      if (heartbeatResult) {
        console.log('✅ 心跳发送成功，节点保持在线');
      } else {
        console.log('⚠️  心跳发送失败，节点可能离线');
      }
    } catch (heartbeatError) {
      console.log('⚠️  心跳发送失败:', heartbeatError.message);
    }
    console.log('');
    
    // 步骤3: 确保日志目录存在
    ensureLogDir();
    
    // 步骤4: 逐个访问 EvoMap 链接
    console.log('步骤4: 访问 EvoMap 链接进行学习...');
    console.log(`共 ${evomapLinks.length} 个链接需要学习\n`);
    
    let successCount = 0;
    let failedCount = 0;
    
    for (let i = 0; i < evomapLinks.length; i++) {
      const url = evomapLinks[i];
      console.log(`正在学习 ${i + 1}/${evomapLinks.length}: ${url}`);
      
      try {
        // 下载内容
        const content = await downloadEvoMapContent(url);
        
        // 分析内容
        const analysis = analyzeContent(content);
        
        // 保存学习内容
        const savedPath = saveLearningContent(url, content);
        
        console.log(`✅ 学习完成`);
        console.log(`   保存路径: ${savedPath}`);
        console.log(`   内容长度: ${analysis.contentLength} 字符`);
        console.log(`   包含代码: ${analysis.hasCode ? '是' : '否'}`);
        console.log(`   包含图片: ${analysis.hasImages ? '是' : '否'}`);
        console.log('');
        
        successCount++;
        
        // 短暂延迟，避免请求过快
        await new Promise(resolve => setTimeout(resolve, 2000));
        
      } catch (error) {
        console.log(`❌ 学习失败: ${error.message}`);
        console.log('');
        failedCount++;
      }
    }
    
    // 步骤5: 学习总结
    console.log('步骤5: 学习总结');
    console.log('=====================================');
    console.log(`总链接数: ${evomapLinks.length}`);
    console.log(`成功学习: ${successCount}`);
    console.log(`学习失败: ${failedCount}`);
    console.log(`成功率: ${((successCount / evomapLinks.length) * 100).toFixed(2)}%`);
    console.log('=====================================\n');
    
    console.log('=== 学习流程完成 ===');
    console.log('大宗师已完成 EvoMap 内容学习！');
    console.log('学习内容已保存到日志目录，可供后续分析和进化使用。');
    console.log('');
    
    return {
      status: 'completed',
      message: '大宗师已完成 EvoMap 内容学习',
      statistics: {
        total: evomapLinks.length,
        success: successCount,
        failed: failedCount,
        successRate: (successCount / evomapLinks.length) * 100
      }
    };
    
  } catch (error) {
    console.error('❌ 学习流程失败:', error.message);
    throw error;
  }
}

// 主函数
async function main() {
  try {
    await learnFromEvoMap();
  } catch (error) {
    console.error('❌ 执行失败:', error.message);
    process.exit(1);
  }
}

// 执行主函数
if (require.main === module) {
  main();
}

// 导出模块
module.exports = {
  learnFromEvoMap
};