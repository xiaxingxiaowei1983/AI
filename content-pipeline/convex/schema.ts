import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  // 内容项目主表
  contentItems: defineTable({
    title: v.string(),
    description: v.string(),
    status: v.string(), // idea, script, thumbnail, filming, publish
    createdAt: v.number(),
    updatedAt: v.number(),
    createdBy: v.string(),
    dueDate: v.optional(v.number()),
    priority: v.string(), // low, medium, high
  }),
  
  // 灵感阶段数据
  ideas: defineTable({
    contentId: v.id('contentItems'),
    ideaText: v.string(),
    tags: v.array(v.string()),
    notes: v.optional(v.string()),
  }),
  
  // 脚本阶段数据
  scripts: defineTable({
    contentId: v.id('contentItems'),
    scriptText: v.string(),
    scriptType: v.string(),
    wordCount: v.number(),
  }),
  
  // 缩略图阶段数据
  thumbnails: defineTable({
    contentId: v.id('contentItems'),
    imageUrl: v.string(),
    altText: v.optional(v.string()),
    dimensions: v.optional(v.object({
      width: v.number(),
      height: v.number(),
    })),
  }),
  
  // 拍摄阶段数据
  filming: defineTable({
    contentId: v.id('contentItems'),
    filmingPlan: v.string(),
    equipment: v.array(v.string()),
    location: v.optional(v.string()),
    schedule: v.optional(v.object({
      startTime: v.number(),
      endTime: v.number(),
      date: v.number(),
    })),
  }),
  
  // 发布阶段数据
  publish: defineTable({
    contentId: v.id('contentItems'),
    platforms: v.array(v.string()),
    publishDate: v.number(),
    status: v.string(), // scheduled, published, failed
    analytics: v.optional(v.object({
      views: v.number(),
      engagement: v.number(),
      shares: v.number(),
    })),
  }),
});
