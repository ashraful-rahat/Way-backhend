"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectService = void 0;
const project_model_1 = require("../models/project.model");
const createProject = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield project_model_1.ProjectModel.create(data);
});
const getAllProjects = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield project_model_1.ProjectModel.find();
    // latest first
    return result.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
});
const getProjectById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield project_model_1.ProjectModel.findById(id);
});
const updateProject = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield project_model_1.ProjectModel.findByIdAndUpdate(id, data, { new: true });
});
const deleteProject = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield project_model_1.ProjectModel.findByIdAndDelete(id);
});
exports.ProjectService = {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject,
};
