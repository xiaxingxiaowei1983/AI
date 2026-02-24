const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const fsExtra = require('fs-extra');

// 认知数据文件夹路径
const COGNITIVE_DATA_DIR = path.join(__dirname, '认知data');
// 分析结果输出路径
const ANALYSIS_OUTPUT_DIR = path.join(__dirname, '.trae', 'analysis');

// 确保输出目录存在
fsExtra.ensureDirSync(ANALYSIS_OUTPUT_DIR);

/**
 * 分析所有认知数据文档
 */
async function analyzeCognitiveData() {
  console.log('开始分析认知数据文件夹...');
  console.log(`分析目录: ${COGNITIVE_DATA_DIR}`);
  
  // 获取所有文件
  const files = fs.readdirSync(COGNITIVE_DATA_DIR);
  console.log(`发现 ${files.length} 个文件`);
  
  // 分析结果
  const analysisResults = {
    totalFiles: files.length,
    filesByType: {},
    filesByCategory: {},
    keyConcepts: [],
    documents: []
  };
  
  // 按文件类型分析
  for (const file of files) {
    const filePath = path.join(COGNITIVE_DATA_DIR, file);
    const stats = fs.statSync(filePath);
    
    if (stats.isFile()) {
      console.log(`分析文件: ${file}`);
      
      // 获取文件类型
      const ext = path.extname(file).toLowerCase();
      analysisResults.filesByType[ext] = (analysisResults.filesByType[ext] || 0) + 1;
      
      try {
        // 根据文件类型解析
        let content = '';
        switch (ext) {
          case '.pdf':
            content = await parsePDF(filePath);
            break;
          case '.docx':
            content = await parseDOCX(filePath);
            break;
          case '.txt':
            content = parseTXT(filePath);
            break;
          default:
            console.log(`不支持的文件类型: ${ext}`);
            continue;
        }
        
        // 分析文档内容
        const docAnalysis = analyzeDocument(file, content);
        analysisResults.documents.push(docAnalysis);
        
        // 分类统计
        const category = docAnalysis.category;
        analysisResults.filesByCategory[category] = (analysisResults.filesByCategory[category] || 0) + 1;
        
        // 提取关键概念
        if (docAnalysis.keyConcepts && docAnalysis.keyConcepts.length > 0) {
          analysisResults.keyConcepts.push(...docAnalysis.keyConcepts);
        }
        
        console.log(`✓ 成功分析: ${file}`);
        console.log(`  分类: ${docAnalysis.category}`);
        console.log(`  关键概念数: ${docAnalysis.keyConcepts ? docAnalysis.keyConcepts.length : 0}`);
        
      } catch (error) {
        console.error(`✗ 分析失败: ${file}`);
        console.error(`  错误: ${error.message}`);
      }
    }
  }
  
  // 去重关键概念
  analysisResults.keyConcepts = [...new Set(analysisResults.keyConcepts)];
  
  // 生成分析报告
  const reportPath = path.join(ANALYSIS_OUTPUT_DIR, 'cognitive_data_analysis.json');
  fs.writeFileSync(reportPath, JSON.stringify(analysisResults, null, 2));
  
  // 生成可读的分析报告
  const readableReportPath = path.join(ANALYSIS_OUTPUT_DIR, 'cognitive_data_analysis.md');
  generateReadableReport(analysisResults, readableReportPath);
  
  console.log('\n分析完成!');
  console.log(`分析报告: ${reportPath}`);
  console.log(`可读报告: ${readableReportPath}`);
  console.log(`\n摘要:`);
  console.log(`- 总文件数: ${analysisResults.totalFiles}`);
  console.log(`- 文件类型分布:`, analysisResults.filesByType);
  console.log(`- 分类分布:`, analysisResults.filesByCategory);
  console.log(`- 提取的关键概念数: ${analysisResults.keyConcepts.length}`);
  
  return analysisResults;
}

/**
 * 解析PDF文件
 */
async function parsePDF(filePath) {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdfParse(dataBuffer);
  return data.text;
}

/**
 * 解析DOCX文件
 */
async function parseDOCX(filePath) {
  const result = await mammoth.extractRawText({ path: filePath });
  return result.value;
}

/**
 * 解析TXT文件
 */
function parseTXT(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

/**
 * 分析单个文档
 */
function analyzeDocument(filename, content) {
  // 简化的文档分析
  const analysis = {
    filename,
    contentLength: content.length,
    category: '其他',
    keyConcepts: [],
    summary: ''
  };
  
  // 根据文件名和内容进行分类
  const lowerFilename = filename.toLowerCase();
  const lowerContent = content.toLowerCase();
  
  // 分类规则
  if (lowerFilename.includes('万维钢') || lowerFilename.includes('精英日课')) {
    analysis.category = '认知提升';
  } else if (lowerFilename.includes('波特') || lowerFilename.includes('五力')) {
    analysis.category = '商业战略';
    analysis.keyConcepts.push('波特五力模型');
  } else if (lowerFilename.includes('蓝海')) {
    analysis.category = '商业战略';
    analysis.keyConcepts.push('蓝海战略');
  } else if (lowerFilename.includes('价值主张')) {
    analysis.category = '商业战略';
    analysis.keyConcepts.push('价值主张画布');
  } else if (lowerFilename.includes('格鲁夫') || lowerFilename.includes('偏执狂')) {
    analysis.category = '管理策略';
    analysis.keyConcepts.push('格鲁夫的偏执狂生存');
  } else if (lowerFilename.includes('塔勒布') || lowerFilename.includes('反脆弱')) {
    analysis.category = '风险管理';
    analysis.keyConcepts.push('反脆弱');
  } else if (lowerFilename.includes('创新')) {
    analysis.category = '创新策略';
    analysis.keyConcepts.push('创新');
  } else if (lowerFilename.includes('营销')) {
    analysis.category = '营销策略';
    analysis.keyConcepts.push('营销理论');
  } else if (lowerFilename.includes('问题分析')) {
    analysis.category = '问题解决';
    analysis.keyConcepts.push('问题分析与解决');
  }
  
  // 提取关键概念
  const conceptKeywords = [
    '第一性原理', '波特五力', '蓝海战略', '价值主张', '反脆弱',
    '创新', '营销', '管理', '战略', '战术', '认知', '思维模型'
  ];
  
  for (const keyword of conceptKeywords) {
    if (lowerContent.includes(keyword.toLowerCase())) {
      analysis.keyConcepts.push(keyword);
    }
  }
  
  // 生成摘要
  analysis.summary = generateSummary(content);
  
  return analysis;
}

/**
 * 生成文档摘要
 */
function generateSummary(content) {
  // 简化的摘要生成
  const sentences = content.split(/[。！？.!?]/).filter(s => s.trim().length > 0);
  const firstFewSentences = sentences.slice(0, 3).join('。') + '。';
  return firstFewSentences;
}

/**
 * 生成可读的分析报告
 */
function generateReadableReport(analysisResults, outputPath) {
  let reportContent = `# 认知数据文件夹分析报告

## 总体统计
- **总文件数**: ${analysisResults.totalFiles}

## 文件类型分布
`;
  
  for (const [type, count] of Object.entries(analysisResults.filesByType)) {
    reportContent += `- ${type}: ${count} 个文件
`;
  }
  
  reportContent += `
## 分类分布
`;
  
  for (const [category, count] of Object.entries(analysisResults.filesByCategory)) {
    reportContent += `- ${category}: ${count} 个文件
`;
  }
  
  reportContent += `
## 提取的关键概念
`;
  
  analysisResults.keyConcepts.forEach(concept => {
    reportContent += `- ${concept}
`;
  });
  
  reportContent += `
## 文档详细分析
`;
  
  analysisResults.documents.forEach(doc => {
    reportContent += `
### ${doc.filename}
- **分类**: ${doc.category}
- **内容长度**: ${doc.contentLength} 字符
- **关键概念**: ${doc.keyConcepts.join(', ') || '无'}
- **摘要**: ${doc.summary}
`;
  });
  
  fs.writeFileSync(outputPath, reportContent);
}

// 执行分析
if (require.main === module) {
  analyzeCognitiveData()
    .then(results => {
      console.log('分析完成!');
    })
    .catch(error => {
      console.error('分析失败:', error);
    });
}

module.exports = { analyzeCognitiveData };
