---
name: "nginx-template-check"
description: "校验 H5 上线所需的 Nginx 站点模板：静态托管、/api 反代、Socket.IO/WS 升级、HTTPS 与缓存策略。Invoke when 配置/修改 Nginx 或出现“接口通但实时不通/刷新404/HTTPS异常”。"
---

# Skill 3：反代模板校验（Nginx Template Check）

## 目标
用一套“可复用的站点模板 + 可量化验收点”，把 Nginx 这块最容易踩的坑一次性卡住：
- 静态资源托管（H5）
- SPA 刷新不 404（history 路由）
- API 统一入口（推荐 `/api` 同域反代）
- 实时通道（Socket.IO 的 `/socket.io/` 或原生 WS 的 `/ws`）
- HTTPS/Mixed Content 风险
- 缓存策略（避免“我上线了但还是旧的”）

## 何时调用（触发条件）
- 每次新建站点、改域名、上 HTTPS、改反代路径时
- 每次出现以下现象：
  - 页面能开但接口 404/502
  - 刷新页面就 404（SPA 路由问题）
  - 接口通了但 Socket.IO/WS 连接不上（Upgrade/路径问题）<mccoremem id="03fl75psdph7oiq63zur4f5vg" /></mccoremem>
  - https 页面里请求 http（Mixed Content）
  - 发布后仍加载旧资源（缓存问题）

## 输入（固定表单）
- 目标环境：`dev` / `staging` / `prod`
- H5 域名：`h5.xxx.com`
- 是否启用 HTTPS：`是/否`（推荐：是）
- 静态文件目录（dist 目录）：`/path/to/dist`
- API 策略：`/api` 同域反代 / `独立API域名`
- 后端上游地址：`http://127.0.0.1:3006`（例）<mccoremem id="03fl75psdph7oiq63zur4f5vg" /></mccoremem>
- 是否启用实时：`是/否`
- 实时类型：`Socket.IO` / `原生WS`
- 实时路径：`/socket.io/` 或 `/ws` <mccoremem id="03fl75psdph7oiq63zur4f5vg" /></mccoremem>
- 是否需要上传大文件/音频：`是/否`（决定 body 大小与超时）

## 前置约束（硬规则）
- Nginx 配置必须能通过语法检查（否则不进入验收）
- API 入口必须“唯一”（同域 `/api` 或独立域名二选一，不混用）
- 若 H5 使用 HTTPS，则实时必须可升级为 WSS（禁止 Mixed Content）

## 模板检查清单（逐条勾选）
### Check 1：站点基础（server_name / listen / 证书）
- ✅ `server_name` = 输入的 H5 域名
- ✅ `listen 80`（可选：做 80→443 跳转）
- ✅ 若启用 HTTPS：`listen 443 ssl` 且证书/私钥路径正确
- ✅ 若启用 HTTPS：HTTP 自动跳转到 HTTPS（可选但推荐）

Fail 的前三定位路径：
1) 证书是否与域名匹配（证书 CN/SAN）
2) Nginx 是否加载了正确的站点配置（多站点容易加载错）
3) DNS 是否解析到正确机器/负载均衡

### Check 2：静态托管（H5 dist）
- ✅ `root` 指向 dist 目录
- ✅ 能访问 `/` 返回 200（或 304）
- ✅ 静态资源（js/css/png）请求无 404

Fail 的前三定位路径：
1) dist 是否部署到 root 对应目录
2) Nginx location 是否被更高优先级规则截走
3) 文件权限/用户（nginx 用户）是否可读

### Check 3：SPA 刷新不 404（history 路由）
- ✅ 任意前端路由（例如 `/pages/xxx`）刷新仍返回 index.html
- ✅ 404 只用于真实不存在的静态资源

Fail 的前三定位路径：
1) 是否缺少 `try_files $uri $uri/ /index.html`
2) 是否把 API 前缀误当静态处理
3) 前端是否使用 hash 路由（若是，策略不同）

### Check 4：API 反代（推荐 `/api` 同域）
如果选择“同域 `/api` 反代”：
- ✅ `/api/` 会被正确 proxy_pass 到后端上游（如 127.0.0.1:3006）<mccoremem id="03fl75psdph7oiq63zur4f5vg" /></mccoremem>
- ✅ 反代保留必要 headers：Host / X-Forwarded-For / X-Forwarded-Proto
- ✅ 超时合理（避免大请求/音频上传中断）：proxy_read_timeout / proxy_send_timeout

如果选择“独立 API 域名”：
- ✅ 你明确不会在 Nginx 里处理 `/api`（避免口径混乱）
- ✅ 后端 CORS 与 Socket.IO 跨域策略已考虑（否则会折腾很久）

Fail 的前三定位路径：
1) `/api` 前缀是否多/少了斜杠导致路径拼错（最常见）
2) 后端是否在目标端口真实监听（否则 502）
3) Nginx 是否被安全组/防火墙/SELinux（如有）影响

### Check 5：实时通道反代（Socket.IO 或原生 WS）
**如果启用 Socket.IO（H5 常见）**：路径必须是 `/socket.io/` <mccoremem id="03fl75psdph7oiq63zur4f5vg" /></mccoremem>
- ✅ `/socket.io/` 走到后端上游的同路径
- ✅ 支持 Upgrade（WebSocket 升级头）
- ✅ 相关超时较长（避免连接很快断）

**如果启用原生 WS**：路径通常是 `/ws` <mccoremem id="03fl75psdph7oiq63zur4f5vg" /></mccoremem>
- ✅ `/ws` 反代支持 Upgrade
- ✅ WSS 与 HTTPS 同域可用（https 页面必须 wss）

Fail 的前三定位路径：
1) 路径是否一致（`/socket.io/` vs `/socket.io`，差一个斜杠就可能失败）
2) 是否缺少 Upgrade 相关头（接口通但实时不通的核心原因）
3) 是否 https 页面却连了 ws/http（Mixed Content / 浏览器直接拦截）

### Check 6：请求体大小与上传（可选但建议）
- ✅ 若有音频/文件：配置合理的 body 大小（client_max_body_size）
- ✅ 若上传时间较长：proxy 超时设置合理

Fail 的前三定位路径：
1) Nginx 报 413（Request Entity Too Large）
2) 上传中断/超时（看 Nginx error log）
3) 后端自身限制（框架 body 限制）

### Check 7：缓存策略（防止旧版本）
- ✅ `index.html` 低缓存或不缓存（避免入口页老）
- ✅ 带 hash 的静态资源可长缓存（性能更好）
- ✅ 若有 CDN：发布后有明确“刷新入口页”的动作

Fail 的前三定位路径：
1) 浏览器强缓存（无痕/换设备验证）
2) CDN 缓存未刷新
3) 服务器上其实没替换到新 dist

## 验收点（固定、可量化）
- A1：`https://<H5域名>/` 打开成功；静态资源 404 = 0
- A2：刷新任意前端路由不 404（SPA history 验收）
- A3：`/api/<轻量接口>` 返回 200（例如 `/api/health`）
- A4：浏览器 Console Mixed Content = 0 条
- A5：若启用实时：Socket.IO/WS 连接建立成功，并完成一次收发 <mccoremem id="03fl75psdph7oiq63zur4f5vg" /></mccoremem>
- A6：发布后无痕模式能拿到新版本（入口页不“卡旧”）

## 输出格式（固定，直接复制到发布记录）
- Nginx Template Check：PASS / FAIL
- 域名：
- HTTPS：是/否
- 静态托管：✅/❌（证据：___）
- SPA 刷新：✅/❌（证据：___）
- API 反代：✅/❌（证据：___）
- 实时反代：✅/❌（证据：___）
- Mixed Content：✅/❌（证据：___）
- 缓存策略：✅/❌（证据：___）
- 若 FAIL：本次停止；优先定位路径：P1___ / P2___ / P3___

## 完成标准（本 skill 完成的判定）
- 你能给出 PASS/FAIL
- 每个关键项都有“证据”
- FAIL 时给出前三定位路径并停止后续上线步骤
