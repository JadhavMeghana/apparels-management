# Database Connection Troubleshooting

## Current Error
```
UnknownHostException: db.ccidljokobzfbnspqedc.supabase.co
```

## Solutions

### Option 1: Update Supabase Connection String (Recommended)

1. **Go to your Supabase Dashboard**: https://app.supabase.com
2. **Select your project**
3. **Go to Settings → Database**
4. **Copy the connection string** (Connection Pooling or Direct Connection)
5. **Update `application.properties`** with the correct hostname

The connection string should look like:
```
jdbc:postgresql://db.xxxxxxxxxxxxxx.supabase.co:5432/postgres
```

### Option 2: Verify Database is Active

- Check if your Supabase project is paused/deleted
- Make sure your Supabase project is active
- Verify you have the correct project ID

### Option 3: Use Local PostgreSQL (For Testing)

If you want to test locally:

1. **Install PostgreSQL locally**
2. **Create a database**:
   ```sql
   CREATE DATABASE apparels_db;
   ```

3. **Update `application.properties`**:
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/apparels_db
   spring.datasource.username=postgres
   spring.datasource.password=your_local_password
   ```

### Option 4: Test Database Connection

Test if the hostname is reachable:

**Windows PowerShell:**
```powershell
Test-NetConnection db.ccidljokobzfbnspqedc.supabase.co -Port 5432
```

**Or ping:**
```cmd
ping db.ccidljokobzfbnspqedc.supabase.co
```

## Next Steps

1. Verify your Supabase database is active
2. Get the correct connection string from Supabase dashboard
3. Update `application.properties` with the correct URL
4. Restart the backend

