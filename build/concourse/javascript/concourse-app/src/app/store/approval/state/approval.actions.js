"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ApprovalActionTypes;
(function (ApprovalActionTypes) {
    ApprovalActionTypes["LoadApprovalRequests"] = "[Approval] Load Approval Requests";
    ApprovalActionTypes["LoadApprovalRequestsSuccess"] = "[Approval] Load Approval Requests Success";
    ApprovalActionTypes["LoadApprovalRequestsFailure"] = "[Approval] Load Approval Requests Failure";
    ApprovalActionTypes["LoadApprovalRequest"] = "[Approval] Load Approval Request";
    ApprovalActionTypes["LoadApprovalRequestSuccess"] = "[Approval] Load Approval Request Success";
    ApprovalActionTypes["LoadApprovalRequestFailure"] = "[Approval] Load Approval Request Failure";
    ApprovalActionTypes["SelectApprovalRequest"] = "[Approval] Select Approval Request";
    ApprovalActionTypes["ApprovalRequestAction"] = "[Workflow] Approval Request Action";
    ApprovalActionTypes["ApprovalRequestActionSuccess"] = "[Workflow] Approval Request Action Success";
    ApprovalActionTypes["ApprovalRequestActionFailure"] = "[Workflow] Approval Request Action Failure";
    ApprovalActionTypes["LoadApprovalRequestByRequestEntityId"] = "[Workflow] Load Approval Request By RequestEntityId";
    ApprovalActionTypes["LoadApprovalRequestByRequestEntityIdSuccess"] = "[Workflow] Load Approval Request By RequestEntityId Success";
    ApprovalActionTypes["LoadApprovalRequestByRequestEntityIdFailure"] = "[Workflow] Load Approval Request By RequestEntityId Failure";
})(ApprovalActionTypes = exports.ApprovalActionTypes || (exports.ApprovalActionTypes = {}));
class LoadApprovalRequests {
    constructor() {
        this.type = ApprovalActionTypes.LoadApprovalRequests;
    }
}
exports.LoadApprovalRequests = LoadApprovalRequests;
class LoadApprovalRequestsSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = ApprovalActionTypes.LoadApprovalRequestsSuccess;
    }
}
exports.LoadApprovalRequestsSuccess = LoadApprovalRequestsSuccess;
class LoadApprovalRequestsFailure {
    constructor() {
        this.type = ApprovalActionTypes.LoadApprovalRequestsFailure;
    }
}
exports.LoadApprovalRequestsFailure = LoadApprovalRequestsFailure;
class LoadApprovalRequest {
    constructor(payload) {
        this.payload = payload;
        this.type = ApprovalActionTypes.LoadApprovalRequest;
    }
}
exports.LoadApprovalRequest = LoadApprovalRequest;
class LoadApprovalRequestSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = ApprovalActionTypes.LoadApprovalRequestSuccess;
    }
}
exports.LoadApprovalRequestSuccess = LoadApprovalRequestSuccess;
class LoadApprovalRequestFailure {
    constructor() {
        this.type = ApprovalActionTypes.LoadApprovalRequestFailure;
    }
}
exports.LoadApprovalRequestFailure = LoadApprovalRequestFailure;
class SelectApprovalRequest {
    constructor(payload) {
        this.payload = payload;
        this.type = ApprovalActionTypes.SelectApprovalRequest;
    }
}
exports.SelectApprovalRequest = SelectApprovalRequest;
class ApprovalRequestAction {
    constructor(payload) {
        this.payload = payload;
        this.type = ApprovalActionTypes.ApprovalRequestAction;
    }
}
exports.ApprovalRequestAction = ApprovalRequestAction;
class ApprovalRequestActionSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = ApprovalActionTypes.ApprovalRequestActionSuccess;
    }
}
exports.ApprovalRequestActionSuccess = ApprovalRequestActionSuccess;
class ApprovalRequestActionFailure {
    constructor() {
        this.type = ApprovalActionTypes.ApprovalRequestActionFailure;
    }
}
exports.ApprovalRequestActionFailure = ApprovalRequestActionFailure;
class LoadApprovalRequestByRequestEntityId {
    constructor(payload) {
        this.payload = payload;
        this.type = ApprovalActionTypes.LoadApprovalRequestByRequestEntityId;
    }
}
exports.LoadApprovalRequestByRequestEntityId = LoadApprovalRequestByRequestEntityId;
class LoadApprovalRequestByRequestEntityIdSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = ApprovalActionTypes.LoadApprovalRequestByRequestEntityIdSuccess;
    }
}
exports.LoadApprovalRequestByRequestEntityIdSuccess = LoadApprovalRequestByRequestEntityIdSuccess;
class LoadApprovalRequestByRequestEntityIdFailure {
    constructor() {
        this.type = ApprovalActionTypes.LoadApprovalRequestByRequestEntityIdFailure;
    }
}
exports.LoadApprovalRequestByRequestEntityIdFailure = LoadApprovalRequestByRequestEntityIdFailure;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwcm92YWwuYWN0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zdG9yZS9hcHByb3ZhbC9zdGF0ZS9hcHByb3ZhbC5hY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBSUEsSUFBWSxtQkFrQlg7QUFsQkQsV0FBWSxtQkFBbUI7SUFDN0IsaUZBQTBELENBQUE7SUFDMUQsZ0dBQXlFLENBQUE7SUFDekUsZ0dBQXlFLENBQUE7SUFFekUsK0VBQXdELENBQUE7SUFDeEQsOEZBQXVFLENBQUE7SUFDdkUsOEZBQXVFLENBQUE7SUFFdkUsbUZBQTRELENBQUE7SUFFNUQsbUZBQTRELENBQUE7SUFDNUQsa0dBQTJFLENBQUE7SUFDM0Usa0dBQTJFLENBQUE7SUFFM0UsbUhBQTRGLENBQUE7SUFDNUYsa0lBQTJHLENBQUE7SUFDM0csa0lBQTJHLENBQUE7QUFDN0csQ0FBQyxFQWxCVyxtQkFBbUIsR0FBbkIsMkJBQW1CLEtBQW5CLDJCQUFtQixRQWtCOUI7QUFFRCxNQUFhLG9CQUFvQjtJQUFqQztRQUNXLFNBQUksR0FBRyxtQkFBbUIsQ0FBQyxvQkFBb0IsQ0FBQztJQUMzRCxDQUFDO0NBQUE7QUFGRCxvREFFQztBQUNELE1BQWEsMkJBQTJCO0lBRXRDLFlBQW1CLE9BQTBCO1FBQTFCLFlBQU8sR0FBUCxPQUFPLENBQW1CO1FBRHBDLFNBQUksR0FBRyxtQkFBbUIsQ0FBQywyQkFBMkIsQ0FBQztJQUNmLENBQUM7Q0FDbkQ7QUFIRCxrRUFHQztBQUNELE1BQWEsMkJBQTJCO0lBQXhDO1FBQ1csU0FBSSxHQUFHLG1CQUFtQixDQUFDLDJCQUEyQixDQUFDO0lBQ2xFLENBQUM7Q0FBQTtBQUZELGtFQUVDO0FBRUQsTUFBYSxtQkFBbUI7SUFFOUIsWUFBbUIsT0FBZTtRQUFmLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFEekIsU0FBSSxHQUFHLG1CQUFtQixDQUFDLG1CQUFtQixDQUFDO0lBQ2xCLENBQUM7Q0FDeEM7QUFIRCxrREFHQztBQUNELE1BQWEsMEJBQTBCO0lBRXJDLFlBQW1CLE9BQXdCO1FBQXhCLFlBQU8sR0FBUCxPQUFPLENBQWlCO1FBRGxDLFNBQUksR0FBRyxtQkFBbUIsQ0FBQywwQkFBMEIsQ0FBQztJQUNoQixDQUFDO0NBQ2pEO0FBSEQsZ0VBR0M7QUFDRCxNQUFhLDBCQUEwQjtJQUF2QztRQUNXLFNBQUksR0FBRyxtQkFBbUIsQ0FBQywwQkFBMEIsQ0FBQztJQUNqRSxDQUFDO0NBQUE7QUFGRCxnRUFFQztBQUVELE1BQWEscUJBQXFCO0lBRWhDLFlBQW1CLE9BQWU7UUFBZixZQUFPLEdBQVAsT0FBTyxDQUFRO1FBRHpCLFNBQUksR0FBRyxtQkFBbUIsQ0FBQyxxQkFBcUIsQ0FBQztJQUNwQixDQUFDO0NBQ3hDO0FBSEQsc0RBR0M7QUFFRCxNQUFhLHFCQUFxQjtJQUVoQyxZQUFtQixPQUdsQjtRQUhrQixZQUFPLEdBQVAsT0FBTyxDQUd6QjtRQUpRLFNBQUksR0FBRyxtQkFBbUIsQ0FBQyxxQkFBcUIsQ0FBQztJQUlyRCxDQUFDO0NBQ1A7QUFORCxzREFNQztBQUNELE1BQWEsNEJBQTRCO0lBRXZDLFlBQW1CLE9BR2xCO1FBSGtCLFlBQU8sR0FBUCxPQUFPLENBR3pCO1FBSlEsU0FBSSxHQUFHLG1CQUFtQixDQUFDLDRCQUE0QixDQUFDO0lBSTVELENBQUM7Q0FDUDtBQU5ELG9FQU1DO0FBQ0QsTUFBYSw0QkFBNEI7SUFBekM7UUFDVyxTQUFJLEdBQUcsbUJBQW1CLENBQUMsNEJBQTRCLENBQUM7SUFDbkUsQ0FBQztDQUFBO0FBRkQsb0VBRUM7QUFFRCxNQUFhLG9DQUFvQztJQUUvQyxZQUFtQixPQUFlO1FBQWYsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUR6QixTQUFJLEdBQUcsbUJBQW1CLENBQUMsb0NBQW9DLENBQUM7SUFFekUsQ0FBQztDQUNGO0FBSkQsb0ZBSUM7QUFDRCxNQUFhLDJDQUEyQztJQUV0RCxZQUFtQixPQUEwQjtRQUExQixZQUFPLEdBQVAsT0FBTyxDQUFtQjtRQURwQyxTQUFJLEdBQUcsbUJBQW1CLENBQUMsMkNBQTJDLENBQUM7SUFDL0IsQ0FBQztDQUNuRDtBQUhELGtHQUdDO0FBQ0QsTUFBYSwyQ0FBMkM7SUFBeEQ7UUFDVyxTQUFJLEdBQUcsbUJBQW1CLENBQUMsMkNBQTJDLENBQUM7SUFDbEYsQ0FBQztDQUFBO0FBRkQsa0dBRUMifQ==