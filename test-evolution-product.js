// Test evolution product generation functionality
const fs = require('fs');
const path = require('path');
const { PCECSystem } = require('./pcec-cycle.js');

// Create a test for evolution product generation
console.log('=== Testing Evolution Product Generation ===');

// Test the evolution system by executing a single evolution cycle
function testEvolutionProducts() {
  try {
    // Create a new PCEC system instance
    const testSystem = new PCECSystem();
    
    console.log('Testing PCECSystem evolution product generation...');
    
    // Check system status
    const systemStatus = testSystem._checkSystemStatus();
    console.log('System Status:', systemStatus.healthy ? 'Healthy' : 'Unhealthy');
    
    // Analyze capability tree
    const treeAnalysis = testSystem._analyzeCapabilityTree();
    console.log('Capability Tree Analysis:', treeAnalysis);
    
    // Identify evolution opportunities
    const opportunities = testSystem._identifyEvolutionOpportunities(treeAnalysis);
    console.log('Evolution Opportunities:', opportunities.length);
    
    // Execute evolution opportunities
    const products = testSystem._executeEvolutionOpportunities(opportunities);
    console.log('Evolution Products Generated:', products.length);
    
    // Display products
    products.forEach((product, index) => {
      console.log('\nProduct ' + (index + 1) + ':');
      console.log('  Type:', product.type);
      console.log('  Description:', product.description);
      if (product.details) {
        console.log('  Details:', product.details);
      }
    });
    
    console.log('\n=== Test Completed Successfully ===');
  } catch (error) {
    console.error('Test failed:', error.message);
  }
}

testEvolutionProducts();
