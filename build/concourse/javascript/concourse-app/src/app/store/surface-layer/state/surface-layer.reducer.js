"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("@concourse/shared/helpers");
const state_adapter_1 = require("@concourse/shared/state-adapter");
const surface_layer_actions_1 = require("./surface-layer.actions");
exports.adapter = state_adapter_1.createEntityAdapter();
exports.initialState = exports.adapter.getInitialState({
    ids: [],
    selectedSurfaceLayer: undefined,
    loading: false,
    loaded: false
});
function reducer(state = exports.initialState, action) {
    switch (action.type) {
        case surface_layer_actions_1.SurfaceLayerActionTypes.LoadSurfaceLayers:
        case surface_layer_actions_1.SurfaceLayerActionTypes.AddSurfaceLayer:
        case surface_layer_actions_1.SurfaceLayerActionTypes.RemoveSurfaceLayer:
        case surface_layer_actions_1.SurfaceLayerActionTypes.UpdateSurfaceLayer: {
            return Object.assign(Object.assign({}, state), { loading: true });
        }
        case surface_layer_actions_1.SurfaceLayerActionTypes.LoadSurfaceLayersSuccess: {
            const surfaceLayers = action.payload.map(o => (o.copyWith({ isCollapsed: false })));
            return Object.assign(Object.assign({}, exports.adapter.upsertMany(surfaceLayers, state)), { loading: false, loaded: true });
        }
        case surface_layer_actions_1.SurfaceLayerActionTypes.AddSurfaceLayerSuccess: {
            const parentNode = state.entities[action.payload.parent];
            let updates = [action.payload.copyWith({ isCollapsed: false })];
            if (parentNode) {
                updates = [
                    ...updates,
                    parentNode.copyWith({
                        children: [
                            ...(parentNode.children === undefined ?
                                [] : parentNode.children),
                            action.payload.id
                        ],
                        isCollapsed: false,
                        isLeaf: false
                    })
                ];
            }
            return Object.assign(Object.assign({}, exports.adapter.upsertMany(updates, state)), { loading: false });
        }
        case surface_layer_actions_1.SurfaceLayerActionTypes.RemoveSurfaceLayerSuccess: {
            const parentNode = state.entities[action.payload.parent];
            const parentNodeChildren = parentNode.children.filter(id => id !== action.payload.id);
            const updatedParent = {
                id: action.payload.parent,
                changes: {
                    children: [...parentNodeChildren],
                    isLeaf: parentNodeChildren.length === 0
                }
            };
            state = exports.adapter.removeOne(action.payload.id, state);
            state = exports.adapter.updateOne(updatedParent, state);
            return Object.assign(Object.assign({}, state), { loading: false });
        }
        case surface_layer_actions_1.SurfaceLayerActionTypes.SelectSurfaceLayer: {
            return Object.assign(Object.assign({}, state), { selectedSurfaceLayer: action.payload });
        }
        case surface_layer_actions_1.SurfaceLayerActionTypes.ToggleCollapsedSurfaceLayer: {
            const update = {
                id: action.payload,
                changes: {
                    isCollapsed: !state.entities[action.payload].isCollapsed
                }
            };
            return Object.assign({}, exports.adapter.updateOne(update, state));
        }
        case surface_layer_actions_1.SurfaceLayerActionTypes.UpdateSurfaceLayerSuccess: {
            return Object.assign(Object.assign({}, exports.adapter.upsertOne(action.payload, state)), { loading: false });
        }
        case surface_layer_actions_1.SurfaceLayerActionTypes.LoadSurfaceLayersFailure:
        case surface_layer_actions_1.SurfaceLayerActionTypes.AddSurfaceLayerFailure:
        case surface_layer_actions_1.SurfaceLayerActionTypes.RemoveSurfaceLayerFailure:
        case surface_layer_actions_1.SurfaceLayerActionTypes.UpdateSurfaceLayerFailure: {
            return Object.assign(Object.assign({}, state), { loading: false });
        }
        default:
            return state;
    }
}
exports.reducer = reducer;
_a = exports.adapter.getSelectors(), exports.selectAll = _a.selectAll, exports.selectEntities = _a.selectEntities, exports.selectIds = _a.selectIds, exports.selectTotal = _a.selectTotal;
exports.getSelectedId = (state) => state.selectedSurfaceLayer;
exports.isLoaded = helpers_1.isStateLoaded();
exports.isUpdating = helpers_1.isStateUpdating();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VyZmFjZS1sYXllci5yZWR1Y2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3N0b3JlL3N1cmZhY2UtbGF5ZXIvc3RhdGUvc3VyZmFjZS1sYXllci5yZWR1Y2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUdBLHVEQUEyRTtBQUMzRSxtRUFBcUY7QUFDckYsbUVBQXVGO0FBUzFFLFFBQUEsT0FBTyxHQUFnQyxtQ0FBbUIsRUFBZ0IsQ0FBQztBQUUzRSxRQUFBLFlBQVksR0FBVSxlQUFPLENBQUMsZUFBZSxDQUFDO0lBQ3pELEdBQUcsRUFBRSxFQUFFO0lBQ1Asb0JBQW9CLEVBQUUsU0FBUztJQUMvQixPQUFPLEVBQUUsS0FBSztJQUNkLE1BQU0sRUFBRSxLQUFLO0NBQ2QsQ0FBQyxDQUFDO0FBRUgsU0FBZ0IsT0FBTyxDQUFDLEtBQUssR0FBRyxvQkFBWSxFQUFFLE1BQTJCO0lBQ3ZFLFFBQVEsTUFBTSxDQUFDLElBQUksRUFBRTtRQUNuQixLQUFLLCtDQUF1QixDQUFDLGlCQUFpQixDQUFDO1FBQy9DLEtBQUssK0NBQXVCLENBQUMsZUFBZSxDQUFDO1FBQzdDLEtBQUssK0NBQXVCLENBQUMsa0JBQWtCLENBQUM7UUFDaEQsS0FBSywrQ0FBdUIsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBQy9DLHVDQUNLLEtBQUssS0FDUixPQUFPLEVBQUUsSUFBSSxJQUNiO1NBQ0g7UUFFRCxLQUFLLCtDQUF1QixDQUFDLHdCQUF3QixDQUFDLENBQUM7WUFDckQsTUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUM1QyxDQUFDLENBQUMsUUFBUSxDQUNSLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxDQUN2QixDQUNGLENBQUMsQ0FBQztZQUNILHVD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