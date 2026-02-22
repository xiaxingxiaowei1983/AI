---
name: "mp-release-orchestrator"
description: "把小程序上线拆成可验收的 1–7 步并串联执行：Freeze Spec→Preflight→微信后台→WS/音频→权限隐私→提审冒烟→回滚应急。Invoke when 每次准备发体验版/提审/上线，或需要完整发布记录与止损机制时。"
---

# 小程序编排 Skill（MP Release Orchestrator）

## 它是什么（大白话）
它是“小程序上线的总导航/总指挥”。  
它**不替代** Skill 1–7，也不会“自己自动跑代码”，它的作用是：
- 按固定顺序带你走 **Skill 1 → 2 → 3 → 4 → 5 → 6**（失败就停，需要时才走 7）
- 每一步都要求你提供最少证据（截图/返回码/日志关键字）
- 让你随时知道：现在到哪一步、有没有通过、下一步该做啥、失败先看哪里

## 何时调用（触发条件）
- 你准备“上传体验版/提审/上线”时：第一句话就调用它
- 你发现小程序联调很乱、容易漏项时：用它把流程拉直
- 审核被打回后：用它按同样顺序复验再提审

## 输入（固定表单）
- 小程序名称：
- AppID：
- 目标环境：staging / prod
- 本次版本标识（new）：____
- 上一个稳定版本（stable）：____
- 是否启用实时：是/否（WSS + /ws）<mccoremem id="03fl75psdph7oiq63zur4f5vg" /></mccoremem>
- 是否涉及录音/音频：是/否
- API Base URL（HTTPS）：____
- 隐私政策链接：____
- 负责人：
- 开始时间（可选）：

## 编排规则（硬规则）
- OR1：必须按顺序执行：1 → 2 → 3 → 4 → 5 → 6（不允许跳步提审）
- OR2：任一步 FAIL：立刻停止，不进入下一步
- OR3：每一步必须有证据；没有证据视为 FAIL
- OR4：只有当上线后出现严重故障/无法短修复，才进入 Skill 7（应急/回滚）

## 执行流程（固定顺序）
### Step 1：执行 Skill 1（MP Freeze Spec）
- 你要给的东西：AppID、API Base、WSS+路径、权限/隐私范围
- 通过标准：入口字段填满 + 规则/验收点齐
- PASS 才进入 Step 2

### Step 2：执行 Skill 2（MP Preflight Gate）
- 你要给的东西：HTTPS/WSS 证据、真机冒烟 3 条、后端可用证据
- 通过标准：所有 Gate 全绿
- FAIL 就停，先按定位路径修正再重跑 Step 2

### Step 3：执行 Skill 3（WeChat Console Check）
- 你要给的东西：微信后台白名单截图（request/socket/upload/download/业务域名）
- 通过标准：与 Spec 一致
- FAIL 就停（这一步没过，后面改代码没意义）

### Step 4：执行 Skill 4（WS/Audio Compatibility）
- 你要给的东西：WSS 连接成功证据、最小收发证据、音频闭环证据（若涉及）
- 通过标准：实时与音频关键链路跑通
- FAIL 就停（别进入提审）

### Step 5：执行 Skill 5（Permission & Privacy Gate）
- 你要给的东西：隐私政策可访问截图、授权允许/拒绝两条路径证据、收集说明文本
- 通过标准：合规最低可提审状态
- FAIL 就停（否则大概率审核被拒）

### Step 6：执行 Skill 6（Submit & Release Smoke）
- 你要给的东西：最新体验版证据、真机核心链路 3 条、审核复现路径与测试账号（如需）
- 通过标准：Case1~Case7 全绿
- PASS 才建议提交审核/发布

### Step 7（仅在需要时）：执行 Skill 7（MP Rollback & Emergency）
- 触发条件：上线后严重故障且短时间无法修复
- 目标：止血 → 回退/维护/降级 → 最小复验恢复

## 输出（固定：小程序发布记录单模板）
> 你每次上线都复制一份。你不会填也没关系：按我提问给证据，我帮你填。

- MP 发布记录单：v1
- 小程序/AppID：
- 环境：staging/prod
- new 版本：____
- stable 版本：____
- API Base（HTTPS）：____
- 实时（WSS + /ws，若启用）：____ <mccoremem id="03fl75psdph7oiq63zur4f5vg" /></mccoremem>
- 是否录音：是/否
- 隐私政策链接：____
- Step1 Freeze Spec：PASS/FAIL（证据：___）
- Step2 Preflight：PASS/FAIL（证据：___）
- Step3 微信后台：PASS/FAIL（证据：___）
- Step4 WS/音频：PASS/FAIL（证据：___）
- Step5 权限隐私：PASS/FAIL（证据：___）
- Step6 提审冒烟：PASS/FAIL（证据：___）
- 结论：允许提审/阻断提审
- 若阻断：前三定位路径：P1___ / P2___ / P3___
- 若上线后故障：是否触发 Step7：是/否（证据：___）

## 完成标准（本编排 skill 成功的判定）
- 你有一份完整发布记录单（每步 PASS/FAIL + 证据）
- 任一步 FAIL 都能明确停在哪一步、下一步先看哪里
- PASS 时你能放心提审；FAIL 时你能止损而不是靠猜

## 你上线时怎么“启动它”（一句话口令）
- “启动小程序编排 Skill（MP Release Orchestrator）。我要发布到 prod，我是小白，请按 Step1→Step6 带我走；失败就停，必要时走 Step7。"
