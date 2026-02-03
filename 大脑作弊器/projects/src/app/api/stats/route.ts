import { NextRequest, NextResponse } from "next/server";
// 强制动态渲染，避免构建时执行数据库连接
export const dynamic = 'force-dynamic'

import { verifyToken } from "@/storage/database/auth";

import { statsService } from "@/services/statsService";

/**
 * GET /api/stats - 获取统计数据
 */
export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "");
    const payload = verifyToken(token || "");

    if (!payload) {
      return NextResponse.json({ error: "未授权" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const days = parseInt(searchParams.get("days") || "7", 10);

    if (type === "overall") {
      // 获取总体统计
      const stats = await statsService.getOverallStats();
      return NextResponse.json(stats);
    } else if (type === "user") {
      // 获取用户统计
      const userStats = await statsService.getUserStats(payload.userId);
      return NextResponse.json(userStats);
    } else if (type === "activity") {
      // 获取用户活跃度
      const activity = await statsService.getUserActivityStats(days);
      return NextResponse.json({ activity });
    } else if (type === "popular") {
      // 获取热门模型
      const popularModels = await statsService.getPopularModels(10);
      return NextResponse.json({ popularModels });
    } else if (type === "input") {
      // 获取输入类型分布
      const inputStats = await statsService.getInputTypeStats();
      return NextResponse.json({ inputStats });
    } else if (type === "recent") {
      // 获取最近活动（仅管理员）
      if (payload.role !== "admin") {
        return NextResponse.json({ error: "无权限" }, { status: 403 });
      }
      const activities = await statsService.getRecentActivities(20);
      return NextResponse.json({ activities });
    } else {
      // 返回简化的统计数据，供前端显示
      const userStats = await statsService.getUserStats(payload.userId);
      const popularModels = await statsService.getPopularModels(5);
      const recentActivities = payload.role === "admin"
        ? await statsService.getRecentActivities(10)
        : [];

      // 将统计数据转换为前端需要的格式
      return NextResponse.json({
        totalScripts: userStats.totalScripts,
        favorites: userStats.totalFavorites,
        shares: userStats.totalShares,
        views: userStats.totalViews,
        topModels: popularModels.map((m: any) => ({
          name: m.modelName,
          count: m.viewCount
        })),
        recentActivities: recentActivities.map((a: any) => ({
          action_type: a.actionType,
          created_at: a.createdAt
        }))
      });
    }
  } catch (error: any) {
    console.error("获取统计数据失败:", error);
    console.error("错误详情:", error.message);
    console.error("错误堆栈:", error.stack);
    return NextResponse.json({ error: "获取统计数据失败", details: error.message }, { status: 500 });
  }
}
