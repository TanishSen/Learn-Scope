import {
  pgTable,
  text,
  varchar,
  timestamp,
  jsonb,
  index,
  serial,
  integer,
  boolean,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table for local authentication
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table for local authentication
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username").unique().notNull(),
  email: varchar("email").unique().notNull(),
  password: varchar("password").notNull(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  college: varchar("college"),
  rewardPoints: integer("reward_points").default(0),
  totalAnswers: integer("total_answers").default(0),
  totalQuestions: integer("total_questions").default(0),
  following: integer("following").default(0),
  followers: integer("followers").default(0),
  isOnline: boolean("is_online").default(false),
  lastSeen: timestamp("last_seen").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Subjects table
export const subjects = pgTable("subjects", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  icon: varchar("icon").notNull(),
  color: varchar("color").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Questions table
export const questions = pgTable("questions", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  subjectId: integer("subject_id").references(() => subjects.id).notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  isUrgent: boolean("is_urgent").default(false),
  isResolved: boolean("is_resolved").default(false),
  viewCount: integer("view_count").default(0),
  answersCount: integer("answers_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Answers table
export const answers = pgTable("answers", {
  id: serial("id").primaryKey(),
  questionId: integer("question_id").references(() => questions.id).notNull(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  content: text("content").notNull(),
  isAccepted: boolean("is_accepted").default(false),
  votesCount: integer("votes_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Live help sessions table
export const liveHelpSessions = pgTable("live_help_sessions", {
  id: serial("id").primaryKey(),
  requesterId: varchar("requester_id").references(() => users.id).notNull(),
  helperId: varchar("helper_id").references(() => users.id),
  subjectId: integer("subject_id").references(() => subjects.id).notNull(),
  title: text("title").notNull(),
  description: text("description"),
  isUrgent: boolean("is_urgent").default(false),
  status: varchar("status").default("pending"), // pending, active, completed, cancelled
  startedAt: timestamp("started_at"),
  endedAt: timestamp("ended_at"),
  duration: integer("duration"), // in minutes
  createdAt: timestamp("created_at").defaultNow(),
});

// User expertise/subjects mapping
export const userSubjects = pgTable("user_subjects", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  subjectId: integer("subject_id").references(() => subjects.id).notNull(),
  proficiencyLevel: varchar("proficiency_level").default("beginner"), // beginner, intermediate, advanced
  canHelp: boolean("can_help").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Activity tracking
export const activities = pgTable("activities", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  type: varchar("type").notNull(), // question_asked, answer_given, help_session_completed
  entityId: integer("entity_id"), // question_id, answer_id, session_id
  description: text("description").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Schema types
export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

export type InsertSubject = typeof subjects.$inferInsert;
export type Subject = typeof subjects.$inferSelect;

export type InsertQuestion = typeof questions.$inferInsert;
export type Question = typeof questions.$inferSelect;

export type InsertAnswer = typeof answers.$inferInsert;
export type Answer = typeof answers.$inferSelect;

export type InsertLiveHelpSession = typeof liveHelpSessions.$inferInsert;
export type LiveHelpSession = typeof liveHelpSessions.$inferSelect;

export type InsertUserSubject = typeof userSubjects.$inferInsert;
export type UserSubject = typeof userSubjects.$inferSelect;

export type InsertActivity = typeof activities.$inferInsert;
export type Activity = typeof activities.$inferSelect;

// Insert schemas for form validation
export const insertQuestionSchema = createInsertSchema(questions).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  viewCount: true,
  answersCount: true,
});

export const insertAnswerSchema = createInsertSchema(answers).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  votesCount: true,
  isAccepted: true,
});

export const insertLiveHelpSessionSchema = createInsertSchema(liveHelpSessions).omit({
  id: true,
  createdAt: true,
  helperId: true,
  startedAt: true,
  endedAt: true,
  duration: true,
  status: true,
});

// User authentication schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  rewardPoints: true,
  totalAnswers: true,
  totalQuestions: true,
  following: true,
  followers: true,
  isOnline: true,
  lastSeen: true,
});

export const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = insertUserSchema.extend({
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type InsertQuestionInput = z.infer<typeof insertQuestionSchema>;
export type InsertAnswerInput = z.infer<typeof insertAnswerSchema>;
export type InsertLiveHelpSessionInput = z.infer<typeof insertLiveHelpSessionSchema>;
export type InsertUserInput = z.infer<typeof insertUserSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
