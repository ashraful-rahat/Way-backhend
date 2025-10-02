import express from 'express';
import { flatController } from '../controller/flat.controller';
import { uploadFlatImages } from '../middleware/multer';

const router = express.Router();

// Protected admin routes
// router.post('/create', authenticate(['admin']), uploadFlatImages, flatController.createFlat);

router.post('/create', uploadFlatImages, flatController.createFlat);

// router.patch('/:id', authenticate(['admin']), uploadFlatImages, flatController.updateFlat);

router.patch('/:id', uploadFlatImages, flatController.updateFlat);

// router.delete('/:id', authenticate(['admin']), flatController.deleteFlat);

router.delete('/:id', flatController.deleteFlat);

// Public routes
router.get('/', flatController.getAllFlats);
router.get('/:id', flatController.getSingleFlat);

export const flatRoutes = router;
