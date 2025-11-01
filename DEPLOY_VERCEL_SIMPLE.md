# Simple Vercel Deployment Guide

## Quick Overview

- ✅ **Frontend** → Deploy to **Vercel** (5 minutes)
- ✅ **Backend** → Deploy to **Railway** or **Render** (10 minutes)  
- ✅ **Database** → Already on **Supabase** (done!)

---

## Step 1: Deploy Backend to Railway (Recommended - FREE)

### Why Railway?
- ✅ Free tier available ($5 credit/month)
- ✅ Auto-detects Java/Spring Boot
- ✅ Automatic HTTPS
- ✅ Very easy setup

### Steps:

1. **Go to Railway**: https://railway.app
   - Sign up with GitHub (free)

2. **Create New Project**:
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your `apparels-management` repository

3. **Configure Environment Variables**:
   - Click on your project → "Variables" tab
   - Add these variables:
   
   ```
   DATABASE_URL=jdbc:postgresql://aws-1-ap-south-1.pooler.supabase.com:5432/postgres?sslmode=require
   DATABASE_USERNAME=postgres.ccidljokobzfbnspqedc
   DATABASE_PASSWORD=Meghanadatabase_14
   SPRING_PROFILES_ACTIVE=prod
   DDL_AUTO=update
   PORT=8080
   ```

4. **Wait for Deployment**:
   - Railway automatically builds and deploys
   - Takes 2-3 minutes
   - You'll get a URL like: `https://your-app.up.railway.app`

5. **Test Backend**:
   - Visit: `https://your-app.up.railway.app/api/categories`
   - Should return `[]` (empty array)

**✅ Note down your Railway backend URL!** You'll need it for Step 2.

---

## Step 2: Deploy Frontend to Vercel

### Steps:

1. **Go to Vercel**: https://vercel.com
   - Sign up with GitHub (free)

2. **Create New Project**:
   - Click "New Project"
   - Import your GitHub repository
   - **Important Settings**:
     - **Root Directory**: `frontend`
     - **Framework Preset**: `Vite`
     - **Build Command**: `npm run build:vercel`
     - **Output Directory**: `dist`
     - **Install Command**: `npm install`

3. **Add Environment Variable**:
   - In project settings, go to "Environment Variables"
   - Add:
     - **Key**: `VITE_API_URL`
     - **Value**: Your Railway backend URL (from Step 1)
       - Example: `https://your-app.up.railway.app`
       - ⚠️ **Don't include `/api`** - the code adds it automatically

4. **Deploy**:
   - Click "Deploy"
   - Takes 2-3 minutes

5. **Done!**
   - Vercel gives you a URL like: `https://your-app.vercel.app`
   - Your app is now live! 🎉

---

## Alternative: Deploy Backend to Render (if Railway doesn't work)

1. **Go to Render**: https://render.com
   - Sign up with GitHub

2. **Create New Web Service**:
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Settings:
     - **Build Command**: `mvn clean package -DskipTests`
     - **Start Command**: `java -jar target/apparels-management-0.0.1-SNAPSHOT.jar`
     - **Environment**: Java

3. **Add Environment Variables** (same as Railway above)

4. **Deploy**
   - Render provides URL like: `https://your-app.onrender.com`

---

## ✅ Verification Checklist

After deployment, verify:

- [ ] Backend URL works: `https://your-backend-url/api/categories`
- [ ] Frontend loads: `https://your-frontend.vercel.app`
- [ ] Frontend connects to backend (try creating a category)
- [ ] No CORS errors in browser console

---

## Troubleshooting

### CORS Errors?
- Backend already configured for `*.vercel.app` domains
- If using custom domain, update `CorsConfig.java`

### Backend Not Starting?
- Check Railway/Render logs
- Verify environment variables are set correctly
- Ensure database connection string is correct

### Frontend Can't Connect to Backend?
- Verify `VITE_API_URL` is set in Vercel
- Check that backend URL is accessible
- Ensure backend URL doesn't end with `/api`

---

## Cost

**FREE on all platforms:**
- ✅ Vercel: Free tier (unlimited for personal projects)
- ✅ Railway: Free $5/month credit
- ✅ Render: Free tier available (may spin down after inactivity)
- ✅ Supabase: Free tier (already using)

---

## Summary

```
Frontend (React)  →  Vercel       →  https://your-app.vercel.app
Backend (Spring)  →  Railway       →  https://your-backend.up.railway.app
Database (PG)     →  Supabase      →  Already configured ✅
```

**Total Time**: ~15 minutes
**Total Cost**: $0 (free tiers)

---

## Need Help?

If you encounter any issues:
1. Check the deployment logs in Railway/Render
2. Check Vercel build logs
3. Verify all environment variables are set
4. Test backend endpoint directly in browser

