import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  tasks: defineTable({
    title: v.string(),
    start: v.number(), // Unix timestamp
    end: v.number(), // Unix timestamp
    description: v.string(),
    priority: v.union(v.literal('low'), v.literal('medium'), v.literal('high')),
    status: v.union(v.literal('pending'), v.literal('in_progress'), v.literal('completed')),
  })
    .index('by_start', ['start'])
    .index('by_end', ['end'])
    .index('by_status', ['status'])
    .index('by_priority', ['priority']),
});