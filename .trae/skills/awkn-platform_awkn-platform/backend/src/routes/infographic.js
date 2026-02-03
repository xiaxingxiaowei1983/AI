const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// 生成信息图
router.post('/', [
  body('content').notEmpty().withMessage('内容不能为空'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: '参数验证失败',
      errors: errors.array(),
    });
  }

  const { content, data, style } = req.body;

  try {
    // 模拟AI生成过程
    await new Promise(resolve => setTimeout(resolve, 3500));

    // 模拟生成的信息图
    const infographics = [
      `https://via.placeholder.com/1600x900?text=Infographic+1`,
    ];

    res.json({
      success: true,
      message: '信息图生成成功',
      infographics: infographics,
    });
  } catch (error) {
    console.error('信息图生成失败:', error);
    res.status(500).json({
      success: false,
      message: '信息图生成失败，请稍后重试',
    });
  }
});

module.exports = router;
