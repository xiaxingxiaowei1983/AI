import { NextRequest, NextResponse } from 'next/server'
// 强制动态渲染，避免构建时执行数据库连接
export const dynamic = 'force-dynamic'

import { getDb } from 'coze-coding-dev-sdk'

import { users } from '@/storage/database/shared/schema'

import { eq } from 'drizzle-orm'

import bcrypt from 'bcryptjs'

/**
 * 临时接口：重置指定管理员账户的密码
 * 生产环境应该移除此接口或添加严格的权限验证
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, newPassword } = body

    if (!email || !newPassword) {
      return NextResponse.json(
        { error: '邮箱和新密码不能为空' },
        { status: 400 }
      )
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: '密码长度至少为6位' },
        { status: 400 }
      )
    }

    // 只允许重置特定的管理员邮箱
    if (email !== '10919669@qq.com') {
      return NextResponse.json(
        { error: '仅限重置指定管理员账户' },
        { status: 403 }
      )
    }

    // 哈希密码
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds)

    const db = await getDb()
    const [updatedUser] = await db
      .update(users)
      .set({ 
        password: hashedPassword,
        role: 'admin'
      })
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
      message: '密码重置成功',
      user: {
        id: updatedUser.id,
        username: updatedUser.username,
        email: updatedUser.email,
        role: updatedUser.role
      }
    })
  } catch (error) {
    console.error('密码重置失败:', error)
    return NextResponse.json(
      { error: '重置失败，请重试' },
      { status: 500 }
    )
  }
}
