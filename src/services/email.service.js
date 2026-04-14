const { ServerConfig, Mailer} = require('../config/');

const htmlTemplate = (name, validTime, token) => {
  const today = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  const verificationUrl = `${ServerConfig.BASE_URL}/verify-email?token=${token}`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap" rel="stylesheet">
</head>
<body style="margin: 0; font-family: 'Poppins', sans-serif; background: #ffffff; font-size: 14px;">
  <div style="max-width: 680px; margin: 0 auto; padding: 45px 30px 60px; background: #f4f7ff; background-image: url(https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661497957196_595865/email-template-background-banner); background-repeat: no-repeat; background-size: 800px 452px; background-position: top center; color: #434343;">
    
    <header>
      <table style="width: 100%;">
        <tbody>
          <tr>
            <td>
              <img alt="Interview Experiences Logo" src="https://your-cdn-link.com/logo-e.png" height="40px" />
            </td>
            <td style="text-align: right;">
              <span style="font-size: 16px; line-height: 30px; color: #ffffff;">${today}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </header>

    <main>
      <div style="margin-top: 70px; padding: 60px 30px; background: #ffffff; border-radius: 30px; text-align: center;">
        <div style="width: 100%; max-width: 489px; margin: 0 auto;">
          <h1 style="margin: 0; font-size: 28px; font-weight: 600; color: #1f1f1f;">
            Email Verification
          </h1>
          
          <p style="margin: 0; margin-top: 24px; font-size: 18px; font-weight: 500; color: #1f1f1f;">
            ${name},
          </p>
          
          <p style="margin: 0; margin-top: 17px; font-size: 15px; line-height: 24px; color: #434343;">
            Thank you for joining <strong>Interview Experiences</strong>!<br>
            To get started, please click the button below to verify your email address.
          </p>

          <div style="margin-top: 40px;">
            <a href="${verificationUrl}" style="display: inline-block; padding: 14px 45px; background-color: #000000; color: #ffffff; text-decoration: none; border-radius: 10px; font-weight: 600; font-size: 16px;">
              Verify
            </a>
          </div>

          <p style="margin: 0; margin-top: 30px; font-style: italic; color: #8c8c8c;">
            Note: This link is valid for ${validTime} minutes.
          </p>
        </div>
      </div>

      <p style="max-width: 400px; margin: 90px auto 0; text-align: center; font-weight: 500; color: #8c8c8c;">
        Need help? Contact us at 
        <a href="mailto:support@interviewexperiences.com" style="color: #499fb6; text-decoration: none;">support@interviewexperiences.com</a>
      </p>
    </main>

    <footer style="width: 100%; max-width: 490px; margin: 20px auto 0; text-align: center; border-top: 1px solid #e6ebf1; padding-top: 20px;">
      <p style="margin: 0; color: #8c8c8c; font-size: 12px;">
        Copyright © 2026 Interview Experiences. All rights reserved.
      </p>
    </footer>
  </div>
</body>
</html>`;
};

async function sendEmail(to, subject, token) {
    try {
        const response = await Mailer.sendMail({
            from: ServerConfig.GMAIL_EMAIL,
            to: to,
            subject: subject,
            html: htmlTemplate("Manish Bobburi", 3, token),
        });
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    sendEmail,
}