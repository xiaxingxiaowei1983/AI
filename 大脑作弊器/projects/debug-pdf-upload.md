# PDF上传接口调试清单

## ✅ 已完成的检查项

### 1. 核心配置正确性检查
- [x] **请求方法**: 使用 `POST` ✓
- [x] **Content-Type**: 使用 `application/json`（前端通过base64传输）✓
- [x] **文件编码**: Base64编码（符合后端预期）✓

### 2. 代码审查
- [x] pdf-parse 正确导入
- [x] pdf2pic 安装完成
- [x] canvas 安装完成
- [x] TypeScript 编译检查通过
- [x] 服务正常运行在5000端口

## 🔍 当前排查重点

### 问题1: pdf2pic依赖问题
pdf2pic可能缺少系统依赖（如ImageMagick），需要检查：

```bash
# 检查ImageMagick是否安装
which convert || which magick

# 如果没有安装，需要安装
apt-get update && apt-get install -y imagemagick
```

### 问题2: canvas依赖问题
canvas需要编译，可能在沙箱环境中无法正常工作。

### 问题3: 文件大小限制
Next.js默认body大小限制为1MB，需要确认配置。

## 📋 需要执行的排查步骤

### 第一步：检查系统依赖
```bash
# 检查是否有ImageMagick
which convert

# 检查pdf2pic依赖
pnpm list pdf2pic
```

### 第二步：测试pdf2pic功能
```bash
node -e "
const pdf2pic = require('pdf2pic');
console.log('pdf2pic导入成功');
"
```

### 第三步：查看Next.js配置
检查next.config.js中的body大小限制配置。

### 第四步：测试API
创建测试脚本直接调用API，绕过前端。

## 🎯 可能的问题原因

1. **pdf2pic缺少系统依赖**（最可能）
   - 需要安装ImageMagick或GraphicsMagick
   - 沙箱环境可能不允许安装系统级依赖

2. **canvas编译问题**
   - canvas需要native模块，可能在沙箱中无法编译

3. **Next.js body限制**
   - 大文件可能超过默认的1MB限制

4. **临时目录权限**
   - /tmp目录可能没有写权限

## 💡 建议的解决方案

### 方案A: 移除pdf2pic，直接使用视觉模型
不将PDF转为图片，直接将PDF传给视觉模型（如果支持）。

### 方案B: 使用更简单的PDF转图片库
尝试其他不需要系统依赖的库，如pdf-to-img。

### 方案C: 直接将PDF传给OCR API
使用豆包的视觉模型直接处理PDF文件（如果支持）。

## 📝 调试日志位置
- 主日志: `/app/work/logs/bypass/app.log`
- 开发日志: `/app/work/logs/bypass/dev.log`
