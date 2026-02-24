const fs = require('fs');
const path = require('path');

// 测试脚本
// 用于检查项目设置是否正确

console.log('🔍 测试项目设置...');

// 检查核心文件是否存在
const filesToCheck = [
    'index.js',
    'watcher.js',
    'config.json',
    'start.bat',
    'start.ps1'
];

let allFilesExist = true;
for (const file of filesToCheck) {
    if (fs.existsSync(file)) {
        console.log(`✅ ${file} 存在`);
    } else {
        console.log(`❌ ${file} 不存在`);
        allFilesExist = false;
    }
}

// 检查依赖是否安装
if (fs.existsSync('node_modules')) {
    console.log('✅ node_modules 目录存在');
} else {
    console.log('❌ node_modules 目录不存在');
    allFilesExist = false;
}

// 检查目录结构
const directoriesToCheck = [
    'watch',
    'downloads',
    'logs'
];

for (const dir of directoriesToCheck) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`📁 创建目录: ${dir}`);
    } else {
        console.log(`✅ ${dir} 目录存在`);
    }
}

// 检查配置文件
if (fs.existsSync('config.json')) {
    try {
        const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
        console.log('✅ 配置文件格式正确');
        console.log('📦 配置内容:', JSON.stringify(config, null, 2));
    } catch (error) {
        console.log('❌ 配置文件格式错误:', error.message);
        allFilesExist = false;
    }
}

// 检查模块导入
console.log('\n🔧 测试模块导入...');
try {
    const { NotebookLMAutomator, CONFIG } = require('./index');
    console.log('✅ 成功导入 NotebookLMAutomator');
    console.log('✅ 配置加载成功');
    
    const FolderWatcher = require('./watcher');
    console.log('✅ 成功导入 FolderWatcher');
} catch (error) {
    console.log('❌ 模块导入失败:', error.message);
    allFilesExist = false;
}

// 总结
console.log('\n📋 测试总结:');
if (allFilesExist) {
    console.log('🎉 所有测试通过！项目设置正确。');
    console.log('\n🚀 你可以通过以下方式启动服务:');
    console.log('1. 运行 .\start.bat (Windows 批处理)');
    console.log('2. 运行 .\start.ps1 (Windows PowerShell)');
    console.log('3. 直接运行 node watcher.js');
} else {
    console.log('❌ 测试失败！请检查上述错误。');
}

console.log('\n📅 测试完成时间:', new Date().toLocaleString());
