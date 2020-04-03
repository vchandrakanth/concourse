"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const helpers_1 = require("@concourse/shared/helpers");
let ResetPasswordComponent = class ResetPasswordComponent {
    constructor(authFacade, fb) {
        this.authFacade = authFacade;
        this.fb = fb;
        this.minLength = helpers_1.PASSWORD_MIN_LENGTH_VALIDATION_MSG;
        this.maxLength = helpers_1.PASSWORD_MAX_LENGTH_VALIDATION_MSG;
        this.passwordPatternValidation = helpers_1.PASSWORD_PATTERN_VALIDATION_MSG;
        this.userVerifyInfo$ = this.authFacade.userVerifyInfo$;
        this.form = this.fb.group({
            newPassword: [undefined, [
                    forms_1.Validators.required,
                    forms_1.Validators.pattern(helpers_1.PASSWORD_PATTERN),
                    forms_1.Validators.minLength(6),
                    forms_1.Validators.maxLength(20)
                ]],
            newPasswordConfirm: [undefined, [
                    forms_1.Validators.required,
                    forms_1.Validators.pattern(helpers_1.PASSWORD_PATTERN),
                    forms_1.Validators.minLength(6),
                    forms_1.Validators.maxLength(20),
                    helpers_1.repeatPasswordValidator
                ]],
            securityQuestionId: [undefined, [forms_1.Validators.required]],
            answer: [undefined, [forms_1.Validators.required]]
        });
    }
    updateControls(form) {
        Object.values(form.controls).forEach(control => {
            if (control instanceof forms_1.FormGroup) {
                this.updateControls(control);
            }
            control.markAsDirty();
            control.updateValueAndValidity();
        });
    }
    submit(userInfo) {
        this.updateControls(this.form);
        if (this.form.valid) {
            const { newPassword, newPasswordConfirm, securityQuestionId, answer } = this.form.value;
            const formData = {
                newPassword,
                newPasswordConfirm,
                identityToken: userInfo.token,
                securityQuestionId,
                answer
            };
            this.authFacade.resetPassword(formData);
        }
    }
};
ResetPasswordComponent = __decorate([
    core_1.Component({
        selector: 'app-reset-password',
        templateUrl: './reset-password.component.html',
        styleUrls: ['./reset-password.component.scss']
    })
], ResetPasswordComponent);
exports.ResetPasswordComponent = ResetPasswordComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzZXQtcGFzc3dvcmQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3VzZXIvcmVzZXQtcGFzc3dvcmQvcmVzZXQtcGFzc3dvcmQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBQTBDO0FBQzFDLDBDQUFvRTtBQUVwRSx1REFPbUM7QUFRbkMsSUFBYSxzQkFBc0IsR0FBbkMsTUFBYSxzQkFBc0I7SUFvQmpDLFlBQ21CLFVBQXNCLEVBQ3RCLEVBQWU7UUFEZixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLE9BQUUsR0FBRixFQUFFLENBQWE7UUFyQmxDLGNBQVMsR0FBRyw0Q0FBa0MsQ0FBQztRQUMvQyxjQUFTLEdBQUcsNENBQWtDLENBQUM7UUFDL0MsOEJBQXlCLEdBQUcseUNBQStCLENBQUM7UUFDNUQsb0JBQWUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQztRQUNsRCxTQUFJLEdBQWMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7WUFDOUIsV0FBVyxFQUFFLENBQUMsU0FBUyxFQUFFO29CQUN2QixrQkFBVSxDQUFDLFFBQVE7b0JBQ25CLGtCQUFVLENBQUMsT0FBTyxDQUFDLDBCQUFnQixDQUFDO29CQUNwQyxrQkFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7b0JBQ3ZCLGtCQUFVLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQztpQkFBQyxDQUFDO1lBQzVCLGtCQUFrQixFQUFFLENBQUMsU0FBUyxFQUFFO29CQUM5QixrQkFBVSxDQUFDLFFBQVE7b0JBQ25CLGtCQUFVLENBQUMsT0FBTyxDQUFDLDBCQUFnQixDQUFDO29CQUNwQyxrQkFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7b0JBQ3ZCLGtCQUFVLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQztvQkFDeEIsaUNBQXVCO2lCQUFDLENBQUM7WUFDM0Isa0JBQWtCLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxrQkFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3RELE1BQU0sRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDLGtCQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDM0MsQ0FBQyxDQUFDO0lBS0gsQ0FBQztJQUVELGNBQWMsQ0FBQyxJQUFlO1FBQzVCLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUM3QyxJQUFJLE9BQU8sWUFBWSxpQkFBUyxFQUFFO2dCQUNoQyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQzlCO1lBQ0QsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3RCLE9BQU8sQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1FBQ25DLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELE1BQU0sQ0FBQyxRQUFhO1FBQ2xCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9CLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDbkIsTUFBTSxFQUFFLFdBQVcsRUFBRSxrQkFBa0IsRUFBRSxrQkFBa0IsRUFBRSxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUN4RixNQUFNLFFBQVEsR0FBRztnQkFDZixXQUFXO2dCQUNYLGtCQUFrQjtnQkFDbEIsYUFBYSxFQUFFLFFBQVEsQ0FBQyxLQUFLO2dCQUM3QixrQkFBa0I7Z0JBQ2xCLE1BQU07YUFDUCxDQUFBO1lBQ0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDekM7SUFDSCxDQUFDO0NBRUYsQ0FBQTtBQW5EWSxzQkFBc0I7SUFMbEMsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxvQkFBb0I7UUFDOUIsV0FBVyxFQUFFLGlDQUFpQztRQUM5QyxTQUFTLEVBQUUsQ0FBQyxpQ0FBaUMsQ0FBQztLQUMvQyxDQUFDO0dBQ1csc0JBQXNCLENBbURsQztBQW5EWSx3REFBc0IifQ==