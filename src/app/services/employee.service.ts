// services/employee.service.ts
import { Employee } from '../interfaces/employee.interface';
import { EmployeeModel } from '../models/employee.model';

const createEmployee = async (data: Employee) => {
  return await EmployeeModel.create(data);
};

const getAllEmployees = async () => {
  return await EmployeeModel.find().sort({ serialNumber: 1 }); // serialNumber অনুযায়ী sort
};

const getEmployeeById = async (id: string) => {
  return await EmployeeModel.findById(id);
};

const updateEmployee = async (id: string, data: Partial<Employee>) => {
  return await EmployeeModel.findByIdAndUpdate(id, data, { new: true });
};

const deleteEmployee = async (id: string) => {
  return await EmployeeModel.findByIdAndDelete(id);
};

export const EmployeeService = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
