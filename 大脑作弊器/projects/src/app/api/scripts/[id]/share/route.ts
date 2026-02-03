import { NextRequest, NextResponse } from "next/server";
// 强制动态渲染，避免构建时执行数据库连接
export const dynamic = 'force-dynamic'

import { verifyToken } from "@/storage/database/auth";

import { scriptService } from "@/services/scriptService";

/**
 * POST /api/scripts/[id]/share - 生成分享链接
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
    const body = await request.json();
    const { expireDays } = body;

    const shareCode = await scriptService.shareScript(id, payload.userId, expireDays);

    // 返回分享链接
    const shareUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:5000"}/share/${shareCode}`;

    return NextResponse.json({
      shareCode,
      shareUrl,
    });
  } catch (error: any) {
    console.error("生成分享链接失败:", error);
    return NextResponse.json({ error: "生成分享链接失败" }, { status: 500 });
  }
}
