export interface PetCategory {
  id?: number;
  name?: string;
}

export interface Pet {
  id: number;
  name: string;
  status?: 'available' | 'pending' | 'sold';
  category?: PetCategory;
  photoUrls?: string[];
  tags?: { id?: number; name?: string }[];
}