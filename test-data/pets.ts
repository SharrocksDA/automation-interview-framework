import { Pet } from '../types/petstoreTypes';

/**
 * Builds a pet object with default values.
 * @returns {Pet} A pet object with predefined properties.
 */
export function buildPet(): Pet {
  return {
    id: Date.now(),
    name: 'Interview-Pet',
    status: 'available',
    category: {
      id: 1,
      name: 'dogs',
    },
    photoUrls: ['https://example.com/dog.jpg'],
    tags: [
      {
        id: 1,
        name: 'friendly',
      },
    ]
  };
}