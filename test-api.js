/**
 * Test script to verify Strapi authentication and todo API calls
 * Run this from the frontend directory: node test-api.js
 */

const axios = require('axios');

const API_URL = 'http://localhost:1337/api';

// Test credentials
const testUser = {
  email: 'test@example.com',
  password: 'password123',
  username: 'testuser'
};

async function testFlow() {
  console.log('🧪 Testing Strapi API Flow...\n');

  try {
    // Step 1: Register/SignUp
    // console.log('📝 Step 1: Attempting to register...');
    // let signUpResponse;
    // try {
    //   signUpResponse = await axios.post(`${API_URL}/auth/local/register`, {
    //     username: testUser.username,
    //     email: testUser.email,
    //     password: testUser.password,
    //   });
    //   console.log('✅ SignUp successful');
    //   console.log(`Token: ${signUpResponse.data.jwt.substring(0, 20)}...`);
    // } catch (error) {
    //   if (error.response?.status === 400 && error.response?.data?.message?.includes('already')) {
    //     console.log('⚠️ User already exists, proceeding with login...');
    //   } else {
    //     throw error;
    //   }
    // }

    // Step 2: Login
    console.log('\n🔐 Step 2: Logging in...');
    const loginResponse = await axios.post(`${API_URL}/auth/local`, {
      identifier: testUser.email,
      password: testUser.password,
    });
    const token = loginResponse.data.jwt;
    console.log('✅ Login successful');
    console.log(`Token: ${token.substring(0, 20)}...`);
    console.log(`User ID: ${loginResponse.data.user.id}`);

    // Step 3: Get current user
    console.log('\n👤 Step 3: Getting current user info...');
    const meResponse = await axios.get(`${API_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('✅ User info retrieved');
    console.log(`User: ${meResponse.data.username} (${meResponse.data.email})`);

    // Step 4: Get todos
    console.log('\n📋 Step 4: Fetching todos...');
    const userId = meResponse.data.id;
    const todosResponse = await axios.get(`${API_URL}/todos`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        'filters[user][id][$eq]': userId,
        populate: '*'
      }
    });
    console.log('✅ Todos fetched successfully');
    console.log(`Total todos: ${todosResponse.data.data.length}`);
    if (todosResponse.data.data.length > 0) {
      console.log('Sample todo:', JSON.stringify(todosResponse.data.data[0], null, 2));
    }

    // Step 5: Create a new todo
    console.log('\n✍️  Step 5: Creating a new todo...');
    const createResponse = await axios.post(`${API_URL}/todos`, {
      data: {
        title: 'Test todo from API',
        isCompleted: false,
        user: userId,
      }
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('✅ Todo created successfully');
    console.log('Created todo:', JSON.stringify(createResponse.data.data, null, 2));

    // Step 6: Update the new todo
    console.log('\n🔄 Step 6: Updating the new todo...');
    const newTodoId = createResponse.data.data.documentId || createResponse.data.data.id;
    console.log(`Attempting to update todo with ID: ${newTodoId}`); // Added logging

    try {
      const updateResponse = await axios.put(`${API_URL}/todos/${newTodoId}`, {
        data: {
          isCompleted: true,
        }
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('✅ Todo updated successfully');
      console.log('Updated todo:', JSON.stringify(updateResponse.data.data, null, 2));
    } catch (updateError) {
      console.error(`\n❌ Error during Step 6 (Update): Failed to update todo with ID ${newTodoId}`);
      console.error(updateError.response?.data || updateError.message);
      throw updateError; // Re-throw to stop the script
    }

    // Step 7: Delete the todo
    console.log('\n🗑️ Step 7: Deleting the todo...');
    await axios.delete(`${API_URL}/todos/${newTodoId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('✅ Todo deleted successfully');

    console.log('\n🎉 All tests passed!');
  } catch (error) {
    console.error('\n❌ Error:', error.response?.data || error.message);
    if (error.response?.status === 401) {
      console.error('⚠️ Unauthorized - Check your token');
    }
    if (error.response?.status === 403) {
      console.error('⚠️ Forbidden - Check API permissions in Strapi admin');
    }
  }
}

// Run the test
testFlow();
