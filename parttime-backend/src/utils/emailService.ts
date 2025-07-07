// src/utils/emailService.ts
import { config } from '../config';

interface EmailOptions {
  to: string;
  subject: string;
  textBody: string;
  htmlBody?: string;
}

// THIS IS A PLACEHOLDER - Replace with actual SendGrid/ACS integration
export const sendEmail = async (options: EmailOptions): Promise<boolean> => {
  const { apiKey, senderAddress } = config.email;

  if (!apiKey || !senderAddress) {
    console.error("Email service API key or sender address is not configured. Email not sent.");
    return false;
  }

  console.log("--- Sending Email (Placeholder) ---");
  console.log(`From: ${senderAddress}`);
  console.log(`To: ${options.to}`);
  console.log(`Subject: ${options.subject}`);
  console.log(`Text Body: ${options.textBody}`);
  if (options.htmlBody) {
    console.log(`HTML Body: ${options.htmlBody}`);
  }
  console.log("--- Email Sent (Placeholder) ---");

  // TODO: Integrate actual email sending logic here
  // Example with SendGrid (you'd need to install @sendgrid/mail)
  /*
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(apiKey);
  const msg = {
    to: options.to,
    from: senderAddress, // Use a verified sender
    subject: options.subject,
    text: options.textBody,
    html: options.htmlBody || options.textBody,
  };
  try {
    await sgMail.send(msg);
    console.log('Email actually sent via SendGrid');
    return true;
  } catch (error) {
    console.error('Error sending email via SendGrid:', error.response?.body || error.message);
    return false;
  }
  */
  return true; // Assume success for placeholder
};