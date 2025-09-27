"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/flat.model.ts
const mongoose_1 = require("mongoose");
const slugify_1 = __importDefault(require("slugify"));
const flatSchema = new mongoose_1.Schema({
    projectId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Project', required: true },
    name: { type: String, required: true },
    slug: { type: String, unique: true }, // new
    type: { type: String, required: true },
    area: { type: Number, required: true },
    rooms: { type: Number, required: true },
    price: { type: Number, required: true },
    floor: { type: Number },
    images: [{ type: String }],
    available: { type: Boolean, default: true },
}, { timestamps: true });
flatSchema.pre('save', function (next) {
    if (this.isModified('name')) {
        this.slug = (0, slugify_1.default)(this.name, { lower: true, strict: true });
    }
    next();
});
