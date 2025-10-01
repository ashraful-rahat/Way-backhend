import express from 'express';
import { projectController } from '../controller/project.controller';
import { uploadProjectImages } from '../middleware/multer';

const router = express.Router();

// Protected admin routes
// router.post(
//   '/create',
//   authenticate(['admin']),
//   uploadProjectImages,
//   projectController.createProject,
// );

router.post(
  '/create',

  uploadProjectImages,
  projectController.createProject,
);
// router.patch('/:id', authenticate(['admin']), uploadProjectImages, projectController.updateProject);

router.patch('/:id', uploadProjectImages, projectController.updateProject);

// router.delete('/:id', authenticate(['admin']), projectController.deleteProject);

router.delete('/:id', projectController.deleteProject);

// Public routes
router.get('/', projectController.getAllProjects);
router.get('/:id', projectController.getSingleProject);

export const projectRoutes = router;
