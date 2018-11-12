import nodemailer from 'nodemailer'

export class Mailer {
    constructor() {
        this.transporter = nodemailer.createTransport({
            sendmail: true,
            newline: 'unix',
            path: '/usr/sbin/sendmail'
        });
    }

    sendActivation({email, first, last, activationToken, locale}) {
        return this.transporter.sendMail({
            from: 'no-reply@hypertube.ua',
            to: email,
            subject: 'Activation',
            ...(require(`./letters/${locale}/activation`)
            (email, first, last, activationToken))
        });
    }

    sendResetPasswordLink({email, first, last, resetPasswordToken, locale}) {
        return this.transporter.sendMail({
            from: 'no-reply@hypertube.ua',
            to: email,
            subject: 'Reset Password',
            ...(require(`./letters/${locale}/reset-password`)
            (email, first, last, resetPasswordToken))
        });
    }
}
