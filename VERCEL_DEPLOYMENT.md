# Vercel Deployment Guide

This guide explains how to deploy the Apparels Management System to Vercel (frontend) and Railway/Render (backend).

## Architecture

- **Frontend**: Deployed on Vercel
- **Backend**: Deployed on Railway, Render, or similar platform
- **Database**: Supabase (PostgreSQL)

## Prerequisites

1. Vercel account (free tier works)
2. Railway or Render account (for backend)
3. Supabase account (for database)
4. GitHub account (to connect repositories)

## Step 1: Deploy Backend

### Option A: Railway (Recommended)

1. **Create Railway Account**
   - Go to https://railway.app
   - Sign up with GitHub

2. **Deploy Backend**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Select your repository
   - Railway will auto-detect it's a Java/Maven project
   - Add environment variables:
     ```
     DATABASE_URL=jdbc:postgresql://your-supabase-host:5432/postgres
     DATABASE_USERNAME=postgres.your-project
     DATABASE_PASSWORD=your-password
     SPRING_PROFILES_ACTIVE=prod
     DDL_AUTO=update
     ```
   - Railway will automatically build and deploy

3. **Get Backend URL**
   - Railway will provide a URL like: `https://your-app.up.railway.app`
   - Note this URL for frontend configuration

### Option B: Render

1. **Create Render Account**
   - Go to https://render.com
   - Sign up with GitHub

2. **Deploy Backend**
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Settings:
     - **Build Command**: `mvn clean package -DskipTests`
     - **Start Command**: `java -jar target/apparels-management-0.0.1-SNAPSHOT.jar`
     - **Environment**: Java
   - Add environment variables (same as Railway above)
   - Deploy

3. **Get Backend URL**
   - Render will provide a URL like: `https://your-app.onrender.com`

## Step 2: Update CORS Configuration

Update `CorsConfig.java` to include your Vercel domain:

```java
config.addAllowedOrigin("https://your-app.vercel.app");
config.addAllowedOrigin("https://your-app-name.vercel.app");
```

Or use a pattern for preview deployments:
```java
config.addAllowedOriginPattern("https://*.vercel.app");
```

## Step 3: Deploy Frontend to Vercel

1. **Prepare Frontend**
   ```bash
   cd frontend
   npm install
   ```

2. **Set Environment Variable**
   - Create `.env.production` file:
     ```
     VITE_API_URL=https://your-backend.railway.app
     ```
   - Or set it in Vercel dashboard (recommended)

3. **Deploy via Vercel Dashboard**
   - Go to https://vercel.com
   - Click "New Project"
   - Import your GitHub repository
   - **Root Directory**: Set to `frontend`
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
   - Add Environment Variable:
     - **Key**: `VITE_API_URL`
     - **Value**: Your backend URL (e.g., `https://your-backend.railway.app`)
   - Click "Deploy"

4. **Or Deploy via Vercel CLI**
   ```bash
   npm i -g vercel
   cd frontend
   vercel
   # Follow prompts
   # Set VITE_API_URL environment variable when prompted
   ```

## Step 4: Configure Environment Variables

### Vercel (Frontend)
- Go to Project Settings → Environment Variables
- Add:
  - `VITE_API_URL` = `https://your-backend.railway.app` (or Render URL)

### Railway/Render (Backend)
- Go to Settings → Environment Variables
- Add:
  - `DATABASE_URL` = Your Supabase PostgreSQL URL
  - `DATABASE_USERNAME` = Your Supabase username
  - `DATABASE_PASSWORD` = Your Supabase password
  - `SPRING_PROFILES_ACTIVE` = `prod`
  - `DDL_AUTO` = `update`

## Step 5: Verify Deployment

1. **Test Backend**
   - Visit: `https://your-backend.railway.app/api/categories`
   - Should return JSON (empty array if no categories)

2. **Test Frontend**
   - Visit your Vercel URL
   - Frontend should load and connect to backend

## Troubleshooting

### CORS Errors
- Ensure `CorsConfig.java` includes your Vercel domain
- Check backend logs for CORS errors
- Verify environment variables are set correctly

### API Connection Issues
- Verify `VITE_API_URL` is set correctly in Vercel
- Check backend URL is accessible
- Test backend endpoint directly in browser

### Build Failures
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version (18+)

### Backend Not Starting
- Check Railway/Render logs
- Verify database connection string
- Ensure environment variables are set
- Check Java version (17+)

## Custom Domain (Optional)

### Vercel Custom Domain
1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

### Backend Custom Domain
- Railway: Add custom domain in project settings
- Render: Add custom domain in service settings
- Update `VITE_API_URL` in Vercel after adding custom domain

## Continuous Deployment

Both Vercel and Railway/Render support automatic deployments:
- **Vercel**: Automatically deploys on push to main branch
- **Railway/Render**: Automatically deploys on push to main branch

## Preview Deployments

- **Vercel**: Automatically creates preview deployments for pull requests
- Update CORS to allow `*.vercel.app` for preview deployments

## Cost Estimate

### Free Tier
- **Vercel**: Free (with limitations)
- **Railway**: $5/month credit (free tier available)
- **Render**: Free tier available (with limitations)
- **Supabase**: Free tier available

### Paid (if needed)
- **Vercel**: Starts at $20/month
- **Railway**: Pay-as-you-go after credit
- **Render**: Starts at $7/month
- **Supabase**: Starts at $25/month

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Railway Documentation](https://docs.railway.app)
- [Render Documentation](https://render.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
