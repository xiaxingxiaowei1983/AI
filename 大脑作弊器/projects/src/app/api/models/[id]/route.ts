import { NextRequest, NextResponse } from "next/server";
// 强制动态渲染，避免构建时执行数据库连接
export const dynamic = 'force-dynamic'

import { verifyToken } from "@/storage/database/auth";

import { thinkingModelService } from "@/services/thinkingModelService";

/**
 * GET /api/models/[id] - 获取思维模型详情
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const model = await thinkingModelService.getModelById(id);

    if (!model) {
      return NextResponse.json({ error: "模型不存在" }, { status: 404 });
    }

    // 记录查看
    const token = request.headers.get("authorization")?.replace("Bearer ", "");
    const payload = verifyToken(token || "");
    await thinkingModelService.recordModelView(id, payload?.userId);

    return NextResponse.json(model);
  } catch (error: any) {
    console.error("获取思维模型详情失败:", error);
    return NextResponse.json({ error: "获取思维模型详情失败" }, { status: 500 });
  }
}

/**
 * PUT /api/models/[id] - 更新思维模型（仅管理员）
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "");
    const payload = verifyToken(token || "");

    if (!payload || payload.role !== "admin") {
      return NextResponse.json({ error: "无权限" }, { status: 403 });
    }

    const { id } = await params;
    const body = await request.json();
    const { name, description, category, icon, content, examples, tags, isActive, sortOrder } = body;

    const model = await thinkingModelService.updateModel(id, {
      name,
      description,
      category,
      icon,
      content,
      examples,
      tags,
      isActive,
      sortOrder,
    });

    if (!model) {
      return NextResponse.json({ error: "模型不存在" }, { status: 404 });
    }

    return NextResponse.json(model);
  } catch (error: any) {
    console.error("更新思维模型失败:", error);
    return NextResponse.json({ error: "更新思维模型失败" }, { status: 500 });
  }
}

/**
 * DELETE /api/models/[id] - 删除思维模型（仅管理员）
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "");
    const payload = verifyToken(token || "");

    if (!payload || payload.role !== "admin") {
      return NextResponse.json({ error: "无权限" }, { status: 403 });
    }

    const { id } = await params;
    const success = await thinkingModelService.deleteModel(id);

    if (!success) {
      return NextResponse.json({ error: "模型不存在" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("删除思维模型失败:", error);
    return NextResponse.json({ error: "删除思维模型失败" }, { status: 500 });
  }
}
