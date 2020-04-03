"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("@concourse/shared/helpers");
const state_adapter_1 = require("@concourse/shared/state-adapter");
const policy_group_actions_1 = require("./policy-group.actions");
exports.adapter = state_adapter_1.createEntityAdapter();
exports.initialState = exports.adapter.getInitialState({
    ids: [],
    surfaceLayerId: undefined,
    status: undefined,
    selectedPolicyGroup: undefined,
    loading: false,
    loaded: false,
    hasNextLink: undefined
});
function reducer(state = exports.initialState, action) {
    switch (action.type) {
        case policy_group_actions_1.PolicyGroupActionTypes.LoadPolicyGroupsByPagination:
        case policy_group_actions_1.PolicyGroupActionTypes.CreatePolicyGroup:
        case policy_group_actions_1.PolicyGroupActionTypes.LoadPolicyGroups:
        case policy_group_actions_1.PolicyGroupActionTypes.LoadPolicyGroupsBySurfaceLayerIds:
        case policy_group_actions_1.PolicyGroupActionTypes.LoadPolicyGroup:
        case policy_group_actions_1.PolicyGroupActionTypes.UpdatePolicyGroup:
        case policy_group_actions_1.PolicyGroupActionTypes.UpdatePolicyGroupRelated:
        case policy_group_actions_1.PolicyGroupActionTypes.DeletePolicyGroup:
        case policy_group_actions_1.PolicyGroupActionTypes.SearchPolicyGroup: {
            return Object.assign(Object.assign({}, state), { loading: true });
        }
        case policy_group_actions_1.PolicyGroupActionTypes.LoadPolicyGroupsSuccess: {
            return Object.assign(Object.assign({}, exports.adapter.addAll(action.payload, state)), { loading: false, loaded: true });
        }
        case policy_group_actions_1.PolicyGroupActionTypes.LoadPolicyGroupsByPaginationSuccess: {
            const { policyGroups, hasNextLink } = action.payload;
            return Object.assign(Object.assign({}, exports.adapter.addMany(policyGroups, state)), { hasNextLink, loading: false, loaded: true });
        }
        case policy_group_actions_1.PolicyGroupActionTypes.LoadPolicyGroupsBySurfaceLayerIdsSuccess: {
            return Object.assign(Object.assign({}, exports.adapter.addAll(action.payload, state)), { loading: false, loaded: true });
        }
        case policy_group_actions_1.PolicyGroupActionTypes.LoadPolicyGroupSuccess: {
            return Object.assign(Object.assign({}, exports.adapter.upsertOne(action.payload, state)), { loading: false });
        }
        case policy_group_actions_1.PolicyGroupActionTypes.DeletePolicyGroupSuccess: {
            return Object.assign(Object.assign({}, exports.adapter.removeOne(action.payload, state)), { loading: false });
        }
        case policy_group_actions_1.PolicyGroupActionTypes.DeletePolicyGroupPending: {
            const update = {
                id: action.payload.id,
                changes: {
                    approvalStatus: action.payload.approvalStatus
                }
            };
            return Object.assign(Object.assign({}, exports.adapter.updateOne(update, state)), { loading: false, loaded: true });
        }
        case policy_group_actions_1.PolicyGroupActionTypes.CreatePolicyGroupSuccess: {
            return Object.assign(Object.assign({}, exports.adapter.addOne(action.payload, state)), { loading: false });
        }
        case policy_group_actions_1.PolicyGroupActionTypes.UpdatePolicyGroupRelatedSuccess: {
            return Object.assign(Object.assign({}, exports.adapter.upsertOne(action.payload, state)), { loading: false });
        }
        case policy_group_actions_1.PolicyGroupActionTypes.UpdatePolicyGroupSuccess: {
            let newState = state;
            if (action.payload.status === 'PUBLISHED') {
                const toRemove = Object.values(state.entities)
                    .filter(cr => cr.lineageId === action.payload.lineageId)
                    .map(cr => cr.id);
                newState = exports.adapter.removeMany(toRemove, newState);
            }
            return Object.assign(Object.assign({}, exports.adapter.upsertOne(action.payload, newState)), { loading: false, loaded: true });
        }
        case policy_group_actions_1.PolicyGroupActionTypes.SelectPolicyGroup: {
            return Object.assign(Object.assign({}, state), { selectedPolicyGroup: action.payload });
        }
        case policy_group_actions_1.PolicyGroupActionTypes.SearchPolicyGroupSuccess: {
            return Object.assign(Object.assign({}, state), { ids: action.payload, loading: false });
        }
        case policy_group_actions_1.PolicyGroupActionTypes.ResetPolicyGroupResults: {
            return Object.assign(Object.assign({}, state), { ids: Object.keys(state.entities).map(id => +id) });
        }
        case policy_group_actions_1.PolicyGroupActionTypes.LoadPolicyGroupsByPaginationFailure:
        case policy_group_actions_1.PolicyGroupActionTypes.CreatePolicyGroupFailure:
        case policy_group_actions_1.PolicyGroupActionTypes.LoadPolicyGroupsFailure:
        case policy_group_actions_1.PolicyGroupActionTypes.LoadPolicyGroupsBySurfaceLayerIdsFailure:
        case policy_group_actions_1.PolicyGroupActionTypes.LoadPolicyGroupFailure:
        case policy_group_actions_1.PolicyGroupActionTypes.UpdatePolicyGroupFailure:
        case policy_group_actions_1.PolicyGroupActionTypes.UpdatePolicyGroupRelatedFailure:
        case policy_group_actions_1.PolicyGroupActionTypes.DeletePolicyGroupFailure: {
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
exports.selectedPolicyGroupId = (state) => state.selectedPolicyGroup;
exports.selectedPolicyGroupStatus = (state) => state.status;
exports.selectedPolicyGroupSurfaceLayerId = (state) => state.surfaceLayerId;
exports.hasNextLink = (state) => state.hasNextLink;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9saWN5LWdyb3VwLnJlZHVjZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc3RvcmUvcG9saWN5LWdyb3VwL3N0YXRlL3BvbGljeS1ncm91cC5yZWR1Y2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUdBLHVEQUEyRTtBQUMzRSxtRUFBc0U7QUFDdEUsaUVBQW9GO0FBWXZFLFFBQUEsT0FBTyxHQUErQixtQ0FBbUIsRUFBZSxDQUFDO0FBRXpFLFFBQUEsWUFBWSxHQUFVLGVBQU8sQ0FBQyxlQUFlLENBQUM7SUFDekQsR0FBRyxFQUFFLEVBQUU7SUFDUCxjQUFjLEVBQUUsU0FBUztJQUN6QixNQUFNLEVBQUUsU0FBUztJQUNqQixtQkFBbUIsRUFBRSxTQUFTO0lBQzlCLE9BQU8sRUFBRSxLQUFLO0lBQ2QsTUFBTSxFQUFFLEtBQUs7SUFDYixXQUFXLEVBQUUsU0FBUztDQUN2QixDQUFDLENBQUM7QUFFSCxTQUFnQixPQUFPLENBQUMsS0FBSyxHQUFHLG9CQUFZLEVBQUUsTUFBMEI7SUFDdEUsUUFBUSxNQUFNLENBQUMsSUFBSSxFQUFFO1FBQ25CLEtBQUssNkNBQXNCLENBQUMsNEJBQTRCLENBQUM7UUFDekQsS0FBSyw2Q0FBc0IsQ0FBQyxpQkFBaUIsQ0FBQztRQUM5QyxLQUFLLDZDQUFzQixDQUFDLGdCQUFnQixDQUFDO1FBQzdDLEtBQUssNkNBQXNCLENBQUMsaUNBQWlDLENBQUM7UUFDOUQsS0FBSyw2Q0FBc0IsQ0FBQyxlQUFlLENBQUM7UUFDNUMsS0FBSyw2Q0FBc0IsQ0FBQyxpQkFBaUIsQ0FBQztRQUM5QyxLQUFLLDZDQUFzQixDQUFDLHdCQUF3QixDQUFDO1FBQ3JELEtBQUssNkNBQXNCLENBQUMsaUJBQWlCLENBQUM7UUFDOUMsS0FBSyw2Q0FBc0IsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lB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