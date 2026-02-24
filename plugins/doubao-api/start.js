// 启动豆包API集成服务
const DoubaoIntegration = require('./integration');

// 创建集成实例
const integration = new DoubaoIntegration();

// 启动集成
async function startIntegration() {
    console.log('=====================================');
    console.log('🚀 启动豆包API集成服务');
    console.log('=====================================');

    try {
        // 初始化集成
        await integration.initialize();

        // 显示系统状态
        console.log('\n📋 系统状态:');
        console.log(JSON.stringify(integration.getStatus(), null, 2));

        // 显示团队信息
        console.log('\n👥 团队配置:');
        console.log(JSON.stringify(integration.getTeams(), null, 2));

        // 显示模型信息
        console.log('\n🤖 模型配置:');
        console.log(JSON.stringify(integration.getModels(), null, 2));

        console.log('\n=====================================');
        console.log('✅ 豆包API集成服务启动成功');
        console.log('📡 服务已就绪，等待团队请求');
        console.log('=====================================');

        // 保持服务运行
        process.stdin.resume();

        // 处理终止信号
        process.on('SIGINT', () => {
            console.log('\n🔄 关闭服务...');
            integration.close();
            process.exit(0);
        });

        process.on('SIGTERM', () => {
            console.log('\n🔄 关闭服务...');
            integration.close();
            process.exit(0);
        });

    } catch (error) {
        console.error('❌ 启动失败:', error.message);
        process.exit(1);
    }
}

// 启动服务
startIntegration();
