import { mutationGeneric, queryGeneric } from 'convex/server';
import { v } from 'convex/values';

// 创建发布数据
export const create = mutationGeneric({
  args: {
    contentId: v.id('contentItems'),
    platforms: v.array(v.string()),
    publishDate: v.number(),
    status: v.string(),
    analytics: v.optional(v.object({
      views: v.number(),
      engagement: v.number(),
      shares: v.number(),
    })),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('publish', args);
  },
});

// 根据内容ID获取发布数据
export const getByContentId = queryGeneric({
  args: {
    contentId: v.id('contentItems'),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('publish')
      .filter((q) => q.eq(q.field('contentId'), args.contentId))
      .first();
  },
});

// 更新发布数据
export const update = mutationGeneric({
  args: {
    contentId: v.id('contentItems'),
    platforms: v.array(v.string()),
    publishDate: v.number(),
    status: v.string(),
    analytics: v.optional(v.object({
      views: v.number(),
      engagement: v.number(),
      shares: v.number(),
    })),
  },
  handler: async (ctx, args) => {
    // 查找现有数据
    const existing = await ctx.db
      .query('publish')
      .filter((q) => q.eq(q.field('contentId'), args.contentId))
      .first();
    
    if (existing) {
      return await ctx.db.patch(existing._id, args);
    } else {
      return await ctx.db.insert('publish', args);
    }
  },
});
