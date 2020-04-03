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
const operators_1 = require("rxjs/operators");
const modal_1 = require("@concourse/core/modal");
const operators_2 = require("@concourse/core/operators");
const toast_actions_1 = require("@concourse/core/toast/toast.actions");
const helpers_1 = require("@concourse/shared/helpers");
const surface_layer_actions_1 = require("@concourse/store/surface-layer/state/surface-layer.actions");
const surface_actions_1 = require("./surface.actions");
let SurfaceEffects = class SurfaceEffects {
    constructor(actions$, surfaceService) {
        this.actions$ = actions$;
        this.surfaceService = surfaceService;
        this.loadSurfaces$ = this.actions$.pipe(effects_1.ofType(surface_actions_1.SurfaceActionTypes.LoadSurfaces), operators_1.switchMap(_ => this.surfaceService.list().pipe(operators_1.mergeMap(data => {
            const sorted = data.sort((a, b) => a.id - b.id);
            const first = sorted.filter(item => item.isAssociated).shift();
            return [
                // This sort is temporary, The sorting issue from the backend will be fixed soon.
                new surface_actions_1.LoadSurfacesSuccess(sorted),
                ...(!helpers_1.Util.isUndefined(first) ? [new surface_actions_1.SelectSurface(first.id)] : [])
            ];
        }), operators_2.handleError('toast', new surface_actions_1.LoadSurfacesFailure()))));
        this.loadSurface$ = this.actions$.pipe(effects_1.ofType(surface_actions_1.SurfaceActionTypes.LoadSurface), operators_1.map((action) => action.payload), operators_1.switchMap(payload => this.surfaceService.get(payload).pipe(operators_1.mergeMap(data => [
            new surface_actions_1.LoadSurfaceSuccess(data),
            new surface_actions_1.SelectSurface(payload)
        ]), operators_2.handleError('toast', new surface_actions_1.LoadSurfaceFailure()))));
        this.createSurface$ = this.actions$.pipe(effects_1.ofType(surface_actions_1.SurfaceActionTypes.CreateSurface), operators_1.map((action) => action.payload), operators_1.exhaustMap(({ newSurface, createGroup }) => this.surfaceService.create(newSurface, createGroup).pipe(operators_1.mergeMap(data => [
            new surface_actions_1.SelectSurface(data.id),
            new surface_actions_1.CreateSurfaceSuccess(data),
            new surface_layer_actions_1.LoadSurfaceLayers(),
            new toast_actions_1.OpenToast({ message: 'Surface Created Successfully', type: 'success' }),
            new modal_1.CloseModal()
        ]), operators_2.handleError('form', new surface_actions_1.CreateSurfaceFailure()))));
        this.updateSurface$ = this.actions$.pipe(effects_1.ofType(surface_actions_1.SurfaceActionTypes.UpdateSurface), operators_1.map((action) => action.payload), operators_1.exhaustMap(payload => this.surfaceService.update(payload).pipe(operators_1.mergeMap(data => [
            new surface_actions_1.UpdateSurfaceSuccess(data),
            new toast_actions_1.OpenToast({ message: 'Surface Updated Successfully', type: 'success' }),
            new surface_layer_actions_1.LoadSurfaceLayers(),
            new modal_1.CloseModal()
        ]), operators_2.handleError('toast', new surface_actions_1.UpdateSurfaceFailure()))));
        this.deleteSurface$ = this.actions$.pipe(effects_1.ofType(surface_actions_1.SurfaceActionTypes.DeleteSurface), operators_1.map((action) => action.payload), operators_1.concatMap(payload => this.surfaceService.delete(payload).pipe(operators_1.mergeMap(_ => [
            new surface_actions_1.DeleteSurfaceSuccess(payload),
            new toast_actions_1.OpenToast({ message: 'Surface Deleted Successfully', type: 'success' }),
            new modal_1.CloseModal()
        ]), operators_2.handleError('form', new surface_actions_1.DeleteSurfaceFailure()))));
    }
};
__decorate([
    effects_1.Effect()
], SurfaceEffects.prototype, "loadSurfaces$", void 0);
__decorate([
    effects_1.Effect()
], SurfaceEffects.prototype, "loadSurface$", void 0);
__decorate([
    effects_1.Effect()
], SurfaceEffects.prototype, "createSurface$", void 0);
__decorate([
    effects_1.Effect()
], SurfaceEffects.prototype, "updateSurface$", void 0);
__decorate([
    effects_1.Effect()
], SurfaceEffects.prototype, "deleteSurface$", void 0);
SurfaceEffects = __decorate([
    core_1.Injectable()
], SurfaceEffects);
exports.SurfaceEffects = SurfaceEffects;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VyZmFjZS5lZmZlY3RzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3N0b3JlL3N1cmZhY2Uvc3RhdGUvc3VyZmFjZS5lZmZlY3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBQTJDO0FBQzNDLDJDQUF3RDtBQUl4RCw4Q0FBaUY7QUFFakYsaURBQW1EO0FBQ25ELHlEQUF3RDtBQUN4RCx1RUFBZ0U7QUFDaEUsdURBQWlEO0FBQ2pELHNHQUErRjtBQUUvRix1REFpQjJCO0FBRzNCLElBQWEsY0FBYyxHQUEzQixNQUFhLGNBQWM7SUFrRnpCLFlBQ21CLFFBQWlCLEVBQ2pCLGNBQThCO1FBRDlCLGFBQVEsR0FBUixRQUFRLENBQVM7UUFDakIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBbEZ2QyxrQkFBYSxHQUF1QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FDOUQsZ0JBQU0sQ0FBQyxvQ0FBa0IsQ0FBQyxZQUFZLENBQUMsRUFDdkMscUJBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUNaLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUM3QixvQkFBUSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ2QsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2hELE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDL0QsT0FBTztnQkFDTCxpRkFBaUY7Z0JBQ2pGLElBQUkscUNBQW1C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