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
const error_actions_1 = require("@concourse/core/error/state/error.actions");
const modal_1 = require("@concourse/core/modal");
const router_actions_1 = require("@concourse/core/router/router.actions");
const toast_actions_1 = require("@concourse/core/toast/toast.actions");
const auth_actions_1 = require("@concourse/store/auth/state/auth.actions");
const institution_actions_1 = require("./institution.actions");
let InstitutionEffects = class InstitutionEffects {
    constructor(actions$, instApi, authFacade) {
        this.actions$ = actions$;
        this.instApi = instApi;
        this.authFacade = authFacade;
        this.loadInstitutions$ = this.actions$.pipe(effects_1.ofType(institution_actions_1.InstitutionActionTypes.LoadInstitutions), operators_2.switchMap(() => this.instApi.list().pipe(operators_2.map(data => new institution_actions_1.LoadInstitutionsSuccess(data)), operators_1.handleError('toast', new institution_actions_1.LoadInstitutionsFailure()))));
        this.loadInstitution$ = this.actions$.pipe(effects_1.ofType(institution_actions_1.InstitutionActionTypes.LoadInstitution), operators_2.map((action) => action.payload), operators_2.switchMap(payload => this.instApi.get(payload).pipe(operators_2.map(data => new institution_actions_1.LoadInstitutionSuccess(data)), operators_1.handleError('toast', new institution_actions_1.LoadInstitutionFailure()))));
        this.loadIDPConfig$ = this.actions$.pipe(effects_1.ofType(institution_actions_1.InstitutionActionTypes.LoadInstitutionConfig), operators_2.map((action) => action.payload), operators_2.filter(payload => payload.config === 'idp'), operators_2.switchMap(payload => this.instApi.getIDPConfig().pipe(operators_2.map(data => new institution_actions_1.LoadInstitutionConfigSuccess({ config: payload.config, data })), operators_2.catchError(err => err.status === 404 ? // 404 is OK here because that just means the config wasn't created yet
            rxjs_1.of(new institution_actions_1.LoadInstitutionConfigFailure()) :
            rxjs_1.of(new error_actions_1.AddApplicationError({
                message: err.error ? err.error.message : err.message,
                displayType: 'toast'
            }), new institution_actions_1.LoadInstitutionConfigFailure())))));
        this.createIDPConfig$ = this.actions$.pipe(effects_1.ofType(institution_actions_1.InstitutionActionTypes.CreateInstitutionConfig), operators_2.map((action) => action.payload), operators_2.filter(({ config }) => config === 'idp'), operators_2.concatMap(({ config, data: payload }) => this.instApi.updateIDPConfig('post', payload).pipe(operators_2.mergeMap(data => [
            new institution_actions_1.CreateInstitutionConfigSuccess({ config, data }),
            new toast_actions_1.OpenToast({
                message: 'IDP Config Updated',
                type: 'success'
            })
        ]), operators_1.handleError('form', new institution_actions_1.CreateInstitutionConfigFailure()))));
        this.updateIDPConfig$ = this.actions$.pipe(effects_1.ofType(institution_actions_1.InstitutionActionTypes.UpdateInstitutionConfig), operators_2.map((action) => action.payload), operators_2.filter(({ config }) => config === 'idp'), operators_2.concatMap(({ config, data: payload }) => this.instApi.updateIDPConfig('put', payload).pipe(operators_2.map(data => new institution_actions_1.UpdateInstitutionConfigSuccess({ config, data })), operators_1.handleError('form', new institution_actions_1.UpdateInstitutionConfigFailure()))));
        this.updateInstitution$ = this.actions$.pipe(effects_1.ofType(institution_actions_1.InstitutionActionTypes.UpdateInstitution), operators_2.map((action) => action.payload), operators_2.exhaustMap(payload => this.instApi.update(payload).pipe(operators_2.mergeMap(inst => [
            new institution_actions_1.UpdateInstitutionSuccess(inst),
            new modal_1.CloseModal(),
            new toast_actions_1.OpenToast({
                message: 'Institution Updated!',
                type: 'success'
            })
        ]), operators_1.handleError('form', new institution_actions_1.InviteInstitutionFailure()))));
        this.inviteInstitution$ = this.actions$.pipe(effects_1.ofType(institution_actions_1.InstitutionActionTypes.InviteInstitution), operators_2.map((action) => action.payload), operators_2.exhaustMap(payload => this.instApi.invite(payload).pipe(operators_2.mergeMap(data => [
            new institution_actions_1.InviteInstitutionSuccess(data),
            new modal_1.CloseModal(),
            new toast_actions_1.OpenToast({
                message: 'An invitation has been sent to the institution Email account. Please check email for invitation',
                type: 'success'
            })
        ]), operators_1.handleError('form', new institution_actions_1.InviteInstitutionFailure()))));
        this.registerInstitution$ = this.actions$.pipe(effects_1.ofType(institution_actions_1.InstitutionActionTypes.RegisterInstitution), operators_2.map((action) => action.payload), operators_2.exhaustMap(payload => this.instApi.register(payload).pipe(operators_2.map(data => new institution_actions_1.RegisterInstitutionSuccess(data)), operators_1.handleError('form', new institution_actions_1.RegisterInstitutionFailure()))));
        this.regenerateInvitation$ = this.actions$.pipe(effects_1.ofType(institution_actions_1.InstitutionActionTypes.RegenerateInvitation), operators_2.map((action) => action.payload), operators_2.exhaustMap(payload => this.instApi.regenerateInvitation(payload).pipe(operators_2.mergeMap(_ => [
            new institution_actions_1.RegenerateInvitationSuccess(),
            new toast_actions_1.OpenToast({ message: 'Invitation resent successfully.', type: 'success' }),
            new router_actions_1.RouterGo({ path: ['/'] })
        ]), operators_1.handleError('toast', new institution_actions_1.RegenerateInvitationFailure()))));
        this.validateInstToken$ = this.actions$.pipe(effects_1.ofType(institution_actions_1.InstitutionActionTypes.ValidateInstToken), operators_2.map((action) => action.payload), operators_2.exhaustMap(payload => this.instApi.validateInstToken(payload.token).pipe(operators_2.mergeMap(_ => [
            new router_actions_1.RouterGo({ path: ['/institution/register'] }),
            new institution_actions_1.ValidateInstTokenSuccess(payload)
        ]), operators_2.catchError(err => {
            // TODO: Need to change to status code.
            if (err.status === 401) {
                return rxjs_1.of(
                // saving token to store. to use when regenerating.
                new error_actions_1.AddApplicationError({
                    message: err.error ? err.error.message : err.message,
                    displayType: 'toast'
                }), new router_actions_1.RouterGo({ path: ['/institution/invitation-expire'] }), new institution_actions_1.ValidateInstTokenFailure(payload.token));
            }
            return rxjs_1.of(new error_actions_1.AddApplicationError({
                message: err.error ? err.error.message : err.message,
                displayType: 'toast'
            }), new institution_actions_1.ValidateInstTokenFailure(err));
        }))));
        this.validateRegistrationToken$ = this.actions$.pipe(effects_1.ofType(institution_actions_1.InstitutionActionTypes.ValidateRegistrationConfirmToken), operators_2.map((action) => action.payload), operators_2.exhaustMap(payload => this.instApi.validateRegistrationToken(payload).pipe(operators_2.mergeMap(inst => [
            new toast_actions_1.OpenToast({ message: 'Account Confirmed, Please login.', type: 'success' }),
            new institution_actions_1.ValidateRegistrationConfirmTokenSuccess(inst),
            new router_actions_1.RouterGo({ path: ['/'] })
        ]), operators_2.catchError(err => {
            // TODO: Need to change to status code.
            if (err.status === 401) {
                return rxjs_1.of(
                // saving token to store. to use when regenerating.
                new error_actions_1.AddApplicationError({
                    message: err.error ? err.error.message : err.message,
                    displayType: 'toast',
                    rawError: err
                }), new router_actions_1.RouterGo({ path: ['/institution/registration-expire'] }), new institution_actions_1.ValidateRegistrationConfirmTokenFailure(payload));
            }
            return rxjs_1.of(new error_actions_1.AddApplicationError({
                message: err.error ? err.error.message : err.message,
                displayType: 'toast',
                rawError: err
            }), new institution_actions_1.ValidateRegistrationConfirmTokenFailure(err));
        }))));
        this.regenerateRegistration$ = this.actions$.pipe(effects_1.ofType(institution_actions_1.InstitutionActionTypes.RegenerateRegistration), operators_2.map((action) => action.payload), operators_2.exhaustMap(payload => this.instApi.regenerateRegistration(payload).pipe(operators_2.mergeMap(inst => [
            new institution_actions_1.RegenerateRegistrationSuccess(inst),
            new toast_actions_1.OpenToast({ message: 'Registration resent successfully.', type: 'success' }),
            new router_actions_1.RouterGo({ path: ['/'] })
        ]), operators_1.handleError('toast', new institution_actions_1.RegenerateRegistrationFailure()))));
        // routing effects
        this.loadInstitutionNav$ = this.actions$.pipe(operators_1.ofRoute(['/admin/institutions/:id']), operators_2.map((action) => action.payload), operators_2.mergeMap(route => [
            new institution_actions_1.LoadInstitution(+route.params['id']),
            new institution_actions_1.SelectInstitution(+route.params['id'])
        ]));
        this.loadOnValidateInvitation$ = this.actions$.pipe(operators_1.ofRoute(['/institution/validate-invitation']), operators_2.map((action) => action.payload), operators_2.exhaustMap(route => this.authFacade.isAuthenticated$.pipe(operators_2.takeUntil(this.actions$.pipe(effects_1.ofType(router_actions_1.RouterActionTypes.Change))), operators_2.mergeMap(isUserAuthenticated => [
            ...(!!isUserAuthenticated ? [new auth_actions_1.Logout()] : []),
            new institution_actions_1.ValidateInstToken({
                token: route.queryParams.token,
                email: atob(route.queryParams.email),
                name: atob(route.queryParams.name)
            })
        ]))));
        this.loadOnValidateRegistration$ = this.actions$.pipe(operators_1.ofRoute(['/institution/validate-registration']), operators_2.map((action) => action.payload), operators_2.exhaustMap(route => this.authFacade.isAuthenticated$.pipe(operators_2.takeUntil(this.actions$.pipe(effects_1.ofType(router_actions_1.RouterActionTypes.Change))), operators_2.mergeMap(isUserAuthenticated => [
            ...(!!isUserAuthenticated ? [new auth_actions_1.Logout()] : []),
            new institution_actions_1.ValidateRegistrationConfirmToken(route.queryParams.token)
        ]))));
        this.loadIDPConfigNav$ = this.actions$.pipe(operators_1.ofRoute(['/institution/config/idp']), operators_2.map((action) => action.payload), operators_2.exhaustMap(route => this.authFacade.institutionId$.pipe(operators_2.take(1), operators_2.mergeMap(institutionId => [
            new institution_actions_1.LoadInstitution(institutionId),
            new institution_actions_1.SelectInstitution(institutionId),
            new institution_actions_1.LoadInstitutionConfig({ config: 'idp' })
        ]))));
        this.loadInstitutionOverviewNav$ = this.actions$.pipe(operators_1.ofRoute(['/institution/overview']), operators_2.map((action) => action.payload), operators_2.exhaustMap(route => this.authFacade.institutionId$.pipe(operators_2.take(1), operators_2.mergeMap(institutionId => [
            new institution_actions_1.LoadInstitution(institutionId),
            new institution_actions_1.SelectInstitution(institutionId)
        ]))));
    }
};
__decorate([
    effects_1.Effect()
], InstitutionEffects.prototype, "loadInstitutions$", void 0);
__decorate([
    effects_1.Effect()
], InstitutionEffects.prototype, "loadInstitution$", void 0);
__decorate([
    effects_1.Effect()
], InstitutionEffects.prototype, "loadIDPConfig$", void 0);
__decorate([
    effects_1.Effect()
], InstitutionEffects.prototype, "createIDPConfig$", void 0);
__decorate([
    effects_1.Effect()
], InstitutionEffects.prototype, "updateIDPConfig$", void 0);
__decorate([
    effects_1.Effect()
], InstitutionEffects.prototype, "updateInstitution$", void 0);
__decorate([
    effects_1.Effect()
], InstitutionEffects.prototype, "inviteInstitution$", void 0);
__decorate([
    effects_1.Effect()
], InstitutionEffects.prototype, "registerInstitution$", void 0);
__decorate([
    effects_1.Effect()
], InstitutionEffects.prototype, "regenerateInvitation$", void 0);
__decorate([
    effects_1.Effect()
], InstitutionEffects.prototype, "validateInstToken$", void 0);
__decorate([
    effects_1.Effect()
], InstitutionEffects.prototype, "validateRegistrationToken$", void 0);
__decorate([
    effects_1.Effect()
], InstitutionEffects.prototype, "regenerateRegistration$", void 0);
__decorate([
    effects_1.Effect()
], InstitutionEffects.prototype, "loadInstitutionNav$", void 0);
__decorate([
    effects_1.Effect()
], InstitutionEffects.prototype, "loadOnValidateInvitation$", void 0);
__decorate([
    effects_1.Effect()
], InstitutionEffects.prototype, "loadOnValidateRegistration$", void 0);
__decorate([
    effects_1.Effect()
], InstitutionEffects.prototype, "loadIDPConfigNav$", void 0);
__decorate([
    effects_1.Effect()
], InstitutionEffects.prototype, "loadInstitutionOverviewNav$", void 0);
InstitutionEffects = __decorate([
    core_1.Injectable()
], InstitutionEffects);
exports.InstitutionEffects = InstitutionEffects;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zdGl0dXRpb24uZWZmZWN0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zdG9yZS9pbnN0aXR1dGlvbi9zdGF0ZS9pbnN0aXR1dGlvbi5lZmZlY3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBQTJDO0FBQzNDLDJDQUF3RDtBQUd4RCx5REFBaUU7QUFDakUsK0JBQXNDO0FBQ3RDLDhDQVV3QjtBQUV4Qiw2RUFBZ0Y7QUFDaEYsaURBQW1EO0FBQ25ELDBFQUFrRztBQUNsRyx1RUFBZ0U7QUFDaEUsMkVBQWtFO0FBR2xFLCtEQXFDK0I7QUFHL0IsSUFBYSxrQkFBa0IsR0FBL0IsTUFBYSxrQkFBa0I7SUF1UzdCLFlBQ21CLFFBQWlCLEVBQ2pCLE9BQTJCLEVBQzNCLFVBQXNCO1FBRnRCLGFBQVEsR0FBUixRQUFRLENBQVM7UUFDakIsWUFBTyxHQUFQLE9BQU8sQ0FBb0I7UUFDM0IsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQXhTL0Isc0JBQWlCLEdBQXVCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUNsRSxnQkFBTSxDQUFDLDRDQUFzQixDQUFDLGdCQUFnQixDQUFDLEVBQy9DLHFCQUFTLENBQUMsR0FBRyxFQUFFLENBQ2IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQ3RCLGVBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksNkNBQXVCLENBQUMsSUFBSSxDQUFDLENBQUMsRUFDOUMsdUJBQVcsQ0FBQyxPQUFPLEVBQUUsSUFBSSw2Q0FBdUIsRUFBRSxDQUFDLENBQ3BELENBQ0YsQ0FDRixDQUFDO1FBRVEscUJBQWdCLEdBQXVCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUNqRSxnQkFBTSxDQUFDLDRDQUFzQixDQUFDLGVBQWUsQ0FB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