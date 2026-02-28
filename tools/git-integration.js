const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class GitIntegration {
  constructor(repoPath = process.cwd()) {
    this.repoPath = repoPath;
    this.config = {
      autoCommit: true,
      autoTag: true,
      branchPrefix: 'evolution/',
      tagPrefix: 'v',
      commitMessageTemplate: '[Evolution] {message}',
      maxCommitFiles: 100,
      ignorePatterns: [
        'node_modules/',
        '.git/',
        '*.log',
        '*.tmp',
        '*.temp',
        '.env',
        '.venv/',
        'dist/',
        'build/',
        '*.zip',
        '*.tar.gz'
      ]
    };
  }

  // 执行Git命令
  execGitCommand(command) {
    try {
      const result = execSync(`git ${command}`, {
        cwd: this.repoPath,
        encoding: 'utf8',
        stdio: 'pipe'
      });
      return result.trim();
    } catch (error) {
      console.error(`Git command failed: ${command}`);
      console.error(`Error: ${error.message}`);
      return null;
    }
  }

  // 获取当前分支
  getCurrentBranch() {
    return this.execGitCommand('rev-parse --abbrev-ref HEAD');
  }

  // 获取当前提交
  getCurrentCommit() {
    return this.execGitCommand('rev-parse HEAD');
  }

  // 检查是否有未提交的更改
  hasUncommittedChanges() {
    const status = this.execGitCommand('status --porcelain');
    return status !== null && status.length > 0;
  }

  // 自动提交更改
  autoCommit(message = 'System evolution update') {
    try {
      // 检查是否有更改
      if (!this.hasUncommittedChanges()) {
        console.log('No changes to commit');
        return null;
      }

      // 添加更改
      console.log('Adding changes...');
      this.execGitCommand('add .');

      // 提交更改
      const commitMessage = this.config.commitMessageTemplate.replace('{message}', message);
      console.log(`Committing changes with message: ${commitMessage}`);
      const result = this.execGitCommand(`commit -m "${commitMessage}"`);

      if (result) {
        console.log('Auto commit successful');
        const commitHash = this.getCurrentCommit();
        return commitHash;
      } else {
        console.log('Auto commit failed');
        return null;
      }
    } catch (error) {
      console.error('Auto commit error:', error);
      return null;
    }
  }

  // 创建版本标签
  createVersionTag(version = null) {
    try {
      // 如果没有指定版本，生成基于时间的版本
      if (!version) {
        const now = new Date();
        const versionStr = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')}.${String(now.getTime()).slice(-6)}`;
        version = versionStr;
      }

      const tagName = `${this.config.tagPrefix}${version}`;
      console.log(`Creating version tag: ${tagName}`);
      
      const result = this.execGitCommand(`tag -a ${tagName} -m "Version ${version}"`);
      
      if (result === null) {
        console.log('Tag creation failed');
        return null;
      }

      console.log('Version tag created successfully');
      return tagName;
    } catch (error) {
      console.error('Create version tag error:', error);
      return null;
    }
  }

  // 获取所有标签
  getTags() {
    const tags = this.execGitCommand('tag -l');
    if (tags) {
      return tags.split('\n').filter(tag => tag.length > 0);
    }
    return [];
  }

  // 回滚到指定标签或提交
  rollbackTo(identifier) {
    try {
      console.log(`Rolling back to: ${identifier}`);
      
      // 检查identifier是否存在
      const exists = this.execGitCommand(`rev-parse --verify ${identifier}`);
      if (!exists) {
        console.error(`Identifier ${identifier} does not exist`);
        return false;
      }

      // 执行回滚
      this.execGitCommand(`reset --hard ${identifier}`);
      
      console.log('Rollback successful');
      return true;
    } catch (error) {
      console.error('Rollback error:', error);
      return false;
    }
  }

  // 创建新分支
  createBranch(branchName) {
    try {
      const fullBranchName = `${this.config.branchPrefix}${branchName}`;
      console.log(`Creating branch: ${fullBranchName}`);
      
      const result = this.execGitCommand(`checkout -b ${fullBranchName}`);
      
      if (result === null) {
        console.log('Branch creation failed');
        return null;
      }

      console.log('Branch created successfully');
      return fullBranchName;
    } catch (error) {
      console.error('Create branch error:', error);
      return null;
    }
  }

  // 切换分支
  checkoutBranch(branchName) {
    try {
      console.log(`Switching to branch: ${branchName}`);
      
      const result = this.execGitCommand(`checkout ${branchName}`);
      
      if (result === null) {
        console.log('Branch checkout failed');
        return false;
      }

      console.log('Branch switched successfully');
      return true;
    } catch (error) {
      console.error('Checkout branch error:', error);
      return false;
    }
  }

  // 获取分支列表
  getBranches() {
    const branches = this.execGitCommand('branch -a');
    if (branches) {
      return branches.split('\n').map(branch => branch.trim()).filter(branch => branch.length > 0);
    }
    return [];
  }

  // 获取提交历史
  getCommitHistory(limit = 10) {
    const history = this.execGitCommand(`log --oneline -n ${limit}`);
    if (history) {
      return history.split('\n').filter(line => line.length > 0);
    }
    return [];
  }

  // 获取差异
  getDiff(path = '.') {
    return this.execGitCommand(`diff ${path}`);
  }

  // 自动提交并创建版本标签
  autoCommitAndTag(message = 'System evolution update') {
    try {
      // 自动提交
      const commitHash = this.autoCommit(message);
      if (!commitHash) {
        console.log('Auto commit failed, skipping tag creation');
        return null;
      }

      // 创建版本标签
      const tagName = this.createVersionTag();
      if (!tagName) {
        console.log('Tag creation failed');
        return null;
      }

      console.log('Auto commit and tag successful');
      return {
        commitHash,
        tagName
      };
    } catch (error) {
      console.error('Auto commit and tag error:', error);
      return null;
    }
  }

  // 获取Git状态
  getStatus() {
    return this.execGitCommand('status');
  }

  // 清理未跟踪文件
  cleanupUntrackedFiles() {
    try {
      console.log('Cleaning up untracked files...');
      const result = this.execGitCommand('clean -f -d');
      console.log('Cleanup successful');
      return result;
    } catch (error) {
      console.error('Cleanup error:', error);
      return null;
    }
  }

  // 拉取最新更改
  pull() {
    try {
      console.log('Pulling latest changes...');
      const result = this.execGitCommand('pull');
      console.log('Pull successful');
      return result;
    } catch (error) {
      console.error('Pull error:', error);
      return null;
    }
  }

  // 推送更改
  push(includeTags = true) {
    try {
      console.log('Pushing changes...');
      let command = 'push';
      if (includeTags) {
        command += ' --tags';
      }
      const result = this.execGitCommand(command);
      console.log('Push successful');
      return result;
    } catch (error) {
      console.error('Push error:', error);
      return null;
    }
  }

  // 推送分支
  pushBranch(branchName) {
    try {
      console.log(`Pushing branch: ${branchName}`);
      const result = this.execGitCommand(`push -u origin ${branchName}`);
      console.log('Branch push successful');
      return result;
    } catch (error) {
      console.error('Push branch error:', error);
      return null;
    }
  }

  // 合并分支
  mergeBranch(branchName) {
    try {
      console.log(`Merging branch: ${branchName}`);
      const result = this.execGitCommand(`merge ${branchName}`);
      console.log('Branch merge successful');
      return result;
    } catch (error) {
      console.error('Merge branch error:', error);
      return null;
    }
  }

  // 生成回滚计划
  generateRollbackPlan() {
    try {
      const tags = this.getTags();
      const branches = this.getBranches();
      const currentCommit = this.getCurrentCommit();
      const currentBranch = this.getCurrentBranch();
      const commitHistory = this.getCommitHistory(20);

      const rollbackPlan = {
        currentState: {
          branch: currentBranch,
          commit: currentCommit
        },
        availableRollbackPoints: {
          tags: tags.slice(-10), // 最近10个标签
          branches: branches.filter(branch => branch !== currentBranch),
          recentCommits: commitHistory.slice(1, 10) // 最近10个提交（排除当前）
        },
        recommendedRollbackPoints: [],
        timestamp: new Date().toISOString()
      };

      // 推荐回滚点
      if (tags.length > 0) {
        rollbackPlan.recommendedRollbackPoints.push({
          type: 'tag',
          name: tags[tags.length - 1],
          reason: 'Most recent version tag'
        });
      }

      if (commitHistory.length > 1) {
        rollbackPlan.recommendedRollbackPoints.push({
          type: 'commit',
          name: commitHistory[1].split(' ')[0],
          reason: 'Previous commit'
        });
      }

      return rollbackPlan;
    } catch (error) {
      console.error('Generate rollback plan error:', error);
      return null;
    }
  }

  // 保存回滚计划
  saveRollbackPlan() {
    try {
      const rollbackPlan = this.generateRollbackPlan();
      if (!rollbackPlan) {
        return null;
      }

      const rollbackDir = path.join(this.repoPath, '.trae', 'git', 'rollback-plans');
      if (!fs.existsSync(rollbackDir)) {
        fs.mkdirSync(rollbackDir, { recursive: true });
      }

      const planPath = path.join(rollbackDir, `rollback-plan-${Date.now()}.json`);
      fs.writeFileSync(planPath, JSON.stringify(rollbackPlan, null, 2));

      console.log(`Rollback plan saved to: ${planPath}`);
      return planPath;
    } catch (error) {
      console.error('Save rollback plan error:', error);
      return null;
    }
  }

  // 执行完整的进化周期Git操作
  executeEvolutionGitCycle(message = 'System evolution cycle completed') {
    try {
      console.log('Starting evolution Git cycle...');

      // 保存回滚计划
      this.saveRollbackPlan();

      // 自动提交
      const commitResult = this.autoCommit(message);
      if (!commitResult) {
        console.log('Auto commit failed, aborting cycle');
        return null;
      }

      // 创建版本标签
      const tagResult = this.createVersionTag();
      if (!tagResult) {
        console.log('Tag creation failed, continuing without tag');
      }

      // 推送更改
      this.push(true);

      console.log('Evolution Git cycle completed successfully');
      return {
        commit: commitResult,
        tag: tagResult
      };
    } catch (error) {
      console.error('Execute evolution Git cycle error:', error);
      return null;
    }
  }
}

// 导出Git集成工具
const gitIntegration = new GitIntegration();

// 命令行接口
function runCommand(args) {
  const command = args[0];
  const params = args.slice(1);

  switch (command) {
    case 'status':
      console.log(gitIntegration.getStatus());
      break;

    case 'commit':
      const commitMessage = params.join(' ') || 'System update';
      gitIntegration.autoCommit(commitMessage);
      break;

    case 'tag':
      const tagVersion = params[0];
      gitIntegration.createVersionTag(tagVersion);
      break;

    case 'rollback':
      const rollbackPoint = params[0];
      gitIntegration.rollbackTo(rollbackPoint);
      break;

    case 'branch':
      if (params.length > 0) {
        gitIntegration.createBranch(params.join('-'));
      } else {
        console.log('Branches:');
        gitIntegration.getBranches().forEach(branch => console.log(`- ${branch}`));
      }
      break;

    case 'checkout':
      const branchToCheckout = params[0];
      gitIntegration.checkoutBranch(branchToCheckout);
      break;

    case 'history':
      const limit = params[0] || 10;
      console.log('Commit history:');
      gitIntegration.getCommitHistory(limit).forEach(commit => console.log(`- ${commit}`));
      break;

    case 'tags':
      console.log('Tags:');
      gitIntegration.getTags().forEach(tag => console.log(`- ${tag}`));
      break;

    case 'rollback-plan':
      const plan = gitIntegration.generateRollbackPlan();
      console.log(JSON.stringify(plan, null, 2));
      break;

    case 'save-plan':
      gitIntegration.saveRollbackPlan();
      break;

    case 'cycle':
      const cycleMessage = params.join(' ') || 'Evolution cycle completed';
      gitIntegration.executeEvolutionGitCycle(cycleMessage);
      break;

    case 'push':
      gitIntegration.push(true);
      break;

    case 'pull':
      gitIntegration.pull();
      break;

    case 'cleanup':
      gitIntegration.cleanupUntrackedFiles();
      break;

    case 'diff':
      const diffPath = params[0] || '.';
      console.log(gitIntegration.getDiff(diffPath));
      break;

    case 'help':
    default:
      console.log('Git Integration Tool Commands:');
      console.log('  status - Get current Git status');
      console.log('  commit [message] - Auto commit changes');
      console.log('  tag [version] - Create version tag');
      console.log('  rollback <point> - Rollback to specified point');
      console.log('  branch [name] - List branches or create new branch');
      console.log('  checkout <branch> - Switch to specified branch');
      console.log('  history [limit] - Get commit history');
      console.log('  tags - List all tags');
      console.log('  rollback-plan - Generate rollback plan');
      console.log('  save-plan - Save rollback plan');
      console.log('  cycle [message] - Execute complete evolution Git cycle');
      console.log('  push - Push changes and tags');
      console.log('  pull - Pull latest changes');
      console.log('  cleanup - Clean up untracked files');
      console.log('  diff [path] - Get diff for specified path');
      console.log('  help - Show this help message');
      break;
  }
}

// 执行命令
if (require.main === module) {
  const args = process.argv.slice(2);
  runCommand(args);
}

module.exports = {
  GitIntegration,
  gitIntegration
};