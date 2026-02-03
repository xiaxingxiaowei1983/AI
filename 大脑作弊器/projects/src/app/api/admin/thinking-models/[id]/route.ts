import { NextRequest, NextResponse } from "next/server"
// 强制动态渲染，避免构建时执行数据库连接
export const dynamic = 'force-dynamic'

import { getDb } from "coze-coding-dev-sdk"

import { thinkingModels } from "@/storage/database/shared/schema"

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
 * 更新思维模型
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 验证权限
    const auth = verifyAdminAuth(request)
    if (!auth.success || auth.user?.role !== 'admin') {
      return NextResponse.json(
        { error: '无权访问' },
        { status: 403 }
      )
    }

    const { id } = await params
    const body = await request.json()
    const { name, category, icon, description, content, examples, sortOrder, isActive } = body

    if (!name || !content) {
      return NextResponse.json(
        { error: '缺少必要参数' },
        { status: 400 }
      )
    }

    const db = await getDb()
    const [updatedModel] = await db
      .update(thinkingModels)
      .set({
        name,
        category: category || '决策',
        icon: icon || 'fa-lightbulb-o',
        description: description || '',
        content,
        examples: examples || null,
        updatedAt: new Date(),
        sortOrder: sortOrder || 0,
        isActive: isActive !== undefined ? isActive : true
      })
      .where(eq(thinkingModels.id, id))
      .returning()

    if (!updatedModel) {
      return NextResponse.json(
        { error: '思维模型不存在' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: '思维模型更新成功',
      model: updatedModel
    })
  } catch (error) {
    console.error('更新思维模型失败:', error)
    return NextResponse.json(
      {
        success: false,
        error: '更新思维模型失败',
        details: error instanceof Error ? error.message : '未知错误'
      },
      { status: 500 }
    )
  }
}

/**
 * 删除思维模型
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 验证权限
    const auth = verifyAdminAuth(request)
    if (!auth.success || auth.user?.role !== 'admin') {
      return NextResponse.json(
        { error: '无权访问' },
        { status: 403 }
      )
    }

    const { id } = await params
    const db = await getDb()
    await db
      .delete(thinkingModels)
      .where(eq(thinkingModels.id, id))

    return NextResponse.json({
      success: true,
      message: '思维模型删除成功'
    })
  } catch (error) {
    console.error('删除思维模型失败:', error)
    return NextResponse.json(
      {
        success: false,
        error: '删除思维模型失败',
        details: error instanceof Error ? error.message : '未知错误'
      },
      { status: 500 }
    )
  }
}
