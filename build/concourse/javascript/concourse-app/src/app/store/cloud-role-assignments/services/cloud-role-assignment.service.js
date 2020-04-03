"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const operators_1 = require("rxjs/operators");
const models_1 = require("@concourse/core/models");
const enums_1 = require("@concourse/shared/enums");
const helpers_1 = require("@concourse/shared/helpers");
let CloudRoleAssignmentService = class CloudRoleAssignmentService {
    constructor(http) {
        this.http = http;
    }
    addCloudRoleAssignment(groupId, cloudRoleAssignment) {
        return this.http.post(helpers_1.buildServiceRequest(enums_1.ServiceNames.User, `groups/${groupId}/cloud-role-assignments`), cloudRoleAssignment).pipe(operators_1.map(response => new models_1.CloudRoleAssignment().deserialize(response)));
    }
    loadCloudRoleAssignmentsByGroupId(groupId) {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.User, `groups/${groupId}/cloud-role-assignments`)).pipe(operators_1.map((response) => response.content.map(g => new models_1.CloudRoleAssignment().deserialize(g))));
    }
    removeCloudRoleAssignment(groupId, cloudRoleAssignmentId) {
        return this.http.delete(helpers_1.buildServiceRequest(enums_1.ServiceNames.User, `groups/${groupId}/cloud-role-assignments/${cloudRoleAssignmentId}`)).pipe(operators_1.map(response => new models_1.CloudRoleAssignment().deserialize(response)));
    }
    loadCloudRoleAssignmentsByCloudRoleId(cloudRoleId) {
        return this.http.get(helpers_1.buildServiceRequest(enums_1.ServiceNames.User, `cloud-roles/${cloudRoleId}/cloud-role-assignments`)).pipe(operators_1.map((response) => response.content.map(g => new models_1.CloudRoleAssignment().deserialize(g))));
    }
};
CloudRoleAssignmentService = __decorate([
    core_1.Injectable()
], CloudRoleAssignmentService);
exports.CloudRoleAssignmentService = CloudRoleAssignmentService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvdWQtcm9sZS1hc3NpZ25tZW50LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc3RvcmUvY2xvdWQtcm9sZS1hc3NpZ25tZW50cy9zZXJ2aWNlcy9jbG91ZC1yb2xlLWFzc2lnbm1lbnQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUNBLHdDQUEyQztBQUkzQyw4Q0FBcUM7QUFFckMsbURBQWdGO0FBQ2hGLG1EQUF1RDtBQUN2RCx1REFBZ0U7QUFHaEUsSUFBYSwwQkFBMEIsR0FBdkMsTUFBYSwwQkFBMEI7SUFFckMsWUFDbUIsSUFBZ0I7UUFBaEIsU0FBSSxHQUFKLElBQUksQ0FBWTtJQUMvQixDQUFDO0lBRUwsc0JBQXNCLENBQUMsT0FBZSxFQUFFLG1CQUFpRDtRQUN2RixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLDZCQUFtQixDQUFDLG9CQUFZLENBQUMsSUFBSSxFQUFFLFVBQVUsT0FBTyx5QkFBeUIsQ0FBQyxFQUFFLG1CQUFtQixDQUFDLENBQUMsSUFBSSxDQUNqSSxlQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLDRCQUFtQixFQUFFLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQ2pFLENBQUM7SUFDSixDQUFDO0lBRUQsaUNBQWlDLENBQUMsT0FBZTtRQUMvQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLDZCQUFtQixDQUFDLG9CQUFZLENBQUMsSUFBSSxFQUFFLFVBQVUsT0FBTyx5QkFBeUIsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUMzRyxlQUFHLENBQUMsQ0FBQyxRQUFnRCxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksNEJBQW1CLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUMvSCxDQUFDO0lBQ0osQ0FBQztJQUVELHlCQUF5QixDQUFDLE9BQWUsRUFBRSxxQkFBNkI7UUFDdEUsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyw2QkFBbUIsQ0FBQyxvQkFBWSxDQUFDLElBQUksRUFBRSxVQUFVLE9BQU8sMkJBQTJCLHFCQUFxQixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FDdkksZUFBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSw0QkFBbUIsRUFBRSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdEUsQ0FBQztJQUVELHFDQUFxQyxDQUFDLFdBQW1CO1FBQ3ZELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsNkJBQW1CLENBQUMsb0JBQVksQ0FBQyxJQUFJLEVBQUUsZUFBZSxXQUFXLHlCQUF5QixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQ3BILGVBQUcsQ0FBQyxDQUFDLFFBQWdELEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSw0QkFBbUIsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQy9ILENBQUM7SUFDSixDQUFDO0NBQ0YsQ0FBQTtBQTVCWSwwQkFBMEI7SUFEdEMsaUJBQVUsRUFBRTtHQUNBLDBCQUEwQixDQTRCdEM7QUE1QlksZ0VBQTBCIn0=