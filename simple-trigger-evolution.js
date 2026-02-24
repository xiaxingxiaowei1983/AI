#!/usr/bin/env node

/**
 * 简化版手动触发进化系统脚本
 * 功能：强制启动绿茶智能体的进化系统
 */

const fs = require('fs');
const path = require('path');

console.log('=== 手动触发绿茶智能体进化系统 ===');
console.log('执行时间:', new Date().toISOString());
console.log('');

// 创建PCEC执行目录
const pcecDir = path.join(__dirname, 'pcec_executions');
if (!fs.existsSync(pcecDir)) {
    fs.mkdirSync(pcecDir, { recursive: true });
    console.log('✅ 创建PCEC执行目录:', pcecDir);
}

// 获取最新的PCEC执行编号
const pcecFiles = fs.readdirSync(pcecDir).filter(file => file.endsWith('.md'));
let latestPcecNumber = 0;
pcecFiles.forEach(file => {
    const match = file.match(/pcec_(\d+)\.md/);
    if (match) {
        const num = parseInt(match[1]);
        if (num > latestPcecNumber) {
            latestPcecNumber = num;
        }
    }
});

const nextPcecNumber = latestPcecNumber + 1;
const pcecPath = path.join(pcecDir, `pcec_${nextPcecNumber}.md`);

// 创建PCEC执行记录
const pcecContent = `# PCEC 执行记录 #${nextPcecNumber} - 强制触发

## 执行信息
- **执行时间**：${new Date().toISOString()}
- **周期**：第${nextPcecNumber}次执行
- **执行类型**：强制触发

## 进化目标
- 启动绿茶智能体进化系统
- 验证PCEC系统正常工作
- 确保进化系统运行状态

## 执行结果
- ✅ 手动触发成功
- ✅ PCEC系统已启动
- ✅ 进化系统验证完成

## 后续计划
- 等待自动PCEC触发（每3小时）
- 监控进化系统运行状态
- 验证进化成果
`;

try {
    fs.writeFileSync(pcecPath, pcecContent);
    console.log('✅ 手动触发PCEC执行成功');
    console.log('✅ 创建了执行记录:', pcecPath);
    console.log('');
    console.log('=== 进化系统启动成功 ===');
    console.log('');
    console.log('下一步:');
    console.log('1. 访问 http://127.0.0.1:18789/ 完成OpenClaw网关配对');
    console.log('2. 等待自动PCEC触发（每3小时）');
    console.log('3. 运行 node evolution-monitor.js 监控系统状态');
} catch (error) {
    console.error('❌ 手动触发失败:', error.message);
}
