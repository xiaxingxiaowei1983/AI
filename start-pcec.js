#!/usr/bin/env node

/**
 * PCEC System Deployment Script
 * 启动和监控PCEC系统
 */

const fs = require('fs');
const path = require('path');
const PCECSystem = require('./pcec-system');

// 日志文件路径
const LOG_FILE = path.join(__dirname, '.trae', 'logs', 'pcec.log');

// 确保日志目录存在
const logDir = path.dirname(LOG_FILE);
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}

// 日志函数
function log(message, level = 'info') {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`;
    console.log(logMessage);
    
    // 写入日志文件
    fs.appendFileSync(LOG_FILE, logMessage + '\n');
}

// 启动PCEC系统
function startPCEC() {
    log('Starting PCEC System...');
    
    try {
        // 创建PCEC系统实例
        const pcecSystem = new PCECSystem();
        
        // 记录系统状态
        const status = pcecSystem.getStatus();
        log(`PCEC System started successfully. Status: ${JSON.stringify(status)}`);
        
        // 设置系统为空闲状态
        pcecSystem.setIdle(true);
        log('PCEC System set to idle state');
        
        // 监控系统状态
        setInterval(() => {
            const currentStatus = pcecSystem.getStatus();
            log(`PCEC System Status: ${JSON.stringify(currentStatus)}`, 'debug');
        }, 60000); // 每分钟检查一次状态
        
        log('PCEC System deployment completed successfully');
        
        return pcecSystem;
    } catch (error) {
        log(`Error starting PCEC System: ${error.message}`, 'error');
        throw error;
    }
}

// 检查系统运行状态
function checkSystemStatus() {
    log('Checking PCEC System status...');
    
    try {
        // 检查必要的文件和目录
        const requiredFiles = [
            'pcec-system.js',
            'pcec-timer.js',
            'pcec-core.js',
            'pcec-feature-identification.js',
            'pcec-abstraction-generation.js',
            'pcec-lever-identification.js',
            'pcec-mind-explosion.js',
            'pcec-product-management.js',
            'pcec-reporting.js',
            'pcec-ultimate-constraint.js'
        ];
        
        let allFilesExist = true;
        requiredFiles.forEach(file => {
            const filePath = path.join(__dirname, file);
            if (!fs.existsSync(filePath)) {
                log(`Missing required file: ${file}`, 'error');
                allFilesExist = false;
            }
        });
        
        if (allFilesExist) {
            log('All required files exist');
        }
        
        // 检查数据目录
        const dataDir = path.join(__dirname, '.trae', 'data');
        if (!fs.existsSync(dataDir)) {
            log('Creating data directory...');
            fs.mkdirSync(dataDir, { recursive: true });
        }
        
        // 检查日志目录
        if (!fs.existsSync(logDir)) {
            log('Creating log directory...');
            fs.mkdirSync(logDir, { recursive: true });
        }
        
        log('System status check completed');
        return allFilesExist;
    } catch (error) {
        log(`Error checking system status: ${error.message}`, 'error');
        return false;
    }
}

// 主函数
function main() {
    log('=== PCEC System Deployment ===');
    
    // 检查系统状态
    const statusOk = checkSystemStatus();
    if (!statusOk) {
        log('System status check failed. Aborting deployment.', 'error');
        process.exit(1);
    }
    
    // 启动PCEC系统
    try {
        const pcecSystem = startPCEC();
        
        // 注册信号处理
        process.on('SIGINT', () => {
            log('Received SIGINT. Shutting down PCEC System...');
            // 这里可以添加清理代码
            process.exit(0);
        });
        
        process.on('SIGTERM', () => {
            log('Received SIGTERM. Shutting down PCEC System...');
            // 这里可以添加清理代码
            process.exit(0);
        });
        
        log('PCEC System is running. Press Ctrl+C to stop.');
    } catch (error) {
        log(`Deployment failed: ${error.message}`, 'error');
        process.exit(1);
    }
}

// 运行主函数
if (require.main === module) {
    main();
}

module.exports = { startPCEC, checkSystemStatus };