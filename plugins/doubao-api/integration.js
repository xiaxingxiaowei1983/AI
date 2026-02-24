// 豆包API与OpenClaw和EVO的集成模块
const fs = require('fs');
const path = require('path');
const DoubaoAPI = require('./doubao-api');

class DoubaoIntegration {
    constructor() {
        this.config = this.loadConfig();
        this.doubaoAPI = new DoubaoAPI(this.config.api.key);
        this.teams = this.config.teams;
        this.cache = new Map();
    }

    /**
     * 加载配置文件
     * @returns {Object} 配置对象
     */
    loadConfig() {
        const configPath = path.join(__dirname, 'config.json');
        if (!fs.existsSync(configPath)) {
            throw new Error('Config file not found');
        }
        return JSON.parse(fs.readFileSync(configPath, 'utf8'));
    }

    /**
     * 初始化集成
     */
    async initialize() {
        console.log('=====================================');
        console.log('🦞 初始化豆包API集成');
        console.log('=====================================');

        // 测试API连接
        console.log('测试豆包API连接...');
        try {
            const testResponse = await this.doubaoAPI.sendTextMessage('你好，测试连接');
            console.log('✅ API连接测试成功:', testResponse.substring(0, 50) + '...');
        } catch (error) {
            console.error('❌ API连接测试失败:', error.message);
            throw error;
        }

        // 初始化OpenClaw集成
        if (this.config.openclaw.integration.enabled) {
            await this.initializeOpenClawIntegration();
        }

        // 初始化EVO集成
        if (this.config.evo.integration.enabled) {
            await this.initializeEvoIntegration();
        }

        console.log('✅ 豆包API集成初始化完成');
        console.log('=====================================');
    }

    /**
     * 初始化OpenClaw集成
     */
    async initializeOpenClawIntegration() {
        console.log('初始化OpenClaw集成...');
        
        // 这里可以添加OpenClaw的具体集成代码
        // 例如：注册新的智能体、更新配置等
        
        console.log('✅ OpenClaw集成初始化完成');
    }

    /**
     * 初始化EVO集成
     */
    async initializeEvoIntegration() {
        console.log('初始化EVO集成...');
        
        // 这里可以添加EVO的具体集成代码
        // 例如：注册节点、发布能力等
        
        console.log('✅ EVO集成初始化完成');
    }

    /**
     * 处理团队请求
     * @param {string} teamId - 团队ID
     * @param {Object} request - 请求数据
     * @returns {Promise<Object>} 响应结果
     */
    async handleTeamRequest(teamId, request) {
        // 验证团队权限
        const team = this.teams.find(t => t.id === teamId);
        if (!team) {
            throw new Error('Team not found');
        }

        // 验证请求权限
        if (request.type === 'image' && !team.permissions.includes('image_input')) {
            throw new Error('Team does not have permission for image input');
        }

        if (request.type === 'text' && !team.permissions.includes('text_input')) {
            throw new Error('Team does not have permission for text input');
        }

        // 处理请求
        let response;
        if (request.type === 'text') {
            response = await this.doubaoAPI.sendTextMessage(request.content);
        } else if (request.type === 'image') {
            response = await this.doubaoAPI.sendImageMessage(request.imageUrl, request.content);
        } else {
            throw new Error('Unsupported request type');
        }

        // 缓存结果
        this.cacheResponse(request, response);

        return {
            teamId,
            response,
            timestamp: new Date().toISOString(),
            model: this.doubaoAPI.defaultModel
        };
    }

    /**
     * 缓存响应结果
     * @param {Object} request - 请求数据
     * @param {string} response - 响应结果
     */
    cacheResponse(request, response) {
        if (!this.config.cache.enabled) return;

        const cacheKey = JSON.stringify(request);
        this.cache.set(cacheKey, {
            response,
            timestamp: Date.now()
        });

        // 清理过期缓存
        this.cleanupCache();
    }

    /**
     * 清理过期缓存
     */
    cleanupCache() {
        const now = Date.now();
        for (const [key, value] of this.cache.entries()) {
            if (now - value.timestamp > this.config.cache.ttl * 1000) {
                this.cache.delete(key);
            }
        }

        // 限制缓存大小
        if (this.cache.size > this.config.cache.maxSize) {
            const keys = Array.from(this.cache.keys());
            for (let i = 0; i < this.cache.size - this.config.cache.maxSize; i++) {
                this.cache.delete(keys[i]);
            }
        }
    }

    /**
     * 获取团队列表
     * @returns {Array} 团队列表
     */
    getTeams() {
        return this.teams;
    }

    /**
     * 获取模型信息
     * @returns {Array} 模型列表
     */
    getModels() {
        return this.config.models;
    }

    /**
     * 获取系统状态
     * @returns {Object} 系统状态
     */
    getStatus() {
        return {
            api: {
                endpoint: this.doubaoAPI.apiEndpoint,
                defaultModel: this.doubaoAPI.defaultModel
            },
            integration: {
                openclaw: this.config.openclaw.integration.enabled,
                evo: this.config.evo.integration.enabled
            },
            teams: this.teams.length,
            cache: {
                size: this.cache.size,
                enabled: this.config.cache.enabled
            },
            timestamp: new Date().toISOString()
        };
    }

    /**
     * 关闭集成
     */
    close() {
        console.log('=====================================');
        console.log('🦞 关闭豆包API集成');
        console.log('=====================================');
        console.log('✅ 豆包API集成已关闭');
        console.log('=====================================');
    }
}

// 导出模块
module.exports = DoubaoIntegration;

// 如果直接运行此文件
if (require.main === module) {
    async function main() {
        try {
            const integration = new DoubaoIntegration();
            await integration.initialize();
            console.log('\n系统状态:', integration.getStatus());
            
            // 测试团队请求
            console.log('\n测试前端团队文本请求...');
            const textResponse = await integration.handleTeamRequest('frontend', {
                type: 'text',
                content: '前端团队测试请求' 
            });
            console.log('✅ 文本请求测试成功:', textResponse.response.substring(0, 50) + '...');
            
            console.log('\n测试设计团队图片请求...');
            const imageResponse = await integration.handleTeamRequest('design', {
                type: 'image',
                imageUrl: 'https://ark-project.tos-cn-beijing.volces.com/doc_image/ark_demo_img_1.png',
                content: '设计团队测试图片分析' 
            });
            console.log('✅ 图片请求测试成功:', imageResponse.response.substring(0, 50) + '...');
            
            integration.close();
        } catch (error) {
            console.error('❌ 初始化失败:', error.message);
        }
    }
    
    main();
}
