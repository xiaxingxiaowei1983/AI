import { NextRequest, NextResponse } from "next/server";
// 强制动态渲染，避免构建时执行数据库连接
export const dynamic = 'force-dynamic'

import { verifyToken } from "@/storage/database/auth";

import { scriptService } from "@/services/scriptService";

import { fileStorageService } from "@/storage/s3";

/**
 * GET /api/scripts - 获取脚本列表
 */
export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "");
    const payload = verifyToken(token || "");

    if (!payload) {
      return NextResponse.json({ error: "未授权" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type"); // 'history', 'favorites', 'search'
    const page = parseInt(searchParams.get("page") || "1", 10);
    const query = searchParams.get("query");

    if (type === "history") {
      // 获取历史记录
      const result = await scriptService.getUserScripts(payload.userId, page, 20);
      return NextResponse.json(result);
    } else if (type === "favorites") {
      // 获取收藏列表
      const result = await scriptService.getUserFavorites(payload.userId, page, 20);
      return NextResponse.json(result);
    } else if (type === "search" && query) {
      // 搜索脚本
      const result = await scriptService.searchScripts(payload.userId, query, page, 20);
      return NextResponse.json(result);
    } else {
      return NextResponse.json({ error: "无效的请求类型" }, { status: 400 });
    }
  } catch (error: any) {
    console.error("获取脚本列表失败:", error);
    return NextResponse.json({ error: "获取脚本列表失败" }, { status: 500 });
  }
}

/**
 * POST /api/scripts - 保存脚本
 */
export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "");
    const payload = verifyToken(token || "");

    if (!payload) {
      return NextResponse.json({ error: "未授权" }, { status: 401 });
    }

    const body = await request.json();
    const { title, content, inputType, inputContent } = body;

    if (!content || !inputType) {
      return NextResponse.json({ error: "缺少必要参数" }, { status: 400 });
    }

    const script = await scriptService.saveScript({
      userId: payload.userId,
      title: title || "未命名脚本",
      content,
      inputType,
      inputContent: inputContent || "",
    });

    return NextResponse.json(script);
  } catch (error: any) {
    console.error("保存脚本失败:", error);
    return NextResponse.json({ error: "保存脚本失败" }, { status: 500 });
  }
}
