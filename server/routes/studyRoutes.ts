import { Router } from 'express';
import { StudyController } from '../controllers/studyController';
import { isAuthenticated } from '../middlewares/authMiddleware';

const router = Router();

// All study routes require authentication
router.use(isAuthenticated);

// Study routes
router.post('/', StudyController.createStudy);
router.get('/', StudyController.getStudies);
router.get('/:id', StudyController.getStudy);

export default router;