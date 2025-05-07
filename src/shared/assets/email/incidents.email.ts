import nodemailer from 'nodemailer';
import appConfig from '../../../config/app.config';

export const sendIncidentReport = async (
  insuredName: string,
  policyNumber: string,
  description: string,
  file?: Express.Multer.File 
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
        <h2>Incident Report</h2>
        <p>Dear FSL Team,</p>
        <p>An incident has been submitted via the public portal with the following details:</p>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <th style="text-align: left; padding: 8px; background-color: #f2f2f2;">Insured Name:</th>
            <td style="padding: 8px;">${insuredName}</td>
          </tr>
          <tr>
            <th style="text-align: left; padding: 8px; background-color: #f2f2f2;">Policy Number:</th>
            <td style="padding: 8px;">${policyNumber}</td>
          </tr>
          <tr>
            <th style="text-align: left; padding: 8px; background-color: #f2f2f2;">Description:</th>
            <td style="padding: 8px;">${description}</td>
          </tr>
        </table>
        <p>${file ? "An attachment has been included for review." : "No attachments were included."}</p>
        <p>Best regards,<br>FSL Public Incident Portal</p>
      </div>
    `;

    const mailOptions = {
      from: 'FSL Incident Reporter',
      to: 'eniolaolagbegi@gmail.com', // change to your receiving address
      subject: `New Incident Report - ${insuredName}`,
      html: htmlBody,
      attachments: file
        ? [
            {
              filename: file.originalname,
              content: file.buffer,
              contentType: file.mimetype,
            },
          ]
        : [],
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw error;
  }
};

export default sendIncidentReport;
