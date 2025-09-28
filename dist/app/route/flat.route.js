"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.flatRoutes = void 0;
// routes/flat.route.ts
const express_1 = __importDefault(require("express"));
const flat_controller_1 = require("../controller/flat.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const multer_1 = require("../middleware/multer");
const parseJsonData_1 = require("../middleware/parseJsonData");
const router = express_1.default.Router();
// শুধু অ্যাডমিনদের জন্য সুরক্ষিত route
router.post('/create', (0, auth_middleware_1.authenticate)(['admin']), multer_1.uploadSingle, parseJsonData_1.parseJsonData, flat_controller_1.flatController.createFlat);
router.patch('/:id', (0, auth_middleware_1.authenticate)(['admin']), multer_1.uploadSingle, parseJsonData_1.parseJsonData, flat_controller_1.flatController.updateFlat);
router.delete('/:id', (0, auth_middleware_1.authenticate)(['admin']), flat_controller_1.flatController.deleteFlat);
// public routes
router.get('/', flat_controller_1.flatController.getAllFlats);
router.get('/:id', flat_controller_1.flatController.getSingleFlat);
exports.flatRoutes = router;
