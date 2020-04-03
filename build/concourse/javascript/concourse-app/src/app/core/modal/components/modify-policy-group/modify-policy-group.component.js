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
const policy_template_form_component_1 = require("@concourse/shared/policy-template-form/policy-template-form.component");
let ModifyPolicyGroupComponent = class ModifyPolicyGroupComponent {
    constructor(fb, policyGroupFacade, policyTemplateFacade) {
        this.fb = fb;
        this.policyGroupFacade = policyGroupFacade;
        this.policyTemplateFacade = policyTemplateFacade;
        this.icons = { faTimes: faTimes_1.faTimes };
        this.policyTemplateList$ = this.policyTemplateFacade.list$;
        this.policyGroup$ = this.policyGroupFacade.selectedWithRelated$;
        this.isUpdating$ = this.policyGroupFacade.isUpdating$;
        this.form = this.fb.group({
            policyGroupTemplate: this.fb.group({})
        });
    }
    submit(policyGroup) {
        const data = this.form.value;
        const policies = policyGroup.policies.map(policy => {
            const pt = policy.policyTemplate;
            const attributeValueMap = new Map(!!policy ? policy.attributeValues.map(av => [av.attribute.id, av]) : {});
            const attributeValueFormData = data.policyGroupTemplate[pt.name];
            return policy.copyWith({
                policyTemplate: { id: pt.id },
                attributeValues: pt.attributes.map(a => {
                    let value = '';
                    if (Object.values(attributeValueFormData).length > 0) {
                        value = !Array.isArray(attributeValueFormData[a.name]) ?
                            [attributeValueFormData[a.name]] :
                            // multipleValue can either be array of objects with an id property or an array of strings
                            attributeValueFormData[a.name].map(av => av.hasOwnProperty('id') ? av.id : av.hasOwnProperty('customResource') ? av['customResource'] : av);
                        value = JSON.stringify(value);
                    }
                    return {
                        id: attributeValueMap.get(a.id).id,
                        version: attributeValueMap.get(a.id).version,
                        attribute: { id: a.id },
                        value
                    };
                })
            });
        });
        this.policyGroupFacade.updateRelated(policyGroup.copyWith({
            policies,
            status: 'DRAFT'
        }));
    }
};
__decorate([
    core_1.ViewChild(policy_template_form_component_1.PolicyTemplateFormComponent)
], ModifyPolicyGroupComponent.prototype, "templateForm", void 0);
ModifyPolicyGroupComponent = __decorate([
    core_1.Component({
        selector: 'app-modify-policy-group',
        templateUrl: './modify-policy-group.component.html',
        styleUrls: ['./modify-policy-group.component.scss']
    })
], ModifyPolicyGroupComponent);
exports.ModifyPolicyGroupComponent = ModifyPolicyGroupComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kaWZ5LXBvbGljeS1ncm91cC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvY29yZS9tb2RhbC9jb21wb25lbnRzL21vZGlmeS1wb2xpY3ktZ3JvdXAvbW9kaWZ5LXBvbGljeS1ncm91cC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBcUQ7QUFFckQsdUVBQW9FO0FBR3BFLDBIQUFvSDtBQVFwSCxJQUFhLDBCQUEwQixHQUF2QyxNQUFhLDBCQUEwQjtJQVVyQyxZQUNtQixFQUFlLEVBQ2YsaUJBQW9DLEVBQ3BDLG9CQUEwQztRQUYxQyxPQUFFLEdBQUYsRUFBRSxDQUFhO1FBQ2Ysc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBWHBELFVBQUssR0FBRyxFQUFFLE9BQU8sRUFBUCxpQkFBTyxFQUFFLENBQUM7UUFDN0Isd0JBQW1CLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQztRQUN0RCxpQkFBWSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxvQkFBb0IsQ0FBQztRQUMzRCxnQkFBVyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUM7UUFDakQsU0FBSSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO1lBQ25CLG1CQUFtQixFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztTQUN2QyxDQUFDLENBQUM7SUFNQyxDQUFDO0lBRUwsTUFBTSxDQUFDLFdBQXdCO1FBQzdCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQzdCLE1BQU0sUUFBUSxHQUFHLFdBQVcsQ0FBQyxR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