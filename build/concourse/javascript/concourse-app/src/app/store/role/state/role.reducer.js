"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("@concourse/shared/helpers");
const state_adapter_1 = require("@concourse/shared/state-adapter");
const role_actions_1 = require("./role.actions");
exports.adapter = state_adapter_1.createEntityAdapter();
exports.initialState = exports.adapter.getInitialState({
    ids: [],
    loading: false,
    loaded: false,
    selectedRole: undefined
});
function reducer(state = exports.initialState, action) {
    switch (action.type) {
        case role_actions_1.RoleActionTypes.LoadRoles: {
            return Object.assign(Object.assign({}, state), { loading: true, loaded: false });
        }
        case role_actions_1.RoleActionTypes.LoadRolesSuccess: {
            return Object.assign(Object.assign({}, exports.adapter.addAll(action.payload, state)), { loading: false, loaded: true });
        }
        case role_actions_1.RoleActionTypes.LoadRolesFailure: {
            return Object.assign(Object.assign({}, state), { loading: false });
        }
        case role_actions_1.RoleActionTypes.LoadRoleResponsibilities: {
            return Object.assign(Object.assign({}, state), { selectedRole: action.payload });
        }
        default:
            return state;
    }
}
exports.reducer = reducer;
_a = exports.adapter.getSelectors(), exports.selectAll = _a.selectAll, exports.selectEntities = _a.selectEntities;
exports.isLoaded = helpers_1.isStateLoaded();
exports.isUpdating = helpers_1.isStateUpdating();
exports.selectedRole = (state) => state.selectedRole;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9sZS5yZWR1Y2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3N0b3JlL3JvbGUvc3RhdGUvcm9sZS5yZWR1Y2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUdBLHVEQUEyRTtBQUMzRSxtRUFBc0U7QUFDdEUsaURBQThEO0FBU2pELFFBQUEsT0FBTyxHQUF3QixtQ0FBbUIsRUFBUSxDQUFDO0FBRTNELFFBQUEsWUFBWSxHQUFVLGVBQU8sQ0FBQyxlQUFlLENBQUM7SUFDekQsR0FBRyxFQUFFLEVBQUU7SUFDUCxPQUFPLEVBQUUsS0FBSztJQUNkLE1BQU0sRUFBRSxLQUFLO0lBQ2IsWUFBWSxFQUFFLFNBQVM7Q0FDeEIsQ0FBQyxDQUFDO0FBRUgsU0FBZ0IsT0FBTyxDQUFDLEtBQUssR0FBRyxvQkFBWSxFQUFFLE1BQW1CO0lBQy9ELFFBQVEsTUFBTSxDQUFDLElBQUksRUFBRTtRQUVuQixLQUFLLDhCQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDOUIsdUNBQ0ssS0FBSyxLQUNSLE9BQU8sRUFBRSxJQUFJLEVBQ2IsTUFBTSxFQUFFLEtBQUssSUFDYjtTQUNIO1FBRUQsS0FBSyw4QkFBZSxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDckMsdUNBQ0ssZUFBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxLQUN4QyxPQUFPLEVBQUUsS0FBSyxFQUNkLE1BQU0sRUFBRSxJQUFJLElBQ1o7U0FDSDtRQUVELEtBQUssOEJBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ3JDLHVDQUNLLEtBQUssS0FDUixPQUFPLEVBQUUsS0FBSyxJQUNkO1NBQ0g7UUFFRCxLQUFLLDhCQUFlLENBQUMsd0JBQXdCLENBQUMsQ0FBQztZQUM3Qyx1Q0FDSyxLQUFLLEtBQ1IsWUFBWSxFQUFFLE1BQU0sQ0FBQyxPQUFPLElBQzVCO1NBQ0g7UUFFRDtZQUNFLE9BQU8sS0FBSyxDQUFDO0tBQ2hCO0FBQ0gsQ0FBQztBQXBDRCwwQkFvQ0M7QUFFWSxtQ0FBc0QsK0VBQUM7QUFDdkQsUUFBQSxRQUFRLEdBQUcsdUJBQWEsRUFBRSxDQUFDO0FBQzNCLFFBQUEsVUFBVSxHQUFHLHlCQUFlLEVBQUUsQ0FBQztBQUMvQixRQUFBLFlBQVksR0FBRyxDQUFDLEtBQVksRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyJ9