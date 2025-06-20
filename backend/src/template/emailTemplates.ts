const getForgotPasswordEmailTemplate = (
  username: string,
  resetLink: string
): string => {
  return `
    <div style="font-family: 'Inter', 'Roboto', Arial, sans-serif; max-width: 600px; margin: 40px auto; padding: 32px 24px; background: #fff; border-radius: 12px; box-shadow: 0 4px 24px rgba(0,0,0,0.07); border: 1px solid #f0f0f0;">
      <div style="text-align: center; margin-bottom: 32px;">
        <img src='https://via.placeholder.com/120x40?text=Logo' alt='Your Company Logo' style='height: 40px; margin-bottom: 8px;' />
      </div>
      <h2 style="color: #222; font-weight: 700; margin-bottom: 12px;">Hi ${username},</h2>
      <p style="color: #444; font-size: 16px; margin-bottom: 28px;">You recently requested to reset your password. Click the button below to reset it.</p>
      <div style="text-align: center; margin: 36px 0;">
        <a href="${resetLink}" style="background: linear-gradient(90deg, #007BFF 0%, #0056d6 100%); color: #fff; padding: 16px 36px; text-decoration: none; border-radius: 6px; font-size: 18px; font-weight: 600; display: inline-block; box-shadow: 0 2px 8px rgba(0,123,255,0.10); letter-spacing: 0.5px;">Reset Password</a>
      </div>
      <p style="color: #888; font-size: 15px; margin-bottom: 18px;">If you didn't request a password reset, you can safely ignore this email.</p>
      <p style="color: #b0b0b0; font-size: 13px; margin-bottom: 32px;">This link will expire in 15 minutes for your security.</p>
      <div style="background: #f7f7f7; padding: 14px 18px; border-radius: 6px; font-size: 13px; color: #666; word-break: break-all; margin-bottom: 32px;">
        <strong>Can't click the button?</strong><br />
        Copy and paste this link into your browser:<br />
        <a href="${resetLink}" style="color: #007BFF;">${resetLink}</a>
      </div>
      <hr style="margin: 36px 0; border: none; border-top: 1px solid #eee;" />
      <p style="color: #aaa; font-size: 12px; text-align: center;">© ${new Date().getFullYear()} Your Company. All rights reserved.</p>
    </div>
    <link href='https://fonts.googleapis.com/css?family=Inter:400,600,700&display=swap' rel='stylesheet' type='text/css'>
  `;
};

export { getForgotPasswordEmailTemplate };
