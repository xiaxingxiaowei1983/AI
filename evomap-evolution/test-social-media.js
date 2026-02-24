const EvoMapEvolution = require('./index');

async function testSocialMediaPublish() {
  console.log('=== 测试社交媒体发布功能 ===');

  try {
    // 创建EvoMapEvolution实例
    const evolution = new EvoMapEvolution();

    // 测试1: 小红书发布
    console.log('\n测试1: 小红书发布');
    const xiaohongshuTask = {
      task_id: 'test_xhs_1',
      title: '如何在小红书上创作爆款内容',
      body: '分享小红书爆款内容的创作技巧和方法',
      credits: 10
    };

    const xiaohongshuContent = {
      platformContents: [
        {
          platform: 'xiaohongshu',
          content: {
            钩子: '你是不是也想在小红书上创作爆款内容？',
            痛点: '但是不知道从何开始，没有方向',
            解决方案: '今天我来分享几个小红书爆款创作的核心技巧',
            情感共鸣: '我理解每一个想在小红书上有所突破的人',
            行动召唤: '如果你也想在小红书上做出成绩，不妨试试这些方法'
          }
        }
      ]
    };

    await evolution.publishToSocialMedia(xiaohongshuTask, xiaohongshuContent);

    // 测试2: 微信视频号发布
    console.log('\n测试2: 微信视频号发布');
    const videoTask = {
      task_id: 'test_video_1',
      title: '30秒学会视频号爆款创作技巧',
      body: '分享视频号爆款内容的创作技巧和方法',
      credits: 15
    };

    const videoContent = {
      platformContents: [
        {
          platform: 'wechatVideo',
          content: {
            开场钩子: '大家好，今天我来分享视频号爆款创作的核心技巧',
            核心问题: '很多人在做视频号时不知道如何吸引观众',
            解决方案: '其实只需要掌握这三个技巧',
            价值展示: '掌握这些技巧后，你的视频号内容会更受欢迎',
            结尾号召: '如果觉得有用，记得点赞关注哦'
          }
        }
      ]
    };

    await evolution.publishToSocialMedia(videoTask, videoContent);

    // 测试3: 微信公众号发布
    console.log('\n测试3: 微信公众号发布');
    const articleTask = {
      task_id: 'test_article_1',
      title: '深度解析：如何打造微信公众号爆款文章',
      body: '深度分析微信公众号爆款文章的创作技巧和方法',
      credits: 20
    };

    const articleContent = {
      platformContents: [
        {
          platform: 'wechatArticle',
          content: {
            引言: '在当今信息爆炸的时代，如何让你的公众号文章脱颖而出？',
            问题分析: '通过对大量爆款文章的分析，我们发现了几个关键因素',
            深度洞察: '成功的公众号文章往往具备这几个特点',
            解决方案: '基于这些发现，我们可以总结出一套爆款创作方法论',
            总结: '通过持续实践和优化，你也能在公众号领域取得成功'
          }
        }
      ]
    };

    await evolution.publishToSocialMedia(articleTask, articleContent);

    console.log('\n=== 测试完成 ===');
    console.log('所有社交媒体发布测试已完成，查看日志了解详细结果。');

  } catch (error) {
    console.error('测试失败:', error.message);
  }
}

// 运行测试
testSocialMediaPublish();