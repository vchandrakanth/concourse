"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AuthActionTypes;
(function (AuthActionTypes) {
    AuthActionTypes["Login"] = "[Auth] Login User";
    AuthActionTypes["SAMLLogin"] = "[Auth] SAML User Login";
    AuthActionTypes["LoginFailure"] = "[Auth] Login User Failure";
    AuthActionTypes["UserAuthenticated"] = "[Auth] User is Authenticated";
    AuthActionTypes["SetUserPermissions"] = "[Auth] Set User Permissions";
    AuthActionTypes["SetUserPermissionsSuccess"] = "[Auth] Set User Permissions Success";
    AuthActionTypes["RequestNewAccessToken"] = "[Auth] Request New Access Token";
    AuthActionTypes["RequestNewAccessTokenFailure"] = "[Auth] Request New Access Token Failure";
    AuthActionTypes["Logout"] = "[Auth] Logout User";
    AuthActionTypes["LogoutSuccess"] = "[Auth] Logout User Success";
    AuthActionTypes["LogoutFailure"] = "[Auth] Logout User Failure";
    AuthActionTypes["ForgotPassword"] = "[Auth] Forgot Password";
    AuthActionTypes["ForgotPasswordSuccess"] = "[Auth] Forgot Password Success";
    AuthActionTypes["ForgotPasswordFailure"] = "[Auth] Forgot Password Failure";
    AuthActionTypes["ResetPassword"] = "[Auth] Reset Password";
    AuthActionTypes["ResetPasswordSuccess"] = "[Auth] Reset Password";
    AuthActionTypes["ResetPasswordFailure"] = "[Auth] Reset Password Failure";
    AuthActionTypes["VerifyUser"] = "[Auth] Verify User";
    AuthActionTypes["VerifyUserSuccess"] = "[Auth] Verify User Success";
    AuthActionTypes["VerifyUserFailure"] = "[Auth] Verify User Failure";
    AuthActionTypes["RegenVerifyUserToken"] = "[Auth] Regenerate Verify User Token";
    AuthActionTypes["RegenVerifyUserTokenSuccess"] = "[Auth] Regenerate Verify User Token Success";
    AuthActionTypes["RegenVerifyUserTokenFailure"] = "[Auth] Regenerate Verify User Token Failure";
    AuthActionTypes["MonitorAccessToken"] = "[Auth] Monitor Access Token";
    AuthActionTypes["MonitorRefreshToken"] = "[Auth] Monitor Refresh Token";
    AuthActionTypes["RefreshTokenTimeoutWarning"] = "[Auth] Refresh Token Timeout Warning";
})(AuthActionTypes = exports.AuthActionTypes || (exports.AuthActionTypes = {}));
class Login {
    constructor(payload) {
        this.payload = payload;
        this.type = AuthActionTypes.Login;
    }
}
exports.Login = Login;
class SAMLLogin {
    constructor(payload) {
        this.payload = payload;
        this.type = AuthActionTypes.SAMLLogin;
    }
}
exports.SAMLLogin = SAMLLogin;
class LoginFailure {
    constructor() {
        this.type = AuthActionTypes.LoginFailure;
    }
}
exports.LoginFailure = LoginFailure;
class UserAuthenticated {
    constructor(payload) {
        this.payload = payload;
        this.type = AuthActionTypes.UserAuthenticated;
    }
}
exports.UserAuthenticated = UserAuthenticated;
class SetUserPermissions {
    constructor(payload) {
        this.payload = payload;
        this.type = AuthActionTypes.SetUserPermissions;
    }
}
exports.SetUserPermissions = SetUserPermissions;
class SetUserPermissionsSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = AuthActionTypes.SetUserPermissionsSuccess;
    }
}
exports.SetUserPermissionsSuccess = SetUserPermissionsSuccess;
class RequestNewAccessToken {
    constructor(payload) {
        this.payload = payload;
        this.type = AuthActionTypes.RequestNewAccessToken;
    }
}
exports.RequestNewAccessToken = RequestNewAccessToken;
class RequestNewAccessTokenFailure {
    constructor(payload) {
        this.payload = payload;
        this.type = AuthActionTypes.RequestNewAccessTokenFailure;
    }
}
exports.RequestNewAccessTokenFailure = RequestNewAccessTokenFailure;
class Logout {
    constructor(payload = { saml: false }) {
        this.payload = payload;
        this.type = AuthActionTypes.Logout;
    }
}
exports.Logout = Logout;
class LogoutSuccess {
    constructor() {
        this.type = AuthActionTypes.LogoutSuccess;
    }
}
exports.LogoutSuccess = LogoutSuccess;
class LogoutFailure {
    constructor() {
        this.type = AuthActionTypes.LogoutFailure;
    }
}
exports.LogoutFailure = LogoutFailure;
class ForgotPassword {
    constructor(payload) {
        this.payload = payload;
        this.type = AuthActionTypes.ForgotPassword;
    }
}
exports.ForgotPassword = ForgotPassword;
class ForgotPasswordSuccess {
    constructor() {
        this.type = AuthActionTypes.ForgotPasswordSuccess;
    }
}
exports.ForgotPasswordSuccess = ForgotPasswordSuccess;
class ForgotPasswordFailure {
    constructor() {
        this.type = AuthActionTypes.ForgotPasswordFailure;
    }
}
exports.ForgotPasswordFailure = ForgotPasswordFailure;
class ResetPassword {
    constructor(payload) {
        this.payload = payload;
        this.type = AuthActionTypes.ResetPassword;
    }
}
exports.ResetPassword = ResetPassword;
class ResetPasswordSuccess {
    constructor() {
        this.type = AuthActionTypes.ResetPasswordSuccess;
    }
}
exports.ResetPasswordSuccess = ResetPasswordSuccess;
class ResetPasswordFailure {
    constructor() {
        this.type = AuthActionTypes.ResetPasswordFailure;
    }
}
exports.ResetPasswordFailure = ResetPasswordFailure;
class VerifyUser {
    constructor(payload) {
        this.payload = payload;
        this.type = AuthActionTypes.VerifyUser;
    }
}
exports.VerifyUser = VerifyUser;
class VerifyUserSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = AuthActionTypes.VerifyUserSuccess;
    }
}
exports.VerifyUserSuccess = VerifyUserSuccess;
class VerifyUserFailure {
    constructor(payload) {
        this.payload = payload;
        this.type = AuthActionTypes.VerifyUserFailure;
    }
}
exports.VerifyUserFailure = VerifyUserFailure;
class RegenVerifyUserToken {
    constructor(payload) {
        this.payload = payload;
        this.type = AuthActionTypes.RegenVerifyUserToken;
    }
}
exports.RegenVerifyUserToken = RegenVerifyUserToken;
class RegenVerifyUserTokenSuccess {
    constructor() {
        this.type = AuthActionTypes.RegenVerifyUserTokenSuccess;
        // TODO: define payload (if needed)
    }
}
exports.RegenVerifyUserTokenSuccess = RegenVerifyUserTokenSuccess;
class RegenVerifyUserTokenFailure {
    constructor(payload) {
        this.payload = payload;
        this.type = AuthActionTypes.RegenVerifyUserTokenFailure;
    }
}
exports.RegenVerifyUserTokenFailure = RegenVerifyUserTokenFailure;
class MonitorAccessToken {
    constructor(payload) {
        this.payload = payload;
        this.type = AuthActionTypes.MonitorAccessToken;
    }
}
exports.MonitorAccessToken = MonitorAccessToken;
class MonitorRefreshToken {
    constructor(payload) {
        this.payload = payload;
        this.type = AuthActionTypes.MonitorAccessToken;
    }
}
exports.MonitorRefreshToken = MonitorRefreshToken;
class RefreshTokenTimeoutWarning {
    constructor() {
        this.type = AuthActionTypes.RefreshTokenTimeoutWarning;
    }
}
exports.RefreshTokenTimeoutWarning = RefreshTokenTimeoutWarning;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5hY3Rpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3N0b3JlL2F1dGgvc3RhdGUvYXV0aC5hY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBSUEsSUFBWSxlQWtDWDtBQWxDRCxXQUFZLGVBQWU7SUFDekIsOENBQTJCLENBQUE7SUFDM0IsdURBQW9DLENBQUE7SUFDcEMsNkRBQTBDLENBQUE7SUFDMUMscUVBQWtELENBQUE7SUFDbEQscUVBQWtELENBQUE7SUFDbEQsb0ZBQWlFLENBQUE7SUFFakUsNEVBQXlELENBQUE7SUFDekQsMkZBQXdFLENBQUE7SUFFeEUsZ0RBQTZCLENBQUE7SUFDN0IsK0RBQTRDLENBQUE7SUFDNUMsK0RBQTRDLENBQUE7SUFFNUMsNERBQXlDLENBQUE7SUFDekMsMkVBQXdELENBQUE7SUFDeEQsMkVBQXdELENBQUE7SUFFeEQsMERBQXVDLENBQUE7SUFDdkMsaUVBQThDLENBQUE7SUFDOUMseUVBQXNELENBQUE7SUFFdEQsb0RBQWlDLENBQUE7SUFDakMsbUVBQWdELENBQUE7SUFDaEQsbUVBQWdELENBQUE7SUFFaEQsK0VBQTRELENBQUE7SUFDNUQsOEZBQTJFLENBQUE7SUFDM0UsOEZBQTJFLENBQUE7SUFFM0UscUVBQWtELENBQUE7SUFDbEQsdUVBQW9ELENBQUE7SUFDcEQsc0ZBQW1FLENBQUE7QUFDckUsQ0FBQyxFQWxDVyxlQUFlLEdBQWYsdUJBQWUsS0FBZix1QkFBZSxRQWtDMUI7QUFFRCxNQUFhLEtBQUs7SUFFaEIsWUFBbUIsT0FBeUI7UUFBekIsWUFBTyxHQUFQLE9BQU8sQ0FBa0I7UUFEbkMsU0FBSSxHQUFHLGVBQWUsQ0FBQyxLQUFLLENBQUM7SUFDVSxDQUFDO0NBQ2xEO0FBSEQsc0JBR0M7QUFDRCxNQUFhLFNBQVM7SUFFcEIsWUFBbUIsT0FB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