import { NextRequest, NextResponse } from 'next/server';
// 强制动态渲染，避免构建时执行数据库连接
export const dynamic = 'force-dynamic'

// 配置请求超时时间
const REQUEST_TIMEOUT = 30000; // 30秒

/**
 * 提取微信文章的正文内容
 * 从HTML中提取主要内容，去除广告、导航等无关元素
 */
function extractMainContent(html: string): string {
  // 移除脚本和样式
  let content = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  content = content.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');

  // 提取主要正文区域（微信文章的主要内容通常在 rich_media_content 中）
  const mainContentMatch = content.match(/<div[^>]*class="[^"]*rich_media_content[^"]*"[^>]*>([\s\S]*?)<\/div>/i);

  if (mainContentMatch && mainContentMatch[1]) {
    content = mainContentMatch[1];
  } else {
    // 如果找不到 rich_media_content，尝试提取所有段落
    const paragraphMatches = content.match(/<p[^>]*>([\s\S]*?)<\/p>/gi);
    if (paragraphMatches && paragraphMatches.length > 0) {
      content = paragraphMatches.join('\n');
    }
  }

  // 移除HTML标签，但保留换行
  content = content
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');

  // 清理多余空白
  content = content.replace(/\n\s*\n\s*\n/g, '\n\n').trim();

  return content;
}

/**
 * 提取文章标题
 */
function extractTitle(html: string): string {
  const titleMatch = html.match(/<meta[^>]*property="og:title"[^>]*content="([^"]*)"/i);
  if (titleMatch && titleMatch[1]) {
    return titleMatch[1];
  }

  const h1Match = html.match(/<h1[^>]*class="[^"]*rich_media_title[^"]*"[^>]*>([\s\S]*?)<\/h1>/i);
  if (h1Match && h1Match[1]) {
    return h1Match[1].replace(/<[^>]+>/g, '').trim();
  }

  const metaMatch = html.match(/<meta[^>]*name="title"[^>]*content="([^"]*)"/i);
  if (metaMatch && metaMatch[1]) {
    return metaMatch[1];
  }

  return '未获取到标题';
}

/**
 * 提取文章作者
 */
function extractAuthor(html: string): string {
  const authorMatch = html.match(/<a[^>]*class="[^"]*rich_media_meta_link[^"]*"[^>]*>([\s\S]*?)<\/a>/i);
  if (authorMatch && authorMatch[1]) {
    return authorMatch[1].replace(/<[^>]+>/g, '').trim();
  }

  return '';
}

/**
 * POST /api/proxy-wechat
 * 通过后端代理访问微信文章，提取内容
 */
export async function POST(request: NextRequest) {
  console.log('收到微信文章代理请求');

  try {
    const body = await request.json();
    const { url } = body;

    // 验证 URL
    if (!url || typeof url !== 'string') {
      return NextResponse.json(
        { error: 'URL 参数缺失或格式错误' },
        { status: 400 }
      );
    }

    // 验证是否为微信文章链接
    if (!url.includes('mp.weixin.qq.com')) {
      return NextResponse.json(
        { error: '仅支持微信公众号文章链接' },
        { status: 400 }
      );
    }

    console.log('开始获取微信文章:', url);

    // 构建合规的请求头
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
      'Accept-Encoding': 'gzip, deflate, br',
      'Connection': 'keep-alive',
      'Upgrade-Insecure-Requests': '1',
      // 设置 Referer 为空或合规域名，避免触发反爬虫
      'Referer': 'https://mp.weixin.qq.com/',
      'Cache-Control': 'max-age=0',
      'DNT': '1',
    };

    // 带超时控制的请求
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      console.log('微信文章响应状态:', response.status);

      if (!response.ok) {
        // 检查是否被重定向到登录页面
        const redirectUrl = response.headers.get('location') || '';
        if (redirectUrl.includes('login') || redirectUrl.includes('security')) {
          return NextResponse.json(
            { error: '微信要求登录验证，该文章可能设置了访问限制' },
            { status: 403 }
          );
        }

        throw new Error(`请求失败，状态码: ${response.status}`);
      }

      // 获取响应内容
      const html = await response.text();
      console.log('获取到HTML内容，长度:', html.length);

      // 提取文章信息
      const title = extractTitle(html);
      const author = extractAuthor(html);
      const content = extractMainContent(html);

      console.log('提取标题:', title);
      console.log('提取作者:', author);
      console.log('提取内容长度:', content.length);

      // 验证提取的内容
      if (content.length < 100) {
        console.warn('提取的内容太短，可能提取失败');
        // 即使内容短，也返回，让用户知道
      }

      return NextResponse.json({
        success: true,
        title,
        author,
        content,
        url,
        extractedAt: new Date().toISOString(),
      });

    } catch (fetchError: any) {
      clearTimeout(timeoutId);

      if (fetchError.name === 'AbortError') {
        return NextResponse.json(
          { error: '请求超时，请重试' },
          { status: 504 }
        );
      }

      throw fetchError;
    }

  } catch (error: any) {
    console.error('微信文章代理失败:', error);

    let errorMessage = '获取文章内容失败';
    if (error.message) {
      errorMessage += `: ${error.message}`;
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
