// src/models/city.model.ts
import mongoose, { Document, Schema } from 'mongoose';
import slugify from 'slugify';
import { City } from '../interfaces/city.interface';

const citySchema: Schema<City & Document> = new Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, unique: true },
    image: { type: String },
    description: { type: String },
  },
  { timestamps: true },
);

// Pre-save hook to generate slug
citySchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

export const CityModel = mongoose.model<City & Document>('City', citySchema);
