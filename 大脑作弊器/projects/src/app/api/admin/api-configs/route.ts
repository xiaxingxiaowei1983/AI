import { NextRequest, NextResponse } from "next/server"
// 强制动态渲染，避免构建时执行数据库连接
export const dynamic = 'force-dynamic'

import { getDb } from "coze-coding-dev-sdk"

import { apiConfigs } from "@/storage/database/shared/schema"

import { eq, desc } from "drizzle-orm"

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
 * 获取所有API配置
 */
export async function GET(request: NextRequest) {
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
    const configs = await db
      .select()
      .from(apiConfigs)
      .orderBy(desc(apiConfigs.updatedAt))

    return NextResponse.json({
      success: true,
      configs
    })
  } catch (error) {
    console.error('获取API配置失败:', error)
    return NextResponse.json(
      {
        success: false,
        error: '获取API配置失败',
        details: error instanceof Error ? error.message : '未知错误'
      },
      { status: 500 }
    )
  }
}

/**
 * 创建API配置
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

    const body = await request.json()
    const { configKey, configValue, description, isEncrypted } = body

    if (!configKey || !configValue) {
      return NextResponse.json(
        { error: '缺少必要参数' },
        { status: 400 }
      )
    }

    const db = await getDb()
    const [config] = await db
      .insert(apiConfigs)
      .values({
        configKey,
        configValue: isEncrypted ? configValue : configValue,
        description: description || '',
        isEncrypted: isEncrypted || false,
        updatedBy: auth.user.userId
      })
      .returning()

    return NextResponse.json({
      success: true,
      message: 'API配置创建成功',
      config
    })
  } catch (error) {
    console.error('创建API配置失败:', error)
    return NextResponse.json(
      {
        success: false,
        error: '创建API配置失败',
        details: error instanceof Error ? error.message : '未知错误'
      },
      { status: 500 }
    )
  }
}
