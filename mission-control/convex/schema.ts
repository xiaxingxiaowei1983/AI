import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  tasks: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    status: v.string(), // 'todo', 'in-progress', 'done'
    assignee: v.string(), // 'user' or 'openclaw'
    priority: v.number(), // 1-5
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index('by_status', ['status'])
    .index('by_assignee', ['assignee'])
    .index('by_priority', ['priority']),
});