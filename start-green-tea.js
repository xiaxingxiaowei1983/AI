const { OpenClaw } = require('openclaw');

console.log('Starting OpenClaw with Green Tea agent...');
console.log('Using config:', './agents/green-tea/openclaw.json');
console.log('Using prompt:', './agents/green-tea/agent.prompt');

const claw = new OpenClaw({
  configPath: './agents/green-tea/openclaw.json',
  promptPath: './agents/green-tea/agent.prompt',
  useTreaInternalModel: true,
  continuousMode: true
});

console.log('Initializing Evo for knowledge management...');
claw.startEvo();

console.log('Starting Green Tea agent in continuous development mode...');
claw.startAgent();

console.log('Green Tea agent is ready!');
console.log('You can now interact with the Green Tea agent.');
console.log('Example: "@绿茶 帮我分析一个心理测试结果"');

// Keep the process running
process.stdin.resume();