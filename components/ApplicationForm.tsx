"use client"

import { useState } from "react"
import { Send, CheckCircle2, FileText, ArrowLeft } from "lucide-react"
import Link from "next/link"

type JobOpening = {
  id: string
  title: string
  location: string
  type: string
  description: any
  requirements: string[]
}

type ApplicationFormProps = {
  jobOpenings: JobOpening[]
}

export default function ApplicationForm({ jobOpenings }: ApplicationFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    resume: null as File | null,
    coverLetter: "",
  })

  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [submittedEmail, setSubmittedEmail] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError("")

    try {
      // Create FormData object for file upload
      const formDataToSend = new FormData()
      formDataToSend.append("name", formData.name)
      formDataToSend.append("email", formData.email)
      formDataToSend.append("phone", formData.phone)
      formDataToSend.append("position", formData.position)
      formDataToSend.append("coverLetter", formData.coverLetter)

      if (formData.resume) {
        formDataToSend.append("resume", formData.resume)
      }

      const response = await fetch("/api/careers", {
        method: "POST",
        body: formDataToSend,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit application")
      }

      // Success
      setSubmittedEmail(formData.email)
      setSubmitted(true)
    } catch (error) {
      console.error("Error submitting application:", error)
      setSubmitError(error instanceof Error ? error.message : "An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]

      // Validate file size (5MB max)
      const maxSize = 5 * 1024 * 1024
      if (file.size > maxSize) {
        setSubmitError("Resume file size must be less than 5MB")
        e.target.value = "" // Clear the file input
        return
      }

      // Validate file type
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ]
      if (!allowedTypes.includes(file.type)) {
        setSubmitError("Resume must be a PDF, DOC, or DOCX file")
        e.target.value = "" // Clear the file input
        return
      }

      // Clear any previous errors
      setSubmitError("")
      setFormData((prev) => ({ ...prev, resume: file }))
    }
  }

  const handleBackToForm = () => {
    setSubmitted(false)
    setSubmittedEmail("")
    setFormData({
      name: "",
      email: "",
      phone: "",
      position: "",
      resume: null,
      coverLetter: "",
    })
    setSubmitError("")
    // Reset file input
    const fileInput = document.getElementById("resume") as HTMLInputElement
    if (fileInput) fileInput.value = ""
  }

  return (
    <div className="max-w-3xl mx-auto" id="job-application-form">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-3xl md:text-4xl font-bold">Apply Now</h2>
        <p className="text-lg text-muted-foreground">
          Take the first step towards an exciting career with Lancet
        </p>
      </div>

      <div className="">
        {submitted ? (
          <div className="relative text-center p-10 rounded-2xl border border-green-500/30 bg-gradient-to-br from-green-500/10 to-green-600/10">

            {/* Success Icon */}
            <div className="relative mx-auto mb-6 w-16 h-16 flex items-center justify-center">
              <span className="absolute inset-0 rounded-full bg-green-500/20 animate-ping" />
              <div className="relative z-10 w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-green-500" />
              </div>
            </div>

            {/* Heading */}
            <h3 className="text-2xl font-semibold text-foreground mb-2">
              Application Submitted
            </h3>

            {/* Message */}
            <p className="text-muted-foreground max-w-md mx-auto mb-6">
              Thank you for your interest! Our team will review your application and get back to you shortly.
            </p>

            {/* Info */}
            <div className="flex items-center justify-center gap-2 text-sm text-foreground/60 mb-8">
              <FileText className="w-4 h-4" />
              <span>A confirmation email has been sent to <strong>{submittedEmail}</strong></span>
            </div>

            {/* Action */}
            <button
              onClick={handleBackToForm}
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all"
            >
              <ArrowLeft size={16} />
              Submit another application
            </button>
          </div>

        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {submitError && (
              <div className="p-4 bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-800 rounded-lg space-y-2">
                <p className="text-red-600 dark:text-red-400 text-sm">{submitError}</p>
                <p className="text-sm text-foreground/70">
                  Or send your application directly to{" "}
                  <a 
                    href="mailto:infoindia@lancetindia.com" 
                    className="text-primary hover:underline font-medium"
                  >
                    infoindia@lancetindia.com
                  </a>
                </p>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label htmlFor="position" className="block text-sm font-medium mb-2">
                  Position Applying For *
                </label>

                <select
                  id="position"
                  name="position"
                  required
                  value={formData.position}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {/* Placeholder option */}
                  <option value="" disabled>
                    Select a position
                  </option>

                  {/* Actual positions */}
                  {jobOpenings.map((job) => (
                    <option key={job.id} value={job.title}>
                      {job.title}
                    </option>
                  ))}
                </select>
              </div>

            </div>

            <div>
              <label htmlFor="resume" className="block text-sm font-medium mb-2">
                Resume/CV * (PDF, DOC, DOCX - Max 5MB)
              </label>
              <input
                type="file"
                id="resume"
                name="resume"
                accept=".pdf,.doc,.docx"
                required
                onChange={handleFileChange}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary/10 file:text-primary file:font-medium hover:file:bg-primary/20"
              />
              {formData.resume && (
                <p className="mt-2 text-sm text-green-600 dark:text-green-400">
                  ✓ {formData.resume.name} ({(formData.resume.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              )}
            </div>

            <div>
              <label htmlFor="coverLetter" className="block text-sm font-medium mb-2">
                Cover Letter / Why do you want to join Lancet?
              </label>
              <textarea
                id="coverLetter"
                name="coverLetter"
                rows={6}
                value={formData.coverLetter}
                onChange={handleChange}
                placeholder="Tell us about yourself and why you'd be a great fit..."
                className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-8 py-4 bg-primary text-primary-foreground rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Submit Application
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
