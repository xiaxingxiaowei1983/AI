import { mutationGeneric, queryGeneric } from 'convex/server';
import { v } from 'convex/values';

// 创建灵感数据
export const create = mutationGeneric({
  args: {
    contentId: v.id('contentItems'),
    ideaText: v.string(),
    tags: v.array(v.string()),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('ideas', args);
  },
});

// 根据内容ID获取灵感数据
export const getByContentId = queryGeneric({
  args: {
    contentId: v.id('contentItems'),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('ideas')
      .filter((q) => q.eq(q.field('contentId'), args.contentId))
      .first();
  },
});

// 更新灵感数据
export const update = mutationGeneric({
  args: {
    contentId: v.id('contentItems'),
    ideaText: v.string(),
    tags: v.array(v.string()),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // 查找现有数据
    const existing = await ctx.db
      .query('ideas')
      .filter((q) => q.eq(q.field('contentId'), args.contentId))
      .first();
    
    if (existing) {
      return await ctx.db.patch(existing._id, args);
    } else {
      return await ctx.db.insert('ideas', args);
    }
  },
});
