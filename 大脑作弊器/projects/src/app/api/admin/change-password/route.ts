import { NextResponse } from "next/server"
// 强制动态渲染，避免构建时执行数据库连接
export const dynamic = 'force-dynamic'

import { getDb } from "coze-coding-dev-sdk"

import { users } from "@/storage/database/shared/schema"

import { eq } from "drizzle-orm"

import bcrypt from "bcryptjs"

/**
 * 更新管理员密码API
 * 仅允许通过调用此API来修改管理员密码
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, newPassword } = body

    if (!email || !newPassword) {
      return NextResponse.json(
        {
          success: false,
          error: "缺少必要参数"
        },
        { status: 400 }
      )
    }

    const db = await getDb()

    // 查找用户
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "用户不存在"
        },
        { status: 404 }
      )
    }

    // 加密新密码
    const hashedPassword = await bcrypt.hash(newPassword, 10)

    // 更新密码
    await db
      .update(users)
      .set({
        password: hashedPassword,
        updatedAt: new Date()
      })
      .where(eq(users.id, user.id))

    console.log(`用户 ${email} 密码已更新`)

    return NextResponse.json({
      success: true,
      message: "密码更新成功"
    })
  } catch (error) {
    console.error("密码更新失败:", error)
    return NextResponse.json(
      {
        success: false,
        error: "密码更新失败",
        details: error instanceof Error ? error.message : "未知错误"
      },
      { status: 500 }
    )
  }
}
