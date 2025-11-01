# Quick Vercel Deployment Guide

## 🚀 Deploy in 3 Steps

### Step 1: Deploy Backend (Railway - 5 minutes)

1. Go to https://railway.app and sign up
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Add these environment variables:
   ```
   DATABASE_URL=jdbc:postgresql://db.ccidljokobzfbnspqedc.supabase.co:5432/postgres
   DATABASE_USERNAME=postgres.ccidljokobzfbnspqedc
   DATABASE_PASSWORD=Meghanadatabase_14
   SPRING_PROFILES_ACTIVE=prod
   DDL_AUTO=update
   ```
5. Wait for deployment (get your URL: `https://your-app.up.railway.app`)

### Step 2: Update CORS (2 minutes)

Update `src/main/java/com/apparels/management/config/CorsConfig.java`:
- Already configured for `*.vercel.app` domains ✅
- If you have a custom domain, add it

Commit and push:
```bash
git add .
git commit -m "Configure for Vercel"
git push
```

### Step 3: Deploy Frontend (Vercel - 3 minutes)

1. Go to https://vercel.com and sign up
2. Click "New Project" → Import GitHub repo
3. **IMPORTANT**: Set **Root Directory** to `frontend`
4. Framework: **Vite**
5. Add Environment Variable:
   - **Key**: `VITE_API_URL`
   - **Value**: Your Railway backend URL (e.g., `https://your-app.up.railway.app`)
6. Click "Deploy"

## ✅ Done!

Your app is live at: `https://your-project.vercel.app`

## 🔧 Troubleshooting

**If API calls fail:**
1. Check backend URL in Vercel environment variables
2. Verify backend is running (visit `https://your-backend.railway.app/api/categories`)
3. Check browser console for CORS errors

**If build fails:**
1. Check Vercel build logs
2. Ensure Root Directory is set to `frontend`
3. Verify `package.json` has build scripts

## 📝 Next Steps

- Add custom domain (optional)
- Enable preview deployments for PRs
- Monitor usage in Railway/Vercel dashboards
