// models/employee.model.ts
import mongoose, { Document, Schema } from 'mongoose';
import { Employee } from '../interfaces/employee.interface';

const employeeSchema: Schema<Employee & Document> = new Schema(
  {
    serialNumber: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    role: { type: String, required: true }, // user input
    description: { type: String },
    image: { type: String },
  },
  { timestamps: true },
);

export const EmployeeModel = mongoose.model<Employee & Document>('Employee', employeeSchema);
