# 大脑作弊器 v1.0 正式版备份

## 备份信息
- **版本号**: v1.0 正式版
- **备份日期**: 2026-01-21
- **备份类型**: 完整备份（生产环境）

## 备份内容清单

### 1. 前端文件 (public/)
- `index.html` - 主页面
- `app.js` - 核心应用逻辑
- `auth.js` - 用户认证
- `scripts.js` - 脚本管理功能
- `admin.html` / `admin.js` - 管理后台
- `debug-upload.js` - 上传调试工具
- `logo.png` - 网站LOGO
- `feature-brain-cheater.png` - 功能介绍图片
- 各种SVG图标文件

### 2. 后端API (src/app/api/)
- `process/route.ts` - 核心处理API（PDF/图片解析、脚本生成）
- `auth/` - 用户认证API
- `admin/` - 管理员API
- `scripts/` - 脚本管理API
- `thinking-models/` - 思维模型API
- `config/` - 配置管理API
- `parse-wechat/` - 微信文章解析API
- `proxy-wechat/` - 微信代理API
- `share/` - 分享功能API
- `stats/` - 数据统计API
- `test-llm/` - LLM测试API
- `models/` - 模型管理API

### 3. 配置文件
- `package.json` - 项目依赖配置
- `tsconfig.json` - TypeScript配置
- `.coze` - Coze CLI配置文件

### 4. 后端工具库 (src/)
- `src/lib/` - 工具函数库

## 技术栈
- **前端**: HTML5, Tailwind CSS (CDN), Font Awesome (CDN), GSAP (CDN), Vanilla JavaScript
- **后端**: Next.js 16, TypeScript 5
- **数据库**: PostgreSQL (Drizzle ORM)
- **认证**: bcryptjs, jsonwebtoken
- **集成**: coze-coding-dev-sdk, S3 Object Storage
- **文件处理**: 
  - puppeteer-extra (微信文章解析)
  - pdf-parse, pdfjs-dist (PDF文本提取)
  - pdf2pic (PDF转图片OCR)
  - canvas, GraphicsMagick, ImageMagick (图片处理)
  - poppler-utils (PDF工具)

## 核心功能特性
1. **认知脱水机** - 支持文件/链接/截图三种输入方式
2. **脚本生成** - 名道法术器例六段式结构
3. **用户认证** - JWT token认证系统
4. **脚本管理** - 历史、收藏、分享功能
5. **思维模型库** - 动态加载思维模型
6. **S3存储** - 文件上传和管理
7. **数据统计** - 用户行为分析
8. **API配置** - 模型参数配置管理
9. **管理员后台** - 系统管理功能
10. **移动端适配** - 支持微信内置浏览器

## 重要配置参数
- **文件上传限制**: 单文件10MB，总大小10MB
- **图片批量上传**: 最多9张，单张2MB
- **脚本生成超时**: 后端120秒，前端150秒
- **API路由超时**: 2分钟
- **Next.js请求体限制**: 50MB
- **PDF OCR超时**: 单页20秒

## v1.0 核心优化
1. ✅ 脚本生成字数优化：1500-10000字浮动，根据内容质量智能调整
2. ✅ "名"结构重构：核心命题、核心观点（3-5个）、核心价值（详述）、适用场景
3. ✅ 超时设置优化：后端120秒，前端150秒
4. ✅ 移除PDF可疑内容检测逻辑，避免误报
5. ✅ 修复pdf2pic调用方式，正确处理base64转换
6. ✅ 优化PDF OCR错误处理，单页失败不影响整体流程
7. ✅ 移动端适配，支持微信等手机浏览器访问
8. ✅ 文件上传二进制传输，避免数据篡改

## 恢复说明
如需从备份恢复：
1. 将public/目录内容复制到项目public/目录
2. 将src/app/api/目录内容复制到项目src/app/api/目录
3. 复制配置文件（package.json, tsconfig.json, .coze）
4. 复制src/lib/目录（如果有）
5. 运行 `pnpm install` 安装依赖
6. 运行 `coze dev` 启动开发环境

## 注意事项
- ⚠️ 此备份不包含数据库数据
- ⚠️ 环境变量需要单独配置
- ⚠️ S3存储配置需要单独设置
- ⚠️ API密钥由SDK自动加载，无需手动配置

## 版本历史
- v1.0 (2026-01-21) - 正式版发布，核心功能完整，优化脚本生成逻辑
