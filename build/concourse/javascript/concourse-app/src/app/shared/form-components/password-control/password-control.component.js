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
const helpers_1 = require("../../helpers");
let PasswordControlComponent = class PasswordControlComponent {
    constructor(ctrlContainer, fb) {
        this.ctrlContainer = ctrlContainer;
        this.fb = fb;
        this.minLength = helpers_1.PASSWORD_MIN_LENGTH_VALIDATION_MSG;
        this.maxLength = helpers_1.PASSWORD_MAX_LENGTH_VALIDATION_MSG;
        this.passwordPatternValidation = helpers_1.PASSWORD_PATTERN_VALIDATION_MSG;
        this.aliasValidationMessage = helpers_1.ALIAS_VALIDATION_MSG;
    }
    ngOnInit() {
        this.form = this.ctrlContainer.form.controls.registrationForm;
        this.form.addControl('password', this.fb.control('', [
            forms_1.Validators.required,
            forms_1.Validators.pattern(helpers_1.PASSWORD_PATTERN),
            forms_1.Validators.minLength(6),
            forms_1.Validators.maxLength(20)
        ]));
        this.form.addControl('confirmPassword', this.fb.control('', [
            forms_1.Validators.required,
            forms_1.Validators.pattern(helpers_1.PASSWORD_PATTERN),
            forms_1.Validators.minLength(6),
            forms_1.Validators.maxLength(20),
            helpers_1.repeatPasswordValidator
        ]));
    }
};
PasswordControlComponent = __decorate([
    core_1.Component({
        selector: 'app-password-control-form',
        templateUrl: './password-control.component.html',
        styleUrls: ['./password-control.scss'],
        viewProviders: [{ provide: forms_1.ControlContainer, useExisting: forms_1.FormGroupDirective }]
    })
], PasswordControlComponent);
exports.PasswordControlComponent = PasswordControlComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFzc3dvcmQtY29udHJvbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc2hhcmVkL2Zvcm0tY29tcG9uZW50cy9wYXNzd29yZC1jb250cm9sL3Bhc3N3b3JkLWNvbnRyb2wuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBQXlEO0FBQ3pELDBDQUEwRztBQUMxRywyQ0FPdUI7QUFTdkIsSUFBYSx3QkFBd0IsR0FBckMsTUFBYSx3QkFBd0I7SUFPakMsWUFDcUIsYUFBaUMsRUFDakMsRUFBZTtRQURmLGtCQUFhLEdBQWIsYUFBYSxDQUFvQjtRQUNqQyxPQUFFLEdBQUYsRUFBRSxDQUFhO1FBUHBDLGNBQVMsR0FBRyw0Q0FBa0MsQ0FBQztRQUMvQyxjQUFTLEdBQUcsNENBQWtDLENBQUM7UUFDL0MsOEJBQXlCLEdBQUcseUNBQStCLENBQUM7UUFDNUQsMkJBQXNCLEdBQUcsOEJBQW9CLENBQUM7SUFNOUMsQ0FBQztJQUVELFFBQVE7UUFDSixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBNkIsQ0FBQztRQUMzRSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFO1lBQ2pELGtCQUFVLENBQUMsUUFBUTtZQUNuQixrQkFBVSxDQUFDLE9BQU8sQ0FBQywwQkFBZ0IsQ0FBQztZQUNwQyxrQkFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDdkIsa0JBQVUsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDO1NBQUMsQ0FBQyxDQUFDLENBQUM7UUFHaEMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFO1lBQ3hELGtCQUFVLENBQUMsUUFBUTtZQUNuQixrQkFBVSxDQUFDLE9BQU8sQ0FBQywwQkFBZ0IsQ0FBQztZQUNwQyxrQkFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDdkIsa0JBQVUsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDO1lBQ3hCLGlDQUF1QjtTQUFDLENBQzNCLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FDSixDQUFBO0FBOUJZLHdCQUF3QjtJQVBwQyxnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLDJCQUEyQjtRQUNyQyxXQUFXLEVBQUUsbUNBQW1DO1FBQ2hELFNBQVMsRUFBRSxDQUFDLHlCQUF5QixDQUFDO1FBQ3RDLGFBQWEsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLHdCQUFnQixFQUFFLFdBQVcsRUFBRSwwQkFBa0IsRUFBRSxDQUFDO0tBQ2xGLENBQUM7R0FFVyx3QkFBd0IsQ0E4QnBDO0FBOUJZLDREQUF3QiJ9