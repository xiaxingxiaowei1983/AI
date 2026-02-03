import { NextRequest, NextResponse } from "next/server";
// 强制动态渲染，避免构建时执行数据库连接
export const dynamic = 'force-dynamic'

import { verifyToken } from "@/storage/database/auth";

import { thinkingModelService } from "@/services/thinkingModelService";

/**
 * GET /api/models - 获取思维模型列表
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const query = searchParams.get("query");
    const popular = searchParams.get("popular");

    if (query) {
      // 搜索模型
      const models = await thinkingModelService.searchModels(query);
      return NextResponse.json({ models });
    } else if (popular === "true") {
      // 获取热门模型
      const models = await thinkingModelService.getPopularModels(10);
      return NextResponse.json({ models });
    } else {
      // 获取活跃模型
      const models = await thinkingModelService.getActiveModels(category || undefined);
      return NextResponse.json({ models });
    }
  } catch (error: any) {
    console.error("获取思维模型列表失败:", error);
    return NextResponse.json({ error: "获取思维模型列表失败" }, { status: 500 });
  }
}

/**
 * POST /api/models - 创建思维模型（仅管理员）
 */
export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "");
    const payload = verifyToken(token || "");

    if (!payload || payload.role !== "admin") {
      return NextResponse.json({ error: "无权限" }, { status: 403 });
    }

    const body = await request.json();
    const { name, description, category, icon, content, examples, tags, sortOrder } = body;

    const model = await thinkingModelService.createModel({
      name,
      description,
      category,
      icon,
      content,
      examples,
      tags,
      isActive: true,
      sortOrder: sortOrder || 0,
    });

    return NextResponse.json(model);
  } catch (error: any) {
    console.error("创建思维模型失败:", error);
    return NextResponse.json({ error: "创建思维模型失败" }, { status: 500 });
  }
}
