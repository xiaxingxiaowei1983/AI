const { OpenAI } = require('openai');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function generateMasterImage() {
  console.log('正在为大宗师生成个人形象...');
  
  try {
    // 生成形象描述
    const profileDescription = `专业、自信、智慧的中国男性领导者形象，40岁左右，穿着得体的商务休闲装，背景简约现代，光线柔和，表情自然，眼神坚定，适合作为个人品牌形象。`;
    
    console.log('形象描述:', profileDescription);
    
    // 生成头像
    console.log('正在生成头像...');
    const imageResponse = await openai.images.generate({
      model: 'dall-e-3',
      prompt: `${profileDescription}，高清，专业，适合作为微信头像，个人品牌形象，正面半身像，清晰的面部特征，自然的表情，高质量`,
      n: 1,
      size: '1024x1024',
      quality: 'hd'
    });
    
    const imageUrl = imageResponse.data[0].url;
    console.log('生成的头像URL:', imageUrl);
    
    // 生成个人简介
    console.log('正在生成个人简介...');
    const bioResponse = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: '你是一位专业的个人品牌顾问，擅长为成功人士创建简洁有力的个人简介。'
        },
        {
          role: 'user',
          content: '请为"大宗师"创建一个简洁、专业的微信个人简介（个性签名），体现智慧、领导力和专业素养。长度控制在1-2句，简洁有力，富有个性。'
        }
      ],
      temperature: 0.7,
      max_tokens: 100
    });
    
    const bio = bioResponse.choices[0].message.content.trim();
    console.log('生成的个人简介:', bio);
    
    // 保存结果
    const result = {
      name: '大宗师',
      avatar: imageUrl,
      bio: bio,
      personality: {
        tone: 'professional',
        formality: 'moderate',
        humor: 'subtle',
        interests: ['领导力', '创新', '科技', '战略']
      },
      appearance: {
        style: 'modern',
        colors: ['navy', 'gray', 'white'],
        elements: ['专业', '简约', '自信']
      },
      description: profileDescription
    };
    
    const outputPath = path.join(__dirname, 'master-profile.json');
    fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));
    console.log('形象信息已保存到:', outputPath);
    
    console.log('\n✅ 大宗师个人形象生成完成！');
    console.log('头像:', imageUrl);
    console.log('个性签名:', bio);
    
  } catch (error) {
    console.error('生成形象失败:', error);
  }
}

generateMasterImage();
