import { Types } from 'mongoose';

// src/interfaces/flat.interface.ts
export interface Flat {
  _id: string;
  projectId: Types.ObjectId;
  slug: string; // new
  name: string;
  type: string;
  area: number;
  rooms: number;
  price: number;
  floor?: number;
  images?: string[];
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
}
