# Contact Form Email Setup - Complete Workflow Guide

## 📧 Overview

This document explains the complete email workflow for the Lancet website's contact and careers forms using Microsoft Graph API with OAuth2 Client Credentials.

---

## 🔄 Email Sending Workflow

### Current Implementation: Microsoft Graph API with OAuth2 Client Credentials

```
User Submits Form
       ↓
Next.js API Route (/api/contact or /api/careers)
       ↓
Request Access Token from Azure AD
       ↓
Receive Access Token (valid for ~1 hour)
       ↓
Send Email via Microsoft Graph API
       ↓
Success/Failure Response
```

### How It Works:

1. **User submits the contact/careers form** on the website
2. **Frontend sends request** to Next.js API route (`/app/api/contact/route.ts` or `/app/api/careers/route.ts`)
3. **API validates** form data (email format, required fields, file size/type for careers)
4. **OAuth2 Token Request**:
   - API calls Azure AD token endpoint: `https://login.microsoftonline.com/{tenant-id}/oauth2/v2.0/token`
   - Sends: `client_id`, `client_secret`, `grant_type=client_credentials`, `scope=https://graph.microsoft.com/.default`
   - Receives: Access token (JWT, expires in ~1 hour)
5. **Send Email via Graph API**:
   - API calls Microsoft Graph: `https://graph.microsoft.com/v1.0/users/{email}/sendMail`
   - Includes: Authorization header with access token, email payload (HTML, recipients, attachments)
   - Two emails sent:
     - **Email 1**: To company (with customer's message/resume)
     - **Email 2**: Auto-reply to customer (confirmation)
6. **Return response** to frontend (success or error)

---

## ⚠️ Known Issues & Solutions

### Issue 1: SMTP Authentication Disabled
**Error**: `SmtpClientAuthentication is disabled for the Tenant`

**Cause**: Microsoft 365 admin has disabled SMTP authentication for security

**Solution**: Use Microsoft Graph API instead of SMTP (current implementation)

### Issue 2: Application Access Policy Blocked
**Error**: `Access to OData is disabled: Blocked by tenant configured AppOnly AccessPolicy settings`

**Cause**: Microsoft 365 has Application Access Policies that restrict which apps can send emails

**Solution**: Admin must configure Application Access Policy

#### PowerShell Script to Fix:

```powershell
# Run in PowerShell with Global Admin privileges

# Install Exchange Online PowerShell module
Install-Module -Name ExchangeOnlineManagement -Force

# Connect to Exchange Online
Connect-ExchangeOnline

# Create Application Access Policy
$AppId = "YOUR_AZURE_CLIENT_ID"              # From .env.local
$MailboxEmail = "your-email@domain.com"      # Email that sends messages
$PolicyName = "EmailSendingPolicy"

New-ApplicationAccessPolicy `
  -AppId $AppId `
  -PolicyScopeGroupId $MailboxEmail `
  -AccessRight RestrictAccess `
  -Description $PolicyName

# Test the policy
Test-ApplicationAccessPolicy -Identity $MailboxEmail -AppId $AppId

# Disconnect
Disconnect-ExchangeOnline -Confirm:$false
```

**Note**: This requires **Global Administrator** or **Exchange Administrator** role.

---

## 📋 Environment Variables Setup

### Required Variables in `.env.local`:

```env
# Azure AD OAuth2 Client Credentials Configuration
AZURE_TENANT_ID=your-tenant-id-here
AZURE_CLIENT_ID=your-client-id-here
AZURE_CLIENT_SECRET=your-client-secret-here

# Email Configuration
SMTP_USER=sender-email@domain.com
CONTACT_EMAIL=contact-recipient@domain.com
CAREERS_EMAIL=careers-recipient@domain.com
```

### Azure AD App Registration Setup:

1. **Register Application in Azure**
   - Go to [Azure Portal](https://portal.azure.com) → Microsoft Entra ID → App registrations
   - Click "New registration"
   - Name: Your application name
   - Click "Register"
   - Copy **Application (client) ID** and **Directory (tenant) ID**

2. **Create Client Secret**
   - Go to "Certificates & secrets" → "New client secret"
   - Add description and expiration period
   - Copy the **Value** (client secret)

3. **Configure API Permissions**
   - Go to "API permissions" → "Add a permission" → "Microsoft Graph"
   - Select "Application permissions"
   - Add: **`Mail.Send`**
   - Click "Grant admin consent"

4. **Configure Application Access Policy** (PowerShell script above)

---

## 📊 Technical Details

### Current Code Flow (Microsoft Graph API):

```typescript
// 1. Get access token
async function getAccessToken() {
  const response = await fetch(
    `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/token`,
    {
      method: "POST",
      body: new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        scope: "https://graph.microsoft.com/.default",
        grant_type: "client_credentials",
      }),
    }
  )
  const data = await response.json()
  return data.access_token // Valid for ~1 hour
}

// 2. Send email via Graph API
async function sendEmailViaGraph(accessToken, emailData) {
  const response = await fetch(
    `https://graph.microsoft.com/v1.0/users/${SENDER_EMAIL}/sendMail`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailData),
    }
  )
}
```

### Files Structure:

1. **`/app/api/contact/route.ts`** - Contact form email handler
2. **`/app/api/careers/route.ts`** - Careers form email handler (with attachments)
3. **`.env.local`** - Environment configuration

---

## 🛠️ Troubleshooting

### Error: "SmtpClientAuthentication is disabled"
**Solution**: SMTP is disabled by admin. Use Microsoft Graph API (current implementation).

### Error: "Access to OData is disabled: Blocked by tenant configured AppOnly AccessPolicy"
**Solution**: Run PowerShell script to create Application Access Policy (requires admin).

### Error: "Invalid login: 535 5.7.139"
**Solution**: OAuth credentials are incorrect or SMTP is disabled. Verify credentials in `.env.local`.

### Error: "Failed to get access token"
**Solution**: Check `AZURE_TENANT_ID`, `AZURE_CLIENT_ID`, and `AZURE_CLIENT_SECRET` in `.env.local`.

### Emails not sending but no errors
**Solution**: Check that API permissions include `Mail.Send` and admin consent is granted.

---

## 🔧 Setup Steps

### Step 1: Configure Application Access Policy (Requires Admin)

1. Open PowerShell as Administrator
2. Run the PowerShell script provided above
3. Wait 5-10 minutes for policy to propagate
4. Restart your dev server

### Step 2: Test the Implementation

1. Navigate to the contact form
2. Fill in the form and submit
3. Check if emails are received
4. Verify auto-reply is sent to customer

---

## 📝 API Endpoints

### Contact Form
- **Endpoint**: `POST /api/contact`
- **Payload**: `{ name, email, company, message }`
- **Response**: `{ success: true, message: "..." }`

### Careers Form
- **Endpoint**: `POST /api/careers`
- **Payload**: FormData with `name`, `email`, `phone`, `position`, `coverLetter`, `resume`
- **Response**: `{ success: true, message: "..." }`

---

## 📞 Support Resources

- **Microsoft Graph API Docs**: [docs.microsoft.com/graph/api/user-sendmail](https://docs.microsoft.com/en-us/graph/api/user-sendmail)
- **Application Access Policy**: [docs.microsoft.com/exchange/powershell/new-applicationaccesspolicy](https://learn.microsoft.com/en-us/powershell/module/exchange/new-applicationaccesspolicy)
- **Azure AD App Registration**: [portal.azure.com](https://portal.azure.com)

---

## ✅ Testing Checklist

- [ ] Environment variables configured in `.env.local`
- [ ] Dev server restarted after env changes
- [ ] Azure AD app registration completed
- [ ] API permissions granted and consented
- [ ] Application Access Policy configured (PowerShell)
- [ ] Contact form submits successfully
- [ ] Contact form email received by company
- [ ] Contact form auto-reply received by customer
- [ ] Careers form submits with resume attachment
- [ ] Careers form email with attachment received
- [ ] Careers form auto-reply received
- [ ] Error handling works (invalid email, missing fields)
- [ ] Production deployment configured

---

**Last Updated**: January 27, 2026  
**Current Status**: Microsoft Graph API implementation - requires Application Access Policy configuration

This is useful for development/testing.

## Security Benefits of OAuth2

✅ **More Secure**: No passwords stored in environment variables  
✅ **Revocable**: Can revoke access without changing account password  
✅ **Scoped**: Only grants specific permissions needed  
✅ **Compliant**: Meets modern security standards  
✅ **Google Recommended**: App passwords are deprecated by Google

## Features

1. **Email to Company**:
   - Notification of new contact form submission
   - Includes all form details (name, email, company, message)

2. **Auto-Reply to User**:
   - Confirms receipt of their message
   - Includes their original message
   - Professional branding with company details

3. **Form Validation**:
   - Required fields: name, email, message
   - Email format validation
   - Error messages displayed to users

4. **User Experience**:
   - Loading spinner during submission
   - Success/error feedback
   - Form clears after successful submission
   - Disabled state during submission

## Deployment Notes

When deploying to Vercel:
1. Go to Project Settings → Environment Variables
2. Add all OAuth2 credentials:
   - `SMTP_HOST`
   - `SMTP_PORT`
   - `SMTP_USER`
   - `OAUTH_CLIENT_ID`
   - `OAUTH_CLIENT_SECRET`
   - `OAUTH_REFRESH_TOKEN`
   - `CONTACT_EMAIL`
   - `CAREERS_EMAIL` (optional)
3. Redeploy your application

## Troubleshooting

**Error: "Invalid credentials"**
- Verify all OAuth2 credentials are correct
- Ensure refresh token hasn't expired
- Check that API permissions are granted in Azure Portal
- Verify client secret hasn't expired

**Error: "Insufficient permissions"**
- Ensure these permissions are added in Azure:
  - `SMTP.Send`
  - `Mail.Send`
  - `User.Read`
- Grant admin consent for the permissions
- Re-generate refresh token with correct scopes

**Error: "Authentication failed"**
- Verify SMTP_USER matches the Microsoft account used for OAuth2
- Check that the account has an active mailbox
- Ensure MFA is configured if required by your organization

**Email not sending:**
- Check console logs for detailed error messages
- Verify the sender email has permission to send via SMTP
- Check Microsoft 365 admin center for SMTP AUTH settings
- Ensure SMTP authentication is enabled for the mailbox

**Client secret expired:**
- Client secrets in Azure expire (max 24 months)
- Create a new secret in Azure Portal
- Update OAUTH_CLIENT_SECRET in your environment variables

**Refresh token expired:**
- Refresh tokens can expire if not used regularly
- Re-generate a new refresh token following Step 4 above
- Ensure `offline_access` scope is included when generating the token
2. Add all the SMTP variables listed above
3. Redeploy your application

## Troubleshooting

**Emails not sending?**
- Check that all environment variables are set correctly
- Verify SMTP credentials are valid
- Check server logs for error messages
- Ensure 2FA and app passwords are configured (for Gmail)

**Form submission fails?**
- Check browser console for errors
- Verify API route is accessible
- Check network tab for API response

## Next Steps (Optional Enhancements)

- Add rate limiting to prevent spam
- Implement CAPTCHA (reCAPTCHA)
- Save submissions to a database
- Add file upload for resumes
- Send notifications to Slack/Discord
- Add honeypot field for spam prevention
