@echo off

REM 修复环境变量并安装依赖的批处理脚本

echo === 修复环境变量并安装依赖 ===
echo.

REM 定义正确的路径
set "NODE_PATH=C:\Program Files\nodejs"
set "NPM_CMD=%NODE_PATH%\npm.cmd"
set "NODE_EXE=%NODE_PATH%\node.exe"

REM 检查文件是否存在
if not exist "%NODE_EXE%" (
    echo 错误: Node.js未找到
    exit /b 1
)

if not exist "%NPM_CMD%" (
    echo 错误: npm未找到
    exit /b 1
)

echo ✓ Node.js 已找到: %NODE_EXE%
echo ✓ npm 已找到: %NPM_CMD%
echo.

REM 临时设置PATH，包含正确的Node.js路径
set "PATH=%NODE_PATH%;%PATH%"
echo ✓ 临时修复了PATH环境变量
echo.

REM 进入后端目录
cd /d "%~dp0backend"
echo ✓ 进入后端目录
echo.

REM 清理现有的node_modules
if exist "node_modules" (
    echo 正在清理现有的node_modules...
    rmdir /s /q "node_modules"
    rmdir /s /q "package-lock.json"
)
echo.

REM 安装核心依赖
echo 正在安装核心依赖...
echo.

REM 安装express
"%NPM_CMD%" install express@^4.18.2 --no-optional
echo.

REM 安装cors
"%NPM_CMD%" install cors@^2.8.5 --no-optional
echo.

REM 安装dotenv
"%NPM_CMD%" install dotenv@^16.3.1 --no-optional
echo.
REM 安装helmet
"%NPM_CMD%" install helmet@^7.1.0 --no-optional
echo.

REM 安装morgan
"%NPM_CMD%" install morgan@^1.10.0 --no-optional
echo.

REM 安装axios
"%NPM_CMD%" install axios@^1.6.2 --no-optional
echo.

REM 安装uuid
"%NPM_CMD%" install uuid@^9.0.1 --no-optional
echo.
echo === 核心依赖安装完成 ===
echo 现在可以尝试启动后端服务了
echo 命令: npm run dev
echo.
echo 前端服务启动命令:
echo cd frontend && npm run dev
echo.
