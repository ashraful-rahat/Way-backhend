import { Types } from 'mongoose';

// Apartment / Flat
export interface Flat {
  _id: string;
  projectId: Types.ObjectId;
  name: string;
  type: 'apartment'; // fixed type
  area: number; // in sq.ft
  rooms: number;
  price: number;
  floor?: number;
  images?: string[];
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
}
