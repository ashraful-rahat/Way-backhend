import { Document, Schema, model } from 'mongoose';
import { Flat } from '../interfaces/flat.interface';

const flatSchema: Schema<Flat & Document> = new Schema(
  {
    projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    area: { type: Number, required: true },
    rooms: { type: Number, required: true },
    price: { type: Number, required: true },
    floor: { type: Number },
    images: [{ type: String }], // multiple images
    available: { type: Boolean, default: true },

    // নতুন field
    description: { type: String }, // rich text content (HTML) save হবে এখানে
  },
  { timestamps: true },
);

export const FlatModel = model<Flat & Document>('Flat', flatSchema);
