"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RoleActionTypes;
(function (RoleActionTypes) {
    RoleActionTypes["LoadRoles"] = "[Role] Load Roles";
    RoleActionTypes["LoadRolesSuccess"] = "[Role] Load Roles Success";
    RoleActionTypes["LoadRolesFailure"] = "[Role] Load Roles Failure";
    RoleActionTypes["LoadRoleResponsibilities"] = "[Role] Load Role Responsibilities";
})(RoleActionTypes = exports.RoleActionTypes || (exports.RoleActionTypes = {}));
class LoadRoles {
    constructor() {
        this.type = RoleActionTypes.LoadRoles;
    }
}
exports.LoadRoles = LoadRoles;
class LoadRolesSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = RoleActionTypes.LoadRolesSuccess;
    }
}
exports.LoadRolesSuccess = LoadRolesSuccess;
class LoadRolesFailure {
    constructor() {
        this.type = RoleActionTypes.LoadRolesFailure;
    }
}
exports.LoadRolesFailure = LoadRolesFailure;
class LoadRoleResponsibilities {
    constructor(payload) {
        this.payload = payload;
        this.type = RoleActionTypes.LoadRoleResponsibilities;
    }
}
exports.LoadRoleResponsibilities = LoadRoleResponsibilities;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9sZS5hY3Rpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3N0b3JlL3JvbGUvc3RhdGUvcm9sZS5hY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBR0EsSUFBWSxlQU1YO0FBTkQsV0FBWSxlQUFlO0lBQ3pCLGtEQUErQixDQUFBO0lBQy9CLGlFQUE4QyxDQUFBO0lBQzlDLGlFQUE4QyxDQUFBO0lBRTlDLGlGQUE4RCxDQUFBO0FBQ2hFLENBQUMsRUFOVyxlQUFlLEdBQWYsdUJBQWUsS0FBZix1QkFBZSxRQU0xQjtBQUVELE1BQWEsU0FBUztJQUF0QjtRQUNXLFNBQUksR0FBRyxlQUFlLENBQUMsU0FBUyxDQUFDO0lBQzVDLENBQUM7Q0FBQTtBQUZELDhCQUVDO0FBQ0QsTUFBYSxnQkFBZ0I7SUFFM0IsWUFBbUIsT0FBZTtRQUFmLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFEekIsU0FBSSxHQUFHLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQztJQUNYLENBQUM7Q0FDeEM7QUFIRCw0Q0FHQztBQUNELE1BQWEsZ0JBQWdCO0lBQTdCO1FBQ1csU0FBSSxHQUFHLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQztJQUNuRCxDQUFDO0NBQUE7QUFGRCw0Q0FFQztBQUVELE1BQWEsd0JBQXdCO0lBRW5DLFlBQW1CLE9BQWU7UUFBZixZQUFPLEdBQVAsT0FBTyxDQUFRO1FBRHpCLFNBQUksR0FBRyxlQUFlLENBQUMsd0JBQXdCLENBQUM7SUFDbkIsQ0FBQztDQUN4QztBQUhELDREQUdDIn0=