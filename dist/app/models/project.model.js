"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectModel = void 0;
// src/models/project.model.ts
const mongoose_1 = require("mongoose");
const projectSchema = new mongoose_1.Schema({
    cityId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'City', required: true },
    name: { type: String, required: true },
    description: { type: String },
    location: { type: String },
    isFeatured: { type: Boolean, default: false },
    mainImage: { type: String },
    galleryImages: [{ type: String }],
    amenities: [{ type: String }],
}, { timestamps: true });
exports.ProjectModel = (0, mongoose_1.model)('Project', projectSchema);
