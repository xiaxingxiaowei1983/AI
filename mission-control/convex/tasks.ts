import { query, mutation } from './_generated/server';

// 查询所有任务
export const getAllTasks = query(async ({ db }) => {
  return await db.query('tasks').collect();
});

// 根据ID查询任务
export const getTaskById = query(async ({ db }, { id }) => {
  return await db.get(id);
});

// 创建新任务
export const createTask = mutation(async ({ db }, { title, start, end, description, priority, status }) => {
  return await db.insert('tasks', {
    title,
    start,
    end,
    description,
    priority,
    status
  });
});

// 更新任务
export const updateTask = mutation(async ({ db }, { id, title, start, end, description, priority, status }) => {
  return await db.patch(id, {
    title,
    start,
    end,
    description,
    priority,
    status
  });
});

// 删除任务
export const deleteTask = mutation(async ({ db }, { id }) => {
  return await db.delete(id);
});

// 根据状态查询任务
export const getTasksByStatus = query(async ({ db }, { status }) => {
  return await db.query('tasks').withIndex('by_status', (q) => q.eq('status', status)).collect();
});

// 根据优先级查询任务
export const getTasksByPriority = query(async ({ db }, { priority }) => {
  return await db.query('tasks').withIndex('by_priority', (q) => q.eq('priority', priority)).collect();
});

// 查询指定时间范围内的任务
export const getTasksInRange = query(async ({ db }, { start, end }) => {
  return await db.query('tasks').filter((q) => 
    q.and(
      q.gte(q.field('start'), start),
      q.lte(q.field('end'), end)
    )
  ).collect();
});