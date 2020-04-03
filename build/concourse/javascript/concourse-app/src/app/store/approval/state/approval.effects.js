"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const effects_1 = require("@ngrx/effects");
const operators_1 = require("@concourse/core/operators");
const operators_2 = require("rxjs/operators");
const toast_actions_1 = require("@concourse/core/toast/toast.actions");
const logical_deployment_actions_1 = require("@concourse/store/logical-deployment/state/logical-deployment.actions");
const user_actions_1 = require("@concourse/store/user/state/user.actions");
const approval_actions_1 = require("./approval.actions");
let ApprovalEffects = class ApprovalEffects {
    constructor(actions$, approvalApi) {
        this.actions$ = actions$;
        this.approvalApi = approvalApi;
        this.loadApprovalRequests$ = this.actions$.pipe(effects_1.ofType(approval_actions_1.ApprovalActionTypes.LoadApprovalRequests), operators_2.switchMap(_ => this.approvalApi.list().pipe(operators_2.map(approvals => new approval_actions_1.LoadApprovalRequestsSuccess(approvals)), operators_1.handleError('toast', new approval_actions_1.LoadApprovalRequestsFailure()))));
        this.loadApprovalRequest$ = this.actions$.pipe(effects_1.ofType(approval_actions_1.ApprovalActionTypes.LoadApprovalRequest), operators_2.map((action) => action.payload), operators_2.switchMap(payload => this.approvalApi.get(payload).pipe(operators_2.map(approvalRequest => new approval_actions_1.LoadApprovalRequestSuccess(approvalRequest)), operators_1.handleError('toast', new approval_actions_1.LoadApprovalRequestFailure()))));
        this.approvalRequestAction$ = this.actions$.pipe(effects_1.ofType(approval_actions_1.ApprovalActionTypes.ApprovalRequestAction), operators_2.map((action) => action.payload), operators_2.concatMap(({ approvalRequestId, approvalAction }) => this.approvalApi.postAction(approvalRequestId, approvalAction).pipe(operators_2.mergeMap(newApprovalAction => [
            new approval_actions_1.ApprovalRequestActionSuccess({ approvalRequestId, approvalAction: newApprovalAction }),
            new toast_actions_1.OpenToast({ message: 'Action Posted', type: 'success' }),
            new approval_actions_1.LoadApprovalRequest(approvalRequestId)
        ]), operators_1.handleError('toast', new approval_actions_1.ApprovalRequestActionFailure()))));
        this.loadApprovalRequestByRequestEntityId$ = this.actions$.pipe(effects_1.ofType(approval_actions_1.ApprovalActionTypes.LoadApprovalRequestByRequestEntityId), operators_2.map((action) => action.payload), operators_2.switchMap(payload => this.approvalApi.getByRequestEntityId(payload).pipe(operators_2.map(approvalRequests => new approval_actions_1.LoadApprovalRequestByRequestEntityIdSuccess(approvalRequests)), operators_1.handleError('toast', new approval_actions_1.LoadApprovalRequestByRequestEntityIdFailure()))));
        this.loadApprovalOnNav$ = this.actions$.pipe(operators_1.ofRoute(['/workflows/approvals/:id']), operators_2.map((action) => action.payload), operators_2.mergeMap(route => [
            new user_actions_1.LoadUsers(),
            new logical_deployment_actions_1.LoadLogicalDeployments(),
            new approval_actions_1.LoadApprovalRequest(+route.params['id']),
            new approval_actions_1.SelectApprovalRequest(+route.params['id'])
        ]));
    }
};
__decorate([
    effects_1.Effect()
], ApprovalEffects.prototype, "loadApprovalRequests$", void 0);
__decorate([
    effects_1.Effect()
], ApprovalEffects.prototype, "loadApprovalRequest$", void 0);
__decorate([
    effects_1.Effect()
], ApprovalEffects.prototype, "approvalRequestAction$", void 0);
__decorate([
    effects_1.Effect()
], ApprovalEffects.prototype, "loadApprovalRequestByRequestEntityId$", void 0);
__decorate([
    effects_1.Effect()
], ApprovalEffects.prototype, "loadApprovalOnNav$", void 0);
ApprovalEffects = __decorate([
    core_1.Injectable()
], ApprovalEffects);
exports.ApprovalEffects = ApprovalEffects;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwcm92YWwuZWZmZWN0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zdG9yZS9hcHByb3ZhbC9zdGF0ZS9hcHByb3ZhbC5lZmZlY3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBQTJDO0FBQzNDLDJDQUF3RDtBQUd4RCx5REFBaUU7QUFFakUsOENBQXFFO0FBR3JFLHVFQUFnRTtBQUNoRSxxSEFBOEc7QUFDOUcsMkVBQXFFO0FBRXJFLHlEQWM0QjtBQUc1QixJQUFhLGVBQWUsR0FBNUIsTUFBYSxlQUFlO0lBMkQxQixZQUNtQixRQUFpQixFQUNqQixXQUE0QjtRQUQ1QixhQUFRLEdBQVIsUUFBUSxDQUFTO1FBQ2pCLGdCQUFXLEdBQVgsV0FBVyxDQUFpQjtRQTNEckMsMEJBQXFCLEdBQXVCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUN0RSxnQkFBTSxDQUFDLHNDQUFtQixDQUFDLG9CQUFvQixDQUFDLEVBQ2hELHFCQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FDWixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FDMUIsZUFBRyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsSUFBSSw4Q0FBMkIsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUM1RCx1QkFBVyxDQUFDLE9BQU8sRUFBRSxJQUFJLDhDQUEyQixFQUFFLENBQUMsQ0FDeEQsQ0FBQyxDQUNMLENBQUM7UUFFUSx5QkFBb0IsR0FBdUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQ3JFLGdCQUFNLENBQUMsc0NBQW1CLENBQUMsbUJBQW1CLENBQUMsRUFDL0MsZUFBRyxDQUFDLENBQUMsTUFBMkIsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUNwRCxxQkFBUyxDQUFDLE9B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