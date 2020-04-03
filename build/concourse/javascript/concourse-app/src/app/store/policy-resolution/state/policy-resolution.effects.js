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
const models_1 = require("@concourse/core/models");
const toast_actions_1 = require("@concourse/core/toast/toast.actions");
const helpers_1 = require("@concourse/shared/helpers");
const asset_actions_1 = require("@concourse/store/asset/state/asset.actions");
const policy_group_actions_1 = require("@concourse/store/policy-group/state/policy-group.actions");
const policy_violation_actions_1 = require("@concourse/store/policy-violation/state/policy-violation.actions");
const user_actions_1 = require("@concourse/store/user/state/user.actions");
const policy_resolution_actions_1 = require("./policy-resolution.actions");
let PolicyResolutionEffects = class PolicyResolutionEffects {
    constructor(actions$, policyResolutionApi) {
        this.actions$ = actions$;
        this.policyResolutionApi = policyResolutionApi;
        this.loadPolicyViolationRequests$ = this.actions$.pipe(effects_1.ofType(policy_resolution_actions_1.PolicyResolutionTypes.LoadPolicyResolutions), operators_2.switchMap(_ => this.policyResolutionApi.list().pipe(operators_2.map(data => new policy_resolution_actions_1.LoadPolicyResolutionsSuccess(data)), operators_1.handleError('toast', new policy_resolution_actions_1.LoadPolicyResolutionsFailure()))));
        this.loadPolicyResolution$ = this.actions$.pipe(effects_1.ofType(policy_resolution_actions_1.PolicyResolutionTypes.LoadPolicyResolution), operators_2.map((action) => action.payload), operators_2.switchMap(payload => this.policyResolutionApi.getPolicyResolution(payload).pipe(operators_2.mergeMap(data => {
            let returnActions = [
                new policy_resolution_actions_1.LoadPolicyResolutionSuccess(data),
                new policy_group_actions_1.LoadPolicyGroup(data.policyGroupId)
            ];
            switch (data.policyViolationType) {
                case 'POLICY_GROUP': {
                    returnActions = [
                        ...returnActions,
                        new policy_violation_actions_1.EvaluateSavedPolicyGroup(data.policyGroupId)
                    ];
                    break;
                }
                case 'MODEL': {
                    if (!helpers_1.Util.isNullOrUndefined(data.details)) {
                        const evaluation = new models_1.CommonEvaluation().deserialize({
                            policyEvaluationId: 0,
                            policyViolations: [JSON.parse(data.details)],
                            requesterId: data.requesterId,
                            evaluationTimeMs: 0,
                            state: 'FAILED'
                        });
                        returnActions = [
                            ...returnActions,
                            new asset_actions_1.LoadAsset({ type: 'enclave', id: data.modelId }),
                            new policy_violation_actions_1.EvaluateSavedEnclaveModelSuccess({
                                modelId: data.modelId,
                                modelName: data.modelName,
                                modelType: 0,
                                evaluation
                            })
                        ];
                    }
                    break;
                }
                case 'ACCOUNT':
                case 'DEPLOYMENT': {
                    if (!helpers_1.Util.isNullOrUndefined(data.details)) {
                        const evaluation = new models_1.CommonEvaluation().deserialize({
                            policyEvaluationId: 0,
                            policyViolations: [JSON.parse(data.details)],
                            requesterId: data.requesterId,
                            evaluationTimeMs: 0,
                            state: 'FAILED'
                        });
                        returnActions = [
                            ...returnActions,
                            new policy_violation_actions_1.EvaluateLogicalDeploymentSuccess({
                                deploymentId: data.deploymentId,
                                modelId: data.modelId,
                                deploymentStackName: data.deploymentName,
                                evaluation
                            })
                        ];
                    }
                    break;
                }
                case 'AZURE_SUBSCRIPTION':
                case 'AWS_ACCOUNT': {
                    if (!helpers_1.Util.isNullOrUndefined(data.details)) {
                        const evaluation = new models_1.CommonEvaluation().deserialize({
                            policyEvaluationId: 0,
                            policyViolations: [JSON.parse(data.details)],
                            requesterId: data.requesterId,
                            evaluationTimeMs: 0,
                            state: 'FAILED'
                        });
                        returnActions = [
                            ...returnActions,
                            new policy_violation_actions_1.EvaluateGenericSuccess(Object.assign(Object.assign({}, data), { evaluation }))
                        ];
                    }
                    break;
                }
                default: {
                    console.warn('%s is not supported trying to handle with EvaluateGenericSuccess', data.policyViolationType);
                    const evaluation = new models_1.CommonEvaluation().deserialize({
                        policyEvaluationId: 0,
                        policyViolations: [JSON.parse(data.details)],
                        requesterId: data.requesterId,
                        evaluationTimeMs: 0,
                        state: 'FAILED'
                    });
                    returnActions = [
                        ...returnActions,
                        new policy_violation_actions_1.EvaluateGenericSuccess(Object.assign(Object.assign({}, data), { evaluation }))
                    ];
                    break;
                }
            }
            return returnActions;
        }), operators_1.handleError('toast', new policy_resolution_actions_1.LoadPolicyResolutionFailure()))));
        this.postPolicyResolutionAction$ = this.actions$.pipe(effects_1.ofType(policy_resolution_actions_1.PolicyResolutionTypes.PostActionForPolicyResolution), operators_2.map((action) => action.payload), operators_2.concatMap(({ policyResolutionId, resolutionAction }) => this.policyResolutionApi.postComment(policyResolutionId, resolutionAction).pipe(operators_2.mergeMap(data => [
            new policy_resolution_actions_1.PostActionForPolicyResolutionSuccess({ policyResolutionId, resolutionAction: data }),
            new toast_actions_1.OpenToast({ message: 'Action Posted', type: 'success' })
        ]), operators_1.handleError('toast', new policy_resolution_actions_1.PostActionForPolicyResolutionFailure()))));
        this.loadPolicyResolutionsByPolicyGroup$ = this.actions$.pipe(effects_1.ofType(policy_resolution_actions_1.PolicyResolutionTypes.LoadPolicyResolutionsByEntityId), operators_2.map((action) => action.payload), operators_2.switchMap(payload => this.policyResolutionApi.getPolicyViolationsByPolicyGroup(payload.entityKey, payload.entityId).pipe(operators_2.map(data => new policy_resolution_actions_1.LoadPolicyResolutionsByEntityIdSuccess(data)), operators_1.handleError('toast', new policy_resolution_actions_1.LoadPolicyResolutionsByEntityIdFailure()))));
        this.loadDetailOnNav$ = this.actions$.pipe(operators_1.ofRoute(['/workflows/risks/:id']), operators_2.map((action) => action.payload), operators_2.mergeMap(route => [
            new user_actions_1.LoadUsers(),
            new policy_resolution_actions_1.LoadPolicyResolution(+route.params['id']),
            new policy_resolution_actions_1.SelectPolicyResolution(+route.params['id'])
        ]));
    }
};
__decorate([
    effects_1.Effect()
], PolicyResolutionEffects.prototype, "loadPolicyViolationRequests$", void 0);
__decorate([
    effects_1.Effect()
], PolicyResolutionEffects.prototype, "loadPolicyResolution$", void 0);
__decorate([
    effects_1.Effect()
], PolicyResolutionEffects.prototype, "postPolicyResolutionAction$", void 0);
__decorate([
    effects_1.Effect()
], PolicyResolutionEffects.prototype, "loadPolicyResolutionsByPolicyGroup$", void 0);
__decorate([
    effects_1.Effect()
], PolicyResolutionEffects.prototype, "loadDetailOnNav$", void 0);
PolicyResolutionEffects = __decorate([
    core_1.Injectable()
], PolicyResolutionEffects);
exports.PolicyResolutionEffects = PolicyResolutionEffects;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9saWN5LXJlc29sdXRpb24uZWZmZWN0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zdG9yZS9wb2xpY3ktcmVzb2x1dGlvbi9zdGF0ZS9wb2xpY3ktcmVzb2x1dGlvbi5lZmZlY3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBQTJDO0FBQzNDLDJDQUF3RDtBQUd4RCx5REFBaUU7QUFFakUsOENBS3dCO0FBRXhCLG1EQUEwRDtBQUUxRCx1RUFBZ0U7QUFDaEUsdURBQWlEO0FBQ2pELDhFQUF1RTtBQUN2RSxtR0FBMkY7QUFDM0YsK0dBSzBFO0FBQzFFLDJFQUFxRTtBQUVyRSwyRUFjcUM7QUFHckMsSUFBYSx1QkFBdUIsR0FBcEMsTUFBYSx1QkFBdUI7SUFnS2xDLFlBQ21CLFFBQWlCLEVBQ2pCLG1CQUE0QztRQUQ1QyxhQUFRLEdBQVIsUUFBUSxDQUFTO1FBQ2pCLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBeUI7UUFoS3JELGlDQUE0QixHQUF1QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FDN0UsZ0JBQU0sQ0FBQyxpREFBcUIsQ0FBQyxxQkFBcUIsQ0FBQyxFQUNuRCxxQkFBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQ1osSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FDbEMsZUFBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSx3REFBNEIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUNuRCx1QkFBVyxDQUFDLE9BQU8sRUFBRSxJQUFJLHdEQUE0QixFQUFFLENBQUMsQ0FDekQsQ0FDRixDQUNGLENBQUM7UUFFUSwwQkFBcUIsR0FBdUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQ3RFLGdCQUFNLENBQUMsaURBQXFCLENBQUMsb0JB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