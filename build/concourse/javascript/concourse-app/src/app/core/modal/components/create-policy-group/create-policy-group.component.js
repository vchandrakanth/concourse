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
let CreatePolicyGroupComponent = class CreatePolicyGroupComponent {
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
            policyGroupTemplate: this.fb.group({
                selectedPolicyGroupTemplate: ['', forms_1.Validators.required]
            }),
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
        const selectedPolicyGroupTemplate = this.formValues.policyGroupTemplate.selectedPolicyGroupTemplate;
        const policyTemplates = this.formValues.policyGroupTemplate.selectedPolicyGroupTemplate.policyTemplates;
        const policies = policyTemplates.map(pt => {
            const attributeValueFormData = this.formValues.policyGroupTemplate[pt.name];
            return {
                policyTemplate: { id: pt.id },
                attributeValues: pt.attributes.map(a => {
                    let value = '';
                    if (Object.values(attributeValueFormData).length > 0) {
                        value = !helpers_1.Util.isArray(attributeValueFormData[a.name]) ?
                            [attributeValueFormData[a.name]] :
                            // multipleValue can either be array of objects with an id property or an array of strings
                            attributeValueFormData[a.name].map(av => av.hasOwnProperty('id') ? av.id : av.hasOwnProperty('customResource') ? av['customResource'] : av);
                        value = JSON.stringify(value);
                    }
                    return {
                        attribute: { id: a.id },
                        value
                    };
                })
            };
        });
        return Object.assign(Object.assign({}, generalInfo), { policies, policyGroupTemplate: { id: selectedPolicyGroupTemplate.id }, surfaceLayerIds: Array.isArray(surfaceLayers) ? surfaceLayers.map(sl => sl.id) : [], attributeTagIds: Array.isArray(attributeTagIds) ? attributeTagIds : [] });
    }
    get selectedPolicies() {
        const policyTemplates = this.formValues.policyGroupTemplate.selectedPolicyGroupTemplate.policyTemplates;
        return policyTemplates.map(pt => {
            const attributeValueFormData = this.formValues.policyGroupTemplate[pt.name] || {};
            return new models_1.Policy().deserialize({
                policyTemplate: pt,
                name: pt.name,
                attributeValues: pt.attributes.map(a => {
                    let value;
                    let parsedValue = '';
                    if (Object.values(attributeValueFormData).length > 0) {
                        value = !Array.isArray(attributeValueFormData[a.name]) ?
                            [attributeValueFormData[a.name]] : attributeValueFormData[a.name];
                        parsedValue = JSON.stringify(value);
                    }
                    return {
                        attribute: a,
                        value: parsedValue,
                        entityValues: value
                    };
                })
            });
        });
    }
    ngOnDestroy() {
        this.policyGroupTemplateFacade.resetSearch();
    }
    selectPolicyGroupTemplate(pgt) {
        this.form.get('policyGroupTemplate.selectedPolicyGroupTemplate').setValue(pgt);
    }
    submit() {
        const { versionBump, status } = this.form.value.generalInfo;
        this.policyGroupFacade.create(this.submittedPolicyGroup, status === 'PUBLISHED' ? versionBump : '');
    }
    stepEvent(step) {
        if (step.formGroupName === 'eval') {
            this.policyViolationFacade.evaluatePolicyGroup(this.submittedPolicyGroup);
        }
        if (step.formGroupName === 'policyGroupTemplate') {
            this.searchForm.get('textSearch').valueChanges.pipe(operators_2.filter(s => s.length > 2 || s.length === 0), operators_2.debounceTime(search_actions_component_1.SEARCH_DEBOUNCE_TIME), operators_1.untilDestroy(this)).subscribe(searchText => {
                this.policyGroupTemplateFacade.resetSearch();
                if (searchText.length) {
                    this.policyGroupTemplateFacade.search(searchText);
                }
            });
        }
    }
};
CreatePolicyGroupComponent = __decorate([
    core_1.Component({
        selector: 'app-create-policy-group',
        templateUrl: './create-policy-group.component.html',
        styleUrls: ['./create-policy-group.component.scss']
    })
], CreatePolicyGroupComponent);
exports.CreatePolicyGroupComponent = CreatePolicyGroupComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXBvbGljeS1ncm91cC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvY29yZS9tb2RhbC9jb21wb25lbnRzL2NyZWF0ZS1wb2xpY3ktZ3JvdXAvY3JlYXRlLXBvbGljeS1ncm91cC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHdDQUFxRDtBQUNyRCwwQ0FBeUQ7QUFDekQscUVBQWtFO0FBQ2xFLHlFQUFzRTtBQUN0RSx1RUFBb0U7QUFFcEUseURBQXlEO0FBQ3pELDhDQUFzRDtBQUV0RCxtREFBa0Y7QUFDbEYsbUhBQTRHO0FBQzVHLHVEQUFpRDtBQWVqRCxJQUFhLDBCQUEwQixHQUF2QyxNQUFhLDBCQUEwQjtJQXlGckMsWUFDbUIsRUFBZSxFQUNmLHlCQUFvRCxFQUNwRCxpQkFBb0MsRUFDcEMscUJBQTRDLEVBQzVDLGtCQUFzQyxFQUN0QyxrQkFBc0M7UUFMdEMsT0FBRSxHQUFGLEVBQUUsQ0FBYTtRQUNmLDhCQUF5QixHQUF6Qix5QkFBeUIsQ0FBMkI7UUFDcEQsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQywwQkFBcUIsR0FBckIscUJBQXFCLENBQXVCO1FBQzVDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDdEMsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQTlGekQsbUJBQWMsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsMEJBQTBCLENBQUM7UUFDcEUsMEJBQXFCLEdBQUcsSUFBSSxDQUFDLHlCQUF5QixDQUFDLGNBQWMsQ0FBQztRQUN0RSwwQkFBcUIsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDO1FBQ3RELHdCQUFtQixHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyx1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