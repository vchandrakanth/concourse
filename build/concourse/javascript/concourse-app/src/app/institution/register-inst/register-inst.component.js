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
let RegisterInstComponent = class RegisterInstComponent {
    constructor(instFacade, fb) {
        this.instFacade = instFacade;
        this.fb = fb;
        this.institutionValidateInfo$ = this.instFacade.getValidateInfo$;
        this.updating$ = this.instFacade.isUpdating$;
        this.successResp$ = this.instFacade.successResp$;
    }
    ngOnInit() {
        this.registrationForm = new forms_1.FormGroup({});
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
    submit(token) {
        this.updateControls(this.registrationForm);
        const { value: { registrationForm } } = this.registrationForm;
        if (this.registrationForm.valid) {
            this.instFacade.register(registrationForm, token);
        }
    }
};
RegisterInstComponent = __decorate([
    core_1.Component({
        selector: 'app-register-inst',
        templateUrl: './register-inst.component.html',
        styleUrls: ['./register-inst.component.scss']
    })
], RegisterInstComponent);
exports.RegisterInstComponent = RegisterInstComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXItaW5zdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvaW5zdGl0dXRpb24vcmVnaXN0ZXItaW5zdC9yZWdpc3Rlci1pbnN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUE2RDtBQUM3RCwwQ0FBd0Q7QUFReEQsSUFBYSxxQkFBcUIsR0FBbEMsTUFBYSxxQkFBcUI7SUFNaEMsWUFDbUIsVUFBNkIsRUFDN0IsRUFBZTtRQURmLGVBQVUsR0FBVixVQUFVLENBQW1CO1FBQzdCLE9BQUUsR0FBRixFQUFFLENBQWE7UUFQbEMsNkJBQXdCLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQztRQUM1RCxjQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUM7UUFDeEMsaUJBQVksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQztJQU81QyxDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLGlCQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVELGNBQWMsQ0FBQyxJQUFlO1FBQzVCLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUM3QyxJQUFJLE9BQU8sWUFBWSxpQkFBUyxFQUFFO2dCQUNoQyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQzlCO1lBQ0QsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3RCLE9BQU8sQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1FBQ25DLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELE1BQU0sQ0FBQyxLQUFhO1FBQ2xCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDM0MsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFFLGdCQUFnQixFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7UUFDOUQsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFO1lBQy9CLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLGdCQUFnQixFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQ25EO0lBQ0gsQ0FBQztDQUNGLENBQUE7QUFqQ1kscUJBQXFCO0lBTGpDLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsbUJBQW1CO1FBQzdCLFdBQVcsRUFBRSxnQ0FBZ0M7UUFDN0MsU0FBUyxFQUFFLENBQUMsZ0NBQWdDLENBQUM7S0FDOUMsQ0FBQztHQUNXLHFCQUFxQixDQWlDakM7QUFqQ1ksc0RBQXFCIn0=