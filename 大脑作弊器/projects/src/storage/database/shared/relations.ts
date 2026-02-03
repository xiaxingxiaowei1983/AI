import { relations } from "drizzle-orm/relations";
import {
  users,
  scripts,
  favorites,
  shares,
  thinkingModels,
  usageStats,
  apiConfigs,
} from "./schema";

export const usersRelations = relations(users, ({ many }) => ({
  scripts: many(scripts),
  favorites: many(favorites),
  shares: many(shares),
  usageStats: many(usageStats),
  apiConfigs: many(apiConfigs),
}));

export const scriptsRelations = relations(scripts, ({ one, many }) => ({
  user: one(users, {
    fields: [scripts.userId],
    references: [users.id],
  }),
  favorites: many(favorites),
  shares: many(shares),
  usageStats: many(usageStats),
}));

export const favoritesRelations = relations(favorites, ({ one }) => ({
  user: one(users, {
    fields: [favorites.userId],
    references: [users.id],
  }),
  script: one(scripts, {
    fields: [favorites.scriptId],
    references: [scripts.id],
  }),
}));

export const sharesRelations = relations(shares, ({ one }) => ({
  script: one(scripts, {
    fields: [shares.scriptId],
    references: [scripts.id],
  }),
  sharedByUser: one(users, {
    fields: [shares.sharedBy],
    references: [users.id],
  }),
}));

export const thinkingModelsRelations = relations(thinkingModels, ({ many }) => ({
  usageStats: many(usageStats),
}));

export const usageStatsRelations = relations(usageStats, ({ one }) => ({
  user: one(users, {
    fields: [usageStats.userId],
    references: [users.id],
  }),
  script: one(scripts, {
    fields: [usageStats.targetId],
    references: [scripts.id],
  }),
  model: one(thinkingModels, {
    fields: [usageStats.targetId],
    references: [thinkingModels.id],
  }),
}));

export const apiConfigsRelations = relations(apiConfigs, ({ one }) => ({
  updatedByUser: one(users, {
    fields: [apiConfigs.updatedBy],
    references: [users.id],
  }),
}));

