import cors from 'cors';
import express, { Application } from 'express';
import authRoutes from './route/auth.routes';
import { cityRoutes } from './route/city.route';

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());

//route
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/cities', cityRoutes);

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome Way Housing!',
  });
});

export default app;
