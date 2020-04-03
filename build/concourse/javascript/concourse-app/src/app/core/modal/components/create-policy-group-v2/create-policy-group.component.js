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
const faEdit_1 = require("@fortawesome/free-solid-svg-icons/faEdit");
const faSearch_1 = require("@fortawesome/free-solid-svg-icons/faSearch");
const faTimes_1 = require("@fortawesome/free-solid-svg-icons/faTimes");
const operators_1 = require("@concourse/core/operators");
const operators_2 = require("rxjs/operators");
const models_1 = require("@concourse/core/models");
const search_actions_component_1 = require("@concourse/shared/components/search-actions/search-actions.component");
const helpers_1 = require("@concourse/shared/helpers");
let CreatePolicyGroupV2Component = class CreatePolicyGroupV2Component {
    constructor(fb, policyGroupTemplateFacade, policyGroupFacade, policyViolationFacade, attributeTagFacade, surfaceLayerFacade) {
        this.fb = fb;
        this.policyGroupTemplateFacade = policyGroupTemplateFacade;
        this.policyGroupFacade = policyGroupFacade;
        this.policyViolationFacade = policyViolationFacade;
        this.attributeTagFacade = attributeTagFacade;
        this.surfaceLayerFacade = surfaceLayerFacade;
        this.surfaceLayers$ = this.surfaceLayerFacade.listWithChildrenBySurface$;
        this.policyGroupTemplates$ = this.policyGroupTemplateFacade.publishedList$;
        this.attributeTagsOptions$ = this.attributeTagFacade.list$;
        this.owningGroupOptions$ = this.policyGroupFacade.selectableOwningGroups$;
        this.evaluatedPolicyGroup$ = this.policyViolationFacade.evaluatedPolicyGroup$;
        this.isUpdating$ = this.policyGroupFacade.isUpdating$;
        this.isEvaluationPending$ = this.policyViolationFacade.isEvaluationPending$;
        this.icons = { faTimes: faTimes_1.faTimes, faEdit: faEdit_1.faEdit, faSearch: faSearch_1.faSearch };
        this.form = this.fb.group({
            generalInfo: this.fb.group({}),
            selectedPolicyGroupTemplate: [undefined, forms_1.Validators.required],
            policies: this.fb.group({}),
            relationships: this.fb.group({
                surfaceLayers: [undefined],
                attributeTagIds: ['']
            }),
            eval: this.fb.group({})
        });
        this.searchForm = this.fb.group({
            textSearch: ['']
        });
    }
    get formValues() {
        return this.form.value;
    }
    get submittedPolicyGroup() {
        const _a = this.formValues.generalInfo, { versionBump } = _a, generalInfo = __rest(_a, ["versionBump"]);
        const { surfaceLayers, attributeTagIds } = this.formValues.relationships;
        const selectedPolicyGroupTemplate = this.formValues.selectedPolicyGroupTemplate;
        //       if (Object.values(attributeValueFormData).length > 0) {
        //         value = !Array.isArray(attributeValueFormData[a.name]) ?
        //           [attributeValueFormData[a.name]] :
        //           // multipleValue can either be array of objects with an id property or an array of strings
        //           attributeValueFormData[a.name].map(av => av.hasOwnProperty('id') ? av.id : av.hasOwnProperty('customResource') ? av['customResource'] : av);
        //         value = JSON.stringify(value);
        //       }
        return new models_1.PolicyGroup().deserialize(Object.assign(Object.assign({}, generalInfo), { policies: this.selectedPolicies, policyGroupTemplate: { id: selectedPolicyGroupTemplate.id }, surfaceLayerIds: Array.isArray(surfaceLayers) ? surfaceLayers.map(sl => sl.id) : [], attributeTagIds: Array.isArray(attributeTagIds) ? attributeTagIds : [] }));
    }
    get selectedPolicies() {
        if (!helpers_1.Util.isNullOrUndefined(this.formValues.policies)) {
            const selectedPolicyGroupTemplate = this.formValues.selectedPolicyGroupTemplate;
            return Object.entries(this.formValues.policies).reduce((acc, [policyTemplateId, attributeValues]) => [
                ...acc,
                ...(helpers_1.Util.isArray(attributeValues) ? attributeValues.map(attributeValue => ({
                    policyTemplate: Object.assign({}, selectedPolicyGroupTemplate.policyTemplates.find(pt => pt.id === +policyTemplateId)),
                    attributeValues: Object.entries(attributeValue).map(([attributeId, value]) => ({
                        attribute: Object.assign({}, this.getPolicyTemplate(policyTemplateId).attributes.find(a => a.id === +attributeId)),
                        // TODO: Potentially more we need to do here, would like it if we didn't and just made the forms output the right values.
                        value: JSON.stringify(helpers_1.Util.isArray(value) ? value : [value]),
                        entityValues: (value || [])
                    }))
                })) : []),
                ...(!helpers_1.Util.isArray(attributeValues) ? [{
                        policyTemplate: Object.assign({}, selectedPolicyGroupTemplate.policyTemplates.find(pt => pt.id === +policyTemplateId)),
                        attributeValues: Object.entries(attributeValues).map(([attributeId, value]) => ({
                            attribute: Object.assign({}, this.getPolicyTemplate(policyTemplateId).attributes.find(a => a.id === +attributeId)),
                            // TODO: Potentially more we need to do here, would like it if we didn't and just made the forms output the right values.
                            value: JSON.stringify(helpers_1.Util.isArray(value) ? value : [value]),
                            entityValues: value
                        }))
                    }] : [])
            ], []);
        }
        return [];
    }
    ngOnInit() {
        this.searchForm.get('textSearch').valueChanges.pipe(operators_2.filter(s => s.length > 2 || s.length === 0), operators_2.debounceTime(search_actions_component_1.SEARCH_DEBOUNCE_TIME), operators_1.untilDestroy(this)).subscribe(searchText => {
            this.policyGroupTemplateFacade.resetSearch();
            if (searchText.length) {
                this.policyGroupTemplateFacade.search(searchText);
            }
        });
    }
    getPolicyTemplate(policyTemplateId) {
        const selectedPolicyGroupTemplate = this.formValues.selectedPolicyGroupTemplate;
        return Object.assign({}, selectedPolicyGroupTemplate.policyTemplates.find(pt => pt.id === +policyTemplateId));
    }
    ngOnDestroy() {
        this.policyGroupTemplateFacade.resetSearch();
    }
    selectPolicyGroupTemplate(pgt) {
        this.form.get('selectedPolicyGroupTemplate').setValue(pgt);
    }
    submit() {
        const { versionBump, status } = this.form.value.generalInfo;
        this.policyGroupFacade.create(this.submittedPolicyGroup, status === 'PUBLISHED' ? versionBump : '');
    }
    stepEvent(step) {
        if (step.formGroupName === 'eval') {
            this.policyViolationFacade.evaluatePolicyGroup(this.submittedPolicyGroup.serialize());
        }
        if (step.formGroupName === 'policies') {
        }
    }
    trackPolicies(_index, policy) {
        return policy.policyTemplate.id;
    }
};
CreatePolicyGroupV2Component = __decorate([
    core_1.Component({
        selector: 'app-create-policy-group-v2',
        templateUrl: './create-policy-group.component.html',
        styleUrls: ['./create-policy-group.component.scss']
    })
], CreatePolicyGroupV2Component);
exports.CreatePolicyGroupV2Component = CreatePolicyGroupV2Component;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXBvbGljeS1ncm91cC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvY29yZS9tb2RhbC9jb21wb25lbnRzL2NyZWF0ZS1wb2xpY3ktZ3JvdXAtdjIvY3JlYXRlLXBvbGljeS1ncm91cC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHdDQUE2RDtBQUM3RCwwQ0FBeUQ7QUFDekQscUVBQWtFO0FBQ2xFLHlFQUFzRTtBQUN0RSx1RUFBb0U7QUFFcEUseURBQXlEO0FBQ3pELDhDQUFzRDtBQUV0RCxtREFBa0Y7QUFDbEYsbUhBQTRHO0FBQzVHLHVEQUFpRDtBQWVqRCxJQUFhLDRCQUE0QixHQUF6QyxNQUFhLDRCQUE0QjtJQWdGdkMsWUFDbUIsRUFBZSxFQUNmLHlCQUFvRCxFQUNwRCxpQkFBb0MsRUFDcEMscUJBQTRDLEVBQzVDLGtCQUFzQyxFQUN0QyxrQkFBc0M7UUFMdEMsT0FBRSxHQUFGLEVBQUUsQ0FBYTtRQUNmLDhCQUF5QixHQUF6Qix5QkFBeUIsQ0FBMkI7UUFDcEQsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQywwQkFBcUIsR0FBckIscUJBQXFCLENBQXVCO1FBQzVDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDdEMsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQXJGekQsbUJBQWMsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsMEJBQTBCLENBQUM7UUFDcEUsMEJBQXFCLEdBQUcsSUFBSSxDQUFDLHlCQUF5QixDQUFDLGNBQWMsQ0FBQztRQUN0RSwwQkFBcUIsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDO1FBQ3RELHdCQUFtQixHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FB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