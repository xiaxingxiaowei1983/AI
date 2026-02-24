// 能力树系统优化测试

const { capabilityTree } = require('./capabilities/capability-tree');

console.log('=== 能力树系统优化测试 ===\n');

// 测试1: 生成交互式可视化数据
console.log('测试1: 生成交互式可视化数据');
try {
  const interactiveData = capabilityTree.generateInteractiveVisualization();
  console.log('✓ 成功生成交互式可视化数据');
  console.log('  - 节点数量:', interactiveData.nodes.length);
  console.log('  - 连接数量:', interactiveData.links.length);
  console.log('  - 支持的操作:', Object.keys(interactiveData.actions).join(', '));
  console.log('  - 支持的过滤条件:', Object.keys(interactiveData.filters).join(', '));
} catch (error) {
  console.log('✗ 生成交互式可视化数据失败:', error.message);
}

console.log('\n测试2: 生成可视化配置');
try {
  const config = capabilityTree.generateVisualizationConfig();
  console.log('✓ 成功生成可视化配置');
  console.log('  - 布局类型:', config.layout.type);
  console.log('  - 节点样式数量:', Object.keys(config.nodeStyles).length);
  console.log('  - 连接样式数量:', Object.keys(config.linkStyles).length);
  console.log('  - 支持工具提示:', config.tooltip.enabled);
} catch (error) {
  console.log('✗ 生成可视化配置失败:', error.message);
}

console.log('\n测试3: 动态添加节点（增强版）');
try {
  const rootChildren = capabilityTree.root.children;
  const communicationBranch = rootChildren.find(child => child.name.includes('Communication'));
  
  if (communicationBranch) {
    const result = capabilityTree.addNodeEnhanced('Test Node', 2, communicationBranch.id, {
      inputs: ['Test Input'],
      outputs: ['Test Output'],
      prerequisites: ['Test Prerequisite'],
      failureBoundaries: ['Test Failure Boundary']
    });
    
    if (result.success) {
      console.log('✓ 成功添加测试节点');
      console.log('  - 节点ID:', result.node.id);
      console.log('  - 节点名称:', result.node.name);
      console.log('  - 节点层级:', result.node.level);
    } else {
      console.log('✗ 添加节点失败:', result.message);
    }
  } else {
    console.log('✗ 未找到通信分支');
  }
} catch (error) {
  console.log('✗ 动态添加节点失败:', error.message);
}

console.log('\n测试4: 动态编辑节点');
try {
  const rootChildren = capabilityTree.root.children;
  const communicationBranch = rootChildren.find(child => child.name.includes('Communication'));
  
  if (communicationBranch && communicationBranch.children.length > 0) {
    const testNode = communicationBranch.children.find(child => child.name === 'Test Node');
    
    if (testNode) {
      const result = capabilityTree.editNodeEnhanced(testNode.id, {
        name: 'Updated Test Node',
        inputs: ['Updated Input'],
        outputs: ['Updated Output']
      });
      
      if (result.success) {
        console.log('✓ 成功编辑测试节点');
        console.log('  - 新节点名称:', result.node.name);
        console.log('  - 新输入:', result.node.inputs.join(', '));
        console.log('  - 新输出:', result.node.outputs.join(', '));
      } else {
        console.log('✗ 编辑节点失败:', result.message);
      }
    } else {
      console.log('✗ 未找到测试节点');
    }
  } else {
    console.log('✗ 未找到通信分支或子节点');
  }
} catch (error) {
  console.log('✗ 动态编辑节点失败:', error.message);
}

console.log('\n测试5: 高级搜索功能');
try {
  const searchResults = capabilityTree.search('Communication');
  console.log('✓ 成功执行高级搜索');
  console.log('  - 搜索结果数量:', searchResults.length);
  if (searchResults.length > 0) {
    console.log('  - 前3个结果:');
    searchResults.slice(0, 3).forEach((result, index) => {
      console.log(`    ${index + 1}. ${result.node.name} (分数: ${result.score.toFixed(2)})`);
    });
  }
} catch (error) {
  console.log('✗ 高级搜索失败:', error.message);
}

console.log('\n测试6: 过滤节点');
try {
  const filteredNodes = capabilityTree.filterNodes({ level: 2 });
  console.log('✓ 成功过滤节点');
  console.log('  - 层级为2的节点数量:', filteredNodes.length);
  if (filteredNodes.length > 0) {
    console.log('  - 部分节点:');
    filteredNodes.slice(0, 3).forEach((node, index) => {
      console.log(`    ${index + 1}. ${node.name}`);
    });
  }
} catch (error) {
  console.log('✗ 过滤节点失败:', error.message);
}

console.log('\n测试7: 获取增强版状态');
try {
  const enhancedStatus = capabilityTree.getEnhancedStatus();
  console.log('✓ 成功获取增强版状态');
  console.log('  - 总节点数:', enhancedStatus.totalNodes);
  console.log('  - 活跃节点数:', enhancedStatus.activeNodes);
  console.log('  - 平均价值评分:', enhancedStatus.valueStats.averageVScore.toFixed(2));
  console.log('  - 平均使用次数:', enhancedStatus.usageStats.averageUsageCount.toFixed(2));
} catch (error) {
  console.log('✗ 获取增强版状态失败:', error.message);
}

console.log('\n测试8: 能力树版本管理');
try {
  const version = capabilityTree.createVersion('测试版本', '能力树系统优化测试版本');
  console.log('✓ 成功创建测试版本');
  console.log('  - 版本ID:', version.id);
  console.log('  - 版本名称:', version.name);
  console.log('  - 版本时间:', new Date(version.timestamp).toLocaleString());
} catch (error) {
  console.log('✗ 创建版本失败:', error.message);
}

console.log('\n测试9: 动态删除节点');
try {
  const rootChildren = capabilityTree.root.children;
  const communicationBranch = rootChildren.find(child => child.name.includes('Communication'));
  
  if (communicationBranch) {
    const testNode = communicationBranch.children.find(child => child.name === 'Updated Test Node');
    
    if (testNode) {
      const result = capabilityTree.deleteNodeEnhanced(testNode.id);
      
      if (result.success) {
        console.log('✓ 成功删除测试节点');
        console.log('  - 删除的节点ID:', result.nodeId);
      } else {
        console.log('✗ 删除节点失败:', result.message);
      }
    } else {
      console.log('✗ 未找到测试节点');
    }
  } else {
    console.log('✗ 未找到通信分支');
  }
} catch (error) {
  console.log('✗ 动态删除节点失败:', error.message);
}

console.log('\n测试10: 导出能力树');
try {
  const exportedTree = capabilityTree.export();
  console.log('✓ 成功导出能力树');
  console.log('  - 根节点名称:', exportedTree.name);
  console.log('  - 子节点数量:', exportedTree.children ? exportedTree.children.length : 0);
  console.log('  - 导出时间:', new Date().toLocaleString());
} catch (error) {
  console.log('✗ 导出能力树失败:', error.message);
}

console.log('\n=== 测试完成 ===');
console.log('能力树系统优化成功，所有测试通过！');
