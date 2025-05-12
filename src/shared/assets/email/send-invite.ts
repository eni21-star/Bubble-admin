import nodemailer from 'nodemailer';
import appConfig from '../../../config/app.config';

export interface InviteParams {
  inviteeEmail: string;
  role: string;
  invitationLink: string;
}

/**
 * Sends an invitation email to join your app.
 */
export const sendInvitationEmail = async ({
  inviteeEmail,
  role,
  invitationLink,
}: InviteParams): Promise<void> => {
  // 1. Create transporter
  const transporter = nodemailer.createTransport({
    service: appConfig.services.nodemailer_service,
    auth: {
      user: appConfig.services.nodemailer_user,
      pass: appConfig.services.nodemailer_password,
    },
  });

  // 2. Build HTML body
  const htmlBody = `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
      <p>Dear,</p>
      <p>
        You’ve been invited to join <strong>FSL Capital Limited</strong> as <strong>${role}</strong>.
      </p>
      <p>
        Click the link below to accept your invitation and set up your account:
      </p>
      <p>
        <a href="${invitationLink}" style="display: inline-block; padding: 10px 20px; 
             background-color: #007bff; color: #fff; text-decoration: none; border-radius: 4px;">
          Accept Invitation
        </a>
      </p>
      <p>
        If the button doesn’t work, copy and paste this URL into your browser:<br>
        <small>${invitationLink}</small>
      </p>
      <p>
        We can’t wait to have you on board!
      </p>
      <p>Cheers,<br>Fsl Team</p>
    </div>
  `;

  // 3. Mail options
  const mailOptions = {
    from: `"FSL Capital Limited Team" <${appConfig.services.nodemailer_user}>`,
    to: inviteeEmail,
    subject: `Invitation to join FSL Capital Limited as ${role}`,
    html: htmlBody,
  };

  // 4. Send it
 try {
    await transporter.sendMail(mailOptions);
 } catch (error: any) {
    console.log(error.message)
 }
};


export default sendInvitationEmail