import { expect } from '@playwright/test';
import { interviewTest } from '../../utils/interviewFixture';
import { Pet } from '../../types/petstoreTypes';

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `special-key`
};

interviewTest('should create a pet successfully', async ({ request, buildPet }) => {
    // Build a new pet object using the provided utility function.
    const pet = await buildPet(); 

    // Call the API to create a new pet with the generated pet object.
    const response = await request.post('/v2/pet', {
        headers: headers,
        data: pet,
    });

    // Assert that the response status code is 200 (OK).
    expect(response.status()).toBe(200); 

    // Parse the response body as a Pet object.
    const body: Pet = await response.json(); 
    // Validate the response body against the original pet object.
    await checkPetResponse(body, pet); 
});

/**
 * Validates the response of a pet creation request.
 * @param {Pet} response - The response object returned from the API.
 * @param {Pet} pet - The pet object used in the request.
 * @returns {Promise<void>} Resolves if the response matches the expected pet data.
 */
async function checkPetResponse(response: Pet, pet: Pet): Promise<void> {
    expect(response.id).toBe(pet.id);
    expect(response.name).toBe(pet.name);
    expect(response.status).toBe(pet.status);
};

// Additional Test Scenarios:
// 1. Authentication Scenarios:
//    - Test with expired tokens, missing tokens, or tokens with insufficient permissions.
// 2. Invalid Payloads:
//    - Test error handling for missing or malformed fields.
// 3. Get Pet by ID:
//    - Verify the correct pet is returned for a valid ID.
// 4. Delete Pet:
//    - Ensure the pet is successfully deleted and cannot be retrieved.
// 5. Boundary Tests:
//    - Test edge cases for IDs and field lengths.
// 6. Update Pet:
//    - Verify that updating an existing pet's details (e.g., name, status) works correctly.
//    - Test with valid and invalid payloads.
// 7. Get Pets by Status:
//    - Test the `/pet/findByStatus` endpoint with valid statuses (e.g., `available`, `pending`, `sold`).
//    - Test with invalid or unsupported statuses.
// 8. Concurrent Requests:
//    - Simulate multiple concurrent requests to create or update pets and verify the system handles them correctly.
// 9. Rate Limiting:
//    - If applicable, test the API's behavior when the rate limit is exceeded.