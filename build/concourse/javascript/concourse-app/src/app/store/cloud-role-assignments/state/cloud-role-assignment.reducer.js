"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("@concourse/shared/helpers");
const state_adapter_1 = require("@concourse/shared/state-adapter");
const cloud_role_assignment_actions_1 = require("./cloud-role-assignment.actions");
exports.adapter = state_adapter_1.createEntityAdapter();
exports.initialState = exports.adapter.getInitialState({
    ids: [],
    loading: false,
    loaded: false,
    selectedCloudRole: undefined,
    selectedGroup: undefined
});
function reducer(state = exports.initialState, action) {
    switch (action.type) {
        case cloud_role_assignment_actions_1.CloudRoleAssignmentActionTypes.LoadCloudRoleAssignmentsByCloudRoleId:
        case cloud_role_assignment_actions_1.CloudRoleAssignmentActionTypes.AddCloudRolesToGroup:
        case cloud_role_assignment_actions_1.CloudRoleAssignmentActionTypes.RemoveCloudRoleAssignment:
        case cloud_role_assignment_actions_1.CloudRoleAssignmentActionTypes.LoadCloudRoleAssignmentsByGroupId: {
            return Object.assign(Object.assign({}, state), { loading: true, loaded: false });
        }
        case cloud_role_assignment_actions_1.CloudRoleAssignmentActionTypes.LoadCloudRoleAssignmentsByCloudRoleIdSuccess:
        case cloud_role_assignment_actions_1.CloudRoleAssignmentActionTypes.LoadCloudRoleAssignmentsByGroupIdSuccess: {
            return Object.assign(Object.assign({}, exports.adapter.upsertMany(action.payload, state)), { loading: false, loaded: true });
        }
        case cloud_role_assignment_actions_1.CloudRoleAssignmentActionTypes.RemoveCloudRoleAssignmentSuccess: {
            return Object.assign(Object.assign({}, exports.adapter.removeOne(action.payload, state)), { loading: false, loaded: true });
        }
        case cloud_role_assignment_actions_1.CloudRoleAssignmentActionTypes.AddCloudRolesToGroupSuccess: {
            return Object.assign(Object.assign({}, exports.adapter.upsertOne(action.payload, state)), { loading: false, loaded: true });
        }
        case cloud_role_assignment_actions_1.CloudRoleAssignmentActionTypes.LoadCloudRoleAssignmentsByCloudRoleIdFailure:
        case cloud_role_assignment_actions_1.CloudRoleAssignmentActionTypes.AddCloudRolesToGroupFailure:
        case cloud_role_assignment_actions_1.CloudRoleAssignmentActionTypes.RemoveCloudRoleAssignmentFailure:
        case cloud_role_assignment_actions_1.CloudRoleAssignmentActionTypes.LoadCloudRoleAssignmentsByGroupIdFailure: {
            return Object.assign(Object.assign({}, state), { loading: false, loaded: true });
        }
        default:
            return state;
    }
}
exports.reducer = reducer;
_a = exports.adapter.getSelectors(), exports.selectAll = _a.selectAll, exports.selectEntities = _a.selectEntities;
exports.isLoaded = helpers_1.isStateLoaded();
exports.isUpdating = helpers_1.isStateUpdating();
exports.getSelectedGroup = (state) => state.selectedGroup;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvdWQtcm9sZS1hc3NpZ25tZW50LnJlZHVjZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc3RvcmUvY2xvdWQtcm9sZS1hc3NpZ25tZW50cy9zdGF0ZS9jbG91ZC1yb2xlLWFzc2lnbm1lbnQucmVkdWNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFHQSx1REFBMkU7QUFDM0UsbUVBQXNFO0FBQ3RFLG1GQUE2RztBQVVoRyxRQUFBLE9BQU8sR0FBdUMsbUNBQW1CLEVBQXVCLENBQUM7QUFFekYsUUFBQSxZQUFZLEdBQVUsZUFBTyxDQUFDLGVBQWUsQ0FBQztJQUN6RCxHQUFHLEVBQUUsRUFBRTtJQUNQLE9BQU8sRUFBRSxLQUFLO0lBQ2QsTUFBTSxFQUFFLEtBQUs7SUFDYixpQkFBaUIsRUFBRSxTQUFTO0lBQzVCLGFBQWEsRUFBRSxTQUFTO0NBQ3pCLENBQUMsQ0FBQztBQUVILFNBQWdCLE9BQU8sQ0FBQyxLQUFLLEdBQUcsb0JBQVksRUFBRSxNQUFrQztJQUM5RSxRQUFRLE1BQU0sQ0FBQyxJQUFJLEVBQUU7UUFDbkIsS0FBSyw4REFBOEIsQ0FBQyxxQ0FBcUMsQ0FBQztRQUMxRSxLQUFLLDhEQUE4QixDQUFDLG9CQUFvQixDQUFDO1FBQ3pELEtBQUssOERBQThCLENBQUMseUJBQXlCLENBQUM7UUFDOUQsS0FBSyw4REFBOEIsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO1lBQ3JFLHVDQUNLLEtBQUssS0FDUixPQUFPLEVBQUUsSUFBSSxFQUNiLE1BQU0sRUFBRSxLQUFLLElBQ2I7U0FDSDtRQUVELEtBQUssOERBQThCLENBQUMsNENBQTRDLENBQUM7UUFDakYsS0FBSyw4REFBOEIsQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDO1lBQzVFLHVDQUNLLGVBQU8sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsS0FDNUMsT0FBTyxFQUFFLEtBQUssRUFDZCxNQUFNLEVBQUUsSUFBSSxJQUNaO1NBQ0g7UUFHRCxLQUFLLDhEQUE4QixDQUFDLGdDQUFnQyxDQUFDLENBQUM7WUFDcEUsdUNBQ0ssZUFBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxLQUMzQyxPQUFPLEVBQUUsS0FBSyxFQUNkLE1BQU0sRUFBRSxJQUFJLElBQ1o7U0FDSDtRQUVELEtBQUssOERBQThCLENBQUMsMkJBQTJCLENBQUMsQ0FBQztZQUMvRCx1Q0FDSyxlQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLEtBQzNDLE9BQU8sRUFBRSxLQUFLLEVBQ2QsTUFBTSxFQUFFLElBQUksSUFDWjtTQUNIO1FBRUQsS0FBSyw4REFBOEIsQ0FBQyw0Q0FBNEMsQ0FBQztRQUNqRixLQUFLLDhEQUE4QixDQUFDLDJCQUEyQixDQUFDO1FBQ2hFLEtBQUssOERBQThCLENBQUMsZ0NBQWdDLENBQUM7UUFDckUsS0FBSyw4REFBOEIsQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDO1lBQzVFLHVDQUNLLEtBQUssS0FDUixPQUFPLEVBQUUsS0FBSyxFQUNkLE1BQU0sRUFBRSxJQUFJLElBQ1o7U0FDSDtRQUVEO1lBQ0UsT0FBTyxLQUFLLENBQUM7S0FDaEI7QUFDSCxDQUFDO0FBckRELDBCQXFEQztBQUVZLG1DQUFzRCwrRUFBQztBQUN2RCxRQUFBLFFBQVEsR0FBRyx1QkFBYSxFQUFFLENBQUM7QUFDM0IsUUFBQSxVQUFVLEdBQUcseUJBQWUsRUFBRSxDQUFDO0FBQy9CLFFBQUEsZ0JBQWdCLEdBQUcsQ0FBQyxLQUFZLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMifQ==