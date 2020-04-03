"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DiscoveredDeploymentActionTypes;
(function (DiscoveredDeploymentActionTypes) {
    DiscoveredDeploymentActionTypes["LoadDiscoveredDeployments"] = "[DiscoveredDeployment] Load Discovered Deployments";
    DiscoveredDeploymentActionTypes["LoadDiscoveredDeploymentsSuccess"] = "[DiscoveredDeployment] Load Discovered Deployments Success";
    DiscoveredDeploymentActionTypes["LoadDiscoveredDeploymentsFailure"] = "[DiscoveredDeployment] Load Discovered Deployments Failure";
    DiscoveredDeploymentActionTypes["LoadDiscoveredDeployment"] = "[DiscoveredDeployment] Load Discovered Deployment";
    DiscoveredDeploymentActionTypes["LoadDiscoveredDeploymentSuccess"] = "[DiscoveredDeployment] Load Discovered Deployment Success";
    DiscoveredDeploymentActionTypes["LoadDiscoveredDeploymentFailure"] = "[DiscoveredDeployment] Load Discovered Deployment Failure";
    DiscoveredDeploymentActionTypes["LoadResourceAuditData"] = "[DiscoveredDeployment] Load Resource Audit Data";
    DiscoveredDeploymentActionTypes["LoadResourceAuditDataSuccess"] = "[DiscoveredDeployment] Load Resource Audit Data Success";
    DiscoveredDeploymentActionTypes["LoadResourceAuditDataFailure"] = "[DiscoveredDeployment] Load Resource Audit Data Failure";
    DiscoveredDeploymentActionTypes["SearchDiscoveredDeployments"] = "[DiscoveredDeployment] Search Discovered Deployments";
    DiscoveredDeploymentActionTypes["SearchDiscoveredDeploymentsSuccess"] = "[DiscoveredDeployment] Search Discovered Deployments Success";
    DiscoveredDeploymentActionTypes["ResetDiscoveredDeploymentsSearch"] = "[DiscoveredDeployment] Reset Discovered Deployments Search";
    DiscoveredDeploymentActionTypes["SelectResourceAuditData"] = "[DiscoveredDeployment] Selected Resource Audit Data";
    DiscoveredDeploymentActionTypes["SelectDiscoveredDeployment"] = "[DiscoveredDeployment] Select Discovered Deployment ";
})(DiscoveredDeploymentActionTypes = exports.DiscoveredDeploymentActionTypes || (exports.DiscoveredDeploymentActionTypes = {}));
class LoadDiscoveredDeployments {
    constructor() {
        this.type = DiscoveredDeploymentActionTypes.LoadDiscoveredDeployments;
    }
}
exports.LoadDiscoveredDeployments = LoadDiscoveredDeployments;
class LoadDiscoveredDeploymentsSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = DiscoveredDeploymentActionTypes.LoadDiscoveredDeploymentsSuccess;
    }
}
exports.LoadDiscoveredDeploymentsSuccess = LoadDiscoveredDeploymentsSuccess;
class LoadDiscoveredDeploymentsFailure {
    constructor() {
        this.type = DiscoveredDeploymentActionTypes.LoadDiscoveredDeploymentsFailure;
    }
}
exports.LoadDiscoveredDeploymentsFailure = LoadDiscoveredDeploymentsFailure;
class LoadDiscoveredDeployment {
    constructor(payload) {
        this.payload = payload;
        this.type = DiscoveredDeploymentActionTypes.LoadDiscoveredDeployment;
    }
}
exports.LoadDiscoveredDeployment = LoadDiscoveredDeployment;
class LoadDiscoveredDeploymentSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = DiscoveredDeploymentActionTypes.LoadDiscoveredDeploymentSuccess;
    }
}
exports.LoadDiscoveredDeploymentSuccess = LoadDiscoveredDeploymentSuccess;
class LoadDiscoveredDeploymentFailure {
    constructor() {
        this.type = DiscoveredDeploymentActionTypes.LoadDiscoveredDeploymentFailure;
    }
}
exports.LoadDiscoveredDeploymentFailure = LoadDiscoveredDeploymentFailure;
class LoadResourceAuditData {
    constructor(payload) {
        this.payload = payload;
        this.type = DiscoveredDeploymentActionTypes.LoadResourceAuditData;
    }
}
exports.LoadResourceAuditData = LoadResourceAuditData;
class LoadResourceAuditDataSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = DiscoveredDeploymentActionTypes.LoadResourceAuditDataSuccess;
    } // TODO: Add type
}
exports.LoadResourceAuditDataSuccess = LoadResourceAuditDataSuccess;
class LoadResourceAuditDataFailure {
    constructor() {
        this.type = DiscoveredDeploymentActionTypes.LoadResourceAuditDataFailure;
    }
}
exports.LoadResourceAuditDataFailure = LoadResourceAuditDataFailure;
class SelectResourceAuditData {
    constructor(payload) {
        this.payload = payload;
        this.type = DiscoveredDeploymentActionTypes.SelectResourceAuditData;
    } // TODO: Add type
}
exports.SelectResourceAuditData = SelectResourceAuditData;
class SelectDiscoveredDeployment {
    constructor(payload) {
        this.payload = payload;
        this.type = DiscoveredDeploymentActionTypes.SelectDiscoveredDeployment;
    }
}
exports.SelectDiscoveredDeployment = SelectDiscoveredDeployment;
class SearchDiscoveredDeployments {
    constructor(payload) {
        this.payload = payload;
        this.type = DiscoveredDeploymentActionTypes.SearchDiscoveredDeployments;
    }
}
exports.SearchDiscoveredDeployments = SearchDiscoveredDeployments;
class SearchDiscoveredDeploymentsSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = DiscoveredDeploymentActionTypes.SearchDiscoveredDeploymentsSuccess;
    }
}
exports.SearchDiscoveredDeploymentsSuccess = SearchDiscoveredDeploymentsSuccess;
class ResetDiscoveredDeploymentsSearch {
    constructor() {
        this.type = DiscoveredDeploymentActionTypes.ResetDiscoveredDeploymentsSearch;
    }
}
exports.ResetDiscoveredDeploymentsSearch = ResetDiscoveredDeploymentsSearch;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzY292ZXJlZC1kZXBsb3ltZW50LmFjdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc3RvcmUvZGlzY292ZXJlZC1kZXBsb3ltZW50L3N0YXRlL2Rpc2NvdmVyZWQtZGVwbG95bWVudC5hY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBSUEsSUFBWSwrQkFvQlg7QUFwQkQsV0FBWSwrQkFBK0I7SUFDekMsbUhBQWdGLENBQUE7SUFDaEYsa0lBQStGLENBQUE7SUFDL0Ysa0lBQStGLENBQUE7SUFFL0YsaUhBQThFLENBQUE7SUFDOUUsZ0lBQTZGLENBQUE7SUFDN0YsZ0lBQTZGLENBQUE7SUFFN0YsNEdBQXlFLENBQUE7SUFDekUsMkhBQXdGLENBQUE7SUFDeEYsMkhBQXdGLENBQUE7SUFFeEYsdUhBQW9GLENBQUE7SUFDcEYsc0lBQW1HLENBQUE7SUFDbkcsa0lBQStGLENBQUE7SUFFL0Ysa0hBQStFLENBQUE7SUFFL0Usc0hBQW1GLENBQUE7QUFDckYsQ0FBQyxFQXBCVywrQkFBK0IsR0FBL0IsdUNBQStCLEtBQS9CLHVDQUErQixRQW9CMUM7QUFFRCxNQUFhLHlCQUF5QjtJQUF0QztRQUNXLFNBQUksR0FBRywrQkFBK0IsQ0FBQyx5QkFBeUIsQ0FBQztJQUM1RSxDQUFDO0NBQUE7QUFGRCw4REFFQztBQUNELE1BQWEsZ0NBQWdDO0lBRTNDLFlBQW1CLE9BQStCO1FBQS9CLFlBQU8sR0FBUCxPQUFPLENBQXdCO1FBRHpDLFNBQUksR0FBRywrQkFBK0IsQ0FBQyxnQ0FBZ0MsQ0FBQztJQUMzQixDQUFDO0NBQ3hEO0FBSEQsNEVBR0M7QUFDRCxNQUFhLGdDQUFnQztJQUE3QztRQUNXLFNBQUksR0FBRywrQkFBK0IsQ0FBQyxnQ0FBZ0MsQ0FBQztJQUNuRixDQUFDO0NBQUE7QUFGRCw0RUFFQztBQUVELE1BQWEsd0JBQXdCO0lBRW5DLFlBQW1CLE9BQWU7UUFBZixZQUFPLEdBQVAsT0FBTyxDQUFRO1FBRHpCLFNBQUksR0FBRywrQkFBK0IsQ0FBQyx3QkFBd0IsQ0FBQztJQUNuQyxDQUFDO0NBQ3hDO0FBSEQsNERBR0M7QUFDRCxNQUFhLCtCQUErQjtJQUUxQyxZQUFtQixPQUE2QjtRQUE3QixZQUFPLEdBQVAsT0FBTyxDQUFzQjtRQUR2QyxTQUFJLEdBQUcsK0JBQStCLENBQUMsK0JBQStCLENBQUM7SUFDNUIsQ0FBQztDQUN0RDtBQUhELDBFQUdDO0FBQ0QsTUFBYSwrQkFBK0I7SUFBNUM7UUFDVyxTQUFJLEdBQUcsK0JBQStCLENBQUMsK0JBQStCLENBQUM7SUFDbEYsQ0FBQztDQUFBO0FBRkQsMEVBRUM7QUFFRCxNQUFhLHFCQUFxQjtJQUVoQyxZQUFtQixPQUFlO1FBQWYsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUR6QixTQUFJLEdBQUcsK0JBQStCLENBQUMscUJBQXFCLENBQUM7SUFDaEMsQ0FBQztDQUN4QztBQUhELHNEQUdDO0FBQ0QsTUFBYSw0QkFBNEI7SUFFdkMsWUFBbUIsT0FBWTtRQUFaLFlBQU8sR0FBUCxPQUFPLENBQUs7UUFEdEIsU0FBSSxHQUFHLCtCQUErQixDQUFDLDRCQUE0QixDQUFDO0lBQzFDLENBQUMsQ0FBQyxpQkFBaUI7Q0FDdkQ7QUFIRCxvRUFHQztBQUNELE1BQWEsNEJBQTRCO0lBQXpDO1FBQ1csU0FBSSxHQUFHLCtCQUErQixDQUFDLDRCQUE0QixDQUFDO0lBQy9FLENBQUM7Q0FBQTtBQUZELG9FQUVDO0FBRUQsTUFBYSx1QkFBdUI7SUFFbEMsWUFBbUIsT0FBWTtRQUFaLFlBQU8sR0FBUCxPQUFPLENBQUs7UUFEdEIsU0FBSSxHQUFHLCtCQUErQixDQUFDLHVCQUF1QixDQUFDO0lBQ3JDLENBQUMsQ0FBQyxpQkFBaUI7Q0FDdkQ7QUFIRCwwREFHQztBQUVELE1BQWEsMEJBQTBCO0lBRXJDLFlBQW1CLE9BQWU7UUFBZixZQUFPLEdBQVAsT0FBTyxDQUFRO1FBRHpCLFNBQUksR0FBRywrQkFBK0IsQ0FBQywwQkFBMEIsQ0FBQztJQUNyQyxDQUFDO0NBQ3hDO0FBSEQsZ0VBR0M7QUFFRCxNQUFhLDJCQUEyQjtJQUV0QyxZQUFtQixPQUFlO1FBQWYsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUR6QixTQUFJLEdBQUcsK0JBQStCLENBQUMsMkJBQTJCLENBQUM7SUFDdEMsQ0FBQztDQUN4QztBQUhELGtFQUdDO0FBQ0QsTUFBYSxrQ0FBa0M7SUFFN0MsWUFBbUIsT0FBaUI7UUFBakIsWUFBTyxHQUFQLE9BQU8sQ0FBVTtRQUQzQixTQUFJLEdBQUcsK0JBQStCLENBQUMsa0NBQWtDLENBQUM7SUFDM0MsQ0FBQztDQUMxQztBQUhELGdGQUdDO0FBQ0QsTUFBYSxnQ0FBZ0M7SUFBN0M7UUFDVyxTQUFJLEdBQUcsK0JBQStCLENBQUMsZ0NBQWdDLENBQUM7SUFDbkYsQ0FBQztDQUFBO0FBRkQsNEVBRUMifQ==