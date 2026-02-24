// 火山引擎豆包API集成模块
const https = require('https');

class DoubaoAPI {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.apiEndpoint = 'https://ark.cn-beijing.volces.com/api/v3/responses';
        this.defaultModel = 'doubao-seed-2-0-lite-260215';
    }

    /**
     * 发送请求到豆包API
     * @param {Object} input - 输入数据
     * @param {string} model - 模型名称
     * @returns {Promise<Object>} 响应结果
     */
    async sendRequest(input, model = this.defaultModel) {
        const body = JSON.stringify({
            model,
            input: [input]
        });

        const options = {
            hostname: 'ark.cn-beijing.volces.com',
            path: '/api/v3/responses',
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(body)
            }
        };

        return new Promise((resolve, reject) => {
            const req = https.request(options, (res) => {
                let responseBody = '';
                
                res.on('data', (d) => {
                    responseBody += d;
                });
                
                res.on('end', () => {
                    try {
                        const result = JSON.parse(responseBody);
                        resolve(result);
                    } catch (error) {
                        reject(new Error('Failed to parse response: ' + error.message));
                    }
                });
            });

            req.on('error', (e) => {
                reject(new Error('API request failed: ' + e.message));
            });

            req.write(body);
            req.end();
        });
    }

    /**
     * 发送文本消息
     * @param {string} text - 文本内容
     * @param {string} model - 模型名称
     * @returns {Promise<string>} 响应文本
     */
    async sendTextMessage(text, model = this.defaultModel) {
        const input = {
            role: 'user',
            content: [
                {
                    type: 'input_text',
                    text
                }
            ]
        };

        const response = await this.sendRequest(input, model);
        return this.extractTextResponse(response);
    }

    /**
     * 发送图片+文本消息
     * @param {string} imageUrl - 图片URL
     * @param {string} text - 文本内容
     * @param {string} model - 模型名称
     * @returns {Promise<string>} 响应文本
     */
    async sendImageMessage(imageUrl, text, model = this.defaultModel) {
        const input = {
            role: 'user',
            content: [
                {
                    type: 'input_image',
                    image_url: imageUrl
                },
                {
                    type: 'input_text',
                    text
                }
            ]
        };

        const response = await this.sendRequest(input, model);
        return this.extractTextResponse(response);
    }

    /**
     * 从API响应中提取文本
     * @param {Object} response - API响应
     * @returns {string} 提取的文本
     */
    extractTextResponse(response) {
        if (response.output && Array.isArray(response.output)) {
            for (const item of response.output) {
                if (item.type === 'message' && item.role === 'assistant' && item.content) {
                    for (const contentItem of item.content) {
                        if (contentItem.type === 'output_text' && contentItem.text) {
                            return contentItem.text;
                        }
                    }
                }
            }
        }
        return 'No text response found';
    }

    /**
     * 获取模型信息
     * @returns {Object} 模型信息
     */
    getModelInfo() {
        return {
            name: this.defaultModel,
            description: '火山引擎豆包多模态模型',
            capabilities: {
                textInput: true,
                imageInput: true,
                videoInput: true,
                textOutput: true,
                imageOutput: false,
                videoOutput: false
            }
        };
    }
}

// 导出模块
module.exports = DoubaoAPI;
