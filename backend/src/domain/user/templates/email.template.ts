export type EmailTemplate = {
  subject: string;
  to: string;
  filename?: string;
};

export const emailTemplateBase = ({ to, subject } : EmailTemplate): string => {
  return `
      <!DOCTYPE html>
      <html>
        <body style="font-family: Arial, sans-serif">
          <h1>Olá, ${to}!</h1>
  
          <p>${subject}</p>
  
          <hr>
        </body>
      </html>
    `;
};

export const emailTemplateUploadNotification = ({ to, subject, filename} : EmailTemplate): string => {
  return `
      <!DOCTYPE html>
      <html
        <body style="font-family: Arial, sans-serif">
          <h1>Olá, ${to}!</h1>
  
          <p>${subject}</p>
  
          <p>Processamento do arquivo: ${filename} iniciado</p>
  
          <hr>
        </body>
      </html>
    `;
};