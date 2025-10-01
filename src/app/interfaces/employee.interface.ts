// interfaces/employee.interface.ts
export interface Employee {
  _id: string;
  serialNumber: number; // order for display
  name: string;
  role: string; // input দেবে, type fixed নেই
  description?: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}
