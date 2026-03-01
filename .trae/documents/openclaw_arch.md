# 技术架构文档

## 技术选型

### 前端
- **框架**: React + TypeScript
- **UI组件库**: Tailwind CSS + shadcn/ui
- **状态管理**: Zustand
- **路由**: React Router
- **图表库**: Recharts
- **表单处理**: React Hook Form
- **WebSocket**: Socket.io-client

### 后端
- **运行环境**: Node.js
- **API框架**: Express
- **WebSocket**: Socket.io
- **文件系统**: fs-extra
- **配置管理**: dotenv
- **日志系统**: winston
- **进程管理**: PM2

### 模型集成
- **OpenAI API**
- **火山引擎 API**
- **豆包 API**

### 通道集成
- **飞书 API**
- **Discord API**
- **WebSocket 长连接**

## 文件结构设计

```
openclaw/
├── frontend/             # 前端应用
│   ├── public/           # 静态资源
│   ├── src/
│   │   ├── components/   # 可复用组件
│   │   ├── pages/        # 页面组件
│   │   ├── hooks/        # 自定义 hooks
│   │   ├── store/        # 状态管理
│   │   ├── services/     # API 服务
│   │   ├── utils/        # 工具函数
│   │   ├── types/        # TypeScript 类型定义
│   │   ├── App.tsx       # 应用入口
│   │   └── main.tsx      # 渲染入口
│   ├── index.html        # HTML 模板
│   ├── package.json      # 前端依赖
│   ├── tsconfig.json     # TypeScript 配置
│   └── vite.config.ts    # Vite 配置