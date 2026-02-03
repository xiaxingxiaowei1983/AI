# AWKN项目结构说明

## 目录结构

```
awkn-platform/
├── README.md                 # 项目说明文档
├── QUICKSTART.md            # 快速开始指南
├── DEPLOYMENT.md            # 部署文档
├── PROJECT_STRUCTURE.md      # 本文件 - 项目结构说明
├── .gitignore              # Git忽略配置
├── package.json            # 根项目依赖配置
├── docker-compose.yml      # Docker编排配置
├── start.sh               # 快速启动脚本
│
├── backend/               # 后端服务目录
│   ├── Dockerfile        # 后端Docker镜像配置
│   ├── .env.example      # 后端环境变量示例
│   ├── package.json      # 后端依赖配置
│   └── src/             # 后端源代码
│       ├── server.js     # Express服务器入口
│       ├── models/       # 数据库模型
│       │   ├── User.js      # 用户模型
│       │   └── Work.js      # 作品模型
│       ├── routes/      # API路由
│       │   ├── auth.js      # 认证路由
│       │   ├── comic.js     # 漫画生成路由
│       │   ├── ppt.js       # PPT生成路由
│       │   ├── infographic.js # 信息图生成路由
│       │   ├── architecture.js # 架构图生成路由
│       │   └── history.js   # 历史作品路由
│       └── middleware/  # 中间件
│           └── auth.js  # 认证中间件
│
└── frontend/             # 前端应用目录
    ├── Dockerfile       # 前端Docker镜像配置
    ├── .env.local.example # 前端环境变量示例
    ├── package.json     # 前端依赖配置
    ├── tsconfig.json    # TypeScript配置
    ├── next.config.js   # Next.js配置
    ├── tailwind.config.ts # Tailwind CSS配置
    ├── postcss.config.js # PostCSS配置
    ├── yarn.lock        # Yarn依赖锁文件
    │
    ├── app/             # Next.js App Router页面
    │   ├── layout.tsx       # 根布局组件
    │   ├── page.tsx         # 首页
    │   ├── globals.css      # 全局样式
    │   ├── comic/           # 漫画生成页面
    │   │   └── page.tsx
    │   ├── ppt/             # PPT生成页面
    │   │   └── page.tsx
    │   ├── infographic/     # 信息图生成页面
    │   │   └── page.tsx
    │   ├── architecture/    # 架构图生成页面
    │   │   └── page.tsx
    │   └── history/         # 历史作品页面
    │       └── page.tsx
    │
    ├── components/      # React组件
    │   └── Navigation.tsx  # 导航栏组件
    │
    ├── lib/            # 工具库
    │   ├── api.ts      # API调用工具
    │   └── utils.ts    # 通用工具函数
    │
    ├── types/          # TypeScript类型定义
    │   └── index.ts    # 类型声明文件
    │
    └── public/         # 静态资源
        ├── favicon.ico     # 网站图标
        ├── robots.txt      # 爬虫配置
        └── manifest.json   # PWA配置
```

## 核心技术栈

### 前端
- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **状态管理**: React Hooks + Context
- **动画**: Framer Motion
- **HTTP客户端**: Fetch API (封装)

### 后端
- **运行时**: Node.js 18+
- **框架**: Express.js
- **数据库**: MongoDB 6.0+
- **认证**: JWT + bcrypt
- **文件上传**: Multer
- **API文档**: (待集成)

### 部署
- **容器化**: Docker + Docker Compose
- **进程管理**: PM2 (可选)
- **Web服务器**: Nginx (生产环境推荐)
- **反向代理**: Nginx

## API路由说明

### 认证相关 (POST /api/auth/)
- `/register` - 用户注册
- `/login` - 用户登录

### 漫画生成 (POST /api/generate/comic)
- 参数: `story`, `artStyle`, `pageCount`
- 返回: 生成的漫画图片URL数组

### PPT生成 (POST /api/generate/ppt)
- 参数: `content`, `style`, `slideCount`
- 返回: 生成的PPT幻灯片URL数组

### 信息图生成 (POST /api/generate/infographic)
- 参数: `content`, `data`, `style`
- 返回: 生成的信息图URL数组

### 架构图生成 (POST /api/generate/architecture)
- 参数: `description`, `type`, `style`
- 返回: 生成的架构图URL数组

### 历史作品 (GET /api/history/)
- 参数: `type`, `page`, `limit`
- 返回: 历史作品列表

### 删除作品 (DELETE /api/history/:id)
- 返回: 删除结果

## 数据库模型

### User (用户)
- `username`: 用户名
- `email`: 邮箱
- `password`: 密码(加密)
- `avatar`: 头像URL
- `isActive`: 是否激活
- `lastLogin`: 最后登录时间

### Work (作品)
- `title`: 作品标题
- `type`: 类型(comic/ppt/infographic/architecture)
- `userId`: 用户ID
- `thumbnail`: 缩略图URL
- `images`: 图片URL数组
- `parameters`: 生成参数
- `status`: 状态(pending/completed/failed)
- `tags`: 标签数组

## 环境变量

### 前端环境变量 (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
NEXT_PUBLIC_APP_NAME=AWKN
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_ENABLE_ANALYTICS=false
NEXT_PUBLIC_ENABLE_SENTRY=false
```

### 后端环境变量 (.env)
```env
NODE_ENV=production
PORT=4000
FRONTEND_URL=http://localhost:3000
MONGODB_URI=mongodb://localhost:27017/awkn
JWT_SECRET=your-secret-key
OPENAI_API_KEY=your-openai-key
STABLE_DIFFUSION_API_KEY=your-stable-diffusion-key
```

## 开发流程

1. **启动开发环境**
   ```bash
   # 启动后端
   cd backend && npm run dev

   # 启动前端
   cd frontend && npm run dev
   ```

2. **添加新功能**
   - 前端：在`app/`目录下创建新页面，在`components/`目录下创建新组件
   - 后端：在`src/routes/`目录下创建新路由，在`src/models/`目录下创建新模型

3. **数据库迁移**
   - 直接修改Schema，MongoDB会自动更新结构

## 部署流程

1. **Docker部署**
   ```bash
   docker-compose up -d
   ```

2. **PM2部署**
   ```bash
   # 后端
   cd backend
   pm2 start src/server.js --name awkn-backend

   # 前端
   cd frontend
   npm run build
   pm2 start npm --name awkn-frontend -- start
   ```

3. **Nginx配置**
   - 参见 DEPLOYMENT.md 文档

## 设计规范

### 前端设计
- 使用苹果官网风格：极简、留白、高质量视觉
- 主色调：黑白灰 + 苹果蓝(#0071E3)
- 响应式设计：移动优先
- 动画：平滑过渡，0.3s duration

### 后端设计
- RESTful API规范
- 统一响应格式：`{ success, message, data }`
- 错误处理：try-catch + 中间件
- 安全：Helmet + CORS + Rate Limiting

## 常见问题

详见 QUICKSTART.md 和 DEPLOYMENT.md

## 贡献指南

1. Fork项目
2. 创建特性分支
3. 提交更改
4. 推送到分支
5. 创建Pull Request

## 许可证

MIT License
