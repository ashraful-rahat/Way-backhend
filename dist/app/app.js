"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const auth_routes_1 = __importDefault(require("./route/auth.routes"));
const city_route_1 = require("./route/city.route");
const flat_route_1 = require("./route/flat.route");
const project_route_1 = require("./route/project.route");
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
//route
app.use('/api/v1/auth', auth_routes_1.default);
app.use('/api/v1/cities', city_route_1.cityRoutes);
console.log('✅ Project routes loaded');
app.use('/api/v1/projects', project_route_1.projectRoutes);
app.use('/api/v1/flats', flat_route_1.flatRoutes);
app.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Welcome Way Housing!',
    });
});
exports.default = app;
