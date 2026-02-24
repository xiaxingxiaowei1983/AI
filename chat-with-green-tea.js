const http = require('http');
const readline = require('readline');

// 创建命令行交互界面
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '你: ' // 设置提示符
});

// 发送消息到 Trea Model Proxy Server
function sendMessageToGreenTea(message) {
  return new Promise((resolve, reject) => {
    // 测试数据
    const testData = {
      message: message,
      agent: 'green-tea',
      timestamp: new Date().toISOString()
    };
    
    // 构建请求选项
    const options = {
      hostname: 'localhost',
      port: 4003,
      path: '/api/chat',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(JSON.stringify(testData))
      }
    };
    
    // 发送请求
    const req = http.request(options, (res) => {
      let data = '';
      
      // 接收响应
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      // 处理响应
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          resolve(response);
        } catch (error) {
          reject(error);
        }
      });
    });
    
    // 处理请求错误
    req.on('error', (error) => {
      reject(error);
    });
    
    // 发送请求体
    req.write(JSON.stringify(testData));
    req.end();
  });
}

// 启动交互式对话
function startInteractiveChat() {
  console.log('🎯 绿茶智能体对话系统');
  console.log('📡 连接到 Trea Model Proxy Server (http://localhost:4003)');
  console.log('\n💡 提示:');
  console.log('   - 直接输入消息与绿茶智能体对话');
  console.log('   - 输入 "退出" 或 "exit" 结束对话');
  console.log('   - 输入 "帮助" 或 "help" 查看帮助信息');
  console.log('\n====================================');
  console.log('绿茶智能体: 你好！我是绿茶智能体，很高兴为你服务。');
  console.log('====================================\n');
  
  // 显示提示符
  rl.prompt();
  
  // 处理用户输入
  rl.on('line', async (line) => {
    const message = line.trim();
    
    // 处理特殊命令
    if (message === '退出' || message === 'exit') {
      console.log('\n绿茶智能体: 再见！期待下次与你聊天。');
      rl.close();
      return;
    } else if (message === '帮助' || message === 'help') {
      console.log('\n💡 帮助信息:');
      console.log('   - 直接输入消息与绿茶智能体对话');
      console.log('   - 输入 "退出" 或 "exit" 结束对话');
      console.log('   - 输入 "帮助" 或 "help" 查看帮助信息');
      rl.prompt();
      return;
    }
    
    try {
      // 发送消息到服务器
      console.log('📤 发送中...');
      const response = await sendMessageToGreenTea(message);
      
      // 显示响应
      if (response.success) {
        console.log(`\n绿茶智能体: ${response.message}`);
      } else {
        console.log(`\n❌ 错误: ${response.error}`);
      }
    } catch (error) {
      console.log(`\n❌ 发送消息失败: ${error.message}`);
      console.log('💡 请确保 Trea Model Proxy Server 正在运行 (http://localhost:4003)');
    }
    
    // 显示下一个提示符
    console.log('');
    rl.prompt();
  });
  
  // 处理对话结束
  rl.on('close', () => {
    console.log('\n📡 对话已结束');
    process.exit(0);
  });
}

// 启动交互式对话
startInteractiveChat();