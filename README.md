# 🎓 LearnScope - Peer-to-Peer Learning Platform

A modern, full-stack web application that connects students for collaborative learning through Q&A discussions and live help sessions.

## 🌟 Live Demo

**🔗 [Try LearnScope Live](https://learn-scope.onrender.com)**

*Experience the platform in action - create an account and start learning with your peers!*

## ✨ Features

### 🤝 Community Q&A
- **Ask Questions**: Post academic questions across multiple subjects
- **Provide Answers**: Help fellow students and build your reputation
- **Subject Categories**: Computer Science, Mathematics, Chemistry, Physics, English, Biology
- **Question Status**: Track urgent questions and resolved discussions
- **View Tracking**: Monitor engagement with your posts

### 🆘 Live Help Sessions
- **Request Help**: Create live help sessions for immediate assistance
- **Real-time Matching**: Connect with available tutors and peers
- **Session Management**: Track active, pending, and completed sessions
- **Interactive Support**: Get personalized help when you need it most

### 👤 User Profiles & Progress
- **Personal Dashboard**: Track your questions, answers, and help sessions
- **Reputation System**: Build credibility through helpful contributions
- **Activity History**: Monitor your learning journey and engagement
- **Profile Customization**: Personalize your learning experience

### 🔐 Secure Authentication
- **User Registration**: Create secure accounts with email verification
- **Session Management**: Persistent login with secure session handling
- **Privacy Protection**: Your data is safe and secure

## 🚀 Quick Start

### Option 1: Use the Live Platform
Visit **[learn-scope.onrender.com](https://learn-scope.onrender.com)** and start learning immediately!

### Option 2: Clone and Run Locally

#### Prerequisites
- **Node.js** (v18 or higher)
- **npm** (v8 or higher)
- **Git**

#### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/LearnScope.git
   cd LearnScope
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env file in the root directory
   echo "NODE_ENV=development" > .env
   echo "SESSION_SECRET=your-secure-secret-key-here" >> .env
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   ```
   http://localhost:5000
   ```

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and dev server
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library
- **React Hook Form** - Efficient form handling
- **React Query** - Server state management

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **TypeScript** - Type-safe server code
- **Drizzle ORM** - Type-safe database toolkit
- **SQLite** - Lightweight database
- **Lucia Auth** - Simple authentication library
- **Zod** - Schema validation

### Development Tools
- **ESBuild** - Fast JavaScript bundler
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing
- **Git** - Version control

## 📁 Project Structure

```
LearnScope/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Application pages
│   │   ├── hooks/         # Custom React hooks
│   │   └── lib/           # Utility functions
│   ├── public/            # Static assets
│   └── index.html         # Entry HTML file
├── server/                 # Backend Express application
│   ├── auth.ts            # Authentication logic
│   ├── routes.ts          # API route definitions
│   ├── storage.ts         # Database operations
│   └── index.ts           # Server entry point
├── shared/                 # Shared types and schemas
│   └── schema.ts          # Zod validation schemas
├── dist/                   # Build output (generated)
├── package.json           # Dependencies and scripts
├── vite.config.ts         # Vite configuration
├── tailwind.config.ts     # Tailwind CSS configuration
└── README.md              # This file
```

## 🎯 Usage Guide

### For Students

1. **Create an Account**
   - Visit the platform and click "Sign Up"
   - Fill in your details and verify your email
   - Complete your profile setup

2. **Ask Questions**
   - Navigate to "Ask Question"
   - Select the appropriate subject
   - Write a clear, detailed question
   - Mark as urgent if needed

3. **Answer Questions**
   - Browse questions in your expertise areas
   - Provide helpful, detailed answers
   - Build your reputation in the community

4. **Request Live Help**
   - Go to "Live Help" section
   - Create a help session with your topic
   - Wait for a peer or tutor to join
   - Get real-time assistance

### For Educators

1. **Monitor Student Activity**
   - Review questions and answers in your subjects
   - Identify common learning challenges
   - Provide guidance and corrections when needed

2. **Facilitate Learning**
   - Encourage peer-to-peer teaching
   - Share the platform with your students
   - Create study groups and discussions

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Getting Started
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Test thoroughly
5. Commit: `git commit -m 'Add amazing feature'`
6. Push: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Areas for Contribution
- 🐛 **Bug Fixes** - Help us identify and fix issues
- ✨ **New Features** - Video calls, file sharing, study groups
- 🎨 **UI/UX Improvements** - Make the platform more intuitive
- 📚 **Documentation** - Improve guides and tutorials
- 🧪 **Testing** - Add unit and integration tests
- 🌐 **Internationalization** - Add multi-language support

### Development Guidelines
- Follow TypeScript best practices
- Use existing component patterns
- Write descriptive commit messages
- Test your changes thoroughly
- Update documentation as needed

## 📋 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm start           # Start production server

# Database
npm run db:generate  # Generate database migrations
npm run db:migrate   # Run database migrations
npm run db:studio    # Open database studio

# Utilities
npm run type-check   # Check TypeScript types
npm run lint         # Run code linting
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```bash
# Required
NODE_ENV=development|production
SESSION_SECRET=your-secure-secret-key

# Optional
PORT=5000                    # Server port (default: 5000)
DATABASE_URL=path/to/db      # Database location
VITE_API_URL=http://localhost:5000  # API URL for frontend
```

### Database Configuration

The application uses SQLite by default. To use a different database:

1. Update `server/storage.ts`
2. Install the appropriate driver
3. Update the connection string
4. Run migrations

## 🐛 Troubleshooting

### Common Issues

**❌ "Port already in use"**
```bash
# Kill the process using the port
lsof -ti:5000 | xargs kill -9
```

**❌ "Module not found" errors**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**❌ "Build fails" on deployment**
```bash
# Ensure all build dependencies are in "dependencies" not "devDependencies"
# Check the deployment logs for specific errors
```

**❌ Frontend not loading**
```bash
# Verify the build creates dist/public/index.html
npm run build
ls -la dist/public/
```

### Getting Help

- 📧 **Email**: tanishsen.2520@gmail.com
- 💬 **GitHub Issues**: [Create an issue](https://github.com/your-username/LearnScope/issues)
- 💭 **Discussions**: [Join the discussion](https://github.com/your-username/LearnScope/discussions)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Radix UI** - For accessible component primitives
- **Tailwind CSS** - For the utility-first CSS framework
- **Lucide** - For the beautiful icon library
- **Drizzle** - For the type-safe ORM
- **Render** - For reliable hosting
- **Open Source Community** - For inspiration and support

## 🌟 Star the Project

If LearnScope helped you or you find it useful, please consider giving it a star ⭐ on GitHub. It helps others discover the project and motivates continued development!

---

**Built with ❤️ **
