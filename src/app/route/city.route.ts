import express from 'express';
import { cityController } from '../controller/city.controller';
import { authenticate } from '../middleware/auth.middleware';
import { uploadCityImage } from '../middleware/multer';

const router = express.Router();

// Protected admin routes
router.post('/create', authenticate(['admin']), uploadCityImage, cityController.createCity);
router.patch('/:id', authenticate(['admin']), uploadCityImage, cityController.updateCity);
router.delete('/:id', authenticate(['admin']), cityController.deleteCity);

// Public routes
router.get('/', cityController.getAllCities);
router.get('/:id', cityController.getSingleCity);

export const cityRoutes = router;
