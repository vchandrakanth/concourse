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
const policy_violation_actions_1 = require("./policy-violation.actions");
let PolicyViolationEffects = class PolicyViolationEffects {
    constructor(actions$, policyViolationApi) {
        this.actions$ = actions$;
        this.policyViolationApi = policyViolationApi;
        this.evaluateUnsavedEnclaveModel$ = this.actions$.pipe(effects_1.ofType(policy_violation_actions_1.PolicyViolationActionTypes.EvaluateUnsavedEnclaveModel), operators_2.map((action) => action.payload), operators_2.switchMap(payload => this.policyViolationApi.evaluateUnsavedEnclaveModel(payload).pipe(operators_2.map(data => new policy_violation_actions_1.EvaluateUnsavedEnclaveModelSuccess(data)), operators_1.handleError('toast', new policy_violation_actions_1.PolicyEvaluationFailure()))));
        this.evaluateSavedEnclaveModel$ = this.actions$.pipe(effects_1.ofType(policy_violation_actions_1.PolicyViolationActionTypes.EvaluateSavedEnclaveModel), operators_2.map((action) => action.payload), operators_2.switchMap(({ modelId, surfaceLayerId, policyGroupId }) => this.policyViolationApi.evaluateSavedEnclaveModel(modelId, surfaceLayerId, policyGroupId).pipe(operators_2.map(data => new policy_violation_actions_1.EvaluateSavedEnclaveModelSuccess(data)), operators_1.handleError('toast', new policy_violation_actions_1.PolicyEvaluationFailure()))));
        this.evaluateUnsavedPolicyGroup$ = this.actions$.pipe(effects_1.ofType(policy_violation_actions_1.PolicyViolationActionTypes.EvaluateUnsavedPolicyGroup), operators_2.map((action) => action.payload), operators_2.switchMap(payload => this.policyViolationApi.evaluateUnsavedPolicyGroup(payload).pipe(operators_2.map(data => new policy_violation_actions_1.EvaluatePolicyGroupSuccess(data)), operators_1.handleError('toast', new policy_violation_actions_1.PolicyEvaluationFailure()))));
        this.evaluatedSavedPolicyGroup$ = this.actions$.pipe(effects_1.ofType(policy_violation_actions_1.PolicyViolationActionTypes.EvaluateSavedPolicyGroup), operators_2.map((action) => action.payload), operators_2.switchMap(payload => this.policyViolationApi.evaluateSavedPolicyGroup(payload).pipe(operators_2.map(data => new policy_violation_actions_1.EvaluatePolicyGroupSuccess(data)), operators_1.handleError('toast', new policy_violation_actions_1.PolicyEvaluationFailure()))));
        this.evaluateLogicalDeployment$ = this.actions$.pipe(effects_1.ofType(policy_violation_actions_1.PolicyViolationActionTypes.EvaluateLogicalDeployment), operators_2.map((action) => action.payload), operators_2.switchMap(({ surfaceLayerId, ldId }) => this.policyViolationApi.evaluateLogicalDeployment(surfaceLayerId, ldId).pipe(operators_2.map(data => new policy_violation_actions_1.EvaluateLogicalDeploymentSuccess(data)), operators_1.handleError('toast', new policy_violation_actions_1.PolicyEvaluationFailure()))));
    }
};
__decorate([
    effects_1.Effect()
], PolicyViolationEffects.prototype, "evaluateUnsavedEnclaveModel$", void 0);
__decorate([
    effects_1.Effect()
], PolicyViolationEffects.prototype, "evaluateSavedEnclaveModel$", void 0);
__decorate([
    effects_1.Effect()
], PolicyViolationEffects.prototype, "evaluateUnsavedPolicyGroup$", void 0);
__decorate([
    effects_1.Effect()
], PolicyViolationEffects.prototype, "evaluatedSavedPolicyGroup$", void 0);
__decorate([
    effects_1.Effect()
], PolicyViolationEffects.prototype, "evaluateLogicalDeployment$", void 0);
PolicyViolationEffects = __decorate([
    core_1.Injectable()
], PolicyViolationEffects);
exports.PolicyViolationEffects = PolicyViolationEffects;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9saWN5LXZpb2xhdGlvbi5lZmZlY3RzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3N0b3JlL3BvbGljeS12aW9sYXRpb24vc3RhdGUvcG9saWN5LXZpb2xhdGlvbi5lZmZlY3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBQTJDO0FBQzNDLDJDQUF3RDtBQUd4RCx5REFBd0Q7QUFFeEQsOENBQWdEO0FBR2hELHlFQVlvQztBQUdwQyxJQUFhLHNCQUFzQixHQUFuQyxNQUFhLHNCQUFzQjtJQXdEakMsWUFDbUIsUUFBaUIsRUFDakIsa0JBQTBDO1FBRDFDLGFBQVEsR0FBUixRQUFRLENBQVM7UUFDakIsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUF3QjtRQXpEbkQsaUNBQTRCLEdBQXVCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUM3RSxnQkFBTSxDQUFDLHFEQUEwQixDQUFDLDJCQUEyQixDQUFDLEVBQzlELGVBQUcsQ0FBQyxDQUFDLE1BQW1DLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFDNUQscUJBQVMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUNsQixJQUFJLENBQUMsa0JBQWtCLENBQUMsMkJBQTJCLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUMvRCxlQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLDZEQUFrQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQ3pELHVCQUFXLENBQUMsT0FBTyxFQUFFLElBQUksa0RBQXVCLEVBQUUsQ0FBQyxDQUNwRCxDQUNGLENBQ0YsQ0FBQztRQUVRLCtCQUEwQixHQUF1QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FDM0UsZ0JBQU0sQ0FBQyxxREFBMEIsQ0FBQyx5QkFBeUIsQ0FBQyxFQUM1RCxlQUFH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