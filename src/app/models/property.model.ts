// src/models/property.model.ts
import { Document, Schema, model } from 'mongoose';
import { Property } from '../interfaces/property.interface';

const propertySchema: Schema<Property & Document> = new Schema(
  {
    projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    name: { type: String, required: true },
    type: {
      type: String,
      enum: ['house', 'villa', 'office', 'penthouse'],
      required: true,
    },
    area: { type: Number },
    rooms: { type: Number },
    price: { type: Number, required: true },
    floor: { type: Number },
    images: [{ type: String }],
    available: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const PropertyModel = model<Property & Document>('Property', propertySchema);
