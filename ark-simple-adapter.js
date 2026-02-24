const https = require('https');

class ArkSimpleAdapter {
  constructor() {
    this.apiKey = 'c13b2982-0aab-4c75-9404-0deb12a219ec';
    this.model = 'doubao-seed-2-0-code-preview-260215';
  }

  // 发送请求到Ark API
  async request(body) {
    return new Promise((resolve, reject) => {
      const options = {
        hostname: 'ark.cn-beijing.volces.com',
        port: 443,
        path: '/api/v3/chat/completions',
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      };

      const req = https.request(options, (res) => {
        let responseData = '';

        res.on('data', (chunk) => {
          responseData += chunk;
        });

        res.on('end', () => {
          try {
            const parsedData = JSON.parse(responseData);
            resolve(parsedData);
          } catch (error) {
            reject(new Error(`响应解析失败: ${error.message}`));
          }
        });
      });

      req.on('error', (error) => {
        reject(error);
      });

      req.write(JSON.stringify(body));
      req.end();
    });
  }

  // 生成文本响应
  async generateText(messages) {
    const body = {
      model: this.model,
      messages: messages.map(msg => ({
        role: msg.role,
        content: msg.content.map(item => {
          if (item.type === 'text') {
            return {
              text: item.text,
              type: 'text'
            };
          } else if (item.type === 'image') {
            return {
              image_url: {
                url: item.image_url
              },
              type: 'image_url'
            };
          }
          return item;
        })
      }))
    };

    const response = await this.request(body);

    // 提取文本响应
    if (response.choices && response.choices.length > 0) {
      const choice = response.choices[0];
      if (choice.message && choice.message.content) {
        return {
          text: choice.message.content,
          usage: response.usage,
          model: response.model
        };
      }
    }

    throw new Error('No text response found');
  }

  // 生成图像描述
  async describeImage(imageUrl, prompt = '你看见了什么？') {
    return this.generateText([
      {
        role: 'user',
        content: [
          {
            type: 'image',
            image_url: imageUrl
          },
          {
            type: 'text',
            text: prompt
          }
        ]
      }
    ]);
  }

  // 简单的文本生成
  async chat(text) {
    return this.generateText([
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: text
          }
        ]
      }
    ]);
  }
}

// 导出单例
module.exports = new ArkSimpleAdapter();
module.exports.ArkSimpleAdapter = ArkSimpleAdapter;
