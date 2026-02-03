import { NextRequest, NextResponse } from "next/server"
// 强制动态渲染，避免构建时执行数据库连接
export const dynamic = 'force-dynamic'

import { getDb } from "coze-coding-dev-sdk"

import { apiConfigs } from "@/storage/database/shared/schema"

import { eq } from "drizzle-orm"

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
 * 初始化扣子LLM配置
 * 按照扣子规则创建默认配置
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

    const db = await getDb()

    // 清理现有的LLM相关配置
    await db
      .delete(apiConfigs)
      .where(eq(apiConfigs.configKey, 'llm_model_name'))
    await db
      .delete(apiConfigs)
      .where(eq(apiConfigs.configKey, 'llm_api_endpoint'))
    await db
      .delete(apiConfigs)
      .where(eq(apiConfigs.configKey, 'llm_api_key'))
    await db
      .delete(apiConfigs)
      .where(eq(apiConfigs.configKey, 'llm_temperature'))
    await db
      .delete(apiConfigs)
      .where(eq(apiConfigs.configKey, 'llm_max_tokens'))
    await db
      .delete(apiConfigs)
      .where(eq(apiConfigs.configKey, 'llm_timeout'))
    await db
      .delete(apiConfigs)
      .where(eq(apiConfigs.configKey, 'llm_system_prompt'))

    // 创建新的配置（按照扣子规则）
    const configs = [
      {
        configKey: 'llm_model',
        configValue: 'doubao-seed-1-8-251228',
        description: '模型ID（默认：多模态Agent优化模型）',
        isEncrypted: false,
        updatedBy: auth.user.userId
      },
      {
        configKey: 'llm_temperature',
        configValue: '1.0',
        description: '温度参数（0-2，默认1.0，控制输出随机性）',
        isEncrypted: false,
        updatedBy: auth.user.userId
      },
      {
        configKey: 'llm_thinking',
        configValue: 'disabled',
        description: '思维模式（enabled：深度推理 / disabled：快速响应）',
        isEncrypted: false,
        updatedBy: auth.user.userId
      },
      {
        configKey: 'llm_caching',
        configValue: 'disabled',
        description: '缓存模式（enabled：缓存上下文 / disabled：无缓存）',
        isEncrypted: false,
        updatedBy: auth.user.userId
      }
    ]

    const createdConfigs = await db
      .insert(apiConfigs)
      .values(configs)
      .returning()

    return NextResponse.json({
      success: true,
      message: '扣子LLM配置初始化成功',
      configs: createdConfigs
    })
  } catch (error) {
    console.error('初始化LLM配置失败:', error)
    return NextResponse.json(
      {
        success: false,
        error: '初始化LLM配置失败',
        details: error instanceof Error ? error.message : '未知错误'
      },
      { status: 500 }
    )
  }
}
