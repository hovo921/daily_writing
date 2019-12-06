"use strict";
const nodemailer = require("nodemailer");

const auth= {
        user: "daily.writing.test@gmail.com",
        pass: "dailywriting2019"
}

class Nodemailer {
    static async sendVerificationEmail(to, href) {
        const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth
            });
            const mailOptions = {
                from: auth.user,
                to,
                subject: 'Verify your account',
                html: '<body><p>Click button bellow to approve profile</p>' +
                    '<a href="' + href + '" >Activate Profile</a></body>'
            };

            transporter.sendMail(mailOptions, function (err, info) {
                if(err)
                    console.log(err);
                else
                    console.log(info);
            });
        }

    static async sendResetPasswordMessage(to, href) {
        const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth
            });
            const mailOptions = {
                from: auth.user,
                to,
                subject: 'Reset your password',
                html: '<body><p>Click button bellow to reset your password</p>' +
                    '<a href="' + href + '" > Reset your password </a></body>' +
                    '<p>or use link </p> ' + href
            };

            transporter.sendMail(mailOptions, function (err, info) {
                if(err)
                    console.log(err);
                else
                    console.log(info);
            });
        }
}

module.exports = Nodemailer;
