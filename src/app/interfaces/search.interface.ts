// src/interfaces/search.interface.ts
export interface FlatSearchFilters {
  citySlug?: string; // City.slug
  projectSlug?: string; // Project.slug
  location?: string; // Project.location
  projectType?: 'Office' | 'Residential'; // Flat.type
  rooms?: number; // Flat.rooms
  available?: boolean; // Flat.available
  isFeatured?: boolean; // Project.isFeatured
}
