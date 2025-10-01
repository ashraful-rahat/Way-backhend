// controller/employee.controller.ts
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { EmployeeService } from '../services/employee.service';

const createEmployee = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const employee = await EmployeeService.createEmployee(req.body);
    res.status(httpStatus.CREATED).json({ status: 'success', data: employee });
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

const updateEmployee = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const employee = await EmployeeService.updateEmployee(req.params.id, req.body);
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
  getAllEmployees,
  getSingleEmployee,
  updateEmployee,
  deleteEmployee,
};
