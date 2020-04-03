"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("@concourse/shared/helpers");
const state_adapter_1 = require("@concourse/shared/state-adapter");
const institution_data_actions_1 = require("./institution-data.actions");
exports.adapter = state_adapter_1.createEntityAdapter({
    selectId: instData => instData.uri
});
exports.initialState = exports.adapter.getInitialState({
    loading: false,
    loaded: false,
    selectedInstitutionData: undefined,
    azureData: undefined
});
function reducer(state = exports.initialState, action) {
    switch (action.type) {
        case institution_data_actions_1.InstitutionDataActionTypes.LoadInstitutionsData:
        case institution_data_actions_1.InstitutionDataActionTypes.LoadInstitutionData:
        case institution_data_actions_1.InstitutionDataActionTypes.CreateInstitutionData:
        case institution_data_actions_1.InstitutionDataActionTypes.UpdateInstitutionData:
        case institution_data_actions_1.InstitutionDataActionTypes.LoadAzureData:
        case institution_data_actions_1.InstitutionDataActionTypes.DeleteInstitutionData: {
            return Object.assign(Object.assign({}, state), { loading: true, loaded: false });
        }
        case institution_data_actions_1.InstitutionDataActionTypes.LoadInstitutionsDataSuccess: {
            return Object.assign(Object.assign({}, exports.adapter.addAll(action.payload, state)), { loading: false, loaded: true });
        }
        case institution_data_actions_1.InstitutionDataActionTypes.LoadInstitutionDataSuccess: {
            return Object.assign(Object.assign({}, exports.adapter.upsertOne(action.payload, state)), { loading: false, loaded: true });
        }
        case institution_data_actions_1.InstitutionDataActionTypes.CreateInstitutionDataSuccess: {
            return Object.assign(Object.assign({}, exports.adapter.upsertOne(action.payload, state)), { loading: false, loaded: true });
        }
        case institution_data_actions_1.InstitutionDataActionTypes.UpdateInstitutionDataSuccess: {
            return Object.assign(Object.assign({}, exports.adapter.upsertOne(action.payload, state)), { loading: false, loaded: true });
        }
        case institution_data_actions_1.InstitutionDataActionTypes.DeleteInstitutionDataSuccess: {
            return Object.assign(Object.assign({}, exports.adapter.removeOne(action.payload, state)), { loading: false, loaded: true });
        }
        case institution_data_actions_1.InstitutionDataActionTypes.SelectInstitutionData: {
            return Object.assign(Object.assign({}, state), { selectedInstitutionData: action.payload });
        }
        case institution_data_actions_1.InstitutionDataActionTypes.LoadAzureDataSuccess: {
            return Object.assign(Object.assign({}, state), { azureData: Object.assign(Object.assign({}, state.azureData), { [action.payload.type]: action.payload.data }), loading: false, loaded: true });
        }
        case institution_data_actions_1.InstitutionDataActionTypes.LoadInstitutionsDataFailure:
        case institution_data_actions_1.InstitutionDataActionTypes.LoadInstitutionDataFailure:
        case institution_data_actions_1.InstitutionDataActionTypes.LoadAzureDataFailure:
        case institution_data_actions_1.InstitutionDataActionTypes.CreateInstitutionDataFailure:
        case institution_data_actions_1.InstitutionDataActionTypes.UpdateInstitutionDataFailure:
        case institution_data_actions_1.InstitutionDataActionTypes.DeleteInstitutionDataFailure: {
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
exports.selectedInstitutionDataName = (state) => state.selectedInstitutionData;
exports.azureAccounts = (state) => state.azureData && state.azureData.accounts;
exports.azureSubscriptions = (state) => state.azureData && state.azureData.subscriptions;
exports.azureResourceGroups = (state) => state.azureData && state.azureData.resourceGroups;
exports.azureResourceTypes = (state) => state.azureData && state.azureData.resourceTypes;
exports.azureResourceTags = (state) => state.azureData && state.azureData.resourceTags;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zdGl0dXRpb24tZGF0YS5yZWR1Y2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3N0b3JlL2luc3RpdHV0aW9uLWRhdGEvc3RhdGUvaW5zdGl0dXRpb24tZGF0YS5yZWR1Y2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUdBLHVEQUEyRTtBQUMzRSxtRUFBc0U7QUFDdEUseUVBQWdHO0FBZ0JuRixRQUFBLE9BQU8sR0FBbUMsbUNBQW1CLENBQWtCO0lBQzFGLFFBQVEsRUFBRSxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHO0NBQ25DLENBQUMsQ0FBQztBQUVVLFFBQUEsWUFBWSxHQUFVLGVBQU8sQ0FBQyxlQUFlLENBQUM7SUFDekQsT0FBTyxFQUFFLEtBQUs7SUFDZCxNQUFNLEVBQUUsS0FBSztJQUNiLHVCQUF1QixFQUFFLFNBQVM7SUFDbEMsU0FBUyxFQUFFLFNBQVM7Q0FDckIsQ0FBQyxDQUFDO0FBRUgsU0FBZ0IsT0FBTyxDQUFDLEtBQUssR0FBRyxvQkFBWSxFQUFFLE1BQThCO0lBQzFFLFFBQVEsTUFBTSxDQUFDLElBQUksRUFBRTtRQUVuQixLQUFLLHFEQUEwQixDQUFDLG9CQUFvQixDQUFDO1FBQ3JELEtBQUsscURBQTBCLENBQUMsbUJBQW1CLENBQUM7UUFDcEQsS0FBSyxxREFBMEIsQ0FBQyxxQkFBcUIsQ0FBQztRQUN0RCxLQUFLLHFEQUEwQixDQUFDLHFCQUFxQixDQUFDO1FBQ3RELEtBQUsscURBQTBCLENBQUMsYUFBYSxDQUFDO1FBQzlDLEtBQUsscURBQTBCLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUNyRCx1Q0FDSyxLQUFLLEtBQ1IsT0FBTyxFQUFFLElBQUksRUFDYixNQUFNLEVBQUUsS0FBSyxJQUNiO1NBQ0g7UUFFRCxLQUFLLHFEQUEwQixDQUFDLDJCQUEy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