import { Document, Schema, model } from 'mongoose';
import { Project } from '../interfaces/project.interface';

const projectSchema: Schema<Project & Document> = new Schema(
  {
    cityId: { type: Schema.Types.ObjectId, ref: 'City', required: true },
    name: { type: String, required: true },
    description: { type: String },
    location: { type: String },
    isFeatured: { type: Boolean, default: false },
    status: { type: String, enum: ['ongoing', 'upcoming', 'completed'], required: true },
    mainImage: { type: String },
    galleryImages: [{ type: String }],
    amenities: [{ type: String }],
  },
  { timestamps: true },
);

export const ProjectModel = model<Project & Document>('Project', projectSchema);
