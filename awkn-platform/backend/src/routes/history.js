const express = require('express');
const router = express.Router();

// 获取历史作品列表
router.get('/', async (req, res) => {
  try {
    const { type, page = 1, limit = 10 } = req.query;

    // 模拟数据
    const mockWorks = [
      {
        id: '1',
        title: '科幻漫画 - 星际旅行',
        type: 'comic',
        thumbnail: 'https://via.placeholder.com/600x800?text=Comic+1',
        createdAt: '2024-01-15T10:30:00Z',
      },
      {
        id: '2',
        title: '产品发布会PPT',
        type: 'ppt',
        thumbnail: 'https://via.placeholder.com/1600x900?text=PPT+1',
        createdAt: '2024-01-14T15:20:00Z',
      },
      {
        id: '3',
        title: '市场数据分析信息图',
        type: 'infographic',
        thumbnail: 'https://via.placeholder.com/1600x900?text=Info+1',
        createdAt: '2024-01-13T09:45:00Z',
      },
      {
        id: '4',
        title: '微服务架构图',
        type: 'architecture',
        thumbnail: 'https://via.placeholder.com/1600x1000?text=Arch+1',
        createdAt: '2024-01-12T14:15:00Z',
      },
    ];

    // 按类型过滤
    let filteredWorks = mockWorks;
    if (type && type !== 'all') {
      filteredWorks = mockWorks.filter(work => work.type === type);
    }

    res.json({
      success: true,
      works: filteredWorks,
      total: filteredWorks.length,
      page: parseInt(page),
      limit: parseInt(limit),
    });
  } catch (error) {
    console.error('获取历史作品失败:', error);
    res.status(500).json({
      success: false,
      message: '获取历史作品失败',
    });
  }
});

// 删除作品
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // 这里应该执行数据库删除操作
    // 模拟删除成功
    res.json({
      success: true,
      message: '作品删除成功',
    });
  } catch (error) {
    console.error('删除作品失败:', error);
    res.status(500).json({
      success: false,
      message: '删除作品失败',
    });
  }
});

module.exports = router;
