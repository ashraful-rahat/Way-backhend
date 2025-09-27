// src/models/project.model.ts
import mongoose, { Document, Schema } from 'mongoose';
import slugify from 'slugify';
import { Project } from '../interfaces/project.interface';

const projectSchema: Schema<Project & Document> = new Schema(
  {
    cityId: { type: Schema.Types.ObjectId, ref: 'City', required: true },
    name: { type: String, required: true },
    slug: { type: String, unique: true },
    description: { type: String },
    location: { type: String },
    isFeatured: { type: Boolean, default: false },
    mainImage: { type: String },
    galleryImages: [{ type: String }],
    amenities: [{ type: String }],
  },
  { timestamps: true },
);

projectSchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

export const ProjectModel = mongoose.model<Project & Document>('Project', projectSchema);
