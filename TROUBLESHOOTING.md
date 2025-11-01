# Database Connection Troubleshooting

## Current Issue
`UnknownHostException: db.ccidljokobzfbnspqedc.supabase.co`

This means your computer cannot resolve the Supabase database hostname.

## Quick Fix: Use H2 Database for Local Testing

To get the app running immediately, use H2 in-memory database:

```bash
mvnw.cmd spring-boot:run -Dspring.profiles.active=dev
```

This will:
- ✅ Start the backend successfully
- ✅ Use H2 in-memory database (data resets on restart)
- ✅ Allow you to test the frontend
- ⚠️ Note: Data won't persist after restart

## Fix Supabase Connection

### Check 1: Verify Project Status
1. Go to https://app.supabase.com
2. Check if project `ccidljokobzfbnspqedc` is **ACTIVE** (not paused)
3. If paused, resume it

### Check 2: Try Connection Pooling URL
In Supabase Dashboard → Settings → Database:
- Look for **"Connection pooling"** section
- Copy that connection string
- It might have a different hostname like `pooler.supabase.com`

### Check 3: Network Issues
The hostname resolves to IPv6, which might cause issues:

**Test connectivity:**
```powershell
Test-NetConnection db.ccidljokobzfbnspqedc.supabase.co -Port 5432
```

### Check 4: Use IP Address (if available)
If Supabase provides an IP address, try using that instead of hostname.

### Check 5: Supabase Project Settings
- Go to Settings → Database
- Check if there are IP allowlist restrictions
- Make sure your IP is allowed (if restrictions are enabled)

## Recommended: Use Development Profile

For now, run with H2 database to test:

```bash
mvnw.cmd spring-boot:run -Dspring.profiles.active=dev
```

Then fix Supabase connection later when you have the correct settings.

## Connection String Formats

### Direct Connection:
```
jdbc:postgresql://db.PROJECT_REF.supabase.co:5432/postgres?sslmode=require
```

### Connection Pooling:
```
jdbc:postgresql://pooler-PROJECT_REF.supabase.com:6543/postgres?sslmode=require
```

## Next Steps

1. **Immediate**: Run with `-Dspring.profiles.active=dev` to use H2
2. **Later**: Fix Supabase connection with correct pooling URL or project activation

