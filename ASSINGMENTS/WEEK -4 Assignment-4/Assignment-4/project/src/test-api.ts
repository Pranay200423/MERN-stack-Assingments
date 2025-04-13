const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;

async function testAPI() {
  const headers = {
    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    'Content-Type': 'application/json'
  };

  try {
    // Test Welcome endpoint
    console.log('\n1. Testing GET /welcome');
    const welcomeResponse = await fetch(`${SUPABASE_URL}/functions/v1/api/welcome`, { headers });
    console.log('Response:', await welcomeResponse.json());

    // Test POST /users
    console.log('\n2. Testing POST /users');
    const newUser = {
      name: 'John Doe',
      email: 'john@example.com'
    };
    const createResponse = await fetch(`${SUPABASE_URL}/functions/v1/api/users`, {
      method: 'POST',
      headers,
      body: JSON.stringify(newUser)
    });
    const createdUser = await createResponse.json();
    console.log('Created User:', createdUser);

    // Test GET /users
    console.log('\n3. Testing GET /users');
    const usersResponse = await fetch(`${SUPABASE_URL}/functions/v1/api/users`, { headers });
    console.log('All Users:', await usersResponse.json());

    // Test PUT /users/:id
    console.log('\n4. Testing PUT /users/:id');
    const updateResponse = await fetch(`${SUPABASE_URL}/functions/v1/api/users/${createdUser.id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ name: 'John Updated' })
    });
    console.log('Updated User:', await updateResponse.json());

    // Test DELETE /users/:id
    console.log('\n5. Testing DELETE /users/:id');
    const deleteResponse = await fetch(`${SUPABASE_URL}/functions/v1/api/users/${createdUser.id}`, {
      method: 'DELETE',
      headers
    });
    console.log('Deleted User:', await deleteResponse.json());

    // Verify deletion
    console.log('\n6. Verifying deletion - GET /users');
    const finalUsersResponse = await fetch(`${SUPABASE_URL}/functions/v1/api/users`, { headers });
    console.log('Final Users List:', await finalUsersResponse.json());

  } catch (error) {
    console.error('Error during API testing:', error);
  }
}

testAPI();