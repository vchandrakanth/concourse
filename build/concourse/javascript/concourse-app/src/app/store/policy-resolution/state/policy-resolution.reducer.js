"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const policy_resolution_actions_1 = require("./policy-resolution.actions");
const helpers_1 = require("@concourse/shared/helpers");
const state_adapter_1 = require("@concourse/shared/state-adapter");
exports.adapter = state_adapter_1.createEntityAdapter({
    selectId: policyResolution => policyResolution.id
});
exports.initialState = exports.adapter.getInitialState({
    status: undefined,
    loading: false,
    loaded: false,
    selectedPolicyViolation: undefined
});
function reducer(state = exports.initialState, action) {
    switch (action.type) {
        case policy_resolution_actions_1.PolicyResolutionTypes.LoadPolicyResolutionsByEntityId:
        case policy_resolution_actions_1.PolicyResolutionTypes.LoadPolicyResolutions:
        case policy_resolution_actions_1.PolicyResolutionTypes.LoadPolicyResolution:
        case policy_resolution_actions_1.PolicyResolutionTypes.PostActionForPolicyResolution: {
            return Object.assign(Object.assign({}, state), { loading: true });
        }
        case policy_resolution_actions_1.PolicyResolutionTypes.LoadPolicyResolutionsByEntityIdSuccess:
        case policy_resolution_actions_1.PolicyResolutionTypes.LoadPolicyResolutionsSuccess: {
            return Object.assign(Object.assign({}, exports.adapter.upsertMany(action.payload, state)), { loading: false, loaded: true });
        }
        case policy_resolution_actions_1.PolicyResolutionTypes.LoadPolicyResolutionSuccess: {
            return Object.assign(Object.assign({}, exports.adapter.upsertOne(action.payload, state)), { loading: false, loaded: true });
        }
        case policy_resolution_actions_1.PolicyResolutionTypes.SelectPolicyResolution: {
            return Object.assign(Object.assign({}, state), { selectedPolicyViolation: action.payload });
        }
        case policy_resolution_actions_1.PolicyResolutionTypes.PostActionForPolicyResolutionSuccess: {
            let actionResponse = state.entities[action.payload.policyResolutionId];
            actionResponse = actionResponse.copyWith({
                actions: [...actionResponse.actions, action.payload.resolutionAction]
            });
            return Object.assign(Object.assign({}, exports.adapter.upsertOne(actionResponse, state)), { loading: false });
        }
        case policy_resolution_actions_1.PolicyResolutionTypes.LoadPolicyResolutionsByEntityIdFailure:
        case policy_resolution_actions_1.PolicyResolutionTypes.LoadPolicyResolutionFailure:
        case policy_resolution_actions_1.PolicyResolutionTypes.LoadPolicyResolutionsFailure:
        case policy_resolution_actions_1.PolicyResolutionTypes.PostActionForPolicyResolutionFailure: {
            return Object.assign(Object.assign({}, state), { loading: false });
        }
        default:
            return state;
    }
}
exports.reducer = reducer;
_a = exports.adapter.getSelectors(), exports.selectAll = _a.selectAll, exports.selectEntities = _a.selectEntities;
exports.selectedId = (state) => state.selectedPolicyViolation;
exports.isLoaded = helpers_1.isStateLoaded();
exports.isUpdating = helpers_1.isStateUpdating();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9saWN5LXJlc29sdXRpb24ucmVkdWNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zdG9yZS9wb2xpY3ktcmVzb2x1dGlvbi9zdGF0ZS9wb2xpY3ktcmVzb2x1dGlvbi5yZWR1Y2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJFQUdxQztBQUdyQyx1REFBMkU7QUFDM0UsbUVBQXNFO0FBVXpELFFBQUEsT0FBTyxHQUFvQyxtQ0FBbUIsQ0FBbUI7SUFDNUYsUUFBUSxFQUFFLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO0NBQ2xELENBQUMsQ0FBQztBQUVVLFFBQUEsWUFBWSxHQUFVLGVBQU8sQ0FBQyxlQUFlLENBQUM7SUFDekQsTUFBTSxFQUFFLFNBQVM7SUFDakIsT0FBTyxFQUFFLEtBQUs7SUFDZCxNQUFNLEVBQUUsS0FBSztJQUNiLHVCQUF1QixFQUFFLFNBQVM7Q0FDbkMsQ0FBQyxDQUFDO0FBRUgsU0FBZ0IsT0FBTyxDQUFDLEtBQUssR0FBRyxvQkFBWSxFQUFFLE1BQStCO0lBQzNFLFFBQVEsTUFBTSxDQUFDLElBQUksRUFBRTtRQUNuQixLQUFLLGlEQUFxQixDQUFDLCtCQUErQixDQUFDO1FBQzNELEtBQUssaURBQXFCLENBQUMscUJBQXFCLENBQUM7UUFDakQsS0FBSyxpREFBcUIsQ0FBQyxvQkFBb0IsQ0FBQztRQUNoRCxLQUFLLGlEQUFxQixDQUFDLDZCQUE2QixDQUFDLENBQUM7WUFDeEQsdUNBQ0ssS0FBSyxLQUNSLE9BQU8sRUFBRSxJQUFJLElBQ2I7U0FDSDtRQUVELEtBQUssaURBQXFCLENBQUMsc0NBQXNDLENBQUM7UUFDbEUsS0FBSyxpREFBcUIsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1lBQ3ZELHVDQUNLLGVBQU8sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsS0FDNUMsT0FBTyxFQUFFLEtBQUssRUFDZCxNQUFNLEVBQUUsSUFBSSxJQUNaO1NBQ0g7UUFFRCxLQUFLLGlEQUFxQixDQUFDLDJCQUEyQixDQUFDLENBQUM7WUFDdEQsdUNBQ0ssZUFBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxLQUMzQyxPQUFPLEVBQUUsS0FBSyxFQUNkLE1BQU0sRUFBRSxJQUFJLElBQ1o7U0FDSDtRQUVELEtBQUssaURBQXFCLENBQUMsc0JBQXNCLENBQUMsQ0FBQztZQUNqRCx1Q0FDSyxLQUFLLEtBQ1IsdUJBQXVCLEVBQUUsTUFBTSxDQUFDLE9BQU8sSUFDdkM7U0FDSDtRQUVELEtBQUssaURBQXFCLENBQUMsb0NBQW9DLENBQUMsQ0FBQztZQUMvRCxJQUFJLGNBQWMsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUN2RSxjQUFjLEdBQUcsY0FBYyxDQUFDLFFBQVEsQ0FBQztnQkFDdkMsT0FBTyxFQUFFLENBQUMsR0FBRyxjQUFjLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUM7YUFDdEUsQ0FBQyxDQUFDO1lBQ0gsdUNBQ0ssZUFBTyxDQUFDLFNBQVMsQ0FBQyxjQUFjLEVBQUUsS0FBSyxDQUFDLEtBQzNDLE9BQU8sRUFBRSxLQUFLLElBQ2Q7U0FDSDtRQUVELEtBQUssaURBQXFCLENBQUMsc0NBQXNDLENBQUM7UUFDbEUsS0FBSyxpREFBcUIsQ0FBQywyQkFBMkIsQ0FBQztRQUN2RCxLQUFLLGlEQUFxQixDQUFDLDRCQUE0QixDQUFDO1FBQ3hELEtBQUssaURBQXFCLENBQUMsb0NBQW9DLENBQUMsQ0FBQztZQUMvRCx1Q0FDSyxLQUFLLEtBQ1IsT0FBTyxFQUFFLEtBQUssSUFDZDtTQUNIO1FBRUQ7WUFDRSxPQUFPLEtBQUssQ0FBQztLQUNoQjtBQUNILENBQUM7QUE1REQsMEJBNERDO0FBRVksbUNBQXNELCtFQUFDO0FBQ3ZELFFBQUEsVUFBVSxHQUFHLENBQUMsS0FBWSxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsdUJBQXVCLENBQUM7QUFDN0QsUUFBQSxRQUFRLEdBQUcsdUJBQWEsRUFBRSxDQUFDO0FBQzNCLFFBQUEsVUFBVSxHQUFHLHlCQUFlLEVBQUUsQ0FBQyJ9