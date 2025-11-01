# How to Get Supabase Pooler Connection URL

## Steps:

1. **In Supabase Dashboard**, go to **Settings → Database**
2. **Click the "Connection String" tab** (at the top)
3. **Select "Session" mode** (not Transaction)
4. **Look for the connection string** that shows the pooler URL

The pooler URL will look like:
```
postgresql://postgres.ccidljokobzfbnspqedc:[PASSWORD]@aws-0-ap-south-1.pooler.supabase.com:6543/postgres
```

Or it might be a different regional pooler like:
- `aws-0-us-east-1.pooler.supabase.com`
- `aws-0-eu-west-1.pooler.supabase.com`
- etc.

## Copy the Hostname

From the connection string, copy the part between `@` and `:6543`

Example: If connection string is:
```
postgresql://postgres.ccidljokobzfbnspqedc:[PASSWORD]@aws-0-ap-south-1.pooler.supabase.com:6543/postgres
```

Then the hostname is: `aws-0-ap-south-1.pooler.supabase.com`

## Update application.properties

Replace line 9 with your actual pooler hostname.

