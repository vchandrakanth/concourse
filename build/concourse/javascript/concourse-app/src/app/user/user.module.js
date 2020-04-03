"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@angular/common");
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
const alert_1 = require("ngx-bootstrap/alert");
const tooltip_1 = require("ngx-bootstrap/tooltip");
const dynamic_form_1 = require("@concourse/shared/dynamic-form");
const shared_module_1 = require("@concourse/shared/shared.module");
const ng_select_1 = require("@ng-select/ng-select");
const expire_invitation_component_1 = require("./expire-invitation/expire-invitation.component");
const expire_registration_component_1 = require("./expire-registration/expire-registration.component");
const forgot_password_component_1 = require("./forgot-password/forgot-password.component");
const log_in_component_1 = require("./log-in/log-in.component");
const login_SAML_component_1 = require("./login-SAML/login-SAML.component");
const user_profile_component_1 = require("./profile/user-profile.component");
const register_user_component_1 = require("./register-user/register-user.component");
const registration_validate_component_1 = require("./registration-validate/registration-validate.component");
const reset_password_component_1 = require("./reset-password/reset-password.component");
const user_routing_module_1 = require("./user-routing.module");
const validate_invite_user_component_1 = require("./validate-invite-user/validate-invite-user.component");
const verify_user_token_component_1 = require("./verify-user-token/verify-user-token.component");
let UserModule = class UserModule {
};
UserModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            forms_1.ReactiveFormsModule,
            angular_fontawesome_1.FontAwesomeModule,
            alert_1.AlertModule.forRoot(),
            tooltip_1.TooltipModule.forRoot(),
            forms_1.FormsModule,
            dynamic_form_1.DynamicFormModule,
            shared_module_1.SharedModule,
            user_routing_module_1.UserRoutingModule,
            ng_select_1.NgSelectModule
        ],
        declarations: [
            log_in_component_1.LogInComponent,
            forgot_password_component_1.ForgotPasswordComponent,
            user_profile_component_1.UserProfileComponent,
            validate_invite_user_component_1.ValidateInviteUserComponent,
            expire_invitation_component_1.ExpireInvitationComponent,
            register_user_component_1.RegisterUserComponent,
            expire_registration_component_1.ExpireRegistrationComponent,
            registration_validate_component_1.RegistrationValidateComponent,
            verify_user_token_component_1.VerifyUserTokenComponent,
            reset_password_component_1.ResetPasswordComponent,
            login_SAML_component_1.LoginSAMLComponent
        ]
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvdXNlci91c2VyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLDRDQUErQztBQUMvQyx3Q0FBeUM7QUFDekMsMENBQWtFO0FBQ2xFLDBFQUFxRTtBQUNyRSwrQ0FBa0Q7QUFDbEQsbURBQXNEO0FBRXRELGlFQUFtRTtBQUNuRSxtRUFBK0Q7QUFFL0Qsb0RBQXNEO0FBQ3RELGlHQUE0RjtBQUM1Rix1R0FBa0c7QUFDbEcsMkZBQXNGO0FBQ3RGLGdFQUEyRDtBQUMzRCw0RUFBdUU7QUFDdkUsNkVBQXdFO0FBQ3hFLHFGQUFnRjtBQUNoRiw2R0FBd0c7QUFDeEcsd0ZBQW1GO0FBQ25GLCtEQUEwRDtBQUMxRCwwR0FBb0c7QUFDcEcsaUdBQTJGO0FBNkIzRixJQUFhLFVBQVUsR0FBdkIsTUFBYSxVQUFVO0NBQUksQ0FBQTtBQUFkLFVBQVU7SUEzQnRCLGVBQVEsQ0FBQztRQUNSLE9BQU8sRUFBRTtZQUNQLHFCQUFZO1lBQ1osMkJBQW1CO1lBQ25CLHVDQUFpQjtZQUNqQixtQkFBVyxDQUFDLE9BQU8sRUFBRTtZQUNyQix1QkFBYSxDQUFDLE9BQU8sRUFBRTtZQUN2QixtQkFBVztZQUNYLGdDQUFpQjtZQUNqQiw0QkFBWTtZQUNaLHVDQUFpQjtZQUNqQiwwQkFBYztTQUNmO1FBQ0QsWUFBWSxFQUFFO1lBQ1osaUNBQWM7WUFDZCxtREFBdUI7WUFDdkIsNkNBQW9CO1lBQ3BCLDREQUEyQjtZQUMzQix1REFBeUI7WUFDekIsK0NBQXFCO1lBQ3JCLDJEQUEyQjtZQUMzQiwrREFBNkI7WUFDN0Isc0RBQXdCO1lBQ3hCLGlEQUFzQjtZQUN0Qix5Q0FBa0I7U0FDbkI7S0FDRixDQUFDO0dBQ1csVUFBVSxDQUFJO0FBQWQsZ0NBQVUifQ==