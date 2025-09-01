import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./middlewares/authMiddleware";
import authRoutes from "./routes/authRoutes";
import studyRoutes from "./routes/studyRoutes";
import userRoutes from "./routes/userRoutes";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication middleware
  setupAuth(app);

  // Register route modules
  app.use('/api/auth', authRoutes);
  app.use('/api/studies', studyRoutes);
  app.use('/api/users', userRoutes);

  const httpServer = createServer(app);
  return httpServer;
}