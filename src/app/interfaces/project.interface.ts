import { Types } from 'mongoose';

export interface Project {
  _id: string;
  cityId: Types.ObjectId;
  name: string;
  description?: string;
  location?: string;
  isFeatured: boolean;
  status: 'ongoing' | 'upcoming' | 'completed';
  mainImage?: string;
  galleryImages?: string[];
  amenities?: string[];
  createdAt: Date;
  updatedAt: Date;
}

// ✅ Create input type (no _id, createdAt, updatedAt)
export type ProjectInput = Omit<Project, '_id' | 'createdAt' | 'updatedAt'>;
