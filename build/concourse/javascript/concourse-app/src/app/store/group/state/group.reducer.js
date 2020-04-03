"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("@concourse/shared/helpers");
const state_adapter_1 = require("@concourse/shared/state-adapter");
const group_actions_1 = require("./group.actions");
exports.adapter = state_adapter_1.createEntityAdapter();
exports.initialState = exports.adapter.getInitialState({
    ids: [],
    selectedGroup: undefined,
    loading: false,
    loaded: false,
    hasNextLink: undefined
});
function reducer(state = exports.initialState, action) {
    switch (action.type) {
        case group_actions_1.GroupActionTypes.LoadGroupsByPagination:
        case group_actions_1.GroupActionTypes.LoadGroups:
        case group_actions_1.GroupActionTypes.LoadGroup:
        case group_actions_1.GroupActionTypes.CreateGroup:
        case group_actions_1.GroupActionTypes.UpdateGroup:
        case group_actions_1.GroupActionTypes.DeleteGroup:
        case group_actions_1.GroupActionTypes.AddUserToGroup:
        case group_actions_1.GroupActionTypes.RemoveUserFromGroup:
        case group_actions_1.GroupActionTypes.SearchGroups: {
            return Object.assign(Object.assign({}, state), { loading: true, loaded: false });
        }
        case group_actions_1.GroupActionTypes.LoadGroupsSuccess:
        case group_actions_1.GroupActionTypes.LoadRoleAssignmentsBySurfaceLayerIdsSuccess: {
            return Object.assign(Object.assign({}, exports.adapter.upsertMany(action.payload.map(addGroupToRoleAssignments), state)), { loading: false, loaded: true });
        }
        case group_actions_1.GroupActionTypes.LoadGroupSuccess: {
            return Object.assign(Object.assign({}, exports.adapter.upsertOne(addGroupToRoleAssignments(action.payload), state)), { loading: false, loaded: true });
        }
        case group_actions_1.GroupActionTypes.LoadGroupsByPaginationSuccess: {
            const { groups, hasNextLink } = action.payload;
            return Object.assign(Object.assign({}, exports.adapter.upsertMany(groups.map(addGroupToRoleAssignments), state)), { loading: false, loaded: true, hasNextLink });
        }
        case group_actions_1.GroupActionTypes.SelectGroup: {
            return Object.assign(Object.assign({}, state), { selectedGroup: action.payload });
        }
        case group_actions_1.GroupActionTypes.CreateGroupSuccess: {
            return Object.assign(Object.assign({}, exports.adapter.addOne(action.payload, state)), { loading: false, loaded: true });
        }
        case group_actions_1.GroupActionTypes.UpdateGroupSuccess:
        case group_actions_1.GroupActionTypes.CreateRoleAssignmentSuccess: {
            return Object.assign(Object.assign({}, exports.adapter.upsertOne(addGroupToRoleAssignments(action.payload), state)), { loading: false, loaded: true });
        }
        case group_actions_1.GroupActionTypes.DeleteGroupSuccess: {
            return Object.assign(Object.assign({}, exports.adapter.removeOne(action.payload, state)), { loading: false, loaded: true });
        }
        case group_actions_1.GroupActionTypes.AddUserToGroupSuccess:
        case group_actions_1.GroupActionTypes.RemoveUserFromGroupSuccess: {
            const update = {
                id: action.payload.id,
                changes: {
                    users: action.payload.users
                }
            };
            return Object.assign(Object.assign({}, exports.adapter.updateOne(update, state)), { loading: false, loaded: true });
        }
        case group_actions_1.GroupActionTypes.RemoveRoleAssignmentSuccess: {
            const update = {
                id: action.payload.groupId,
                changes: {
                    assignedRoles: state.entities[action.payload.groupId].assignedRoles
                        .filter(ar => ar.id !== action.payload.roleAssignmentId)
                }
            };
            return Object.assign(Object.assign({}, exports.adapter.updateOne(update, state)), { loading: false, loaded: true });
        }
        case group_actions_1.GroupActionTypes.SearchGroupsSuccess: {
            return Object.assign(Object.assign({}, state), { ids: action.payload, loading: false, loaded: true });
        }
        case group_actions_1.GroupActionTypes.ResetGroupSearchResults: {
            return Object.assign(Object.assign({}, state), { ids: Object.keys(state.entities).map(id => +id) });
        }
        case group_actions_1.GroupActionTypes.LoadGroupsByPaginationFailure:
        case group_actions_1.GroupActionTypes.LoadGroupsFailure:
        case group_actions_1.GroupActionTypes.LoadGroupFailure:
        case group_actions_1.GroupActionTypes.CreateGroupFailure:
        case group_actions_1.GroupActionTypes.UpdateGroupFailure:
        case group_actions_1.GroupActionTypes.DeleteGroupFailure:
        case group_actions_1.GroupActionTypes.AddUserToGroupFailure:
        case group_actions_1.GroupActionTypes.RemoveUserFromGroupFailure: {
            return Object.assign(Object.assign({}, state), { loading: false, loaded: true });
        }
        default:
            return state;
    }
}
exports.reducer = reducer;
const addGroupToRoleAssignments = (group) => group.copyWith({ assignedRoles: group.assignedRoles.map(ar => ar.copyWith({ group: { id: group.id } })) });
_a = exports.adapter.getSelectors(), exports.selectAll = _a.selectAll, exports.selectEntities = _a.selectEntities;
exports.selectedId = (state) => state.selectedGroup;
exports.isLoaded = helpers_1.isStateLoaded();
exports.isUpdating = helpers_1.isStateUpdating();
exports.hasNextLink = (state) => state.hasNextLink;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvdXAucmVkdWNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zdG9yZS9ncm91cC9zdGF0ZS9ncm91cC5yZWR1Y2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUdBLHVEQUEyRTtBQUMzRSxtRUFBc0U7QUFDdEUsbURBQWlFO0FBVXBELFFBQUEsT0FBTyxHQUF5QixtQ0FBbUIsRUFBUyxDQUFDO0FBRTdELFFBQUEsWUFBWSxHQUFVLGVBQU8sQ0FBQyxlQUFlLENBQUM7SUFDekQsR0FBRyxFQUFFLEVBQUU7SUFDUCxhQUFhLEVBQUUsU0FBUztJQUN4QixPQUFPLEVBQUUsS0FBSztJQUNkLE1BQU0sRUFBRSxLQUFLO0lBQ2IsV0FBVyxFQUFFLFNBQVM7Q0FDdkIsQ0FBQyxDQUFDO0FBRUgsU0FBZ0IsT0FBTyxDQUFDLEtBQUssR0FBRyxvQkFBWSxFQUFFLE1BQW9CO0lBQ2hFLFFBQVEsTUFBTSxDQUFDLElBQUksRUFBRTtRQUNuQixLQUFLLGdDQUFnQixDQUFDLHNCQUFzQixDQUFDO1FBQzdDLEtBQUssZ0NBQWdCLENBQUMsVUFBVSxDQUFDO1FBQ2pDLEtBQUssZ0NBQWdCLENBQUMsU0FBUyxDQUFDO1FBQ2hDLEtBQUssZ0NBQWdCLENBQUMsV0FBVyxDQUFDO1FBQ2xDLEtBQUssZ0NBQWdCLENBQUMsV0FBVyxDQUFDO1FBQ2xDLEtBQUssZ0NBQWdCLENBQUMsV0FBVyxDQUFDO1FBQ2xDLEtBQUssZ0NBQWdCLENBQUMsY0FBYyxDQUFDO1FBQ3JDLEtBQUssZ0NBQWdCLENBQUMsbUJBQW1CLENBQUM7UUFDMUMsS0FBSyxnQ0FBZ0IsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUNsQyx1Q0FDSyxLQUFLLEtBQ1IsT0FBTyxFQUFFLElBQUksRUFDYixNQUFNLEVBQUUsS0FBSyxJQUNiO1NBQ0g7UUFFRCxLQUFLLGdD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