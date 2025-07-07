# LearnScope Deployment Guide

## Render.com Deployment

### Step 1: Environment Variables Setup

In your Render service dashboard, set these environment variables:

```bash
NODE_ENV=production
SESSION_SECRET=your-super-secure-random-session-secret-for-production-use-at-least-32-characters
```

### Step 2: Build & Start Commands

- **Build Command**: `npm run build`
- **Start Command**: `npm start`

### Step 3: Auto-Deploy from Git

1. Connect your GitHub repository to Render
2. Select the branch you want to deploy (usually `main` or `master`)
3. Render will automatically deploy when you push changes

### Important Notes:

1. **PORT**: Render automatically sets the PORT environment variable - don't override it
2. **SESSION_SECRET**: Generate a strong, random secret for production
3. **NODE_ENV**: Must be set to "production" for proper hosting

### Generating a Strong Session Secret

You can generate a secure session secret using Node.js:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Or use an online generator like: https://generate-secret.vercel.app/32

## Other Deployment Platforms

### Heroku

```bash
heroku config:set NODE_ENV=production
heroku config:set SESSION_SECRET=your-production-secret
```

### Railway

```bash
railway variables set NODE_ENV=production
railway variables set SESSION_SECRET=your-production-secret
```

### Vercel (if using)

Add to your `vercel.json` or set in dashboard:

```json
{
  "env": {
    "NODE_ENV": "production",
    "SESSION_SECRET": "your-production-secret"
  }
}
```

## Local Development vs Production

| Environment | NODE_ENV    | Host      | Port | SESSION_SECRET    |
| ----------- | ----------- | --------- | ---- | ----------------- |
| Local       | development | localhost | 5000 | development-key   |
| Production  | production  | 0.0.0.0   | auto | strong-random-key |

## Troubleshooting

### Common Issues:

1. **Port binding errors**: Make sure NODE_ENV=production on deployment
2. **Session issues**: Ensure SESSION_SECRET is set and consistent
3. **Build failures**: Check that all dependencies are in package.json

### Logs:

- Check Render logs for deployment issues
- Look for "serving on 0.0.0.0:PORT" message in successful deploys
