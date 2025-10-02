import { Types } from 'mongoose';
export interface Property {
  _id: string;
  projectId: Types.ObjectId;
  name: string;
  type: 'house' | 'villa' | 'office' | 'penthouse';
  area?: number;
  rooms?: number;
  price: number;
  floor?: number;
  images?: string[];
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
  description?: string;
}
