import { mutationGeneric, queryGeneric } from 'convex/server';
import { v } from 'convex/values';

// 创建拍摄数据
export const create = mutationGeneric({
  args: {
    contentId: v.id('contentItems'),
    filmingPlan: v.string(),
    equipment: v.array(v.string()),
    location: v.optional(v.string()),
    schedule: v.optional(v.object({
      startTime: v.number(),
      endTime: v.number(),
      date: v.number(),
    })),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('filming', args);
  },
});

// 根据内容ID获取拍摄数据
export const getByContentId = queryGeneric({
  args: {
    contentId: v.id('contentItems'),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('filming')
      .filter((q) => q.eq(q.field('contentId'), args.contentId))
      .first();
  },
});

// 更新拍摄数据
export const update = mutationGeneric({
  args: {
    contentId: v.id('contentItems'),
    filmingPlan: v.string(),
    equipment: v.array(v.string()),
    location: v.optional(v.string()),
    schedule: v.optional(v.object({
      startTime: v.number(),
      endTime: v.number(),
      date: v.number(),
    })),
  },
  handler: async (ctx, args) => {
    // 查找现有数据
    const existing = await ctx.db
      .query('filming')
      .filter((q) => q.eq(q.field('contentId'), args.contentId))
      .first();
    
    if (existing) {
      return await ctx.db.patch(existing._id, args);
    } else {
      return await ctx.db.insert('filming', args);
    }
  },
});
