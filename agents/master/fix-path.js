
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', '..', 'skills', 'capability-evolver', 'modules', 'pcec-monitoring-system.js');
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace(/path\.join\(__dirname, '\.\.', '\.\.', '\.\.', 'skills', 'capability-evolver', 'data', 'pcec-status\.json\)/, "path.join(__dirname, '..', 'data', 'pcec-status.json')");

fs.writeFileSync(filePath, content);
console.log('Fixed path in pcec-monitoring-system.js');
