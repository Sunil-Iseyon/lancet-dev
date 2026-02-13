# Deploying to Vercel with Tina Cloud

## Prerequisites

1. Sign up for Tina Cloud at https://app.tina.io/
2. Create a new project in Tina Cloud
3. Connect your GitHub repository to the Tina Cloud project

## Step 1: Get Tina Cloud Credentials

From your Tina Cloud dashboard:

1. Go to your project settings
2. Copy your **Client ID**
3. Generate and copy a **Read-Only Token**

## Step 2: Configure Vercel Environment Variables

In your Vercel project settings, add these environment variables:

### Required for Production:
```
TINA_PUBLIC_IS_LOCAL=false
NEXT_PUBLIC_TINA_CLIENT_ID=<your_tina_client_id>
TINA_TOKEN=<your_tina_read_only_token>
NEXT_PUBLIC_TINA_BRANCH=main
```

### Required for Authentication:
```
NEXTAUTH_SECRET=<generate_a_random_secret>
```

To generate a secure NEXTAUTH_SECRET, run:
```bash
openssl rand -base64 32
```

## Step 3: Push Your Content to Tina Cloud

### Option A: Using the Tina CLI
```bash
# Build and push content to Tina Cloud
pnpm run build
```

### Option B: Manual Setup
1. Go to `/admin` on your deployed site
2. Login with your Tina Cloud credentials
3. Your content from the `content/` folder should be visible
4. Any edits made through the CMS will be saved to Tina Cloud

## Step 4: Deploy to Vercel

1. Push your code to GitHub
2. Vercel will automatically trigger a build
3. The build will use Tina Cloud (not local files) because `TINA_PUBLIC_IS_LOCAL=false`

## Local Development

For local development, keep using:
```
TINA_PUBLIC_IS_LOCAL=true
```

This reads content directly from your `content/` folder without needing Tina Cloud.

## Troubleshooting

### Build Error: "Server responded with status code 400"
- Make sure all environment variables are set in Vercel
- Verify your Tina Cloud credentials are correct
- Check that your content is properly synced to Tina Cloud

### Content Not Showing
- Verify `TINA_PUBLIC_IS_LOCAL=false` in Vercel
- Check that your content exists in Tina Cloud
- Review the Vercel build logs for errors

## Environment Variable Summary

| Variable | Local Dev | Vercel Production |
|----------|-----------|-------------------|
| TINA_PUBLIC_IS_LOCAL | `true` | `false` |
| NEXT_PUBLIC_TINA_CLIENT_ID | (optional) | Required |
| TINA_TOKEN | (optional) | Required |
| NEXT_PUBLIC_TINA_BRANCH | `main` | `main` |
| NEXTAUTH_SECRET | (optional) | Required |
