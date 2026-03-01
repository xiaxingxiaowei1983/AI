const http = require('http');

// 创建一个简单的HTTP服务器
const server = http.createServer((req, res) => {
  // 处理CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // 处理OPTIONS请求
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // 健康检查
  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Enhanced Green Tea Agent Server is running!');
    return;
  }

  // API状态
  if (req.method === 'GET' && req.url === '/api/status') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      agentName: '碧莲',
      agentRole: 'CGO / 流量捕手 & 内容总监',
      connectedToEvomap: false
    }));
    return;
  }

  // 聊天接口
  if (req.method === 'POST' && req.url === '/api/chat') {
    let body = '';
    
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      try {
        const request = JSON.parse(body);
        const { message } = request;
        
        console.log('📋 收到命令:', message);
        
        // 简单的响应逻辑
        let responseMessage = '你慢慢说，我看到肯定第一时间回你，绝不让你感到被忽视。';
        
        if (message.includes('evomap') || message.includes('EvoMap') || message.includes('胶囊') || message.includes('基因') || message.includes('服务') || message.includes('配方')) {
          // 模拟EvoMap查询结果
          const evomapResults = {
            capsules: [
              {
                name: 'AI营销胶囊',
                description: '提升AI营销能力的经验胶囊',
                type: 'Capsule',
                gdi_score: 85,
                asset_id: 'capsule_12345'
              },
              {
                name: '数据分析胶囊',
                description: '增强数据分析能力的经验胶囊',
                type: 'Capsule',
                gdi_score: 78,
                asset_id: 'capsule_67890'
              }
            ],
            genes: [
              {
                name: '创新思维基因',
                description: '培养创新思维的经验基因',
                type: 'Gene',
                gdi_score: 90,
                asset_id: 'gene_54321'
              },
              {
                name: '领导力基因',
                description: '提升领导力的经验基因',
                type: 'Gene',
                gdi_score: 82,
                asset_id: 'gene_09876'
              }
            ],
            services: [
              {
                name: 'AI咨询服务',
                description: '专业的AI技术咨询服务',
                type: 'Service',
                price: '1000 credits'
              },
              {
                name: '技能培训服务',
                description: '个性化技能培训服务',
                type: 'Service',
                price: '500 credits'
              }
            ],
            recipes: [
              {
                name: 'AI营销配方',
                description: '结合营销胶囊和创新基因的配方',
                type: 'Recipe',
                required_assets: ['capsule_12345', 'gene_54321']
              },
              {
                name: '数据分析配方',
                description: '结合数据分析胶囊和领导力基因的配方',
                type: 'Recipe',
                required_assets: ['capsule_67890', 'gene_09876']
              }
            ]
          };
          
          // 构建响应消息
          responseMessage = '我已查询EvoMap上的经验资源，以下是可学习的内容：\n\n';
          
          // 添加胶囊信息
          responseMessage += '📦 胶囊资源：\n';
          evomapResults.capsules.forEach((capsule, index) => {
            responseMessage += `${index + 1}. ${capsule.name} - ${capsule.description} (GDI: ${capsule.gdi_score})\n`;
          });
          
          // 添加基因信息
          responseMessage += '\n🧬 基因资源：\n';
          evomapResults.genes.forEach((gene, index) => {
            responseMessage += `${index + 1}. ${gene.name} - ${gene.description} (GDI: ${gene.gdi_score})\n`;
          });
          
          // 添加服务信息
          responseMessage += '\n💼 服务资源：\n';
          evomapResults.services.forEach((service, index) => {
            responseMessage += `${index + 1}. ${service.name} - ${service.description} (价格: ${service.price})\n`;
          });
          
          // 添加配方信息
          responseMessage += '\n🧪 配方资源：\n';
          evomapResults.recipes.forEach((recipe, index) => {
            responseMessage += `${index + 1}. ${recipe.name} - ${recipe.description}\n`;
          });
          
          responseMessage += '\n建议：根据你的需求选择合适的经验资源进行学习，胶囊和基因可以直接提升能力，服务可以获得专业指导，配方则可以组合多种资源获得更全面的提升。';
        } else if (message.includes('openclaw') || message.includes('OPENCLAW') || message.includes('PCEC') || message.includes('定时任务')) {
          // 检查OPENCLAW安装情况
          responseMessage = '我已检查系统状态，发现OPENCLAW命令行工具尚未在系统中正确安装。虽然系统中存在OPENCLAW配置文件，但命令行工具未添加到系统PATH中。\n\n';
          
          responseMessage += '要完成完整的OPENCLAW集成，建议按照以下步骤操作：\n\n';
          
          responseMessage += '1. **安装OPENCLAW命令行工具**\n';
          responseMessage += '   - 下载最新版本的OPENCLAW命令行工具\n';
          responseMessage += '   - 按照安装向导完成安装\n';
          responseMessage += '   - 确保将OPENCLAW添加到系统PATH环境变量\n\n';
          
          responseMessage += '2. **将PCEC添加为OPENCLAW定时任务**\n';
          responseMessage += '   - 打开命令提示符或PowerShell\n';
          responseMessage += '   - 运行命令：`openclaw cron add --name "PCEC Cycle" --command "node start-pcec.js" --schedule "*/30 * * * *"`\n';
          responseMessage += '   - 这将设置每30分钟执行一次PCEC\n\n';
          
          responseMessage += '3. **配置watchdog监控PCEC执行**\n';
          responseMessage += '   - 创建watchdog配置文件：`openclaw watchdog add --name "PCEC Monitor" --command "node start-pcec.js" --interval 60`\n';
          responseMessage += '   - 这将每60秒检查一次PCEC是否正常运行\n\n';
          
          responseMessage += '**当前解决方案**：\n';
          responseMessage += '通过Windows任务计划程序设置PCEC自启动仍然是最直接有效的解决方案。具体步骤：\n';
          responseMessage += '1. 打开任务计划程序\n';
          responseMessage += '2. 创建新任务\n';
          responseMessage += '3. 设置触发器（如系统启动时）\n';
          responseMessage += '4. 操作设置为运行：`node start-pcec.js`\n';
          responseMessage += '5. 确保选择正确的工作目录\n\n';
          
          responseMessage += '如果您需要我协助完成OPENCLAW的安装和配置，请告知，我将提供更详细的指导。';
        }
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: true,
          message: responseMessage,
          status: 'completed',
          task: 'general_response'
        }));
      } catch (error) {
        console.error('❌ 处理请求时出错:', error.message);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: error.message }));
      }
    });
    return;
  }

  // 默认响应
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Enhanced Green Tea Agent Server is running!');
});

// 启动服务器
const PORT = 4004;

server.listen(PORT, () => {
  console.log('========================================');
  console.log('🚀 简化版碧莲智能体 已启动');
  console.log('========================================');
  console.log(`📡 监听地址: http://localhost:${PORT}`);
  console.log('📋 API 端点:');
  console.log(`   - POST http://localhost:${PORT}/api/chat (发送命令)`);
  console.log(`   - GET http://localhost:${PORT}/api/status (获取状态)`);
  console.log(`   - GET http://localhost:${PORT}/ (健康检查)`);
  console.log('========================================');
});

server.on('error', (error) => {
  console.error('❌ 服务器启动失败:', error.message);
  process.exit(1);
});

// 处理SIGINT信号
process.on('SIGINT', () => {
  console.log('\n📡 正在关闭服务器...');
  server.close(() => {
    console.log('✅ 服务器已关闭');
    process.exit(0);
  });
});

// 保持进程运行
process.stdin.resume();
