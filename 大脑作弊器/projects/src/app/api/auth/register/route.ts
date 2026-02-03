import { NextRequest, NextResponse } from 'next/server'
// 强制动态渲染，避免构建时执行数据库连接
export const dynamic = 'force-dynamic'

import { userManager } from '@/storage/database/userManager'
import { insertUserSchema, type InsertUser } from '@/storage/database/shared/schema'
import bcrypt from 'bcryptjs'

// 简单的密码哈希函数（生产环境应使用更强的加密）
async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10
  return await bcrypt.hash(password, saltRounds)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, email, password } = body

    // 验证输入
    if (!username || !email || !password) {
      return NextResponse.json(
        { error: '用户名、邮箱和密码不能为空' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: '密码长度至少为6位' },
        { status: 400 }
      )
    }

    // 检查用户名是否已存在
    const usernameExists = await userManager.usernameExists(username)
    if (usernameExists) {
      return NextResponse.json(
        { error: '用户名已被使用' },
        { status: 409 }
      )
    }

    // 检查邮箱是否已存在
    const emailExists = await userManager.emailExists(email)
    if (emailExists) {
      return NextResponse.json(
        { error: '邮箱已被注册' },
        { status: 409 }
      )
    }

    // 哈希密码
    const hashedPassword = await hashPassword(password)

    // 设置管理员权限：特定邮箱自动设为管理员
    const isAdmin = email === '10919669@qq.com'

    // 创建用户
    const userData: InsertUser = {
      username,
      email,
      password: hashedPassword,
      role: isAdmin ? 'admin' : 'user'
    }

    const user = await userManager.createUser(userData)

    // 返回用户信息（不包含密码）
    return NextResponse.json({
      success: true,
      message: '注册成功',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    })

  } catch (error) {
    console.error('注册失败:', error)
    return NextResponse.json(
      { error: '注册失败，请重试' },
      { status: 500 }
    )
  }
}
