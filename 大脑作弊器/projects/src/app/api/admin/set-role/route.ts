import { NextRequest, NextResponse } from 'next/server'
// 强制动态渲染，避免构建时执行数据库连接
export const dynamic = 'force-dynamic'

import { getDb } from 'coze-coding-dev-sdk'

import { users } from '@/storage/database/shared/schema'

import { eq } from 'drizzle-orm'

/**
 * 临时接口：将指定邮箱设置为管理员
 * 生产环境应该移除此接口或添加严格的权限验证
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email) {
      return NextResponse.json(
        { error: '邮箱不能为空' },
        { status: 400 }
      )
    }

    // 只允许设置特定的管理员邮箱
    if (email !== '10919669@qq.com') {
      return NextResponse.json(
        { error: '仅限设置指定管理员账户' },
        { status: 403 }
      )
    }

    const db = await getDb()
    const [updatedUser] = await db
      .update(users)
      .set({ role: 'admin' })
      .where(eq(users.email, email))
      .returning()

    if (!updatedUser) {
      return NextResponse.json(
        { error: '用户不存在' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: '管理员权限设置成功',
      user: {
        id: updatedUser.id,
        username: updatedUser.username,
        email: updatedUser.email,
        role: updatedUser.role
      }
    })
  } catch (error) {
    console.error('设置管理员失败:', error)
    return NextResponse.json(
      { error: '设置失败，请重试' },
      { status: 500 }
    )
  }
}
