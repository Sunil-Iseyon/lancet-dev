import { NextRequest, NextResponse } from "next/server"

// Function to get access token using client credentials flow
async function getAccessToken() {
  const tokenEndpoint = `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}/oauth2/v2.0/token`
  
  const params = new URLSearchParams({
    client_id: process.env.AZURE_CLIENT_ID!,
    client_secret: process.env.AZURE_CLIENT_SECRET!,
    scope: "https://graph.microsoft.com/.default",
    grant_type: "client_credentials",
  })

  const response = await fetch(tokenEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  })

  const data = await response.json()
  
  if (!response.ok) {
    throw new Error(`Failed to get access token: ${data.error_description || data.error}`)
  }
  
  return data.access_token
}

// Function to send email using Microsoft Graph API
async function sendEmailViaGraph(accessToken: string, emailData: any) {
  const graphEndpoint = `https://graph.microsoft.com/v1.0/users/${process.env.SMTP_USER}/sendMail`
  
  const response = await fetch(graphEndpoint, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(emailData),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to send email: ${error}`)
  }
  
  return response
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, company, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Get access token using client credentials
    const accessToken = await getAccessToken()
    
    // Prepare email to company using Graph API format
    const companyEmailData = {
      message: {
        subject: `New Contact Form Submission from ${name}`,
        body: {
          contentType: "HTML",
          content: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #333;">New Contact Form Submission</h2>
              <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                ${company ? `<p><strong>Company:</strong> ${company}</p>` : ""}
                <p><strong>Message:</strong></p>
                <p style="white-space: pre-wrap;">${message}</p>
              </div>
              <p style="color: #666; font-size: 12px;">This email was sent from the contact form on your website.</p>
            </div>
          `,
        },
        toRecipients: [
          {
            emailAddress: {
              address: process.env.CONTACT_EMAIL || "infoindia@lancetindia.com",
            },
          },
        ],
        replyTo: [
          {
            emailAddress: {
              address: email,
            },
          },
        ],
      },
    }

    // Prepare auto-reply email to user using Graph API format
    const userEmailData = {
      message: {
        subject: "Thank you for contacting Lancet India",
        body: {
          contentType: "HTML",
          content: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #333;">Thank you for reaching out!</h2>
              <p>Dear ${name},</p>
              <p>We have received your message and will get back to you within 24 hours.</p>
              <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>Your message:</strong></p>
                <p style="white-space: pre-wrap;">${message}</p>
              </div>
              <p>Best regards,<br/>Lancet India Team</p>
              <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
              <p style="color: #666; font-size: 12px;">
                Lancet India<br/>
                DM-12, Basanti Nagar<br/>
                Rourkela, Odisha, 769012<br/>
                Phone: +91 (080) 4545 1902
              </p>
            </div>
          `,
        },
        toRecipients: [
          {
            emailAddress: {
              address: email,
            },
          },
        ],
      },
    }

    // Send emails via Microsoft Graph API
    if (process.env.AZURE_CLIENT_ID && process.env.AZURE_CLIENT_SECRET && process.env.AZURE_TENANT_ID && process.env.SMTP_USER) {
      try {
        await sendEmailViaGraph(accessToken, companyEmailData)
        await sendEmailViaGraph(accessToken, userEmailData)
        
        return NextResponse.json(
          { 
            success: true, 
            message: "Your message has been sent successfully!",
            userEmail: email
          },
          { status: 200 }
        )
      } catch (emailError) {
        console.error("Error sending email:", emailError)
        console.log("Form submission:", { name, email, company, message })
        
        return NextResponse.json(
          { 
            error: "Failed to send email. Please try again or contact us directly.",
            details: emailError instanceof Error ? emailError.message : "Unknown error"
          },
          { status: 500 }
        )
      }
    } else {
      console.log("Azure OAuth credentials not configured. Email not sent.")
      console.log("Form submission:", { name, email, company, message })
      
      return NextResponse.json(
        { error: "Email service not configured. Please contact us directly." },
        { status: 503 }
      )
    }
  } catch (error) {
    console.error("Error processing contact form:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
