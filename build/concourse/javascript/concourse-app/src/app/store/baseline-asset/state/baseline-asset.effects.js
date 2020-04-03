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
const attribute_tag_actions_1 = require("@concourse/store/attribute-tag/state/attribute-tag.actions");
const catalog_service_actions_1 = require("@concourse/store/catalog-service/state/catalog-service.actions");
const baseline_asset_actions_1 = require("./baseline-asset.actions");
let BaselineAssetEffects = class BaselineAssetEffects {
    constructor(actions$, baselineAssetService) {
        this.actions$ = actions$;
        this.baselineAssetService = baselineAssetService;
        this.list$ = this.actions$.pipe(effects_1.ofType(baseline_asset_actions_1.ActionTypes.LoadBaselineAssets), operators_2.switchMap(_ => this.baselineAssetService.list().pipe(operators_2.map(baselineAssets => new baseline_asset_actions_1.LoadBaselineAssetsSuccess(baselineAssets)), operators_1.handleError('toast', new baseline_asset_actions_1.LoadBaselineAssetsFailure()))));
        this.listBypagination$ = this.actions$.pipe(effects_1.ofType(baseline_asset_actions_1.ActionTypes.LoadBaselineAssetsByPagination), operators_2.map((action) => action.payload), operators_2.concatMap(payload => this.baselineAssetService.paginatedList(payload.size, payload.page).pipe(operators_2.map(baselineAssets => new baseline_asset_actions_1.LoadBaselineAssetsByPaginationSuccess(baselineAssets)), operators_1.handleError('toast', new baseline_asset_actions_1.LoadBaselineAssetsByPaginationFailure()))));
        this.loadBaselineAsset$ = this.actions$.pipe(effects_1.ofType(baseline_asset_actions_1.ActionTypes.LoadBaselineAsset), operators_2.map((action) => action.payload), operators_2.switchMap(payload => this.baselineAssetService.get(payload).pipe(operators_2.mergeMap(baselineAsset => [
            new baseline_asset_actions_1.LoadBaselineAssetSuccess(baselineAsset),
        ]), operators_1.handleError('toast', new baseline_asset_actions_1.LoadBaselineAssetFailure()))));
        this.create$ = this.actions$.pipe(effects_1.ofType(baseline_asset_actions_1.ActionTypes.CreateBaselineAsset), operators_2.map((action) => action.payload), operators_2.switchMap(payload => this.baselineAssetService.create(payload.form, payload.versionBump).pipe(operators_2.mergeMap(baselineAssets => [
            new baseline_asset_actions_1.CreateBaselineAssetSuccess(baselineAssets),
            new toast_actions_1.OpenToast({ message: 'Baseline Created', type: 'success' }),
            new modal_1.CloseModal(),
            new router_actions_1.RouterGo({ path: [`/baseline-assets/${baselineAssets.id}`] })
        ]), operators_1.handleError('toast', new baseline_asset_actions_1.CreateBaselineAssetFailure()))));
        this.update$ = this.actions$.pipe(effects_1.ofType(baseline_asset_actions_1.ActionTypes.UpdateBaselineAsset), operators_2.map((action) => action.payload), operators_2.switchMap(payload => this.baselineAssetService.update(payload).pipe(operators_2.mergeMap(baselineAsset => [
            new baseline_asset_actions_1.UpdateBaselineAssetSuccess(baselineAsset),
            new toast_actions_1.OpenToast({ message: 'Baseline Updated', type: 'success' }),
            new modal_1.CloseModal()
        ]), operators_1.handleError('toast', new baseline_asset_actions_1.UpdateBaselineAssetFailure()))));
        this.updateAzure$ = this.actions$.pipe(effects_1.ofType(baseline_asset_actions_1.ActionTypes.UpdateBaselineAzure), operators_2.map((action) => action.payload), operators_2.switchMap(payload => this.baselineAssetService.updateAzure(payload.id, payload.baseline).pipe(operators_2.mergeMap(baselineAsset => [
            new baseline_asset_actions_1.UpdateBaselineAssetSuccess(baselineAsset),
            new toast_actions_1.OpenToast({ message: 'Baseline Updated', type: 'success' }),
            new baseline_asset_actions_1.LoadBaselineAsset(baselineAsset.id),
            new modal_1.CloseModal()
        ]), operators_1.handleError('toast', new baseline_asset_actions_1.UpdateBaselineAssetFailure()))));
        this.updateAws$ = this.actions$.pipe(effects_1.ofType(baseline_asset_actions_1.ActionTypes.UpdateBaselineAws), operators_2.map((action) => action.payload), operators_2.switchMap(payload => this.baselineAssetService.updateAWS(payload.id, payload.baseline).pipe(operators_2.mergeMap(baselineAsset => [
            new baseline_asset_actions_1.UpdateBaselineAssetSuccess(baselineAsset),
            new toast_actions_1.OpenToast({ message: 'Baseline Updated', type: 'success' }),
            new baseline_asset_actions_1.LoadBaselineAsset(baselineAsset.id),
            new modal_1.CloseModal()
        ]), operators_1.handleError('toast', new baseline_asset_actions_1.UpdateBaselineAssetFailure()))));
        this.delete$ = this.actions$.pipe(effects_1.ofType(baseline_asset_actions_1.ActionTypes.DeleteBaselineAsset), operators_2.map((action) => action.payload), operators_2.switchMap(payload => this.baselineAssetService.delete(payload).pipe(operators_2.mergeMap(() => [
            new baseline_asset_actions_1.DeleteBaselineAssetSuccess(payload),
            new toast_actions_1.OpenToast({ message: 'Baseline Deleted', type: 'success' }),
            new modal_1.CloseModal(),
            new router_actions_1.RouterGo({ path: ['/baseline-assets'] })
        ]), operators_1.handleError('toast', new baseline_asset_actions_1.DeleteBaselineAssetFailure()))));
        this.loadContent$ = this.actions$.pipe(effects_1.ofType(baseline_asset_actions_1.ActionTypes.LoadBaselineAssetContent), operators_2.map((action) => action.payload), operators_2.switchMap(id => this.baselineAssetService.getContent(id).pipe(operators_2.mergeMap(sum => [
            new baseline_asset_actions_1.LoadBaselineAssetContentSuccess(sum)
        ]), operators_1.handleError('toast', new baseline_asset_actions_1.LoadBaselineAssetContentFailure()))));
        this.loadStata$ = this.actions$.pipe(effects_1.ofType(baseline_asset_actions_1.ActionTypes.LoadBaselineAssetStats), operators_2.map((action) => action.payload), operators_2.switchMap(id => this.baselineAssetService.getStats(id).pipe(operators_2.mergeMap(stat => [
            new baseline_asset_actions_1.LoadBaselineAssetStatsSuccess(stat)
        ]), operators_1.handleError('toast', new baseline_asset_actions_1.LoadBaselineAssetStatsFailure()))));
        this.loadOverview$ = this.actions$.pipe(effects_1.ofType(baseline_asset_actions_1.ActionTypes.LoadBaselineAssetOverview), operators_2.map((action) => action.payload), operators_2.switchMap(id => this.baselineAssetService.getOverview(id).pipe(operators_2.mergeMap(over => [
            new baseline_asset_actions_1.LoadBaselineAssetOverviewSuccess(over)
        ]), operators_1.handleError('toast', new baseline_asset_actions_1.LoadBaselineAssetOverviewFailure()))));
        // routing effects
        this.loadListOnNav$ = this.actions$.pipe(operators_1.ofRoute(['/baseline-assets'], false), operators_2.mergeMap(_ => [
            // new LoadBaselineAssets(),
            new baseline_asset_actions_1.LoadBaselineAssetsByPagination({ page: '0', size: '200' }),
            new attribute_tag_actions_1.LoadAttributeTags(),
            new catalog_service_actions_1.LoadAzureSubscriptions(),
            new catalog_service_actions_1.LoadAzureResourceGroups()
        ]));
        this.loadDetailsOnNav$ = this.actions$.pipe(operators_1.ofRoute(['/baseline-assets/:id']), operators_2.map((action) => action.payload), operators_2.map(route => +route.params['id']), operators_2.mergeMap(id => [
            new baseline_asset_actions_1.LoadBaselineAssets(),
            new baseline_asset_actions_1.LoadBaselineAsset(id),
            new baseline_asset_actions_1.LoadBaselineAssetStats(id),
            new baseline_asset_actions_1.LoadBaselineAssetContent(id),
            new baseline_asset_actions_1.LoadBaselineAssetOverview(id),
            new attribute_tag_actions_1.LoadAttributeTags(),
            new baseline_asset_actions_1.SelectBaselineAsset(id)
        ]));
    }
};
__decorate([
    effects_1.Effect()
], BaselineAssetEffects.prototype, "list$", void 0);
__decorate([
    effects_1.Effect()
], BaselineAssetEffects.prototype, "listBypagination$", void 0);
__decorate([
    effects_1.Effect()
], BaselineAssetEffects.prototype, "loadBaselineAsset$", void 0);
__decorate([
    effects_1.Effect()
], BaselineAssetEffects.prototype, "create$", void 0);
__decorate([
    effects_1.Effect()
], BaselineAssetEffects.prototype, "update$", void 0);
__decorate([
    effects_1.Effect()
], BaselineAssetEffects.prototype, "updateAzure$", void 0);
__decorate([
    effects_1.Effect()
], BaselineAssetEffects.prototype, "updateAws$", void 0);
__decorate([
    effects_1.Effect()
], BaselineAssetEffects.prototype, "delete$", void 0);
__decorate([
    effects_1.Effect()
], BaselineAssetEffects.prototype, "loadContent$", void 0);
__decorate([
    effects_1.Effect()
], BaselineAssetEffects.prototype, "loadStata$", void 0);
__decorate([
    effects_1.Effect()
], BaselineAssetEffects.prototype, "loadOverview$", void 0);
__decorate([
    effects_1.Effect()
], BaselineAssetEffects.prototype, "loadListOnNav$", void 0);
__decorate([
    effects_1.Effect()
], BaselineAssetEffects.prototype, "loadDetailsOnNav$", void 0);
BaselineAssetEffects = __decorate([
    core_1.Injectable()
], BaselineAssetEffects);
exports.BaselineAssetEffects = BaselineAssetEffects;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZWxpbmUtYXNzZXQuZWZmZWN0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zdG9yZS9iYXNlbGluZS1hc3NldC9zdGF0ZS9iYXNlbGluZS1hc3NldC5lZmZlY3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBQTJDO0FBQzNDLDJDQUF3RDtBQUd4RCx5REFBaUU7QUFFakUsOENBQXFFO0FBRXJFLGlEQUFtRDtBQUNuRCwwRUFBK0U7QUFDL0UsdUVBQWdFO0FBQ2hFLHNHQUErRjtBQUMvRiw0R0FBaUk7QUFFakkscUVBZ0NrQztBQUdsQyxJQUFhLG9CQUFvQixHQUFqQyxNQUFhLG9CQUFvQjtJQXdKL0IsWUFDbUIsUUFBaUIsRUFDakIsb0JBQTBDO1FBRDFDLGFBQVEsR0FBUixRQUFRLENBQVM7UUFDakIseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQXhKbkQsVUFBSyxHQUF1QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FDdEQsZ0JBQU0sQ0FBQyxvQ0FBVyxDQUFDLGtCQUFrQixDQUFDLEVBQ3RDLHFCQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUNsRCxlQUFHLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxJQUFJLGtEQUF5QixDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQ3BFLHVCQUFXLENBQUMsT0FBTyxFQUFFLElBQUksa0RBQXlCLEVBQUUsQ0FBQyxDQUN0RCxDQUFDLENBQ0gsQ0FBQztRQUVRLHNCQUFpQixHQUF1QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FDbEUsZ0JBQU0sQ0FBQyxvQ0FBVyxDQUFDLDhCQUE4QixDQUFDLEVBQ2xELGVBQUcsQ0FBQyxDQUFDLE1BQXNDLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFDL0QscUJBQVMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUMzRixlQUFHLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxJQUFJLDhEQUFxQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQ2hGLHVCQUFXLENBQUMsT0FBTyxFQUFFLElBQUksOERBQXFDLEVBQUUsQ0FBQyxDQUNsRSxDQUFDLENBQ0gsQ0FBQztRQUVRLHVCQUFrQixHQUF1QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FDbkUsZ0JBQU0sQ0FBQyxvQ0FBVyxDQUFDLGlCQUFpQixDQUFDLEVBQ3JDLGVBQUcsQ0FBQyxDQUFDLE1BQXlCLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFDbEQscUJBQVMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUM5RCxvQkFBUSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUM7WUFDeEIsSUFBSSxpREFBd0IsQ0FBQyxhQUFhLENBQUM7U0FDNUMsQ0FBQyxFQUNGLHVCQUFXLENBQUMsT0FBTyxFQUFFLElBQUksaURBQXdCLEVBQUUsQ0FBQyxDQUNyRCxDQUFDLENBQ0gsQ0FBQztRQUVRLFlBQU8sR0FBdUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQ3hELGdCQUFNLENBQUMsb0NBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxFQUN2QyxlQUFHLENBQUMsQ0FBQyxNQUEyQixFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQ3BELHFCQUFTLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FDM0Ysb0JBQVEsQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDO1lBQ3pCLElBQUksbURBQTBCLENBQUMsY0FBYyxDQUFDO1lBQzlDLElBQUkseUJBQVMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUM7WUFDL0QsSUFBSSxrQkFBVSxFQUFFO1lBQ2hCLElBQUkseUJBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLG9CQUFvQixjQUFjLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDO1NBQ2xFLENBQUMsRUFDRix1QkFBVyxDQUFDLE9BQU8sRUFBRSxJQUFJLG1EQUEwQixFQUFFLENBQUMsQ0FDdkQsQ0FBQyxDQUNILENBQUM7UUFDUSxZQUFPLEdBQXVCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUN4RCxnQkFBTSxDQUFDLG9DQUFXLENBQUMsbUJBQW1CLENBQUMsRUFDdkMsZUFBRyxDQUFDLENBQUMsTUFBMkIsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUNwRCxxQkFBUyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQ2pFLG9CQUFRLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQztZQUN4QixJQUFJLG1EQUEwQixDQUFDLGFBQWEsQ0FBQztZQUM3QyxJQUFJLHlCQUFTLENBQUMsRUFBRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDO1lBQy9ELElBQUksa0JBQVUsRUFBRTtTQUNqQixDQUFDLEVBQ0YsdUJBQVcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxtREFBMEIsRUFBRSxDQUFDLENBQ3ZELENBQUMsQ0FDSCxDQUFDO1FBQ1EsaUJBQVksR0FBdUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQzdELGdCQUFNLENBQUMsb0NBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxFQUN2QyxlQUFHLENBQUMsQ0FBQyxNQUEyQixFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQ3BELHFCQUFTLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FDM0Ysb0JBQVEsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDO1lBQ3hCLElBQUksbURBQTBCLENBQUMsYUFBYSxDQUFDO1lBQzdDLElBQUkseUJBQVMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUM7WUFDL0QsSUFBSSwwQ0FBaUIsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDO1lBQ3ZDLElBQUksa0JBQVUsRUFBRTtTQUNqQixDQUFDLEVBQ0YsdUJBQVcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxtREFBMEIsRUFBRSxDQUFDLENBQ3ZELENBQUMsQ0FDSCxDQUFDO1FBQ1EsZUFBVSxHQUF1QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FDM0QsZ0JBQU0sQ0FBQyxvQ0FBVyxDQUFDLGlCQUFpQixDQUFDLEVBQ3JDLGVBQUcsQ0FBQyxDQUFDLE1BQXlCLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFDbEQscUJBQVMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUN6RixvQkFBUSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUM7WUFDeEIsSUFBSSxtREFBMEIsQ0FBQyxhQUFhLENBQUM7WUFDN0MsSUFBSSx5QkFBUyxDQUFDLEVBQUUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQztZQUMvRCxJQUFJLDBDQUFpQixDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUM7WUFDdkMsSUFBSSxrQkFBVSxFQUFFO1NBQ2pCLENBQUMsRUFDRix1QkFBVyxDQUFDLE9BQU8sRUFBRSxJQUFJLG1EQUEwQixFQUFFLENBQUMsQ0FDdkQsQ0FBQyxDQUNILENBQUM7UUFDUSxZQUFPLEdBQXVCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUN4RCxnQkFBTSxDQUFDLG9DQUFXLENBQUMsbUJBQW1CLENBQUMsRUFDdkMsZUFBRyxDQUFDLENBQUMsTUFBMkIsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUNwRCxxQkFBUyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQ2pFLG9CQUFRLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDYixJQUFJLG1EQUEwQixDQUFDLE9BQU8sQ0FBQztZQUN2QyxJQUFJLHlCQUFTLENBQUMsRUFBRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDO1lBQy9ELElBQUksa0JBQVUsRUFBRTtZQUNoQixJQUFJLHlCQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLENBQUM7U0FDN0MsQ0FBQyxFQUNGLHVCQUFXLENBQUMsT0FBTyxFQUFFLElBQUksbURBQTBCLEVBQUUsQ0FBQyxDQUN2RCxDQUFDLENBQ0gsQ0FBQztRQUNRLGlCQUFZLEdBQXVCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUM3RCxnQkFBTSxDQUFDLG9DQUFXLENBQUMsd0JBQXdCLENBQUMsRUFDNUMsZUFBRyxDQUFDLENBQUMsTUFBZ0MsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUN6RCxxQkFBUyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQzNELG9CQUFRLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUNkLElBQUksd0RBQStCLENBQUMsR0FBRyxDQUFDO1NBQ3pDLENBQUMsRUFDRix1QkFBVyxDQUFDLE9BQU8sRUFBRSxJQUFJLHdEQUErQixFQUFFLENBQUMsQ0FDNUQsQ0FBQyxDQUNILENBQUM7UUFFUSxlQUFVLEdBQXVCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUMzRCxnQkFBTSxDQUFDLG9DQUFXLENBQUMsc0JBQXNCLENBQUMsRUFDMUMsZUFBRyxDQUFDLENBQUMsTUFBOEIsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUN2RCxxQkFBUyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQ3pELG9CQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUNmLElBQUksc0RBQTZCLENBQUMsSUFBSSxDQUFDO1NBQ3hDLENBQUMsRUFDRix1QkFBVyxDQUFDLE9BQU8sRUFBRSxJQUFJLHNEQUE2QixFQUFFLENBQUMsQ0FDMUQsQ0FBQyxDQUNILENBQUM7UUFFUSxrQkFBYSxHQUF1QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FDOUQsZ0JBQU0sQ0FBQyxvQ0FBVyxDQUFDLHlCQUF5QixDQUFDLEVBQzdDLGVBQUcsQ0FBQyxDQUFDLE1BQWlDLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFDMUQscUJBQVMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUM1RCxvQkFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDZixJQUFJLHlEQUFnQyxDQUFDLElBQUksQ0FBQztTQUMzQyxDQUFDLEVBQ0YsdUJBQVcsQ0FBQyxPQUFPLEVBQUUsSUFBSSx5REFBZ0MsRUFBRSxDQUFDLENBQzdELENBQUMsQ0FDSCxDQUFDO1FBQ0Ysa0JBQWtCO1FBQ1IsbUJBQWMsR0FBdUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQy9ELG1CQUFPLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLEtBQUssQ0FBQyxFQUNwQyxvQkFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDWiw0QkFBNEI7WUFDNUIsSUFBSSx1REFBOEIsQ0FBQyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDO1lBQzlELElBQUkseUNBQWlCLEVBQUU7WUFDdkIsSUFBSSxnREFBc0IsRUFBRTtZQUM1QixJQUFJLGlEQUF1QixFQUFFO1NBQzlCLENBQUMsQ0FDSCxDQUFDO1FBQ1Esc0JBQWlCLEdBQXVCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUNsRSxtQkFBTyxDQUFDLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxFQUNqQyxlQUFHLENBQUMsQ0FBQyxNQUFvQixFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQzdDLGVBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUNqQyxvQkFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7WUFDYixJQUFJLDJDQUFrQixFQUFFO1lBQ3hCLElBQUksMENBQWlCLENBQUMsRUFBRSxDQUFDO1lBQ3pCLElBQUksK0NBQXNCLENBQUMsRUFBRSxDQUFDO1lBQzlCLElBQUksaURBQXdCLENBQUMsRUFBRSxDQUFDO1lBQ2hDLElBQUksa0RBQXlCLENBQUMsRUFBRSxDQUFDO1lBQ2pDLElBQUkseUNBQWlCLEVBQUU7WUFDdkIsSUFBSSw0Q0FBbUIsQ0FBQyxFQUFFLENBQUM7U0FDNUIsQ0FBQyxDQUNILENBQUM7SUFLRSxDQUFDO0NBQ04sQ0FBQTtBQTFKVztJQUFULGdCQUFNLEVBQUU7bURBTVA7QUFFUTtJQUFULGdCQUFNLEVBQUU7K0RBT1A7QUFFUTtJQUFULGdCQUFNLEVBQUU7Z0VBU1A7QUFFUTtJQUFULGdCQUFNLEVBQUU7cURBWVA7QUFDUTtJQUFULGdCQUFNLEVBQUU7cURBV1A7QUFDUTtJQUFULGdCQUFNLEVBQUU7MERBWVA7QUFDUTtJQUFULGdCQUFNLEVBQUU7d0RBWVA7QUFDUTtJQUFULGdCQUFNLEVBQUU7cURBWVA7QUFDUTtJQUFULGdCQUFNLEVBQUU7MERBU1A7QUFFUTtJQUFULGdCQUFNLEVBQUU7d0RBU1A7QUFFUTtJQUFULGdCQUFNLEVBQUU7MkRBU1A7QUFFUTtJQUFULGdCQUFNLEVBQUU7NERBU1A7QUFDUTtJQUFULGdCQUFNLEVBQUU7K0RBYVA7QUF0SlMsb0JBQW9CO0lBRGhDLGlCQUFVLEVBQUU7R0FDQSxvQkFBb0IsQ0E0SmhDO0FBNUpZLG9EQUFvQiJ9