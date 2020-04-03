"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ActionTypes;
(function (ActionTypes) {
    ActionTypes["LoadAwsAccounts"] = "[Aws Account] Load Aws Accounts";
    ActionTypes["LoadAwsAccountsSuccess"] = "[Aws Account] Load Aws Accounts Success";
    ActionTypes["LoadAwsAccountsFailure"] = "[Aws Account] Load Aws Accounts Failure";
    ActionTypes["LoadAwsAccount"] = "[Aws Account] Load Aws Account";
    ActionTypes["LoadAwsAccountSuccess"] = "[Aws Account] Load Aws Account Success";
    ActionTypes["LoadAwsAccountFailure"] = "[Aws Account] Load Aws Account Failure";
    ActionTypes["CreateAwsAccount"] = "[Aws Account] Create Aws Account";
    ActionTypes["CreateAwsAccountSuccess"] = "[Aws Account] Create Aws Account Success";
    ActionTypes["CreateAwsAccountFailure"] = "[Aws Account] Create Aws Account Failure";
    ActionTypes["DeleteAwsAccount"] = "[Aws Account] Delete Aws Account";
    ActionTypes["DeleteAwsAccountSuccess"] = "[Aws Account] Delete Aws Account Success";
    ActionTypes["DeleteAwsAccountFailure"] = "[Aws Account] Delete Aws Account Failure";
    ActionTypes["UpdateAwsAccount"] = "[Aws Account] Update Aws Account";
    ActionTypes["UpdateAwsAccountSuccess"] = "[Aws Account] Update Aws Account Success";
    ActionTypes["UpdateAwsAccountFailure"] = "[Aws Account] Update Aws Account Failure";
    ActionTypes["SelectAwsAccount"] = "[Aws Account] Select Aws Account";
    ActionTypes["EnableSurfaceToAwsAccount"] = "[Aws Account] Enable Surface Aws Account";
    ActionTypes["EnableSurfaceToAwsAccountSuccess"] = "[Aws Account] Enable Surface Aws Account Success";
    ActionTypes["EnableSurfaceToAwsAccountFailure"] = "[Aws Account] Enable Surface Aws Account Failure";
    ActionTypes["DisableSurfaceToAwsAccount"] = "[Aws Account] Disable Surface Aws Account";
    ActionTypes["DisableSurfaceToAwsAccountSuccess"] = "[Aws Account] Disable Surface To Aws Account Success";
    ActionTypes["DisableSurfaceToAwsAccountFailure"] = "[Aws Account] Disable Surface to Aws Account Failure";
    ActionTypes["EnableSurfaceLayerToAwsAccount"] = "[Aws Account] Enable Surface Layer To Aws Account";
    ActionTypes["EnableSurfaceLayerToAwsAccountSuccess"] = "[Aws Account] Enable Surface Layer To Aws Account Success";
    ActionTypes["EnableSurfaceLayerToAwsAccountFailure"] = "[Aws Account] Enable Surface Layer To Aws Account Failure";
    ActionTypes["DisableSurfaceLayerToAwsAccount"] = "[Aws Account] Disable Surface Layer To Aws Account";
    ActionTypes["DisableSurfaceLayerToAwsAccountSuccess"] = "[Aws Account] Disable Surface Layer To Aws Account Success";
    ActionTypes["DisableSurfaceLayerToAwsAccountFailure"] = "[Aws Account] Disable Surface Layer To Aws Account Failure";
})(ActionTypes = exports.ActionTypes || (exports.ActionTypes = {}));
class LoadAwsAccounts {
    constructor() {
        this.type = ActionTypes.LoadAwsAccounts;
    }
}
exports.LoadAwsAccounts = LoadAwsAccounts;
class LoadAwsAccountsSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = ActionTypes.LoadAwsAccountsSuccess;
    }
}
exports.LoadAwsAccountsSuccess = LoadAwsAccountsSuccess;
class LoadAwsAccountsFailure {
    constructor() {
        this.type = ActionTypes.LoadAwsAccountsFailure;
    }
}
exports.LoadAwsAccountsFailure = LoadAwsAccountsFailure;
class CreateAwsAccount {
    constructor(payload) {
        this.payload = payload;
        this.type = ActionTypes.CreateAwsAccount;
    }
}
exports.CreateAwsAccount = CreateAwsAccount;
class CreateAwsAccountSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = ActionTypes.CreateAwsAccountSuccess;
    }
}
exports.CreateAwsAccountSuccess = CreateAwsAccountSuccess;
class CreateAwsAccountFailure {
    constructor() {
        this.type = ActionTypes.CreateAwsAccountFailure;
    }
}
exports.CreateAwsAccountFailure = CreateAwsAccountFailure;
class UpdateAwsAccount {
    constructor(payload) {
        this.payload = payload;
        this.type = ActionTypes.UpdateAwsAccount;
    }
}
exports.UpdateAwsAccount = UpdateAwsAccount;
class UpdateAwsAccountSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = ActionTypes.UpdateAwsAccountSuccess;
    }
}
exports.UpdateAwsAccountSuccess = UpdateAwsAccountSuccess;
class UpdateAwsAccountFailure {
    constructor() {
        this.type = ActionTypes.UpdateAwsAccountFailure;
    }
}
exports.UpdateAwsAccountFailure = UpdateAwsAccountFailure;
class DeleteAwsAccount {
    constructor(payload) {
        this.payload = payload;
        this.type = ActionTypes.DeleteAwsAccount;
    }
}
exports.DeleteAwsAccount = DeleteAwsAccount;
class DeleteAwsAccountSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = ActionTypes.DeleteAwsAccountSuccess;
    }
}
exports.DeleteAwsAccountSuccess = DeleteAwsAccountSuccess;
class DeleteAwsAccountFailure {
    constructor() {
        this.type = ActionTypes.DeleteAwsAccountFailure;
    }
}
exports.DeleteAwsAccountFailure = DeleteAwsAccountFailure;
class LoadAwsAccount {
    constructor(payload) {
        this.payload = payload;
        this.type = ActionTypes.LoadAwsAccount;
    }
}
exports.LoadAwsAccount = LoadAwsAccount;
class LoadAwsAccountSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = ActionTypes.LoadAwsAccountSuccess;
    }
}
exports.LoadAwsAccountSuccess = LoadAwsAccountSuccess;
class LoadAwsAccountFailure {
    constructor() {
        this.type = ActionTypes.LoadAwsAccountFailure;
    }
}
exports.LoadAwsAccountFailure = LoadAwsAccountFailure;
class SelectAwsAccount {
    constructor(payload) {
        this.payload = payload;
        this.type = ActionTypes.SelectAwsAccount;
    }
}
exports.SelectAwsAccount = SelectAwsAccount;
class EnableSurfaceToAwsAccount {
    constructor(payload) {
        this.payload = payload;
        this.type = ActionTypes.EnableSurfaceToAwsAccount;
    }
}
exports.EnableSurfaceToAwsAccount = EnableSurfaceToAwsAccount;
class EnableSurfaceToAwsAccountSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = ActionTypes.EnableSurfaceToAwsAccountSuccess;
    }
}
exports.EnableSurfaceToAwsAccountSuccess = EnableSurfaceToAwsAccountSuccess;
class EnableSurfaceToAwsAccountFailure {
    constructor() {
        this.type = ActionTypes.EnableSurfaceToAwsAccountFailure;
    }
}
exports.EnableSurfaceToAwsAccountFailure = EnableSurfaceToAwsAccountFailure;
class DisableSurfaceToAwsAccount {
    constructor(payload) {
        this.payload = payload;
        this.type = ActionTypes.DisableSurfaceToAwsAccount;
    }
}
exports.DisableSurfaceToAwsAccount = DisableSurfaceToAwsAccount;
class DisableSurfaceToAwsAccountSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = ActionTypes.DisableSurfaceToAwsAccountSuccess;
    }
}
exports.DisableSurfaceToAwsAccountSuccess = DisableSurfaceToAwsAccountSuccess;
class DisableSurfaceToAwsAccountFailure {
    constructor() {
        this.type = ActionTypes.DisableSurfaceToAwsAccountFailure;
    }
}
exports.DisableSurfaceToAwsAccountFailure = DisableSurfaceToAwsAccountFailure;
class EnableSurfaceLayerToAwsAccount {
    constructor(payload) {
        this.payload = payload;
        this.type = ActionTypes.EnableSurfaceLayerToAwsAccount;
    }
}
exports.EnableSurfaceLayerToAwsAccount = EnableSurfaceLayerToAwsAccount;
class EnableSurfaceLayerToAwsAccountSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = ActionTypes.EnableSurfaceLayerToAwsAccountSuccess;
    }
}
exports.EnableSurfaceLayerToAwsAccountSuccess = EnableSurfaceLayerToAwsAccountSuccess;
class EnableSurfaceLayerToAwsAccountFailure {
    constructor() {
        this.type = ActionTypes.EnableSurfaceLayerToAwsAccountFailure;
    }
}
exports.EnableSurfaceLayerToAwsAccountFailure = EnableSurfaceLayerToAwsAccountFailure;
class DisableSurfaceLayerToAwsAccount {
    constructor(payload) {
        this.payload = payload;
        this.type = ActionTypes.DisableSurfaceLayerToAwsAccount;
    }
}
exports.DisableSurfaceLayerToAwsAccount = DisableSurfaceLayerToAwsAccount;
class DisableSurfaceLayerToAwsAccountSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = ActionTypes.DisableSurfaceLayerToAwsAccountSuccess;
    }
}
exports.DisableSurfaceLayerToAwsAccountSuccess = DisableSurfaceLayerToAwsAccountSuccess;
class DisableSurfaceLayerToAwsAccountFailure {
    constructor() {
        this.type = ActionTypes.DisableSurfaceLayerToAwsAccountFailure;
    }
}
exports.DisableSurfaceLayerToAwsAccountFailure = DisableSurfaceLayerToAwsAccountFailure;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXdzLWFjY291bnQuYWN0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zdG9yZS9hd3MtYWNjb3VudHMvc3RhdGUvYXdzLWFjY291bnQuYWN0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBLElBQVksV0FzQ1g7QUF0Q0QsV0FBWSxXQUFXO0lBQ3JCLGtFQUFtRCxDQUFBO0lBQ25ELGlGQUFrRSxDQUFBO0lBQ2xFLGlGQUFrRSxDQUFBO0lBRWxFLGdFQUFpRCxDQUFBO0lBQ2pELCtFQUFnRSxDQUFBO0lBQ2hFLCtFQUFnRSxDQUFBO0lBRWhFLG9FQUFxRCxDQUFBO0lBQ3JELG1GQUFvRSxDQUFBO0lBQ3BFLG1GQUFvRSxDQUFBO0lBRXBFLG9FQUFxRCxDQUFBO0lBQ3JELG1GQUFvRSxDQUFBO0lBQ3BFLG1GQUFvRSxDQUFBO0lBRXBFLG9FQUFxRCxDQUFBO0lBQ3JELG1GQUFvRSxDQUFBO0lBQ3BFLG1GQUFvRSxDQUFBO0lBRXBFLG9FQUFxRCxDQUFBO0lBRXJELHFGQUFzRSxDQUFBO0lBQ3RFLG9HQUFxRixDQUFBO0lBQ3JGLG9HQUFxRixDQUFBO0lBRXJGLHVGQUF3RSxDQUFBO0lBQ3hFLHlHQUEwRixDQUFBO0lBQzFGLHlHQUEwRixDQUFBO0lBRTFGLG1HQUFvRixDQUFBO0lBQ3BGLGtIQUFtRyxDQUFBO0lBQ25HLGtIQUFtRyxDQUFBO0lBRW5HLHFHQUFzRixDQUFBO0lBQ3RGLG9IQUFxRyxDQUFBO0lBQ3JHLG9IQUFxRyxDQUFBO0FBQ3ZHLENBQUMsRUF0Q1csV0FBVyxHQUFYLG1CQUFXLEtBQVgsbUJBQVcsUUFzQ3RCO0FBRUQsTUFBYSxlQUFlO0lBQTVCO1FBQ1csU0FBSSxHQUFHLFdBQVcsQ0FBQyxlQUFlLENBQUM7SUFDOUMsQ0FBQztDQUFBO0FBRkQsMENBRUM7QUFFRCxNQUFhLHNC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