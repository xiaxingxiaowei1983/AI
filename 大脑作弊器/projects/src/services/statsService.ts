import { eq, and, gte, lte, sql, desc } from "drizzle-orm";
import { db } from "../storage/database/db";
import { usageStats, scripts, favorites, shares, thinkingModels } from "../storage/database/shared/schema";

/**
 * 数据统计服务类
 */
export class StatsService {
  /**
   * 获取总体使用统计
   */
  async getOverallStats(): Promise<{
    totalUsers: number;
    totalScripts: number;
    totalFavorites: number;
    totalShares: number;
    totalModels: number;
    todayActions: number;
    todayGenerations: number;
  }> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [
      userCount,
      scriptCount,
      favoriteCount,
      shareCount,
      modelCount,
      todayActionsCount,
      todayGenerationsCount,
    ] = await Promise.all([
      db.select({ count: sql<number>`count(*)` }).from(usageStats),
      db.select({ count: sql<number>`count(*)` }).from(scripts),
      db.select({ count: sql<number>`count(*)` }).from(favorites),
      db.select({ count: sql<number>`count(*)` }).from(shares),
      db.select({ count: sql<number>`count(*)` }).from(thinkingModels),
      db
        .select({ count: sql<number>`count(*)` })
        .from(usageStats)
        .where(gte(usageStats.createdAt, today)),
      db
        .select({ count: sql<number>`count(*)` })
        .from(usageStats)
        .where(
          and(
            gte(usageStats.createdAt, today),
            eq(usageStats.actionType, "generate_script")
          )
        ),
    ]);

    return {
      totalUsers: userCount[0]?.count || 0,
      totalScripts: scriptCount[0]?.count || 0,
      totalFavorites: favoriteCount[0]?.count || 0,
      totalShares: shareCount[0]?.count || 0,
      totalModels: modelCount[0]?.count || 0,
      todayActions: todayActionsCount[0]?.count || 0,
      todayGenerations: todayGenerationsCount[0]?.count || 0,
    };
  }

  /**
   * 获取用户活跃度统计（按天）
   */
  async getUserActivityStats(days: number = 7): Promise<Array<{
    date: string;
    actions: number;
    generations: number;
  }>> {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    startDate.setHours(0, 0, 0, 0);

    const results = await db
      .select({
        date: sql<string>`DATE(created_at)`.as("date"),
        actions: sql<number>`count(*)`.as("actions"),
        generations: sql<number>`SUM(CASE WHEN action_type = 'generate_script' THEN 1 ELSE 0 END)`.as("generations"),
      })
      .from(usageStats)
      .where(gte(usageStats.createdAt, startDate))
      .groupBy(sql`DATE(created_at)`)
      .orderBy(sql`DATE(created_at)`);

    return results;
  }

  /**
   * 获取热门思维模型（按查看次数）
   */
  async getPopularModels(limit: number = 10): Promise<Array<{
    modelId: string;
    modelName: string;
    viewCount: number;
  }>> {
    try {
      const results = await db
        .select({
          modelId: thinkingModels.id,
          modelName: thinkingModels.name,
          viewCount: sql<number>`COALESCE(count(*), 0)`.as("view_count"),
        })
        .from(usageStats)
        .rightJoin(thinkingModels, eq(usageStats.targetId, thinkingModels.id))
        .where(
          and(
            eq(thinkingModels.isActive, true)
          )
        )
        .groupBy(thinkingModels.id, thinkingModels.name)
        .orderBy(desc(sql`COALESCE(count(*), 0)`))
        .limit(limit);

      return results;
    } catch (error) {
      console.error("获取热门模型失败:", error);
      return [];
    }
  }

  /**
   * 获取用户统计
   */
  async getUserStats(userId: string): Promise<{
    totalScripts: number;
    totalFavorites: number;
    totalShares: number;
    totalViews: number;
    todayGenerations: number;
  }> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [
      scriptCount,
      favoriteCount,
      shareCount,
      viewCount,
      todayGenerationsCount,
    ] = await Promise.all([
      db
        .select({ count: sql<number>`count(*)` })
        .from(scripts)
        .where(eq(scripts.userId, userId)),
      db
        .select({ count: sql<number>`count(*)` })
        .from(favorites)
        .where(eq(favorites.userId, userId)),
      db
        .select({ count: sql<number>`count(*)` })
        .from(shares)
        .where(eq(shares.sharedBy, userId)),
      db
        .select({ sum: sql<number>`COALESCE(SUM(view_count), 0)` })
        .from(scripts)
        .where(eq(scripts.userId, userId)),
      db
        .select({ count: sql<number>`count(*)` })
        .from(usageStats)
        .where(
          and(
            eq(usageStats.userId, userId),
            eq(usageStats.actionType, "generate_script"),
            gte(usageStats.createdAt, today)
          )
        ),
    ]);

    return {
      totalScripts: scriptCount[0]?.count || 0,
      totalFavorites: favoriteCount[0]?.count || 0,
      totalShares: shareCount[0]?.count || 0,
      totalViews: viewCount[0]?.sum || 0,
      todayGenerations: todayGenerationsCount[0]?.count || 0,
    };
  }

  /**
   * 获取输入类型分布
   */
  async getInputTypeStats(): Promise<Array<{
    inputType: string;
    count: number;
    percentage: number;
  }>> {
    const results = await db
      .select({
        inputType: scripts.inputType,
        count: sql<number>`count(*)`.as("count"),
      })
      .from(scripts)
      .groupBy(scripts.inputType);

    const total = results.reduce((sum: number, r: { inputType: string; count: number }) => sum + r.count, 0);

    return results.map((r: { inputType: string; count: number }) => ({
      inputType: r.inputType,
      count: r.count,
      percentage: total > 0 ? Math.round((r.count / total) * 100) : 0,
    }));
  }

  /**
   * 获取最近活动
   */
  async getRecentActivities(limit: number = 20): Promise<Array<{
    id: string;
    userId: string | null;
    actionType: string;
    targetType: string | null;
    targetId: string | null;
    metadata: unknown;
    createdAt: Date;
  }>> {
    return await db
      .select()
      .from(usageStats)
      .orderBy(desc(usageStats.createdAt))
      .limit(limit);
  }

  /**
   * 获取时间段内的活动统计
   */
  async getActivityByTimeRange(startDate: Date, endDate: Date): Promise<{
    totalActions: number;
    topActionTypes: Array<{ actionType: string; count: number }>;
    userGrowth: number;
  }> {
    const [totalActionsResult, topActionTypesResult] = await Promise.all([
      db
        .select({ count: sql<number>`count(*)` })
        .from(usageStats)
        .where(
          and(
            gte(usageStats.createdAt, startDate),
            lte(usageStats.createdAt, endDate)
          )
        ),
      db
        .select({
          actionType: usageStats.actionType,
          count: sql<number>`count(*)`.as("count"),
        })
        .from(usageStats)
        .where(
          and(
            gte(usageStats.createdAt, startDate),
            lte(usageStats.createdAt, endDate)
          )
        )
        .groupBy(usageStats.actionType)
        .orderBy(desc(sql`count(*)`))
        .limit(10),
    ]);

    return {
      totalActions: totalActionsResult[0]?.count || 0,
      topActionTypes: topActionTypesResult,
      userGrowth: 0, // 需要额外的用户注册统计
    };
  }
}

export const statsService = new StatsService();
