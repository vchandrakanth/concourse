"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const store_1 = require("@ngrx/store");
const cloud_role_assignment_actions_1 = require("./cloud-role-assignment.actions");
const query = require("./cloud-role-assignment.selectors");
let CloudRoleAssignmentFacade = class CloudRoleAssignmentFacade {
    constructor(store) {
        this.store = store;
        this.list$ = this.store.pipe(store_1.select(query.getAll));
    }
    addCloudRolesToGroup(groupId, cloudRoleAssignment) {
        this.store.dispatch(new cloud_role_assignment_actions_1.AddCloudRolesToGroup({ groupId, cloudRoleAssignment }));
    }
    deleteCloudRoleAssignment(groupId, cloudRoleAssignmentId) {
        this.store.dispatch(new cloud_role_assignment_actions_1.RemoveCloudRoleAssignment({ groupId, cloudRoleAssignmentId }));
    }
};
CloudRoleAssignmentFacade = __decorate([
    core_1.Injectable()
], CloudRoleAssignmentFacade);
exports.CloudRoleAssignmentFacade = CloudRoleAssignmentFacade;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvdWQtcm9sZS1hc3NpZ25tZW50LmZhY2FkZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zdG9yZS9jbG91ZC1yb2xlLWFzc2lnbm1lbnRzL3N0YXRlL2Nsb3VkLXJvbGUtYXNzaWdubWVudC5mYWNhZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBMkM7QUFDM0MsdUNBQTRDO0FBRzVDLG1GQUFrRztBQUVsRywyREFBMkQ7QUFHM0QsSUFBYSx5QkFBeUIsR0FBdEMsTUFBYSx5QkFBeUI7SUFHcEMsWUFDbUIsS0FBbUI7UUFBbkIsVUFBSyxHQUFMLEtBQUssQ0FBYztRQUh0QyxVQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBSTFDLENBQUM7SUFFTCxvQkFBb0IsQ0FBQyxPQUFlLEVBQUUsbUJBQWlEO1FBQ3JGLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksb0RBQW9CLENBQUMsRUFBRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDbEYsQ0FBQztJQUVELHlCQUF5QixDQUFDLE9BQWUsRUFBRSxxQkFBNkI7UUFDdEUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSx5REFBeUIsQ0FBQyxFQUFFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN6RixDQUFDO0NBQ0YsQ0FBQTtBQWRZLHlCQUF5QjtJQURyQyxpQkFBVSxFQUFFO0dBQ0EseUJBQXlCLENBY3JDO0FBZFksOERBQXlCIn0=