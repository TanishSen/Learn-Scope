import {
  users,
  subjects,
  questions,
  answers,
  liveHelpSessions,
  userSubjects,
  activities,
  type User,
  type UpsertUser,
  type Subject,
  type Question,
  type Answer,
  type LiveHelpSession,
  type UserSubject,
  type Activity,
  type InsertQuestion,
  type InsertAnswer,
  type InsertLiveHelpSession,
  type InsertUserSubject,
  type InsertActivity,
  type InsertUserInput,
} from "@shared/schema";

// Interface for storage operations
export interface IStorage {
  // User operations (for local authentication)
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: Omit<InsertUserInput, 'confirmPassword'>): Promise<User>;
  updateUserStats(userId: string, stats: { rewardPoints?: number; totalAnswers?: number; totalQuestions?: number }): Promise<void>;
  
  // Subject operations
  getSubjects(): Promise<Subject[]>;
  createDefaultSubjects(): Promise<void>;
  
  // Question operations
  getQuestions(limit?: number, offset?: number): Promise<Question[]>;
  getQuestionById(id: number): Promise<Question | undefined>;
  getQuestionsByUser(userId: string): Promise<Question[]>;
  getQuestionsBySubject(subjectId: number): Promise<Question[]>;
  createQuestion(question: InsertQuestion): Promise<Question>;
  updateQuestion(id: number, updates: Partial<Question>): Promise<Question | undefined>;
  
  // Answer operations
  getAnswersByQuestion(questionId: number): Promise<Answer[]>;
  createAnswer(answer: InsertAnswer): Promise<Answer>;
  
  // Live help operations
  getLiveHelpSessions(status?: string): Promise<LiveHelpSession[]>;
  createLiveHelpSession(session: InsertLiveHelpSession): Promise<LiveHelpSession>;
  updateLiveHelpSession(id: number, updates: Partial<LiveHelpSession>): Promise<LiveHelpSession | undefined>;
  
  // User subject operations
  getUserSubjects(userId: string): Promise<UserSubject[]>;
  createUserSubject(userSubject: InsertUserSubject): Promise<UserSubject>;
  
  // Activity operations
  getRecentActivities(limit?: number): Promise<Activity[]>;
  createActivity(activity: InsertActivity): Promise<Activity>;
  
  // Dashboard operations
  getOnlineUsers(limit?: number): Promise<User[]>;
  getDashboardStats(userId: string): Promise<any>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User> = new Map();
  private subjects: Map<number, Subject> = new Map();
  private questions: Map<number, Question> = new Map();
  private answers: Map<number, Answer> = new Map();
  private liveHelpSessions: Map<number, LiveHelpSession> = new Map();
  private userSubjects: Map<number, UserSubject> = new Map();
  private activities: Map<number, Activity> = new Map();
  
  private currentId = 1;
  private currentUserId = 1;
  private currentSubjectId = 1;
  private currentUserSubjectId = 1;
  private currentActivityId = 1;
  private currentLiveHelpSessionId = 1;

  constructor() {
    this.initializeDefaultData();
  }

  private async initializeDefaultData() {
    await this.createDefaultSubjects();
  }

  // User operations
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(parseInt(id));
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(userData: Omit<InsertUserInput, 'confirmPassword'>): Promise<User> {
    const newUser: User = {
      id: this.currentUserId++,
      username: userData.username,
      email: userData.email,
      password: userData.password,
      firstName: userData.firstName || null,
      lastName: userData.lastName || null,
      profileImageUrl: userData.profileImageUrl || null,
      college: userData.college || null,
      rewardPoints: 0,
      totalAnswers: 0,
      totalQuestions: 0,
      following: 0,
      followers: 0,
      isOnline: true,
      lastSeen: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.set(newUser.id, newUser);
    return newUser;
  }

  async updateUserStats(userId: string, stats: { rewardPoints?: number; totalAnswers?: number; totalQuestions?: number }): Promise<void> {
    const user = this.users.get(parseInt(userId));
    if (user) {
      const updatedUser = { ...user, ...stats, updatedAt: new Date() };
      this.users.set(parseInt(userId), updatedUser);
    }
  }

  // Subject operations
  async getSubjects(): Promise<Subject[]> {
    return Array.from(this.subjects.values());
  }

  async createDefaultSubjects(): Promise<void> {
    const defaultSubjects = [
      { name: "Computer Science", icon: "fas fa-laptop", color: "blue" },
      { name: "Mathematics", icon: "fas fa-calculator", color: "purple" },
      { name: "Chemistry", icon: "fas fa-flask", color: "green" },
      { name: "Physics", icon: "fas fa-atom", color: "red" },
      { name: "English", icon: "fas fa-book", color: "yellow" },
      { name: "Biology", icon: "fas fa-dna", color: "indigo" },
    ];

    for (const subject of defaultSubjects) {
      if (!Array.from(this.subjects.values()).some(s => s.name === subject.name)) {
        const newSubject: Subject = {
          id: this.currentSubjectId++,
          ...subject,
          createdAt: new Date(),
        };
        this.subjects.set(newSubject.id, newSubject);
      }
    }
  }

  // Question operations
  async getQuestions(limit = 20, offset = 0): Promise<Question[]> {
    const allQuestions = Array.from(this.questions.values())
      .sort((a, b) => b.createdAt!.getTime() - a.createdAt!.getTime())
      .slice(offset, offset + limit);
    return allQuestions;
  }

  async getQuestionById(id: number): Promise<Question | undefined> {
    return this.questions.get(id);
  }

  async getQuestionsByUser(userId: string): Promise<Question[]> {
    return Array.from(this.questions.values())
      .filter(q => q.userId === userId)
      .sort((a, b) => b.createdAt!.getTime() - a.createdAt!.getTime());
  }

  async getQuestionsBySubject(subjectId: number): Promise<Question[]> {
    return Array.from(this.questions.values())
      .filter(q => q.subjectId === subjectId)
      .sort((a, b) => b.createdAt!.getTime() - a.createdAt!.getTime());
  }

  async createQuestion(questionData: InsertQuestion): Promise<Question> {
    const newQuestion: Question = {
      id: this.currentId++,
      ...questionData,
      isUrgent: questionData.isUrgent ?? false,
      isResolved: false,
      viewCount: 0,
      answersCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.questions.set(newQuestion.id, newQuestion);
    
    // Update user stats
    await this.updateUserStats(questionData.userId, { totalQuestions: (await this.getUser(questionData.userId))?.totalQuestions! + 1 });
    
    return newQuestion;
  }

  async updateQuestion(id: number, updates: Partial<Question>): Promise<Question | undefined> {
    const question = this.questions.get(id);
    if (question) {
      const updatedQuestion = { ...question, ...updates, updatedAt: new Date() };
      this.questions.set(id, updatedQuestion);
      return updatedQuestion;
    }
    return undefined;
  }

  // Answer operations
  async getAnswersByQuestion(questionId: number): Promise<Answer[]> {
    return Array.from(this.answers.values())
      .filter(a => a.questionId === questionId)
      .sort((a, b) => b.createdAt!.getTime() - a.createdAt!.getTime());
  }

  async createAnswer(answerData: InsertAnswer): Promise<Answer> {
    const newAnswer: Answer = {
      id: this.currentId++,
      ...answerData,
      isAccepted: false,
      votesCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.answers.set(newAnswer.id, newAnswer);
    
    // Update question answer count
    const question = this.questions.get(answerData.questionId);
    if (question) {
      await this.updateQuestion(answerData.questionId, { answersCount: (question.answersCount ?? 0) + 1 });
    }
    
    // Update user stats
    await this.updateUserStats(answerData.userId, { totalAnswers: (await this.getUser(answerData.userId))?.totalAnswers! + 1 });
    
    return newAnswer;
  }

  // Live help operations
  async getLiveHelpSessions(status?: string): Promise<LiveHelpSession[]> {
    const allSessions = Array.from(this.liveHelpSessions.values());
    if (status) {
      return allSessions.filter(s => s.status === status);
    }
    return allSessions.sort((a, b) => b.createdAt!.getTime() - a.createdAt!.getTime());
  }

  async createLiveHelpSession(sessionData: InsertLiveHelpSession): Promise<LiveHelpSession> {
    const newSession: LiveHelpSession = {
      id: this.currentLiveHelpSessionId++,
      ...sessionData,
      description: sessionData.description ?? null,
      isUrgent: sessionData.isUrgent ?? false,
      helperId: sessionData.helperId ?? null,
      startedAt: sessionData.startedAt ?? null,
      endedAt: sessionData.endedAt ?? null,
      duration: sessionData.duration ?? null,
      status: "pending",
      createdAt: new Date(),
    };
    this.liveHelpSessions.set(newSession.id, newSession);
    return newSession;
  }

  async updateLiveHelpSession(id: number, updates: Partial<LiveHelpSession>): Promise<LiveHelpSession | undefined> {
    const session = this.liveHelpSessions.get(id);
    if (session) {
      const updatedSession = { ...session, ...updates };
      this.liveHelpSessions.set(id, updatedSession);
      return updatedSession;
    }
    return undefined;
  }

  // User subject operations
  async getUserSubjects(userId: string): Promise<UserSubject[]> {
    return Array.from(this.userSubjects.values())
      .filter(us => us.userId === userId);
  }

  async createUserSubject(userSubjectData: InsertUserSubject): Promise<UserSubject> {
    const newUserSubject: UserSubject = {
      id: this.currentUserSubjectId++,
      ...userSubjectData,
      proficiencyLevel: userSubjectData.proficiencyLevel || "beginner",
      canHelp: userSubjectData.canHelp !== undefined ? userSubjectData.canHelp : true,
      createdAt: new Date(),
    };
    this.userSubjects.set(newUserSubject.id, newUserSubject);
    return newUserSubject;
  }

  // Activity operations
  async getRecentActivities(limit = 10): Promise<Activity[]> {
    return Array.from(this.activities.values())
      .sort((a, b) => b.createdAt!.getTime() - a.createdAt!.getTime())
      .slice(0, limit);
  }

  async createActivity(activityData: InsertActivity): Promise<Activity> {
    const newActivity: Activity = {
      id: this.currentActivityId++,
      ...activityData,
      entityId: activityData.entityId ?? null,
      createdAt: new Date(),
    };
    this.activities.set(newActivity.id, newActivity);
    return newActivity;
  }

  // Dashboard operations
  async getOnlineUsers(limit = 10): Promise<User[]> {
    return Array.from(this.users.values())
      .filter(u => u.isOnline)
      .sort((a, b) => b.lastSeen!.getTime() - a.lastSeen!.getTime())
      .slice(0, limit);
  }

  async getDashboardStats(userId: string): Promise<any> {
    const user = await this.getUser(userId);
    const recentQuestions = await this.getQuestionsByUser(userId);
    const recentActivities = await this.getRecentActivities(5);
    
    return {
      user,
      recentQuestions: recentQuestions.slice(0, 3),
      recentActivities,
      onlineUsers: await this.getOnlineUsers(6),
    };
  }
}

export const storage = new MemStorage();
