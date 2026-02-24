import { mutationGeneric, queryGeneric } from 'convex/server';
import { v } from 'convex/values';

// 创建缩略图数据
export const create = mutationGeneric({
  args: {
    contentId: v.id('contentItems'),
    imageUrl: v.string(),
    altText: v.optional(v.string()),
    dimensions: v.optional(v.object({
      width: v.number(),
      height: v.number(),
    })),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('thumbnails', args);
  },
});

// 根据内容ID获取缩略图数据
export const getByContentId = queryGeneric({
  args: {
    contentId: v.id('contentItems'),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('thumbnails')
      .filter((q) => q.eq(q.field('contentId'), args.contentId))
      .first();
  },
});

// 更新缩略图数据
export const update = mutationGeneric({
  args: {
    contentId: v.id('contentItems'),
    imageUrl: v.string(),
    altText: v.optional(v.string()),
    dimensions: v.optional(v.object({
      width: v.number(),
      height: v.number(),
    })),
  },
  handler: async (ctx, args) => {
    // 查找现有数据
    const existing = await ctx.db
      .query('thumbnails')
      .filter((q) => q.eq(q.field('contentId'), args.contentId))
      .first();
    
    if (existing) {
      return await ctx.db.patch(existing._id, args);
    } else {
      return await ctx.db.insert('thumbnails', args);
    }
  },
});
