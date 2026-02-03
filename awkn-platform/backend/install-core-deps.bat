@echo off

REM 安装后端核心依赖的批处理脚本

echo === 安装后端核心依赖 ===
echo.

REM 定义npm路径
set "NPM_CMD=C:\Program Files\nodejs\npm.cmd"

REM 检查npm是否存在
if not exist "%NPM_CMD%" (
    echo 错误: npm未找到
    exit /b 1
)

echo ✓ npm 已找到: %NPM_CMD%
echo.

REM 逐个安装核心依赖
echo 正在安装核心依赖...
echo.

REM 安装express
"%NPM_CMD%" install express@^4.18.2
echo.

REM 安装mongoose
"%NPM_CMD%" install mongoose@^8.0.3
echo.

REM 安装cors
"%NPM_CMD%" install cors@^2.8.5
echo.

REM 安装dotenv
"%NPM_CMD%" install dotenv@^16.3.1
echo.

REM 安装helmet
"%NPM_CMD%" install helmet@^7.1.0
echo.

REM 安装morgan
"%NPM_CMD%" install morgan@^1.10.0
echo.

REM 安装axios
"%NPM_CMD%" install axios@^1.6.2
echo.

REM 安装uuid
"%NPM_CMD%" install uuid@^9.0.1
echo.
echo === 核心依赖安装完成 ===
echo 现在可以尝试启动后端服务了
echo 命令: npm run dev
echo.
