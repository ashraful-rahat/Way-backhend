export interface SearchFilters {
  projectId?: string; // Project._id
  location?: string; // optional, if you want
  type?: 'house' | 'villa' | 'office' | 'penthouse' | 'apartment';
  rooms?: number;
  available?: boolean;
  minPrice?: number;
  maxPrice?: number;
  isFeatured?: boolean;
}
