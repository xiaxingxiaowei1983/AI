const jwt = require('jsonwebtoken');

/**
 * 验证JWT令牌的中间件
 */
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: '访问令牌缺失',
    });
  }

  jwt.verify(
    token,
    process.env.JWT_SECRET || 'your-secret-key',
    (err, user) => {
      if (err) {
        return res.status(403).json({
          success: false,
          message: '令牌无效或已过期',
        });
      }
      req.user = user;
      next();
    }
  );
};

module.exports = authenticateToken;
