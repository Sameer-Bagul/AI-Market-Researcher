import { Request, Response } from 'express';
import { insertStudySchema } from '@shared/schema';
import { StudyModel } from '../models/studyModel';

export class StudyController {
  static async createStudy(req: any, res: Response) {
    try {
      const userId = req.user.id;
      const studyData = insertStudySchema.parse({
        ...req.body,
        userId,
        status: "generating", // Set initial status as "generating"
      });
      
      // Create study record first
      const study = await StudyModel.createStudy(studyData);
      
      // Make POST API call to external service for report generation
      try {
        const generateResponse = await fetch("https://admin.labscheck.com/api/generate-report", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            studyId: study.id,
            industryName: studyData.industryName,
            companyType: studyData.companyType,
            reportScope: studyData.reportScope,
            country: studyData.country,
            region: studyData.region,
          }),
        });
        
        if (generateResponse.ok) {
          // Update status to processing after successful API call
          await StudyModel.updateStudy(study.id, { status: "processing" });
        } else {
          await StudyModel.updateStudy(study.id, { status: "failed" });
        }
      } catch (apiError) {
        console.error("External API call failed:", apiError);
        await StudyModel.updateStudy(study.id, { status: "failed" });
      }
      
      // Return the created study with current status
      const updatedStudy = await StudyModel.getStudy(study.id);
      res.json(updatedStudy);
    } catch (error) {
      console.error("Error creating study:", error);
      res.status(500).json({ message: "Failed to create study" });
    }
  }

  static async getStudies(req: any, res: Response) {
    try {
      const userId = req.user.id;
      const studies = await StudyModel.getStudiesByUser(userId);
      res.json(studies);
    } catch (error) {
      console.error("Error fetching studies:", error);
      res.status(500).json({ message: "Failed to fetch studies" });
    }
  }

  static async getStudy(req: any, res: Response) {
    try {
      const study = await StudyModel.getStudy(req.params.id);
      if (!study) {
        return res.status(404).json({ message: "Study not found" });
      }
      
      // Check if study belongs to user
      const userId = req.user.id;
      if (study.userId !== userId) {
        return res.status(403).json({ message: "Access denied" });
      }
      
      res.json(study);
    } catch (error) {
      console.error("Error fetching study:", error);
      res.status(500).json({ message: "Failed to fetch study" });
    }
  }
}