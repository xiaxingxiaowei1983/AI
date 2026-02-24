# 修改htp-insight-agent-prompt.md和项目代码

## 任务概述
根据用户的要求，修改`htp-insight-agent-prompt.md`文件和项目代码，使其符合新的工作流程结构。

## 具体修改内容

### 1. 修改htp-insight-agent-prompt.md文件
- 更新工作流程，移除智能配图生成流程
- 修改输出格式，使用professionalReport和clientInsightReport
- 确保风险评估流程正确
- 移除与图片生成相关的内容

### 2. 修改htp-insight-workflow.md文件
- 更新工作流程图，移除智能配图生成步骤
- 修改工作流程描述，使其符合新的结构
- 更新输出格式说明

### 3. 检查并修改项目代码
- **src/types/index.ts**：已正确配置，无需修改
- **src/services/htpAnalysisService.ts**：已正确配置，无需修改
- **src/services/skillService.ts**：检查并确保使用正确的字段
- **backend/server.js**：检查并确保正确处理新的输出格式

### 4. 验证修改
- 确保所有文件都符合新的工作流程结构
- 确保代码能够正确处理新的输出格式
- 确保智能体提示词与工作流程一致

## 预期结果
修改后的文件和代码将符合用户要求的工作流程结构，包括：
1. 智能体没有生成图片的流程
2. 生成分析结果包括专业报告和客户洞察报告
3. 匹配预生成图片的流程
4. 提供专业报告的功能

## 执行顺序
1. 修改htp-insight-agent-prompt.md文件
2. 修改htp-insight-workflow.md文件
3. 检查并修改src/services/skillService.ts文件
4. 检查并修改backend/server.js文件
5. 验证所有修改是否正确