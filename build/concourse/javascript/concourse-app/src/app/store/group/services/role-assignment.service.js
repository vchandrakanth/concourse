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
let RoleAssignmentService = class RoleAssignmentService {
    constructor(http) {
        this.http = http;
    }
    create(groupId, payload) {
        return this.http.post(helpers_1.buildServiceRequest(enums_1.ServiceNames.User, `groups/${groupId}/role-assignments`), payload).pipe(operators_1.map(response => new models_1.Group().deserialize(response)));
    }
    remove(groupId, roleAssignmentId) {
        return this.http.delete(helpers_1.buildServiceRequest(enums_1.ServiceNames.User, `groups/${groupId}/role-assignments/${roleAssignmentId}`)).pipe(operators_1.map(response => response));
    }
};
RoleAssignmentService = __decorate([
    core_1.Injectable()
], RoleAssignmentService);
exports.RoleAssignmentService = RoleAssignmentService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9sZS1hc3NpZ25tZW50LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc3RvcmUvZ3JvdXAvc2VydmljZXMvcm9sZS1hc3NpZ25tZW50LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDQSx3Q0FBMkM7QUFHM0MsOENBQXFDO0FBRXJDLG1EQUErRDtBQUMvRCxtREFBdUQ7QUFDdkQsdURBQWdFO0FBR2hFLElBQWEscUJBQXFCLEdBQWxDLE1BQWEscUJBQXFCO0lBRWhDLFlBQ21CLElBQWdCO1FBQWhCLFNBQUksR0FBSixJQUFJLENBQVk7SUFDL0IsQ0FBQztJQUVMLE1BQU0sQ0FBQyxPQUFlLEVBQUUsT0FBdUI7UUFDN0MsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyw2QkFBbUIsQ0FBQyxvQkFBWSxDQUFDLElBQUksRUFBRSxVQUFVLE9BQU8sbUJBQW1CLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQy9HLGVBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksY0FBSyxFQUFFLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQ25ELENBQUM7SUFDSixDQUFDO0lBRUQsTUFBTSxDQUFDLE9BQWUsRUFBRSxnQkFBd0I7UUFDOUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyw2QkFBbUIsQ0FBQyxvQkFBWSxDQUFDLElBQUksRUFBRSxVQUFVLE9BQU8scUJBQXFCLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FDNUgsZUFBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBZSxDQUFDLENBQ2pDLENBQUM7SUFDSixDQUFDO0NBQ0YsQ0FBQTtBQWpCWSxxQkFBcUI7SUFEakMsaUJBQVUsRUFBRTtHQUNBLHFCQUFxQixDQWlCakM7QUFqQlksc0RBQXFCIn0=