import nodemailer from 'nodemailer'

export class Mailer {
    constructor() {
        this.transporter = nodemailer.createTransport({
            sendmail: true,
            newline: 'unix',
            path: '/usr/sbin/sendmail'
        });
    }

    sendActivation(user) {
        let locale = require('./letters/locale')[user.locale];
        return this.transporter.sendMail({
            from: 'no-reply@hypertube.ua',
            to: user.email,
            subject: locale['Activation'],
            ...(require('./letters/activation')(user, locale))
        });
    }

    sendResetPasswordLink(user) {
        let locale = require('./letters/locale')[user.locale];
        return this.transporter.sendMail({
            from: 'no-reply@hypertube.ua',
            to: user.email,
            subject: locale['Reset Password'],
            ...(require('./letters/reset-password')(user, locale))
        });
    }
}