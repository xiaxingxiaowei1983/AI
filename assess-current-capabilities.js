/**
 * 评估当前能力状态
 * 用于全面盘点系统当前具备的能力，识别已有的能力管理机制
 */

const fs = require('fs');
const path = require('path');
const { capabilityTree } = require('./capabilities/capability-tree');

function assessCurrentCapabilities() {
  console.log('🚀 开始评估当前能力状态...');
  console.log('📅 当前时间:', new Date().toISOString());
  
  const assessment = {
    timestamp: Date.now(),
    capabilityTree: {},
    existingSystems: {},
    capabilityReuse: {},
    findings: [],
    recommendations: []
  };
  
  try {
    // 1. 评估能力树系统
    console.log('🌳 评估能力树系统...');
    const treeStatus = capabilityTree.getStatus();
    assessment.capabilityTree = treeStatus;
    assessment.capabilityTree.exported = capabilityTree.export();
    
    console.log('📊 能力树状态:', JSON.stringify(treeStatus, null, 2));
    
    // 2. 检查现有系统
    console.log('🔍 检查现有系统...');
    
    // 检查PCEC系统
    const pcecPath = path.join(__dirname, 'pcec-hourly-scheduler.js');
    if (fs.existsSync(pcecPath)) {
      assessment.existingSystems.pcec = {
        exists: true,
        path: pcecPath
      };
      console.log('✅ PCEC系统存在');
    } else {
      assessment.existingSystems.pcec = {
        exists: false
      };
      console.log('❌ PCEC系统不存在');
    }
    
    // 检查热点信息缓存
    const hotCachePath = path.join(__dirname, 'capabilities', 'hot-info-cache.js');
    if (fs.existsSync(hotCachePath)) {
      assessment.existingSystems.hotInfoCache = {
        exists: true,
        path: hotCachePath
      };
      console.log('✅ 热点信息缓存系统存在');
    } else {
      assessment.existingSystems.hotInfoCache = {
        exists: false
      };
      console.log('❌ 热点信息缓存系统不存在');
    }
    
    // 检查公司大脑核心
    const companyBrainPath = path.join(__dirname, 'company-brain-core.js');
    if (fs.existsSync(companyBrainPath)) {
      assessment.existingSystems.companyBrain = {
        exists: true,
        path: companyBrainPath
      };
      console.log('✅ 公司大脑核心系统存在');
    } else {
      assessment.existingSystems.companyBrain = {
        exists: false
      };
      console.log('❌ 公司大脑核心系统不存在');
    }
    
    // 3. 分析能力复用情况
    console.log('📈 分析能力复用情况...');
    
    // 检查能力使用数据
    const nodes = capabilityTree.getAllNodes();
    const usageStats = {
      totalNodes: nodes.length,
      usedNodes: nodes.filter(node => node.usageCount > 0).length,
      unusedNodes: nodes.filter(node => node.usageCount === 0).length,
      averageUsage: nodes.reduce((sum, node) => sum + node.usageCount, 0) / nodes.length || 0,
      mostUsed: nodes.sort((a, b) => b.usageCount - a.usageCount).slice(0, 5)
    };
    
    assessment.capabilityReuse = usageStats;
    console.log('📊 能力复用统计:', JSON.stringify(usageStats, null, 2));
    
    // 4. 识别发现的问题
    console.log('🔎 识别发现的问题...');
    
    if (usageStats.unusedNodes > usageStats.totalNodes * 0.5) {
      assessment.findings.push({
        severity: 'high',
        message: '超过50%的能力节点未被使用',
        recommendation: '需要检查能力节点的相关性，考虑修剪未使用的能力'
      });
    }
    
    if (!assessment.existingSystems.pcec.exists) {
      assessment.findings.push({
        severity: 'high',
        message: 'PCEC系统不存在',
        recommendation: '需要创建PCEC系统以支持周期性能力进化'
      });
    }
    
    if (treeStatus.totalNodes < 10) {
      assessment.findings.push({
        severity: 'medium',
        message: '能力树节点数量较少',
        recommendation: '需要扩展能力树，添加更多实用能力'
      });
    }
    
    // 5. 生成建议
    console.log('💡 生成建议...');
    
    assessment.recommendations = [
      {
        priority: 'high',
        title: '创建capability-evolver元技能系统',
        description: '建立专门用于管理能力进化的元技能系统'
      },
      {
        priority: 'high',
        title: '增强能力树系统',
        description: '添加能力合并、升级和使用追踪功能'
      },
      {
        priority: 'medium',
        title: '实现能力内生化策略',
        description: '建立能力从候选到内生化的完整流程'
      },
      {
        priority: 'medium',
        title: '集成PCEC系统',
        description: '将能力进化与PCEC系统集成，实现周期性进化'
      },
      {
        priority: 'low',
        title: '建立能力评估机制',
        description: '实现能力进化效果的量化评估'
      }
    ];
    
    // 6. 保存评估结果
    const outputPath = path.join(__dirname, '.trae', 'documents', 'capability-assessment.json');
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, JSON.stringify(assessment, null, 2));
    
    console.log('✅ 评估结果已保存到:', outputPath);
    
    // 7. 生成评估报告
    const reportPath = path.join(__dirname, '.trae', 'documents', 'capability-assessment.md');
    const report = generateAssessmentReport(assessment);
    fs.writeFileSync(reportPath, report);
    
    console.log('✅ 评估报告已生成:', reportPath);
    
    console.log('🎉 能力状态评估完成！');
    return assessment;
    
  } catch (error) {
    console.error('❌ 评估能力状态时出错:', error.message);
    console.error(error.stack);
    return null;
  }
}

function generateAssessmentReport(assessment) {
  return `# 能力状态评估报告

## 评估时间
${new Date(assessment.timestamp).toISOString()}

## 1. 能力树状态

### 基本统计
- **总节点数**: ${assessment.capabilityTree.totalNodes}
- **活跃节点**: ${assessment.capabilityTree.activeNodes}
- **候选修剪节点**: ${assessment.capabilityTree.candidateTrimNodes}
- **禁用节点**: ${assessment.capabilityTree.disabledNodes}

### 层级分布
- **低层（基础操作）**: ${assessment.capabilityTree.levelDistribution[1] || 0}
- **中层（可复用流程）**: ${assessment.capabilityTree.levelDistribution[2] || 0}
- **高层（问题分解）**: ${assessment.capabilityTree.levelDistribution[3] || 0}

## 2. 现有系统状态

### PCEC系统
${assessment.existingSystems.pcec.exists ? '✅ 存在' : '❌ 不存在'}

### 热点信息缓存
${assessment.existingSystems.hotInfoCache ? '✅ 存在' : '❌ 不存在'}

### 公司大脑核心
${assessment.existingSystems.companyBrain ? '✅ 存在' : '❌ 不存在'}

## 3. 能力复用情况

### 复用统计
- **总节点数**: ${assessment.capabilityReuse.totalNodes}
- **已使用节点**: ${assessment.capabilityReuse.usedNodes}
- **未使用节点**: ${assessment.capabilityReuse.unusedNodes}
- **平均使用次数**: ${assessment.capabilityReuse.averageUsage.toFixed(2)}

### 最常用能力
${assessment.capabilityReuse.mostUsed.map((node, index) => {
  return `- ${index + 1}. ${node.name} (使用${node.usageCount}次)`;
}).join('\n')}

## 4. 发现的问题

${assessment.findings.map(finding => {
  return `### ${finding.severity.toUpperCase()} - ${finding.message}
**建议**: ${finding.recommendation}`;
}).join('\n\n')}

## 5. 改进建议

${assessment.recommendations.map(rec => {
  return `### ${rec.priority.toUpperCase()} - ${rec.title}
${rec.description}`;
}).join('\n\n')}

## 6. 结论

基于当前评估，系统具备基础的能力管理框架，但需要进一步增强以支持完整的能力进化流程。建议优先创建capability-evolver元技能系统，并增强现有能力树系统的功能。
`;
}

// 执行评估
if (require.main === module) {
  assessCurrentCapabilities();
}

module.exports = { assessCurrentCapabilities };
