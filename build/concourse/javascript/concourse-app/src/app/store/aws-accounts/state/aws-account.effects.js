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
const surface_actions_1 = require("@concourse/store/surface/state/surface.actions");
const aws_account_actions_1 = require("./aws-account.actions");
let AwsAccountEffects = class AwsAccountEffects {
    constructor(actions$, awsAccountFacade, awsAccountApi) {
        this.actions$ = actions$;
        this.awsAccountFacade = awsAccountFacade;
        this.awsAccountApi = awsAccountApi;
        this.loadAwsAccounts$ = this.actions$.pipe(effects_1.ofType(aws_account_actions_1.ActionTypes.LoadAwsAccounts), operators_2.switchMap(_ => this.awsAccountApi.list().pipe(operators_2.map(data => new aws_account_actions_1.LoadAwsAccountsSuccess(data)), operators_1.handleError('toast', new aws_account_actions_1.LoadAwsAccountFailure()))));
        this.loadAwsAccount$ = this.actions$.pipe(effects_1.ofType(aws_account_actions_1.ActionTypes.LoadAwsAccount), operators_2.map((action) => action.payload), operators_2.switchMap(payload => this.awsAccountApi.get(payload).pipe(operators_2.map(data => new aws_account_actions_1.LoadAwsAccountSuccess(data)), operators_1.handleError('toast', new aws_account_actions_1.LoadAwsAccountFailure()))));
        this.createAwsAccount$ = this.actions$.pipe(effects_1.ofType(aws_account_actions_1.ActionTypes.CreateAwsAccount), operators_2.map((action) => action.payload), operators_2.exhaustMap(payload => this.awsAccountApi.create(payload).pipe(operators_2.mergeMap(data => [
            new aws_account_actions_1.CreateAwsAccountSuccess(data),
            new modal_1.CloseModal(),
            new toast_actions_1.OpenToast({ message: 'Aws Account Created Successfully', type: 'success' })
        ]), operators_1.handleError('form', new aws_account_actions_1.CreateAwsAccountFailure()))));
        this.deleteAwsAccount$ = this.actions$.pipe(effects_1.ofType(aws_account_actions_1.ActionTypes.DeleteAwsAccount), operators_2.map((action) => action.payload), operators_2.concatMap(payload => this.awsAccountApi.delete(payload).pipe(operators_2.mergeMap(_ => [
            new aws_account_actions_1.DeleteAwsAccountSuccess(payload),
            new toast_actions_1.OpenToast({ message: 'Aws Account Deleted Successfully', type: 'success' }),
            new modal_1.CloseModal()
        ]), operators_1.handleError('form', new aws_account_actions_1.DeleteAwsAccountFailure()))));
        this.updateAwsAccountDetails$ = this.actions$.pipe(effects_1.ofType(aws_account_actions_1.ActionTypes.UpdateAwsAccount), operators_2.map((action) => action.payload), operators_2.concatMap(payload => this.awsAccountApi.update(payload).pipe(operators_2.mergeMap(data => [
            new aws_account_actions_1.UpdateAwsAccountSuccess(data),
            new modal_1.CloseModal(),
            new toast_actions_1.OpenToast({ message: 'Policy Group Updated Successfully', type: 'success' })
        ]), operators_1.handleError('form', new aws_account_actions_1.UpdateAwsAccountFailure()))));
        this.enableSurface$ = this.actions$.pipe(effects_1.ofType(aws_account_actions_1.ActionTypes.EnableSurfaceToAwsAccount), operators_2.map((action) => action.payload), operators_2.concatMap(payload => this.awsAccountApi.enableSurface(payload.surfaceId, payload.awsAccountId).pipe(operators_2.mergeMap(_ => [
            new aws_account_actions_1.EnableSurfaceToAwsAccountSuccess({ surfaceId: payload.surfaceId, awsAccountId: payload.awsAccountId }),
            new modal_1.CloseModal(),
            new aws_account_actions_1.LoadAwsAccount(payload.awsAccountId),
            new toast_actions_1.OpenToast({ message: 'Enabled Surface To Aws Account  Successfully', type: 'success' })
        ]), operators_1.handleError('toast', new aws_account_actions_1.EnableSurfaceToAwsAccountFailure()))));
        this.disableSurface$ = this.actions$.pipe(effects_1.ofType(aws_account_actions_1.ActionTypes.DisableSurfaceToAwsAccount), operators_2.map((action) => action.payload), operators_2.concatMap(payload => this.awsAccountApi.disableSurface(payload.surfaceId, payload.awsAccountId).pipe(operators_2.mergeMap(_ => [
            new aws_account_actions_1.DisableSurfaceToAwsAccountSuccess({ surfaceId: payload.surfaceId, awsAccountId: payload.awsAccountId }),
            new modal_1.CloseModal(),
            new aws_account_actions_1.LoadAwsAccount(payload.awsAccountId),
            new toast_actions_1.OpenToast({ message: 'Disabled Surface To Aws Account  Successfully', type: 'success' })
        ]), operators_1.handleError('toast', new aws_account_actions_1.EnableSurfaceToAwsAccountFailure()))));
        this.enableSurfaceLayer$ = this.actions$.pipe(effects_1.ofType(aws_account_actions_1.ActionTypes.EnableSurfaceLayerToAwsAccount), operators_2.map((action) => action.payload), operators_2.concatMap(payload => this.awsAccountApi.enableSurfaceLayer(payload.surfaceId, payload.surfaceLayerId, payload.awsAccountId).pipe(operators_2.mergeMap(_ => [
            new aws_account_actions_1.EnableSurfaceLayerToAwsAccountSuccess(Object.assign({}, payload)),
            new modal_1.CloseModal(),
            new aws_account_actions_1.LoadAwsAccount(payload.awsAccountId),
            new toast_actions_1.OpenToast({ message: 'Enabled Surface Layer To Aws Account  Successfully', type: 'success' })
        ]), operators_1.handleError('toast', new aws_account_actions_1.EnableSurfaceLayerToAwsAccountFailure()))));
        this.disableSurfaceLayer$ = this.actions$.pipe(effects_1.ofType(aws_account_actions_1.ActionTypes.DisableSurfaceLayerToAwsAccount), operators_2.map((action) => action.payload), operators_2.concatMap(payload => this.awsAccountApi.disableSurfaceLayer(payload.surfaceId, payload.surfaceLayerId, payload.awsAccountId).pipe(operators_2.mergeMap(_ => [
            new aws_account_actions_1.DisableSurfaceToAwsAccountSuccess(Object.assign({}, payload)),
            new modal_1.CloseModal(),
            new aws_account_actions_1.LoadAwsAccount(payload.awsAccountId),
            new toast_actions_1.OpenToast({ message: 'Disable Surface Layer To Aws Account  Successfully', type: 'success' })
        ]), operators_1.handleError('toast', new aws_account_actions_1.EnableSurfaceLayerToAwsAccountFailure()))));
        this.loadListOnNav$ = this.actions$.pipe(operators_1.ofRoute(['/institution/accounts']), operators_2.mergeMap(_ => [
            new aws_account_actions_1.LoadAwsAccounts(),
            new surface_actions_1.LoadSurfaces(),
            new aws_account_actions_1.SelectAwsAccount(undefined)
        ]));
        this.loadListOnModal$ = this.actions$.pipe(operators_1.ofModal([modal_1.AssociateAwsAccountsComponent, modal_1.DisableAwsAccountsComponent]), operators_2.mergeMap(_ => [
            new aws_account_actions_1.LoadAwsAccounts(),
            new aws_account_actions_1.SelectAwsAccount(undefined)
        ]));
    }
};
__decorate([
    effects_1.Effect()
], AwsAccountEffects.prototype, "loadAwsAccounts$", void 0);
__decorate([
    effects_1.Effect()
], AwsAccountEffects.prototype, "loadAwsAccount$", void 0);
__decorate([
    effects_1.Effect()
], AwsAccountEffects.prototype, "createAwsAccount$", void 0);
__decorate([
    effects_1.Effect()
], AwsAccountEffects.prototype, "deleteAwsAccount$", void 0);
__decorate([
    effects_1.Effect()
], AwsAccountEffects.prototype, "updateAwsAccountDetails$", void 0);
__decorate([
    effects_1.Effect()
], AwsAccountEffects.prototype, "enableSurface$", void 0);
__decorate([
    effects_1.Effect()
], AwsAccountEffects.prototype, "disableSurface$", void 0);
__decorate([
    effects_1.Effect()
], AwsAccountEffects.prototype, "enableSurfaceLayer$", void 0);
__decorate([
    effects_1.Effect()
], AwsAccountEffects.prototype, "disableSurfaceLayer$", void 0);
__decorate([
    effects_1.Effect()
], AwsAccountEffects.prototype, "loadListOnNav$", void 0);
__decorate([
    effects_1.Effect()
], AwsAccountEffects.prototype, "loadListOnModal$", void 0);
AwsAccountEffects = __decorate([
    core_1.Injectable()
], AwsAccountEffects);
exports.AwsAccountEffects = AwsAccountEffects;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXdzLWFjY291bnQuZWZmZWN0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zdG9yZS9hd3MtYWNjb3VudHMvc3RhdGUvYXdzLWFjY291bnQuZWZmZWN0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUEyQztBQUMzQywyQ0FBd0Q7QUFHeEQseURBQTBFO0FBRTFFLDhDQUFpRztBQUVqRyxpREFBK0c7QUFDL0csdUVBQWdFO0FBRWhFLG9GQUE4RTtBQUU5RSwrREEwQitCO0FBSS9CLElBQWEsaUJBQWlCLEdBQTlCLE1BQWEsaUJBQWlCO0lBdUo1QixZQUNtQixRQUFpQixFQUNqQixnQkFBa0MsRUFDbEMsYUFBaUM7UUFGakMsYUFBUSxHQUFSLFFBQVEsQ0FBUztRQUNqQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLGtCQUFhLEdBQWIsYUFBYSxDQUFvQjtRQXhKMUMscUJBQWdCLEdBQXVCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUNqRSxnQkFBTSxDQUFDLGlDQUFXLENBQUMsZUFBZSxDQUFDLEVBQ25DLHFCQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FDWixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FDNUIsZUFBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSw0Q0FBc0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUM3Qyx1QkFBVyxDQUFDLE9BQU8sRUFBRSxJQUFJLDJDQUFxQixFQUFFLENBQUMsQ0FDbEQsQ0FDRixDQUNGLENBQUM7UUFFUSxvQkFBZSxHQUF1QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FDaEUsZ0JBQU0sQ0FBQyxpQ0FBVyxDQUFDLGNBQWMsQ0FBQyxFQUNsQyxlQUFHLENBQUMsQ0FBQyxNQUFzQixF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