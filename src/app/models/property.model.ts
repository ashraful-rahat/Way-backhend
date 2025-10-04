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

    // 👇 Multer er "images" field er sathe match kore
    images: [{ type: String }],

    available: { type: Boolean, default: true },
    description: { type: String },
  },
  { timestamps: true },
);

export const PropertyModel = model<Property & Document>('Property', propertySchema);
