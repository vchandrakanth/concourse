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
const dynamic_form_1 = require("@concourse/shared/dynamic-form");
let InviteInstComponent = class InviteInstComponent {
    constructor(instFacade) {
        this.instFacade = instFacade;
        this.icons = { faTimes: faTimes_1.faTimes };
        this.config = [
            {
                type: 'input',
                label: 'Name',
                name: 'institutionName',
                placeholder: 'Name',
                autofocus: true,
                validation: [
                    forms_1.Validators.required,
                    forms_1.Validators.maxLength(100),
                    forms_1.Validators.minLength(3),
                    forms_1.Validators.pattern(new RegExp('^[A-Za-z][A-Z|a-z|0-9|\\.|\\-|\\s]*$'))
                ],
                validationPhrases: {
                    minlength: 'Name must be at least 3 characters long.',
                    maxlength: 'Name must be under 100 characters long.',
                    pattern: 'Name must start with a letter A-Z, and can only contain letters, numbers, whitespace, hyphens, and periods.'
                }
            },
            {
                type: 'input',
                exType: 'email',
                label: 'Email',
                name: 'institutionEmail',
                placeholder: 'Email',
                validation: [forms_1.Validators.required, forms_1.Validators.email],
                validationPhrases: {
                    email: 'Email not valid.'
                }
            },
            {
                type: 'button',
                exType: 'btn-primary',
                label: 'Invite',
                name: 'submit',
                class: 'float-right mb-3'
            }
        ];
    }
    submit(formData) {
        this.instFacade.invite(formData);
    }
};
__decorate([
    core_1.ViewChild(dynamic_form_1.DynamicFormComponent)
], InviteInstComponent.prototype, "form", void 0);
InviteInstComponent = __decorate([
    core_1.Component({
        selector: 'app-invite-inst',
        templateUrl: './invite-inst.component.html',
        styleUrls: ['./invite-inst.component.scss']
    })
], InviteInstComponent);
exports.InviteInstComponent = InviteInstComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW52aXRlLWluc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL2NvcmUvbW9kYWwvY29tcG9uZW50cy9pbnZpdGUtaW5zdC9pbnZpdGUtaW5zdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBcUQ7QUFDckQsMENBQTRDO0FBQzVDLHVFQUFvRTtBQUVwRSxpRUFBbUY7QUFRbkYsSUFBYSxtQkFBbUIsR0FBaEMsTUFBYSxtQkFBbUI7SUEwQzlCLFlBQ21CLFVBQTZCO1FBQTdCLGVBQVUsR0FBVixVQUFVLENBQW1CO1FBekN2QyxVQUFLLEdBQUcsRUFBRSxPQUFPLEVBQVAsaUJBQU8sRUFBRSxDQUFDO1FBQzdCLFdBQU0sR0FBa0I7WUFDdEI7Z0JBQ0UsSUFBSSxFQUFFLE9BQU87Z0JBQ2IsS0FBSyxFQUFFLE1BQU07Z0JBQ2IsSUFBSSxFQUFFLGlCQUFpQjtnQkFDdkIsV0FBVyxFQUFFLE1BQU07Z0JBQ25CLFNBQVMsRUFBRSxJQUFJO2dCQUNmLFVBQVUsRUFBRTtvQkFDVixrQkFBVSxDQUFDLFFBQVE7b0JBQ25CLGtCQUFVLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQztvQkFDekIsa0JBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO29CQUN2QixrQkFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDO2lCQUN2RTtnQkFDRCxpQkFBaUIsRUFBRTtvQkFDakIsU0FBUyxFQUFFLDBDQUEwQztvQkFDckQsU0FBUyxFQUFFLHlDQUF5QztvQkFDcEQsT0FBTyxFQUFFLDZHQUE2RztpQkFDdkg7YUFDRjtZQUNEO2dCQUNFLElBQUksRUFBRSxPQUFPO2dCQUNiLE1BQU0sRUFBRSxPQUFPO2dCQUNmLEtBQUssRUFBRSxPQUFPO2dCQUNkLElBQUksRUFBRSxrQkFBa0I7Z0JBQ3hCLFdBQVcsRUFBRSxPQUFPO2dCQUNwQixVQUFVLEVBQUUsQ0FBQyxrQkFBVSxDQUFDLFFBQVEsRUFBRSxrQkFBVSxDQUFDLEtBQUssQ0FBQztnQkFDbkQsaUJBQWlCLEVBQUU7b0JBQ2pCLEtBQUssRUFBRSxrQkFBa0I7aUJBQzFCO2FBQ0Y7WUFDRDtnQkFDRSxJQUFJLEVBQUUsUUFBUTtnQkFDZCxNQUFNLEVBQUUsYUFBYTtnQkFDckIsS0FBSyxFQUFFLFFBQVE7Z0JBQ2YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsS0FBSyxFQUFFLGtCQUFrQjthQUMxQjtTQUNGLENBQUM7SUFJRSxDQUFDO0lBRUwsTUFBTSxDQUFDLFFBQWE7UUFDbEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDbkMsQ0FBQztDQUNGLENBQUE7QUFoRGtDO0lBQWhDLGdCQUFTLENBQUMsbUNBQW9CLENBQUM7aURBQTRCO0FBRGpELG1CQUFtQjtJQUwvQixnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLGlCQUFpQjtRQUMzQixXQUFXLEVBQUUsOEJBQThCO1FBQzNDLFNBQVMsRUFBRSxDQUFDLDhCQUE4QixDQUFDO0tBQzVDLENBQUM7R0FDVyxtQkFBbUIsQ0FpRC9CO0FBakRZLGtEQUFtQiJ9