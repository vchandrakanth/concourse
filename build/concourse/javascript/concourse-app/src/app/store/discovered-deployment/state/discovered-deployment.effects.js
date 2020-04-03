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
const router_actions_1 = require("@concourse/core/router/router.actions");
const asset_actions_1 = require("@concourse/store/asset/state/asset.actions");
const logical_deployment_actions_1 = require("@concourse/store/logical-deployment/state/logical-deployment.actions");
const surface_actions_1 = require("@concourse/store/surface/state/surface.actions");
const discovered_deployment_actions_1 = require("./discovered-deployment.actions");
let DiscoveredDeploymentEffects = class DiscoveredDeploymentEffects {
    constructor(actions$, discoveredDeploymentsApi, discoveredDeploymentFacade) {
        this.actions$ = actions$;
        this.discoveredDeploymentsApi = discoveredDeploymentsApi;
        this.discoveredDeploymentFacade = discoveredDeploymentFacade;
        this.loadDiscoveredDeployments$ = this.actions$.pipe(effects_1.ofType(discovered_deployment_actions_1.DiscoveredDeploymentActionTypes.LoadDiscoveredDeployments), operators_2.switchMap(_ => this.discoveredDeploymentsApi.list().pipe(operators_2.map(discoveredDeployments => new discovered_deployment_actions_1.LoadDiscoveredDeploymentsSuccess(discoveredDeployments)), operators_1.handleError('toast', new discovered_deployment_actions_1.LoadDiscoveredDeploymentsFailure()))));
        this.loadDiscoveredDeployment$ = this.actions$.pipe(effects_1.ofType(discovered_deployment_actions_1.DiscoveredDeploymentActionTypes.LoadDiscoveredDeployment), operators_2.map((action) => action.payload), operators_2.switchMap(payload => this.discoveredDeploymentsApi.get(payload).pipe(operators_2.map(discoveredDeployment => new discovered_deployment_actions_1.LoadDiscoveredDeploymentSuccess(discoveredDeployment)), operators_1.handleError('toast', new discovered_deployment_actions_1.LoadDiscoveredDeploymentFailure()))));
        this.getResourceData$ = this.actions$.pipe(effects_1.ofType(discovered_deployment_actions_1.DiscoveredDeploymentActionTypes.LoadResourceAuditData), operators_2.map((action) => action.payload), operators_2.switchMap(payload => this.discoveredDeploymentsApi.getResourceAuditData(payload).pipe(operators_2.mergeMap(data => [
            new discovered_deployment_actions_1.LoadResourceAuditDataSuccess(data),
            new discovered_deployment_actions_1.SelectResourceAuditData(Array.isArray(data) ? data[0] : undefined)
        ]), operators_1.handleError('toast', new discovered_deployment_actions_1.LoadResourceAuditDataFailure()))));
        this.searchDiscoveredDeployments$ = this.actions$.pipe(effects_1.ofType(discovered_deployment_actions_1.DiscoveredDeploymentActionTypes.SearchDiscoveredDeployments), operators_2.map((action) => action.payload), operators_2.map(searchText => searchText.toLocaleLowerCase()), operators_2.withLatestFrom(this.discoveredDeploymentFacade.list$), operators_2.map(([searchText, discoveredDeployments]) => discoveredDeployments.filter(dd => dd.stackName.toLocaleLowerCase().includes(searchText)).map(ent => ent.id)), operators_2.map(searchResults => new discovered_deployment_actions_1.SearchDiscoveredDeploymentsSuccess(searchResults)));
        this.loadDetailOnNav$ = this.actions$.pipe(operators_1.ofRoute(['/workflows/discovered-deployments/:id']), operators_2.map((action) => action.payload), operators_2.mergeMap(route => [
            new discovered_deployment_actions_1.LoadDiscoveredDeployment(+route.params['id']),
            new discovered_deployment_actions_1.SelectDiscoveredDeployment(+route.params['id']),
            new discovered_deployment_actions_1.LoadResourceAuditData(+route.params['id']),
            new logical_deployment_actions_1.LoadLogicalDeployments(),
            new asset_actions_1.LoadAssets({ includeTemplates: true })
        ]));
        this.loadListOnNav$ = this.actions$.pipe(operators_1.ofRoute(['/workflows/discovered-deployments']), operators_2.mergeMap(_ => [
            // new LoadDiscoveredDeployments(),
            new logical_deployment_actions_1.LoadLogicalDeployments(),
            new asset_actions_1.LoadAssets()
        ]));
        this.reloadOnSurfaceSelect$ = this.actions$.pipe(operators_1.ofRoute(['/workflows/discovered-deployments']), operators_2.map((action) => action.payload), operators_2.switchMap(route => this.actions$.pipe(operators_2.takeUntil(this.actions$.pipe(effects_1.ofType(router_actions_1.RouterActionTypes.Change))), effects_1.ofType(surface_actions_1.SurfaceActionTypes.SelectSurface), operators_2.mergeMap(_ => [
            new discovered_deployment_actions_1.LoadDiscoveredDeployments(),
            new logical_deployment_actions_1.LoadLogicalDeployments(),
            new asset_actions_1.LoadAssets()
        ]))));
    }
};
__decorate([
    effects_1.Effect()
], DiscoveredDeploymentEffects.prototype, "loadDiscoveredDeployments$", void 0);
__decorate([
    effects_1.Effect()
], DiscoveredDeploymentEffects.prototype, "loadDiscoveredDeployment$", void 0);
__decorate([
    effects_1.Effect()
], DiscoveredDeploymentEffects.prototype, "getResourceData$", void 0);
__decorate([
    effects_1.Effect()
], DiscoveredDeploymentEffects.prototype, "searchDiscoveredDeployments$", void 0);
__decorate([
    effects_1.Effect()
], DiscoveredDeploymentEffects.prototype, "loadDetailOnNav$", void 0);
__decorate([
    effects_1.Effect()
], DiscoveredDeploymentEffects.prototype, "loadListOnNav$", void 0);
__decorate([
    effects_1.Effect()
], DiscoveredDeploymentEffects.prototype, "reloadOnSurfaceSelect$", void 0);
DiscoveredDeploymentEffects = __decorate([
    core_1.Injectable()
], DiscoveredDeploymentEffects);
exports.DiscoveredDeploymentEffects = DiscoveredDeploymentEffects;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzY292ZXJlZC1kZXBsb3ltZW50LmVmZmVjdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc3RvcmUvZGlzY292ZXJlZC1kZXBsb3ltZW50L3N0YXRlL2Rpc2NvdmVyZWQtZGVwbG95bWVudC5lZmZlY3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBQTJDO0FBQzNDLDJDQUF3RDtBQUd4RCx5REFBaUU7QUFFakUsOENBQXFGO0FBRXJGLDBFQUF3RjtBQUN4Riw4RUFBd0U7QUFDeEUscUhBQThHO0FBQzlHLG9GQUFvRjtBQUVwRixtRkFleUM7QUFJekMsSUFBYSwyQkFBMkIsR0FBeEMsTUFBYSwyQkFBMkI7SUFxRnRDLFlBQ21CLFFBQWlCLEVBQ2pCLHdCQUFxRCxFQUNyRCwwQkFBc0Q7UUFGdEQsYUFBUSxHQUFSLFFBQVEsQ0FBUztRQUNqQiw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQTZCO1FBQ3JELCtCQUEwQixHQUExQiwwQkFBMEIsQ0FBNEI7UUF0Ri9ELCtCQUEwQixHQUF1QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FDM0UsZ0JBQU0sQ0FBQywrREFBK0IsQ0FBQyx5QkFBeUIsQ0FBQyxFQUNqRSxxQkFBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQ1osSUFBSSxDQUFDLHdCQUF3QixDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FDdkMsZUFBRyxDQUFDLHFCQUFxQixDQUFDLEVBQUUsQ0FBQyxJQUFJLGdFQUFnQyxDQUFDLHFCQUFxQixDQUFDLENBQUMsRUFDekYsdUJBQVcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxnRUFBZ0MsRUFBRSxDQUFDLENBQzdELENBQ0YsQ0FDRixDQUFDO1FBRVEsOEJBQXlCLEdBQXVCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUMxRSxnQkFB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