"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const state_adapter_1 = require("@concourse/shared/state-adapter");
const helpers_1 = require("@concourse/shared/helpers");
const baseline_asset_actions_1 = require("./baseline-asset.actions");
exports.adapter = state_adapter_1.createEntityAdapter();
exports.initialState = exports.adapter.getInitialState({
    ids: [],
    selectedBaselineAssetId: undefined,
    loading: false,
    loaded: false,
    formPending: false,
    stats: [],
    content: [],
    overview: undefined,
    hasNextLink: undefined
});
function reducer(state = exports.initialState, action) {
    switch (action.type) {
        case baseline_asset_actions_1.ActionTypes.LoadBaselineAssetsByPagination:
        case baseline_asset_actions_1.ActionTypes.LoadBaselineAssets:
        case baseline_asset_actions_1.ActionTypes.LoadBaselineAsset:
        case baseline_asset_actions_1.ActionTypes.LoadBaselineAssetStats:
        case baseline_asset_actions_1.ActionTypes.LoadBaselineAssetContent:
        case baseline_asset_actions_1.ActionTypes.LoadBaselineAssetOverview: {
            return Object.assign(Object.assign({}, state), { loading: true, loaded: false });
        }
        case baseline_asset_actions_1.ActionTypes.LoadBaselineAssetStatsSuccess: {
            return Object.assign(Object.assign({}, state), { stats: action.payload, loading: false, loaded: true });
        }
        case baseline_asset_actions_1.ActionTypes.LoadBaselineAssetContentSuccess: {
            return Object.assign(Object.assign({}, state), { content: action.payload, loading: false, loaded: true });
        }
        case baseline_asset_actions_1.ActionTypes.LoadBaselineAssetOverviewSuccess: {
            return Object.assign(Object.assign({}, state), { overview: action.payload, loading: false, loaded: true });
        }
        case baseline_asset_actions_1.ActionTypes.LoadBaselineAssetsSuccess: {
            return Object.assign(Object.assign({}, exports.adapter.upsertMany(action.payload, state)), { loading: false, loaded: true });
        }
        case baseline_asset_actions_1.ActionTypes.LoadBaselineAssetsByPaginationSuccess: {
            const { hasNextLink, baselineAssets } = action.payload;
            return Object.assign(Object.assign({}, exports.adapter.upsertMany(baselineAssets, state)), { loading: false, loaded: true, hasNextLink });
        }
        case baseline_asset_actions_1.ActionTypes.LoadBaselineAssetSuccess: {
            return Object.assign(Object.assign({}, exports.adapter.upsertOne(action.payload, state)), { loading: false, loaded: true });
        }
        case baseline_asset_actions_1.ActionTypes.CreateBaselineAsset: {
            return Object.assign(Object.assign({}, state), { loading: true, loaded: false });
        }
        case baseline_asset_actions_1.ActionTypes.CreateBaselineAssetSuccess: {
            return Object.assign(Object.assign({}, exports.adapter.addOne(action.payload, state)), { formPending: false, loading: false, loaded: true });
        }
        case baseline_asset_actions_1.ActionTypes.UpdateBaselineAssetSuccess: {
            return Object.assign(Object.assign({}, exports.adapter.upsertOne(action.payload, state)), { formPending: false });
        }
        case baseline_asset_actions_1.ActionTypes.DeleteBaselineAssetSuccess: {
            return Object.assign(Object.assign({}, exports.adapter.removeOne(action.payload, state)), { loading: false });
        }
        case baseline_asset_actions_1.ActionTypes.UpdateBaselineAzure: {
            return Object.assign(Object.assign({}, state), { loading: true, loaded: false });
        }
        case baseline_asset_actions_1.ActionTypes.UpdateBaselineAws: {
            return Object.assign(Object.assign({}, state), { loading: true, loaded: false });
        }
        case baseline_asset_actions_1.ActionTypes.SelectBaselineAsset: {
            return Object.assign(Object.assign({}, state), { selectedBaselineAssetId: action.payload });
        }
        case baseline_asset_actions_1.ActionTypes.LoadBaselineAssetsByPaginationFailure:
        case baseline_asset_actions_1.ActionTypes.LoadBaselineAssetsFailure:
        case baseline_asset_actions_1.ActionTypes.LoadBaselineAssetStatsFailure:
        case baseline_asset_actions_1.ActionTypes.LoadBaselineAssetContentFailure:
        case baseline_asset_actions_1.ActionTypes.CreateBaselineAssetFailure:
        case baseline_asset_actions_1.ActionTypes.UpdateBaselineAssetFailure:
        case baseline_asset_actions_1.ActionTypes.LoadBaselineAssetFailure: {
            return Object.assign(Object.assign({}, state), { loading: false, formPending: false });
        }
        default:
            return state;
    }
}
exports.reducer = reducer;
exports.isLoaded = helpers_1.isStateLoaded();
exports.loading = helpers_1.isStateLoading();
exports.isUpdating = helpers_1.isStateUpdating();
exports.formPending = (state) => state.formPending;
_a = exports.adapter.getSelectors(), exports.selectAll = _a.selectAll, exports.selectEntities = _a.selectEntities;
exports.selectedId = (state) => state.selectedBaselineAssetId;
exports.content = (state) => state.content;
exports.stats = (state) => state.stats;
exports.overview = (state) => state.overview;
exports.hasNextLink = (state) => state.hasNextLink;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZWxpbmUtYXNzZXQucmVkdWNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zdG9yZS9iYXNlbGluZS1hc3NldC9zdGF0ZS9iYXNlbGluZS1hc3NldC5yZWR1Y2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLG1FQUFzRTtBQUd0RSx1REFBMkY7QUFDM0YscUVBQTJGO0FBYzlFLFFBQUEsT0FBTyxHQUFpQyxtQ0FBbUIsRUFBaUIsQ0FBQztBQUU3RSxRQUFBLFlBQVksR0FBVSxlQUFPLENBQUMsZUFBZSxDQUFDO0lBQ3pELEdBQUcsRUFBRSxFQUFFO0lBQ1AsdUJBQXVCLEVBQUUsU0FBUztJQUNsQyxPQUFPLEVBQUUsS0FBSztJQUNkLE1BQU0sRUFBRSxLQUFLO0lBQ2IsV0FBVyxFQUFFLEtBQUs7SUFDbEIsS0FBSyxFQUFFLEVBQUU7SUFDVCxPQUFPLEVBQUUsRUFBRTtJQUNYLFFBQVEsRUFBRSxTQUFTO0lBQ25CLFdBQVcsRUFBRSxTQUFTO0NBQ3ZCLENBQUMsQ0FBQztBQUVILFNBQWdCLE9BQU8sQ0FBQyxLQUFLLEdBQUcsb0JBQVksRUFBRSxNQUFlO0lBQzNELFFBQVEsTUFBTSxDQUFDLElBQUksRUFBRTtRQUNuQixLQUFLLG9DQUFNLENBQUMsOEJBQThCLENBQUM7UUFDM0MsS0FBSyxvQ0FBTSxDQUFDLGtCQUFrQixDQUFDO1FBQy9CLEtBQUssb0NBQU0sQ0FBQyxpQkFBaUIsQ0FBQztRQUM5QixLQUFLLG9DQUFNLENBQUMsc0JBQXNCLENBQUM7UUFDbkMsS0FBSyxvQ0FBTSxDQUFDLHdCQUF3QixDQUFDO1FBQ3JDLEtBQUssb0NBQU0sQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1lBQ3JDLHVDQUNLLEtBQUssS0FDUixPQUFPLEVBQUUsSUFBSSxFQUNiLE1BQU0sRUFBRSxLQUFLLElBQ2I7U0FD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