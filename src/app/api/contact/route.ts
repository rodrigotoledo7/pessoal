import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Interface for the form data
interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    // Get recipient email from environment variable
    const recipientEmail = process.env.RECIPIENT_EMAIL;
    
    if (!recipientEmail) {
      console.error('RECIPIENT_EMAIL environment variable is not set');
      return NextResponse.json(
        { error: 'Configuration error: Recipient email not set' },
        { status: 500 }
      );
    }

    // Parse the request body
    const formData: ContactFormData = await request.json();
    
    // Validate form data
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create a transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER || 'smtp.gmail.com',
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_FROM || `"Formulário de Contato" <${process.env.EMAIL_USER}>`,
      to: recipientEmail,
      replyTo: formData.email,
      subject: `Novo contato: ${formData.subject}`,
      text: `
        Nome: ${formData.name}
        Email: ${formData.email}
        Assunto: ${formData.subject}
        
        Mensagem:
        ${formData.message}
      `,
      html: `
        <h2>Nova mensagem de contato</h2>
        <p><strong>Nome:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Assunto:</strong> ${formData.subject}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${formData.message.replace(/\n/g, '<br>')}</p>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Return success response
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}