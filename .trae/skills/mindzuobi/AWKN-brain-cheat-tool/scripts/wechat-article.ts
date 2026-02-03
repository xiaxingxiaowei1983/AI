#!/usr/bin/env bun
/**
 * 文章发表脚本
 */

import { chromium } from 'playwright';
import { sleep, waitForLogin, clickMenuByText } from './cddp.js';
import { markdownToWechatHtml, extractTitle } from './md-to-wechatt.js';
import { readFileSync } from 'fs';

async function main() {
  const args = process.argv.slice(2);
  
  let markdownPath = '';
  let title = '';
  let author = '宝玉';
  let summary = '';
  let theme: 'default' | 'grace' | 'simple' = 'default';
  let submit = false;

  // 解析参数
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--markdown') {
      markdownPath = args[++i];
    } else if (arg === '--title') {
      title = args[++i];
    } else if (arg === '--author') {
      author = args[++i];
    } else if (arg === '--summary') {
      summary = args[++i];
    } else if (arg === '--theme') {
      theme = args[++i] as any;
    } else if (arg === '--submit') {
      submit = true;
    }
  }

  // 读取 Markdown
  const markdown = readFileSync(markdownPath, 'utf-8');
  
  // 提取标题
  if (!title) {
    title = extractTitle(markdown) || '未命名文章';
  }

  // 转换为 HTML
  const html = markdownToWechatHtml(markdown, theme);

  // 启动浏览器
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // 打开微信公众号
  await page.goto('https://mp.weixin.qq.com/');

  console.log('[wechat] Please scan QR code to login...');

  // 等待登录
  const loggedIn = await waitForLogin({ page });
  if (!loggedIn) {
    console.error('[wechat] Login timeout!');
    await browser.close();
    process.exit(1);
  }

  console.log('[wechat] Logged in!');

  // 点击"文章"菜单
  await clickMenuByText({ page }, '文章');

  // 填写标题
  await page.fill('input[placeholder="请在这里输入标题"]', title);

  // 填写作者
  await page.fill('input[placeholder="作者"]', author);

  // 填写摘要
  if (summary) {
    await page.fill('textarea[placeholder="请在这里输入摘要"]', summary);
  }

  // 粘贴 HTML 内容
  await page.click('.edui-editor-body');
  await page.keyboard.type(html);

  // 处理图片占位符
  const placeholders = html.match(/\[\[IMAGE_PLACEHOLDER_(\d+)\]\]/g) || [];
  for (const placeholder of placeholders) {
    const num = placeholder.replace(/\D/g, '');
    
    // 查找占位符文本
    await page.click(`text=${placeholder}`);
    await sleep(500);
    
    // 删除占位符
    await page.keyboard.press('Backspace');
    
    // 上传图片（需要用户手动选择）
    console.log(`[wechat] Please upload image for placeholder ${num}`);
    await sleep(5000);
  }

  // 保存为草稿或发布
  if (submit) {
    await page.click('.weui-desktop-btn_primary');
    console.log('[wechat] Saved as draft!');
  } else {
    console.log('[wechat] Preview mode, please save manually.');
  }

  // 不自动关闭浏览器
  console.log('[wechat] Please verify content in browser.');
  console.log('[wechat] Press Ctrl+C to exit.');
}

main().catch(console.error);
