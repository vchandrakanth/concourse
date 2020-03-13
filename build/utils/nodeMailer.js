"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
let nodemailer = require('nodemailer');
function SendMail(sendHTMLMail) {
    return __awaiter(this, void 0, void 0, function* () {
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
    });
}
exports.SendMail = SendMail;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZU1haWxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9ub2RlTWFpbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7QUFFdkMsU0FBc0IsUUFBUSxDQUFDLFlBQVk7O1FBQ3ZDLElBQUksQ0FBQyxZQUFZLEdBQUcsVUFBVSxXQUFXO1lBQ3JDLElBQUksV0FBVyxHQUFHLFVBQVUsQ0FBQyxlQUFlLENBQUMscURBQXFELENBQUMsQ0FBQztZQUNwRyxJQUFJLFdBQVcsR0FBRztnQkFDZCxJQUFJLEVBQUUsZ0RBQWdEO2dCQUN0RCxFQUFFLEVBQUUscUJBQXFCO2dCQUN6QixPQUFPLEVBQUUsYUFBYTtnQkFDdEIsSUFBSSxFQUFFLGFBQWE7Z0JBQ25CLElBQUksRUFBRSxXQUFXO2FBQ3BCLENBQUM7WUFDRixXQUFXLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxVQUFVLEtBQUssRUFBRSxJQUFJO2dCQUNuRCxJQUFJLEtBQUssRUFBRTtvQkFDUCxPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQzdCO2dCQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUMvQyxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQztJQUNOLENBQUM7Q0FBQTtBQWpCRCw0QkFpQkMifQ==