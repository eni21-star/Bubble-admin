"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMailer = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const app_config_1 = __importDefault(require("../../../config/app.config"));
const sendMailer = async (applicantName, applicantEmail, applicantNumber, file) => {
    try {
        const transporter = nodemailer_1.default.createTransport({
            service: app_config_1.default.services.nodemailer_service,
            auth: {
                user: app_config_1.default.services.nodemailer_user,
                pass: app_config_1.default.services.nodemailer_password,
            },
        });
        const htmlBody = `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
        <h2>From SoundClaz</h2>
        <p>Dear FSL Team,</p>
        <p>We are pleased to forward you the application details of the following candidate:</p>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <th style="text-align: left; padding: 8px; background-color: #f2f2f2;">Applicant Name:</th>
            <td style="padding: 8px;">${applicantName}</td>
          </tr>
          <tr>
            <th style="text-align: left; padding: 8px; background-color: #f2f2f2;">Applicant Email:</th>
            <td style="padding: 8px;">${applicantEmail}</td>
          </tr>
          <tr>
            <th style="text-align: left; padding: 8px; background-color: #f2f2f2;">Applicant contact Number:</th>
            <td style="padding: 8px;">${applicantNumber}</td>
          </tr>
        </table>
        <p>Attached is the applicant's resume for your review. We believe they would be a great fit for the role at FSL.</p>
        <p>Best regards,<br>SoundClaz Team</p>
      </div>
    `;
        const mailOptions = {
            from: 'NEW FSL APP',
            to: applicantEmail,
            subject: 'new fsl api',
            html: htmlBody,
            attachments: [
                {
                    filename: file.originalname,
                    content: file.buffer,
                    contentType: file.mimetype,
                },
            ],
        };
        await transporter.sendMail(mailOptions);
    }
    catch (error) {
        throw error;
    }
};
exports.sendMailer = sendMailer;
exports.default = exports.sendMailer;
