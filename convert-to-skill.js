const fs = require('fs');
const path = require('path');
const fsExtra = require('fs-extra');

// 分析结果路径
const ANALYSIS_RESULTS_PATH = path.join(__dirname, '.trae', 'analysis', 'cognitive_data_analysis.json');
// SKILL输出目录
const SKILL_OUTPUT_DIR = path.join(__dirname, 'skills', 'cognitive-models');

// 确保输出目录存在
fsExtra.ensureDirSync(SKILL_OUTPUT_DIR);

/**
 * 将认知数据转换为SKILL格式
 */
async function convertToSkill() {
  console.log('开始将认知数据转换为SKILL格式...');
  
  // 读取分析结果
  if (!fs.existsSync(ANALYSIS_RESULTS_PATH)) {
    console.error('错误: 分析结果文件不存在，请先运行 analyze-cognitive-data.js');
    return;
  }
  
  const analysisResults = JSON.parse(fs.readFileSync(ANALYSIS_RESULTS_PATH, 'utf8'));
  console.log(`读取分析结果: ${ANALYSIS_RESULTS_PATH}`);
  console.log(`发现 ${analysisResults.documents.length} 个分析文档`);
  console.log(`提取了 ${analysisResults.keyConcepts.length} 个关键概念`);
  
  // 为每个核心概念创建SKILL
  const skillCreationResults = {
    totalSkills: 0,
    createdSkills: [],
    errors: []
  };
  
  // 按照分类组织SKILL
  const categories = Object.keys(analysisResults.filesByCategory);
  
  for (const category of categories) {
    console.log(`\n处理分类: ${category}`);
    const categoryDir = path.join(SKILL_OUTPUT_DIR, category);
    fsExtra.ensureDirSync(categoryDir);
    
    // 获取该分类下的文档
    const categoryDocuments = analysisResults.documents.filter(doc => doc.category === category);
    console.log(`该分类下有 ${categoryDocuments.length} 个文档`);
    
    // 为每个文档创建SKILL
    for (const doc of categoryDocuments) {
      try {
        const skillPath = await createSkillFromDocument(doc, categoryDir);
        skillCreationResults.createdSkills.push(skillPath);
        skillCreationResults.totalSkills++;
        console.log(`✓ 成功创建SKILL: ${path.basename(skillPath)}`);
      } catch (error) {
        console.error(`✗ 创建SKILL失败: ${doc.filename}`);
        console.error(`  错误: ${error.message}`);
        skillCreationResults.errors.push({
          document: doc.filename,
          error: error.message
        });
      }
    }
  }
  
  // 创建概念汇总SKILL
  try {
    const conceptsSkillPath = await createConceptsSummarySkill(analysisResults, SKILL_OUTPUT_DIR);
    skillCreationResults.createdSkills.push(conceptsSkillPath);
    skillCreationResults.totalSkills++;
    console.log(`\n✓ 成功创建概念汇总SKILL`);
  } catch (error) {
    console.error(`\n✗ 创建概念汇总SKILL失败`);
    console.error(`  错误: ${error.message}`);
    skillCreationResults.errors.push({
      document: '概念汇总',
      error: error.message
    });
  }
  
  // 生成转换报告
  const reportPath = path.join(__dirname, '.trae', 'analysis', 'skill_conversion_report.json');
  fs.writeFileSync(reportPath, JSON.stringify(skillCreationResults, null, 2));
  
  console.log('\n转换完成!');
  console.log(`转换报告: ${reportPath}`);
  console.log(`\n摘要:`);
  console.log(`- 总创建SKILL数: ${skillCreationResults.totalSkills}`);
  console.log(`- 成功创建: ${skillCreationResults.createdSkills.length}`);
  console.log(`- 失败: ${skillCreationResults.errors.length}`);
  console.log(`- SKILL输出目录: ${SKILL_OUTPUT_DIR}`);
  
  return skillCreationResults;
}

/**
 * 从文档创建SKILL
 */
async function createSkillFromDocument(doc, outputDir) {
  // 生成SKILL名称（去除扩展名，替换特殊字符）
  const skillName = doc.filename.replace(/\.[^/.]+$/, "")
    .replace(/[\s\-\(\)（）:：]/g, '-')
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  
  // 创建SKILL目录
  const skillDir = path.join(outputDir, skillName);
  fsExtra.ensureDirSync(skillDir);
  
  // 生成SKILL内容
  const skillContent = generateSkillContent(doc);
  
  // 写入SKILL文件
  const skillPath = path.join(skillDir, 'SKILL.md');
  fs.writeFileSync(skillPath, skillContent);
  
  return skillPath;
}

/**
 * 生成SKILL内容
 */
function generateSkillContent(doc) {
  // 生成标签
  const tags = [doc.category.toLowerCase().replace(/\s+/g, '-')];
  if (doc.keyConcepts) {
    doc.keyConcepts.forEach(concept => {
      tags.push(concept.toLowerCase().replace(/\s+/g, '-'));
    });
  }
  
  // 生成SKILL内容
  let skillContent = `---
name: "${doc.filename.replace(/\.[^/.]+$/, "")}"
description: "从文档 '${doc.filename}' 提取的认知模型和理论。"
author: "Cognitive Model Generator"
tags:
`;
  
  // 添加标签
  tags.forEach(tag => {
    skillContent += `  - ${tag}
`;
  });
  
  skillContent += `version: "1.0.0"
---

# ${doc.filename.replace(/\.[^/.]+$/, "")}

## 文档信息

- **原始文档**: ${doc.filename}
- **分类**: ${doc.category}
- **内容长度**: ${doc.contentLength} 字符

## 核心概念

`;
  
  // 添加关键概念
  if (doc.keyConcepts && doc.keyConcepts.length > 0) {
    doc.keyConcepts.forEach(concept => {
      skillContent += `- ${concept}\n`;
    });
  } else {
    skillContent += `- 无明确关键概念\n`;
  }
  
  skillContent += `
## 理论摘要

${doc.summary || '无摘要可用'}

## 应用场景

### 1. 商业决策
- 可用于分析市场竞争态势
- 提供战略规划框架
- 支持创新方向选择

### 2. 个人发展
- 提升认知能力
- 培养系统思维
- 优化决策过程

### 3. 问题解决
- 提供结构化分析方法
- 支持复杂问题拆解
- 指导解决方案设计

## 实施方法

### 触发方式
- **直接调用**: 通过关键词触发相关理论
- **场景匹配**: 根据当前场景自动推荐适用理论
- **组合使用**: 多个理论协同分析复杂问题

### 期望输入
- **问题描述**: 清晰的问题陈述
- **上下文信息**: 相关背景和约束条件
- **目标**: 期望达到的结果

### 输出形式
- **理论分析**: 适用理论的详细分析
- **应用建议**: 具体的应用步骤
- **案例参考**: 相关案例和最佳实践

## 知识边界

### 适用范围
- ${doc.category}领域的问题分析
- 基于${doc.keyConcepts ? doc.keyConcepts.join('、') : '相关'}概念的思考

### 局限性
- 理论模型的简化假设
- 不同情境下的适用性差异
- 需要结合实际情况灵活应用

## 版本历史

### v1.0.0
- 初始版本
- 基于文档内容提取
- 包含核心概念和摘要
`;
  
  return skillContent;
}

/**
 * 创建概念汇总SKILL
 */
async function createConceptsSummarySkill(analysisResults, outputDir) {
  const skillDir = path.join(outputDir, 'concepts-summary');
  fsExtra.ensureDirSync(skillDir);
  
  // 生成SKILL内容
  let skillContent = `---
name: "认知模型概念汇总"
description: "从认知数据文件夹提取的所有关键概念汇总。"
author: "Cognitive Model Generator"
tags:
  - cognitive-models
  - concepts-summary
  - business-strategy
  - innovation
  - problem-solving
version: "1.0.0"
---

# 认知模型概念汇总

## 总体概况

- **来源文档数**: ${analysisResults.totalFiles}
- **成功分析文档数**: ${analysisResults.documents.length}
- **提取的关键概念数**: ${analysisResults.keyConcepts.length}

## 文档分类分布

`;
  
  // 添加分类分布
  for (const [category, count] of Object.entries(analysisResults.filesByCategory)) {
    skillContent += `- ${category}: ${count} 个文档\n`;
  }
  
  skillContent += `
## 文件类型分布

`;
  
  // 添加文件类型分布
  for (const [type, count] of Object.entries(analysisResults.filesByType)) {
    skillContent += `- ${type}: ${count} 个文件\n`;
  }
  
  skillContent += `
## 关键概念列表

`;
  
  // 添加关键概念
  analysisResults.keyConcepts.forEach(concept => {
    skillContent += `- ${concept}\n`;
  });
  
  skillContent += `
## 概念应用场景

### 1. 商业战略
- **波特五力模型**: 分析行业竞争结构
- **蓝海战略**: 创造无竞争市场空间
- **价值主张画布**: 设计产品和服务价值

### 2. 创新策略
- **创新**: 推动产品和服务升级
- **思维模型**: 提供创新思考框架
- **第一性原理**: 从基础原理出发思考

### 3. 风险管理
- **反脆弱**: 在不确定性中获益
- **系统思维**: 识别系统风险
- **概率思维**: 评估风险可能性

### 4. 管理策略
- **格鲁夫的偏执狂生存**: 保持危机意识
- **战略规划**: 制定长期发展方向
- **执行管理**: 确保战略落地

### 5. 问题解决
- **问题分析与解决**: 结构化分析方法
- **系统动力学**: 理解复杂系统行为
- **逻辑思维**: 理性分析问题

## 理论组合应用

### 1. 战略分析组合
- 波特五力模型 + 蓝海战略 + 价值主张画布
- 应用场景: 新业务方向选择

### 2. 创新管理组合
- 创新 + 第一性原理 + 反脆弱
- 应用场景: 产品创新流程

### 3. 风险决策组合
- 反脆弱 + 系统思维 + 概率思维
- 应用场景: 投资决策分析

## 实施方法

### 触发方式
- **概念查询**: 直接查询特定概念
- **场景推荐**: 根据场景推荐适用概念
- **组合分析**: 多个概念协同分析

### 期望输入
- **分析目标**: 明确的分析目的
- **问题描述**: 详细的问题陈述
- **约束条件**: 相关限制因素

### 输出形式
- **概念图谱**: 相关概念的关联关系
- **应用指南**: 具体的应用步骤
- **分析报告**: 综合分析结果

## 知识边界

### 专业领域
- 商业战略分析
- 创新管理
- 风险管理
- 问题解决
- 认知提升

### 非专业领域
- 具体技术实现
- 行业特定细节
- 个人情感决策

## 版本历史

### v1.0.0
- 初始版本
- 基于认知数据文件夹分析
- 包含所有提取的关键概念
`;
  
  // 写入SKILL文件
  const skillPath = path.join(skillDir, 'SKILL.md');
  fs.writeFileSync(skillPath, skillContent);
  
  return skillPath;
}

// 执行转换
if (require.main === module) {
  convertToSkill()
    .then(results => {
      console.log('转换完成!');
    })
    .catch(error => {
      console.error('转换失败:', error);
    });
}

module.exports = { convertToSkill };
