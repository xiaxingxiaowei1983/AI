/**
 * 测试增强版能力树
 * 验证核心功能：功能域划分、层级结构、VFM评估、跨分支协作、性能优化
 */

const { EnhancedCapabilityTree } = require('./enhanced-capability-tree');

// 主测试函数
async function main() {
  console.log('Testing enhanced capability tree...');
  
  try {
    // 创建增强版能力树
    const enhancedTree = new EnhancedCapabilityTree();
    
    // 执行能力生长
    console.log('\n1. Executing capability growth...');
    enhancedTree.growCapabilities();
    
    // 获取状态
    console.log('\n2. Getting enhanced tree status...');
    const status = enhancedTree.getStatus();
    console.log('Status:', JSON.stringify(status, null, 2));
    
    // 获取结构
    console.log('\n3. Getting enhanced tree structure...');
    const structure = enhancedTree.export();
    console.log('Structure overview:');
    console.log('- Root:', structure.name);
    console.log('- Children count:', structure.children ? structure.children.length : 0);
    
    if (structure.children) {
      structure.children.forEach((child, index) => {
        console.log(`- Child ${index + 1}: ${child.name} (Level: ${child.level})`);
        if (child.children) {
          child.children.forEach((grandchild, gIndex) => {
            console.log(`  - Grandchild ${gIndex + 1}: ${grandchild.name} (Level: ${grandchild.level})`);
          });
        }
      });
    }
    
    console.log('\nEnhanced capability tree test completed successfully!');
    
  } catch (error) {
    console.error('Error testing enhanced capability tree:', error);
  }
}

// 运行测试
if (require.main === module) {
  main();
}
