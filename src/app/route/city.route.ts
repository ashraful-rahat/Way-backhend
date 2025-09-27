import express from 'express';

import { cityController } from '../controller/city.controller';
import { authenticate } from '../middleware/auth.middleware';
import { uploadSingle } from '../middleware/multer';
import { parseJsonData } from '../middleware/parseJsonData';

const router = express.Router();

// শুধু অ্যাডমিনদের জন্য সুরক্ষিত route
router.post(
  '/create',
  authenticate(['admin']),
  uploadSingle,
  parseJsonData,
  cityController.createCity,
);

router.patch(
  '/:id',
  authenticate(['admin']),
  uploadSingle,
  parseJsonData,
  cityController.updateCity,
);

router.delete('/:id', authenticate(['admin']), cityController.deleteCity);

// public routes
router.get('/', cityController.getAllCities);
router.get('/:id', cityController.getSingleCity);

export const cityRoutes = router;
