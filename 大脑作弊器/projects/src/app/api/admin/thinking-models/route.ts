import { NextRequest, NextResponse } from "next/server"
// 强制动态渲染，避免构建时执行数据库连接
export const dynamic = 'force-dynamic'

import { getDb } from "coze-coding-dev-sdk"

import { thinkingModels } from "@/storage/database/shared/schema"

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
 * 创建思维模型
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
    const { name, category, icon, description, content, examples, sortOrder, isActive } = body

    if (!name || !content) {
      return NextResponse.json(
        { error: '缺少必要参数' },
        { status: 400 }
      )
    }

    const db = await getDb()
    const [model] = await db
      .insert(thinkingModels)
      .values({
        name,
        category: category || '决策',
        icon: icon || 'fa-lightbulb-o',
        description: description || '',
        content,
        examples: examples || null,
        tags: null,
        sortOrder: sortOrder || 0,
        isActive: isActive !== undefined ? isActive : true
      })
      .returning()

    return NextResponse.json({
      success: true,
      message: '思维模型创建成功',
      model
    })
  } catch (error) {
    console.error('创建思维模型失败:', error)
    return NextResponse.json(
      {
        success: false,
        error: '创建思维模型失败',
        details: error instanceof Error ? error.message : '未知错误'
      },
      { status: 500 }
    )
  }
}
