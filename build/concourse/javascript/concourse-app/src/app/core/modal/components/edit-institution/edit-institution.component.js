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
let EditInstitutionComponent = class EditInstitutionComponent {
    constructor(institutionFacade) {
        this.institutionFacade = institutionFacade;
        this.icons = { faTimes: faTimes_1.faTimes };
        this.institution$ = this.institutionFacade.selected$;
        this.updating$ = this.institutionFacade.isUpdating$;
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
    submit(inst) {
        this.updateControls(this.registrationForm);
        const { value: { registrationForm } } = this.registrationForm;
        if (this.registrationForm.valid) {
            this.institutionFacade.update(inst.copyWith(registrationForm));
        }
    }
};
EditInstitutionComponent = __decorate([
    core_1.Component({
        selector: 'app-edit-institution',
        templateUrl: './edit-institution.component.html',
        styleUrls: ['./edit-institution.component.scss']
    })
], EditInstitutionComponent);
exports.EditInstitutionComponent = EditInstitutionComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC1pbnN0aXR1dGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvY29yZS9tb2RhbC9jb21wb25lbnRzL2VkaXQtaW5zdGl0dXRpb24vZWRpdC1pbnN0aXR1dGlvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBNkQ7QUFDN0QsMENBQXVEO0FBQ3ZELHVFQUFvRTtBQVlwRSxJQUFhLHdCQUF3QixHQUFyQyxNQUFhLHdCQUF3QjtJQU1uQyxZQUNtQixpQkFBb0M7UUFBcEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQU45QyxVQUFLLEdBQUcsRUFBRSxPQUFPLEVBQVAsaUJBQU8sRUFBRSxDQUFDO1FBQzdCLGlCQUFZLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQztRQUNoRCxjQUFTLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQztJQUlZLENBQUM7SUFFNUQsUUFBUTtRQUNOLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLGlCQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVELGNBQWMsQ0FBQyxJQUFlO1FBQzVCLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUM3QyxJQUFJLE9BQU8sWUFBWSxpQkFBUyxFQUFFO2dCQUNoQyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQzlCO1lBQ0QsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3RCLE9BQU8sQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1FBQ25DLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELE1BQU0sQ0FBQyxJQUFpQjtRQUN0QixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQzNDLE1BQU0sRUFBRSxLQUFLLEVBQUUsRUFBRSxnQkFBZ0IsRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDO1FBQzlELElBQUksSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRTtZQUMvQixJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFBO1NBQy9EO0lBQ0gsQ0FBQztDQUNGLENBQUE7QUE5Qlksd0JBQXdCO0lBTHBDLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsc0JBQXNCO1FBQ2hDLFdBQVcsRUFBRSxtQ0FBbUM7UUFDaEQsU0FBUyxFQUFFLENBQUMsbUNBQW1DLENBQUM7S0FDakQsQ0FBQztHQUNXLHdCQUF3QixDQThCcEM7QUE5QlksNERBQXdCIn0=