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
const operators_1 = require("rxjs/operators");
let RegisterUserComponent = class RegisterUserComponent {
    constructor(userFacade, fb) {
        this.userFacade = userFacade;
        this.fb = fb;
        this.token$ = this.userFacade.token$;
        this.isRegistrationSuccess$ = this.userFacade.isRegistrationSuccess$;
        this.minLength = helpers_1.PASSWORD_MIN_LENGTH_VALIDATION_MSG;
        this.maxLength = helpers_1.PASSWORD_MAX_LENGTH_VALIDATION_MSG;
        this.passwordPatternValidation = helpers_1.PASSWORD_PATTERN_VALIDATION_MSG;
        this.securityQuestions$ = this.userFacade.securityQuestions$;
        this.email$ = this.userFacade.email$;
        this.authType$ = this.userFacade.authType$.pipe(operators_1.withLatestFrom(this.email$)).subscribe(res => {
            this.authType = res[0];
            this.email = res[1];
            this.buildForm();
        });
    }
    get isSelected() {
        return this.form.get('securityQuestions').value !== null;
    }
    buildForm() {
        if (this.authType === 'BASIC') {
            this.form = this.fb.group({
                name: [undefined, [
                        forms_1.Validators.required,
                        forms_1.Validators.minLength(3),
                        forms_1.Validators.maxLength(100),
                        forms_1.Validators.pattern(new RegExp('^[A-Za-z][A-Z|a-z|0-9|\\.|\\-|\\s]*$'))
                    ]],
                email: [this.email, [forms_1.Validators.email]],
                password: [undefined, [
                        forms_1.Validators.required,
                        forms_1.Validators.pattern(helpers_1.PASSWORD_PATTERN),
                        forms_1.Validators.minLength(6),
                        forms_1.Validators.maxLength(20)
                    ]],
                confirmPassword: [undefined, [
                        forms_1.Validators.required,
                        forms_1.Validators.pattern(helpers_1.PASSWORD_PATTERN),
                        forms_1.Validators.minLength(6),
                        forms_1.Validators.maxLength(20),
                        helpers_1.repeatPasswordValidator
                    ]],
                securityQuestion1: [undefined, [forms_1.Validators.required]],
                answer1: [undefined, [forms_1.Validators.required]],
                securityQuestion2: [undefined, [forms_1.Validators.required]],
                answer2: [undefined, [forms_1.Validators.required]],
                securityQuestion3: [undefined, [forms_1.Validators.required]],
                answer3: [undefined, [forms_1.Validators.required]]
            });
        }
        else {
            this.form = this.fb.group({
                name: [undefined, [
                        forms_1.Validators.required,
                        forms_1.Validators.minLength(3),
                        forms_1.Validators.maxLength(100),
                        forms_1.Validators.pattern(new RegExp('^[A-Za-z][A-Z|a-z|0-9|\\.|\\-|\\s]*$'))
                    ]],
                email: [this.email, [forms_1.Validators.email]]
            });
        }
    }
    submit(token) {
        Object.values(this.form.controls).forEach(control => {
            control.markAsDirty();
            control.updateValueAndValidity();
        });
        if (this.form.valid) {
            const { name, email, password, confirmPassword, securityQuestion1, answer1, securityQuestion2, answer2, securityQuestion3, answer3 } = this.form.value;
            const securityAnswers = [
                {
                    securityQuestion: securityQuestion1,
                    answer: answer1
                },
                {
                    securityQuestion: securityQuestion2,
                    answer: answer2
                },
                {
                    securityQuestion: securityQuestion3,
                    answer: answer3
                }
            ];
            let newRegistrationForm;
            if (this.authType === 'BASIC') {
                newRegistrationForm = {
                    name,
                    email,
                    password,
                    confirmPassword,
                    securityAnswers
                };
            }
            else {
                newRegistrationForm = {
                    name,
                    email
                };
            }
            this.userFacade.register(token, newRegistrationForm);
        }
    }
};
RegisterUserComponent = __decorate([
    core_1.Component({
        selector: 'app-register-user',
        templateUrl: './register-user.component.html',
        styleUrls: ['./register-user.component.scss']
    })
], RegisterUserComponent);
exports.RegisterUserComponent = RegisterUserComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXItdXNlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvdXNlci9yZWdpc3Rlci11c2VyL3JlZ2lzdGVyLXVzZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBQWtEO0FBQ2xELDBDQUFvRTtBQUVwRSx1REFNbUM7QUFFbkMsOENBQWdFO0FBT2hFLElBQWEscUJBQXFCLEdBQWxDLE1BQWEscUJBQXFCO0lBc0JoQyxZQUNtQixVQUFzQixFQUN0QixFQUFlO1FBRGYsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixPQUFFLEdBQUYsRUFBRSxDQUFhO1FBdkJsQyxXQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUM7UUFDaEMsMkJBQXNCLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxzQkFBc0IsQ0FBQztRQUNoRSxjQUFTLEdBQUcsNENBQWtDLENBQUM7UUFDL0MsY0FBUyxHQUFHLDRDQUFrQyxDQUFDO1FBQy9DLDhCQUF5QixHQUFHLHlDQUErQixDQUFDO1FBQzVELHVCQUFrQixHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsa0JBQWtCLENBQUM7UUFLeEQsV0FBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDO1FBQ2hDLGNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQ3hDLDBCQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUM1QixDQUFDLFNBQVMsQ0FDVCxHQUFHLENBQUMsRUFBRTtZQUNKLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BC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