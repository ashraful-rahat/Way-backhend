// src/interfaces/city.interface.ts
export interface City {
  _id: string;
  name: string;
  image?: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}
