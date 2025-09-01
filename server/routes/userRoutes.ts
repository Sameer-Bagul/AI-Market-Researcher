import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { isAuthenticated } from '../middlewares/authMiddleware';

const router = Router();

// All user routes require authentication
router.use(isAuthenticated);

// User credit management
router.post('/credits', UserController.updateCredits);

export default router;