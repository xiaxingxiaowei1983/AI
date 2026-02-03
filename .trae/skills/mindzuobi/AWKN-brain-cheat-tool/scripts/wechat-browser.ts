#!/usr/bin/env bun
/**
 * 图文发表脚本
 */

import { chromium } from 'playwright';
import { sleep, waitForLogin, clickMenuByText } from './cddp.js';
import { readFileSync } from 'fs';
import { extractTitle, compressText } from './md-to-wechatt.js';

async function main() {
  const args = process.argv.slice(2);
  
  let title = '';
  let content = '';
  let images: string[] = [];
  let submit = false;

  // 解析参数
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--title') {
      title = args[++i];
    } else if (arg === '--content') {
      content = args[++i];
    } else if (arg === '--image') {
      images.push(args[++i]);
    } else if (arg === '--images') {
      const dir = args[++i];
      // 读取目录下的所有图片
      const { readdirSync } = await import('fs');
      const files = readdirSync(dir).filter(f => f.match(/\.(png|jpg|jpeg)$/i));
      images = files.map(f => `${dir}/${f}`);
    } else if (arg === '--markdown') {
      const markdown = args[++i];
      const md = readFileSync(markdown, 'utf-8');
      title = extractTitle(md) || '';
      content = md;
    } else if (arg === '--submit') {
      submit = true;
    }
  }

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

  // 点击"图文"菜单
  await clickMenuByText({ page }, '图文');

  // 填写标题
  if (title) {
    await page.fill('input[placeholder="请在这里输入标题"]', compressText(title, 20));
  }

  // 填写内容
  if (content) {
    await page.fill('.edui-editor-body', compressText(content, 1000));
  }

  // 上传图片
  for (const image of images) {
    // 点击上传按钮
    await page.click('.weui-desktop-uploader__file');
    await sleep(500);
    
    // 上传图片
    const input = await page.$('input[type="file"]');
    if (input) {
      await input.setInputFiles(image);
      await sleep(2000);
    }
  }

  // 保存为草稿或发布
  if (submit) {
    await page.click('.weui-desktop-btn_primary');
    console.log('[wechat] Saved as draft!');
  } else {
    console.log('[wechat] Preview mode, please save manually.');
  }

  // 不自动关闭浏览器，让用户检查
  console.log('[wechat] Please verify the content in the browser.');
  console.log('[wechat] Press Ctrl+C to exit.');
}

main().catch(console.error);
