import nodemailer from 'nodemailer'

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
            html: `
<h3>Hi</h3> <strong>${first} ${last}</strong>, and welcome.<br>
Here is an activation <a href="localhost:8080/activate/${activationToken}">Link</a><br>
`
        });
    }
}
