const { OpenClaw } = require('openclaw');

console.log('Starting OpenClaw for continuous development...');
console.log('Using config:', './openclaw.json');
console.log('Using prompt:', './agent.prompt');

const claw = new OpenClaw({
  configPath: './openclaw.json',
  promptPath: './agent.prompt',
  useTreaInternalModel: true,
  continuousMode: true
});

console.log('Initializing Evo for knowledge management...');
claw.startEvo();

console.log('Starting agent in continuous development mode...');
claw.startAgent();

console.log('OpenClaw is ready for continuous development!');
console.log('You can now provide project requirements.');
console.log('Example: "帮我创建一个前端项目，包含HTML、CSS、JS，自动运行"');
console.log('Example: "帮我做一个AI房树人分析工具的前端界面"');

// Keep the process running
process.stdin.resume();