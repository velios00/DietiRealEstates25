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
    }
})

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
    } catch(err) {
        console.error("Error sending email: ", err);
        throw err;
    }
}