const { OpenClaw } = require('openclaw');

console.log('Starting OpenClaw with Life Decision Master agent...');
console.log('Using config:', './agents/life/openclaw.json');
console.log('Using prompt:', './agents/life/agent.prompt');

const claw = new OpenClaw({
  configPath: './agents/life/openclaw.json',
  promptPath: './agents/life/agent.prompt',
  useTreaInternalModel: true,
  continuousMode: true
});

console.log('Initializing Evo for knowledge management...');
claw.startEvo();

console.log('Starting Life Decision Master agent in continuous development mode...');
claw.startAgent();

console.log('Life Decision Master agent is ready!');
console.log('You can now interact with the Life Decision Master agent.');
console.log('Example: "@人生决策宗师 帮我做个人能量复盘"');
console.log('Example: "@天师 我面临一个重要决策，需要你的建议"');

// Keep the process running
process.stdin.resume();
