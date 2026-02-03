import { pgTable, varchar, boolean, timestamp, text, integer, jsonb } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"
import { createSchemaFactory } from "drizzle-zod"
import { z } from "zod"

// 用户表
export const users = pgTable(
  "users",
  {
    id: varchar("id", { length: 36 })
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    username: varchar("username", { length: 128 }).notNull().unique(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    password: varchar("password", { length: 255 }).notNull(),
    role: varchar("role", { length: 20 }).notNull().default("user"), // 'user' 或 'admin'
    isActive: boolean("is_active").notNull().default(true),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }),
  },
  (table) => ({
    usernameIdx: sql`CREATE INDEX IF NOT EXISTS users_username_idx ON users(username)`,
    emailIdx: sql`CREATE INDEX IF NOT EXISTS users_email_idx ON users(email)`,
  })
)

// 脚本历史记录表
export const scripts = pgTable(
  "scripts",
  {
    id: varchar("id", { length: 36 })
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    userId: varchar("user_id", { length: 36 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    title: varchar("title", { length: 255 }).notNull(),
    content: jsonb("content").notNull(), // 存储 name, dao, fa, shu, qi, li
    inputType: varchar("input_type", { length: 20 }).notNull(), // 'file', 'url', 'image'
    inputContent: text("input_content"), // 存储输入内容（文件路径、URL或base64）
    isPublic: boolean("is_public").notNull().default(false),
    shareCount: integer("share_count").notNull().default(0),
    viewCount: integer("view_count").notNull().default(0),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }),
  },
  (table) => ({
    userIdIdx: sql`CREATE INDEX IF NOT EXISTS scripts_user_id_idx ON scripts(user_id)`,
    createdAtIdx: sql`CREATE INDEX IF NOT EXISTS scripts_created_at_idx ON scripts(created_at DESC)`,
    isPublicIdx: sql`CREATE INDEX IF NOT EXISTS scripts_is_public_idx ON scripts(is_public)`,
  })
)

// 收藏表
export const favorites = pgTable(
  "favorites",
  {
    id: varchar("id", { length: 36 })
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    userId: varchar("user_id", { length: 36 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    scriptId: varchar("script_id", { length: 36 })
      .notNull()
      .references(() => scripts.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    userIdIdx: sql`CREATE INDEX IF NOT EXISTS favorites_user_id_idx ON favorites(user_id)`,
    scriptIdIdx: sql`CREATE INDEX IF NOT EXISTS favorites_script_id_idx ON favorites(script_id)`,
    uniqueIdx: sql`CREATE UNIQUE INDEX IF NOT EXISTS favorites_user_script_idx ON favorites(user_id, script_id)`,
  })
)

// 分享表
export const shares = pgTable(
  "shares",
  {
    id: varchar("id", { length: 36 })
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    scriptId: varchar("script_id", { length: 36 })
      .notNull()
      .references(() => scripts.id, { onDelete: "cascade" }),
    sharedBy: varchar("shared_by", { length: 36 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    shareCode: varchar("share_code", { length: 32 }).notNull().unique(), // 用于分享的唯一码
    expiresAt: timestamp("expires_at", { withTimezone: true }), // 分享过期时间，null表示永不过期
    viewCount: integer("view_count").notNull().default(0),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    scriptIdIdx: sql`CREATE INDEX IF NOT EXISTS shares_script_id_idx ON shares(script_id)`,
    shareCodeIdx: sql`CREATE INDEX IF NOT EXISTS shares_share_code_idx ON shares(share_code)`,
    sharedByIdx: sql`CREATE INDEX IF NOT EXISTS shares_shared_by_idx ON shares(shared_by)`,
  })
)

// 思维模型表
export const thinkingModels = pgTable(
  "thinking_models",
  {
    id: varchar("id", { length: 36 })
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    name: varchar("name", { length: 255 }).notNull(),
    description: text("description"),
    category: varchar("category", { length: 100 }), // 分类：决策、创新、学习等
    icon: varchar("icon", { length: 50 }), // 图标名称
    content: text("content").notNull(), // 模型的详细内容
    examples: jsonb("examples"), // 示例数据
    tags: jsonb("tags"), // 标签数组
    isActive: boolean("is_active").notNull().default(true),
    sortOrder: integer("sort_order").notNull().default(0), // 排序
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }),
  },
  (table) => ({
    categoryIdx: sql`CREATE INDEX IF NOT EXISTS thinking_models_category_idx ON thinking_models(category)`,
    isActiveIdx: sql`CREATE INDEX IF NOT EXISTS thinking_models_is_active_idx ON thinking_models(is_active)`,
    sortOrderIdx: sql`CREATE INDEX IF NOT EXISTS thinking_models_sort_order_idx ON thinking_models(sort_order)`,
  })
)

// 使用统计表
export const usageStats = pgTable(
  "usage_stats",
  {
    id: varchar("id", { length: 36 })
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    userId: varchar("user_id", { length: 36 })
      .references(() => users.id, { onDelete: "set null" }),
    actionType: varchar("action_type", { length: 50 }).notNull(), // 'generate_script', 'view_model', 'favorite', 'share' 等
    targetType: varchar("target_type", { length: 50 }), // 'script', 'model' 等
    targetId: varchar("target_id", { length: 36 }), // 目标对象的ID
    metadata: jsonb("metadata"), // 额外的元数据
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    userIdIdx: sql`CREATE INDEX IF NOT EXISTS usage_stats_user_id_idx ON usage_stats(user_id)`,
    actionTypeIdx: sql`CREATE INDEX IF NOT EXISTS usage_stats_action_type_idx ON usage_stats(action_type)`,
    targetTypeIdx: sql`CREATE INDEX IF NOT EXISTS usage_stats_target_type_idx ON usage_stats(target_type)`,
    createdAtIdx: sql`CREATE INDEX IF NOT EXISTS usage_stats_created_at_idx ON usage_stats(created_at DESC)`,
  })
)

// API配置表
export const apiConfigs = pgTable(
  "api_configs",
  {
    id: varchar("id", { length: 36 })
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    configKey: varchar("config_key", { length: 100 }).notNull().unique(),
    configValue: text("config_value").notNull(),
    description: text("description"),
    isEncrypted: boolean("is_encrypted").notNull().default(false), // 是否加密存储
    updatedBy: varchar("updated_by", { length: 36 })
      .references(() => users.id, { onDelete: "set null" }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    configKeyIdx: sql`CREATE INDEX IF NOT EXISTS api_configs_config_key_idx ON api_configs(config_key)`,
  })
)

// 使用 createSchemaFactory 配置 date coercion
const { createInsertSchema: createCoercedInsertSchema } = createSchemaFactory({
  coerce: { date: true },
})

// Zod schemas for validation
export const insertUserSchema = createCoercedInsertSchema(users).pick({
  username: true,
  email: true,
  password: true,
  role: true,
})

export const loginUserSchema = z.object({
  username: z.string().min(1, "用户名不能为空"),
  password: z.string().min(6, "密码长度至少为6位"),
})

export const insertScriptSchema = createCoercedInsertSchema(scripts).pick({
  userId: true,
  title: true,
  content: true,
  inputType: true,
  inputContent: true,
  isPublic: true,
})

export const insertFavoriteSchema = createCoercedInsertSchema(favorites).pick({
  userId: true,
  scriptId: true,
})

export const insertThinkingModelSchema = createCoercedInsertSchema(thinkingModels).pick({
  name: true,
  description: true,
  category: true,
  icon: true,
  content: true,
  examples: true,
  tags: true,
  isActive: true,
  sortOrder: true,
})

export const insertUsageStatSchema = createCoercedInsertSchema(usageStats).pick({
  userId: true,
  actionType: true,
  targetType: true,
  targetId: true,
  metadata: true,
})

export const insertApiConfigSchema = createCoercedInsertSchema(apiConfigs).pick({
  configKey: true,
  configValue: true,
  description: true,
  isEncrypted: true,
})

// TypeScript types
export type User = typeof users.$inferSelect
export type InsertUser = z.infer<typeof insertUserSchema>
export type LoginUser = z.infer<typeof loginUserSchema>

export type Script = typeof scripts.$inferSelect
export type InsertScript = z.infer<typeof insertScriptSchema>

export type Favorite = typeof favorites.$inferSelect
export type InsertFavorite = z.infer<typeof insertFavoriteSchema>

export type Share = typeof shares.$inferSelect

export type ThinkingModel = typeof thinkingModels.$inferSelect
export type InsertThinkingModel = z.infer<typeof insertThinkingModelSchema>

export type UsageStat = typeof usageStats.$inferSelect
export type InsertUsageStat = z.infer<typeof insertUsageStatSchema>

export type ApiConfig = typeof apiConfigs.$inferSelect
export type InsertApiConfig = z.infer<typeof insertApiConfigSchema>

