#!/usr/bin/env node

/**
 * 进化系统监控脚本
 * 功能：监控绿茶智能体的进化系统状态，确保PCEC正常执行
 */

const fs = require('fs');
const path = require('path');

console.log('=== 绿茶智能体进化系统监控 ===');
console.log('监控时间:', new Date().toISOString());
console.log('');

// 检查PCEC执行目录
const pcecDir = path.join(__dirname, 'pcec_executions');
console.log('1. 检查PCEC执行目录:');
if (fs.existsSync(pcecDir)) {
    const pcecFiles = fs.readdirSync(pcecDir).filter(file => file.endsWith('.md'));
    console.log(`   ✅ 目录存在，包含 ${pcecFiles.length} 个执行记录`);
    
    // 显示最近的执行记录
    if (pcecFiles.length > 0) {
        pcecFiles.sort((a, b) => {
            return fs.statSync(path.join(pcecDir, b)).mtime - fs.statSync(path.join(pcecDir, a)).mtime;
        });
        
        console.log('   最近的执行记录:');
        pcecFiles.slice(0, 3).forEach((file, index) => {
            const filePath = path.join(pcecDir, file);
            const stats = fs.statSync(filePath);
            console.log(`   ${index + 1}. ${file} - ${stats.mtime.toISOString()}`);
        });
    }
} else {
    console.log('   ❌ 目录不存在，创建中...');
    fs.mkdirSync(pcecDir, { recursive: true });
    console.log('   ✅ 目录创建成功');
}

console.log('');

// 检查绿茶智能体配置
const greenTeaDir = path.join(__dirname, 'agents', 'green-tea');
console.log('2. 检查绿茶智能体配置:');

// 检查agent.prompt文件
const promptPath = path.join(greenTeaDir, 'agent.prompt');
if (fs.existsSync(promptPath)) {
    const promptContent = fs.readFileSync(promptPath, 'utf8');
    console.log('   ✅ agent.prompt 文件存在');
    
    // 检查是否包含进化系统协议
    const hasEvolutionProtocols = promptContent.includes('进化系统协议');
    const hasPCEC = promptContent.includes('PCEC系统初始化确认');
    const hasADL = promptContent.includes('反进化锁定协议');
    const hasCapabilityTree = promptContent.includes('能力树协议');
    const hasValueFunction = promptContent.includes('价值函数突变指令');
    
    console.log('   进化系统协议检查:');
    console.log(`   - 进化系统协议: ${hasEvolutionProtocols ? '✅' : '❌'}`);
    console.log(`   - PCEC系统: ${hasPCEC ? '✅' : '❌'}`);
    console.log(`   - ADL协议: ${hasADL ? '✅' : '❌'}`);
    console.log(`   - 能力树: ${hasCapabilityTree ? '✅' : '❌'}`);
    console.log(`   - 价值函数: ${hasValueFunction ? '✅' : '❌'}`);
} else {
    console.log('   ❌ agent.prompt 文件不存在');
}

console.log('');

// 检查心跳配置
const heartbeatPath = path.join(greenTeaDir, 'HEARTBEAT.md');
if (fs.existsSync(heartbeatPath)) {
    const heartbeatContent = fs.readFileSync(heartbeatPath, 'utf8');
    console.log('   ✅ HEARTBEAT.md 文件存在');
    
    // 检查是否包含进化系统任务
    const hasEvolutionTasks = heartbeatContent.includes('Evolution System Tasks');
    const hasPCECTrigger = heartbeatContent.includes('PCEC Trigger');
    
    console.log('   心跳配置检查:');
    console.log(`   - 进化系统任务: ${hasEvolutionTasks ? '✅' : '❌'}`);
    console.log(`   - PCEC触发任务: ${hasPCECTrigger ? '✅' : '❌'}`);
} else {
    console.log('   ❌ HEARTBEAT.md 文件不存在');
}

console.log('');

// 检查配置文件
const configPath = path.join(greenTeaDir, 'config.json');
if (fs.existsSync(configPath)) {
    const configContent = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    console.log('   ✅ config.json 文件存在');
    
    // 检查进化系统配置
    const evoConfig = configContent.evo || {};
    console.log('   进化系统配置:');
    console.log(`   - enable: ${evoConfig.enable ? '✅' : '❌'}`);
    console.log(`   - review: ${evoConfig.review ? '✅' : '❌'}`);
    console.log(`   - autoImprove: ${evoConfig.autoImprove ? '✅' : '❌'}`);
} else {
    console.log('   ❌ config.json 文件不存在');
}

console.log('');

// 检查能力进化器技能
const capabilityEvolverPath = path.join(__dirname, 'skills', 'capability-evolver', 'SKILL.md');
console.log('3. 检查能力进化器技能:');
if (fs.existsSync(capabilityEvolverPath)) {
    console.log('   ✅ capability-evolver 技能存在');
} else {
    console.log('   ❌ capability-evolver 技能不存在');
}

console.log('');

// 检查Trea模型代理服务
const treaProxyPath = path.join(__dirname, 'trea-proxy-server.js');
console.log('4. 检查Trea模型代理服务:');
if (fs.existsSync(treaProxyPath)) {
    console.log('   ✅ trea-proxy-server.js 文件存在');
} else {
    console.log('   ❌ trea-proxy-server.js 文件不存在');
}

console.log('');

// 检查OpenClaw状态
console.log('5. 检查OpenClaw状态:');
try {
    const { execSync } = require('child_process');
    const openclawStatus = execSync('openclaw --version', { encoding: 'utf8' });
    console.log('   ✅ OpenClaw 已安装:', openclawStatus.trim());
} catch (error) {
    console.log('   ❌ OpenClaw 未安装或不可用');
}

console.log('');

// 检查端口占用
console.log('6. 检查端口占用:');
try {
    const { execSync } = require('child_process');
    const portStatus = execSync('netstat -ano | findstr :18789', { encoding: 'utf8' });
    if (portStatus.trim()) {
        console.log('   ✅ OpenClaw网关端口 (18789) 已占用（服务正在运行）');
    } else {
        console.log('   ❌ OpenClaw网关端口 (18789) 未占用（服务未运行）');
    }
} catch (error) {
    console.log('   ❌ 检查端口占用失败');
}

try {
    const { execSync } = require('child_process');
    const portStatus = execSync('netstat -ano | findstr :3000', { encoding: 'utf8' });
    if (portStatus.trim()) {
        console.log('   ✅ Trea模型代理端口 (3000) 已占用（服务正在运行）');
    } else {
        console.log('   ❌ Trea模型代理端口 (3000) 未占用（服务未运行）');
    }
} catch (error) {
    console.log('   ❌ 检查端口占用失败');
}

console.log('');

// 生成监控报告
console.log('=== 监控报告 ===');
const reportPath = path.join(__dirname, 'evolution-monitoring-report.md');

// 检查OpenClaw状态
let openclawStatus = '❌ 未安装';
try {
    require('child_process').execSync('openclaw --version', { encoding: 'utf8' });
    openclawStatus = '✅ 已安装';
} catch (error) {
    openclawStatus = '❌ 未安装';
}

// 检查OpenClaw网关端口
let openclawPortStatus = '❌ 检查失败';
try {
    const portStatus = require('child_process').execSync('netstat -ano | findstr :18789', { encoding: 'utf8' });
    openclawPortStatus = portStatus.trim() ? '✅ 已占用（服务运行中）' : '❌ 未占用（服务未运行）';
} catch (error) {
    openclawPortStatus = '❌ 检查失败';
}

// 检查Trea模型代理端口
let treaPortStatus = '❌ 检查失败';
try {
    const portStatus = require('child_process').execSync('netstat -ano | findstr :3000', { encoding: 'utf8' });
    treaPortStatus = portStatus.trim() ? '✅ 已占用（服务运行中）' : '❌ 未占用（服务未运行）';
} catch (error) {
    treaPortStatus = '❌ 检查失败';
}

const reportContent = `# 绿茶智能体进化系统监控报告

## 监控时间
${new Date().toISOString()}

## 系统状态

### PCEC执行目录
- **状态**: ${fs.existsSync(pcecDir) ? '✅ 存在' : '❌ 不存在'}
- **执行记录数**: ${fs.existsSync(pcecDir) ? fs.readdirSync(pcecDir).filter(file => file.endsWith('.md')).length : 0}

### 绿茶智能体配置
- **agent.prompt**: ${fs.existsSync(promptPath) ? '✅ 存在' : '❌ 不存在'}
- **HEARTBEAT.md**: ${fs.existsSync(heartbeatPath) ? '✅ 存在' : '❌ 不存在'}
- **config.json**: ${fs.existsSync(configPath) ? '✅ 存在' : '❌ 不存在'}

### 进化系统协议
- **进化系统协议**: ${fs.existsSync(promptPath) ? fs.readFileSync(promptPath, 'utf8').includes('进化系统协议') ? '✅ 已配置' : '❌ 未配置' : '❌ 未检查'}
- **PCEC系统**: ${fs.existsSync(promptPath) ? fs.readFileSync(promptPath, 'utf8').includes('PCEC系统初始化确认') ? '✅ 已配置' : '❌ 未配置' : '❌ 未检查'}
- **ADL协议**: ${fs.existsSync(promptPath) ? fs.readFileSync(promptPath, 'utf8').includes('反进化锁定协议') ? '✅ 已配置' : '❌ 未配置' : '❌ 未检查'}
- **能力树**: ${fs.existsSync(promptPath) ? fs.readFileSync(promptPath, 'utf8').includes('能力树协议') ? '✅ 已配置' : '❌ 未配置' : '❌ 未检查'}
- **价值函数**: ${fs.existsSync(promptPath) ? fs.readFileSync(promptPath, 'utf8').includes('价值函数突变指令') ? '✅ 已配置' : '❌ 未配置' : '❌ 未检查'}

### 服务状态
- **OpenClaw**: ${openclawStatus}
- **OpenClaw网关端口**: ${openclawPortStatus}
- **Trea模型代理端口**: ${treaPortStatus}

## 问题分析

### 可能的问题
1. **心跳被禁用**: HEARTBEAT.md 文件可能导致心跳被禁用
2. **OpenClaw配对问题**: 网关需要配对才能完全启用
3. **进化系统配置**: 可能需要在OpenClaw配置中启用心跳

### 解决方案
1. **确保HEARTBEAT.md文件包含心跳任务**
2. **完成OpenClaw网关配对**
3. **检查OpenClaw配置中的心跳设置**
4. **手动触发PCEC执行，验证系统工作状态**

## 后续建议
1. **定期监控**: 定期运行此监控脚本，确保进化系统正常运行
2. **检查执行记录**: 定期检查PCEC执行记录，验证进化成果
3. **系统维护**: 定期检查系统状态，确保所有服务正常运行
4. **备份配置**: 定期备份进化系统配置，防止配置丢失

## 监控结论
${fs.existsSync(pcecDir) && fs.readdirSync(pcecDir).filter(file => file.endsWith('.md')).length > 0 ? '✅ 进化系统已启动并运行' : '⚠️ 进化系统可能未正常启动'}
`;

fs.writeFileSync(reportPath, reportContent);
console.log('监控报告已生成:', reportPath);
console.log('');

console.log('=== 进化系统启动指南 ===');
console.log('1. 确保HEARTBEAT.md文件包含心跳任务');
console.log('2. 完成OpenClaw网关配对（访问 http://127.0.0.1:18789/）');
console.log('3. 手动触发PCEC执行，验证系统工作状态');
console.log('4. 等待自动PCEC触发（每3小时）');
console.log('5. 监控进化系统运行状态');
console.log('');
console.log('=== 监控完成 ===');
