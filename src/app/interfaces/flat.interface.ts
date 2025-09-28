import { Types } from 'mongoose';
export interface Flat {
  _id: string;
  projectId: Types.ObjectId;
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
