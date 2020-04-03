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
const helpers_1 = require("@concourse/shared/helpers");
const approval_actions_1 = require("@concourse/store/approval/state/approval.actions");
const cloud_role_assignment_actions_1 = require("@concourse/store/cloud-role-assignments/state/cloud-role-assignment.actions");
const cloud_role_actions_1 = require("./cloud-role.actions");
let CloudRoleEffects = class CloudRoleEffects {
    constructor(actions$, roleApi, cloudRoleFacade) {
        this.actions$ = actions$;
        this.roleApi = roleApi;
        this.cloudRoleFacade = cloudRoleFacade;
        this.loadCloudRoles$ = this.actions$.pipe(effects_1.ofType(cloud_role_actions_1.CloudRoleActionTypes.LoadCloudRoles), operators_2.switchMap(_ => this.roleApi.list().pipe(operators_2.map(roles => new cloud_role_actions_1.LoadCloudRolesSuccess(roles)), operators_1.handleError('toast', new cloud_role_actions_1.LoadCloudRolesFailure()))));
        this.loadCloudRolesByPaginatioin$ = this.actions$.pipe(effects_1.ofType(cloud_role_actions_1.CloudRoleActionTypes.LoadCloudRolesByPagination), operators_2.map((action) => action.payload), operators_2.concatMap(({ page, size }) => this.roleApi.paginatedList(size, page).pipe(operators_2.map(data => new cloud_role_actions_1.LoadCloudRolesByPaginationSuccess(data)), operators_1.handleError('toast', new cloud_role_actions_1.LoadCloudRolesByPaginationFailure()))));
        this.loadCloudRole$ = this.actions$.pipe(effects_1.ofType(cloud_role_actions_1.CloudRoleActionTypes.LoadCloudRole), operators_2.map((action) => action.payload), operators_2.switchMap(payload => this.roleApi.detail(payload).pipe(operators_2.map(role => new cloud_role_actions_1.LoadCloudRoleSuccess(role)), operators_1.handleError('toast', new cloud_role_actions_1.LoadCloudRoleFailure()))));
        this.createCloudRole$ = this.actions$.pipe(effects_1.ofType(cloud_role_actions_1.CloudRoleActionTypes.CreateCloudRole), operators_2.map((action) => action.payload), operators_2.exhaustMap(({ newCloudRole, versionBump }) => this.roleApi.create(newCloudRole, versionBump).pipe(operators_2.mergeMap(cloudRole => [
            new cloud_role_actions_1.CreateCloudRoleSuccess(cloudRole),
            new modal_1.CloseModal(),
            new toast_actions_1.OpenToast({ message: 'Cloud Role Created Successfully', type: 'success' }),
            new router_actions_1.RouterGo({ path: [`/cloud-roles/${cloudRole.id}`] })
        ]), operators_1.handleError('form', new cloud_role_actions_1.CreateCloudRoleFailure()))));
        this.deleteCloudRole$ = this.actions$.pipe(effects_1.ofType(cloud_role_actions_1.CloudRoleActionTypes.DeleteCloudRole), operators_2.map((action) => action.payload), operators_2.concatMap(payload => this.roleApi.delete(payload).pipe(operators_2.mergeMap(_ => [
            new cloud_role_actions_1.DeleteCloudRoleSuccess(payload),
            new toast_actions_1.OpenToast({ message: 'Cloud Role Deleted Successfully', type: 'success' }),
            new modal_1.CloseModal(),
            new router_actions_1.RouterGo({ path: ['/cloud-roles'] })
        ]), operators_1.handleError('form', new cloud_role_actions_1.DeleteCloudRoleFailure()))));
        this.updateCloudRole$ = this.actions$.pipe(effects_1.ofType(cloud_role_actions_1.CloudRoleActionTypes.UpdateCloudRole), operators_2.map((action) => action.payload), operators_2.exhaustMap(({ newCloudRole: payload, versionBump }) => this.roleApi.update(payload, versionBump).pipe(operators_2.mergeMap(data => [
            new cloud_role_actions_1.UpdateCloudRoleSuccess(data),
            new modal_1.CloseModal(),
            new toast_actions_1.OpenToast({ message: 'Cloud Role Updated Successfully', type: 'success' }),
            ...(payload.id !== data.id ? [
                new cloud_role_actions_1.UpdateCloudRoleSuccess(payload.copyWith({ isLatest: false, status: payload.status === 'DRAFT' ? 'PUBLISHED' : 'DRAFT' })),
                new router_actions_1.RouterGo({ path: [`/cloud-roles/${data.id}`] })
            ] : [])
        ]), operators_1.handleError('form', new cloud_role_actions_1.UpdateCloudRoleFailure()))));
        this.updateAwsActions$ = this.actions$.pipe(effects_1.ofType(cloud_role_actions_1.CloudRoleActionTypes.UpdateAwsActions), operators_2.map((action) => action.payload), operators_2.exhaustMap(({ awsOperations, id }) => this.roleApi.updateAwsActions(awsOperations, id).pipe(operators_2.mergeMap(data => [
            new cloud_role_actions_1.UpdateAwsActionsSuccess(data),
            new modal_1.CloseModal(),
            new toast_actions_1.OpenToast({ message: 'Aws Actions Updated Successfully', type: 'success' }),
            ...(data.id !== id ? [
                new cloud_role_actions_1.UpdateAwsActionsSuccess(data.copyWith({ isLatest: false })),
                new router_actions_1.RouterGo({ path: [`/cloud-roles/${data.id}`] })
            ] : [])
        ]), operators_1.handleError('form', new cloud_role_actions_1.UpdateAwsActionsFailure()))));
        this.updateNonAwsActions$ = this.actions$.pipe(effects_1.ofType(cloud_role_actions_1.CloudRoleActionTypes.UpdateNonAwsActions), operators_2.map((action) => action.payload), operators_2.exhaustMap(({ awsOperations, id }) => this.roleApi.updateAwsNonActions(awsOperations, id).pipe(operators_2.mergeMap(data => [
            new cloud_role_actions_1.UpdateNonAwsActionsSuccess(data),
            new modal_1.CloseModal(),
            new toast_actions_1.OpenToast({ message: 'Aws Non Actions Updated Successfully', type: 'success' }),
            ...(data.id !== id ? [
                new cloud_role_actions_1.UpdateNonAwsActionsSuccess(data.copyWith({ isLatest: false })),
                new router_actions_1.RouterGo({ path: [`/cloud-roles/${data.id}`] })
            ] : [])
        ]), operators_1.handleError('form', new cloud_role_actions_1.UpdateNonAwsActionsFailure()))));
        this.updateAzureActions$ = this.actions$.pipe(effects_1.ofType(cloud_role_actions_1.CloudRoleActionTypes.UpdateAzureActions), operators_2.map((action) => action.payload), operators_2.exhaustMap(({ azureOperations, id }) => this.roleApi.updateAzureActions(azureOperations, id).pipe(operators_2.mergeMap(data => [
            new cloud_role_actions_1.UpdateAzureActionsSuccess(data),
            new modal_1.CloseModal(),
            new toast_actions_1.OpenToast({ message: ' Azure Actions Updated Successfully', type: 'success' }),
            ...(data.id !== id ? [
                new cloud_role_actions_1.UpdateAzureActionsSuccess(data.copyWith({ isLatest: false })),
                new router_actions_1.RouterGo({ path: [`/cloud-roles/${data.id}`] })
            ] : [])
        ]), operators_1.handleError('form', new cloud_role_actions_1.UpdateAzureActionsFailure()))));
        this.updateNonAzureActions$ = this.actions$.pipe(effects_1.ofType(cloud_role_actions_1.CloudRoleActionTypes.UpdateNonAzureActions), operators_2.map((action) => action.payload), operators_2.exhaustMap(({ azureOperations, id }) => this.roleApi.updateAzureNonActions(azureOperations, id).pipe(operators_2.mergeMap(data => [
            new cloud_role_actions_1.UpdateNonAzureActionsSuccess(data),
            new modal_1.CloseModal(),
            new toast_actions_1.OpenToast({ message: 'Azure Non Actions Updated Successfully', type: 'success' }),
            ...(data.id !== id ? [
                new cloud_role_actions_1.UpdateNonAzureActionsSuccess(data.copyWith({ isLatest: false })),
                new router_actions_1.RouterGo({ path: [`/cloud-roles/${data.id}`] })
            ] : [])
        ]), operators_1.handleError('form', new cloud_role_actions_1.UpdateNonAwsActionsFailure()))));
        this.syncCloudRolesAzure = this.actions$.pipe(effects_1.ofType(cloud_role_actions_1.CloudRoleActionTypes.SyncCloudRolesAzure), operators_2.exhaustMap(() => this.roleApi.syncCloudRoles('azure').pipe(operators_2.mergeMap(payload => [
            new cloud_role_actions_1.SyncCloudRolesAzureSuccess(),
            new cloud_role_actions_1.LoadCloudRoles(),
            new toast_actions_1.OpenToast({ message: 'Cloud Role Synced Successfully', type: 'success' }),
            new modal_1.OpenModal({
                id: 'response-cloud-role-sync',
                component: modal_1.ResponseCloudRoleSyncComponent,
                options: Object.assign(Object.assign({}, helpers_1.MODAL_DEFAULT_CONFIG), { initialState: {
                        syncResponse: payload
                    } })
            })
        ]), operators_1.handleError('form', new cloud_role_actions_1.SyncCloudRolesAzureFailure()))));
        this.searchCloudRoles = this.actions$.pipe(effects_1.ofType(cloud_role_actions_1.CloudRoleActionTypes.SearchCloudRoles), operators_2.map((action) => action.payload), operators_2.map(searchText => searchText.toLocaleLowerCase()), operators_2.withLatestFrom(this.cloudRoleFacade.list$), operators_2.map(([searchText, cloudRoles]) => cloudRoles.filter(cr => cr.name.toLocaleLowerCase().includes(searchText)).map(cr => cr.id)), operators_2.map(searchResults => new cloud_role_actions_1.SearchCloudRolesSuccess(searchResults)));
        this.loadCloudRolesNav$ = this.actions$.pipe(operators_1.ofRoute(['/cloud-roles']), operators_2.mergeMap(_ => [
            new cloud_role_actions_1.SelectCloudRole(undefined),
            // new LoadCloudRoles()
            new cloud_role_actions_1.LoadCloudRolesByPagination({ page: '0', size: '200' })
        ]));
        this.loadCloudRoleNav$ = this.actions$.pipe(operators_1.ofRoute(['/cloud-roles/:id']), operators_2.map((action) => action.payload), operators_2.mergeMap(route => [
            new cloud_role_actions_1.LoadCloudRole(+route.params['id']),
            new cloud_role_actions_1.SelectCloudRole(+route.params['id']),
            new cloud_role_assignment_actions_1.LoadCloudRoleAssignmentsByCloudRoleId(+route.params['id']),
            new approval_actions_1.LoadApprovalRequestByRequestEntityId(+route.params['id'])
        ]));
    }
};
__decorate([
    effects_1.Effect()
], CloudRoleEffects.prototype, "loadCloudRoles$", void 0);
__decorate([
    effects_1.Effect()
], CloudRoleEffects.prototype, "loadCloudRolesByPaginatioin$", void 0);
__decorate([
    effects_1.Effect()
], CloudRoleEffects.prototype, "loadCloudRole$", void 0);
__decorate([
    effects_1.Effect()
], CloudRoleEffects.prototype, "createCloudRole$", void 0);
__decorate([
    effects_1.Effect()
], CloudRoleEffects.prototype, "deleteCloudRole$", void 0);
__decorate([
    effects_1.Effect()
], CloudRoleEffects.prototype, "updateCloudRole$", void 0);
__decorate([
    effects_1.Effect()
], CloudRoleEffects.prototype, "updateAwsActions$", void 0);
__decorate([
    effects_1.Effect()
], CloudRoleEffects.prototype, "updateNonAwsActions$", void 0);
__decorate([
    effects_1.Effect()
], CloudRoleEffects.prototype, "updateAzureActions$", void 0);
__decorate([
    effects_1.Effect()
], CloudRoleEffects.prototype, "updateNonAzureActions$", void 0);
__decorate([
    effects_1.Effect()
], CloudRoleEffects.prototype, "syncCloudRolesAzure", void 0);
__decorate([
    effects_1.Effect()
], CloudRoleEffects.prototype, "searchCloudRoles", void 0);
__decorate([
    effects_1.Effect()
], CloudRoleEffects.prototype, "loadCloudRolesNav$", void 0);
__decorate([
    effects_1.Effect()
], CloudRoleEffects.prototype, "loadCloudRoleNav$", void 0);
CloudRoleEffects = __decorate([
    core_1.Injectable()
], CloudRoleEffects);
exports.CloudRoleEffects = CloudRoleEffects;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvdWQtcm9sZS5lZmZlY3RzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3N0b3JlL2Nsb3VkLXJvbGUvc3RhdGUvY2xvdWQtcm9sZS5lZmZlY3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBQTJDO0FBQzNDLDJDQUF3RDtBQUd4RCx5REFBaUU7QUFFakUsOENBQWlHO0FBRWpHLGlEQUE4RjtBQUM5RiwwRUFBK0U7QUFDL0UsdUVBQWdFO0FBQ2hFLHVEQUFpRTtBQUNqRSx1RkFBd0c7QUFDeEcsK0hBQW9JO0FBRXBJLDZEQW9DOEI7QUFJOUIsSUFBYSxnQkFBZ0IsR0FBN0IsTUFBYSxnQkFBZ0I7SUF3TjNCLFlBQ21CLFFBQWlCLEVBQ2pCLE9BQXlCLEVBQ3pCLGVBQWdDO1FBRmhDLGFBQVEsR0FBUixRQUFRLENBQVM7UUFDakIsWUFBTyxHQUFQLE9BQU8sQ0FBa0I7UUFDekIsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBek56QyxvQkFBZSxHQUF1QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FDaEUsZ0JBQU0sQ0FBQyx5Q0FBb0IsQ0FBQyxjQUFjLENBQUMsRUFDM0MscUJBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUNaLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUN0QixlQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLDBDQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQzlDLHVCQUFXLENBQUMsT0FBTyxFQUFFLElBQUksMENBQXFCLEVBQUUsQ0FBQyxDQUNsRCxDQUNGLENBQ0YsQ0FBQztRQUVRLGlDQUE0QixHQUF1QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FDN0UsZ0JBQU0sQ0FBQyx5Q0FBb0IsQ0FBQywwQkFBMEIs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