---
name: "git-credential-manager"
description: "Git凭证管理工具，解决跨对话框的Git账号和SSH密钥同步问题，确保所有智能体都能正常访问Git仓库。"
author: "Git Credential Manager"
tags:
  - git
  - ssh
  - credentials
  - synchronization
  - security
version: "1.0.0"
---

# Git凭证管理工具（Git Credential Manager）

## 核心特征
作为Git凭证管理工具，我具备以下核心特征：

- **凭证同步**：在不同对话框和智能体之间同步Git账号和SSH密钥
- **安全存储**：加密存储Git凭证和SSH密钥
- **自动配置**：自动为智能体配置Git和SSH环境
- **跨平台支持**：支持Windows、macOS和Linux环境
- **错误处理**：智能解决常见的Git凭证问题

## 语言风格
- 专业、简洁、直接
- 注重实用性和可操作性
- 使用清晰的步骤说明
- 避免技术术语堆砌

## 知识领域

### 1. 凭证管理
- **Git账号管理**：管理Git用户名、邮箱和认证信息
- **SSH密钥管理**：生成、存储和使用SSH密钥
- **凭证存储**：安全存储Git凭证和SSH密钥
- **凭证更新**：更新过期或变更的凭证

### 2. 同步机制
- **跨对话框同步**：在不同对话框之间同步Git凭证
- **智能体同步**：确保所有智能体都能访问相同的Git凭证
- **环境检测**：检测不同环境的Git配置需求
- **自动配置**：为新环境自动配置Git凭证

### 3. 安全管理
- **凭证加密**：加密存储Git凭证和SSH密钥
- **权限控制**：控制谁可以访问Git凭证
- **安全审计**：记录Git凭证的使用情况
- **漏洞防护**：防止Git凭证泄露

### 4. 故障排除
- **凭证错误诊断**：诊断和解决Git凭证错误
- **SSH连接问题**：解决SSH连接和认证问题
- **Git操作失败**：解决Git操作失败的问题
- **网络问题**：处理网络相关的Git问题

## 工作原理

### 1. 核心机制
- **凭证存储**：安全存储Git凭证和SSH密钥
- **同步服务**：在不同对话框和智能体之间同步凭证
- **环境检测**：检测智能体运行环境的Git配置需求
- **自动配置**：为智能体自动配置Git和SSH环境

### 2. 技术架构
- **命令层**：提供CLI命令接口
- **服务层**：实现核心凭证管理功能
- **存储层**：安全存储Git凭证和SSH密钥
- **同步层**：在不同环境之间同步凭证
- **配置层**：为智能体配置Git环境

## 使用方法

### 基本使用

#### 1. 初始化凭证管理
```bash
git-credential-manager init
```

#### 2. 配置Git账号
```bash
git-credential-manager configure --user "your-username" --email "your-email@example.com"
```

#### 3. 配置SSH密钥
```bash
git-credential-manager ssh --generate
# 或导入现有密钥
git-credential-manager ssh --import "path/to/ssh/key"
```

#### 4. 同步凭证
```bash
git-credential-manager sync
```

#### 5. 验证配置
```bash
git-credential-manager verify
```

### 高级功能

#### 1. 多账号管理
```bash
git-credential-manager account --add --name "work" --user "work-username" --email "work-email@example.com"
git-credential-manager account --switch "work"
```

#### 2. 凭证备份与恢复
```bash
git-credential-manager backup --file "git-credentials-backup.json"
git-credential-manager restore --file "git-credentials-backup.json"
```

#### 3. 环境配置
```bash
git-credential-manager env --setup --target "path/to/agent/environment"
git-credential-manager env --verify --target "path/to/agent/environment"
```

#### 4. 安全审计
```bash
git-credential-manager audit --log "git-credential-audit.log"
git-credential-manager audit --analyze --log "git-credential-audit.log"
```

## 能力节点定义

### 1. 凭证配置器
- **能力名称**：配置Git凭证
- **输入条件**：
  - Git用户名
  - Git邮箱
  - 认证方式
- **输出结果**：
  - 配置状态
  - 验证结果
  - 配置文件路径
- **成功前提**：
  - 有效的Git用户名和邮箱
  - 足够的权限
- **失败边界**：
  - 无效的用户信息
  - 权限不足
- **执行逻辑**：
  1. 验证用户输入
  2. 更新.gitconfig文件
  3. 验证配置结果
  4. 存储凭证信息

### 2. SSH密钥管理器
- **能力名称**：管理SSH密钥
- **输入条件**：
  - 操作类型（生成/导入/删除）
  - 密钥路径
  - 密钥密码（可选）
- **输出结果**：
  - 操作状态
  - 密钥信息
  - 公钥内容
- **成功前提**：
  - 有效的操作类型
  - 足够的权限
- **失败边界**：
  - 无效的操作类型
  - 权限不足
  - 密钥文件无效
- **执行逻辑**：
  1. 验证操作类型
  2. 执行相应操作（生成/导入/删除）
  3. 设置密钥权限
  4. 验证密钥状态
  5. 存储密钥信息

### 3. 凭证同步器
- **能力名称**：同步Git凭证
- **输入条件**：
  - 同步目标（所有智能体/特定智能体）
  - 同步内容（全部/部分）
  - 同步选项
- **输出结果**：
  - 同步状态
  - 同步目标列表
  - 同步结果
- **成功前提**：
  - 已配置Git凭证
  - 目标智能体存在
- **失败边界**：
  - 未配置Git凭证
  - 目标智能体不存在
  - 同步权限不足
- **执行逻辑**：
  1. 收集当前Git凭证
  2. 确定同步目标
  3. 为每个目标配置凭证
  4. 验证同步结果
  5. 记录同步状态

### 4. 环境检测器
- **能力名称**：检测Git环境
- **输入条件**：
  - 检测目标（本地/远程/智能体）
  - 检测深度
  - 检测选项
- **输出结果**：
  - 环境状态报告
  - 配置问题列表
  - 改进建议
- **成功前提**：
  - 有效的检测目标
  - 足够的权限
- **失败边界**：
  - 无效的检测目标
  - 权限不足
  - 目标环境不可访问
- **执行逻辑**：
  1. 确定检测目标
  2. 检测Git安装状态
  3. 检测Git配置
  4. 检测SSH配置
  5. 生成环境报告
  6. 提供改进建议

### 5. 故障排除器
- **能力名称**：解决Git凭证问题
- **输入条件**：
  - 错误类型
  - 错误信息
  - 故障排除选项
- **输出结果**：
  - 错误诊断报告
  - 修复方案
  - 执行结果
- **成功前提**：
  - 有效的错误信息
  - 足够的权限
- **失败边界**：
  - 无效的错误信息
  - 权限不足
  - 修复方案不可用
- **执行逻辑**：
  1. 分析错误信息
  2. 识别问题原因
  3. 生成修复方案
  4. 执行修复操作
  5. 验证修复结果

## 最佳实践

### 1. 凭证管理
- **定期更新**：定期更新Git凭证和SSH密钥
- **使用SSH**：优先使用SSH认证而非HTTPS
- **密钥保护**：为SSH密钥设置强密码
- **备份凭证**：定期备份Git凭证和SSH密钥

### 2. 同步策略
- **自动同步**：启用自动同步功能，确保所有智能体都有最新凭证
- **按需同步**：在新智能体创建时手动同步凭证
- **定期验证**：定期验证所有智能体的Git凭证配置
- **冲突解决**：建立凭证冲突的解决机制

### 3. 安全措施
- **凭证加密**：确保Git凭证和SSH密钥被加密存储
- **权限控制**：限制谁可以访问Git凭证
- **安全审计**：定期审计Git凭证的使用情况
- **泄露防护**：防止Git凭证在日志和错误信息中泄露

### 4. 故障排除
- **日志分析**：分析Git和SSH的详细日志
- **分步测试**：从基本连接开始，逐步测试Git操作
- **环境隔离**：在隔离环境中测试Git配置
- **版本控制**：使用版本控制管理Git配置文件

## 常见问题

### Q: 如何解决SSH密钥权限错误？
**A:** SSH密钥需要正确的权限设置：
- 在Windows上：确保密钥文件权限设置为仅当前用户可访问
- 在Linux/macOS上：使用 `chmod 600 ~/.ssh/id_rsa` 设置正确权限
- 使用 `git-credential-manager ssh --fix-permissions` 自动修复权限

### Q: 如何解决Git推送失败的问题？
**A:** 可能的原因包括：
- 凭证无效：使用 `git-credential-manager verify` 验证凭证
- SSH连接问题：使用 `git-credential-manager ssh --test` 测试SSH连接
- 仓库权限：确保有足够的仓库访问权限
- 网络问题：检查网络连接和防火墙设置

### Q: 如何在多个智能体之间同步Git凭证？
**A:** 使用同步功能：
```bash
git-credential-manager sync --all-agents
git-credential-manager sync --agent "master"
git-credential-manager sync --agent "green-tea"
```

### Q: 如何备份和恢复Git凭证？
**A:** 使用备份和恢复功能：
```bash
git-credential-manager backup --file "git-credentials-backup.json"
git-credential-manager restore --file "git-credentials-backup.json"
```

## 版本历史

### v1.0.0
- 初始版本
- 实现基本的Git凭证管理功能
- 支持SSH密钥管理和同步
- 提供Git环境检测和配置
- 解决常见的Git凭证问题

## 总结

Git凭证管理工具为OpenClaw智能体提供了全面的Git凭证管理和同步解决方案，确保所有智能体都能正常访问Git仓库，无论它们运行在哪个对话框中。

该工具具有以下优势：
- **凭证同步**：在不同对话框和智能体之间同步Git凭证
- **安全存储**：加密存储Git凭证和SSH密钥
- **自动配置**：为智能体自动配置Git和SSH环境
- **跨平台支持**：支持Windows、macOS和Linux环境
- **错误处理**：智能解决常见的Git凭证问题

通过使用Git凭证管理工具，您可以确保所有智能体都能无缝访问Git仓库，无需在每个对话框中重复配置Git凭证，提高工作效率并减少错误。