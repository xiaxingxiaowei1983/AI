const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 配置
const config = {
  // 备份目录
  backupDir: './backups',
  // 恢复目标目录
  targetDir: '.',
  // 日志文件
  logFile: './restore-log.json'
};

// 初始化日志
function initLog() {
  if (!fs.existsSync(config.logFile)) {
    fs.writeFileSync(config.logFile, JSON.stringify({
      lastRestore: null,
      restoreHistory: []
    }, null, 2));
  }
}

// 读取日志
function readLog() {
  return JSON.parse(fs.readFileSync(config.logFile, 'utf8'));
}

// 写入日志
function writeLog(log) {
  fs.writeFileSync(config.logFile, JSON.stringify(log, null, 2));
}

// 列出可用的备份
function listBackups() {
  console.log('可用的备份:');
  
  if (!fs.existsSync(config.backupDir)) {
    console.log('没有找到备份目录');
    return [];
  }
  
  const dayDirs = fs.readdirSync(config.backupDir);
  const backups = [];
  
  for (const dayDir of dayDirs) {
    const dayPath = path.join(config.backupDir, dayDir);
    if (fs.statSync(dayPath).isDirectory()) {
      const files = fs.readdirSync(dayPath);
      for (const file of files) {
        if (file.endsWith('.zip')) {
          const backupPath = path.join(dayPath, file);
          const stats = fs.statSync(backupPath);
          const size = (stats.size / (1024 * 1024)).toFixed(2);
          const mtime = stats.mtime.toISOString();
          
          backups.push({
            path: backupPath,
            day: dayDir,
            file: file,
            size: `${size} MB`,
            modified: mtime
          });
        }
      }
    }
  }
  
  // 按修改时间排序，最新的在前
  backups.sort((a, b) => new Date(b.modified) - new Date(a.modified));
  
  backups.forEach((backup, index) => {
    console.log(`${index + 1}. ${backup.file} (${backup.day}) - ${backup.size} - ${backup.modified}`);
  });
  
  return backups;
}

// 恢复指定备份
function restoreBackup(backupPath) {
  console.log(`开始恢复备份: ${backupPath}`);
  
  try {
    // 解压备份文件到临时目录
    const tempDir = path.join('./temp-restore');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }
    
    console.log('解压备份文件...');
    // 在Windows上使用PowerShell命令解压
    const command = `Expand-Archive -Path "${backupPath}" -DestinationPath "${tempDir}" -Force`;
    execSync(command, { shell: 'powershell.exe' });
    
    // 复制文件到目标目录
    console.log('复制文件到目标目录...');
    copyDirectory(tempDir, config.targetDir);
    
    // 清理临时目录
    console.log('清理临时文件...');
    try {
      fs.rmSync(tempDir, { recursive: true, force: true });
      console.log('临时文件清理成功');
    } catch (cleanupError) {
      console.warn('临时文件清理失败:', cleanupError.message);
      console.warn('临时目录将需要手动清理');
    }
    
    // 更新日志
    const log = readLog();
    log.lastRestore = new Date().toISOString();
    log.restoreHistory.push({
      timestamp: log.lastRestore,
      backupPath: backupPath
    });
    writeLog(log);
    
    console.log('恢复完成！');
    console.log('请重启系统以应用更改。');
    console.log('注意：如果临时目录清理失败，可能需要手动清理 temp-restore 目录');

    
  } catch (error) {
    console.error('恢复失败:', error);
  }
}

// 复制目录
function copyDirectory(source, target) {
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }
  
  const files = fs.readdirSync(source);
  for (const file of files) {
    const sourcePath = path.join(source, file);
    const targetPath = path.join(target, file);
    
    const stats = fs.statSync(sourcePath);
    if (stats.isFile()) {
      fs.copyFileSync(sourcePath, targetPath);
    } else if (stats.isDirectory()) {
      copyDirectory(sourcePath, targetPath);
    }
  }
}

// 主函数
function main() {
  initLog();
  
  const backups = listBackups();
  
  if (backups.length === 0) {
    console.log('没有找到可用的备份');
    return;
  }
  
  // 提示用户选择备份
  console.log('\n请选择要恢复的备份编号:');
  
  // 这里简化处理，默认恢复最新的备份
  const latestBackup = backups[0];
  console.log(`默认恢复最新的备份: ${latestBackup.file}`);
  restoreBackup(latestBackup.path);
}

// 导出函数
module.exports = {
  main,
  listBackups,
  restoreBackup
};

// 如果直接运行
if (require.main === module) {
  main();
}