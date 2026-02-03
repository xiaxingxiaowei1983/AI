import { NextRequest, NextResponse } from 'next/server'
// 强制动态渲染，避免构建时执行数据库连接
export const dynamic = 'force-dynamic'

import { getDb } from 'coze-coding-dev-sdk'

import { users } from '@/storage/database/shared/schema'

import { eq } from 'drizzle-orm'

import { verifyToken } from '@/storage/database/auth'

/**
 * 删除用户（管理员权限）
 */
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ userId: string }> }
) {
  try {
    const params = await context.params
    // 验证管理员权限
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    if (!token) {
      return NextResponse.json(
        { error: '未授权' },
        { status: 401 }
      )
    }

    const decoded = verifyToken(token)
    if (!decoded || decoded.role !== 'admin') {
      return NextResponse.json(
        { error: '无权访问' },
        { status: 403 }
      )
    }

    const db = await getDb()

    // 检查是否是主管理员
    const [targetUser] = await db
      .select()
      .from(users)
      .where(eq(users.id, params.userId))

    if (!targetUser) {
      return NextResponse.json(
        { error: '用户不存在' },
        { status: 404 }
      )
    }

    // 保护主管理员账户不被删除
    if (targetUser.email === '10919669@qq.com') {
      return NextResponse.json(
        { error: '无法删除主管理员账户' },
        { status: 403 }
      )
    }

    // 删除用户
    await db.delete(users).where(eq(users.id, params.userId))

    return NextResponse.json({
      success: true,
      message: '删除成功'
    })
  } catch (error) {
    console.error('删除用户失败:', error)
    return NextResponse.json(
      { error: '删除失败' },
      { status: 500 }
    )
  }
}
