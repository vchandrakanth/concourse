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
let CreateSurfaceComponent = class CreateSurfaceComponent {
    constructor(surfaceFacade, groupFacade) {
        this.surfaceFacade = surfaceFacade;
        this.groupFacade = groupFacade;
        this.updating$ = this.surfaceFacade.isUpdating$;
        this.icons = { faTimes: faTimes_1.faTimes };
        this.config = [
            {
                type: 'input',
                label: 'Surface Name',
                name: 'name',
                placeholder: 'Surface Name',
                validation: [forms_1.Validators.required],
                autofocus: true
            },
            {
                type: 'textarea',
                label: 'Surface Description',
                name: 'description',
                placeholder: 'Surface Description',
                validation: [forms_1.Validators.required]
            },
            {
                type: 'typeahead',
                exType: 'multiselect',
                label: 'Assign Group(s)',
                name: 'groupIds',
                placeholder: 'Assign Group(s)',
                textField: 'name',
                options: this.groupFacade.list$,
            },
            {
                type: 'checkbox',
                label: 'Create a new group for this Surface',
                name: 'createGroup'
            },
            {
                type: 'button',
                label: 'Create',
                name: 'submit'
            }
        ];
    }
    submit(formData) {
        const { name, description, groupIds, createGroup } = formData;
        const newSurface = {
            name,
            description,
            groupIds
        };
        this.surfaceFacade.create(newSurface, createGroup);
    }
};
__decorate([
    core_1.ViewChild(dynamic_form_1.DynamicFormComponent)
], CreateSurfaceComponent.prototype, "form", void 0);
CreateSurfaceComponent = __decorate([
    core_1.Component({
        selector: 'app-create-surface',
        templateUrl: './create-surface.component.html',
        styleUrls: ['./create-surface.component.scss']
    })
], CreateSurfaceComponent);
exports.CreateSurfaceComponent = CreateSurfaceComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXN1cmZhY2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL2NvcmUvbW9kYWwvY29tcG9uZW50cy9jcmVhdGUtc3VyZmFjZS9jcmVhdGUtc3VyZmFjZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBcUQ7QUFDckQsMENBQTRDO0FBQzVDLHVFQUFvRTtBQUVwRSxpRUFBbUY7QUFTbkYsSUFBYSxzQkFBc0IsR0FBbkMsTUFBYSxzQkFBc0I7SUEwQ2pDLFlBQ21CLGFBQTRCLEVBQzVCLFdBQXdCO1FBRHhCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBMUMzQyxjQUFTLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUM7UUFDbEMsVUFBSyxHQUFHLEVBQUUsT0FBTyxFQUFQLGlCQUFPLEVBQUUsQ0FBQztRQUM3QixXQUFNLEdBQWtCO1lBQ3RCO2dCQUNFLElBQUksRUFBRSxPQUFPO2dCQUNiLEtBQUssRUFBRSxjQUFjO2dCQUNyQixJQUFJLEVBQUUsTUFBTTtnQkFDWixXQUFXLEVBQUUsY0FBYztnQkFDM0IsVUFBVSxFQUFFLENBQUMsa0JBQVUsQ0FBQyxRQUFRLENBQUM7Z0JBQ2pDLFNBQVMsRUFBRSxJQUFJO2FBQ2hCO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLFVBQVU7Z0JBQ2hCLEtBQUssRUFBRSxxQkFBcUI7Z0JBQzVCLElBQUksRUFBRSxhQUFhO2dCQUNuQixXQUFXLEVBQUUscUJBQXFCO2dCQUNsQyxVQUFVLEVBQUUsQ0FBQyxrQkFBVSxDQUFDLFFBQVEsQ0FBQzthQUNsQztZQUNEO2dCQUNFLElBQUksRUFBRSxXQUFXO2dCQUNqQixNQUFNLEVBQUUsYUFBYTtnQkFDckIsS0FBSyxFQUFFLGlCQUFpQjtnQkFDeEIsSUFBSSxFQUFFLFVBQVU7Z0JBQ2hCLFdBQVcsRUFBRSxpQkFBaUI7Z0JBQzlCLFNBQVMsRUFBRSxNQUFNO2dCQUNqQixPQUFPLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLO2FBQ2hDO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLFVBQVU7Z0JBQ2hCLEtBQUssRUFBRSxxQ0FBcUM7Z0JBQzVDLElBQUksRUFBRSxhQUFhO2FBQ3BCO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsS0FBSyxFQUFFLFFBQVE7Z0JBQ2YsSUFBSSxFQUFFLFFBQVE7YUFDZjtTQUVGLENBQUM7SUFLRSxDQUFDO0lBRUwsTUFBTSxDQUFDLFFBQWE7UUFDbEIsTUFBTSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxHQUFHLFFBQVEsQ0FBQztRQUU5RCxNQUFNLFVBQVUsR0FBcUI7WUFDbkMsSUFBSTtZQUNKLFdBQVc7WUFDWCxRQUFRO1NBQ1QsQ0FBQTtRQUVELElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxXQUFXLENBQUMsQ0FBQztJQUNyRCxDQUFDO0NBRUYsQ0FBQTtBQTFEa0M7SUFBaEMsZ0JBQVMsQ0FBQyxtQ0FBb0IsQ0FBQztvREFBNEI7QUFEakQsc0JBQXNCO0lBTGxDLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsb0JBQW9CO1FBQzlCLFdBQVcsRUFBRSxpQ0FBaUM7UUFDOUMsU0FBUyxFQUFFLENBQUMsaUNBQWlDLENBQUM7S0FDL0MsQ0FBQztHQUNXLHNCQUFzQixDQTJEbEM7QUEzRFksd0RBQXNCIn0=