"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cityRoutes = void 0;
const express_1 = __importDefault(require("express"));
const city_controller_1 = require("../controller/city.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const multer_1 = require("../middleware/multer");
const parseJsonData_1 = require("../middleware/parseJsonData");
const router = express_1.default.Router();
// শুধু অ্যাডমিনদের জন্য সুরক্ষিত route
router.post('/create', (0, auth_middleware_1.authenticate)(['admin']), multer_1.uploadSingle, parseJsonData_1.parseJsonData, city_controller_1.cityController.createCity);
router.patch('/:id', (0, auth_middleware_1.authenticate)(['admin']), multer_1.uploadSingle, parseJsonData_1.parseJsonData, city_controller_1.cityController.updateCity);
router.delete('/:id', (0, auth_middleware_1.authenticate)(['admin']), city_controller_1.cityController.deleteCity);
// public routes
router.get('/', city_controller_1.cityController.getAllCities);
router.get('/:id', city_controller_1.cityController.getSingleCity);
exports.cityRoutes = router;
