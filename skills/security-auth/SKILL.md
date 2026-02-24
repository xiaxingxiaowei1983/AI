---
name: "security-auth"
description: "权限配置与安全验证 SKILL，基于飞书 OpenID 的身份验证和权限管理"
author: "OpenClaw Team"
version: "1.0.0"
category: "security"
platforms: ["windows", "linux"]
requires: []
config:
  - key: "ADMIN_OPENID"
    value: ""
    description: "管理员飞书 OpenID"
  - key: "SECURITY_LEVEL"
    value: "HIGH"
    description: "安全级别"

# 权限配置与安全验证 SKILL

## 功能
- 基于飞书 OpenID 的身份验证
- 分离存储的权限配置管理
- 敏感操作的安全验证流程
- 权限级别控制和访问管理

## 使用场景
- 系统级操作的权限控制
- 多用户环境的权限管理
- 企业级安全合规要求
- 敏感操作的授权验证

## 核心组件
### 1. 飞书 OpenID 验证
- 飞书用户身份验证
- OpenID 解析和验证
- 会话管理和状态维护

### 2. 系统级配置管理
- 分离存储的权限配置
- 配置文件加密和保护
- 配置版本控制和审计

### 3. 权限验证脚本
- 敏感操作验证
- 权限级别检查
- 操作审计和日志

## 配置
### 环境变量
- `ADMIN_OPENID`: 管理员飞书 OpenID
- `SECURITY_LEVEL`: 安全级别 (LOW, MEDIUM, HIGH)
- `AUDIT_LOG_ENABLED`: 是否启用审计日志

### 配置文件
```yaml
# system-config/admin.conf
ADMIN_NAME=Admin
ADMIN_OPENID=ou_your_openid
ADMIN_ROLE=最高管理员
SECURITY_LEVEL=HIGH
AUDIT_LOG_ENABLED=true
```

## 使用示例
### 1. 验证管理员身份
```bash
# 验证用户是否为管理员
verify_admin.sh --openid ou_your_openid

# 执行需要管理员权限的操作
admin_command.sh --action restart_gateway --openid ou_your_openid
```

### 2. 权限检查
```javascript
// check-permission.js
function checkPermission(userId, action) {
  // 读取系统配置
  const adminConfig = readAdminConfig();
  
  // 验证身份
  if (userId === adminConfig.ADMIN_OPENID) {
    return "最高权限";
  }
  
  // 敏感操作列表
  const sensitiveActions = [
    "restart_gateway",
    "modify_config",
    "access_system_files",
    "shutdown",
    "add_model"
  ];
  
  if (sensitiveActions.includes(action)) {
    return "需要管理员权限";
  }
  
  return "普通权限";
}

// 使用示例
const permission = checkPermission("ou_user_openid", "restart_gateway");
if (permission === "最高权限") {
  console.log("操作允许");
} else {
  console.log("操作拒绝: " + permission);
}
```

### 3. 安全验证流程
```bash
# 执行敏感操作的流程
1. 用户请求执行敏感操作
2. 系统检查用户 OpenID
3. 验证用户权限级别
4. 记录操作审计日志
5. 执行操作并返回结果
```

## 安全
- 密码和令牌管理
- 加密传输和存储
- 防止暴力破解和攻击

## 审计
- 操作日志记录
- 权限变更审计
- 异常访问检测

## 维护
- 定期更新安全配置
- 检查和修复安全漏洞
- 优化验证性能