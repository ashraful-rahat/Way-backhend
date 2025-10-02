import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { EmployeeService } from '../services/employee.service';

// Create Employee with Cloudinary uploaded image
const createEmployee = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // multer gives files in req.file or req.files depending on single/multiple
    const file = (req.file as Express.Multer.File) || null;

    const data = {
      serialNumber: Number(req.body.serialNumber) || 0,
      name: req.body.name,
      role: req.body.role,
      description: req.body.description,
      image: file?.path, // CloudinaryStorage gives secure_url in path
    };

    const employee = await EmployeeService.createEmployee(data as any);

    res.status(httpStatus.CREATED).json({ status: 'success', data: employee });
  } catch (err) {
    next(err);
  }
};

// Update Employee
const updateEmployee = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const file = (req.file as Express.Multer.File) || null;

    const data: any = { ...req.body };
    if (file) data.image = file.path;
    if (data.serialNumber) data.serialNumber = Number(data.serialNumber);

    const employee = await EmployeeService.updateEmployee(req.params.id, data);

    if (!employee)
      return res.status(httpStatus.NOT_FOUND).json({
        status: 'fail',
        message: 'Employee not found',
      });

    res.status(httpStatus.OK).json({ status: 'success', data: employee });
  } catch (err) {
    next(err);
  }
};

const getAllEmployees = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const employees = await EmployeeService.getAllEmployees();
    res
      .status(httpStatus.OK)
      .json({ status: 'success', results: employees.length, data: employees });
  } catch (err) {
    next(err);
  }
};

const getSingleEmployee = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const employee = await EmployeeService.getEmployeeById(req.params.id);
    if (!employee)
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ status: 'fail', message: 'Employee not found' });
    res.status(httpStatus.OK).json({ status: 'success', data: employee });
  } catch (err) {
    next(err);
  }
};

const deleteEmployee = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await EmployeeService.deleteEmployee(req.params.id);
    res.status(httpStatus.OK).json({ status: 'success', message: 'Employee deleted successfully' });
  } catch (err) {
    next(err);
  }
};

export const EmployeeController = {
  createEmployee,
  updateEmployee,
  getAllEmployees,
  getSingleEmployee,
  deleteEmployee,
};
