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
const faTimes_1 = require("@fortawesome/free-solid-svg-icons/faTimes");
let CreatePolicyGroupTemplateComponent = class CreatePolicyGroupTemplateComponent {
    constructor(fb, policyTemplateFacade, policyGroupTemplateFacade) {
        this.fb = fb;
        this.policyTemplateFacade = policyTemplateFacade;
        this.policyGroupTemplateFacade = policyGroupTemplateFacade;
        this.policyTemplatesByCategory$ = this.policyTemplateFacade.listByCategory$;
        this.updating$ = this.policyGroupTemplateFacade.isUpdating$;
        this.category$ = this.policyTemplateFacade.selected$;
        this.selectedPolicyTemplates = new Map();
        this.icons = { faTimes: faTimes_1.faTimes, faEdit: faEdit_1.faEdit };
        this.tooltipConfig = [
            { label: 'Claims', prop: 'claims' },
            { label: 'Proofs', prop: 'proofs' }
        ];
        this.form = this.fb.group({
            generalInfo: this.fb.group({}),
            policyTemplates: this.fb.group({
                templates: ['', forms_1.Validators.required]
            }),
            review: this.fb.group({})
        });
    }
    get formValues() {
        return this.form.value;
    }
    get submittedPolicyGroupTemplate() {
        const _a = this.formValues.generalInfo, { versionBump } = _a, generalInfo = __rest(_a, ["versionBump"]);
        const policyTemplates = this.formValues.policyTemplates.templates;
        return Object.assign(Object.assign({}, generalInfo), { policyTemplates: policyTemplates.map(pt => ({ id: pt.id })) });
    }
    selectPolicyTemplate(policyTemplate) {
        if (this.selectedPolicyTemplates.has(policyTemplate.id)) {
            this.selectedPolicyTemplates.delete(policyTemplate.id);
        }
        else {
            this.selectedPolicyTemplates.set(policyTemplate.id, policyTemplate);
        }
        this.form.get('policyTemplates.templates').setValue(Array.from(this.selectedPolicyTemplates.values()));
    }
    selectCategory(category) {
        this.policyTemplateFacade.getPolicyTemplatesByCategory(category);
    }
    submit() {
        const { versionBump, status } = this.formValues.generalInfo;
        this.policyGroupTemplateFacade.create(this.submittedPolicyGroupTemplate, status === 'PUBLISHED' ? versionBump : '');
    }
};
CreatePolicyGroupTemplateComponent = __decorate([
    core_1.Component({
        selector: 'app-create-policy-group-template',
        templateUrl: './create-policy-group-template.component.html',
        styleUrls: ['./create-policy-group-template.component.scss']
    })
], CreatePolicyGroupTemplateComponent);
exports.CreatePolicyGroupTemplateComponent = CreatePolicyGroupTemplateComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXBvbGljeS1ncm91cC10ZW1wbGF0ZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvY29yZS9tb2RhbC9jb21wb25lbnRzL2NyZWF0ZS1wb2xpY3ktZ3JvdXAtdGVtcGxhdGUvY3JlYXRlLXBvbGljeS1ncm91cC10ZW1wbGF0ZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHdDQUEwQztBQUMxQywwQ0FBeUQ7QUFDekQscUVBQWtFO0FBQ2xFLHVFQUFvRTtBQVVwRSxJQUFhLGtDQUFrQyxHQUEvQyxNQUFhLGtDQUFrQztJQWlDN0MsWUFDbUIsRUFBZSxFQUNmLG9CQUEwQyxFQUMxQyx5QkFBb0Q7UUFGcEQsT0FBRSxHQUFGLEVBQUUsQ0FBYTtRQUNmLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFDMUMsOEJBQXlCLEdBQXpCLHlCQUF5QixDQUEyQjtRQW5DdkUsK0JBQTBCLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGVBQWUsQ0FBQztRQUN2RSxjQUFTLEdBQUcsSUFBSSxDQUFDLHlCQUF5QixDQUFDLFdBQVcsQ0FBQztRQUN2RCxjQUFTLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFNBQVMsQ0FBQztRQUNoRCw0QkFBdUIsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQzNCLFVBQUssR0FBRyxFQUFFLE9BQU8sRUFBUCxpQkFBTyxFQUFFLE1BQU0sRUFBTixlQUFNLEVBQUUsQ0FBQztRQUNyQyxrQkFBYSxHQUFxQjtZQUNoQyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRTtZQUNuQyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRTtTQUNwQyxDQUFDO1FBRUYsU0FBSSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO1lBQ25CLFdBQVcsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUMxQixDQUFDO1lBQ0YsZUFBZSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO2dCQUM3QixTQUFTLEVBQUUsQ0FBQyxFQUFFLEVBQUUsa0JBQVUsQ0FBQyxRQUFRLENBQUM7YUFDckMsQ0FBQztZQUNGLE1BQU0sRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7U0FDMUIsQ0FBQyxDQUFDO0lBbUJDLENBQUM7SUFqQkwsSUFBSSxVQUFVO1FBQ1osT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUN6QixDQUFDO0lBRUQsSUFBSSw0QkFBNEI7UUFDOUIsTUFBTSxnQ0FBNkQsRUFBN0QsRUFBRSxXQUFXLE9BQWdELEVBQTlDLHlDQUE4QyxDQUFDO1FBQ3BFLE1BQU0sZUFBZSxHQUFxQixJQUFJLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUM7UUFDcEYsdUNBQ0ssV0FBVyxLQUNkLGVBQWUsRUFBRSxlQUFlLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUMzRDtJQUNKLENBQUM7SUFRRCxvQkFBb0IsQ0FBQyxjQUE4QjtRQUNqRCxJQUFJLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxFQUFFO1lBQ3ZELElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ3hEO2FBQU07WUFDTCxJQUFJLENBQUMsdUJBQXVCLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxFQUFFLEVBQUUsY0FBYyxDQUFDLENBQUM7U0FDckU7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDekcsQ0FBQztJQUVELGNBQWMsQ0FBQyxRQUFnQjtRQUM3QixJQUFJLENBQUMsb0JBQW9CLENBQUMsNEJBQTRCLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDbkUsQ0FBQztJQUVELE1BQU07UUFDSixNQUFNLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDO1FBQzVELElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLDRCQUE0QixFQUFFLE1BQU0sS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDdEgsQ0FBQztDQUNGLENBQUE7QUF4RFksa0NBQWtDO0lBTDlDLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsa0NBQWtDO1FBQzVDLFdBQVcsRUFBRSwrQ0FBK0M7UUFDNUQsU0FBUyxFQUFFLENBQUMsK0NBQStDLENBQUM7S0FDN0QsQ0FBQztHQUNXLGtDQUFrQyxDQXdEOUM7QUF4RFksZ0ZBQWtDIn0=