"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const policy_violation_actions_1 = require("./policy-violation.actions");
exports.initialState = {
    evaluationPending: false,
    evaluation: undefined
};
function reducer(state = exports.initialState, action) {
    switch (action.type) {
        case policy_violation_actions_1.PolicyViolationActionTypes.EvaluateSavedEnclaveModel:
        case policy_violation_actions_1.PolicyViolationActionTypes.EvaluateUnsavedEnclaveModel:
        case policy_violation_actions_1.PolicyViolationActionTypes.EvaluateUnsavedPolicyGroup:
        case policy_violation_actions_1.PolicyViolationActionTypes.EvaluateSavedPolicyGroup:
        case policy_violation_actions_1.PolicyViolationActionTypes.EvaluateLogicalDeployment: {
            return Object.assign(Object.assign({}, exports.initialState), { evaluationPending: true });
        }
        case policy_violation_actions_1.PolicyViolationActionTypes.EvaluateUnsavedEnclaveModelSuccess:
        case policy_violation_actions_1.PolicyViolationActionTypes.EvaluateSavedEnclaveModelSuccess:
        case policy_violation_actions_1.PolicyViolationActionTypes.EvaluatePolicyGroupSuccess:
        case policy_violation_actions_1.PolicyViolationActionTypes.EvaluateLogicalDeploymentSuccess:
        case policy_violation_actions_1.PolicyViolationActionTypes.EvaluateGenericSuccess: {
            return Object.assign(Object.assign({}, state), { evaluation: action.payload, evaluationPending: false });
        }
        case policy_violation_actions_1.PolicyViolationActionTypes.PolicyEvaluationFailure: {
            return Object.assign(Object.assign({}, exports.initialState), { evaluationPending: false });
        }
        case policy_violation_actions_1.PolicyViolationActionTypes.ClearEvaluation: {
            return Object.assign(Object.assign({}, exports.initialState), { evaluationPending: false });
        }
        default: {
            return state;
        }
    }
}
exports.reducer = reducer;
exports.getEvaluation = (state) => state.evaluation;
exports.isEvaluationPending = (state) => state.evaluationPending;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9saWN5LXZpb2xhdGlvbi5yZWR1Y2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3N0b3JlL3BvbGljeS12aW9sYXRpb24vc3RhdGUvcG9saWN5LXZpb2xhdGlvbi5yZWR1Y2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEseUVBQWdHO0FBT25GLFFBQUEsWUFBWSxHQUFVO0lBQ2pDLGlCQUFpQixFQUFFLEtBQUs7SUFDeEIsVUFBVSxFQUFFLFNBQVM7Q0FDdEIsQ0FBQztBQUVGLFNBQWdCLE9BQU8sQ0FBQyxLQUFLLEdBQUcsb0JBQVksRUFBRSxNQUE4QjtJQUMxRSxRQUFRLE1BQU0sQ0FBQyxJQUFJLEVBQUU7UUFDbkIsS0FBSyxxREFBMEIsQ0FBQyx5QkFBeUIsQ0FBQztRQUMxRCxLQUFLLHFEQUEwQixDQUFDLDJCQUEyQixDQUFDO1FBQzVELEtBQUsscURBQTBCLENBQUMsMEJBQTBCLENBQUM7UUFDM0QsS0FBSyxxREFBMEIsQ0FBQyx3QkFBd0IsQ0FBQztRQUN6RCxLQUFLLHFEQUEwQixDQUFDLHlCQUF5QixDQUFDLENBQUM7WUFDekQsdUNBQ0ssb0JBQVksS0FDZixpQkFBaUIsRUFBRSxJQUFJLElBQ3ZCO1NBQ0g7UUFFRCxLQUFLLHFEQUEwQixDQUFDLGtDQUFrQyxDQUFDO1FBQ25FLEtBQUsscURBQTBCLENBQUMsZ0NBQWdDLENBQUM7UUFDakUsS0FBSyxxREFBMEIsQ0FBQywwQkFBMEIsQ0FBQztRQUMzRCxLQUFLLHFEQUEwQixDQUFDLGdDQUFnQyxDQUFDO1FBQ2pFLEtBQUsscURBQTBCLENBQUMsc0JBQXNCLENBQUMsQ0FBQztZQUN0RCx1Q0FDSyxLQUFLLEtBQ1IsVUFBVSxFQUFFLE1BQU0sQ0FBQyxPQUFPLEVBQzFCLGlCQUFpQixFQUFFLEtBQUssSUFDeEI7U0FDSDtRQUVELEtBQUsscURBQTBCLENBQUMsdUJBQXVCLENBQUMsQ0FBQztZQUN2RCx1Q0FDSyxvQkFBWSxLQUNmLGlCQUFpQixFQUFFLEtBQUssSUFDeEI7U0FDSDtRQUVELEtBQUsscURBQTBCLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDL0MsdUNBQ0ssb0JBQVksS0FDZixpQkFBaUIsRUFBRSxLQUFLLElBQ3hCO1NBQ0g7UUFFRCxPQUFPLENBQUMsQ0FBQztZQUNQLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7S0FDRjtBQUNILENBQUM7QUEzQ0QsMEJBMkNDO0FBRVksUUFBQSxhQUFhLEdBQUcsQ0FBQyxLQUFZLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUM7QUFDbkQsUUFBQSxtQkFBbUIsR0FBRyxDQUFDLEtBQVksRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDIn0=