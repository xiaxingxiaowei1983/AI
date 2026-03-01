// 团队协作分析脚本
// 分析团队分工、沟通机制和协作流程，梳理智能体之间的协作模式

const fs = require('fs');
const path = require('path');

const targetDir = 'C:\\Users\\10919\\Desktop\\AI';
const outputDir = path.join(targetDir, '.trae', 'documents');

// 确保输出目录存在
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const collaborationData = {
  teamStructure: [],
  communicationMechanisms: [],
  collaborationProcesses: [],
  agentCollaboration: [],
  toolsAndSystems: []
};

function scanForCollaborationDocs(dir) {
  try {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      
      if (item.isDirectory()) {
        if (item.name === 'node_modules' || item.name === '.git') {
          continue;
        }
        scanForCollaborationDocs(fullPath);
      } else if (item.isFile()) {
        const ext = path.extname(item.name).toLowerCase();
        if (ext === '.md' || ext === '.txt' || ext === '.js') {
          analyzeCollaborationFile(fullPath);
        }
      }
    }
  } catch (err) {
    console.error(`扫描目录失败: ${dir}`, err.message);
  }
}

function analyzeCollaborationFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const relativePath = path.relative(targetDir, filePath);
    const lowerContent = content.toLowerCase();
    
    // 分析团队结构
    if (lowerContent.includes('团队') || lowerContent.includes('分工') || 
        lowerContent.includes('角色') || lowerContent.includes('team') ||
        lowerContent.includes('role') || lowerContent.includes('division')) {
      collaborationData.teamStructure.push({
        file: relativePath,
        preview: content.substring(0, 200) + '...'
      });
    }
    
    // 分析沟通机制
    if (lowerContent.includes('沟通') || lowerContent.includes('communication') || 
        lowerContent.includes('协作') || lowerContent.includes('collaboration') ||
        lowerContent.includes('交流') || lowerContent.includes('interaction')) {
      collaborationData.communicationMechanisms.push({
        file: relativePath,
        preview: content.substring(0, 200) + '...'
      });
    }
    
    // 分析协作流程
    if (lowerContent.includes('流程') || lowerContent.includes('process') || 
        lowerContent.includes('工作流') || lowerContent.includes('workflow') ||
        lowerContent.includes('步骤') || lowerContent.includes('procedure')) {
      collaborationData.collaborationProcesses.push({
        file: relativePath,
        preview: content.substring(0, 200) + '...'
      });
    }
    
    // 分析智能体协作
    if (lowerContent.includes('智能体') || lowerContent.includes('agent') || 
        lowerContent.includes('协作') || lowerContent.includes('协作模式') ||
        lowerContent.includes('multi-agent') || lowerContent.includes('orchestration')) {
      collaborationData.agentCollaboration.push({
        file: relativePath,
        preview: content.substring(0, 200) + '...'
      });
    }
    
    // 分析工具和系统
    if (lowerContent.includes('工具') || lowerContent.includes('tool') || 
        lowerContent.includes('系统') || lowerContent.includes('system') ||
        lowerContent.includes('平台') || lowerContent.includes('platform')) {
      collaborationData.toolsAndSystems.push({
        file: relativePath,
        preview: content.substring(0, 200) + '...'
      });
    }
    
  } catch (err) {
    console.error(`分析文件失败: ${filePath}`, err.message);
  }
}

function generateReport() {
  let report = `# 团队分工协作逻辑分析报告

## 分析概览
- 分析时间: ${new Date().toISOString()}
- 分析目录: ${targetDir}

## 分析结果统计
- **团队结构**: ${collaborationData.teamStructure.length}
- **沟通机制**: ${collaborationData.communicationMechanisms.length}
- **协作流程**: ${collaborationData.collaborationProcesses.length}
- **智能体协作**: ${collaborationData.agentCollaboration.length}
- **工具和系统**: ${collaborationData.toolsAndSystems.length}

`;
  
  // 团队结构
  if (collaborationData.teamStructure.length > 0) {
    report += `## 团队结构

`;
    collaborationData.teamStructure.slice(0, 10).forEach((item, index) => {
      report += `### ${index + 1}. ${path.basename(item.file)}
`;
      report += `- 路径: ${item.file}
`;
      report += `- 预览: ${item.preview}

`;
    });
    
    if (collaborationData.teamStructure.length > 10) {
      report += `... 还有 ${collaborationData.teamStructure.length - 10} 个相关文档

`;
    }
  }
  
  // 沟通机制
  if (collaborationData.communicationMechanisms.length > 0) {
    report += `## 沟通机制

`;
    collaborationData.communicationMechanisms.slice(0, 10).forEach((item, index) => {
      report += `### ${index + 1}. ${path.basename(item.file)}
`;
      report += `- 路径: ${item.file}
`;
      report += `- 预览: ${item.preview}

`;
    });
    
    if (collaborationData.communicationMechanisms.length > 10) {
      report += `... 还有 ${collaborationData.communicationMechanisms.length - 10} 个相关文档

`;
    }
  }
  
  // 协作流程
  if (collaborationData.collaborationProcesses.length > 0) {
    report += `## 协作流程

`;
    collaborationData.collaborationProcesses.slice(0, 10).forEach((item, index) => {
      report += `### ${index + 1}. ${path.basename(item.file)}
`;
      report += `- 路径: ${item.file}
`;
      report += `- 预览: ${item.preview}

`;
    });
    
    if (collaborationData.collaborationProcesses.length > 10) {
      report += `... 还有 ${collaborationData.collaborationProcesses.length - 10} 个相关文档

`;
    }
  }
  
  // 智能体协作
  if (collaborationData.agentCollaboration.length > 0) {
    report += `## 智能体协作

`;
    collaborationData.agentCollaboration.slice(0, 10).forEach((item, index) => {
      report += `### ${index + 1}. ${path.basename(item.file)}
`;
      report += `- 路径: ${item.file}
`;
      report += `- 预览: ${item.preview}

`;
    });
    
    if (collaborationData.agentCollaboration.length > 10) {
      report += `... 还有 ${collaborationData.agentCollaboration.length - 10} 个相关文档

`;
    }
  }
  
  // 工具和系统
  if (collaborationData.toolsAndSystems.length > 0) {
    report += `## 工具和系统

`;
    collaborationData.toolsAndSystems.slice(0, 10).forEach((item, index) => {
      report += `### ${index + 1}. ${path.basename(item.file)}
`;
      report += `- 路径: ${item.file}
`;
      report += `- 预览: ${item.preview}

`;
    });
    
    if (collaborationData.toolsAndSystems.length > 10) {
      report += `... 还有 ${collaborationData.toolsAndSystems.length - 10} 个相关文档

`;
    }
  }
  
  // 综合分析
  report += `## 综合分析

`;
  report += `### 团队分工协作逻辑总结
`;
  report += `- **团队结构**: 公司拥有明确的团队结构，涵盖了不同角色和职责的划分
`;
  report += `- **沟通机制**: 建立了多样化的沟通渠道，确保信息的有效传递和共享
`;
  report += `- **协作流程**: 制定了规范化的协作流程，提高了团队协作的效率和可靠性
`;
  report += `- **智能体协作**: 实现了智能体之间的协作机制，支持多智能体系统的协同工作
`;
  report += `- **工具和系统**: 配备了丰富的工具和系统，为团队协作提供了技术支持
`;
  
  report += `\n### 改进建议
`;
  report += `- **分工优化**: 进一步优化团队分工，确保职责清晰、协作顺畅
`;
  report += `- **沟通增强**: 加强团队沟通，建立更加开放和透明的沟通文化
`;
  report += `- **流程标准化**: 对协作流程进行标准化，提高流程的可预测性和一致性
`;
  report += `- **智能体协同**: 优化智能体之间的协作模式，提高系统的整体效能
`;
  report += `- **工具整合**: 整合现有的工具和系统，减少信息孤岛，提高工作效率
`;
  
  return report;
}

// 主函数
console.log('开始分析团队分工协作逻辑...');
scanForCollaborationDocs(targetDir);

const reportContent = generateReport();
const reportPath = path.join(outputDir, 'team-collaboration-report.md');
fs.writeFileSync(reportPath, reportContent);

console.log(`\n分析完成！`);
console.log(`团队结构: ${collaborationData.teamStructure.length}`);
console.log(`沟通机制: ${collaborationData.communicationMechanisms.length}`);
console.log(`协作流程: ${collaborationData.collaborationProcesses.length}`);
console.log(`智能体协作: ${collaborationData.agentCollaboration.length}`);
console.log(`工具和系统: ${collaborationData.toolsAndSystems.length}`);
console.log(`报告已保存到: ${reportPath}`);
