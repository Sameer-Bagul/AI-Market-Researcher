import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { registerSchema, loginSchema } from '@shared/schema';
import { AuthModel } from '../models/authModel';

export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const userData = registerSchema.parse(req.body);
      
      // Check if email already exists
      const existingUser = await AuthModel.getUserByEmail(userData.email);
      
      if (existingUser) {
        return res.status(400).json({ 
          message: "Email already exists" 
        });
      }

      // Create user with hashed password
      const user = await AuthModel.createUser({
        ...userData,
        password: await AuthModel.hashPassword(userData.password),
        provider: "local",
        credits: 50, // Give new users 50 credits
      });

      req.login(user, (err) => {
        if (err) return next(err);
        res.status(201).json({ 
          id: user.id, 
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          country: user.country,
          contactNumber: user.contactNumber,
          industry: user.industry,
          credits: user.credits,
        });
      });
    } catch (error: any) {
      res.status(400).json({ 
        message: "Registration failed", 
        error: error.message 
      });
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    passport.authenticate("local", (err: any, user: any, info: any) => {
      if (err) return next(err);
      if (!user) {
        return res.status(401).json({ 
          message: "Invalid email or password" 
        });
      }
      
      req.login(user, (err) => {
        if (err) return next(err);
        res.json({
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          country: user.country,
          contactNumber: user.contactNumber,
          industry: user.industry,
          credits: user.credits,
        });
      });
    })(req, res, next);
  }

  static async logout(req: Request, res: Response, next: NextFunction) {
    req.logout((err) => {
      if (err) return next(err);
      res.json({ message: "Logged out successfully" });
    });
  }

  static async getCurrentUser(req: Request, res: Response) {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    const user = req.user as any;
    res.json({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      country: user.country,
      contactNumber: user.contactNumber,
      industry: user.industry,
      credits: user.credits,
      provider: user.provider,
    });
  }

  static async googleCallback(req: Request, res: Response) {
    res.redirect("/app");
  }

  static async linkedinCallback(req: Request, res: Response) {
    res.redirect("/app");
  }
}