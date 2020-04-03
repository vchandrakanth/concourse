"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("@concourse/shared/helpers");
const state_adapter_1 = require("@concourse/shared/state-adapter");
const user_actions_1 = require("./user.actions");
exports.adapter = state_adapter_1.createEntityAdapter();
exports.initialState = exports.adapter.getInitialState({
    selectedUser: undefined,
    loading: false,
    loaded: false,
    formPending: false,
    token: undefined,
    email: undefined,
    successResp: false,
    authType: undefined,
    securityQuestions: undefined,
    hasNextLink: undefined
});
function reducer(state = exports.initialState, action) {
    switch (action.type) {
        case user_actions_1.UserActionTypes.LoadUsersByPagination:
        case user_actions_1.UserActionTypes.LoadSecurityQuestions:
        case user_actions_1.UserActionTypes.ValidateConfirmationToken:
        case user_actions_1.UserActionTypes.RegenerateConfirmation:
        case user_actions_1.UserActionTypes.RegisterUser:
        case user_actions_1.UserActionTypes.RegenerateInvitation:
        case user_actions_1.UserActionTypes.DeleteUser:
        case user_actions_1.UserActionTypes.LoadUsers:
        case user_actions_1.UserActionTypes.LoadUser:
        case user_actions_1.UserActionTypes.LoadMe:
        case user_actions_1.UserActionTypes.UpdatePassword:
        case user_actions_1.UserActionTypes.SearchUsers: {
            return Object.assign(Object.assign({}, state), { loading: true });
        }
        case user_actions_1.UserActionTypes.InviteUser: {
            return Object.assign(Object.assign({}, state), { formPending: true });
        }
        case user_actions_1.UserActionTypes.ValidateInviteUserToken: {
            return Object.assign(Object.assign({}, state), { token: action.payload.token, email: action.payload.email });
        }
        case user_actions_1.UserActionTypes.InviteUserSuccess: {
            return Object.assign(Object.assign({}, state), { formPending: false, loading: false });
        }
        case user_actions_1.UserActionTypes.LoadUsersSuccess: {
            return Object.assign(Object.assign({}, exports.adapter.upsertMany(action.payload, state)), { loaded: true, loading: false });
        }
        case user_actions_1.UserActionTypes.LoadUsersByPaginationSuccess: {
            const { hasNextLink, users } = action.payload;
            return Object.assign(Object.assign({}, exports.adapter.addMany(users, state)), { loaded: true, loading: false, hasNextLink });
        }
        case user_actions_1.UserActionTypes.LoadUserSuccess:
        case user_actions_1.UserActionTypes.LoadMeSuccess: {
            return Object.assign(Object.assign({}, exports.adapter.upsertOne(action.payload, state)), { loading: false });
        }
        case user_actions_1.UserActionTypes.SelectUser: {
            return Object.assign(Object.assign({}, state), { selectedUser: action.payload });
        }
        case user_actions_1.UserActionTypes.DeleteUserSuccess: {
            return Object.assign(Object.assign({}, exports.adapter.removeOne(action.payload, state)), { loading: false });
        }
        case user_actions_1.UserActionTypes.RegisterUserSuccess: {
            return Object.assign(Object.assign({}, state), { loading: false, loaded: true, successResp: true });
        }
        case user_actions_1.UserActionTypes.UpdateUserSuccess: {
            return Object.assign(Object.assign({}, exports.adapter.upsertOne(action.payload, state)), { loading: false });
        }
        case user_actions_1.UserActionTypes.UpdatePasswordSuccess: {
            return Object.assign(Object.assign({}, state), { loading: false });
        }
        case user_actions_1.UserActionTypes.SearchUsersSuccess: {
            return Object.assign(Object.assign({}, state), { ids: action.payload, loading: false });
        }
        case user_actions_1.UserActionTypes.ResetUserSearchResults: {
            return Object.assign(Object.assign({}, state), { ids: Object.keys(state.entities).map(id => +id) });
        }
        case user_actions_1.UserActionTypes.ValidateInviteUserTokenSuccess: {
            return Object.assign(Object.assign({}, state), { authType: action.payload.authType });
        }
        case user_actions_1.UserActionTypes.ValidateConfirmationTokenFailure:
        case user_actions_1.UserActionTypes.ValidateInviteUserTokenFailure: {
            return Object.assign(Object.assign({}, state), { token: action.payload, loading: false });
        }
        case user_actions_1.UserActionTypes.LoadSecurityQuestionsSuccess: {
            return Object.assign(Object.assign({}, state), { loading: false, loaded: true, securityQuestions: action.payload });
        }
        case user_actions_1.UserActionTypes.LoadUsersByPaginationFailure:
        case user_actions_1.UserActionTypes.LoadSecurityQuestionsFailure:
        case user_actions_1.UserActionTypes.ValidateConfirmationTokenSuccess:
        case user_actions_1.UserActionTypes.RegenerateConfirmationSuccess:
        case user_actions_1.UserActionTypes.RegenerateInvitationSuccess:
        case user_actions_1.UserActionTypes.RegenerateConfirmationFailure:
        case user_actions_1.UserActionTypes.RegisterUserFailure:
        case user_actions_1.UserActionTypes.RegenerateInvitationFailure:
        case user_actions_1.UserActionTypes.LoadUsersFailure:
        case user_actions_1.UserActionTypes.LoadUserFailure:
        case user_actions_1.UserActionTypes.LoadMeFailure:
        case user_actions_1.UserActionTypes.DeleteUserFailure:
        case user_actions_1.UserActionTypes.InviteUserFailure:
        case user_actions_1.UserActionTypes.UpdatePasswordFailure: {
            return Object.assign(Object.assign({}, state), { loading: false, formPending: false });
        }
        default:
            return state;
    }
}
exports.reducer = reducer;
_a = exports.adapter.getSelectors(), exports.selectAll = _a.selectAll, exports.selectEntities = _a.selectEntities;
exports.selectedId = (state) => state.selectedUser;
exports.isLoaded = helpers_1.isStateLoaded();
exports.isUpdating = helpers_1.isStateUpdating();
exports.formPending = (state) => state.formPending;
exports.getToken = (state) => state.token;
exports.getEmail = (state) => state.email;
exports.isRegistrationSuccess = (state) => state.successResp;
exports.getAuthType = (state) => state.authType;
exports.getSecurityQuestions = (state) => state.securityQuestions;
exports.hasNextLink = (state) => state.hasNextLink;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5yZWR1Y2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3N0b3JlL3VzZXIvc3RhdGUvdXNlci5yZWR1Y2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUdBLHVEQUEyRTtBQUMzRSxtRUFBc0U7QUFDdEUsaURBQTRGO0FBZS9FLFFBQUEsT0FBTyxHQUF3QixtQ0FBbUIsRUFBUSxDQUFDO0FBRTNELFFBQUEsWUFBWSxHQUFVLGVBQU8sQ0FBQyxlQUFlLENBQUM7SUFDekQsWUFBWSxFQUFFLFNBQVM7SUFDdkIsT0FBTyxFQUFFLEtBQUs7SUFDZCxNQUFNLEVBQUUsS0FBSztJQUNiLFdBQVcsRUFBRSxLQUFLO0lBQ2xCLEtBQUssRUFBRSxTQUFTO0lBQ2hCLEtBQUssRUFBRSxTQUFTO0lBQ2hCLFdBQVcsRUFBRSxLQUFLO0lBQ2xCLFFBQVEsRUFBRSxTQUFTO0lBQ25CLGlCQUFpQixFQUFFLFNBQVM7SUFDNUIsV0FBVyxFQUFFLFNBQVM7Q0FDdkIsQ0FBQyxDQUFDO0FBRUgsU0FBZ0IsT0FBTyxDQUFDLEtBQUssR0FBRyxvQkFBWSxFQUFFLE1BQW1CO0lBRS9ELFFBQVEsTUFBTSxDQUFDLElBQUksRUFBRTtRQUNuQixLQUFLLDhCQUFlLENBQUMscUJBQXFCLENBQUM7UUFDM0MsS0FBSyw4QkFBZSxDQUFDLHFCQUFxQixDQUFDO1FBQzNDLEtBQUssOEJBQWUsQ0FBQyx5QkFBeUIsQ0FBQztRQUMvQyxLQUFLLDhCQUFlLENBQUMsc0JBQXNCLENBQUM7UUFDNUMsS0FBSyw4QkFBZSxDQUFDLFlBQVksQ0FBQztRQUNsQyxLQUFLLDhCQUFlLENBQUMsb0JBQW9CLENBQUM7UUFDMUMsS0FBSyw4QkFBZSxDQUFDLFVBQVUsQ0FBQztRQUNoQyxLQUFLLDhCQUFlLENBQUMsU0FBUyxDQUFDO1FBQy9CLEtBQUssOEJB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