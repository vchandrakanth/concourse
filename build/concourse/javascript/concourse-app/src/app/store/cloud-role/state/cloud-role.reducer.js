"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("@concourse/shared/helpers");
const state_adapter_1 = require("@concourse/shared/state-adapter");
const cloud_role_actions_1 = require("./cloud-role.actions");
exports.adapter = state_adapter_1.createEntityAdapter();
exports.initialState = exports.adapter.getInitialState({
    ids: [],
    loading: false,
    loaded: false,
    selectedCloudRole: undefined,
    cloudRolesSyncPending: false,
    hasNextLink: undefined
});
function reducer(state = exports.initialState, action) {
    switch (action.type) {
        case cloud_role_actions_1.CloudRoleActionTypes.LoadCloudRolesByPagination:
        case cloud_role_actions_1.CloudRoleActionTypes.SearchCloudRoles:
        case cloud_role_actions_1.CloudRoleActionTypes.UpdateAwsActions:
        case cloud_role_actions_1.CloudRoleActionTypes.UpdateNonAwsActions:
        case cloud_role_actions_1.CloudRoleActionTypes.UpdateAzureActions:
        case cloud_role_actions_1.CloudRoleActionTypes.UpdateNonAzureActions:
        case cloud_role_actions_1.CloudRoleActionTypes.UpdateCloudRole:
        case cloud_role_actions_1.CloudRoleActionTypes.DeleteCloudRole:
        case cloud_role_actions_1.CloudRoleActionTypes.CreateCloudRole:
        case cloud_role_actions_1.CloudRoleActionTypes.LoadCloudRole:
        case cloud_role_actions_1.CloudRoleActionTypes.LoadCloudRoles: {
            return Object.assign(Object.assign({}, state), { loading: true, loaded: false });
        }
        case cloud_role_actions_1.CloudRoleActionTypes.LoadCloudRolesSuccess: {
            return Object.assign(Object.assign({}, exports.adapter.addMany(action.payload, state)), { loading: false, loaded: true });
        }
        case cloud_role_actions_1.CloudRoleActionTypes.LoadCloudRolesByPaginationSuccess: {
            const { hasNextLink, cloudRoles } = action.payload;
            return Object.assign(Object.assign({}, exports.adapter.addMany(cloudRoles, state)), { loading: false, loaded: true, hasNextLink });
        }
        case cloud_role_actions_1.CloudRoleActionTypes.SelectCloudRole: {
            return Object.assign(Object.assign({}, state), { selectedCloudRole: action.payload });
        }
        case cloud_role_actions_1.CloudRoleActionTypes.UpdateAwsActionsSuccess:
        case cloud_role_actions_1.CloudRoleActionTypes.UpdateNonAwsActionsSuccess:
        case cloud_role_actions_1.CloudRoleActionTypes.UpdateAzureActionsSuccess:
        case cloud_role_actions_1.CloudRoleActionTypes.UpdateNonAzureActionsSuccess:
        case cloud_role_actions_1.CloudRoleActionTypes.LoadCloudRoleSuccess: {
            return Object.assign(Object.assign({}, exports.adapter.upsertOne(action.payload, state)), { loading: false, loaded: true });
        }
        case cloud_role_actions_1.CloudRoleActionTypes.UpdateCloudRoleSuccess: {
            let newState = state;
            if (action.payload.status === 'PUBLISHED') {
                const toRemove = Object.values(state.entities)
                    .filter(cr => cr.lineageId === action.payload.lineageId)
                    .map(cr => cr.id);
                newState = exports.adapter.removeMany(toRemove, newState);
            }
            return Object.assign(Object.assign({}, exports.adapter.upsertOne(action.payload, newState)), { loading: false, loaded: true });
        }
        case cloud_role_actions_1.CloudRoleActionTypes.CreateCloudRoleSuccess: {
            return Object.assign(Object.assign({}, exports.adapter.addOne(action.payload, state)), { loading: false, loaded: true });
        }
        case cloud_role_actions_1.CloudRoleActionTypes.DeleteCloudRoleSuccess: {
            return Object.assign(Object.assign({}, exports.adapter.removeOne(action.payload, state)), { loading: false, loaded: true });
        }
        case cloud_role_actions_1.CloudRoleActionTypes.SearchCloudRolesSuccess: {
            return Object.assign(Object.assign({}, state), { ids: action.payload, loading: false });
        }
        case cloud_role_actions_1.CloudRoleActionTypes.ResetCloudRoleSearch: {
            return Object.assign(Object.assign({}, state), { ids: Object.keys(state.entities).map(id => +id) });
        }
        case cloud_role_actions_1.CloudRoleActionTypes.SyncCloudRolesAzure: {
            return Object.assign(Object.assign({}, state), { cloudRolesSyncPending: true });
        }
        case cloud_role_actions_1.CloudRoleActionTypes.SyncCloudRolesAzureSuccess:
        case cloud_role_actions_1.CloudRoleActionTypes.SyncCloudRolesAzureFailure: {
            return Object.assign(Object.assign({}, state), { cloudRolesSyncPending: false });
        }
        case cloud_role_actions_1.CloudRoleActionTypes.LoadCloudRolesByPaginationFailure:
        case cloud_role_actions_1.CloudRoleActionTypes.UpdateAwsActionsFailure:
        case cloud_role_actions_1.CloudRoleActionTypes.UpdateNonAwsActionsFailure:
        case cloud_role_actions_1.CloudRoleActionTypes.UpdateAzureActionsFailure:
        case cloud_role_actions_1.CloudRoleActionTypes.UpdateNonAzureActionsFailure:
        case cloud_role_actions_1.CloudRoleActionTypes.UpdateCloudRoleFailure:
        case cloud_role_actions_1.CloudRoleActionTypes.DeleteCloudRoleFailure:
        case cloud_role_actions_1.CloudRoleActionTypes.LoadCloudRolesFailure:
        case cloud_role_actions_1.CloudRoleActionTypes.LoadCloudRoleFailure: {
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
exports.getSelected = (state) => state.selectedCloudRole;
exports.getCloudRoleSyncPending = (state) => state.cloudRolesSyncPending;
exports.hasNextLink = (state) => state.hasNextLink;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvdWQtcm9sZS5yZWR1Y2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3N0b3JlL2Nsb3VkLXJvbGUvc3RhdGUvY2xvdWQtcm9sZS5yZWR1Y2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUdBLHVEQUEyRTtBQUMzRSxtRUFBc0U7QUFDdEUsNkRBQThFO0FBV2pFLFFBQUEsT0FBTyxHQUE2QixtQ0FBbUIsRUFBYSxDQUFDO0FBRXJFLFFBQUEsWUFBWSxHQUFVLGVBQU8sQ0FBQyxlQUFlLENBQUM7SUFDekQsR0FBRyxFQUFFLEVBQUU7SUFDUCxPQUFPLEVBQUUsS0FBSztJQUNkLE1BQU0sRUFBRSxLQUFLO0lBQ2IsaUJBQWlCLEVBQUUsU0FBUztJQUM1QixxQkFBcUIsRUFBRSxLQUFLO0lBQzVCLFdBQVcsRUFBRSxTQUFTO0NBQ3ZCLENBQUMsQ0FBQztBQUVILFNBQWdCLE9BQU8sQ0FBQyxLQUFLLEdBQUcsb0JBQVksRUFBRSxNQUF3QjtJQUNwRSxRQUFRLE1BQU0sQ0FBQyxJQUFJLEVBQUU7UUFDbkIsS0FBSyx5Q0FBb0IsQ0FBQywwQkFBMEIsQ0FBQztRQUNyRCxLQUFLLHlDQUFvQixDQUFDLGdCQUFnQixDQUFDO1FBQzNDLEtBQUsseUNBQW9CLENBQUMsZ0JBQWdCLENBQUM7UUFDM0MsS0FBSyx5Q0FBb0IsQ0FBQyxtQkFBbUIsQ0FBQztRQUM5QyxLQUFLLHlDQUFvQixDQUFDLGtCQUFrQixDQUFDO1FBQzdDLEtBQUsseUNBQW9CLENBQUMscUJBQXFCLENBQUM7UUFDaEQsS0FBSyx5Q0FBb0IsQ0FBQyxlQUFlLENBQUM7UUFDMUMsS0FBSyx5Q0FBb0IsQ0FBQyxlQUFlLENBQUM7UUFDMUMsS0FBSyx5Q0FBb0IsQ0FBQyxlQUFlLENBQUM7UUFDMUMsS0FBSyx5Q0FBb0IsQ0FBQyxhQUFhLENBQUM7UUFD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