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
const operators_1 = require("rxjs/operators");
const dynamic_form_1 = require("@concourse/shared/dynamic-form");
let EditSurfaceComponent = class EditSurfaceComponent {
    constructor(surfaceFacade) {
        this.surfaceFacade = surfaceFacade;
        this.icons = { faTimes: faTimes_1.faTimes };
        this.surface$ = this.surfaceFacade.selectedWithRelated$;
        this.updating$ = this.surfaceFacade.isUpdating$;
        this.config$ = this.surface$.pipe(operators_1.map(surface => [
            {
                type: 'input',
                label: 'Name',
                name: 'name',
                placeholder: 'Surface Name',
                value: surface.name,
                validation: [forms_1.Validators.required, forms_1.Validators.minLength(3)]
            },
            {
                type: 'textarea',
                label: 'Description',
                name: 'description',
                value: surface.description
            },
            {
                type: 'button',
                label: 'Save',
                name: 'submit'
            }
        ]));
    }
    submit(surface, formData) {
        this.surfaceFacade.update(surface.copyWith(formData));
    }
};
__decorate([
    core_1.ViewChild(dynamic_form_1.DynamicFormComponent)
], EditSurfaceComponent.prototype, "form", void 0);
EditSurfaceComponent = __decorate([
    core_1.Component({
        selector: 'app-edit-surface',
        templateUrl: './edit-surface.component.html',
        styleUrls: ['./edit-surface.component.scss']
    })
], EditSurfaceComponent);
exports.EditSurfaceComponent = EditSurfaceComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC1zdXJmYWNlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9jb3JlL21vZGFsL2NvbXBvbmVudHMvZWRpdC1zdXJmYWNlL2VkaXQtc3VyZmFjZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBcUQ7QUFDckQsMENBQTRDO0FBQzVDLHVFQUFvRTtBQUVwRSw4Q0FBcUM7QUFHckMsaUVBQXNFO0FBUXRFLElBQWEsb0JBQW9CLEdBQWpDLE1BQWEsb0JBQW9CO0lBNkIvQixZQUNtQixhQUE0QjtRQUE1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQTVCdEMsVUFBSyxHQUFHLEVBQUUsT0FBTyxFQUFQLGlCQUFPLEVBQUUsQ0FBQztRQUM3QixhQUFRLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQztRQUNuRCxjQUFTLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUM7UUFDM0MsWUFBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUMxQixlQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztZQUNiO2dCQUNFLElBQUksRUFBRSxPQUFPO2dCQUNiLEtBQUssRUFBRSxNQUFNO2dCQUNiLElBQUksRUFBRSxNQUFNO2dCQUNaLFdBQVcsRUFBRSxjQUFjO2dCQUMzQixLQUFLLEVBQUUsT0FBTyxDQUFDLElBQUk7Z0JBQ25CLFVBQVUsRUFBRSxDQUFDLGtCQUFVLENBQUMsUUFBUSxFQUFFLGtCQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzNEO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLFVBQVU7Z0JBQ2hCLEtBQUssRUFBRSxhQUFhO2dCQUNwQixJQUFJLEVBQUUsYUFBYTtnQkFDbkIsS0FBSyxFQUFFLE9BQU8sQ0FBQyxXQUFXO2FBQzNCO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsS0FBSyxFQUFFLE1BQU07Z0JBQ2IsSUFBSSxFQUFFLFFBQVE7YUFDZjtTQUNGLENBQUMsQ0FDSCxDQUFDO0lBSUUsQ0FBQztJQUVMLE1BQU0sQ0FBQyxPQUFnQixFQUFFLFFBQWE7UUFDcEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQ3hELENBQUM7Q0FDRixDQUFBO0FBbkNrQztJQUFoQyxnQkFBUyxDQUFDLG1DQUFvQixDQUFDO2tEQUE0QjtBQURqRCxvQkFBb0I7SUFMaEMsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxrQkFBa0I7UUFDNUIsV0FBVyxFQUFFLCtCQUErQjtRQUM1QyxTQUFTLEVBQUUsQ0FBQywrQkFBK0IsQ0FBQztLQUM3QyxDQUFDO0dBQ1csb0JBQW9CLENBb0NoQztBQXBDWSxvREFBb0IifQ==