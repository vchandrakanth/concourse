"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("@concourse/shared/helpers");
const state_adapter_1 = require("@concourse/shared/state-adapter");
const surface_actions_1 = require("./surface.actions");
exports.adapter = state_adapter_1.createEntityAdapter();
exports.initialState = exports.adapter.getInitialState({
    ids: [],
    selectedSurface: undefined,
    loading: false,
    loaded: false
});
function reducer(state = exports.initialState, action) {
    switch (action.type) {
        case surface_actions_1.SurfaceActionTypes.UpdateSurface:
        case surface_actions_1.SurfaceActionTypes.DeleteSurface:
        case surface_actions_1.SurfaceActionTypes.CreateSurface:
        case surface_actions_1.SurfaceActionTypes.LoadSurface:
        case surface_actions_1.SurfaceActionTypes.LoadSurfaces: {
            return Object.assign(Object.assign({}, state), { loading: true, loaded: false });
        }
        case surface_actions_1.SurfaceActionTypes.LoadSurfacesSuccess: {
            return Object.assign(Object.assign({}, exports.adapter.addAll(action.payload, state)), { loading: false, loaded: true });
        }
        case surface_actions_1.SurfaceActionTypes.LoadSurfaceSuccess: {
            return Object.assign(Object.assign({}, exports.adapter.upsertOne(action.payload, state)), { loading: false, loaded: true });
        }
        case surface_actions_1.SurfaceActionTypes.SelectSurface: {
            return Object.assign(Object.assign({}, state), { selectedSurface: action.payload });
        }
        case surface_actions_1.SurfaceActionTypes.CreateSurfaceSuccess: {
            return Object.assign(Object.assign({}, exports.adapter.addOne(action.payload, state)), { loading: false, loaded: true });
        }
        case surface_actions_1.SurfaceActionTypes.UpdateSurfaceSuccess: {
            return Object.assign(Object.assign({}, exports.adapter.upsertOne(action.payload, state)), { loading: false, loaded: true });
        }
        case surface_actions_1.SurfaceActionTypes.DeleteSurfaceSuccess: {
            const newState = exports.adapter.removeOne(action.payload, state);
            return Object.assign(Object.assign({}, newState), { selectedSurface: newState.ids.length > 0 ? newState.ids[0] : undefined, loading: false, loaded: true });
        }
        case surface_actions_1.SurfaceActionTypes.UpdateSurfaceFailure:
        case surface_actions_1.SurfaceActionTypes.DeleteSurfaceFailure:
        case surface_actions_1.SurfaceActionTypes.CreateSurfaceFailure:
        case surface_actions_1.SurfaceActionTypes.LoadSurfaceFailure:
        case surface_actions_1.SurfaceActionTypes.LoadSurfacesFailure: {
            return Object.assign(Object.assign({}, state), { loading: false, loaded: true });
        }
        default:
            return state;
    }
}
exports.reducer = reducer;
_a = exports.adapter.getSelectors(), exports.selectAll = _a.selectAll, exports.selectEntities = _a.selectEntities;
exports.selectedSurfaceId = (state) => state.selectedSurface;
exports.isLoaded = helpers_1.isStateLoaded();
exports.isUpdating = helpers_1.isStateUpdating();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VyZmFjZS5yZWR1Y2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3N0b3JlL3N1cmZhY2Uvc3RhdGUvc3VyZmFjZS5yZWR1Y2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUdBLHVEQUEyRTtBQUMzRSxtRUFBc0U7QUFDdEUsdURBQXVFO0FBUzFELFFBQUEsT0FBTyxHQUEyQixtQ0FBbUIsRUFBVyxDQUFDO0FBRWpFLFFBQUEsWUFBWSxHQUFVLGVBQU8sQ0FBQyxlQUFlLENBQUM7SUFDekQsR0FBRyxFQUFFLEVBQUU7SUFDUCxlQUFlLEVBQUUsU0FBUztJQUMxQixPQUFPLEVBQUUsS0FBSztJQUNkLE1BQU0sRUFBRSxLQUFLO0NBQ2QsQ0FBQyxDQUFDO0FBRUgsU0FBZ0IsT0FBTyxDQUFDLEtBQUssR0FBRyxvQkFBWSxFQUFFLE1BQXNCO0lBQ2xFLFFBQVEsTUFBTSxDQUFDLElBQUksRUFBRTtRQUNuQixLQUFLLG9DQUFrQixDQUFDLGFBQWEsQ0FBQztRQUN0QyxLQUFLLG9DQUFrQixDQUFDLGFBQWEsQ0FBQztRQUN0QyxLQUFLLG9DQUFrQixDQUFDLGFBQWEsQ0FBQztRQUN0QyxLQUFLLG9DQUFrQixDQUFDLFdBQVcsQ0FBQztRQUNwQyxLQUFLLG9DQUFrQixDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ3BDLHVDQUNLLEtBQUssS0FDUixPQUFPLEVBQUUsSUFBSSxFQUNiLE1BQU0sRUFBRSxLQUFLLElBQ2I7U0FDSDtRQUVELEtBQUssb0NBQWtCLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUMzQyx1Q0FDSyxlQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLEtBQ3hDLE9BQU8sRUFBRSxLQUFLLEVBQ2QsTUFBTSxFQUFFLElBQUksSUFDWjtTQUNIO1FBRUQsS0FBSyxvQ0FBa0IsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBQzFDLHVDQUNLLGVBQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsS0FDM0MsT0FBTyxFQUFFLEtBQUssRUFDZCxNQUFNLEVBQUUsSUFBSSxJQUNaO1NBQ0g7UUFFRCxLQUFLLG9DQUFrQixDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ3JDLHVDQUNLLEtBQUssS0FDUixlQUFlLEVBQUUsTUFBTSxDQUFDLE9BQU8sSUFDL0I7U0FDSDtRQUVELEtBQUssb0NBQWtCLENBQUMsb0JBQW9CLENBQUMsQ0FBQztZQUM1Qyx1Q0FDSyxlQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLEtBQ3hDLE9BQU8sRUFBRSxLQUFLLEVBQ2QsTUFBTSxFQUFFLElBQUksSUFDWjtTQUNIO1FBRUQsS0FBSyxvQ0FBa0IsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1lBQzVDLHVDQUNLLGVBQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsS0FDM0MsT0FBTyxFQUFFLEtBQUssRUFDZCxNQUFNLEVBQUUsSUFBSSxJQUNaO1NBQ0g7UUFFRCxLQUFLLG9DQUFrQixDQUFDLG9CQUFvQixDQUFDLENBQUM7WUFDNUMsTUFBTSxRQUFRLEdBQUcsZUFBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQzFELHVDQUNLLFFBQVEsS0FDWCxlQUFlLEVBQUUsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQ3RFLE9BQU8sRUFBRSxLQUFLLEVBQ2QsTUFBTSxFQUFFLElBQUksSUFDWjtTQUNIO1FBRUQsS0FBSyxvQ0FBa0IsQ0FBQyxvQkFBb0IsQ0FBQztRQUM3QyxLQUFLLG9DQUFrQixDQUFDLG9CQUFvQixDQUFDO1FBQzdDLEtBQUssb0NBQWtCLENBQUMsb0JBQW9CLENBQUM7UUFDN0MsS0FBSyxvQ0FBa0IsQ0FBQyxrQkFBa0IsQ0FBQztRQUMzQyxLQUFLLG9DQUFrQixDQUFDLG1CQUFtQixDQUFDLENBQUM7WUFDM0MsdUNBQ0ssS0FBSyxLQUNSLE9BQU8sRUFBRSxLQUFLLEVBQ2QsTUFBTSxFQUFFLElBQUksSUFDWjtTQUNIO1FBRUQ7WUFDRSxPQUFPLEtBQUssQ0FBQztLQUNoQjtBQUNILENBQUM7QUE5RUQsMEJBOEVDO0FBRVksbUNBQXNELCtFQUFDO0FBQ3ZELFFBQUEsaUJBQWlCLEdBQUcsQ0FBQyxLQUFZLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUM7QUFDNUQsUUFBQSxRQUFRLEdBQUcsdUJBQWEsRUFBRSxDQUFDO0FBQzNCLFFBQUEsVUFBVSxHQUFHLHlCQUFlLEVBQUUsQ0FBQyJ9