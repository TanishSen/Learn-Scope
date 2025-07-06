import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { 
  insertQuestionSchema, 
  insertAnswerSchema, 
  insertLiveHelpSessionSchema 
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Dashboard routes
  app.get('/api/dashboard', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const dashboardData = await storage.getDashboardStats(userId);
      res.json(dashboardData);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      res.status(500).json({ message: "Failed to fetch dashboard data" });
    }
  });

  // Subject routes
  app.get('/api/subjects', async (req, res) => {
    try {
      const subjects = await storage.getSubjects();
      res.json(subjects);
    } catch (error) {
      console.error("Error fetching subjects:", error);
      res.status(500).json({ message: "Failed to fetch subjects" });
    }
  });

  // Question routes
  app.get('/api/questions', async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 20;
      const offset = parseInt(req.query.offset as string) || 0;
      const questions = await storage.getQuestions(limit, offset);
      res.json(questions);
    } catch (error) {
      console.error("Error fetching questions:", error);
      res.status(500).json({ message: "Failed to fetch questions" });
    }
  });

  app.get('/api/questions/:id', async (req, res) => {
    try {
      const questionId = parseInt(req.params.id);
      const question = await storage.getQuestionById(questionId);
      if (!question) {
        return res.status(404).json({ message: "Question not found" });
      }
      res.json(question);
    } catch (error) {
      console.error("Error fetching question:", error);
      res.status(500).json({ message: "Failed to fetch question" });
    }
  });

  app.post('/api/questions', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const validatedData = insertQuestionSchema.parse({
        ...req.body,
        userId
      });
      
      const question = await storage.createQuestion(validatedData);
      
      // Create activity
      await storage.createActivity({
        userId,
        type: "question_asked",
        entityId: question.id,
        description: `Asked a question: ${question.title}`,
      });
      
      res.status(201).json(question);
    } catch (error) {
      console.error("Error creating question:", error);
      res.status(500).json({ message: "Failed to create question" });
    }
  });

  app.get('/api/questions/subject/:subjectId', async (req, res) => {
    try {
      const subjectId = parseInt(req.params.subjectId);
      const questions = await storage.getQuestionsBySubject(subjectId);
      res.json(questions);
    } catch (error) {
      console.error("Error fetching questions by subject:", error);
      res.status(500).json({ message: "Failed to fetch questions by subject" });
    }
  });

  // Answer routes
  app.get('/api/questions/:questionId/answers', async (req, res) => {
    try {
      const questionId = parseInt(req.params.questionId);
      const answers = await storage.getAnswersByQuestion(questionId);
      res.json(answers);
    } catch (error) {
      console.error("Error fetching answers:", error);
      res.status(500).json({ message: "Failed to fetch answers" });
    }
  });

  app.post('/api/questions/:questionId/answers', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const questionId = parseInt(req.params.questionId);
      
      const validatedData = insertAnswerSchema.parse({
        ...req.body,
        userId,
        questionId
      });
      
      const answer = await storage.createAnswer(validatedData);
      
      // Create activity
      await storage.createActivity({
        userId,
        type: "answer_given",
        entityId: answer.id,
        description: `Answered a question`,
      });
      
      res.status(201).json(answer);
    } catch (error) {
      console.error("Error creating answer:", error);
      res.status(500).json({ message: "Failed to create answer" });
    }
  });

  // Live help routes
  app.get('/api/live-help', async (req, res) => {
    try {
      const status = req.query.status as string;
      const sessions = await storage.getLiveHelpSessions(status);
      res.json(sessions);
    } catch (error) {
      console.error("Error fetching live help sessions:", error);
      res.status(500).json({ message: "Failed to fetch live help sessions" });
    }
  });

  app.post('/api/live-help', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const validatedData = insertLiveHelpSessionSchema.parse({
        ...req.body,
        requesterId: userId
      });
      
      const session = await storage.createLiveHelpSession(validatedData);
      res.status(201).json(session);
    } catch (error) {
      console.error("Error creating live help session:", error);
      res.status(500).json({ message: "Failed to create live help session" });
    }
  });

  // User routes
  app.get('/api/users/:userId/subjects', async (req, res) => {
    try {
      const userId = req.params.userId;
      const userSubjects = await storage.getUserSubjects(userId);
      res.json(userSubjects);
    } catch (error) {
      console.error("Error fetching user subjects:", error);
      res.status(500).json({ message: "Failed to fetch user subjects" });
    }
  });

  app.get('/api/users/:userId/questions', async (req, res) => {
    try {
      const userId = req.params.userId;
      const questions = await storage.getQuestionsByUser(userId);
      res.json(questions);
    } catch (error) {
      console.error("Error fetching user questions:", error);
      res.status(500).json({ message: "Failed to fetch user questions" });
    }
  });

  // Activity routes
  app.get('/api/activities', async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const activities = await storage.getRecentActivities(limit);
      res.json(activities);
    } catch (error) {
      console.error("Error fetching activities:", error);
      res.status(500).json({ message: "Failed to fetch activities" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
