// 简单的能力树功能测试
const { capabilityTree } = require('./capabilities/capability-tree');

console.log('=== 能力树功能测试 ===\n');

// 测试1: 验证能力树初始化
console.log('测试1: 验证能力树初始化');
try {
  const status = capabilityTree.getStatus();
  console.log(`✅ 能力树初始化成功`);
  console.log(`总节点数: ${status.statistics.totalNodes}`);
  console.log(`活跃节点数: ${status.statistics.activeNodes}`);
  console.log(`能力树健康度: ${(status.evaluation.healthScore * 100).toFixed(1)}%`);
} catch (error) {
  console.log(`❌ 能力树初始化测试失败: ${error.message}`);
}

// 测试2: 测试添加能力节点
console.log('\n测试2: 测试添加能力节点');
try {
  const rootNode = capabilityTree.getAllNodes()[0];
  const newNode = capabilityTree.addNode('测试能力', 2, rootNode.id, {
    inputs: ['测试输入'],
    outputs: ['测试输出'],
    prerequisites: ['测试前提'],
    failureBoundaries: ['测试失败边界']
  });
  console.log(`✅ 添加能力节点成功`);
  console.log(`节点ID: ${newNode.id}`);
  console.log(`节点名称: ${newNode.name}`);
} catch (error) {
  console.log(`❌ 添加能力节点测试失败: ${error.message}`);
}

// 测试3: 测试定位任务路径
console.log('\n测试3: 测试定位任务路径');
try {
  const paths = capabilityTree.locateTaskPath('文件操作');
  console.log(`✅ 定位任务路径成功`);
  console.log(`找到 ${paths.length} 个路径`);
  if (paths.length > 0) {
    console.log(`最相关路径: ${paths[0].path.join(' > ')}`);
  }
} catch (error) {
  console.log(`❌ 定位任务路径测试失败: ${error.message}`);
}

// 测试4: 测试导出能力树
console.log('\n测试4: 测试导出能力树');
try {
  const exportedTree = capabilityTree.export();
  console.log(`✅ 导出能力树成功`);
  console.log(`导出版本: ${exportedTree.version}`);
  console.log(`导出时间戳: ${new Date(exportedTree.timestamp).toLocaleString()}`);
} catch (error) {
  console.log(`❌ 导出能力树测试失败: ${error.message}`);
}

// 测试5: 测试生成文本树
console.log('\n测试5: 测试生成文本树');
try {
  const textTree = capabilityTree.generateTextTree();
  console.log(`✅ 生成文本树成功`);
  console.log('能力树结构:');
  console.log(textTree);
} catch (error) {
  console.log(`❌ 生成文本树测试失败: ${error.message}`);
}

// 测试6: 测试生成可视化
console.log('\n测试6: 测试生成可视化');
try {
  const visualization = capabilityTree.generateVisualization();
  console.log(`✅ 生成可视化成功`);
  console.log(`节点数: ${visualization.nodes.length}`);
  console.log(`连接数: ${visualization.links.length}`);
} catch (error) {
  console.log(`❌ 生成可视化测试失败: ${error.message}`);
}

// 测试7: 测试获取指定层级的节点
console.log('\n测试7: 测试获取指定层级的节点');
try {
  const level1Nodes = capabilityTree.getNodesByLevel(1);
  console.log(`✅ 获取层级1节点成功`);
  console.log(`层级1节点数: ${level1Nodes.length}`);
  level1Nodes.forEach(node => {
    console.log(`- ${node.name}`);
  });
} catch (error) {
  console.log(`❌ 获取指定层级节点测试失败: ${error.message}`);
}

console.log('\n=== 能力树功能测试完成 ===');
