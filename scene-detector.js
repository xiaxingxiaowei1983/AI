const fs = require('fs');
const path = require('path');

/**
 * 智能识别当前场景，返回模型类型（trea/doubao）
 * 识别规则可根据你的实际需求扩展
 */
function detectScene() {
  // 规则1：检测是否有外部触发（飞书/微信机器人请求）→ 用豆包API
  const hasExternalTrigger = checkExternalTrigger();
  if (hasExternalTrigger) {
    console.log("🔍 识别到外部触发（飞书/微信机器人）→ 切换到豆包API模型");
    return "doubao";
  }

  // 规则2：检测Prompt是否含多智能体对话特征（团队/互聊）→ 用豆包API
  const isMultiAgentChat = checkMultiAgentChat();
  if (isMultiAgentChat) {
    console.log("🔍 识别到多智能体/团队对话 → 切换到豆包API模型");
    return "doubao";
  }

  // 规则3：检测Prompt是否含深度思考关键词（单独调用/深度分析）→ 用Trae内置
  const isDeepThinking = checkDeepThinking();
  if (isDeepThinking) {
    console.log("🔍 识别到单智能体深度思考场景 → 切换到Trae内置模型");
    return "trea";
  }

  // 默认场景：单智能体本地调用 → Trae内置
  console.log("🔍 默认场景（单智能体本地调用）→ 切换到Trae内置模型");
  return "trea";
}

/**
 * 检测是否有外部触发（飞书/微信机器人）
 * 可根据实际情况扩展：如检测环境变量、请求参数、特定文件等
 */
function checkExternalTrigger() {
  // 示例1：检测是否存在机器人触发的环境变量（如飞书机器人启动时设置）
  if (process.env.EXTERNAL_BOT === "feishu" || process.env.EXTERNAL_BOT === "wechat") {
    return true;
  }
  // 示例2：检测是否有外部请求的临时标记文件
  const triggerFile = path.join(__dirname, ".external-trigger");
  return fs.existsSync(triggerFile);
}

/**
 * 检测是否为多智能体/团队对话
 * 识别Prompt中是否含多角色、对话、协作等关键词
 */
function checkMultiAgentChat() {
  if (!fs.existsSync("./agent.prompt")) return false;
  const promptContent = fs.readFileSync("./agent.prompt", "utf8");
  // 可自定义关键词：团队、对话、协作、多智能体、互相、沟通等
  const multiAgentKeywords = ["团队", "对话", "协作", "多智能体", "互相", "沟通", "讨论"];
  return multiAgentKeywords.some(keyword => promptContent.includes(keyword));
}

/**
 * 检测是否为深度思考场景
 * 识别Prompt中是否含深度思考、分析、设计、重构等关键词
 */
function checkDeepThinking() {
  if (!fs.existsSync("./agent.prompt")) return false;
  const promptContent = fs.readFileSync("./agent.prompt", "utf8");
  // 可自定义关键词：深度思考、分析、设计、重构、优化、详细、拆解等
  const deepThinkingKeywords = ["深度思考", "分析", "设计", "重构", "优化", "详细", "拆解", "规划"];
  return deepThinkingKeywords.some(keyword => promptContent.includes(keyword));
}

// 导出识别函数
module.exports = { detectScene };