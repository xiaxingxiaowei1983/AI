import { NextRequest, NextResponse } from 'next/server'
// 强制动态渲染，避免构建时执行数据库连接
export const dynamic = 'force-dynamic'

import { getDb } from 'coze-coding-dev-sdk'

import { users } from '@/storage/database/shared/schema'

import { verifyToken } from '@/storage/database/auth'

/**
 * 获取所有用户列表（管理员权限）
 */
export async function GET(request: NextRequest) {
  try {
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
    const allUsers = await db.select().from(users)

    return NextResponse.json({
      success: true,
      users: allUsers.map(u => ({
        id: u.id,
        username: u.username,
        email: u.email,
        role: u.role,
        isActive: u.isActive,
        createdAt: u.createdAt,
        updatedAt: u.updatedAt
      }))
    })
  } catch (error) {
    console.error('获取用户列表失败:', error)
    return NextResponse.json(
      { error: '获取失败', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
}
