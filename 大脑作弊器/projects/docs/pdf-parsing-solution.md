# PDF解析方案升级文档

## 概述

本文档说明了PDF解析方案从 `pdf-parse` 升级到 `pdfjs-dist` 的详细信息和改进。

## 为什么选择 pdfjs-dist

### 原方案：pdf-parse 的问题

1. **依赖问题**：需要特殊导入方式绕过测试逻辑
2. **解析质量**：对纯文本文档的提取质量不稳定
3. **维护性**：更新频率低，社区活跃度不高
4. **兼容性**：某些PDF文件格式支持不佳

### 新方案：pdfjs-dist 的优势

1. ✅ **官方维护**：Mozilla官方项目，持续更新
2. ✅ **稳定性高**：广泛使用于Firefox浏览器，经过充分测试
3. ✅ **文本质量**：更好的文本提取算法，保留更准确的格式
4. ✅ **Node.js支持**：原生支持服务器端运行
5. ✅ **无需外部依赖**：纯JavaScript实现，不依赖系统组件
6. ✅ **更好的错误处理**：详细的错误信息和恢复机制

## 技术实现

### 核心解析流程

```typescript
// 1. 加载PDF文档
const loadingTask = pdfjsLib.getDocument({
  data: new Uint8Array(buffer),
  useSystemFonts: true,
  useWorkerFetch: false,
});

const pdfDocument = await loadingTask.promise;
const numPages = pdfDocument.numPages;

// 2. 逐页提取文本
for (let pageNum = 1; pageNum <= numPages; pageNum++) {
  const page = await pdfDocument.getPage(pageNum);
  const textContent = await page.getTextContent();

  // 3. 处理文本项，保持排版
  let pageText = '';
  let lastY = 0;

  for (const item of textContent.items) {
    // 根据y坐标判断是否需要换行
    if (lastY !== 0 && Math.abs(textItem.transform[5] - lastY) > 5) {
      pageText += '\n';
    }
    pageText += textItem.str;
  }
}
```

### 智能换行算法

新方案实现了智能换行算法，根据文本的y坐标自动判断换行：
- 如果y坐标变化大于5个单位，视为换行
- 保留原始的文本排版结构
- 提高可读性

### 错误处理机制

```typescript
try {
  // 尝试用 pdfjs-dist 解析
  const extractedText = await extractTextWithPdfjs(buffer);

  // 检查文本长度
  if (extractedText.length < 100) {
    // 文本太少，可能是扫描PDF
    isImagePDF = true;
  }
} catch (error) {
  // 解析失败，尝试OCR方案
  isImagePDF = true;
}

// 如果是扫描PDF，使用OCR回退方案
if (isImagePDF) {
  extractedText = await extractTextWithOCR(buffer);
}
```

## 两种解析方案对比

| 特性 | pdf-parse（旧） | pdfjs-dist（新） |
|------|----------------|------------------|
| 维护者 | 社区 | Mozilla官方 |
| 更新频率 | 低 | 高 |
| 文本质量 | 一般 | 优秀 |
| 格式保留 | 较差 | 良好 |
| 错误处理 | 简单 | 详细 |
| 性能 | 中等 | 优秀 |
| 依赖 | 无 | 无 |
| 适用场景 | 简单PDF | 所有PDF类型 |

## OCR回退方案

当检测到以下情况时，自动切换到OCR方案：

1. 文本提取长度 < 100字符
2. PDF解析抛出错误
3. PDF文件损坏或格式不正确

OCR流程：
```typescript
// 1. 使用 pdf2pic 将PDF转换为图片
const converter = fromPath(tempPath, {
  density: 150,
  quality: 90,
  format: 'jpeg',
  width: 2000,
  height: 2000
});

// 2. 对每页图片进行OCR识别
for (let i = 1; i <= maxPages; i++) {
  const result = await converter(i);
  const text = await recognizeImageWithLLM(result.base64);
  ocrResults.push(text);
}
```

## 支持的PDF类型

### ✅ 可以完美处理

1. **纯文本PDF**：使用 pdfjs-dist 直接提取
2. **混合PDF**：文本+图片，提取文本层
3. **表格PDF**：保留表格结构（部分支持）
4. **多列PDF**：智能换行算法处理

### ⚠️ 需要OCR处理

1. **扫描PDF**：图片型PDF，使用OCR识别
2. **加密PDF**：需要密码才能解析
3. **损坏PDF**：文件头部损坏，尝试OCR恢复

### ❌ 不支持

1. **密码保护PDF**：需要用户提供密码
2. **严重损坏PDF**：无法读取任何内容

## 性能优化

### 1. 配置优化

```typescript
const loadingTask = pdfjsLib.getDocument({
  data: new Uint8Array(buffer),
  useSystemFonts: true,      // 使用系统字体，提高性能
  useWorkerFetch: false,     // 禁用Worker，避免Node.js兼容问题
});
```

### 2. 分页处理

- 逐页提取，避免内存溢出
- 限制OCR处理页数（最多5页）
- 自动清理临时文件

### 3. 超时控制

- PDF解析：最多60秒
- OCR识别：最多30秒
- 总请求：最多90秒

## 使用示例

### 用户上传PDF文件

1. 前端验证文件大小（< 10MB）
2. 后端使用 pdfjs-dist 解析
3. 如果文本提取失败，自动切换OCR
4. 返回提取的文本内容

### 处理流程图

```
PDF文件上传
    ↓
文件头校验（%PDF-）
    ↓
pdfjs-dist 解析
    ↓
文本长度检查
    ↓
    ├─ ≥ 100字符 → 直接返回文本
    └─ < 100字符 → OCR识别
            ↓
        返回OCR文本
```

## 测试验证

### 自动化测试

```bash
# TypeScript类型检查
npx tsc --noEmit

# API健康检查
curl -I http://localhost:5000
```

### 手动测试

1. 上传纯文本PDF → 验证文本提取
2. 上传扫描PDF → 验证OCR识别
3. 上传损坏PDF → 验证错误提示
4. 上传超大PDF → 验证文件大小限制

## 常见问题

### Q1: 为什么某些PDF解析失败？

A: 可能原因：
- PDF文件损坏
- PDF使用特殊字体编码
- PDF是扫描版（需要OCR）
- PDF有密码保护

### Q2: OCR识别需要多久？

A: 取决于：
- 页数：每页约10-20秒
- 图片质量：清晰度越高越快
- 内容复杂度：简单文字更快

### Q3: 能否提高OCR识别质量？

A: 可以：
- 使用高DPI转换（150 DPI）
- 使用高质量的JPEG格式
- 减少图片尺寸（2000x2000）

## 未来优化方向

1. **PDF.js缓存**：缓存已解析的PDF，提高重复访问速度
2. **并行处理**：多页PDF并行提取
3. **表格识别**：改进表格结构提取
4. **增量解析**：只解析用户查看的页面
5. **压缩优化**：对大文件进行压缩后再解析

## 参考文档

- [pdfjs-dist 官方文档](https://mozilla.github.io/pdf.js/)
- [PDF.js GitHub](https://github.com/mozilla/pdf.js)
- [pdf-parse 项目](https://github.com/modesty/pdf-parse)

## 更新日志

### 2025-01-21

- ✅ 从 pdf-parse 升级到 pdfjs-dist
- ✅ 实现智能换行算法
- ✅ 优化错误处理机制
- ✅ 保留OCR回退方案
- ✅ 添加详细的日志输出
