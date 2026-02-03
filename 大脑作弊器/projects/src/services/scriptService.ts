import { eq, and, desc, sql } from "drizzle-orm";
import { db } from "../storage/database/db";
import { scripts, favorites, shares, usageStats, insertScriptSchema, insertFavoriteSchema } from "../storage/database/shared/schema";
import { fileStorageService } from "../storage/s3";
import type { InsertScript, InsertFavorite, Script, Favorite } from "../storage/database/shared/schema";

/**
 * 脚本管理服务类
 */
export class ScriptService {
  /**
   * 保存脚本到历史记录
   */
  async saveScript(data: {
    userId: string;
    title: string;
    content: Record<string, any>;
    inputType: string;
    inputContent: string;
  }): Promise<Script> {
    const scriptData: InsertScript = {
      userId: data.userId,
      title: data.title || "未命名脚本",
      content: data.content,
      inputType: data.inputType,
      inputContent: data.inputContent,
      isPublic: false,
    };

    const [script] = await db.insert(scripts).values(scriptData).returning();

    // 记录使用统计
    await this.recordUsage({
      userId: data.userId,
      actionType: "generate_script",
      targetType: "script",
      targetId: script.id,
      metadata: { inputType: data.inputType },
    });

    return script;
  }

  /**
   * 获取用户的历史记录
   */
  async getUserScripts(userId: string, page: number = 1, limit: number = 20): Promise<{
    scripts: Script[];
    total: number;
  }> {
    const offset = (page - 1) * limit;

    const [userScripts, countResult] = await Promise.all([
      db
        .select()
        .from(scripts)
        .where(eq(scripts.userId, userId))
        .orderBy(desc(scripts.createdAt))
        .limit(limit)
        .offset(offset),
      db
        .select({ count: sql<number>`count(*)` })
        .from(scripts)
        .where(eq(scripts.userId, userId)),
    ]);

    return {
      scripts: userScripts,
      total: countResult[0]?.count || 0,
    };
  }

  /**
   * 获取脚本详情
   */
  async getScriptById(scriptId: string): Promise<Script | null> {
    const [script] = await db.select().from(scripts).where(eq(scripts.id, scriptId));
    return script || null;
  }

  /**
   * 更新脚本
   */
  async updateScript(scriptId: string, userId: string, data: Partial<InsertScript>): Promise<Script | null> {
    const [script] = await db
      .update(scripts)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(and(eq(scripts.id, scriptId), eq(scripts.userId, userId)))
      .returning();

    return script || null;
  }

  /**
   * 删除脚本
   */
  async deleteScript(scriptId: string, userId: string): Promise<boolean> {
    const [script] = await db
      .delete(scripts)
      .where(and(eq(scripts.id, scriptId), eq(scripts.userId, userId)))
      .returning();

    if (script && script.inputContent?.startsWith("s3://")) {
      // 删除关联的文件
      const fileKey = script.inputContent.replace("s3://", "");
      await fileStorageService.deleteFile(fileKey);
    }

    return !!script;
  }

  /**
   * 收藏脚本
   */
  async favoriteScript(userId: string, scriptId: string): Promise<Favorite> {
    const favoriteData: InsertFavorite = {
      userId,
      scriptId,
    };

    const [favorite] = await db.insert(favorites).values(favoriteData).returning();

    // 记录使用统计
    await this.recordUsage({
      userId,
      actionType: "favorite",
      targetType: "script",
      targetId: scriptId,
    });

    return favorite;
  }

  /**
   * 取消收藏
   */
  async unfavoriteScript(userId: string, scriptId: string): Promise<boolean> {
    const [favorite] = await db
      .delete(favorites)
      .where(and(eq(favorites.userId, userId), eq(favorites.scriptId, scriptId)))
      .returning();

    return !!favorite;
  }

  /**
   * 获取用户的收藏列表
   */
  async getUserFavorites(userId: string, page: number = 1, limit: number = 20): Promise<{
    favorites: (Favorite & { script: Script })[];
    total: number;
  }> {
    const offset = (page - 1) * limit;

    type FavoriteWithScript = Favorite & { script: Script | null };

    const [userFavorites, countResult] = await Promise.all([
      db
        .select({
          id: favorites.id,
          userId: favorites.userId,
          scriptId: favorites.scriptId,
          createdAt: favorites.createdAt,
          script: scripts,
        })
        .from(favorites)
        .leftJoin(scripts, eq(favorites.scriptId, scripts.id))
        .where(eq(favorites.userId, userId))
        .orderBy(desc(favorites.createdAt))
        .limit(limit)
        .offset(offset),
      db
        .select({ count: sql<number>`count(*)` })
        .from(favorites)
        .where(eq(favorites.userId, userId)),
    ]);

    return {
      favorites: userFavorites.map((f: FavoriteWithScript) => ({
        id: f.id,
        userId: f.userId,
        scriptId: f.scriptId,
        createdAt: f.createdAt,
        script: f.script!,
      })),
      total: countResult[0]?.count || 0,
    };
  }

  /**
   * 分享脚本（生成分享码）
   */
  async shareScript(scriptId: string, userId: string, expireDays?: number): Promise<string> {
    const shareCode = this.generateShareCode();
    const expiresAt = expireDays ? new Date(Date.now() + expireDays * 24 * 60 * 60 * 1000) : null;

    const [share] = await db.insert(shares).values({
      scriptId,
      sharedBy: userId,
      shareCode,
      expiresAt,
    }).returning();

    // 更新脚本的分享计数
    await db
      .update(scripts)
      .set({ shareCount: sql<number>`share_count + 1` })
      .where(eq(scripts.id, scriptId));

    // 记录使用统计
    await this.recordUsage({
      userId,
      actionType: "share",
      targetType: "script",
      targetId: scriptId,
      metadata: { shareCode, expiresAt },
    });

    return shareCode;
  }

  /**
   * 通过分享码获取脚本
   */
  async getScriptByShareCode(shareCode: string): Promise<{ script: Script; viewCount: number } | null> {
    const [share] = await db.select().from(shares).where(eq(shares.shareCode, shareCode));

    if (!share) {
      return null;
    }

    // 检查是否过期
    if (share.expiresAt && new Date() > share.expiresAt) {
      return null;
    }

    // 获取脚本
    const [script] = await db.select().from(scripts).where(eq(scripts.id, share.scriptId));

    if (!script) {
      return null;
    }

    // 增加查看计数
    await db
      .update(shares)
      .set({ viewCount: sql<number>`view_count + 1` })
      .where(eq(shares.id, share.id));

    await db
      .update(scripts)
      .set({ viewCount: sql<number>`view_count + 1` })
      .where(eq(scripts.id, script.id));

    return {
      script,
      viewCount: share.viewCount + 1,
    };
  }

  /**
   * 检查脚本是否已被用户收藏
   */
  async isScriptFavorited(userId: string, scriptId: string): Promise<boolean> {
    const [favorite] = await db
      .select()
      .from(favorites)
      .where(and(eq(favorites.userId, userId), eq(favorites.scriptId, scriptId)));

    return !!favorite;
  }

  /**
   * 搜索脚本（仅搜索公开脚本和用户自己的脚本）
   */
  async searchScripts(userId: string, query: string, page: number = 1, limit: number = 20): Promise<{
    scripts: Script[];
    total: number;
  }> {
    const offset = (page - 1) * limit;

    const [searchResults, countResult] = await Promise.all([
      db
        .select()
        .from(scripts)
        .where(
          and(
            sql`${scripts.title} ILIKE ${`%${query}%`}`,
            sql`(${scripts.isPublic} = true OR ${scripts.userId} = ${userId})`
          )
        )
        .orderBy(desc(scripts.createdAt))
        .limit(limit)
        .offset(offset),
      db
        .select({ count: sql<number>`count(*)` })
        .from(scripts)
        .where(
          and(
            sql`${scripts.title} ILIKE ${`%${query}%`}`,
            sql`(${scripts.isPublic} = true OR ${scripts.userId} = ${userId})`
          )
        ),
    ]);

    return {
      scripts: searchResults,
      total: countResult[0]?.count || 0,
    };
  }

  /**
   * 生成随机分享码
   */
  private generateShareCode(): string {
    return Math.random().toString(36).substring(2, 8) + Date.now().toString(36);
  }

  /**
   * 记录使用统计
   */
  private async recordUsage(data: {
    userId: string;
    actionType: string;
    targetType: string;
    targetId: string;
    metadata?: any;
  }): Promise<void> {
    await db.insert(usageStats).values({
      userId: data.userId,
      actionType: data.actionType,
      targetType: data.targetType,
      targetId: data.targetId,
      metadata: data.metadata,
    });
  }
}

export const scriptService = new ScriptService();
