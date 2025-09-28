// routes/flat.route.ts
import express from 'express';

import { flatController } from '../controller/flat.controller';
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
  flatController.createFlat,
);

router.patch(
  '/:id',
  authenticate(['admin']),
  uploadSingle,
  parseJsonData,
  flatController.updateFlat,
);

router.delete('/:id', authenticate(['admin']), flatController.deleteFlat);

// public routes
router.get('/', flatController.getAllFlats);
router.get('/:id', flatController.getSingleFlat);

export const flatRoutes = router;
