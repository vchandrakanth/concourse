"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var InstitutionActionTypes;
(function (InstitutionActionTypes) {
    InstitutionActionTypes["LoadInstitutions"] = "[Institution] Load Institutions";
    InstitutionActionTypes["LoadInstitutionsSuccess"] = "[Institution] Load Institutions Success";
    InstitutionActionTypes["LoadInstitutionsFailure"] = "[Institution] Load Institutions Failure";
    InstitutionActionTypes["LoadInstitution"] = "[Institution] Load Institution";
    InstitutionActionTypes["LoadInstitutionSuccess"] = "[Institution] Load Institution Success";
    InstitutionActionTypes["LoadInstitutionFailure"] = "[Institution] Load Institution Failure";
    InstitutionActionTypes["UpdateInstitution"] = "[Institution] Update Institution";
    InstitutionActionTypes["UpdateInstitutionSuccess"] = "[Institution] Update Institution Success";
    InstitutionActionTypes["UpdateInstitutionFailure"] = "[Institution] Update Institution Failure";
    InstitutionActionTypes["SelectInstitution"] = "[Institution] Select Institution";
    InstitutionActionTypes["InviteInstitution"] = "[Institution] Invite Institution";
    InstitutionActionTypes["InviteInstitutionSuccess"] = "[Institution] Invite Institution Success";
    InstitutionActionTypes["InviteInstitutionFailure"] = "[Institution] Invite Institution Failure";
    InstitutionActionTypes["ValidateInstToken"] = "[Institution] validate Institution Token";
    InstitutionActionTypes["ValidateInstTokenSuccess"] = "[Institution] Validate Institution Token Success";
    InstitutionActionTypes["ValidateInstTokenFailure"] = "[Institution] Validate Institution Token Failure";
    InstitutionActionTypes["RegisterInstitution"] = "[Institution] Register Institution";
    InstitutionActionTypes["RegisterInstitutionSuccess"] = "[Institution] Register Institution Success";
    InstitutionActionTypes["RegisterInstitutionFailure"] = "[Institution] Register Institution Failure";
    InstitutionActionTypes["RegenerateInvitation"] = "[Institution] Regenerate Invitation";
    InstitutionActionTypes["RegenerateInvitationSuccess"] = "[Institution] Regenerate Invitation Success";
    InstitutionActionTypes["RegenerateInvitationFailure"] = "[Institution] Regenerate Invitation Failure";
    InstitutionActionTypes["ValidateRegistrationConfirmToken"] = "[Institution] validate Registration Confirm Token";
    InstitutionActionTypes["ValidateRegistrationConfirmTokenSuccess"] = "[Institution] validate Registration Confirm Token Success";
    InstitutionActionTypes["ValidateRegistrationConfirmTokenFailure"] = "[Institution] validate Registration Confirm Token Failure";
    InstitutionActionTypes["RegenerateRegistration"] = "[Institution] Regenerate Registration";
    InstitutionActionTypes["RegenerateRegistrationSuccess"] = "[Institution] Regenerate Registration Success";
    InstitutionActionTypes["RegenerateRegistrationFailure"] = "[Institution] Regenerate Registration Failure";
    InstitutionActionTypes["LoadInstitutionConfig"] = "[Institution] Load Config";
    InstitutionActionTypes["LoadInstitutionConfigSuccess"] = "[Institution] Load Config Success";
    InstitutionActionTypes["LoadInstitutionConfigFailure"] = "[Institution] Load Config Failure";
    InstitutionActionTypes["CreateInstitutionConfig"] = "[Institution] Create Config";
    InstitutionActionTypes["CreateInstitutionConfigSuccess"] = "[Institution] Create Config Success";
    InstitutionActionTypes["CreateInstitutionConfigFailure"] = "[Institution] Create Config Failure";
    InstitutionActionTypes["UpdateInstitutionConfig"] = "[Institution] Update Config";
    InstitutionActionTypes["UpdateInstitutionConfigSuccess"] = "[Institution] Update Config Success";
    InstitutionActionTypes["UpdateInstitutionConfigFailure"] = "[Institution] Update Config Failure";
})(InstitutionActionTypes = exports.InstitutionActionTypes || (exports.InstitutionActionTypes = {}));
class LoadInstitutions {
    constructor() {
        this.type = InstitutionActionTypes.LoadInstitutions;
    }
}
exports.LoadInstitutions = LoadInstitutions;
class LoadInstitutionsSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = InstitutionActionTypes.LoadInstitutionsSuccess;
    }
}
exports.LoadInstitutionsSuccess = LoadInstitutionsSuccess;
class LoadInstitutionsFailure {
    constructor() {
        this.type = InstitutionActionTypes.LoadInstitutionsFailure;
    }
}
exports.LoadInstitutionsFailure = LoadInstitutionsFailure;
class LoadInstitution {
    constructor(payload) {
        this.payload = payload;
        this.type = InstitutionActionTypes.LoadInstitution;
    }
}
exports.LoadInstitution = LoadInstitution;
class LoadInstitutionSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = InstitutionActionTypes.LoadInstitutionSuccess;
    }
}
exports.LoadInstitutionSuccess = LoadInstitutionSuccess;
class LoadInstitutionFailure {
    constructor() {
        this.type = InstitutionActionTypes.LoadInstitutionFailure;
    }
}
exports.LoadInstitutionFailure = LoadInstitutionFailure;
class UpdateInstitution {
    constructor(payload) {
        this.payload = payload;
        this.type = InstitutionActionTypes.UpdateInstitution;
    }
}
exports.UpdateInstitution = UpdateInstitution;
class UpdateInstitutionSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = InstitutionActionTypes.UpdateInstitutionSuccess;
    }
}
exports.UpdateInstitutionSuccess = UpdateInstitutionSuccess;
class UpdateInstitutionFailure {
    constructor() {
        this.type = InstitutionActionTypes.UpdateInstitutionFailure;
    }
}
exports.UpdateInstitutionFailure = UpdateInstitutionFailure;
class SelectInstitution {
    constructor(payload) {
        this.payload = payload;
        this.type = InstitutionActionTypes.SelectInstitution;
    }
}
exports.SelectInstitution = SelectInstitution;
class InviteInstitution {
    constructor(payload) {
        this.payload = payload;
        this.type = InstitutionActionTypes.InviteInstitution;
    }
}
exports.InviteInstitution = InviteInstitution;
class InviteInstitutionSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = InstitutionActionTypes.InviteInstitutionSuccess;
    }
}
exports.InviteInstitutionSuccess = InviteInstitutionSuccess;
class InviteInstitutionFailure {
    constructor() {
        this.type = InstitutionActionTypes.InviteInstitutionFailure;
    }
}
exports.InviteInstitutionFailure = InviteInstitutionFailure;
class ValidateInstToken {
    constructor(payload) {
        this.payload = payload;
        this.type = InstitutionActionTypes.ValidateInstToken;
    }
}
exports.ValidateInstToken = ValidateInstToken;
class ValidateInstTokenSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = InstitutionActionTypes.ValidateInstTokenSuccess;
    }
}
exports.ValidateInstTokenSuccess = ValidateInstTokenSuccess;
class ValidateInstTokenFailure {
    constructor(payload) {
        this.payload = payload;
        this.type = InstitutionActionTypes.ValidateInstTokenFailure;
    }
}
exports.ValidateInstTokenFailure = ValidateInstTokenFailure;
class RegisterInstitution {
    constructor(payload) {
        this.payload = payload;
        this.type = InstitutionActionTypes.RegisterInstitution;
    }
}
exports.RegisterInstitution = RegisterInstitution;
class RegisterInstitutionSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = InstitutionActionTypes.RegisterInstitutionSuccess;
    }
}
exports.RegisterInstitutionSuccess = RegisterInstitutionSuccess;
class RegisterInstitutionFailure {
    constructor() {
        this.type = InstitutionActionTypes.RegisterInstitutionFailure;
    }
}
exports.RegisterInstitutionFailure = RegisterInstitutionFailure;
class RegenerateInvitation {
    constructor(payload) {
        this.payload = payload;
        this.type = InstitutionActionTypes.RegenerateInvitation;
    }
}
exports.RegenerateInvitation = RegenerateInvitation;
class RegenerateInvitationSuccess {
    constructor() {
        this.type = InstitutionActionTypes.RegenerateInvitationSuccess;
    }
}
exports.RegenerateInvitationSuccess = RegenerateInvitationSuccess;
class RegenerateInvitationFailure {
    constructor() {
        this.type = InstitutionActionTypes.RegenerateInvitationFailure;
    }
}
exports.RegenerateInvitationFailure = RegenerateInvitationFailure;
class ValidateRegistrationConfirmToken {
    constructor(payload) {
        this.payload = payload;
        this.type = InstitutionActionTypes.ValidateRegistrationConfirmToken;
    }
}
exports.ValidateRegistrationConfirmToken = ValidateRegistrationConfirmToken;
class ValidateRegistrationConfirmTokenSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = InstitutionActionTypes.ValidateRegistrationConfirmTokenSuccess;
    }
}
exports.ValidateRegistrationConfirmTokenSuccess = ValidateRegistrationConfirmTokenSuccess;
class ValidateRegistrationConfirmTokenFailure {
    constructor(payload) {
        this.payload = payload;
        this.type = InstitutionActionTypes.ValidateRegistrationConfirmTokenFailure;
    }
}
exports.ValidateRegistrationConfirmTokenFailure = ValidateRegistrationConfirmTokenFailure;
class RegenerateRegistration {
    constructor(payload) {
        this.payload = payload;
        this.type = InstitutionActionTypes.RegenerateRegistration;
    }
}
exports.RegenerateRegistration = RegenerateRegistration;
class RegenerateRegistrationSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = InstitutionActionTypes.RegenerateRegistrationSuccess;
    }
}
exports.RegenerateRegistrationSuccess = RegenerateRegistrationSuccess;
class RegenerateRegistrationFailure {
    constructor() {
        this.type = InstitutionActionTypes.RegenerateRegistrationFailure;
    }
}
exports.RegenerateRegistrationFailure = RegenerateRegistrationFailure;
class LoadInstitutionConfig {
    constructor(payload) {
        this.payload = payload;
        this.type = InstitutionActionTypes.LoadInstitutionConfig;
    }
}
exports.LoadInstitutionConfig = LoadInstitutionConfig;
class LoadInstitutionConfigSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = InstitutionActionTypes.LoadInstitutionConfigSuccess;
    }
}
exports.LoadInstitutionConfigSuccess = LoadInstitutionConfigSuccess;
class LoadInstitutionConfigFailure {
    constructor() {
        this.type = InstitutionActionTypes.LoadInstitutionConfigFailure;
    }
}
exports.LoadInstitutionConfigFailure = LoadInstitutionConfigFailure;
class CreateInstitutionConfig {
    constructor(payload) {
        this.payload = payload;
        this.type = InstitutionActionTypes.CreateInstitutionConfig;
    }
}
exports.CreateInstitutionConfig = CreateInstitutionConfig;
class CreateInstitutionConfigSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = InstitutionActionTypes.CreateInstitutionConfigSuccess;
    }
}
exports.CreateInstitutionConfigSuccess = CreateInstitutionConfigSuccess;
class CreateInstitutionConfigFailure {
    constructor() {
        this.type = InstitutionActionTypes.CreateInstitutionConfigFailure;
    }
}
exports.CreateInstitutionConfigFailure = CreateInstitutionConfigFailure;
class UpdateInstitutionConfig {
    constructor(payload) {
        this.payload = payload;
        this.type = InstitutionActionTypes.UpdateInstitutionConfig;
    }
}
exports.UpdateInstitutionConfig = UpdateInstitutionConfig;
class UpdateInstitutionConfigSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = InstitutionActionTypes.UpdateInstitutionConfigSuccess;
    }
}
exports.UpdateInstitutionConfigSuccess = UpdateInstitutionConfigSuccess;
class UpdateInstitutionConfigFailure {
    constructor() {
        this.type = InstitutionActionTypes.UpdateInstitutionConfigFailure;
    }
}
exports.UpdateInstitutionConfigFailure = UpdateInstitutionConfigFailure;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zdGl0dXRpb24uYWN0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zdG9yZS9pbnN0aXR1dGlvbi9zdGF0ZS9pbnN0aXR1dGlvbi5hY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBSUEsSUFBWSxzQkFrRFg7QUFsREQsV0FBWSxzQkFBc0I7SUFDaEMsOEVBQW9ELENBQUE7SUFDcEQsNkZBQW1FLENBQUE7SUFDbkUsNkZBQW1FLENBQUE7SUFFbkUsNEVBQWtELENBQUE7SUFDbEQsMkZBQWlFLENBQUE7SUFDakUsMkZBQWlFLENBQUE7SUFFakUsZ0ZBQXNELENBQUE7SUFDdEQsK0ZBQXFFLENBQUE7SUFDckUsK0ZBQXFFLENBQUE7SUFFckUsZ0ZBQXNELENBQUE7SUFFdEQsZ0ZBQXNELENBQUE7SUFDdEQsK0ZBQXFFLENBQUE7SUFDckUsK0ZBQXFFLENBQUE7SUFFckUsd0ZBQThELENBQUE7SUFDOUQsdUdBQTZFLENBQUE7SUFDN0UsdUdBQTZFLENBQUE7SUFFN0Usb0ZBQTBELENBQUE7SUFDMUQsbUdBQXlFLENBQUE7SUFDekUsbUdBQXlFLENBQUE7SUFFekUsc0ZBQTRELENBQUE7SUFDNUQscUdBQTJFLENBQUE7SUFDM0UscUdBQTJFLENBQUE7SUFFM0UsZ0hBQXNGLENBQUE7SUFDdEYsK0hBQXFHLENBQUE7SUFDckcsK0hBQXFHLENBQUE7SUFFckcsMEZBQWdFLENBQUE7SUFDaEUseUdBQStFLENBQUE7SUFDL0UseUdBQStFLENBQUE7SUFFL0UsNkVBQW1ELENBQUE7SUFDbkQsNEZBQWtFLENBQUE7SUFDbEUsNEZBQWtFLENBQUE7SUFFbEUsaUZBQXVELENBQUE7SUFDdkQsZ0dBQXNFLENBQUE7SUFDdEUsZ0dBQXNFLENBQUE7SUFFdEUsaUZBQXVELENBQUE7SUFDdkQsZ0dBQXNFLENBQUE7SUFDdEUsZ0dBQXNFLENBQUE7QUFDeEUsQ0FBQyxFQWxEVyxzQkFBc0IsR0FBdEIsOEJBQXNCLEtBQXRCLDhCQUFzQixRQWtEakM7QUFFRCxNQUFhLGdCQUFnQjtJQUE3QjtRQUNXLFNBQUksR0FBRyxzQkFBc0IsQ0FBQyxnQkFBZ0IsQ0FBQztJQUMxRCxDQUFDO0NBQUE7QUFGRCw0Q0FFQztBQUNELE1BQWEsdUJBQXVCO0lBRWxDLFlBQW1CLE9BQXNCO1FBQXRCLFlBQU8sR0FBUCxPQUFPLENBQWU7UUFEaEMsU0FBSSxHQUFHLHNCQUFzQixDQUFDLHVCQUF1QixDQUFDO0lBQ2xCLENBQUM7Q0FDL0M7QUFIRCwwREFHQztBQUNELE1BQWEsdUJBQXVCO0lBQXBDO1FBQ1csU0FBSSxHQUFHLHNCQUFzQixDQUFDLHVCQUF1QixDQUFDO0lBQ2pFLENBQUM7Q0FBQTtBQUZELDBEQUVDO0FBRUQsTUFBYSxlQUFlO0lBRTFCLFlBQW1CLE9BQWU7UUFBZixZQUFPLEdBQVAsT0FBTyxDQUFRO1FBRHpCLFNBQUksR0FBRyxzQkFBc0IsQ0FBQyxlQUFlLENBQUM7SUFDakIsQ0FBQztDQUN4QztBQUhELDBDQUdDO0FBQ0QsTUFBYSxzQkFBc0I7SUFFakMsWUFBbUIsT0FBb0I7UUFBcEIsWUFBTyxHQUFQLE9BQU8sQ0FBYTtRQUQ5QixTQUFJLEdBQUcsc0JBQXNCLENBQUMsc0JBQXNCLENBQUM7SUFDbkIsQ0FBQztDQUM3QztBQUhELHdEQUdDO0FBQ0QsTUFBYSxzQkFBc0I7SUFBbkM7UUFDVyxTQUFJLEdBQUcsc0JBQXNCLENBQUMsc0JBQXNCLENBQUM7SUFDaEUsQ0FBQztDQUFBO0FBRkQsd0RBRUM7QUFFRCxNQUFhLGlCQUFpQjtJQUU1QixZQUFtQixPQUFvQjtRQUFwQixZQUFPLEdBQVAsT0FBTyxDQUFhO1FBRDlCLFNBQUksR0FBRyxzQkFBc0IsQ0FBQyxpQkFBaUIsQ0FBQztJQUNkLENBQUM7Q0FDN0M7QUFIRCw4Q0FHQztBQUNELE1BQWEsd0JBQXdCO0lBRW5DLFlBQW1CLE9BQW9CO1FBQXBCLFlBQU8sR0FBUCxPQUFPLENBQWE7UUFEOUIsU0FBSSxHQUFHLHNCQUFzQixDQUFDLHdCQUF3QixDQUFDO0lBQ3JCLENBQUM7Q0FDN0M7QUFIRCw0REFHQztBQUNELE1BQWEsd0JBQXdCO0lBQXJDO1FBQ1csU0FBSSxHQUFHLHNCQUFzQixDQUFDLHdCQUF3QixDQUFDO0lBQ2xFLENBQUM7Q0FBQTtBQUZELDREQUVDO0FBQ0QsTUFBYSxpQkFBaUI7SUFFNUIsWUFBbUIsT0FBZTtRQUFmLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFEekIsU0FBSSxHQUFHLHNCQUFzQixDQUFDLGlCQUFpQixDQUFDO0lBQ25CLENBQUM7Q0FDeEM7QUFIRCw4Q0FHQztBQUVELE1BQWEsaUJBQWlCO0lBRTVCLFlBQW1CLE9BQTZCO1FBQTdCLFlBQU8sR0FBUCxPQUFPLENBQXNCO1FBRHZDLFNBQUksR0FBRyxzQkFBc0IsQ0FBQyxpQkFBaUIsQ0FBQztJQUNMLENBQUM7Q0FDdEQ7QUFIRCw4Q0FHQztBQUNELE1BQWEsd0JBQXdCO0lBRW5DLFlBQW1CLE9BQW9CO1FBQXBCLFlBQU8sR0FBUCxPQUFPLENBQWE7UUFEOUIsU0FBSSxHQUFHLHNCQUFzQixDQUFDLHdCQUF3QixDQUFDO0lBQ3JCLENBQUM7Q0FDN0M7QUFIRCw0REFHQztBQUNELE1BQWEsd0JBQXdCO0lBQXJDO1FBQ1csU0FBSSxHQUFHLHNCQUFzQixDQUFDLHdCQUF3QixDQUFDO0lBQ2xFLENBQUM7Q0FBQTtBQUZELDREQUVDO0FBQ0QsTUFBYSxpQkFBaUI7SUFFNUIsWUFBbUIsT0FBWTtRQUFaLFlBQU8sR0FBUCxPQUFPLENBQUs7UUFEdEIsU0FBSSxHQUFHLHNCQUFzQixDQUFDLGlCQUFpQixDQUFDO0lBQ3RCLENBQUM7Q0FDckM7QUFIRCw4Q0FHQztBQUNELE1BQWEsd0JBQXdCO0lBRW5DLFlBQW1CLE9BQW9CO1FBQXBCLFlBQU8sR0FBUCxPQUFPLENBQWE7UUFEOUIsU0FBSSxHQUFHLHNCQUFzQixDQUFDLHdCQUF3QixDQUFDO0lBQ3JCLENBQUM7Q0FDN0M7QUFIRCw0REFHQztBQUNELE1BQWEsd0JBQXdCO0lBRW5DLFlBQW1CLE9BQVk7UUFBWixZQUFPLEdBQVAsT0FBTyxDQUFLO1FBRHRCLFNBQUksR0FBRyxzQkFBc0IsQ0FBQyx3QkFBd0IsQ0FBQztJQUM3QixDQUFDO0NBQ3JDO0FBSEQsNERBR0M7QUFFRCxNQUFhLG1CQUFtQjtJQUU5QixZQUFtQixPQUFZO1FBQVosWUFBTyxHQUFQLE9BQU8sQ0FBSztRQUR0QixTQUFJLEdBQUcsc0JBQXNCLENBQUMsbUJBQW1CLENBQUM7SUFDeEIsQ0FBQztDQUNyQztBQUhELGtEQUdDO0FBQ0QsTUFBYSwwQkFBMEI7SUFFckMsWUFBbUIsT0FBb0I7UUFBcEIsWUFBTyxHQUFQLE9BQU8sQ0FBYTtRQUQ5QixTQUFJLEdBQUcsc0JBQXNCLENBQUMsMEJBQTBCLENBQUM7SUFDdkIsQ0FBQztDQUM3QztBQUhELGdFQUdDO0FBQ0QsTUFBYSwwQkFBMEI7SUFBdkM7UUFDVyxTQUFJLEdBQUcsc0JBQXNCLENBQUMsMEJBQTBCLENBQUM7SUFDcEUsQ0FBQztDQUFBO0FBRkQsZ0VBRUM7QUFFRCxNQUFhLG9CQUFvQjtJQUUvQixZQUFtQixPQUFlO1FBQWYsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUR6QixTQUFJLEdBQUcsc0JBQXNCLENBQUMsb0JBQW9CLENBQUM7SUFDdEIsQ0FBQztDQUN4QztBQUhELG9EQUdDO0FBQ0QsTUFBYSwyQkFBMkI7SUFBeEM7UUFDVyxTQUFJLEdBQUcsc0JBQXNCLENBQUMsMkJBQTJCLENBQUM7SUFDckUsQ0FBQztDQUFBO0FBRkQsa0VBRUM7QUFDRCxNQUFhLDJCQUEyQjtJQUF4QztRQUNXLFNBQUksR0FBRyxzQkFBc0IsQ0FBQywyQkFBMkIsQ0FBQztJQUNyRSxDQUFDO0NBQUE7QUFGRCxrRUFFQztBQUVELE1BQWEsZ0NBQWdDO0lBRTNDLFlBQW1CLE9BQVk7UUFBWixZQUFPLEdBQVAsT0FBTyxDQUFLO1FBRHRCLFNBQUksR0FBRyxzQkFBc0IsQ0FBQyxnQ0FBZ0MsQ0FBQztJQUNyQyxDQUFDO0NBQ3JDO0FBSEQsNEVBR0M7QUFDRCxNQUFhLHVDQUF1QztJQUVsRCxZQUFtQixPQUFvQjtRQUFwQixZQUFPLEdBQVAsT0FBTyxDQUFhO1FBRDlCLFNBQUksR0FBRyxzQkFBc0IsQ0FBQyx1Q0FBdUMsQ0FBQztJQUNwQyxDQUFDO0NBQzdDO0FBSEQsMEZBR0M7QUFDRCxNQUFhLHVDQUF1QztJQUVsRCxZQUFtQixPQUFZO1FBQVosWUFBTyxHQUFQLE9BQU8sQ0FBSztRQUR0QixTQUFJLEdBQUcsc0JBQXNCLENBQUMsdUNBQXVDLENBQUM7SUFDNUMsQ0FBQztDQUNyQztBQUhELDBGQUdDO0FBRUQsTUFBYSxzQkFBc0I7SUFFakMsWUFBbUIsT0FBZTtRQUFmLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFEekIsU0FBSSxHQUFHLHNCQUFzQixDQUFDLHNCQUFzQixDQUFDO0lBQ3hCLENBQUM7Q0FDeEM7QUFIRCx3REFHQztBQUNELE1BQWEsNkJBQTZCO0lBRXhDLFlBQW1CLE9BQVk7UUFBWixZQUFPLEdBQVAsT0FBTyxDQUFLO1FBRHRCLFNBQUksR0FBRyxzQkFBc0IsQ0FBQyw2QkFBNkIsQ0FBQztJQUNsQyxDQUFDO0NBQ3JDO0FBSEQsc0VBR0M7QUFDRCxNQUFhLDZCQUE2QjtJQUExQztRQUNXLFNBQUksR0FBRyxzQkFBc0IsQ0FBQyw2QkFBNkIsQ0FBQztJQUN2RSxDQUFDO0NBQUE7QUFGRCxzRUFFQztBQUVELE1BQWEscUJBQXFCO0lBRWhDLFlBQW1CLE9BQTJCO1FBQTNCLFlBQU8sR0FBUCxPQUFPLENBQW9CO1FBRHJDLFNBQUksR0FBRyxzQkFBc0IsQ0FBQyxxQkFBcUIsQ0FBQztJQUNYLENBQUM7Q0FDcEQ7QUFIRCxzREFHQztBQUNELE1BQWEsNEJBQTRCO0lBRXZDLFlBQW1CLE9BQXNDO1FBQXRDLFlBQU8sR0FBUCxPQUFPLENBQStCO1FBRGhELFNBQUksR0FBRyxzQkFBc0IsQ0FBQyw0QkFBNEIsQ0FBQztJQUNQLENBQUM7Q0FDL0Q7QUFIRCxvRUFHQztBQUNELE1BQWEsNEJBQTRCO0lBQXpDO1FBQ1csU0FBSSxHQUFHLHNCQUFzQixDQUFDLDRCQUE0QixDQUFDO0lBQ3RFLENBQUM7Q0FBQTtBQUZELG9FQUVDO0FBRUQsTUFBYSx1QkFBdUI7SUFFbEMsWUFBbUIsT0FBc0M7UUFBdEMsWUFBTyxHQUFQLE9BQU8sQ0FBK0I7UUFEaEQsU0FBSSxHQUFHLHNCQUFzQixDQUFDLHVCQUF1QixDQUFDO0lBQ0YsQ0FBQztDQUMvRDtBQUhELDBEQUdDO0FBQ0QsTUFBYSw4QkFBOEI7SUFFekMsWUFBbUIsT0FBc0M7UUFBdEMsWUFBTyxHQUFQLE9BQU8sQ0FBK0I7UUFEaEQsU0FBSSxHQUFHLHNCQUFzQixDQUFDLDhCQUE4QixDQUFDO0lBQ1QsQ0FBQztDQUMvRDtBQUhELHdFQUdDO0FBQ0QsTUFBYSw4QkFBOEI7SUFBM0M7UUFDVyxTQUFJLEdBQUcsc0JBQXNCLENBQUMsOEJBQThCLENBQUM7SUFDeEUsQ0FBQztDQUFBO0FBRkQsd0VBRUM7QUFFRCxNQUFhLHVCQUF1QjtJQUVsQyxZQUFtQixPQUFzQztRQUF0QyxZQUFPLEdBQVAsT0FBTyxDQUErQjtRQURoRCxTQUFJLEdBQUcsc0JBQXNCLENBQUMsdUJBQXVCLENBQUM7SUFDRixDQUFDO0NBQy9EO0FBSEQsMERBR0M7QUFDRCxNQUFhLDhCQUE4QjtJQUV6QyxZQUFtQixPQUFzQztRQUF0QyxZQUFPLEdBQVAsT0FBTyxDQUErQjtRQURoRCxTQUFJLEdBQUcsc0JBQXNCLENBQUMsOEJBQThCLENBQUM7SUFDVCxDQUFDO0NBQy9EO0FBSEQsd0VBR0M7QUFDRCxNQUFhLDhCQUE4QjtJQUEzQztRQUNXLFNBQUksR0FBRyxzQkFBc0IsQ0FBQyw4QkFBOEIsQ0FBQztJQUN4RSxDQUFDO0NBQUE7QUFGRCx3RUFFQyJ9