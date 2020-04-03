"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const store_1 = require("@ngrx/store");
const operators_1 = require("rxjs/operators");
const selectors_1 = require("@concourse/store/selectors");
const policy_violation_actions_1 = require("./policy-violation.actions");
const query = require("./policy-violation.selectors");
let PolicyViolationFacade = class PolicyViolationFacade {
    constructor(store) {
        this.store = store;
        this.isEvaluationPending$ = this.store.pipe(store_1.select(query.isEvaluationPending));
        this.evaluatedPolicyGroup$ = this.store.pipe(store_1.select(selectors_1.getEvaluatedPolicyGroupWithRelated), operators_1.filter(response => !!response));
        this.unsavedModelEvaluation$ = this.store.pipe(store_1.select(selectors_1.getUnsavedModelEvaluationWithRelated), operators_1.filter(response => !!response));
        this.savedModelEvaluation$ = this.store.pipe(store_1.select(selectors_1.getSavedModelEvaluationWithRelated), operators_1.filter(response => !!response));
        this.logicalDeploymentEvaluation$ = this.store.pipe(store_1.select(selectors_1.getLogicalDeploymentEvaluationWithRelated), operators_1.filter(response => !!response));
    }
    evaluateUnsavedEnclaveModel(enclave) {
        this.store.dispatch(new policy_violation_actions_1.ClearEvaluation());
        this.store.dispatch(new policy_violation_actions_1.EvaluateUnsavedEnclaveModel(enclave));
    }
    evaluateSavedEnclaveModel(modelId, surfaceLayerId) {
        this.store.dispatch(new policy_violation_actions_1.ClearEvaluation());
        this.store.dispatch(new policy_violation_actions_1.EvaluateSavedEnclaveModel({ modelId, surfaceLayerId }));
    }
    evaluatePolicyGroup(policyGroup) {
        this.store.dispatch(new policy_violation_actions_1.ClearEvaluation());
        this.store.dispatch(new policy_violation_actions_1.EvaluateUnsavedPolicyGroup(policyGroup));
    }
    evaluateSavedPolicyGroupEvaluation(policyGroupId) {
        this.store.dispatch(new policy_violation_actions_1.ClearEvaluation());
        this.store.dispatch(new policy_violation_actions_1.EvaluateSavedPolicyGroup(policyGroupId));
    }
};
PolicyViolationFacade = __decorate([
    core_1.Injectable()
], PolicyViolationFacade);
exports.PolicyViolationFacade = PolicyViolationFacade;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9saWN5LXZpb2xhdGlvbi5mYWNhZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc3RvcmUvcG9saWN5LXZpb2xhdGlvbi9zdGF0ZS9wb2xpY3ktdmlvbGF0aW9uLmZhY2FkZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUEyQztBQUMzQyx1Q0FBNEM7QUFFNUMsOENBQXdDO0FBR3hDLDBEQUtvQztBQUNwQyx5RUFNb0M7QUFFcEMsc0RBQXNEO0FBR3RELElBQWEscUJBQXFCLEdBQWxDLE1BQWEscUJBQXFCO0lBbUJoQyxZQUNtQixLQUFtQjtRQUFuQixVQUFLLEdBQUwsS0FBSyxDQUFjO1FBbkJ0Qyx5QkFBb0IsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFNLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQztRQUMxRSwwQkFBcUIsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FDckMsY0FBTSxDQUFDLDhDQUFrQyxDQUFDLEVBQzFDLGtCQUFNLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQy9CLENBQUM7UUFDRiw0QkFBdUIsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FDdkMsY0FBTSxDQUFDLGdEQUFvQyxDQUFDLEVBQzVDLGtCQUFNLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQy9CLENBQUM7UUFDRiwwQkFBcUIsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FDckMsY0FBTSxDQUFDLDhDQUFrQyxDQUFDLEVBQzFDLGtCQUFNLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQy9CLENBQUM7UUFDRixpQ0FBNEIsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FDNUMsY0FBTSxDQUFDLHFEQUF5QyxDQUFDLEVBQ2pELGtCQUFNLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQy9CLENBQUM7SUFJRSxDQUFDO0lBRUwsMkJBQTJCLENBQUMsT0FBeUI7UUFDbkQsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSwwQ0FBZSxFQUFFLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLHNEQUEyQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUVELHlCQUF5QixDQUFDLE9BQWUsRUFBRSxjQUFzQjtRQUMvRCxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLDBDQUFlLEVBQUUsQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksb0RBQXlCLENBQUMsRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2xGLENBQUM7SUFFRCxtQkFBbUIsQ0FBQyxXQUFpQztRQUNuRCxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLDBDQUFlLEVBQUUsQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUkscURBQTBCLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBRUQsa0NBQWtDLENBQUMsYUFBcUI7UUFDdEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSwwQ0FBZSxFQUFFLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLG1EQUF3QixDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7SUFDbkUsQ0FBQztDQUNGLENBQUE7QUExQ1kscUJBQXFCO0lBRGpDLGlCQUFVLEVBQUU7R0FDQSxxQkFBcUIsQ0EwQ2pDO0FBMUNZLHNEQUFxQiJ9