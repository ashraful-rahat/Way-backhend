import { Types } from "mongoose";
export interface Property {
  _id: string;
  projectId: Types.ObjectId;
  name: string;
  type: "house" | "villa" | "office" | "penthouse";
  area?: number;      // some types may not need
  rooms?: number;     // optional for offices
  price: number;
  floor?: number;     // optional
  images?: string[];
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
