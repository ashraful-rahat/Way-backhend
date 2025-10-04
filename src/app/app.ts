import cors from 'cors';
import express, { Application } from 'express';
import authRoutes from './route/auth.routes';
import { cityRoutes } from './route/city.route';
import { employeeRoutes } from './route/employee.routes';
import { flatRoutes } from './route/flat.route';
import { projectRoutes } from './route/project.route';
import { propertyRoutes } from './route/property.routes';

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());

//route
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/cities', cityRoutes);
//console.log('✅ Project routes loaded');
app.use('/api/v1/projects', projectRoutes);
app.use('/api/v1/flats', flatRoutes);
app.use('/api/v1/employees', employeeRoutes);
app.use('/api/v1/properties', propertyRoutes);
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome Way Housing!',
  });
});

export default app;
