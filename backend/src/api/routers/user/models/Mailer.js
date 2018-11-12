import nodemailer from 'nodemailer'
import activationLetter from "./mails/activation";
import resetPasswordLetter from "./mails/reset-password";

export class Mailer {
    constructor() {
        this.transporter = nodemailer.createTransport({
            sendmail: true,
            newline: 'unix',
            path: '/usr/sbin/sendmail'
        });
    }

    sendActivation({email, first, last, activationToken}) {
        return this.transporter.sendMail({
            from: 'no-reply@hypertube.ua',
            to: email,
            subject: 'Activation',
            html: activationLetter(first, last, activationToken)
        });
    }

    sendResetPasswordLink({email, first, last, resetPasswordToken}) {
        return this.transporter.sendMail({
            from: 'no-reply@hypertube.ua',
            to: email,
            subject: 'Reset Password',
            html: resetPasswordLetter(first, last, resetPasswordToken)
        });
    }
}
