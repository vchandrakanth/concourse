"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const faTimes_1 = require("@fortawesome/free-solid-svg-icons/faTimes");
const operators_1 = require("rxjs/operators");
const dynamic_form_1 = require("@concourse/shared/dynamic-form");
let ModifyAttributeComponent = class ModifyAttributeComponent {
    constructor(policyGroupFacade, attributeFacade) {
        this.policyGroupFacade = policyGroupFacade;
        this.attributeFacade = attributeFacade;
        this.icons = { faTimes: faTimes_1.faTimes };
        this.selectedPolicyGroupRelated$ = this.policyGroupFacade.selectedWithRelated$;
        this.config$ = this.selectedPolicyGroupRelated$.pipe(operators_1.distinctUntilKeyChanged('id'), operators_1.map(policyGroup => [
            {
                type: 'typeahead',
                exType: 'multiselect',
                label: 'Attribute Tags',
                name: 'attributesTagsIds',
                placeholder: 'Attribute Tags',
                options: this.attributeFacade.list$.pipe(
                // TODO: remove this when changing attributeTagId => id and tagName => name
                operators_1.map(attributes => attributes.map(a => ({ id: a.id, text: a.name })))),
                value: policyGroup.attributeTags.map(a => a.id)
            },
            {
                type: 'button',
                label: 'Confirm',
                name: 'submit',
                class: ''
            }
        ]));
    }
    submit(pg) {
        this.policyGroupFacade.updateRelated(pg.copyWith({
            attributeTagIds: this.form.value.attributesTagsIds,
            status: 'DRAFT'
        }));
    }
};
__decorate([
    core_1.ViewChild(dynamic_form_1.DynamicFormComponent)
], ModifyAttributeComponent.prototype, "form", void 0);
ModifyAttributeComponent = __decorate([
    core_1.Component({
        selector: 'app-modify-attribute',
        templateUrl: './modify-attribute.component.html',
        styles: []
    })
], ModifyAttributeComponent);
exports.ModifyAttributeComponent = ModifyAttributeComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kaWZ5LWF0dHJpYnV0ZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvY29yZS9tb2RhbC9jb21wb25lbnRzL21vZGlmeS1hdHRyaWJ1dGUvbW9kaWZ5LWF0dHJpYnV0ZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBcUQ7QUFDckQsdUVBQW9FO0FBR3BFLDhDQUE4RDtBQUc5RCxpRUFBMkY7QUFRM0YsSUFBYSx3QkFBd0IsR0FBckMsTUFBYSx3QkFBd0I7SUE0Qm5DLFlBQ21CLGlCQUFvQyxFQUNwQyxlQUFtQztRQURuQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3BDLG9CQUFlLEdBQWYsZUFBZSxDQUFvQjtRQTVCN0MsVUFBSyxHQUFHLEVBQUUsT0FBTyxFQUFQLGlCQUFPLEVBQUUsQ0FBQztRQUM3QixnQ0FBMkIsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsb0JBQW9CLENBQUM7UUFDMUUsWUFBTyxHQUE4QixJQUFJLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUN4RSxtQ0FBdUIsQ0FBQyxJQUFJLENBQUMsRUFDN0IsZUFBRyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUM7WUFDakI7Z0JBQ0UsSUFBSSxFQUFFLFdBQVc7Z0JBQ2pCLE1BQU0sRUFBRSxhQUFhO2dCQUNyQixLQUFLLEVBQUUsZ0JBQWdCO2dCQUN2QixJQUFJLEVBQUUsbUJBQW1CO2dCQUN6QixXQUFXLEVBQUUsZ0JBQWdCO2dCQUM3QixPQUFPLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsSUFBSTtnQkFDdEMsMkVBQTJFO2dCQUMzRSxlQUFHLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQVcsQ0FBQyxDQUFDLENBQy9FO2dCQUNELEtBQUssRUFBRSxXQUFXLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7YUFDaEQ7WUFDRDtnQkFDRSxJQUFJLEVBQUUsUUFBUTtnQkFDZCxLQUFLLEVBQUUsU0FBUztnQkFDaEIsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsS0FBSyxFQUFFLEVBQUU7YUFDVjtTQUNlLENBQUMsQ0FDcEIsQ0FBQztJQUtFLENBQUM7SUFFTCxNQUFNLENBQUMsRUFBZTtRQUNwQixJQUFJLENBQUMsaUJBQWlCLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUM7WUFDL0MsZUFBZSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQjtZQUNsRCxNQUFNLEVBQUUsT0FBTztTQUNoQixDQUFDLENBQUMsQ0FBQztJQUNOLENBQUM7Q0FDRixDQUFBO0FBdENrQztJQUFoQyxnQkFBUyxDQUFDLG1DQUFvQixDQUFDO3NEQUE0QjtBQURqRCx3QkFBd0I7SUFMcEMsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxzQkFBc0I7UUFDaEMsV0FBVyxFQUFFLG1DQUFtQztRQUNoRCxNQUFNLEVBQUUsRUFBRTtLQUNYLENBQUM7R0FDVyx3QkFBd0IsQ0F1Q3BDO0FBdkNZLDREQUF3QiJ9