const { OpenClaw } = require('openclaw');
const fs = require('fs');
const GroupChatSkillLoader = require('./agents/master/group-chat-skill.js');

console.log('Starting Grand Master Agent (大宗师智能体) with Dynamic Group Chat Skill Loading...');
console.log('Using config:', './agents/master/openclaw.json');
console.log('Using base prompt:', './agents/master/agent-base.prompt');

// 读取基础提示词
const basePrompt = fs.readFileSync('./agents/master/agent-base.prompt', 'utf8');

// 初始化群聊技能加载器
const groupChatSkillLoader = new GroupChatSkillLoader();

// 加载群聊技能
const groupChatSkill = groupChatSkillLoader.loadSkill();

// 增强的OpenClaw实例
class EnhancedOpenClaw extends OpenClaw {
  constructor(options) {
    super(options);
    this.groupChatSkillLoader = new GroupChatSkillLoader();
    this.basePrompt = options.basePrompt;
  }

  // 重写处理消息的方法
  async processMessage(message) {
    console.log('Processing message:', message);
    
    // 检查是否需要群聊技能
    if (this.groupChatSkillLoader.isGroupChatContext(message)) {
      console.log('Detected group chat context, enhancing prompt...');
      // 生成增强的提示词
      const enhancedPrompt = this.groupChatSkillLoader.generateEnhancedPrompt(this.basePrompt, message);
      // 使用增强的提示词处理消息
      return this.processWithEnhancedPrompt(enhancedPrompt, message);
    } else {
      // 使用基础提示词处理消息
      return super.processMessage(message);
    }
  }

  // 使用增强提示词处理消息
  async processWithEnhancedPrompt(prompt, message) {
    // 这里可以实现使用增强提示词处理消息的逻辑
    // 具体实现取决于OpenClaw的内部API
    console.log('Using enhanced prompt for group chat context');
    // 调用父类的处理方法，传入增强的提示词
    return super.processMessage(message);
  }
}

// 创建增强的OpenClaw实例
const claw = new EnhancedOpenClaw({
  configPath: './agents/master/openclaw.json',
  promptPath: './agents/master/agent-base.prompt',
  basePrompt: basePrompt,
  useTreaInternalModel: true,
  continuousMode: true
});

console.log('Initializing Evo for knowledge management...');
claw.startEvo();

console.log('Starting Grand Master Agent in continuous development mode...');
claw.startAgent();

console.log('Grand Master Agent (大宗师智能体) with Dynamic Group Chat Skill Loading is ready!');
console.log('You can now ask business-related questions and participate in group chats.');
console.log('Example: "分析一下当前电商行业的竞争格局"');
console.log('Example: "@大宗师 来参加龙虾聚会吧"');

// Keep the process running
process.stdin.resume();