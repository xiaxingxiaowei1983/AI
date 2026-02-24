/**
 * Git集成管理工具
 * 用于管理OpenClaw系统的进化过程，实现可追踪、可回滚的版本控制
 * 状态: ACTIVE (已激活) 优先级: LEVEL1 (核心系统)
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

class GitIntegration {
  constructor(baseDir = process.cwd()) {
    this.baseDir = baseDir;
    this.config = {
      branchPrefix: 'evolution/',
      mainBranch: 'main',
      devBranch: 'evolution-management',
      tagPrefix: 'v',
      commitMessagePrefix: '🧬 ',
      maxRollbackPoints: 10,
      autoCommitInterval: 3600000, // 1小时
      autoPush: false
    };
    this.rollbackPoints = [];
    this.lastCommitTime = null;
    this._loadRollbackPoints();
  }

  // 执行Git命令
  _execGitCommand(command, options = {}) {
    try {
      const defaultOptions = {
        cwd: this.baseDir,
        encoding: 'utf8',
        stdio: 'pipe'
      };
      const result = execSync(`git ${command}`, { ...defaultOptions, ...options });
      return result.trim();
    } catch (error) {
      console.error(`Git命令执行失败: ${command}`);
      console.error(`错误信息: ${error.message}`);
      return null;
    }
  }

  // 获取当前分支
  getCurrentBranch() {
    return this._execGitCommand('branch --show-current');
  }

  // 获取当前提交
  getCurrentCommit() {
    return this._execGitCommand('rev-parse HEAD');
  }

  // 获取仓库状态
  getStatus() {
    return this._execGitCommand('status --porcelain');
  }

  // 检查是否有未提交的更改
  hasUncommittedChanges() {
    const status = this.getStatus();
    return status && status.length > 0;
  }

  // 检查是否为Git仓库
  isGitRepository() {
    return this._execGitCommand('rev-parse --is-inside-work-tree') === 'true';
  }

  // 初始化Git仓库
  initRepository() {
    if (!this.isGitRepository()) {
      console.log('初始化Git仓库...');
      this._execGitCommand('init');
      this._execGitCommand('config user.name "OpenClaw Evolution System"');
      this._execGitCommand('config user.email "evolution@openclaw.ai"');
      return true;
    }
    return false;
  }

  // 创建分支
  createBranch(branchName) {
    const fullBranchName = `${this.config.branchPrefix}${branchName}`;
    console.log(`创建分支: ${fullBranchName}`);
    this._execGitCommand(`checkout -b ${fullBranchName}`);
    return fullBranchName;
  }

  // 切换分支
  checkoutBranch(branchName) {
    console.log(`切换到分支: ${branchName}`);
    this._execGitCommand(`checkout ${branchName}`);
    return branchName;
  }

  // 合并分支
  mergeBranch(sourceBranch, targetBranch = null) {
    if (targetBranch) {
      this.checkoutBranch(targetBranch);
    }
    console.log(`合并分支: ${sourceBranch}`);
    this._execGitCommand(`merge ${sourceBranch}`);
    return true;
  }

  // 添加文件
  addFiles(patterns = '.') {
    console.log(`添加文件: ${patterns}`);
    this._execGitCommand(`add ${patterns}`);
    return true;
  }

  // 提交更改
  commit(message, options = {}) {
    const fullMessage = `${this.config.commitMessagePrefix}${message}`;
    console.log(`提交更改: ${fullMessage}`);
    
    // 添加所有更改
    if (options.addAll) {
      this._execGitCommand('add .');
    }
    
    const result = this._execGitCommand(`commit -m "${fullMessage}"`);
    if (result) {
      this.lastCommitTime = Date.now();
      // 记录回滚点
      if (options.createRollbackPoint) {
        this.createRollbackPoint(message);
      }
      // 自动推送
      if (this.config.autoPush) {
        this.push();
      }
    }
    return result;
  }

  // 推送更改
  push(remote = 'origin', branch = null) {
    const targetBranch = branch || this.getCurrentBranch();
    console.log(`推送到远程: ${remote}/${targetBranch}`);
    this._execGitCommand(`push ${remote} ${targetBranch}`);
    return true;
  }

  // 拉取更改
  pull(remote = 'origin', branch = null) {
    const targetBranch = branch || this.getCurrentBranch();
    console.log(`从远程拉取: ${remote}/${targetBranch}`);
    this._execGitCommand(`pull ${remote} ${targetBranch}`);
    return true;
  }

  // 创建标签
  createTag(tagName, message = null) {
    const fullTagName = `${this.config.tagPrefix}${tagName}`;
    console.log(`创建标签: ${fullTagName}`);
    if (message) {
      this._execGitCommand(`tag -a ${fullTagName} -m "${message}"`);
    } else {
      this._execGitCommand(`tag ${fullTagName}`);
    }
    if (this.config.autoPush) {
      this.pushTag(fullTagName);
    }
    return fullTagName;
  }

  // 推送标签
  pushTag(tagName) {
    console.log(`推送标签: ${tagName}`);
    this._execGitCommand(`push origin ${tagName}`);
    return true;
  }

  // 创建回滚点
  createRollbackPoint(message) {
    const commitHash = this.getCurrentCommit();
    const timestamp = Date.now();
    const rollbackPoint = {
      id: `rollback_${timestamp}`,
      commitHash,
      timestamp,
      message,
      branch: this.getCurrentBranch(),
      author: this._execGitCommand('config user.name')
    };
    
    this.rollbackPoints.push(rollbackPoint);
    // 限制回滚点数量
    if (this.rollbackPoints.length > this.config.maxRollbackPoints) {
      this.rollbackPoints = this.rollbackPoints.slice(-this.config.maxRollbackPoints);
    }
    
    this._saveRollbackPoints();
    console.log(`创建回滚点: ${rollbackPoint.id}`);
    return rollbackPoint;
  }

  // 回滚到指定点
  rollbackTo(rollbackPointId) {
    const rollbackPoint = this.rollbackPoints.find(p => p.id === rollbackPointId);
    if (!rollbackPoint) {
      console.error('回滚点不存在');
      return false;
    }
    
    console.log(`回滚到: ${rollbackPoint.id}`);
    console.log(`提交: ${rollbackPoint.commitHash}`);
    console.log(`分支: ${rollbackPoint.branch}`);
    console.log(`时间: ${new Date(rollbackPoint.timestamp).toISOString()}`);
    
    // 切换到指定分支
    this.checkoutBranch(rollbackPoint.branch);
    // 重置到指定提交
    this._execGitCommand(`reset --hard ${rollbackPoint.commitHash}`);
    
    console.log('回滚完成');
    return true;
  }

  // 回滚到最近的回滚点
  rollbackToLatest() {
    if (this.rollbackPoints.length === 0) {
      console.error('没有回滚点');
      return false;
    }
    const latestPoint = this.rollbackPoints[this.rollbackPoints.length - 1];
    return this.rollbackTo(latestPoint.id);
  }

  // 获取回滚点列表
  getRollbackPoints() {
    return this.rollbackPoints;
  }

  // 加载回滚点
  _loadRollbackPoints() {
    const rollbackFile = path.join(this.baseDir, '.trae', 'git', 'rollback-points.json');
    if (fs.existsSync(rollbackFile)) {
      try {
        const data = fs.readFileSync(rollbackFile, 'utf8');
        this.rollbackPoints = JSON.parse(data);
      } catch (error) {
        console.error('加载回滚点失败:', error.message);
        this.rollbackPoints = [];
      }
    }
  }

  // 保存回滚点
  _saveRollbackPoints() {
    const rollbackDir = path.join(this.baseDir, '.trae', 'git');
    if (!fs.existsSync(rollbackDir)) {
      fs.mkdirSync(rollbackDir, { recursive: true });
    }
    const rollbackFile = path.join(rollbackDir, 'rollback-points.json');
    fs.writeFileSync(rollbackFile, JSON.stringify(this.rollbackPoints, null, 2));
  }

  // 自动提交
  autoCommit() {
    if (this.hasUncommittedChanges()) {
      const message = `自动提交 - ${new Date().toISOString()}`;
      this.commit(message, { addAll: true, createRollbackPoint: true });
      return true;
    }
    return false;
  }

  // 启动自动提交定时器
  startAutoCommit() {
    console.log(`启动自动提交，间隔: ${this.config.autoCommitInterval / 1000 / 60}分钟`);
    setInterval(() => {
      this.autoCommit();
    }, this.config.autoCommitInterval);
  }

  // 生成版本报告
  generateVersionReport() {
    const currentBranch = this.getCurrentBranch();
    const currentCommit = this.getCurrentCommit();
    const status = this.getStatus();
    const tags = this._execGitCommand('tag -l');
    
    return {
      timestamp: Date.now(),
      currentBranch,
      currentCommit,
      hasUncommittedChanges: this.hasUncommittedChanges(),
      status,
      tags: tags ? tags.split('\n') : [],
      rollbackPoints: this.rollbackPoints,
      config: this.config
    };
  }

  // 检查分支策略
  checkBranchStrategy() {
    const currentBranch = this.getCurrentBranch();
    const branches = this._execGitCommand('branch -a');
    
    return {
      currentBranch,
      branches: branches ? branches.split('\n') : [],
      followsStrategy: currentBranch === this.config.devBranch || 
                       currentBranch.startsWith(this.config.branchPrefix),
      recommendations: this._getBranchStrategyRecommendations(currentBranch)
    };
  }

  // 获取分支策略建议
  _getBranchStrategyRecommendations(currentBranch) {
    const recommendations = [];
    
    if (currentBranch === this.config.mainBranch) {
      recommendations.push('主分支应该保持稳定，建议在开发分支上进行进化');
      recommendations.push(`建议切换到 ${this.config.devBranch} 分支`);
    }
    
    if (!currentBranch.startsWith(this.config.branchPrefix) && 
        currentBranch !== this.config.mainBranch && 
        currentBranch !== this.config.devBranch) {
      recommendations.push('当前分支不符合进化分支策略');
      recommendations.push(`建议使用 ${this.config.branchPrefix} 前缀创建分支`);
    }
    
    return recommendations;
  }

  // 清理旧分支
  cleanupOldBranches(daysOld = 30) {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysOld);
    
    console.log(`清理 ${daysOld} 天前的分支...`);
    
    // 获取所有本地分支
    const branches = this._execGitCommand('branch --format="%(refname:short) %(committerdate:iso)"');
    if (!branches) return [];
    
    const branchesToDelete = [];
    const lines = branches.split('\n');
    
    for (const line of lines) {
      const [branch, dateStr] = line.split(' ');
      if (!branch || branch === this.config.mainBranch || branch === this.config.devBranch) {
        continue;
      }
      
      const commitDate = new Date(dateStr);
      if (commitDate < cutoffDate) {
        branchesToDelete.push(branch);
      }
    }
    
    for (const branch of branchesToDelete) {
      console.log(`删除分支: ${branch}`);
      this._execGitCommand(`branch -D ${branch}`);
    }
    
    return branchesToDelete;
  }

  // 同步远程分支
  syncRemote() {
    console.log('同步远程分支...');
    this._execGitCommand('fetch --all');
    this._execGitCommand('prune');
    return true;
  }

  // 检查Git状态
  checkGitStatus() {
    const status = this.getStatus();
    const branch = this.getCurrentBranch();
    const commit = this.getCurrentCommit();
    
    return {
      branch,
      commit,
      hasChanges: this.hasUncommittedChanges(),
      status
    };
  }

  // 配置Git集成
  configure(config) {
    this.config = { ...this.config, ...config };
    return this.config;
  }

  // 获取配置
  getConfig() {
    return this.config;
  }
}

// 导出单例实例
const gitIntegration = new GitIntegration();

module.exports = {
  GitIntegration,
  gitIntegration,
  // 工具接口
  initRepository: () => gitIntegration.initRepository(),
  getCurrentBranch: () => gitIntegration.getCurrentBranch(),
  getCurrentCommit: () => gitIntegration.getCurrentCommit(),
  hasUncommittedChanges: () => gitIntegration.hasUncommittedChanges(),
  createBranch: (branchName) => gitIntegration.createBranch(branchName),
  checkoutBranch: (branchName) => gitIntegration.checkoutBranch(branchName),
  mergeBranch: (sourceBranch, targetBranch) => gitIntegration.mergeBranch(sourceBranch, targetBranch),
  addFiles: (patterns) => gitIntegration.addFiles(patterns),
  commit: (message, options) => gitIntegration.commit(message, options),
  push: (remote, branch) => gitIntegration.push(remote, branch),
  pull: (remote, branch) => gitIntegration.pull(remote, branch),
  createTag: (tagName, message) => gitIntegration.createTag(tagName, message),
  pushTag: (tagName) => gitIntegration.pushTag(tagName),
  createRollbackPoint: (message) => gitIntegration.createRollbackPoint(message),
  rollbackTo: (rollbackPointId) => gitIntegration.rollbackTo(rollbackPointId),
  rollbackToLatest: () => gitIntegration.rollbackToLatest(),
  getRollbackPoints: () => gitIntegration.getRollbackPoints(),
  autoCommit: () => gitIntegration.autoCommit(),
  startAutoCommit: () => gitIntegration.startAutoCommit(),
  generateVersionReport: () => gitIntegration.generateVersionReport(),
  checkBranchStrategy: () => gitIntegration.checkBranchStrategy(),
  cleanupOldBranches: (daysOld) => gitIntegration.cleanupOldBranches(daysOld),
  syncRemote: () => gitIntegration.syncRemote(),
  checkGitStatus: () => gitIntegration.checkGitStatus(),
  configure: (config) => gitIntegration.configure(config),
  getConfig: () => gitIntegration.getConfig()
};

// 示例用法
if (require.main === module) {
  const git = gitIntegration;

  console.log('=== Git集成测试 ===');
  
  // 初始化仓库
  git.initRepository();
  
  // 检查状态
  console.log('\n=== 检查Git状态 ===');
  const status = git.checkGitStatus();
  console.log('状态:', status);
  
  // 检查分支策略
  console.log('\n=== 检查分支策略 ===');
  const branchStrategy = git.checkBranchStrategy();
  console.log('分支策略:', branchStrategy);
  
  // 生成版本报告
  console.log('\n=== 生成版本报告 ===');
  const versionReport = git.generateVersionReport();
  console.log('版本报告:', JSON.stringify(versionReport, null, 2));
  
  // 创建回滚点
  console.log('\n=== 创建回滚点 ===');
  const rollbackPoint = git.createRollbackPoint('测试回滚点');
  console.log('回滚点:', rollbackPoint);
  
  // 获取回滚点列表
  console.log('\n=== 获取回滚点列表 ===');
  const rollbackPoints = git.getRollbackPoints();
  console.log('回滚点列表:', rollbackPoints);
  
  console.log('\n=== Git集成测试完成 ===');
}
