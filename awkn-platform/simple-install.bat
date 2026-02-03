@echo off

REM 安装AWKN项目依赖的批处理脚本

echo === 安装AWKN项目依赖 ===
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

REM 安装根目录依赖
echo 1. 正在安装根目录依赖...
"%NPM_CMD%" install
if %errorlevel% neq 0 (
    echo 错误: 根目录依赖安装失败
    exit /b 1
)
echo ✓ 根目录依赖安装成功
echo.

REM 安装前端依赖
echo 2. 正在安装前端依赖...
cd frontend
"%NPM_CMD%" install
if %errorlevel% neq 0 (
    echo 错误: 前端依赖安装失败
    cd ..
    exit /b 1
)
cd ..
echo ✓ 前端依赖安装成功
echo.

REM 安装后端依赖
echo 3. 正在安装后端依赖...
cd backend
"%NPM_CMD%" install
if %errorlevel% neq 0 (
    echo 错误: 后端依赖安装失败
    cd ..
    exit /b 1
)
cd ..
echo ✓ 后端依赖安装成功
echo.

REM 配置环境变量
echo 4. 配置环境变量...

REM 前端环境变量
if not exist "frontend\.env.local" (
    if exist "frontend\.env.local.example" (
        copy "frontend\.env.local.example" "frontend\.env.local"
        echo ✓ 前端环境变量文件已创建
    ) else (
        echo 警告: 前端环境变量示例文件未找到
    )
)

REM 后端环境变量
if not exist "backend\.env" (
    if exist "backend\.env.example" (
        copy "backend\.env.example" "backend\.env"
        echo ✓ 后端环境变量文件已创建
    ) else (
        echo 警告: 后端环境变量示例文件未找到
    )
)
echo.
echo === 依赖安装完成 ===
echo 现在可以启动开发服务器了:
echo 1. 启动前端: npm run dev (在frontend目录)
echo 2. 启动后端: npm run dev (在backend目录)
echo.
