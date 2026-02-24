---
name: "system-tools"
description: "系统工具部署 SKILL，用于自动化安装和配置系统工具（如 PowerShell）"
author: "OpenClaw Team"
version: "1.0.0"
category: "system"
platforms: ["windows", "linux"]
requires: []
config:
  - key: "TOOL_INSTALL_PATH"
    value: "/usr/local/bin"
    description: "工具安装路径"
  - key: "AUTO_UPDATE"
    value: "true"
    description: "是否自动更新工具"

# 系统工具部署 SKILL

## 功能
- 自动化安装和配置系统工具（如 PowerShell）
- 工具版本管理和升级
- 环境一致性保障
- 工具依赖管理

## 使用场景
- 新环境初始化
- 团队开发环境标准化
- 工具链升级和维护
- 跨平台工具配置

## 核心组件
### 1. 包管理和安装
- 多平台包管理（winget, apt, yum 等）
- 自动依赖解析和安装
- 版本控制和锁定

### 2. 版本控制
- 工具版本管理
- 升级和回滚机制
- 版本兼容性检查

### 3. 环境验证
- 环境一致性检查
- 工具可用性验证
- 配置正确性验证

## 配置
### 环境变量
- `TOOL_INSTALL_PATH`: 工具安装路径
- `AUTO_UPDATE`: 是否自动更新工具
- `TOOL_REPOSITORY`: 工具仓库地址

### 配置文件
```yaml
# tools-config.yml
tools:
  - name: "powershell"
    version: "7.5.4"
    source: "winget"
    id: "Microsoft.Powershell"
  - name: "nodejs"
    version: "18.17.0"
    source: "chocolatey"
    id: "nodejs"
  - name: "git"
    version: "2.40.0"
    source: "winget"
    id: "Git.Git"
```

## 使用示例
### 1. 安装系统工具
```bash
# 安装 PowerShell
install-tool.ps1 --name powershell --version 7.5.4

# 安装 Node.js
install-tool.ps1 --name nodejs --version 18.17.0

# 安装多个工具
install-tools.ps1 --config tools-config.yml
```

### 2. 版本管理
```bash
# 检查工具版本
check-tool-version.ps1 --name powershell

# 升级工具
upgrade-tool.ps1 --name powershell --version 7.5.4

# 回滚工具版本
rollback-tool.ps1 --name powershell --version 7.4.0
```

### 3. 环境验证
```bash
# 验证环境配置
validate-environment.ps1

# 生成环境报告
generate-environment-report.ps1 > environment-report.md
```

## 安全
- 工具来源验证
- 安装包完整性检查
- 权限和访问控制

## 监控
- 工具版本状态
- 安装和升级历史
- 异常情况告警

## 维护
- 工具仓库同步
- 版本兼容性测试
- 性能优化和调优