const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// 生成架构图
router.post('/', [
  body('description').notEmpty().withMessage('架构描述不能为空'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: '参数验证失败',
      errors: errors.array(),
    });
  }

  const { description, type, style } = req.body;

  try {
    // 模拟AI生成过程
    await new Promise(resolve => setTimeout(resolve, 3500));

    // 模拟生成的架构图
    const diagrams = [
      `https://via.placeholder.com/1600x1000?text=Architecture+Diagram`,
    ];

    res.json({
      success: true,
      message: '架构图生成成功',
      diagrams: diagrams,
    });
  } catch (error) {
    console.error('架构图生成失败:', error);
    res.status(500).json({
      success: false,
      message: '架构图生成失败，请稍后重试',
    });
  }
});

module.exports = router;
