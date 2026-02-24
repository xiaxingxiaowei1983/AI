# 解决 GitHub SSH 密钥问题并推送代码

## 问题分析

用户尝试推送代码到 GitHub 时遇到 SSH 认证错误，提示 `Permission denied (publickey)`。这是因为：

1. 系统中可能没有生成 SSH 密钥
2. SSH 密钥没有添加到 GitHub 账户
3. SSH 代理可能没有运行

## 解决方案

### 步骤 1：检查 .ssh 目录是否存在

```bash
# 检查 .ssh 目录是否存在
Test-Path ~/.ssh
```

### 步骤 2：创建 .ssh 目录（如果不存在）

```bash
# 创建 .ssh 目录
New-Item -ItemType Directory -Path ~/.ssh
```

### 步骤 3：生成新的 SSH 密钥

```bash
# 生成 SSH 密钥
ssh-keygen -t ed25519 -C "xiaxingxiaowei1983@gmail.com"
```

### 步骤 4：启动 SSH 代理并添加密钥

```bash
# 启动 SSH 代理
Start-Service ssh-agent

# 添加 SSH 密钥到代理
ssh-add ~/.ssh/id_ed25519
```

### 步骤 5：获取公钥内容

```bash
# 查看公钥内容
Get-Content ~/.ssh/id_ed25519.pub
```

### 步骤 6：使用 HTTPS 替代 SSH（如果 SSH 仍然失败）

```bash
# 删除旧的远程仓库
git remote remove origin

# 添加 HTTPS 格式的远程仓库
git remote add origin https://github.com/xiaxingxiaowei1983/AWKN-LAB.git

# 推送代码
git push -u origin master
```

## 预期结果

* 成功生成 SSH 密钥

* 成功将代码推送到 GitHub

* 后续可以在 Vercel 上部署项目

## 注意事项

* SSH 密钥是敏感信息，请勿公开分享私钥

* 如果使用 HTTPS 推送，会提示输入 GitHub 用户名和密码

* 如果 GitHub 仓库不存在，需要先在 GitHub 上创建仓库

