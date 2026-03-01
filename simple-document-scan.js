// 简化版文档扫描脚本
const fs = require('fs');
const path = require('path');

const targetDir = 'C:\\Users\\10919\\Desktop\\AI';
const outputDir = path.join(targetDir, '.trae', 'documents');

// 确保输出目录存在
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const documents = [];
const categories = {
  rule: 0,
  technical: 0,
  process: 0,
  plan: 0,
  report: 0,
  config: 0,
  skill: 0,
  other: 0
};

function scanDir(dir) {
  try {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      
      if (item.isDirectory()) {
        // 跳过一些目录
        if (item.name === 'node_modules' || item.name === '.git' || item.name === 'dist') {
          continue;
        }
        scanDir(fullPath);
      } else if (item.isFile()) {
        const ext = path.extname(item.name).toLowerCase();
        if (ext === '.md' || ext === '.txt' || ext === '.json' || ext === '.js') {
          try {
            const content = fs.readFileSync(fullPath, 'utf8');
            const relativePath = path.relative(targetDir, fullPath);
            
            // 简单分类
            let category = 'other';
            const lowerContent = content.toLowerCase();
            const lowerName = item.name.toLowerCase();
            
            if (lowerContent.includes('规则') || lowerContent.includes('policy') || lowerName.includes('rule')) {
              category = 'rule';
            } else if (lowerContent.includes('技术') || lowerContent.includes('technical') || lowerName.includes('tech')) {
              category = 'technical';
            } else if (lowerContent.includes('流程') || lowerContent.includes('process')) {
              category = 'process';
            } else if (lowerContent.includes('计划') || lowerContent.includes('plan')) {
              category = 'plan';
            } else if (lowerContent.includes('报告') || lowerContent.includes('report')) {
              category = 'report';
            } else if (lowerContent.includes('配置') || lowerContent.includes('config')) {
              category = 'config';
            } else if (lowerContent.includes('技能') || lowerContent.includes('skill')) {
              category = 'skill';
            }
            
            categories[category]++;
            
            documents.push({
              filename: item.name,
              path: relativePath,
              category: category,
              size: content.length,
              lines: content.split('\n').length,
              preview: content.substring(0, 100) + (content.length > 100 ? '...' : '')
            });
            
            console.log(`[${category}] ${relativePath}`);
            
          } catch (err) {
            console.error(`读取文件失败: ${fullPath}`, err.message);
          }
        }
      }
    }
  } catch (err) {
    console.error(`扫描目录失败: ${dir}`, err.message);
  }
}

console.log('开始扫描文档...');
scanDir(targetDir);

// 生成报告
const report = {
  scanDate: new Date().toISOString(),
  totalDocuments: documents.length,
  categories: categories,
  documents: documents
};

// 保存JSON文件
const jsonPath = path.join(outputDir, 'document-inventory.json');
fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2));
console.log(`\nJSON报告已保存到: ${jsonPath}`);

// 生成Markdown报告
let mdContent = `# 文档资产盘点报告

## 盘点概览
- 盘点时间: ${report.scanDate}
- 总文档数: ${report.totalDocuments}

## 分类统计
`;

for (const [cat, count] of Object.entries(report.categories)) {
  if (count > 0) {
    mdContent += `- **${cat}**: ${count}\n`;
  }
}

mdContent += `\n## 文档列表\n\n`;

// 按分类分组
for (const [cat, count] of Object.entries(report.categories)) {
  if (count > 0) {
    mdContent += `### ${cat} (${count})\n\n`;
    const catDocs = documents.filter(d => d.category === cat);
    catDocs.forEach(doc => {
      mdContent += `#### ${doc.filename}\n`;
      mdContent += `- 路径: ${doc.path}\n`;
      mdContent += `- 大小: ${doc.size} 字节\n`;
      mdContent += `- 行数: ${doc.lines}\n`;
      mdContent += `- 预览: ${doc.preview}\n\n`;
    });
  }
}

const mdPath = path.join(outputDir, 'document-inventory-report.md');
fs.writeFileSync(mdPath, mdContent);
console.log(`Markdown报告已保存到: ${mdPath}`);

console.log('\n=== 盘点完成 ===');
console.log(`总文档数: ${report.totalDocuments}`);
console.log('分类统计:');
for (const [cat, count] of Object.entries(report.categories)) {
  if (count > 0) {
    console.log(`- ${cat}: ${count}`);
  }
}
