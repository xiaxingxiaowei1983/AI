/**
 * 综合能力树测试
 * 先更新能力树，然后测试其功能
 */

const { capabilityTree } = require('./capabilities/capability-tree');
const { main: updateMain } = require('./update-capability-tree');

// 测试任务路径定位
function testTaskPathLocation() {
  console.log('\n=== Testing task path location ===');
  
  const testTasks = [
    '读取配置文件',
    '发送网络请求',
    '分析业务数据',
    '管理智能体',
    '诊断系统状态',
    '优化资源分配',
    '设计技术架构'
  ];
  
  testTasks.forEach(task => {
    console.log(`\nLocating path for task: "${task}"`);
    const paths = capabilityTree.locateTaskPath(task);
    
    if (paths.length > 0) {
      console.log('Potential paths:');
      paths.forEach((path, index) => {
        console.log(`${index + 1}. ${path.path} (Relevance: ${path.relevance.toFixed(2)})`);
      });
      
      // 标记第一个路径为使用
      console.log(`Marking node as used: ${paths[0].node.name}`);
      capabilityTree.markNodeUsed(paths[0].node.id);
    } else {
      console.log('No paths found');
    }
  });
}

// 测试节点使用统计
function testNodeUsage() {
  console.log('\n=== Testing node usage statistics ===');
  
  const allNodes = capabilityTree.getAllNodes();
  const usedNodes = allNodes.filter(node => node.usageCount > 0);
  
  console.log(`Found ${usedNodes.length} used nodes:`);
  usedNodes.forEach(node => {
    console.log(`${node.name} (${node.getPath()}): ${node.usageCount} times, last used: ${new Date(node.lastUsed).toLocaleString()}`);
  });
}

// 测试能力修剪
function testCapabilityTrimming() {
  console.log('\n=== Testing capability trimming ===');
  
  const trimCandidates = capabilityTree.trimCapabilities();
  console.log(`Found ${trimCandidates.length} candidates for trimming:`);
  trimCandidates.forEach(item => {
    const node = item.node;
    console.log(`${node.name} (${node.getPath()}) - Usage: ${node.usageCount}, Last used: ${node.lastUsed ? new Date(node.lastUsed).toLocaleString() : 'Never'}`);
  });
}

// 测试能力树状态
function testTreeStatus() {
  console.log('\n=== Testing tree status ===');
  
  const status = capabilityTree.getStatus();
  console.log('Capability tree status:');
  console.log(JSON.stringify(status, null, 2));
}

// 主测试函数
async function main() {
  console.log('Starting comprehensive capability tree test...');
  
  // 先更新能力树
  console.log('\n=== Updating capability tree ===');
  await updateMain();
  
  // 测试任务路径定位
  testTaskPathLocation();
  
  // 测试节点使用统计
  testNodeUsage();
  
  // 测试能力修剪
  testCapabilityTrimming();
  
  // 测试能力树状态
  testTreeStatus();
  
  console.log('\n=== Comprehensive test completed successfully! ===');
}

// 运行测试
if (require.main === module) {
  main();
}
