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