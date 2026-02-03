import { getDb } from "./db"
import { users, scripts, favorites, shares, thinkingModels, usageStats, apiConfigs } from "./shared/schema"

/**
 * 初始化数据库表结构
 * 此脚本会创建所有必要的表
 */
export async function initTables() {
  console.log("开始初始化数据库表...")

  try {
    const db = await getDb()

    // 创建 users 表
    await db.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid(),
        username VARCHAR(128) NOT NULL UNIQUE,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(20) NOT NULL DEFAULT 'user',
        is_active BOOLEAN NOT NULL DEFAULT true,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE
      )
    `)

    await db.execute(`
      CREATE INDEX IF NOT EXISTS users_username_idx ON users(username)
    `)

    await db.execute(`
      CREATE INDEX IF NOT EXISTS users_email_idx ON users(email)
    `)

    console.log("✓ users 表创建完成")

    // 创建 scripts 表
    await db.execute(`
      CREATE TABLE IF NOT EXISTS scripts (
        id VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id VARCHAR(36) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        content JSONB NOT NULL,
        input_type VARCHAR(20) NOT NULL,
        input_content TEXT,
        is_public BOOLEAN NOT NULL DEFAULT false,
        share_count INTEGER NOT NULL DEFAULT 0,
        view_count INTEGER NOT NULL DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE
      )
    `)

    await db.execute(`
      CREATE INDEX IF NOT EXISTS scripts_user_id_idx ON scripts(user_id)
    `)

    await db.execute(`
      CREATE INDEX IF NOT EXISTS scripts_created_at_idx ON scripts(created_at DESC)
    `)

    await db.execute(`
      CREATE INDEX IF NOT EXISTS scripts_is_public_idx ON scripts(is_public)
    `)

    console.log("✓ scripts 表创建完成")

    // 创建 favorites 表
    await db.execute(`
      CREATE TABLE IF NOT EXISTS favorites (
        id VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id VARCHAR(36) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        script_id VARCHAR(36) NOT NULL REFERENCES scripts(id) ON DELETE CASCADE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
      )
    `)

    await db.execute(`
      CREATE INDEX IF NOT EXISTS favorites_user_id_idx ON favorites(user_id)
    `)

    await db.execute(`
      CREATE INDEX IF NOT EXISTS favorites_script_id_idx ON favorites(script_id)
    `)

    await db.execute(`
      CREATE UNIQUE INDEX IF NOT EXISTS favorites_user_script_idx ON favorites(user_id, script_id)
    `)

    console.log("✓ favorites 表创建完成")

    // 创建 shares 表
    await db.execute(`
      CREATE TABLE IF NOT EXISTS shares (
        id VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid(),
        script_id VARCHAR(36) NOT NULL REFERENCES scripts(id) ON DELETE CASCADE,
        shared_by VARCHAR(36) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        share_code VARCHAR(32) NOT NULL UNIQUE,
        expires_at TIMESTAMP WITH TIME ZONE,
        view_count INTEGER NOT NULL DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
      )
    `)

    await db.execute(`
      CREATE INDEX IF NOT EXISTS shares_script_id_idx ON shares(script_id)
    `)

    await db.execute(`
      CREATE INDEX IF NOT EXISTS shares_share_code_idx ON shares(share_code)
    `)

    await db.execute(`
      CREATE INDEX IF NOT EXISTS shares_shared_by_idx ON shares(shared_by)
    `)

    console.log("✓ shares 表创建完成")

    // 创建 thinking_models 表
    await db.execute(`
      CREATE TABLE IF NOT EXISTS thinking_models (
        id VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        description TEXT,
        category VARCHAR(100),
        icon VARCHAR(50),
        content TEXT NOT NULL,
        examples JSONB,
        tags JSONB,
        is_active BOOLEAN NOT NULL DEFAULT true,
        sort_order INTEGER NOT NULL DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE
      )
    `)

    await db.execute(`
      CREATE INDEX IF NOT EXISTS thinking_models_category_idx ON thinking_models(category)
    `)

    await db.execute(`
      CREATE INDEX IF NOT EXISTS thinking_models_is_active_idx ON thinking_models(is_active)
    `)

    await db.execute(`
      CREATE INDEX IF NOT EXISTS thinking_models_sort_order_idx ON thinking_models(sort_order)
    `)

    console.log("✓ thinking_models 表创建完成")

    // 创建 usage_stats 表
    await db.execute(`
      CREATE TABLE IF NOT EXISTS usage_stats (
        id VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id VARCHAR(36) REFERENCES users(id) ON DELETE SET NULL,
        action_type VARCHAR(50) NOT NULL,
        target_type VARCHAR(50),
        target_id VARCHAR(36),
        metadata JSONB,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
      )
    `)

    await db.execute(`
      CREATE INDEX IF NOT EXISTS usage_stats_user_id_idx ON usage_stats(user_id)
    `)

    await db.execute(`
      CREATE INDEX IF NOT EXISTS usage_stats_action_type_idx ON usage_stats(action_type)
    `)

    await db.execute(`
      CREATE INDEX IF NOT EXISTS usage_stats_target_type_idx ON usage_stats(target_type)
    `)

    await db.execute(`
      CREATE INDEX IF NOT EXISTS usage_stats_created_at_idx ON usage_stats(created_at DESC)
    `)

    console.log("✓ usage_stats 表创建完成")

    // 创建 api_configs 表
    await db.execute(`
      CREATE TABLE IF NOT EXISTS api_configs (
        id VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid(),
        config_key VARCHAR(100) NOT NULL UNIQUE,
        config_value TEXT NOT NULL,
        description TEXT,
        is_encrypted BOOLEAN NOT NULL DEFAULT false,
        updated_by VARCHAR(36) REFERENCES users(id) ON DELETE SET NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
      )
    `)

    await db.execute(`
      CREATE INDEX IF NOT EXISTS api_configs_config_key_idx ON api_configs(config_key)
    `)

    console.log("✓ api_configs 表创建完成")

    console.log("✅ 数据库表初始化完成")
  } catch (error) {
    console.error("❌ 数据库表初始化失败:", error)
    throw error
  }
}

/**
 * 初始化默认数据
 */
export async function initDefaultData() {
  console.log("开始初始化默认数据...")

  try {
    const db = await getDb()

    // 检查是否已有默认思维模型
    const existingModels = await db
      .select()
      .from(thinkingModels)
      .limit(1)

    if (existingModels.length === 0) {
      // 插入默认思维模型
      const defaultModels = [
        {
          name: "第一性原理",
          description: "将问题分解到最基本的真理，从源头出发思考问题",
          category: "思维框架",
          icon: "fa-cube",
          content: "第一性原理是一种思维方法，通过将复杂问题分解为最基本的真理和假设，然后从这些基本元素出发重新组合，创造全新的解决方案。这种方法避免了传统思维的束缚，能够产生突破性的创新。",
          examples: [
            { title: "埃隆·马斯克如何用第一性原理降低火箭成本", description: "将火箭分解为基础材料（铝、钛、铜、碳纤维），分析每种材料的市场价格，发现成本可以降低10倍。" },
          ],
          tags: ["创新", "问题解决", "深度思考"],
          isActive: true,
          sortOrder: 1,
        },
        {
          name: "80/20法则",
          description: "20%的原因产生80%的结果，关注最重要的少数",
          category: "效率工具",
          icon: "fa-chart-pie",
          content: "帕累托法则，也叫二八定律，指出在许多情况下，大约80%的结果来自于20%的原因。这个原理帮助我们识别和优先处理最重要的因素，用最小的投入获得最大的回报。",
          examples: [
            { title: "时间管理应用", description: "找出20%的关键任务，它们贡献80%的工作成果，将大部分时间精力投入这些任务。" },
          ],
          tags: ["效率", "优先级", "资源优化"],
          isActive: true,
          sortOrder: 2,
        },
        {
          name: "逆向思维",
          description: "从反面思考问题，避免愚蠢比追求聪明更容易",
          category: "思维方法",
          icon: "fa-exchange",
          content: "逆向思维是通过思考'如何失败'来理解'如何成功'的方法。查理·芒格说：'反过来想，总是反过来想。'通过避免明显的错误，我们反而更容易获得成功。",
          examples: [
            { title: "避免愚蠢", description: "与其问如何成功，不如问如何避免失败。列出所有可能毁掉项目的事项，确保这些事情不会发生。" },
          ],
          tags: ["风险管理", "创新", "决策"],
          isActive: true,
          sortOrder: 3,
        },
      ]

      await db.insert(thinkingModels).values(defaultModels)
      console.log("✓ 插入默认思维模型")
    }

    // 检查是否已有默认API配置
    const existingConfigs = await db
      .select()
      .from(apiConfigs)
      .limit(1)

    if (existingConfigs.length === 0) {
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
      ]

      await db.insert(apiConfigs).values(defaultConfigs)
      console.log("✓ 插入默认API配置")
    }

    console.log("✅ 默认数据初始化完成")
  } catch (error) {
    console.error("❌ 默认数据初始化失败:", error)
    throw error
  }
}

// 如果直接运行此脚本，则执行初始化
if (require.main === module) {
  initTables()
    .then(() => initDefaultData())
    .then(() => {
      console.log("✅ 数据库初始化成功")
      process.exit(0)
    })
    .catch((error) => {
      console.error("❌ 数据库初始化失败:", error)
      process.exit(1)
    })
}
