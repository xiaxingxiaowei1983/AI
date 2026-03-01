// 文档资产盘点脚本
// 扫描指定目录下的所有文档文件，分类整理并生成资产清单

const fs = require('fs');
const path = require('path');

// 配置
const CONFIG = {
  targetDir: 'C:\\Users\\10919\\Desktop\\AI',
  outputFile: '.trae\\documents\\document-inventory.json',
  outputReport: '.trae\\documents\\document-inventory-report.md',
  documentExtensions: [
    '.md', '.txt', '.json', '.js', '.ts', '.jsx', '.tsx',
    '.html', '.css', '.scss', '.yml', '.yaml', '.xml',
    '.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx'
  ],
  ignoreDirs: [
    'node_modules', '.git', 'dist', 'build', 'coverage',
    '*.log', '*.tmp', '*.temp'
  ],
  categories: {
    rule: ['rule', '规则', 'policy', '策略', 'regulation', 'regulatory'],
    technical: ['tech', '技术', 'technical', '架构', 'architecture', 'code', '代码'],
    process: ['process', '流程', 'workflow', 'flow', 'procedure', '步骤'],
    plan: ['plan', '计划', '规划', 'scheme', 'program', 'project'],
    report: ['report', '报告', 'analysis', '分析', 'summary', '总结'],
    config: ['config', '配置', 'setting', 'setting', 'option', '选项'],
    skill: ['skill', '技能', '能力', 'capability', 'competence'],
    other: []
  }
};

// 文档资产数据库
const documentInventory = {
  metadata: {
    scanDate: new Date().toISOString(),
    targetDir: CONFIG.targetDir,
    totalDocuments: 0,
    categories: {}
  },
  documents: []
};

// 工具函数
function shouldIgnore(dirPath) {
  const basename = path.basename(dirPath);
  return CONFIG.ignoreDirs.some(ignore => 
    basename === ignore || basename.match(new RegExp(ignore.replace(/\*/g, '.*')))
  );
}

function isDocumentFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return CONFIG.documentExtensions.includes(ext);
}

function categorizeDocument(filename, content) {
  const lowerName = filename.toLowerCase();
  const lowerContent = content.toLowerCase();
  
  for (const [category, keywords] of Object.entries(CONFIG.categories)) {
    if (keywords.some(keyword => 
      lowerName.includes(keyword) || lowerContent.includes(keyword)
    )) {
      return category;
    }
  }
  
  return 'other';
}

function generateSummary(content, maxLength = 200) {
  // 移除代码块和特殊格式
  let cleaned = content.replace(/```[\s\S]*?```/g, '');
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n');
  cleaned = cleaned.replace(/\s+/g, ' ').trim();
  
  return cleaned.length > maxLength ? cleaned.substring(0, maxLength) + '...' : cleaned;
}

function scanDirectory(dirPath) {
  console.log(`扫描目录: ${dirPath}`);
  
  const items = fs.readdirSync(dirPath, { withFileTypes: true });
  
  for (const item of items) {
    const itemPath = path.join(dirPath, item.name);
    
    if (item.isDirectory()) {
      if (!shouldIgnore(itemPath)) {
        scanDirectory(itemPath);
      }
    } else if (item.isFile() && isDocumentFile(itemPath)) {
      processDocument(itemPath);
    }
  }
}

function processDocument(filePath) {
  try {
    const relativePath = path.relative(CONFIG.targetDir, filePath);
    const stats = fs.statSync(filePath);
    const content = fs.readFileSync(filePath, 'utf8').toString();
    
    const category = categorizeDocument(path.basename(filePath), content);
    const summary = generateSummary(content);
    
    const document = {
      id: `doc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      filename: path.basename(filePath),
      path: relativePath,
      fullPath: filePath,
      category: category,
      extension: path.extname(filePath),
      size: stats.size,
      created: stats.birthtime.toISOString(),
      modified: stats.mtime.toISOString(),
      summary: summary,
      wordCount: content.split(/\s+/).length,
      lineCount: content.split('\n').length
    };
    
    documentInventory.documents.push(document);
    documentInventory.metadata.totalDocuments++;
    
    // 更新分类统计
    documentInventory.metadata.categories[category] = 
      (documentInventory.metadata.categories[category] || 0) + 1;
    
    console.log(`[${category}] ${relativePath}`);
    
  } catch (error) {
    console.error(`处理文件时出错: ${filePath}`, error.message);
  }
}

function generateReport() {
  // 确保输出目录存在
  const outputDir = path.dirname(path.join(CONFIG.targetDir, CONFIG.outputFile));
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // 生成JSON格式的资产清单
  const jsonOutputPath = path.join(CONFIG.targetDir, CONFIG.outputFile);
  fs.writeFileSync(jsonOutputPath, JSON.stringify(documentInventory, null, 2));
  console.log(`\n资产清单已保存到: ${jsonOutputPath}`);
  
  // 生成Markdown格式的报告
  const mdOutputPath = path.join(CONFIG.targetDir, CONFIG.outputReport);
  const reportContent = generateMarkdownReport();
  fs.writeFileSync(mdOutputPath, reportContent);
  console.log(`报告已保存到: ${mdOutputPath}`);
  
  // 生成统计信息
  console.log('\n=== 盘点统计 ===');
  console.log(`总文档数: ${documentInventory.metadata.totalDocuments}`);
  console.log('分类统计:');
  for (const [category, count] of Object.entries(documentInventory.metadata.categories)) {
    console.log(`- ${category}: ${count}`);
  }
}

function generateMarkdownReport() {
  let report = `# 文档资产盘点报告

## 盘点概览
- 盘点时间: ${documentInventory.metadata.scanDate}
- 盘点目录: ${documentInventory.metadata.targetDir}
- 总文档数: ${documentInventory.metadata.totalDocuments}

## 分类统计
`;
  
  for (const [category, count] of Object.entries(documentInventory.metadata.categories)) {
    report += `- **${category}**: ${count} (${((count / documentInventory.metadata.totalDocuments) * 100).toFixed(1)}%)
`;
  }
  
  report += `
## 文档详情

`;
  
  // 按分类分组显示文档
  for (const [category, count] of Object.entries(documentInventory.metadata.categories)) {
    if (count === 0) continue;
    
    report += `### ${category} (${count})
`;
    report += `| 文件名 | 路径 | 大小 | 修改时间 | 摘要 |
`;
    report += `|-------|------|------|----------|------|
`;
    
    const categoryDocs = documentInventory.documents.filter(doc => doc.category === category);
    categoryDocs.forEach(doc => {
      report += `| ${doc.filename} | ${doc.path} | ${(doc.size / 1024).toFixed(2)}KB | ${new Date(doc.modified).toLocaleString()} | ${doc.summary} |
`;
    });
    
    report += `
`;
  }
  
  // 生成规则和运转逻辑相关文档的特殊部分
  const ruleDocs = documentInventory.documents.filter(doc => 
    doc.category === 'rule' || 
    doc.summary.includes('规则') || 
    doc.summary.includes('运转') || 
    doc.summary.includes('逻辑')
  );
  
  if (ruleDocs.length > 0) {
    report += `## 规则与运转逻辑相关文档

`;
    report += `| 文件名 | 路径 | 分类 | 摘要 |
`;
    report += `|-------|------|------|------|
`;
    
    ruleDocs.forEach(doc => {
      report += `| ${doc.filename} | ${doc.path} | ${doc.category} | ${doc.summary} |
`;
    });
  }
  
  return report;
}

// 主函数
function main() {
  console.log('开始文档资产盘点...');
  console.log(`目标目录: ${CONFIG.targetDir}`);
  
  try {
    scanDirectory(CONFIG.targetDir);
    generateReport();
    console.log('\n🎉 文档资产盘点完成！');
  } catch (error) {
    console.error('盘点过程中发生错误:', error);
  }
}

// 执行
if (require.main === module) {
  main();
}

module.exports = {
  scanDirectory,
  generateReport,
  documentInventory
};
