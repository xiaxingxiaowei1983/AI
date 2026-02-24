const arkAdapter = require('./ark-simple-adapter');

async function testApiConnection() {
  console.log('🔍 Testing API connection...');
  
  try {
    // Test simple text generation
    const textResponse = await arkAdapter.generateText([
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: 'Ping test: Is the API connection working?'
          }
        ]
      }
    ]);
    
    console.log('✅ Text generation test passed!');
    console.log('📡 Response:', textResponse.text.substring(0, 100) + '...');
    console.log('📦 Usage:', textResponse.usage);
    console.log('🤖 Model:', textResponse.model);
    
    // Test image description
    const imageResponse = await arkAdapter.describeImage(
      'https://ark-project.tos-cn-beijing.ivolces.com/images/view.jpeg',
      'What do you see in this image?'
    );
    
    console.log('✅ Image description test passed!');
    console.log('📡 Response:', imageResponse.text.substring(0, 100) + '...');
    console.log('📦 Usage:', imageResponse.usage);
    console.log('🤖 Model:', imageResponse.model);
    
    console.log('\n🎯 All API connection tests passed!');
    console.log('✅ The API is properly connected and working.');
    
    return {
      success: true,
      textTest: 'passed',
      imageTest: 'passed'
    };
    
  } catch (error) {
    console.error('❌ API connection test failed:', error.message);
    return {
      success: false,
      error: error.message
    };
  }
}

// Run test
testApiConnection()
  .then(result => {
    console.log('\n📋 Test Result:', result.success ? 'SUCCESS' : 'FAILED');
  })
  .catch(error => {
    console.error('💥 Unexpected error:', error);
  });
