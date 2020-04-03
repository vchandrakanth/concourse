"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const faSpinner_1 = require("@fortawesome/free-solid-svg-icons/faSpinner");
const models_1 = require("@concourse/core/models");
let PolicyViolationsDetailsComponent = class PolicyViolationsDetailsComponent {
    constructor() {
        this.isLoading = false;
        this.debugDetails = new Map();
        this.icons = { faSpinner: faSpinner_1.faSpinner };
    }
    get undefinedState() {
        return !(this.violationResponse instanceof models_1.CommonEvaluation);
    }
    get noEvaluationsRun() {
        return !this.undefinedState && Object.keys(this.violationResponse).length === 0;
    }
    get violationCount() {
        return this.violationResponse.policyViolations.length;
    }
    showDebugInfo(uNum, violation) {
        if (this.debugDetails.has(uNum)) {
            this.debugDetails.delete(uNum);
        }
        else {
            this.debugDetails.set(uNum, JSON.parse(violation.resources));
        }
    }
};
__decorate([
    core_1.Input()
], PolicyViolationsDetailsComponent.prototype, "isLoading", void 0);
__decorate([
    core_1.Input()
], PolicyViolationsDetailsComponent.prototype, "violationResponse", void 0);
PolicyViolationsDetailsComponent = __decorate([
    core_1.Component({
        selector: 'app-policy-violations-details',
        templateUrl: './policy-violations-details.component.html',
        styleUrls: ['./policy-violations-details.component.scss']
    })
], PolicyViolationsDetailsComponent);
exports.PolicyViolationsDetailsComponent = PolicyViolationsDetailsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9saWN5LXZpb2xhdGlvbnMtZGV0YWlscy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc2hhcmVkL2NvbXBvbmVudHMvcG9saWN5LXZpb2xhdGlvbnMtZGV0YWlscy9wb2xpY3ktdmlvbGF0aW9ucy1kZXRhaWxzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUFpRDtBQUNqRCwyRUFBd0U7QUFFeEUsbURBQXFFO0FBT3JFLElBQWEsZ0NBQWdDLEdBQTdDLE1BQWEsZ0NBQWdDO0lBQTdDO1FBQ1csY0FBUyxHQUFHLEtBQUssQ0FBQztRQWUzQixpQkFBWSxHQUFHLElBQUksR0FBRyxFQUFlLENBQUM7UUFDN0IsVUFBSyxHQUFHLEVBQUUsU0FBUyxFQUFULHFCQUFTLEVBQUUsQ0FBQztJQVVqQyxDQUFDO0lBdkJDLElBQUksY0FBYztRQUNoQixPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLFlBQVkseUJBQWdCLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRUQsSUFBSSxnQkFBZ0I7UUFDbEIsT0FBTyxDQUFDLElBQUksQ0FBQyxjQUFjLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDO0lBQ2xGLENBQUM7SUFFRCxJQUFJLGNBQWM7UUFDaEIsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDO0lBQ3hELENBQUM7SUFLRCxhQUFhLENBQUMsSUFBWSxFQUFFLFNBQW9CO1FBQzlDLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDL0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDaEM7YUFBTTtZQUNMLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1NBQzlEO0lBQ0gsQ0FBQztDQUVGLENBQUE7QUExQlU7SUFBUixZQUFLLEVBQUU7bUVBQW1CO0FBQ2xCO0lBQVIsWUFBSyxFQUFFOzJFQUFxQztBQUZsQyxnQ0FBZ0M7SUFMNUMsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSwrQkFBK0I7UUFDekMsV0FBVyxFQUFFLDRDQUE0QztRQUN6RCxTQUFTLEVBQUUsQ0FBQyw0Q0FBNEMsQ0FBQztLQUMxRCxDQUFDO0dBQ1csZ0NBQWdDLENBMkI1QztBQTNCWSw0RUFBZ0MifQ==