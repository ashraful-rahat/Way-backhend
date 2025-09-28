"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectRoutes = void 0;
// routes/project.route.ts
const express_1 = __importDefault(require("express"));
const project_controller_1 = require("../controller/project.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const multer_1 = require("../middleware/multer");
const parseJsonData_1 = require("../middleware/parseJsonData");
const router = express_1.default.Router();
// শুধু অ্যাডমিনদের জন্য সুরক্ষিত route
// router.post(
//   '/create',
//   authenticate(['admin']),
//   uploadSingle,
//   parseJsonData,
//   projectController.createProject,
// );
router.post('/create', project_controller_1.projectController.createProject);
router.patch('/:id', (0, auth_middleware_1.authenticate)(['admin']), multer_1.uploadSingle, parseJsonData_1.parseJsonData, project_controller_1.projectController.updateProject);
router.delete('/:id', (0, auth_middleware_1.authenticate)(['admin']), project_controller_1.projectController.deleteProject);
// public routes
router.get('/', project_controller_1.projectController.getAllProjects);
router.get('/:id', project_controller_1.projectController.getSingleProject);
exports.projectRoutes = router;
