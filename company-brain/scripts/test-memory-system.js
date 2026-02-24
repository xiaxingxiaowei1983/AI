// 记忆系统测试脚本

const MemorySystem = require('../src/memory/index.js');
const MemoryAPI = require('../src/memory/api.js');

async function testMemorySystem() {
  console.log('🧪 开始测试记忆系统...');
  
  try {
    // 创建记忆系统实例
    const memorySystem = new MemorySystem({
      dataDir: './test-data'
    });
    
    // 等待初始化完成
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // 创建API实例
    const memoryAPI = new MemoryAPI(memorySystem);
    
    console.log('✅ 记忆系统初始化完成');
    
    // 测试1: 创建规则
    console.log('\n1. 测试创建规则...');
    const ruleResult = await memoryAPI.createRule({
      name: '测试规则',
      description: '这是一个测试规则',
      type: 'test',
      content: '规则内容：测试规则的详细说明'
    });
    
    if (ruleResult.success) {
      console.log('✅ 规则创建成功:', ruleResult.data.id);
    } else {
      console.error('❌ 规则创建失败:', ruleResult.error);
      return;
    }
    
    // 测试2: 获取规则
    console.log('\n2. 测试获取规则...');
    const getRuleResult = await memoryAPI.getRule(ruleResult.data.id);
    
    if (getRuleResult.success) {
      console.log('✅ 规则获取成功:', getRuleResult.data.name);
    } else {
      console.error('❌ 规则获取失败:', getRuleResult.error);
      return;
    }
    
    // 测试3: 更新规则
    console.log('\n3. 测试更新规则...');
    const updateRuleResult = await memoryAPI.updateRule(ruleResult.data.id, {
      description: '这是一个更新后的测试规则',
      content: '更新后的规则内容：测试规则的详细说明'
    });
    
    if (updateRuleResult.success) {
      console.log('✅ 规则更新成功:', updateRuleResult.data.description);
    } else {
      console.error('❌ 规则更新失败:', updateRuleResult.error);
      return;
    }
    
    // 测试4: 创建知识
    console.log('\n4. 测试创建知识...');
    const knowledgeResult = await memoryAPI.createKnowledge({
      title: '测试知识',
      description: '这是一个测试知识',
      category: 'test',
      tags: ['test', 'knowledge'],
      content: '知识内容：测试知识的详细说明'
    });
    
    if (knowledgeResult.success) {
      console.log('✅ 知识创建成功:', knowledgeResult.data.id);
    } else {
      console.error('❌ 知识创建失败:', knowledgeResult.error);
      return;
    }
    
    // 测试5: 创建文档
    console.log('\n5. 测试创建文档...');
    const documentResult = await memoryAPI.createDocument({
      title: '测试文档',
      description: '这是一个测试文档',
      type: 'test',
      author: 'test-author',
      content: '文档内容：测试文档的详细说明'
    });
    
    if (documentResult.success) {
      console.log('✅ 文档创建成功:', documentResult.data.id);
    } else {
      console.error('❌ 文档创建失败:', documentResult.error);
      return;
    }
    
    // 测试6: 搜索功能
    console.log('\n6. 测试搜索功能...');
    const searchResult = await memoryAPI.search('测试');
    
    if (searchResult.success) {
      console.log('✅ 搜索成功，找到', searchResult.data.results.length, '个结果');
    } else {
      console.error('❌ 搜索失败:', searchResult.error);
      return;
    }
    
    // 测试7: 获取系统状态
    console.log('\n7. 测试获取系统状态...');
    const statusResult = await memoryAPI.getStatus();
    
    if (statusResult.success) {
      console.log('✅ 系统状态获取成功:', statusResult.data);
    } else {
      console.error('❌ 系统状态获取失败:', statusResult.error);
      return;
    }
    
    // 测试8: 列表功能
    console.log('\n8. 测试列表功能...');
    const rulesListResult = await memoryAPI.listRules();
    const knowledgeListResult = await memoryAPI.listKnowledge();
    const documentsListResult = await memoryAPI.listDocuments();
    
    if (rulesListResult.success && knowledgeListResult.success && documentsListResult.success) {
      console.log('✅ 列表功能测试成功:');
      console.log('   - 规则数量:', rulesListResult.data.length);
      console.log('   - 知识数量:', knowledgeListResult.data.length);
      console.log('   - 文档数量:', documentsListResult.data.length);
    } else {
      console.error('❌ 列表功能测试失败');
      return;
    }
    
    // 测试9: 备份功能
    console.log('\n9. 测试备份功能...');
    const backupResult = await memoryAPI.backup();
    
    if (backupResult.success) {
      console.log('✅ 备份成功，备份数据包含:');
      console.log('   - 规则数量:', backupResult.data.rules.length);
      console.log('   - 知识数量:', backupResult.data.knowledge.length);
      console.log('   - 文档数量:', backupResult.data.documents.length);
    } else {
      console.error('❌ 备份失败:', backupResult.error);
      return;
    }
    
    // 测试10: 删除功能
    console.log('\n10. 测试删除功能...');
    const deleteRuleResult = await memoryAPI.deleteRule(ruleResult.data.id);
    const deleteKnowledgeResult = await memoryAPI.deleteKnowledge(knowledgeResult.data.id);
    const deleteDocumentResult = await memoryAPI.deleteDocument(documentResult.data.id);
    
    if (deleteRuleResult.success && deleteKnowledgeResult.success && deleteDocumentResult.success) {
      console.log('✅ 删除功能测试成功');
    } else {
      console.error('❌ 删除功能测试失败');
      return;
    }
    
    // 测试完成
    console.log('\n🎉 所有测试通过！记忆系统功能正常。');
    
  } catch (error) {
    console.error('❌ 测试过程中发生错误:', error.message);
    console.error(error.stack);
  }
}

// 运行测试
testMemorySystem();
