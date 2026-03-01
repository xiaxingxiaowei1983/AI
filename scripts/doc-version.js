#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const VERSION_DIR = path.resolve(ROOT_DIR, '.git', 'version');

function ensureVersionDir() {
  if (!fs.existsSync(VERSION_DIR)) {
    fs.mkdirSync(VERSION_DIR, { recursive: true });
  }
}

function getVersionFile(docPath) {
  const hash = require('crypto').createHash('md5').update(docPath).digest('hex');
  return path.resolve(VERSION_DIR, `${hash}.json`);
}

function recordVersion(docPath, content) {
  ensureVersionDir();
  
  const versionFile = getVersionFile(docPath);
  let versions = [];
  
  if (fs.existsSync(versionFile)) {
    try {
      versions = JSON.parse(fs.readFileSync(versionFile, 'utf8'));
    } catch (e) {}
  }
  
  const version = {
    timestamp: new Date().toISOString(),
    hash: require('crypto').createHash('sha256').update(content).digest('hex').substring(0, 8),
    size: content.length
  };
  
  versions.push(version);
  
  if (versions.length > 100) {
    versions = versions.slice(-100);
  }
  
  fs.writeFileSync(versionFile, JSON.stringify(versions, null, 2));
  
  return version;
}

function getVersions(docPath) {
  const versionFile = getVersionFile(docPath);
  
  if (!fs.existsSync(versionFile)) {
    return [];
  }
  
  try {
    return JSON.parse(fs.readFileSync(versionFile, 'utf8'));
  } catch (e) {
    return [];
  }
}

function getLatestVersion(docPath) {
  const versions = getVersions(docPath);
  return versions.length > 0 ? versions[versions.length - 1] : null;
}

function checkForChanges(docPath) {
  if (!fs.existsSync(docPath)) {
    return { exists: false, changed: false };
  }
  
  const content = fs.readFileSync(docPath, 'utf8');
  const latestVersion = getLatestVersion(docPath);
  
  if (!latestVersion) {
    return { exists: true, changed: true, previous: null };
  }
  
  const currentHash = require('crypto').createHash('sha256').update(content).digest('hex').substring(0, 8);
  
  return {
    exists: true,
    changed: currentHash !== latestVersion.hash,
    previous: latestVersion,
    current: currentHash
  };
}

function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    console.log(`
用法: node doc-version.js <命令> [选项]

命令:
  record <文件路径>     记录文件版本
  check <文件路径>     检查文件是否有变化
  history <文件路径>   查看文件版本历史

示例:
  node doc-version.js record agents/master/SOUL.md
  node doc-version.js check docs/README.md
  node doc-version.js history agents/master/SOUL.md
`);
    process.exit(0);
  }
  
  const command = args[0];
  const docPath = args[1];
  
  if (!docPath) {
    console.error('❌ 请提供文件路径');
    process.exit(1);
  }
  
  const fullPath = path.resolve(ROOT_DIR, docPath);
  
  switch (command) {
    case 'record':
      if (!fs.existsSync(fullPath)) {
        console.error('❌ 文件不存在');
        process.exit(1);
      }
      const content = fs.readFileSync(fullPath, 'utf8');
      const version = recordVersion(docPath, content);
      console.log(`✅ 已记录版本: ${version.hash}`);
      break;
      
    case 'check':
      const checkResult = checkForChanges(fullPath);
      if (!checkResult.exists) {
        console.log('文件不存在');
      } else if (checkResult.changed) {
        console.log(`✅ 文件有变化 (之前: ${checkResult.previous?.hash})`);
      } else {
        console.log('✅ 文件无变化');
      }
      break;
      
    case 'history':
      const versions = getVersions(docPath);
      if (versions.length === 0) {
        console.log('暂无版本记录');
      } else {
        console.log(`共 ${versions.length} 个版本:\n`);
        for (let i = versions.length - 1; i >= 0; i--) {
          const v = versions[i];
          console.log(`${i + 1}. ${v.timestamp} - ${v.hash}`);
        }
      }
      break;
      
    default:
      console.error(`未知命令: ${command}`);
      process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { recordVersion, getVersions, checkForChanges };
