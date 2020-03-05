let nodemailer = require('nodemailer');

export async function SendMail(sendHTMLMail) {
    this.sendHTMLMail = function (htmlContent) {
        let transporter = nodemailer.createTransport('smtps://ramakrishna%40concourselabs.com:Concourse1!');
        let mailOptions = {
            from: '"Rama Krishna" <ramakrishna@concourselabs.com>',
            to: 'testmail2@gmail.com',
            subject: 'Test Report',
            text: 'Test Report',
            html: htmlContent
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return console.log(error);
            }
            console.log('Mail sent: ' + info.response);
        });
    };
}