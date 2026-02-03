import { getDb as getDbFromSDK } from "coze-coding-dev-sdk"

/**
 * 获取数据库实例函数
 */
export const getDb = getDbFromSDK

/**
 * 数据库实例（懒加载）
 * 避免构建时的顶层 await 问题
 */
let dbInstance: Awaited<ReturnType<typeof getDb>> | null = null

async function getDbInstance() {
  if (!dbInstance) {
    dbInstance = await getDb()
  }
  return dbInstance
}

/**
 * 导出 db 对象（懒加载代理）
 * 保持向后兼容性
 */
export const db = new Proxy({} as any, {
  get(_target, prop) {
    return async (...args: any[]) => {
      const instance = await getDbInstance()
      return (instance as any)[prop](...args)
    }
  }
})
