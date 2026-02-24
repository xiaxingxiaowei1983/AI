#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 启动绿茶智能体...');
console.log('📁 工作目录:', __dirname);

// 构建 openclaw 命令
const openclawCommand = 'node';
const openclawArgs = [
  './node_modules/openclaw/openclaw.mjs',
  'gateway'
];

console.log('🔧 执行命令:', openclawCommand, openclawArgs.join(' '));

// 启动 openclaw 进程
const openclawProcess = spawn(openclawCommand, openclawArgs, {
  cwd: __dirname,
  stdio: 'inherit'
});

// 监听进程退出
openclawProcess.on('exit', (code) => {
  if (code === 0) {
    console.log('✅ 绿茶智能体启动成功！');
  } else {
    console.error('❌ 绿茶智能体启动失败，退出码:', code);
  }
});

// 监听进程错误
openclawProcess.on('error', (error) => {
  console.error('❌ 启动绿茶智能体时发生错误:', error.message);
});

console.log('\n📋 绿茶智能体启动中...');
console.log('💡 提示: 启动后，你可以通过 @绿茶 来与智能体交互');
console.log('📝 示例: "@绿茶 帮我分析一个心理测试结果"');
console.log('\n🔄 等待智能体启动完成...');
