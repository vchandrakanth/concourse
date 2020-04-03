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
const router_actions_1 = require("@concourse/core/router/router.actions");
const toast_actions_1 = require("@concourse/core/toast/toast.actions");
const cloud_role_assignment_actions_1 = require("@concourse/store/cloud-role-assignments/state/cloud-role-assignment.actions");
const cloud_role_actions_1 = require("@concourse/store/cloud-role/state/cloud-role.actions");
const surface_layer_actions_1 = require("@concourse/store/surface-layer/state/surface-layer.actions");
const user_actions_1 = require("@concourse/store/user/state/user.actions");
const group_actions_1 = require("./group.actions");
let GroupEffects = class GroupEffects {
    constructor(actions$, groupApi, roleAssignmentsApi, groupFacade) {
        this.actions$ = actions$;
        this.groupApi = groupApi;
        this.roleAssignmentsApi = roleAssignmentsApi;
        this.groupFacade = groupFacade;
        this.loadGroups$ = this.actions$.pipe(effects_1.ofType(group_actions_1.GroupActionTypes.LoadGroups), operators_2.switchMap(_ => this.groupApi.list().pipe(operators_2.map(data => new group_actions_1.LoadGroupsSuccess(data)), operators_1.handleError('toast', new group_actions_1.LoadGroupsFailure()))));
        this.loadGroupsByPagination$ = this.actions$.pipe(effects_1.ofType(group_actions_1.GroupActionTypes.LoadGroupsByPagination), operators_2.map((action) => action.payload), operators_2.concatMap(payload => this.groupApi.paginatedList(payload.size, payload.page).pipe(operators_2.map(data => new group_actions_1.LoadGroupsByPaginationSuccess(data)), operators_1.handleError('toast', new group_actions_1.LoadGroupsByPaginationFailure()))));
        this.loadGroup$ = this.actions$.pipe(effects_1.ofType(group_actions_1.GroupActionTypes.LoadGroup), operators_2.map((action) => action.payload), operators_2.switchMap(payload => this.groupApi.get(payload).pipe(operators_2.map(data => new group_actions_1.LoadGroupSuccess(data)), operators_1.handleError('toast', new group_actions_1.LoadGroupFailure()))));
        this.createGroup$ = this.actions$.pipe(effects_1.ofType(group_actions_1.GroupActionTypes.CreateGroup), operators_2.map((action) => action.payload), operators_2.exhaustMap(payload => this.groupApi.create(payload).pipe(operators_2.mergeMap(data => [
            new group_actions_1.CreateGroupSuccess(data),
            new modal_1.CloseModal(),
            new toast_actions_1.OpenToast({ message: 'Group Created Successfully', type: 'success' }),
            new router_actions_1.RouterGo({ path: [`user-management/groups/${data.id}`] })
        ]), operators_1.handleError('form', new group_actions_1.CreateGroupFailure()))));
        this.updateGroup$ = this.actions$.pipe(effects_1.ofType(group_actions_1.GroupActionTypes.UpdateGroup), operators_2.map((action) => action.payload), operators_2.exhaustMap(payload => this.groupApi.update(payload).pipe(operators_2.mergeMap(data => [
            new group_actions_1.UpdateGroupSuccess(data),
            new modal_1.CloseModal(),
            new toast_actions_1.OpenToast({ message: 'Group Updated Successfully', type: 'success' })
        ]), operators_1.handleError('form', new group_actions_1.UpdateGroupFailure()))));
        this.deleteGroup$ = this.actions$.pipe(effects_1.ofType(group_actions_1.GroupActionTypes.DeleteGroup), operators_2.map((action) => action.payload), operators_2.concatMap(payload => this.groupApi.delete(payload).pipe(operators_2.mergeMap(_ => [
            new group_actions_1.DeleteGroupSuccess(payload),
            new toast_actions_1.OpenToast({ message: 'Group Deleted Successfully', type: 'success' }),
            new modal_1.CloseModal(),
            new router_actions_1.RouterGo({ path: ['user-management/groups'] })
        ]), operators_1.handleError('form', new group_actions_1.DeleteGroupFailure()))));
        this.addUserToGroup$ = this.actions$.pipe(effects_1.ofType(group_actions_1.GroupActionTypes.AddUserToGroup), operators_2.map((action) => action.payload), operators_2.concatMap(payload => this.groupApi.addUserToGroup(payload.groupId, payload.userId).pipe(operators_2.mergeMap(data => [
            new group_actions_1.AddUserToGroupSuccess(data),
            new toast_actions_1.OpenToast({ message: 'User Added Successfully', type: 'success' })
        ]), operators_1.handleError('form', new group_actions_1.AddUserToGroupFailure()))));
        this.removeUserFromGroup$ = this.actions$.pipe(effects_1.ofType(group_actions_1.GroupActionTypes.RemoveUserFromGroup), operators_2.map((action) => action.payload), operators_2.concatMap(payload => this.groupApi.removeUserFromGroup(payload.groupId, payload.userId).pipe(operators_2.mergeMap(data => [
            new group_actions_1.RemoveUserFromGroupSuccess(data),
            new toast_actions_1.OpenToast({ message: 'User Removed Successfully', type: 'success' }),
            new modal_1.CloseModal()
        ]), operators_1.handleError('form', new group_actions_1.RemoveUserFromGroupFailure()))));
        this.loadRoleAssignmentsBySurfaceLayerIds$ = this.actions$.pipe(effects_1.ofType(group_actions_1.GroupActionTypes.LoadRoleAssignmentsBySurfaceLayerIds), operators_2.map((action) => action.payload), operators_2.switchMap(surfaceLayerIds => this.groupApi.listBySurfaceLayerIds(surfaceLayerIds).pipe(operators_2.map(data => new group_actions_1.LoadRoleAssignmentsBySurfaceLayerIdsSuccess(data)), operators_1.handleError('toast', new group_actions_1.LoadRoleAssignmentsBySurfaceLayerIdsFailure()))));
        this.createRoleAssignment$ = this.actions$.pipe(effects_1.ofType(group_actions_1.GroupActionTypes.CreateRoleAssignment), operators_2.map((action) => action.payload), operators_2.exhaustMap(({ groupId, payload }) => this.roleAssignmentsApi.create(groupId, payload).pipe(operators_2.mergeMap(data => [
            new group_actions_1.CreateRoleAssignmentSuccess(data),
            new toast_actions_1.OpenToast({ message: 'Role Assignment Created Successfully', type: 'success' })
        ]), operators_1.handleError('form', new group_actions_1.CreateRoleAssignmentFailure()))));
        this.removeRoleAssignment$ = this.actions$.pipe(effects_1.ofType(group_actions_1.GroupActionTypes.RemoveRoleAssignment), operators_2.map((action) => action.payload), operators_2.concatMap(({ groupId, roleAssignmentId }) => this.roleAssignmentsApi.remove(groupId, roleAssignmentId).pipe(operators_2.mergeMap(_ => [
            new group_actions_1.RemoveRoleAssignmentSuccess({ groupId, roleAssignmentId }),
            new toast_actions_1.OpenToast({ message: 'Role Assignment Deleted Successfully', type: 'success' }),
            new modal_1.CloseModal()
        ]), operators_1.handleError('form', new group_actions_1.RemoveRoleAssignmentFailure()))));
        this.searchGroups$ = this.actions$.pipe(effects_1.ofType(group_actions_1.GroupActionTypes.SearchGroups), operators_2.map((action) => action.payload), operators_2.map(searchText => searchText = searchText.toLocaleLowerCase()), operators_2.withLatestFrom(this.groupFacade.list$), operators_2.map(([searchText, groups]) => groups.filter(g => g.name.toLocaleLowerCase().includes(searchText)).map(g => g.id)), operators_2.map(searchResults => new group_actions_1.SearchGroupsSuccess(searchResults)));
        // routing effects
        this.loadGroupsNav$ = this.actions$.pipe(operators_1.ofRoute(['/user-management/groups']), operators_2.mergeMap(_ => [
            new group_actions_1.SelectGroup(undefined),
            new surface_layer_actions_1.LoadSurfaceLayers(),
            new group_actions_1.LoadGroupsByPagination({ page: '0', size: '200' }),
            // new LoadGroups(),
            new user_actions_1.LoadUsers()
        ]));
        this.loadGroupNav$ = this.actions$.pipe(operators_1.ofRoute(['/user-management/groups/:id']), operators_2.map((action) => action.payload), operators_2.mergeMap(route => [
            new group_actions_1.LoadGroup(+route.params['id']),
            new group_actions_1.SelectGroup(+route.params['id']),
            new cloud_role_actions_1.LoadCloudRoles(),
            new cloud_role_assignment_actions_1.LoadCloudRoleAssignmentsByGroupId(+route.params['id'])
        ]));
    }
};
__decorate([
    effects_1.Effect()
], GroupEffects.prototype, "loadGroups$", void 0);
__decorate([
    effects_1.Effect()
], GroupEffects.prototype, "loadGroupsByPagination$", void 0);
__decorate([
    effects_1.Effect()
], GroupEffects.prototype, "loadGroup$", void 0);
__decorate([
    effects_1.Effect()
], GroupEffects.prototype, "createGroup$", void 0);
__decorate([
    effects_1.Effect()
], GroupEffects.prototype, "updateGroup$", void 0);
__decorate([
    effects_1.Effect()
], GroupEffects.prototype, "deleteGroup$", void 0);
__decorate([
    effects_1.Effect()
], GroupEffects.prototype, "addUserToGroup$", void 0);
__decorate([
    effects_1.Effect()
], GroupEffects.prototype, "removeUserFromGroup$", void 0);
__decorate([
    effects_1.Effect()
], GroupEffects.prototype, "loadRoleAssignmentsBySurfaceLayerIds$", void 0);
__decorate([
    effects_1.Effect()
], GroupEffects.prototype, "createRoleAssignment$", void 0);
__decorate([
    effects_1.Effect()
], GroupEffects.prototype, "removeRoleAssignment$", void 0);
__decorate([
    effects_1.Effect()
], GroupEffects.prototype, "searchGroups$", void 0);
__decorate([
    effects_1.Effect()
], GroupEffects.prototype, "loadGroupsNav$", void 0);
__decorate([
    effects_1.Effect()
], GroupEffects.prototype, "loadGroupNav$", void 0);
GroupEffects = __decorate([
    core_1.Injectable()
], GroupEffects);
exports.GroupEffects = GroupEffects;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvdXAuZWZmZWN0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zdG9yZS9ncm91cC9zdGF0ZS9ncm91cC5lZmZlY3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBQTJDO0FBQzNDLDJDQUF3RDtBQUd4RCx5REFBaUU7QUFFakUsOENBT3dCO0FBRXhCLGlEQUFtRDtBQUNuRCwwRUFBK0U7QUFDL0UsdUVBQWdFO0FBQ2hFLCtIQUFnSTtBQUNoSSw2RkFBc0Y7QUFFdEYsc0dBQStGO0FBQy9GLDJFQUFxRTtBQUdyRSxtREFzQ3lCO0FBR3pCLElBQWEsWUFBWSxHQUF6QixNQUFhLFlBQVk7SUF3THZCLFlBQ21CLFFBQWlCLEVBQ2pCLFFBQXNCLEVBQ3RCLGtCQUF5QyxFQUN6QyxXQUF3QjtRQUh4QixhQUFRLEdBQVIsUUFBUSxDQUFTO1FBQ2pCLGFBQVEsR0FBUixRQUFRLENBQWM7UUFDdEIsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUF1QjtRQUN6QyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQTFMakMsZ0JBQVcsR0FBdUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQzVELGdCQUFNLENBQUMsZ0NBQWdCLENBQUMsVUFBVSxDQUFDLEVBQ25DLHFCQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FDWixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FDdkIsZUFBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxpQ0FBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUN4Qyx1QkFBVyxDQUFDLE9BQU8sRUFBRSxJQUFJLGlDQUFpQixFQUFFLENBQUMsQ0FDOUMsQ0FDRixDQUNGLENBQUM7UUFFUSw0QkFBdUIsR0FBdUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJ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