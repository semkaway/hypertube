import nodemailer from 'nodemailer'

export class Mailer {
    constructor() {
        // UNIX SENDMAIL TRANSPORT

        // this.transporter = nodemailer.createTransport({
        //     sendmail: true,
        //     newline: 'unix',
        //     path: '/usr/sbin/sendmail'
        // });

        // END OF UNIX SENDMAIL TRANSPORT

        this.transporter = nodemailer.createTransport({
            host: 'localhost',
            port: 1025,
            secure: false
        });
    }

    sendActivation(email, user, config) {
        let locale = require('./letters/locale')[user.locale];
        return this.transporter.sendMail({
            from: 'no-reply@hypertube.ua',
            to: email,
            subject: locale['Activation'],
            ...(require('./letters/activation')(user, locale, config))
        });
    }

    sendResetPasswordLink(user, config) {
        let locale = require('./letters/locale')[user.locale];
        return this.transporter.sendMail({
            from: 'no-reply@hypertube.ua',
            to: user.email,
            subject: locale['Reset Password'],
            ...(require('./letters/reset-password')(user, locale, config))
        });
    }
}
