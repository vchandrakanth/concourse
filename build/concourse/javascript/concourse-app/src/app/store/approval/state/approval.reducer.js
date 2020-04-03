"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("@concourse/shared/helpers");
const state_adapter_1 = require("@concourse/shared/state-adapter");
const approval_actions_1 = require("./approval.actions");
exports.adapter = state_adapter_1.createEntityAdapter();
exports.initialState = exports.adapter.getInitialState({
    ids: [],
    selectedApprovalRequest: undefined,
    loading: false,
    loaded: false
});
function reducer(state = exports.initialState, action) {
    switch (action.type) {
        case approval_actions_1.ApprovalActionTypes.LoadApprovalRequestByRequestEntityId:
        case approval_actions_1.ApprovalActionTypes.ApprovalRequestAction:
        case approval_actions_1.ApprovalActionTypes.LoadApprovalRequest:
        case approval_actions_1.ApprovalActionTypes.LoadApprovalRequests: {
            return Object.assign(Object.assign({}, state), { loading: true });
        }
        case approval_actions_1.ApprovalActionTypes.LoadApprovalRequestByRequestEntityIdSuccess:
        case approval_actions_1.ApprovalActionTypes.LoadApprovalRequestsSuccess: {
            return Object.assign(Object.assign({}, exports.adapter.upsertMany(action.payload, state)), { loading: false, loaded: true });
        }
        case approval_actions_1.ApprovalActionTypes.LoadApprovalRequestSuccess: {
            return Object.assign(Object.assign({}, exports.adapter.upsertOne(action.payload, state)), { loading: false, loaded: true });
        }
        case approval_actions_1.ApprovalActionTypes.ApprovalRequestActionSuccess: {
            const entity = state.entities[action.payload.approvalRequestId];
            const update = {
                id: action.payload.approvalRequestId,
                changes: {
                    approvalActions: [...entity.approvalActions, action.payload.approvalAction]
                }
            };
            return Object.assign(Object.assign({}, exports.adapter.updateOne(update, state)), { loading: false, loaded: true });
        }
        case approval_actions_1.ApprovalActionTypes.SelectApprovalRequest: {
            return Object.assign(Object.assign({}, state), { selectedApprovalRequest: action.payload });
        }
        case approval_actions_1.ApprovalActionTypes.LoadApprovalRequestByRequestEntityIdFailure:
        case approval_actions_1.ApprovalActionTypes.ApprovalRequestActionFailure:
        case approval_actions_1.ApprovalActionTypes.LoadApprovalRequestFailure:
        case approval_actions_1.ApprovalActionTypes.LoadApprovalRequestsFailure: {
            return Object.assign(Object.assign({}, state), { loading: false });
        }
        default: {
            return state;
        }
    }
}
exports.reducer = reducer;
_a = exports.adapter.getSelectors(), exports.selectAll = _a.selectAll, exports.selectEntities = _a.selectEntities;
exports.isLoaded = helpers_1.isStateLoaded();
exports.isUpdating = helpers_1.isStateUpdating();
exports.selectedId = (state) => state.selectedApprovalRequest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwcm92YWwucmVkdWNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zdG9yZS9hcHByb3ZhbC9zdGF0ZS9hcHByb3ZhbC5yZWR1Y2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUdBLHVEQUEyRTtBQUMzRSxtRUFBc0U7QUFDdEUseURBQTBFO0FBUzdELFFBQUEsT0FBTyxHQUFtQyxtQ0FBbUIsRUFBbUIsQ0FBQztBQUVqRixRQUFBLFlBQVksR0FBVSxlQUFPLENBQUMsZUFBZSxDQUFDO0lBQ3pELEdBQUcsRUFBRSxFQUFFO0lBQ1AsdUJBQXVCLEVBQUUsU0FBUztJQUNsQyxPQUFPLEVBQUUsS0FBSztJQUNkLE1BQU0sRUFBRSxLQUFLO0NBQ2QsQ0FBQyxDQUFDO0FBRUgsU0FBZ0IsT0FBTyxDQUFDLEtBQUssR0FBRyxvQkFBWSxFQUFFLE1BQXVCO0lBQ25FLFFBQVEsTUFBTSxDQUFDLElBQUksRUFBRTtRQUVuQixLQUFLLHNDQUFtQixDQUFDLG9DQUFvQyxDQUFDO1FBQzlELEtBQUssc0NBQW1CLENBQUMscUJBQXFCLENBQUM7UUFDL0MsS0FBSyxzQ0FBbUIsQ0FBQyxtQkFBbUIsQ0FBQztRQUM3QyxLQUFLLHNDQUFtQixDQUFDLG9CQUFvQixDQUFDLENBQUM7WUFDN0MsdUNBQ0ssS0FBSyxLQUNSLE9BQU8sRUFBRSxJQUFJLElBQ2I7U0FDSDtRQUVELEtBQUssc0NBQW1CLENBQUMsMkNBQTJDLENBQUM7UUFDckUsS0FBSyxzQ0FBbUIsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO1lBQ3BELHVDQUNLLGVBQU8sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsS0FDNUMsT0FBTyxFQUFFLEtBQUssRUFDZCxNQUFNLEVBQUUsSUFBSSxJQUNaO1NBQ0g7UUFFRCxLQUFLLHNDQUFtQixDQUFDLDBCQUEwQixDQUFDLENBQUM7WUFDbkQsdUNBQ0ssZUFBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxLQUMzQyxPQUFPLEVBQUUsS0FBSyxFQUNkLE1BQU0sRUFBRSxJQUFJLElBQ1o7U0FDSDtRQUVELEtBQUssc0NBQW1CLENBQUMsNEJBQTRCLENBQUMsQ0FBQztZQUNyRCxNQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUNoRSxNQUFNLE1BQU0sR0FBRztnQkFDYixFQUFFLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUI7Z0JBQ3BDLE9BQU8sRUFBRTtvQkFDUCxlQUFlLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxlQUFlLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUM7aUJBQzVFO2FBQ0YsQ0FBQztZQUNGLHVDQUNLLGVBQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxLQUNuQyxPQUFPLEVBQUUsS0FBSyxFQUNkLE1BQU0sRUFBRSxJQUFJLElBQ1o7U0FDSDtRQUVELEtBQUssc0NBQW1CLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUM5Qyx1Q0FDSyxLQUFLLEtBQ1IsdUJBQXVCLEVBQUUsTUFBTSxDQUFDLE9BQU8sSUFDdkM7U0FDSDtRQUVELEtBQUssc0NBQW1CLENBQUMsMkNBQTJDLENBQUM7UUFDckUsS0FBSyxzQ0FBbUIsQ0FBQyw0QkFBNEIsQ0FBQztRQUN0RCxLQUFLLHNDQUFtQixDQUFDLDBCQUEwQixDQUFDO1FBQ3BELEtBQUssc0NBQW1CLENBQUMsMkJBQTJCLENBQUMsQ0FBQztZQUNwRCx1Q0FDSyxLQUFLLEtBQ1IsT0FBTyxFQUFFLEtBQUssSUFDZDtTQUNIO1FBRUQsT0FBTyxDQUFDLENBQUM7WUFDUCxPQUFPLEtBQUssQ0FBQztTQUNkO0tBRUY7QUFDSCxDQUFDO0FBbkVELDBCQW1FQztBQUVZLG1DQUFzRCwrRUFBQztBQUN2RCxRQUFBLFFBQVEsR0FBRyx1QkFBYSxFQUFFLENBQUM7QUFDM0IsUUFBQSxVQUFVLEdBQUcseUJBQWUsRUFBRSxDQUFDO0FBQy9CLFFBQUEsVUFBVSxHQUFHLENBQUMsS0FBWSxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsdUJBQXVCLENBQUMifQ==