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
let PolicyTemplateFormComponent = class PolicyTemplateFormComponent {
    constructor(parentForm) {
        this.parentForm = parentForm;
        this.policies = [];
        this.tooltipConfig = [
            { label: 'Claims', prop: 'claims' },
            { label: 'Proofs', prop: 'proofs' }
        ];
    }
    set policyTemplates(policyTemplates) {
        const policyTemplateSet = new Set();
        this._policyTemplates = policyTemplates.map(pt => {
            policyTemplateSet.add(pt.name);
            this.formGroup.addControl(pt.name, new forms_1.FormGroup({}));
            const policy = this.policies.find(p => p.policyTemplate.id === pt.id);
            return pt.copyWith({
                policyTemplateFieldConfigs: pt.attributes.map(attribute => {
                    const matchedAttributeValues = !!policy ? policy.attributeValues.find(pav => pav.attribute.id === attribute.id) : {};
                    const parsedMatchAttrValues = !!policy ? JSON.parse(matchedAttributeValues.value) : {};
                    let attributeValues;
                    if (!!policy) {
                        attributeValues = [...parsedMatchAttrValues];
                    }
                    return Object.assign(Object.assign({}, attribute.serialize()), { parent: pt.name, attributeValues });
                })
            });
        });
        for (const controlName in this.formGroup.controls) {
            if (this.formGroup.controls.hasOwnProperty(controlName) &&
                controlName !== 'selectedPolicyGroupTemplate' &&
                !policyTemplateSet.has(controlName)) {
                this.formGroup.removeControl(controlName);
            }
        }
    }
    get policyTemplates() {
        return this._policyTemplates;
    }
    get formGroup() {
        return this.parentForm.form.get('policyGroupTemplate');
    }
    trackPT(index, pt) {
        return `${index}_${pt.name}`;
    }
    trackConfig(index, config) {
        return `${index}_${config.id}`;
    }
    getGroup(groupName) {
        return this.formGroup.get(groupName);
    }
};
__decorate([
    core_1.Input()
], PolicyTemplateFormComponent.prototype, "policies", void 0);
__decorate([
    core_1.Input()
], PolicyTemplateFormComponent.prototype, "policyTemplates", null);
PolicyTemplateFormComponent = __decorate([
    core_1.Component({
        exportAs: 'policyTemplateForm',
        selector: 'app-policy-template-form',
        styleUrls: ['./policy-template-form.component.scss'],
        templateUrl: './policy-template-form.component.html',
        viewProviders: [
            {
                provide: forms_1.ControlContainer,
                useExisting: forms_1.FormGroupDirective
            }
        ]
    })
], PolicyTemplateFormComponent);
exports.PolicyTemplateFormComponent = PolicyTemplateFormComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9saWN5LXRlbXBsYXRlLWZvcm0uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3NoYXJlZC9wb2xpY3ktdGVtcGxhdGUtZm9ybS9wb2xpY3ktdGVtcGxhdGUtZm9ybS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBaUQ7QUFDakQsMENBSXdCO0FBcUJ4QixJQUFhLDJCQUEyQixHQUF4QyxNQUFhLDJCQUEyQjtJQWlEdEMsWUFDbUIsVUFBOEI7UUFBOUIsZUFBVSxHQUFWLFVBQVUsQ0FBb0I7UUFqRHhDLGFBQVEsR0FBYSxFQUFFLENBQUM7UUEyQ3hCLGtCQUFhLEdBQXFCO1lBQ3pDLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFO1lBQ25DLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFO1NBQ3BDLENBQUM7SUFJRSxDQUFDO0lBakRJLElBQUksZUFBZSxDQUFDLGVBQWlDO1FBQzVELE1BQU0saUJBQWlCLEdBQUcsSUFBSSxHQUFHLEVBQVUsQ0FBQztRQUM1QyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsZUFBZSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRTtZQUMvQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQy9CLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxpQkFBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDdEQsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLEVBQUUsS0FB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