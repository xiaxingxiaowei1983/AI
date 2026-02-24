/**
 * 能力树管理工具 (Capability Tree Manager)
 * 用于管理能力树的创建、编辑、删除、可视化和导入/导出
 */

const fs = require('fs');
const path = require('path');
const { capabilityTree } = require('../capabilities/capability-tree');

class CapabilityTreeManager {
  constructor() {
    this.capabilityTree = capabilityTree;
    this.storagePath = path.join(__dirname, '..', '.trae', 'capability-tree');
    this.ensureStorageDirectory();
  }

  // 确保存储目录存在
  ensureStorageDirectory() {
    if (!fs.existsSync(this.storagePath)) {
      fs.mkdirSync(this.storagePath, { recursive: true });
    }
  }

  // 创建能力节点
  createNode(name, level, parentId = null, details = {}) {
    console.log(`🌱 创建能力节点: ${name} (L${level})`);
    
    try {
      const newNode = this.capabilityTree.addNode(name, level, parentId, details);
      console.log('✅ 能力节点创建成功:', newNode.name);
      return newNode;
    } catch (error) {
      console.error('❌ 能力节点创建失败:', error.message);
      return null;
    }
  }

  // 编辑能力节点
  editNode(nodeId, updates) {
    console.log(`✏️  编辑能力节点: ${nodeId}`);
    
    try {
      const node = this.capabilityTree.findNode(nodeId);
      if (!node) {
        console.error('❌ 节点不存在');
        return null;
      }
      
      node.update(updates);
      console.log('✅ 能力节点编辑成功:', node.name);
      return node;
    } catch (error) {
      console.error('❌ 能力节点编辑失败:', error.message);
      return null;
    }
  }

  // 删除能力节点
  deleteNode(nodeId) {
    console.log(`🗑️  删除能力节点: ${nodeId}`);
    
    try {
      const node = this.capabilityTree.findNode(nodeId);
      if (!node) {
        console.error('❌ 节点不存在');
        return false;
      }
      
      if (node.parent) {
        node.parent.removeChild(nodeId);
        this.capabilityTree.nodeMap.delete(nodeId);
        console.log('✅ 能力节点删除成功:', node.name);
        return true;
      } else {
        console.error('❌ 无法删除根节点');
        return false;
      }
    } catch (error) {
      console.error('❌ 能力节点删除失败:', error.message);
      return false;
    }
  }

  // 获取能力树状态
  getStatus() {
    return this.capabilityTree.getStatus();
  }

  // 导出能力树
  exportTree(format = 'json') {
    console.log(`📤 导出能力树 (${format})`);
    
    try {
      const treeData = this.capabilityTree.export();
      
      if (format === 'json') {
        const exportPath = path.join(this.storagePath, `capability-tree-${Date.now()}.json`);
        fs.writeFileSync(exportPath, JSON.stringify(treeData, null, 2));
        console.log('✅ 能力树导出成功:', exportPath);
        return exportPath;
      } else if (format === 'text') {
        const textTree = this.capabilityTree.generateTextTree();
        const exportPath = path.join(this.storagePath, `capability-tree-${Date.now()}.txt`);
        fs.writeFileSync(exportPath, textTree);
        console.log('✅ 能力树导出成功:', exportPath);
        return exportPath;
      } else if (format === 'visual') {
        const visualization = this.capabilityTree.generateVisualization();
        const exportPath = path.join(this.storagePath, `capability-tree-visual-${Date.now()}.json`);
        fs.writeFileSync(exportPath, JSON.stringify(visualization, null, 2));
        console.log('✅ 能力树可视化数据导出成功:', exportPath);
        return exportPath;
      } else {
        console.error('❌ 不支持的导出格式:', format);
        return null;
      }
    } catch (error) {
      console.error('❌ 能力树导出失败:', error.message);
      return null;
    }
  }

  // 导入能力树
  importTree(filePath, format = 'json') {
    console.log(`📥 导入能力树: ${filePath}`);
    
    try {
      if (!fs.existsSync(filePath)) {
        console.error('❌ 文件不存在:', filePath);
        return false;
      }
      
      const fileContent = fs.readFileSync(filePath, 'utf8');
      
      if (format === 'json') {
        const treeData = JSON.parse(fileContent);
        this.capabilityTree.import(treeData);
        console.log('✅ 能力树导入成功');
        return true;
      } else {
        console.error('❌ 不支持的导入格式:', format);
        return false;
      }
    } catch (error) {
      console.error('❌ 能力树导入失败:', error.message);
      return false;
    }
  }

  // 可视化能力树
  visualizeTree() {
    console.log('🎨 可视化能力树');
    
    try {
      const textTree = this.capabilityTree.generateTextTree();
      console.log('\n能力树结构:');
      console.log(textTree);
      
      const visualization = this.capabilityTree.generateVisualization();
      console.log('\n能力树节点数量:', visualization.nodes.length);
      console.log('能力树连接数量:', visualization.links.length);
      
      return {
        textTree,
        visualization
      };
    } catch (error) {
      console.error('❌ 能力树可视化失败:', error.message);
      return null;
    }
  }

  // 列出所有能力节点
  listNodes() {
    console.log('📋 列出所有能力节点');
    
    try {
      const nodes = this.capabilityTree.getAllNodes();
      const nodeList = nodes.map(node => ({
        id: node.id,
        name: node.name,
        level: node.level,
        path: node.getPath(),
        status: node.status,
        usageCount: node.usageCount
      }));
      
      console.log(`总节点数: ${nodes.length}`);
      console.log('节点列表:');
      nodeList.forEach(node => {
        console.log(`- ${node.path} (L${node.level}) [${node.status}] 使用: ${node.usageCount}`);
      });
      
      return nodeList;
    } catch (error) {
      console.error('❌ 列出能力节点失败:', error.message);
      return [];
    }
  }

  // 按层级列出能力节点
  listNodesByLevel(level) {
    console.log(`📋 列出层级 ${level} 的能力节点`);
    
    try {
      const nodes = this.capabilityTree.getNodesByLevel(level);
      const nodeList = nodes.map(node => ({
        id: node.id,
        name: node.name,
        path: node.getPath(),
        status: node.status,
        usageCount: node.usageCount
      }));
      
      console.log(`层级 ${level} 节点数: ${nodes.length}`);
      console.log('节点列表:');
      nodeList.forEach(node => {
        console.log(`- ${node.path} [${node.status}] 使用: ${node.usageCount}`);
      });
      
      return nodeList;
    } catch (error) {
      console.error('❌ 按层级列出能力节点失败:', error.message);
      return [];
    }
  }

  // 修剪能力树
  trimTree() {
    console.log('✂️  修剪能力树');
    
    try {
      const trimCandidates = this.capabilityTree.trimCapabilities();
      console.log(`找到 ${trimCandidates.length} 个候选修剪节点:`);
      trimCandidates.forEach(node => {
        console.log(`- ${node.getPath()} (使用: ${node.usageCount}次)`);
      });
      
      const removedNodes = this.capabilityTree.cleanupTrimmedNodes();
      console.log(`✅ 已清理 ${removedNodes.length} 个节点`);
      
      return {
        candidates: trimCandidates.length,
        removed: removedNodes.length
      };
    } catch (error) {
      console.error('❌ 修剪能力树失败:', error.message);
      return null;
    }
  }

  // 获取能力树状态
  getStatus() {
    console.log('📊 获取能力树状态');
    
    try {
      const status = this.capabilityTree.getStatus();
      console.log('能力树状态:');
      console.log(`总节点数: ${status.totalNodes}`);
      console.log(`活跃节点数: ${status.activeNodes}`);
      console.log(`候选修剪节点数: ${status.candidateTrimNodes}`);
      console.log(`禁用节点数: ${status.disabledNodes}`);
      console.log('层级分布:');
      console.log(`  低层 (L1): ${status.levelDistribution[1]}`);
      console.log(`  中层 (L2): ${status.levelDistribution[2]}`);
      console.log(`  高层 (L3): ${status.levelDistribution[3]}`);
      
      return status;
    } catch (error) {
      console.error('❌ 获取能力树状态失败:', error.message);
      return null;
    }
  }

  // 搜索能力节点
  searchNodes(keyword) {
    console.log(`🔍 搜索能力节点: ${keyword}`);
    
    try {
      const allNodes = this.capabilityTree.getAllNodes();
      const normalizedKeyword = keyword.toLowerCase().trim();
      
      const matchingNodes = allNodes.filter(node => {
        const nodeName = node.name.toLowerCase();
        const nodePath = node.getPath().toLowerCase();
        return nodeName.includes(normalizedKeyword) || nodePath.includes(normalizedKeyword);
      });
      
      console.log(`找到 ${matchingNodes.length} 个匹配节点:`);
      matchingNodes.forEach(node => {
        console.log(`- ${node.getPath()} (L${node.level}) [${node.status}]`);
      });
      
      return matchingNodes;
    } catch (error) {
      console.error('❌ 搜索能力节点失败:', error.message);
      return [];
    }
  }

  // 分析能力树
  analyzeTree() {
    console.log('📈 分析能力树');
    
    try {
      const allNodes = this.capabilityTree.getAllNodes();
      const status = this.capabilityTree.getStatus();
      
      // 计算使用频率统计
      const usageStats = {
        totalUsage: allNodes.reduce((sum, node) => sum + node.usageCount, 0),
        mostUsed: allNodes.reduce((max, node) => 
          node.usageCount > max.usageCount ? node : max, { usageCount: 0 }),
        leastUsed: allNodes.filter(node => node.usageCount > 0).reduce((min, node) => 
          node.usageCount < min.usageCount ? node : min, { usageCount: Infinity })
      };
      
      // 计算层级统计
      const levelStats = {
        1: this.capabilityTree.getNodesByLevel(1).length,
        2: this.capabilityTree.getNodesByLevel(2).length,
        3: this.capabilityTree.getNodesByLevel(3).length
      };
      
      console.log('能力树分析报告:');
      console.log(`总节点数: ${status.totalNodes}`);
      console.log(`总使用次数: ${usageStats.totalUsage}`);
      console.log(`最常用节点: ${usageStats.mostUsed.name} (${usageStats.mostUsed.usageCount}次)`);
      console.log(`最少用节点: ${usageStats.leastUsed.name} (${usageStats.leastUsed.usageCount}次)`);
      console.log('层级分布:');
      console.log(`  低层 (L1): ${levelStats[1]}`);
      console.log(`  中层 (L2): ${levelStats[2]}`);
      console.log(`  高层 (L3): ${levelStats[3]}`);
      
      return {
        status,
        usageStats,
        levelStats
      };
    } catch (error) {
      console.error('❌ 分析能力树失败:', error.message);
      return null;
    }
  }
}

// 导出能力树管理器
const capabilityTreeManager = new CapabilityTreeManager();

// 命令行接口
function runCommand(args) {
  const command = args[0];
  const params = args.slice(1);
  
  switch (command) {
    case 'create':
      if (params.length < 2) {
        console.log('用法: create <name> <level> [parentId] [details]');
        return;
      }
      const [name, level, parentId, ...detailsArgs] = params;
      const details = detailsArgs.length > 0 ? JSON.parse(detailsArgs.join(' ')) : {};
      capabilityTreeManager.createNode(name, parseInt(level), parentId, details);
      break;
      
    case 'list':
      if (params.length > 0 && params[0] === '--level') {
        capabilityTreeManager.listNodesByLevel(parseInt(params[1]));
      } else {
        capabilityTreeManager.listNodes();
      }
      break;
      
    case 'status':
      capabilityTreeManager.getStatus();
      break;
      
    case 'visualize':
      capabilityTreeManager.visualizeTree();
      break;
      
    case 'export':
      const format = params[0] || 'json';
      capabilityTreeManager.exportTree(format);
      break;
      
    case 'import':
      if (params.length < 1) {
        console.log('用法: import <filePath> [format]');
        return;
      }
      const [filePath, importFormat] = params;
      capabilityTreeManager.importTree(filePath, importFormat || 'json');
      break;
      
    case 'trim':
      capabilityTreeManager.trimTree();
      break;
      
    case 'search':
      if (params.length < 1) {
        console.log('用法: search <keyword>');
        return;
      }
      capabilityTreeManager.searchNodes(params.join(' '));
      break;
      
    case 'analyze':
      capabilityTreeManager.analyzeTree();
      break;
      
    case 'help':
    default:
      console.log('能力树管理工具命令:');
      console.log('  create <name> <level> [parentId] [details] - 创建能力节点');
      console.log('  list [--level <level>] - 列出能力节点');
      console.log('  status - 获取能力树状态');
      console.log('  visualize - 可视化能力树');
      console.log('  export [format] - 导出能力树 (json, text, visual)');
      console.log('  import <filePath> [format] - 导入能力树');
      console.log('  trim - 修剪能力树');
      console.log('  search <keyword> - 搜索能力节点');
      console.log('  analyze - 分析能力树');
      console.log('  help - 显示帮助信息');
      break;
  }
}

// 执行命令
if (require.main === module) {
  const args = process.argv.slice(2);
  runCommand(args);
}

module.exports = {
  CapabilityTreeManager,
  capabilityTreeManager
};
