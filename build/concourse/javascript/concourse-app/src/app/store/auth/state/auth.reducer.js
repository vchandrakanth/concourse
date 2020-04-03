"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const JWT = require("jwt-decode");
const auth_actions_1 = require("./auth.actions");
exports.initialState = {
    isLoggingIn: false,
    isAuthenticated: false,
    accessToken: undefined,
    accessTokenExp: undefined,
    refreshToken: undefined,
    refreshTokenExp: undefined,
    userId: undefined,
    institutionId: undefined,
    permissions: undefined,
    authorities: [],
    token: undefined,
    successResp: false,
    securityQuestions: []
};
function reducer(state = exports.initialState, action) {
    switch (action.type) {
        case auth_actions_1.AuthActionTypes.Login:
        case auth_actions_1.AuthActionTypes.SAMLLogin: {
            return Object.assign(Object.assign({}, state), { isLoggingIn: true });
        }
        case auth_actions_1.AuthActionTypes.ResetPassword:
        case auth_actions_1.AuthActionTypes.VerifyUser:
        case auth_actions_1.AuthActionTypes.ForgotPassword: {
            return Object.assign({}, state);
        }
        case auth_actions_1.AuthActionTypes.UserAuthenticated: {
            const { accessToken, refreshToken } = action.payload;
            const parsedAccessToken = JWT(accessToken);
            const parsedRefreshToken = JWT(refreshToken);
            return Object.assign(Object.assign({}, state), { isLoggingIn: false, accessToken, accessTokenExp: parsedAccessToken.exp, refreshToken, refreshTokenExp: parsedRefreshToken.exp, isAuthenticated: true, userId: parsedAccessToken.extra.userId, institutionId: parsedAccessToken.extra.institutionId });
        }
        case auth_actions_1.AuthActionTypes.SetUserPermissionsSuccess: {
            return Object.assign(Object.assign({}, state), { permissions: action.payload.permissions, authorities: action.payload.authorities });
        }
        case auth_actions_1.AuthActionTypes.VerifyUserSuccess: {
            return Object.assign(Object.assign({}, state), { token: action.payload.token, securityQuestions: action.payload.securityQuestions });
        }
        case auth_actions_1.AuthActionTypes.ResetPasswordSuccess:
        case auth_actions_1.AuthActionTypes.ForgotPasswordSuccess: {
            return Object.assign(Object.assign({}, state), { successResp: true });
        }
        case auth_actions_1.AuthActionTypes.VerifyUserFailure: {
            return Object.assign(Object.assign({}, state), { token: action.payload });
        }
        case auth_actions_1.AuthActionTypes.LogoutSuccess: {
            return Object.assign({}, exports.initialState);
        }
        case auth_actions_1.AuthActionTypes.ResetPasswordFailure:
        case auth_actions_1.AuthActionTypes.ForgotPasswordFailure: {
            return Object.assign(Object.assign({}, state), { successResp: false });
        }
        case auth_actions_1.AuthActionTypes.LoginFailure:
        case auth_actions_1.AuthActionTypes.LogoutFailure: {
            return Object.assign(Object.assign({}, state), { isLoggingIn: false });
        }
        default:
            return state;
    }
}
exports.reducer = reducer;
exports.isAuthenticated = (state) => state.isAuthenticated;
exports.authenticatedUserId = (state) => state.userId;
exports.userInstitutionId = (state) => state.institutionId;
exports.userAccessToken = (state) => state.accessToken;
exports.getToken = (state) => state.token;
exports.isLoggingIn = (state) => state.isLoggingIn;
exports.userPermissions = (state) => state.permissions;
exports.userAuthorities = (state) => state.authorities;
exports.isSuccessResp = (state) => state.successResp;
exports.securityQuestions = (state) => state.securityQuestions;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5yZWR1Y2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3N0b3JlL2F1dGgvc3RhdGUvYXV0aC5yZWR1Y2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsa0NBQWtDO0FBR2xDLGlEQUE4RDtBQWtCakQsUUFBQSxZQUFZLEdBQVU7SUFDakMsV0FBVyxFQUFFLEtBQUs7SUFDbEIsZUFBZSxFQUFFLEtBQUs7SUFDdEIsV0FBVyxFQUFFLFNBQVM7SUFDdEIsY0FBYyxFQUFFLFNBQVM7SUFDekIsWUFBWSxFQUFFLFNBQVM7SUFDdkIsZUFBZSxFQUFFLFNBQVM7SUFDMUIsTUFBTSxFQUFFLFNBQVM7SUFDakIsYUFBYSxFQUFFLFNBQVM7SUFDeEIsV0FBVyxFQUFFLFNBQVM7SUFDdEIsV0FBVyxFQUFFLEVBQUU7SUFDZixLQUFLLEVBQUUsU0FBUztJQUNoQixXQUFXLEVBQUUsS0FBSztJQUNsQixpQkFBaUIsRUFBRSxFQUFFO0NBQ3RCLENBQUM7QUFFRixTQUFnQixPQUFPLENBQUMsS0FBSyxHQUFHLG9CQUFZLEVBQUUsTUFBbUI7SUFDL0QsUUFBUSxNQUFNLENBQUMsSUFBSSxFQUFFO1FBQ25CLEtBQUssOEJBQWUsQ0FBQyxLQUFLLENBQUM7UUFDM0IsS0FBSyw4QkFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzlCLHVDQUNLLEtBQUssS0FDUixXQUFXLEVBQUUsSUFBSSxJQUNqQjtTQUNIO1FBRUQsS0FBSyw4QkFBZSxDQUFDLGFBQWEsQ0FBQztRQUNuQyxLQUFLLDhCQUFlLENBQUMsVUFBVSxDQUFDO1FBQ2hDLEtBQUssOEJBQWUsQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUNuQyx5QkFDSyxLQUFLLEVBQ1I7U0FDSDtRQUVELEtBQUssOEJBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBQ3RDLE1BQU0s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