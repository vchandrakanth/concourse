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
let ResidentLimitPolicyTemplateComponent = class ResidentLimitPolicyTemplateComponent {
    constructor(fb, ptfComponent) {
        this.fb = fb;
        this.ptfComponent = ptfComponent;
        this.form = this.fb.group({
            30040: ['SQL', forms_1.Validators.required],
            30041: ['{}', forms_1.Validators.required],
            30042: [0, forms_1.Validators.required] // resident limit.
        });
        this.codeMirrorOptions = {
            mode: 'application/json',
            gutters: ['CodeMirror-lint-markers'],
            lineNumbers: true,
            lineWrapping: true,
            autoCloseTags: true,
            styleActiveLine: true,
            lint: true
        };
    }
    ngOnInit() {
        this.ptfComponent.addAndPopulateTemplate(this.policyTemplate.id, this.form);
    }
};
ResidentLimitPolicyTemplateComponent = __decorate([
    core_1.Component({
        selector: 'app-resident-limit-policy-template',
        templateUrl: './resident-limit-policy-template.component.html',
        styleUrls: ['./resident-limit-policy-template.component.scss']
    })
], ResidentLimitPolicyTemplateComponent);
exports.ResidentLimitPolicyTemplateComponent = ResidentLimitPolicyTemplateComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaWRlbnQtbGltaXQtcG9saWN5LXRlbXBsYXRlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zaGFyZWQvcG9saWN5LXRlbXBsYXRlLWZvcm0tdjIvdGVtcGxhdGVzL3Jlc2lkZW50LWxpbWl0LXBvbGljeS10ZW1wbGF0ZS9yZXNpZGVudC1saW1pdC1wb2xpY3ktdGVtcGxhdGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBQWtEO0FBQ2xELDBDQUF5RDtBQVN6RCxJQUFhLG9DQUFvQyxHQUFqRCxNQUFhLG9DQUFvQztJQWtCL0MsWUFDbUIsRUFBZSxFQUNmLFlBQXlDO1FBRHpDLE9BQUUsR0FBRixFQUFFLENBQWE7UUFDZixpQkFBWSxHQUFaLFlBQVksQ0FBNkI7UUFsQjVELFNBQUksR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztZQUNuQixLQUFLLEVBQUUsQ0FBQyxLQUFLLEVBQUUsa0JBQVUsQ0FBQyxRQUFRLENBQUM7WUFDbkMsS0FBSyxFQUFFLENBQUMsSUFBSSxFQUFFLGtCQUFVLENBQUMsUUFBUSxDQUFDO1lBQ2xDLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxrQkFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLGtCQUFrQjtTQUNuRCxDQUFDLENBQUM7UUFFSCxzQkFBaUIsR0FBRztZQUNsQixJQUFJLEVBQUUsa0JBQWtCO1lBQ3hCLE9BQU8sRUFBRSxDQUFDLHlCQUF5QixDQUFDO1lBQ3BDLFdBQVcsRUFBRSxJQUFJO1lBQ2pCLFlBQVksRUFBRSxJQUFJO1lBQ2xCLGFBQWEsRUFBRSxJQUFJO1lBQ25CLGVBQWUsRUFBRSxJQUFJO1lBQ3JCLElBQUksRUFBRSxJQUFJO1NBQ1gsQ0FBQztJQUtFLENBQUM7SUFFTCxRQUFRO1FBQ04sSUFBSSxDQUFDLFlBQVksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUUsQ0FBQztDQUVGLENBQUE7QUEzQlksb0NBQW9DO0lBTGhELGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsb0NBQW9DO1FBQzlDLFdBQVcsRUFBRSxpREFBaUQ7UUFDOUQsU0FBUyxFQUFFLENBQUMsaURBQWlELENBQUM7S0FDL0QsQ0FBQztHQUNXLG9DQUFvQyxDQTJCaEQ7QUEzQlksb0ZBQW9DIn0=