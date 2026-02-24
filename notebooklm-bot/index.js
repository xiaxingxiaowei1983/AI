const axios = require('axios');
const puppeteer = require('puppeteer');
const chokidar = require('chokidar');
const fs = require('fs');
const path = require('path');

// ================= 配置区域 =================
const CONFIG = {
    openclawApiUrl: 'http://127.0.0.1:18789/api/v1',
    notebooklmUrl: 'https://notebooklm.google.com',
    // 监控的文件夹（有新文件就自动上传）
    watchFolder: path.join(__dirname, 'documents'),
    // 下载文件夹
    downloadFolder: path.join(__dirname, 'downloads')
};

// 确保文件夹存在
if (!fs.existsSync(CONFIG.watchFolder)) {
    fs.mkdirSync(CONFIG.watchFolder, { recursive: true });
}
if (!fs.existsSync(CONFIG.downloadFolder)) {
    fs.mkdirSync(CONFIG.downloadFolder, { recursive: true });
}

// ================= 核心功能 =================

class NotebookLMAutomator {
    constructor() {
        this.browser = null;
        this.page = null;
    }

    // 1. 初始化浏览器
    async init() {
        console.log('正在启动浏览器...');
        this.browser = await puppeteer.launch({ 
            headless: false, // 设为 true 则后台运行
            defaultViewport: null,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        this.page = await this.browser.newPage();
        
        // 设置下载路径
        await this.page._client.send('Page.setDownloadBehavior', {
            behavior: 'allow',
            downloadPath: CONFIG.downloadFolder
        });
    }

    // 2. 登录并访问 NotebookLM
    async loginAndAccess() {
        console.log('正在访问 NotebookLM...');
        await this.page.goto(CONFIG.notebooklmUrl, { waitUntil: 'networkidle2' });
        
        // 等待用户登录
        console.log('请在浏览器中登录 Google 账号...');
        console.log('登录完成后按 Enter 键继续...');
        
        // 等待用户输入
        await new Promise(resolve => {
            process.stdin.once('data', resolve);
        });
        
        console.log('已进入 NotebookLM 主页');
    }

    // 3. 上传文件并生成内容
    async processFile(filePath, prompt = '请总结这份文档的核心内容') {
        console.log(`正在处理文件: ${filePath}`);
        
        try {
            // 点击 "New Project"
            console.log('正在创建新项目...');
            await this.page.waitForSelector('button', { timeout: 30000 });
            
            // 查找包含 "New Project" 或类似文本的按钮
            const buttons = await this.page.$$('button');
            let newProjectButton = null;
            
            for (const button of buttons) {
                const text = await button.textContent();
                if (text.includes('New') || text.includes('新建') || text.includes('创建')) {
                    newProjectButton = button;
                    break;
                }
            }
            
            if (newProjectButton) {
                await newProjectButton.click();
            } else {
                console.log('未找到 "New Project" 按钮，尝试其他方式...');
            }

            // 等待上传区域出现
            await this.page.waitForTimeout(3000);

            // 上传文件
            console.log('正在上传文件...');
            const fileInput = await this.page.$('input[type="file"]');
            if (fileInput) {
                await fileInput.uploadFile(filePath);
            } else {
                // 尝试拖放区域
                console.log('尝试通过拖放上传...');
                const dropZone = await this.page.$('[data-testid="drop-zone"]') || await this.page.$('.drop-zone');
                if (dropZone) {
                    await dropZone.hover();
                    // 模拟拖放
                    await this.page.evaluate((path) => {
                        const file = new File([], path);
                        const event = new DragEvent('drop', {
                            dataTransfer: {
                                files: [file],
                                types: ['Files'],
                                getData: () => path
                            },
                            bubbles: true,
                            cancelable: true
                        });
                        document.dispatchEvent(event);
                    }, filePath);
                }
            }

            // 等待上传完成
            console.log('等待上传完成...');
            await this.page.waitForTimeout(10000); // 根据文件大小调整

            // 输入提示词并发送
            console.log('正在生成内容...');
            const textarea = await this.page.$('textarea[placeholder*="Ask"]') || await this.page.$('textarea[placeholder*="询问"]');
            if (textarea) {
                await textarea.fill(prompt);
                await textarea.press('Enter');
            }

            // 等待生成完成
            console.log('等待内容生成完成...');
            await this.page.waitForTimeout(15000); // 根据内容复杂度调整
            
            console.log('内容生成完毕');
        } catch (error) {
            console.error('处理文件时出错:', error);
        }
    }

    // 4. 下载结果
    async downloadResult() {
        console.log('正在下载结果...');
        try {
            // 尝试找到下载/导出按钮
            const buttons = await this.page.$$('button');
            let exportButton = null;
            
            for (const button of buttons) {
                const text = await button.textContent();
                if (text.includes('Export') || text.includes('导出') || text.includes('Download') || text.includes('下载')) {
                    exportButton = button;
                    break;
                }
            }
            
            if (exportButton) {
                await exportButton.click();
                await this.page.waitForTimeout(5000);
                console.log('下载完成');
            } else {
                console.log('未找到下载按钮');
            }
        } catch (error) {
            console.error('下载结果时出错:', error);
        }
    }

    // 5. 主流程
    async run(filePath) {
        try {
            await this.init();
            await this.loginAndAccess();
            await this.processFile(filePath);
            await this.downloadResult();
        } catch (error) {
            console.error('自动化过程出错:', error);
        } finally {
            // 保持浏览器打开，或关闭：await this.browser.close();
            console.log('自动化流程已完成');
        }
    }

    // 6. 关闭浏览器
    async close() {
        if (this.browser) {
            await this.browser.close();
        }
    }
}

// ================= OpenClaw 集成 =================

async function callOpenClaw(task) {
    try {
        const response = await axios.post(`${CONFIG.openclawApiUrl}/chat`, {
            message: task
        });
        return response.data;
    } catch (error) {
        console.error('调用 OpenClaw 失败:', error);
        return null;
    }
}

// ================= 文件监控 =================

function startFileWatcher() {
    console.log(`开始监控文件夹: ${CONFIG.watchFolder}`);
    
    const watcher = chokidar.watch(CONFIG.watchFolder, {
        ignored: /(^|\/\.)(\.|node_modules|downloads)/,
        persistent: true,
        ignoreInitial: true
    });

    watcher
        .on('add', async (filePath) => {
            console.log(`检测到新文件: ${filePath}`);
            
            // 处理新文件
            try {
                const bot = new NotebookLMAutomator();
                await bot.run(filePath);
                await bot.close();
            } catch (error) {
                console.error('处理新文件时出错:', error);
            }
        })
        .on('error', (error) => {
            console.error('监控错误:', error);
        });

    console.log('文件监控已启动，按 Ctrl+C 停止');
}

// ================= 启动机器人 =================

// 示例：处理单个文件
const args = process.argv.slice(2);
if (args.length > 0) {
    // 处理命令行指定的文件
    const filePath = args[0];
    const bot = new NotebookLMAutomator();
    bot.run(filePath).catch(console.error);
} else {
    // 启动文件监控
    startFileWatcher();
}

// 优雅关闭
process.on('SIGINT', async () => {
    console.log('正在关闭机器人...');
    process.exit(0);
});

console.log('NotebookLM 自动化机器人已启动!');
console.log(`监控文件夹: ${CONFIG.watchFolder}`);
console.log(`下载文件夹: ${CONFIG.downloadFolder}`);
