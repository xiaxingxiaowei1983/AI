# 智能体端口隔离指南

## 技能信息
- **技能名称**: agent-port-isolation
- **版本**: 1.0.0
- **作者**: 系统管理员
- **创建日期**: 2026-02-23
- **类别**: 系统运维
- **适用场景**: 为多个智能体或项目分配独立的端口，避免端口冲突

## 功能说明

### 端口隔离的优势
- **避免冲突**: 每个智能体使用独立端口，彻底消除端口占用冲突
- **并行运行**: 多个智能体可以同时运行，互不影响
- **易于管理**: 通过端口号快速识别和访问不同智能体
- **安全隔离**: 每个智能体有独立的网络空间，提高安全性

### 支持的端口范围
- **推荐范围**: 10000-65535
- **避免使用**: 0-1023（系统保留端口）
- **避免使用**: 常用服务端口（如 80, 443, 3306 等）

## 配置方法

### 1. 为单个智能体指定端口

#### 命令格式
```bash
node ./node_modules/openclaw/openclaw.mjs gateway run --port <端口号> --force
```

#### 示例
```bash
# 为绿茶智能体使用端口 18789
node ./node_modules/openclaw/openclaw.mjs gateway run --port 18789 --force

# 为大宗师智能体使用端口 18790
node ./node_modules/openclaw/openclaw.mjs gateway run --port 18790 --force

# 为公司大脑智能体使用端口 18791
node ./node_modules/openclaw/openclaw.mjs gateway run --port 18791 --force
```

### 2. 为智能体分配固定端口

#### 端口分配表
| 智能体名称 | 端口号 | 用途 |
|-----------|--------|------|
| 绿茶智能体 | 18789 | 心理测试和内容创作 |
| 大宗师智能体 | 18790 | 通用智能体 |
| 公司大脑智能体 | 18791 | 智能体管理和调度 |
| 创新专家智能体 | 18792 | 创新咨询和分析 |
| 人生决策智能体 | 18793 | 人生规划和决策支持 |

### 3. 启动脚本配置

#### Windows 启动脚本 (start-agent-with-port.bat)
```batch
@echo off

REM 检查参数
if "%1"=="" (
    echo 用法: start-agent-with-port.bat [智能体名称] [端口号]
    echo 示例: start-agent-with-port.bat green-tea 18789
    exit /b 1
)

set AGENT_NAME=%1
set PORT=%2

REM 检查并停止现有网关
node ./node_modules/openclaw/openclaw.mjs gateway stop 2>nul

REM 查找并终止占用端口的进程
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :%PORT%') do (
    taskkill /PID %%a /F 2>nul
)

REM 添加智能体
node ./node_modules/openclaw/openclaw.mjs agents add %AGENT_NAME% --workspace "%~dp0agents\%AGENT_NAME%" --agent-dir "%~dp0agents\%AGENT_NAME%" 2>nul

REM 启动网关
node ./node_modules/openclaw/openclaw.mjs gateway run --port %PORT% --force
```

#### PowerShell 启动脚本 (start-agent-with-port.ps1)
```powershell
# 检查参数
if ($args.Length -lt 2) {
    Write-Host "用法: start-agent-with-port.ps1 [智能体名称] [端口号]"
    Write-Host "示例: start-agent-with-port.ps1 green-tea 18789"
    exit 1
}

$agentName = $args[0]
$port = $args[1]

# 检查并停止现有网关
node ./node_modules/openclaw/openclaw.mjs gateway stop 2>$null

# 查找并终止占用端口的进程
$processes = netstat -ano | findstr :$port
if ($processes) {
    foreach ($process in $processes) {
        $pid = $process.Split()[-1]
        taskkill /PID $pid /F 2>$null
    }
}

# 添加智能体
node ./node_modules/openclaw/openclaw.mjs agents add $agentName --workspace "$PSScriptRoot\agents\$agentName" --agent-dir "$PSScriptRoot\agents\$agentName" 2>$null

# 启动网关
node ./node_modules/openclaw/openclaw.mjs gateway run --port $port --force
```

### 4. 多智能体并行运行

#### 启动多个智能体的脚本 (start-multiple-agents.bat)
```batch
@echo off

REM 启动绿茶智能体（端口 18789）
start "绿茶智能体" cmd /c "node ./node_modules/openclaw/openclaw.mjs gateway run --port 18789 --force"

REM 启动大宗师智能体（端口 18790）
start "大宗师智能体" cmd /c "node ./node_modules/openclaw/openclaw.mjs gateway run --port 18790 --force"

REM 启动公司大脑智能体（端口 18791）
start "公司大脑智能体" cmd /c "node ./node_modules/openclaw/openclaw.mjs gateway run --port 18791 --force"

echo 所有智能体已启动！
echo 绿茶智能体: http://localhost:18789
echo 大宗师智能体: http://localhost:18790
echo 公司大脑智能体: http://localhost:18791
```

## 管理和监控

### 1. 检查端口占用情况

#### Windows 命令
```bash
netstat -ano | findstr :18789
netstat -ano | findstr :18790
netstat -ano | findstr :18791
```

#### PowerShell 命令
```powershell
Get-NetTCPConnection | Where-Object {$_.LocalPort -ge 18789 -and $_.LocalPort -le 18795} | Select-Object LocalPort, State, OwningProcess
```

### 2. 停止指定端口的网关

#### 命令格式
```bash
# 查找并终止占用端口的进程
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :<端口号>') do (
    taskkill /PID %%a /F
)
```

#### 示例
```bash
# 停止端口 18789 上的网关
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :18789') do (
    taskkill /PID %%a /F
)
```

### 3. 端口冲突处理

#### 自动端口分配脚本 (auto-port-assign.bat)
```batch
@echo off

REM 从 18789 开始查找可用端口
set START_PORT=18789
set CURRENT_PORT=%START_PORT%

:CHECK_PORT
REM 检查端口是否被占用
netstat -ano | findstr :%CURRENT_PORT% >nul
if %errorlevel% equ 0 (
    REM 端口被占用，尝试下一个端口
    set /a CURRENT_PORT+=1
    goto CHECK_PORT
) else (
    REM 端口可用
    echo 找到可用端口: %CURRENT_PORT%
    REM 启动网关
    node ./node_modules/openclaw/openclaw.mjs gateway run --port %CURRENT_PORT% --force
)
```

## 最佳实践

### 1. 端口管理
- **固定分配**: 为每个智能体分配固定端口，便于管理和访问
- **文档记录**: 维护端口分配表，记录每个端口的用途
- **范围规划**: 使用连续的端口范围，便于管理和识别

### 2. 启动管理
- **脚本化**: 使用启动脚本自动化启动过程
- **并行运行**: 支持多个智能体同时运行
- **错误处理**: 脚本中加入错误处理和端口冲突检测

### 3. 监控和维护
- **定期检查**: 定期检查端口占用情况
- **日志管理**: 记录启动日志，便于故障分析
- **自动恢复**: 实现自动端口分配和故障恢复机制

## 故障排除

### 1. 端口被占用

**症状**: 启动时提示 "Port XXXX is already in use"

**解决方案**:
1. 查找并终止占用端口的进程
   ```bash
   netstat -ano | findstr :<端口号>
   taskkill /PID <进程ID> /F
   ```
2. 使用 `--force` 选项强制启动
   ```bash
   node ./node_modules/openclaw/openclaw.mjs gateway run --port <端口号> --force
   ```
3. 尝试使用其他端口

### 2. 智能体无法访问

**症状**: 无法通过指定端口访问智能体

**解决方案**:
1. 检查网关是否正在运行
   ```bash
   netstat -ano | findstr :<端口号>
   ```
2. 检查防火墙设置，确保端口已开放
3. 尝试使用不同的端口
4. 检查智能体配置是否正确

### 3. 多智能体冲突

**症状**: 多个智能体同时运行时出现冲突

**解决方案**:
1. 确保每个智能体使用不同的端口
2. 为每个智能体创建独立的工作目录
3. 使用启动脚本管理多智能体启动
4. 实现智能体状态监控

## 相关技能

- **green-tea-startup-troubleshooting**: 绿茶智能体启动故障排除
- **system-tools**: 系统工具技能
- **openclaw-deployer**: OpenClaw 部署技能

## 版本历史

### v1.0.0 (2026-02-23)
- 初始创建
- 实现智能体端口隔离功能
- 提供启动脚本和配置示例
- 添加故障排除指南

---

**标签**: #端口隔离 #智能体管理 #系统运维 #OpenClaw #端口配置