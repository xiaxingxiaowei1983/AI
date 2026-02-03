import { NextRequest, NextResponse } from "next/server";
// 强制动态渲染，避免构建时执行数据库连接
export const dynamic = 'force-dynamic'

import { verifyToken } from "@/storage/database/auth";

import { apiConfigService } from "@/services/apiConfigService";

/**
 * GET /api/config - 获取API配置
 */
export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "");
    const payload = verifyToken(token || "");

    if (!payload || payload.role !== "admin") {
      return NextResponse.json({ error: "无权限" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const key = searchParams.get("key");

    if (key) {
      // 获取单个配置
      const value = await apiConfigService.getConfig(key);
      return NextResponse.json({ key, value });
    } else {
      // 获取所有配置
      const configs = await apiConfigService.getAllConfigs();
      return NextResponse.json({ configs });
    }
  } catch (error: any) {
    console.error("获取API配置失败:", error);
    return NextResponse.json({ error: "获取API配置失败" }, { status: 500 });
  }
}

/**
 * POST /api/config - 设置API配置
 */
export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "");
    const payload = verifyToken(token || "");

    if (!payload || payload.role !== "admin") {
      return NextResponse.json({ error: "无权限" }, { status: 403 });
    }

    const body = await request.json();
    const { configKey, configValue, description, isEncrypted } = body;

    if (!configKey || configValue === undefined) {
      return NextResponse.json({ error: "缺少必要参数" }, { status: 400 });
    }

    const config = await apiConfigService.setConfig({
      configKey,
      configValue,
      description,
      isEncrypted,
      updatedBy: payload.userId,
    });

    return NextResponse.json(config);
  } catch (error: any) {
    console.error("设置API配置失败:", error);
    return NextResponse.json({ error: "设置API配置失败" }, { status: 500 });
  }
}

/**
 * DELETE /api/config - 删除API配置
 */
export async function DELETE(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "");
    const payload = verifyToken(token || "");

    if (!payload || payload.role !== "admin") {
      return NextResponse.json({ error: "无权限" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const key = searchParams.get("key");

    if (!key) {
      return NextResponse.json({ error: "缺少配置键" }, { status: 400 });
    }

    const success = await apiConfigService.deleteConfig(key);

    if (!success) {
      return NextResponse.json({ error: "配置不存在" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("删除API配置失败:", error);
    return NextResponse.json({ error: "删除API配置失败" }, { status: 500 });
  }
}
