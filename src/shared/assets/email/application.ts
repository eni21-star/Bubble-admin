import nodemailer from 'nodemailer';
import appConfig from '../../../config/app.config';


export const sendMailer = async (
  applicantName: string,
  applicantEmail: string,
  applicantNumber: string,
  file: Express.Multer.File
): Promise<void> => {
  try {
    const transporter = nodemailer.createTransport({
      service: appConfig.services.nodemailer_service,
      auth: {
        user: appConfig.services.nodemailer_user,
        pass: appConfig.services.nodemailer_password,
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
  

  } catch (error) {
    throw error
  }
};

export default sendMailer