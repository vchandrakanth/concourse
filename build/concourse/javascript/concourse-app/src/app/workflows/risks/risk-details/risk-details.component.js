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
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const comment_box_form_component_1 = require("../../shared/comment-box-form/comment-box-form.component");
let RiskDetailsComponent = class RiskDetailsComponent {
    constructor(userFacade, policyResolutionFacade, policyViolationFacade) {
        this.userFacade = userFacade;
        this.policyResolutionFacade = policyResolutionFacade;
        this.policyViolationFacade = policyViolationFacade;
        this.isLoaded$ = this.policyResolutionFacade.isLoaded$;
        this.policyResolution$ = this.policyResolutionFacade.selected$;
        this.evaluation$ = rxjs_1.race(this.policyViolationFacade.savedModelEvaluation$.pipe(operators_1.map(e => e.evaluation)), this.policyViolationFacade.logicalDeploymentEvaluation$.pipe(operators_1.map(e => e.evaluation)));
        this.assigneeList$ = this.userFacade.list$.pipe(operators_1.map(users => users.map(u => ({ id: u.id, text: `${u.name} <${u.email}>` }))));
    }
    submit(action, policyResolution) {
        const form = this.commentForm.commentForm;
        Object.values(form.controls).forEach(control => {
            control.clearValidators();
        });
        if (action === 'ASSIGN') {
            form.get('assignedUserId').setValidators([forms_1.Validators.required]);
        }
        if (action === 'COMMENT') {
            form.get('comment').setValidators([forms_1.Validators.required, forms_1.Validators.minLength(1)]);
        }
        Object.values(form.controls).forEach(control => {
            control.markAsDirty();
            control.updateValueAndValidity();
        });
        if (this.commentForm.valid) {
            const request = {
                type: action,
                comment: this.commentForm.value.comment,
                assignedUserId: this.commentForm.value.assignedUserId
            };
            this.policyResolutionFacade.post(policyResolution.id, request);
        }
    }
};
__decorate([
    core_1.ViewChild(comment_box_form_component_1.CommentBoxFormComponent)
], RiskDetailsComponent.prototype, "commentForm", void 0);
RiskDetailsComponent = __decorate([
    core_1.Component({
        selector: 'app-risk-details',
        templateUrl: './risk-details.component.html',
        styleUrls: ['./risk-details.component.scss']
    })
], RiskDetailsComponent);
exports.RiskDetailsComponent = RiskDetailsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmlzay1kZXRhaWxzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC93b3JrZmxvd3Mvcmlza3Mvcmlzay1kZXRhaWxzL3Jpc2stZGV0YWlscy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBcUQ7QUFDckQsMENBQTRDO0FBRTVDLCtCQUE0QjtBQUM1Qiw4Q0FBcUM7QUFJckMseUdBQW1HO0FBT25HLElBQWEsb0JBQW9CLEdBQWpDLE1BQWEsb0JBQW9CO0lBWS9CLFlBQ21CLFVBQXNCLEVBQ3RCLHNCQUE4QyxFQUM5QyxxQkFBNEM7UUFGNUMsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QiwyQkFBc0IsR0FBdEIsc0JBQXNCLENBQXdCO1FBQzlDLDBCQUFxQixHQUFyQixxQkFBcUIsQ0FBdUI7UUFiL0QsY0FBUyxHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxTQUFTLENBQUM7UUFDbEQsc0JBQWlCLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFNBQVMsQ0FBQztRQUMxRCxnQkFBVyxHQUFHLFdBQUksQ0FDaEIsSUFBSSxDQUFDLHFCQUFxQixDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxlQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsRUFDN0UsSUFBSSxDQUFDLHFCQUFxQixDQUFDLDRCQUE0QixDQUFDLElBQUksQ0FBQyxlQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FDckYsQ0FBQztRQUNGLGtCQUFhLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUN4QyxlQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQzdFLENBQUM7SUFNRSxDQUFDO0lBRUwsTUFBTSxDQUFDLE1BQTRCLEVBQUUsZ0JBQWtDO1FBQ3JFLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDO1FBRTFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUM3QyxPQUFPLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDNUIsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLE1BQU0sS0FBSyxRQUFRLEVBQUU7WUFDdkIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLGtCQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztTQUNqRTtRQUVELElBQUksTUFBTSxLQUFLLFNBQVMsRUFBRTtZQUN4QixJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLGtCQUFVLENBQUMsUUFBUSxFQUFFLGtCQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNuRjtRQUVELE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUM3QyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDdEIsT0FBTyxDQUFDLHNCQUFzQixFQUFFLENBQUM7UUFDbkMsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFO1lBQzFCLE1BQU0sT0FBTyxHQUFHO2dCQUNkLElBQUksRUFBRSxNQUFNO2dCQUNaLE9BQU8sRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPO2dCQUN2QyxjQUFjLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsY0FBYzthQUN0RCxDQUFDO1lBQ0YsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7U0FDaEU7SUFDSCxDQUFDO0NBQ0YsQ0FBQTtBQTlDcUM7SUFBbkMsZ0JBQVMsQ0FBQyxvREFBdUIsQ0FBQzt5REFBc0M7QUFEOUQsb0JBQW9CO0lBTGhDLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsa0JBQWtCO1FBQzVCLFdBQVcsRUFBRSwrQkFBK0I7UUFDNUMsU0FBUyxFQUFFLENBQUMsK0JBQStCLENBQUM7S0FDN0MsQ0FBQztHQUNXLG9CQUFvQixDQStDaEM7QUEvQ1ksb0RBQW9CIn0=