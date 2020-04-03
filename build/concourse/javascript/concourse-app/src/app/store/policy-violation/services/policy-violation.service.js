"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("@angular/common/http");
const core_1 = require("@angular/core");
const operators_1 = require("rxjs/operators");
const models_1 = require("@concourse/core/models");
const enums_1 = require("@concourse/shared/enums");
const helpers_1 = require("@concourse/shared/helpers");
let PolicyViolationService = class PolicyViolationService {
    constructor(http) {
        this.http = http;
    }
    evaluateUnsavedEnclaveModel(enclave) {
        return this.http.post(helpers_1.buildServiceRequest(enums_1.ServiceNames.Model, 'enclave-models/evaluate'), enclave).pipe(operators_1.map(response => response), operators_1.map(response => (Object.assign(Object.assign({}, response), { response: new models_1.CommonEvaluation().deserialize(response.response) }))));
    }
    evaluateSavedEnclaveModel(modelId, surfaceLayerId, policyGroupId) {
        let params = new http_1.HttpParams();
        if (surfaceLayerId) {
            params = params.set('surfaceLayerId', `${surfaceLayerId}`);
        }
        if (policyGroupId) {
            params = params.set('policyGroupId', `${policyGroupId}`);
        }
        return this.http.post(helpers_1.buildServiceRequest(enums_1.ServiceNames.Model, `enclave-models/${modelId}/evaluate`), undefined, { params }).pipe(operators_1.map(response => response), operators_1.map(response => (Object.assign(Object.assign({}, response), { evaluation: new models_1.CommonEvaluation().deserialize(response.evaluation) }))));
    }
    evaluateSavedEnclaveModelByPolicyGroup(modelId, policyGroupId) {
        const params = new http_1.HttpParams()
            .set('policyGroupId', `${policyGroupId}`);
        return this.http.post(helpers_1.buildServiceRequest(enums_1.ServiceNames.Model, `enclave-models/${modelId}/evaluate`), undefined, { params }).pipe(operators_1.map(response => response), operators_1.map(response => (Object.assign(Object.assign({}, response), { evaluation: new models_1.CommonEvaluation().deserialize(response.evaluation) }))));
    }
    evaluateUnsavedPolicyGroup(policyGroup) {
        return this.http.post(helpers_1.buildServiceRequest(enums_1.ServiceNames.Policy, 'policy-groups/evaluate'), policyGroup).pipe(operators_1.map(response => response), operators_1.map(response => (Object.assign(Object.assign({}, response), { deploymentEvaluations: (response.deploymentEvaluations || []).map(d => (Object.assign(Object.assign({}, d), { evaluation: new models_1.CommonEvaluation().deserialize(d.evaluation) }))), modelEvaluations: (response.modelEvaluations || []).map(d => (Object.assign(Object.assign({}, d), { evaluation: new models_1.CommonEvaluation().deserialize(d.evaluation) }))) }))));
    }
    evaluateSavedPolicyGroup(policyGroupId) {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.Policy, `policy-groups/${policyGroupId}/evaluate`)).pipe(operators_1.map(response => response), operators_1.map(response => (Object.assign(Object.assign({}, response), { deploymentEvaluations: (response.deploymentEvaluations || []).map(d => (Object.assign(Object.assign({}, d), { evaluation: new models_1.CommonEvaluation().deserialize(d.evaluation) }))), modelEvaluations: (response.modelEvaluations || []).map(d => (Object.assign(Object.assign({}, d), { evaluation: new models_1.CommonEvaluation().deserialize(d.evaluation) }))) }))));
    }
    evaluateLogicalDeployment(surfaceLayerId, ldId) {
        return this.http.post(helpers_1.buildServiceRequest(enums_1.ServiceNames.Workflow, `surface-layers/${surfaceLayerId}/logical-deployments/${ldId}/evaluate`), undefined).pipe(operators_1.map(response => response), operators_1.map(response => (Object.assign(Object.assign({}, response), { evaluation: new models_1.CommonEvaluation().deserialize(response.evaluation) }))));
    }
};
PolicyViolationService = __decorate([
    core_1.Injectable()
], PolicyViolationService);
exports.PolicyViolationService = PolicyViolationService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9saWN5LXZpb2xhdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3N0b3JlL3BvbGljeS12aW9sYXRpb24vc2VydmljZXMvcG9saWN5LXZpb2xhdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsK0NBQThEO0FBQzlELHdDQUEyQztBQUczQyw4Q0FBcUM7QUFFckMsbURBUWdDO0FBQ2hDLG1EQUF1RDtBQUN2RCx1REFBc0U7QUFHdEUsSUFBYSxzQkFBc0IsR0FBbkMsTUFBYSxzQkFBc0I7SUF5RmpDLFlBQ21CLElBQWdCO1FBQWhCLFNBQUksR0FBSixJQUFJLENBQVk7SUFDL0IsQ0FBQztJQXpGTCwyQkFBMkIsQ0FBQyxPQUF5QjtRQUNuRCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLDZCQUFtQixDQUFDLG9CQUFZLENBQUMsS0FBSyxFQUFFLHlCQUF5QixDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUNyRyxlQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFnRCxDQUFDLEVBQ2pFLGVBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLGlDQUNYLFFBQVEsS0FDWCxRQUFRLEVBQUUsSUFBSSx5QkFBZ0IsRUFBRSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQy9ELENBQUMsQ0FDSixDQUFDO0lBQ0osQ0FBQztJQUVELHlCQUF5QixDQUFDLE9BQWUsRUFBRSxjQUFzQixFQUFFLGFBQXFCO1FBQ3RGLElBQUksTUFBTSxHQUFHLElBQUksaUJBQVUsRUFBRSxDQUFDO1FBQzlCLElBQUksY0FBYyxFQUFFO1lBQ2xCLE1BQU0sR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLEdBQUcsY0FB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