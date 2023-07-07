import * as nodemailer from 'nodemailer';

export class Mailer {
  private _transporter = nodemailer.createTransport({
    host: 'localhost',
    port: 3002,
    secure: false,
    auth: {
      user: '',
      pass: '',
    },
  });

  public constructor(private sender: string, private receivers: string[]) {}

  public async sendMail(subject: string, text: string, html: string) {
    return this._transporter.sendMail({
      from: this.sender, // sender address
      to: this.receivers.join(', '), // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });
  }

  public async sendToken(token: string) {
    return this.sendMail(
      'Trading App - OTP Token',
      `Your OTP token is: ${token}. This token will expire in 10 minutes.`,
      `<p>Your OTP token is: <strong>${token}</strong>. This token will expire in 10 minutes.</p>`,
    );
  }
}
