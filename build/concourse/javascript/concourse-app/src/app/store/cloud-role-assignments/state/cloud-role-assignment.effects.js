"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const effects_1 = require("@ngrx/effects");
const operators_1 = require("@concourse/core/operators");
const operators_2 = require("rxjs/operators");
const modal_1 = require("@concourse/core/modal");
const toast_actions_1 = require("@concourse/core/toast/toast.actions");
const cloud_role_assignment_actions_1 = require("./cloud-role-assignment.actions");
let CloudRoleAssignmentEffects = class CloudRoleAssignmentEffects {
    constructor(actions$, cloudRoleAssignmentService) {
        this.actions$ = actions$;
        this.cloudRoleAssignmentService = cloudRoleAssignmentService;
        this.loadCloudRoleAssignmentsByGroupId$ = this.actions$.pipe(effects_1.ofType(cloud_role_assignment_actions_1.CloudRoleAssignmentActionTypes.LoadCloudRoleAssignmentsByGroupId), operators_2.map((action) => action.payload), operators_2.switchMap(payload => this.cloudRoleAssignmentService.loadCloudRoleAssignmentsByGroupId(payload).pipe(operators_2.map(data => new cloud_role_assignment_actions_1.LoadCloudRoleAssignmentsByGroupIdSuccess(data)), operators_1.handleError('toast', new cloud_role_assignment_actions_1.LoadCloudRoleAssignmentsByGroupIdFailure()))));
        this.loadCloudRoleAssignmentsByCloudRoleId$ = this.actions$.pipe(effects_1.ofType(cloud_role_assignment_actions_1.CloudRoleAssignmentActionTypes.LoadCloudRoleAssignmentsByCloudRoleId), operators_2.map((action) => action.payload), operators_2.switchMap(payload => this.cloudRoleAssignmentService.loadCloudRoleAssignmentsByCloudRoleId(payload).pipe(operators_2.map(data => new cloud_role_assignment_actions_1.LoadCloudRoleAssignmentsByCloudRoleIdSuccess(data)), operators_1.handleError('toast', new cloud_role_assignment_actions_1.LoadCloudRoleAssignmentsByCloudRoleIdFailure()))));
        this.addCloudRolesToGroup$ = this.actions$.pipe(effects_1.ofType(cloud_role_assignment_actions_1.CloudRoleAssignmentActionTypes.AddCloudRolesToGroup), operators_2.map((action) => action.payload), operators_2.exhaustMap(({ groupId, cloudRoleAssignment }) => this.cloudRoleAssignmentService.addCloudRoleAssignment(groupId, cloudRoleAssignment).pipe(operators_2.mergeMap(data => [
            new cloud_role_assignment_actions_1.AddCloudRolesToGroupSuccess(data),
            new modal_1.CloseModal(),
            new toast_actions_1.OpenToast({ message: 'Cloud Roles Added to Group Successfully', type: 'success' }),
            new cloud_role_assignment_actions_1.LoadCloudRoleAssignmentsByGroupId(groupId)
        ]), operators_1.handleError('form', new cloud_role_assignment_actions_1.AddCloudRolesToGroupFailure()))));
        this.removeCloudRoleAssignment$ = this.actions$.pipe(effects_1.ofType(cloud_role_assignment_actions_1.CloudRoleAssignmentActionTypes.RemoveCloudRoleAssignment), operators_2.map((action) => action.payload), operators_2.concatMap(({ groupId, cloudRoleAssignmentId }) => this.cloudRoleAssignmentService.removeCloudRoleAssignment(groupId, cloudRoleAssignmentId).pipe(operators_2.mergeMap(_ => [
            new cloud_role_assignment_actions_1.RemoveCloudRoleAssignmentSuccess(cloudRoleAssignmentId),
            new toast_actions_1.OpenToast({ message: 'Cloud Role Assignment Deleted Successfully', type: 'success' }),
            new modal_1.CloseModal()
        ]), operators_1.handleError('form', new cloud_role_assignment_actions_1.RemoveCloudRoleAssignmentFailure()))));
    }
};
__decorate([
    effects_1.Effect()
], CloudRoleAssignmentEffects.prototype, "loadCloudRoleAssignmentsByGroupId$", void 0);
__decorate([
    effects_1.Effect()
], CloudRoleAssignmentEffects.prototype, "loadCloudRoleAssignmentsByCloudRoleId$", void 0);
__decorate([
    effects_1.Effect()
], CloudRoleAssignmentEffects.prototype, "addCloudRolesToGroup$", void 0);
__decorate([
    effects_1.Effect()
], CloudRoleAssignmentEffects.prototype, "removeCloudRoleAssignment$", void 0);
CloudRoleAssignmentEffects = __decorate([
    core_1.Injectable()
], CloudRoleAssignmentEffects);
exports.CloudRoleAssignmentEffects = CloudRoleAssignmentEffects;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvdWQtcm9sZS1hc3NpZ25tZW50LmVmZmVjdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc3RvcmUvY2xvdWQtcm9sZS1hc3NpZ25tZW50cy9zdGF0ZS9jbG91ZC1yb2xlLWFzc2lnbm1lbnQuZWZmZWN0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUEyQztBQUMzQywyQ0FBd0Q7QUFHeEQseURBQXdEO0FBRXhELDhDQUFpRjtBQUVqRixpREFBbUQ7QUFDbkQsdUVBQWdFO0FBRWhFLG1GQWN5QztBQUd6QyxJQUFhLDBCQUEwQixHQUF2QyxNQUFhLDBCQUEwQjtJQXVEckMsWUFDbUIsUUFBaUIsRUFDakIsMEJBQXNEO1FBRHRELGFBQVEsR0FBUixRQUFRLENBQVM7UUFDakIsK0JBQTBCLEdBQTFCLDBCQUEwQixDQUE0QjtRQXZEL0QsdUNBQWtDLEdBQXVCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUNuRixnQkFBTSxDQUFDLDhEQUE4QixDQUFDLGlDQUFpQyxDQUFDLEVBQ3hFLGVBQUcsQ0FBQyxDQUFDLE1BQXlDLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFDbEUscUJBQVMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUNsQixJQUFJLENBQUMsMEJBQTBCLENBQUMsaUNBQWlDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUM3RSxlQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLHdFQUF3QyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQy9ELHVCQUFXLENBQUMsT0FBTyxFQUFFLElBQUksd0VBQXdDLEVBQUUsQ0FBQyxDQUNyRSxDQUNGLENBQ0YsQ0FBQztRQUVRLDJDQUFzQyxHQUF1QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FDdkYsZ0JB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