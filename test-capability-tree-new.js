// 测试新的Capability Tree结构
const { capabilityTree } = require('./capabilities/capability-tree');

console.log('=== 测试新Capability Tree结构 ===\n');

// 1. 测试根节点
console.log('1. 根节点信息:');
console.log('   名称:', capabilityTree.root.name);
console.log('   层级:', capabilityTree.root.level);
console.log('   子节点数量:', capabilityTree.root.children.length);
console.log('');

// 2. 测试四个主分支
console.log('2. 四个主分支:');
capabilityTree.root.children.forEach((branch, index) => {
  console.log(`${index + 1}. ${branch.name} (L${branch.level})`);
  console.log('   子节点数量:', branch.children.length);
  branch.children.forEach((node, nodeIndex) => {
    console.log(`     ${nodeIndex + 1}. ${node.name} (L${node.level})`);
    if (node.tool) {
      console.log(`       工具: ${node.tool}`);
    }
    if (node.protocol) {
      console.log(`       协议: ${node.protocol}`);
    }
  });
  console.log('');
});

// 3. 测试结构验证
console.log('3. 结构验证:');
try {
  // 测试获取所有节点
  const allNodes = capabilityTree.getAllNodes();
  console.log('   总节点数量:', allNodes.length);
  
  // 测试按层级获取节点
  const level1Nodes = capabilityTree.getNodesByLevel(1);
  console.log('   层级1节点数量:', level1Nodes.length);
  
  const level2Nodes = capabilityTree.getNodesByLevel(2);
  console.log('   层级2节点数量:', level2Nodes.length);
  
  // 测试结构完整性
  const completeness = capabilityTree.checkAllNodesCompleteness();
  console.log('   节点完整性检查:');
  console.log(`     总节点数: ${completeness.totalNodes}`);
  console.log(`     完整节点数: ${completeness.completeNodes}`);
  console.log(`     不完整节点数: ${completeness.incompleteNodes.length}`);
  
  if (completeness.incompleteNodes.length > 0) {
    console.log('     不完整节点:');
    completeness.incompleteNodes.forEach(node => {
      console.log(`       - ${node.node.name}: ${node.missingFields.join(', ')}`);
    });
  }
  
  console.log('');
  console.log('4. 兼容性映射:');
  const mapping = capabilityTree.getCompatibilityMapping();
  console.log('   现有功能 -> 新结构映射:');
  Object.entries(mapping).forEach(([oldFunc, newFunc]) => {
    console.log(`   ${oldFunc} -> ${newFunc}`);
  });
  
  console.log('');
  console.log('5. 能力树文本表示:');
  const textTree = capabilityTree.generateTextTree();
  console.log(textTree);
  
  console.log('');
  console.log('=== 测试完成 ===');
  console.log('新Capability Tree结构创建成功！');
  
} catch (error) {
  console.error('测试失败:', error.message);
  console.error(error.stack);
}
