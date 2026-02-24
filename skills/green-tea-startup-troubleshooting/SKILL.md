# 绿茶智能体启动故障排除指南

## 技能信息
- **技能名称**: green-tea-startup-troubleshooting
- **版本**: 1.0.0
- **作者**: 系统管理员
- **创建日期**: 2026-02-23
- **类别**: 系统运维
- **适用场景**: 绿茶智能体启动失败时的故障排除

## 问题与解决方案

### 1. OpenClaw 构造函数错误
**问题**: `OpenClaw is not a constructor`
**原因**: OpenClaw 模块导入方式不正确
**解决方案**: 使用直接执行 openclaw.mjs 的方式启动
```bash
node ./node_modules/openclaw/openclaw.mjs gateway
```

### 2. 端口占用问题
**问题**: `Port 18789 is already in use`
**原因**: 之前的 OpenClaw 网关实例仍在运行
**解决方案**:
1. 停止网关服务
   ```bash
   node ./node_modules/openclaw/openclaw.mjs gateway stop
   ```
2. 强制终止占用端口的进程
   ```bash
   # 查找占用端口的进程PID
   netstat -ano | findstr :18789
   # 强制终止进程
   taskkill /PID [PID] /F
   ```

### 3. 命令参数错误
**问题**: `unknown option '--config'`
**原因**: OpenClaw gateway 命令不支持 --config 参数
**解决方案**: 使用正确的命令格式，先添加智能体再启动网关
```bash
# 添加智能体
node ./node_modules/openclaw/openclaw.mjs agents add green-tea --workspace [workspace_dir]
# 启动网关
node ./node_modules/openclaw/openclaw.mjs gateway run
```

### 4. 网关重复启动问题
**问题**: `gateway already running (pid XXXX)`
**原因**: 网关实例已在运行，但状态检测异常
**解决方案**:
1. 检查网关状态
   ```bash
   netstat -ano | findstr :18789
   ```
2. 强制终止进程
   ```bash
   taskkill /PID [PID] /F
   ```
3. 重新启动网关
   ```bash
   node ./node_modules/openclaw/openclaw.mjs gateway run
   ```

## 预防措施

### 1. 启动前检查
- 检查端口 18789 是否被占用
- 检查是否有 OpenClaw 进程在运行
- 确保工作目录和配置文件路径正确

### 2. 启动流程优化
1. 停止现有网关实例（如果存在）
2. 添加智能体配置
3. 启动网关服务
4. 验证网关运行状态

### 3. 监控与维护
- 定期检查网关运行状态
- 记录启动日志以便故障分析
- 建立启动脚本自动化流程

## 快速启动脚本

### Windows 启动脚本 (start-green-tea.bat)
```batch
@echo off

REM 检查并停止现有网关
node ./node_modules/openclaw/openclaw.mjs gateway stop 2>nul

REM 查找并终止占用端口的进程
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :18789') do (
    taskkill /PID %%a /F 2>nul
)

REM 添加智能体
node ./node_modules/openclaw/openclaw.mjs agents add green-tea --workspace "%~dp0agents\green-tea" --agent-dir "%~dp0agents\green-tea" 2>nul

REM 启动网关
node ./node_modules/openclaw/openclaw.mjs gateway run
```

### PowerShell 启动脚本 (start-green-tea.ps1)
```powershell
# 检查并停止现有网关
node ./node_modules/openclaw/openclaw.mjs gateway stop 2>$null

# 查找并终止占用端口的进程
$processes = netstat -ano | findstr :18789
if ($processes) {
    foreach ($process in $processes) {
        $pid = $process.Split()[-1]
        taskkill /PID $pid /F 2>$null
    }
}

# 添加智能体
node ./node_modules/openclaw/openclaw.mjs agents add green-tea --workspace "$PSScriptRoot\agents\green-tea" --agent-dir "$PSScriptRoot\agents\green-tea" 2>$null

# 启动网关
node ./node_modules/openclaw/openclaw.mjs gateway run
```

## 故障排除流程图

1. **启动绿茶智能体**
   └── 失败
       ├── 检查错误信息
       │   ├── 构造函数错误 → 使用 openclaw.mjs 直接执行
       │   ├── 端口占用 → 停止进程并重启
       │   ├── 命令参数错误 → 使用正确命令格式
       │   └── 网关重复运行 → 强制终止进程
       └── 重新启动
           └── 成功

## 相关文件
- **agents/green-tea/openclaw.json**: 绿茶智能体配置文件
- **agents/green-tea/agent.prompt**: 绿茶智能体提示词文件
- **start-green-tea.js**: 启动脚本
- **start-green-tea-cli.js**: CLI 启动脚本

## 版本历史

### v1.0.0 (2026-02-23)
- 初始创建
- 记录启动过程中的主要问题及解决方案
- 添加快速启动脚本
- 添加故障排除流程图

## 注意事项
- 本技能适用于 OpenClaw 2026.2.22-2 版本
- 不同版本的 OpenClaw 可能有不同的命令格式
- 启动前请确保 Node.js 环境正常
- 如遇新问题，请更新本技能文档

---

**标签**: #绿茶智能体 #OpenClaw #故障排除 #启动问题 #系统运维