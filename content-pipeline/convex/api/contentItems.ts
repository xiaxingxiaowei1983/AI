import { mutationGeneric, queryGeneric } from 'convex/server';
import { v } from 'convex/values';

// 创建内容项目
export const create = mutationGeneric({
  args: {
    title: v.string(),
    description: v.string(),
    status: v.string(),
    createdBy: v.string(),
    dueDate: v.optional(v.number()),
    priority: v.string(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    return await ctx.db.insert('contentItems', {
      ...args,
      createdAt: now,
      updatedAt: now,
    });
  },
});

// 获取所有内容项目
export const getAll = queryGeneric({
  handler: async (ctx) => {
    return await ctx.db.query('contentItems').collect();
  },
});

// 根据状态获取内容项目
export const getByStatus = queryGeneric({
  args: {
    status: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('contentItems')
      .filter((q) => q.eq(q.field('status'), args.status))
      .collect();
  },
});

// 获取单个内容项目
export const getById = queryGeneric({
  args: {
    id: v.id('contentItems'),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// 更新内容项目
export const update = mutationGeneric({
  args: {
    id: v.id('contentItems'),
    updates: v.object({
      title: v.optional(v.string()),
      description: v.optional(v.string()),
      status: v.optional(v.string()),
      dueDate: v.optional(v.number()),
      priority: v.optional(v.string()),
    }),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    return await ctx.db.patch(args.id, {
      ...args.updates,
      updatedAt: now,
    });
  },
});

// 删除内容项目
export const remove = mutationGeneric({
  args: {
    id: v.id('contentItems'),
  },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.id);
  },
});
