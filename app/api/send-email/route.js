// app/api/send-email/route.js
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const {
      to,
      subject,
      senderName,
      senderEmail,
      senderPhone,
      message,
      propertyDetails
    } = await request.json()

    // Validation
    if (!to || !subject || !senderName || !senderEmail || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Email content
    const emailContent = `
    Dear Property Owner,

    You have received a new enquiry for your property listing.

    SENDER DETAILS:
    ================
    Name: ${senderName}
    Email: ${senderEmail}
    Phone: ${senderPhone || 'Not provided'}

    MESSAGE:
    ========
    ${message}

    PROPERTY DETAILS:
    =================
    Address: ${propertyDetails.address}
    Price: $${propertyDetails.price}
    Type: ${propertyDetails.type} - ${propertyDetails.propertyType}
    Bedrooms: ${propertyDetails.bedroom}
    Bathrooms: ${propertyDetails.bathroom}
    Area: ${propertyDetails.area} sq ft

    Please respond to the enquirer directly at: ${senderEmail}

    Best regards,
    Real Estate Platform Team
    `

    // Method 1: Using Nodemailer with Gmail/SMTP
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      const nodemailer = require('nodemailer')
      
      const transporter = nodemailer.createTransporter({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT || 587,
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      })

      await transporter.sendMail({
        from: `"Real Estate Platform" <${process.env.SMTP_USER}>`,
        to: to,
        replyTo: senderEmail,
        subject: subject,
        text: emailContent,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #7f57f1;">New Property Enquiry</h2>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #333; margin-top: 0;">Sender Details</h3>
              <p><strong>Name:</strong> ${senderName}</p>
              <p><strong>Email:</strong> <a href="mailto:${senderEmail}">${senderEmail}</a></p>
              <p><strong>Phone:</strong> ${senderPhone || 'Not provided'}</p>
            </div>

            <div style="background: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #333; margin-top: 0;">Message</h3>
              <p style="white-space: pre-wrap;">${message}</p>
            </div>

            <div style="background: #e8f4fd; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #333; margin-top: 0;">Property Details</h3>
              <p><strong>Address:</strong> ${propertyDetails.address}</p>
              <p><strong>Price:</strong> $${propertyDetails.price}</p>
              <p><strong>Type:</strong> ${propertyDetails.type} - ${propertyDetails.propertyType}</p>
              <p><strong>Bedrooms:</strong> ${propertyDetails.bedroom}</p>
              <p><strong>Bathrooms:</strong> ${propertyDetails.bathroom}</p>
              <p><strong>Area:</strong> ${propertyDetails.area} sq ft</p>
            </div>

            <div style="background: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ffc107;">
              <p style="margin: 0;"><strong>Note:</strong> Please respond directly to the enquirer at <a href="mailto:${senderEmail}">${senderEmail}</a></p>
            </div>
          </div>
        `
      })

      return NextResponse.json({ message: 'Email sent successfully' })
    }

    // Method 2: Using SendGrid (if you prefer)
    if (process.env.SENDGRID_API_KEY) {
      const sgMail = require('@sendgrid/mail')
      sgMail.setApiKey(process.env.SENDGRID_API_KEY)

      const msg = {
        to: to,
        from: process.env.SENDGRID_FROM_EMAIL,
        replyTo: senderEmail,
        subject: subject,
        text: emailContent,
        html: `<pre>${emailContent}</pre>`
      }

      await sgMail.send(msg)
      return NextResponse.json({ message: 'Email sent successfully' })
    }

    // Method 3: Using Resend (modern email service)
    if (process.env.RESEND_API_KEY) {
      const { Resend } = require('resend')
      const resend = new Resend(process.env.RESEND_API_KEY)

      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL,
        to: to,
        replyTo: senderEmail,
        subject: subject,
        html: `<pre>${emailContent}</pre>`
      })

      return NextResponse.json({ message: 'Email sent successfully' })
    }

    // If no email service is configured
    return NextResponse.json(
      { error: 'Email service not configured. Please set up SMTP, SendGrid, or Resend.' },
      { status: 500 }
    )

  } catch (error) {
    console.error('Email sending error:', error)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}