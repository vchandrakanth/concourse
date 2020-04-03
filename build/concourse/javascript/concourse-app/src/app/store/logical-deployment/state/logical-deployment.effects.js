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
const rxjs_1 = require("rxjs");
const operators_2 = require("rxjs/operators");
const modal_1 = require("@concourse/core/modal");
const router_actions_1 = require("@concourse/core/router/router.actions");
const toast_actions_1 = require("@concourse/core/toast/toast.actions");
const helpers_1 = require("@concourse/shared/helpers");
const approval_actions_1 = require("@concourse/store/approval/state/approval.actions");
const asset_actions_1 = require("@concourse/store/asset/state/asset.actions");
const discovered_deployment_actions_1 = require("@concourse/store/discovered-deployment/state/discovered-deployment.actions");
const policy_resolution_actions_1 = require("@concourse/store/policy-resolution/state/policy-resolution.actions");
const surface_layer_actions_1 = require("@concourse/store/surface-layer/state/surface-layer.actions");
const surface_actions_1 = require("@concourse/store/surface/state/surface.actions");
const user_actions_1 = require("@concourse/store/user/state/user.actions");
const logical_deployment_actions_1 = require("./logical-deployment.actions");
let LogicalDeploymentEffects = class LogicalDeploymentEffects {
    constructor(actions$, logicalDeploymentApi, surfaceLayerFacade, logicalDeploymentFacade) {
        this.actions$ = actions$;
        this.logicalDeploymentApi = logicalDeploymentApi;
        this.surfaceLayerFacade = surfaceLayerFacade;
        this.logicalDeploymentFacade = logicalDeploymentFacade;
        this.loadLogicalDeployments$ = this.actions$.pipe(effects_1.ofType(logical_deployment_actions_1.LogicalDeploymentActionTypes.LoadLogicalDeployments), operators_2.switchMap(_ => this.logicalDeploymentApi.list().pipe(operators_2.map(data => new logical_deployment_actions_1.LoadLogicalDeploymentsSuccess(data)), operators_1.handleError('toast', new logical_deployment_actions_1.LoadLogicalDeploymentsFailure()))));
        this.loadLogicalDeploymentsBySurfaceLayerId$ = this.actions$.pipe(effects_1.ofType(logical_deployment_actions_1.LogicalDeploymentActionTypes.LoadLogicalDeploymentsBySurfaceLayerId), operators_2.map((action) => action.payload), operators_2.switchMap(surfaceLayerId => this.logicalDeploymentApi.listBySurfaceLayerIds(surfaceLayerId).pipe(operators_2.map(data => new logical_deployment_actions_1.LoadLogicalDeploymentsBySurfaceLayerIdSuccess(data)), operators_1.handleError('toast', new logical_deployment_actions_1.LoadLogicalDeploymentsBySurfaceLayerIdFailure()))));
        this.loadLogicalDeployment$ = this.actions$.pipe(effects_1.ofType(logical_deployment_actions_1.LogicalDeploymentActionTypes.LoadLogicalDeployment), operators_2.map((action) => action.payload), operators_2.exhaustMap(({ deploymentId, surfaceLayerId }) => this.logicalDeploymentApi.get(deploymentId, surfaceLayerId).pipe(operators_2.mergeMap(data => [
            new logical_deployment_actions_1.LoadLogicalDeploymentSuccess(data),
            new asset_actions_1.LoadAsset({ type: 'enclave', id: data.modelId })
        ]), operators_1.handleError('toast', new logical_deployment_actions_1.LoadLogicalDeploymentFailure()))));
        this.updateModelVersion$ = this.actions$.pipe(effects_1.ofType(logical_deployment_actions_1.LogicalDeploymentActionTypes.UpdateModelVersion), operators_2.map((action) => action.payload), operators_2.exhaustMap(payload => this.logicalDeploymentApi.updateModelVersion(payload).pipe(operators_2.mergeMap(data => [
            new logical_deployment_actions_1.UpdateModelVersionSuccess(data),
            new toast_actions_1.OpenToast({ message: 'Deployed Model Version Updated', type: 'success' }),
            new modal_1.CloseModal()
        ]), operators_1.handleError('toast', new logical_deployment_actions_1.UpdateModelVersionFailure()))));
        this.loadResourceAuditData$ = this.actions$.pipe(effects_1.ofType(logical_deployment_actions_1.LogicalDeploymentActionTypes.LoadResourceAuditData), operators_2.map((action) => action.payload), operators_2.switchMap(payload => this.logicalDeploymentApi.getResourceAuditData(payload.deploymentId, payload.surfaceLayerId).pipe(operators_2.mergeMap(data => [
            new logical_deployment_actions_1.LoadResourceAuditDataSuccess(data),
            new logical_deployment_actions_1.SelectResourceAuditData(helpers_1.Util.isArray(data) ? data[0] : undefined)
        ]), operators_1.handleError('toast', new logical_deployment_actions_1.LoadResourceAuditDataFailure()))));
        this.generatePrivilegeTemplate$ = this.actions$.pipe(effects_1.ofType(logical_deployment_actions_1.LogicalDeploymentActionTypes.GeneratePrivilegeTemplate), operators_2.map((action) => action.payload), operators_2.switchMap(({ deploymentId, surfaceLayerId, generateBy }) => this.logicalDeploymentApi.generatePrivilegeTemplate(deploymentId, surfaceLayerId, generateBy).pipe(operators_2.mergeMap(data => [
            new logical_deployment_actions_1.GeneratePrivilegeTemplateSuccess(data),
            new modal_1.OpenModal({
                id: 'privilege-template',
                component: modal_1.CodePreviewModalComponent,
                options: Object.assign(Object.assign({}, helpers_1.MODAL_DEFAULT_CONFIG), { class: 'modal-xl', initialState: {
                        codeString: JSON.stringify(data),
                        title: 'Privilege Template',
                        downloadable: true,
                        fileType: 'JSON',
                        fileName: `${deploymentId}-privilege-template.json`
                    } })
            })
        ]), operators_1.handleError('toast', new logical_deployment_actions_1.GeneratePrivilegeTemplateFailure()))));
        this.createLogicalDeployment$ = this.actions$.pipe(effects_1.ofType(logical_deployment_actions_1.LogicalDeploymentActionTypes.CreateLogicalDeployment), operators_2.map((action) => action.payload), operators_2.switchMap(payload => this.logicalDeploymentApi.create(payload).pipe(operators_2.mergeMap(data => [
            new logical_deployment_actions_1.CreateLogicalDeploymentSuccess(data),
            new modal_1.CloseModal(),
            new toast_actions_1.OpenToast({ message: 'Deployment Created Successfully', type: 'success' }),
            new router_actions_1.RouterGo({ path: data.routerLink })
        ]), operators_1.handleError('form', new logical_deployment_actions_1.CreateLogicalDeploymentFailure()))));
        this.deleteLogicalDeployment$ = this.actions$.pipe(effects_1.ofType(logical_deployment_actions_1.LogicalDeploymentActionTypes.DeleteLogicalDeployment), operators_2.map((action) => action.payload), operators_2.exhaustMap(payload => this.logicalDeploymentApi.delete(payload.surfaceLayerId, payload.deploymentId).pipe(operators_2.mergeMap(data => [
            new modal_1.CloseModal(),
            ...(!!data ?
                [
                    new logical_deployment_actions_1.DeleteLogicalDeploymentPending(data),
                    new toast_actions_1.OpenToast({ message: 'Deployment Pending Deletion', type: 'success' })
                ] : [
                new logical_deployment_actions_1.DeleteLogicalDeploymentSuccess(payload.deploymentId),
                new toast_actions_1.OpenToast({ message: 'Deployment Deleted Successfully', type: 'success' }),
                new router_actions_1.RouterGo({ path: ['/workflows/logical-deployments'] })
            ])
        ]), operators_1.handleError('form', new logical_deployment_actions_1.DeleteLogicalDeploymentFailure()))));
        this.searchLogicalDeployments$ = this.actions$.pipe(effects_1.ofType(logical_deployment_actions_1.LogicalDeploymentActionTypes.SearchLogicalDeployments), operators_2.map((action) => action.payload), operators_2.map(searchText => searchText.toLocaleLowerCase()), operators_2.withLatestFrom(this.logicalDeploymentFacade.list$), operators_2.map(([searchText, logicalDeployments]) => logicalDeployments.filter(ld => ld.name.toLocaleLowerCase().includes(searchText)).map(ent => ent.id)), operators_2.map(searchResults => new logical_deployment_actions_1.SearchLogicalDeploymentsSuccess(searchResults)));
        this.loadListOnNav$ = this.actions$.pipe(operators_1.ofRoute(['/workflows/logical-deployments']), operators_2.mergeMap(_ => [
            new surface_layer_actions_1.LoadSurfaceLayers(),
            new user_actions_1.LoadUsers(),
            // new LoadLogicalDeployments(),
            new asset_actions_1.LoadAssets()
        ]));
        this.reloadOnSurfaceSelect$ = this.actions$.pipe(operators_1.ofRoute(['/workflows/logical-deployments']), operators_2.map((action) => action.payload), operators_2.switchMap(_ => this.actions$.pipe(operators_2.takeUntil(this.actions$.pipe(effects_1.ofType(router_actions_1.RouterActionTypes.Change))), effects_1.ofType(surface_actions_1.SurfaceActionTypes.SelectSurface), operators_2.mergeMap(_ => [
            new surface_layer_actions_1.LoadSurfaceLayers(),
            new user_actions_1.LoadUsers(),
            new logical_deployment_actions_1.LoadLogicalDeployments(),
            new asset_actions_1.LoadAssets()
        ]))));
        this.loadDetailOnNav$ = this.actions$.pipe(operators_1.ofRoute(['/workflows/logical-deployments/:surfaceLayerId/:id']), operators_2.map((action) => action.payload), operators_2.switchMap(route => this.surfaceLayerFacade.listBySurface$.pipe(operators_2.filter(surfaceLayers => surfaceLayers.length > 0), operators_2.takeUntil(this.actions$.pipe(effects_1.ofType(router_actions_1.RouterActionTypes.Change))), operators_2.mergeMap(surfaceLayers => {
            const surfaceLayerId = +route.params['surfaceLayerId'];
            const deploymentId = +route.params['id'];
            const surfaceLayerIds = surfaceLayers.map(o => o.id);
            const hasSurfaceLayer = surfaceLayerIds.includes(surfaceLayerId);
            if (hasSurfaceLayer) {
                return rxjs_1.of(new user_actions_1.LoadUsers(), new asset_actions_1.LoadAssets(), new approval_actions_1.LoadApprovalRequests(), new policy_resolution_actions_1.LoadPolicyResolutions(), new logical_deployment_actions_1.LoadLogicalDeployment({ surfaceLayerId, deploymentId }), 
                // TODO: This will be uncommented once logicalDeployment audit api fixed.
                // new LoadResourceAuditData({ surfaceLayerId, deploymentId }),
                new logical_deployment_actions_1.SelectLogicalDeployment(deploymentId), new discovered_deployment_actions_1.LoadDiscoveredDeployments());
            }
            return rxjs_1.of(new router_actions_1.RouterGo({ path: ['/workflows/logical-deployments'] }));
        }))));
    }
};
__decorate([
    effects_1.Effect()
], LogicalDeploymentEffects.prototype, "loadLogicalDeployments$", void 0);
__decorate([
    effects_1.Effect()
], LogicalDeploymentEffects.prototype, "loadLogicalDeploymentsBySurfaceLayerId$", void 0);
__decorate([
    effects_1.Effect()
], LogicalDeploymentEffects.prototype, "loadLogicalDeployment$", void 0);
__decorate([
    effects_1.Effect()
], LogicalDeploymentEffects.prototype, "updateModelVersion$", void 0);
__decorate([
    effects_1.Effect()
], LogicalDeploymentEffects.prototype, "loadResourceAuditData$", void 0);
__decorate([
    effects_1.Effect()
], LogicalDeploymentEffects.prototype, "generatePrivilegeTemplate$", void 0);
__decorate([
    effects_1.Effect()
], LogicalDeploymentEffects.prototype, "createLogicalDeployment$", void 0);
__decorate([
    effects_1.Effect()
], LogicalDeploymentEffects.prototype, "deleteLogicalDeployment$", void 0);
__decorate([
    effects_1.Effect()
], LogicalDeploymentEffects.prototype, "searchLogicalDeployments$", void 0);
__decorate([
    effects_1.Effect()
], LogicalDeploymentEffects.prototype, "loadListOnNav$", void 0);
__decorate([
    effects_1.Effect()
], LogicalDeploymentEffects.prototype, "reloadOnSurfaceSelect$", void 0);
__decorate([
    effects_1.Effect()
], LogicalDeploymentEffects.prototype, "loadDetailOnNav$", void 0);
LogicalDeploymentEffects = __decorate([
    core_1.Injectable()
], LogicalDeploymentEffects);
exports.LogicalDeploymentEffects = LogicalDeploymentEffects;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naWNhbC1kZXBsb3ltZW50LmVmZmVjdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc3RvcmUvbG9naWNhbC1kZXBsb3ltZW50L3N0YXRlL2xvZ2ljYWwtZGVwbG95bWVudC5lZmZlY3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBQTJDO0FBQzNDLDJDQUF3RDtBQUd4RCx5REFBaUU7QUFDakUsK0JBQXNDO0FBQ3RDLDhDQVF3QjtBQUV4QixpREFBeUY7QUFDekYsMEVBQWtHO0FBQ2xHLHVFQUFnRTtBQUNoRSx1REFBdUU7QUFDdkUsdUZBQXdGO0FBQ3hGLDhFQUFtRjtBQUNuRiw4SEFBdUg7QUFDdkgsa0hBQTJHO0FBQzNHLHNHQUErRjtBQUUvRixvRkFBb0Y7QUFDcEYsMkVBQXFFO0FBRXJFLDZFQStCc0M7QUFJdEMsSUFBYSx3QkFBd0IsR0FBckMsTUFBYSx3QkFBd0I7SUF5TW5DLFlBQ21CLFFBQWlCLEVBQ2pCLG9CQUE4QyxFQUM5QyxrQkFBc0MsRUFDdEMsdUJBQWdEO1FBSGhELGFBQVEsR0FBUixRQUFRLENBQVM7UUFDakIseUJBQW9CLEdBQXBCLG9CQUFvQixDQUEwQjtRQUM5Qyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQ3RDLDRCQUF1QixHQUF2Qix1QkFBdUIsQ0FBeUI7UUEzTXpELDRCQUF1QixHQUF1QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FDeEUsZ0JBQU0sQ0FBQyx5REFBNEIsQ0FBQyxzQkFBc0IsQ0FBQyxFQUMzRCxxQkFBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQ1osSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FDbkMsZUFBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSwwREFBNkIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUNwRCx1QkFBVyxDQUFDLE9BQU8sRUFBRSxJQUFJLDBEQUE2QixFQUFFLENBQUMsQ0FDMUQsQ0FDRixDQUNGLENBQUM7UUFFUSw0Q0FBdUMsR0FBdUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQ3hGLGdCQUFNLENBQUMseURBQTRCLENBQUMsc0NBQXNDLENBQUMsRUFDM0UsZUFBRyxDQUFDLENBQUMsTUFBOEMsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUN2RSxxQkFBUyxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQ3pCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxxQkFBcUIsQ0FBQyxjQUFjLENBQUMsQ0FBQyxJQUFJLENBQ2xFLGVBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksMEVBQTZDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFDcEUsdUJBQVcsQ0FBQyxPQUFPLEVBQUUsSUFBSSwwRUFBNkMsRUFBRSxDQUFDLENBQzFFLENBQ0YsQ0FDRixDQUFDO1FBRVEsMkJBQXNCLEdBQXVCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUN2RSxnQkFBTSxDQUFDLHlEQUE0QixDQUFDLHFCQUFxQixDQUFDLEVBQzFELGVBQUcsQ0FBQyxDQUFDLE1BQTZCLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFDdEQsc0JBQVUsQ0FBQyxDQUFDLEVBQUUsWUFBWSxFQUFFLGNBQWMsRUFBRSxFQUFFLEVBQUUsQ0FDOUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsY0FBYyxDQUFDLENBQUMsSUFBSSxDQUM5RCxvQkFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDZixJQUFJLHlEQUE0QixDQUFDLElBQUksQ0FBQztZQUN0QyxJQUFJLHlCQUFTLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDckQsQ0FBQyxFQUNGLHVCQUFXLENBQUMsT0FBTyxFQUFFLElBQUkseURBQTRCLEVBQUUsQ0FBQyxDQUN6RCxDQUNGLENBQ0YsQ0FBQztRQUVRLHdCQUFtQixHQUF1QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FDcEUsZ0JBQU0sQ0FBQyx5REFBNEIsQ0FBQyxrQkFBa0IsQ0FBQyxFQUN2RCxlQUFHLENBQUMsQ0FBQyxNQUEwQixFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQ25ELHNCQUFVLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FDbkIsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FDeEQsb0JBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQ2YsSUFBSSxzREFBeUIsQ0FBQyxJQUFJLENBQUM7WUFDbkMsSUFBSSx5QkFBUyxDQUFDLEVBQUUsT0FBTyxFQUFFLGdDQUFnQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQztZQUM3RSxJQUFJLGtCQUFVLEVBQUU7U0FDakIsQ0FBQyxFQUNGLHVCQUFXLENBQUMsT0FBTyxFQUFFLElBQUksc0RBQXlCLEVBQUUsQ0FBQyxDQUN0RCxDQUNGLENBQ0YsQ0FBQztRQUVRLDJCQUFzQixHQUF1QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FDdkUsZ0JBQU0sQ0FBQyx5REFBNEIsQ0FBQyxxQkFBcUIsQ0FBQyxFQUMxRCxlQUFHLENBQUMsQ0FBQyxNQUE2QixFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQ3RELHFCQUFTLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FDbEIsSUFBSSxDQUFDLG9CQUFvQixDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDLElBQUksQ0FDL0Ysb0JBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQ2YsSUFBSSx5REFBNEIsQ0FBQyxJQUFJLENBQUM7WUFDdEMsSUFBSSxvREFBdUIsQ0FBQyxjQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztTQUN0RSxDQUFDLEVBQ0YsdUJBQVcsQ0FBQyxPQUFPLEVBQUUsSUFBSSx5REFBNEIsRUFBRSxDQUFDLENBQ3pELENBQ0YsQ0FDRixDQUFDO1FBRVEsK0JBQTBCLEdBQXVCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUMzRSxnQkFBTSxDQUFDLHlEQUE0QixDQUFDLHlCQUF5QixDQUFDLEVBQzlELGVBQUcsQ0FBQyxDQUFDLE1BQWlDLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFDMUQscUJBQVMsQ0FBQyxDQUFDLEVBQUUsWUFBWSxFQUFFLGNBQWMsRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLENBQ3pELElBQUksQ0FBQyxvQkFBb0IsQ0FBQyx5QkFBeUIsQ0FBQyxZQUFZLEVBQUUsY0FBYyxFQUFFLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FDaEcsb0JBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQ2YsSUFBSSw2REFBZ0MsQ0FBQyxJQUFJLENBQUM7WUFDMUMsSUFBSSxpQkFBUyxDQUFDO2dCQUNaLEVBQUUsRUFBRSxvQkFBb0I7Z0JBQ3hCLFNBQVMsRUFBRSxpQ0FBeUI7Z0JBQ3BDLE9BQU8sa0NBQ0YsOEJBQW9CLEtBQ3ZCLEtBQUssRUFBRSxVQUFVLEVBQ2pCLFlBQVksRUFBRTt3QkFDWixVQUFVLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7d0JBQ2hDLEtBQUssRUFBRSxvQkFBb0I7d0JBQzNCLFlBQVksRUFBRSxJQUFJO3dCQUNsQixRQUFRLEVBQUUsTUFBTTt3QkFDaEIsUUFBUSxFQUFFLEdBQUcsWUFBWSwwQkFBMEI7cUJBQ3BELEdBQ0Y7YUFDRixDQUFDO1NBQ0gsQ0FBQyxFQUNGLHVCQUFXLENBQUMsT0FBTyxFQUFFLElBQUksNkRBQWdDLEVBQUUsQ0FBQyxDQUM3RCxDQUNGLENBQ0YsQ0FBQztRQUVRLDZCQUF3QixHQUF1QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FDekUsZ0JBQU0sQ0FBQyx5REFBNEIsQ0FBQyx1QkFBdUIsQ0FBQyxFQUM1RCxlQUFHLENBQUMsQ0FBQyxNQUErQixFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQ3hELHFCQUFTLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FDbEIsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQzVDLG9CQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUNmLElBQUksMkRBQThCLENBQUMsSUFBSSxDQUFDO1lBQ3hDLElBQUksa0JBQVUsRUFBRTtZQUNoQixJQUFJLHlCQUFTLENBQUMsRUFBRSxPQUFPLEVBQUUsaUNBQWlDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDO1lBQzlFLElBQUkseUJBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDeEMsQ0FBQyxFQUNGLHVCQUFXLENBQUMsTUFBTSxFQUFFLElBQUksMkRBQThCLEVBQUUsQ0FBQyxDQUMxRCxDQUNGLENBQ0YsQ0FBQztRQUVRLDZCQUF3QixHQUF1QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FDekUsZ0JBQU0sQ0FBQyx5REFBNEIsQ0FBQyx1QkFBdUIsQ0FBQyxFQUM1RCxlQUFHLENBQUMsQ0FBQyxNQUErQixFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQ3hELHNCQUFVLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FDbkIsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQ2pGLG9CQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUNmLElBQUksa0JBQVUsRUFBRTtZQUNoQixHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNWO29CQUNFLElBQUksMkRBQThCLENBQUMsSUFBSSxDQUFDO29CQUN4QyxJQUFJLHlCQUFTLENBQUMsRUFBRSxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDO2lCQUMzRSxDQUFDLENBQUMsQ0FBQztnQkFDRixJQUFJLDJEQUE4QixDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUM7Z0JBQ3hELElBQUkseUJBQVMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxpQ0FBaUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUM7Z0JBQzlFLElBQUkseUJBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLGdDQUFnQyxDQUFDLEVBQUUsQ0FBQzthQUMzRCxDQUFDO1NBQ0wsQ0FBQyxFQUNGLHVCQUFXLENBQUMsTUFBTSxFQUFFLElBQUksMkRBQThCLEVBQUUsQ0FBQyxDQUMxRCxDQUNGLENBQ0YsQ0FBQztRQUVRLDhCQUF5QixHQUF1QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FDMUUsZ0JBQU0sQ0FBQyx5REFBNEIsQ0FBQyx3QkFBd0IsQ0FBQyxFQUM3RCxlQUFHLENBQUMsQ0FBQyxNQUFnQyxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQ3pELGVBQUcsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLEVBQ2pELDBCQUFjLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLEtBQUssQ0FBQyxFQUNsRCxlQUFHLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxrQkFBa0IsQ0FBQyxFQUFFLEVBQUUsQ0FDdkMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FDckcsRUFDRCxlQUFHLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxJQUFJLDREQUErQixDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQ3pFLENBQUM7UUFFUSxtQkFBYyxHQUF1QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FDL0QsbUJBQU8sQ0FBQyxDQUFDLGdDQUFnQyxDQUFDLENBQUMsRUFDM0Msb0JBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQ1osSUFBSSx5Q0FBaUIsRUFBRTtZQUN2QixJQUFJLHdCQUFTLEVBQUU7WUFDaEIsZ0NBQWdDO1lBQy9CLElBQUksMEJBQVUsRUFBRTtTQUNqQixDQUFDLENBQ0gsQ0FBQztRQUVRLDJCQUFzQixHQUF1QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FDdkUsbUJBQU8sQ0FBQyxDQUFDLGdDQUFnQyxDQUFDLENBQUMsRUFDM0MsZUFBRyxDQUFDLENBQUMsTUFBb0IsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUM3QyxxQkFBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQ1osSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQ2hCLHFCQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsZ0JBQU0sQ0FBQyxrQ0FBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQy9ELGdCQUFNLENBQUMsb0NBQWtCLENBQUMsYUFBYSxDQUFDLEVBQ3hDLG9CQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUNaLElBQUkseUNBQWlCLEVBQUU7WUFDdkIsSUFBSSx3QkFBUyxFQUFFO1lBQ2YsSUFBSSxtREFBc0IsRUFBRTtZQUM1QixJQUFJLDBCQUFVLEVBQUU7U0FDakIsQ0FBQyxDQUNILENBQ0YsQ0FDRixDQUFDO1FBRVEscUJBQWdCLEdBQXVCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUNqRSxtQkFBTyxDQUFDLENBQUMsb0RBQW9ELENBQUMsQ0FBQyxFQUMvRCxlQUFHLENBQUMsQ0FBQyxNQUFvQixFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQzdDLHFCQUFTLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FDaEIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQ3pDLGtCQUFNLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxFQUNqRCxxQkFBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGdCQUFNLENBQUMsa0NBQWlCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUMvRCxvQkFBUSxDQUFDLGFBQWEsQ0FBQyxFQUFFO1lBQ3ZCLE1BQU0sY0FBYyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ3ZELE1BQU0sWUFBWSxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN6QyxNQUFNLGVBQWUsR0FBRyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3JELE1BQU0sZUFBZSxHQUFHLGVBQWUsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDakUsSUFBSSxlQUFlLEVBQUU7Z0JBQ25CLE9BQU8sU0FBRSxDQUNQLElBQUksd0JBQVMsRUFBRSxFQUNmLElBQUksMEJBQVUsRUFBRSxFQUNoQixJQUFJLHVDQUFvQixFQUFFLEVBQzFCLElBQUksaURBQXFCLEVBQUUsRUFDM0IsSUFBSSxrREFBcUIsQ0FBQyxFQUFFLGNBQWMsRUFBRSxZQUFZLEVBQUUsQ0FBQztnQkFDM0QseUVBQXlFO2dCQUN6RSwrREFBK0Q7Z0JBQy9ELElBQUksb0RBQXVCLENBQUMsWUFBWSxDQUFDLEVBQ3pDLElBQUkseURBQXlCLEVBQUUsQ0FDaEMsQ0FBQzthQUNIO1lBQ0QsT0FBTyxTQUFFLENBQUMsSUFBSSx5QkFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsZ0NBQWdDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN4RSxDQUFDLENBQUMsQ0FDSCxDQUNGLENBQ0YsQ0FBQztJQU9FLENBQUM7Q0FDTixDQUFBO0FBN01XO0lBQVQsZ0JBQU0sRUFBRTt5RUFRUDtBQUVRO0lBQVQsZ0JBQU0sRUFBRTt5RkFTUDtBQUVRO0lBQVQsZ0JBQU0sRUFBRTt3RUFZUDtBQUVRO0lBQVQsZ0JBQU0sRUFBRTtxRUFhUDtBQUVRO0lBQVQsZ0JBQU0sRUFBRTt3RUFZUDtBQUVRO0lBQVQsZ0JBQU0sRUFBRTs0RUEwQlA7QUFFUTtJQUFULGdCQUFNLEVBQUU7MEVBY1A7QUFFUTtJQUFULGdCQUFNLEVBQUU7MEVBb0JQO0FBRVE7SUFBVCxnQkFBTSxFQUFFOzJFQVNQO0FBRVE7SUFBVCxnQkFBTSxFQUFFO2dFQVFQO0FBRVE7SUFBVCxnQkFBTSxFQUFFO3dFQWVQO0FBRVE7SUFBVCxnQkFBTSxFQUFFO2tFQTZCUDtBQXZNUyx3QkFBd0I7SUFEcEMsaUJBQVUsRUFBRTtHQUNBLHdCQUF3QixDQStNcEM7QUEvTVksNERBQXdCIn0=