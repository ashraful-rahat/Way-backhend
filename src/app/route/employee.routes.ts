import express from 'express';
import { EmployeeController } from '../controller/employee.controller';
import { uploadEmployeeImage } from '../middleware/multer';

const router = express.Router();

// POST / PATCH with image upload
router.post('/create', uploadEmployeeImage, EmployeeController.createEmployee);
router.patch('/:id', uploadEmployeeImage, EmployeeController.updateEmployee);
router.delete('/:id', EmployeeController.deleteEmployee);

// Public
router.get('/', EmployeeController.getAllEmployees);
router.get('/:id', EmployeeController.getSingleEmployee);

export const employeeRoutes = router;
