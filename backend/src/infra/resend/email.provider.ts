import { resendEmailClient } from "./email.resend.js";

export class EmailProvider { 
  private constructor() { }
  private static emailProvider = resendEmailClient;

  static async sendEmail(to: string, subject: string, html: string): Promise<void> { 
    await this.emailProvider.emails.send({
      from: process.env.RESEND_EMAIL_FROM!,
      to: to,
      subject: subject,
      html: html,
    })
  }
}