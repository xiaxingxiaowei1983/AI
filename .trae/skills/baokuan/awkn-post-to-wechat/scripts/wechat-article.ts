import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import process from 'node:process';
import { launchChrome, getPageSession, waitForNewTab, clickElement, typeText, evaluate, sleep, type ChromeSession, type CdpConnection } from './cdp.ts';

const WECHAT_URL = 'https://mp.weixin.qq.com/';

interface ImageInfo {
  placeholder: string;
  localPath: string;
  originalPath: string;
}

interface ArticleOptions {
  title: string;
  content?: string;
  htmlFile?: string;
  markdownFile?: string;
  theme?: string;
  author?: string;
  summary?: string;
  images?: string[];
  contentImages?: ImageInfo[];
  submit?: boolean;
  profileDir?: string;
}

async function waitForLogin(session: ChromeSession, timeoutMs = 120_000): Promise<boolean> {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    const url = await evaluate<string>(session, 'window.location.href');
    if (url.includes('/cgi-bin/home')) return true;
    await sleep(2000);
  }
  return false;
}

async function clickMenuByText(session: ChromeSession, text: string): Promise<void> {
  console.log(`[wechat] Clicking "${text}" menu...`);
  const posResult = await session.cdp.send<{ result: { value: string } }>('Runtime.evaluate', {
    expression: `
      (function() {
        const items = document.querySelectorAll('.new-creation__menu .new-creation__menu-item');
        for (const item of items) {
          const title = item.querySelector('.new-creation__menu-title');
          if (title && title.textContent?.trim() === '${text}') {
            item.scrollIntoView({ block: 'center' });
            const rect = item.getBoundingClientRect();
            return JSON.stringify({ x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 });
          }
        }
        return 'null';
      })()
    `,
    returnByValue: true,
  }, { sessionId: session.sessionId });

  if (posResult.result.value === 'null') throw new Error(`Menu "${text}" not found`);
  const pos = JSON.parse(posResult.result.value);

  await session.cdp.send('Input.dispatchMouseEvent', { type: 'mousePressed', x: pos.x, y: pos.y, button: 'left', clickCount: 1 }, { sessionId: session.sessionId });
  await sleep(100);
  await session.cdp.send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: pos.x, y: pos.y, button: 'left', clickCount: 1 }, { sessionId: session.sessionId });
}

async function copyImageToClipboard(imagePath: string): Promise<void> {
  const scriptDir = path.dirname(new URL(import.meta.url).pathname);
  const copyScript = path.join(scriptDir, './copy-to-clipboard.ts');
  const result = spawnSync('npx', ['-y', 'bun', copyScript, 'image', imagePath], { stdio: 'inherit' });
  if (result.status !== 0) throw new Error(`Failed to copy image: ${imagePath}`);
}

async function pasteInEditor(session: ChromeSession): Promise<void> {
  // 使用更可靠的粘贴方式
  const modifiers = process.platform === 'darwin' ? 4 : 2;
  
  // 方式1：直接发送粘贴事件
  try {
    await session.cdp.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'v', code: 'KeyV', modifiers, windowsVirtualKeyCode: 86 }, { sessionId: session.sessionId });
    await sleep(100);
    await session.cdp.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'v', code: 'KeyV', modifiers, windowsVirtualKeyCode: 86 }, { sessionId: session.sessionId });
    await sleep(500); // 等待粘贴完成
  } catch (error) {
    console.error(`[wechat] Paste failed via CDP: ${error}`);
    
    // 方式2：如果CDP失败，回退到系统命令
    console.log('[wechat] Retrying with system paste command...');
    if (process.platform === 'darwin') {
      spawnSync('osascript', ['-e', 'tell application "System Events" to keystroke "v" using command down']);
    } else if (process.platform === 'linux') {
      const tools = ['xdotool', 'ydotool'];
      for (const tool of tools) {
        try {
          if (tool === 'xdotool') {
            spawnSync(tool, ['key', 'ctrl+v'], { stdio: 'ignore' });
          } else {
            spawnSync(tool, ['key', '29:1', '47:1', '47:0', '29:0'], { stdio: 'ignore' }); // Ctrl down, V down, V up, Ctrl up
          }
          await sleep(500);
          return;
        } catch (e) {
          continue;
        }
      }
    } else if (process.platform === 'win32') {
      const ps = `Add-Type -AssemblyName System.Windows.Forms; [System.Windows.Forms.SendKeys]::SendWait("^v")`;
      spawnSync('powershell.exe', ['-NoProfile', '-Command', ps], { stdio: 'ignore' });
      await sleep(500);
    }
  }
}

async function copyHtmlFromBrowser(cdp: CdpConnection, htmlFilePath: string): Promise<void> {
  const absolutePath = path.isAbsolute(htmlFilePath) ? htmlFilePath : path.resolve(process.cwd(), htmlFilePath);
  const fileUrl = `file://${absolutePath}`;

  console.log(`[wechat] Opening HTML file in new tab: ${fileUrl}`);

  const { targetId } = await cdp.send<{ targetId: string }>('Target.createTarget', { url: fileUrl });
  const { sessionId } = await cdp.send<{ sessionId: string }>('Target.attachToTarget', { targetId, flatten: true });

  await cdp.send('Page.enable', {}, { sessionId });
  await cdp.send('Runtime.enable', {}, { sessionId });
  await sleep(2000);

  console.log('[wechat] Selecting #output content...');
  
  // 增加等待时间，确保内容完全加载
  await sleep(1000);

  const selectResult = await cdp.send<{ result: { value: unknown } }>('Runtime.evaluate', {
    expression: `
      (function() {
        const output = document.querySelector('#output') || document.body;
        if (!output) {
          console.log('Output element not found');
          return false;
        }
        
        const range = document.createRange();
        range.selectNodeContents(output);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        console.log('Content selected successfully');
        return true;
      })()
    `,
    returnByValue: true,
  }, { sessionId });
  
  const selected = selectResult.result.value as boolean;
  if (!selected) {
    console.warn('[wechat] Failed to select content, but continuing...');
  }
  
  await sleep(500);

  console.log('[wechat] Copying with system Cmd+C...');
  
  // 方式1：使用系统命令直接复制
  let copySuccess = false;
  
  if (process.platform === 'darwin') {
    const result = spawnSync('osascript', ['-e', 'tell application "System Events" to keystroke "c" using command down'], { stdio: 'ignore' });
    copySuccess = result.status === 0;
  } else if (process.platform === 'linux') {
    const tools = ['xdotool', 'ydotool'];
    for (const tool of tools) {
      try {
        if (tool === 'xdotool') {
          spawnSync(tool, ['key', 'ctrl+c'], { stdio: 'ignore' });
        } else {
          spawnSync(tool, ['key', '29:1', '45:1', '45:0', '29:0'], { stdio: 'ignore' }); // Ctrl down, C down, C up, Ctrl up
        }
        copySuccess = true;
        break;
      } catch (e) {
        continue;
      }
    }
  }
  
  await sleep(1000); // 增加等待时间

  if (!copySuccess) {
    console.warn('[wechat] System copy command may have failed, but continuing...');
  }

  console.log('[wechat] Closing HTML tab...');
  await cdp.send('Target.closeTarget', { targetId });
}

async function pasteFromClipboardInEditor(): Promise<void> {
  console.log('[wechat] Pasting from clipboard...');
  
  // 方式1：尝试使用剪贴板API（如果支持）
  try {
    if (process.platform === 'darwin') {
      const result = spawnSync('osascript', ['-e', `
        tell application "System Events"
          keystroke "v" using command down
      `], { stdio: 'ignore' });
      
      if (result.status === 0) {
        console.log('[wechat] Paste command sent via osascript');
        await sleep(1000); // 等待粘贴完成
        return;
      }
    } else if (process.platform === 'linux') {
      const tools = ['xdotool', 'ydotool'];
      for (const tool of tools) {
        try {
          if (tool === 'xdotool') {
            spawnSync(tool, ['key', 'ctrl+v'], { stdio: 'ignore' });
          } else {
            spawnSync(tool, ['key', '29:1', '47:1', '47:0', '29:0'], { stdio: 'ignore' });
          }
          await sleep(1000);
          console.log('[wechat] Paste command sent via ' + tool);
          return;
        } catch (e) {
          continue;
        }
      }
    } else if (process.platform === 'win32') {
      const ps = `Add-Type -AssemblyName System.Windows.Forms; [System.Windows.Forms.SendKeys]::SendWait("^v")`;
      spawnSync('powershell.exe', ['-NoProfile', '-Command', ps], { stdio: 'ignore' });
      await sleep(1000);
      console.log('[wechat] Paste command sent via PowerShell');
      return;
    }
  } catch (error) {
    console.error(`[wechat] Paste failed: ${error}`);
  }
  
  console.log('[wechat] Paste operation completed');
}

async function parseMarkdownWithPlaceholders(markdownPath: string, theme?: string): Promise<{ title: string; author: string; summary: string; htmlPath: string; contentImages: ImageInfo[] }> {
  const scriptDir = path.dirname(new URL(import.meta.url).pathname);
  const mdToWechatScript = path.join(scriptDir, 'md-to-wechat.ts');
  const args = ['-y', 'bun', mdToWechatScript, markdownPath];
  if (theme) args.push('--theme', theme);

  const result = spawnSync('npx', args, { stdio: ['inherit', 'pipe', 'pipe'] });
  if (result.status !== 0) {
    const stderr = result.stderr?.toString() || '';
    throw new Error(`Failed to parse markdown: ${stderr}`);
  }

  const output = result.stdout.toString();
  return JSON.parse(output);
}

function parseHtmlMeta(htmlPath: string): { title: string; author: string; summary: string } {
  const content = fs.readFileSync(htmlPath, 'utf-8');

  let title = '';
  const titleMatch = content.match(/<title>([^<]+)<\/title>/i);
  if (titleMatch) title = titleMatch[1]!;

  let author = '';
  const authorMatch = content.match(/<meta\s+name=["']author["']\s+content=["']([^"']+)["']/i);
  if (authorMatch) author = authorMatch[1]!;

  let summary = '';
  const descMatch = content.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
  if (descMatch) summary = descMatch[1]!;

  if (!summary) {
    const firstPMatch = content.match(/<p[^>]*>([^<]+)<\/p>/i);
    if (firstPMatch) {
      const text = firstPMatch[1]!.replace(/<[^>]+>/g, '').trim();
      if (text.length > 20) {
        summary = text.length > 120 ? text.slice(0, 117) + '...' : text;
      }
    }
  }

  return { title, author, summary };
}

async function selectAndReplacePlaceholder(session: ChromeSession, placeholder: string): Promise<boolean> {
  const result = await session.cdp.send<{ result: { value: boolean } }>('Runtime.evaluate', {
    expression: `
      (function() {
        const editor = document.querySelector('.ProseMirror');
        if (!editor) {
          console.log('Editor not found');
          return false;
        }

        const walker = document.createTreeWalker(editor, NodeFilter.SHOW_TEXT, null, false);
        let node;

        while ((node = walker.nextNode())) {
          const text = node.textContent || '';
          const idx = text.indexOf(${JSON.stringify(placeholder)});
          if (idx !== -1) {
            console.log('Found placeholder at index:', idx);
            
            node.parentElement.scrollIntoView({ behavior: 'smooth', block: 'center' });

            // 增加等待时间，确保滚动完成
            const range = document.createRange();
            range.setStart(node, idx);
            range.setEnd(node, idx + ${placeholder.length});
            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
            console.log('Placeholder selected');
            return true;
          }
        }
        console.log('Placeholder not found in text nodes');
        return false;
      })()
    `,
    returnByValue: true,
  }, { sessionId: session.sessionId });

  return result.result.value;
}

async function pressDeleteKey(session: ChromeSession): Promise<void> {
  await session.cdp.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Backspace', code: 'Backspace', windowsVirtualKeyCode: 8 }, { sessionId: session.sessionId });
  await sleep(100);
  await session.cdp.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Backspace', code: 'Backspace', windowsVirtualKeyCode: 8 }, { sessionId: session.sessionId });
}

export async function postArticle(options: ArticleOptions): Promise<void> {
  const { title, content, htmlFile, markdownFile, theme, author, summary, images = [], submit = false, profileDir } = options;
  let { contentImages = [] } = options;
  let effectiveTitle = title || '';
  let effectiveAuthor = author || '';
  let effectiveSummary = summary || '';
  let effectiveHtmlFile = htmlFile;

  if (markdownFile) {
    console.log(`[wechat] Parsing markdown: ${markdownFile}`);
    const parsed = await parseMarkdownWithPlaceholders(markdownFile, theme);
    effectiveTitle = effectiveTitle || parsed.title;
    effectiveAuthor = effectiveAuthor || parsed.author;
    effectiveSummary = effectiveSummary || parsed.summary;
    effectiveHtmlFile = parsed.htmlPath;
    contentImages = parsed.contentImages;
    console.log(`[wechat] Title: ${effectiveTitle || '(empty)'}`);
    console.log(`[wechat] Author: ${effectiveAuthor || '(empty)'}`);
    console.log(`[wechat] Summary: ${effectiveSummary || '(empty)'}`);
    console.log(`[wechat] Found ${contentImages.length} images to insert`);
  } else if (htmlFile && fs.existsSync(htmlFile)) {
    console.log(`[wechat] Parsing HTML: ${htmlFile}`);
    const meta = parseHtmlMeta(htmlFile);
    effectiveTitle = effectiveTitle || meta.title;
    effectiveAuthor = effectiveAuthor || meta.author;
    effectiveSummary = effectiveSummary || meta.summary;
    effectiveHtmlFile = htmlFile;
    console.log(`[wechat] Title: ${effectiveTitle || '(empty)'}`);
    console.log(`[wechat] Author: ${effectiveAuthor || '(empty)'}`);
    console.log(`[wechat] Summary: ${effectiveSummary || '(empty)'}`);
  }

  if (effectiveTitle && effectiveTitle.length > 64) throw new Error(`Title too long: ${effectiveTitle.length} chars (max 64)`);
  if (!content && !effectiveHtmlFile) throw new Error('Either --content, --html, or --markdown is required');

  const { cdp, chrome } = await launchChrome(WECHAT_URL, profileDir);

  try {
    console.log('[wechat] Waiting for page load...');
    await sleep(3000);

    let session = await getPageSession(cdp, 'mp.weixin.qq.com');

    const url = await evaluate<string>(session, 'window.location.href');
    if (!url.includes('/cgi-bin/home')) {
      console.log('[wechat] Not logged in. Please scan QR code...');
      const loggedIn = await waitForLogin(session);
      if (!loggedIn) throw new Error('Login timeout');
    }
    console.log('[wechat] Logged in.');
    await sleep(2000);

    const targets = await cdp.send<{ targetInfos: Array<{ targetId: string; url: string; type: string }> }>('Target.getTargets');
    const initialIds = new Set(targets.targetInfos.map(t => t.targetId));

    await clickMenuByText(session, '文章');
    await sleep(3000);

    const editorTargetId = await waitForNewTab(cdp, initialIds, 'mp.weixin.qq.com');
    console.log('[wechat] Editor tab opened.');

    const { sessionId } = await cdp.send<{ sessionId: string }>('Target.attachToTarget', { targetId: editorTargetId, flatten: true });
    session = { cdp, sessionId, targetId: editorTargetId };

    await cdp.send('Page.enable', {}, { sessionId });
    await cdp.send('Runtime.enable', {}, { sessionId });
    await cdp.send('DOM.enable', {}, { sessionId });

    await sleep(3000);

    if (effectiveTitle) {
      console.log('[wechat] Filling title...');
      await evaluate(session, `document.querySelector('#title').value = ${JSON.stringify(effectiveTitle)}; document.querySelector('#title').dispatchEvent(new Event('input', { bubbles: true }));`);
    }

    if (effectiveAuthor) {
      console.log('[wechat] Filling author...');
      await evaluate(session, `document.querySelector('#author').value = ${JSON.stringify(effectiveAuthor)}; document.querySelector('#author').dispatchEvent(new Event('input', { bubbles: true }));`);
    }

    console.log('[wechat] Clicking on editor...');
    await clickElement(session, '.ProseMirror');
    await sleep(1000); // 增加等待时间

    if (effectiveHtmlFile && fs.existsSync(effectiveHtmlFile)) {
      console.log(`[wechat] Copying HTML content from: ${effectiveHtmlFile}`);
      await copyHtmlFromBrowser(cdp, effectiveHtmlFile);
      
      // 增加等待时间，确保复制完成
      await sleep(2000);
      
      console.log('[wechat] Switching to editor tab...');
      // 重新获取编辑器session
      const editorSession = await getPageSession(cdp, 'mp.weixin.qq.com');
      
      console.log('[wechat] Pasting into editor...');
      await pasteFromClipboardInEditor();
      
      // 等待粘贴完成
      await sleep(3000);

      if (contentImages.length > 0) {
        console.log(`[wechat] Inserting ${contentImages.length} images...`);
        
        for (let i = 0; i < contentImages.length; i++) {
          const img = contentImages[i]!;
          console.log(`[wechat] [${i + 1}/${contentImages.length}] Processing: ${img.placeholder}`);

          const found = await selectAndReplacePlaceholder(session, img.placeholder);
          if (!found) {
            console.warn(`[wechat] Placeholder not found: ${img.placeholder}`);
            // 尝试在编辑器中搜索占位符
            console.log('[wechat] Trying to find placeholder in entire editor...');
            // 继续尝试下一个图片
            continue;
          }

          await sleep(1000);

          console.log(`[wechat] Copying image: ${path.basename(img.localPath)}`);
          await copyImageToClipboard(img.localPath);
          await sleep(1000); // 增加等待时间

          console.log('[wechat] Deleting placeholder with Backspace...');
          await pressDeleteKey(session);
          await sleep(500);

          console.log('[wechat] Pasting image...');
          await pasteInEditor(session);
          await sleep(3000); // 增加等待粘贴完成
        }
        console.log('[wechat] All images inserted.');
      }
    } else if (content) {
      for (const img of images) {
        if (fs.existsSync(img)) {
          console.log(`[wechat] Pasting image: ${img}`);
          await copyImageToClipboard(img);
          await sleep(1000);
          await pasteInEditor(session);
          await sleep(2000);
        }
      }

      if (content) {
        console.log('[wechat] Typing content...');
        await typeText(session, content);
        await sleep(1000);
      }
    }

    if (effectiveSummary) {
      console.log(`[wechat] Filling summary: ${effectiveSummary}`);
      await evaluate(session, `document.querySelector('#js_description').value = ${JSON.stringify(effectiveSummary)}; document.querySelector('#js_description').dispatchEvent(new Event('input', { bubbles: true }));`);
    }

    console.log('[wechat] Saving as draft...');
    await evaluate(session, `document.querySelector('#js_submit button').click()`);
    await sleep(3000);

    const saved = await evaluate<boolean>(session, `!!document.querySelector('.weui-desktop-toast')`);
    if (saved) {
      console.log('[wechat] Draft saved successfully!');
    } else {
      console.log('[wechat] Waiting for save confirmation...');
      await sleep(5000);
    }

    console.log('[wechat] Done. Browser window left open.');
  } finally {
    cdp.close();
  }
}

function printUsage(): never {
  console.log(`Post article to WeChat Official Account

Usage:
  npx -y bun wechat-article.ts [options]

Options:
  --markdown <path>      Markdown file to post
  --theme <name>        Theme: default, grace, simple
  --title <text>        Override title
  --author <name>       Author name (default: 宝玉)
  --summary <text>      Article summary
  --html <path>         Pre-rendered HTML file
  --profile-dir <path>   Chrome profile directory

Examples:
  # Post markdown article
  npx -y bun wechat-article.ts --markdown article.md --theme grace

  # Post with custom title and author
  npx -y bun wechat-article.ts --markdown article.md --title "Custom Title" --author "Author Name"
  `);
  process.exit(0);
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const options: ArticleOptions = {};

  for (let i = 0; i < args.length; i++) {
    const arg = args[i] ?? '';
    if (arg === '--help' || arg === '-h') {
      printUsage();
    } else if (arg === '--markdown' && args[i + 1]) {
      options.markdownFile = args[++i]!;
    } else if (arg === '--theme' && args[i + 1]) {
      options.theme = args[++i]!;
    } else if (arg === '--title' && args[i + 1]) {
      options.title = args[++i]!;
    } else if (arg === '--author' && args[i + 1]) {
      options.author = args[++i]!;
    } else if (arg === '--summary' && args[i + 1]) {
      options.summary = args[++i]!;
    } else if (arg === '--html' && args[i + 1]) {
      options.htmlFile = args[++i]!;
    } else if (arg === '--profile-dir' && args[i + 1]) {
      options.profileDir = args[++i]!;
    }
  }

  if (!options.markdownFile && !options.htmlFile) {
    console.error('Error: Either --markdown or --html is required');
    printUsage();
  }

  await postArticle(options);
}

if (import.meta.url === new URL(`file://${process.argv[1]}`).href) {
  postArticle({
    title: 'Test Article',
    content: 'This is a test article content.',
    submit: false
  });
} else {
  main().catch(console.error);
}
