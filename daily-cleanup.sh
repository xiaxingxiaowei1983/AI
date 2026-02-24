#!/bin/bash

# AI公司化改造 - 每日清理脚本
# 用于实现记忆生命周期管理
# 执行时间: 每日凌晨

# 脚本功能:
# 1. 将7天前的P0任务标记为P1（任务归档）
# 2. 将30天前的P1任务归档到P2（进入档案室）
# 3. 更新.abstract索引文件（知识地图更新）
# 4. 清理临时文件和日志

# 定义常量
BASE_DIR="$(pwd)"
SHARED_MEMORY_DIR="$BASE_DIR/shared-memory"
AGENTS_DIR="$BASE_DIR/agents"
ABSTRACT_FILE="$BASE_DIR/.abstract"
LOG_FILE="$BASE_DIR/cleanup.log"

# 定义时间阈值
P0_TO_P1_DAYS=7
P1_TO_P2_DAYS=30

# 日志函数
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" >> "$LOG_FILE"
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

# 开始清理
log "开始执行每日清理任务..."

# 1. 清理临时文件
log "清理临时文件..."
find "$BASE_DIR" -name "*.tmp" -o -name "*.log" -o -name "*.swp" | grep -v "cleanup.log" | xargs rm -f 2>/dev/null

# 2. 处理智能体的个人记忆
log "处理智能体个人记忆..."

# 获取所有智能体目录
AGENT_DIRS=$(find "$AGENTS_DIR" -type d -name "memory" | grep -v "node_modules")

for MEMORY_DIR in $AGENT_DIRS; do
    log "处理智能体记忆: $MEMORY_DIR"
    
    # 处理P0目录（7天前的标记为P1）
    P0_DIR="$MEMORY_DIR/P0"
    if [ -d "$P0_DIR" ]; then
        log "  处理P0目录..."
        find "$P0_DIR" -type f -mtime +$P0_TO_P1_DAYS | while read -r FILE; do
            FILE_NAME=$(basename "$FILE")
            DEST_FILE="$MEMORY_DIR/P1/$FILE_NAME"
            log "    将7天前的文件移至P1: $FILE_NAME"
            mv "$FILE" "$DEST_FILE" 2>/dev/null
        done
    fi
    
    # 处理P1目录（30天前的归档到P2）
    P1_DIR="$MEMORY_DIR/P1"
    if [ -d "$P1_DIR" ]; then
        log "  处理P1目录..."
        find "$P1_DIR" -type f -mtime +$P1_TO_P2_DAYS | while read -r FILE; do
            FILE_NAME=$(basename "$FILE")
            DEST_FILE="$MEMORY_DIR/P2/$FILE_NAME"
            log "    将30天前的文件移至P2: $FILE_NAME"
            mv "$FILE" "$DEST_FILE" 2>/dev/null
        done
    fi
    
    # 清理空目录
    find "$MEMORY_DIR" -type d -empty | xargs rmdir 2>/dev/null

done

# 3. 处理共享记忆系统
log "处理共享记忆系统..."

# 清理共享记忆中的过时文件
find "$SHARED_MEMORY_DIR" -type f -mtime +90 | xargs rm -f 2>/dev/null

# 4. 更新.abstract索引文件
log "更新知识地图索引..."
if [ -f "$ABSTRACT_FILE" ]; then
    # 备份原索引文件
    cp "$ABSTRACT_FILE" "$ABSTRACT_FILE.bak" 2>/dev/null
    
    # 更新索引文件中的时间戳
    sed -i 's/\(版本号:.*\)/\1 (更新于: '"$(date '+%Y-%m-%d %H:%M:%S')"')/' "$ABSTRACT_FILE" 2>/dev/null
    
    log "知识地图索引已更新"
else
    log "警告: 知识地图索引文件不存在"
fi

# 5. 清理过大的日志文件
log "清理过大的日志文件..."
find "$BASE_DIR" -name "*.log" -size +10M | xargs truncate -s 1M 2>/dev/null

# 6. 生成清理报告
log "生成清理报告..."

# 统计清理结果
TOTAL_FILES_MOVED=0
TOTAL_FILES_DELETED=0

# 计算移动的文件数
for MEMORY_DIR in $AGENT_DIRS; do
    FILES_MOVED=$(find "$MEMORY_DIR/P1" -type f | wc -l)
    TOTAL_FILES_MOVED=$((TOTAL_FILES_MOVED + FILES_MOVED))
done

# 计算删除的文件数
TOTAL_FILES_DELETED=$(find "$BASE_DIR" -name "*.tmp" -o -name "*.log" -o -name "*.swp" | grep -v "cleanup.log" | wc -l)

log "清理完成!"
log "总计移动文件: $TOTAL_FILES_MOVED"
log "总计删除文件: $TOTAL_FILES_DELETED"
log "下次清理时间: $(date -d "+1 day" '+%Y-%m-%d %H:%M:%S')"

# 脚本结束
log "每日清理任务执行完毕"
echo "" >> "$LOG_FILE"

# 确保脚本可执行
chmod +x "$0"
