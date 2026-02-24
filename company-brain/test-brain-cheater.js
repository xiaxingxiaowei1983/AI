// 测试大脑作弊器适配器

const CompanyBrain = require('./index');

async function testBrainCheater() {
  console.log('🧠 测试大脑作弊器适配器');
  
  try {
    // 创建公司大脑实例
    const companyBrain = new CompanyBrain({
      scheduler: {
        brainCheater: {
          baseUrl: 'http://localhost:3000',
          timeout: 60000
        }
      }
    });
    
    // 初始化公司大脑
    await companyBrain.init();
    
    // 启动公司大脑
    await companyBrain.start();
    
    // 测试1: 获取大脑作弊器状态
    console.log('\n📊 测试1: 获取大脑作弊器状态');
    try {
      const status = await companyBrain.schedulerSystem.getBrainCheaterStatus();
      console.log('✅ 大脑作弊器状态:', status);
    } catch (error) {
      console.error('❌ 获取大脑作弊器状态失败:', error.message);
    }
    
    // 测试2: 生成内容
    console.log('\n📝 测试2: 生成内容');
    try {
      const content = '如何提高团队协作效率？';
      const result = await companyBrain.schedulerSystem.generateContentWithBrainCheater(content, {
        title: '团队协作效率提升指南'
      });
      console.log('✅ 内容生成成功:', {
        title: result.title,
        name: result.name.substring(0, 100) + '...',
        dao: result.dao.substring(0, 100) + '...'
      });
    } catch (error) {
      console.error('❌ 内容生成失败:', error.message);
    }
    
    // 测试3: 处理文件
    console.log('\n📄 测试3: 处理文件');
    try {
      const fileData = {
        text: '这是一个测试文件，包含一些示例内容。\n\n团队协作是企业成功的关键因素。\n有效的沟通可以提高工作效率。'
      };
      const result = await companyBrain.schedulerSystem.processFileWithBrainCheater(fileData, {
        fileName: 'test.txt'
      });
      console.log('✅ 文件处理成功:', {
        summary: result.summary,
        metadata: result.metadata
      });
    } catch (error) {
      console.error('❌ 文件处理失败:', error.message);
    }
    
    // 测试4: 处理URL
    console.log('\n🌐 测试4: 处理URL');
    try {
      const url = 'https://example.com/article';
      const result = await companyBrain.schedulerSystem.processUrlWithBrainCheater(url);
      console.log('✅ URL处理成功:', {
        url: result.url,
        title: result.title,
        content: result.content.substring(0, 100) + '...'
      });
    } catch (error) {
      console.error('❌ URL处理失败:', error.message);
    }
    
    // 停止公司大脑
    await companyBrain.stop();
    
    console.log('\n✅ 所有测试完成');
    
  } catch (error) {
    console.error('❌ 测试失败:', error.message);
    process.exit(1);
  }
}

// 运行测试
testBrainCheater();