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
let ModifyPolicyTemplatesComponent = class ModifyPolicyTemplatesComponent {
    constructor(policyGroupTemplateFacade, policyTemplateFacade) {
        this.policyGroupTemplateFacade = policyGroupTemplateFacade;
        this.policyTemplateFacade = policyTemplateFacade;
        this.icons = { faTimes: faTimes_1.faTimes };
        this.policyGroupTemplate$ = this.policyGroupTemplateFacade.selectedWithRelated$;
        this.config$ = this.policyGroupTemplate$.pipe(operators_1.distinctUntilKeyChanged('id'), operators_1.map(pgt => [
            {
                type: 'typeahead',
                exType: 'multiselect',
                name: 'policyTemplateIds',
                placeholder: 'Select Policy Templates',
                options: this.policyTemplateFacade.list$.pipe(operators_1.map(pt => pt.map(o => ({ id: o.id, text: o.name })))),
                value: pgt.policyTemplates.map(pt => pt.id)
            },
            {
                type: 'button',
                label: 'Confirm',
                name: 'submit',
                class: 'float-right mb-3'
            }
        ]));
    }
    submit(pgt, formData) {
        this.policyGroupTemplateFacade.updatePolicyTemplates(pgt.copyWith({
            policyTemplates: formData.policyTemplateIds.map(id => ({ id })),
            status: 'DRAFT'
        }));
    }
};
__decorate([
    core_1.ViewChild(dynamic_form_1.DynamicFormComponent)
], ModifyPolicyTemplatesComponent.prototype, "form", void 0);
ModifyPolicyTemplatesComponent = __decorate([
    core_1.Component({
        selector: 'app-modify-policy-templates',
        templateUrl: './modify-policy-templates.component.html',
        styleUrls: ['./modify-policy-templates.component.scss']
    })
], ModifyPolicyTemplatesComponent);
exports.ModifyPolicyTemplatesComponent = ModifyPolicyTemplatesComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kaWZ5LXBvbGljeS10ZW1wbGF0ZXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL2NvcmUvbW9kYWwvY29tcG9uZW50cy9tb2RpZnktcG9saWN5LXRlbXBsYXRlcy9tb2RpZnktcG9saWN5LXRlbXBsYXRlcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBcUQ7QUFDckQsdUVBQW9FO0FBRXBFLDhDQUE4RDtBQUc5RCxpRUFBOEU7QUFROUUsSUFBYSw4QkFBOEIsR0FBM0MsTUFBYSw4QkFBOEI7SUEwQnpDLFlBQ21CLHlCQUFvRCxFQUNwRCxvQkFBMEM7UUFEMUMsOEJBQXlCLEdBQXpCLHlCQUF5QixDQUEyQjtRQUNwRCx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBMUJwRCxVQUFLLEdBQUcsRUFBRSxPQUFPLEVBQVAsaUJBQU8sRUFBRSxDQUFDO1FBQzdCLHlCQUFvQixHQUFHLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxvQkFBb0IsQ0FBQztRQUMzRSxZQUFPLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FDdEMsbUNBQXVCLENBQUMsSUFBSSxDQUFDLEVBQzdCLGVBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO1lBQ1Q7Z0JBQ0UsSUFBSSxFQUFFLFdBQVc7Z0JBQ2pCLE1BQU0sRUFBRSxhQUFhO2dCQUNyQixJQUFJLEVBQUUsbUJBQW1CO2dCQUN6QixXQUFXLEVBQUUseUJBQXlCO2dCQUN0QyxPQUFPLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQzNDLGVBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBVyxDQUFDLENBQUMsQ0FDL0Q7Z0JBQ0QsS0FBSyxFQUFFLEdBQUcsQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQzthQUM1QztZQUNEO2dCQUNFLElBQUksRUFBRSxRQUFRO2dCQUNkLEtBQUssRUFBRSxTQUFTO2dCQUNoQixJQUFJLEVBQUUsUUFBUTtnQkFDZCxLQUFLLEVBQUUsa0JBQWtCO2FBQzFCO1NBQ0YsQ0FBQyxDQUNILENBQUM7SUFLRSxDQUFDO0lBRUwsTUFBTSxDQUFDLEdBQXdCLEVBQUUsUUFBYTtRQUM1QyxJQUFJLENBQUMseUJBQXlCLENBQUMscUJBQXFCLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQztZQUNoRSxlQUFlLEVBQUUsUUFBUSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQy9ELE1BQU0sRUFBRSxPQUFPO1NBQ2hCLENBQUMsQ0FBQyxDQUFDO0lBQ04sQ0FBQztDQUNGLENBQUE7QUFwQ2tDO0lBQWhDLGdCQUFTLENBQUMsbUNBQW9CLENBQUM7NERBQTRCO0FBRGpELDhCQUE4QjtJQUwxQyxnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLDZCQUE2QjtRQUN2QyxXQUFXLEVBQUUsMENBQTBDO1FBQ3ZELFNBQVMsRUFBRSxDQUFDLDBDQUEwQyxDQUFDO0tBQ3hELENBQUM7R0FDVyw4QkFBOEIsQ0FxQzFDO0FBckNZLHdFQUE4QiJ9