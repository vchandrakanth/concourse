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
const helpers_1 = require("../helpers");
let PolicyTemplateFormComponent = class PolicyTemplateFormComponent {
    constructor(parentForm) {
        this.parentForm = parentForm;
        this._attributes = new Map();
        this.tooltipConfig = [
            { label: 'Claims', prop: 'claims' },
            { label: 'Proofs', prop: 'proofs' }
        ];
    }
    set policyTemplate(value) {
        // this.formGroup.addControl(`${value.id}`, new FormArray([new FormControl(this.control)]));
        this._policyTemplate = value;
    }
    get policyTemplate() {
        return this._policyTemplate;
    }
    set formValues(attributeValues) {
        // this.attributeValues = attributeValues;
        this._attributeValues = attributeValues;
    }
    set policies(policies) {
        this._policies = new Map(policies.map((policy) => [policy.policyTemplate.id, policy.attributeValues]));
    }
    set policyTemplates(policyTemplates) {
        const policyTemplateSet = new Set();
        this._policyTemplates = policyTemplates.map(pt => {
            policyTemplateSet.add(`${pt.id}`);
            // this.formGroup.addControl(`${pt.id}`, new FormGroup({}));
            // (this.formGroup.get(`${pt.id}`) as FormArray).at(this.policyControlPathIndex).setValue(new FormGroup({}))
            this.formGroup.addControl(`${pt.id}`, new forms_1.FormArray([new forms_1.FormGroup({})]));
            return pt;
        });
        for (const controlName in this.formGroup.controls) {
            if (this.formGroup.controls.hasOwnProperty(controlName) &&
                controlName !== 'selectedPolicyGroupTemplate' &&
                !policyTemplateSet.has(controlName)) {
                this.formGroup.removeControl(controlName);
            }
        }
        policyTemplates.forEach(pt => pt.attributes.forEach(a => this._attributes.set(a.id, a.multipleValued)));
    }
    get policyTemplates() {
        return this._policyTemplates;
    }
    get formGroup() {
        return this.parentForm.form.get('policies');
    }
    // tslint:disable-next-line:adjacent-overload-signatures
    get formValues() {
        return this._attributeValues;
    }
    trackPT(index, pt) {
        return `${index}_${pt.name}`;
    }
    /**
     * returns an array of Attribute Values
     * used with @addAndPopulateTemplate
     */
    getAttributeValues(policyTemplateId) {
        if (!helpers_1.Util.isUndefined(this._policies) && this._policies.size !== 0) {
            return this._policies.get(policyTemplateId);
        }
        return [];
    }
    /**
     * called by child form template components
     * this targets the specific policy template by its ID
     * Then it adds the FormGroup declared on the child form template component to the parent form
     */
    addAndPopulateTemplate(policyTemplateId, childForm) {
        this._policyTemplate.attributes.forEach(a => this._attributes.set(a.id, a.multipleValued));
        // BAD
        // const policyFormArray = this.formGroup.get(`${policyTemplateId}`) as FormArray;
        // policyFormArray.at(this.policyControlPathIndex).setValue(childForm)
        // GOOD
        this.formGroup.setControl(`${policyTemplateId}.${this.policyControlPathIndex}`, childForm);
        // this.parentForm.addFormGroup(childForm)
        // this.group = childForm;
        /**
         * used when loading existing values into the form
         */
        // const attributeValues = this.getAttributeValues(policyTemplateId);
        const attributeValues = this.formValues;
        // Abhinavs code, investigate if this is necessary
        if (helpers_1.Util.isArray(attributeValues) && attributeValues.length > 0) {
            const value = attributeValues.reduce((acc, av) => (Object.assign(Object.assign({}, acc), { [av.attribute.id]: this._attributes.get(av.attribute.id) ? JSON.parse(av.value) : av.parsedValue })), {});
            if (childForm instanceof forms_1.FormArray) {
                childForm.patchValue([value], { onlySelf: true, emitEvent: true });
                childForm.updateValueAndValidity({ onlySelf: false, emitEvent: true });
            }
            if (childForm instanceof forms_1.FormGroup) {
                childForm.patchValue(value, { onlySelf: true, emitEvent: true });
                childForm.updateValueAndValidity({ onlySelf: false, emitEvent: true });
            }
        }
        return;
        // if (this.formGroup.get(`policies.${policyTemplateId}`)) {
        // }
        // this.formGroup.setControl(`${policyTemplateId}`, formGroup);
        const formArray = this.formGroup.get(`${policyTemplateId}`);
        const controlIndex = formArray.controls[this.policyControlPathIndex];
        // formArray.push(childForm);
        // const formArray = this.formGroup.get(`10013`) as FormArray;
        // this.formGroup.controls.push()
    }
};
__decorate([
    core_1.Input()
], PolicyTemplateFormComponent.prototype, "policyTemplate", null);
__decorate([
    core_1.Input()
], PolicyTemplateFormComponent.prototype, "formValues", null);
__decorate([
    core_1.Input()
], PolicyTemplateFormComponent.prototype, "policies", null);
__decorate([
    core_1.Input()
], PolicyTemplateFormComponent.prototype, "policyTemplates", null);
__decorate([
    core_1.Input()
], PolicyTemplateFormComponent.prototype, "group", void 0);
__decorate([
    core_1.Input()
], PolicyTemplateFormComponent.prototype, "policyControlPath", void 0);
__decorate([
    core_1.Input()
], PolicyTemplateFormComponent.prototype, "policyControlPathIndex", void 0);
PolicyTemplateFormComponent = __decorate([
    core_1.Component({
        exportAs: 'policyTemplateForm',
        selector: 'app-policy-template-form-v2',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9saWN5LXRlbXBsYXRlLWZvcm0uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3NoYXJlZC9wb2xpY3ktdGVtcGxhdGUtZm9ybS12Mi9wb2xpY3ktdGVtcGxhdGUtZm9ybS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBMEU7QUFDMUUsMENBT3dCO0FBU3hCLHdDQUFrQztBQWNsQyxJQUFhLDJCQUEyQixHQUF4QyxNQUFhLDJCQUEyQjtJQWdGdEMsWUFDbUIsVUFBOEI7UUFBOUIsZUFBVSxHQUFWLFVBQVUsQ0FBb0I7UUFuQnZDLGdCQUFXLEdBQUcsSUFBSSxHQUFHLEVBQW1CLENBQUM7UUFXMUMsa0JBQWEsR0FBcUI7WUFDekMsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUU7WUFDbkMsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUU7U0FDcEMsQ0FBQztJQU1FLENBQUM7SUFoRkksSUFBSSxjQUFjLENBQUMsS0FBcUI7UUFFL0MsNEZBQTRGO1FBRTVGLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO0lBQy9CLENBQUM7SUFDRCxJQUFJLGNBQWM7UUFDaEIsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDO0lBQzlCLENBQUM7SUFFUSxJQUFJLFVBQVUsQ0FBQyxlQUFpQztRQUV2RCwwQ0FBMEM7UUFDMUMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLGVBQWUsQ0FBQztJQUUxQyxDQUFDO0lBRVEsSUFBSSxRQUFRLENBQUMsUUFBa0I7UUFDdEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUF1QyxFQUFFLENBQ3BGLENBQUMs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