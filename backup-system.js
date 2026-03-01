const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 配置
const config = {
  // 备份源目录
  sourceDirs: [
    './agents',
    './data',
    './configs',
    './skills',
    './waytoagi-knowledge',
    './waytoagi-community'
  ],
  // 本地备份目录
  localBackupDir: './backups',
  // 远程备份目录 (iCloud)
  remoteBackupDir: process.env.ICLOUD_BACKUP_DIR || '~/Library/Mobile Documents/com~apple~CloudDocs/AWKN-Backups',
  // 备份触发条件
  trigger: {
    timeInterval: 24 * 60 * 60 * 1000, // 24小时
    fileSizeChange: 10 * 1024 // 10KB
  },
  // 日志文件
  logFile: './backup-log.json'
};

// 初始化日志
function initLog() {
  if (!fs.existsSync(config.logFile)) {
    fs.writeFileSync(config.logFile, JSON.stringify({
      lastBackup: null,
      backupHistory: []
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

// 检查是否需要备份
function shouldBackup() {
  const log = readLog();
  const now = Date.now();
  
  // 检查时间间隔
  if (log.lastBackup) {
    const timeSinceLastBackup = now - new Date(log.lastBackup).getTime();
    if (timeSinceLastBackup >= config.trigger.timeInterval) {
      return true;
    }
  } else {
    // 首次运行，需要备份
    return true;
  }
  
  // 检查文件大小变化
  for (const sourceDir of config.sourceDirs) {
    if (fs.existsSync(sourceDir)) {
      const size = getDirectorySize(sourceDir);
      const lastSize = log.directorySizes?.[sourceDir] || 0;
      if (Math.abs(size - lastSize) >= config.trigger.fileSizeChange) {
        return true;
      }
    }
  }
  
  return false;
}

// 获取目录大小
function getDirectorySize(dir) {
  let totalSize = 0;
  
  function traverse(currentPath) {
    const files = fs.readdirSync(currentPath);
    for (const file of files) {
      const filePath = path.join(currentPath, file);
      const stats = fs.statSync(filePath);
      if (stats.isFile()) {
        totalSize += stats.size;
      } else if (stats.isDirectory()) {
        traverse(filePath);
      }
    }
  }
  
  traverse(dir);
  return totalSize;
}

// 创建备份目录
function createBackupDir() {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0-6，0是周日
  const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  const dayName = weekDays[dayOfWeek];
  
  const backupDir = path.join(config.localBackupDir, dayName);
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }
  
  return backupDir;
}

// 执行备份
function performBackup() {
  console.log('开始执行备份...');
  
  const backupDir = createBackupDir();
  console.log(`备份目录: ${backupDir}`);
  
  const timestamp = new Date().toISOString().replace(/:/g, '-');
  const backupFileName = `backup-${timestamp}.zip`;
  const backupPath = path.join(backupDir, backupFileName);
  console.log(`备份文件路径: ${backupPath}`);
  
  try {
    // 检查源目录
    console.log('检查源目录...');
    for (const sourceDir of config.sourceDirs) {
      if (fs.existsSync(sourceDir)) {
        console.log(`✓ 源目录存在: ${sourceDir}`);
      } else {
        console.log(`✗ 源目录不存在: ${sourceDir}`);
      }
    }
    
    // 创建本地备份
    console.log('创建本地备份...');
    createZip(backupPath, config.sourceDirs);
    console.log('本地备份创建成功');
    
    // 复制到远程备份（iCloud）
    console.log('复制到远程备份...');
    copyToRemote(backupPath);
    
    // 更新日志
    const log = readLog();
    log.lastBackup = new Date().toISOString();
    log.backupHistory.push({
      timestamp: log.lastBackup,
      path: backupPath,
      size: fs.statSync(backupPath).size
    });
    
    // 记录目录大小
    log.directorySizes = {};
    for (const sourceDir of config.sourceDirs) {
      if (fs.existsSync(sourceDir)) {
        log.directorySizes[sourceDir] = getDirectorySize(sourceDir);
      }
    }
    
    writeLog(log);
    
    console.log('备份完成！');
    console.log(`备份文件: ${backupPath}`);
    
  } catch (error) {
    console.error('备份失败:', error);
    console.error('错误详情:', error.stack);
  }
}

// 创建压缩文件
function createZip(zipPath, sourceDirs) {
  // 在Windows上使用PowerShell命令
  const sources = sourceDirs.map(dir => `"${dir}"`).join(', ');
  const command = `Compress-Archive -Path @(${sources}) -DestinationPath "${zipPath}" -Force`;
  execSync(command, { shell: 'powershell.exe' });
}

// 复制到远程
function copyToRemote(localPath) {
  try {
    // 确保远程目录存在
    execSync(`New-Item -ItemType Directory -Path "${config.remoteBackupDir}" -Force`, { shell: 'powershell.exe' });
    // 复制文件
    const remotePath = path.join(config.remoteBackupDir, path.basename(localPath));
    execSync(`Copy-Item -Path "${localPath}" -Destination "${remotePath}" -Force`, { shell: 'powershell.exe' });
  } catch (error) {
    console.warn('远程备份失败，仅保留本地备份:', error.message);
  }
}

// 主函数
function main() {
  initLog();
  
  if (shouldBackup()) {
    performBackup();
  } else {
    console.log('不需要备份，跳过执行。');
  }
}

// 导出函数
module.exports = {
  main,
  shouldBackup,
  performBackup
};

// 如果直接运行
if (require.main === module) {
  main();
}