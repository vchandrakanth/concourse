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
const faSignInAlt_1 = require("@fortawesome/free-solid-svg-icons/faSignInAlt");
const faSync_1 = require("@fortawesome/free-solid-svg-icons/faSync");
const operators_1 = require("@concourse/core/operators");
const enums_1 = require("@concourse/shared/enums");
const helpers_1 = require("@concourse/shared/helpers");
let LogInComponent = class LogInComponent {
    constructor(fb, authFacade, cookieService) {
        this.fb = fb;
        this.authFacade = authFacade;
        this.cookieService = cookieService;
        this.isLoggingIn$ = this.authFacade.isLoggingIn$;
        this.form = this.fb.group({
            institutionId: [this.cookieService.get(enums_1.AuthKeys.InstitutionIdKey) || undefined],
            username: [(this.cookieService.get(enums_1.AuthKeys.UserNameKey) || undefined), [forms_1.Validators.required, forms_1.Validators.email]],
            password: [undefined, [forms_1.Validators.required]]
        });
        this.icons = { faSignInAlt: faSignInAlt_1.faSignInAlt, faSync: faSync_1.faSync };
    }
    ngOnInit() {
        const institutionId = this.form.get('institutionId');
        const username = this.form.get('username');
        const password = this.form.get('password');
        institutionId.valueChanges.pipe(operators_1.untilDestroy(this)).subscribe(instId => {
            username.clearValidators();
            password.clearValidators();
            if (helpers_1.Util.isNull(instId) || instId.length === 0) {
                username.setValidators([forms_1.Validators.required, forms_1.Validators.email]);
                password.setValidators([forms_1.Validators.required]);
            }
        });
        username.valueChanges.pipe(operators_1.untilDestroy(this)).subscribe(usn => {
            institutionId.clearValidators();
            if (helpers_1.Util.isNullOrUndefined(usn) || usn.length === 0) {
                institutionId.setValidators([forms_1.Validators.required, forms_1.Validators.minLength(3)]);
            }
        });
    }
    ngOnDestroy() {
        // for untilDestroy
    }
    submit() {
        Object.values(this.form.controls).forEach(control => {
            control.markAsDirty();
            control.updateValueAndValidity();
        });
        if (this.form.valid) {
            const { institutionId, username, password } = this.form.value;
            if (!!username && !!password) {
                // tslint:disable-next-line: no-void-expression
                return this.authFacade.login({ username, password });
            }
            if (!helpers_1.Util.isNullOrUndefined(institutionId)) {
                this.authFacade.samlLogin(institutionId);
            }
        }
    }
};
LogInComponent = __decorate([
    core_1.Component({
        selector: 'app-log-in',
        templateUrl: './log-in.component.html',
        styleUrls: ['./log-in.component.scss']
    })
], LogInComponent);
exports.LogInComponent = LogInComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nLWluLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC91c2VyL2xvZy1pbi9sb2ctaW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBQTZEO0FBQzdELDBDQUF5RDtBQUN6RCwrRUFBNEU7QUFDNUUscUVBQWtFO0FBRWxFLHlEQUF5RDtBQUd6RCxtREFBbUQ7QUFDbkQsdURBQWlEO0FBU2pELElBQWEsY0FBYyxHQUEzQixNQUFhLGNBQWM7SUFXekIsWUFDbUIsRUFBZSxFQUNmLFVBQXNCLEVBQ3RCLGFBQTRCO1FBRjVCLE9BQUUsR0FBRixFQUFFLENBQWE7UUFDZixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBYi9DLGlCQUFZLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUM7UUFFNUMsU0FBSSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO1lBQ25CLGFBQWEsRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLGdCQUFRLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxTQUFTLENBQUM7WUFDL0UsUUFBUSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxnQkFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLFNBQVMsQ0FBQyxFQUFFLENBQUMsa0JBQVUsQ0FBQyxRQUFRLEVBQUUsa0JBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNoSCxRQUFRLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxrQkFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQzdDLENBQUMsQ0FBQztRQUVNLFVBQUssR0FBRyxFQUFFLFdBQVcsRUFBWCx5QkFBVyxFQUFFLE1BQU0sRUFB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