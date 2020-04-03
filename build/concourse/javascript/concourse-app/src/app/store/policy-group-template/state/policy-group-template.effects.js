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
const policy_group_actions_1 = require("@concourse/store/policy-group/state/policy-group.actions");
const policy_template_actions_1 = require("@concourse/store/policy-template/state/policy-template.actions");
const policy_group_template_actions_1 = require("./policy-group-template.actions");
let PolicyGroupTemplateEffects = class PolicyGroupTemplateEffects {
    constructor(actions$, policyGroupTemplateApi, policyGroupTemplateFacade) {
        this.actions$ = actions$;
        this.policyGroupTemplateApi = policyGroupTemplateApi;
        this.policyGroupTemplateFacade = policyGroupTemplateFacade;
        this.list$ = this.policyGroupTemplateFacade.list$;
        this.loadPolicyGroupTemplates$ = this.actions$.pipe(effects_1.ofType(policy_group_template_actions_1.PolicyGroupTemplateActionTypes.LoadPolicyGroupTemplates), operators_2.switchMap(_ => this.policyGroupTemplateApi.list().pipe(operators_2.map(data => new policy_group_template_actions_1.LoadPolicyGroupTemplatesSuccess(data)), operators_1.handleError('toast', new policy_group_template_actions_1.LoadPolicyGroupTemplatesFailure()))));
        this.loadPolicyGroupTemplatesByPagination$ = this.actions$.pipe(effects_1.ofType(policy_group_template_actions_1.PolicyGroupTemplateActionTypes.LoadPolicyGroupTemplatesByPagination), operators_2.map((action) => action.payload), operators_2.concatMap(payload => this.policyGroupTemplateApi.paginatedList(payload.size, payload.page).pipe(operators_2.map(data => new policy_group_template_actions_1.LoadPolicyGroupTemplatesByPaginationSuccess(data)), operators_1.handleError('toast', new policy_group_template_actions_1.LoadPolicyGroupTemplatesByPaginationFailure()))));
        this.loadPolicyGroupTemplate$ = this.actions$.pipe(effects_1.ofType(policy_group_template_actions_1.PolicyGroupTemplateActionTypes.LoadPolicyGroupTemplate), operators_2.map((action) => action.payload), operators_2.switchMap(payload => this.policyGroupTemplateApi.get(payload).pipe(operators_2.map(data => new policy_group_template_actions_1.LoadPolicyGroupTemplateSuccess(data)), operators_1.handleError('toast', new policy_group_template_actions_1.LoadPolicyGroupTemplateFailure()))));
        this.createPolicyGroupTemplate$ = this.actions$.pipe(effects_1.ofType(policy_group_template_actions_1.PolicyGroupTemplateActionTypes.CreatePolicyGroupTemplate), operators_2.map((action) => action.payload), operators_2.concatMap(({ newPgt: payload, versionBump }) => this.policyGroupTemplateApi.create(payload, versionBump).pipe(operators_2.mergeMap(data => [
            new policy_group_template_actions_1.CreatePolicyGroupTemplateSuccess(data),
            new modal_1.CloseModal(),
            new toast_actions_1.OpenToast({ message: 'Policy Group Template Created Successfully', type: 'success' }),
            new router_actions_1.RouterGo({ path: [`/policy-group-templates/${data.id}`] })
        ]), operators_1.handleError('form', new policy_group_template_actions_1.CreatePolicyGroupTemplateFailure()))));
        this.deletePolicyGroupTemplate$ = this.actions$.pipe(effects_1.ofType(policy_group_template_actions_1.PolicyGroupTemplateActionTypes.DeletePolicyGroupTemplate), operators_2.map((action) => action.payload), operators_2.concatMap(payload => this.policyGroupTemplateApi.delete(payload).pipe(operators_2.mergeMap(_ => [
            new policy_group_template_actions_1.DeletePolicyGroupTemplateSuccess(payload),
            new toast_actions_1.OpenToast({ message: 'Policy Group Template Deleted Successfully', type: 'success' }),
            new modal_1.CloseModal(),
            new router_actions_1.RouterGo({ path: ['/policy-group-templates'] })
        ]), operators_1.handleError('form', new policy_group_template_actions_1.DeletePolicyGroupTemplateFailure()))));
        this.removePolicyTemplateFromPolicyGroupTemplate$ = this.actions$.pipe(effects_1.ofType(policy_group_template_actions_1.PolicyGroupTemplateActionTypes.RemovePolicyTemplateFromPolicyGroupTemplate), operators_2.map((action) => action.payload), operators_2.concatMap(({ policyGroupTemplateId, policyTemplateId }) => this.policyGroupTemplateApi.removePolicyTemplateFromPolicyGroupTemplate(policyGroupTemplateId, policyTemplateId).pipe(operators_2.mergeMap(data => [
            new policy_group_template_actions_1.RemovePolicyTemplateFromPolicyGroupTemplateSuccess(data),
            new toast_actions_1.OpenToast({ message: 'Policy Template Removed Successfully', type: 'success' })
        ]), operators_1.handleError('toast', new policy_group_template_actions_1.RemovePolicyTemplateFromPolicyGroupTemplateFailure()))));
        this.updatePolicyGroupTemplate$ = this.actions$.pipe(effects_1.ofType(policy_group_template_actions_1.PolicyGroupTemplateActionTypes.UpdatePolicyGroupTemplate), operators_2.map((action) => action.payload), operators_2.exhaustMap(({ newPolicyGroupTemplate: payload, versionBump }) => this.policyGroupTemplateApi.update(payload, versionBump).pipe(operators_2.mergeMap(data => [
            new policy_group_template_actions_1.UpdatePolicyGroupTemplateSuccess(data),
            new modal_1.CloseModal(),
            new toast_actions_1.OpenToast({ message: 'Policy Group Template Updated Successfully', type: 'success' }),
            ...(payload.id !== data.id ? [
                new policy_group_template_actions_1.UpdatePolicyGroupTemplateSuccess(payload.copyWith({ isLatest: false, status: payload.status === 'DRAFT' ? 'PUBLISHED' : 'DRAFT' })),
                new router_actions_1.RouterGo({ path: [`/policy-group-templates/${data.id}`] })
            ] : [])
        ]), operators_1.handleError('form', new policy_group_template_actions_1.UpdatePolicyGroupTemplateFailure()))));
        this.updatePolicyTemplates$ = this.actions$.pipe(effects_1.ofType(policy_group_template_actions_1.PolicyGroupTemplateActionTypes.UpdatePolicyTemplates), operators_2.map((action) => action.payload), operators_2.exhaustMap(payload => this.policyGroupTemplateApi.updatePolicyTemplates(payload).pipe(operators_2.mergeMap(data => [
            new policy_group_template_actions_1.UpdatePolicyTemplatesSuccess(data),
            new modal_1.CloseModal(),
            new toast_actions_1.OpenToast({ message: 'Policy Templates Updated Successfully', type: 'success' }),
            new router_actions_1.RouterGo({ path: [`/policy-group-templates/${data.id}`] })
        ]), operators_1.handleError('form', new policy_group_template_actions_1.UpdatePolicyTemplatesFailure()))));
        this.searchPolicyGroupTemplate$ = this.actions$.pipe(effects_1.ofType(policy_group_template_actions_1.PolicyGroupTemplateActionTypes.SearchPolicyGroupTemplate), operators_2.map((action) => action.payload), operators_2.map(searchText => searchText.toLocaleLowerCase()), operators_2.withLatestFrom(this.list$), operators_2.map(([searchText, policyGroupTemplates]) => policyGroupTemplates.filter(pgt => pgt.name.toLocaleLowerCase().includes(searchText)).map(u => u.id)), operators_2.map(results => new policy_group_template_actions_1.SearchPolicyGroupTemplateSuccess(results)));
        this.loadPolicyGroupTemplatesNav$ = this.actions$.pipe(operators_1.ofRoute(['/policy-group-templates']), operators_2.mergeMap(_ => [
            new policy_group_template_actions_1.SelectPolicyGroupTemplate(undefined),
            // new LoadPolicyGroupTemplates(),
            new policy_group_template_actions_1.LoadPolicyGroupTemplatesByPagination({ page: '0', size: '200' }),
            new policy_template_actions_1.LoadPolicyTemplates(),
            new policy_group_actions_1.LoadPolicyGroups()
        ]));
        this.loadPolicyGroupTemplateNav$ = this.actions$.pipe(operators_1.ofRoute(['/policy-group-templates/:id']), operators_2.map((action) => action.payload), operators_2.mergeMap(route => [
            new policy_group_template_actions_1.LoadPolicyGroupTemplate(+route.params.id),
            new policy_group_template_actions_1.SelectPolicyGroupTemplate(+route.params.id)
        ]));
    }
};
__decorate([
    effects_1.Effect()
], PolicyGroupTemplateEffects.prototype, "loadPolicyGroupTemplates$", void 0);
__decorate([
    effects_1.Effect()
], PolicyGroupTemplateEffects.prototype, "loadPolicyGroupTemplatesByPagination$", void 0);
__decorate([
    effects_1.Effect()
], PolicyGroupTemplateEffects.prototype, "loadPolicyGroupTemplate$", void 0);
__decorate([
    effects_1.Effect()
], PolicyGroupTemplateEffects.prototype, "createPolicyGroupTemplate$", void 0);
__decorate([
    effects_1.Effect()
], PolicyGroupTemplateEffects.prototype, "deletePolicyGroupTemplate$", void 0);
__decorate([
    effects_1.Effect()
], PolicyGroupTemplateEffects.prototype, "removePolicyTemplateFromPolicyGroupTemplate$", void 0);
__decorate([
    effects_1.Effect()
], PolicyGroupTemplateEffects.prototype, "updatePolicyGroupTemplate$", void 0);
__decorate([
    effects_1.Effect()
], PolicyGroupTemplateEffects.prototype, "updatePolicyTemplates$", void 0);
__decorate([
    effects_1.Effect()
], PolicyGroupTemplateEffects.prototype, "searchPolicyGroupTemplate$", void 0);
__decorate([
    effects_1.Effect()
], PolicyGroupTemplateEffects.prototype, "loadPolicyGroupTemplatesNav$", void 0);
__decorate([
    effects_1.Effect()
], PolicyGroupTemplateEffects.prototype, "loadPolicyGroupTemplateNav$", void 0);
PolicyGroupTemplateEffects = __decorate([
    core_1.Injectable()
], PolicyGroupTemplateEffects);
exports.PolicyGroupTemplateEffects = PolicyGroupTemplateEffects;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9saWN5LWdyb3VwLXRlbXBsYXRlLmVmZmVjdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc3RvcmUvcG9saWN5LWdyb3VwLXRlbXBsYXRlL3N0YXRlL3BvbGljeS1ncm91cC10ZW1wbGF0ZS5lZmZlY3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBQTJDO0FBQzNDLDJDQUF3RDtBQUd4RCx5REFBaUU7QUFFakUsOENBT3dCO0FBRXhCLGlEQUFtRDtBQUNuRCwwRUFBK0U7QUFDL0UsdUVBQWdFO0FBQ2hFLG1HQUE0RjtBQUM1Riw0R0FBcUc7QUFFckcsbUZBNkJ5QztBQUl6QyxJQUFhLDBCQUEwQixHQUF2QyxNQUFhLDBCQUEwQjtJQW1KckMsWUFDbUIsUUFBaUIsRUFDakIsc0JBQWtELEVBQ2xELHlCQUFvRDtRQUZwRCxhQUFRLEdBQVIsUUFBUSxDQUFTO1FBQ2pCLDJCQUFzQixHQUF0QixzQkFBc0IsQ0FBNEI7UUFDbEQsOEJBQXlCLEdBQXpCLHlCQUF5QixDQUEyQjtRQXBKdkUsVUFBSyxHQUFHLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxLQUFLLENBQUM7UUFFbkMsOEJBQXlCLEdBQXVCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUMxRSxnQkFBTSxDQUFDLDhEQUE4QixDQUFDLHdCQUF3QixDQUFDLEVBQy9ELHFCQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FDWixJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUNyQyxlQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLCtEQUErQixDQUFDLElBQUksQ0FBQyxDQUFDLEVBQ3RELHVCQUFXLENBQUMsT0FBTyxFQUFFLElBQUksK0RBQStCLEVBQUUsQ0FBQyxDQUM1RCxDQUNGLENBQ0Ys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