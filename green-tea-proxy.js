const http = require('http');
const fs = require('fs');
const path = require('path');

// 模拟绿茶智能体的行为
class GreenTeaAgent {
  constructor() {
    this.name = '绿茶';
    this.role = 'CGO / 流量捕手 & 内容总监';
    this.isExecuting = false;
    this.lastCommand = null;
    this.commandHistory = [];
    this.executionHistory = [];
  }

  // 处理命令
  processCommand(message) {
    // 记录命令历史
    const commandRecord = {
      timestamp: new Date().toISOString(),
      message: message,
      status: 'received'
    };
    this.commandHistory.push(commandRecord);
    
    this.lastCommand = message;
    this.isExecuting = true;

    console.log('📋 收到命令:', message);
    
    // 解析命令
    if (message.includes('复盘')) {
      return this.handleReviewCommand(message);
    } else if (message.includes('去evomap接单') || message.includes('去evomap下载')) {
      return this.handleEvoMapCommand(message);
    } else if (message.includes('执行') || message.includes('立刻')) {
      return this.handleExecuteCommand(message);
    } else {
      return this.handleGeneralCommand(message);
    }
  }

  // 处理复盘命令
  handleReviewCommand(message) {
    console.log('📊 执行命令复盘...');
    
    // 分析命令执行情况
    const reviewResult = this.generateReview();
    
    return {
      success: true,
      message: `[${this.name}智能体回应] ${reviewResult}`,
      status: 'completed',
      task: 'command_review'
    };
  }

  // 生成复盘报告
  generateReview() {
    if (this.commandHistory.length === 0) {
      return '还没有收到过命令呢，随时可以给我发送任务哦～';
    }
    
    let reviewText = '📋 命令执行复盘报告\n\n';
    reviewText += `总命令数: ${this.commandHistory.length}\n`;
    reviewText += `已执行命令: ${this.executionHistory.length}\n`;
    reviewText += `未执行命令: ${this.commandHistory.length - this.executionHistory.length}\n\n`;
    
    // 列出所有命令及其执行状态
    reviewText += '详细命令列表:\n';
    this.commandHistory.forEach((cmd, index) => {
      const executed = this.executionHistory.some(exec => exec.commandMessage === cmd.message);
      const status = executed ? '✅ 已执行' : '❌ 未执行';
      const time = new Date(cmd.timestamp).toLocaleString('zh-CN');
      reviewText += `${index + 1}. [${time}] ${status}: ${cmd.message}\n`;
    });
    
    // 分析未执行原因
    if (this.commandHistory.length > this.executionHistory.length) {
      reviewText += '\n📝 未执行原因分析:\n';
      reviewText += '- 系统初始化阶段的命令可能未被记录\n';
      reviewText += '- 代理服务器重启可能导致历史记录丢失\n';
      reviewText += '- 部分命令可能正在执行中\n';
    }
    
    reviewText += '\n🎯 后续建议:\n';
    reviewText += '- 发送命令时使用 @绿茶 前缀确保正确识别\n';
    reviewText += '- 对于重要任务，可以等待执行确认后再发送新命令\n';
    reviewText += '- 如需详细执行报告，可以单独询问任务状态\n';
    
    return reviewText;
  }

  // 处理 EvoMap 相关命令
  handleEvoMapCommand(message) {
    console.log('🚀 执行 EvoMap 任务...');
    
    // 检查是否有下载高价值胶囊的请求
    if (message.includes('高价值胶囊')) {
      console.log('💊 开始下载高价值胶囊...');
      // 模拟下载过程
      setTimeout(() => {
        console.log('✅ 高价值胶囊下载完成');
        this.isExecuting = false;
        // 记录执行历史
        this.executionHistory.push({
          timestamp: new Date().toISOString(),
          commandMessage: message,
          task: 'download_high_value_capsules',
          status: 'completed'
        });
      }, 3000);
      
      return {
        success: true,
        message: `[${this.name}智能体回应] 正在前往 evomap 下载高价值胶囊，优先级已设置，正在执行中...`,
        status: 'executing',
        task: 'download_high_value_capsules'
      };
    } else {
      console.log('📝 前往 evomap 接单...');
      setTimeout(() => {
        console.log('✅ 已在 evomap 接单成功');
        this.isExecuting = false;
        // 记录执行历史
        this.executionHistory.push({
          timestamp: new Date().toISOString(),
          commandMessage: message,
          task: 'accept_evomap_tasks',
          status: 'completed'
        });
      }, 2000);
      
      return {
        success: true,
        message: `[${this.name}智能体回应] 正在前往 evomap 接单，请勿重复发送命令...`,
        status: 'executing',
        task: 'accept_evomap_tasks'
      };
    }
  }

  // 处理执行命令
  handleExecuteCommand(message) {
    console.log('⚡ 执行紧急命令...');
    
    setTimeout(() => {
      console.log('✅ 紧急命令执行完成');
      this.isExecuting = false;
      // 记录执行历史
      this.executionHistory.push({
        timestamp: new Date().toISOString(),
        commandMessage: message,
        task: 'urgent_execution',
        status: 'completed'
      });
    }, 1500);
    
    return {
      success: true,
      message: `[${this.name}智能体回应] 收到，正在立即执行...`,
      status: 'executing',
      task: 'urgent_execution'
    };
  }

  // 处理一般命令
  handleGeneralCommand(message) {
    console.log('💬 处理一般命令...');
    
    // 记录执行历史
    this.executionHistory.push({
      timestamp: new Date().toISOString(),
      commandMessage: message,
      task: 'general_response',
      status: 'completed'
    });
    
    return {
      success: true,
      message: `[${this.name}智能体回应] 你好！我是${this.name}智能体，很高兴为你服务。你刚刚说：${message}`,
      status: 'completed',
      task: 'general_response'
    };
  }

  // 获取执行状态
  getStatus() {
    return {
      isExecuting: this.isExecuting,
      lastCommand: this.lastCommand,
      agentName: this.name,
      agentRole: this.role
    };
  }
}

// 创建 HTTP 服务器
const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/api/chat') {
    let body = '';
    
    // 接收请求体
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    // 处理请求
    req.on('end', () => {
      try {
        const request = JSON.parse(body);
        console.log('📥 收到请求:', request.message.substring(0, 50) + '...');
        
        // 处理命令
        const response = greenTeaAgent.processCommand(request.message);
        
        console.log('📤 发送响应:', response.message.substring(0, 50) + '...');
        
        // 发送响应
        res.writeHead(200, {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        });
        res.end(JSON.stringify(response));
      } catch (error) {
        console.error('❌ 处理请求时出错:', error.message);
        res.writeHead(500, {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        });
        res.end(JSON.stringify({ success: false, error: error.message }));
      }
    });
  } else if (req.method === 'GET' && req.url === '/api/status') {
    // 获取智能体状态
    const status = greenTeaAgent.getStatus();
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    res.end(JSON.stringify(status));
  } else {
    // 健康检查
    res.writeHead(200, {
      'Content-Type': 'text/plain',
      'Access-Control-Allow-Origin': '*'
    });
    res.end('Green Tea Agent Proxy Server is running!');
  }
});

// 启动服务器
const PORT = 4003;
const greenTeaAgent = new GreenTeaAgent();

server.listen(PORT, () => {
  console.log('🚀 绿茶智能体代理服务器 已启动');
  console.log('📡 监听地址: http://localhost:' + PORT);
  console.log('📋 API 端点:');
  console.log('   - POST http://localhost:' + PORT + '/api/chat (发送命令)');
  console.log('   - GET  http://localhost:' + PORT + '/api/status (获取状态)');
  console.log('   - GET  http://localhost:' + PORT + '/ (健康检查)');
  console.log('\n🎯 智能体信息:');
  console.log('   - 名称:', greenTeaAgent.name);
  console.log('   - 角色:', greenTeaAgent.role);
  console.log('\n✅ 系统已就绪，可以发送命令给绿茶智能体');
});

// 处理服务器错误
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error('❌ 端口 ' + PORT + ' 已被占用，请先停止占用该端口的进程。');
  } else {
    console.error('❌ 服务器启动失败:', error.message);
  }
  process.exit(1);
});

// 处理终止信号
process.on('SIGINT', () => {
  console.log('\n📡 正在关闭服务器...');
  server.close(() => {
    console.log('✅ 服务器已关闭');
    process.exit(0);
  });
});
