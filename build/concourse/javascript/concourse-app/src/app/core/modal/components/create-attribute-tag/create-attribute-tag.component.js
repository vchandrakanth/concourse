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
let CreateAttributeTagComponent = class CreateAttributeTagComponent {
    constructor(attributeTagFacade) {
        this.attributeTagFacade = attributeTagFacade;
        this.isUpdating$ = this.attributeTagFacade.isUpdating$;
        this.icons = { faTimes: faTimes_1.faTimes };
        this.config = [
            {
                type: 'input',
                label: 'Attribute Tag Name',
                name: 'name',
                dataE2e: 'inputAttributeTagName',
                placeholder: 'Attribute Tag Name',
                validation: [forms_1.Validators.required, forms_1.Validators.minLength(3)],
                validationPhrases: {
                    nameInUse: 'Attribute Tag Name already in use.'
                },
                autofocus: true
            },
            {
                type: 'textarea',
                label: 'Description',
                name: 'description',
                dataE2e: 'inputAttributeTagDescription',
                placeholder: 'Description',
                validation: [forms_1.Validators.required]
            },
            {
                type: 'button',
                label: 'Save',
                dataE2e: 'attributeTagSaveButton',
                name: 'submit',
                class: ''
            }
        ];
    }
    submit(payload) {
        this.attributeTagFacade.create(payload);
    }
};
__decorate([
    core_1.ViewChild(dynamic_form_1.DynamicFormComponent)
], CreateAttributeTagComponent.prototype, "form", void 0);
CreateAttributeTagComponent = __decorate([
    core_1.Component({
        selector: 'app-create-attribute-tag',
        templateUrl: './create-attribute-tag.component.html',
        styleUrls: ['./create-attribute-tag.component.scss']
    })
], CreateAttributeTagComponent);
exports.CreateAttributeTagComponent = CreateAttributeTagComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWF0dHJpYnV0ZS10YWcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL2NvcmUvbW9kYWwvY29tcG9uZW50cy9jcmVhdGUtYXR0cmlidXRlLXRhZy9jcmVhdGUtYXR0cmlidXRlLXRhZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBcUQ7QUFDckQsMENBQTRDO0FBQzVDLHVFQUFvRTtBQUVwRSxpRUFBbUY7QUFRbkYsSUFBYSwyQkFBMkIsR0FBeEMsTUFBYSwyQkFBMkI7SUFtQ3RDLFlBQ21CLGtCQUFzQztRQUF0Qyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBbEN6RCxnQkFBVyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLENBQUM7UUFFekMsVUFBSyxHQUFHLEVBQUUsT0FBTyxFQUFQLGlCQUFPLEVBQUUsQ0FBQztRQUM3QixXQUFNLEdBQWtCO1lBQ3RCO2dCQUNFLElBQUksRUFBRSxPQUFPO2dCQUNiLEtBQUssRUFBRSxvQkFBb0I7Z0JBQzNCLElBQUksRUFBRSxNQUFNO2dCQUNaLE9BQU8sRUFBRSx1QkFBdUI7Z0JBQ2hDLFdBQVcsRUFBRSxvQkFBb0I7Z0JBQ2pDLFVBQVUsRUFBRSxDQUFDLGtCQUFVLENBQUMsUUFBUSxFQUFFLGtCQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMxRCxpQkFBaUIsRUFBRTtvQkFDakIsU0FBUyxFQUFFLG9DQUFvQztpQkFDaEQ7Z0JBQ0QsU0FBUyxFQUFFLElBQUk7YUFDaEI7WUFDRDtnQkFDRSxJQUFJLEVBQUUsVUFBVTtnQkFDaEIsS0FBSyxFQUFFLGFBQWE7Z0JBQ3BCLElBQUksRUFBRSxhQUFhO2dCQUNuQixPQUFPLEVBQUUsOEJBQThCO2dCQUN2QyxXQUFXLEVBQUUsYUFBYTtnQkFDMUIsVUFBVSxFQUFFLENBQUMsa0JBQVUsQ0FBQyxRQUFRLENBQUM7YUFDbEM7WUFDRDtnQkFDRSxJQUFJLEVBQUUsUUFBUTtnQkFDZCxLQUFLLEVBQUUsTUFBTTtnQkFDYixPQUFPLEVBQUUsd0JBQXdCO2dCQUNqQyxJQUFJLEVBQUUsUUFBUTtnQkFDZCxLQUFLLEVBQUUsRUFBRTthQUNWO1NBQ0YsQ0FBQztJQUlFLENBQUM7SUFFTCxNQUFNLENBQUMsT0FBWTtRQUNqQixJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzFDLENBQUM7Q0FDRixDQUFBO0FBekNrQztJQUFoQyxnQkFBUyxDQUFDLG1DQUFvQixDQUFDO3lEQUE0QjtBQURqRCwyQkFBMkI7SUFMdkMsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSwwQkFBMEI7UUFDcEMsV0FBVyxFQUFFLHVDQUF1QztRQUNwRCxTQUFTLEVBQUUsQ0FBQyx1Q0FBdUMsQ0FBQztLQUNyRCxDQUFDO0dBQ1csMkJBQTJCLENBMEN2QztBQTFDWSxrRUFBMkIifQ==