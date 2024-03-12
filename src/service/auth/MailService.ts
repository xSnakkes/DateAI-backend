import nodemailer from 'nodemailer';

export class MailService {


  async sendActivationMail(to: string, link: string) {
    const transporter: nodemailer.Transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    });
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: 'Account activation on ' + process.env.API_URL,
      text: '',
      html:
        `
        <div>
          <h1>For account activation follow the link</h1>
          <a href="${process.env.API_URL}/api/auth/activate/${link}">${process.env.API_URL}/api/auth/activate/${link}</a>
        </div>
        `
    });
  }
}