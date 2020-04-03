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
const dynamic_form_1 = require("@concourse/shared/dynamic-form");
let ForgotPasswordComponent = class ForgotPasswordComponent {
    constructor(authFacade) {
        this.authFacade = authFacade;
        this.successResp$ = this.authFacade.isSuccessResp$;
        this.config = [
            {
                type: 'input',
                exType: 'email',
                label: 'Email',
                name: 'email',
                placeholder: 'Email',
                autofocus: true,
                validation: [forms_1.Validators.required, forms_1.Validators.email],
                validationPhrases: {
                    email: 'Email not valid.'
                }
            },
            {
                type: 'button',
                exType: 'btn-primary',
                label: 'Reset Password',
                name: 'submit'
            }
        ];
    }
    submit(formData) {
        if (this.form.valid) {
            this.authFacade.forgotPassword(formData);
        }
    }
};
__decorate([
    core_1.ViewChild(dynamic_form_1.DynamicFormComponent)
], ForgotPasswordComponent.prototype, "form", void 0);
ForgotPasswordComponent = __decorate([
    core_1.Component({
        selector: 'app-forgot-password',
        templateUrl: './forgot-password.component.html',
        styleUrls: ['./forgot-password.component.scss']
    })
], ForgotPasswordComponent);
exports.ForgotPasswordComponent = ForgotPasswordComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9yZ290LXBhc3N3b3JkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC91c2VyL2ZvcmdvdC1wYXNzd29yZC9mb3Jnb3QtcGFzc3dvcmQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBQXFEO0FBQ3JELDBDQUE0QztBQUU1QyxpRUFBbUY7QUFRbkYsSUFBYSx1QkFBdUIsR0FBcEMsTUFBYSx1QkFBdUI7SUF3QmxDLFlBQ21CLFVBQXNCO1FBQXRCLGVBQVUsR0FBVixVQUFVLENBQVk7UUF2QnpDLGlCQUFZLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUM7UUFDOUMsV0FBTSxHQUFrQjtZQUN0QjtnQkFDRSxJQUFJLEVBQUUsT0FBTztnQkFDYixNQUFNLEVBQUUsT0FBTztnQkFDZixLQUFLLEVBQUUsT0FBTztnQkFDZCxJQUFJLEVBQUUsT0FBTztnQkFDYixXQUFXLEVBQUUsT0FBTztnQkFDcEIsU0FBUyxFQUFFLElBQUk7Z0JBQ2YsVUFBVSxFQUFFLENBQUMsa0JBQVUsQ0FBQyxRQUFRLEVBQUUsa0JBQVUsQ0FBQyxLQUFLLENBQUM7Z0JBQ25ELGlCQUFpQixFQUFFO29CQUNqQixLQUFLLEVBQUUsa0JBQWtCO2lCQUMxQjthQUNGO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLGFBQWE7Z0JBQ3JCLEtBQUssRUFBRSxnQkFBZ0I7Z0JBQ3ZCLElBQUksRUFBRSxRQUFRO2FBQ2Y7U0FDRixDQUFDO0lBSUUsQ0FBQztJQUVMLE1BQU0sQ0FBQyxRQUFhO1FBQ2xCLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDMUM7SUFDSCxDQUFDO0NBRUYsQ0FBQTtBQWpDa0M7SUFBaEMsZ0JBQVMsQ0FBQyxtQ0FBb0IsQ0FBQztxREFBNEI7QUFEakQsdUJBQXVCO0lBTG5DLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUscUJBQXFCO1FBQy9CLFdBQVcsRUFBRSxrQ0FBa0M7UUFDL0MsU0FBUyxFQUFFLENBQUMsa0NBQWtDLENBQUM7S0FDaEQsQ0FBQztHQUNXLHVCQUF1QixDQWtDbkM7QUFsQ1ksMERBQXVCIn0=