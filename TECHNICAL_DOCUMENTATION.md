# LearnScope - Technical Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Installation & Setup](#installation--setup)
5. [Database Schema](#database-schema)
6. [Authentication System](#authentication-system)
7. [API Endpoints](#api-endpoints)
8. [Frontend Components](#frontend-components)
9. [WebRTC Video/Audio Implementation Guide](#webrtc-videoaudio-implementation-guide)
10. [Deployment](#deployment)
11. [Troubleshooting](#troubleshooting)

## Project Overview

LearnScope is a peer-to-peer learning platform built with modern web technologies. It allows college students to ask questions, receive answers from peers, and participate in live help sessions. The application features a complete authentication system, real-time Q&A community, user profiles, and the foundation for video calling capabilities.

### Key Features
- **User Authentication**: Secure login/registration with session management
- **Community Q&A**: Post questions, provide answers, categorize by subjects
- **Live Help Sessions**: Request and provide real-time help (video calling foundation ready)
- **User Profiles**: Track progress, reward points, and statistics
- **Responsive Design**: Works on mobile and desktop devices
- **Subject Categories**: Computer Science, Mathematics, Chemistry, Physics, English, Biology

## Technology Stack

### Backend
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework
- **TypeScript**: Type-safe JavaScript development
- **Passport.js**: Authentication middleware (local strategy)
- **Express Session**: Session management with secure cookies
- **Drizzle ORM**: Type-safe database ORM
- **PostgreSQL**: Relational database (with in-memory fallback for development)
- **Zod**: Schema validation library

### Frontend
- **React 18**: UI library with hooks and modern patterns
- **TypeScript**: Type safety throughout the frontend
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Component library built on Radix UI
- **TanStack Query**: Server state management and caching
- **React Hook Form**: Form handling with validation
- **Wouter**: Lightweight client-side routing
- **Lucide React**: Icon library

### Development Tools
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Drizzle Kit**: Database migrations
- **tsx**: TypeScript execution for Node.js

## Project Structure

```
learnscope/
├── client/                     # Frontend application
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── ui/            # shadcn/ui components
│   │   │   ├── Layout.tsx     # Main layout wrapper
│   │   │   ├── MobileNavigation.tsx
│   │   │   ├── QuestionCard.tsx
│   │   │   └── UserAvatar.tsx
│   │   ├── hooks/             # Custom React hooks
│   │   │   ├── useAuth.tsx    # Authentication hook
│   │   │   ├── use-toast.ts   # Toast notifications
│   │   │   └── use-mobile.tsx # Mobile detection
│   │   ├── lib/               # Utility libraries
│   │   │   ├── queryClient.ts # TanStack Query setup
│   │   │   ├── utils.ts       # General utilities
│   │   │   └── authUtils.ts   # Authentication utilities
│   │   ├── pages/             # Page components
│   │   │   ├── Landing.tsx    # Landing page for non-authenticated users
│   │   │   ├── AuthPage.tsx   # Login/registration page
│   │   │   ├── Dashboard.tsx  # Main dashboard
│   │   │   ├── Community.tsx  # Q&A community
│   │   │   ├── AskQuestion.tsx # Question submission
│   │   │   ├── LiveHelp.tsx   # Live help requests
│   │   │   ├── Profile.tsx    # User profile
│   │   │   └── not-found.tsx  # 404 page
│   │   ├── App.tsx            # Main app component
│   │   ├── main.tsx           # Application entry point
│   │   └── index.css          # Global styles
│   └── index.html             # HTML template
├── server/                    # Backend application
│   ├── auth.ts               # Authentication setup (Passport.js)
│   ├── routes.ts             # API route definitions
│   ├── storage.ts            # Data access layer
│   ├── index.ts              # Server entry point
│   └── vite.ts               # Vite integration for development
├── shared/                   # Shared types and schemas
│   └── schema.ts             # Database schema and Zod validation
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── tailwind.config.ts        # Tailwind CSS configuration
├── vite.config.ts            # Vite configuration
└── drizzle.config.ts         # Drizzle ORM configuration
```

## Installation & Setup

### Prerequisites
- **Node.js** (version 18 or higher)
- **npm** or **yarn** package manager
- **PostgreSQL** (optional - app can run with in-memory storage)

### Step 1: Clone and Install Dependencies

```bash
# Clone the repository
git clone <repository-url>
cd learnscope

# Install dependencies
npm install
```

### Step 2: Environment Variables

Create a `.env` file in the root directory:

```bash
# Session secret for authentication
SESSION_SECRET=your-super-secret-session-key-here

# Database connection (optional - uses in-memory storage if not provided)
DATABASE_URL=postgresql://username:password@localhost:5432/learnscope

# Development environment
NODE_ENV=development
```

### Step 3: Database Setup (Optional)

If using PostgreSQL:

```bash
# Create database
createdb learnscope

# Run migrations
npm run db:migrate
```

### Step 4: Start Development Server

```bash
# Start the development server
npm run dev
```

The application will be available at `http://localhost:5000`

## Database Schema

The application uses the following database tables:

### Users Table
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    profile_image_url VARCHAR(255),
    reward_points INTEGER DEFAULT 0,
    total_questions INTEGER DEFAULT 0,
    total_answers INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

### Subjects Table
```sql
CREATE TABLE subjects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    icon VARCHAR(255),
    color VARCHAR(7),
    created_at TIMESTAMP DEFAULT NOW()
);
```

### Questions Table
```sql
CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    subject_id INTEGER REFERENCES subjects(id),
    user_id VARCHAR(255) NOT NULL,
    is_urgent BOOLEAN DEFAULT FALSE,
    is_resolved BOOLEAN DEFAULT FALSE,
    view_count INTEGER DEFAULT 0,
    answers_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

### Answers Table
```sql
CREATE TABLE answers (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    question_id INTEGER REFERENCES questions(id),
    user_id VARCHAR(255) NOT NULL,
    is_accepted BOOLEAN DEFAULT FALSE,
    upvotes INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

### Live Help Sessions Table
```sql
CREATE TABLE live_help_sessions (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    subject_id INTEGER REFERENCES subjects(id),
    requester_id VARCHAR(255) NOT NULL,
    helper_id VARCHAR(255),
    status VARCHAR(50) DEFAULT 'pending',
    is_urgent BOOLEAN DEFAULT FALSE,
    started_at TIMESTAMP,
    ended_at TIMESTAMP,
    duration INTEGER,
    created_at TIMESTAMP DEFAULT NOW()
);
```

## Authentication System

LearnScope uses a local authentication system built with Passport.js and express-session.

### How Authentication Works

1. **Password Hashing**: Passwords are hashed using Node.js crypto.scrypt with random salts
2. **Session Management**: User sessions are stored server-side with secure cookies
3. **Middleware Protection**: Routes are protected using `requireAuth` middleware
4. **Frontend State**: Authentication state is managed with React Context and TanStack Query

### Authentication Flow

```typescript
// 1. User submits login form
const loginMutation = useMutation({
  mutationFn: async (credentials: LoginInput) => {
    const res = await apiRequest("POST", "/api/login", credentials);
    return await res.json();
  }
});

// 2. Server validates credentials
passport.use(new LocalStrategy(async (username, password, done) => {
  const user = await storage.getUserByUsername(username);
  if (!user || !(await comparePasswords(password, user.password))) {
    return done(null, false);
  }
  return done(null, user);
}));

// 3. Session is created and user is logged in
req.login(user, (err) => {
  if (err) return next(err);
  res.status(200).json(user);
});
```

### Protected Routes

```typescript
// Server-side protection
app.get('/api/protected-route', requireAuth, (req, res) => {
  // req.user contains the authenticated user
  res.json({ user: req.user });
});

// Frontend route protection
function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, isLoading } = useAuth();
  
  if (isLoading) return <Loading />;
  if (!user) return <Navigate to="/auth" />;
  
  return <>{children}</>;
}
```

## API Endpoints

### Authentication Endpoints

```typescript
POST /api/register
// Body: { username, email, firstName, lastName, password, confirmPassword }
// Response: User object

POST /api/login
// Body: { username, password }
// Response: User object

POST /api/logout
// Response: 200 OK

GET /api/user
// Response: Current user object or 401
```

### Question Endpoints

```typescript
GET /api/questions?limit=20&offset=0
// Response: Array of questions with user and subject info

GET /api/questions/:id
// Response: Single question with answers

POST /api/questions
// Body: { title, description, subjectId, isUrgent? }
// Response: Created question

PUT /api/questions/:id
// Body: Partial question update
// Response: Updated question
```

### Subject Endpoints

```typescript
GET /api/subjects
// Response: Array of all subjects

GET /api/subjects/:id/questions
// Response: Questions for specific subject
```

### Live Help Endpoints

```typescript
GET /api/live-help
// Response: Array of live help sessions

POST /api/live-help
// Body: { title, description, subjectId, isUrgent? }
// Response: Created help session

PUT /api/live-help/:id
// Body: { status?, helperId?, startedAt?, endedAt? }
// Response: Updated help session
```

## Frontend Components

### Authentication Context

The `useAuth` hook provides authentication state throughout the app:

```typescript
const { 
  user,           // Current user object or null
  isLoading,      // Loading state
  isAuthenticated, // Boolean authentication status
  loginMutation,   // Login mutation
  registerMutation, // Register mutation
  logoutMutation   // Logout mutation
} = useAuth();
```

### Form Handling

Forms use React Hook Form with Zod validation:

```typescript
const form = useForm<QuestionFormData>({
  resolver: zodResolver(questionSchema),
  defaultValues: {
    title: "",
    description: "",
    subjectId: 1,
    isUrgent: false,
  },
});

const onSubmit = (data: QuestionFormData) => {
  createQuestionMutation.mutate(data);
};
```

### Data Fetching

Data is fetched using TanStack Query:

```typescript
const { data: questions, isLoading } = useQuery({
  queryKey: ["/api/questions"],
  queryFn: () => fetch("/api/questions").then(res => res.json()),
});
```

## WebRTC Video/Audio Implementation Guide

Currently, LearnScope has the foundation for live help sessions but lacks actual video/audio calling. Here's how to implement it:

### Step 1: Choose a WebRTC Solution

#### Option A: Pure WebRTC Implementation

```bash
# Install WebRTC dependencies
npm install simple-peer socket.io socket.io-client
```

Add WebSocket support to the server:

```typescript
// server/routes.ts
import { WebSocketServer } from 'ws';

export function registerRoutes(app: Express): Server {
  const httpServer = createServer(app);
  
  // Add WebSocket server
  const wss = new WebSocketServer({ 
    server: httpServer, 
    path: '/ws' 
  });
  
  wss.on('connection', (ws) => {
    ws.on('message', (message) => {
      const data = JSON.parse(message.toString());
      
      // Handle signaling for WebRTC
      switch (data.type) {
        case 'offer':
        case 'answer':
        case 'ice-candidate':
          // Forward to specific user
          broadcastToUser(data.targetUserId, data);
          break;
      }
    });
  });
  
  return httpServer;
}
```

Create WebRTC component:

```typescript
// client/src/components/VideoCall.tsx
import { useEffect, useRef, useState } from 'react';
import SimplePeer from 'simple-peer';

interface VideoCallProps {
  sessionId: string;
  isInitiator: boolean;
  onEndCall: () => void;
}

export function VideoCall({ sessionId, isInitiator, onEndCall }: VideoCallProps) {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const [peer, setPeer] = useState<SimplePeer.Instance | null>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    // Get user media
    navigator.mediaDevices.getUserMedia({ 
      video: true, 
      audio: true 
    }).then((stream) => {
      setLocalStream(stream);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      // Create peer connection
      const p = new SimplePeer({
        initiator: isInitiator,
        trickle: false,
        stream: stream,
      });

      p.on('signal', (data) => {
        // Send signaling data through WebSocket
        ws.send(JSON.stringify({
          type: 'signal',
          sessionId,
          signal: data,
        }));
      });

      p.on('stream', (remoteStream) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = remoteStream;
        }
      });

      setPeer(p);
    });

    return () => {
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
      if (peer) {
        peer.destroy();
      }
    };
  }, []);

  return (
    <div className="video-call-container">
      <video ref={localVideoRef} autoPlay muted className="local-video" />
      <video ref={remoteVideoRef} autoPlay className="remote-video" />
      <button onClick={onEndCall} className="end-call-btn">
        End Call
      </button>
    </div>
  );
}
```

#### Option B: Twilio Video (Recommended for Production)

```bash
# Install Twilio Video SDK
npm install twilio-video @types/twilio-video
```

Server setup:

```typescript
// server/routes.ts
import twilio from 'twilio';

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

app.post('/api/video-token', requireAuth, async (req, res) => {
  const { roomName } = req.body;
  const userId = req.user.id;

  const token = new twilio.jwt.AccessToken(
    process.env.TWILIO_ACCOUNT_SID!,
    process.env.TWILIO_API_KEY!,
    process.env.TWILIO_API_SECRET!,
    { identity: userId.toString() }
  );

  const videoGrant = new twilio.jwt.AccessToken.VideoGrant({
    room: roomName
  });

  token.addGrant(videoGrant);
  res.json({ token: token.toJwt() });
});
```

Frontend implementation:

```typescript
// client/src/components/TwilioVideoCall.tsx
import { useEffect, useRef, useState } from 'react';
import Video from 'twilio-video';

export function TwilioVideoCall({ roomName, onDisconnect }: {
  roomName: string;
  onDisconnect: () => void;
}) {
  const [room, setRoom] = useState<Video.Room | null>(null);
  const localVideoRef = useRef<HTMLDivElement>(null);
  const remoteVideoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Get access token
    fetch('/api/video-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ roomName }),
    })
    .then(res => res.json())
    .then(({ token }) => {
      return Video.connect(token, {
        name: roomName,
        audio: true,
        video: true,
      });
    })
    .then((connectedRoom) => {
      setRoom(connectedRoom);

      // Attach local video
      const localTrack = Array.from(connectedRoom.localParticipant.videoTracks.values())[0];
      if (localTrack && localVideoRef.current) {
        localVideoRef.current.appendChild(localTrack.track.attach());
      }

      // Handle remote participants
      connectedRoom.participants.forEach(addParticipant);
      connectedRoom.on('participantConnected', addParticipant);
    });

    function addParticipant(participant: Video.RemoteParticipant) {
      participant.tracks.forEach(addTrack);
      participant.on('trackSubscribed', addTrack);
    }

    function addTrack(track: Video.VideoTrack | Video.AudioTrack) {
      if (track.kind === 'video' && remoteVideoRef.current) {
        remoteVideoRef.current.appendChild(track.attach());
      }
    }

    return () => {
      if (room) {
        room.disconnect();
      }
    };
  }, [roomName]);

  return (
    <div className="twilio-video-container">
      <div ref={localVideoRef} className="local-video" />
      <div ref={remoteVideoRef} className="remote-video" />
      <button onClick={onDisconnect}>Disconnect</button>
    </div>
  );
}
```

### Step 2: Integrate with Live Help System

Update the LiveHelp component:

```typescript
// client/src/pages/LiveHelp.tsx
import { VideoCall } from '@/components/VideoCall';

export default function LiveHelp() {
  const [activeSession, setActiveSession] = useState<LiveHelpSession | null>(null);
  const [isInCall, setIsInCall] = useState(false);

  const startCall = (session: LiveHelpSession) => {
    setActiveSession(session);
    setIsInCall(true);
    
    // Update session status
    updateSessionMutation.mutate({
      id: session.id,
      status: 'active',
      startedAt: new Date(),
    });
  };

  if (isInCall && activeSession) {
    return (
      <VideoCall
        sessionId={activeSession.id.toString()}
        isInitiator={activeSession.requesterId === user?.id}
        onEndCall={() => {
          setIsInCall(false);
          setActiveSession(null);
        }}
      />
    );
  }

  return (
    // Regular live help UI
  );
}
```

### Step 3: Environment Variables for Video Services

Add to your `.env` file:

```bash
# For Twilio Video
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_API_KEY=your_twilio_api_key
TWILIO_API_SECRET=your_twilio_api_secret
TWILIO_AUTH_TOKEN=your_twilio_auth_token

# For WebRTC signaling server
SIGNALING_SERVER_PORT=3001
```

### Step 4: Security Considerations

1. **Token Validation**: Always validate video tokens on the server
2. **Room Access Control**: Ensure only authorized users can join rooms
3. **Session Management**: Track active video sessions and clean up properly
4. **Rate Limiting**: Prevent abuse of video calling features

## Deployment

### Replit Deployment

1. **Push to Repository**: Ensure your code is committed to Git
2. **Environment Variables**: Set production environment variables in Replit
3. **Database**: Set up PostgreSQL database if needed
4. **Deploy**: Use Replit's deployment feature

### Manual Deployment

```bash
# Build the application
npm run build

# Set production environment variables
export NODE_ENV=production
export SESSION_SECRET=your-production-secret
export DATABASE_URL=your-production-database-url

# Start the server
npm start
```

### Docker Deployment

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 5000

CMD ["npm", "start"]
```

## Troubleshooting

### Common Issues

1. **Authentication not working**
   - Check SESSION_SECRET environment variable
   - Verify cookie settings in production
   - Ensure database sessions table exists

2. **Database connection errors**
   - Verify DATABASE_URL format
   - Check database permissions
   - Fall back to in-memory storage for development

3. **Build errors**
   - Clear node_modules and reinstall
   - Check TypeScript configuration
   - Verify all imports are correct

4. **Video calling issues**
   - Check browser permissions for camera/microphone
   - Verify WebRTC/Twilio credentials
   - Test signaling server connectivity

### Development Tips

1. **Hot Reloading**: The development server supports hot module replacement
2. **Type Safety**: Use TypeScript strictly - fix all type errors
3. **Testing**: Test authentication flows thoroughly
4. **Performance**: Use React.memo and useMemo for expensive operations
5. **Accessibility**: Ensure all components are accessible with proper ARIA labels

### Performance Optimization

1. **Bundle Splitting**: Vite automatically splits bundles
2. **Lazy Loading**: Use React.lazy for route-based code splitting
3. **Image Optimization**: Compress and optimize images
4. **Database Indexing**: Add indexes to frequently queried columns
5. **Caching**: Implement proper caching strategies with TanStack Query

This technical documentation provides a complete guide to understanding, setting up, and extending the LearnScope application. For non-technical users, refer to the separate product documentation.