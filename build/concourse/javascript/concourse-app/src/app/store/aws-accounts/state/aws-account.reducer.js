"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("@concourse/shared/helpers");
const state_adapter_1 = require("@concourse/shared/state-adapter");
const aws_account_actions_1 = require("./aws-account.actions");
exports.adapter = state_adapter_1.createEntityAdapter();
exports.initialState = exports.adapter.getInitialState({
    ids: [],
    selectedAwsAccount: undefined,
    loading: false,
    loaded: false
});
function reducer(state = exports.initialState, action) {
    switch (action.type) {
        case aws_account_actions_1.ActionTypes.EnableSurfaceLayerToAwsAccount:
        case aws_account_actions_1.ActionTypes.DisableSurfaceLayerToAwsAccount:
        case aws_account_actions_1.ActionTypes.EnableSurfaceToAwsAccount:
        case aws_account_actions_1.ActionTypes.DisableSurfaceToAwsAccount:
        case aws_account_actions_1.ActionTypes.CreateAwsAccount:
        case aws_account_actions_1.ActionTypes.UpdateAwsAccount:
        case aws_account_actions_1.ActionTypes.DeleteAwsAccount:
        case aws_account_actions_1.ActionTypes.LoadAwsAccount:
        case aws_account_actions_1.ActionTypes.LoadAwsAccounts: {
            return Object.assign(Object.assign({}, state), { loading: true });
        }
        case aws_account_actions_1.ActionTypes.LoadAwsAccountsSuccess: {
            return Object.assign(Object.assign({}, exports.adapter.addAll(action.payload, state)), { loading: false, loaded: true });
        }
        case aws_account_actions_1.ActionTypes.UpdateAwsAccountSuccess:
        case aws_account_actions_1.ActionTypes.LoadAwsAccountSuccess: {
            return Object.assign(Object.assign({}, exports.adapter.upsertOne(action.payload, state)), { loading: false });
        }
        case aws_account_actions_1.ActionTypes.DeleteAwsAccountSuccess: {
            return Object.assign(Object.assign({}, exports.adapter.removeOne(action.payload, state)), { loading: false });
        }
        case aws_account_actions_1.ActionTypes.CreateAwsAccountSuccess: {
            return Object.assign(Object.assign({}, exports.adapter.addOne(action.payload, state)), { loading: false });
        }
        case aws_account_actions_1.ActionTypes.SelectAwsAccount: {
            return Object.assign(Object.assign({}, state), { selectedAwsAccount: action.payload });
        }
        case aws_account_actions_1.ActionTypes.EnableSurfaceLayerToAwsAccountSuccess:
        case aws_account_actions_1.ActionTypes.DisableSurfaceLayerToAwsAccountSuccess:
        case aws_account_actions_1.ActionTypes.DisableSurfaceToAwsAccountSuccess:
        case aws_account_actions_1.ActionTypes.EnableSurfaceToAwsAccountSuccess: {
            return Object.assign(Object.assign({}, state), { loading: false });
        }
        case aws_account_actions_1.ActionTypes.EnableSurfaceLayerToAwsAccountFailure:
        case aws_account_actions_1.ActionTypes.DisableSurfaceLayerToAwsAccountFailure:
        case aws_account_actions_1.ActionTypes.EnableSurfaceToAwsAccountFailure:
        case aws_account_actions_1.ActionTypes.EnableSurfaceToAwsAccountFailure:
        case aws_account_actions_1.ActionTypes.LoadAwsAccountFailure:
        case aws_account_actions_1.ActionTypes.LoadAwsAccountsFailure:
        case aws_account_actions_1.ActionTypes.CreateAwsAccountFailure:
        case aws_account_actions_1.ActionTypes.UpdateAwsAccountFailure:
        case aws_account_actions_1.ActionTypes.DeleteAwsAccountFailure: {
            return Object.assign(Object.assign({}, state), { loading: false });
        }
        default:
            return state;
    }
}
exports.reducer = reducer;
_a = exports.adapter.getSelectors(), exports.selectAll = _a.selectAll, exports.selectEntities = _a.selectEntities;
exports.isLoaded = helpers_1.isStateLoaded();
exports.isUpdating = helpers_1.isStateUpdating();
exports.selectedAwsAccountId = (state) => state.selectedAwsAccount;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXdzLWFjY291bnQucmVkdWNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zdG9yZS9hd3MtYWNjb3VudHMvc3RhdGUvYXdzLWFjY291bnQucmVkdWNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFHQSx1REFBMkU7QUFDM0UsbUVBQXNFO0FBQ3RFLCtEQUF1RTtBQVMxRCxRQUFBLE9BQU8sR0FBc0MsbUNBQW1CLEVBQXNCLENBQUM7QUFFdkYsUUFBQSxZQUFZLEdBQVUsZUFBTyxDQUFDLGVBQWUsQ0FBQztJQUN6RCxHQUFHLEVBQUUsRUFBRTtJQUNQLGtCQUFrQixFQUFFLFNBQVM7SUFDN0IsT0FBTyxFQUFFLEtBQUs7SUFDZCxNQUFNLEVBQUUsS0FBSztDQUNkLENBQUMsQ0FBQztBQUVILFNBQWdCLE9BQU8sQ0FBQyxLQUFLLEdBQUcsb0JBQVksRUFBRSxNQUF5QjtJQUNyRSxRQUFRLE1BQU0sQ0FBQyxJQUFJLEVBQUU7UUFDbkIsS0FBSyxpQ0FBVyxDQUFDLDhCQUE4QixDQUFDO1FBQ2hELEtBQUssaUNBQVcsQ0FBQywrQkFBK0IsQ0FBQztRQUNqRCxLQUFLLGlDQUFXLENBQUMseUJBQXlCLENBQUM7UUFDM0MsS0FBSyxpQ0FBVyxDQUFDLDBCQUEwQixDQUFDO1FBQzVDLEtBQUssaUNBQVcsQ0FBQyxnQkFBZ0IsQ0FBQztRQUNsQyxLQUFLLGlDQUFXLENBQUMsZ0JBQWdCLENBQUM7UUFDbEMsS0FBSyxpQ0FBVyxDQUFDLGdCQUFnQixDQUFDO1FBQ2xDLEtBQUssaUNBQVcsQ0FBQyxjQUFjLENBQUM7UUFDaEMsS0FBSyxpQ0FBVyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQ2hDLHVDQUNLLEtBQUssS0FDUixPQUFPLEVBQUUsSUFBSSxJQUNiO1NBQ0g7UUFFRCxLQUFLLGlDQUFXLENBQUMsc0JBQXNCLENBQUMsQ0FBQztZQUN2Qyx1Q0FDSyxlQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLEtBQ3hDLE9BQU8sRUFBRSxLQUFLLEVBQ2QsTUFBTSxFQUFFLElBQUksSUFDWjtTQUNIO1FBRUQsS0FBSyxpQ0FBVyxDQUFDLHVCQUF1QixDQUFDO1FBQ3pDLEtBQUssaUNBQVcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBQ3RDLHVDQUNLLGVBQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsS0FDM0MsT0FBTyxFQUFFLEtBQUssSUFDZDtTQUNIO1FBRUQsS0FBSyxpQ0FBVyxDQUFDLHVCQUF1QixDQUFDLENBQUM7WUFDeEMsdUNBQ0ssZUFBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxLQUMzQyxPQUFPLEVBQUUsS0FBSyxJQUNkO1NBQ0g7UUFFRCxLQUFLLGlDQUFXLENBQUMsdUJBQXVCLENBQUMsQ0FBQztZQUN4Qyx1Q0FDSyxlQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLEtBQ3hDLE9BQU8sRUFBRSxLQUFLLElBQ2Q7U0FDSDtRQUdELEtBQUssaUNBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ2pDLHVDQUNLLEtBQUssS0FDUixrQkFBa0IsRUFBRSxNQUFNLENBQUMsT0FBTyxJQUNsQztTQUNIO1FBRUQsS0FBSyxpQ0FBVyxDQUFDLHFDQUFxQyxDQUFDO1FBQ3ZELEtBQUssaUNBQVcsQ0FBQyxzQ0FBc0MsQ0FBQztRQUN4RCxLQUFLLGlDQUFXLENBQUMsaUNBQWlDLENBQUM7UUFDbkQsS0FBSyxpQ0FBVyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7WUFDakQsdUNBQ0ssS0FBSyxLQUNSLE9BQU8sRUFBRSxLQUFLLElBQ2Y7U0FDRjtRQUVELEtBQUssaUNBQVcsQ0FBQyxxQ0FBcUMsQ0FBQztRQUN2RCxLQUFLLGlDQUFXLENBQUMsc0NBQXNDLENBQUM7UUFDeEQsS0FBSyxpQ0FBVyxDQUFDLGdDQUFnQyxDQUFDO1FBQ2xELEtBQUssaUNBQVcsQ0FBQyxnQ0FBZ0MsQ0FBQztRQUNsRCxLQUFLLGlDQUFXLENBQUMscUJBQXFCLENBQUM7UUFDdkMsS0FBSyxpQ0FBVyxDQUFDLHNCQUFzQixDQUFDO1FBQ3hDLEtBQUssaUNBQVcsQ0FBQyx1QkFBdUIsQ0FBQztRQUN6QyxLQUFLLGlDQUFXLENBQUMsdUJBQXVCLENBQUM7UUFDekMsS0FBSyxpQ0FBVyxDQUFDLHVCQUF1QixDQUFDLENBQUM7WUFDeEMsdUNBQ0ssS0FBSyxLQUNSLE9BQU8sRUFBRSxLQUFLLElBQ2Q7U0FDSDtRQUVEO1lBQ0UsT0FBTyxLQUFLLENBQUM7S0FDaEI7QUFDSCxDQUFDO0FBbkZELDBCQW1GQztBQUVZLG1DQUFzRCwrRUFBQztBQUN2RCxRQUFBLFFBQVEsR0FBRyx1QkFBYSxFQUFFLENBQUM7QUFDM0IsUUFBQSxVQUFVLEdBQUcseUJBQWUsRUFBRSxDQUFDO0FBQy9CLFFBQUEsb0JBQW9CLEdBQUcsQ0FBQyxLQUFZLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyJ9