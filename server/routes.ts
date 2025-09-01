import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./auth";
import { insertStudySchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  setupAuth(app);

  // Study routes
  app.post('/api/studies', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const studyData = insertStudySchema.parse({
        ...req.body,
        userId,
        status: "generating", // Set initial status as "generating"
      });
      
      // Create study record first
      const study = await storage.createStudy(studyData);
      
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
          await storage.updateStudy(study.id, { status: "processing" });
        } else {
          await storage.updateStudy(study.id, { status: "failed" });
        }
      } catch (apiError) {
        console.error("External API call failed:", apiError);
        await storage.updateStudy(study.id, { status: "failed" });
      }
      
      // Return the created study with current status
      const updatedStudy = await storage.getStudy(study.id);
      res.json(updatedStudy);
    } catch (error) {
      console.error("Error creating study:", error);
      res.status(500).json({ message: "Failed to create study" });
    }
  });

  app.get('/api/studies', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const studies = await storage.getStudiesByUser(userId);
      res.json(studies);
    } catch (error) {
      console.error("Error fetching studies:", error);
      res.status(500).json({ message: "Failed to fetch studies" });
    }
  });

  app.get('/api/studies/:id', isAuthenticated, async (req: any, res) => {
    try {
      const study = await storage.getStudy(req.params.id);
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
  });

  // User credit management
  app.post('/api/users/credits', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const { credits } = req.body;
      
      const user = await storage.updateUserCredits(userId, credits);
      res.json(user);
    } catch (error) {
      console.error("Error updating credits:", error);
      res.status(500).json({ message: "Failed to update credits" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
