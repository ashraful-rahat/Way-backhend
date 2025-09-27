export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  userStatus: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}
