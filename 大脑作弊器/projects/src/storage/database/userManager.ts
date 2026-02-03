import { eq, and, SQL, sql } from "drizzle-orm"
import { getDb } from "coze-coding-dev-sdk"
import { users, insertUserSchema, type User, type InsertUser } from "./shared/schema"

export class UserManager {
  /**
   * 创建用户
   */
  async createUser(data: InsertUser): Promise<User> {
    const db = await getDb()
    const validated = insertUserSchema.parse(data)
    const [user] = await db.insert(users).values(validated).returning()
    return user
  }

  /**
   * 根据用户名或邮箱查找用户
   */
  async findUserByUsernameOrEmail(usernameOrEmail: string): Promise<User | null> {
    const db = await getDb()
    const conditions: SQL[] = [
      eq(users.username, usernameOrEmail),
      eq(users.email, usernameOrEmail)
    ]
    
    const [user] = await db
      .select()
      .from(users)
      .where(sql`${conditions[0]} OR ${conditions[1]}`)
    
    return user || null
  }

  /**
   * 根据ID查找用户
   */
  async findUserById(id: string): Promise<User | null> {
    const db = await getDb()
    const [user] = await db.select().from(users).where(eq(users.id, id))
    return user || null
  }

  /**
   * 检查用户名是否存在
   */
  async usernameExists(username: string): Promise<boolean> {
    const db = await getDb()
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.username, username))
    return !!user
  }

  /**
   * 检查邮箱是否存在
   */
  async emailExists(email: string): Promise<boolean> {
    const db = await getDb()
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
    return !!user
  }
}

export const userManager = new UserManager()
