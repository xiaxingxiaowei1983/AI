require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// 【全局配置】放在所有路由、中间件之前，优先级最高
// 设为5MB，足够覆盖550KB图片
app.use(express.json({ 
  limit: '5mb', // JSON请求体限制
  strict: false, // 兼容非严格JSON格式
  type: '*/*' // 解析所有Content-Type的JSON
})); 
app.use(express.urlencoded({ 
  extended: true, 
  limit: '5mb', // 表单请求体限制
  parameterLimit: 100000 // 参数数量限制（防止参数过多）
})); 

// 打印配置日志，确认生效
console.log('✅ 全局请求体限制已设为5MB');

// 中间件：允许跨域（前端localhost:5173调用后端3000）
app.use(cors({
  origin: '*', // 允许所有来源，生产环境应该设置具体的域名
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// 日志中间件
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// 火山配置（从后端.env读取）
const VOLC_CONFIG = {
  apiKey: process.env.ARK_API_KEY,
  analysisEndpointId: 'ep-20260206112909-d7b2f', // HTP多模态接入点ID
  imageEndpointId: process.env.ARK_IMAGE_ENDPOINT_ID || 'ep-20260205190056-98n96', // 文生图接入点ID
  chatUrl: `${process.env.ARK_API_BASE_URL}/chat/completions`,
  imageUrl: `${process.env.ARK_API_BASE_URL}/images/generations`
};

// 接口1：HTP分析（调用智能体A）
app.post('/api/htp/analyze', async (req, res) => {
  try {
    console.log('分析接口接收到的完整请求体:', req.body);
    console.log('分析接口接收到的参数名:', Object.keys(req.body));
    
    // 同时支持 imageBase64 和 image 参数
    const imageData = req.body.imageBase64 || req.body.image;
    const { age, gender } = req.body;
    console.log('分析接口接收到的图片数据:', { imageDataLength: imageData ? imageData.length : 0 });
    console.log('分析接口接收到的用户数据:', { age, gender });

    // 验证数据 - 明确的参数校验，返回400错误
    if (!imageData) {
      console.error('参数缺失:', { 
        imageBase64: req.body.imageBase64, 
        image: req.body.image 
      });
      return res.status(400).json({ 
        error: '缺少必要参数',
        details: `请提供imageBase64或image参数（当前收到的参数：${Object.keys(req.body).join(', ')}）`,
        status: 400
      });
    }

    // 验证用户数据参数
    const errors = [];
    if (!age || age.trim() === '') {
      errors.push('请填写真实年龄（房树人分析需结合年龄判断心理发展阶段）');
    }
    if (!gender || gender.trim() === '') {
      errors.push('请选择性别（房树人分析需结合性别差异评估心理特征）');
    }
    
    if (errors.length > 0) {
      console.error('用户数据缺失:', { age, gender });
      return res.status(400).json({ 
        error: '缺少必要的用户信息',
        details: errors.join('；'),
        status: 400
      });
    }

    // 验证图片尺寸
    try {
      // 从base64字符串中提取图片数据
      let base64Data = imageData;
      if (imageData.includes(',')) {
        console.log('📸 检测到图片数据包含前缀，正在处理...');
        base64Data = imageData.split(',')[1];
        console.log('📸 处理后图片数据长度:', base64Data.length);
      } else {
        console.log('📸 图片数据无前缀，直接使用');
        console.log('📸 图片数据长度:', base64Data.length);
      }
      console.log('📸 图片数据前50字符:', base64Data.substring(0, 50));
      
      if (!base64Data) {
        console.error('图片数据格式错误:', { base64Data: base64Data });
        return res.status(400).json({ 
          error: '图片数据格式错误',
          details: '图片数据为空或格式不正确',
          status: 400
        });
      }

      // 检查base64数据长度，简单判断图片尺寸
      // 14x14像素的PNG图片base64编码后至少需要约1000个字符
      if (base64Data.length < 1000) {
        console.error('图片尺寸太小:', { length: base64Data.length });
        return res.status(400).json({ 
          error: '图片尺寸太小',
          details: '请绘制更多内容，确保包含房子、树和人核心元素',
          status: 400
        });
      }
    } catch (error) {
      console.error('图片验证失败:', error);
      return res.status(400).json({ 
        error: '图片数据错误',
        details: '图片数据格式错误或尺寸太小，请重新绘制',
        status: 400
      });
    }

    // 构建请求数据
    // 智能清洗图片字符串 (修复核心冲突)
    // 确保有且仅有一个 data:image/png;base64, 前缀
    let finalImageUrl = imageData;
    if (!imageData.startsWith('data:image/')) {
      console.log('📸 检测到图片数据无前缀，正在添加...');
      // 只有当前端没传前缀时，后端才补 (双保险)
      finalImageUrl = `data:image/png;base64,${imageData}`;
      console.log('📸 添加前缀后图片数据长度:', finalImageUrl.length);
    } else {
      console.log('📸 图片数据已包含前缀，直接使用');
      console.log('📸 图片数据长度:', finalImageUrl.length);
    }
    console.log('📸 图片数据前100字符:', finalImageUrl.substring(0, 100));

    // 构建请求数据 - 直接调用API接入点，集成htp-insight技能分析流程
    const requestData = {
      model: VOLC_CONFIG.analysisEndpointId, // 直接使用API接入点ID
      stream: false,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: `请使用htp-insight技能分析这张房树人（HTP）绘画，按照完整流程执行：
1. 图像解析与特征提取：分析整体布局、线条与笔触、细节特征、整体印象
2. 基于心理学体系进行特征解读：参考HTP象征意义词典
3. 整体关系分析与综合整合：分析元素间关系、构图平衡
4. 多维度人格评估：整体布局、房子特征、树木特征、人物特征、技术特征
5. 风险评估：检查高风险或中风险指标
6. 生成双份报告：
   - 专业分析报告（Markdown格式）：详细系统的专业分析
   - 客户洞察报告（面向客户，简洁温暖）：深度洞察 + 行动建议 + 最后的邀请

作画者信息：${age}岁，性别${gender}。

请输出结构化JSON格式，包含：
- professionalReport：专业分析报告内容
- clientInsightReport：客户洞察报告内容
- risk_level：风险等级（low/medium/high）
- riskAssessment：风险评估详情`
            },
            {
              type: 'image_url',
              image_url: {
                url: finalImageUrl
              }
            }
          ]
        }
      ],
      // 限制Token防止输出过长
      max_tokens: 8192
    };

    console.log('向火山方舟发送的请求:', {
      url: VOLC_CONFIG.chatUrl,
      model: VOLC_CONFIG.analysisEndpointId,
      messageCount: requestData.messages.length,
      hasImage: requestData.messages[0].content.some(item => item.type === 'image_url')
    });

    // 后端调用火山智能体A（带提示词）
    console.log('向火山方舟发送的请求详细信息:', {
      model: VOLC_CONFIG.analysisEndpointId,
      hasImage: true,
      imageUrlLength: finalImageUrl.length,
      messageCount: requestData.messages.length
    });

    const response = await axios.post(
      VOLC_CONFIG.chatUrl,
      requestData,
      {
        headers: {
          'Authorization': `Bearer ${VOLC_CONFIG.apiKey}`,
          'Content-Type': 'application/json'
        },
        timeout: 180000 // 设置180秒超时（3分钟）
      }
    );

    console.log('火山方舟返回的响应:', {
      status: response.status,
      hasChoices: response.data.choices && response.data.choices.length > 0,
      choicesCount: response.data.choices ? response.data.choices.length : 0
    });

    // 过滤不需要的Markdown标题
    function filterMarkdownTitles(content) {
      // 移除"一、元素特征分析"等格式的标题
      let filteredContent = content;
      
      console.log('过滤前的内容:', {
        length: filteredContent.length,
        first100Chars: filteredContent.substring(0, 100)
      });
      
      // 移除"一、"、"二、"等格式的标题（包括前面可能有空格的情况）
      filteredContent = filteredContent.replace(/^\s*#{0,4}\s*[一二三四五六七八九十]+、.*$/gm, '');
      
      // 移除"元素特征分析"、"心理状态评估"等标题（包括前面可能有空格的情况）
      filteredContent = filteredContent.replace(/^\s*#{0,4}\s*(元素特征分析|心理状态评估|性格倾向|情绪风险|总结建议).*$/gm, '');
      
      // 移除HTML中的h4、h5标签包含的标题（更全面的匹配）
      filteredContent = filteredContent.replace(/<h[345][^>]*>.*?(一、|二、|三、|元素特征分析|心理状态评估|性格倾向|情绪风险|总结建议).*?<\/h[345]>/gi, '');
      
      // 移除HTML中的span标签包含的标题
      filteredContent = filteredContent.replace(/<span[^>]*>.*?(一、|二、|三、|元素特征分析|心理状态评估|性格倾向|情绪风险|总结建议).*?<\/span>/gi, '');
      
      // 移除HTML中的h5标签包含的小标题
      filteredContent = filteredContent.replace(/<h5[^>]*>\d+\.\s*.*?<\/h5>/gi, '');
      
      // 移除多余的空行
      filteredContent = filteredContent.replace(/\n{3,}/g, '\n\n');
      
      // 移除多余的空格
      filteredContent = filteredContent.replace(/\s{2,}/g, ' ');
      
      console.log('过滤后的内容:', {
        length: filteredContent.length,
        first100Chars: filteredContent.substring(0, 100)
      });
      
      return filteredContent.trim();
    }

    // 尝试解析智能体返回的JSON格式分析结果
    let analysisResult;
    try {
      // 首先检查返回内容是否已经是JSON格式
      const content = response.data.choices[0].message.content;
      console.log('智能体返回的原始内容:', {
        length: content.length,
        first100Chars: content.substring(0, 100)
      });
      
      // 尝试解析JSON
      analysisResult = JSON.parse(content);
      console.log('成功解析智能体返回的JSON结果:', {
        hasProfessionalReport: !!analysisResult.professionalReport,
        hasClientInsightReport: !!analysisResult.clientInsightReport,
        hasRiskLevel: !!analysisResult.risk_level,
        hasRiskAssessment: !!analysisResult.riskAssessment
      });
      
      // 检查是否是htp-insight技能格式
      if (analysisResult.clientInsightReport) {
        // 过滤clientInsightReport中的不需要标题
        const filteredReport = filterMarkdownTitles(analysisResult.clientInsightReport);
        const formattedResult = {
          ...analysisResult,
          clientInsightReport: filteredReport,
          // 确保所有必要字段都存在
          professionalReport: analysisResult.professionalReport || filteredReport,
          risk_level: analysisResult.risk_level || 'low',
          riskAssessment: analysisResult.riskAssessment || {
            level: 'low',
            indicators: [],
            suggestions: '无明显风险'
          }
        };
        console.log('使用htp-insight技能格式并过滤标题后的结果:', {
          length: filteredReport.length,
          first100Chars: filteredReport.substring(0, 100),
          riskLevel: formattedResult.risk_level
        });
        res.json(formattedResult);
      } else if (analysisResult.frontend_data) {
        // 兼容旧格式（包含frontend_data）
        const frontendData = analysisResult.frontend_data;
        let markdownContent = '';
        
        // 添加主标题和副标题
        if (frontendData.hero_section) {
          markdownContent += `# ${frontendData.hero_section.title}\n`;
          if (frontendData.hero_section.subtitle) {
            markdownContent += `## ${frontendData.hero_section.subtitle}\n\n`;
          }
          if (frontendData.hero_section.intro) {
            markdownContent += `${frontendData.hero_section.intro}\n\n`;
          }
        }
        
        // 添加叙事部分
        if (frontendData.narrative_sections) {
          frontendData.narrative_sections.forEach(section => {
            if (section.title) {
              markdownContent += `### ${section.title}\n`;
            }
            if (section.content) {
              markdownContent += `${section.content}\n\n`;
            }
            if (section.highlight_quote) {
              markdownContent += `> ${section.highlight_quote}\n\n`;
            }
          });
        }
        
        // 添加心理画像
        if (frontendData.psychological_portrait) {
          if (frontendData.psychological_portrait.title) {
            markdownContent += `### ${frontendData.psychological_portrait.title}\n`;
          }
          if (frontendData.psychological_portrait.content) {
            markdownContent += `${frontendData.psychological_portrait.content}\n\n`;
          }
        }
        
        // 添加行动建议
        if (frontendData.action_suggestions) {
          markdownContent += `### 行动建议\n`;
          frontendData.action_suggestions.forEach(suggestion => {
            if (suggestion.title) {
              markdownContent += `#### ${suggestion.title}\n`;
            }
            if (suggestion.content) {
              markdownContent += `${suggestion.content}\n\n`;
            }
          });
        }
        
        // 添加结论
        if (frontendData.conclusion) {
          if (frontendData.conclusion.text) {
            markdownContent += `## 结语\n${frontendData.conclusion.text}\n\n`;
          }
          if (frontendData.conclusion.signature) {
            markdownContent += `${frontendData.conclusion.signature}\n`;
          }
        }
        
        // 构建返回结果
        const formattedResult = {
          professionalReport: markdownContent,
          clientInsightReport: markdownContent,
          risk_level: 'low',
          riskAssessment: {
            level: 'low',
            indicators: [],
            suggestions: '无明显风险'
          }
        };
        console.log('使用旧格式转换后的Markdown结果:', {
          length: markdownContent.length,
          first100Chars: markdownContent.substring(0, 100)
        });
        res.json(formattedResult);
      } else {
        // 如果没有clientInsightReport字段，将整个对象转换为字符串
        const formattedResult = {
          professionalReport: JSON.stringify(analysisResult),
          clientInsightReport: JSON.stringify(analysisResult),
          risk_level: 'low',
          riskAssessment: {
            level: 'low',
            indicators: [],
            suggestions: '无明显风险'
          }
        };
        console.log('使用默认格式转换后的结果:', formattedResult);
        res.json(formattedResult);
      }
    } catch (error) {
      console.error('解析智能体返回结果失败:', error);
      // 如果解析失败，将原始文本内容包装成有效的JSON格式
      const originalContent = response.data.choices[0].message.content;
      // 过滤不需要的标题
      const filteredContent = filterMarkdownTitles(originalContent);
      const wrappedResult = {
        professionalReport: filteredContent,
        clientInsightReport: filteredContent,
        risk_level: 'low',
        riskAssessment: {
          level: 'low',
          indicators: [],
          suggestions: '无明显风险'
        }
      };
      console.log('使用包装后的结果:', {
        length: filteredContent.length,
        first100Chars: filteredContent.substring(0, 100)
      });
      res.json(wrappedResult);
    }
  } catch (error) {
    console.error('分析接口失败:', {
      message: error.message,
      status: error.response ? error.response.status : '无响应',
      data: error.response ? error.response.data : '无数据',
      config: error.config ? {
        url: error.config.url,
        method: error.config.method,
        headers: error.config.headers
      } : '无配置'
    });

    // 详细处理豆包API返回的错误
    if (error.response) {
      console.error('❌ 豆包 API 报错:', JSON.stringify(error.response.data, null, 2));
      
      // 根据错误类型返回不同的错误信息
      if (error.response.data.error) {
        const errorCode = error.response.data.error.code;
        const errorMessage = error.response.data.error.message;
        
        console.error('❌ 错误码:', errorCode);
        console.error('❌ 错误信息:', errorMessage);
        
        // 业务错误：返回500错误
        res.status(500).json({ 
          error: '分析失败',
          details: `豆包API错误: ${errorCode} - ${errorMessage}`,
          status: 500
        });
        return;
      }
    }
    
    // 其他错误：返回500错误
    res.status(500).json({ 
      error: '分析失败',
      details: error.message || '后端处理图片/调用AI时出错',
      status: 500
    });
  }
});

// 接口2：文生图接口已删除（MVP版使用预生成图片）
// 注：根据极简MVP方案，已删除所有动态生图相关代码
// 前端将使用预生成的3组9张图片，通过关键词匹配插入到报告中

// 根路径处理函数
app.get('/', (req, res) => {
  res.json({
    message: '后端服务运行正常',
    version: '1.0.0',
    endpoints: {
      analyze: '/api/htp/analyze'
    }
  });
});

// 启动后端服务
app.listen(PORT, () => {
  console.log(`✅ 后端服务已重启，运行在 http://localhost:${PORT}`);
  console.log(`✅ 请求体限制：JSON/表单均为5MB`);
});
