import { Resend } from "resend"

export const resendEmailClient = new Resend(process.env.RESEND!);
