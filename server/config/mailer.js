import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendMail({ to, subject, text, html }) {
  try {
    const info = await transporter.sendMail({
      from: `"DietiRealEstates" <${process.env.SMTP_USER}>`,
      to,
      subject,
      text,
      html,
    });
    console.log("Message sent: ", info.messageId);
  } catch (err) {
    console.error("Error sending email: ", err);
    throw err;
  }
}

export class EmailTemplates {
  static async sendWelcomeEmail(
    email,
    name,
    role,
    agencyName = null,
    temporaryPassword,
  ) {
    const roleLabels = {
      manager: "manager",
      agent: "agente",
      admin: "amministratore",
    };

    const roleLabel = roleLabels[role] || role;

    // Costruisci la descrizione del ruolo
    let roleDescription = `Il tuo account da ${roleLabel}`;
    if (role === "manager" && agencyName) {
      roleDescription = `Il tuo account manager per l'agenzia ${agencyName}`;
    }

    const subject = "Welcome to DietiRealEstates!";

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #007bff;">Benvenuto in DietiRealEstates</h2>
        <p>Ciao <strong>${name}</strong>,</p>
        <p>${roleDescription} è stato creato con successo.</p>
        
        <div style="background: #f8f9fa; padding: 15px; border-left: 4px solid #007bff; margin: 20px 0;">
          <p style="margin: 0;"><strong>Password temporanea:</strong></p>
          <p style="margin: 10px 0; font-size: 18px; font-weight: bold;">${temporaryPassword}</p>
        </div>
        
        <p><strong>Importante:</strong> Cambia la password al primo accesso.</p>
        <p>Saluti,<br>Il Team DietiRealEstates</p>
      </div>
    `;

    const text = `
      Benvenuto in DietiRealEstates
      
      Ciao ${name},
      
      ${roleDescription} è stato creato.
      
      Password temporanea: ${temporaryPassword}
      
      Importante: E' consigliato cambiare la password al più presto.
      
      Saluti,
      Team DietiRealEstates
    `;

    return await sendMail({
      to: email,
      subject: subject,
      text: text,
      html: html,
    });
  }
}
