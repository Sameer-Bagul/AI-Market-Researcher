import { Request, Response } from 'express';
import { UserModel } from '../models/userModel';

export class UserController {
  static async updateCredits(req: any, res: Response) {
    try {
      const userId = req.user.id;
      const { credits } = req.body;
      
      const user = await UserModel.updateCredits(userId, credits);
      res.json(user);
    } catch (error) {
      console.error("Error updating credits:", error);
      res.status(500).json({ message: "Failed to update credits" });
    }
  }
}