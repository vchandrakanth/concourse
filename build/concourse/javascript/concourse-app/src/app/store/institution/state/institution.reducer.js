"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const state_adapter_1 = require("@concourse/shared/state-adapter");
const helpers_1 = require("@concourse/shared/helpers");
const institution_actions_1 = require("./institution.actions");
exports.adapter = state_adapter_1.createEntityAdapter();
exports.initialState = exports.adapter.getInitialState({
    config: {},
    selectedInst: undefined,
    successResp: false,
    loading: false,
    loaded: false,
    formPending: false,
    institutionValidateInfo: undefined
});
function reducer(state = exports.initialState, action) {
    switch (action.type) {
        case institution_actions_1.InstitutionActionTypes.ValidateRegistrationConfirmToken:
        case institution_actions_1.InstitutionActionTypes.ValidateInstToken:
        case institution_actions_1.InstitutionActionTypes.RegenerateRegistration:
        case institution_actions_1.InstitutionActionTypes.LoadInstitutions:
        case institution_actions_1.InstitutionActionTypes.LoadInstitution:
        case institution_actions_1.InstitutionActionTypes.InviteInstitution:
        case institution_actions_1.InstitutionActionTypes.RegenerateInvitation:
        case institution_actions_1.InstitutionActionTypes.RegisterInstitution:
        case institution_actions_1.InstitutionActionTypes.LoadInstitutionConfig: {
            return Object.assign(Object.assign({}, state), { loading: true, loaded: false });
        }
        case institution_actions_1.InstitutionActionTypes.CreateInstitutionConfig:
        case institution_actions_1.InstitutionActionTypes.UpdateInstitutionConfig:
        case institution_actions_1.InstitutionActionTypes.UpdateInstitution: {
            return Object.assign(Object.assign({}, state), { formPending: true });
        }
        case institution_actions_1.InstitutionActionTypes.LoadInstitutionsSuccess: {
            return Object.assign(Object.assign({}, exports.adapter.upsertMany(action.payload, state)), { loading: false, loaded: true });
        }
        case institution_actions_1.InstitutionActionTypes.LoadInstitutionSuccess:
        case institution_actions_1.InstitutionActionTypes.UpdateInstitutionSuccess: {
            return Object.assign(Object.assign({}, exports.adapter.upsertOne(action.payload, state)), { loading: false, loaded: true });
        }
        case institution_actions_1.InstitutionActionTypes.SelectInstitution: {
            return Object.assign(Object.assign({}, state), { selectedInst: action.payload });
        }
        case institution_actions_1.InstitutionActionTypes.LoadInstitutionConfigSuccess:
        case institution_actions_1.InstitutionActionTypes.CreateInstitutionConfigSuccess:
        case institution_actions_1.InstitutionActionTypes.UpdateInstitutionConfigSuccess: {
            return Object.assign(Object.assign({}, state), { formPending: false, loading: false, config: {
                    [action.payload.config]: action.payload.data
                } });
        }
        case institution_actions_1.InstitutionActionTypes.ValidateRegistrationConfirmTokenSuccess:
        case institution_actions_1.InstitutionActionTypes.RegisterInstitutionSuccess:
        case institution_actions_1.InstitutionActionTypes.InviteInstitutionSuccess:
        case institution_actions_1.InstitutionActionTypes.RegenerateRegistrationSuccess:
        case institution_actions_1.InstitutionActionTypes.RegenerateInvitationSuccess: {
            return Object.assign(Object.assign({}, state), { successResp: true, loading: false, loaded: true });
        }
        case institution_actions_1.InstitutionActionTypes.ValidateInstTokenSuccess: {
            return Object.assign(Object.assign({}, state), { institutionValidateInfo: action.payload, loading: false, loaded: true });
        }
        case institution_actions_1.InstitutionActionTypes.ValidateInstTokenFailure:
        case institution_actions_1.InstitutionActionTypes.ValidateRegistrationConfirmTokenFailure: {
            return Object.assign(Object.assign({}, state), { institutionValidateInfo: action.payload, loading: false, loaded: true });
        }
        case institution_actions_1.InstitutionActionTypes.RegenerateRegistrationFailure:
        case institution_actions_1.InstitutionActionTypes.LoadInstitutionsFailure:
        case institution_actions_1.InstitutionActionTypes.LoadInstitutionFailure:
        case institution_actions_1.InstitutionActionTypes.InviteInstitutionFailure:
        case institution_actions_1.InstitutionActionTypes.RegenerateInvitationFailure:
        case institution_actions_1.InstitutionActionTypes.RegisterInstitutionFailure:
        case institution_actions_1.InstitutionActionTypes.LoadInstitutionConfigFailure:
        case institution_actions_1.InstitutionActionTypes.UpdateInstitutionConfigFailure:
        case institution_actions_1.InstitutionActionTypes.CreateInstitutionConfigFailure:
        case institution_actions_1.InstitutionActionTypes.UpdateInstitutionFailure: {
            return Object.assign(Object.assign({}, state), { successResp: false, loading: false, loaded: true, formPending: false });
        }
        default: {
            return state;
        }
    }
}
exports.reducer = reducer;
_a = exports.adapter.getSelectors(), exports.selectAll = _a.selectAll, exports.selectEntities = _a.selectEntities;
exports.selectedInst = (state) => state.selectedInst;
exports.institutionValidateInfo = (state) => state.institutionValidateInfo;
exports.institutionConfigs = (state) => state.config;
exports.isLoaded = helpers_1.isStateLoaded();
exports.isUpdating = helpers_1.isStateUpdating();
exports.successResp = (state) => state.successResp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zdGl0dXRpb24ucmVkdWNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zdG9yZS9pbnN0aXR1dGlvbi9zdGF0ZS9pbnN0aXR1dGlvbi5yZWR1Y2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG1FQUFzRTtBQUl0RSx1REFBMkU7QUFDM0UsK0RBQW1GO0FBWXRFLFFBQUEsT0FBTyxHQUErQixtQ0FBbUIsRUFBZSxDQUFDO0FBRXpFLFFBQUEsWUFBWSxHQUFVLGVBQU8sQ0FBQyxlQUFlLENBQUM7SUFDekQsTUFBTSxFQUFFLEVBQUU7SUFDVixZQUFZLEVBQUUsU0FBUztJQUN2QixXQUFXLEVBQUUsS0FBSztJQUNsQixPQUFPLEVBQUUsS0FBSztJQUNkLE1BQU0sRUFBRSxLQUFLO0lBQ2IsV0FBVyxFQUFFLEtBQUs7SUFDbEIsdUJBQXVCLEVBQUUsU0FBUztDQUNuQyxDQUFDLENBQUM7QUFFSCxTQUFnQixPQUFPLENBQUMsS0FBSyxHQUFHLG9CQUFZLEVBQUUsTUFBMEI7SUFDdEUsUUFBUSxNQUFNLENBQUMsSUFBSSxFQUFFO1FBRW5CLEtBQUssNENBQXNCLENBQUMsZ0NBQWdDLENBQUM7UUFDN0QsS0FBSyw0Q0FBc0IsQ0FBQyxpQkFBaUIsQ0FBQztRQUM5QyxLQUFLLDRDQUFzQixDQUFDLHNCQUFzQixDQUFDO1FBQ25ELEtBQUssNENBQXNCLENBQUMsZ0JBQWdCLENBQUM7UUFDN0MsS0FBSyw0Q0FBc0IsQ0FBQyxlQUFlLENBQUM7UUFDNUMsS0FBSyw0Q0FBc0IsQ0FBQyxpQkFBaUIsQ0FBQztRQUM5QyxLQUFLLDRDQUFzQixDQUFDLG9CQUFvQixDQUFDO1FBQ2pELEtBQUssNENBQXNCLENBQUMsbUJBQW1CLENBQUM7UUFDaEQsS0FBSyw0Q0FBc0IsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBQ2pE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