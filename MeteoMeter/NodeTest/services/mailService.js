const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const config = require('../config/mail');
const mailConfig = process.env.NODE_ENV === 'production'? config.prodSMTPConfig: config.devSMTPConfig;

module.exports = {
    sendNewUserEmail: function (fullname, to, cb) {
        const body = `Hi ${fullname}<br>Welcome to Mobioos. Your login id is ${to}. Thank you for registering.`;
        this.sendEmail(to, 'New Registration', body, cb);
    },

    sendForgotPasswordEmail: function (fullname, to, newPassword, cb) {
        const body = `Hi ${fullname}<br>Your new password is ${newPassword}. <br>This is system generated password.<br>
                        After login set new password by using <b>Change Password</b> feature.`;
        this.sendEmail(to, "New Password", body, cb);
    },

    sendMail: function (to, subject, body, cb) {
             let transporter = nodemailer.createTransport(smtpTransport({
             host: mailConfig.host,
             port: mailConfig.port,
             secure: mailConfig.secure,
             tls: { rejectUnauthorized: false },
             debug: false,
             auth: {
                 user: mailConfig.auth.user,
                 pass: mailConfig.auth.pass
             }
         }));

        /*let transporter = nodemailer.createTransport({
            service: 'hotmail',
            auth: {
                //user: 'noreply.digitalact@gmail.com',
                //pass: 'P@$$w0rd'
                user: mailConfig.auth.user,
                pass: mailConfig.auth.pass
            }
        });*/

        transporter.sendMail({
            from: mailConfig.from,
            to: to,
            subject: subject,
            html: body
        }, function (err, info) {
            if (cb) {
                cb(err, info);
            } else {
                console.log(err, info);
            }
        });
    }
}
