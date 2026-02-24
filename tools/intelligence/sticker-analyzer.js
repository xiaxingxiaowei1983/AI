/**
 * Sticker Analyzer 工具
 * 用于分析图片内容，过滤垃圾图片，分类贴纸
 * Engine: Gemini 2.5 Flash
 */

const fs = require('fs');
const path = require('path');

class StickerAnalyzer {
  constructor() {
    this.analysisDir = path.join(__dirname, '../../analysis');
    this.cacheDir = path.join(__dirname, '../../cache/sticker');
    this._initialize();
  }

  // 初始化目录
  _initialize() {
    if (!fs.existsSync(this.analysisDir)) {
      fs.mkdirSync(this.analysisDir, { recursive: true });
    }

    if (!fs.existsSync(this.cacheDir)) {
      fs.mkdirSync(this.cacheDir, { recursive: true });
    }
  }

  // 分析图片
  analyzeImage(imagePath, options = {}) {
    const {
      classify = true,      // 是否分类
      filterJunk = true,    // 是否过滤垃圾图片
      extractFeatures = true, // 是否提取特征
      saveResult = false     // 是否保存结果
    } = options;

    // 验证参数
    if (!imagePath || !fs.existsSync(imagePath)) {
      throw new Error('图片文件不存在');
    }

    try {
      // 读取图片信息
      const stats = fs.statSync(imagePath);
      const fileName = path.basename(imagePath);

      // 模拟图片分析（实际项目中应集成Gemini 2.5 Flash）
      const analysis = {
        id: `analysis_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        imagePath,
        fileName,
        timestamp: Date.now(),
        fileSize: stats.size,
        fileSizeFormatted: this._formatSize(stats.size),
        mimeType: this._detectMimeType(imagePath),
        isJunk: false,
        classification: 'unknown',
        confidence: 0,
        features: []
      };

      // 过滤垃圾图片
      if (filterJunk) {
        analysis.isJunk = this._detectJunkImage(imagePath);
      }

      // 分类贴纸
      if (classify && !analysis.isJunk) {
        const classification = this._classifySticker(imagePath);
        analysis.classification = classification.type;
        analysis.confidence = classification.confidence;
      }

      // 提取特征
      if (extractFeatures && !analysis.isJunk) {
        analysis.features = this._extractFeatures(imagePath);
      }

      // 保存结果
      if (saveResult) {
        const resultPath = path.join(this.analysisDir, `${analysis.id}.json`);
        fs.writeFileSync(resultPath, JSON.stringify(analysis, null, 2), 'utf8');
        analysis.resultPath = resultPath;
      }

      // 缓存分析结果
      this._cacheAnalysis(analysis);

      return analysis;
    } catch (error) {
      console.error('图片分析失败:', error);
      throw new Error(`图片分析失败: ${error.message}`);
    }
  }

  // 批量分析图片
  batchAnalyzeImages(imagePaths, options = {}) {
    if (!Array.isArray(imagePaths)) {
      throw new Error('图片路径必须是数组');
    }

    const results = [];
    let successCount = 0;

    for (const imagePath of imagePaths) {
      try {
        const result = this.analyzeImage(imagePath, options);
        results.push(result);
        successCount++;
      } catch (error) {
        results.push({
          imagePath,
          error: error.message,
          timestamp: Date.now()
        });
      }
    }

    return {
      success: successCount === imagePaths.length,
      successCount,
      totalCount: imagePaths.length,
      results
    };
  }

  // 检测垃圾图片
  _detectJunkImage(imagePath) {
    // 模拟垃圾图片检测
    // 实际项目中应使用Gemini 2.5 Flash进行内容分析
    const fileName = path.basename(imagePath).toLowerCase();
    const junkKeywords = ['junk', 'trash', 'spam', 'garbage'];
    
    // 基于文件名的简单检测
    for (const keyword of junkKeywords) {
      if (fileName.includes(keyword)) {
        return true;
      }
    }

    // 基于文件大小的简单检测（例如非常小的图片）
    const stats = fs.statSync(imagePath);
    if (stats.size < 1000) { // 小于1KB
      return true;
    }

    return false;
  }

  // 分类贴纸
  _classifySticker(imagePath) {
    // 模拟贴纸分类
    // 实际项目中应使用Gemini 2.5 Flash进行视觉分类
    const fileName = path.basename(imagePath).toLowerCase();
    const classifications = [
      { type: 'emoji', keywords: ['emoji', '表情'] },
      { type: 'cartoon', keywords: ['cartoon', '卡通'] },
      { type: 'meme', keywords: ['meme', '梗图'] },
      { type: 'nature', keywords: ['nature', '自然'] },
      { type: 'animal', keywords: ['animal', '动物'] },
      { type: 'food', keywords: ['food', '食物'] },
      { type: 'travel', keywords: ['travel', '旅行'] },
      { type: 'abstract', keywords: ['abstract', '抽象'] }
    ];

    for (const classification of classifications) {
      for (const keyword of classification.keywords) {
        if (fileName.includes(keyword)) {
          return {
            type: classification.type,
            confidence: Math.random() * 0.3 + 0.7 // 0.7-1.0的置信度
          };
        }
      }
    }

    // 默认分类
    return {
      type: 'other',
      confidence: 0.5
    };
  }

  // 提取特征
  _extractFeatures(imagePath) {
    // 模拟特征提取
    // 实际项目中应使用Gemini 2.5 Flash进行特征提取
    const features = [
      'colorful',
      'cartoon style',
      'simple composition',
      'high contrast',
      'emotional expression'
    ];

    // 随机选择一些特征
    const selectedFeatures = [];
    for (let i = 0; i < 3; i++) {
      const randomFeature = features[Math.floor(Math.random() * features.length)];
      if (!selectedFeatures.includes(randomFeature)) {
        selectedFeatures.push(randomFeature);
      }
    }

    return selectedFeatures;
  }

  // 检测文件类型
  _detectMimeType(imagePath) {
    const ext = path.extname(imagePath).toLowerCase();
    const mimeTypes = {
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.gif': 'image/gif',
      '.webp': 'image/webp',
      '.svg': 'image/svg+xml'
    };

    return mimeTypes[ext] || 'image/unknown';
  }

  // 缓存分析结果
  _cacheAnalysis(analysis) {
    const cachePath = path.join(this.cacheDir, `${analysis.id}.json`);
    fs.writeFileSync(cachePath, JSON.stringify(analysis, null, 2), 'utf8');
  }

  // 读取缓存的分析结果
  getCachedAnalysis(analysisId) {
    const cachePath = path.join(this.cacheDir, `${analysisId}.json`);
    if (fs.existsSync(cachePath)) {
      const content = fs.readFileSync(cachePath, 'utf8');
      return JSON.parse(content);
    }
    return null;
  }

  // 清理旧缓存
  cleanupCache(days = 7) {
    const cutoffTime = Date.now() - (days * 24 * 60 * 60 * 1000);
    let cleanedCount = 0;

    if (fs.existsSync(this.cacheDir)) {
      const files = fs.readdirSync(this.cacheDir);
      for (const file of files) {
        const filePath = path.join(this.cacheDir, file);
        const stats = fs.statSync(filePath);
        if (stats.mtime.getTime() < cutoffTime) {
          fs.unlinkSync(filePath);
          cleanedCount++;
        }
      }
    }

    return {
      success: true,
      cleanedCount,
      days
    };
  }

  // 获取分析状态
  getAnalysisStatus() {
    let totalAnalyses = 0;
    let totalCacheSize = 0;

    // 统计分析结果
    if (fs.existsSync(this.analysisDir)) {
      const files = fs.readdirSync(this.analysisDir);
      totalAnalyses = files.length;
    }

    // 统计缓存大小
    if (fs.existsSync(this.cacheDir)) {
      const files = fs.readdirSync(this.cacheDir);
      for (const file of files) {
        const filePath = path.join(this.cacheDir, file);
        const stats = fs.statSync(filePath);
        totalCacheSize += stats.size;
      }
    }

    return {
      version: '1.0.0',
      timestamp: Date.now(),
      totalAnalyses,
      cacheSize: totalCacheSize,
      cacheSizeFormatted: this._formatSize(totalCacheSize),
      engine: 'Simulated (Gemini 2.5 Flash)',
      status: 'Ready'
    };
  }

  // 格式化文件大小
  _formatSize(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}

// 导出单例实例
const stickerAnalyzer = new StickerAnalyzer();

module.exports = {
  StickerAnalyzer,
  stickerAnalyzer,
  // 工具接口
  analyzeImage: (imagePath, options) => {
    return stickerAnalyzer.analyzeImage(imagePath, options);
  },
  batchAnalyzeImages: (imagePaths, options) => {
    return stickerAnalyzer.batchAnalyzeImages(imagePaths, options);
  },
  getCachedAnalysis: (analysisId) => {
    return stickerAnalyzer.getCachedAnalysis(analysisId);
  },
  cleanupCache: (days) => {
    return stickerAnalyzer.cleanupCache(days);
  },
  getAnalysisStatus: () => {
    return stickerAnalyzer.getAnalysisStatus();
  }
};

// 示例用法
if (require.main === module) {
  const analyzer = stickerAnalyzer;

  // 测试图片分析
  console.log('Testing image analysis...');
  
  // 创建测试图片文件
  const testDir = path.join(__dirname, '../../test-images');
  if (!fs.existsSync(testDir)) {
    fs.mkdirSync(testDir, { recursive: true });
  }

  // 创建测试文件
  const testImagePath = path.join(testDir, 'test-emoji.png');
  fs.writeFileSync(testImagePath, 'fake image content');

  try {
    // 分析图片
    const result = analyzer.analyzeImage(testImagePath, {
      classify: true,
      filterJunk: true,
      extractFeatures: true,
      saveResult: true
    });

    console.log('Analysis result:', JSON.stringify(result, null, 2));

    // 批量分析
    console.log('\nTesting batch analysis...');
    const batchResult = analyzer.batchAnalyzeImages([testImagePath]);
    console.log('Batch result:', JSON.stringify(batchResult, null, 2));

    // 获取分析状态
    console.log('\nAnalysis status:', JSON.stringify(analyzer.getAnalysisStatus(), null, 2));

    // 清理缓存
    console.log('\nCleaning up cache...');
    const cleanupResult = analyzer.cleanupCache(1);
    console.log('Cleanup result:', cleanupResult);

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    // 清理测试文件
    if (fs.existsSync(testImagePath)) {
      fs.unlinkSync(testImagePath);
    }
  }
}
