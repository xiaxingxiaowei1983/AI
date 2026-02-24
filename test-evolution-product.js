// Test evolution product generation functionality
const fs = require('fs');
const path = require('path');

// Read pcec-cycle.js file content
const pcecCycleContent = fs.readFileSync(path.join(__dirname, 'pcec-cycle.js'), 'utf8');

// Extract generateEvolutionProduct function
const functionMatch = pcecCycleContent.match(/function generateEvolutionProduct\(\) \{[\s\S]*?\}/);

if (functionMatch) {
  // Create a temporary test file
  const testContent = `
${functionMatch[0]}

// Test generating evolution products
console.log('=== Testing Evolution Product Generation ===');
for (let i = 0; i < 5; i++) {
  const product = generateEvolutionProduct();
  console.log(`Product ${i + 1}: ${product.type} - ${product.name || product.condition}`);
  console.log('  Details:', JSON.stringify(product, null, 2));
  console.log('---');
}
console.log('=== Test Completed ===');
`;

  fs.writeFileSync(path.join(__dirname, 'temp-test-product.js'), testContent);

  // Run test
  console.log('Running evolution product generation test...');
  const { execSync } = require('child_process');
  try {
    const output = execSync('node temp-test-product.js', { encoding: 'utf8' });
    console.log(output);
  } catch (error) {
    console.error('Test failed:', error.message);
  } finally {
    // Clean up temporary file
    if (fs.existsSync(path.join(__dirname, 'temp-test-product.js'))) {
      fs.unlinkSync(path.join(__dirname, 'temp-test-product.js'));
    }
  }
} else {
  console.error('Could not find generateEvolutionProduct function');
}
