import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

class EmailService {
    private transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
    }

    async sendEmail(to: string[], cc: string[], subject: string, text: string) {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: to.join(','),
            cc: cc.join(','),
            subject: subject,
            text: text
        };

        return this.transporter.sendMail(mailOptions);
    }

    async sendJobRequestEmail(to: string[], cc: string[], subject: string, text: string) {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: to.join(','),
            cc: cc.join(','),
            subject: subject,
            text: text
        };

        return this.transporter.sendMail(mailOptions);
    }
}

export default new EmailService();
