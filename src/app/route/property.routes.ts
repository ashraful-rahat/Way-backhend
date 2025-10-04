// import express from 'express';

// import { PropertyController } from '../controller/property.controller';
// import { uploadProjectImages, uploadPropertyImages } from '../middleware/multer';

// const router = express.Router();

// // Protected admin routes
// // router.post("/create", authenticate(["admin"]), uploadProjectImages, PropertyController.createProperty);
// router.post('/create', uploadPropertyImages, PropertyController.createProperty);

// // router.patch("/:id", authenticate(["admin"]), uploadProjectImages, PropertyController.updateProperty);
// router.patch('/:id', uploadProjectImages, PropertyController.updateProperty);

// // router.delete("/:id", authenticate(["admin"]), PropertyController.deleteProperty);
// router.delete('/:id', PropertyController.deleteProperty);

// // Public routes
// router.get('/', PropertyController.getAllProperties);
// router.get('/:id', PropertyController.getSingleProperty);

// export const propertyRoutes = router;

import express from 'express';
import { PropertyController } from '../controller/property.controller';
import { uploadPropertyImages } from '../middleware/multer';

const router = express.Router();

// Protected admin routes
router.post('/create', uploadPropertyImages, PropertyController.createProperty);
router.patch('/:id', uploadPropertyImages, PropertyController.updateProperty);
router.delete('/:id', PropertyController.deleteProperty);

// Public routes
router.get('/', PropertyController.getAllProperties);
router.get('/:id', PropertyController.getSingleProperty);

export const propertyRoutes = router;
