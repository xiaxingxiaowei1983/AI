const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

// 导入数据库配置
const { sequelize, testConnection } = require('./config/database');

// 导入模型
const User = require('./models/User');
const RechargeOrder = require('./models/RechargeOrder');
const PointsLog = require('./models/PointsLog');

// 导入路由
const authRoutes = require('./routes/auth');
const comicRoutes = require('./routes/comic');
const pptRoutes = require('./routes/ppt');
const infographicRoutes = require('./routes/infographic');
const architectureRoutes = require('./routes/architecture');
const historyRoutes = require('./routes/history');
const rechargeRoutes = require('./routes/recharge');

// 创建Express应用
const app = express();

// 中间件配置
app.use(helmet({
  contentSecurityPolicy: false,
}));

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5178'],
  credentials: true,
}));

app.use(compression());
app.use(morgan('combined'));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// 速率限制
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15分钟
  max: 100, // 限制每个IP 15分钟内最多100个请求
  message: '请求过于频繁，请稍后再试',
});
app.use('/api/', limiter);

// 数据库连接和表迁移
async function initDatabase() {
  try {
    // 测试连接
    await testConnection();
    
    // 自动迁移表结构
    await sequelize.sync({ alter: true });
    console.log('数据库表结构迁移成功');
    
    // 创建管理员账号（如果不存在）
    const adminEmail = process.env.ADMIN_EMAIL || '10919669@qq.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'DOSSEN123456';
    const existingAdmin = await User.findOne({ where: { email: adminEmail } });
    if (!existingAdmin) {
      await User.create({
        username: 'admin',
        email: adminEmail,
        password: adminPassword,
        role: 'admin',
        recharge_points: 10000,
        gift_points: 10000
      });
      console.log('管理员账号创建成功');
    }
  } catch (error) {
    console.error('数据库初始化失败:', error);
    process.exit(1);
  }
}

// 初始化数据库
initDatabase();

// 路由配置
app.use('/api/auth', authRoutes);
app.use('/api/generate/comic', comicRoutes);
app.use('/api/generate/ppt', pptRoutes);
app.use('/api/generate/infographic', infographicRoutes);
app.use('/api/generate/architecture', architectureRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/recharge', rechargeRoutes);

// 健康检查
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// 404处理
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: '接口不存在',
  });
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || '服务器内部错误',
  });
});

// 启动服务器
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`AWKN后端服务运行在端口 ${PORT}`);
  console.log(`环境: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
