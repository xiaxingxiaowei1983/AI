import { NextRequest, NextResponse } from "next/server";
// 强制动态渲染，避免构建时执行数据库连接
export const dynamic = 'force-dynamic'

import { scriptService } from "@/services/scriptService";

/**
 * GET /api/share/[code] - 通过分享码获取脚本
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await params;
    const result = await scriptService.getScriptByShareCode(code);

    if (!result) {
      return NextResponse.json({ error: "分享链接无效或已过期" }, { status: 404 });
    }

    return NextResponse.json({
      script: result.script,
      viewCount: result.viewCount,
    });
  } catch (error: any) {
    console.error("获取分享脚本失败:", error);
    return NextResponse.json({ error: "获取分享脚本失败" }, { status: 500 });
  }
}
