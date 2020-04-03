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
const operators_1 = require("rxjs/operators");
let RequireApprovalComponent = class RequireApprovalComponent {
    constructor(fb, groupsFacade, ptfComponent) {
        this.fb = fb;
        this.groupsFacade = groupsFacade;
        this.ptfComponent = ptfComponent;
        this.form = this.fb.group({
            30006: [undefined, forms_1.Validators.required],
            30007: [undefined, forms_1.Validators.required],
            30008: [undefined, forms_1.Validators.required] // Approval Groups
        });
        this.entityEvents = {
            POLICY_GROUP: ['PUBLISH', 'DELETE'],
            DEPLOYMENT: ['CREATE', 'UPDATE', 'DELETE'],
            MODEL: ['PUBLISH', 'DELETE'],
            CLOUD_ROLE: ['PUBLISH', 'DELETE'],
            BASELINE: ['PUBLISH', 'DELETE'],
            LOGICAL_BASELINE_DEPLOYMENT: ['PUBLISH', 'DELETE']
        };
        this.eventList$ = this.form.get('30006').valueChanges.pipe(operators_1.distinctUntilChanged(), operators_1.tap(x => this.form.get('30007').reset()), operators_1.map(a => this.entityEvents[a]));
        this.approvalGroups$ = this.groupsFacade.list$;
    }
    ngOnInit() {
        this.ptfComponent.addAndPopulateTemplate(this.policyTemplate.id, this.form);
    }
};
RequireApprovalComponent = __decorate([
    core_1.Component({
        selector: 'app-require-approval.component',
        templateUrl: './require-approval.component.html',
        styleUrls: ['./require-approval.component.scss']
    })
], RequireApprovalComponent);
exports.RequireApprovalComponent = RequireApprovalComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWlyZS1hcHByb3ZhbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc2hhcmVkL3BvbGljeS10ZW1wbGF0ZS1mb3JtLXYyL3RlbXBsYXRlcy9yZXF1aXJlLWFwcHJvdmFsL3JlcXVpcmUtYXBwcm92YWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBQWtEO0FBQ2xELDBDQUF5RDtBQUV6RCw4Q0FBd0Y7QUFZeEYsSUFBYSx3QkFBd0IsR0FBckMsTUFBYSx3QkFBd0I7SUF3Qm5DLFlBQ21CLEVBQWUsRUFDZixZQUF5QixFQUN6QixZQUF5QztRQUZ6QyxPQUFFLEdBQUYsRUFBRSxDQUFhO1FBQ2YsaUJBQVksR0FBWixZQUFZLENBQWE7UUFDekIsaUJBQVksR0FBWixZQUFZLENBQTZCO1FBekI1RCxTQUFJLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7WUFDbkIsS0FBSyxFQUFFLENBQUMsU0FBUyxFQUFFLGtCQUFVLENBQUMsUUFBUSxDQUFDO1lBQ3ZDLEtBQUssRUFBRSxDQUFDLFNBQVMsRUFBRSxrQkFBVSxDQUFDLFFBQVEsQ0FBQztZQUN2QyxLQUFLLEVBQUUsQ0FBQyxTQUFTLEVBQUUsa0JBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxrQkFBa0I7U0FDM0QsQ0FBQyxDQUFDO1FBRUgsaUJBQVksR0FBRztZQUNiLFlBQVksRUFBRSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUM7WUFDbkMsVUFBVSxFQUFFLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUM7WUFDMUMsS0FBSyxFQUFFLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQztZQUM1QixVQUFVLEVBQUUsQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDO1lBQ2pDLFFBQVEsRUFBRSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUM7WUFDL0IsMkJBQTJCLEVBQUUsQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDO1NBQ25ELENBQUM7UUFFRixlQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsWUFBWSxDQUFDLElBQUksQ0FDbkQsZ0NBQW9CLEVBQUUsRUFDdEIsZUFBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsRUFDeEMsZUFBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUMvQixDQUFDO1FBQ0Ysb0JBQWUsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQztJQU10QyxDQUFDO0lBRUwsUUFBUTtRQUNOLElBQUksQ0FBQyxZQUFZLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlFLENBQUM7Q0FFRixDQUFBO0FBbENZLHdCQUF3QjtJQUxwQyxnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLGdDQUFnQztRQUMxQyxXQUFXLEVBQUUsbUNBQW1DO1FBQ2hELFNBQVMsRUFBRSxDQUFDLG1DQUFtQyxDQUFDO0tBQ2pELENBQUM7R0FDVyx3QkFBd0IsQ0FrQ3BDO0FBbENZLDREQUF3QiJ9