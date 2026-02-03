import { NextResponse } from "next/server"
// 强制动态渲染，避免构建时执行数据库连接
export const dynamic = 'force-dynamic'

import { initTables } from "@/storage/database/init-tables"

/**
 * 强制动态渲染，避免构建时执行数据库连接
 */

/**
 * 数据库初始化API
 * 仅允许管理员调用
 */
export async function POST() {
  try {
    console.log("开始执行数据库初始化...")
    await initTables()
    console.log("数据库初始化完成")

    return NextResponse.json({
      success: true,
      message: "数据库表初始化成功"
    })
  } catch (error) {
    console.error("数据库初始化失败:", error)
    return NextResponse.json(
      {
        success: false,
        error: "数据库初始化失败",
        details: error instanceof Error ? error.message : "未知错误"
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: "使用 POST 请求来初始化数据库"
  })
}
