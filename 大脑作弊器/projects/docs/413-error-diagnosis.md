# 413错误诊断指南

## 重要说明

**文件大小限制（适配外网平台）：**
- **文件上传（PDF/EPUB/TXT）**：最大 10MB
- **单张图片**：最大 2MB
- **所有图片总大小**：最大 10MB

**原因：** 外网访问时，Coze平台的网关对请求体大小有限制，超过10MB会直接返回413错误。本地开发环境（localhost:5000）虽然支持更大的文件，但通过 `*.dev.coze.site` 外网域名访问时受平台限制。

## 当前服务器配置状态

### 已完成的配置：

1. **Next.js配置** (`next.config.ts`):
   - `experimental.serverActions.bodySizeLimit: '50mb'` - Server Actions限制（本地环境）

2. **API Route检查** (`src/app/api/process/route.ts`):
   - 提前检查请求的 `Content-Length` 头部
   - 超过10MB立即返回413错误

3. **前端检查** (`public/app.js`):
   - 文件上传前检查：10MB
   - 图片上传检查：单张2MB，总大小10MB

### 测试结果：

✅ 10MB文件上传成功
✅ 2MB图片上传成功
✅ 大于10MB文件正确拒绝

## 如果您仍然遇到413错误

### 步骤1：检查文件大小

请确保您的文件符合以下要求：
- PDF/EPUB/TXT文件：小于 10MB
- 单张图片：小于 2MB
- 所有图片总大小：小于 10MB

### 步骤2：使用调试工具

1. 打开浏览器开发者工具（F12）
2. 在Console标签页中输入：`debugUpload()`
3. 查看输出信息，特别是文件实际大小

### 步骤3：压缩文件

如果文件超过限制，可以使用以下工具压缩：

**PDF压缩：**
- Adobe Acrobat（专业版）
- Smallpdf（在线）：https://smallpdf.com/compress-pdf
- iLovePDF（在线）：https://www.ilovepdf.com/compress_pdf
- Foxit PhantomPDF

**图片压缩：**
- TinyPNG（在线）：https://tinypng.com/
- Compressor.io（在线）：https://compressor.io/
- Squoosh（Google工具）：https://squoosh.app/
- 手机自带图片压缩功能

### 步骤4：替代方案

如果无法压缩到10MB以内：

1. **拆分文件**
   - 将大PDF拆分成多个小文件
   - 分别上传处理

2. **转换为TXT**
   - 将PDF转换为TXT格式
   - 文件通常更小

3. **减少图片数量**
   - 只上传最关键的图片
   - 确保每张图片都经过压缩

## 网络限制说明

### 本地环境 vs 外网环境

| 环境 | 访问地址 | 限制 | 原因 |
|------|---------|------|------|
| 本地开发 | localhost:5000 | 50MB | 无中间代理 |
| 外网预览 | *.dev.coze.site | 10MB | Coze平台网关限制 |
| 生产部署 | 自定义域名 | 取决于服务器配置 | 取决于服务器配置 |

### 为什么是10MB？

经过测试，Coze平台的网关对请求体大小有限制，超过10MB的请求会被拦截，直接返回413错误。这是平台级别的限制，我们无法通过代码绕过。

## 需要更多帮助？

如果以上步骤都无法解决问题，请提供以下信息：

1. 浏览器控制台的 `debugUpload()` 输出
2. 实际文件大小
3. 文件类型（PDF/EPUB/TXT/图片）
4. 使用的浏览器和版本
5. 访问方式（本地localhost vs 外网域名）
