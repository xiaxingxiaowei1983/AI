#!/usr/bin/env bun
/**
 * Chrome CDP 工具
 */

import type { Page } from 'puppeteer-core';

export async function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function evaluate<T>(session: { page: Page }, expression: string): Promise<T> {
  return await session.page.evaluate(expression) as T;
}

/**
 * 等待登录
 */
export async function waitForLogin(session: { page: Page }, timeoutMs = 120_000): Promise<boolean> {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    const url = await evaluate<string>(session, 'window.location.href');
    if (url.includes('/cgi-bin/home')) return true;
    await sleep(2000);
  }
  return false;
}

/**
 * 点击菜单
 */
export async function clickMenuByText(session: { page: Page }, text: string): Promise<void> {
  console.log(`[wechat] Clicking "${text}" menu...`);

  const pos = await session.page.evaluate((menuText: string) => {
    const items = document.querySelectorAll('.new-creation__menu .new-creation__menu-item');
    for (const item of items) {
      const title = item.querySelector('.new-creation__menu-title');
      if (title && title.textContent?.trim() === menuText) {
        item.scrollIntoView({ block: 'center' });
        const rect = item.getBoundingClientRect();
        return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
      }
    }
    return null;
  }, text);

  if (!pos) {
    throw new Error(`Menu "${text}" not found`);
  }

  await session.page.mouse.click(pos.x, pos.y);
  await sleep(500);
}
