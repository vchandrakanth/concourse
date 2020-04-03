"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const faArrowLeft_1 = require("@fortawesome/free-solid-svg-icons/faArrowLeft");
const faEdit_1 = require("@fortawesome/free-solid-svg-icons/faEdit");
const faSearch_1 = require("@fortawesome/free-solid-svg-icons/faSearch");
const faTimes_1 = require("@fortawesome/free-solid-svg-icons/faTimes");
const operators_1 = require("@concourse/core/operators");
const operators_2 = require("rxjs/operators");
const models_1 = require("@concourse/core/models");
const search_actions_component_1 = require("@concourse/shared/components/search-actions/search-actions.component");
const helpers_1 = require("@concourse/shared/helpers");
let CreatePolicyGroupV3Component = class CreatePolicyGroupV3Component {
    constructor(fb, policyGroupTemplateFacade, policyGroupFacade, policyViolationFacade, attributeTagFacade, surfaceLayerFacade, toastr) {
        this.fb = fb;
        this.policyGroupTemplateFacade = policyGroupTemplateFacade;
        this.policyGroupFacade = policyGroupFacade;
        this.policyViolationFacade = policyViolationFacade;
        this.attributeTagFacade = attributeTagFacade;
        this.surfaceLayerFacade = surfaceLayerFacade;
        this.toastr = toastr;
        this.surfaceLayers$ = this.surfaceLayerFacade.listWithChildrenBySurface$;
        this.policyGroupTemplates$ = this.policyGroupTemplateFacade.publishedList$;
        this.attributeTagsOptions$ = this.attributeTagFacade.list$;
        this.owningGroupOptions$ = this.policyGroupFacade.selectableOwningGroups$;
        this.evaluatedPolicyGroup$ = this.policyViolationFacade.evaluatedPolicyGroup$;
        this.isUpdating$ = this.policyGroupFacade.isUpdating$;
        this.isEvaluationPending$ = this.policyViolationFacade.isEvaluationPending$;
        this.icons = { faTimes: faTimes_1.faTimes, faEdit: faEdit_1.faEdit, faSearch: faSearch_1.faSearch, faArrowLeft: faArrowLeft_1.faArrowLeft };
        this.searchForm = this.fb.group({
            textSearch: ['']
        });
        this.activeControl = '';
        this.selectedAPolicyTemplate = false;
        this.assessmentOpen = false;
        this.form = this.fb.group({
            generalInfo: this.fb.group({
                name: [undefined, forms_1.Validators.required],
                description: [undefined, [forms_1.Validators.required, forms_1.Validators.minLength(3)]],
                owningGroupId: [undefined, forms_1.Validators.required],
                status: ['DRAFT', forms_1.Validators.required],
                versionBump: ['MINOR']
            }),
            selectedPolicyGroupTemplate: [undefined, forms_1.Validators.required],
            policies: this.fb.group({}),
            relationships: this.fb.group({
                surfaceLayers: [undefined],
                attributeTagIds: ['']
            }),
            eval: this.fb.group({})
        });
    }
    get formValues() {
        return this.form.value;
    }
    get submittedPolicyGroup() {
        const _a = this.formValues.generalInfo, { versionBump } = _a, generalInfo = __rest(_a, ["versionBump"]);
        const { surfaceLayers, attributeTagIds } = this.formValues.relationships;
        const selectedPolicyGroupTemplate = this.formValues.selectedPolicyGroupTemplate;
        return new models_1.PolicyGroup().deserialize(Object.assign(Object.assign({}, generalInfo), { 
            // policies: this.selectedPolicies,
            policies: this.getFormattedPolicies(), policyGroupTemplate: { id: selectedPolicyGroupTemplate.id }, surfaceLayerIds: Array.isArray(surfaceLayers) ? surfaceLayers.map(sl => sl.id) : [], attributeTagIds: Array.isArray(attributeTagIds) ? attributeTagIds : [] }));
    }
    get selectedPolicies() {
        if (!helpers_1.Util.isNullOrUndefined(this.formValues.policies)) {
            return this.formValues.policies;
            // const selectedPolicyGroupTemplate = this.formValues.selectedPolicyGroupTemplate;
            // return Object.entries(this.formValues.policies).reduce((acc, [policyTemplateId, attributeValues]) => [
            //   ...acc,
            //   ...(Util.isArray(attributeValues) ? attributeValues.map(attributeValue => ({
            //     policyTemplate: { ...selectedPolicyGroupTemplate.policyTemplates.find(pt => pt.id === +policyTemplateId) },
            //     attributeValues: Object.entries(attributeValue).map(([attributeId, value]) => ({
            //       attribute: { ...this.getPolicyTemplate(policyTemplateId).attributes.find(a => a.id === +attributeId) },
            //       // TODO: Potentially more we need to do here, would like it if we didn't and just made the forms output the right values.
            //       value: JSON.stringify(Util.isArray(value) ? value : [value]),
            //       entityValues: (value || [])
            //     }))
            //   })) : []),
            //   ...(!Util.isArray(attributeValues) ? [{
            //     policyTemplate: { ...selectedPolicyGroupTemplate.policyTemplates.find(pt => pt.id === +policyTemplateId) },
            //     attributeValues: Object.entries(attributeValues).map(([attributeId, value]) => ({
            //       attribute: { ...this.getPolicyTemplate(policyTemplateId).attributes.find(a => a.id === +attributeId) },
            //       // TODO: Potentially more we need to do here, would like it if we didn't and just made the forms output the right values.
            //       value: JSON.stringify(Util.isArray(value) ? value : [value]),
            //       entityValues: value
            //     }))
            //   }] : [])
            // ], []);
        }
        return [];
    }
    // remove policy control from polices FormGroup.
    removePolicyControl(templateId, index) {
        this.form.get('policies').removeControl(`${templateId}.${index}`);
    }
    getPolicyTemplate(policyTemplateId) {
        const selectedPolicyGroupTemplate = this.formValues.selectedPolicyGroupTemplate;
        return Object.assign({}, selectedPolicyGroupTemplate.policyTemplates.find(pt => pt.id === +policyTemplateId));
    }
    ngOnInit() {
        this.searchForm.get('textSearch').valueChanges.pipe(operators_2.filter(s => s.length > 2 || s.length === 0), operators_2.debounceTime(search_actions_component_1.SEARCH_DEBOUNCE_TIME), operators_1.untilDestroy(this)).subscribe(searchText => {
            this.policyGroupTemplateFacade.resetSearch();
            if (searchText.length) {
                this.policyGroupTemplateFacade.search(searchText);
            }
        });
    }
    ngOnDestroy() {
        this.policyGroupTemplateFacade.resetSearch();
    }
    /**
     * when a user selects a policy template we have to build the 'policies' form group
     * this.form.policies will be { id: FormArray, id: FormArray }
     */
    selectPolicyGroupTemplate(pgt) {
        this.selectedPolicyGroupTemplate = pgt;
        this.selectedAPolicyTemplate = true;
        const templates = pgt.policyTemplates;
        this.form.get('selectedPolicyGroupTemplate').setValue(pgt);
        this.form.get('policies').controls = {};
        /**
         * add a control for each template id
         * then we have to load the template as a new FormGroup or maybe its FormControl?
         */
        for (const template of templates) {
            this.form.get('policies').addControl(`${template.id}`, this.fb.array([new forms_1.FormGroup({})]));
        }
    }
    trackPolicies(_index, policy) {
        return policy.policyTemplate.id;
    }
    getPolicyFormArrayById(id) {
        if (this.form.get(`policies.${id}`)) {
            return this.form.get(`policies.${id}`);
        }
        return [];
    }
    onAddPolicyTemplateInstance(template, e) {
        e.preventDefault();
        this.getPolicyFormArrayById(template.id).push(new forms_1.FormGroup({}));
    }
    onRemovePolicyTemplateInstance(template, e, index) {
        e.preventDefault();
        e.stopPropagation();
        this.getPolicyFormArrayById(template.id).removeAt(index);
        this.removePolicyControl(template.id, index);
    }
    getPolicyControlPath(policyId) {
        return `policies.${policyId}`;
    }
    onSetActivePolicyControl(control, index) {
        this.activeControl = `${control.name}_${index}`;
    }
    isCurrentlyActive(control, index) {
        if (`${control.name}_${index}` === this.activeControl) {
            return true;
        }
        return false;
    }
    /**
     * looks through the selected policy group template to determine if the policy has attributes
     * non configurable policies do not have attributes
     */
    isANonConfigurablePolicy(policyTemplateId) {
        const selectedPGT = this.selectedPolicyGroupTemplate;
        for (const pt of selectedPGT.policyTemplates) {
            if (Number(policyTemplateId) === Number(pt.id)) {
                if (pt.attributes.length === 0) {
                    return true;
                }
            }
        }
        return false;
    }
    getFormattedPolicies() {
        if (!helpers_1.Util.isNullOrUndefined(this.formValues.policies)) {
            const selectedPolicyGroupTemplate = this.formValues.selectedPolicyGroupTemplate;
            return Object.entries(this.formValues.policies).reduce((acc, [policyTemplateId, attributeValues]) => {
                const isANonConfigurablePolicy = this.isANonConfigurablePolicy(policyTemplateId);
                if (policyTemplateId.includes('.') || isANonConfigurablePolicy) {
                    return [
                        ...acc,
                        ...(helpers_1.Util.isArray(attributeValues) ? attributeValues.map(attributeValue => ({
                            policyTemplate: Object.assign({}, selectedPolicyGroupTemplate.policyTemplates.find(pt => pt.id === +policyTemplateId.split('.')[0])),
                            attributeValues: Object.entries(attributeValue).map(([attributeId, value]) => ({
                                attribute: { id: +attributeId },
                                // TODO: Potentially more we need to do here, would like it if we didn't and just made the forms output the right values.
                                value: JSON.stringify(helpers_1.Util.isArray(value) ? value : [value]),
                                entityValues: (value || [])
                            }))
                        })) : []),
                        ...(!helpers_1.Util.isArray(attributeValues) ? [{
                                policyTemplate: Object.assign({}, selectedPolicyGroupTemplate.policyTemplates.find(pt => pt.id === +policyTemplateId.split('.')[0])),
                                attributeValues: Object.entries(attributeValues).map(([attributeId, value]) => ({
                                    attribute: { id: +attributeId },
                                    // TODO: Potentially more we need to do here, would like it if we didn't and just made the forms output the right values.
                                    value: JSON.stringify(helpers_1.Util.isArray(value) ? value : [value]),
                                    entityValues: value
                                }))
                            }] : [])
                    ];
                }
                else {
                    return acc;
                }
            }, []);
        }
        return [];
    }
    onToggleAssessment() {
        this.assessmentOpen = !this.assessmentOpen;
        return this.assessmentOpen;
    }
    eval(e) {
        e.preventDefault();
        if (!this.selectedAPolicyTemplate) {
            this.toastr.warning('No Template Selected');
        }
        const policies = this.getFormattedPolicies();
        // this.policyViolationFacade.evaluatePolicyGroup(this.formValues);
        const policyGroup = this.submittedPolicyGroup.serialize();
        for (const pg of policyGroup.policies) {
            for (const attributeValue of pg.attributeValues) {
                // attributeValue.value = JSON.stringify(attributeValue.value);
                // if(attributeValue.value =)
                // tslint:disable-next-line:max-line-length
                // attributeValue.value = Util.isArray(attributeValue.value) ? JSON.stringify(attributeValue.value) : JSON.stringify([attributeValue.value]);
                // attributeValue.value = JSON.stringify(attributeValue.value);
                // attributeValue.value = attributeValue.value;
            }
        }
        this.policyViolationFacade.evaluatePolicyGroup(policyGroup);
        // this.policyViolationFacade.evaluatePolicyGroup(this.formValues);
    }
    submit() {
        const { versionBump, status } = this.form.value.generalInfo;
        this.policyGroupFacade.create(this.submittedPolicyGroup, status === 'PUBLISHED' ? versionBump : '');
    }
};
CreatePolicyGroupV3Component = __decorate([
    core_1.Component({
        selector: 'app-create-policy-group-v3',
        templateUrl: './create-policy-group.component.html',
        styleUrls: ['./create-policy-group.component.scss']
    })
], CreatePolicyGroupV3Component);
exports.CreatePolicyGroupV3Component = CreatePolicyGroupV3Component;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXBvbGljeS1ncm91cC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvY29yZS9tb2RhbC9jb21wb25lbnRzL2NyZWF0ZS1wb2xpY3ktZ3JvdXAtdjMvY3JlYXRlLXBvbGljeS1ncm91cC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHdDQUE2RDtBQUM3RCwwQ0FBK0U7QUFDL0UsK0VBQTRFO0FBQzVFLHFFQUFrRTtBQUNsRSx5RUFBc0U7QUFDdEUsdUVBQW9FO0FBRXBFLHlEQUF5RDtBQUN6RCw4Q0FBc0Q7QUFFdEQsbURBQWtHO0FBQ2xHLG1IQUE0RztBQUM1Ryx1REFBaUQ7QUFlakQsSUFBYSw0QkFBNEIsR0FBekMsTUFBYSw0QkFBNEI7SUFtR3ZDLFlBQ21CLEVBQWUsRUFDZix5QkFBb0QsRUFDcEQsaUJBQW9DLEVBQ3BDLHFCQUE0QyxFQUM1QyxrQkFBc0MsRUFDdEMsa0JBQXNDLEVBQ3RDLE1BQXFCO1FBTnJCLE9BQUUsR0FBRixFQUFFLENBQWE7UUFDZiw4QkFBeUIsR0FBekIseUJBQXlCLENBQTJCO1FBQ3BELHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDcEMsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUF1QjtRQUM1Qyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQ3RDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDdEMsV0FBTSxHQUFOLE1BQU0sQ0FBZTtRQXZEeEMsbUJBQWMsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsMEJBQTBCLENBQUM7UUFDcEUsMEJBQXFCLEdBQUcsSUFBSSxDQUFDLHlCQUF5QixDQUFDLGNBQWMsQ0FBQztRQUN0RSwwQkFBcUIsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENB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