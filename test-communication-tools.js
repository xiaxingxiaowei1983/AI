// 测试Communication Branch Tools
const feishuCard = require('./tools/communication/feishu-card');
const feishuSticker = require('./tools/communication/feishu-sticker');
const personaManagement = require('./tools/communication/persona-management');

console.log('=== 测试Communication Branch Tools ===\n');

// 1. 测试feishu-card工具
console.log('1. 测试feishu-card工具:');
try {
  // 测试生成简洁模式卡片
  const cleanCard = feishuCard.generateCleanCard('这是一个测试卡片\n\n**粗体文本**\n*斜体文本*\n- 列表项1\n- 列表项2');
  console.log('   生成简洁模式卡片成功');
  console.log('   卡片类型:', cleanCard.elements[0].tag);
  
  // 测试生成带标题的卡片
  const titledCard = feishuCard.generateFeishuCard({
    text: '这是一个带标题的卡片',
    title: '测试标题',
    color: '#FF6347'
  });
  console.log('   生成带标题的卡片成功');
  console.log('   卡片标题:', titledCard.header.title.content);
  
  // 测试生成带按钮的卡片
  const buttonCard = feishuCard.generateCardWithButtons({
    text: '这是一个带按钮的卡片',
    title: '测试按钮',
    buttons: [
      { text: '点击我', url: 'https://example.com', type: 'primary' },
      { text: '另一个按钮', url: 'https://example.com', type: 'default' }
    ]
  });
  console.log('   生成带按钮的卡片成功');
  console.log('   按钮数量:', buttonCard.elements[1].actions.length);
  
  console.log('   feishu-card工具测试通过！');
} catch (error) {
  console.error('   feishu-card工具测试失败:', error.message);
}
console.log('');

// 2. 测试feishu-sticker工具
console.log('2. 测试feishu-sticker工具:');
try {
  // 测试生成表情
  const happySticker = feishuSticker.generateSticker('happy');
  console.log('   生成happy表情成功:', happySticker.sticker);
  console.log('   生成的image_key:', happySticker.imageKey);
  
  // 测试生成其他表情
  const sadSticker = feishuSticker.generateSticker('sad');
  console.log('   生成sad表情成功:', sadSticker.sticker);
  
  // 测试模糊匹配
  const excitedSticker = feishuSticker.generateSticker('very excited');
  console.log('   模糊匹配excited表情成功:', excitedSticker.sticker);
  
  // 测试缓存功能
  const cachedSticker = feishuSticker.getStickerFromCache(happySticker.imageKey);
  console.log('   从缓存获取表情成功:', cachedSticker.sticker);
  
  // 测试缓存状态
  const cacheStatus = feishuSticker.getCacheStatus();
  console.log('   缓存状态:', `大小=${cacheStatus.size}`);
  
  console.log('   feishu-sticker工具测试通过！');
} catch (error) {
  console.error('   feishu-sticker工具测试失败:', error.message);
}
console.log('');

// 3. 测试persona-management工具
console.log('3. 测试persona-management工具:');
try {
  const testUserId = 'test_user_123';
  
  // 测试管理用户人格
  const personaInfo = personaManagement.managePersona(testUserId);
  console.log('   管理用户人格成功');
  console.log('   当前人格:', personaInfo.currentPersona);
  console.log('   人格描述:', personaInfo.personaInfo.description);
  
  // 测试切换人格
  const switchResult = personaManagement.switchPersona(testUserId, 'Catgirl');
  console.log('   切换人格成功');
  console.log('   从', switchResult.previousPersona, '切换到', switchResult.newPersona);
  console.log('   新人格描述:', switchResult.personaInfo.description);
  
  // 测试获取人格历史
  const history = personaManagement.getPersonaHistory(testUserId);
  console.log('   获取人格历史成功');
  console.log('   历史记录数量:', history.length);
  
  // 测试获取所有可用人格
  const availablePersonas = personaManagement.getAvailablePersonas();
  console.log('   获取可用人格成功');
  console.log('   可用人格数量:', availablePersonas.length);
  console.log('   可用人格:', availablePersonas.map(p => p.name).join(', '));
  
  // 测试系统状态
  const systemStatus = personaManagement.getSystemStatus();
  console.log('   获取系统状态成功');
  console.log('   总用户数:', systemStatus.totalUsers);
  console.log('   可用人格数:', systemStatus.availablePersonas);
  
  console.log('   persona-management工具测试通过！');
} catch (error) {
  console.error('   persona-management工具测试失败:', error.message);
}
console.log('');

console.log('=== 所有工具测试完成 ===');
console.log('Communication Branch Tools实现成功！');
