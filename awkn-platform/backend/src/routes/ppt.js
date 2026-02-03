const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// 生成PPT
router.post('/', [
  body('content').notEmpty().withMessage('内容不能为空'),
  body('slideCount').isInt({ min: 5, max: 30 }).withMessage('幻灯片数量必须在5-30之间'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: '参数验证失败',
      errors: errors.array(),
    });
  }

  const { content, style, slideCount } = req.body;

  try {
    // 模拟AI生成过程
    await new Promise(resolve => setTimeout(resolve, 4000));

    // 模拟生成的幻灯片
    const slides = [];
    for (let i = 0; i < slideCount; i++) {
      slides.push(`https://via.placeholder.com/1600x900?text=Slide+${i + 1}`);
    }

    res.json({
      success: true,
      message: 'PPT生成成功',
      slides: slides,
    });
  } catch (error) {
    console.error('PPT生成失败:', error);
    res.status(500).json({
      success: false,
      message: 'PPT生成失败，请稍后重试',
    });
  }
});

module.exports = router;
