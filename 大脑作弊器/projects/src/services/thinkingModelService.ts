import { eq, and, desc, asc, sql } from "drizzle-orm";
import { db } from "../storage/database/db";
import { thinkingModels, insertThinkingModelSchema, usageStats } from "../storage/database/shared/schema";
import type { InsertThinkingModel, ThinkingModel } from "../storage/database/shared/schema";

/**
 * 思维模型管理服务类
 */
export class ThinkingModelService {
  /**
   * 创建思维模型
   */
  async createModel(data: InsertThinkingModel): Promise<ThinkingModel> {
    const [model] = await db.insert(thinkingModels).values(data).returning();
    return model;
  }

  /**
   * 获取所有活跃的思维模型
   */
  async getActiveModels(category?: string): Promise<ThinkingModel[]> {
    if (category) {
      return await db
        .select()
        .from(thinkingModels)
        .where(
          and(
            eq(thinkingModels.isActive, true),
            eq(thinkingModels.category, category)
          )
        )
        .orderBy(asc(thinkingModels.sortOrder));
    }

    return await db
      .select()
      .from(thinkingModels)
      .where(eq(thinkingModels.isActive, true))
      .orderBy(asc(thinkingModels.sortOrder));
  }

  /**
   * 获取思维模型详情
   */
  async getModelById(modelId: string): Promise<ThinkingModel | null> {
    const [model] = await db.select().from(thinkingModels).where(eq(thinkingModels.id, modelId));
    return model || null;
  }

  /**
   * 获取模型分类列表
   */
  async getCategories(): Promise<string[]> {
    const result = await db
      .selectDistinct({ category: thinkingModels.category })
      .from(thinkingModels)
      .where(eq(thinkingModels.isActive, true));

    return result
      .map((r: { category: string | null }) => r.category)
      .filter(Boolean) as string[];
  }

  /**
   * 更新思维模型
   */
  async updateModel(modelId: string, data: Partial<InsertThinkingModel>): Promise<ThinkingModel | null> {
    const [model] = await db
      .update(thinkingModels)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(thinkingModels.id, modelId))
      .returning();

    return model || null;
  }

  /**
   * 删除思维模型（软删除，设置为不活跃）
   */
  async deleteModel(modelId: string): Promise<boolean> {
    const [model] = await db
      .update(thinkingModels)
      .set({ isActive: false })
      .where(eq(thinkingModels.id, modelId))
      .returning();

    return !!model;
  }

  /**
   * 搜索思维模型
   */
  async searchModels(query: string): Promise<ThinkingModel[]> {
    return await db
      .select()
      .from(thinkingModels)
      .where(
        and(
          eq(thinkingModels.isActive, true),
          sql`${thinkingModels.name} ILIKE ${`%${query}%`} OR ${thinkingModels.description} ILIKE ${`%${query}%`}`
        )
      )
      .orderBy(asc(thinkingModels.sortOrder));
  }

  /**
   * 获取热门模型（根据查看次数排序）
   */
  async getPopularModels(limit: number = 10): Promise<ThinkingModel[]> {
    // 通过usageStats计算模型热度
    const modelViews = await db
      .select({
        targetId: usageStats.targetId,
        viewCount: sql<number>`count(*)`.as("view_count"),
      })
      .from(usageStats)
      .where(
        and(
          eq(usageStats.actionType, "view_model"),
          eq(usageStats.targetType, "model")
        )
      )
      .groupBy(usageStats.targetId)
      .orderBy(desc(sql`count(*)`))
      .limit(limit);

    // 获取对应的模型信息
    if (modelViews.length === 0) {
      // 如果没有统计数据，返回所有活跃模型
      return await this.getActiveModels();
    }

    // 过滤掉null值
    const validModelIds = modelViews
      .map((v: { targetId: string | null }) => v.targetId)
      .filter((id: string | null): id is string => id !== null) as string[];

    if (validModelIds.length === 0) {
      return await this.getActiveModels();
    }

    const models = await db
      .select()
      .from(thinkingModels)
      .where(
        and(
          eq(thinkingModels.isActive, true),
          sql`${thinkingModels.id} = ANY(${validModelIds})`
        )
      );

    // 按热度排序
    const modelMap = new Map(models.map((m: ThinkingModel) => [m.id, m]));
    return modelViews
      .map((v: { targetId: string | null }) => v.targetId ? modelMap.get(v.targetId) : null)
      .filter((m: ThinkingModel | null | undefined): m is ThinkingModel => m !== undefined && m !== null);
  }

  /**
   * 记录模型查看
   */
  async recordModelView(modelId: string, userId?: string): Promise<void> {
    await db.insert(usageStats).values({
      userId,
      actionType: "view_model",
      targetType: "model",
      targetId: modelId,
    });
  }

  /**
   * 批量更新模型排序
   */
  async updateModelSortOrder(updates: Array<{ id: string; sortOrder: number }>): Promise<void> {
    for (const update of updates) {
      await db
        .update(thinkingModels)
        .set({ sortOrder: update.sortOrder })
        .where(eq(thinkingModels.id, update.id));
    }
  }

  /**
   * 获取所有思维模型（包括不活跃的）
   */
  async getAllModels(page: number = 1, limit: number = 50): Promise<{
    models: ThinkingModel[];
    total: number;
  }> {
    const offset = (page - 1) * limit;

    const [models, countResult] = await Promise.all([
      db
        .select()
        .from(thinkingModels)
        .orderBy(asc(thinkingModels.sortOrder))
        .limit(limit)
        .offset(offset),
      db
        .select({ count: sql<number>`count(*)` })
        .from(thinkingModels),
    ]);

    return {
      models,
      total: countResult[0]?.count || 0,
    };
  }
}

export const thinkingModelService = new ThinkingModelService();
