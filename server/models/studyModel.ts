import { storage } from "../storage";

export class StudyModel {
  static async createStudy(studyData: any) {
    return await storage.createStudy(studyData);
  }

  static async getStudy(id: string) {
    return await storage.getStudy(id);
  }

  static async getStudiesByUser(userId: string) {
    return await storage.getStudiesByUser(userId);
  }

  static async updateStudy(id: string, updates: any) {
    return await storage.updateStudy(id, updates);
  }
}