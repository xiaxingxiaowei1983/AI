import { NextRequest, NextResponse } from "next/server"
// 强制动态渲染，避免构建时执行数据库连接
export const dynamic = 'force-dynamic'

import { getDb } from "coze-coding-dev-sdk"

import { thinkingModels } from "@/storage/database/shared/schema"

import { eq } from "drizzle-orm"

/**
 * 获取单个思维模型
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const db = await getDb()
    const [model] = await db
      .select()
      .from(thinkingModels)
      .where(eq(thinkingModels.id, id))

    if (!model) {
      return NextResponse.json(
        { error: '思维模型不存在' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      model
    })
  } catch (error) {
    console.error('获取思维模型失败:', error)
    return NextResponse.json(
      {
        success: false,
        error: '获取思维模型失败',
        details: error instanceof Error ? error.message : '未知错误'
      },
      { status: 500 }
    )
  }
}
