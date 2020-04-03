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
let EditAttributeTagComponent = class EditAttributeTagComponent {
    constructor(attributeTagFacade) {
        this.attributeTagFacade = attributeTagFacade;
        this.isUpdating$ = this.attributeTagFacade.isUpdating$;
        this.attributeTag$ = this.attributeTagFacade.selected$;
        this.config$ = this.attributeTag$.pipe(operators_1.map(attributeTag => [
            {
                type: 'input',
                disabled: true,
                label: 'Attribute Tag Id',
                name: 'id',
                value: attributeTag.id
            },
            {
                type: 'input',
                label: 'Attribute Tag Name',
                name: 'name',
                dataE2e: 'inputAttributeTagName',
                placeholder: 'Attribute Tag Name',
                value: attributeTag.name,
                validation: [forms_1.Validators.required, forms_1.Validators.minLength(3)],
                validationPhrases: {
                    nameInUse: 'Attribute Tag Name already in use.'
                }
            },
            {
                type: 'textarea',
                label: 'Description',
                name: 'description',
                dataE2e: 'inputAttributeTagDescription',
                placeholder: 'Description',
                value: attributeTag.description,
                validation: [forms_1.Validators.required]
            },
            {
                type: 'button',
                label: 'Save',
                name: 'submit',
                dataE2e: 'attributeTagSaveButton',
                class: 'float-right mb-3'
            }
        ]));
        this.icons = { faTimes: faTimes_1.faTimes };
    }
    submit(attributeTag) {
        this.attributeTagFacade.update(attributeTag.copyWith(this.form.value));
    }
};
__decorate([
    core_1.ViewChild(dynamic_form_1.DynamicFormComponent)
], EditAttributeTagComponent.prototype, "form", void 0);
EditAttributeTagComponent = __decorate([
    core_1.Component({
        selector: 'app-edit-attribute-tag',
        templateUrl: './edit-attribute-tag.component.html',
        styleUrls: ['./edit-attribute-tag.component.scss']
    })
], EditAttributeTagComponent);
exports.EditAttributeTagComponent = EditAttributeTagComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC1hdHRyaWJ1dGUtdGFnLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9jb3JlL21vZGFsL2NvbXBvbmVudHMvZWRpdC1hdHRyaWJ1dGUtdGFnL2VkaXQtYXR0cmlidXRlLXRhZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBcUQ7QUFDckQsMENBQTRDO0FBQzVDLHVFQUFvRTtBQUdwRSw4Q0FBcUM7QUFHckMsaUVBQW1GO0FBUW5GLElBQWEseUJBQXlCLEdBQXRDLE1BQWEseUJBQXlCO0lBNkNwQyxZQUNtQixrQkFBc0M7UUFBdEMsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQTVDekQsZ0JBQVcsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxDQUFDO1FBQ2xELGtCQUFhLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQztRQUNsRCxZQUFPLEdBQThCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUMxRCxlQUFHLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQztZQUNsQjtnQkFDRSxJQUFJLEVBQUUsT0FBTztnQkFDYixRQUFRLEVBQUUsSUFBSTtnQkFDZCxLQUFLLEVBQUUsa0JBQWtCO2dCQUN6QixJQUFJLEVBQUUsSUFBSTtnQkFDVixLQUFLLEVBQUUsWUFBWSxDQUFDLEVBQUU7YUFDdkI7WUFDRDtnQkFDRSxJQUFJLEVBQUUsT0FBTztnQkFDYixLQUFLLEVBQUUsb0JBQW9CO2dCQUMzQixJQUFJLEVBQUUsTUFBTTtnQkFDWixPQUFPLEVBQUUsdUJBQXVCO2dCQUNoQyxXQUFXLEVBQUUsb0JBQW9CO2dCQUNqQyxLQUFLLEVBQUUsWUFBWSxDQUFDLElBQUk7Z0JBQ3hCLFVBQVUsRUFBRSxDQUFDLGtCQUFVLENBQUMsUUFBUSxFQUFFLGtCQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMxRCxpQkFBaUIsRUFBRTtvQkFDakIsU0FBUyxFQUFFLG9DQUFvQztpQkFDaEQ7YUFDRjtZQUNEO2dCQUNFLElBQUksRUFBRSxVQUFVO2dCQUNoQixLQUFLLEVBQUUsYUFBYTtnQkFDcEIsSUFBSSxFQUFFLGFBQWE7Z0JBQ25CLE9BQU8sRUFBRSw4QkFBOEI7Z0JBQ3ZDLFdBQVcsRUFBRSxhQUFhO2dCQUMxQixLQUFLLEVBQUUsWUFBWSxDQUFDLFdBQVc7Z0JBQy9CLFVBQVUsRUFBRSxDQUFDLGtCQUFVLENBQUMsUUFBUSxDQUFDO2FBQ2xDO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsS0FBSyxFQUFFLE1BQU07Z0JBQ2IsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLHdCQUF3QjtnQkFDakMsS0FBSyxFQUFFLGtCQUFrQjthQUMxQjtTQUNGLENBQUMsQ0FDSCxDQUFDO1FBQ08sVUFBSyxHQUFHLEVBQUUsT0FBTyxFQUFQLGlCQUFPLEVBQUUsQ0FBQztJQUl6QixDQUFDO0lBRUwsTUFBTSxDQUFDLFlBQTBCO1FBQy9CLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDekUsQ0FBQztDQUVGLENBQUE7QUFwRGtDO0lBQWhDLGdCQUFTLENBQUMsbUNBQW9CLENBQUM7dURBQTRCO0FBRGpELHlCQUF5QjtJQUxyQyxnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLHdCQUF3QjtRQUNsQyxXQUFXLEVBQUUscUNBQXFDO1FBQ2xELFNBQVMsRUFBRSxDQUFDLHFDQUFxQyxDQUFDO0tBQ25ELENBQUM7R0FDVyx5QkFBeUIsQ0FxRHJDO0FBckRZLDhEQUF5QiJ9