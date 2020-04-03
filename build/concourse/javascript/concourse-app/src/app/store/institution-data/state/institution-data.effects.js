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
const institution_data_actions_1 = require("./institution-data.actions");
let InstitutionDataEffects = class InstitutionDataEffects {
    constructor(actions$, instApi) {
        this.actions$ = actions$;
        this.instApi = instApi;
        this.loadInstitutionsData$ = this.actions$.pipe(effects_1.ofType(institution_data_actions_1.InstitutionDataActionTypes.LoadInstitutionsData), operators_2.map((action) => action.payload), operators_2.switchMap(payload => this.instApi.list(payload).pipe(operators_2.map(data => new institution_data_actions_1.LoadInstitutionsDataSuccess(data)), operators_1.handleError('toast', new institution_data_actions_1.LoadInstitutionsDataFailure()))));
        this.loadInstitutionData$ = this.actions$.pipe(effects_1.ofType(institution_data_actions_1.InstitutionDataActionTypes.LoadInstitutionData), operators_2.map((action) => action.payload), operators_2.switchMap(({ params, uri }) => this.instApi.get(params, uri).pipe(operators_2.map(data => new institution_data_actions_1.LoadInstitutionDataSuccess(data)), operators_1.handleError('toast', new institution_data_actions_1.LoadInstitutionDataFailure()))));
        this.createInstitutionData$ = this.actions$.pipe(effects_1.ofType(institution_data_actions_1.InstitutionDataActionTypes.CreateInstitutionData), operators_2.map((action) => action.payload), operators_2.exhaustMap(({ params, data: payload }) => this.instApi.create(params, payload).pipe(operators_2.mergeMap(data => [
            new institution_data_actions_1.CreateInstitutionDataSuccess(data),
            new toast_actions_1.OpenToast({ message: 'Data Created', type: 'success' }),
            ...(params.dataDomain === 'INSTITUTION' ? [new router_actions_1.RouterGo({ path: ['/institution', data.uri] })] : []),
            new modal_1.CloseModal()
        ]), operators_1.handleError('form', new institution_data_actions_1.CreateInstitutionDataFailure()))));
        this.updateInstitutionData$ = this.actions$.pipe(effects_1.ofType(institution_data_actions_1.InstitutionDataActionTypes.UpdateInstitutionData), operators_2.map((action) => action.payload), operators_2.concatMap(({ params, data }) => this.instApi.update(params, data).pipe(operators_2.mergeMap(response => [
            new institution_data_actions_1.UpdateInstitutionDataSuccess(response),
            new toast_actions_1.OpenToast({ message: 'Data Updated', type: 'success' })
        ]), operators_1.handleError('form', new institution_data_actions_1.UpdateInstitutionDataFailure()))));
        this.deleteInstitutionData$ = this.actions$.pipe(effects_1.ofType(institution_data_actions_1.InstitutionDataActionTypes.DeleteInstitutionData), operators_2.map((action) => action.payload), operators_2.concatMap(({ params, uri }) => this.instApi.delete(params, uri).pipe(operators_2.mergeMap(() => [
            new institution_data_actions_1.DeleteInstitutionDataSuccess(uri),
            new toast_actions_1.OpenToast({ message: 'Data Deleted', type: 'success' }),
            new modal_1.CloseModal(),
            ...(params.dataDomain === 'INSTITUTION' ? [new router_actions_1.RouterGo({ path: ['/institution/data'] })] : [])
        ]), operators_1.handleError('form', new institution_data_actions_1.DeleteInstitutionDataFailure()))));
        // routing effects
        this.loadInstitutionDatasNav$ = this.actions$.pipe(operators_1.ofRoute(['/institution/data']), operators_2.map((action) => action.payload), operators_2.mergeMap(route => [
            new institution_data_actions_1.LoadInstitutionsData({ dataDomain: 'INSTITUTION' }),
            new institution_data_actions_1.SelectInstitutionData(undefined)
        ]));
        this.loadInstitutionDataNav$ = this.actions$.pipe(operators_1.ofRoute(['/institution/data/:uri']), operators_2.map((action) => action.payload), operators_2.mergeMap(route => [
            new institution_data_actions_1.LoadInstitutionData({ params: { dataDomain: 'INSTITUTION' }, uri: route.params['uri'] }),
            new institution_data_actions_1.SelectInstitutionData(route.params['uri'])
        ]));
        this.loadInsightsDataNav$ = this.actions$.pipe(operators_1.ofRoute(['/insights']), operators_2.mergeMap(_ => [
            new institution_data_actions_1.LoadInstitutionData({ params: { dataDomain: 'INSTITUTION' }, uri: 'insights-urls' }),
            new institution_data_actions_1.SelectInstitutionData('insights-urls')
        ]));
        this.loadAzureData$ = this.actions$.pipe(effects_1.ofType(institution_data_actions_1.InstitutionDataActionTypes.LoadAzureData), operators_2.map((action) => action.payload), operators_2.mergeMap(type => this.instApi.getAzureData(type).pipe(operators_2.map(data => ({ type, data })), operators_2.map(data => new institution_data_actions_1.LoadAzureDataSuccess(data)), operators_1.handleError('toast', new institution_data_actions_1.LoadAzureDataFailure()))));
    }
};
__decorate([
    effects_1.Effect()
], InstitutionDataEffects.prototype, "loadInstitutionsData$", void 0);
__decorate([
    effects_1.Effect()
], InstitutionDataEffects.prototype, "loadInstitutionData$", void 0);
__decorate([
    effects_1.Effect()
], InstitutionDataEffects.prototype, "createInstitutionData$", void 0);
__decorate([
    effects_1.Effect()
], InstitutionDataEffects.prototype, "updateInstitutionData$", void 0);
__decorate([
    effects_1.Effect()
], InstitutionDataEffects.prototype, "deleteInstitutionData$", void 0);
__decorate([
    effects_1.Effect()
], InstitutionDataEffects.prototype, "loadInstitutionDatasNav$", void 0);
__decorate([
    effects_1.Effect()
], InstitutionDataEffects.prototype, "loadInstitutionDataNav$", void 0);
__decorate([
    effects_1.Effect()
], InstitutionDataEffects.prototype, "loadInsightsDataNav$", void 0);
__decorate([
    effects_1.Effect()
], InstitutionDataEffects.prototype, "loadAzureData$", void 0);
InstitutionDataEffects = __decorate([
    core_1.Injectable()
], InstitutionDataEffects);
exports.InstitutionDataEffects = InstitutionDataEffects;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zdGl0dXRpb24tZGF0YS5lZmZlY3RzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3N0b3JlL2luc3RpdHV0aW9uLWRhdGEvc3RhdGUvaW5zdGl0dXRpb24tZGF0YS5lZmZlY3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBQTJDO0FBQzNDLDJDQUF3RDtBQUd4RCx5REFBaUU7QUFFakUsOENBQWlGO0FBRWpGLGlEQUFtRDtBQUNuRCwwRUFBK0U7QUFDL0UsdUVBQWdFO0FBRWhFLHlFQXFCb0M7QUFHcEMsSUFBYSxzQkFBc0IsR0FBbkMsTUFBYSxzQkFBc0I7SUE2R2pDLFlBQ21CLFFBQWlCLEVBQ2pCLE9BQStCO1FBRC9CLGFBQVEsR0FBUixRQUFRLENBQVM7UUFDakIsWUFBTyxHQUFQLE9BQU8sQ0FBd0I7UUE3R3hDLDBCQUFxQixHQUF1QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FDdEUsZ0JBQU0sQ0FBQyxxREFBMEIsQ0FBQyxvQkFBb0IsQ0FBQyxFQUN2RCxlQUFHLENBQUMsQ0FBQyxNQUE0QixFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQ3JELHFCQUFTLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FDbEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUM3QixlQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLHNEQUEyQixDQUFDLElBQUksQ0FBQyxDQUFDLEVBQ2xELHVCQUFXLENBQUMsT0FBTyxFQUFFLElBQUksc0RBQTJCLEVBQUUsQ0FBQyxDQUN4RCxDQUNGLENBQ0YsQ0FBQztRQUVRLHlCQUFvQixHQUF1QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FDckUsZ0JBQU0sQ0FBQyxxREFB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