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
exports.flatController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const flat_service_1 = require("../services/flat.service");
const createFlat = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const fileUrl = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path; // single image upload
        const data = fileUrl ? Object.assign(Object.assign({}, req.body), { images: [fileUrl] }) : req.body;
        const result = yield flat_service_1.FlatService.createFlat(data);
        res.status(http_status_1.default.CREATED).json({
            status: 'success',
            message: 'Flat created successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const getAllFlats = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield flat_service_1.FlatService.getAllFlats();
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
const getSingleFlat = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield flat_service_1.FlatService.getFlatById(req.params.id);
        if (!result) {
            return res.status(http_status_1.default.NOT_FOUND).json({
                status: 'fail',
                message: 'Flat not found',
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
const updateFlat = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = req.params.id;
        const fileUrl = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
        const data = fileUrl ? Object.assign(Object.assign({}, req.body), { images: [fileUrl] }) : req.body;
        const result = yield flat_service_1.FlatService.updateFlat(id, data);
        if (!result) {
            return res.status(http_status_1.default.NOT_FOUND).json({
                status: 'fail',
                message: 'Flat not found',
            });
        }
        res.status(http_status_1.default.OK).json({
            status: 'success',
            message: 'Flat updated successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const deleteFlat = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const flat = yield flat_service_1.FlatService.getFlatById(req.params.id);
        if (!flat) {
            return res.status(http_status_1.default.NOT_FOUND).json({
                status: 'fail',
                message: 'Flat not found',
            });
        }
        yield flat_service_1.FlatService.deleteFlat(req.params.id);
        res.status(http_status_1.default.OK).json({
            status: 'success',
            message: 'Flat deleted successfully',
        });
    }
    catch (error) {
        next(error);
    }
});
exports.flatController = {
    createFlat,
    getAllFlats,
    getSingleFlat,
    updateFlat,
    deleteFlat,
};
