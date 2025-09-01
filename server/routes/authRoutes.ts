import { Router } from 'express';
import passport from 'passport';
import { AuthController } from '../controllers/authController';

const router = Router();

// Registration endpoint
router.post('/register', AuthController.register);

// Login endpoint
router.post('/login', AuthController.login);

// Google OAuth routes
router.get('/google', 
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth?error=google' }),
  AuthController.googleCallback
);

// LinkedIn OAuth routes
router.get('/linkedin',
  passport.authenticate('linkedin', { state: 'SOME STATE' })
);

router.get('/linkedin/callback',
  passport.authenticate('linkedin', { failureRedirect: '/auth?error=linkedin' }),
  AuthController.linkedinCallback
);

// Logout endpoint
router.post('/logout', AuthController.logout);

// Get current user endpoint
router.get('/user', AuthController.getCurrentUser);

export default router;