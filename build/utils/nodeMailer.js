"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZU1haWxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9ub2RlTWFpbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsSUFBSSxVQUFVLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBRXZDLFNBQXNCLFFBQVEsQ0FBQyxZQUFZOztRQUN2QyxJQUFJLENBQUMsWUFBWSxHQUFHLFVBQVUsV0FBVztZQUNyQyxJQUFJLFdBQVcsR0FBRyxVQUFVLENBQUMsZUFBZSxDQUFDLHFEQUFxRCxDQUFDLENBQUM7WUFDcEcsSUFBSSxXQUFXLEdBQUc7Z0JBQ2QsSUFBSSxFQUFFLGdEQUFnRDtnQkFDdEQsRUFBRSxFQUFFLHFCQUFxQjtnQkFDekIsT0FBTyxFQUFFLGFBQWE7Z0JBQ3RCLElBQUksRUFBRSxhQUFhO2dCQUNuQixJQUFJLEVBQUUsV0FBVzthQUNwQixDQUFDO1lBQ0YsV0FBVyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsVUFBVSxLQUFLLEVBQUUsSUFBSTtnQkFDbkQsSUFBSSxLQUFLLEVBQUU7b0JBQ1AsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUM3QjtnQkFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDL0MsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUM7SUFDTixDQUFDO0NBQUE7QUFqQkQsNEJBaUJDIn0=