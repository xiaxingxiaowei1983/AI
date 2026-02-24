---
name: "git-ssh-sync"
description: "Git和SSH配置同步管理器，确保所有对话框共享相同的Git账号和SSH密钥配置，实现跨对话框的Git和SSH设置统一管理。"
author: "Git SSH Sync Manager"
tags:
  - git
  - ssh
  - synchronization
  - configuration
  - meta-skill
version: "1.0.0"
user-invocable: true
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - Grep
hooks:
  PreToolUse:
    - matcher: "Bash"
      hooks:
        - type: command
          command: "echo '[git-ssh-sync] Checking Git and SSH configuration...'"
  PostToolUse:
    - matcher: "Bash"
      hooks:
        - type: command
          command: "echo '[git-ssh-sync] Git and SSH configuration check completed.'"
---

# Git SSH 配置同步管理器

## 核心功能

### 1. Git 配置同步
- **全局配置管理**：统一管理全局 Git 配置，包括用户名、邮箱等
- **配置备份**：定期备份 Git 配置，确保配置安全
- **配置恢复**：在需要时快速恢复 Git 配置
- **多对话框同步**：确保所有对话框使用相同的 Git 配置

### 2. SSH 密钥管理
- **密钥检测**：自动检测现有的 SSH 密钥
- **密钥备份**：备份重要的 SSH 密钥文件
- **密钥同步**：确保所有对话框可以访问相同的 SSH 密钥
- **权限设置**：自动设置正确的 SSH 密钥文件权限

### 3. 配置诊断
- **配置检查**：检查 Git 和 SSH 配置的完整性
- **连接测试**：测试与 Git 服务器的 SSH 连接
- **问题诊断**：诊断常见的 Git 和 SSH 配置问题
- **修复建议**：提供配置问题的修复建议

## 工作原理

### 配置存储
- **中央配置库**：在用户主目录下创建中央配置存储
- **配置同步**：定期将配置同步到中央存储
- **配置分发**：从中央存储向各个对话框分发配置

### 同步机制
- **实时同步**：重要配置变更时立即同步
- **定期同步**：定期检查和同步配置
- **按需同步**：在对话框启动时同步配置

## 使用方法

### 基本命令

#### 检查配置状态
```bash
# 检查 Git 配置状态
git config --list

# 检查 SSH 密钥状态
ls -la ~/.ssh

# 测试 SSH 连接
ssh -T git@github.com
```

#### 同步配置
```bash
# 同步 Git 配置
git config --global user.name "xiaxingxiaowei1983"
git config --global user.email "xiaxingxiaowei1983@gmail.com"

# 确保 SSH 密钥权限正确
chmod 600 ~/.ssh/id_ed25519
chmod 644 ~/.ssh/id_ed25519.pub

# 启动 SSH 代理
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

### 高级功能

#### 配置备份与恢复
```bash
# 备份 Git 配置
git config --list --global > ~/.gitconfig.bak

# 备份 SSH 配置
cp -r ~/.ssh ~/.ssh.bak

# 恢复 Git 配置
cat ~/.gitconfig.bak | git config --global -e

# 恢复 SSH 配置
cp -r ~/.ssh.bak/* ~/.ssh/
```

#### 多平台同步
```bash
# Windows 配置
$env:HOME = $env:USERPROFILE
Get-ChildItem -Path $env:HOME\.ssh

# Linux/Mac 配置
export HOME=~ 
ls -la ~/.ssh
```

## 配置指南

### Git 全局配置
```bash
# 设置用户名和邮箱
git config --global user.name "你的用户名"
git config --global user.email "你的邮箱"

# 设置其他全局配置
git config --global core.autocrlf true
git config --global core.editor "code --wait"
git config --global merge.tool vscode
git config --global diff.tool vscode
```

### SSH 配置优化
```bash
# 创建 SSH 配置文件
cat > ~/.ssh/config << EOF
# GitHub
Host github.com
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519
  IdentitiesOnly yes
  TCPKeepAlive yes
  ServerAliveInterval 60

# GitLab
Host gitlab.com
  HostName gitlab.com
  User git
  IdentityFile ~/.ssh/id_ed25519
  IdentitiesOnly yes
  TCPKeepAlive yes
  ServerAliveInterval 60

# Gitee
Host gitee.com
  HostName gitee.com
  User git
  IdentityFile ~/.ssh/id_ed25519
  IdentitiesOnly yes
  TCPKeepAlive yes
  ServerAliveInterval 60
EOF

# 设置配置文件权限
chmod 600 ~/.ssh/config
```

## 故障排除

### 常见问题

#### SSH 连接问题
- **权限错误**：确保 SSH 密钥文件权限正确
  ```bash
  chmod 600 ~/.ssh/id_ed25519
  chmod 644 ~/.ssh/id_ed25519.pub
  ```

- **代理问题**：确保 SSH 代理正在运行
  ```bash
  eval "$(ssh-agent -s)"
  ssh-add ~/.ssh/id_ed25519
  ```

- **主机密钥验证**：首次连接时需要验证主机密钥
  ```bash
  ssh -T git@github.com
  # 输入 yes 确认
  ```

#### Git 配置问题
- **用户名/邮箱错误**：检查全局 Git 配置
  ```bash
  git config --global user.name
  git config --global user.email
  ```

- **远程 URL 问题**：确保使用正确的远程 URL 格式
  ```bash
  git remote -v
  # 确保使用 SSH 格式的 URL
  ```

### 高级诊断

#### 详细连接测试
```bash
# 详细测试 SSH 连接
ssh -vT git@github.com

# 检查 SSH 代理状态
ssh-add -l

# 检查 SSH 配置
ssh -G github.com
```

#### 配置一致性检查
```bash
# 检查所有 Git 配置文件
git config --list --show-origin

# 检查 SSH 密钥指纹
ssh-keygen -l -f ~/.ssh/id_ed25519.pub

# 检查 known_hosts 文件
cat ~/.ssh/known_hosts
```

## 跨对话框同步

### 手动同步
```bash
# 从中央存储同步配置
cp ~/.git-ssh-sync/gitconfig ~/.gitconfig
cp -r ~/.git-ssh-sync/ssh/* ~/.ssh/

# 向中央存储同步配置
mkdir -p ~/.git-ssh-sync/ssh
cp ~/.gitconfig ~/.git-ssh-sync/gitconfig
cp -r ~/.ssh/* ~/.git-ssh-sync/ssh/
```

### 自动同步
- **启动时同步**：在对话框启动脚本中添加同步命令
- **定时同步**：设置定时任务定期同步配置
- **事件触发**：在配置变更时自动触发同步

## 安全注意事项

### SSH 密钥安全
- **保护私钥**：永远不要分享 SSH 私钥文件
- **使用密码短语**：为 SSH 密钥设置密码短语
- **定期更换密钥**：定期更换 SSH 密钥以提高安全性
- **使用密钥代理**：使用 SSH 代理管理密钥，避免重复输入密码短语

### Git 配置安全
- **避免硬编码**：不要在 Git 配置中硬编码敏感信息
- **使用 credential helper**：使用 Git credential helper 管理凭证
- **定期检查**：定期检查 Git 配置，确保没有敏感信息泄露

## 版本历史

### v1.0.0
- 初始版本
- 支持 Git 配置同步
- 支持 SSH 密钥管理
- 支持配置诊断和故障排除
- 提供详细的使用指南和故障排除建议

---

## 总结

Git SSH 配置同步管理器通过统一管理 Git 和 SSH 配置，确保所有对话框共享相同的 Git 账号和 SSH 密钥配置，解决了跨对话框 Git 和 SSH 设置不一致的问题。

无论是在开发、测试还是部署环境中，这个工具都能帮助您保持 Git 和 SSH 配置的一致性，减少配置错误导致的问题，提高工作效率。

通过定期备份和同步配置，您还可以确保在系统变更或迁移时，Git 和 SSH 配置能够安全地转移，避免因配置丢失导致的连接问题。