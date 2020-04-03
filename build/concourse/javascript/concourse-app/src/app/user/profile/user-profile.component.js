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
const faTimes_1 = require("@fortawesome/free-solid-svg-icons/faTimes");
const operators_1 = require("rxjs/operators");
const helpers_1 = require("@concourse/shared/helpers");
let UserProfileComponent = class UserProfileComponent {
    constructor(authFacade, userFacade, instFacade) {
        this.authFacade = authFacade;
        this.userFacade = userFacade;
        this.instFacade = instFacade;
        this.icons = { faTimes: faTimes_1.faTimes };
        this.authenticatedUser$ = this.authFacade.user$;
        this.instAuthType = this.instFacade.selected$;
        this.config$ = this.authenticatedUser$.pipe(operators_1.map(user => [
            {
                type: 'input',
                label: 'Name',
                name: 'userName',
                placeholder: 'Name',
                dataE2e: 'userName',
                value: user.name,
                autofocus: true,
                validation: [
                    forms_1.Validators.required,
                    forms_1.Validators.maxLength(100),
                    forms_1.Validators.minLength(3),
                    //  java.com.concoursehub.api.service.common.util.Validators.java##USERNAME_PATTERN
                    forms_1.Validators.pattern(new RegExp('^[A-Za-z][A-Z|a-z|0-9|\\.|\\-|\\s]*$'))
                ],
                validationPhrases: {
                    minlength: 'Name must be at least 3 characters long.',
                    maxlength: 'Name must be under 100 characters long.',
                    pattern: 'Name must start with a letter A-Z, and can only contain letters, numbers, whitespace, hyphens, and periods.'
                }
            },
            {
                type: 'button',
                exType: 'btn-primary',
                label: 'Save',
                dataE2e: 'saveUserBtn',
                name: 'submit'
            }
        ]));
        this.passwordConfig = [
            {
                type: 'input',
                exType: 'password',
                label: 'Current Password',
                name: 'currentPassword',
                dataE2e: 'currentPassword',
                placeholder: 'current password',
                validation: [forms_1.Validators.required]
            },
            {
                type: 'input',
                exType: 'password',
                label: 'New Password',
                name: 'newPassword',
                dataE2e: 'newPassword',
                placeholder: 'new password',
                validation: [forms_1.Validators.pattern(helpers_1.PASSWORD_PATTERN)],
                validationPhrases: {
                    pattern: helpers_1.PASSWORD_PATTERN_VALIDATION_MSG,
                    minlength: helpers_1.PASSWORD_MIN_LENGTH_VALIDATION_MSG,
                    maxlength: helpers_1.PASSWORD_MAX_LENGTH_VALIDATION_MSG
                }
            },
            {
                type: 'input',
                exType: 'password',
                label: 'Confirm Password',
                dataE2e: 'confirmPassword',
                name: 'newPasswordConfirm',
                placeholder: 'confirm new password',
                validation: [forms_1.Validators.pattern(helpers_1.PASSWORD_PATTERN)],
                validationPhrases: {
                    pattern: helpers_1.PASSWORD_PATTERN_VALIDATION_MSG,
                    minlength: helpers_1.PASSWORD_MIN_LENGTH_VALIDATION_MSG,
                    maxlength: helpers_1.PASSWORD_MAX_LENGTH_VALIDATION_MSG,
                    passwordsNotEqual: 'Password and confirm password are not equal.'
                }
            },
            {
                type: 'button',
                exType: 'btn-primary',
                label: 'Save',
                dataE2e: 'savePasswordBtn',
                name: 'submit'
            }
        ];
    }
    updateUser(user, formData) {
        if (this.form.valid) {
            this.userFacade.updateUser(user.copyWith({
                name: formData.userName
            }));
        }
    }
    updatePassword(user, formData) {
        if (this.passwordForm.valid) {
            const updatePasswordRequest = {
                currentPassword: formData.currentPassword,
                newPassword: formData.newPassword,
                newPasswordConfirm: formData.newPasswordConfirm
            };
            this.userFacade.updatePassword(user.id, updatePasswordRequest);
            this.passwordForm.form.reset();
        }
    }
    ngOnDestroy() {
        // stub for untilDestroy
    }
};
__decorate([
    core_1.ViewChild('form')
], UserProfileComponent.prototype, "form", void 0);
__decorate([
    core_1.ViewChild('passwordForm')
], UserProfileComponent.prototype, "passwordForm", void 0);
UserProfileComponent = __decorate([
    core_1.Component({
        selector: 'app-user-profile',
        templateUrl: './user-profile.component.html'
    })
], UserProfileComponent);
exports.UserProfileComponent = UserProfileComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1wcm9maWxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC91c2VyL3Byb2ZpbGUvdXNlci1wcm9maWxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUFnRTtBQUNoRSwwQ0FBNEM7QUFDNUMsdUVBQW9FO0FBRXBFLDhDQUFxQztBQUlyQyx1REFLbUM7QUFPbkMsSUFBYSxvQkFBb0IsR0FBakMsTUFBYSxvQkFBb0I7SUEyRi9CLFlBQ21CLFVBQXNCLEVBQ3RCLFVBQXNCLEVBQ3RCLFVBQTZCO1FBRjdCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixlQUFVLEdBQVYsVUFBVSxDQUFtQjtRQTNGaEQsVUFBSyxHQUFHLEVBQUUsT0FBTyxFQUFQLGlCQUFPLEVBQUUsQ0FBQztRQUNwQix1QkFBa0IsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQztRQUMzQyxpQkFBWSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFBO1FBQ3hDLFlBQU8sR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUNwQyxlQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FDVDtZQUNFO2dCQUNFLElBQUksRUFBRSxPQUFPO2dCQUNiLEtBQUssRUFBRSxNQUFNO2dCQUNiLElBQUksRUFBRSxVQUFVO2dCQUNoQixXQUFXLEVBQUUsTUFBTTtnQkFDbkIsT0FBTyxFQUFFLFVBQVU7Z0JBQ25CLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSTtnQkFDaEIsU0FBUyxFQUFFLElBQUk7Z0JBQ2YsVUFBVSxFQUFFO29CQUNWLGtCQUFVLENBQUMsUUFBUTtvQkFDbkIsa0JBQVUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDO29CQUN6QixrQkFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7b0JBQ3ZCLG1GQUFtRjtvQkFDbkYsa0JBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxNQUFNLENBQUMsc0NBQXNDLENBQUMsQ0FBQztpQkFDdkU7Z0JBQ0QsaUJBQWlCLEVBQUU7b0JBQ2pCLFNBQVMsRUFBRSwwQ0FBMEM7b0JBQ3JELFNBQVMsRUFBRSx5Q0FBeUM7b0JBQ3BELE9BQU8sRUFBRSw2R0FBNkc7aUJBQ3ZIO2FBQ0Y7WUFFRDtnQkFDRSxJQUFJLEVBQUUsUUFBUTtnQkFDZCxNQUFNLEVBQUUsYUFBYTtnQkFDckIsS0FBSyxFQUFFLE1BQU07Z0JBQ2IsT0FBTyxFQUFFLGFBQWE7Z0JBQ3RCLElBQUksRUFBRSxRQUFRO2FBQ2Y7U0FDRixDQUFDLENBQ0wsQ0FBQztRQUVGLG1CQUFjLEdBQ1o7WUFFRTtnQkFDRSxJQUFJLEVBQUUsT0FBTztnQkFDYixNQUFNLEVBQUUsVUFBVTtnQkFDbEIsS0FBSyxFQUFFLGtCQUFrQjtnQkFDekIsSUFBSSxFQUFFLGlCQUFpQjtnQkFDdkIsT0FBTyxFQUFFLGlCQUFpQjtnQkFDMUIsV0FBVyxFQUFFLGtCQUFrQjtnQkFDL0IsVUFBVSxFQUFFLENBQUMsa0JBQVUsQ0FBQyxRQUFRLENBQUM7YUFDbEM7WUFDRDtnQkFDRSxJQUFJLEVBQUUsT0FBTztnQkFDYixNQUFNLEVBQUUsVUFBVTtnQkFDbEIsS0FBSyxFQUFFLGNBQWM7Z0JBQ3JCLElBQUksRUFBRSxhQUFhO2dCQUNuQixPQUFPLEVBQUUsYUFBYTtnQkFDdEIsV0FBVyxFQUFFLGNBQWM7Z0JBQzNCLFVBQVUsRUFBRSxDQUFDLGtCQUFVLENBQUMsT0FBTyxDQUFDLDBCQUFnQixDQUFDLENBQUM7Z0JBQ2xELGlCQUFpQixFQUFFO29CQUNqQixPQUFPLEVBQUUseUNBQStCO29CQUN4QyxTQUFTLEVBQUUsNENBQWtDO29CQUM3QyxTQUFTLEVBQUUsNENBQWtDO2lCQUM5QzthQUNGO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLE9BQU87Z0JBQ2IsTUFBTSxFQUFFLFVBQVU7Z0JBQ2xCLEtBQUssRUFBRSxrQkFBa0I7Z0JBQ3pCLE9BQU8sRUFBRSxpQkFBaUI7Z0JBQzFCLElBQUksRUFBRSxvQkFBb0I7Z0JBQzFCLFdBQVcsRUFBRSxzQkFBc0I7Z0JBQ25DLFVBQVUsRUFBRSxDQUFDLGtCQUFVLENBQUMsT0FBTyxDQUFDLDBCQUFnQixDQUFDLENBQUM7Z0JBQ2xELGlCQUFpQixFQUFFO29CQUNqQixPQUFPLEVBQUUseUNBQStCO29CQUN4QyxTQUFTLEVBQUUsNENBQWtDO29CQUM3QyxTQUFTLEVBQUUsNENBQWtDO29CQUM3QyxpQkFBaUIsRUFBRSw4Q0FBOEM7aUJBQ2xFO2FBQ0Y7WUFDRDtnQkFDRSxJQUFJLEVBQUUsUUFBUTtnQkFDZCxNQUFNLEVBQUUsYUFBYTtnQkFDckIsS0FBSyxFQUFFLE1BQU07Z0JBQ2IsT0FBTyxFQUFFLGlCQUFpQjtnQkFDMUIsSUFBSSxFQUFFLFFBQVE7YUFDZjtTQUNGLENBQUM7SUFPSixDQUFDO0lBRUQsVUFBVSxDQUFDLElBQVUsRUFBRSxRQUFhO1FBQ2xDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztnQkFDdkMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxRQUFRO2FBQ3hCLENBQUMsQ0FBQyxDQUFDO1NBQ0w7SUFDSCxDQUFDO0lBRUQsY0FBYyxDQUFDLElBQVUsRUFBRSxRQUFhO1FBQ3RDLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUU7WUFFM0IsTUFBTSxxQkFBcUIsR0FBMEI7Z0JBQ25ELGVBQWUsRUFBRSxRQUFRLENBQUMsZUFBZTtnQkFDekMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxXQUFXO2dCQUNqQyxrQkFBa0IsRUFBRSxRQUFRLENBQUMsa0JBQWtCO2FBQ2hELENBQUM7WUFFRixJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLHFCQUFxQixDQUFDLENBQUM7WUFFL0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDaEM7SUFDSCxDQUFDO0lBRUQsV0FBVztRQUNULHdCQUF3QjtJQUMxQixDQUFDO0NBQ0YsQ0FBQTtBQTNIb0I7SUFBbEIsZ0JBQVMsQ0FBQyxNQUFNLENBQUM7a0RBQTRCO0FBQ25CO0lBQTFCLGdCQUFTLENBQUMsY0FBYyxDQUFDOzBEQUFvQztBQUZuRCxvQkFBb0I7SUFKaEMsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxrQkFBa0I7UUFDNUIsV0FBVyxFQUFFLCtCQUErQjtLQUM3QyxDQUFDO0dBQ1csb0JBQW9CLENBNEhoQztBQTVIWSxvREFBb0IifQ==