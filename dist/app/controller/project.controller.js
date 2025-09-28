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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const project_services_1 = require("../services/project.services");
const createProject = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const fileUrl = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path; // multer-storage-cloudinary URL
        const data = fileUrl ? Object.assign(Object.assign({}, req.body), { mainImage: fileUrl }) : req.body;
        const result = yield project_services_1.ProjectService.createProject(data);
        res.status(http_status_1.default.CREATED).json({
            status: 'success',
            message: 'Project created successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const getAllProjects = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield project_services_1.ProjectService.getAllProjects();
        res.status(http_status_1.default.OK).json({
            status: 'success',
            results: result.length,
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const getSingleProject = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield project_services_1.ProjectService.getProjectById(req.params.id);
        if (!result) {
            return res.status(http_status_1.default.NOT_FOUND).json({
                status: 'fail',
                message: 'Project not found',
            });
        }
        res.status(http_status_1.default.OK).json({
            status: 'success',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const updateProject = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = req.params.id;
        const fileUrl = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
        const data = fileUrl ? Object.assign(Object.assign({}, req.body), { mainImage: fileUrl }) : req.body;
        const result = yield project_services_1.ProjectService.updateProject(id, data);
        if (!result) {
            return res.status(http_status_1.default.NOT_FOUND).json({
                status: 'fail',
                message: 'Project not found',
            });
        }
        res.status(http_status_1.default.OK).json({
            status: 'success',
            message: 'Project updated successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const deleteProject = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const project = yield project_services_1.ProjectService.getProjectById(req.params.id);
        if (!project) {
            return res.status(http_status_1.default.NOT_FOUND).json({
                status: 'fail',
                message: 'Project not found',
            });
        }
        yield project_services_1.ProjectService.deleteProject(req.params.id);
        res.status(http_status_1.default.OK).json({
            status: 'success',
            message: 'Project deleted successfully',
        });
    }
    catch (error) {
        next(error);
    }
});
exports.projectController = {
    createProject,
    getAllProjects,
    getSingleProject,
    updateProject,
    deleteProject,
};
