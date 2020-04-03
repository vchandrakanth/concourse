"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LogicalDeploymentActionTypes;
(function (LogicalDeploymentActionTypes) {
    LogicalDeploymentActionTypes["LoadLogicalDeployments"] = "[LogicalDeployment] Load Logical Deployments";
    LogicalDeploymentActionTypes["LoadLogicalDeploymentsSuccess"] = "[LogicalDeployment] Load Logical Deployments Success";
    LogicalDeploymentActionTypes["LoadLogicalDeploymentsFailure"] = "[LogicalDeployment] Load Logical Deployments Failure";
    LogicalDeploymentActionTypes["LoadLogicalDeploymentsBySurfaceLayerId"] = "[LogicalDeployment] Load Logical Deployments by SurfaceLayer Id";
    LogicalDeploymentActionTypes["LoadLogicalDeploymentsBySurfaceLayerIdSuccess"] = "[LogicalDeployment] Load Logical Deployments by SurfaceLayer Id Success";
    LogicalDeploymentActionTypes["LoadLogicalDeploymentsBySurfaceLayerIdFailure"] = "[LogicalDeployment] Load Logical Deployments by SurfaceLayer Id Failure";
    LogicalDeploymentActionTypes["LoadLogicalDeployment"] = "[LogicalDeployment] Load Logical Deployment";
    LogicalDeploymentActionTypes["LoadLogicalDeploymentSuccess"] = "[LogicalDeployment] Load Logical Deployment Success";
    LogicalDeploymentActionTypes["LoadLogicalDeploymentFailure"] = "[LogicalDeployment] Load Logical Deployment Failure";
    LogicalDeploymentActionTypes["LoadResourceAuditData"] = "[LogicalDeployment] Load Resource Audit Data";
    LogicalDeploymentActionTypes["LoadResourceAuditDataSuccess"] = "[LogicalDeployment] Load Resource Audit Data Success";
    LogicalDeploymentActionTypes["LoadResourceAuditDataFailure"] = "[LogicalDeployment] Load Resource Audit Data Failure";
    LogicalDeploymentActionTypes["SearchLogicalDeployments"] = "[LogicalDeployment] Search Logical Deployments";
    LogicalDeploymentActionTypes["SearchLogicalDeploymentsSuccess"] = "[LogicalDeployment] Search Logical Deployments Success";
    LogicalDeploymentActionTypes["ResetLogicalDeploymentsSearch"] = "[LogicalDeployment] Reset Logical Deployments Search";
    LogicalDeploymentActionTypes["SelectResourceAuditData"] = "[LogicalDeployment] Select Resource Audit Data";
    LogicalDeploymentActionTypes["CreateLogicalDeployment"] = "[LogicalDeployment] Create Logical Deployment";
    LogicalDeploymentActionTypes["CreateLogicalDeploymentSuccess"] = "[LogicalDeployment] Create Logical Deployment Success";
    LogicalDeploymentActionTypes["CreateLogicalDeploymentFailure"] = "[LogicalDeployment] Create Logical Deployment Failure";
    LogicalDeploymentActionTypes["UpdateModelVersion"] = "[LogicalDeployment] Update Model Version";
    LogicalDeploymentActionTypes["UpdateModelVersionSuccess"] = "[LogicalDeployment] Update Model Version Success";
    LogicalDeploymentActionTypes["UpdateModelVersionFailure"] = "[LogicalDeployment] Update Model Version Failure";
    LogicalDeploymentActionTypes["DeleteLogicalDeployment"] = "[LogicalDeployment] Delete Logical Deployment";
    LogicalDeploymentActionTypes["DeleteLogicalDeploymentSuccess"] = "[LogicalDeployment] Delete Logical Deployment Success";
    LogicalDeploymentActionTypes["DeleteLogicalDeploymentPending"] = "[LogicalDeployment] Delete Logical Deployment Pending";
    LogicalDeploymentActionTypes["DeleteLogicalDeploymentFailure"] = "[LogicalDeployment] Delete Logical Deployment Failure";
    LogicalDeploymentActionTypes["SelectLogicalDeployment"] = "[LogicalDeployment] Select Logical Deployment";
    LogicalDeploymentActionTypes["GeneratePrivilegeTemplate"] = "[LogicalDeployment] Generate Privilege Report";
    LogicalDeploymentActionTypes["GeneratePrivilegeTemplateSuccess"] = "[LogicalDeployment] Generate Privilege Report Success";
    LogicalDeploymentActionTypes["GeneratePrivilegeTemplateFailure"] = "[LogicalDeployment] Generate Privilege Report Failure";
})(LogicalDeploymentActionTypes = exports.LogicalDeploymentActionTypes || (exports.LogicalDeploymentActionTypes = {}));
class LoadLogicalDeployments {
    constructor() {
        this.type = LogicalDeploymentActionTypes.LoadLogicalDeployments;
    }
}
exports.LoadLogicalDeployments = LoadLogicalDeployments;
class LoadLogicalDeploymentsSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = LogicalDeploymentActionTypes.LoadLogicalDeploymentsSuccess;
    }
}
exports.LoadLogicalDeploymentsSuccess = LoadLogicalDeploymentsSuccess;
class LoadLogicalDeploymentsFailure {
    constructor() {
        this.type = LogicalDeploymentActionTypes.LoadLogicalDeploymentsFailure;
    }
}
exports.LoadLogicalDeploymentsFailure = LoadLogicalDeploymentsFailure;
class LoadLogicalDeploymentsBySurfaceLayerId {
    constructor(payload) {
        this.payload = payload;
        this.type = LogicalDeploymentActionTypes.LoadLogicalDeploymentsBySurfaceLayerId;
    }
}
exports.LoadLogicalDeploymentsBySurfaceLayerId = LoadLogicalDeploymentsBySurfaceLayerId;
class LoadLogicalDeploymentsBySurfaceLayerIdSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = LogicalDeploymentActionTypes.LoadLogicalDeploymentsBySurfaceLayerIdSuccess;
    }
}
exports.LoadLogicalDeploymentsBySurfaceLayerIdSuccess = LoadLogicalDeploymentsBySurfaceLayerIdSuccess;
class LoadLogicalDeploymentsBySurfaceLayerIdFailure {
    constructor() {
        this.type = LogicalDeploymentActionTypes.LoadLogicalDeploymentsBySurfaceLayerIdFailure;
    }
}
exports.LoadLogicalDeploymentsBySurfaceLayerIdFailure = LoadLogicalDeploymentsBySurfaceLayerIdFailure;
class LoadLogicalDeployment {
    constructor(payload) {
        this.payload = payload;
        this.type = LogicalDeploymentActionTypes.LoadLogicalDeployment;
    }
}
exports.LoadLogicalDeployment = LoadLogicalDeployment;
class LoadLogicalDeploymentSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = LogicalDeploymentActionTypes.LoadLogicalDeploymentSuccess;
    }
}
exports.LoadLogicalDeploymentSuccess = LoadLogicalDeploymentSuccess;
class LoadLogicalDeploymentFailure {
    constructor() {
        this.type = LogicalDeploymentActionTypes.LoadLogicalDeploymentFailure;
    }
}
exports.LoadLogicalDeploymentFailure = LoadLogicalDeploymentFailure;
class LoadResourceAuditData {
    constructor(payload) {
        this.payload = payload;
        this.type = LogicalDeploymentActionTypes.LoadResourceAuditData;
    }
}
exports.LoadResourceAuditData = LoadResourceAuditData;
class LoadResourceAuditDataSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = LogicalDeploymentActionTypes.LoadResourceAuditDataSuccess;
    } // TODO: Add type
}
exports.LoadResourceAuditDataSuccess = LoadResourceAuditDataSuccess;
class SelectResourceAuditData {
    constructor(payload) {
        this.payload = payload;
        this.type = LogicalDeploymentActionTypes.SelectResourceAuditData;
    } // TODO: Add type
}
exports.SelectResourceAuditData = SelectResourceAuditData;
class LoadResourceAuditDataFailure {
    constructor() {
        this.type = LogicalDeploymentActionTypes.LoadResourceAuditDataFailure;
    }
}
exports.LoadResourceAuditDataFailure = LoadResourceAuditDataFailure;
class CreateLogicalDeployment {
    constructor(payload) {
        this.payload = payload;
        this.type = LogicalDeploymentActionTypes.CreateLogicalDeployment;
    }
}
exports.CreateLogicalDeployment = CreateLogicalDeployment;
class CreateLogicalDeploymentSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = LogicalDeploymentActionTypes.CreateLogicalDeploymentSuccess;
    }
}
exports.CreateLogicalDeploymentSuccess = CreateLogicalDeploymentSuccess;
class CreateLogicalDeploymentFailure {
    constructor() {
        this.type = LogicalDeploymentActionTypes.CreateLogicalDeploymentFailure;
    }
}
exports.CreateLogicalDeploymentFailure = CreateLogicalDeploymentFailure;
class UpdateModelVersion {
    constructor(payload) {
        this.payload = payload;
        this.type = LogicalDeploymentActionTypes.UpdateModelVersion;
    }
}
exports.UpdateModelVersion = UpdateModelVersion;
class UpdateModelVersionSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = LogicalDeploymentActionTypes.UpdateModelVersionSuccess;
    }
}
exports.UpdateModelVersionSuccess = UpdateModelVersionSuccess;
class UpdateModelVersionFailure {
    constructor() {
        this.type = LogicalDeploymentActionTypes.UpdateModelVersionFailure;
    }
}
exports.UpdateModelVersionFailure = UpdateModelVersionFailure;
class DeleteLogicalDeployment {
    constructor(payload) {
        this.payload = payload;
        this.type = LogicalDeploymentActionTypes.DeleteLogicalDeployment;
    }
}
exports.DeleteLogicalDeployment = DeleteLogicalDeployment;
class DeleteLogicalDeploymentSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = LogicalDeploymentActionTypes.DeleteLogicalDeploymentSuccess;
    }
}
exports.DeleteLogicalDeploymentSuccess = DeleteLogicalDeploymentSuccess;
class DeleteLogicalDeploymentPending {
    constructor(payload) {
        this.payload = payload;
        this.type = LogicalDeploymentActionTypes.DeleteLogicalDeploymentPending;
    }
}
exports.DeleteLogicalDeploymentPending = DeleteLogicalDeploymentPending;
class DeleteLogicalDeploymentFailure {
    constructor() {
        this.type = LogicalDeploymentActionTypes.DeleteLogicalDeploymentFailure;
    }
}
exports.DeleteLogicalDeploymentFailure = DeleteLogicalDeploymentFailure;
class SelectLogicalDeployment {
    constructor(payload) {
        this.payload = payload;
        this.type = LogicalDeploymentActionTypes.SelectLogicalDeployment;
    }
}
exports.SelectLogicalDeployment = SelectLogicalDeployment;
class SearchLogicalDeployments {
    constructor(payload) {
        this.payload = payload;
        this.type = LogicalDeploymentActionTypes.SearchLogicalDeployments;
    }
}
exports.SearchLogicalDeployments = SearchLogicalDeployments;
class SearchLogicalDeploymentsSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = LogicalDeploymentActionTypes.SearchLogicalDeploymentsSuccess;
    }
}
exports.SearchLogicalDeploymentsSuccess = SearchLogicalDeploymentsSuccess;
class ResetLogicalDeploymentsSearch {
    constructor() {
        this.type = LogicalDeploymentActionTypes.ResetLogicalDeploymentsSearch;
    }
}
exports.ResetLogicalDeploymentsSearch = ResetLogicalDeploymentsSearch;
class GeneratePrivilegeTemplate {
    constructor(payload) {
        this.payload = payload;
        this.type = LogicalDeploymentActionTypes.GeneratePrivilegeTemplate;
    }
}
exports.GeneratePrivilegeTemplate = GeneratePrivilegeTemplate;
class GeneratePrivilegeTemplateSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = LogicalDeploymentActionTypes.GeneratePrivilegeTemplateSuccess;
    }
}
exports.GeneratePrivilegeTemplateSuccess = GeneratePrivilegeTemplateSuccess;
class GeneratePrivilegeTemplateFailure {
    constructor() {
        this.type = LogicalDeploymentActionTypes.GeneratePrivilegeTemplateFailure;
    }
}
exports.GeneratePrivilegeTemplateFailure = GeneratePrivilegeTemplateFailure;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naWNhbC1kZXBsb3ltZW50LmFjdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc3RvcmUvbG9naWNhbC1kZXBsb3ltZW50L3N0YXRlL2xvZ2ljYWwtZGVwbG95bWVudC5hY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBSUEsSUFBWSw0QkF5Q1g7QUF6Q0QsV0FBWSw0QkFBNEI7SUFDdEMsdUdBQXVFLENBQUE7SUFDdkUsc0hBQXNGLENBQUE7SUFDdEYsc0hBQXNGLENBQUE7SUFFdEYsMElBQTBHLENBQUE7SUFDMUcseUpBQXlILENBQUE7SUFDekgseUpBQXlILENBQUE7SUFFekgscUdBQXFFLENBQUE7SUFDckUsb0hBQW9GLENBQUE7SUFDcEYsb0hBQW9GLENBQUE7SUFFcEYsc0dBQXNFLENBQUE7SUFDdEUscUhBQXFGLENBQUE7SUFDckYscUhBQXFGLENBQUE7SUFFckYsMkdBQTJFLENBQUE7SUFDM0UsMEhBQTBGLENBQUE7SUFDMUYsc0hBQXNGLENBQUE7SUFFdEYsMEdBQTBFLENBQUE7SUFFMUUseUdBQXlFLENBQUE7SUFDekUsd0hBQXdGLENBQUE7SUFDeEYsd0hBQXdGLENBQUE7SUFFeEYsK0ZBQStELENBQUE7SUFDL0QsOEdBQThFLENBQUE7SUFDOUUsOEdBQThFLENBQUE7SUFFOUUseUdBQXlFLENBQUE7SUFDekUsd0hBQXdGLENBQUE7SUFDeEYsd0hBQXdGLENBQUE7SUFDeEYsd0hBQXdGLENBQUE7SUFFeEYseUdBQXlFLENBQUE7SUFFekUsMkdBQTJFLENBQUE7SUFDM0UsMEhBQTBGLENBQUE7SUFDMUYsMEhBQTBGLENBQUE7QUFDNUYsQ0FBQyxFQXpDVyw0QkFBNEIsR0FBNUIsb0NBQTRCLEtBQTVCLG9DQUE0QixRQXlDdkM7QUFFRCxNQUFhLHNCQUFzQjtJQUFuQztRQUNXLFNB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