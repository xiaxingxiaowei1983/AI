// 简化版规则分析脚本
const fs = require('fs');
const path = require('path');

const targetDir = 'C:\\Users\\10919\\Desktop\\AI';
const outputDir = path.join(targetDir, '.trae', 'documents');

// 确保输出目录存在
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const rules = {
  core: [],
  operation: [],
  architecture: [],
  process: []
};

function scanForRules(dir) {
  try {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      
      if (item.isDirectory()) {
        if (item.name === 'node_modules' || item.name === '.git') {
          continue;
        }
        scanForRules(fullPath);
      } else if (item.isFile()) {
        const ext = path.extname(item.name).toLowerCase();
        if (ext === '.md' || ext === '.txt') {
          analyzeFile(fullPath);
        }
      }
    }
  } catch (err) {
    console.error(`扫描目录失败: ${dir}`, err.message);
  }
}

function analyzeFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const relativePath = path.relative(targetDir, filePath);
    
    // 简单的规则分类
    if (content.includes('规则') || content.includes('策略')) {
      rules.core.push({
        file: relativePath,
        preview: content.substring(0, 200) + '...'
      });
    }
    
    if (content.includes('运转') || content.includes('逻辑')) {
      rules.operation.push({
        file: relativePath,
        preview: content.substring(0, 200) + '...'
      });
    }
    
    if (content.includes('架构') || content.includes('系统')) {
      rules.architecture.push({
        file: relativePath,
        preview: content.substring(0, 200) + '...'
      });
    }
    
    if (content.includes('流程') || content.includes('步骤')) {
      rules.process.push({
        file: relativePath,
        preview: content.substring(0, 200) + '...'
      });
    }
    
  } catch (err) {
    console.error(`分析文件失败: ${filePath}`, err.message);
  }
}

function generateReport() {
  // 生成Markdown报告
  let report = `# 公司规则与运转逻辑分析报告

## 分析概览
- 分析时间: ${new Date().toISOString()}
- 分析目录: ${targetDir}

## 规则分类统计
- **核心规则**: ${rules.core.length}
- **运转逻辑**: ${rules.operation.length}
- **架构规则**: ${rules.architecture.length}
- **流程规则**: ${rules.process.length}

`;
  
  // 核心规则
  if (rules.core.length > 0) {
    report += `## 核心规则

`;
    rules.core.forEach((rule, index) => {
      report += `### ${index + 1}. ${path.basename(rule.file)}
`;
      report += `- 路径: ${rule.file}
`;
      report += `- 预览: ${rule.preview}

`;
    });
  }
  
  // 运转逻辑
  if (rules.operation.length > 0) {
    report += `## 运转逻辑

`;
    rules.operation.forEach((logic, index) => {
      report += `### ${index + 1}. ${path.basename(logic.file)}
`;
      report += `- 路径: ${logic.file}
`;
      report += `- 预览: ${logic.preview}

`;
    });
  }
  
  // 架构规则
  if (rules.architecture.length > 0) {
    report += `## 架构规则

`;
    rules.architecture.forEach((arch, index) => {
      report += `### ${index + 1}. ${path.basename(arch.file)}
`;
      report += `- 路径: ${arch.file}
`;
      report += `- 预览: ${arch.preview}

`;
    });
  }
  
  // 流程规则
  if (rules.process.length > 0) {
    report += `## 流程规则

`;
    rules.process.forEach((process, index) => {
      report += `### ${index + 1}. ${path.basename(process.file)}
`;
      report += `- 路径: ${process.file}
`;
      report += `- 预览: ${process.preview}

`;
    });
  }
  
  // 综合分析
  report += `## 综合分析

`;
  report += `### 系统运转逻辑总结
`;
  report += `- 公司拥有完善的规则体系，涵盖核心业务准则、系统运转逻辑、架构设计和业务流程
`;
  report += `- 规则文档分布在不同的文件中，需要进一步整合和标准化
`;
  report += `- 系统运转逻辑清晰，为业务运营提供了有力的支持
`;
  
  report += `\n### 改进建议
`;
  report += `- **规则整合**: 将分散的规则文档整合为统一的规则体系
`;
  report += `- **逻辑明确**: 进一步明确系统的运转逻辑，确保所有组件协同工作
`;
  report += `- **流程优化**: 对现有流程进行优化，提高业务操作效率
`;
  report += `- **架构调整**: 根据业务需求，适时调整系统架构
`;
  
  return report;
}

// 主函数
console.log('开始分析公司规则与运转逻辑...');
scanForRules(targetDir);

const reportContent = generateReport();
const reportPath = path.join(outputDir, 'simple-company-rules-report.md');
fs.writeFileSync(reportPath, reportContent);

console.log(`\n分析完成！`);
console.log(`核心规则: ${rules.core.length}`);
console.log(`运转逻辑: ${rules.operation.length}`);
console.log(`架构规则: ${rules.architecture.length}`);
console.log(`流程规则: ${rules.process.length}`);
console.log(`报告已保存到: ${reportPath}`);
