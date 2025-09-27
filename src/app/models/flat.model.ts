// src/models/flat.model.ts
import { Document, Schema } from 'mongoose';
import { Flat } from '../interfaces/flat.interface';

import slugify from 'slugify';

const flatSchema: Schema<Flat & Document> = new Schema(
  {
    projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    name: { type: String, required: true },
    slug: { type: String, unique: true }, // new
    type: { type: String, required: true },
    area: { type: Number, required: true },
    rooms: { type: Number, required: true },
    price: { type: Number, required: true },
    floor: { type: Number },
    images: [{ type: String }],
    available: { type: Boolean, default: true },
  },
  { timestamps: true },
);

flatSchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});
