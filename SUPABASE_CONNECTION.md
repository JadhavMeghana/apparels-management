# Supabase Database Connection Guide

## Understanding Supabase Connection Types

### 1. Database Connection (Required for Spring Boot JPA)
- **Type**: Direct PostgreSQL connection
- **Format**: `jdbc:postgresql://db.PROJECT_REF.supabase.co:5432/postgres`
- **Used for**: Spring Data JPA, Hibernate, database operations
- **Required**: Yes, for current architecture

### 2. REST API (Project URL + Anon Key)
- **Type**: HTTP REST API calls
- **Format**: `https://PROJECT_REF.supabase.co`
- **Used for**: API calls to Supabase services (Auth, Storage, etc.)
- **Not sufficient**: For Spring Boot JPA - you still need database connection

## Getting Correct Database Connection from Supabase

1. **Go to Supabase Dashboard**: https://app.supabase.com
2. **Select your project**: `ccidljokobzfbnspqedc`
3. **Go to**: Settings → Database
4. **Find "Connection string"** section
5. **Select**: "Connection pooling" (recommended) or "Direct connection"
6. **Copy the JDBC connection string**

It should look like one of these:

**Connection Pooling (Recommended):**
```
postgresql://postgres.ccidljokobzfbnspqedc:[PASSWORD]@aws-0-ap-south-1.pooler.supabase.com:6543/postgres
```

**Direct Connection:**
```
postgresql://postgres.ccidljokobzfbnspqedc:[PASSWORD]@db.ccidljokobzfbnspqedc.supabase.co:5432/postgres
```

## Converting to JDBC Format

For **Connection Pooling** (pooler.supabase.com):
```
spring.datasource.url=jdbc:postgresql://aws-0-ap-south-1.pooler.supabase.com:6543/postgres?user=postgres.ccidljokobzfbnspqedc&password=YOUR_PASSWORD&sslmode=require
```

For **Direct Connection**:
```
spring.datasource.url=jdbc:postgresql://db.ccidljokobzfbnspqedc.supabase.co:5432/postgres
spring.datasource.username=postgres.ccidljokobzfbnspqedc
spring.datasource.password=YOUR_PASSWORD
```

## Common Issues

1. **Wrong Port**: Connection pooling uses port `6543`, direct uses `5432`
2. **Wrong Hostname**: Should match your project reference ID
3. **SSL Required**: May need to add `?sslmode=require` to URL
4. **Project Paused**: Check if project is active in dashboard

## Quick Fix: Update application.properties

After getting the correct connection string from Supabase:

```properties
spring.datasource.url=jdbc:postgresql://CORRECT_HOST:PORT/postgres?sslmode=require
spring.datasource.username=postgres.ccidljokobzfbnspqedc
spring.datasource.password=Meghanadatabase_14
```

## Alternative: Use Supabase REST API Only

If you want to avoid database connection, you'd need to:
1. Remove Spring Data JPA
2. Use Supabase JavaScript client or REST API
3. Rewrite all repository/service layer to use HTTP calls

**This is a major refactor** - not recommended unless you want to completely change architecture.

