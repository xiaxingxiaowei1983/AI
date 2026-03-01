// 规则分析脚本
// 分析已盘点的规则文档，提取公司核心规则和运转逻辑

const fs = require('fs');
const path = require('path');

// 配置
const CONFIG = {
  inventoryFile: '.trae\\documents\\document-inventory.json',
  outputFile: '.trae\\documents\\company-rules.json',
  outputReport: '.trae\\documents\\company-rules-report.md',
  ruleKeywords: [
    '规则', 'policy', '策略', 'regulation', 'regulatory', 'standard', '标准',
    '流程', 'process', 'workflow', 'flow', 'procedure', '步骤',
    '运转', 'operation', '运行', '逻辑', 'logic', '机制', 'mechanism',
    '架构', 'architecture', 'structure', '结构', '系统', 'system'
  ]
};

// 规则数据库
const companyRules = {
  metadata: {
    analysisDate: new Date().toISOString(),
    totalRules: 0,
    categories: {}
  },
  coreRules: [],
  operationLogic: [],
  architecture: [],
  processes: []
};

function loadInventory() {
  try {
    const inventoryPath = path.join('C:\\Users\\10919\\Desktop\\AI', CONFIG.inventoryFile);
    const inventoryData = fs.readFileSync(inventoryPath, 'utf8');
    return JSON.parse(inventoryData);
  } catch (error) {
    console.error('加载盘点数据失败:', error.message);
    return null;
  }
}

function analyzeRules(inventory) {
  if (!inventory || !inventory.documents) {
    console.error('无效的盘点数据');
    return;
  }
  
  console.log('开始分析规则文档...');
  
  // 过滤规则相关文档
  const ruleDocs = inventory.documents.filter(doc => 
    doc.category === 'rule' || 
    doc.category === 'process' ||
    CONFIG.ruleKeywords.some(keyword => 
      doc.summary.toLowerCase().includes(keyword.toLowerCase()) ||
      doc.filename.toLowerCase().includes(keyword.toLowerCase())
    )
  );
  
  console.log(`找到 ${ruleDocs.length} 个规则相关文档`);
  
  // 分析每个规则文档
  ruleDocs.forEach(doc => {
    try {
      const fullPath = path.join('C:\\Users\\10919\\Desktop\\AI', doc.path);
      const content = fs.readFileSync(fullPath, 'utf8');
      
      analyzeDocument(doc, content);
      
    } catch (error) {
      console.error(`分析文件失败: ${doc.path}`, error.message);
    }
  });
  
  console.log('规则分析完成');
  console.log(`识别到 ${companyRules.coreRules.length} 条核心规则`);
  console.log(`识别到 ${companyRules.operationLogic.length} 条运转逻辑`);
  console.log(`识别到 ${companyRules.architecture.length} 条架构规则`);
  console.log(`识别到 ${companyRules.processes.length} 条流程规则`);
}

function analyzeDocument(doc, content) {
  const lowerContent = content.toLowerCase();
  
  // 分析核心规则
  if (lowerContent.includes('规则') || lowerContent.includes('policy') || 
      lowerContent.includes('策略') || lowerContent.includes('standard')) {
    const rule = {
      id: `rule_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      source: doc.path,
      category: 'core',
      title: doc.filename,
      content: extractRelevantContent(content, ['规则', 'policy', '策略', '标准']),
      confidence: calculateConfidence(content, ['规则', 'policy', '策略', '标准'])
    };
    companyRules.coreRules.push(rule);
    companyRules.metadata.totalRules++;
  }
  
  // 分析运转逻辑
  if (lowerContent.includes('运转') || lowerContent.includes('operation') || 
      lowerContent.includes('运行') || lowerContent.includes('逻辑') ||
      lowerContent.includes('mechanism')) {
    const logic = {
      id: `logic_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      source: doc.path,
      category: 'operation',
      title: doc.filename,
      content: extractRelevantContent(content, ['运转', 'operation', '运行', '逻辑', 'mechanism']),
      confidence: calculateConfidence(content, ['运转', 'operation', '运行', '逻辑', 'mechanism'])
    };
    companyRules.operationLogic.push(logic);
    companyRules.metadata.totalRules++;
  }
  
  // 分析架构规则
  if (lowerContent.includes('架构') || lowerContent.includes('architecture') || 
      lowerContent.includes('结构') || lowerContent.includes('system')) {
    const arch = {
      id: `arch_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      source: doc.path,
      category: 'architecture',
      title: doc.filename,
      content: extractRelevantContent(content, ['架构', 'architecture', '结构', 'system']),
      confidence: calculateConfidence(content, ['架构', 'architecture', '结构', 'system'])
    };
    companyRules.architecture.push(arch);
    companyRules.metadata.totalRules++;
  }
  
  // 分析流程规则
  if (lowerContent.includes('流程') || lowerContent.includes('process') || 
      lowerContent.includes('workflow') || lowerContent.includes('procedure')) {
    const process = {
      id: `process_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      source: doc.path,
      category: 'process',
      title: doc.filename,
      content: extractRelevantContent(content, ['流程', 'process', 'workflow', 'procedure']),
      confidence: calculateConfidence(content, ['流程', 'process', 'workflow', 'procedure'])
    };
    companyRules.processes.push(process);
    companyRules.metadata.totalRules++;
  }
}

function extractRelevantContent(content, keywords) {
  // 提取包含关键词的段落
  const paragraphs = content.split(/\n{2,}/);
  const relevantParagraphs = paragraphs.filter(para => 
    keywords.some(keyword => 
      para.toLowerCase().includes(keyword.toLowerCase())
    )
  );
  
  return relevantParagraphs.slice(0, 3).join('\n\n').substring(0, 500) + '...';
}

function calculateConfidence(content, keywords) {
  // 计算置信度
  let score = 0;
  const lowerContent = content.toLowerCase();
  
  keywords.forEach(keyword => {
    if (lowerContent.includes(keyword.toLowerCase())) {
      score++;
    }
  });
  
  return Math.min(1.0, score / keywords.length);
}

function generateReport() {
  // 确保输出目录存在
  const outputDir = path.dirname(path.join('C:\\Users\\10919\\Desktop\\AI', CONFIG.outputFile));
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // 生成JSON格式的规则数据库
  const jsonOutputPath = path.join('C:\\Users\\10919\\Desktop\\AI', CONFIG.outputFile);
  fs.writeFileSync(jsonOutputPath, JSON.stringify(companyRules, null, 2));
  console.log(`\n规则数据库已保存到: ${jsonOutputPath}`);
  
  // 生成Markdown格式的报告
  const mdOutputPath = path.join('C:\\Users\\10919\\Desktop\\AI', CONFIG.outputReport);
  const reportContent = generateMarkdownReport();
  fs.writeFileSync(mdOutputPath, reportContent);
  console.log(`规则分析报告已保存到: ${mdOutputPath}`);
}

function generateMarkdownReport() {
  let report = `# 公司规则与运转逻辑分析报告

## 分析概览
- 分析时间: ${companyRules.metadata.analysisDate}
- 总规则数: ${companyRules.metadata.totalRules}

## 规则分类
- **核心规则**: ${companyRules.coreRules.length}
- **运转逻辑**: ${companyRules.operationLogic.length}
- **架构规则**: ${companyRules.architecture.length}
- **流程规则**: ${companyRules.processes.length}

## 核心规则

`;
  
  if (companyRules.coreRules.length > 0) {
    companyRules.coreRules.forEach(rule => {
      report += `### ${rule.title}\n`;
      report += `- **来源**: ${rule.source}\n`;
      report += `- **置信度**: ${(rule.confidence * 100).toFixed(1)}%\n`;
      report += `- **内容**: ${rule.content}\n\n`;
    });
  } else {
    report += `无核心规则数据\n\n`;
  }
  
  report += `## 运转逻辑

`;
  
  if (companyRules.operationLogic.length > 0) {
    companyRules.operationLogic.forEach(logic => {
      report += `### ${logic.title}\n`;
      report += `- **来源**: ${logic.source}\n`;
      report += `- **置信度**: ${(logic.confidence * 100).toFixed(1)}%\n`;
      report += `- **内容**: ${logic.content}\n\n`;
    });
  } else {
    report += `无运转逻辑数据\n\n`;
  }
  
  report += `## 架构规则

`;
  
  if (companyRules.architecture.length > 0) {
    companyRules.architecture.forEach(arch => {
      report += `### ${arch.title}\n`;
      report += `- **来源**: ${arch.source}\n`;
      report += `- **置信度**: ${(arch.confidence * 100).toFixed(1)}%\n`;
      report += `- **内容**: ${arch.content}\n\n`;
    });
  } else {
    report += `无架构规则数据\n\n`;
  }
  
  report += `## 流程规则

`;
  
  if (companyRules.processes.length > 0) {
    companyRules.processes.forEach(process => {
      report += `### ${process.title}\n`;
      report += `- **来源**: ${process.source}\n`;
      report += `- **置信度**: ${(process.confidence * 100).toFixed(1)}%\n`;
      report += `- **内容**: ${process.content}\n\n`;
    });
  } else {
    report += `无流程规则数据\n\n`;
  }
  
  // 生成综合分析
  report += `## 综合分析

`;
  report += `### 系统运转逻辑总结
`;
  report += `- **核心规则**: 公司拥有 ${companyRules.coreRules.length} 条核心规则，涵盖了业务运营的基本准则\n`;
  report += `- **运转逻辑**: 识别出 ${companyRules.operationLogic.length} 条运转逻辑，描述了系统的运行机制\n`;
  report += `- **架构规则**: 分析了 ${companyRules.architecture.length} 条架构规则，定义了系统的结构和组织方式\n`;
  report += `- **流程规则**: 梳理了 ${companyRules.processes.length} 条流程规则，规范了业务操作的步骤和顺序\n`;
  
  report += `\n### 改进建议
`;
  report += `- **规则整合**: 建议将分散的规则文档整合为统一的规则体系，提高规则的可访问性和一致性\n`;
  report += `- **逻辑明确**: 进一步明确系统的运转逻辑，确保所有组件都能按照预期协同工作\n`;
  report += `- **流程优化**: 对现有流程进行优化，提高业务操作的效率和可靠性\n`;
  report += `- **架构调整**: 根据业务发展需求，适时调整系统架构，确保系统的可扩展性和灵活性\n`;
  
  return report;
}

// 主函数
function main() {
  console.log('开始分析公司规则与运转逻辑...');
  
  const inventory = loadInventory();
  if (!inventory) {
    console.error('无法加载盘点数据，分析终止');
    return;
  }
  
  analyzeRules(inventory);
  generateReport();
  
  console.log('\n🎉 规则分析完成！');
}

// 执行
if (require.main === module) {
  main();
}

module.exports = {
  analyzeRules,
  generateReport,
  companyRules
};
