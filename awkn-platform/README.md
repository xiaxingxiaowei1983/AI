# AWKN - AI Cognitive Awakening Platform

## 项目简介

AWKN是一个帮助他人做认知觉醒的平台，包含内容创作工具箱。采用苹果官网设计风格，提供极简、优雅的用户体验。

## 核心功能

### 1. 漫画生成
- 输入故事内容，AI自动拆分场景并生成连续风格的漫画
- 支持自定义画风描述
- 可选择漫画页数（1-8页）

### 2. PPT生成
- 将内容转换为专业的PPT演示文稿
- 支持多种视觉风格
- 自动布局和排版

### 3. 信息图生成
- 将数据和信息可视化为信息图
- 支持多种图表类型
- 智能配色和布局

### 4. 架构图生成
- 生成系统架构图、流程图等
- 支持多种架构风格
- 自动排版和美化

### 5. 历史作品管理
- 作品分类展示（全部/PPT/信息图/架构图/漫画）
- 支持查看、下载、删除
- 搜索和筛选功能

## 技术栈

### 前端
- Next.js 14 (React 18)
- TypeScript
- Tailwind CSS
- Framer Motion（动画）
- Axios（HTTP客户端）

### 后端
- Node.js + Express
- TypeScript
- Prisma（ORM）
- MySQL（数据库）
- Redis（缓存）
- JWT（认证）

### 部署
- Docker
- Docker Compose
- Nginx（反向代理）

## 快速开始

### 环境要求
- Node.js >= 18
- Docker >= 20
- Docker Compose >= 2

### 安装依赖
```bash
npm run install:all
```

### 启动开发环境
```bash
npm run dev
```

### 构建生产环境
```bash
npm run build:frontend
npm run build:backend
```

### 部署
```bash
cd docker
docker-compose up -d
```

## 项目结构

```
awkn-platform/
├── frontend/                 # 前端项目
│   ├── app/                 # Next.js App Router
│   │   ├── page.tsx        # 首页
│   │   ├── comic/          # 漫画生成页面
│   │   ├── ppt/            # PPT生成页面
│   │   ├── infographic/     # 信息图生成页面
│   │   ├── architecture/   # 架构图生成页面
│   │   └── history/        # 历史作品页面
│   ├── components/         # 组件
│   ├── lib/               # 工具库
│   └── styles/            # 样式文件
├── backend/                # 后端项目
│   ├── src/
│   │   ├── routes/        # 路由
│   │   ├── services/      # 业务逻辑
│   │   ├── models/        # 数据模型
│   │   └── utils/         # 工具函数
│   └── prisma/           # 数据库模型
├── docker/                # Docker配置
└── README.md             # 项目说明
```

## 设计风格

遵循苹果官网设计语言：

### 视觉特征
- 极简主义：大量留白，简洁排版
- 高级感：黑白灰主色调，低饱和度配色
- 大标题：Large Title字体风格
- 流畅动画：细腻的过渡效果和微交互
- 响应式：完美适配各种设备

### 交互体验
- 视差滚动：传达图片与文字之间的层次感
- 高质量视觉：高分辨率的产品图片
- 流畅动画：细腻的过渡效果
- 用户体验至上：技术为服务体验

## API文档

详见 `/backend/docs/API.md`

## 许可证

MIT License
