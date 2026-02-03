const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// 用户注册
router.post('/register', [
  body('username').isLength({ min: 3, max: 20 }).withMessage('用户名长度必须在3-20之间'),
  body('email').isEmail().withMessage('邮箱格式不正确'),
  body('password').isLength({ min: 6 }).withMessage('密码长度至少6位'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: '参数验证失败',
      errors: errors.array(),
    });
  }

  const { username, email, password } = req.body;

  try {
    // 这里应该查询数据库检查用户是否存在
    // 模拟用户不存在

    // 加密密码
    const hashedPassword = await bcrypt.hash(password, 10);

    // 这里应该创建用户记录
    const user = {
      id: 'user_' + Date.now(),
      username,
      email,
      password: hashedPassword,
    };

    // 生成JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      message: '注册成功',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('注册失败:', error);
    res.status(500).json({
      success: false,
      message: '注册失败，请稍后重试',
    });
  }
});

// 用户登录
router.post('/login', [
  body('email').isEmail().withMessage('邮箱格式不正确'),
  body('password').notEmpty().withMessage('密码不能为空'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: '参数验证失败',
      errors: errors.array(),
    });
  }

  const { email, password } = req.body;

  try {
    // 这里应该从数据库查询用户
    // 暂时使用简单验证，后续需要连接数据库
    const adminEmail = process.env.ADMIN_EMAIL || '10919669@qq.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'DOSSEN123456';
    
    if (email === adminEmail) {
      // 管理员账号验证
      if (password !== adminPassword) {
        return res.status(401).json({
          success: false,
          message: '邮箱或密码错误',
        });
      }
    } else {
      // 普通用户验证
      if (password.length < 6) {
        return res.status(401).json({
          success: false,
          message: '密码长度至少6位',
        });
      }
    }

    // 模拟用户存在
    const user = {
      id: 'user_' + Date.now(),
      username: email.split('@')[0],
      email: email,
    };

    // 生成JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      message: '登录成功',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('登录失败:', error);
    res.status(500).json({
      success: false,
      message: '登录失败，请稍后重试',
    });
  }
});

module.exports = router;
