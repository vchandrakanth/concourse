"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const expire_invitation_component_1 = require("./expire-invitation/expire-invitation.component");
const expire_registration_component_1 = require("./expire-registration/expire-registration.component");
const forgot_password_component_1 = require("./forgot-password/forgot-password.component");
const log_in_component_1 = require("./log-in/log-in.component");
const login_SAML_component_1 = require("./login-SAML/login-SAML.component");
const user_profile_component_1 = require("./profile/user-profile.component");
const register_user_component_1 = require("./register-user/register-user.component");
const registration_validate_component_1 = require("./registration-validate/registration-validate.component");
const reset_password_component_1 = require("./reset-password/reset-password.component");
const validate_invite_user_component_1 = require("./validate-invite-user/validate-invite-user.component");
const verify_user_token_component_1 = require("./verify-user-token/verify-user-token.component");
const routes = [
    { path: '', pathMatch: 'full', redirectTo: '/user/(sidebar:log-in)' },
    { path: 'log-in', component: log_in_component_1.LogInComponent, outlet: 'sidebar' },
    { path: 'profile', component: user_profile_component_1.UserProfileComponent },
    { path: 'validate-invitation', component: validate_invite_user_component_1.ValidateInviteUserComponent },
    { path: 'invitation-expire', component: expire_invitation_component_1.ExpireInvitationComponent },
    { path: 'registration', component: register_user_component_1.RegisterUserComponent },
    { path: 'validate-registration', component: registration_validate_component_1.RegistrationValidateComponent },
    { path: 'confirmation-expire', component: expire_registration_component_1.ExpireRegistrationComponent },
    { path: 'forgot-password', component: forgot_password_component_1.ForgotPasswordComponent },
    { path: 'verify-token', component: verify_user_token_component_1.VerifyUserTokenComponent },
    { path: 'reset-password', component: reset_password_component_1.ResetPasswordComponent },
    { path: 'authenticated', component: login_SAML_component_1.LoginSAMLComponent },
    { path: 'authenticationFailed', component: login_SAML_component_1.LoginSAMLComponent }
];
let UserRoutingModule = class UserRoutingModule {
};
UserRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forChild(routes)],
        exports: [router_1.RouterModule]
    })
], UserRoutingModule);
exports.UserRoutingModule = UserRoutingModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1yb3V0aW5nLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC91c2VyL3VzZXItcm91dGluZy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBeUM7QUFDekMsNENBQXVEO0FBRXZELGlHQUE0RjtBQUM1Rix1R0FBa0c7QUFDbEcsMkZBQXNGO0FBQ3RGLGdFQUEyRDtBQUMzRCw0RUFBdUU7QUFDdkUsNkVBQXdFO0FBQ3hFLHFGQUFnRjtBQUNoRiw2R0FBd0c7QUFDeEcsd0ZBQW1GO0FBQ25GLDBHQUFvRztBQUNwRyxpR0FBMkY7QUFFM0YsTUFBTSxNQUFNLEdBQVc7SUFDckIsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLHdCQUF3QixFQUFFO0lBQ3JFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsaUNBQWMsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFO0lBQ2hFLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsNkNBQW9CLEVBQUU7SUFDcEQsRUFBRSxJQUFJLEVBQUUscUJBQXFCLEVBQUUsU0FBUyxFQUFFLDREQUEyQixFQUFFO0lBQ3ZFLEVBQUUsSUFBSSxFQUFFLG1CQUFtQixFQUFFLFNBQVMsRUFBRSx1REFBeUIsRUFBRTtJQUNuRSxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsU0FBUyxFQUFFLCtDQUFxQixFQUFFO0lBQzFELEVBQUUsSUFBSSxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSwrREFBNkIsRUFBRTtJQUMzRSxFQUFFLElBQUksRUFBRSxxQkFBcUIsRUFBRSxTQUFTLEVBQUUsMkRBQTJCLEVBQUU7SUFDdkUsRUFBRSxJQUFJLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLG1EQUF1QixFQUFFO0lBQy9ELEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxTQUFTLEVBQUUsc0RBQXdCLEVBQUU7SUFDN0QsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsU0FBUyxFQUFFLGlEQUFzQixFQUFFO0lBQzdELEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxTQUFTLEVBQUUseUNBQWtCLEVBQUU7SUFDeEQsRUFBRSxJQUFJLEVBQUUsc0JBQXNCLEVBQUUsU0FBUyxFQUFFLHlDQUFrQixFQUFFO0NBQ2hFLENBQUM7QUFNRixJQUFhLGlCQUFpQixHQUE5QixNQUFhLGlCQUFpQjtDQUFJLENBQUE7QUFBckIsaUJBQWlCO0lBSjdCLGVBQVEsQ0FBQztRQUNSLE9BQU8sRUFBRSxDQUFDLHFCQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3hDLE9BQU8sRUFBRSxDQUFDLHFCQUFZLENBQUM7S0FDeEIsQ0FBQztHQUNXLGlCQUFpQixDQUFJO0FBQXJCLDhDQUFpQiJ9