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
const asset_actions_1 = require("@concourse/store/asset/state/asset.actions");
const aws_account_actions_1 = require("@concourse/store/aws-accounts/state/aws-account.actions");
const group_actions_1 = require("@concourse/store/group/state/group.actions");
const logical_deployment_actions_1 = require("@concourse/store/logical-deployment/state/logical-deployment.actions");
const policy_group_actions_1 = require("@concourse/store/policy-group/state/policy-group.actions");
const surface_actions_1 = require("@concourse/store/surface/state/surface.actions");
const surface_layer_actions_1 = require("./surface-layer.actions");
let SurfaceLayerEffects = class SurfaceLayerEffects {
    constructor(actions$, surfaceLayerService, surfaceLayerFacade) {
        this.actions$ = actions$;
        this.surfaceLayerService = surfaceLayerService;
        this.surfaceLayerFacade = surfaceLayerFacade;
        this.loadSurfaceLayers$ = this.actions$.pipe(effects_1.ofType(surface_layer_actions_1.SurfaceLayerActionTypes.LoadSurfaceLayers), operators_2.switchMap(_ => this.surfaceLayerService.list().pipe(operators_2.map(data => new surface_layer_actions_1.LoadSurfaceLayersSuccess(data)), operators_1.handleError('toast', new surface_layer_actions_1.LoadSurfaceLayersFailure()))));
        this.addSurfaceLayer$ = this.actions$.pipe(effects_1.ofType(surface_layer_actions_1.SurfaceLayerActionTypes.AddSurfaceLayer), operators_2.map((action) => action.payload), operators_2.switchMap(surfLayer => this.surfaceLayerService.create(surfLayer).pipe(operators_2.mergeMap(data => [
            new surface_layer_actions_1.AddSurfaceLayerSuccess(data),
            new modal_1.CloseModal(),
            new toast_actions_1.OpenToast({ message: 'SurfaceLayer Created', type: 'success' }),
            new router_actions_1.RouterGo({ path: [`surfaces/${data.id}`] })
        ]), operators_1.handleError('form', new surface_layer_actions_1.AddSurfaceLayerFailure()))));
        this.updateSurfaceLayer$ = this.actions$.pipe(effects_1.ofType(surface_layer_actions_1.SurfaceLayerActionTypes.UpdateSurfaceLayer), operators_2.map((action) => action.payload), operators_2.concatMap(payload => this.surfaceLayerService.update(payload).pipe(operators_2.mergeMap(data => [
            new surface_layer_actions_1.UpdateSurfaceLayerSuccess(data),
            new modal_1.CloseModal(),
            new toast_actions_1.OpenToast({ message: 'SurfaceLayer Updated', type: 'success' })
        ]), operators_1.handleError('form', new surface_layer_actions_1.UpdateSurfaceLayerFailure()))));
        this.removeSurfaceLayer$ = this.actions$.pipe(effects_1.ofType(surface_layer_actions_1.SurfaceLayerActionTypes.RemoveSurfaceLayer), operators_2.map((action) => action.payload), operators_2.mergeMap(payload => this.surfaceLayerService.remove(payload.id).pipe(operators_2.mergeMap(_ => [
            new surface_layer_actions_1.RemoveSurfaceLayerSuccess(payload),
            new toast_actions_1.OpenToast({ message: 'SurfaceLayer Deleted', type: 'success' }),
            new modal_1.CloseModal()
        ]), operators_1.handleError('form', new surface_layer_actions_1.RemoveSurfaceLayerFailure()))));
        this.loadSurfaceLayersOnSurfaceSelect$ = this.actions$.pipe(effects_1.ofType(surface_actions_1.SurfaceActionTypes.SelectSurface), operators_2.map(_ => new surface_layer_actions_1.LoadSurfaceLayers()));
        // routing effects
        this.surfaceLayerTreeNav$ = this.actions$.pipe(operators_1.ofRoute(['/surfaces']), operators_2.mergeMap(() => [
            new surface_layer_actions_1.SelectSurfaceLayer(undefined),
            new group_actions_1.LoadGroups(),
            new aws_account_actions_1.LoadAwsAccounts()
        ]));
        this.loadSurfaceLayerNav$ = this.actions$.pipe(operators_1.ofRoute(['/surfaces/:id']), operators_2.map((action) => action.payload), operators_2.switchMap(route => this.surfaceLayerFacade.listBySurface$.pipe(operators_2.filter(surfaceLayers => surfaceLayers.length > 0), operators_2.takeUntil(this.actions$.pipe(effects_1.ofType(router_actions_1.RouterActionTypes.Change))), operators_2.mergeMap(surfaceLayers => {
            const surfaceLayerId = +route.params['id'];
            const surfaceLayerIds = surfaceLayers.map(s => s.id);
            const hasSurfaceLayer = surfaceLayerIds.includes(surfaceLayerId);
            if (hasSurfaceLayer) {
                return rxjs_1.of(new surface_layer_actions_1.SelectSurfaceLayer(surfaceLayerId), new asset_actions_1.LoadAssets(), new policy_group_actions_1.LoadPolicyGroupsBySurfaceLayerIds([surfaceLayerId]), new logical_deployment_actions_1.LoadLogicalDeploymentsBySurfaceLayerId([surfaceLayerId]), new group_actions_1.LoadRoleAssignmentsBySurfaceLayerIds([surfaceLayerId]));
            }
            return rxjs_1.of(new router_actions_1.RouterGo({ path: ['surfaces'] }));
        }))));
    }
};
__decorate([
    effects_1.Effect()
], SurfaceLayerEffects.prototype, "loadSurfaceLayers$", void 0);
__decorate([
    effects_1.Effect()
], SurfaceLayerEffects.prototype, "addSurfaceLayer$", void 0);
__decorate([
    effects_1.Effect()
], SurfaceLayerEffects.prototype, "updateSurfaceLayer$", void 0);
__decorate([
    effects_1.Effect()
], SurfaceLayerEffects.prototype, "removeSurfaceLayer$", void 0);
__decorate([
    effects_1.Effect()
], SurfaceLayerEffects.prototype, "loadSurfaceLayersOnSurfaceSelect$", void 0);
__decorate([
    effects_1.Effect()
], SurfaceLayerEffects.prototype, "surfaceLayerTreeNav$", void 0);
__decorate([
    effects_1.Effect()
], SurfaceLayerEffects.prototype, "loadSurfaceLayerNav$", void 0);
SurfaceLayerEffects = __decorate([
    core_1.Injectable()
], SurfaceLayerEffects);
exports.SurfaceLayerEffects = SurfaceLayerEffects;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VyZmFjZS1sYXllci5lZmZlY3RzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3N0b3JlL3N1cmZhY2UtbGF5ZXIvc3RhdGUvc3VyZmFjZS1sYXllci5lZmZlY3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBQTJDO0FBQzNDLDJDQUF3RDtBQUd4RCx5REFBaUU7QUFDakUsK0JBQXNDO0FBQ3RDLDhDQUF3RjtBQUV4RixpREFBbUQ7QUFDbkQsMEVBQWtHO0FBQ2xHLHVFQUFnRTtBQUNoRSw4RUFBd0U7QUFDeEUsaUdBQTBGO0FBQzFGLDhFQUE4RztBQUM5RyxxSEFBOEg7QUFDOUgsbUdBQTZHO0FBQzdHLG9GQUFvRjtBQUVwRixtRUFlaUM7QUFJakMsSUFBYSxtQkFBbUIsR0FBaEMsTUFBYSxtQkFBbUI7SUFrRzlCLFlBQ21CLFFBQWlCLEVBQ2pCLG1CQUF3QyxFQUN4QyxrQkFBc0M7UUFGdEMsYUFBUSxHQUFSLFFBQVEsQ0FBUztRQUNqQix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFuRy9DLHVCQUFrQixHQUF1QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FDbkUsZ0JBQU0sQ0FBQywrQ0FBdUIsQ0FBQyxpQkFBaUIsQ0FBQyxFQUNqRCxxQkFBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQ1osSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FDbEMsZUFBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxnREFBd0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUMvQyx1QkFBVyxDQUFDLE9BQU8sRUFBRSxJQUFJLGdEQUF3QixFQUFFLENBQUMsQ0FDckQsQ0FDRixDQUNGLENBQUM7UUFF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