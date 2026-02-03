import { NextRequest, NextResponse } from "next/server";
// 强制动态渲染，避免构建时执行数据库连接
export const dynamic = 'force-dynamic'

import { verifyToken } from "@/storage/database/auth";

import { scriptService } from "@/services/scriptService";

/**
 * POST /api/scripts/[id]/favorite - 收藏脚本
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "");
    const payload = verifyToken(token || "");

    if (!payload) {
      return NextResponse.json({ error: "未授权" }, { status: 401 });
    }

    const { id } = await params;
    const favorite = await scriptService.favoriteScript(payload.userId, id);

    return NextResponse.json(favorite);
  } catch (error: any) {
    console.error("收藏脚本失败:", error);
    return NextResponse.json({ error: "收藏脚本失败" }, { status: 500 });
  }
}

/**
 * DELETE /api/scripts/[id]/favorite - 取消收藏
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "");
    const payload = verifyToken(token || "");

    if (!payload) {
      return NextResponse.json({ error: "未授权" }, { status: 401 });
    }

    const { id } = await params;
    const success = await scriptService.unfavoriteScript(payload.userId, id);

    return NextResponse.json({ success });
  } catch (error: any) {
    console.error("取消收藏失败:", error);
    return NextResponse.json({ error: "取消收藏失败" }, { status: 500 });
  }
}
