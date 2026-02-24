const https = require('https');

async function testArkApi() {
  console.log('=== 简化测试火山引擎Ark API ===\n');

  const options = {
    hostname: 'ark.cn-beijing.volces.com',
    path: '/api/v3/responses',
    method: 'POST',
    headers: {
      'Authorization': 'Bearer c13b2982-0aab-4c75-9404-0deb12a219ec',
      'Content-Type': 'application/json'
    }
  };

  const data = {
    "model": "doubao-seed-2-0-lite-260215",
    "input": [
      {
        "role": "user",
        "content": [
          {
            "type": "input_image",
            "image_url": "https://ark-project.tos-cn-beijing.volces.com/doc_image/ark_demo_img_1.png"
          },
          {
            "type": "input_text",
            "text": "你看见了什么？"
          }
        ]
      }
    ]
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let responseData = '';

      console.log('状态码:', res.statusCode);
      console.log('响应头:', res.headers);
      console.log('');

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        try {
          console.log('原始响应数据:');
          console.log(responseData.substring(0, 1000) + '...');
          console.log('');

          const parsedData = JSON.parse(responseData);
          console.log('解析后的响应:');
          console.log('模型:', parsedData.model);
          console.log('对象:', parsedData.object);
          console.log('使用情况:', parsedData.usage);
          console.log('');

          if (parsedData.output && parsedData.output.length > 0) {
            const textOutput = parsedData.output.find(item => 
              item.type === 'message' && item.content
            );

            if (textOutput && textOutput.content) {
              const textContent = textOutput.content.find(item => 
                item.type === 'output_text'
              );
              
              if (textContent) {
                console.log('文本响应:');
                console.log(textContent.text.substring(0, 500) + '...');
                console.log('');
              }
            }
          }

          resolve(parsedData);
        } catch (error) {
          console.error('响应解析失败:', error.message);
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      console.error('请求错误:', error.message);
      reject(error);
    });

    req.write(JSON.stringify(data));
    req.end();
  });
}

testArkApi()
  .then(() => {
    console.log('✅ 测试完成!');
  })
  .catch((error) => {
    console.error('❌ 测试失败:', error.message);
  });
