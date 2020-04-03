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
let EditNodeComponent = class EditNodeComponent {
    constructor(surfaceLayerFacade) {
        this.surfaceLayerFacade = surfaceLayerFacade;
        this.icons = { faTimes: faTimes_1.faTimes };
        this.selectedSurfaceLayer$ = this.surfaceLayerFacade.selectedWithRelated$;
        this.config$ = this.selectedSurfaceLayer$.pipe(operators_1.map(surfaceLayer => [
            {
                type: 'input',
                label: 'Surface Layer Name',
                name: 'name',
                placeholder: 'Surface Layer Name',
                value: surfaceLayer.name,
                validation: [forms_1.Validators.required, forms_1.Validators.minLength(3)],
                validationPhrases: {
                    minlength: 'Name must be at least 3 characters long.'
                }
            },
            {
                type: 'textarea',
                label: 'Description',
                name: 'description',
                value: surfaceLayer.description,
                validation: [forms_1.Validators.required, forms_1.Validators.minLength(3)],
                validationPhrases: {
                    minlength: 'Description must be at least 3 characters long.'
                }
            },
            {
                type: 'button',
                label: 'Save',
                name: 'submit'
            }
        ]));
    }
    submit(surfaceLayer, formData) {
        this.surfaceLayerFacade.update(surfaceLayer.copyWith(formData));
    }
};
__decorate([
    core_1.ViewChild(dynamic_form_1.DynamicFormComponent)
], EditNodeComponent.prototype, "form", void 0);
EditNodeComponent = __decorate([
    core_1.Component({
        selector: 'app-edit-node',
        templateUrl: './edit-node.component.html',
        styleUrls: ['./edit-node.component.scss']
    })
], EditNodeComponent);
exports.EditNodeComponent = EditNodeComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC1ub2RlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9jb3JlL21vZGFsL2NvbXBvbmVudHMvZWRpdC1ub2RlL2VkaXQtbm9kZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBcUQ7QUFDckQsMENBQTRDO0FBQzVDLHVFQUFvRTtBQUVwRSw4Q0FBcUM7QUFHckMsaUVBQXNFO0FBUXRFLElBQWEsaUJBQWlCLEdBQTlCLE1BQWEsaUJBQWlCO0lBbUM1QixZQUNtQixrQkFBc0M7UUFBdEMsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQWxDaEQsVUFBSyxHQUFHLEVBQUUsT0FBTyxFQUFQLGlCQUFPLEVBQUUsQ0FBQztRQUM3QiwwQkFBcUIsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsb0JBQW9CLENBQUM7UUFDckUsWUFBTyxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQ3ZDLGVBQUcsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDO1lBQ2xCO2dCQUNFLElBQUksRUFBRSxPQUFPO2dCQUNiLEtBQUssRUFBRSxvQkFBb0I7Z0JBQzNCLElBQUksRUFBRSxNQUFNO2dCQUNaLFdBQVcsRUFBRSxvQkFBb0I7Z0JBQ2pDLEtBQUssRUFBRSxZQUFZLENBQUMsSUFBSTtnQkFDeEIsVUFBVSxFQUFFLENBQUMsa0JBQVUsQ0FBQyxRQUFRLEVBQUUsa0JBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzFELGlCQUFpQixFQUFFO29CQUNqQixTQUFTLEVBQUUsMENBQTBDO2lCQUN0RDthQUNGO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLFVBQVU7Z0JBQ2hCLEtBQUssRUFBRSxhQUFhO2dCQUNwQixJQUFJLEVBQUUsYUFBYTtnQkFDbkIsS0FBSyxFQUFFLFlBQVksQ0FBQyxXQUFXO2dCQUMvQixVQUFVLEVBQUUsQ0FBQyxrQkFBVSxDQUFDLFFBQVEsRUFBRSxrQkFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDMUQsaUJBQWlCLEVBQUU7b0JBQ2pCLFNBQVMsRUFBRSxpREFBaUQ7aUJBQzdEO2FBQ0Y7WUFDRDtnQkFDRSxJQUFJLEVBQUUsUUFBUTtnQkFDZCxLQUFLLEVBQUUsTUFBTTtnQkFDYixJQUFJLEVBQUUsUUFBUTthQUNmO1NBQ0YsQ0FBQyxDQUNILENBQUM7SUFJRSxDQUFDO0lBRUwsTUFBTSxDQUFDLFlBQTBCLEVBQUUsUUFBYTtRQUM5QyxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUNsRSxDQUFDO0NBQ0YsQ0FBQTtBQXpDa0M7SUFBaEMsZ0JBQVMsQ0FBQyxtQ0FBb0IsQ0FBQzsrQ0FBNEI7QUFEakQsaUJBQWlCO0lBTDdCLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsZUFBZTtRQUN6QixXQUFXLEVBQUUsNEJBQTRCO1FBQ3pDLFNBQVMsRUFBRSxDQUFDLDRCQUE0QixDQUFDO0tBQzFDLENBQUM7R0FDVyxpQkFBaUIsQ0EwQzdCO0FBMUNZLDhDQUFpQiJ9