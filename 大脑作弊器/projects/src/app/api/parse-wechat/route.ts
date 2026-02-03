import { NextRequest, NextResponse } from "next/server"
// 强制动态渲染，避免构建时执行数据库连接
export const dynamic = 'force-dynamic'

/**
 * 解析微信文章链接
 * 尝试多种方法获取微信文章内容
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { url } = body

    if (!url || !url.includes('mp.weixin.qq.com')) {
      return NextResponse.json(
        { error: '请提供有效的微信公众号文章链接' },
        { status: 400 }
      )
    }

    // 从URL中提取文章ID
    const match = url.match(/\/s\/([a-zA-Z0-9_]+)/)
    if (!match) {
      return NextResponse.json(
        { error: '无法提取文章ID' },
        { status: 400 }
      )
    }

    const articleId = match[1]
    console.log('尝试解析微信文章，ID:', articleId)

    // 方法1: 尝试通过RSSHub获取
    try {
      const rssUrl = `https://rsshub.app/weixin/mp/article/${articleId}`

      console.log('尝试RSSHub:', rssUrl)

      const response = await fetch(rssUrl, {
        signal: AbortSignal.timeout(15000)
      })

      if (response.ok) {
        const text = await response.text()

        // 解析RSS/XML
        const titleMatch = text.match(/<title>([^<]+)<\/title>/)
        const title = titleMatch ? titleMatch[1].trim() : '微信文章'

        // 提取CDATA内容
        const cdataMatch = text.match(/<!\[CDATA\[([\s\S]*?)\]\]>/)
        const content = cdataMatch ? cdataMatch[1] : text

        if (content.length > 100) {
          console.log('RSSHub获取成功，内容长度:', content.length)

          return NextResponse.json({
            success: true,
            title: title,
            content: content
          })
        }
      }
    } catch (rssError) {
      console.error('RSSHub失败:', rssError)
    }

    // 方法2: 尝试使用微信公众号文章的直接API（如果URL中包含其他参数）
    try {
      // 提取URL中的其他参数
      const urlObj = new URL(url)
      const mid = urlObj.searchParams.get('mid')
      const idx = urlObj.searchParams.get('idx')
      const sn = urlObj.searchParams.get('sn')

      if (mid && idx && sn) {
        console.log('发现完整参数，尝试构建HTML链接')

        const htmlUrl = `https://mp.weixin.qq.com/s?__biz=${mid}&mid=${articleId}&idx=${idx}&sn=${sn}`

        const response = await fetch(htmlUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Linux; Android 10; Pixel 3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.93 Mobile Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          },
          signal: AbortSignal.timeout(10000)
        })

        if (response.ok) {
          const html = await response.text()

          // 检查是否有验证页面
          if (!html.includes('环境异常') && !html.includes('完成验证后')) {
            // 提取标题
            const titleMatch = html.match(/<meta property="og:title" content="([^"]+)"/)
            const title = titleMatch ? titleMatch[1] : '微信文章'

            // 提取文章内容（在rich_media_content中）
            const contentMatch = html.match(/<div class="rich_media_content[^>]*>([\s\S]*?)<\/div>/)
            const content = contentMatch ? contentMatch[1] : html

            if (content.length > 200) {
              console.log('直接访问成功，内容长度:', content.length)

              return NextResponse.json({
                success: true,
                title: title,
                content: content
              })
            }
          }
        }
      }
    } catch (directError) {
      console.error('直接访问失败:', directError)
    }

    // 方法3: 使用第三方API服务（fetchrss.com）
    try {
      const fetchUrl = `https://api.fetchrss.com/v1/fetch?url=${encodeURIComponent(url)}`

      const response = await fetch(fetchUrl, {
        signal: AbortSignal.timeout(10000)
      })

      if (response.ok) {
        const data = await response.json()

        if (data.content && data.content.length > 100) {
          console.log('fetchRSS成功，内容长度:', data.content.length)

          return NextResponse.json({
            success: true,
            title: data.title || '微信文章',
            content: data.content
          })
        }
      }
    } catch (fetchError) {
      console.error('fetchRSS失败:', fetchError)
    }

    return NextResponse.json({
      success: false,
      error: '无法解析微信文章，建议直接复制文章内容或上传截图'
    })
  } catch (error) {
    console.error('解析微信文章失败:', error)
    return NextResponse.json(
      {
        success: false,
        error: '解析微信文章失败',
        details: error instanceof Error ? error.message : '未知错误'
      },
      { status: 500 }
    )
  }
}
