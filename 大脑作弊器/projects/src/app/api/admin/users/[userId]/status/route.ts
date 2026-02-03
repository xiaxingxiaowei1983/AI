import { NextRequest, NextResponse } from 'next/server'
// 强制动态渲染，避免构建时执行数据库连接
export const dynamic = 'force-dynamic'

import { getDb } from 'coze-coding-dev-sdk'
import { users } from '@/storage/database/shared/schema'
import { eq } from 'drizzle-orm'
import { verifyToken } from '@/storage/database/auth'

/**
 * 修改用户状态（管理员权限）
 */
export async function PUT(
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

    const body = await request.json()
    const { isActive } = body

    if (typeof isActive !== 'boolean') {
      return NextResponse.json(
        { error: '无效的状态' },
        { status: 400 }
      )
    }

    const db = await getDb()
    const [updatedUser] = await db
      .update(users)
      .set({ isActive: isActive })
      .where(eq(users.id, params.userId))
      .returning({
        id: users.id,
        username: users.username,
        email: users.email,
        isActive: users.isActive
      })

    if (!updatedUser) {
      return NextResponse.json(
        { error: '用户不存在' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: '状态更新成功',
      user: updatedUser
    })
  } catch (error) {
    console.error('更新状态失败:', error)
    return NextResponse.json(
      { error: '更新失败' },
      { status: 500 }
    )
  }
}
