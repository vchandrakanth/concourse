"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const state_adapter_1 = require("@concourse/shared/state-adapter");
const helpers_1 = require("@concourse/shared/helpers");
const asset_actions_1 = require("./asset.actions");
exports.adaptor = state_adapter_1.createEntityAdapter({
    selectId: asset => `${asset.assetType}-${asset.id}`
});
exports.initialState = exports.adaptor.getInitialState({
    ids: [],
    selectedAssetId: undefined,
    selectedAssetType: undefined,
    selectedLineageId: undefined,
    cftResources: undefined,
    loading: false,
    loaded: false,
    formPending: false,
    hasNextLink: undefined
});
function reducer(state = exports.initialState, action) {
    switch (action.type) {
        case asset_actions_1.AssetsActionTypes.CreateEnclaveModel:
        case asset_actions_1.AssetsActionTypes.UpdateEnclaveModel:
        case asset_actions_1.AssetsActionTypes.ResolveCFTResource: {
            return Object.assign(Object.assign({}, state), { cftResources: undefined, formPending: true });
        }
        case asset_actions_1.AssetsActionTypes.LoadAssetsByPagination:
        case asset_actions_1.AssetsActionTypes.LoadAssets:
        case asset_actions_1.AssetsActionTypes.LoadAssetsByType:
        case asset_actions_1.AssetsActionTypes.LoadAsset:
        case asset_actions_1.AssetsActionTypes.DeleteEnclaveModel:
        case asset_actions_1.AssetsActionTypes.SearchAssets:
        case asset_actions_1.AssetsActionTypes.LoadAssetsByLineageId: {
            return Object.assign(Object.assign({}, state), { loading: true });
        }
        case asset_actions_1.AssetsActionTypes.LoadAssetsByTypeSuccess: {
            return Object.assign(Object.assign({}, exports.adaptor.upsertMany(mapAssetTypes(action.payload.assets, action.payload.type), state)), { loading: false, loaded: true });
        }
        case asset_actions_1.AssetsActionTypes.LoadAssetsByPaginationSuccess: {
            const { hasNextLink, assets, type } = action.payload;
            return Object.assign(Object.assign({}, exports.adaptor.upsertMany(mapAssetTypes(assets, type), state)), { loading: false, loaded: true, hasNextLink });
        }
        case asset_actions_1.AssetsActionTypes.LoadAssetsByLineageIdSuccess: {
            return Object.assign(Object.assign({}, exports.adaptor.upsertMany(mapAssetTypes(action.payload.assets, action.payload.type), state)), { selectedLineageId: action.payload.lineageId, loading: false, loaded: true });
        }
        case asset_actions_1.AssetsActionTypes.LoadAssetSuccess: {
            return Object.assign(Object.assign({}, exports.adaptor.upsertOne(setAssetType(action.payload.asset, action.payload.type), state)), { loading: false, loaded: true });
        }
        case asset_actions_1.AssetsActionTypes.SelectAsset: {
            return Object.assign(Object.assign({}, state), { selectedAssetId: action.payload.id, selectedAssetType: action.payload.type });
        }
        case asset_actions_1.AssetsActionTypes.SearchAssetsSuccess: {
            return Object.assign(Object.assign({}, state), { ids: action.payload, loading: false });
        }
        case asset_actions_1.AssetsActionTypes.ResetAssetsSearchResults: {
            return Object.assign(Object.assign({}, state), { ids: Object.keys(state.entities).map(id => id) });
        }
        case asset_actions_1.AssetsActionTypes.CreateEnclaveModelSuccess: {
            return Object.assign(Object.assign({}, exports.adaptor.addOne(setAssetType(action.payload, 'enclave'), state)), { formPending: false });
        }
        case asset_actions_1.AssetsActionTypes.ResolveCFTResourceSuccess: {
            return Object.assign(Object.assign({}, state), { cftResources: Object.assign({}, action.payload), formPending: false });
        }
        case asset_actions_1.AssetsActionTypes.UpdateEnclaveModelSuccess: {
            return Object.assign(Object.assign({}, exports.adaptor.upsertOne(setAssetType(action.payload, 'enclave'), state)), { formPending: false });
        }
        case asset_actions_1.AssetsActionTypes.DeleteEnclaveModelSuccess: {
            const payload = `enclave-${action.payload}`;
            return Object.assign(Object.assign({}, exports.adaptor.removeOne(payload, state)), { loading: false });
        }
        case asset_actions_1.AssetsActionTypes.LoadAssetsByPaginationFailure:
        case asset_actions_1.AssetsActionTypes.CreateEnclaveModelFailure:
        case asset_actions_1.AssetsActionTypes.ResolveCFTResourceFailure:
        case asset_actions_1.AssetsActionTypes.UpdateEnclaveModelFailure:
        case asset_actions_1.AssetsActionTypes.DeleteEnclaveModelFailure:
        case asset_actions_1.AssetsActionTypes.LoadAssetsByTypeFailure:
        case asset_actions_1.AssetsActionTypes.LoadAssetsByLineageIdFailure:
        case asset_actions_1.AssetsActionTypes.LoadAssetFailure: {
            return Object.assign(Object.assign({}, state), { loading: false, formPending: false });
        }
        default:
            return state;
    }
}
exports.reducer = reducer;
const mapAssetTypes = (array, assetType) => array.map(a => setAssetType(a, assetType));
const setAssetType = (asset, assetType) => (asset.copyWith({ assetType }));
_a = exports.adaptor.getSelectors(), exports.selectAll = _a.selectAll, exports.selectEntities = _a.selectEntities;
exports.selectedId = (state) => state.selectedAssetId;
exports.selectedType = (state) => state.selectedAssetType;
exports.selectedLineageId = (state) => state.asset.selectedLineageId;
exports.cftResources = (state) => state.cftResources;
exports.isLoaded = helpers_1.isStateLoaded();
exports.isUpdating = helpers_1.isStateUpdating();
exports.formPending = (state) => state.formPending;
exports.hasNextLink = (state) => state.hasNextLink;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXQucmVkdWNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zdG9yZS9hc3NldC9zdGF0ZS9hc3NldC5yZWR1Y2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLG1FQUFzRTtBQUd0RSx1REFBMkU7QUFDM0UsbURBQW1FO0FBd0J0RCxRQUFBLE9BQU8sR0FBeUIsbUNBQW1CLENBQVE7SUFDdEUsUUFBUSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsU0FBUyxJQUFJLEtBQUssQ0FBQyxFQUFFLEVBQUU7Q0FDcEQsQ0FBQyxDQUFDO0FBRVUsUUFBQSxZQUFZLEdBQVUsZUFBTyxDQUFDLGVBQWUsQ0FBQztJQUN6RCxHQUFHLEVBQUUsRUFBRTtJQUNQLGVBQWUsRUFBRSxTQUFTO0lBQzFCLGlCQUFpQixFQUFFLFNBQVM7SUFDNUIsaUJBQWlCLEVBQUUsU0FBUztJQUM1QixZQUFZLEVBQUUsU0FBUztJQUN2QixPQUFPLEVBQUUsS0FBSztJQUNkLE1BQU0sRUFBRSxLQUFLO0lBQ2IsV0FBVyxFQUFFLEtBQUs7SUFDbEIsV0FBVyxFQUFFLFNBQVM7Q0FDdkIsQ0FBQyxDQUFDO0FBRUgsU0FBZ0IsT0FBTyxDQUFDLEtBQUssR0FBRyxvQkFBWSxFQUFFLE1BQXFCO0lBQ2pFLFFBQVEsTUFBTSxDQUFDLElBQUksRUFBRTtRQUVuQixLQUFLLGlDQUFpQixDQUFDLGtCQUFrQixDQUFDO1FBQzFDLEtBQUssaUNBQWlCLENBQUMsa0JBQWtCLENBQUM7UUFDMUMsS0FBSyxpQ0FBaUIsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBQ3pDLHVDQUNLLEtBQUssS0FDUixZQUFZLEVBQUUsU0FBUyxFQUN2QixXQUFXLEVBQUUsSUFBSSxJQUNqQjtTQUNIO1FBRUQsS0FBSyxpQ0FBaUIsQ0FBQyxzQkFB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