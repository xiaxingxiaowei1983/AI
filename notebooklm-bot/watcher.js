const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');
const { NotebookLMAutomator, generateSmartPrompt, isFileProcessed, addToHistory } = require('./index');

// ================= 配置区域 =================
const CONFIG = {
    // 监控的文件夹
    watchFolder: path.join(__dirname, 'watch'),
    // 处理历史记录
    historyFile: path.join(__dirname, 'history.json'),
    // 监控间隔
    watchInterval: 1000
};

// ================= 监控功能 =================

class FolderWatcher {
    constructor() {
        this.watcher = null;
        this.isProcessing = false;
        this.queue = [];
    }

    // 初始化监控
    init() {
        console.log('正在初始化文件夹监控...');
        
        // 确保监控目录存在
        if (!fs.existsSync(CONFIG.watchFolder)) {
            fs.mkdirSync(CONFIG.watchFolder, { recursive: true });
            console.log(`📁 创建监控目录: ${CONFIG.watchFolder}`);
        }

        // 创建文件监控器
        this.watcher = chokidar.watch(CONFIG.watchFolder, {
            ignored: /(^|\/\.)(\..|node_modules|downloads|history\.json)$/,
            persistent: true,
            ignoreInitial: true,
            awaitWriteFinish: {
                stabilityThreshold: 2000,
                pollInterval: 100
            }
        });

        // 监听文件添加事件
        this.watcher.on('add', (filePath) => {
            this.handleNewFile(filePath);
        });

        // 监听文件变化事件
        this.watcher.on('change', (filePath) => {
            this.handleFileChange(filePath);
        });

        // 监听错误事件
        this.watcher.on('error', (error) => {
            console.error('监控错误:', error);
        });

        console.log(`✅ 文件夹监控已启动，监控目录: ${CONFIG.watchFolder}`);
        console.log('📂 现在可以向该目录添加文件，系统会自动处理');
    }

    // 处理新文件
    async handleNewFile(filePath) {
        // 检查是否是文件
        const stats = fs.statSync(filePath);
        if (!stats.isFile()) {
            return;
        }

        // 检查文件是否已处理
        if (isFileProcessed(filePath)) {
            console.log(`📋 文件已处理过: ${path.basename(filePath)}`);
            return;
        }

        // 检查文件大小（避免处理过大的文件）
        const fileSize = stats.size;
        const maxFileSize = 50 * 1024 * 1024; // 50MB
        if (fileSize > maxFileSize) {
            console.log(`⚠️  文件过大 (${(fileSize / (1024 * 1024)).toFixed(2)}MB)，跳过处理: ${path.basename(filePath)}`);
            addToHistory(filePath, 'skipped', '文件过大');
            return;
        }

        // 检查文件类型
        const fileExt = path.extname(filePath).toLowerCase();
        const allowedExts = ['.txt', '.md', '.docx', '.pdf', '.doc'];
        if (!allowedExts.includes(fileExt)) {
            console.log(`⚠️  不支持的文件类型 (${fileExt})，跳过处理: ${path.basename(filePath)}`);
            addToHistory(filePath, 'skipped', '文件类型不支持');
            return;
        }

        console.log(`📥 发现新文件: ${path.basename(filePath)}`);
        console.log(`📊 文件大小: ${(fileSize / 1024).toFixed(2)}KB`);

        // 添加到处理队列
        this.queue.push(filePath);
        console.log(`📋 添加到处理队列，当前队列长度: ${this.queue.length}`);

        // 处理队列
        await this.processQueue();
    }

    // 处理文件变化
    async handleFileChange(filePath) {
        console.log(`🔄 文件发生变化: ${path.basename(filePath)}`);
        // 可以在这里添加文件变化的处理逻辑
        // 例如：重新处理文件
    }

    // 处理队列
    async processQueue() {
        if (this.isProcessing || this.queue.length === 0) {
            return;
        }

        this.isProcessing = true;

        while (this.queue.length > 0) {
            const filePath = this.queue.shift();
            console.log(`🚀 开始处理队列中的文件: ${path.basename(filePath)}`);
            
            try {
                await this.processFile(filePath);
            } catch (error) {
                console.error(`❌ 处理文件时出错: ${error.message}`);
                addToHistory(filePath, 'error', error.message);
            }

            // 处理完成后等待一段时间，避免连续处理导致系统负载过高
            await new Promise(resolve => setTimeout(resolve, 5000));
        }

        this.isProcessing = false;
        console.log('✅ 队列处理完成');
    }

    // 处理单个文件
    async processFile(filePath) {
        console.log(`📄 开始处理文件: ${path.basename(filePath)}`);
        
        try {
            // 生成智能提示词
            console.log('🧠 正在生成智能提示词...');
            const smartPrompt = await generateSmartPrompt(filePath);
            console.log('💡 智能提示词生成完成');
            
            // 运行自动化
            const automator = new NotebookLMAutomator();
            const success = await automator.run(filePath, smartPrompt);
            
            if (success) {
                console.log('🎉 文件处理成功！');
                addToHistory(filePath, 'success');
            } else {
                console.log('❌ 文件处理失败！');
                addToHistory(filePath, 'failed');
            }
        } catch (error) {
            console.error(`❌ 处理文件时出错: ${error.message}`);
            addToHistory(filePath, 'error', error.message);
        }
    }

    // 停止监控
    stop() {
        if (this.watcher) {
            this.watcher.close();
            console.log('🛑 文件夹监控已停止');
        }
    }
}

// ================= 主函数 =================

async function main() {
    console.log('🚀 启动 NotebookLM 文件夹监控服务...');
    console.log(`📅 启动时间: ${new Date().toLocaleString()}`);
    console.log('=' . repeat(60));
    
    // 初始化监控
    const watcher = new FolderWatcher();
    watcher.init();
    
    // 处理现有文件
    console.log('🔍 扫描监控目录中的现有文件...');
    const files = fs.readdirSync(CONFIG.watchFolder);
    
    for (const file of files) {
        const filePath = path.join(CONFIG.watchFolder, file);
        const stats = fs.statSync(filePath);
        
        if (stats.isFile()) {
            await watcher.handleNewFile(filePath);
        }
    }
    
    console.log('✅ 初始扫描完成');
    console.log('=' . repeat(60));
    console.log('📢 服务已启动，正在监控文件夹...');
    console.log('💡 提示: 按 Ctrl+C 停止服务');
    
    // 保持进程运行
    process.on('SIGINT', () => {
        console.log('\n📢 正在停止服务...');
        watcher.stop();
        console.log('✅ 服务已停止');
        process.exit(0);
    });
}

// 运行主函数
if (require.main === module) {
    main().catch(console.error);
}

// 导出模块
module.exports = FolderWatcher;
