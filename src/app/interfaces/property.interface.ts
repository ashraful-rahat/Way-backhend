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

  // 👇 multer er field er sathe match
  images?: string[];

  available: boolean;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}
