import { eq, and, sql } from "drizzle-orm";
import { db } from "../storage/database/db";
import { apiConfigs, insertApiConfigSchema } from "../storage/database/shared/schema";
import type { InsertApiConfig, ApiConfig } from "../storage/database/shared/schema";

/**
 * API配置管理服务类
 */
export class ApiConfigService {
  /**
   * 获取配置值
   */
  async getConfig(configKey: string): Promise<string | null> {
    const [config] = await db.select().from(apiConfigs).where(eq(apiConfigs.configKey, configKey));
    return config?.configValue || null;
  }

  /**
   * 批量获取配置值
   */
  async getConfigs(configKeys: string[]): Promise<Record<string, string>> {
    const configs = await db
      .select()
      .from(apiConfigs)
      .where(
        sql`${apiConfigs.configKey} = ANY(${configKeys})`
      );

    const result: Record<string, string> = {};
    configs.forEach((config: ApiConfig) => {
      result[config.configKey] = config.configValue;
    });

    return result;
  }

  /**
   * 获取所有配置
   */
  async getAllConfigs(): Promise<ApiConfig[]> {
    return await db.select().from(apiConfigs).orderBy(apiConfigs.configKey);
  }

  /**
   * 设置配置
   */
  async setConfig(data: {
    configKey: string;
    configValue: string;
    description?: string;
    isEncrypted?: boolean;
    updatedBy?: string;
  }): Promise<ApiConfig> {
    const [existing] = await db
      .select()
      .from(apiConfigs)
      .where(eq(apiConfigs.configKey, data.configKey));

    if (existing) {
      // 更新现有配置
      const [config] = await db
        .update(apiConfigs)
        .set({
          configValue: data.configValue,
          description: data.description || existing.description,
          isEncrypted: data.isEncrypted ?? existing.isEncrypted,
          updatedBy: data.updatedBy,
          updatedAt: new Date(),
        })
        .where(eq(apiConfigs.id, existing.id))
        .returning();

      return config;
    } else {
      // 创建新配置
      const configData: InsertApiConfig = {
        configKey: data.configKey,
        configValue: data.configValue,
        description: data.description,
        isEncrypted: data.isEncrypted || false,
      };

      const [config] = await db.insert(apiConfigs).values(configData).returning();
      return config;
    }
  }

  /**
   * 批量设置配置
   */
  async setConfigs(configs: Array<{
    configKey: string;
    configValue: string;
    description?: string;
    isEncrypted?: boolean;
  }>, updatedBy?: string): Promise<void> {
    for (const configData of configs) {
      await this.setConfig({ ...configData, updatedBy });
    }
  }

  /**
   * 删除配置
   */
  async deleteConfig(configKey: string): Promise<boolean> {
    const [config] = await db
      .delete(apiConfigs)
      .where(eq(apiConfigs.configKey, configKey))
      .returning();

    return !!config;
  }

  /**
   * 获取LLM相关配置
   */
  async getLLMConfigs(): Promise<{
    defaultModel: string;
    visionModel: string;
    imageTimeout: number;
    scriptTimeout: number;
  }> {
    const configs = await this.getConfigs([
      "llm.model.default",
      "llm.model.vision",
      "llm.timeout.image",
      "llm.timeout.script",
    ]);

    return {
      defaultModel: configs["llm.model.default"] || "doubao-seed-1-8-251228",
      visionModel: configs["llm.model.vision"] || "doubao-seed-1-6-vision-250815",
      imageTimeout: parseInt(configs["llm.timeout.image"] || "30000", 10),
      scriptTimeout: parseInt(configs["llm.timeout.script"] || "60000", 10),
    };
  }

  /**
   * 重置为默认配置
   */
  async resetToDefaults(): Promise<void> {
    const defaultConfigs = [
      {
        configKey: "llm.model.default",
        configValue: "doubao-seed-1-8-251228",
        description: "默认LLM模型",
        isEncrypted: false,
      },
      {
        configKey: "llm.model.vision",
        configValue: "doubao-seed-1-6-vision-250815",
        description: "视觉识别模型",
        isEncrypted: false,
      },
      {
        configKey: "llm.timeout.image",
        configValue: "30000",
        description: "图片识别超时时间（毫秒）",
        isEncrypted: false,
      },
      {
        configKey: "llm.timeout.script",
        configValue: "60000",
        description: "脚本生成超时时间（毫秒）",
        isEncrypted: false,
      },
      {
        configKey: "script.max.length",
        configValue: "2200",
        description: "脚本最大长度",
        isEncrypted: false,
      },
      {
        configKey: "script.min.length",
        configValue: "1500",
        description: "脚本最小长度",
        isEncrypted: false,
      },
    ];

    await this.setConfigs(defaultConfigs);
  }
}

export const apiConfigService = new ApiConfigService();
