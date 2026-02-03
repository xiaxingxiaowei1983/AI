import { NextRequest, NextResponse } from "next/server"
// 强制动态渲染，避免构建时执行数据库连接
export const dynamic = 'force-dynamic'

import { LLMClient, Config } from "coze-coding-dev-sdk"

import { getDb } from "coze-coding-dev-sdk"

import { apiConfigs } from "@/storage/database/shared/schema"

import { verifyToken } from "@/storage/database/auth"

/**
 * 验证管理员权限
 */
function verifyAdminAuth(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    return { success: false }
  }

  const token = authHeader.substring(7)
  const payload = verifyToken(token)

  if (!payload || payload.role !== 'admin') {
    return { success: false }
  }

  return { success: true, user: payload }
}

/**
 * 测试LLM连接
 */
export async function POST(request: NextRequest) {
  try {
    // 验证权限
    const auth = verifyAdminAuth(request)
    if (!auth.success || auth.user?.role !== 'admin') {
      return NextResponse.json(
        { error: '无权访问' },
        { status: 403 }
      )
    }

    // 从数据库加载配置
    const db = await getDb()
    const configs = await db.select().from(apiConfigs)

    const modelConfig = configs.find(c => c.configKey === 'llm_model')
    const temperatureConfig = configs.find(c => c.configKey === 'llm_temperature')
    const thinkingConfig = configs.find(c => c.configKey === 'llm_thinking')
    const cachingConfig = configs.find(c => c.configKey === 'llm_caching')

    const model = modelConfig?.configValue || 'doubao-seed-1-8-251228'
    const temperature = parseFloat(temperatureConfig?.configValue || '1.0')
    const thinking = thinkingConfig?.configValue || 'disabled'
    const caching = cachingConfig?.configValue || 'disabled'

    // 初始化LLM客户端
    const config = new Config()
    const client = new LLMClient(config)

    // 测试消息
    const messages = [
      { role: 'user' as const, content: '请用一句话介绍你自己' }
    ]

    // 调用LLM
    const response = await client.invoke(messages, {
      model,
      temperature,
      thinking: thinking as 'enabled' | 'disabled',
      caching: caching as 'enabled' | 'disabled'
    })

    return NextResponse.json({
      success: true,
      message: 'LLM连接测试成功',
      response: {
        model,
        temperature,
        thinking,
        caching,
        content: response.content
      }
    })
  } catch (error) {
    console.error('LLM连接测试失败:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'LLM连接测试失败',
        details: error instanceof Error ? error.message : '未知错误'
      },
      { status: 500 }
    )
  }
}
