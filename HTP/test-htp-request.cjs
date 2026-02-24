// Test HTP analysis request Node.js script

const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Set variables
const apiUrl = 'http://localhost:3000/api/htp/analyze';
const age = '33';
const gender = '女';

// Create a simple test image (base64 encoded red square)
const testImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

// Create request body
const requestBody = {
    image: testImage,
    age: age,
    gender: gender
};

console.log('Sending test request to', apiUrl);
console.log('Request body:', JSON.stringify(requestBody, null, 2));

// Send request
axios.post(apiUrl, requestBody, {
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(response => {
    console.log('Response received successfully!');
    console.log('Status:', response.status);
    console.log('Response data:');
    console.log(JSON.stringify(response.data, null, 2));
})
.catch(error => {
    console.error('Error sending request:');
    console.error('Message:', error.message);
    if (error.response) {
        console.error('Status:', error.response.status);
        console.error('Data:', JSON.stringify(error.response.data, null, 2));
    }
});
