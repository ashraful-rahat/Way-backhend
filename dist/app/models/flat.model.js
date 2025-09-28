"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlatModel = void 0;
// src/models/flat.model.ts
const mongoose_1 = require("mongoose");
const flatSchema = new mongoose_1.Schema({
    projectId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Project', required: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    area: { type: Number, required: true },
    rooms: { type: Number, required: true },
    price: { type: Number, required: true },
    floor: { type: Number },
    images: [{ type: String }],
    available: { type: Boolean, default: true },
}, { timestamps: true });
exports.FlatModel = (0, mongoose_1.model)('Flat', flatSchema);
