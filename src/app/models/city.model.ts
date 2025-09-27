// src/models/city.model.ts
import mongoose, { Document, Schema } from 'mongoose';
import { City } from '../interfaces/city.interface';

const citySchema: Schema<City & Document> = new Schema(
  {
    name: { type: String, required: true, unique: true },
    image: { type: String },
    description: { type: String },
  },
  { timestamps: true },
);

export const CityModel = mongoose.model<City & Document>('City', citySchema);
