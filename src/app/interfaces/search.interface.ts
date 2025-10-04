export interface BannerSearchFilters {
  location?: string; // user je location type korbe
  type?: 'house' | 'villa' | 'office' | 'penthouse' | 'apartment'; // property type
  rooms?: number; // number of bedrooms
  minPrice?: number; // optional min price
  maxPrice?: number; // optional max price
}
