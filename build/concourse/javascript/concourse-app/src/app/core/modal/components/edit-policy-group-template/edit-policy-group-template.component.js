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
const faTimes_1 = require("@fortawesome/free-solid-svg-icons/faTimes");
let EditPolicyGroupTemplateComponent = class EditPolicyGroupTemplateComponent {
    constructor(policyGroupTemplateFacade, fb) {
        this.policyGroupTemplateFacade = policyGroupTemplateFacade;
        this.fb = fb;
        this.icons = { faTimes: faTimes_1.faTimes };
        this.selectedPolicyGroupTemplate$ = this.policyGroupTemplateFacade.selectedWithRelated$;
        this.form = this.fb.group({
            generalInfo: this.fb.group({}),
        });
    }
    submit(pgt) {
        const _a = this.form.value.generalInfo, { versionBump } = _a, data = __rest(_a, ["versionBump"]);
        if (pgt.policyTemplates.length === 0) {
            const message = 'A PolicyGroupTemplate requires PolicyTemplates.';
            return this.policyGroupTemplateFacade.openToaster(message);
        }
        this.policyGroupTemplateFacade.updateDetails(pgt.copyWith(Object.assign({}, data)), versionBump);
    }
};
EditPolicyGroupTemplateComponent = __decorate([
    core_1.Component({
        selector: 'app-edit-policy-group-template',
        templateUrl: './edit-policy-group-template.component.html',
        styleUrls: []
    })
], EditPolicyGroupTemplateComponent);
exports.EditPolicyGroupTemplateComponent = EditPolicyGroupTemplateComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC1wb2xpY3ktZ3JvdXAtdGVtcGxhdGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL2NvcmUvbW9kYWwvY29tcG9uZW50cy9lZGl0LXBvbGljeS1ncm91cC10ZW1wbGF0ZS9lZGl0LXBvbGljeS1ncm91cC10ZW1wbGF0ZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHdDQUEwQztBQUUxQyx1RUFBb0U7QUFVcEUsSUFBYSxnQ0FBZ0MsR0FBN0MsTUFBYSxnQ0FBZ0M7SUFPM0MsWUFDbUIseUJBQW9ELEVBQ3BELEVBQWU7UUFEZiw4QkFBeUIsR0FBekIseUJBQXlCLENBQTJCO1FBQ3BELE9BQUUsR0FBRixFQUFFLENBQWE7UUFSekIsVUFBSyxHQUFHLEVBQUUsT0FBTyxFQUFQLGlCQUFPLEVBQUUsQ0FBQztRQUM3QixpQ0FBNEIsR0FBRyxJQUFJLENBQUMseUJBQXlCLENBQUMsb0JBQW9CLENBQUM7UUFDbkYsU0FBSSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO1lBQ25CLFdBQVcsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUMxQixDQUFDO1NBQ0gsQ0FBQyxDQUFBO0lBSUUsQ0FBQztJQUVMLE1BQU0sQ0FBQyxHQUF3QjtRQUM3QixNQUFNLGdDQUFzRCxFQUF0RCxFQUFFLFdBQVcsT0FBeUMsRUFBdkMsa0NBQXVDLENBQUM7UUFFN0QsSUFBSSxHQUFHLENBQUMsZUFBZSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDcEMsTUFBTSxPQUFPLEdBQUcsaURBQWlELENBQUM7WUFDbEUsT0FBTyxJQUFJLENBQUMseUJBQXlCLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQzVEO1FBQ0QsSUFBSSxDQUFDLHlCQUF5QixDQUFDLGFBQWEsQ0FDMUMsR0FBRyxDQUFDLFFBQVEsbUJBQU0sSUFBSSxFQUFHLEVBQ3pCLFdBQVcsQ0FDWixDQUFDO0lBQ0osQ0FBQztDQUNGLENBQUE7QUF4QlksZ0NBQWdDO0lBTDVDLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsZ0NBQWdDO1FBQzFDLFdBQVcsRUFBRSw2Q0FBNkM7UUFDMUQsU0FBUyxFQUFFLEVBQUU7S0FDZCxDQUFDO0dBQ1csZ0NBQWdDLENBd0I1QztBQXhCWSw0RUFBZ0MifQ==