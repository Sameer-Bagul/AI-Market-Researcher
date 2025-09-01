import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { storage } from "../storage";
import type { RegisterUser } from "@shared/schema";

const scryptAsync = promisify(scrypt);

export class AuthModel {
  static async hashPassword(password: string): Promise<string> {
    const salt = randomBytes(16).toString("hex");
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;
    return `${buf.toString("hex")}.${salt}`;
  }

  static async comparePasswords(supplied: string, stored: string): Promise<boolean> {
    if (!stored) return false;
    const [hashed, salt] = stored.split(".");
    if (!hashed || !salt) return false;
    const hashedBuf = Buffer.from(hashed, "hex");
    const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
    return timingSafeEqual(hashedBuf, suppliedBuf);
  }

  static async getUserByEmail(email: string) {
    return await storage.getUserByEmail(email);
  }

  static async createUser(userData: any) {
    return await storage.createUser(userData);
  }

  static async getUser(id: string) {
    return await storage.getUser(id);
  }
}