import {
  users,
  studies,
  type User,
  type UpsertUser,
  type InsertUser,
  type Study,
  type InsertStudy,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // User operations for authentication
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  upsertUser(user: UpsertUser): Promise<User>;
  updateUserCredits(userId: string, credits: number): Promise<User | undefined>;
  
  // Study operations
  createStudy(study: InsertStudy): Promise<Study>;
  getStudiesByUser(userId: string): Promise<Study[]>;
  getStudy(id: string): Promise<Study | undefined>;
  updateStudy(id: string, updates: Partial<Study>): Promise<Study | undefined>;
}

export class DatabaseStorage implements IStorage {
  // User operations for authentication
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async createUser(userData: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(userData).returning();
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async updateUserCredits(userId: string, credits: number): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set({ credits, updatedAt: new Date() })
      .where(eq(users.id, userId))
      .returning();
    return user;
  }

  // Study operations
  async createStudy(study: InsertStudy): Promise<Study> {
    const [newStudy] = await db.insert(studies).values(study).returning();
    return newStudy;
  }

  async getStudiesByUser(userId: string): Promise<Study[]> {
    return await db
      .select()
      .from(studies)
      .where(eq(studies.userId, userId))
      .orderBy(desc(studies.createdAt));
  }

  async getStudy(id: string): Promise<Study | undefined> {
    const [study] = await db.select().from(studies).where(eq(studies.id, id));
    return study;
  }

  async updateStudy(id: string, updates: Partial<Study>): Promise<Study | undefined> {
    const [study] = await db
      .update(studies)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(studies.id, id))
      .returning();
    return study;
  }
}

export const storage = new DatabaseStorage();
