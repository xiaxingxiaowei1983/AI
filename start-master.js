const { OpenClaw } = require('openclaw');

console.log('Starting Grand Master Agent (大宗师智能体)...');
console.log('Using config:', './agents/master/openclaw.json');
console.log('Using prompt:', './agents/master/agent.prompt');

const claw = new OpenClaw({
  configPath: './agents/master/openclaw.json',
  promptPath: './agents/master/agent.prompt',
  useTreaInternalModel: true,
  continuousMode: true
});

console.log('Initializing Evo for knowledge management...');
claw.startEvo();

console.log('Starting Grand Master Agent in continuous development mode...');
claw.startAgent();

console.log('Grand Master Agent (大宗师智能体) is ready!');
console.log('You can now ask business-related questions.');
console.log('Example: "分析一下当前电商行业的竞争格局"');
console.log('Example: "帮我评估一个新的商业模式的可行性"');

// Keep the process running
process.stdin.resume();