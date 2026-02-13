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
    const formData = await request.formData()
    
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const position = formData.get("position") as string
    const coverLetter = formData.get("coverLetter") as string
    const resume = formData.get("resume") as File | null

    // Validate required fields
    if (!name || !email || !phone || !position) {
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

    // Validate resume
    if (!resume) {
      return NextResponse.json(
        { error: "Resume is required" },
        { status: 400 }
      )
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (resume.size > maxSize) {
      return NextResponse.json(
        { error: "Resume file size must be less than 5MB" },
        { status: 400 }
      )
    }

    // Validate file type
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]
    if (!allowedTypes.includes(resume.type)) {
      return NextResponse.json(
        { error: "Resume must be a PDF, DOC, or DOCX file" },
        { status: 400 }
      )
    }

    // Convert file to buffer for email attachment
    const resumeBuffer = Buffer.from(await resume.arrayBuffer())
    const resumeBase64 = resumeBuffer.toString('base64')

    // Get access token using client credentials
    const accessToken = await getAccessToken()
    
    // Prepare email to HR/company using Graph API format
    const companyEmailData = {
      message: {
        subject: `New Job Application: ${position} - ${name}`,
        body: {
          contentType: "HTML",
          content: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #333;">New Job Application</h2>
              <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>Position:</strong> ${position}</p>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                ${coverLetter ? `
                  <p><strong>Cover Letter:</strong></p>
                  <p style="white-space: pre-wrap;">${coverLetter}</p>
                ` : ""}
              </div>
              <p style="color: #666; font-size: 12px;">This email was sent from the careers page on your website. Resume is attached.</p>
            </div>
          `,
        },
        toRecipients: [
          {
            emailAddress: {
              address: process.env.CAREERS_EMAIL || process.env.CONTACT_EMAIL || "infoindia@lancetindia.com",
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
        attachments: [
          {
            "@odata.type": "#microsoft.graph.fileAttachment",
            name: resume.name,
            contentType: resume.type,
            contentBytes: resumeBase64,
          },
        ],
      },
    }

    // Prepare auto-reply email to applicant using Graph API format
    const applicantEmailData = {
      message: {
        subject: "Application Received - Lancet India",
        body: {
          contentType: "HTML",
          content: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #333;">Thank you for your application!</h2>
              <p>Dear ${name},</p>
              <p>We have received your application for the position of <strong>${position}</strong>.</p>
              <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>Application Details:</strong></p>
                <p><strong>Position:</strong> ${position}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Resume:</strong> ${resume.name}</p>
              </div>
              <p>Our hiring team will review your application and get back to you within 5-7 business days if your qualifications match our requirements.</p>
              <p>Thank you for your interest in joining Lancet India!</p>
              <p>Best regards,<br/>Lancet India HR Team</p>
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
        await sendEmailViaGraph(accessToken, applicantEmailData)
        
        return NextResponse.json(
          { 
            success: true, 
            message: "Your application has been submitted successfully! We'll be in touch soon.",
            userEmail: email
          },
          { status: 200 }
        )
      } catch (emailError) {
        console.error("Error sending email:", emailError)
        console.log("Application submission:", { name, email, phone, position, resumeName: resume.name })
        
        return NextResponse.json(
          { 
            error: "Failed to submit application. Please try again or contact us directly.",
            details: emailError instanceof Error ? emailError.message : "Unknown error"
          },
          { status: 500 }
        )
      }
    } else {
      console.log("Azure OAuth credentials not configured. Email not sent.")
      console.log("Application submission:", { name, email, phone, position, resumeName: resume.name })
      
      return NextResponse.json(
        { error: "Application service not configured. Please contact us directly." },
        { status: 503 }
      )
    }
  } catch (error) {
    console.error("Error processing application:", error)
    return NextResponse.json(
      { error: "An error occurred while processing your application. Please try again." },
      { status: 500 }
    )
  }
}
