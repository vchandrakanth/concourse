"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const helpers_1 = require("@concourse/shared/helpers");
const faTimes_1 = require("@fortawesome/free-solid-svg-icons/faTimes");
let UpdatePolicyGroupV3Component = class UpdatePolicyGroupV3Component {
    constructor(fb, policyGroupFacade) {
        this.fb = fb;
        this.policyGroupFacade = policyGroupFacade;
        this.icons = { faTimes: faTimes_1.faTimes };
        this.form = this.fb.group({
            policy: [],
            selectedPolicyGroupTemplate: [],
            policies: this.fb.group({})
        });
        this.activePolicyIndex = 0;
    }
    get formValues() {
        return this.form.value;
    }
    ngOnInit() {
        this.policies = [...this.policyGroup.policies];
        this.form.get('selectedPolicyGroupTemplate').setValue(this.policyGroup.policyGroupTemplate);
    }
    onSetActivePolicyControl(i) {
        this.activePolicyIndex = i;
    }
    onAddPolicyInstance(policy) {
        this.policies = [...this.policies, {
                policyTemplate: policy.policyTemplate,
                policyGroup: policy.policyGroup
            }];
    }
    // remove control from formGroup
    removePolicyControl(templateId, index) {
        this.form.get('policies').removeControl(`${templateId}.${index}`);
    }
    onRemovePolicy(policy, i) {
        this.policies.splice(i, 1);
        this.removePolicyControl(policy.policyTemplate.id, i);
    }
    getPolicyControlPath(policyId) {
        return `policies.${policyId}`;
    }
    isCurrentlyActive(index) {
        return this.activePolicyIndex === index ? true : false;
    }
    ifNotLastOfPolicyType(policy) {
        let numOfExistingPolicyTypes = 0;
        for (const p of this.policies) {
            const { policyTemplate: { id } } = p;
            if (id === policy.policyTemplate.id) {
                numOfExistingPolicyTypes++;
            }
        }
        return numOfExistingPolicyTypes === 0 ? false : true;
    }
    getFormattedPolicies() {
        if (!helpers_1.Util.isNullOrUndefined(this.formValues.policies)) {
            const selectedPolicyGroupTemplate = this.formValues.selectedPolicyGroupTemplate;
            return Object.entries(this.formValues.policies).reduce((acc, [policyTemplateId, attributeValues]) => [
                ...acc,
                ...(helpers_1.Util.isArray(attributeValues) ? attributeValues.map(attributeValue => ({
                    policyTemplate: Object.assign({}, selectedPolicyGroupTemplate.policyTemplates.find(pt => pt.id === +policyTemplateId.split('.')[0])),
                    attributeValues: Object.entries(attributeValue).map(([attributeId, value]) => ({
                        attribute: { id: attributeId },
                        value: JSON.stringify(helpers_1.Util.isArray(value) ? value : [value]),
                        entityValues: (value || [])
                    }))
                })) : []),
                ...(!helpers_1.Util.isArray(attributeValues) ? [{
                        policyTemplate: Object.assign({}, selectedPolicyGroupTemplate.policyTemplates.find(pt => pt.id === +policyTemplateId.split('.')[0])),
                        attributeValues: Object.entries(attributeValues).map(([attributeId, value]) => ({
                            attribute: { id: attributeId },
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
            policies: this.getFormattedPolicies(),
            status: 'DRAFT'
        }));
    }
};
UpdatePolicyGroupV3Component = __decorate([
    core_1.Component({
        selector: 'app-update-policy-group-v3',
        templateUrl: './update-policy-group-v3.component.html',
        styleUrls: ['./update-policy-group-v3.component.scss'],
    })
], UpdatePolicyGroupV3Component);
exports.UpdatePolicyGroupV3Component = UpdatePolicyGroupV3Component;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLXBvbGljeS1ncm91cC12My5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvY29yZS9tb2RhbC9jb21wb25lbnRzL3VwZGF0ZS1wb2xpY3ktZ3JvdXAtdjMvdXBkYXRlLXBvbGljeS1ncm91cC12My5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBMkU7QUFHM0UsdURBQWlEO0FBRWpELHVFQUFvRTtBQU1wRSxJQUFhLDRCQUE0QixHQUF6QyxNQUFhLDRCQUE0QjtJQWF2QyxZQUNtQixFQUFlLEVBQ2YsaUJBQW9DO1FBRHBDLE9BQUUsR0FBRixFQUFFLENBQWE7UUFDZixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBWnZELFVBQUssR0FBRyxFQUFFLE9BQU8sRUFBUCxpQkFBTyxFQUFFLENBQUM7UUFFcEIsU0FBSSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO1lBQ25CLE1BQU0sRUFBRSxFQUFFO1lBQ1YsMkJBQTJCLEVBQUUsRUFBRTtZQUMvQixRQUFRLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO1NBQzVCLENBQUMsQ0FBQztRQUVILHNCQUFpQixHQUFHLENBQUMsQ0FBQztJQU10QixDQUFDO0lBRUQsSUFBSSxVQUFVO1FBQ1osT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUN6QixDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsNkJBQTZCLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdB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