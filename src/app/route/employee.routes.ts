// routes/employee.routes.ts
import express from 'express';
import { EmployeeController } from '../controller/employee.controller';

const router = express.Router();

// Admin Protected routes (later add authenticate middleware)
router.post('/create', EmployeeController.createEmployee);
router.patch('/:id', EmployeeController.updateEmployee);
router.delete('/:id', EmployeeController.deleteEmployee);

// Public routes
router.get('/', EmployeeController.getAllEmployees);
router.get('/:id', EmployeeController.getSingleEmployee);

export const employeeRoutes = router;
