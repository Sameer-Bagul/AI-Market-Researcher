import { storage } from "../storage";

export class UserModel {
  static async updateCredits(userId: string, credits: number) {
    return await storage.updateUserCredits(userId, credits);
  }

  static async getUser(id: string) {
    return await storage.getUser(id);
  }

  static async getUserByEmail(email: string) {
    return await storage.getUserByEmail(email);
  }
}