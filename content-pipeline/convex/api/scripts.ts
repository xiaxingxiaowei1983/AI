import { mutationGeneric, queryGeneric } from 'convex/server';
import { v } from 'convex/values';

// 创建脚本数据
export const create = mutationGeneric({
  args: {
    contentId: v.id('contentItems'),
    scriptText: v.string(),
    scriptType: v.string(),
    wordCount: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('scripts', args);
  },
});

// 根据内容ID获取脚本数据
export const getByContentId = queryGeneric({
  args: {
    contentId: v.id('contentItems'),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('scripts')
      .filter((q) => q.eq(q.field('contentId'), args.contentId))
      .first();
  },
});

// 更新脚本数据
export const update = mutationGeneric({
  args: {
    contentId: v.id('contentItems'),
    scriptText: v.string(),
    scriptType: v.string(),
    wordCount: v.number(),
  },
  handler: async (ctx, args) => {
    // 查找现有数据
    const existing = await ctx.db
      .query('scripts')
      .filter((q) => q.eq(q.field('contentId'), args.contentId))
      .first();
    
    if (existing) {
      return await ctx.db.patch(existing._id, args);
    } else {
      return await ctx.db.insert('scripts', args);
    }
  },
});
