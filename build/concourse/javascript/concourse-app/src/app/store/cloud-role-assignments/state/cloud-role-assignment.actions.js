"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CloudRoleAssignmentActionTypes;
(function (CloudRoleAssignmentActionTypes) {
    CloudRoleAssignmentActionTypes["LoadCloudRoleAssignmentsByGroupId"] = "[DiscoveredDeployment] Load Cloud Role Assignments By Group Id";
    CloudRoleAssignmentActionTypes["LoadCloudRoleAssignmentsByGroupIdSuccess"] = "[DiscoveredDeployment] Load Cloud Role Assignments By Group Id Success";
    CloudRoleAssignmentActionTypes["LoadCloudRoleAssignmentsByGroupIdFailure"] = "[DiscoveredDeployment] Load Cloud Role Assignments By Group Id Failure";
    CloudRoleAssignmentActionTypes["RemoveCloudRoleAssignment"] = "[Group] Remove Cloud Role Assignment";
    CloudRoleAssignmentActionTypes["RemoveCloudRoleAssignmentSuccess"] = "[Group] Remove Cloud Role Assignment Success";
    CloudRoleAssignmentActionTypes["RemoveCloudRoleAssignmentFailure"] = "[Group] Remove Cloud Role Assignment Failure";
    CloudRoleAssignmentActionTypes["AddCloudRolesToGroup"] = "[Group] Add Cloud Roles to Group";
    CloudRoleAssignmentActionTypes["AddCloudRolesToGroupSuccess"] = "[Group] Add Cloud Roles to Group Success";
    CloudRoleAssignmentActionTypes["AddCloudRolesToGroupFailure"] = "[Group] Add Cloud Roles to Group Failure";
    CloudRoleAssignmentActionTypes["LoadCloudRoleAssignmentsByCloudRoleId"] = "[DiscoveredDeployment] Load Cloud Role Assignments By Cloud Role Id";
    CloudRoleAssignmentActionTypes["LoadCloudRoleAssignmentsByCloudRoleIdSuccess"] = "[DiscoveredDeployment] Load Cloud Role Assignments By Cloud Role Id Success";
    CloudRoleAssignmentActionTypes["LoadCloudRoleAssignmentsByCloudRoleIdFailure"] = "[DiscoveredDeployment] Load Cloud Role Assignments By Cloud Role Id Failure";
})(CloudRoleAssignmentActionTypes = exports.CloudRoleAssignmentActionTypes || (exports.CloudRoleAssignmentActionTypes = {}));
class LoadCloudRoleAssignmentsByGroupId {
    constructor(payload) {
        this.payload = payload;
        this.type = CloudRoleAssignmentActionTypes.LoadCloudRoleAssignmentsByGroupId;
    }
}
exports.LoadCloudRoleAssignmentsByGroupId = LoadCloudRoleAssignmentsByGroupId;
class LoadCloudRoleAssignmentsByGroupIdSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = CloudRoleAssignmentActionTypes.LoadCloudRoleAssignmentsByGroupIdSuccess;
    }
}
exports.LoadCloudRoleAssignmentsByGroupIdSuccess = LoadCloudRoleAssignmentsByGroupIdSuccess;
class LoadCloudRoleAssignmentsByGroupIdFailure {
    constructor() {
        this.type = CloudRoleAssignmentActionTypes.LoadCloudRoleAssignmentsByGroupIdFailure;
    }
}
exports.LoadCloudRoleAssignmentsByGroupIdFailure = LoadCloudRoleAssignmentsByGroupIdFailure;
class RemoveCloudRoleAssignment {
    constructor(payload) {
        this.payload = payload;
        this.type = CloudRoleAssignmentActionTypes.RemoveCloudRoleAssignment;
    }
}
exports.RemoveCloudRoleAssignment = RemoveCloudRoleAssignment;
class RemoveCloudRoleAssignmentSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = CloudRoleAssignmentActionTypes.RemoveCloudRoleAssignmentSuccess;
    }
}
exports.RemoveCloudRoleAssignmentSuccess = RemoveCloudRoleAssignmentSuccess;
class RemoveCloudRoleAssignmentFailure {
    constructor() {
        this.type = CloudRoleAssignmentActionTypes.RemoveCloudRoleAssignmentFailure;
    }
}
exports.RemoveCloudRoleAssignmentFailure = RemoveCloudRoleAssignmentFailure;
class AddCloudRolesToGroup {
    constructor(payload) {
        this.payload = payload;
        this.type = CloudRoleAssignmentActionTypes.AddCloudRolesToGroup;
    }
}
exports.AddCloudRolesToGroup = AddCloudRolesToGroup;
class AddCloudRolesToGroupSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = CloudRoleAssignmentActionTypes.AddCloudRolesToGroupSuccess;
    }
}
exports.AddCloudRolesToGroupSuccess = AddCloudRolesToGroupSuccess;
class AddCloudRolesToGroupFailure {
    constructor() {
        this.type = CloudRoleAssignmentActionTypes.AddCloudRolesToGroupFailure;
    }
}
exports.AddCloudRolesToGroupFailure = AddCloudRolesToGroupFailure;
class LoadCloudRoleAssignmentsByCloudRoleId {
    constructor(payload) {
        this.payload = payload;
        this.type = CloudRoleAssignmentActionTypes.LoadCloudRoleAssignmentsByCloudRoleId;
    }
}
exports.LoadCloudRoleAssignmentsByCloudRoleId = LoadCloudRoleAssignmentsByCloudRoleId;
class LoadCloudRoleAssignmentsByCloudRoleIdSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = CloudRoleAssignmentActionTypes.LoadCloudRoleAssignmentsByCloudRoleIdSuccess;
    }
}
exports.LoadCloudRoleAssignmentsByCloudRoleIdSuccess = LoadCloudRoleAssignmentsByCloudRoleIdSuccess;
class LoadCloudRoleAssignmentsByCloudRoleIdFailure {
    constructor() {
        this.type = CloudRoleAssignmentActionTypes.LoadCloudRoleAssignmentsByCloudRoleIdFailure;
    }
}
exports.LoadCloudRoleAssignmentsByCloudRoleIdFailure = LoadCloudRoleAssignmentsByCloudRoleIdFailure;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvdWQtcm9sZS1hc3NpZ25tZW50LmFjdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc3RvcmUvY2xvdWQtcm9sZS1hc3NpZ25tZW50cy9zdGF0ZS9jbG91ZC1yb2xlLWFzc2lnbm1lbnQuYWN0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUlBLElBQVksOEJBaUJYO0FBakJELFdBQVksOEJBQThCO0lBQ3hDLHNJQUFvRyxDQUFBO0lBQ3BHLHFKQUFtSCxDQUFBO0lBQ25ILHFKQUFtSCxDQUFBO0lBRW5ILG9HQUFrRSxDQUFBO0lBQ2xFLG1IQUFpRixDQUFBO0lBQ2pGLG1IQUFpRixDQUFBO0lBRWpGLDJGQUF5RCxDQUFBO0lBQ3pELDBHQUF3RSxDQUFBO0lBQ3hFLDBHQUF3RSxDQUFBO0lBRXhFLCtJQUE2RyxDQUFBO0lBQzdHLDhKQUE0SCxDQUFBO0lBQzVILDhKQUE0SCxDQUFBO0FBRTlILENBQUMsRUFqQlcsOEJBQThCLEdBQTlCLHNDQUE4QixLQUE5QixzQ0FBOEIsUUFpQnpDO0FBRUQsTUFBYSxpQ0FBaUM7SUFFNUMsWUFBbUIsT0FBZTtRQUFmLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFEekIsU0FBSSxHQUFHLDhCQUE4QixDQUFDLGlDQUFpQyxDQUFDO0lBQzNDLENBQUM7Q0FDeEM7QUFIRCw4RUFHQztBQUVELE1BQWEsd0NBQXdDO0lBRW5ELFlBQW1CLE9BQThCO1FBQTlCLFlBQU8sR0FBUCxPQUFPLENBQXVCO1FBRHhDLFNBQUksR0FBRyw4QkFBOEIsQ0FBQyx3Q0FBd0MsQ0FBQztJQUNuQyxDQUFDO0NBQ3ZEO0FBSEQsNEZBR0M7QUFFRCxNQUFhLHdDQUF3QztJQUFyRDtRQUNXLFNBQUksR0FBRyw4QkFBOEIsQ0FBQyx3Q0FBd0MsQ0FBQztJQUMxRixDQUFDO0NBQUE7QUFGRCw0RkFFQztBQUVELE1BQWEseUJBQXlCO0lBRXBDLFlBQW1CLE9BQTJEO1FBQTNELFlBQU8sR0FBUCxPQUFPLENBQW9EO1FBRHJFLFNBQUksR0FBRyw4QkFBOEIsQ0FBQyx5QkFBeUIsQ0FBQztJQUNTLENBQUM7Q0FDcEY7QUFIRCw4REFHQztBQUNELE1BQWEsZ0NBQWdDO0lBRTNDLFlBQW1CLE9BQWU7UUFBZixZQUFPLEdBQVAsT0FBTyxDQUFRO1FBRHpCLFNBQUksR0FBRyw4QkFBOEIsQ0FBQyxnQ0FBZ0MsQ0FBQztJQUMxQyxDQUFDO0NBQ3hDO0FBSEQsNEVBR0M7QUFDRCxNQUFhLGdDQUFnQztJQUE3QztRQUNXLFNBQUksR0FBRyw4QkFBOEIsQ0FBQyxnQ0FBZ0MsQ0FBQztJQUNsRixDQUFDO0NBQUE7QUFGRCw0RUFFQztBQUVELE1BQWEsb0JBQW9CO0lBRS9CLFlBQW1CLE9BQStFO1FBQS9FLFlBQU8sR0FBUCxPQUFPLENBQXdFO1FBRHpGLFNBQUksR0FBRyw4QkFBOEIsQ0FBQyxvQkFBb0IsQ0FBQztJQUNrQyxDQUFDO0NBQ3hHO0FBSEQsb0RBR0M7QUFDRCxNQUFhLDJCQUEyQjtJQUV0QyxZQUFtQixPQUE0QjtRQUE1QixZQUFPLEdBQVAsT0FBTyxDQUFxQjtRQUR0QyxTQUFJLEdBQUcsOEJBQThCLENBQUMsMkJBQTJCLENBQUM7SUFDeEIsQ0FBQztDQUNyRDtBQUhELGtFQUdDO0FBQ0QsTUFBYSwyQkFBMkI7SUFBeEM7UUFDVyxTQUFJLEdBQUcsOEJBQThCLENBQUMsMkJBQTJCLENBQUM7SUFDN0UsQ0FBQztDQUFBO0FBRkQsa0VBRUM7QUFFRCxNQUFhLHFDQUFxQztJQUVoRCxZQUFtQixPQUFlO1FBQWYsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUR6QixTQUFJLEdBQUcsOEJBQThCLENBQUMscUNBQXFDLENBQUM7SUFDL0MsQ0FBQztDQUN4QztBQUhELHNGQUdDO0FBRUQsTUFBYSw0Q0FBNEM7SUFFdkQsWUFBbUIsT0FBOEI7UUFBOUIsWUFBTyxHQUFQLE9BQU8sQ0FBdUI7UUFEeEMsU0FBSSxHQUFHLDhCQUE4QixDQUFDLDRDQUE0QyxDQUFDO0lBQ3ZDLENBQUM7Q0FDdkQ7QUFIRCxvR0FHQztBQUVELE1BQWEsNENBQTRDO0lBQXpEO1FBQ1csU0FBSSxHQUFHLDhCQUE4QixDQUFDLDRDQUE0QyxDQUFDO0lBQzlGLENBQUM7Q0FBQTtBQUZELG9HQUVDIn0=