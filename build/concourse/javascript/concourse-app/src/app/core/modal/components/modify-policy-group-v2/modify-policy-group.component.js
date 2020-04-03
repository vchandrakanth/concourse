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
const helpers_1 = require("@concourse/shared/helpers");
let ModifyPolicyGroupV2Component = class ModifyPolicyGroupV2Component {
    constructor(fb, policyGroupFacade, policyTemplateFacade) {
        this.fb = fb;
        this.policyGroupFacade = policyGroupFacade;
        this.policyTemplateFacade = policyTemplateFacade;
        this.policyTemplateList$ = this.policyTemplateFacade.list$;
        this.isUpdating$ = this.policyGroupFacade.isUpdating$;
        this.form = this.fb.group({
            policies: this.fb.group({})
        });
        this.icons = { faTimes: faTimes_1.faTimes };
    }
    get formValues() {
        return this.form.value;
    }
    get selectedPolicies() {
        if (!helpers_1.Util.isNullOrUndefined(this.formValues.policies)) {
            return Object.entries(this.formValues.policies).reduce((acc, [policyTemplateId, attributeValues]) => [
                ...acc,
                ...(helpers_1.Util.isArray(attributeValues) ? attributeValues.map(attributeValue => ({
                    policyTemplate: Object.assign({}, this.policyGroup.policyGroupTemplate.policyTemplates.find(pt => pt.id === +policyTemplateId)),
                    attributeValues: Object.entries(attributeValue).map(([attributeId, value]) => ({
                        attribute: { id: +attributeId },
                        // TODO: Potentially more we need to do here, would like it if we didn't and just made the forms output the right values.
                        value: JSON.stringify(helpers_1.Util.isArray(value) ? value : [value]),
                        entityValues: (value || [])
                    }))
                })) : []),
                ...(!helpers_1.Util.isArray(attributeValues) ? [{
                        policyTemplate: Object.assign({}, this.policyGroup.policyGroupTemplate.policyTemplates.find(pt => pt.id === +policyTemplateId)),
                        attributeValues: Object.entries(attributeValues).map(([attributeId, value]) => ({
                            attribute: { id: +attributeId },
                            // TODO: Potentially more we need to do here, would like it if we didn't and just made the forms output the right values.
                            value: JSON.stringify(helpers_1.Util.isArray(value) ? value : [value]),
                            entityValues: value
                        }))
                    }] : [])
            ], []);
        }
        return [];
    }
    submit(policyGroup) {
        this.policyGroupFacade.updateRelated(policyGroup.copyWith({
            policies: this.selectedPolicies,
            status: 'DRAFT'
        }));
    }
};
ModifyPolicyGroupV2Component = __decorate([
    core_1.Component({
        selector: 'app-modify-policy-group',
        templateUrl: './modify-policy-group.component.html',
        styleUrls: ['./modify-policy-group.component.scss']
    })
], ModifyPolicyGroupV2Component);
exports.ModifyPolicyGroupV2Component = ModifyPolicyGroupV2Component;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kaWZ5LXBvbGljeS1ncm91cC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvY29yZS9tb2RhbC9jb21wb25lbnRzL21vZGlmeS1wb2xpY3ktZ3JvdXAtdjIvbW9kaWZ5LXBvbGljeS1ncm91cC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBMEM7QUFFMUMsdUVBQW9FO0FBR3BFLHVEQUFpRDtBQVFqRCxJQUFhLDRCQUE0QixHQUF6QyxNQUFhLDRCQUE0QjtJQWF2QyxZQUNtQixFQUFlLEVBQ2YsaUJBQW9DLEVBQ3BDLG9CQUEwQztRQUYxQyxPQUFFLEdBQUYsRUFBRSxDQUFhO1FBQ2Ysc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBZjdELHdCQUFtQixHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUM7UUFFdEQsZ0JBQVcsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDO1FBQ2pELFNBQUksR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztZQUNuQixRQUFRLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO1NBQzVCLENBQUMsQ0FBQztRQUNNLFVBQUssR0FBRyxFQUFFLE9BQU8sRUFBUCxpQkFBTyxFQUFFLENBQUM7SUFVekIsQ0FBQztJQVJMLElBQUksVUFBVTtRQUNaLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDekIsQ0FBQztJQVFELElBQUksZ0JBQWdCO1FBQ2xCLElBQUksQ0FBQyxjQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFB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