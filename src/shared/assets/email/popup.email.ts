import nodemailer from 'nodemailer';
import appConfig from '../../../config/app.config';

export const sendPopupSubmission = async (
  fullName: string,
  email: string,
  phoneNumber: string,
  stateOfResidence: string
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
        <h2>New Popup Submission</h2>
        <p>The following user has submitted their information:</p>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <th style="text-align: left; padding: 8px; background-color: #f2f2f2;">Full Name:</th>
            <td style="padding: 8px;">${fullName}</td>
          </tr>
          <tr>
            <th style="text-align: left; padding: 8px; background-color: #f2f2f2;">Email:</th>
            <td style="padding: 8px;">${email}</td>
          </tr>
          <tr>
            <th style="text-align: left; padding: 8px; background-color: #f2f2f2;">Phone Number:</th>
            <td style="padding: 8px;">${phoneNumber}</td>
          </tr>
          <tr>
            <th style="text-align: left; padding: 8px; background-color: #f2f2f2;">State of Residence:</th>
            <td style="padding: 8px;">${stateOfResidence}</td>
          </tr>
        </table>
        <p>Best regards,<br>FSL Public Portal</p>
      </div>
    `;

    const mailOptions = {
      from: 'FSL Popup Portal',
      to: email,
      subject: `New Popup Entry - ${fullName}`,
      html: htmlBody,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw error;
  }
};

export default sendPopupSubmission;
