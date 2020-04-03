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
let InstitutionRegistrationComponent = class InstitutionRegistrationComponent {
    constructor(ctrlContainer, fb, authFacade) {
        this.ctrlContainer = ctrlContainer;
        this.fb = fb;
        this.authFacade = authFacade;
        this.minLength = helpers_1.PASSWORD_MIN_LENGTH_VALIDATION_MSG;
        this.maxLength = helpers_1.PASSWORD_MAX_LENGTH_VALIDATION_MSG;
        this.passwordPatternValidation = helpers_1.PASSWORD_PATTERN_VALIDATION_MSG;
        this.aliasValidationMessage = helpers_1.ALIAS_VALIDATION_MSG;
        this.isAuthenticated$ = this.authFacade.isAuthenticated$;
    }
    ngOnInit() {
        this.form = this.ctrlContainer.form;
        this.form.addControl('registrationForm', this.fb.group({
            name: [undefined, [
                    forms_1.Validators.required,
                    forms_1.Validators.minLength(3),
                    forms_1.Validators.maxLength(128),
                    forms_1.Validators.pattern(new RegExp('^[A-Za-z][A-Z|a-z|0-9|\\.|\\-|\\s]*$'))
                ]],
            institutionName: ['', [
                    forms_1.Validators.required,
                    forms_1.Validators.minLength(3),
                    forms_1.Validators.maxLength(128),
                    forms_1.Validators.pattern(new RegExp('^[A-Za-z][A-Z|a-z|0-9|\\.|\\-|\\s]*$'))
                ]],
            alias: [undefined, [
                    forms_1.Validators.minLength(3),
                    forms_1.Validators.maxLength(32),
                    forms_1.Validators.pattern(helpers_1.ALIAS_PATTERN)
                ]],
            description: [undefined, [
                    forms_1.Validators.minLength(5),
                    forms_1.Validators.maxLength(255)
                ]],
            community: [undefined, [
                    forms_1.Validators.minLength(3),
                    forms_1.Validators.maxLength(128)
                ]],
            website: [undefined, [
                    forms_1.Validators.minLength(3),
                    forms_1.Validators.maxLength(255)
                ]],
            authenticationType: ['BASIC', [
                    forms_1.Validators.required
                ]],
            accountEmail: [undefined, [
                    forms_1.Validators.required,
                    forms_1.Validators.email
                ]],
            phone: [undefined, [
                    forms_1.Validators.maxLength(16)
                ]],
            address: this.fb.group({
                streetAddress: [''],
                city: [''],
                state: [''],
                country: [''],
                postalCode: ['']
            })
        }));
        this.form.get('registrationForm').patchValue(this.formData);
    }
};
__decorate([
    core_1.Input()
], InstitutionRegistrationComponent.prototype, "formData", void 0);
InstitutionRegistrationComponent = __decorate([
    core_1.Component({
        selector: 'app-institution-registration-form',
        templateUrl: './institution-registration.component.html',
        styleUrls: ['./institution-registration.scss'],
        viewProviders: [{ provide: forms_1.ControlContainer, useExisting: forms_1.FormGroupDirective }]
    })
], InstitutionRegistrationComponent);
exports.InstitutionRegistrationComponent = InstitutionRegistrationComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zdGl0dXRpb24tcmVnaXN0cmF0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zaGFyZWQvZm9ybS1jb21wb25lbnRzL2luc3RpdHV0aW9uLXJlZ2lzdHJhdGlvbi9pbnN0aXR1dGlvbi1yZWdpc3RyYXRpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBQXlEO0FBQ3pELDBDQUEwRztBQUUxRywyQ0FNdUI7QUFTdkIsSUFBYSxnQ0FBZ0MsR0FBN0MsTUFBYSxnQ0FBZ0M7SUFTM0MsWUFDbUIsYUFBaUMsRUFDakMsRUFBZSxFQUNmLFVBQXNCO1FBRnRCLGtCQUFhLEdBQWIsYUFBYSxDQUFvQjtRQUNqQyxPQUFFLEdBQUYsRUFBRSxDQUFhO1FBQ2YsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQVR6QyxjQUFTLEdBQUcsNENBQWtDLENBQUM7UUFDL0MsY0FBUyxHQUFHLDRDQUFrQyxDQUFDO1FBQy9DLDhCQUF5QixHQUFHLHlDQUErQixDQUFDO1FBQzVELDJCQUFzQixHQUFHLDhCQUFvQixDQUFDO1FBQzlDLHFCQUFnQixHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUM7SUFPcEQsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGtCQUFrQixFQUNyQyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztZQUNaLElBQUksRUFBRSxDQUFDLFNBQVMsRUFBRTtvQkFDaEIsa0JBQVUsQ0FBQyxRQUFRO29CQUNuQixrQkFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7b0JBQ3ZCLGtCQUFVLENBQUMs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