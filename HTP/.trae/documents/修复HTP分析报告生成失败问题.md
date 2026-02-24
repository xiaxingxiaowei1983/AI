## 问题分析

图片插入成功但报告生成失败，核心原因是前端解析函数没从平台返回的内容中匹配到预设的Markdown报告格式，导致触发了兜底的"生成失败"提示。

## 修复计划

### 第一步：定位根因 - 打印平台返回的原始内容

在 `src/services/htpAnalysisService.ts` 文件的 `completeHTPWorkflow` 函数中，添加打印代码输出平台返回的原始内容：

```typescript
// 在这行代码后添加：const { report } = await analysisResponse.json();
const { report } = await analysisResponse.json();
console.log("🔍 平台返回原始内容：", report); // 新增这行，关键定位！
```

### 第二步：针对性修复

根据打印结果，采取以下修复方案：

#### 情况1：平台返回内容为空/乱码/错误提示
- 检查后端配置，确保平台能正常生成报告
- 验证 `VITE_BACKEND_BASE_URL` 配置是否正确

#### 情况2：平台返回正常报告但格式不匹配
- 修改 `parseReports` 函数中的正则表达式，使用更宽松的匹配规则：

```typescript
function parseReports(content: string) {
  // 宽松匹配专业报告（适配多种标题格式）
  const professionalReg = /#\s*📑?\s*HTP临床心理分析报告|#\s*房树人专业临床分析报告[\s\S]*?(---|#\s*🌟|$)/;
  const professionalReport = professionalReg.test(content)
    ? content.match(professionalReg)[0]
    : "✨ 暂未解析到画作特征，建议上传清晰的房树人画作（包含房、树、人核心元素），重新尝试吧～";

  // 宽松匹配用户报告（适配多种标题格式）
  const userReg = /#\s*🌟?\s*你的画，照见你的灵魂|#\s*心灵洞察报告[\s\S]*?(💡 分析师寄语|---|$)/;
  let userReport = userReg.test(content)
    ? content.match(userReg)[0]
    : "✨ 暂未解析到画作特征，建议上传清晰的房树人画作（包含房、树、人核心元素），重新尝试吧～";

  // 原有图片插入逻辑（完全保留）
  const extractCoreKeyword = (report: string) => {
    const allKeywords = Object.keys(KEYWORD_TO_GROUP);
    for (const keyword of allKeywords) {
      if (report.includes(keyword)) return keyword;
    }
    return '';
  };
  const coreKeyword = extractCoreKeyword(content);
  const targetImgGroup = coreKeyword ? HTP_PRE_IMAGES[KEYWORD_TO_GROUP[coreKeyword]] : DEFAULT_IMG_GROUP;
  const imgMarkdown = `
### 🖼️ 你的心灵视觉参考
> 基于你的画作特征，为你匹配专属视觉参考
${targetImgGroup.map(img => `![心灵参考](${img})`).join(' ')}
  `;
  userReport = `${userReport}\n${imgMarkdown}`;

  return [professionalReport, userReport];
}
```

### 第三步：验证修复结果

1. 重启前端开发服务器
2. 重新上传画作测试
3. 查看浏览器控制台输出，确认平台返回的原始内容
4. 验证页面是否正常显示：
   - 专业临床分析报告
   - 用户心灵洞察报告 + 3张预生成图片
   - 接口耗时是否缩短至3-5秒

## 预期结果

修复后，HTP分析MVP的核心流程（上传画作→平台分析→报告展示+图片插入）将完全跑通，用户可以正常看到完整的分析报告和相关图片。