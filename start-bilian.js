const { OpenClaw } = require('openclaw');

console.log('Starting OpenClaw with Bilian agent...');
console.log('Using config:', './agents/bilian/openclaw.json');
console.log('Using prompt:', './agents/bilian/agent.prompt');

const claw = new OpenClaw({
  configPath: './agents/bilian/openclaw.json',
  promptPath: './agents/bilian/agent.prompt',
  useTreaInternalModel: true,
  continuousMode: true
});

console.log('Initializing Evo for knowledge management...');
claw.startEvo();

console.log('Starting Bilian agent in continuous development mode...');
claw.startAgent();

console.log('Bilian agent is ready!');
console.log('You can now interact with the Bilian agent.');
console.log('Example: "@碧莲 帮我分析一个心理测试结果"');

// Keep the process running
process.stdin.resume();
