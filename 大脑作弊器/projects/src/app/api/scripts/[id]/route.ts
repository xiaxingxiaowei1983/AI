import { NextRequest, NextResponse } from "next/server";
// 强制动态渲染，避免构建时执行数据库连接
export const dynamic = 'force-dynamic'

import { verifyToken } from "@/storage/database/auth";

import { scriptService } from "@/services/scriptService";

/**
 * GET /api/scripts/[id] - 获取脚本详情
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const script = await scriptService.getScriptById(id);

    if (!script) {
      return NextResponse.json({ error: "脚本不存在" }, { status: 404 });
    }

    return NextResponse.json(script);
  } catch (error: any) {
    console.error("获取脚本详情失败:", error);
    return NextResponse.json({ error: "获取脚本详情失败" }, { status: 500 });
  }
}

/**
 * PUT /api/scripts/[id] - 更新脚本
 */
export async function PUT(
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
    const { title, content, isPublic } = body;

    const script = await scriptService.updateScript(id, payload.userId, {
      title,
      content,
      isPublic,
    });

    if (!script) {
      return NextResponse.json({ error: "脚本不存在或无权限修改" }, { status: 404 });
    }

    return NextResponse.json(script);
  } catch (error: any) {
    console.error("更新脚本失败:", error);
    return NextResponse.json({ error: "更新脚本失败" }, { status: 500 });
  }
}

/**
 * DELETE /api/scripts/[id] - 删除脚本
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
    const success = await scriptService.deleteScript(id, payload.userId);

    if (!success) {
      return NextResponse.json({ error: "脚本不存在或无权限删除" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("删除脚本失败:", error);
    return NextResponse.json({ error: "删除脚本失败" }, { status: 500 });
  }
}
